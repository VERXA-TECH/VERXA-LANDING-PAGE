/**
 * Where /download sends a visitor.
 *
 * The app shares one link, https://verxa.io/download, in its "Send me money
 * on Verxa" message. The store listings don't exist yet, so this reads them
 * from server env vars: launching is a matter of setting APP_STORE_URL and
 * PLAY_STORE_URL, with no app release and no code change here.
 *
 * Until a store URL is set, that platform's visitors go to the waitlist, the
 * same place a laptop goes.
 */

export type DownloadPlatform = "ios" | "android" | "other"

/**
 * The visitor's platform, from the User-Agent.
 *
 * iPadOS Safari reports a Mac User-Agent by default, so an iPad usually reads
 * as "other" and lands on the waitlist. That's the safe side to be wrong on.
 */
export function downloadPlatform(userAgent: string | null): DownloadPlatform {
  if (!userAgent) return "other"
  if (/\b(iPhone|iPad|iPod)\b/i.test(userAgent)) return "ios"
  if (/\bAndroid\b/i.test(userAgent)) return "android"
  return "other"
}

/** An env value, only when it is an https URL. Anything else is unset. */
function storeUrl(value: string | undefined): string | null {
  if (!value) return null

  try {
    const url = new URL(value.trim())
    return url.protocol === "https:" ? url.toString() : null
  } catch {
    return null
  }
}

/** The store listing for a platform, or null while it isn't set. */
export function storeUrlFor(platform: DownloadPlatform): string | null {
  if (platform === "ios") return storeUrl(process.env.APP_STORE_URL)
  if (platform === "android") return storeUrl(process.env.PLAY_STORE_URL)
  return null
}

/** Where everyone without a store listing goes: the waitlist on the homepage. */
export const DOWNLOAD_FALLBACK_PATH = "/#waitlist"
