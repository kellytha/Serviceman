import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip middleware for auth routes (login, signup, logout)
  if (pathname.startsWith('/api/auth/')) {
    return NextResponse.next();
  }

  // Protected routes that require authentication
  const protectedRoutes = ['/dashboard', '/profile', '/book'];
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));

  // Apply middleware to protected routes and API routes (except auth)
  if (isProtectedRoute || pathname.startsWith('/api/')) {
    const token = request.cookies.get('serviceman_session')?.value;

    if (!token) {
      // For API routes, return JSON error
      if (pathname.startsWith('/api/')) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
      // For page routes, redirect to login
      return NextResponse.redirect(new URL('/login', request.url));
    }

    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      const { payload } = await jwtVerify(token, secret);
      // Token is valid, proceed
    } catch (error) {
      // For API routes, return JSON error
      if (pathname.startsWith('/api/')) {
        return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
      }
      // For page routes, redirect to login
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/api/:path*',
    '/dashboard/:path*',
    '/profile/:path*',
    '/book/:path*'
  ],
};