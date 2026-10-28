import type { Metadata } from "next"
import Link from "next/link"
import { ASSETS } from "@/lib/assets"
import { SafeImage } from "@/components/ui/safe-image"

// Backend confirms the email, then redirects here with ?status=…
// Only "confirmed" is known so far; anything else gets the "link didn't work" state.
// TODO: confirm the other status values with backend (e.g. expired, invalid).
export const metadata: Metadata = {
  title: "Confirm your email — Verxa",
  robots: {
    index: false,
    follow: false,
  },
}

const CONTENT = {
  confirmed: {
    title: "You're on the waitlist",
    description:
      "Your email is confirmed. We'll email you as soon as Verxa is ready for you.",
    cta: { href: "/", label: "Back to Verxa" },
  },
  failed: {
    title: "This link didn't work",
    description:
      "It may have expired or already been used. Join the waitlist again and we'll send you a new link.",
    cta: { href: "/#waitlist", label: "Join the waitlist" },
  },
} as const

type WaitlistConfirmPageProps = {
  searchParams: Promise<{ status?: string | string[] }>
}

export default async function WaitlistConfirmPage({
  searchParams,
}: WaitlistConfirmPageProps) {
  const { status } = await searchParams
  const content = status === "confirmed" ? CONTENT.confirmed : CONTENT.failed

  return (
    <main className="flex min-h-svh flex-col items-center justify-center gap-6 bg-[var(--color-background)] px-5 py-16 text-center">
      <SafeImage src={ASSETS.logo} alt="Verxa" width={48} height={48} />
      <h1 className="font-[family-name:var(--font-heuvel)] text-[32px] font-normal leading-10 tracking-[-0.16px] text-[var(--color-text-strong)] [font-feature-settings:'liga'_off,'calt'_off] lg:text-[48px] lg:leading-[56px] lg:tracking-[-0.48px]">
        {content.title}
      </h1>
      <p className="max-w-[480px] font-[family-name:var(--font-heuvel)] text-base font-normal leading-6 tracking-[-0.176px] text-[var(--color-text-muted)] [font-feature-settings:'liga'_off,'calt'_off]">
        {content.description}
      </p>
      <Link
        href={content.cta.href}
        className="inline-flex items-center justify-center rounded-[6px] border border-[#94BC27] bg-[#2C3308] px-5 py-3 font-[family-name:var(--font-heuvel)] text-base text-[#E5E8E7]"
      >
        {content.cta.label}
      </Link>
    </main>
  )
}
