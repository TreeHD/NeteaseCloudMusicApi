import { NextResponse } from 'next/server';

export function middleware(request) {
  // Skip authentication for static assets
  if (request.nextUrl.pathname.startsWith('/_next/') || 
      request.nextUrl.pathname.includes('.')) {
    return NextResponse.next();
  }

  const apiKey = request.headers.get('x-api-key');
  
  if (!apiKey || apiKey !== process.env.API_KEY) {
    return new NextResponse(
      JSON.stringify({ error: 'Unauthorized - API Key required' }),
      { 
        status: 401, 
        headers: { 'content-type': 'application/json' } 
      }
    );
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)'
  ]
};
