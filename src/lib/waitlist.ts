const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export type WaitlistSignupResult =
  | { ok: true; alreadyRegistered: boolean }
  | { ok: false; error: string }

const WAITLIST_SOURCE = 'hero' as const

export function normalizeWaitlistEmail(raw: string): string {
  return raw.trim().toLowerCase()
}

export function isValidWaitlistEmail(email: string): boolean {
  return EMAIL_PATTERN.test(email) && email.length <= 320
}

export async function signUpForWaitlist(email: string): Promise<WaitlistSignupResult> {
  const { getSupabaseAdmin } = await import('@/lib/supabase/admin')
  const supabase = getSupabaseAdmin()

  const { error } = await supabase.from('waitlist').insert({
    email,
    source: WAITLIST_SOURCE,
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
