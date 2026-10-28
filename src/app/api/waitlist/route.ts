import { after, NextResponse } from "next/server"
import {
  isValidWaitlistEmail,
  isWaitlistSource,
  normalizeWaitlistEmail,
  sendToBackendWaitlist,
  signUpForWaitlist,
} from "@/lib/waitlist"

function successResponse(alreadyRegistered: boolean) {
  return NextResponse.json({
    ok: true,
    alreadyRegistered,
    message: alreadyRegistered
      ? "You're already on the waitlist."
      : "Check your email to confirm your spot on the waitlist.",
  })
}

export async function POST(request: Request) {
  let body: unknown

  try {
    body = await request.json()
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 },
    )
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 },
    )
  }

  const {
    email: rawEmail,
    captchaToken,
    source: rawSource,
    website,
  } = body as {
    email?: unknown
    captchaToken?: unknown
    source?: unknown
    website?: unknown
  }

  // Honeypot filled in: pretend it worked so bots don't learn to skip it.
  if (typeof website === "string" && website !== "") {
    return successResponse(false)
  }

  if (typeof rawEmail !== "string") {
    return NextResponse.json({ error: "Email is required." }, { status: 400 })
  }

  const email = normalizeWaitlistEmail(rawEmail)

  if (!isValidWaitlistEmail(email)) {
    return NextResponse.json(
      { error: "Enter a valid email address." },
      { status: 400 },
    )
  }

  if (typeof captchaToken !== "string" || captchaToken === "") {
    return NextResponse.json(
      { error: "Please complete the verification and try again." },
      { status: 400 },
    )
  }

  const source = isWaitlistSource(rawSource) ? rawSource : "landing-hero"

  try {
    // Backend verifies the Turnstile token and sends the waitlist email.
    const backend = await sendToBackendWaitlist({
      email,
      captchaToken,
      source,
      website: "",
    })

    if (backend.status === "rejected") {
      return NextResponse.json({ error: backend.error }, { status: 400 })
    }

    // Backend is where signups live (and it sends the email), so if it can't
    // take this one, ask the visitor to retry rather than saving it elsewhere.
    if (backend.status === "unavailable") {
      return NextResponse.json(
        { error: "Waitlist is unavailable right now. Please try again later." },
        { status: 503 },
      )
    }

    if (backend.status === "ok") {
      // Supabase keeps a copy too; save it after responding so the visitor
      // doesn't wait on it.
      after(async () => {
        const result = await signUpForWaitlist(email, source).catch(
          (error: unknown) => ({ ok: false as const, error: String(error) }),
        )
        if (!result.ok) {
          console.error("Supabase copy failed after backend signup:", result.error)
        }
      })
      return successResponse(backend.alreadyRegistered)
    }

    // No VERXA_API_BASE_URL set (e.g. local dev without the backend):
    // Supabase only, as before the backend existed.
    const result = await signUpForWaitlist(email, source)

    if (!result.ok) {
      return NextResponse.json({ error: result.error }, { status: 500 })
    }

    return successResponse(result.alreadyRegistered)
  } catch (error) {
    console.error("Waitlist API error:", error)
    return NextResponse.json(
      { error: "Waitlist is unavailable right now. Please try again later." },
      { status: 503 },
    )
  }
}
