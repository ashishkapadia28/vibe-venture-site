import { NextResponse } from 'next/server';

interface ValidationDetail {
  path?: (string | number)[];
  message?: string;
}

// The backend sometimes returns a generic top-level `error` (e.g. "Validation
// failed") plus a `details` array naming the actual field at fault — surface
// the specific one so the applicant knows exactly what to fix.
function extractErrorMessage(errorData: { error?: string; details?: ValidationDetail[] }): string {
  if (Array.isArray(errorData.details) && errorData.details.length > 0) {
    const messages = errorData.details
      .filter((d): d is ValidationDetail & { message: string } => !!d.message)
      .map((d) => (d.path?.length ? `${d.path.join('.')}: ${d.message}` : d.message));
    if (messages.length > 0) return messages.join('; ');
  }
  return errorData.error || 'Failed to submit application to the server';
}

export async function POST(request: Request) {
  try {
    const incomingForm = await request.formData();

    // Server-only — never exposed to the client.
    const adminApiUrl = process.env.ADMIN_API_URL || "http://localhost:3001";

    const response = await fetch(`${adminApiUrl}/api/applications`, {
      method: 'POST',
      body: incomingForm,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return NextResponse.json(
        { error: extractErrorMessage(errorData) },
        { status: response.status }
      );
    }

    const data = await response.json();

    return NextResponse.json(
      { message: data.message || 'Application submitted successfully', success: true },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error forwarding application:', error);
    return NextResponse.json(
      { error: 'Failed to process application' },
      { status: 500 }
    );
  }
}
