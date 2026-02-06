import { Calendar, MapPin, Ticket } from "lucide-react"
import type { LucideIcon } from "lucide-react"

export type QuickInfoItem = {
  title: string
  description: string
  detail: string
  icon: LucideIcon
}

export const site = {
  name: "Nova MultiFest",
  tagline: "A weekend-long celebration of music, art, and global culture.",
  dates: "August 21–23, 2026",
  location: "Riverfront Commons, Arlington, VA",
  city: "Arlington, VA",
}

export const quickInfo: QuickInfoItem[] = [
  {
    title: "Dates",
    description: site.dates,
    detail: "Three immersive days with evening headline performances.",
    icon: Calendar,
  },
  {
    title: "Location",
    description: site.location,
    detail: "Main stages line the riverfront, with indoor galleries nearby.",
    icon: MapPin,
  },
  {
    title: "Free Entry",
    description: "Open to all ages with free daytime admission.",
    detail: "Reserve workshops and evening shows with a quick RSVP.",
    icon: Ticket,
  },
]
