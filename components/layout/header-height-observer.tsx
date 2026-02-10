"use client"

import { useLayoutEffect } from "react"

const HEADER_ID = "site-header"
const CSS_VAR = "--site-header-height"

export function HeaderHeightObserver() {
  useLayoutEffect(() => {
    if (typeof window === "undefined") return
    const header = document.getElementById(HEADER_ID)
    if (!header) return

    const update = () => {
      const height = header.getBoundingClientRect().height
      document.documentElement.style.setProperty(CSS_VAR, `${height}px`)
    }

    update()

    if (typeof ResizeObserver === "undefined") {
      window.addEventListener("resize", update)
      return () => window.removeEventListener("resize", update)
    }

    const observer = new ResizeObserver(update)
    observer.observe(header)
    window.addEventListener("resize", update)

    return () => {
      observer.disconnect()
      window.removeEventListener("resize", update)
    }
  }, [])

  return null
}
