// "This wasn't me": the link in the backend's PIN-changed email,
// `/security/not-me?token=<64 hex>`. Posting the token to
// `POST /auth/security/report-unauthorized` freezes the account's outbound
// money movement, signs it out on every device and revokes its devices. Only
// support can undo it.
//
// The token is single-use and lasts 72 hours. The backend spends it *before*
// it places the freeze, so after a server error or a lost answer a retry can
// only ever answer "invalid". That is why nothing here offers one.

export const SUPPORT_EMAIL = "hello@verxa.io"

// `randomBytes(32).toString("hex")` on the backend: always 64 lowercase hex
// characters. Anything else can't be a token, so it isn't sent.
const TOKEN_PATTERN = /^[0-9a-f]{64}$/

export function isNotMeToken(value: unknown): value is string {
  return typeof value === "string" && TOKEN_PATTERN.test(value)
}

export type ReportOutcome =
  | { kind: "secured" }
  /** The backend refused the token: wrong, expired or already used. */
  | { kind: "invalid"; message: string }
  /** 10 reports an hour per IP, then blocked for an hour. The token is unspent. */
  | { kind: "rate-limited" }
  /** No answer we can read. The account may or may not be frozen. */
  | { kind: "unconfirmed" }

const INVALID_FALLBACK =
  "This link is invalid or has expired. Please contact support."

// The browser sends a CORS preflight (OPTIONS) before the POST, and each can
// take up to Heroku's 30-second router limit while a sleeping dyno wakes. One
// 30-second budget for both could give up on a report that then froze the
// account, and tell the user it couldn't confirm.
const REQUEST_TIMEOUT_MS = 65_000

export async function reportUnauthorized(token: string): Promise<ReportOutcome> {
  const baseUrl = process.env.NEXT_PUBLIC_VERXA_API_BASE_URL

  // `next build` fails without it (next.config.ts), so this only guards a
  // build made some other way.
  if (!baseUrl) {
    console.error(
      "[security] NEXT_PUBLIC_VERXA_API_BASE_URL is not set; the report was not sent.",
    )
    return { kind: "unconfirmed" }
  }

  // Not `AbortSignal.timeout()`: Safari only has it from 16, and Next doesn't
  // polyfill it. On iOS 15 it would throw before the request left, so the
  // report would never be sent and the page would say it couldn't confirm.
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS)

  let response: Response
  let body: unknown

  try {
    response = await fetch(
      `${baseUrl.replace(/\/+$/, "")}/auth/security/report-unauthorized`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
        // The token is the credential; no cookies or referrer go with it.
        credentials: "omit",
        referrerPolicy: "no-referrer",
        signal: controller.signal,
      },
    )
    body = await response.json().catch(() => null)
  } catch {
    // Offline, timed out, or refused by CORS. Whether the request arrived is
    // unknown, so this can't be called a failure.
    return { kind: "unconfirmed" }
  } finally {
    clearTimeout(timer)
  }

  if (response.ok) {
    // Only the documented `{ data: { secured: true } }` may tell someone their
    // account is safe.
    return readData(body)?.secured === true
      ? { kind: "secured" }
      : { kind: "unconfirmed" }
  }

  if (response.status === 400) {
    return { kind: "invalid", message: readMessage(body) ?? INVALID_FALLBACK }
  }

  if (response.status === 429) {
    return { kind: "rate-limited" }
  }

  return { kind: "unconfirmed" }
}

function readData(body: unknown): { secured?: unknown } | null {
  if (typeof body !== "object" || body === null) return null
  const data = (body as { data?: unknown }).data
  return typeof data === "object" && data !== null
    ? (data as { secured?: unknown })
    : null
}

function readMessage(body: unknown): string | null {
  if (typeof body !== "object" || body === null) return null
  const message = (body as { message?: unknown }).message
  return typeof message === "string" && message.trim() ? message : null
}
