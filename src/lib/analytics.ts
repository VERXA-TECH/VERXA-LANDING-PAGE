export const GA_MEASUREMENT_ID = "G-SRF17YZP03"

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

export function trackEvent(name: string, params?: Record<string, unknown>) {
  window.gtag?.("event", name, params)
}
