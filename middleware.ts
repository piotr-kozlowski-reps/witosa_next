import { NextResponse } from 'next/server';

const allowedOrigins =
  process.env.NODE_ENV === 'production'
    ? ['https://www.art-ck.pl', 'https://art-ck.pl']
    : ['http://localhost:3000'];

export function middleware(request: Request) {
  const origin = request.headers.get('origin');
  console.log(origin);
  if (origin && !allowedOrigins.includes(origin)) {
    //TODO: add also || !origin - to block also postman and others, so the condition would be: (origin && !allowedOrigins.includes(origin)) || !origin
    console.log("I'm inside not allowed origins block");
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
  matcher: '/api/:path*',
};
