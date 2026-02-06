import { Calendar, Camera, ClipboardList, Heart, Megaphone, Star } from "lucide-react"
import type { LucideIcon } from "lucide-react"

export type NavItem = {
  label: string
  href: string
  description?: string
  icon: LucideIcon
  anchor?: string
}

export const primaryNav: NavItem[] = [
  {
    label: "Applications",
    href: "/applications",
    icon: ClipboardList,
  },
  {
    label: "Gallery",
    href: "/gallery",
    icon: Camera,
  },
  {
    label: "Advertisers",
    href: "/advertisers",
    icon: Megaphone,
  },
  {
    label: "Sponsors",
    href: "/sponsors",
    icon: Star,
  },
  {
    label: "Schedule",
    href: "/schedule",
    icon: Calendar,
  },
  {
    label: "Donate",
    href: "/donate",
    icon: Heart,
  },
]
