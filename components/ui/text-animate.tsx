"use client"

import * as React from "react"
import * as motion from "motion/react-client"
import type { TargetAndTransition, Variants } from "motion/react"

import { cn } from "@/lib/utils"

type TextAnimateProps = {
  children: string
  className?: string
  segmentClassName?: string
  delay?: number
  duration?: number
  variants?: Variants
  as?: "article" | "div" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "li" | "p" | "section" | "span"
  by?: "text" | "word" | "character" | "line"
  startOnView?: boolean
  once?: boolean
  animation?: "fadeIn" | "blurIn" | "blurInUp" | "slideUp" | "slideLeft" | "scaleUp"
  accessible?: boolean
}

const hiddenVariants: Record<NonNullable<TextAnimateProps["animation"]>, TargetAndTransition> = {
  fadeIn: { opacity: 0 },
  blurIn: { filter: "blur(8px)", opacity: 0 },
  blurInUp: { filter: "blur(8px)", opacity: 0, y: 16 },
  slideUp: { opacity: 0, y: 16 },
  slideLeft: { opacity: 0, x: 12 },
  scaleUp: { opacity: 0, scale: 0.92 },
}

const visibleVariants: Record<NonNullable<TextAnimateProps["animation"]>, TargetAndTransition> = {
  fadeIn: { opacity: 1 },
  blurIn: { filter: "blur(0px)", opacity: 1 },
  blurInUp: { filter: "blur(0px)", opacity: 1, y: 0 },
  slideUp: { opacity: 1, y: 0 },
  slideLeft: { opacity: 1, x: 0 },
  scaleUp: { opacity: 1, scale: 1 },
}

function splitText(text: string, by: NonNullable<TextAnimateProps["by"]>) {
  if (by === "text") return [text]
  if (by === "character") return Array.from(text)
  if (by === "line") return text.split("\n")

  return text.split(/(\s+)/).filter(Boolean)
}

export function TextAnimate({
  children,
  className,
  segmentClassName,
  delay = 0,
  duration = 0.3,
  variants,
  as = "p",
  by = "word",
  startOnView = true,
  once = false,
  animation = "fadeIn",
  accessible = true,
}: TextAnimateProps) {
  const MotionTag = motion[as] as React.ElementType
  const segments = splitText(children, by)
  const selectedVariants: Variants =
    variants ?? {
      hidden: hiddenVariants[animation],
      visible: (index: number) => ({
        ...visibleVariants[animation],
        transition: {
          delay: delay + index * 0.04,
          duration,
          ease: "easeOut",
        },
      }),
    }

  return (
    <MotionTag
      aria-label={accessible ? children : undefined}
      className={cn("inline-block", className)}
      initial="hidden"
      viewport={startOnView ? { once, margin: "-50px" } : undefined}
      whileInView={startOnView ? "visible" : undefined}
      animate={startOnView ? undefined : "visible"}
    >
      {segments.map((segment, index) => (
        <motion.span
          aria-hidden={accessible}
          className={cn("inline-block whitespace-pre", segmentClassName)}
          custom={index}
          key={`${segment}-${index}`}
          variants={selectedVariants}
        >
          {segment}
        </motion.span>
      ))}
    </MotionTag>
  )
}
