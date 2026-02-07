import Link from "next/link"
import { FileText, ExternalLink } from "lucide-react"

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
import { applicationLinks } from "@/lib/constants"

const applicationItems = [
  {
    title: "Food Vendor Application",
    description:
      "Apply to serve food and beverages at Nova MultiFest. Vendors are responsible for permits, insurance, and health regulations.",
    href: "/applications/food-vendor",
  },
  {
    title: "Exhibitor Vendor Application",
    description:
      "Apply to showcase products, services, or artisan goods during the festival weekend.",
    href: "/applications/exhibitor-vendor",
  },
  {
    title: "Performer Application",
    description:
      "Apply to perform on our stages and celebrate multicultural artistry.",
    href: "https://multifestns.ca/applications/performer",
  },
  {
    title: "Volunteer Application",
    description:
      "Join the volunteer team and support festival operations across the weekend.",
    href: "https://multifestns.ca/applications/volunteer",
  },
]

export default function ApplicationsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Applications"
        title="Applications are now live"
        description="Submit your application for Nova MultiFest 2025. Choose the category that best fits your role."
      />

      <section className="pb-12 sm:pb-16">
        <Container>
          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="grid gap-4">
              {applicationItems.map((item) => (
                <Card key={item.title}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <ExternalLink className="size-4" aria-hidden="true" />
                      {item.title}
                    </CardTitle>
                    <CardDescription>{item.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button asChild variant="outline">
                      <Link
                        href={item.href}
                        target={item.href.startsWith("http") ? "_blank" : undefined}
                        rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                      >
                        Apply now
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="h-fit">
              <CardHeader>
                <CardTitle>Sponsorship package</CardTitle>
                <CardDescription>
                  Review sponsorship opportunities and benefits for 2025.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button asChild variant="outline" className="w-full">
                  <Link
                    href={applicationLinks.find((link) => link.label === "Sponsorship Package")?.href ?? "#"}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <FileText className="size-4" aria-hidden="true" />
                    Download sponsorship package
                  </Link>
                </Button>
                <Button asChild className="w-full">
                  <Link href="/sponsors">Learn about sponsorships</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </Container>
      </section>
    </>
  )
}
