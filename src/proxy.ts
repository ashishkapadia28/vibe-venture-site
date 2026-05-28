import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function proxy(request: NextRequest) {
  // Skip middleware for Next.js internal requests, API routes, and static assets
  if (
    request.nextUrl.pathname.startsWith('/_next') ||
    request.nextUrl.pathname.startsWith('/api') ||
    request.nextUrl.pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  try {
    // Fetch maintenance mode state from Supabase REST API directly
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    
    if (supabaseUrl && supabaseKey) {
      const res = await fetch(`${supabaseUrl}/rest/v1/site_settings?id=eq.global&select=maintenance_mode`, {
        headers: {
          'apikey': supabaseKey,
          'Authorization': `Bearer ${supabaseKey}`
        },
        cache: 'no-store', // Disable caching completely
        next: {
          revalidate: 0 // Fetch latest state on every request
        }
      });
      
      if (res.ok) {
        const data = await res.json();
        const isMaintenance = data && data.length > 0 && data[0].maintenance_mode;
        
        console.log("PROXY CHECK: Maintenance Mode is", isMaintenance);

        if (isMaintenance) {
          // If maintenance mode is ON and user is NOT on /maintenance, redirect to /maintenance
          if (request.nextUrl.pathname !== '/maintenance') {
            const maintenanceUrl = new URL('/maintenance', request.url);
            return NextResponse.redirect(maintenanceUrl);
          }
        } else {
          // If maintenance mode is OFF and user is ON /maintenance, redirect to home
          if (request.nextUrl.pathname === '/maintenance') {
            const homeUrl = new URL('/', request.url);
            return NextResponse.redirect(homeUrl);
          }
        }
      }
    }
  } catch (error) {
    console.error('Error checking maintenance mode:', error);
    // On error, let the request pass through to avoid locking users out due to DB issues
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
