import { cn } from "@/lib/utils"

export function GridPattern({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:48px_48px] opacity-35 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_72%)]",
        className
      )}
    />
  )
}

export function DotPattern({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 bg-[radial-gradient(var(--border)_1px,transparent_1px)] bg-[size:22px_22px] opacity-45 [mask-image:radial-gradient(ellipse_at_center,black_12%,transparent_70%)]",
        className
      )}
    />
  )
}
