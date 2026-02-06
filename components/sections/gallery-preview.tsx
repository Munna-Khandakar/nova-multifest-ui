import Link from "next/link"

import { Container } from "@/components/layout/container"
import { Button } from "@/components/ui/button"

const galleryHighlights = [
  {
    title: "Live Performances",
    description: "Main stage sets and cultural showcases.",
  },
  {
    title: "Food & Vendors",
    description: "Culinary pop-ups and artisan markets.",
  },
  {
    title: "Community Moments",
    description: "Festival crowds and family activities.",
  },
  {
    title: "Art Installations",
    description: "Interactive art and creative workshops.",
  },
  {
    title: "Night Market",
    description: "Evening entertainment and vendor booths.",
  },
  {
    title: "Waterfront Views",
    description: "Alderney Landing festival grounds.",
  },
]

export function GalleryPreview() {
  return (
    <section className="py-12 sm:py-16">
      <Container>
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-3">
            <p className="text-muted-foreground text-xs font-semibold uppercase tracking-[0.2em]">
              Gallery
            </p>
            <h2 className="text-2xl font-semibold sm:text-3xl">
              Highlights from previous festivals
            </h2>
            <p className="text-muted-foreground max-w-2xl text-base">
              Relive the music, food, and community moments that define Nova
              MultiFest.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {galleryHighlights.map((item) => (
              <div
                key={item.title}
                className="border-border/80 bg-muted/30 rounded-xl border p-4"
              >
                <div className="from-primary/10 via-background to-background h-36 w-full rounded-lg bg-gradient-to-br" />
                <div className="mt-4 space-y-1">
                  <p className="text-base font-semibold">{item.title}</p>
                  <p className="text-muted-foreground text-sm">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <Button asChild variant="outline" className="w-fit">
            <Link href="/gallery">View full gallery</Link>
          </Button>
        </div>
      </Container>
    </section>
  )
}
