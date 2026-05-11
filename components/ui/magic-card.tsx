import { cn } from "@/lib/utils"

export function MagicCard({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-3xl border border-border/70 bg-card/80 p-px shadow-[0_20px_80px_-55px_var(--foreground)]",
        className
      )}
      {...props}
    >
      <div className="pointer-events-none absolute -inset-24 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100">
        <div className="absolute left-1/4 top-1/4 size-52 rounded-full bg-[#FF9A86]/30" />
        <div className="absolute bottom-1/4 right-1/4 size-52 rounded-full bg-[#FFD6A6]/30" />
      </div>
      <div className="relative h-full rounded-[calc(1.5rem-1px)] bg-card/95">
        {children}
      </div>
    </div>
  )
}
