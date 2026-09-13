import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

type Decision = "accept_all" | "reject_all" | "custom";

interface ConsentPayload {
  decision: Decision;
  preferences: Record<string, boolean>;
}

function getClientIp(request: Request): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0].trim();
  return request.headers.get("x-real-ip") || "unknown";
}

export async function POST(request: Request) {
  try {
    const body: ConsentPayload = await request.json();

    if (!body.decision || typeof body.preferences !== "object") {
      return NextResponse.json({ error: "Invalid consent payload" }, { status: 400 });
    }

    const supabase = getSupabase();
    if (!supabase) {
      console.error("Supabase env vars are not set — cannot store cookie consent.");
      return NextResponse.json({ error: "Consent logging is not configured" }, { status: 503 });
    }

    // IP and timestamp are captured server-side (never trusted from the
    // client) so this row can stand as an actual consent record, not just
    // a UI-state flag.
    const { error } = await supabase.from("cookie_consents").insert({
      decision: body.decision,
      preferences: body.preferences,
      ip_address: getClientIp(request),
      user_agent: request.headers.get("user-agent") || "unknown",
    });

    if (error) {
      console.error("Failed to store cookie consent:", error);
      return NextResponse.json({ error: "Failed to store consent" }, { status: 500 });
    }

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error("Error processing cookie consent:", error);
    return NextResponse.json({ error: "Failed to process consent" }, { status: 500 });
  }
}
