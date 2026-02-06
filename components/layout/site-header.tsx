import Link from "next/link"

import { Container } from "@/components/layout/container"
import { MainNav } from "@/components/navigation/main-nav"
import { MobileNav } from "@/components/navigation/mobile-nav"
import { site } from "@/lib/constants"

export function SiteHeader() {
  return (
    <header className="bg-background/95 supports-backdrop-filter:backdrop-blur sticky top-0 z-40 border-b">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link
          href="/"
          className="focus-visible:ring-ring focus-visible:ring-offset-background flex items-center gap-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
        >
          <span className="bg-primary/10 text-primary inline-flex size-9 items-center justify-center rounded-lg text-sm font-semibold">
            NM
          </span>
          <span className="text-base font-semibold tracking-tight">
            {site.name}
          </span>
        </Link>
        <MainNav />
        <MobileNav />
      </Container>
    </header>
  )
}
