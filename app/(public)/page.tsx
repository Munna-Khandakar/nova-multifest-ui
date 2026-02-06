import Link from "next/link"
import { Mic2, Palette, Sparkles, Utensils } from "lucide-react"

import { HeroSection } from "@/components/sections/hero-section"
import { InfoCards } from "@/components/sections/info-cards"
import { GetInvolvedGrid } from "@/components/sections/get-involved-grid"
import { Container } from "@/components/layout/container"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const highlights = [
  {
    title: "Main Stage",
    description: "Headliners, community showcases, and sunset performances.",
    detail:
      "Enjoy curated lineups with seating pods and premium audio throughout the night.",
    icon: Mic2,
  },
  {
    title: "Art & Makers",
    description: "Interactive murals, gallery walk-throughs, and workshops.",
    detail:
      "Meet the artists behind the work and join drop-in sessions all weekend.",
    icon: Palette,
  },
  {
    title: "Food Village",
    description: "Chef pop-ups and international bites from local vendors.",
    detail:
      "Sample rotating menus, cooking demos, and late-night dessert carts.",
    icon: Utensils,
  },
  {
    title: "Family Zone",
    description: "Hands-on activities, storytelling, and youth showcases.",
    detail:
      "Explore quiet corners, sensory-friendly programming, and youth stages.",
    icon: Sparkles,
  },
]

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <InfoCards />

      <section className="py-12 sm:py-16">
        <Container>
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-3">
              <p className="text-muted-foreground text-xs font-semibold uppercase tracking-[0.2em]">
                Festival Highlights
              </p>
              <h2 className="text-2xl font-semibold sm:text-3xl">
                Experiences curated for every kind of visitor
              </h2>
              <p className="text-muted-foreground max-w-2xl text-base">
                Explore curated stages, culinary pop-ups, and interactive
                installations designed to spotlight local and global talent.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {highlights.map((item) => {
                const Icon = item.icon

                return (
                  <Card key={item.title}>
                    <CardHeader className="flex-row items-center gap-3">
                      <span className="bg-primary/10 text-primary inline-flex size-10 items-center justify-center rounded-lg">
                        <Icon className="size-5" aria-hidden="true" />
                      </span>
                      <div>
                        <CardTitle>{item.title}</CardTitle>
                        <CardDescription>{item.description}</CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent className="text-muted-foreground">
                      {item.detail}
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </Container>
      </section>

      <GetInvolvedGrid />

      <section className="py-12 sm:py-16">
        <Container>
          <Card className="from-primary/10 to-background bg-gradient-to-br">
            <CardHeader>
              <CardTitle>Plan your weekend now</CardTitle>
              <CardDescription>
                Get early access to schedules, artist announcements, and
                workshop sign-ups.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-3">
              <Button asChild>
                <Link href="/schedule">View schedule</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/contact">Join the volunteer list</Link>
              </Button>
            </CardContent>
          </Card>
        </Container>
      </section>
    </>
  )
}
