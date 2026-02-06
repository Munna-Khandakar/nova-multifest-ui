import { Container } from "@/components/layout/container"
import { Card, CardContent } from "@/components/ui/card"
import { missionStatement, stats } from "@/lib/constants"

export function MissionSection() {
  return (
    <section className="py-12 sm:py-16">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="flex flex-col gap-4">
            <p className="text-muted-foreground text-xs font-semibold uppercase tracking-[0.2em]">
              Nova Multifest
            </p>
            <h2 className="text-2xl font-semibold sm:text-3xl">
              Nova Multifest: Art, Culture, and Diversity
            </h2>
            <p className="text-muted-foreground text-base">{missionStatement}</p>
          </div>

          <Card className="bg-muted/40">
            <CardContent className="grid gap-6 pt-6 sm:grid-cols-3">
              {stats.map((stat) => (
                <div key={stat.label} className="flex flex-col gap-1">
                  <p className="text-2xl font-semibold">{stat.value}</p>
                  <p className="text-muted-foreground text-sm">{stat.label}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </Container>
    </section>
  )
}
