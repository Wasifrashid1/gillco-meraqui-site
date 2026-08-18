import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Intercept missing generatedHero images from /manus-storage/
  if (pathname.startsWith('/manus-storage/meraqui-hero-atmosphere_3f359ec9')) {
    // Redirect to the correct local file in the public folder
    return NextResponse.redirect(new URL('/meraqui-hero-atmosphere_3f359ec9.webp', request.url));
  }

  // Intercept missing pool courtyard images from /manus-storage/
  if (pathname.startsWith('/manus-storage/meraqui-pool-courtyard_c9f3cb09')) {
    // Redirect to the correct local file in the public folder
    return NextResponse.redirect(new URL('/meraqui-pool-courtyard_c9f3cb09.webp', request.url));
  }

  // Allow all other requests to proceed normally
  return NextResponse.next();
}

// Optionally, configure this middleware to match ONLY those two specific routes
// to keep it running very fast.
export const config = {
  matcher: [
    '/manus-storage/meraqui-hero-atmosphere_3f359ec9.jpg',
    '/manus-storage/meraqui-pool-courtyard_c9f3cb09.jpg',
  ],
};
