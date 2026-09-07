import { NextResponse } from 'next/server';

// Demo-only: lets you preview the tracking UI before the real admin backend exists.
// Remove this block once ADMIN_API_URL is live.
const DEMO_TRACKING_ID = 'VV-DEMO01';
const DEMO_RESPONSE = {
  status: 'Under Review',
  job_title: 'Senior Frontend Engineer',
  applied_at: 'Sep 5, 2026',
};

export async function GET(_request: Request, { params }: { params: Promise<{ trackingId: string }> }) {
  try {
    const { trackingId } = await params;

    if (trackingId.toUpperCase() === DEMO_TRACKING_ID) {
      return NextResponse.json(DEMO_RESPONSE);
    }

    const adminApiUrl = process.env.ADMIN_API_URL || "http://localhost:3001";

    const response = await fetch(`${adminApiUrl}/api/applications/track/${encodeURIComponent(trackingId)}`, {
      cache: 'no-store',
    });

    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.json({ error: 'No application found with that ID.' }, { status: 404 });
      }
      const errorData = await response.json().catch(() => ({}));
      return NextResponse.json(
        { error: errorData.error || 'Failed to look up application status.' },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error looking up application:', error);
    return NextResponse.json({ error: 'Failed to look up application status.' }, { status: 500 });
  }
}
