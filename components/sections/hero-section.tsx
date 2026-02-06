"use client"

import Link from "next/link"
import { motion, useReducedMotion } from "framer-motion"
import { ArrowRight, CalendarDays, MapPin } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Container } from "@/components/layout/container"
import { createFadeUp, staggerContainer } from "@/lib/animations"
import { eventSchedule, site } from "@/lib/constants"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function HeroSection() {
  const prefersReducedMotion = useReducedMotion()
  const fadeUp = createFadeUp(prefersReducedMotion ?? false)

  return (
    <section className="relative overflow-hidden border-b">
      <div className="from-primary/10 via-background to-background absolute inset-0 bg-gradient-to-br" />
      <Container className="relative py-16 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            className="flex flex-col gap-6"
          >
            <motion.p
              variants={fadeUp}
              className="text-muted-foreground flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em]"
            >
              <span className="bg-primary/20 text-primary inline-flex h-2 w-2 rounded-full" />
              {site.tagline}
            </motion.p>

            <motion.h1
              variants={fadeUp}
              className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl"
            >
              {site.name}
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-muted-foreground max-w-2xl text-base sm:text-lg"
            >
              Celebrate music, food, and cultural exchange with a full weekend
              of performances, vendors, and community experiences on the
              Dartmouth waterfront.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="text-muted-foreground flex flex-wrap items-center gap-4 text-sm"
            >
              <span className="inline-flex items-center gap-2">
                <CalendarDays className="size-4" aria-hidden="true" />
                {site.dates}
              </span>
              <span className="inline-flex items-center gap-2">
                <MapPin className="size-4" aria-hidden="true" />
                {site.location}
              </span>
            </motion.div>

            <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
              <Button asChild>
                <Link href="/applications">
                  Apply Now
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/schedule">View Schedule</Link>
              </Button>
              <Button asChild variant="secondary">
                <Link href="/donate">Donate</Link>
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="flex flex-col gap-4"
          >
            <Card className="bg-background/80">
              <CardHeader>
                <CardTitle className="text-lg">Our Event Schedule</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {eventSchedule.map((item) => (
                  <div
                    key={item.day}
                    className="border-border/70 flex items-center justify-between gap-4 border-b pb-3 last:border-b-0 last:pb-0"
                  >
                    <div>
                      <p className="text-sm font-semibold">{item.day}</p>
                      <p className="text-muted-foreground text-xs">
                        {item.date}
                      </p>
                    </div>
                    <p className="text-sm font-medium">{item.time}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
