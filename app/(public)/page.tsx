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
    <div className="relative isolate">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background" />
        <div className="confetti-drift-slow absolute inset-0 bg-[url('/celebration-texture.svg')] bg-[length:280px_280px] opacity-20" />
        <div className="confetti-drift-fast absolute inset-0 bg-[url('/celebration-texture.svg')] bg-[length:360px_360px] opacity-12 mix-blend-multiply" />
      </div>
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
    </div>
  )
}
