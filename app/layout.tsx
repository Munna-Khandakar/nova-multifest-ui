import type { Metadata } from "next"

import { SiteFooter } from "@/components/layout/site-footer"
import { SiteHeader } from "@/components/layout/site-header"

import "./globals.css"

export const metadata: Metadata = {
  title: "Nova MultiFest",
  description:
    "Nova MultiFest is a three-day celebration of art, culture, and diversity in Dartmouth, Nova Scotia.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <div className="relative isolate flex min-h-screen flex-col">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background" />
            <div className="confetti-drift-slow absolute inset-0 bg-[url('/celebration-texture.svg')] bg-[length:280px_280px] opacity-20" />
            <div className="confetti-drift-fast absolute inset-0 bg-[url('/celebration-texture.svg')] bg-[length:360px_360px] opacity-12 mix-blend-multiply" />
          </div>
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  )
}
