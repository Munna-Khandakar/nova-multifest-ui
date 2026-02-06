"use client"

import { motion, useReducedMotion } from "framer-motion"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Container } from "@/components/layout/container"
import { createFadeUp, staggerContainer } from "@/lib/animations"
import { quickInfo } from "@/lib/constants"

export function InfoCards() {
  const prefersReducedMotion = useReducedMotion()
  const fadeUp = createFadeUp(prefersReducedMotion)

  return (
    <section className="py-12 sm:py-16">
      <Container>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="grid gap-4 md:grid-cols-3"
        >
          {quickInfo.map((item) => {
            const Icon = item.icon

            return (
              <motion.div key={item.title} variants={fadeUp}>
                <Card className="h-full">
                  <CardHeader className="flex-row items-center gap-3">
                    <span className="bg-primary/10 text-primary inline-flex size-10 items-center justify-center rounded-lg">
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    <div>
                      <CardTitle>{item.title}</CardTitle>
                      <CardDescription>{item.description}</CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent className="text-muted-foreground">
                    {item.detail}
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </motion.div>
      </Container>
    </section>
  )
}
