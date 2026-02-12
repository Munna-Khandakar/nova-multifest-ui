import Link from "next/link"

import { HeroSection } from "@/components/sections/hero-section"
import { InfoCards } from "@/components/sections/info-cards"
import { ScheduleOverview } from "@/components/sections/schedule-overview"
import { GetInvolvedGrid } from "@/components/sections/get-involved-grid"
import { MissionSection } from "@/components/sections/mission-section"
import { GalleryPreview } from "@/components/sections/gallery-preview"
import { PartnersStrip } from "@/components/sections/partners-strip"
import { Container } from "@/components/layout/container"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <InfoCards />
      <ScheduleOverview />
      <GetInvolvedGrid />
      <MissionSection />
      <GalleryPreview />

      <section className="py-12 sm:py-16">
        <Container>
          <Card className="from-primary/10 to-background bg-gradient-to-br">
            <CardHeader>
              <CardTitle>Join the celebration</CardTitle>
              <CardDescription>
                Applications are open for performers, vendors, volunteers, and
                community sponsors.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-3">
              <Button asChild>
                <Link href="/applications">Apply now</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/donate">Donate</Link>
              </Button>
            </CardContent>
          </Card>
        </Container>
      </section>

      <PartnersStrip />
    </>
  )
}
