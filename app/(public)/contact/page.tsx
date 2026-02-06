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
import { applicationLinks, socialLinks, site } from "@/lib/constants"

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Get in touch"
        description="Connect with the Nova Multifest Society team and follow along for announcements."
      />

      <section className="pb-12 sm:pb-16">
        <Container>
          <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr]">
            <Card className="h-fit">
              <CardHeader>
                <CardTitle>Festival location</CardTitle>
                <CardDescription>
                  {site.dates} · {site.location}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  Nova MultiFest is hosted at Alderney Landing on the Dartmouth
                  waterfront. Follow our social channels for updates on
                  programming, applications, and community events.
                </p>
                <div className="flex flex-wrap gap-2">
                  {socialLinks.map((link) => (
                    <Button key={link.label} asChild variant="outline">
                      <Link href={link.href} target="_blank" rel="noreferrer">
                        {link.label}
                      </Link>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Applications & resources</CardTitle>
                <CardDescription>
                  Submit an application or download the sponsorship package.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {applicationLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="border-border/80 text-muted-foreground hover:text-foreground flex items-center justify-between rounded-lg border px-4 py-3 text-sm font-medium transition"
                  >
                    {link.label}
                    <span className="text-xs uppercase tracking-[0.2em]">
                      Open
                    </span>
                  </Link>
                ))}
                <Button asChild className="w-full">
                  <Link href="/applications">View all applications</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </Container>
      </section>
    </>
  )
}
