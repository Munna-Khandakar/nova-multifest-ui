import Link from "next/link"

import { Container } from "@/components/layout/container"
import { PageHeader } from "@/components/layout/page-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { eventMapUrl, eventSchedule } from "@/lib/constants"

export default function SchedulePage() {
  return (
    <>
      <PageHeader
        eyebrow="Schedule"
        title="Festival schedule"
        description="Our event schedule highlights the festival hours for each day."
      />

      <section className="pb-12 sm:pb-16">
        <Container>
          <div className="grid gap-6 lg:grid-cols-[1fr_0.7fr]">
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

            <Card className="bg-muted/40">
              <CardHeader>
                <CardTitle>Event map</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground text-sm">
                  Download the event map to plan your route through stages,
                  vendors, and activity zones at Alderney Landing.
                </p>
                <Button asChild variant="outline">
                  <Link href={eventMapUrl} target="_blank" rel="noreferrer">
                    View event map (PDF)
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </Container>
      </section>
    </>
  )
}
