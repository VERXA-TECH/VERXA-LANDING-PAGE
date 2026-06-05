const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.verxa.io"

const siteDescription =
  "Verxa is a global digital finance platform that lets you hold, send, receive, and convert both traditional and digital currencies, all from one account."

export function SiteJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: "Verxa",
        url: siteUrl,
        logo: `${siteUrl}/favicon-48x48.png`,
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: "Verxa",
        description: siteDescription,
        publisher: { "@id": `${siteUrl}/#organization` },
      },
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
