import { NextResponse } from 'next/server'
import {
  isValidWaitlistEmail,
  normalizeWaitlistEmail,
  signUpForWaitlist,
  type WaitlistSource,
} from '@/lib/waitlist'

const ALLOWED_SOURCES = new Set<WaitlistSource>(['hero', 'landing', 'cta'])

export async function POST(request: Request) {
  let body: unknown

  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  if (!body || typeof body !== 'object') {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  const { email: rawEmail, source: rawSource } = body as {
    email?: unknown
    source?: unknown
  }

  if (typeof rawEmail !== 'string') {
    return NextResponse.json({ error: 'Email is required.' }, { status: 400 })
  }

  const email = normalizeWaitlistEmail(rawEmail)

  if (!isValidWaitlistEmail(email)) {
    return NextResponse.json({ error: 'Enter a valid email address.' }, { status: 400 })
  }

  const source: WaitlistSource =
    typeof rawSource === 'string' && ALLOWED_SOURCES.has(rawSource as WaitlistSource)
      ? (rawSource as WaitlistSource)
      : 'landing'

  try {
    const result = await signUpForWaitlist(email, source)

    if (!result.ok) {
      return NextResponse.json({ error: result.error }, { status: 500 })
    }

    return NextResponse.json({
      ok: true,
      alreadyRegistered: result.alreadyRegistered,
      message: result.alreadyRegistered
        ? "You're already on the waitlist."
        : "You're on the list! We'll be in touch soon.",
    })
  } catch (error) {
    console.error('Waitlist API error:', error)
    return NextResponse.json(
      { error: 'Waitlist is unavailable right now. Please try again later.' },
      { status: 503 },
    )
  }
}
