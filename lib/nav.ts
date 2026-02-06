import {
  Calendar,
  Camera,
  HandHeart,
  Home,
  Info,
  Mail,
  Music,
  Store,
  Users,
  Heart,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"

export type NavItem = {
  label: string
  href: string
  description?: string
  icon: LucideIcon
  anchor?: string
}

export const mainNav: NavItem[] = [
  {
    label: "Home",
    href: "/",
    icon: Home,
  },
  {
    label: "About",
    href: "/about",
    icon: Info,
  },
  {
    label: "Schedule",
    href: "/schedule",
    icon: Calendar,
  },
  {
    label: "Gallery",
    href: "/gallery",
    icon: Camera,
  },
  {
    label: "Donate",
    href: "/donate",
    icon: Heart,
  },
  {
    label: "Contact",
    href: "/contact",
    icon: Mail,
  },
]

export const getInvolvedNav: NavItem[] = [
  {
    label: "Volunteer",
    href: "/#volunteer",
    anchor: "volunteer",
    description: "Support guest services, wayfinding, and festival hospitality.",
    icon: Users,
  },
  {
    label: "Performer",
    href: "/#performer",
    anchor: "performer",
    description: "Showcase music, dance, or spoken word on community stages.",
    icon: Music,
  },
  {
    label: "Vendor",
    href: "/#vendor",
    anchor: "vendor",
    description: "Apply to share culinary, artisan, or cultural goods.",
    icon: Store,
  },
  {
    label: "Sponsor",
    href: "/#sponsor",
    anchor: "sponsor",
    description: "Partner with us to fund free programming and youth workshops.",
    icon: HandHeart,
  },
]

export const footerNav: NavItem[] = [
  {
    label: "About",
    href: "/about",
    icon: Info,
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
  {
    label: "Contact",
    href: "/contact",
    icon: Mail,
  },
]
