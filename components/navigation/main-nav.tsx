"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { getInvolvedNav, mainNav } from "@/lib/nav"

export function MainNav() {
  const pathname = usePathname()
  const donateItem = mainNav.find((item) => item.label === "Donate")
  const primaryItems = mainNav.filter((item) => item.label !== "Donate")

  return (
    <nav
      className="hidden items-center gap-2 lg:flex"
      aria-label="Primary navigation"
    >
      {primaryItems.map((item) => {
        const isActive = pathname === item.href
        const Icon = item.icon

        return (
          <Link
            key={item.label}
            href={item.href}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "text-muted-foreground hover:text-foreground focus-visible:ring-ring focus-visible:ring-offset-background rounded-md px-3 py-2 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
              isActive && "text-foreground bg-muted/70"
            )}
          >
            <span className="flex items-center gap-2">
              <Icon className="size-4" aria-hidden="true" />
              {item.label}
            </span>
          </Link>
        )
      })}

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-foreground"
          >
            Get Involved
            <ChevronDown className="size-4" aria-hidden="true" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-64">
          <DropdownMenuLabel>Get Involved</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {getInvolvedNav.map((item) => {
            const Icon = item.icon
            return (
              <DropdownMenuItem key={item.label} asChild>
                <Link
                  href={item.href}
                  className="flex items-start gap-3"
                >
                  <span className="bg-primary/10 text-primary mt-0.5 inline-flex size-8 items-center justify-center rounded-lg">
                    <Icon className="size-4" aria-hidden="true" />
                  </span>
                  <span className="flex flex-col gap-1">
                    <span className="text-sm font-medium">{item.label}</span>
                    <span className="text-muted-foreground text-xs">
                      {item.description}
                    </span>
                  </span>
                </Link>
              </DropdownMenuItem>
            )
          })}
        </DropdownMenuContent>
      </DropdownMenu>

      {donateItem ? (
        <Button asChild className="ml-2">
          <Link href={donateItem.href}>{donateItem.label}</Link>
        </Button>
      ) : null}
    </nav>
  )
}
