import { NextResponse } from 'next/server'
import {
  isValidWaitlistEmail,
  normalizeWaitlistEmail,
  signUpForWaitlist,
} from '@/lib/waitlist'

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

  const { email: rawEmail } = body as { email?: unknown }

  if (typeof rawEmail !== 'string') {
    return NextResponse.json({ error: 'Email is required.' }, { status: 400 })
  }

  const email = normalizeWaitlistEmail(rawEmail)

  if (!isValidWaitlistEmail(email)) {
    return NextResponse.json({ error: 'Enter a valid email address.' }, { status: 400 })
  }

  try {
    const result = await signUpForWaitlist(email)

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
