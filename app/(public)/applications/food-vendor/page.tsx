import { Container } from "@/components/layout/container"
import { PageHeader } from "@/components/layout/page-header"
import { FoodVendorApplicationForm } from "@/components/sections/food-vendor-application-form"

export default function FoodVendorApplicationPage() {
  return (
    <>
      <PageHeader
        eyebrow="Applications"
        title="Food Vendor Application"
        description="Complete the form below to apply as a food vendor for Nova MultiFest 2025."
      />
      <section className="pb-12 sm:pb-16">
        <Container>
          <FoodVendorApplicationForm />
        </Container>
      </section>
    </>
  )
}
