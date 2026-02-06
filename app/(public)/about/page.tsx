import Link from "next/link"

import { Container } from "@/components/layout/container"
import { PageHeader } from "@/components/layout/page-header"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { missionStatement, site } from "@/lib/constants"

const focusAreas = [
  {
    title: "Multicultural festivals",
    description:
      "A signature waterfront festival celebrating music, dance, art, and food.",
  },
  {
    title: "Community engagement",
    description:
      "Regular cultural gatherings that build intercultural relationships.",
  },
  {
    title: "Preserving traditions",
    description:
      "Programs that highlight heritage, storytelling, and creative exchange.",
  },
]

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title={`About ${site.name}`}
        description="Nova Multifest Society promotes art, culture, and diversity across Nova Scotia."
      />

      <section className="pb-12 sm:pb-16">
        <Container>
          <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
            <Card>
              <CardHeader>
                <CardTitle>Our mission</CardTitle>
                <CardDescription>Art, culture, and diversity.</CardDescription>
              </CardHeader>
              <CardContent className="text-muted-foreground space-y-4">
                <p>{missionStatement}</p>
                <div className="flex flex-wrap gap-3">
                  <Button asChild>
                    <Link href="/applications">Apply to participate</Link>
                  </Button>
                  <Button asChild variant="outline">
                    <Link href="/contact">Contact us</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>What we do</CardTitle>
                <CardDescription>
                  Cultural programming and year-round initiatives.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-muted-foreground space-y-4">
                {focusAreas.map((item) => (
                  <div key={item.title}>
                    <p className="font-medium text-foreground">{item.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </Container>
      </section>
    </>
  )
}
