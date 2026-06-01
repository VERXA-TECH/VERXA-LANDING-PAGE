export type FaqItem = { q: string; a: string }
export type FaqGroup = { category: string; items: FaqItem[] }

export const FAQ_GROUPS: FaqGroup[] = [
  {
    category: 'Verxa',
    items: [
      {
        q: 'What is Verxa?',
        a: 'Verxa is a global digital finance platform that lets you hold, send, receive, and convert both traditional and digital currencies, all from one account.',
      },
      {
        q: 'Who is it built for?',
        a: "It's built for people who move money across borders: international students, freelancers, remote workers, digital entrepreneurs, and more.",
      },
      {
        q: 'What currencies does Verxa support?',
        a: 'We support a growing list of fiat and digital currencies from day one, including GBP, CAD, NGN, GHS, ZAR, USDC, ETH, and BTC.',
      },
      {
        q: 'Is Verxa a bank?',
        a: 'No, Verxa is a technology provider, not a bank. We connect you to regulated financial and service providers through our infrastructure.',
      },
      {
        q: 'When is Verxa launching?',
        a: "We're currently in the final stages of development and will be launching soon. Waitlist members will be the first to get access, so join now.",
      },
      {
        q: 'Does Verxa charge fees?',
        a: "No, Verxa is completely free to use. We don't charge any fees for sending, receiving, or converting currencies. No hidden charges, no surprise deductions.",
      },
      {
        q: 'Is Verxa safe to use?',
        a: 'Yes. Security and compliance are at the core of everything we build. All financial services on Verxa are delivered through licensed and regulated partners.',
      },
    ],
  },
]
