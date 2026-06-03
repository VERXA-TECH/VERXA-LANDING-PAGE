import Image from "next/image"
import { ASSETS } from "@/lib/assets"
import { HeroContent } from "@/components/hero/hero-content"
import { HeroGlassCards, HERO_PHONE } from "@/components/hero/hero-glass-cards"
import { TotalPortfolioValueCard } from "@/components/hero/glass/total-portfolio-value-card"
import { HeroTopNav } from "@/components/hero/hero-top-nav"
import { SectionBackgroundImage } from "@/components/ui/section-background-image"
import { SectionRadialGlow } from "@/components/ui/section-radial-glow"

export function HeroSection() {
  const mobile = HERO_PHONE.mobileIntrinsic
  const desktop = HERO_PHONE.desktopIntrinsic

  return (
    <section className="relative w-full overflow-hidden min-h-[812px] lg:min-h-[981px]">
      <SectionBackgroundImage
        src={ASSETS.hero.bgMobile}
        priority
        className="bg-[var(--color-background)] lg:hidden"
        imageClassName="object-cover object-[50%]"
      />
      <SectionBackgroundImage
        src={ASSETS.hero.bgDesktop}
        className="hidden bg-[var(--color-background)] lg:block"
        imageClassName="object-cover object-[50%]"
      />

      {/* <HeroConicGlow /> */}
      <SectionRadialGlow />

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
          src={ASSETS.hero.phoneMobile}
          alt=""
          width={mobile.width}
          height={mobile.height}
          priority
          sizes="(max-width: 1023px) 90vw, 0px"
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
          src={ASSETS.hero.phoneDesktop}
          alt=""
          width={desktop.width}
          height={desktop.height}
          sizes="(min-width: 1024px) 420px, 0px"
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
