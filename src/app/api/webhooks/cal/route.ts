import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const body = await req.text();
    const signature = req.headers.get("cal-signature-256");
    const secret = process.env.CAL_WEBHOOK_SECRET;

    if (!secret) {
      console.error("CAL_WEBHOOK_SECRET is not defined in environment variables");
      return NextResponse.json({ error: "Webhook secret not configured" }, { status: 500 });
    }

    if (!signature) {
      return NextResponse.json({ error: "Missing signature" }, { status: 401 });
    }

    // Verify the signature
    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(body)
      .digest("hex");

    if (signature !== expectedSignature) {
      console.error("Invalid webhook signature");
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    // Parse the verified payload
    const payload = JSON.parse(body);
    console.log("✅ Webhook verified! Received event:", payload.triggerEvent);

    // TODO: Save this data to your database (e.g., Supabase, MongoDB, etc.)
    if (payload.triggerEvent === "BOOKING_CREATED") {
      const { title, attendees, startTime, endTime } = payload.payload;
      console.log("New Booking Details:", { title, attendees, startTime, endTime });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Webhook processing error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
