import { ConvertPreviewCard } from "@/components/hero/glass/convert-preview-card"
import { MoneyReceivedCard } from "@/components/hero/glass/money-received-card"

const PHONE_DESKTOP_INTRINSIC = { width: 919, height: 1024 } as const
const PHONE_MOBILE_INTRINSIC = { width: 774, height: 868 } as const

function visibleHeightForWidth(
  width: number,
  intrinsic: { width: number; height: number },
) {
  return width * (intrinsic.height / intrinsic.width)
}

/** Hero phone mockup — layout widths from Figma; heights follow asset aspect ratio. */
export const HERO_PHONE = {
  topDesktop: 565,
  topMobile: 522,
  width: 374.202,
  widthMobile: 257.869,
  heightDesktop: visibleHeightForWidth(374.202, PHONE_DESKTOP_INTRINSIC),
  heightMobile: visibleHeightForWidth(257.869, PHONE_MOBILE_INTRINSIC),
  bottomDesktop: 565 + visibleHeightForWidth(374.202, PHONE_DESKTOP_INTRINSIC),
  bottomMobile: 522 + visibleHeightForWidth(257.869, PHONE_MOBILE_INTRINSIC),
  desktopIntrinsic: PHONE_DESKTOP_INTRINSIC,
  mobileIntrinsic: PHONE_MOBILE_INTRINSIC,
  /** Horizontal gap between phone left edge and money card. */
  moneyCardGapLeft: 38.74,
  /** Money card top-right pivot sits this far above phone top (Figma). */
  moneyCardTopAbovePhone: 46.24,
  convertCardGapRight: 55.16,
  convertCardOffsetFromPhoneBottom: 55,
  portfolioCardTopDesktop: 120.79,
  portfolioCardRightDesktop: 29.77,
  portfolioCardTopMobile: 83.24,
  portfolioCardRightMobile: 20.52,
} as const

type HeroGlassCardsProps = {
  className?: string
}

export function HeroGlassCards({ className = "" }: HeroGlassCardsProps) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 hidden lg:block ${className}`}
      aria-hidden
    >
      <div
        className="absolute"
        style={{
          top: -HERO_PHONE.moneyCardTopAbovePhone,
          left: -HERO_PHONE.moneyCardGapLeft,
          transform: "translate(-100%, 0) rotate(-22.129deg)",
          transformOrigin: "100% 0%",
        }}
      >
        <MoneyReceivedCard />
      </div>

      <div
        className="absolute"
        style={{
          bottom: HERO_PHONE.convertCardOffsetFromPhoneBottom,
          left: `calc(100% + ${HERO_PHONE.convertCardGapRight}px)`,
        }}
      >
        <ConvertPreviewCard />
      </div>
    </div>
  )
}
