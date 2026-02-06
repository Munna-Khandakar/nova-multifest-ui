import { Container } from "@/components/layout/container"
import { PageHeader } from "@/components/layout/page-header"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { site } from "@/lib/constants"

const values = [
  {
    title: "Culture-forward programming",
    description:
      "We co-create the lineup with local cultural organizations to amplify underrepresented voices.",
  },
  {
    title: "Community partnerships",
    description:
      "Every stage and workshop is supported by nonprofit and small business partners.",
  },
  {
    title: "Accessible by design",
    description:
      "Our venues include quiet zones, translation support, and accessible transit info.",
  },
]

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title={`About ${site.name}`}
        description="Nova MultiFest is a multi-day celebration of music, art, and global culture in Northern Virginia."
      />

      <section className="pb-12 sm:pb-16">
        <Container>
          <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
            <Card>
              <CardHeader>
                <CardTitle>Our story</CardTitle>
                <CardDescription>
                  A gathering built by neighbors and artists.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-muted-foreground space-y-4">
                <p>
                  Nova MultiFest began as a block-party collaboration between
                  local artists, cultural nonprofits, and the city’s creative
                  economy office. The goal was simple: make it easier for
                  communities to share music, food, and stories with one
                  another.
                </p>
                <p>
                  Today, the festival brings together more than 120 performers
                  and vendors across three stages, plus curated workshops for
                  youth and emerging talent.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>What to expect</CardTitle>
                <CardDescription>
                  A full weekend of curated programming.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-muted-foreground space-y-4">
                <p>
                  Plan for live performances, culinary showcases, film
                  screenings, and open studios. The schedule balances marquee
                  acts with community spotlights so every attendee finds their
                  new favorite artist.
                </p>
                <p>
                  Evening programming is ticketed to keep daytime activities
                  free, with discounted passes for students and families.
                </p>
              </CardContent>
            </Card>
          </div>
        </Container>
      </section>

      <section className="pb-12 sm:pb-16">
        <Container>
          <div className="grid gap-4 md:grid-cols-3">
            {values.map((value) => (
              <Card key={value.title}>
                <CardHeader>
                  <CardTitle>{value.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  {value.description}
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>
    </>
  )
}
