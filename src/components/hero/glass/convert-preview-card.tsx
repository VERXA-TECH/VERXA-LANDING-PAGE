import { HeroIcon } from "@/components/hero/hero-icon"
import { ASSETS } from "@/lib/assets"
import { GlassCard } from "@/components/ui/glass-card"

/** Figma hero scale (~94.4% of onboarding convert card). */
const SCALE = 7.549 / 8

const card = {
  width: 248 * SCALE,
  height: 192 * SCALE,
  padding: 7.549,
  gap: 6.74,
  contentGap: 8 * SCALE,
  borderRadius: 6.74,
  borderWidth: 0.562,
  sourceRow: {
    height: 64.082 * SCALE,
    paddingVertical: 4.747 * SCALE,
    paddingHorizontal: 7.12 * SCALE,
    borderRadius: 7.12 * SCALE,
    borderWidth: 0.593 * SCALE,
  },
  currencyPill: {
    borderRadius: 7.433 * SCALE,
    paddingHorizontal: 5 * SCALE,
    paddingVertical: 3 * SCALE,
    gap: 3 * SCALE,
    iconSize: 10 * SCALE,
    chevronSize: 8 * SCALE,
  },
  swapButton: {
    width: 20 * SCALE,
    height: 20 * SCALE,
    borderRadius: 39.67 * SCALE,
    iconSize: 12 * SCALE,
  },
  infoIconSize: 10 * SCALE,
} as const

function CurrencyPill({ iconSrc, code }: { iconSrc: string; code: string }) {
  const pill = card.currencyPill
  return (
    <div
      className="flex items-center bg-[rgba(33,59,53,0.4)]"
      style={{
        borderRadius: pill.borderRadius,
        padding: `${pill.paddingVertical}px ${pill.paddingHorizontal}px`,
        gap: pill.gap,
      }}
    >
      <HeroIcon src={iconSrc} width={pill.iconSize} height={pill.iconSize} />
      <span className="font-[family-name:var(--font-inter)] text-[5.6px] uppercase leading-[8.96px] text-white">
        {code}
      </span>
      <HeroIcon
        src={ASSETS.icons.hero.arrowDown}
        width={pill.chevronSize}
        height={pill.chevronSize}
      />
    </div>
  )
}

type ConvertRowProps = {
  variant: "source" | "target"
  label: string
  balanceText: string
  amount: string
  iconSrc: string
  currencyCode: string
}

function ConvertRow({
  variant,
  label,
  balanceText,
  amount,
  iconSrc,
  currencyCode,
}: ConvertRowProps) {
  const row = card.sourceRow
  const amountColor =
    variant === "source"
      ? "text-[var(--color-lemon-50)]"
      : "text-[var(--color-lemon-500)]"

  return (
    <div
      className="flex flex-col justify-between bg-[rgba(33,59,53,0.16)]"
      style={{
        height: row.height,
        padding: `${row.paddingVertical}px ${row.paddingHorizontal}px`,
        borderRadius: row.borderRadius,
        ...(variant === "source" && {
          borderWidth: row.borderWidth,
          borderStyle: "solid",
          borderColor: "var(--color-primary-base)",
        }),
      }}
    >
      <div className="flex items-center justify-between">
        <span className="font-[family-name:var(--font-heuvel)] text-[8.96px] font-normal leading-[13.44px] tracking-[-0.098px] text-[var(--color-text-sub-600)]">
          {label}
        </span>
        <span className="font-[family-name:var(--font-heuvel)] text-[8.96px] font-normal leading-[13.44px] tracking-[-0.098px] text-[var(--color-text-sub-600)]">
          {balanceText}
        </span>
      </div>
      <div className="flex items-center justify-between">
        <CurrencyPill iconSrc={iconSrc} code={currencyCode} />
        <span
          className={`font-[family-name:var(--font-heuvel)] text-[22.39px] font-normal leading-[26.87px] tracking-[-0.224px] ${amountColor}`}
        >
          {amount}
        </span>
      </div>
    </div>
  )
}

export function ConvertPreviewCard() {
  const swap = card.swapButton
  const swapTop = card.sourceRow.height + card.contentGap / 2

  return (
    <GlassCard
      className="inline-flex flex-col items-center"
      style={{
        width: card.width,
        height: card.height,
        padding: card.padding,
        gap: card.gap,
        borderRadius: card.borderRadius,
        borderWidth: card.borderWidth,
      }}
    >
      <p className="self-start font-[family-name:var(--font-heuvel)] text-[10.11px] font-normal leading-[13.48px] tracking-[-0.152px] text-white">
        Convert
      </p>

      <div className="relative flex flex-1 flex-col justify-center self-stretch">
        <div
          className="relative flex flex-col"
          style={{ gap: card.contentGap }}
        >
          <ConvertRow
            variant="source"
            label="Convert"
            balanceText="Balance: 20.1 USDT"
            amount="5.12 USDT"
            iconSrc={ASSETS.icons.hero.tether}
            currencyCode="USDT"
          />
          <ConvertRow
            variant="target"
            label="To"
            balanceText="Balance: ₦847,500"
            amount="₦200,000"
            iconSrc={ASSETS.icons.flags.nigeria}
            currencyCode="NGN"
          />

          <div
            className="absolute left-1/2 z-[1] flex items-center justify-center bg-[var(--color-holly-500)]"
            style={{
              top: swapTop,
              width: swap.width,
              height: swap.height,
              borderRadius: swap.borderRadius,
              transform: `translate(-50%, -50%)`,
            }}
          >
            <HeroIcon
              src={ASSETS.icons.hero.arrowUpDown}
              width={swap.iconSize}
              height={swap.iconSize}
            />
          </div>
        </div>
      </div>

      <div className="flex items-start gap-1 self-start">
        <HeroIcon
          src={ASSETS.icons.hero.information}
          width={card.infoIconSize}
          height={card.infoIconSize}
        />
        <p className="font-[family-name:var(--font-heuvel)] text-[8.96px] font-normal leading-[13.44px] tracking-[-0.098px] text-[var(--color-text-sub-600)]">
          Indicative rate: <span className="text-white">₦1 = 1,523 USDT</span>
        </p>
      </div>
    </GlassCard>
  )
}
