import Link from "next/link"
import { HeartHandshake } from "lucide-react"

import { Container } from "@/components/layout/container"
import { PageHeader } from "@/components/layout/page-header"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const tiers = [
  {
    title: "Community Friend",
    amount: "$25",
    description: "Covers art supplies and volunteer meals.",
  },
  {
    title: "Stage Sponsor",
    amount: "$100",
    description: "Supports a full evening of live performances.",
  },
  {
    title: "Youth Champion",
    amount: "$250",
    description: "Funds youth workshops and mentorship sessions.",
  },
]

export default function DonatePage() {
  return (
    <>
      <PageHeader
        eyebrow="Donate"
        title="Keep the festival free and community-led"
        description="Your contribution helps us provide free daytime access, pay artists, and expand cultural programming."
      />

      <section className="pb-12 sm:pb-16">
        <Container>
          <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Why give?</CardTitle>
                <CardDescription>
                  Every gift goes directly to programming, artist stipends, and
                  accessibility services.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-muted-foreground space-y-4">
                <p>
                  Nova MultiFest remains free for daytime attendance because of
                  community donors and sponsor partners. Your support helps us
                  provide translation, ASL interpretation, and youth learning
                  tracks.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button asChild>
                    <Link href="/contact">Become a sponsor</Link>
                  </Button>
                  <Button asChild variant="outline">
                    <Link href="/schedule">Explore programming</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-4">
              {tiers.map((tier) => (
                <Card key={tier.title}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      {tier.title}
                      <span className="text-primary text-lg font-semibold">
                        {tier.amount}
                      </span>
                    </CardTitle>
                    <CardDescription>{tier.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button asChild variant="outline" className="w-full">
                      <Link href="/contact">
                        <HeartHandshake className="size-4" aria-hidden="true" />
                        Give {tier.amount}
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
