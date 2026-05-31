'use client'

import { useState } from 'react'
import type { FaqGroup, FaqItem } from '@/components/faq/faq-data'

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
  panelId,
  isOpen,
  onToggle,
}: {
  item: FaqItem
  panelId: string
  isOpen: boolean
  onToggle: () => void
}) {
  return (
    <div>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={panelId}
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
        id={panelId}
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

function FaqGroupBlock({
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
        const panelId = `faq-panel-${group.category.replace(/\s+/g, '-').toLowerCase()}-${i}`
        return (
          <div key={key}>
            {i > 0 && (
              <div className="h-px w-full bg-[var(--color-holly-500)]" aria-hidden />
            )}
            <div className="px-4 lg:px-5">
              <FaqAccordionItem
                item={item}
                panelId={panelId}
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

type FaqAccordionProps = {
  groups: FaqGroup[]
}

export function FaqAccordion({ groups }: FaqAccordionProps) {
  const [openKey, setOpenKey] = useState<string | null>('Support::1')

  function handleToggle(key: string) {
    setOpenKey((prev) => (prev === key ? null : key))
  }

  return (
    <div className="flex w-full flex-col gap-4 self-stretch">
      {groups.map((group) => (
        <FaqGroupBlock
          key={group.category}
          group={group}
          openKey={openKey}
          onToggle={handleToggle}
        />
      ))}
    </div>
  )
}
