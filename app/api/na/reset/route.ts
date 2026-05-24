// One-shot helper: explicitly delete the legacy HttpOnly na_vid / na_sid
// cookies (browsers won't let a non-HttpOnly Set-Cookie overwrite an
// existing HttpOnly cookie, so post-fix the legacy ones get stranded).
//
// Visit /api/na/reset once → both cookies deleted via Max-Age=0 → next
// page request → middleware writes them fresh as non-HttpOnly so the
// client SDK can read them.
//
// Safe to keep in the codebase: only deletes the analytics cookies,
// idempotent, no PII.

import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET() {
  const res = NextResponse.json({ ok: true, cleared: ['na_vid', 'na_sid'] });
  // Use raw header form so we can omit HttpOnly attribute deliberately —
  // a delete with HttpOnly works server-side regardless of the existing
  // cookie's flags, but we keep this delete cookie short-lived.
  res.cookies.delete('na_vid');
  res.cookies.delete('na_sid');
  return res;
}
