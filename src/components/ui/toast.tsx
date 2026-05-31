'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

export type ToastVariant = 'success' | 'error'

export type ToastContent = {
  title: string
  description: string
  variant: ToastVariant
}

type ToastProps = ToastContent & {
  open: boolean
  onClose: () => void
  duration?: number
}

function ToastIcon({ variant }: { variant: ToastVariant }) {
  const isSuccess = variant === 'success'

  return (
    <div className="flex size-10 shrink-0 items-center justify-center rounded-[10px] bg-[var(--color-stroke-soft-200)] lg:size-11">
      <div
        className={`flex size-6 items-center justify-center rounded-full lg:size-7 ${
          isSuccess ? 'bg-[var(--color-primary-base)]' : 'bg-[var(--color-state-error)]'
        }`}
      >
        {isSuccess ? (
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            aria-hidden
            className="size-3.5 lg:size-4"
          >
            <path
              d="M2.5 7.25L5.75 10.5L11.5 3.75"
              stroke="#171717"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : (
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            aria-hidden
            className="size-3.5 lg:size-4"
          >
            <path
              d="M4 4L10 10M10 4L4 10"
              stroke="#171717"
              strokeWidth="1.75"
              strokeLinecap="round"
            />
          </svg>
        )}
      </div>
    </div>
  )
}

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <path
        d="M5 5L15 15M15 5L5 15"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function Toast({
  open,
  onClose,
  title,
  description,
  variant,
  duration = 6000,
}: ToastProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!open || duration <= 0) {
      return
    }

    const timer = window.setTimeout(onClose, duration)
    return () => window.clearTimeout(timer)
  }, [open, duration, onClose])

  if (!mounted || !open) {
    return null
  }

  return createPortal(
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[100] flex justify-end px-[var(--spacing-page-x)] pt-4 lg:px-[var(--spacing-page-x-lg)] lg:pt-5">
      <div
        role="status"
        aria-live="polite"
        className="pointer-events-auto toast-enter flex w-full max-w-none items-center justify-between gap-3 self-stretch rounded-[20px] bg-[var(--color-bg-white-0)] p-5 shadow-[0_16px_40px_rgba(0,0,0,0.45)] sm:max-w-[420px] sm:gap-4"
      >
        <div className="flex min-w-0 flex-1 items-center gap-3 sm:gap-4">
          <ToastIcon variant={variant} />
          <div className="min-w-0">
            <p className="font-[family-name:var(--font-heuvel)] text-sm font-normal leading-5 tracking-[-0.084px] text-white [font-feature-settings:'liga'_off,'calt'_off] lg:text-base lg:leading-6">
              {title}
            </p>
            <p className="mt-0.5 font-[family-name:var(--font-heuvel)] text-xs font-normal leading-4 tracking-[-0.06px] text-[var(--color-text-sub-600)] [font-feature-settings:'liga'_off,'calt'_off] lg:mt-1 lg:text-sm lg:leading-5">
              {description}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          aria-label="Dismiss notification"
          className="flex size-8 shrink-0 items-center justify-center rounded-full text-[var(--color-text-sub-600)] transition-colors hover:text-white"
        >
          <CloseIcon />
        </button>
      </div>
    </div>,
    document.body,
  )
}

export function getWaitlistToastContent(
  variant: 'success' | 'error',
  options: { alreadyRegistered?: boolean; errorMessage?: string },
): ToastContent {
  if (variant === 'error') {
    return {
      variant: 'error',
      title: 'Unable to join the waitlist.',
      description: options.errorMessage ?? 'Please try again in a moment.',
    }
  }

  if (options.alreadyRegistered) {
    return {
      variant: 'success',
      title: "You're already on the waitlist.",
      description: "We'll notify you when we launch.",
    }
  }

  return {
    variant: 'success',
    title: "You're on the waitlist.",
    description: "We'll be in touch soon.",
  }
}
