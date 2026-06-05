import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { FAQ_GROUPS } from "@/components/faq/faq-data"
import { ASSETS } from "@/lib/assets"
import { SiteJsonLd } from "@/components/seo/site-json-ld"
import "./globals.css"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.verxa.io"

const siteDescription =
  FAQ_GROUPS[0].items.find((item) => item.q === "What is Verxa?")?.a ??
  "Verxa is a global digital finance platform that lets you hold, send, receive, and convert both traditional and digital currencies, all from one account."

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Verxa — Move Money. Anywhere",
  description: siteDescription,
  applicationName: "Verxa",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [{ url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" }],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Verxa",
    locale: "en_US",
    title: "Verxa — Move Money. Anywhere",
    description: siteDescription,
    images: [ASSETS.logo],
  },
  twitter: {
    card: "summary",
    title: "Verxa — Move Money. Anywhere",
    description: siteDescription,
    images: [ASSETS.logo],
  },
  robots: {
    index: true,
    follow: true,
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
        <SiteJsonLd />
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
