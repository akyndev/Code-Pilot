import Link from "next/link"
import { ArrowLeftIcon, FileQuestionIcon, GaugeIcon } from "lucide-react"

import { CodePilotLogo } from "@/components/codepilot-logo"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function NotFound() {
  return (
    <main className="grid min-h-svh place-items-center bg-background p-4 text-foreground md:p-6">
      <div className="w-full max-w-3xl">
        <Link href="/" aria-label="CodePilot home" className="mb-8 flex justify-center">
          <CodePilotLogo />
        </Link>
        <Card className="overflow-hidden text-center">
          <CardContent className="relative p-10 md:p-16">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,#FFD6BA_0%,transparent_48%)] opacity-35" />
            <div className="relative">
              <span className="mx-auto grid size-16 place-items-center rounded-full border bg-background">
                <FileQuestionIcon className="size-7 text-[#5f382f]" />
              </span>
              <p className="mt-8 text-7xl font-semibold tracking-tight md:text-8xl">404</p>
              <h1 className="mt-4 text-2xl font-semibold">This page drifted out of view.</h1>
              <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
                The report, repository, or workspace route may have moved. Return home or open the dashboard.
              </p>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <Button asChild>
                  <Link href="/">
                    <ArrowLeftIcon />
                    Back home
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/overview">
                    <GaugeIcon />
                    Open dashboard
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
