import {
  BellIcon,
  CheckCircle2Icon,
  FilterIcon,
  GitMergeIcon,
  RocketIcon,
  SearchIcon,
  ShieldAlertIcon,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

const events = [
  {
    title: "PR merged in api-gateway",
    detail: "Maya Chen merged #4821 after 2 approvals and passing checks.",
    time: "2m ago",
    type: "Code",
    icon: GitMergeIcon,
  },
  {
    title: "Production deploy completed",
    detail: "Release v2.18.0 shipped to production with no rollback signals.",
    time: "18m ago",
    type: "Deploy",
    icon: RocketIcon,
  },
  {
    title: "Critical vulnerability assigned",
    detail: "AppSec assigned CVE remediation to billing-service owners.",
    time: "44m ago",
    type: "Security",
    icon: ShieldAlertIcon,
  },
  {
    title: "Incident acknowledged",
    detail: "Revenue team acknowledged checkout latency alert in 6 minutes.",
    time: "1h ago",
    type: "Incident",
    icon: BellIcon,
  },
  {
    title: "Weekly report generated",
    detail: "Engineering leadership digest is ready for review.",
    time: "2h ago",
    type: "Report",
    icon: CheckCircle2Icon,
  },
]

export default function ActivityFeedPage() {
  return (
    <div className="flex flex-1 flex-col gap-6 px-4 py-4 md:px-6 md:py-6">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-normal">Activity Feed</h1>
          <p className="text-sm text-muted-foreground">
            Follow recent events across repositories, deployments, alerts, and reports.
          </p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <div className="relative">
            <SearchIcon className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input className="h-10 pl-9 sm:w-80" placeholder="Search activity..." />
          </div>
          <Button variant="outline" className="h-10">
            <FilterIcon />
            Filters
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {[
          ["Events today", "482", "Live workspace stream"],
          ["Deploy events", "37", "6 production changes"],
          ["Mentions", "19", "Need review"],
        ].map(([label, value, detail]) => (
          <Card key={label}>
            <CardHeader>
              <CardDescription>{label}</CardDescription>
              <CardTitle className="text-3xl tabular-nums">{value}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{detail}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 @5xl/main:grid-cols-[0.72fr_1.28fr]">
        <Card className="py-0">
          <CardHeader className="border-b border-border/70 py-5">
            <CardTitle>Feed Controls</CardTitle>
            <CardDescription>Filter the workspace stream</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-5 p-5">
            <div className="grid gap-2">
              <span className="text-sm font-medium">Event type</span>
              <Tabs defaultValue="all">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="mentions">Mentions</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            <div className="grid gap-2">
              <span className="text-sm font-medium">Team</span>
              <Select defaultValue="all">
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Team" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All teams</SelectItem>
                  <SelectItem value="platform">Platform</SelectItem>
                  <SelectItem value="security">Security</SelectItem>
                  <SelectItem value="revenue">Revenue</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Separator />
            <div className="grid gap-3">
              {["Repository activity", "Deployments", "Security", "Incidents", "Reports"].map((item) => (
                <div key={item} className="flex items-center justify-between rounded-xl border border-border/70 p-3">
                  <span className="text-sm font-medium">{item}</span>
                  <Badge variant="outline">On</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="py-0">
          <CardHeader className="border-b border-border/70 py-5">
            <CardTitle>Live Timeline</CardTitle>
            <CardDescription>Chronological workspace activity</CardDescription>
          </CardHeader>
          <CardContent className="p-5">
            <div className="grid gap-0">
              {events.map((event, index) => {
                const Icon = event.icon

                return (
                  <div key={event.title} className="grid grid-cols-[auto_1fr] gap-4">
                    <div className="flex flex-col items-center">
                      <div className="flex size-10 items-center justify-center rounded-xl border border-border/70 bg-secondary/40 text-primary">
                        <Icon className="size-5" />
                      </div>
                      {index < events.length - 1 ? <div className="h-14 w-px bg-border" /> : null}
                    </div>
                    <div className="pb-8">
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <p className="font-medium">{event.title}</p>
                          <p className="mt-1 text-sm text-muted-foreground">{event.detail}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{event.type}</Badge>
                          <span className="text-sm text-muted-foreground">{event.time}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
