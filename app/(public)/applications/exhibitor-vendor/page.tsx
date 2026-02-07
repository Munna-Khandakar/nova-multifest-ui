import { Container } from "@/components/layout/container"
import { PageHeader } from "@/components/layout/page-header"
import { ExhibitorVendorApplicationForm } from "@/components/sections/exhibitor-vendor-application-form"

export default function ExhibitorVendorApplicationPage() {
  return (
    <>
      <PageHeader
        eyebrow="Applications"
        title="Exhibitor Vendor Application"
        description="Complete the form below to apply as an exhibitor vendor for Nova MultiFest 2025."
      />
      <section className="pb-12 sm:pb-16">
        <Container>
          <ExhibitorVendorApplicationForm />
        </Container>
      </section>
    </>
  )
}
