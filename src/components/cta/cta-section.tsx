import { ASSETS } from "@/lib/assets"
import { SafeImage } from "@/components/ui/safe-image"

/** cta-mark-desktop.png — mark sits lower-right on a tall artboard (1476×2256). */
const CTA_MARK_DESKTOP = {
  intrinsic: { width: 752, height: 752 },
  /** Clip frame on the right of the section (shows only the mark area). */
  clipWidth: 300,
  /** Large render so the mark isn’t dwarfed by artboard padding (~65% from left). */
  imageHeight: 752,
  /** Bleed past the section’s right edge (Figma crop). */
  bleedRight: 15,
  /** Align mark to section vertical center (artboard mark is below geometric center). */
  anchorTop: "50%",
  anchorTranslateY: "-45%",
} as const

export function CtaSection() {
  return (
    <section
      id="cta"
      className="relative flex w-full flex-col items-center justify-center gap-8 overflow-hidden bg-[var(--color-primary-base)] py-16 px-5 lg:px-[116px]"
    >
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center lg:hidden"
        aria-hidden
      >
        <div className="relative size-[374px] shrink-0">
          <SafeImage
            src={ASSETS.cta.bgMark}
            alt=""
            fill
            sizes="374px"
            className="object-cover object-center"
          />
        </div>
      </div>

      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-0 hidden overflow-hidden lg:block"
        style={{ width: CTA_MARK_DESKTOP.clipWidth }}
        aria-hidden
      >
        <SafeImage
          src={ASSETS.cta.bgMarkDesktop}
          alt=""
          width={CTA_MARK_DESKTOP.intrinsic.width}
          height={CTA_MARK_DESKTOP.intrinsic.height}
          sizes="1200px"
          className="absolute max-w-none"
          style={{
            height: CTA_MARK_DESKTOP.imageHeight,
            width: "auto",
            right: -CTA_MARK_DESKTOP.bleedRight,
            top: CTA_MARK_DESKTOP.anchorTop,
            transform: `translateY(${CTA_MARK_DESKTOP.anchorTranslateY})`,
          }}
        />
      </div>

      <div className="relative z-10 flex w-full max-w-[1512px] flex-col items-center justify-center gap-8">
        <h2 className="w-full self-stretch text-center font-[family-name:var(--font-heuvel)] text-[32px] font-normal leading-10 tracking-[-0.16px] text-[var(--color-holly-700)] [font-feature-settings:'liga'_off,'calt'_off] lg:text-[48px] lg:leading-[56px] lg:tracking-[-0.48px]">
          Ready to move your money, anywhere?
        </h2>

        <p className="w-full max-w-[668px] text-center font-[family-name:var(--font-heuvel)] text-base font-normal leading-6 tracking-[-0.176px] text-[var(--color-holly-600)] [font-feature-settings:'liga'_off,'calt'_off] lg:text-lg lg:leading-6 lg:tracking-[-0.27px]">
          Join thousands of Nigerians already using Verxa to convert crypto,
          send internationally, and pay bills — all in one app.
        </p>

        <a
          href="#top"
          className="inline-flex w-full max-w-[320px] items-center justify-center gap-2 rounded-[24px] border border-[#94BC27] bg-[var(--color-holly-700)] px-5 py-3 font-[family-name:var(--font-heuvel)] text-base font-normal leading-6 text-white transition-opacity hover:opacity-90 [font-feature-settings:'liga'_off,'calt'_off]"
        >
          Join waitlist
        </a>
      </div>
    </section>
  )
}
