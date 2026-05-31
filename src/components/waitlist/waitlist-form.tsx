'use client'

import { useCallback, useState, type FormEvent } from 'react'
import type { WaitlistSource } from '@/lib/waitlist'
import { Toast, getWaitlistToastContent, type ToastContent } from '@/components/ui/toast'

type WaitlistFormProps = {
  source?: WaitlistSource
  variant?: 'hero' | 'compact'
}

type FormStatus = 'idle' | 'loading' | 'success' | 'error'

export function WaitlistForm({ source = 'hero', variant = 'hero' }: WaitlistFormProps) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<FormStatus>('idle')
  const [toast, setToast] = useState<ToastContent | null>(null)

  const closeToast = useCallback(() => {
    setToast(null)
    setStatus('idle')
  }, [])

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (status === 'loading') {
      return
    }

    setStatus('loading')
    setToast(null)

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source }),
      })

      const data = (await response.json()) as {
        alreadyRegistered?: boolean
        error?: string
      }

      if (!response.ok) {
        setStatus('error')
        setToast(
          getWaitlistToastContent('error', {
            errorMessage: data.error ?? 'Something went wrong. Please try again.',
          }),
        )
        return
      }

      setStatus('success')
      setEmail('')
      setToast(
        getWaitlistToastContent('success', {
          alreadyRegistered: data.alreadyRegistered,
        }),
      )
    } catch {
      setStatus('error')
      setToast(
        getWaitlistToastContent('error', {
          errorMessage: 'Network error. Check your connection and try again.',
        }),
      )
    }
  }

  const isHero = variant === 'hero'

  return (
    <>
      <Toast
        open={toast !== null}
        onClose={closeToast}
        title={toast?.title ?? ''}
        description={toast?.description ?? ''}
        variant={toast?.variant ?? 'success'}
      />

      <div className="w-full self-stretch">
        <form
          onSubmit={handleSubmit}
          className={
            isHero
              ? 'flex h-14 w-full items-center gap-2 self-stretch rounded-[10px] border border-[var(--color-holly-600)] bg-[var(--color-input-bg)] py-2.5 pr-3 pl-0 shadow-[0_1px_2px_0_rgba(10,13,20,0.03)]'
              : 'flex w-full max-w-[320px] flex-col gap-3 sm:flex-row sm:items-center'
          }
          noValidate
        >
          <label htmlFor="waitlist-email" className="sr-only">
            Email address
          </label>
          <input
            id="waitlist-email"
            type="email"
            name="email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value)
              if (status === 'error') {
                setStatus('idle')
                setToast(null)
              }
            }}
            required
            autoComplete="email"
            placeholder="Your email address"
            disabled={status === 'loading'}
            className={
              isHero
                ? 'min-w-0 flex-1 bg-transparent px-3 font-[family-name:var(--font-heuvel)] text-sm font-normal leading-5 tracking-[-0.084px] text-white placeholder:text-[var(--color-text-soft-400)] outline-none disabled:opacity-60 [font-feature-settings:\'liga\'_off,\'calt\'_off]'
                : 'min-w-0 flex-1 rounded-[10px] border border-[var(--color-holly-600)] bg-[var(--color-holly-700)] px-3 py-3 font-[family-name:var(--font-heuvel)] text-sm text-white placeholder:text-[var(--color-holly-300)] outline-none disabled:opacity-60'
            }
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className={
              isHero
                ? 'inline-flex h-[42px] shrink-0 items-center justify-center gap-2 rounded-[24px] border border-[#94BC27] bg-[#2C3308] px-5 py-3 font-[family-name:var(--font-heuvel)] text-sm font-normal leading-6 text-[#E5E8E7] transition-opacity disabled:cursor-not-allowed disabled:opacity-60 lg:text-base'
                : 'inline-flex shrink-0 items-center justify-center rounded-[24px] border border-[#94BC27] bg-[var(--color-holly-700)] px-5 py-3 font-[family-name:var(--font-heuvel)] text-base text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-60'
            }
          >
            {status === 'loading' ? 'Joining…' : 'Join waitlist'}
          </button>
        </form>
      </div>
    </>
  )
}
