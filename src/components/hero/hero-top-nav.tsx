'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { PageContainer } from '@/components/layout/page-container'

const NAV_LINKS = [
  { href: '#features', label: 'Features' },
  { href: '#corridors', label: 'Corridors' },
  { href: '#assets', label: 'Assets' },
  { href: '#faqs', label: 'FAQs' },
] as const

function NavLink({
  href,
  label,
  onNavigate,
}: {
  href: string
  label: string
  onNavigate?: () => void
}) {
  return (
    <Link
      href={href}
      onClick={onNavigate}
      className="font-[family-name:var(--font-heuvel)] text-[14px] font-normal leading-5 tracking-[-0.084px] text-white [font-feature-settings:'liga'_off,'calt'_off]"
    >
      {label}
    </Link>
  )
}

function ContactUsButton({
  className = '',
  onNavigate,
}: {
  className?: string
  onNavigate?: () => void
}) {
  return (
    <Link
      href="#contact"
      onClick={onNavigate}
      className={`inline-flex h-10 items-center justify-center gap-1 rounded-full px-2.5 font-[family-name:var(--font-inter)] text-[14px] font-medium leading-5 tracking-normal text-white ${className}`}
    >
      Contact Us
    </Link>
  )
}

function DownloadButton({
  className = '',
  onNavigate,
}: {
  className?: string
  onNavigate?: () => void
}) {
  return (
    <Link
      href="#download"
      onClick={onNavigate}
      className={`inline-flex h-10 shrink-0 items-center justify-center gap-1 rounded-full bg-[var(--color-primary-base)] px-2.5 font-[family-name:var(--font-inter)] text-[14px] font-medium leading-5 tracking-normal text-[var(--color-holly-600)] lg:w-[150px] ${className}`}
    >
      Download App
    </Link>
  )
}

function VerxaLogo() {
  return (
    <Link href="/" className="flex h-[38px] w-[77px] shrink-0 items-center gap-[2.974px]">
      <Image
        src="/images/verxa_logo.png"
        alt="Verxa"
        width={77}
        height={38}
        priority
        className="h-[38px] w-[77px] object-contain object-left"
      />
    </Link>
  )
}

function MobileMenuOverlay({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col bg-[var(--color-background)] lg:hidden"
      role="dialog"
      aria-modal="true"
      aria-label="Navigation menu"
    >
      <PageContainer className="flex items-center justify-between py-4">
        <VerxaLogo />
        <button
          type="button"
          onClick={onClose}
          className="flex size-10 items-center justify-center"
          aria-label="Close menu"
        >
          <Image src="/icons/hero/close-fill.svg" alt="" width={24} height={24} />
        </button>
      </PageContainer>

      <nav className="flex flex-1 flex-col px-5">
        <ul className="mt-8 flex flex-col gap-8">
          {NAV_LINKS.map((item) => (
            <li key={item.href}>
              <NavLink
                href={item.href}
                label={item.label}
                onNavigate={onClose}
              />
            </li>
          ))}
        </ul>

        <div className="mt-auto flex flex-col items-center gap-8 pb-10">
          <ContactUsButton
            className="w-full justify-center"
            onNavigate={onClose}
          />
          <DownloadButton
            className="w-full max-w-none"
            onNavigate={onClose}
          />
        </div>
      </nav>
    </div>
  )
}

export function HeroTopNav() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <header className="relative z-20 w-full py-4">
        <PageContainer className="flex items-center justify-between">
          <div className="flex items-center gap-10">
            <VerxaLogo />
            <nav
              className="hidden items-center gap-10 lg:flex"
              aria-label="Primary"
            >
              {NAV_LINKS.map((item) => (
                <NavLink key={item.href} href={item.href} label={item.label} />
              ))}
            </nav>
          </div>

          <div className="hidden items-center gap-2 lg:flex">
            <ContactUsButton />
            <DownloadButton />
          </div>

          {/* Mobile menu trigger */}
          <button
            type="button"
            className="flex size-10 items-center justify-center lg:hidden"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={menuOpen}
          >
            <Image src="/icons/hero/menu-fill.svg" alt="" width={24} height={24} />
          </button>
        </PageContainer>
      </header>

      <MobileMenuOverlay open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  )
}
