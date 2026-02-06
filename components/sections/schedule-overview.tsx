import Link from "next/link"

import { Container } from "@/components/layout/container"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { eventMapUrl, eventSchedule } from "@/lib/constants"

export function ScheduleOverview() {
  return (
    <section className="py-12 sm:py-16">
      <Container>
        <div className="grid gap-6 lg:grid-cols-[1fr_0.8fr]">
          <div className="flex flex-col gap-3">
            <p className="text-muted-foreground text-xs font-semibold uppercase tracking-[0.2em]">
              Event Schedule
            </p>
            <h2 className="text-2xl font-semibold sm:text-3xl">
              Our event schedule
            </h2>
            <p className="text-muted-foreground max-w-xl text-base">
              Plan your weekend around performances, food vendors, and cultural
              showcases across the festival grounds.
            </p>
            <div className="mt-2 flex flex-wrap gap-3">
              <Button asChild variant="outline">
                <Link href="/schedule">Full schedule</Link>
              </Button>
              <Button asChild variant="secondary">
                <Link href={eventMapUrl} target="_blank" rel="noreferrer">
                  Event map (PDF)
                </Link>
              </Button>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Festival hours</CardTitle>
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
        </div>
      </Container>
    </section>
  )
}
