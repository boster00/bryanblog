/**
 * Nexus Analytics — bryanblog consumer middleware.
 *
 * Captures every (non-static, non-api) page request and fires a
 * fire-and-forget POST to the Nexus Analytics ingest endpoint with all
 * the server-side intel a tracker can know: identity cookies, request
 * details, Vercel geo headers, UA, referrer, query string.
 *
 * Cookies set:
 *   na_vid   visitor id, 2-year sliding
 *   na_sid   session id, 30-minute sliding (refreshes on each request)
 *
 * Required env (set in bryanblog's Vercel project):
 *   NEXUS_INGEST_URL    e.g. https://bosternexus.vercel.app/api/na/ingest
 *   NEXUS_INTERNAL_TOKEN  shared secret with nexus
 */

import { NextResponse, type NextRequest, type NextFetchEvent } from 'next/server';

const SITE = 'protectandgrow.blog';
const VISITOR_COOKIE = 'na_vid';
const SESSION_COOKIE = 'na_sid';
const VISITOR_MAX_AGE = 60 * 60 * 24 * 365 * 2; // 2 years
const SESSION_MAX_AGE = 60 * 30;                 // 30 minutes (sliding)

function uuid(): string {
  // edge-runtime-friendly
  return crypto.randomUUID();
}

function clientIp(req: NextRequest): string | null {
  return (
    req.headers.get('x-real-ip') ||
    req.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
    null
  );
}

export function middleware(req: NextRequest, event: NextFetchEvent) {
  const url = req.nextUrl;

  // identity cookies
  const existingVid = req.cookies.get(VISITOR_COOKIE)?.value;
  const existingSid = req.cookies.get(SESSION_COOKIE)?.value;
  const visitor_id = existingVid || uuid();
  const session_id = existingSid || uuid();
  const is_new_visitor = !existingVid;
  const is_new_session = !existingSid;

  const res = NextResponse.next();
  const cookieBase = {
    httpOnly: true,
    sameSite: 'lax' as const,
    secure: true,
    path: '/',
  };
  if (is_new_visitor) {
    res.cookies.set(VISITOR_COOKIE, visitor_id, { ...cookieBase, maxAge: VISITOR_MAX_AGE });
  }
  // Always refresh session expiry (sliding 30-min window).
  res.cookies.set(SESSION_COOKIE, session_id, { ...cookieBase, maxAge: SESSION_MAX_AGE });

  // Build ingest payload from headers + URL.
  const headers = Object.fromEntries(req.headers.entries());
  const payload = {
    site: SITE,
    event_type: 'pageview',
    path: url.pathname,
    query: url.search || null,
    full_url: url.toString(),
    method: req.method,

    visitor_id,
    session_id,
    is_new_visitor,
    is_new_session,

    referrer: req.headers.get('referer') || null,
    user_agent: req.headers.get('user-agent') || null,
    accept_language: req.headers.get('accept-language') || null,
    ip: clientIp(req),

    // Vercel geo headers (populated by Vercel edge infra in production)
    country:   req.headers.get('x-vercel-ip-country')           || null,
    region:    req.headers.get('x-vercel-ip-country-region')    || null,
    city:      req.headers.get('x-vercel-ip-city')              || null,
    latitude:  req.headers.get('x-vercel-ip-latitude')          || null,
    longitude: req.headers.get('x-vercel-ip-longitude')         || null,
    timezone:  req.headers.get('x-vercel-ip-timezone')          || null,

    vercel_id:      req.headers.get('x-vercel-id')              || null,
    edge_region:    req.headers.get('x-vercel-deployment-url')  || null,
    deployment_url: req.headers.get('x-vercel-deployment-url')  || null,

    headers,
  };

  const ingestUrl = process.env.NEXUS_INGEST_URL;
  const token = process.env.NEXUS_INTERNAL_TOKEN;
  if (ingestUrl && token) {
    // fire-and-forget via waitUntil so the request isn't killed when the
    // edge response returns, but the user response is NOT blocked on it.
    event.waitUntil(
      fetch(ingestUrl, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'x-na-token': token,
        },
        body: JSON.stringify(payload),
        // small timeout via AbortSignal so a stuck nexus can't pile up
        signal: AbortSignal.timeout(2000),
      }).catch(() => {/* fire-and-forget; never throw into the page */}),
    );
  }

  return res;
}

export const config = {
  // Skip static + framework + favicons. Track everything else.
  matcher: ['/((?!_next/static|_next/image|favicon\\.ico|robots\\.txt|sitemap\\.xml|.*\\..*).*)'],
};
