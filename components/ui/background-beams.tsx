import type React from "react"

import { cn } from "@/lib/utils"

export function BackgroundBeams({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      {[0, 1, 2, 3, 4].map((beam) => (
        <span
          key={beam}
          className="absolute top-[-30%] h-[70%] w-px origin-top animate-beam bg-gradient-to-b from-transparent via-[#FF9A86]/60 to-transparent blur-[0.5px]"
          style={{
            left: `${12 + beam * 19}%`,
            animationDelay: `${beam * 0.9}s`,
            animationDuration: `${5.5 + beam * 0.7}s`,
            "--beam-rotate": `${beam % 2 === 0 ? 18 : -18}deg`,
          } as React.CSSProperties}
        />
      ))}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </div>
  )
}
