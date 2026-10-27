import type { Metadata } from "next"
import Link from "next/link"
import { ASSETS } from "@/lib/assets"
import { SafeImage } from "@/components/ui/safe-image"

// Success-page-only version. If backend goes with a token (plan #6, #7), this
// becomes confirming / confirmed / link expired states.
export const metadata: Metadata = {
  title: "You're on the waitlist — Verxa",
  robots: {
    index: false,
    follow: false,
  },
}

export default function WaitlistConfirmationPage() {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center gap-6 bg-[var(--color-background)] px-5 py-16 text-center">
      <SafeImage src={ASSETS.logo} alt="Verxa" width={48} height={48} />
      <h1 className="font-[family-name:var(--font-heuvel)] text-[32px] font-normal leading-10 tracking-[-0.16px] text-[var(--color-text-strong)] [font-feature-settings:'liga'_off,'calt'_off] lg:text-[48px] lg:leading-[56px] lg:tracking-[-0.48px]">
        You&apos;re on the waitlist
      </h1>
      <p className="max-w-[480px] font-[family-name:var(--font-heuvel)] text-base font-normal leading-6 tracking-[-0.176px] text-[var(--color-text-muted)] [font-feature-settings:'liga'_off,'calt'_off]">
        Thanks for joining. We&apos;ll email you as soon as Verxa is ready for
        you.
      </p>
      <Link
        href="/"
        className="inline-flex items-center justify-center rounded-[6px] border border-[#94BC27] bg-[#2C3308] px-5 py-3 font-[family-name:var(--font-heuvel)] text-base text-[#E5E8E7]"
      >
        Back to Verxa
      </Link>
    </main>
  )
}
