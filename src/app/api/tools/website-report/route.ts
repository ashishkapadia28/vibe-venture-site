import { NextResponse } from 'next/server';

const EMAIL_PATTERN = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export async function POST(request: Request) {
  try {
    const { email, url, report } = await request.json();

    if (!email || typeof email !== 'string' || !EMAIL_PATTERN.test(email)) {
      return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
    }
    if (!url || typeof url !== 'string') {
      return NextResponse.json({ error: 'Missing the analyzed website URL.' }, { status: 400 });
    }

    // NOTE: no email-sending provider is configured yet (no Resend/SendGrid/SMTP
    // key in this project). Wire one in here to actually deliver the report —
    // until then this only logs the request server-side.
    console.log('Website report requested:', { email, url, overallScore: report?.overallScore });

    return NextResponse.json({ success: true, message: 'Report request received.' });
  } catch (error) {
    console.error('Failed to process website report request:', error);
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
  }
}
