import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

type MarqueeProps = {
  children: ReactNode
  className?: string
  reverse?: boolean
  pauseOnHover?: boolean
}

export function Marquee({
  children,
  className,
  reverse = false,
  pauseOnHover = false,
}: MarqueeProps) {
  return (
    <div
      className={cn(
        "group/marquee flex gap-[var(--gap)] overflow-hidden [--duration:24s] [--gap:1rem]",
        className
      )}
    >
      {Array.from({ length: 2 }).map((_, index) => (
        <div
          key={index}
          className={cn(
            "flex min-w-full shrink-0 items-center justify-start gap-[var(--gap)] animate-marquee",
            reverse && "[animation-direction:reverse]",
            pauseOnHover && "group-hover/marquee:[animation-play-state:paused]"
          )}
        >
          {children}
        </div>
      ))}
    </div>
  )
}
