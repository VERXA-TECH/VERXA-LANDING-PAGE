import { ASSETS } from "@/lib/assets"
import { PageContainer } from "@/components/layout/page-container"
import { HeroIcon } from "@/components/hero/hero-icon"
import { SafeImage } from "@/components/ui/safe-image"
import { WaitlistForm } from "@/components/waitlist/waitlist-form"
import { SECTION_EYEBROW_PILL_SURFACE } from "@/components/ui/section-eyebrow-pill"

const WAITLIST_AVATAR_BACKGROUNDS = [
  "#EBEBEB",
  "#C0D5FF",
  "#FFECC0",
  "#C0EAFF",
] as const

function WaitlistBadge() {
  return (
    <div className="inline-flex items-center">
      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-l-[7.817px] bg-[var(--color-primary-base)] px-[5.568px] pt-[6px] pb-[5.227px] pr-[5.659px]">
        <HeroIcon
          src={ASSETS.icons.hero.flashlight}
          width={17}
          height={17}
          className="size-3.5 shrink-0 lg:size-[17px]"
        />
      </div>
      <div
        className={`flex h-7 items-center gap-1 rounded-r-full ${SECTION_EYEBROW_PILL_SURFACE}`}
      >
        <span className="text-center font-[family-name:var(--font-heuvel)] text-xs font-normal leading-4 text-[var(--color-primary-base)] [font-feature-settings:'liga'_off,'calt'_off]">
          JOIN THE WAITLIST
        </span>
      </div>
    </div>
  )
}

function WaitlistAvatars() {
  return (
    <div className="flex items-center pr-1">
      {ASSETS.hero.avatars.map((src, index) => (
        <div
          key={src}
          className="relative flex size-[27px] shrink-0 items-center justify-center overflow-hidden rounded-full border-[0.75px] border-[#171717] lg:size-[30px]"
          style={{
            marginLeft: index === 0 ? 0 : -8,
            backgroundColor: WAITLIST_AVATAR_BACKGROUNDS[index],
          }}
        >
          <SafeImage
            src={src}
            alt=""
            width={30}
            height={30}
            sizes="30px"
            className="size-full object-cover"
          />
        </div>
      ))}
    </div>
  )
}

export function HeroContent() {
  return (
    <PageContainer>
      <div className="mx-auto flex w-full max-w-[736px] flex-col items-center gap-6 self-stretch pt-6 lg:pt-10">
        <WaitlistBadge />

        <h1 className="w-full self-stretch text-center font-[family-name:var(--font-heuvel)] text-[32px] font-normal leading-10 tracking-[-0.16px] [font-feature-settings:'liga'_off,'calt'_off] lg:text-[48px] lg:leading-[56px] lg:tracking-[-0.48px]">
          <span className="text-white">Move money.</span>{" "}
          <span className="text-[var(--color-primary-base)]">Anywhere.</span>
        </h1>

        <p className="w-full self-stretch text-center font-[family-name:var(--font-heuvel)] text-base font-medium leading-6 tracking-[-0.176px] text-[var(--color-holly-100)] [font-feature-settings:'liga'_off,'calt'_off] lg:text-lg lg:font-normal lg:leading-6 lg:tracking-[-0.27px]">
          Convert crypto to naira, send funds globally, and pay your bills — all
          from one fast, secure platform built for Nigeria.
        </p>

        <div id="waitlist" className="w-full scroll-mt-28">
          <WaitlistForm source="hero" variant="hero" />
        </div>

        <div className="flex items-center gap-3">
          <WaitlistAvatars />
          <p className="font-[family-name:var(--font-heuvel)] text-base font-normal leading-6 tracking-[-0.176px] [font-feature-settings:'liga'_off,'calt'_off]">
            <span className="text-[var(--color-text-sub-600)]">— Join </span>
            <span className="text-[#D1D1D1]">
              +1,000 others on the waitlist
            </span>
          </p>
        </div>
      </div>
    </PageContainer>
  )
}
