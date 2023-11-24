import { NextResponse } from 'next/server';
import { deleteCookie, getCookie } from 'cookies-next';
import type { NextRequest } from 'next/server';

import { parseJwt } from '@shared/lib/parsers';

const AUTH_COOKIE_NAME = process.env.NEXT_PUBLIC_AUTH_COOKIE_NAME!;

export function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const token = getCookie(AUTH_COOKIE_NAME, { req, res });
  const { pathname } = req.nextUrl;

  if (token) {
    const exp = parseJwt(token).exp * 1000;

    if (exp <= new Date().getTime()) {
      deleteCookie(AUTH_COOKIE_NAME, { res, req });

      if (pathname !== '/auth') {
        return NextResponse.redirect(new URL('/auth', req.url));
      }
    } else {
      if (pathname === '/auth') {
        return NextResponse.redirect(new URL('/dashboard', req.url));
      }

      return null;
    }
  }

  if (pathname !== '/auth') {
    return NextResponse.redirect(new URL('/auth', req.url));
  }

  return null;
}

export const config = {
  matcher: ['/((?!api|static|_next/static|_next/image|favicon.ico|privacy-policy|terms).*)'],
};
