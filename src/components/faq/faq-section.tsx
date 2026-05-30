'use client'

import { useState } from 'react'
import { PageContainer } from '@/components/layout/page-container'

// ─── Data ────────────────────────────────────────────────────────────────────

type FaqItem = { q: string; a: string }
type FaqGroup = { category: string; items: FaqItem[] }

const FAQ_GROUPS: FaqGroup[] = [
  {
    category: 'Account',
    items: [
      {
        q: 'How do I change my email address?',
        a: 'You can update your email address in Settings → Account Details. Enter your new email and confirm the change via the verification link we send to your inbox.',
      },
      {
        q: 'Can I update my payment details online?',
        a: 'Yes. Go to Settings → Payment Methods. You can add, remove, or update your card and bank account details at any time.',
      },
      {
        q: 'What should I do if I forget my password?',
        a: "Tap 'Forgot Password' on the login screen. We'll send a secure reset link to your registered email address.",
      },
    ],
  },
  {
    category: 'Support',
    items: [
      {
        q: 'How can I contact customer support?',
        a: 'Reach us at hello@verxa.co or through the in-app live chat. Our team is available Monday – Friday, 8AM – 6PM WAT.',
      },
      {
        q: 'Do you provide weekend assistance?',
        a: 'We use bank-level encryption, two-factor authentication, and comply with major global standards such as PSD2, GDPR, and SOC 2.\n\nYour financial data is encrypted both at rest and in transit, and our systems are monitored 24/7 for unusual activity. We also undergo regular third-party audits to ensure the highest level of security and compliance.',
      },
      {
        q: 'Is live chat support available?',
        a: "Yes — live chat is available in-app during business hours. Outside of these hours, you can leave a message and we'll respond at the next opportunity.",
      },
      {
        q: 'Where can I find detailed guides?',
        a: 'Visit our Help Center for step-by-step articles, video tutorials, and FAQs on every feature.',
      },
    ],
  },
  {
    category: 'Payments',
    items: [
      {
        q: 'How long does it take to process a payment?',
        a: 'Most transfers complete within minutes. Depending on the corridor and method, some may take up to 1 business day.',
      },
      {
        q: 'Are refunds handled automatically?',
        a: "Failed or reversed transactions are refunded automatically to your wallet balance within 24 hours. Contact support if a refund hasn't arrived after that window.",
      },
    ],
  },
]

// ─── Sub-components ──────────────────────────────────────────────────────────

function FaqPill() {
  return (
    <div className="inline-flex h-7 items-center justify-center rounded-full border border-[#94BC27] px-3 backdrop-blur-[5.586px] [box-shadow:0_0_21.837px_0_rgba(233,211,84,0.40),0_0_21.837px_0_rgba(233,211,84,0.40)]">
      <span className="font-[family-name:var(--font-heuvel)] text-xs font-normal leading-4 tracking-[0.02em] text-[var(--color-primary-base)] [font-feature-settings:'liga'_off,'calt'_off]">
        FAQ GUIDE
      </span>
    </div>
  )
}

function PlusIcon({ open }: { open: boolean }) {
  return (
    <span
      aria-hidden
      className="flex size-4 shrink-0 items-center justify-center text-white transition-transform duration-200"
    >
      {open ? (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M1 7h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      ) : (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      )}
    </span>
  )
}

function FaqAccordionItem({
  item,
  isOpen,
  onToggle,
}: {
  item: FaqItem
  isOpen: boolean
  onToggle: () => void
}) {
  return (
    <div>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-4 py-4 text-left"
      >
        <span
          className={`font-[family-name:var(--font-heuvel)] text-sm font-normal leading-5 tracking-[-0.084px] transition-colors duration-150 [font-feature-settings:'liga'_off,'calt'_off] lg:text-base lg:leading-6 lg:tracking-[-0.096px] ${
            isOpen ? 'text-white' : 'text-white/90'
          }`}
        >
          {item.q}
        </span>
        <PlusIcon open={isOpen} />
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        }`}
        aria-hidden={!isOpen}
      >
        <div className="pb-4">
          {item.a.split('\n\n').map((para, i) => (
            <p
              key={i}
              className={`font-[family-name:var(--font-heuvel)] text-sm font-normal leading-5 tracking-[-0.084px] text-[var(--color-holly-100)] [font-feature-settings:'liga'_off,'calt'_off] lg:text-base lg:leading-6 ${
                i > 0 ? 'mt-3' : ''
              }`}
            >
              {para}
            </p>
          ))}
        </div>
      </div>
    </div>
  )
}

function FaqGroup({
  group,
  openKey,
  onToggle,
}: {
  group: FaqGroup
  openKey: string | null
  onToggle: (key: string) => void
}) {
  return (
    <div className="w-full self-stretch overflow-hidden rounded-[20px] bg-[rgba(33,59,53,0.34)]">
      <div className="px-4 pt-4 pb-1 lg:px-5">
        <span className="font-[family-name:var(--font-heuvel)] text-xs font-normal leading-4 text-[var(--color-holly-300)] [font-feature-settings:'liga'_off,'calt'_off]">
          {group.category}
        </span>
      </div>
      {group.items.map((item, i) => {
        const key = `${group.category}::${i}`
        return (
          <div key={key}>
            {i > 0 && (
              <div className="h-px w-full bg-[var(--color-holly-500)]" aria-hidden />
            )}
            <div className="px-4 lg:px-5">
              <FaqAccordionItem
                item={item}
                isOpen={openKey === key}
                onToggle={() => onToggle(key)}
              />
            </div>
          </div>
        )
      })}
    </div>
  )
}

// ─── Section ─────────────────────────────────────────────────────────────────

export function FaqSection() {
  const [openKey, setOpenKey] = useState<string | null>('Support::1')

  function handleToggle(key: string) {
    setOpenKey((prev) => (prev === key ? null : key))
  }

  return (
    <section id="faqs" className="w-full bg-[var(--color-background)] py-16 lg:py-24">
      <PageContainer>
        <div className="mx-auto flex w-full max-w-[736px] flex-col items-center gap-10 lg:gap-12">
          {/* Header */}
          <div className="flex flex-col items-center gap-4 text-center">
            <FaqPill />

            <h2 className="font-[family-name:var(--font-heuvel)] text-[32px] font-normal leading-10 tracking-[-0.16px] text-white [font-feature-settings:'liga'_off,'calt'_off] lg:text-[48px] lg:leading-[56px] lg:tracking-[-0.48px]">
              Get quick answers to{' '}
              <span className="text-[var(--color-primary-base)]">common questions</span>
            </h2>

            <p className="font-[family-name:var(--font-heuvel)] text-base font-medium leading-6 tracking-[-0.176px] text-[var(--color-holly-100)] [font-feature-settings:'liga'_off,'calt'_off] lg:text-lg lg:font-normal lg:leading-6 lg:tracking-[-0.27px]">
              Find solutions, explore resources, and resolve issues faster.
            </p>
          </div>

          {/* Accordion groups */}
          <div className="flex w-full flex-col gap-4 self-stretch">
            {FAQ_GROUPS.map((group) => (
              <FaqGroup
                key={group.category}
                group={group}
                openKey={openKey}
                onToggle={handleToggle}
              />
            ))}
          </div>

          {/* Footer CTA */}
          <p className="font-[family-name:var(--font-heuvel)] text-sm leading-5 tracking-[-0.084px] text-[var(--color-holly-300)] [font-feature-settings:'liga'_off,'calt'_off] lg:text-base lg:leading-6">
            Looking for something else?{' '}
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
