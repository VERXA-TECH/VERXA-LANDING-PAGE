import { HeroIcon } from '@/components/hero/hero-icon'
import { ASSETS } from '@/lib/assets'
import { GlassCard } from '@/components/ui/glass-card'

/** Figma hero scale (~94.4% of onboarding slide 1 card). */
const SCALE = 285.925 / 303

export function MoneyReceivedCard() {
  const iconSize = 20 * SCALE
  const flagSize = 36 * SCALE

  return (
    <GlassCard
      className="flex w-[285.925px] items-center justify-between p-[11.324px]"
      style={{
        borderRadius: 11.324,
        borderWidth: 0.944,
      }}
    >
      <div
        className="flex items-center"
        style={{ gap: 12 * SCALE }}
      >
        <div
          className="flex items-center justify-center bg-[var(--color-lemon-500)]"
          style={{
            borderRadius: 657.143 * SCALE,
            paddingTop: 8.05 * SCALE,
            paddingRight: 8.05 * SCALE,
            paddingBottom: 3.45 * SCALE,
            paddingLeft: 3.45 * SCALE,
          }}
        >
          <HeroIcon
            src={ASSETS.icons.hero.sendPlane}
            width={iconSize}
            height={iconSize}
          />
        </div>

        <div className="flex flex-col items-center text-center">
          <p
            className="font-[family-name:var(--font-heuvel)] text-[13.21px] font-normal leading-[18.87px] tracking-[-0.079px] text-[var(--color-text-muted)]"
            style={{ fontFeatureSettings: "'liga' off, 'calt' off" }}
          >
            Money Received
          </p>
          <p className="font-[family-name:var(--font-heuvel)] text-[16.99px] font-normal leading-[22.64px] tracking-[-0.255px] text-[var(--color-lemon-500)]">
            + £1,250.00
          </p>
          <p className="font-[family-name:var(--font-heuvel)] text-[13.21px] font-normal leading-[18.87px] tracking-[-0.079px] text-[var(--color-text-muted)]">
            from{' '}
            <span className="font-[family-name:var(--font-heuvel)] text-[13.21px] leading-[18.87px] tracking-[-0.079px] text-white">
              Michael O.
            </span>
          </p>
        </div>
      </div>

      <div
        className="relative shrink-0 overflow-hidden rounded-full"
        style={{ width: flagSize, height: flagSize }}
      >
        <HeroIcon
          src={ASSETS.icons.flags.uk}
          width={flagSize}
          height={flagSize}
          className="size-full object-cover"
        />
      </div>
    </GlassCard>
  )
}
