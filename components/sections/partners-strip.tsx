import Link from "next/link"

import { Container } from "@/components/layout/container"
import { partners } from "@/lib/constants"

export function PartnersStrip() {
  return (
    <section className="border-t py-10">
      <Container>
        <div className="flex flex-col gap-4">
          <p className="text-muted-foreground text-xs font-semibold uppercase tracking-[0.2em]">
            Our Partners
          </p>
          <div className="flex flex-wrap items-center gap-4">
            {partners.map((partner) => (
              <Link
                key={partner.name}
                href={partner.href}
                target="_blank"
                rel="noreferrer"
                className="border-border/80 text-muted-foreground hover:text-foreground inline-flex items-center rounded-full border px-4 py-2 text-sm font-medium transition"
              >
                {partner.name}
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
