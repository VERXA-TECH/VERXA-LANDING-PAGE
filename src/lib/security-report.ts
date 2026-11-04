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

// Heroku's router gives up at 30 seconds, so waiting longer gains nothing.
const REQUEST_TIMEOUT_MS = 30_000

export async function reportUnauthorized(token: string): Promise<ReportOutcome> {
  const baseUrl = process.env.NEXT_PUBLIC_VERXA_API_BASE_URL

  if (!baseUrl) {
    console.error(
      "[security] NEXT_PUBLIC_VERXA_API_BASE_URL is not set; the report was not sent.",
    )
    return { kind: "unconfirmed" }
  }

  let response: Response

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
        signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
      },
    )
  } catch {
    // Offline, timed out, or refused by CORS. Whether the request arrived is
    // unknown, so this can't be called a failure.
    return { kind: "unconfirmed" }
  }

  const body: unknown = await response.json().catch(() => null)

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
