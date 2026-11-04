import type { Metadata } from "next"
import { ASSETS } from "@/lib/assets"
import { isNotMeToken } from "@/lib/security-report"
import { SafeImage } from "@/components/ui/safe-image"
import { SecureAccountPanel } from "@/components/security/secure-account-panel"

// Opened from the "This wasn't me" link in the backend's PIN-changed email:
// `${APP_URL}/security/not-me?token=<64 hex>`. The panel asks before sending
// anything.
export const metadata: Metadata = {
  title: "Secure your account — Verxa",
}

type NotMePageProps = {
  searchParams: Promise<{ token?: string | string[] }>
}

export default async function NotMePage({ searchParams }: NotMePageProps) {
  const { token } = await searchParams

  return (
    <main className="flex min-h-svh flex-col items-center justify-center gap-6 bg-[var(--color-background)] px-5 py-16 text-center">
      <SafeImage src={ASSETS.logo} alt="Verxa" width={48} height={48} />
      <SecureAccountPanel token={isNotMeToken(token) ? token : null} />
    </main>
  )
}
