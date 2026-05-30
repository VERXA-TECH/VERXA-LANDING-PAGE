import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Verxa — Move money across borders without limits',
  description:
    'Send and receive money instantly to over 40 countries with real exchange rates and low fees.',
  openGraph: {
    title: 'Verxa — Move money across borders without limits',
    description:
      'Send and receive money instantly to over 40 countries with real exchange rates and low fees.',
    images: ['/images/verxa_logo.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.variable}>{children}</body>
    </html>
  )
}
