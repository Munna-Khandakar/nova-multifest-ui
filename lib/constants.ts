import { Calendar, MapPin, Ticket, Users, Store, Music, HandHeart } from "lucide-react"
import type { LucideIcon } from "lucide-react"

export type QuickInfoItem = {
  title: string
  description: string
  detail: string
  icon: LucideIcon
}

export const site = {
  name: "Nova MultiFest",
  tagline: "Art, Culture, and Diversity",
  dates: "July 25–27, 2025",
  location: "Alderney Landing, Downtown Dartmouth",
  city: "Dartmouth, Nova Scotia",
}

export const announcement =
  "Nova MultiFest 2025 Applications are now live! - JULY 25TH, 26TH & 27th - @ Alderney Landing, Downtown Dartmouth"

export const eventSchedule = [
  { day: "Friday", date: "July 25", time: "6:00 pm - 10:00 pm" },
  { day: "Saturday", date: "July 26", time: "12:00 pm - 10:00 pm" },
  { day: "Sunday", date: "July 27", time: "12:00 pm - 6:00 pm" },
]

export const eventMapUrl =
  "https://multifestns.ca/wp-content/uploads/2025/05/May-1-MULTIFEST2025-LAYOUT-1.pdf"

export const quickInfo: QuickInfoItem[] = [
  {
    title: "Dates",
    description: site.dates,
    detail: "Friday evening kickoff, plus two full weekend days of events.",
    icon: Calendar,
  },
  {
    title: "Location",
    description: site.location,
    detail: "Dartmouth waterfront festival grounds at Alderney Landing.",
    icon: MapPin,
  },
  {
    title: "Free Entry",
    description: "Festival admission is free for all attendees.",
    detail: "Donate to support meals and keep the festival accessible.",
    icon: Ticket,
  },
]

export const getInvolvedItems = [
  {
    title: "Volunteers",
    description:
      "Join our team and help make Nova Multifest a success! Gain experience, meet new people, and contribute to a meaningful community event.",
    icon: Users,
    href: "/applications/volunteer",
  },
  {
    title: "Vendors",
    description:
      "Showcase your products or services at Nova Multifest and connect with a diverse audience. Vendors are responsible for securing permits, insurance, and meeting all regulations. Apply now to be a part of this exciting event",
    icon: Store,
    href: "/applications/food-vendor",
  },
  {
    title: "Performers",
    description:
      "Showcase your talent and celebrate the beauty of multiculturalism through music, dance, or other artistic expressions. This is a unique opportunity to engage with a diverse audience and be part of a vibrant event.",
    icon: Music,
    href: "https://multifestns.ca/applications/performer",
  },
  {
    title: "Sponsors",
    description:
      "Support multiculturalism and gain exposure by becoming a sponsor. Tailored sponsorship packages are available to align with your brand’s goals and help bring our vision to life.",
    icon: HandHeart,
    href: "https://multifestns.ca/application/",
  },
]

export const missionStatement =
  "The Nova Multifest Society is dedicated to promoting and preserving art and culture through innovative initiatives, including organizing multicultural festivals, regular celebrations, and events that foster community engagement, intercultural relationships, and the preservation of traditions."

export const stats = [
  { label: "Attendees", value: "0K+" },
  { label: "Volunteer Hours", value: "0+" },
  { label: "Vendors", value: "0+" },
]

export const partners = [
  {
    name: "Explore Dartmouth",
    href: "https://www.exploredartmouth.ca",
  },
  {
    name: "Alderney Landing",
    href: "https://www.alderneylanding.com",
  },
]

export const socialLinks = [
  { label: "Facebook", href: "https://www.facebook.com" },
  { label: "Instagram", href: "https://www.instagram.com" },
  { label: "X", href: "https://x.com" },
  { label: "YouTube", href: "https://www.youtube.com" },
]

export const applicationLinks = [
  { label: "Food Vendor", href: "/applications/food-vendor" },
  { label: "Exhibitor", href: "/applications/exhibitor-vendor" },
  { label: "Performer", href: "https://multifestns.ca/applications/performer" },
  { label: "Volunteer", href: "/applications/volunteer" },
  {
    label: "Sponsorship Package",
    href: "https://multifestns.ca/wp-content/uploads/2025/02/Sponsorship-Package-Nova-Multifest-2025v4-1.pdf",
  },
]

export const loginLinks = [
  {
    label: "Volunteer",
    href: "https://multifestns.ca/volunteer/auth/sign-in?redirect=%2F",
  },
  { label: "Performer", href: "https://multifestns.ca/performer/auth/sign-in" },
  { label: "Vendor", href: "https://multifestns.ca/vendor/auth/sign-in" },
]

export const quickLinks = [
  { label: "Contact Us", href: "/contact" },
  { label: "Our Team", href: "/our-team" },
  { label: "Site Rules and Regulations", href: "/site-rules-regulation" },
]
