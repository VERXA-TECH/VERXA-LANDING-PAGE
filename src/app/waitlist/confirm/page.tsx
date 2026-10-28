import type { Metadata } from "next"
import Link from "next/link"
import { ASSETS } from "@/lib/assets"
import { SafeImage } from "@/components/ui/safe-image"

// Backend confirms the email, then redirects here with
// ?status=confirmed | invalid | error. Unknown or missing values show "invalid".
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
  invalid: {
    title: "This link didn't work",
    description:
      "This link is invalid or has expired. If you already confirmed, you're all set. Otherwise, join again to get a new link.",
    cta: { href: "/#waitlist", label: "Join the waitlist" },
  },
  error: {
    title: "Something went wrong",
    description:
      "We couldn't confirm your email just now. Please try the link in your email again in a few minutes.",
    cta: { href: "/", label: "Back to Verxa" },
  },
} as const

function isConfirmStatus(value: unknown): value is keyof typeof CONTENT {
  return typeof value === "string" && Object.hasOwn(CONTENT, value)
}

type WaitlistConfirmPageProps = {
  searchParams: Promise<{ status?: string | string[] }>
}

export default async function WaitlistConfirmPage({
  searchParams,
}: WaitlistConfirmPageProps) {
  const { status } = await searchParams
  const content = CONTENT[isConfirmStatus(status) ? status : "invalid"]

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
