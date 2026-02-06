import { Container } from "@/components/layout/container"
import { PageHeader } from "@/components/layout/page-header"

const galleryItems = [
  {
    title: "Main Stage Energy",
    description: "Evening performances with full lighting and sound.",
    gradient: "from-rose-200 via-orange-100 to-amber-100",
  },
  {
    title: "Art & Makers Market",
    description: "Local artisans, live demos, and pop-up studios.",
    gradient: "from-sky-200 via-indigo-100 to-slate-100",
  },
  {
    title: "Food Village",
    description: "Chef collaborations and community culinary showcases.",
    gradient: "from-emerald-200 via-lime-100 to-amber-100",
  },
  {
    title: "Workshops",
    description: "Hands-on sessions led by cultural educators.",
    gradient: "from-purple-200 via-pink-100 to-stone-100",
  },
  {
    title: "Family Zone",
    description: "Youth activities, storytelling, and quiet spaces.",
    gradient: "from-cyan-200 via-teal-100 to-lime-100",
  },
  {
    title: "Night Market",
    description: "Late-night vendors, DJs, and pop-up galleries.",
    gradient: "from-orange-200 via-amber-100 to-red-100",
  },
]

export default function GalleryPage() {
  return (
    <>
      <PageHeader
        eyebrow="Gallery"
        title="Scenes from the festival"
        description="A snapshot of the spaces, performances, and community energy you'll experience at Nova MultiFest."
      />

      <section className="pb-12 sm:pb-16">
        <Container>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {galleryItems.map((item) => (
              <figure
                key={item.title}
                className="border-border/80 bg-muted/30 rounded-xl border p-4"
              >
                <div
                  className={`h-40 w-full rounded-lg bg-gradient-to-br ${item.gradient}`}
                  role="img"
                  aria-label={item.title}
                />
                <figcaption className="mt-4 space-y-1">
                  <p className="text-base font-semibold">{item.title}</p>
                  <p className="text-muted-foreground text-sm">
                    {item.description}
                  </p>
                </figcaption>
              </figure>
            ))}
          </div>
        </Container>
      </section>
    </>
  )
}
