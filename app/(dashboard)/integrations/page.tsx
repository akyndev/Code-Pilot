import {
  BotIcon,
  MoreHorizontalIcon,
  PlusIcon,
  SettingsIcon,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"
import Image from "next/image"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { cn } from "@/lib/utils"

type Integration = {
  name: string
  description: string
  connected: boolean
  logo?: string
  logoClassName?: string
  brand?: "slack"
  icon?: LucideIcon
}

function SlackLogo({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 130.5 130.5"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M30.3 77.6c0 8.4-6.8 15.1-15.1 15.1S0 86 0 77.6s6.8-15.1 15.1-15.1h15.1v15.1zm7.6 0c0-8.4 6.8-15.1 15.1-15.1s15.1 6.8 15.1 15.1v37.8c0 8.4-6.8 15.1-15.1 15.1s-15.1-6.8-15.1-15.1V77.6z"
        fill="#36C5F0"
      />
      <path
        d="M53 30.3c-8.4 0-15.1-6.8-15.1-15.1S44.6 0 53 0s15.1 6.8 15.1 15.1v15.1H53zm0 7.6c8.4 0 15.1 6.8 15.1 15.1S61.4 68.1 53 68.1H15.1C6.8 68.1 0 61.3 0 53s6.8-15.1 15.1-15.1H53z"
        fill="#2EB67D"
      />
      <path
        d="M100.3 53c0-8.4 6.8-15.1 15.1-15.1s15.1 6.8 15.1 15.1-6.8 15.1-15.1 15.1h-15.1V53zm-7.6 0c0 8.4-6.8 15.1-15.1 15.1S62.5 61.3 62.5 53V15.1C62.5 6.8 69.3 0 77.6 0s15.1 6.8 15.1 15.1V53z"
        fill="#ECB22E"
      />
      <path
        d="M77.6 100.3c8.4 0 15.1 6.8 15.1 15.1s-6.8 15.1-15.1 15.1-15.1-6.8-15.1-15.1v-15.1h15.1zm0-7.6c-8.4 0-15.1-6.8-15.1-15.1s6.8-15.1 15.1-15.1h37.8c8.4 0 15.1 6.8 15.1 15.1s-6.8 15.1-15.1 15.1H77.6z"
        fill="#E01E5A"
      />
    </svg>
  )
}

const integrations: Integration[] = [
  {
    name: "GitHub",
    description: "Sync commits, pull requests, issues, and repository ownership.",
    logo: "https://cdn.simpleicons.org/github",
    logoClassName: "dark:invert",
    connected: true
  },
  {
    name: "Slack",
    description: "Route incident alerts, weekly digests, and review nudges.",
    brand: "slack",
    connected: true
  },
  {
    name: "Linear",
    description: "Connect engineering cycles, issues, and delivery milestones.",
    logo: "https://cdn.simpleicons.org/linear",
    logoClassName: "dark:invert",
    connected: true
  },
  {
    name: "Vercel",
    description: "Import deployments, build health, and preview environments.",
    logo: "https://cdn.simpleicons.org/vercel",
    logoClassName: "dark:invert",
    connected: false
  },
  {
    name: "Zoom",
    description: "Attach meeting context to retrospectives and reviews.",
    logo: "https://cdn.simpleicons.org/zoom",
    connected: false
  },
  {
    name: "AI Analyst",
    description: "Let CodePilot summarize trends and recommend next actions.",
    icon: BotIcon,
    connected: true
  }
]

export default function IntegrationsPage() {
  return (
    <div className="flex flex-1 flex-col gap-6 px-4 py-4 md:px-6 md:py-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-normal">Integrations</h1>
          <p className="text-sm text-muted-foreground">
            Connect the tools your engineering teams already use.
          </p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Input className="h-10 sm:w-80" placeholder="Search integrations..." />
          <Button className="h-10">
            <PlusIcon />
            Add integration
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {integrations.map((integration) => {
          const Icon = integration.icon

          return (
            <Card key={integration.name} className="py-0">
              <CardHeader className="min-h-48 py-5">
                <div className="flex items-start justify-between">
                  <div className="flex size-12 items-center justify-center rounded-xl border border-border/70 bg-card shadow-xs">
                    {integration.brand === "slack" ? (
                      <SlackLogo className="size-6" />
                    ) : integration.logo ? (
                      <Image
                        alt={`${integration.name} logo`}
                        className={cn("size-6 object-contain", integration.logoClassName)}
                        height={24}
                        src={integration.logo}
                        unoptimized
                        width={24}
                      />
                    ) : Icon ? (
                      <Icon className="size-5 text-primary" />
                    ) : null}
                  </div>
                  <Button size="icon-sm" variant="ghost">
                    <MoreHorizontalIcon />
                  </Button>
                </div>
                <div className="pt-5">
                  <CardTitle>{integration.name}</CardTitle>
                  <CardDescription className="mt-3 max-w-sm">
                    {integration.description}
                  </CardDescription>
                </div>
              </CardHeader>
              <CardFooter className="justify-between">
                <div className="flex items-center gap-2">
                  <Button size="icon" variant="outline">
                    <SettingsIcon />
                  </Button>
                  <Button variant="outline">Details</Button>
                </div>
                <Switch
                  defaultChecked={integration.connected}
                  aria-label={`${integration.name} connection status`}
                />
              </CardFooter>
            </Card>
          )
        })}
      </div>

      <Card className="py-0">
        <CardHeader className="border-b border-border/70 py-5">
          <CardTitle>Sync Health</CardTitle>
          <CardDescription>Most recent ingestion status from connected sources</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3 p-5 md:grid-cols-3">
          {[
            ["GitHub", "48 repos synced", "Healthy"],
            ["Slack", "12 channels monitored", "Healthy"],
            ["Linear", "2,184 issues indexed", "Syncing"],
          ].map(([name, detail, status]) => {
            const integration = integrations.find((item) => item.name === name)

            return (
              <div key={name} className="rounded-xl border border-border/70 bg-secondary/25 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    {integration?.brand === "slack" ? (
                      <span className="flex size-8 items-center justify-center rounded-lg border border-border/70 bg-card">
                        <SlackLogo className="size-4" />
                      </span>
                    ) : integration?.logo ? (
                      <span className="flex size-8 items-center justify-center rounded-lg border border-border/70 bg-card">
                        <Image
                          alt={`${integration.name} logo`}
                          className={cn(
                            "size-4 object-contain",
                            integration.logoClassName
                          )}
                          height={16}
                          src={integration.logo}
                          unoptimized
                          width={16}
                        />
                      </span>
                    ) : null}
                    <p className="font-medium">{name}</p>
                  </div>
                  <Badge variant="outline">{status}</Badge>
                </div>
                <p className="mt-3 text-sm text-muted-foreground">{detail}</p>
              </div>
            )
          })}
        </CardContent>
      </Card>
    </div>
  )
}
