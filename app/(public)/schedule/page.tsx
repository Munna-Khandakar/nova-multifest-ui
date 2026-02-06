import { Container } from "@/components/layout/container"
import { PageHeader } from "@/components/layout/page-header"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const schedule = [
  {
    day: "Friday",
    date: "August 21",
    focus: "Opening night and community welcome",
    items: [
      {
        time: "4:00 PM",
        title: "Gates open + art market",
        location: "Riverfront Plaza",
        type: "Community",
      },
      {
        time: "6:00 PM",
        title: "Sunset drum circle",
        location: "Main Stage",
        type: "Performance",
      },
      {
        time: "8:30 PM",
        title: "Headliner showcase",
        location: "Main Stage",
        type: "Performance",
      },
    ],
  },
  {
    day: "Saturday",
    date: "August 22",
    focus: "Workshops, food village, and cultural showcases",
    items: [
      {
        time: "11:00 AM",
        title: "Global food lab demo",
        location: "Culinary Tent",
        type: "Workshop",
      },
      {
        time: "2:00 PM",
        title: "Youth talent showcase",
        location: "Community Stage",
        type: "Performance",
      },
      {
        time: "7:00 PM",
        title: "Night market + DJ set",
        location: "Riverwalk",
        type: "Community",
      },
    ],
  },
  {
    day: "Sunday",
    date: "August 23",
    focus: "Family day and closing celebration",
    items: [
      {
        time: "10:00 AM",
        title: "Family wellness sessions",
        location: "Garden Lawn",
        type: "Workshop",
      },
      {
        time: "1:30 PM",
        title: "Cultural parade",
        location: "Riverfront Loop",
        type: "Community",
      },
      {
        time: "5:00 PM",
        title: "Closing concert",
        location: "Main Stage",
        type: "Performance",
      },
    ],
  },
]

export default function SchedulePage() {
  return (
    <>
      <PageHeader
        eyebrow="Schedule"
        title="Festival schedule overview"
        description="Plan your weekend with highlights from each day. Full schedule updates will be announced weekly."
      />

      <section className="pb-12 sm:pb-16">
        <Container>
          <div className="grid gap-6 lg:grid-cols-3">
            {schedule.map((day) => (
              <Card key={day.day} className="h-full">
                <CardHeader>
                  <CardTitle>
                    {day.day} · {day.date}
                  </CardTitle>
                  <CardDescription>{day.focus}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {day.items.map((item) => (
                    <div
                      key={item.title}
                      className="border-border/70 flex flex-col gap-2 border-b pb-4 last:border-b-0 last:pb-0"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-sm font-semibold">{item.time}</p>
                        <Badge variant="secondary">{item.type}</Badge>
                      </div>
                      <div>
                        <p className="font-medium">{item.title}</p>
                        <p className="text-muted-foreground text-sm">
                          {item.location}
                        </p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>
    </>
  )
}
