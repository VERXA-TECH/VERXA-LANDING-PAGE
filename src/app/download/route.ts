import { NextResponse } from "next/server"
import {
  DOWNLOAD_FALLBACK_PATH,
  downloadPlatform,
  storeUrlFor,
} from "@/lib/app-links"

// Decided per request, from the User-Agent, never cached.
export const dynamic = "force-dynamic"

/**
 * https://verxa.io/download, the link the app shares with a tag.
 *
 * An iPhone goes to the App Store and an Android phone to Google Play, once
 * their URLs are set (see src/lib/app-links.ts). Everyone else, and every
 * phone before then, goes to the waitlist.
 *
 * 307 rather than 308 so browsers and link previews don't remember it: the
 * destination changes the day the app launches.
 */
function redirectForDownload(request: Request) {
  const platform = downloadPlatform(request.headers.get("user-agent"))
  const destination =
    storeUrlFor(platform) ?? new URL(DOWNLOAD_FALLBACK_PATH, request.url)

  const response = NextResponse.redirect(destination, 307)
  response.headers.set("Cache-Control", "no-store")
  response.headers.set("Vary", "User-Agent")
  return response
}

export function GET(request: Request) {
  return redirectForDownload(request)
}

export function HEAD(request: Request) {
  return redirectForDownload(request)
}
