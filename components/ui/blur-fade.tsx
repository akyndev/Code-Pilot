"use client"

import * as motion from "motion/react-client"
import type { Variants } from "motion/react"

import { cn } from "@/lib/utils"

type BlurFadeProps = Omit<React.ComponentProps<typeof motion.div>, "children" | "className" | "variants"> & {
  children: React.ReactNode
  className?: string
  variant?: Variants
  duration?: number
  delay?: number
  offset?: number
  direction?: "up" | "down" | "left" | "right"
  inView?: boolean
  inViewMargin?: string
  blur?: string
}

const directionMap = {
  down: { y: -1, x: 0 },
  up: { y: 1, x: 0 },
  left: { y: 0, x: 1 },
  right: { y: 0, x: -1 },
}

export function BlurFade({
  children,
  className,
  variant,
  duration = 0.4,
  delay = 0,
  offset = 6,
  direction = "down",
  inView = false,
  inViewMargin = "-50px",
  blur = "6px",
  ...props
}: BlurFadeProps) {
  const axis = directionMap[direction]
  const defaultVariants: Variants = {
    hidden: {
      filter: `blur(${blur})`,
      opacity: 0,
      x: axis.x * offset,
      y: axis.y * offset,
    },
    visible: {
      filter: "blur(0px)",
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        delay,
        duration,
        ease: "easeOut",
      },
    },
  }

  return (
    <motion.div
      animate={inView ? undefined : "visible"}
      className={cn(className)}
      initial="hidden"
      {...props}
      variants={variant ?? defaultVariants}
      viewport={inView ? { once: true, margin: inViewMargin } : undefined}
      whileInView={inView ? "visible" : undefined}
    >
      {children}
    </motion.div>
  )
}
