import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request) {
    const token = await getToken({ req: request });
    const isAuthPage = request.nextUrl.pathname.startsWith('/auth');
    const isDashboard = request.nextUrl.pathname.startsWith('/dashboard');
    const isDomain = request.nextUrl.pathname.startsWith('/domain');

    // Redirect to dashboard if user is authenticated and trying to access auth pages
    if (isAuthPage && token) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    // Redirect to signin if user is not authenticated and trying to access protected pages
    if ((isDashboard || isDomain) && !token) {
        return NextResponse.redirect(new URL('/auth/signin', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard/:path*', '/auth/:path*', '/domain/:path*'],
};
