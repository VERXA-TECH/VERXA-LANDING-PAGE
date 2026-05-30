import Image from 'next/image'
import { PageContainer } from '@/components/layout/page-container'
import { HeroIcon } from '@/components/hero/hero-icon'

const WAITLIST_AVATARS = [
  { src: '/images/hero/avatars/avatar-1.png', bg: '#EBEBEB' },
  { src: '/images/hero/avatars/avatar-2.png', bg: '#C0D5FF' },
  { src: '/images/hero/avatars/avatar-3.png', bg: '#FFECC0' },
  { src: '/images/hero/avatars/avatar-4.png', bg: '#C0EAFF' },
] as const

function WaitlistBadge() {
  return (
    <div className="inline-flex items-center">
      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-l-[7.817px] bg-[var(--color-primary-base)] px-[5.568px] pt-[6px] pb-[5.227px] pr-[5.659px]">
        <HeroIcon
          src="/icons/hero/flashlight-fill.svg"
          width={17}
          height={17}
          className="size-3.5 shrink-0 lg:size-[17px]"
        />
      </div>
      <div className="flex h-7 items-center gap-1 rounded-r-full border border-[#94BC27] px-3 backdrop-blur-[5.586px] [box-shadow:0_0_21.837px_0_rgba(233,211,84,0.40),0_0_21.837px_0_rgba(233,211,84,0.40)]">
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
      {WAITLIST_AVATARS.map(({ src, bg }, index) => (
        <div
          key={src}
          className="relative flex size-[27px] shrink-0 items-center justify-center overflow-hidden rounded-full border-[0.75px] border-[#171717] lg:size-[30px]"
          style={{ marginLeft: index === 0 ? 0 : -8, backgroundColor: bg }}
        >
          <Image
            src={src}
            alt=""
            width={30}
            height={30}
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
        <span className="text-white">Move money.</span>{' '}
        <span className="text-[var(--color-primary-base)]">Anywhere.</span>
      </h1>

      <p className="w-full self-stretch text-center font-[family-name:var(--font-heuvel)] text-base font-medium leading-6 tracking-[-0.176px] text-[var(--color-holly-100)] [font-feature-settings:'liga'_off,'calt'_off] lg:text-lg lg:font-normal lg:leading-6 lg:tracking-[-0.27px]">
        Convert crypto to naira, send funds globally, and pay your bills — all from
        one fast, secure platform built for Nigeria.
      </p>

      <form
        className="flex h-14 w-full items-center gap-2 self-stretch rounded-[10px] border border-[var(--color-holly-600)] bg-[var(--color-input-bg)] py-2.5 pr-3 pl-0 shadow-[0_1px_2px_0_rgba(10,13,20,0.03)]"
        action="#waitlist"
      >
        <label htmlFor="hero-waitlist-email" className="sr-only">
          Email address
        </label>
        <input
          id="hero-waitlist-email"
          type="email"
          name="email"
          required
          autoComplete="email"
          placeholder="Your email address"
          className="min-w-0 flex-1 bg-transparent px-3 font-[family-name:var(--font-heuvel)] text-sm font-normal leading-5 tracking-[-0.084px] text-white placeholder:text-[var(--color-text-soft-400)] outline-none [font-feature-settings:'liga'_off,'calt'_off]"
        />
        <button
          type="submit"
          className="inline-flex h-[42px] shrink-0 items-center justify-center gap-2 rounded-[24px] border border-[#94BC27] bg-[#2C3308] px-5 py-3 font-[family-name:var(--font-heuvel)] text-sm font-normal leading-6 text-[#E5E8E7] lg:text-base"
        >
          Join waitlist
        </button>
      </form>

      <div className="flex items-center gap-3">
        <WaitlistAvatars />
        <p className="font-[family-name:var(--font-heuvel)] text-base font-normal leading-6 tracking-[-0.176px] [font-feature-settings:'liga'_off,'calt'_off]">
          <span className="text-[var(--color-text-sub-600)]">— Join </span>
          <span className="text-[#D1D1D1]">+1,000 others on the waitlist</span>
        </p>
      </div>
      </div>
    </PageContainer>
  )
}
