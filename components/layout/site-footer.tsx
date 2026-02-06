import Link from "next/link"

import { Container } from "@/components/layout/container"
import { Separator } from "@/components/ui/separator"
import { footerNav, getInvolvedNav } from "@/lib/nav"
import { site } from "@/lib/constants"

export function SiteFooter() {
  return (
    <footer className="border-t">
      <Container className="flex flex-col gap-8 py-10">
        <div className="grid gap-8 md:grid-cols-[1.4fr_1fr_1fr]">
          <div className="flex flex-col gap-3">
            <h2 className="text-lg font-semibold">{site.name}</h2>
            <p className="text-muted-foreground text-sm">
              {site.tagline} Join us in {site.city} for three days of music,
              art, and community connection.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Festival
            </p>
            <nav className="flex flex-col gap-2" aria-label="Footer">
              {footerNav.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-sm text-muted-foreground transition hover:text-foreground"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex flex-col gap-3">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Get Involved
            </p>
            <nav className="flex flex-col gap-2" aria-label="Get involved">
              {getInvolvedNav.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-sm text-muted-foreground transition hover:text-foreground"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        <Separator />

        <div className="flex flex-col gap-2 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </span>
          <span>Built with community partners across Northern Virginia.</span>
        </div>
      </Container>
    </footer>
  )
}
