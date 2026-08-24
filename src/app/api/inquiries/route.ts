import { NextResponse } from "next/server";

async function verifyTurnstile(token: string | undefined, ip: string | null): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;

  // If Turnstile isn't configured yet, don't hard-block real submissions —
  // but this should be set before launch (see design.md / audit report).
  if (!secret) return true;
  if (!token) return false;

  const body = new URLSearchParams();
  body.append("secret", secret);
  body.append("response", token);
  if (ip) body.append("remoteip", ip);

  const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });

  if (!res.ok) return false;
  const data = await res.json();
  return data.success === true;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { turnstileToken, ...inquiry } = body;

    const ip = request.headers.get("x-forwarded-for");
    const humanVerified = await verifyTurnstile(turnstileToken, ip);
    if (!humanVerified) {
      return NextResponse.json({ error: "Verification failed. Please try again." }, { status: 400 });
    }

    if (!inquiry.name || !inquiry.email || !inquiry.project_info) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    // Admin backend URL is server-only — never bundled into client JS.
    const adminApiUrl = process.env.ADMIN_API_URL || "http://localhost:3001";

    const response = await fetch(`${adminApiUrl}/api/inquiries`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(inquiry),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return NextResponse.json(
        { error: errorData.error || "Failed to submit inquiry to the server" },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json({ message: "Inquiry submitted successfully", data, success: true }, { status: 201 });
  } catch (error) {
    console.error("Error forwarding inquiry:", error);
    return NextResponse.json({ error: "Failed to process inquiry" }, { status: 500 });
  }
}
