import { cn } from "@/lib/utils"

export function AuroraText({
  className,
  children,
}: React.ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "relative inline-flex bg-[linear-gradient(90deg,#FF9A86,#FFB399,#FFD6A6,#FF9A86)] bg-[length:200%_100%] bg-clip-text text-transparent animate-aurora",
        className
      )}
    >
      {children}
    </span>
  )
}
