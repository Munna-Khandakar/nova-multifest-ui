import Link from "next/link"

import { Container } from "@/components/layout/container"
import { announcement } from "@/lib/constants"

export function SiteBanner() {
  return (
    <div className="bg-primary text-primary-foreground">
      <Container className="flex flex-col items-start gap-2 py-2 text-xs font-semibold uppercase tracking-[0.16em] sm:flex-row sm:items-center sm:justify-between">
        <span>{announcement}</span>
        <Link
          href="/applications"
          className="bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/20 inline-flex items-center rounded-full px-3 py-1 text-[0.65rem] font-semibold tracking-[0.2em] transition"
        >
          Apply Now
        </Link>
      </Container>
    </div>
  )
}
