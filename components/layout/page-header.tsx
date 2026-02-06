import { Container } from "@/components/layout/container"
import { cn } from "@/lib/utils"

type PageHeaderProps = {
  title: string
  description?: string
  eyebrow?: string
  className?: string
}

export function PageHeader({
  title,
  description,
  eyebrow,
  className,
}: PageHeaderProps) {
  return (
    <section className={cn("py-12 sm:py-16", className)}>
      <Container>
        <div className="flex flex-col gap-3">
          {eyebrow ? (
            <p className="text-muted-foreground text-xs font-semibold uppercase tracking-[0.2em]">
              {eyebrow}
            </p>
          ) : null}
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            {title}
          </h1>
          {description ? (
            <p className="text-muted-foreground max-w-2xl text-base sm:text-lg">
              {description}
            </p>
          ) : null}
        </div>
      </Container>
    </section>
  )
}
