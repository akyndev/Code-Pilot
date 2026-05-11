import { CheckCircle2Icon, ClockIcon, DatabaseIcon, ServerCogIcon, WrenchIcon } from "lucide-react"

import { CodePilotLogo } from "@/components/codepilot-logo"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

const timeline = [
  ["Started maintenance", "Sync workers paused safely", "Complete"],
  ["Migrating analytics storage", "Historical reports remain read-only", "In progress"],
  ["Restoring live updates", "Activity feed and alerts resume", "Queued"],
]

export default function MaintenancePage() {
  return (
    <main className="min-h-svh bg-background p-4 text-foreground md:p-6">
      <div className="mx-auto flex min-h-[calc(100svh-3rem)] max-w-6xl flex-col gap-8">
        <div className="flex items-center justify-between">
          <CodePilotLogo />
          <Badge variant="outline">Status: scheduled</Badge>
        </div>

        <div className="grid flex-1 place-items-center">
          <div className="grid w-full gap-6">
            <Card className="overflow-hidden">
              <CardContent className="relative p-6 md:p-10">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_78%_20%,#FFD6BA_0%,transparent_34%)] opacity-45" />
                <div className="relative grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-center">
                  <div>
                    <Badge className="bg-[#FFD6BA]/65 text-[#5f382f]">Planned maintenance</Badge>
                    <h1 className="mt-4 text-3xl font-semibold tracking-tight md:text-5xl">
                      CodePilot is upgrading workspace analytics.
                    </h1>
                    <p className="mt-4 max-w-2xl text-muted-foreground">
                      Dashboards remain available in read-only mode while repository sync and report generation are briefly paused.
                    </p>
                    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                      <Button>
                        <WrenchIcon />
                        View status page
                      </Button>
                      <Button variant="outline">Contact support</Button>
                    </div>
                  </div>
                  <div className="rounded-[2rem] border bg-background/75 p-5 shadow-sm">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">Estimated progress</p>
                      <span className="text-sm text-muted-foreground">68%</span>
                    </div>
                    <Progress className="mt-4" value={68} />
                    <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
                      <div className="rounded-2xl border p-3">
                        <ClockIcon className="mb-3 size-4 text-muted-foreground" />
                        <p className="font-medium">42m left</p>
                        <p className="text-muted-foreground">Estimated</p>
                      </div>
                      <div className="rounded-2xl border p-3">
                        <ServerCogIcon className="mb-3 size-4 text-muted-foreground" />
                        <p className="font-medium">Read-only</p>
                        <p className="text-muted-foreground">Dashboard mode</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Maintenance timeline</CardTitle>
                <CardDescription>Transparent service state during planned work.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-3">
                {timeline.map(([title, detail, status]) => (
                  <div key={title} className="flex gap-4 rounded-2xl border p-4">
                    <span className="grid size-10 shrink-0 place-items-center rounded-full bg-[#FFD6BA]/45">
                      {status === "Complete" ? <CheckCircle2Icon className="size-5 text-emerald-700" /> : <DatabaseIcon className="size-5 text-[#5f382f]" />}
                    </span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-3">
                        <p className="font-medium">{title}</p>
                        <Badge variant="outline">{status}</Badge>
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground">{detail}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  )
}
