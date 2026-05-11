import { cn } from "@/lib/utils"

export function CodePilotMark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "relative flex size-10 shrink-0 items-center justify-center text-[#3a2520] transition-colors dark:text-[#FFD6BA]",
        className
      )}
    >
      <svg
        aria-hidden="true"
        className="relative size-[80%]"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M6.75 15.5V8.75C6.75 7.78 7.53 7 8.5 7h3"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="2.2"
        />
        <path
          d="M11 17V7h4.1c1.55 0 2.8 1.25 2.8 2.8s-1.25 2.8-2.8 2.8H11"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.2"
        />
        <path
          d="M5 18.5h14"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="2.2"
        />
      </svg>
    </span>
  )
}

export function CodePilotLogo() {
  return (
    <span className="flex items-center gap-2.5">
      <CodePilotMark />
      <span className="text-base font-semibold tracking-tight">CodePilot</span>
    </span>
  )
}
