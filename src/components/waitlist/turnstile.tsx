"use client"

import { useEffect, useImperativeHandle, useRef, useState, type Ref } from "react"
import Script from "next/script"

const SCRIPT_SRC =
  "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"

export const TURNSTILE_SITE_KEY =
  process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "0x4AAAAAAFiInjqGHc4Cb5NU"

type TurnstileApi = {
  render: (
    container: HTMLElement,
    options: {
      sitekey: string
      theme?: "light" | "dark" | "auto"
      execution?: "render" | "execute"
      appearance?: "always" | "execute" | "interaction-only"
      callback?: (token: string) => void
      "expired-callback"?: () => void
      "error-callback"?: () => void
      "before-interactive-callback"?: () => void
      "after-interactive-callback"?: () => void
    },
  ) => string
  execute: (widgetId: string) => void
  reset: (widgetId: string) => void
  remove: (widgetId: string) => void
}

declare global {
  interface Window {
    turnstile?: TurnstileApi
  }
}

export class TurnstileCancelledError extends Error {
  constructor() {
    super("Verification cancelled.")
  }
}

export type TurnstileHandle = {
  /** Runs the check and resolves with a fresh single-use token. */
  getToken: () => Promise<string>
}

type PendingToken = {
  resolve: (token: string) => void
  reject: (error: Error) => void
}

type TurnstileProps = {
  ref?: Ref<TurnstileHandle>
}

/**
 * Runs Turnstile only when the form is submitted. Nothing is shown unless
 * Cloudflare asks for a click, and then it appears in an overlay so the page
 * layout never moves.
 */
export function Turnstile({ ref }: TurnstileProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const widgetIdRef = useRef<string | null>(null)
  const pendingRef = useRef<PendingToken | null>(null)
  const [isInteractive, setIsInteractive] = useState(false)

  function settle(result: { token: string } | { error: Error }) {
    const pending = pendingRef.current
    pendingRef.current = null
    setIsInteractive(false)
    if (!pending) return
    if ("token" in result) pending.resolve(result.token)
    else pending.reject(result.error)
  }

  function renderWidget() {
    const container = containerRef.current
    if (!container || !window.turnstile || widgetIdRef.current) {
      return
    }

    widgetIdRef.current = window.turnstile.render(container, {
      sitekey: TURNSTILE_SITE_KEY,
      theme: "dark",
      execution: "execute",
      appearance: "execute",
      callback: (token) => settle({ token }),
      "expired-callback": () =>
        settle({ error: new Error("Verification expired. Please try again.") }),
      "error-callback": () =>
        settle({ error: new Error("We couldn't verify you. Please try again.") }),
      "before-interactive-callback": () => setIsInteractive(true),
      "after-interactive-callback": () => setIsInteractive(false),
    })
  }

  function cancel() {
    settle({ error: new TurnstileCancelledError() })
    if (widgetIdRef.current && window.turnstile) {
      window.turnstile.reset(widgetIdRef.current)
    }
  }

  useEffect(() => {
    // Script may already be loaded (e.g. after client-side navigation).
    renderWidget()

    return () => {
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current)
      }
      widgetIdRef.current = null
    }
  }, [])

  useEffect(() => {
    if (!isInteractive) return

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") cancel()
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [isInteractive])

  useImperativeHandle(ref, () => ({
    getToken() {
      renderWidget()
      const widgetId = widgetIdRef.current
      if (!widgetId || !window.turnstile) {
        return Promise.reject(
          new Error("Verification is still loading. Please try again."),
        )
      }

      pendingRef.current?.reject(new TurnstileCancelledError())
      const promise = new Promise<string>((resolve, reject) => {
        pendingRef.current = { resolve, reject }
      })
      // Tokens are single use: reset so each submit gets a fresh one.
      window.turnstile.reset(widgetId)
      window.turnstile.execute(widgetId)
      return promise
    },
  }))

  return (
    <>
      <Script src={SCRIPT_SRC} strategy="afterInteractive" onReady={renderWidget} />
      {/* Same DOM node in both states so the widget iframe isn't reloaded. */}
      <div
        role={isInteractive ? "dialog" : undefined}
        aria-modal={isInteractive ? true : undefined}
        aria-label={isInteractive ? "Verify you're human" : undefined}
        aria-hidden={isInteractive ? undefined : true}
        onClick={(event) => {
          if (event.target === event.currentTarget) cancel()
        }}
        className={
          isInteractive
            ? "fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4"
            : "pointer-events-none fixed top-0 left-0 h-0 w-0 overflow-hidden opacity-0"
        }
      >
        <div
          className={
            isInteractive
              ? "flex flex-col items-center gap-4 rounded-[12px] border border-[var(--color-glass-border)] bg-[var(--color-holly-700)] p-5"
              : undefined
          }
        >
          {isInteractive && (
            <p className="font-[family-name:var(--font-heuvel)] text-sm text-[var(--color-text-muted)]">
              One quick check before you join
            </p>
          )}
          <div ref={containerRef} />
        </div>
      </div>
    </>
  )
}
