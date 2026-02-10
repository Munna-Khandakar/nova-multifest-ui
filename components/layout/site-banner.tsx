"use client"

import { useState, useSyncExternalStore } from "react"
import Link from "next/link"
import { X } from "lucide-react"

import { Container } from "@/components/layout/container"
import { announcement } from "@/lib/constants"

const BANNER_STORAGE_KEY = "novaMultifestBannerDismissed"

const subscribeToStorage = (callback: () => void) => {
  if (typeof window === "undefined") return () => {}
  window.addEventListener("storage", callback)
  return () => window.removeEventListener("storage", callback)
}

const getVisibilitySnapshot = () => {
  if (typeof window === "undefined") return "hidden"
  try {
    return window.localStorage.getItem(BANNER_STORAGE_KEY) === "1"
      ? "hidden"
      : "visible"
  } catch {
    return "visible"
  }
}

const getServerSnapshot = () => "hidden"

export function SiteBanner() {
  const [dismissed, setDismissed] = useState(false)
  const visibility = useSyncExternalStore(
    subscribeToStorage,
    getVisibilitySnapshot,
    getServerSnapshot
  )
  const isVisible = visibility === "visible" && !dismissed

  const handleClose = () => {
    setDismissed(true)
    if (typeof window === "undefined") return
    try {
      window.localStorage.setItem(BANNER_STORAGE_KEY, "1")
    } catch {
      // If storage is unavailable, we still hide for this render.
    }
  }

  if (!isVisible) return null

  return (
    <div className="bg-primary text-primary-foreground">
      <Container className="flex flex-col items-start gap-2 py-2 text-xs font-semibold uppercase tracking-[0.16em] sm:flex-row sm:items-center sm:justify-between">
        <div className="flex w-full items-start justify-between gap-3 sm:w-auto">
          <span>{announcement}</span>
        </div>
        <Link
          href="/applications"
          className="text-nowrap bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/20 inline-flex items-center rounded-full px-3 py-1 text-[0.65rem] font-semibold tracking-[0.2em] transition"
        >
          Apply Now
        </Link>
        <button
            type="button"
            onClick={handleClose}
            aria-label="Dismiss announcement"
            className="text-primary-foreground/70 hover:text-primary-foreground focus-visible:ring-ring inline-flex size-6 items-center justify-center rounded-full transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
        >
          <X className="size-4" aria-hidden="true" />
        </button>
      </Container>
    </div>
  )
}
