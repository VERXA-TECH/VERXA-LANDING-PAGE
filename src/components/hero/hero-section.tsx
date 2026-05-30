import Image from 'next/image'
import { HeroContent } from '@/components/hero/hero-content'
import { HeroGlassCards, HERO_PHONE } from '@/components/hero/hero-glass-cards'
import { TotalPortfolioValueCard } from '@/components/hero/glass/total-portfolio-value-card'
import { HeroTopNav } from '@/components/hero/hero-top-nav'

const HERO_BG_DESKTOP = '/images/Hero.png'
const HERO_BG_MOBILE = '/images/Hero Section mobile.png'
const PHONE_MOCKUP_DESKTOP =
  '/images/Free Transparent iPhone 17e Mockup (Mockuuups Studio).png'
const PHONE_MOCKUP_MOBILE =
  '/images/Free Transparent iPhone 17e Mockup for mobile view.png'

export function HeroSection() {
  const mobile = HERO_PHONE.mobileIntrinsic
  const desktop = HERO_PHONE.desktopIntrinsic

  return (
    <section className="relative w-full overflow-hidden min-h-[812px] lg:min-h-[981px]">
      <div
        className="pointer-events-none absolute inset-0 bg-[lightgray] bg-cover bg-[50%] bg-no-repeat lg:hidden"
        style={{ backgroundImage: `url('${HERO_BG_MOBILE}')` }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 hidden bg-[lightgray] bg-cover bg-[50%] bg-no-repeat lg:block"
        style={{ backgroundImage: `url('${HERO_BG_DESKTOP}')` }}
        aria-hidden
      />

      {/* Mobile phone — 522px from viewport top; no glass cards */}
      <div
        className="pointer-events-none absolute left-1/2 z-[2] -translate-x-1/2 lg:hidden"
        style={{
          top: HERO_PHONE.topMobile,
          width: HERO_PHONE.widthMobile,
          height: HERO_PHONE.heightMobile,
        }}
        aria-hidden
      >
        <Image
          src={PHONE_MOCKUP_MOBILE}
          alt=""
          width={mobile.width}
          height={mobile.height}
          priority
          className="size-full object-contain object-top"
        />
        <div
          className="absolute z-[2]"
          style={{
            top: HERO_PHONE.portfolioCardTopMobile,
            right: HERO_PHONE.portfolioCardRightMobile,
          }}
        >
          <TotalPortfolioValueCard />
        </div>
      </div>

      {/* Desktop phone + glass cards */}
      <div
        className="pointer-events-none absolute left-1/2 z-[2] hidden -translate-x-1/2 lg:block"
        style={{
          top: HERO_PHONE.topDesktop,
          width: HERO_PHONE.width,
          height: HERO_PHONE.heightDesktop,
        }}
        aria-hidden
      >
        <Image
          src={PHONE_MOCKUP_DESKTOP}
          alt=""
          width={desktop.width}
          height={desktop.height}
          priority
          className="relative z-[1] size-full object-contain object-top"
        />
        <div
          className="absolute z-[2]"
          style={{
            top: HERO_PHONE.portfolioCardTopDesktop,
            right: HERO_PHONE.portfolioCardRightDesktop,
          }}
        >
          <TotalPortfolioValueCard />
        </div>
        <HeroGlassCards className="z-[2]" />
      </div>

      <div className="relative z-10">
        <HeroTopNav />
        <HeroContent />
      </div>
    </section>
  )
}
