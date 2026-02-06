import Link from "next/link"

import { Container } from "@/components/layout/container"
import { Separator } from "@/components/ui/separator"
import {
  applicationLinks,
  quickLinks,
  site,
  socialLinks,
} from "@/lib/constants"

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
            <div className="flex flex-wrap gap-2">
              {socialLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-muted-foreground hover:text-foreground text-xs font-semibold uppercase tracking-[0.2em]"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Quick Links
            </p>
            <nav className="flex flex-col gap-2" aria-label="Quick links">
              {quickLinks.map((item) => {
                const isExternal = item.href.startsWith("http")

                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noreferrer" : undefined}
                    className="text-sm text-muted-foreground transition hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                )
              })}
            </nav>
          </div>

          <div className="flex flex-col gap-3">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Applications
            </p>
            <nav className="flex flex-col gap-2" aria-label="Applications">
              {applicationLinks.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
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
          <span>Built with community partners across Nova Scotia.</span>
        </div>
      </Container>
    </footer>
  )
}
