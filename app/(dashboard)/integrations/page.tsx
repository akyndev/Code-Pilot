"use client"

import * as React from "react"
import {
  AlertTriangleIcon,
  BotIcon,
  CheckCircle2Icon,
  GitBranchIcon,
  LoaderCircleIcon,
  MoreHorizontalIcon,
  PlusIcon,
  RefreshCwIcon,
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
import { Progress } from "@/components/ui/progress"
import { Skeleton } from "@/components/ui/skeleton"
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
    connected: false
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

const syncedRepositories = [
  { name: "frontend-platform", language: "TypeScript", activity: "18 PRs synced" },
  { name: "payments-service", language: "Go", activity: "7 deploys indexed" },
  { name: "auth-api", language: "Node.js", activity: "12 issues mapped" },
]

type RepositoryState = "empty" | "loading" | "error" | "success"

export default function IntegrationsPage() {
  const [repositoryState, setRepositoryState] =
    React.useState<RepositoryState>("empty")
  const [connectionStatus, setConnectionStatus] = React.useState(() =>
    Object.fromEntries(
      integrations.map((integration) => [integration.name, integration.connected])
    )
  )
  const syncTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  React.useEffect(() => {
    return () => {
      if (syncTimer.current) {
        clearTimeout(syncTimer.current)
      }
    }
  }, [])

  function queueRepositoryState(nextState: RepositoryState) {
    if (syncTimer.current) {
      clearTimeout(syncTimer.current)
    }

    setRepositoryState("loading")
    syncTimer.current = setTimeout(() => {
      setRepositoryState(nextState)
      setConnectionStatus((current) => ({
        ...current,
        GitHub: nextState === "success",
      }))
    }, 900)
  }

  function handleIntegrationToggle(name: string, checked: boolean) {
    setConnectionStatus((current) => ({
      ...current,
      [name]: checked,
    }))

    if (name === "GitHub") {
      if (checked) {
        queueRepositoryState("success")
      } else {
        setRepositoryState("empty")
      }
    }
  }

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

      <Card className="overflow-hidden py-0">
        <CardHeader className="border-b border-border/70 py-5">
          <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
            <div>
              <CardTitle>Repository connection</CardTitle>
              <CardDescription>
                Connect GitHub to unlock repository analytics, delivery metrics, and code review signals.
              </CardDescription>
            </div>
            <RepositoryStatusBadge state={repositoryState} />
          </div>
        </CardHeader>
        <CardContent className="p-5">
          <RepositoryConnectionState
            state={repositoryState}
            onConnect={() => queueRepositoryState("success")}
            onRetry={() => queueRepositoryState("success")}
            onShowError={() => queueRepositoryState("error")}
            onDisconnect={() => {
              setRepositoryState("empty")
              setConnectionStatus((current) => ({ ...current, GitHub: false }))
            }}
          />
        </CardContent>
      </Card>

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
                  checked={connectionStatus[integration.name]}
                  onCheckedChange={(checked) =>
                    handleIntegrationToggle(integration.name, checked)
                  }
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
            [
              "GitHub",
              repositoryState === "success" ? "48 repos synced" : "No repositories connected",
              repositoryState === "success" ? "Healthy" : "Setup needed",
            ],
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

function RepositoryStatusBadge({ state }: { state: RepositoryState }) {
  if (state === "success") {
    return (
      <Badge className="w-fit bg-emerald-600 text-white hover:bg-emerald-600/90">
        Repository connected
      </Badge>
    )
  }

  if (state === "loading") {
    return (
      <Badge variant="secondary" className="w-fit gap-1">
        <LoaderCircleIcon className="size-3 animate-spin" />
        Syncing
      </Badge>
    )
  }

  if (state === "error") {
    return (
      <Badge className="w-fit bg-red-600 text-white hover:bg-red-600/90">
        GitHub sync failed
      </Badge>
    )
  }

  return (
    <Badge variant="outline" className="w-fit">
      No repositories connected
    </Badge>
  )
}

function RepositoryConnectionState({
  state,
  onConnect,
  onRetry,
  onShowError,
  onDisconnect,
}: {
  state: RepositoryState
  onConnect: () => void
  onRetry: () => void
  onShowError: () => void
  onDisconnect: () => void
}) {
  if (state === "loading") {
    return (
      <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
        <div>
          <div className="flex items-center gap-3">
            <span className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <LoaderCircleIcon className="size-5 animate-spin" />
            </span>
            <div>
              <h2 className="font-semibold">Loading repository data</h2>
              <p className="text-sm text-muted-foreground">
                CodePilot is importing repositories, owners, pull requests, and deployment history.
              </p>
            </div>
          </div>
          <Progress className="mt-5" value={68} />
          <p className="mt-2 text-xs text-muted-foreground">
            This usually completes in under a minute for small workspaces.
          </p>
        </div>
        <div className="grid gap-3 rounded-xl border border-border/70 bg-secondary/25 p-4">
          <Skeleton className="h-5 w-2/5" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-4/5" />
        </div>
      </div>
    )
  }

  if (state === "error") {
    return (
      <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
        <div className="flex gap-3">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-red-500/10 text-red-600">
            <AlertTriangleIcon className="size-5" />
          </span>
          <div>
            <h2 className="font-semibold">GitHub sync failed</h2>
            <p className="mt-1 max-w-xl text-sm text-muted-foreground">
              CodePilot could not refresh repository data because the GitHub token no longer has repository read access.
            </p>
            <div className="mt-5 flex flex-col gap-2 sm:flex-row">
              <Button onClick={onRetry}>
                <RefreshCwIcon />
                Retry sync
              </Button>
              <Button variant="outline">Update permissions</Button>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-red-500/25 bg-red-500/5 p-4">
          <p className="text-sm font-medium text-red-700 dark:text-red-300">
            Last error
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            403: Resource not accessible by integration. Reauthorize GitHub or ask an admin to approve the connector.
          </p>
        </div>
      </div>
    )
  }

  if (state === "success") {
    return (
      <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <div className="flex gap-3">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600">
              <CheckCircle2Icon className="size-5" />
            </span>
            <div>
              <h2 className="font-semibold">Repository connected</h2>
              <p className="mt-1 max-w-xl text-sm text-muted-foreground">
                GitHub is connected and CodePilot is actively enriching your engineering analytics.
              </p>
            </div>
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {[
              ["48", "Repositories"],
              ["342", "Pull requests"],
              ["18m", "Last sync"],
            ].map(([value, label]) => (
              <div key={label} className="rounded-xl border border-border/70 bg-secondary/25 p-4">
                <p className="text-2xl font-semibold">{value}</p>
                <p className="text-xs text-muted-foreground">{label}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-xl border border-border/70">
          <div className="border-b border-border/70 px-4 py-3">
            <p className="text-sm font-medium">Recently indexed repositories</p>
          </div>
          <div className="divide-y divide-border/70">
            {syncedRepositories.map((repository) => (
              <div key={repository.name} className="flex items-center justify-between gap-4 px-4 py-3">
                <div>
                  <p className="font-medium">{repository.name}</p>
                  <p className="text-xs text-muted-foreground">{repository.language}</p>
                </div>
                <Badge variant="secondary">{repository.activity}</Badge>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-2 border-t border-border/70 p-4 sm:flex-row">
            <Button variant="outline" onClick={onRetry}>
              <RefreshCwIcon />
              Sync now
            </Button>
            <Button variant="outline" onClick={onShowError}>
              Run health check
            </Button>
            <Button variant="outline" onClick={onDisconnect}>
              Disconnect
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
      <div className="flex gap-3">
        <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <GitBranchIcon className="size-5" />
        </span>
        <div>
          <h2 className="font-semibold">No repositories connected</h2>
          <p className="mt-1 max-w-xl text-sm text-muted-foreground">
            Connect GitHub to populate repository analytics, review queues, deployment attribution, and ownership data.
          </p>
          <div className="mt-5 flex flex-col gap-2 sm:flex-row">
            <Button onClick={onConnect}>Connect GitHub</Button>
            <Button variant="outline" onClick={onShowError}>
              Check permissions
            </Button>
          </div>
        </div>
      </div>
      <div className="rounded-xl border border-dashed border-border bg-secondary/25 p-5">
        <p className="text-sm font-medium">What unlocks after connection</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {["Commit velocity", "PR review health", "Repository ownership"].map((item) => (
            <div key={item} className="rounded-lg border border-border/70 bg-card/70 p-3 text-sm">
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
