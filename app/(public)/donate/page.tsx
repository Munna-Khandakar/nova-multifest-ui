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

const donateUrl = "https://www.paypal.com/donate/?hosted_button_id=Z7GJX9T72KNPG"

export default function DonatePage() {
  return (
    <>
      <PageHeader
        eyebrow="Donate"
        title="Help provide meals and keep the festival free"
        description="Support Nova Multifest Society as we provide meals to individuals facing homelessness and keep community programming accessible."
      />

      <section className="pb-12 sm:pb-16">
        <Container>
          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Homelessness support program</CardTitle>
                <CardDescription>
                  Donate to our meal voucher initiative during Nova MultiFest.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-muted-foreground space-y-4">
                <p>
                  Nova Multifest Society partners with local vendors to provide
                  food vouchers for individuals experiencing homelessness. Your
                  contribution ensures that the festival remains welcoming and
                  supportive for everyone in our community.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button asChild>
                    <Link href={donateUrl} target="_blank" rel="noreferrer">
                      Help now
                    </Link>
                  </Button>
                  <Button asChild variant="outline">
                    <Link href="/applications">Apply or volunteer</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Every gift matters</CardTitle>
                <CardDescription>
                  Your donation directly funds meal vouchers and community
                  services.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div>
                    <p className="text-sm font-semibold">Meal voucher</p>
                    <p className="text-muted-foreground text-xs">
                      Helps cover one warm meal for a community member.
                    </p>
                  </div>
                  <span className="text-primary text-lg font-semibold">
                    $10
                  </span>
                </div>
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div>
                    <p className="text-sm font-semibold">Community pack</p>
                    <p className="text-muted-foreground text-xs">
                      Supports a day of meal vouchers for families.
                    </p>
                  </div>
                  <span className="text-primary text-lg font-semibold">
                    $50
                  </span>
                </div>
                <Button asChild variant="outline" className="w-full">
                  <Link href={donateUrl} target="_blank" rel="noreferrer">
                    <HeartHandshake className="size-4" aria-hidden="true" />
                    Donate via PayPal
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
