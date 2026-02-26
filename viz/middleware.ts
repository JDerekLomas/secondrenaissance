import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const CANONICAL_HOST = 'www.secondrenaissance.ai'

export function middleware(request: NextRequest) {
  const host = request.headers.get('host') || ''

  // Redirect non-canonical hosts to the canonical domain
  if (host !== CANONICAL_HOST && host !== 'localhost:3000' && !host.startsWith('localhost')) {
    const url = new URL(request.url)
    url.host = CANONICAL_HOST
    url.protocol = 'https'
    url.port = ''
    return NextResponse.redirect(url, 301)
  }

  return NextResponse.next()
}

export const config = {
  // Run on all paths except static files and API routes
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js|woff|woff2)).*)',
  ],
}
