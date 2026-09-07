import { NextResponse } from 'next/server';
import { randomUUID } from 'crypto';

function generateTrackingId(): string {
  return `VV-${randomUUID().split('-')[0].toUpperCase()}`;
}

export async function POST(request: Request) {
  try {
    const incomingForm = await request.formData();
    const trackingId = generateTrackingId();

    // Define the URL of your admin backend API (server-only — never exposed to the client)
    const adminApiUrl = process.env.ADMIN_API_URL || "http://localhost:3001";

    // Rebuild the multipart payload (including the resume file) to forward to the admin backend,
    // tagging it with our own tracking ID so status lookups don't depend on the backend's internal id
    const outgoingForm = new FormData();
    for (const [key, value] of incomingForm.entries()) {
      outgoingForm.append(key, value);
    }
    outgoingForm.append('tracking_id', trackingId);

    const response = await fetch(`${adminApiUrl}/api/applications`, {
      method: 'POST',
      body: outgoingForm,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return NextResponse.json(
        { error: errorData.error || 'Failed to submit application to the server' },
        { status: response.status }
      );
    }

    const data = await response.json();

    return NextResponse.json(
      { message: 'Application submitted successfully', data, trackingId, success: true },
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
