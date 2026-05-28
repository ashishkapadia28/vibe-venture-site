import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Define the URL of your admin backend API
    const adminApiUrl = process.env.NEXT_PUBLIC_ADMIN_API_URL || "http://localhost:3001";
    
    // Securely forward the request to the admin backend
    const response = await fetch(`${adminApiUrl}/api/applications`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
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
      { message: 'Application submitted successfully', data, success: true },
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
