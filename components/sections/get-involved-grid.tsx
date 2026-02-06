import Link from "next/link"

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/layout/container"
import { getInvolvedItems } from "@/lib/constants"

export function GetInvolvedGrid() {
  return (
    <section id="get-involved" className="py-12 sm:py-16">
      <Container>
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-3">
            <p className="text-muted-foreground text-xs font-semibold uppercase tracking-[0.2em]">
              Get Involved
            </p>
            <h2 className="text-2xl font-semibold sm:text-3xl">
              Bring your talents to the festival
            </h2>
            <p className="text-muted-foreground max-w-2xl text-base">
              From backstage support to community sponsorships, there are many
              ways to help shape the experience.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {getInvolvedItems.map((item) => {
              const Icon = item.icon

              return (
                <Card
                  key={item.title}
                  id={item.title.toLowerCase().replace(/\s+/g, "-")}
                  className="scroll-mt-24 h-full"
                >
                  <CardHeader className="flex-row items-center gap-3">
                    <span className="bg-primary/10 text-primary inline-flex size-10 items-center justify-center rounded-lg">
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    <CardTitle>{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-muted-foreground">
                    {item.description}
                  </CardContent>
                  <CardFooter>
                    <Button asChild variant="outline" size="sm">
                      <Link href={item.href} target="_blank" rel="noreferrer">
                        Apply now
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              )
            })}
          </div>
        </div>
      </Container>
    </section>
  )
}
