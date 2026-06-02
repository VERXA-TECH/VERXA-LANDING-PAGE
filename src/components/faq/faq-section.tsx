import { PageContainer } from "@/components/layout/page-container"
import { FaqAccordion } from "@/components/faq/faq-accordion"
import { FAQ_GROUPS } from "@/components/faq/faq-data"
import { SECTION_EYEBROW_PILL_SURFACE } from "@/components/ui/section-eyebrow-pill"

function FaqPill() {
  return (
    <div
      className={`inline-flex h-7 items-center justify-center rounded-full ${SECTION_EYEBROW_PILL_SURFACE}`}
    >
      <span className="font-[family-name:var(--font-heuvel)] text-xs font-normal leading-4 tracking-[0.02em] text-[var(--color-primary-base)] [font-feature-settings:'liga'_off,'calt'_off]">
        FAQ GUIDE
      </span>
    </div>
  )
}

export function FaqSection() {
  return (
    <section
      id="faqs"
      className="w-full bg-[var(--color-background)] py-16 lg:py-24"
    >
      <PageContainer>
        <div className="mx-auto flex w-full max-w-[736px] flex-col items-center gap-10 lg:gap-12">
          <div className="flex flex-col items-center gap-4 text-center">
            <FaqPill />

            <h2 className="font-[family-name:var(--font-heuvel)] text-[32px] font-normal leading-10 tracking-[-0.16px] text-white [font-feature-settings:'liga'_off,'calt'_off] lg:text-[48px] lg:leading-[56px] lg:tracking-[-0.48px]">
              Get quick answers to{" "}
              <span className="text-[var(--color-primary-base)]">
                common questions
              </span>
            </h2>

            <p className="font-[family-name:var(--font-heuvel)] text-base font-medium leading-6 tracking-[-0.176px] text-[var(--color-holly-100)] [font-feature-settings:'liga'_off,'calt'_off] lg:text-lg lg:font-normal lg:leading-6 lg:tracking-[-0.27px]">
              Find solutions, explore resources, and resolve issues faster.
            </p>
          </div>

          <FaqAccordion groups={FAQ_GROUPS} />

          <p className="font-[family-name:var(--font-heuvel)] text-sm leading-5 tracking-[-0.084px] text-[var(--color-holly-300)] [font-feature-settings:'liga'_off,'calt'_off] lg:text-base lg:leading-6">
            Looking for something else?{" "}
            <a
              href="mailto:hello@verxa.co"
              className="font-medium text-[var(--color-primary-base)] underline underline-offset-2 transition-opacity hover:opacity-80"
            >
              hello@verxa.co
            </a>
          </p>
        </div>
      </PageContainer>
    </section>
  )
}
