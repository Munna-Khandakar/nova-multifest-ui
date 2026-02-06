import { Container } from "@/components/layout/container"
import { PageHeader } from "@/components/layout/page-header"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { VolunteerForm } from "@/components/sections/volunteer-form"

const contactDetails = [
  {
    label: "General inquiries",
    value: "hello@novamultifest.org",
  },
  {
    label: "Vendor relations",
    value: "vendors@novamultifest.org",
  },
  {
    label: "Sponsorship",
    value: "partners@novamultifest.org",
  },
]

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Get in touch"
        description="Reach out to our team or submit a volunteer application below. We respond within two business days."
      />

      <section className="pb-12 sm:pb-16">
        <Container>
          <div className="grid gap-6 lg:grid-cols-[1fr_1.4fr]">
            <Card className="h-fit">
              <CardHeader>
                <CardTitle>Contact information</CardTitle>
                <CardDescription>
                  Our inboxes are monitored Monday through Friday.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {contactDetails.map((detail) => (
                  <div key={detail.label}>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                      {detail.label}
                    </p>
                    <p className="text-sm font-medium">{detail.value}</p>
                  </div>
                ))}
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                    Office hours
                  </p>
                  <p className="text-sm font-medium">9:00 AM – 5:00 PM ET</p>
                </div>
              </CardContent>
            </Card>

            <VolunteerForm id="volunteer" className="scroll-mt-24" />
          </div>
        </Container>
      </section>
    </>
  )
}
