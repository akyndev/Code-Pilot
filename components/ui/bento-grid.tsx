import type { ComponentType, ReactNode } from "react"
import { ArrowRightIcon } from "lucide-react"

import { cn } from "@/lib/utils"

type BentoGridProps = {
  children: ReactNode
  className?: string
}

type BentoCardProps = {
  Icon: ComponentType<{ className?: string }>
  name: string
  description: string
  href?: string
  cta?: string
  className?: string
  background?: ReactNode
}

export function BentoGrid({ children, className }: BentoGridProps) {
  return (
    <div
      className={cn(
        "grid auto-rows-[22rem] grid-cols-1 gap-4 md:grid-cols-3",
        className
      )}
    >
      {children}
    </div>
  )
}

export function BentoCard({
  Icon,
  name,
  description,
  href = "#",
  cta = "Learn more",
  className,
  background,
}: BentoCardProps) {
  return (
    <div
      className={cn(
        "group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-border/70 bg-card/75 p-6 shadow-[0_18px_60px_-48px_var(--foreground)] ring-1 ring-white/10 transition-all duration-300 hover:-translate-y-1 hover:border-[#FF9A86]/45 hover:bg-card",
        className
      )}
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-90 [mask-image:linear-gradient(to_bottom,#000_0%,#000_56%,transparent_100%)]">
        {background}
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-card via-card/90 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-card/75 to-transparent" />

      <div className="relative z-10 mt-auto overflow-hidden rounded-2xl border border-white/25 bg-white/[0.055] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.5),0_18px_55px_-42px_var(--foreground)] ring-1 ring-white/15 backdrop-blur-xl backdrop-saturate-150 before:pointer-events-none before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_14%_0%,rgba(255,255,255,0.38),transparent_34%),linear-gradient(135deg,rgba(255,255,255,0.14),rgba(255,214,186,0.08)_48%,rgba(255,255,255,0.04))] before:opacity-75 after:pointer-events-none after:absolute after:inset-px after:rounded-[calc(1rem-1px)] after:border after:border-white/15">
        <div className="relative z-10 mb-4 flex size-10 items-center justify-center rounded-xl border border-border/70 bg-primary/20">
          <Icon className="size-5 text-primary-foreground" />
        </div>
        <h3 className="relative z-10 text-lg font-semibold">{name}</h3>
        <p className="relative z-10 mt-2 max-w-md text-sm leading-6 text-muted-foreground">
          {description}
        </p>
        <a
          href={href}
          className="relative z-10 mt-4 inline-flex items-center gap-1 text-sm font-medium text-foreground opacity-80 transition-opacity group-hover:opacity-100"
        >
          {cta}
          <ArrowRightIcon className="size-3.5 transition-transform group-hover:translate-x-0.5" />
        </a>
      </div>
    </div>
  )
}
