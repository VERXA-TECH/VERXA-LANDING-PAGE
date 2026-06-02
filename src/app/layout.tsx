import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { FAQ_GROUPS } from "@/components/faq/faq-data"
import { ASSETS } from "@/lib/assets"
import "./globals.css"

const siteDescription =
  FAQ_GROUPS[0].items.find((item) => item.q === "What is Verxa?")?.a ??
  "Verxa is a global digital finance platform that lets you hold, send, receive, and convert both traditional and digital currencies, all from one account."

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://verxa.io"),
  title: "Verxa — Move Money. Anywhere",
  description: siteDescription,
  openGraph: {
    title: "Verxa — Move Money. Anywhere",
    description: siteDescription,
    images: [ASSETS.logo],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="preload"
          href="/fonts/HeuvelGrotesk-Regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body className={inter.variable}>{children}</body>
    </html>
  )
}
