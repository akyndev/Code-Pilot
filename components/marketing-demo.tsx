import Image from "next/image"
import { ArrowUpRightIcon, SparklesIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"

const screenshotSrc = "/codepilot-dashboard-homepage.png"

export function ProductDemo() {
  return (
    <div className="relative mx-auto w-full max-w-6xl">
      <div className="absolute -inset-6 rounded-[40px] bg-[radial-gradient(circle_at_50%_0%,#FF9A86_0%,transparent_38%),linear-gradient(135deg,#FFDCDC,#FFD6BA)] opacity-30 blur-3xl" />
      <div className="relative overflow-hidden rounded-[32px] border border-border/80 bg-card/70 p-2 shadow-[0_40px_120px_-70px_var(--foreground)] backdrop-blur">
        <div className="flex items-center justify-between border-b border-border/70 px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="size-3 rounded-full bg-[#FF9A86]" />
            <span className="size-3 rounded-full bg-[#FFD6A6]" />
            <span className="size-3 rounded-full bg-emerald-500" />
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="hidden sm:inline-flex">
              <SparklesIcon className="size-3" />
              Live dashboard
            </Badge>
            <Badge variant="outline">
              Open app
              <ArrowUpRightIcon className="size-3" />
            </Badge>
          </div>
        </div>
        <Image
          alt="CodePilot dashboard overview showing KPI cards, throughput chart, sidebar navigation, and table analytics"
          className="aspect-3420/2214 w-full rounded-[24px] object-cover object-top"
          height={2214}
          priority
          src={screenshotSrc}
          width={3420}
        />
      </div>
    </div>
  )
}
