import { ASSETS } from '@/lib/assets'
import { PageContainer } from '@/components/layout/page-container'
import { SafeImage } from '@/components/ui/safe-image'

const SOCIAL_LINKS = [
  { href: '/', label: 'X (Twitter)', icon: ASSETS.footer.x },
  { href: '/', label: 'Instagram', icon: ASSETS.footer.instagram },
  { href: '/', label: 'LinkedIn', icon: ASSETS.footer.linkedin },
  { href: '/', label: 'Telegram', icon: ASSETS.footer.telegram },
] as const

export function FooterSection() {
  return (
    <footer className="flex w-full flex-col self-stretch bg-[var(--color-background)] pt-6 lg:pt-20">
      <PageContainer className="flex w-full flex-col">
        <div className="h-px w-full self-stretch bg-[#EBEBEB]" aria-hidden />

        <div className="mt-12 flex w-full flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex shrink-0 items-center gap-4">
            {SOCIAL_LINKS.map(({ href, label, icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="transition-opacity hover:opacity-80"
              >
                <SafeImage src={icon} alt="" width={20} height={20} className="size-5" />
              </a>
            ))}
          </div>

          <p className="w-full font-[family-name:var(--font-inter)] text-xs font-medium leading-4 text-[var(--color-holly-100)] [font-feature-settings:'ss11'_on,'liga'_off,'calt'_off] lg:w-auto lg:shrink-0 lg:text-right">
            2026 Verxa Technologies Ltd © All rights reserved.
          </p>
        </div>
      </PageContainer>

      <div
        className="h-[clamp(93px,12.5vw,232px)] w-full overflow-hidden"
        aria-hidden
      >
        <p className="text-center font-[family-name:var(--font-heuvel)] text-[clamp(149.678px,21vw,372px)] font-[550] leading-none tracking-[clamp(-3.892px,-0.256vw,-9.672px)] text-[rgba(98,117,112,0.26)] [font-feature-settings:'liga'_off,'calt'_off]">
          Verxa
        </p>
      </div>
    </footer>
  )
}
