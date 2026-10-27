const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export type WaitlistSignupResult =
  | { ok: true; alreadyRegistered: boolean }
  | { ok: false; error: string }

export const WAITLIST_SOURCES = ['landing-hero', 'landing-cta'] as const
export type WaitlistSource = (typeof WAITLIST_SOURCES)[number]

// Generous because the Heroku backend can take several seconds to wake up.
const BACKEND_TIMEOUT_MS = 10000

export function isWaitlistSource(value: unknown): value is WaitlistSource {
  return WAITLIST_SOURCES.includes(value as WaitlistSource)
}

export function normalizeWaitlistEmail(raw: string): string {
  return raw.trim().toLowerCase()
}

export function isValidWaitlistEmail(email: string): boolean {
  return EMAIL_PATTERN.test(email) && email.length <= 320
}

export async function signUpForWaitlist(
  email: string,
  source: WaitlistSource,
): Promise<WaitlistSignupResult> {
  const { getSupabaseAdmin } = await import('@/lib/supabase/admin')
  const supabase = getSupabaseAdmin()

  const { error } = await supabase.from('waitlist').insert({
    email,
    source,
  })

  if (!error) {
    return { ok: true, alreadyRegistered: false }
  }

  if (error.code === '23505') {
    return { ok: true, alreadyRegistered: true }
  }

  console.error('Waitlist signup failed:', error.message, error.code)
  const devHint =
    process.env.NODE_ENV === 'development' &&
    (error.code === '42501' || error.message.includes('permission denied'))
      ? ' Run supabase/waitlist.sql in Supabase Dashboard → SQL Editor.'
      : ''
  return {
    ok: false,
    error:
      process.env.NODE_ENV === 'development'
        ? `${error.message}${devHint}`
        : 'Something went wrong. Please try again.',
  }
}

export type BackendWaitlistRequest = {
  email: string
  captchaToken: string
  source: WaitlistSource
  website: string
}

export type BackendWaitlistResult =
  | { status: 'not-configured' }
  | { status: 'ok'; alreadyRegistered: boolean }
  // Backend said no (bad captcha, invalid email, …): show the visitor an error.
  | { status: 'rejected'; error: string }
  // Backend down, timed out, 5xx, or our setup is wrong (401/403, e.g. CORS):
  // don't blame the visitor or show them the details.
  | { status: 'unavailable' }

// TODO: confirm status codes + body shapes with backend (plan #2b).
// Assumed for now: 2xx = joined, 409 = already registered, other 4xx = rejected.
export async function sendToBackendWaitlist(
  payload: BackendWaitlistRequest,
): Promise<BackendWaitlistResult> {
  const baseUrl = process.env.VERXA_API_BASE_URL
  if (!baseUrl) {
    return { status: 'not-configured' }
  }

  let response: Response
  try {
    response = await fetch(`${baseUrl.replace(/\/+$/, '')}/waitlist`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Backend rejects requests without an allowed Origin, and server-side
        // fetch doesn't send one.
        Origin: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.verxa.io',
      },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(BACKEND_TIMEOUT_MS),
      cache: 'no-store',
    })
  } catch (error) {
    console.error('Waitlist backend request failed:', error)
    return { status: 'unavailable' }
  }

  if (response.ok) {
    return { status: 'ok', alreadyRegistered: false }
  }

  if (response.status === 409) {
    return { status: 'ok', alreadyRegistered: true }
  }

  const body = (await response.json().catch(() => null)) as {
    message?: unknown
    error?: unknown
  } | null
  console.error('Waitlist backend responded with', response.status, body)

  if (response.status >= 500 || response.status === 401 || response.status === 403) {
    return { status: 'unavailable' }
  }

  const backendMessage =
    typeof body?.message === 'string'
      ? body.message
      : typeof body?.error === 'string'
        ? body.error
        : null

  return {
    status: 'rejected',
    error: backendMessage ?? 'We couldn\'t verify your signup. Please try again.',
  }
}
