import Script from "next/script"
import { GA_MEASUREMENT_ID } from "@/lib/analytics"

// Google Analytics loads for the marketing pages only. Its page view carries
// the full URL, and the pages under (account) are opened from security emails
// with a single-use token in theirs. Put any other third-party script here too,
// never in the root layout.
export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}');
        `}
      </Script>
    </>
  )
}
