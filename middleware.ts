import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isPublicRoute = createRouteMatcher([
  '/',
  '/categories(.*)',
  '/about',
  '/contact',
  '/happy-customers',
  '/cart',
  '/sign-in(.*)'
]);

const isAdminRoute = createRouteMatcher(['/admin(.*)']);

export default clerkMiddleware(async (auth, req) => {
  // Allow public routes
  if (isPublicRoute(req)) {
    return NextResponse.next();
  }

  // Protect admin routes
  if (isAdminRoute(req)) {
    await auth.protect();
    
    // Check for admin role
    const session = await auth();
    if (session?.sessionClaims?.metadata?.role !== 'admin') {
      return NextResponse.redirect(new URL('/', req.url));
    }
  }

  // For all other routes, allow access if authenticated
  await auth.protect();
  return NextResponse.next();
});

export const config = {
  matcher: [
    '/((?!.+\\.[\\w]+$|_next).*)',
    '/',
    '/(api|trpc)(.*)',
  ],
};

