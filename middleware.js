export default function middleware(request) {
  // Skip authentication for static assets
  const { pathname } = new URL(request.url);
  
  if (pathname.startsWith('/_next/') || pathname.includes('.')) {
    //return new Response(null, { status: 200 });
    return; // 让请求继续
  }

  const apiKey = request.headers.get('x-api-key');
  
  if (!apiKey || apiKey !== process.env.API_KEY) {
    return new Response(
      JSON.stringify({ error: 'Unauthorized - API Key required' }),
      {
        status: 401,
        headers: { 'content-type': 'application/json' }
      }
    );
  }
  
  //return new Response(null, { status: 200 });
  // 验证通过，不返回任何内容让请求继续
  return;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)'
  ]
};
