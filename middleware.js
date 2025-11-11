// middleware.js (корень репозитория)
import { NextResponse } from 'next/server';

export const config = {
  matcher: '/:path*', // перехватываем все пути
};

export default function middleware(req) {
  const dst = 'https://baysulu-onefile-rtdl.vercel.app' + req.nextUrl.pathname + req.nextUrl.search + req.nextUrl.hash;
  return NextResponse.redirect(dst, 308);
}
