import { NextResponse } from 'next/server';

const allowedOrigins =
  process.env.NODE_ENV === 'production'
    ? [
        'https://www.art-ck.pl',
        'https://art-ck.pl',
        'https://witosa.onrender.com',
      ]
    : ['http://localhost:3000'];

export function middleware(request: Request) {
  const origin = request.headers.get('origin');

  if (origin && !allowedOrigins.includes(origin)) {
    //TODO: add also || !origin - to block also postman and others, so the condition would be: (origin && !allowedOrigins.includes(origin)) || !origin

    return new NextResponse(null, {
      status: 400,
      statusText: 'Bad request',
      headers: {
        'Content-Type': 'text/plain',
      },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/api/:path*'],
};
