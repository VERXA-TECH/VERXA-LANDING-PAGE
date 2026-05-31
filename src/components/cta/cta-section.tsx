const CTA_BG_MARK = '/images/cta-bg-mark.png'

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
        <div
          className="size-[374px] shrink-0 bg-[var(--color-primary-base)] bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('${CTA_BG_MARK}')` }}
        />
      </div>

      <div className="relative z-10 flex w-full max-w-[1512px] flex-col items-center justify-center gap-8">
        <h2 className="w-full self-stretch text-center font-[family-name:var(--font-heuvel)] text-[32px] font-normal leading-10 tracking-[-0.16px] text-[var(--color-holly-700)] [font-feature-settings:'liga'_off,'calt'_off] lg:text-[48px] lg:leading-[56px] lg:tracking-[-0.48px]">
          Ready to move your money, anywhere?
        </h2>

        <p className="w-full max-w-[668px] text-center font-[family-name:var(--font-heuvel)] text-base font-normal leading-6 tracking-[-0.176px] text-[var(--color-holly-600)] [font-feature-settings:'liga'_off,'calt'_off] lg:text-lg lg:leading-6 lg:tracking-[-0.27px]">
          Join thousands of Nigerians already using Verxa to convert crypto, send
          internationally, and pay bills — all in one app.
        </p>

        <a
          href="#waitlist"
          className="inline-flex w-full max-w-[320px] items-center justify-center gap-2 rounded-[24px] border border-[#94BC27] bg-[var(--color-holly-700)] px-5 py-3 font-[family-name:var(--font-heuvel)] text-base font-normal leading-6 text-white transition-opacity hover:opacity-90 [font-feature-settings:'liga'_off,'calt'_off]"
        >
          Join waitlist
        </a>
      </div>
    </section>
  )
}
