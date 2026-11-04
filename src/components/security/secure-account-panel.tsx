"use client"

import { useEffect, useRef, useState } from "react"
import {
  reportUnauthorized,
  SUPPORT_EMAIL,
  type ReportOutcome,
} from "@/lib/security-report"

type PanelState = { kind: "ready" } | { kind: "submitting" } | ReportOutcome

type SecureAccountPanelProps = {
  /** `null` when the URL carried no token, or one that can't be real. */
  token: string | null
}

const headingClass =
  "font-[family-name:var(--font-heuvel)] text-[32px] font-normal leading-10 tracking-[-0.16px] text-[var(--color-text-strong)] [font-feature-settings:'liga'_off,'calt'_off] lg:text-[48px] lg:leading-[56px] lg:tracking-[-0.48px]"
const bodyClass =
  "max-w-[480px] font-[family-name:var(--font-heuvel)] text-base font-normal leading-6 tracking-[-0.176px] text-[var(--color-text-muted)] [font-feature-settings:'liga'_off,'calt'_off]"
const buttonClass =
  "inline-flex cursor-pointer items-center justify-center rounded-[6px] border border-[#94BC27] bg-[#2C3308] px-5 py-3 font-[family-name:var(--font-heuvel)] text-base text-[#E5E8E7] transition-opacity disabled:cursor-not-allowed disabled:opacity-60"

/**
 * The confirm step for "This wasn't me". Nothing is sent until the button is
 * pressed: mail scanners open every link in an email, and a request on load
 * would freeze accounts nobody reported.
 */
export function SecureAccountPanel({ token }: SecureAccountPanelProps) {
  const [state, setState] = useState<PanelState>(
    token ? { kind: "ready" } : { kind: "invalid", message: MISSING_TOKEN },
  )
  // A double click lands both events before the first state update, so the
  // guard can't be the state itself. The token is single-use either way.
  const sentRef = useRef(false)

  // The token is a credential: take it out of the address bar, and with it
  // out of history and anything else that reads the URL. A reload then shows
  // the missing-token copy, which sends the user back to the email.
  useEffect(() => {
    if (window.location.search) {
      window.history.replaceState(null, "", window.location.pathname)
    }
  }, [])

  const secure = async () => {
    if (!token || sentRef.current) return
    sentRef.current = true
    setState({ kind: "submitting" })
    setState(await reportUnauthorized(token))
  }

  if (state.kind === "ready" || state.kind === "submitting") {
    const isSubmitting = state.kind === "submitting"

    return (
      <Section
        title="Secure your account"
        description="If you didn't change your Verxa PIN or password, secure your account now. We'll freeze transfers and sign you out on every device, and you'll need to contact support to get back in."
      >
        <button
          type="button"
          className={buttonClass}
          disabled={isSubmitting}
          onClick={secure}
        >
          {isSubmitting ? "Securing your account…" : "Secure my account"}
        </button>
        <p className="font-[family-name:var(--font-heuvel)] text-sm text-[var(--color-text-soft-400)]">
          If you made this change, you can close this page.
        </p>
      </Section>
    )
  }

  if (state.kind === "secured") {
    return (
      <Section
        title="Your account is secured"
        description={`We've frozen transfers and signed you out on every device. Contact us at ${SUPPORT_EMAIL} to get access back.`}
      >
        <SupportLink />
      </Section>
    )
  }

  if (state.kind === "invalid") {
    return (
      <Section title="This link didn't work" description={state.message}>
        <SupportLink />
      </Section>
    )
  }

  if (state.kind === "rate-limited") {
    return (
      <Section
        title="Too many attempts"
        description={`Try the link in your email again in an hour, or contact us at ${SUPPORT_EMAIL} now if you didn't make this change.`}
      >
        <SupportLink />
      </Section>
    )
  }

  return (
    <Section
      title="We couldn't confirm this"
      description={`We couldn't confirm your account was secured. Contact us at ${SUPPORT_EMAIL} now and we'll secure it for you.`}
    >
      <SupportLink />
    </Section>
  )
}

const MISSING_TOKEN = `This link is incomplete. Open the "This wasn't me" link in your email again, or contact us at ${SUPPORT_EMAIL} if you didn't make this change.`

function Section({
  title,
  description,
  children,
}: {
  title: string
  description: string
  children: React.ReactNode
}) {
  return (
    // Announces each outcome as it replaces the button.
    <div
      className="flex flex-col items-center gap-6"
      role="status"
      aria-live="polite"
    >
      <h1 className={headingClass}>{title}</h1>
      <p className={bodyClass}>{description}</p>
      {children}
    </div>
  )
}

function SupportLink() {
  return (
    <a href={`mailto:${SUPPORT_EMAIL}`} className={buttonClass}>
      Contact support
    </a>
  )
}
