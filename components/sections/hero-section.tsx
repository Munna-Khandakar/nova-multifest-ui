"use client"

import Link from "next/link"
import Image from "next/image"
import {motion, useMotionTemplate, useMotionValue, useReducedMotion} from "framer-motion"
import {ArrowRight, CalendarDays, MapPin} from "lucide-react"
import {Button} from "@/components/ui/button"
import {Container} from "@/components/layout/container"
import {createFadeUp, staggerContainer} from "@/lib/animations"
import {eventSchedule, site} from "@/lib/constants"
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"

export function HeroSection() {
    const prefersReducedMotion = useReducedMotion() ?? false
    const fadeUp = createFadeUp(prefersReducedMotion)
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)
    const spotlight = useMotionTemplate`radial-gradient(650px circle at ${mouseX}px ${mouseY}px, rgba(255, 255, 255, 0.16), transparent 55%)`

    const handlePointerMove = (event: React.PointerEvent<HTMLElement>) => {
        if (prefersReducedMotion) return
        const rect = event.currentTarget.getBoundingClientRect()
        mouseX.set(event.clientX - rect.left)
        mouseY.set(event.clientY - rect.top)
    }

    return (
        <section
            className="group relative min-h-[calc(100svh-var(--site-header-height,0px))] overflow-hidden border-b"
            onPointerMove={handlePointerMove}
        >
            <div className="absolute inset-0">
                {
                    prefersReducedMotion
                        ? <Image src="/hero-texture.svg" alt="" fill priority className="object-cover"/>
                        :
                        <video className="h-full w-full object-cover" autoPlay muted loop playsInline preload="metadata"
                               poster="/hero-texture.svg" aria-hidden="true">
                            <source
                                src="https://multifestns.ca/wp-content/uploads/2024/10/multifest_banner_video.webm"
                                type="video/webm"
                            />
                        </video>
                }
                <div className="absolute inset-0 bg-linear-to-b from-black/70 via-black/60 to-black/40"/>
                {
                    !prefersReducedMotion
                        ? <motion.div aria-hidden="true"
                                      className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                                      style={{backgroundImage: spotlight}}/>
                        : null
                }
            </div>

            <Container
                className="relative z-10 flex min-h-[calc(100svh-var(--site-header-height,0px))] items-center py-16 sm:py-20">
                <div className="grid w-full gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
                    <motion.div variants={staggerContainer} initial="hidden" animate="show"
                                className="flex flex-col gap-6 text-white">
                        <motion.p
                            variants={fadeUp}
                            className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-white/70"
                        >
                            <span className="bg-primary/30 text-primary inline-flex h-2 w-2 rounded-full"/>
                            {site.tagline}
                        </motion.p>

                        <motion.h1
                            variants={fadeUp}
                            className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl"
                        >
              <span className="from-foreground via-foreground/90 to-foreground/70 bg-clip-text text-white">
                {site.name}
              </span>
                        </motion.h1>

                        <motion.div variants={fadeUp} className="bg-primary/40 h-px w-24 rounded-full"/>

                        <motion.p variants={fadeUp} className="max-w-2xl text-base text-white/80 sm:text-lg">
                            Celebrate music, food, and cultural exchange with a full weekend
                            of performances, vendors, and community experiences on the
                            Dartmouth waterfront.
                        </motion.p>

                        <motion.div variants={fadeUp}
                                    className="flex flex-wrap items-center gap-4 text-sm text-white/80">
                              <span className="inline-flex items-center gap-2">
                                <CalendarDays className="size-4" aria-hidden="true"/>
                                  {site.dates}
                              </span>
                            <span className="inline-flex items-center gap-2">
                                    <MapPin className="size-4" aria-hidden="true"/>
                                {site.location}
                            </span>
                        </motion.div>

                        <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
                            <Button asChild className="transition-transform hover:-translate-y-0.5 hover:shadow-lg">
                                <Link href="/applications">
                                    Apply Now
                                    <ArrowRight className="size-4" aria-hidden="true"/>
                                </Link>
                            </Button>
                            <Button asChild variant="outline"
                                    className="transition-transform hover:-translate-y-0.5 hover:shadow-lg text-black">
                                <Link href="/schedule">View Schedule</Link>
                            </Button>
                            <Button asChild variant="secondary"
                                    className="transition-transform hover:-translate-y-0.5 hover:shadow-lg">
                                <Link href="/donate">Donate</Link>
                            </Button>
                        </motion.div>
                    </motion.div>

                    <motion.div variants={fadeUp} initial="hidden" animate="show" className="flex flex-col gap-4">
                        <motion.div
                            whileHover={prefersReducedMotion ? undefined : {y: -6}}
                            transition={{type: "spring", stiffness: 200, damping: 18}}
                        >
                            <Card className="bg-background/85 shadow-lg shadow-black/5 backdrop-blur">
                                <CardHeader>
                                    <CardTitle className="text-lg">Our Event Schedule</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {
                                        eventSchedule.map((item) => (
                                            <div
                                                key={item.day}
                                                className="border-border/70 flex items-center justify-between gap-4 border-b pb-3 last:border-b-0 last:pb-0"
                                            >
                                                <div>
                                                    <p className="text-sm font-semibold">{item.day}</p>
                                                    <p className="text-muted-foreground text-xs">{item.date}</p>
                                                </div>
                                                <p className="text-sm font-medium">{item.time}</p>
                                            </div>
                                        ))
                                    }
                                </CardContent>
                            </Card>
                        </motion.div>
                    </motion.div>
                </div>
            </Container>
        </section>
    )
}
