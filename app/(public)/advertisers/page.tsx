import Link from "next/link"

import { Container } from "@/components/layout/container"
import { PageHeader } from "@/components/layout/page-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const advertiserPlaceholders = Array.from({ length: 8 }).map((_, index) => ({
  id: `advertiser-${index + 1}`,
}))

export default function AdvertisersPage() {
  return (
    <>
      <PageHeader
        eyebrow="Advertisers"
        title="2024 advertisers"
        description="Thank you to the advertisers who support Nova MultiFest and help bring the festival to the community."
      />

      <section className="pb-12 sm:pb-16">
        <Container>
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Advertiser showcase</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {advertiserPlaceholders.map((item) => (
                    <div
                      key={item.id}
                      className="border-border/80 bg-muted/30 flex h-24 items-center justify-center rounded-lg border text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground"
                    >
                      Advertiser
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="flex flex-wrap items-center gap-3">
              <Button asChild>
                <Link href="/sponsors">Explore sponsorships</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/contact">Contact the team</Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
