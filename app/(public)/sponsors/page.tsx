import Link from "next/link"

import { Container } from "@/components/layout/container"
import { PageHeader } from "@/components/layout/page-header"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { applicationLinks, partners } from "@/lib/constants"

export default function SponsorsPage() {
  const sponsorshipPackage = applicationLinks.find(
    (link) => link.label === "Sponsorship Package"
  )

  return (
    <>
      <PageHeader
        eyebrow="Sponsors"
        title="Support Nova MultiFest"
        description="Partner with Nova Multifest Society and celebrate multiculturalism with the community."
      />

      <section className="pb-12 sm:pb-16">
        <Container>
          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Why sponsor?</CardTitle>
                <CardDescription>
                  Sponsorships help keep the festival free while amplifying
                  cultural artistry and community programming.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-muted-foreground space-y-4">
                <p>
                  Nova MultiFest is powered by community partners who believe
                  in celebrating culture, art, and diversity. Sponsorships help
                  fund programming, artist stipends, and community engagement.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button asChild>
                    <Link href="/applications">View applications</Link>
                  </Button>
                  {sponsorshipPackage ? (
                    <Button asChild variant="outline">
                      <Link
                        href={sponsorshipPackage.href}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Download sponsorship package
                      </Link>
                    </Button>
                  ) : null}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Community partners</CardTitle>
                <CardDescription>
                  Thank you to our festival supporters.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {partners.map((partner) => (
                  <Link
                    key={partner.name}
                    href={partner.href}
                    target="_blank"
                    rel="noreferrer"
                    className="border-border/80 text-muted-foreground hover:text-foreground flex items-center justify-between rounded-lg border px-4 py-3 text-sm font-medium transition"
                  >
                    {partner.name}
                    <span className="text-xs uppercase tracking-[0.2em]">
                      Partner
                    </span>
                  </Link>
                ))}
              </CardContent>
            </Card>
          </div>
        </Container>
      </section>
    </>
  )
}
