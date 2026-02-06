import type { Variants } from "framer-motion"

export const createFadeUp = (reducedMotion = false): Variants => ({
  hidden: { opacity: 0, y: reducedMotion ? 0 : 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
})

export const createFadeIn = (reducedMotion = false): Variants => ({
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      duration: reducedMotion ? 0.01 : 0.5,
      ease: "easeOut",
    },
  },
})

export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.08,
    },
  },
}
