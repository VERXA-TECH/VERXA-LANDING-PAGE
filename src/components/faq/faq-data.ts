export type FaqItem = { q: string; a: string }
export type FaqGroup = { category: string; items: FaqItem[] }

export const FAQ_GROUPS: FaqGroup[] = [
  {
    category: 'Account',
    items: [
      {
        q: 'How do I change my email address?',
        a: 'You can update your email address in Settings → Account Details. Enter your new email and confirm the change via the verification link we send to your inbox.',
      },
      {
        q: 'Can I update my payment details online?',
        a: 'Yes. Go to Settings → Payment Methods. You can add, remove, or update your card and bank account details at any time.',
      },
      {
        q: 'What should I do if I forget my password?',
        a: "Tap 'Forgot Password' on the login screen. We'll send a secure reset link to your registered email address.",
      },
    ],
  },
  {
    category: 'Support',
    items: [
      {
        q: 'How can I contact customer support?',
        a: 'Reach us at hello@verxa.co or through the in-app live chat. Our team is available Monday – Friday, 8AM – 6PM WAT.',
      },
      {
        q: 'Do you provide weekend assistance?',
        a: 'We use bank-level encryption, two-factor authentication, and comply with major global standards such as PSD2, GDPR, and SOC 2.\n\nYour financial data is encrypted both at rest and in transit, and our systems are monitored 24/7 for unusual activity. We also undergo regular third-party audits to ensure the highest level of security and compliance.',
      },
      {
        q: 'Is live chat support available?',
        a: "Yes — live chat is available in-app during business hours. Outside of these hours, you can leave a message and we'll respond at the next opportunity.",
      },
      {
        q: 'Where can I find detailed guides?',
        a: 'Visit our Help Center for step-by-step articles, video tutorials, and FAQs on every feature.',
      },
    ],
  },
  {
    category: 'Payments',
    items: [
      {
        q: 'How long does it take to process a payment?',
        a: 'Most transfers complete within minutes. Depending on the corridor and method, some may take up to 1 business day.',
      },
      {
        q: 'Are refunds handled automatically?',
        a: "Failed or reversed transactions are refunded automatically to your wallet balance within 24 hours. Contact support if a refund hasn't arrived after that window.",
      },
    ],
  },
]
