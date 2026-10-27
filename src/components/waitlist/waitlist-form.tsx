"use client"

import { useCallback, useId, useRef, useState, type FormEvent } from "react"
import {
  Toast,
  getWaitlistToastContent,
  type ToastContent,
} from "@/components/ui/toast"
import { trackEvent } from "@/lib/analytics"
import type { WaitlistSource } from "@/lib/waitlist"
import {
  Turnstile,
  TurnstileCancelledError,
  type TurnstileHandle,
} from "./turnstile"

type WaitlistFormProps = {
  variant?: "hero" | "compact"
}

type FormStatus = "idle" | "loading" | "success" | "error"

// TODO: confirm the CTA value with backend (plan #2a).
const SOURCE_BY_VARIANT: Record<
  NonNullable<WaitlistFormProps["variant"]>,
  WaitlistSource
> = {
  hero: "landing-hero",
  compact: "landing-cta",
}

export function WaitlistForm({ variant = "hero" }: WaitlistFormProps) {
  const [email, setEmail] = useState("")
  const [website, setWebsite] = useState("")
  const turnstileRef = useRef<TurnstileHandle>(null)
  const emailId = useId()
  const honeypotId = useId()
  const [status, setStatus] = useState<FormStatus>("idle")
  const [toast, setToast] = useState<ToastContent | null>(null)

  const closeToast = useCallback(() => {
    setToast(null)
    setStatus("idle")
  }, [])

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (status === "loading" || email.trim() === "") {
      return
    }

    setStatus("loading")
    setToast(null)

    let captchaToken: string
    try {
      captchaToken = await turnstileRef.current!.getToken()
    } catch (error) {
      setStatus("idle")
      if (!(error instanceof TurnstileCancelledError)) {
        setToast(
          getWaitlistToastContent("error", {
            errorMessage:
              error instanceof Error
                ? error.message
                : "We couldn't verify you. Please try again.",
          }),
        )
      }
      return
    }

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          captchaToken,
          source: SOURCE_BY_VARIANT[variant],
          website,
        }),
      })

      const data = (await response.json()) as {
        alreadyRegistered?: boolean
        error?: string
      }

      if (!response.ok) {
        setStatus("error")
        setToast(
          getWaitlistToastContent("error", {
            errorMessage:
              data.error ?? "Something went wrong. Please try again.",
          }),
        )
        return
      }

      setStatus("success")
      setEmail("")
      trackEvent("sign_up", {
        method: "waitlist",
        form_variant: variant,
        already_registered: data.alreadyRegistered ?? false,
      })
      setToast(
        getWaitlistToastContent("success", {
          alreadyRegistered: data.alreadyRegistered,
        }),
      )
    } catch {
      setStatus("error")
      setToast(
        getWaitlistToastContent("error", {
          errorMessage: "Network error. Check your connection and try again.",
        }),
      )
    }
  }

  const isHero = variant === "hero"
  const isSubmitDisabled = status === "loading" || email.trim() === ""

  return (
    <>
      <Toast
        open={toast !== null}
        onClose={closeToast}
        title={toast?.title ?? ""}
        description={toast?.description ?? ""}
        variant={toast?.variant ?? "success"}
      />

      <div className="w-full self-stretch">
        <form
          onSubmit={handleSubmit}
          className={
            isHero
              ? "mx-auto flex w-full max-w-[416px] items-center gap-2 self-stretch rounded-[12px] border border-[#213B35] bg-[var(--color-input-bg)] py-1.5 pr-1.5 pl-0 shadow-[0_1px_2px_0_rgba(10,13,20,0.03)]"
              : "flex w-full max-w-[320px] flex-col gap-3 sm:flex-row sm:items-center"
          }
          noValidate
        >
          <label htmlFor={emailId} className="sr-only">
            Email address
          </label>
          <input
            id={emailId}
            type="email"
            name="email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value)
              if (status === "error") {
                setStatus("idle")
                setToast(null)
              }
            }}
            required
            autoComplete="email"
            placeholder="Your email address"
            disabled={status === "loading"}
            className={
              isHero
                ? "waitlist-email-input min-w-0 flex-1 bg-transparent px-3 font-[family-name:var(--font-heuvel)] text-sm font-normal leading-5 tracking-[-0.084px] text-white placeholder:text-[var(--color-text-soft-400)] outline-none disabled:opacity-60 [font-feature-settings:'liga'_off,'calt'_off]"
                : "waitlist-email-input min-w-0 flex-1 rounded-[10px] border border-[var(--color-holly-600)] bg-[var(--color-holly-700)] px-3 py-3 font-[family-name:var(--font-heuvel)] text-sm text-white placeholder:text-[var(--color-holly-300)] outline-none disabled:opacity-60"
            }
          />
          {/* Honeypot: hidden off-screen (not display:none, which some bots skip). */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-[9999px] h-px w-px overflow-hidden"
          >
            <label htmlFor={honeypotId}>Website</label>
            <input
              id={honeypotId}
              type="text"
              name="website"
              value={website}
              onChange={(event) => setWebsite(event.target.value)}
              tabIndex={-1}
              autoComplete="off"
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitDisabled}
            className={
              isHero
                ? "inline-flex h-[42px] shrink-0 cursor-pointer items-center justify-center gap-2 rounded-[6px] border border-[#94BC27] bg-[#2C3308] px-5 py-3 font-[family-name:var(--font-heuvel)] text-sm font-normal leading-6 text-[#E5E8E7] transition-opacity disabled:cursor-not-allowed disabled:opacity-60 lg:text-base"
                : "inline-flex shrink-0 cursor-pointer items-center justify-center rounded-[24px] border border-[#94BC27] bg-[var(--color-holly-700)] px-5 py-3 font-[family-name:var(--font-heuvel)] text-base text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-60"
            }
          >
            {status === "loading" ? "Joining…" : "Join waitlist"}
          </button>
        </form>
        <Turnstile ref={turnstileRef} />
      </div>
    </>
  )
}
