import type { Metadata } from "next"

// Pages opened from security emails, with a single-use token in the URL. No
// third-party scripts in this group (analytics belongs in
// (marketing)/layout.tsx), and nothing here is indexed.
export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
}

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
