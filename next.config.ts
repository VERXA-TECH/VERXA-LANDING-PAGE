import type { NextConfig } from 'next'
import { PHASE_PRODUCTION_BUILD } from 'next/constants'

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, stale-while-revalidate=604800',
          },
        ],
      },
      {
        // Pages opened from security emails carry a token in the URL. Keep it
        // out of every Referer header, including those for the page's own
        // assets.
        source: '/security/:path*',
        headers: [{ key: 'Referrer-Policy', value: 'no-referrer' }],
      },
    ]
  },
}

// Next inlines NEXT_PUBLIC_* values at build time, so a deploy without this one
// ships a "This wasn't me" page whose button can't reach the backend, and the
// only sign is a console error in the victim's own browser. Failing the build
// keeps the last good deployment live instead. Next loads .env files before
// this runs, so .env.local counts.
export default function config(phase: string): NextConfig {
  if (
    phase === PHASE_PRODUCTION_BUILD &&
    !process.env.NEXT_PUBLIC_VERXA_API_BASE_URL?.trim()
  ) {
    throw new Error(
      'NEXT_PUBLIC_VERXA_API_BASE_URL is not set. The /security/not-me page needs it to reach the backend. Set it in .env.local or the Vercel project, then rebuild.',
    )
  }

  return nextConfig
}
