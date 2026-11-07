import { NextResponse } from 'next/server';

/**
 * Contact endpoint. Validates on the server too, then hands off to your CRM/email.
 * Wire up e.g. Resend, HubSpot or Salesforce here.
 */
export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as Record<string, string> | null;
  if (!body) return NextResponse.json({ ok: false, error: 'Invalid JSON' }, { status: 400 });
  const { name = '', email = '', company = '', message = '' } = body;
  const valid = name.trim().length > 1 && /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) && company.trim().length > 1 && message.trim().length >= 10;
  if (!valid) return NextResponse.json({ ok: false, error: 'Validation failed' }, { status: 422 });
  // TODO: forward to CRM / transactional email provider
  return NextResponse.json({ ok: true });
}
