"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { getInvolvedNav, mainNav } from "@/lib/nav"
import { site } from "@/lib/constants"
import { cn } from "@/lib/utils"

export function MobileNav() {
  const pathname = usePathname()

  return (
    <div className="lg:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" aria-label="Open menu">
            <Menu className="size-5" aria-hidden="true" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="px-0 overflow-y-auto">
          <SheetHeader className="px-6">
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <SheetTitle>{site.name}</SheetTitle>
                <SheetDescription>Explore the festival.</SheetDescription>
              </div>
              <SheetClose asChild>
                <Button variant="ghost" size="icon" aria-label="Close menu">
                  <X className="size-4" aria-hidden="true" />
                </Button>
              </SheetClose>
            </div>
          </SheetHeader>

          <nav className="flex flex-col gap-2 px-6 py-4" aria-label="Mobile navigation">
            <p className="text-muted-foreground text-xs font-semibold uppercase tracking-[0.2em]">
              Explore
            </p>
            {mainNav.map((item) => {
              const isActive = pathname === item.href
              const Icon = item.icon

              return (
                <SheetClose key={item.label} asChild>
                  <Link
                    href={item.href}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "text-muted-foreground hover:text-foreground focus-visible:ring-ring focus-visible:ring-offset-background flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
                      isActive && "bg-muted/70 text-foreground"
                    )}
                  >
                    <Icon className="size-4" aria-hidden="true" />
                    {item.label}
                  </Link>
                </SheetClose>
              )
            })}

            <Separator className="my-2" />

            <p className="text-muted-foreground text-xs font-semibold uppercase tracking-[0.2em]">
              Get Involved
            </p>
            {getInvolvedNav.map((item) => {
              const Icon = item.icon

              return (
                <SheetClose key={item.label} asChild>
                  <Link
                    href={item.href}
                    className="hover:text-foreground focus-visible:ring-ring focus-visible:ring-offset-background group flex items-start gap-3 rounded-lg px-3 py-2 text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                  >
                    <span className="bg-primary/10 text-primary mt-0.5 inline-flex size-8 items-center justify-center rounded-lg">
                      <Icon className="size-4" aria-hidden="true" />
                    </span>
                    <span className="flex flex-col gap-1">
                      <span className="font-medium">{item.label}</span>
                      <span className="text-muted-foreground text-xs">
                        {item.description}
                      </span>
                    </span>
                  </Link>
                </SheetClose>
              )
            })}
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  )
}
