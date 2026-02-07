import { Container } from "@/components/layout/container"
import { PageHeader } from "@/components/layout/page-header"
import { VolunteerApplicationForm } from "@/components/sections/volunteer-application-form"

export default function VolunteerApplicationPage() {
  return (
    <>
      <PageHeader
        eyebrow="Applications"
        title="Volunteer Application"
        description="Complete the form below to volunteer with Nova MultiFest 2025."
      />
      <section className="pb-12 sm:pb-16">
        <Container>
          <VolunteerApplicationForm />
        </Container>
      </section>
    </>
  )
}
