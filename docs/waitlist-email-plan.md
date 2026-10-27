# Waitlist email: implementation plan

_Last updated: 2026-10-27_

**Goal:** people who join the waitlist get an email from Verxa. Sending goes through the backend (backend's call), and the landing page passes the signup along.

## Flow

1. Visitor enters their email → Turnstile checks they're human → form submits to `/api/waitlist`
2. `/api/waitlist` (landing page server) forwards it to `POST {{VERXA_API_BASE_URL}}/waitlist`
3. Backend verifies the Turnstile token and sends the waitlist email

## Backend endpoint

`POST {{VERXA_API_BASE_URL}}/waitlist`

```json
{
  "email": "",
  "captchaToken": "",
  "source": "landing-hero",
  "website": ""
}
```

- `captchaToken`: the Turnstile token
- `source`: where the signup came from (`landing-hero`; CTA value still to confirm)
- `website`: honeypot. A hidden field real visitors never see, so it's always sent empty. Bots that fill every field get caught
4. Email links to `https://www.verxa.io/waitlist/confirmation` on the landing page (backend asked for the app URL for this link)

## Waiting on backend

| # | Question | Answer | Status |
|---|----------|--------|--------|
| 1 | Endpoint URL | Staging: `https://verxa-backend-api-staging-baa322a93f4c.herokuapp.com/api/waitlist`. No prod yet | 🟡 Need prod URL when it exists |
| 2 | Request body | `email`, `captchaToken`, `source`, `website` (see above) | ✅ Answered |
| 2a | `source` value for the CTA form (`landing-cta`?) | | ⏳ Pending |
| 2b | Response: status codes + body for success / already registered / captcha failed / honeypot hit | Errors are `{"status":"fail","message":"…"}`. Seen on staging: 400 captcha failed, 403 no/disallowed `Origin`. Success / already registered still unconfirmed (code assumes 2xx / 409) | 🟡 Partly answered |
| 3 | Auth | None, relies on allowed origin + Turnstile | ✅ Decided |
| 4 | Is backend verifying the Turnstile token? | Yes, sent as `captchaToken` | ✅ Answered |
| 5 | Prod domain + `localhost` added to Turnstile allowed hostnames | | ⏳ Pending |
| 6 | Confirmation page: link from the email with a token, or just a success page? | Linked from the email. Token or not still unclear | 🟡 Partly answered |
| 7 | If token: query param name + confirm endpoint URL + responses (success / expired / invalid) | | ⏳ Pending |
| 8 | Does the landing page still save signups to Supabase, or does backend store them now? | Both: backend stores in its DB, landing page keeps its Supabase copy | ✅ Answered |
| 9 | Signing up twice: does backend resend the email or ignore it? | | ⏳ Pending |
| 10 | Switch the Turnstile widget to Invisible mode in the Cloudflare dashboard (so the checkbox never shows) | | ⏳ Pending |
| 11 | Add `https://www.verxa.io` to backend CORS allowed origins (currently "Not allowed by CORS") | | ⏳ Pending |

> Origin note: confirmed. Backend returns 403 when there's no `Origin` header, so `/api/waitlist` now sends `Origin: NEXT_PUBLIC_SITE_URL`. Staging allows `http://localhost:3000`; prod domain needs adding (#11).

## Landing page (dev)

- [x] **Turnstile widget** on the waitlist form (`src/components/waitlist/waitlist-form.tsx`)
  - Site key: `0x4AAAAAAFiInjqGHc4Cb5NU` (public, safe in code/env)
  - Disable submit until the token is ready; reset the widget after each submit (tokens are single use)
  - Use it anywhere the waitlist form appears (hero, CTA)
- [x] **Honeypot field** `website` on the form: hidden from people and screen readers (`aria-hidden`, `tabIndex={-1}`, `autoComplete="off"`), not `display: none` (some bots skip those)
- [x] **Send the token + honeypot + source** with the email from the form to `/api/waitlist`
  - `source`: `landing-hero` for the hero form, CTA value per #2a
- [x] **Call the backend** (2xx joined, 409 already registered (assumed, #2b), other 4xx shows backend message; 401/403/5xx/timeout (10s) shows "try again". Supabase copy saved after responding) from `/api/waitlist` (`src/app/api/waitlist/route.ts`, `src/lib/waitlist.ts`)
  - `POST {{VERXA_API_BASE_URL}}/waitlist` with `email`, `captchaToken`, `source`, `website`
  - Map backend responses to form messages (#2b)
  - Short timeout (~5s)
  - Decide what the visitor sees if the backend fails (depends on #8)
- [ ] **Confirmation page** (success-page-only version built; token flow still pending) at `src/app/waitlist/confirmation/page.tsx` (depends on #6, #7)
  - Token flow: read token from URL → call confirm endpoint → show result
  - Add `noindex` (shouldn't show up in search results)
- [x] **Env vars**, locally (`.env.local`) and on the hosting dashboard, plus `.env.example`
  - `NEXT_PUBLIC_TURNSTILE_SITE_KEY`
  - `VERXA_API_BASE_URL` (#1)
- [ ] **Test** locally, then on prod with a real email

## Design

- [ ] **Waitlist email template**: goes in the backend repo at `static/emails/` alongside the `v2-*` templates
  - Images go in the backend's `static/` folder like the other templates
  - PNG/JPG only (no SVG), small file sizes
  - If double opt-in: needs a "Confirm your email" button
- [ ] **Confirmation page** on the landing page
  - Token flow: 3 states (confirming, confirmed, link expired/invalid)
  - Success-page-only: 1 state
- [ ] **Turnstile placement** on the form (hero + CTA). Usually invisible, but can show a small box

## Decisions

- Same email provider as the main app, routed through the backend (backend's request)
- No shared secret; spam protection comes from Turnstile
- Email template + assets live in the backend repo, not the landing page `public/` folder
