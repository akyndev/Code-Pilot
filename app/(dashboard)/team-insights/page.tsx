import {
  BrainIcon,
  CalendarClockIcon,
  GitPullRequestIcon,
  SearchIcon,
  UsersIcon,
} from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
import { Progress } from "@/components/ui/progress"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { engineers } from "@/lib/mock-data"

const activeEngineers = engineers.filter((engineer) => engineer.status === "Active")
const averageReviewLoad =
  activeEngineers.reduce((total, engineer) => total + engineer.reviews, 0) /
  activeEngineers.length
const averageFocus =
  activeEngineers.reduce((total, engineer) => total + engineer.focusScore, 0) /
  activeEngineers.length

export default function TeamInsightsPage() {
  return (
    <div className="flex flex-1 flex-col gap-6 px-4 py-4 md:px-6 md:py-6">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-normal">Team Insights</h1>
          <p className="text-sm text-muted-foreground">
            Understand team capacity, review load, focus time, and collaboration signals.
          </p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <div className="relative">
            <SearchIcon className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input className="h-10 pl-9 sm:w-72" placeholder="Search people or teams..." />
          </div>
          <Select defaultValue="30d">
            <SelectTrigger className="h-10! sm:w-40">
              <SelectValue placeholder="Time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        {[
          [UsersIcon, "Contributors", "68", `${activeEngineers.length} active maintainers sampled`],
          [GitPullRequestIcon, "Review load", averageReviewLoad.toFixed(1), "Reviews per engineer"],
          [BrainIcon, "Focus index", `${Math.round(averageFocus)}%`, "+5% from baseline"],
          [CalendarClockIcon, "On-call load", "6", "Active rotations"],
        ].map(([Icon, label, value, detail]) => {
          const MetricIcon = Icon as typeof UsersIcon

          return (
            <Card key={label as string}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardDescription>{label as string}</CardDescription>
                  <MetricIcon className="size-4 text-primary" />
                </div>
                <CardTitle className="text-3xl tabular-nums">{value as string}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{detail as string}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid gap-4 @5xl/main:grid-cols-[1.25fr_0.75fr]">
        <Card className="py-0">
          <CardHeader className="flex-row items-center justify-between border-b border-border/70 py-5">
            <div>
              <CardTitle>Contributor Workload</CardTitle>
              <CardDescription>Delivery, review pressure, and focus health by person</CardDescription>
            </div>
            <Tabs defaultValue="people">
              <TabsList>
                <TabsTrigger value="people">People</TabsTrigger>
                <TabsTrigger value="teams">Teams</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Contributor</TableHead>
                  <TableHead>Team</TableHead>
                  <TableHead>Merged PRs</TableHead>
                  <TableHead>Reviews</TableHead>
                  <TableHead>Focus</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {activeEngineers.map((engineer) => {
                  const status =
                    engineer.focusScore >= 75
                      ? "Healthy"
                      : engineer.focusScore >= 65
                        ? "Balanced"
                        : "Watch"

                  return (
                    <TableRow key={engineer.email}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="size-9 rounded-lg">
                            <AvatarImage src="/avatars/shadcn.jpg" alt={engineer.name} />
                            <AvatarFallback className="rounded-lg">{engineer.initials}</AvatarFallback>
                          </Avatar>
                          <span className="font-medium">{engineer.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>{engineer.team}</TableCell>
                      <TableCell>{engineer.mergedPrs}</TableCell>
                      <TableCell>{engineer.reviews}</TableCell>
                      <TableCell className="min-w-36">
                        <Progress value={engineer.focusScore} />
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{status}</Badge>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="py-0">
          <CardHeader className="border-b border-border/70 py-5">
            <CardTitle>Coaching Signals</CardTitle>
            <CardDescription>Manager-friendly context for healthier delivery</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3 p-5">
            {[
              ["Review rotation", "Balanced across API and frontend teams", "Healthy"],
              ["On-call load", "Security rotation needs backup coverage", "Watch"],
              ["Focus time", "Improved after meeting-free mornings", "Improving"],
              ["Mentorship", "Two new contributors need reviewer pairing", "Action"],
            ].map(([title, detail, status]) => (
              <div key={title} className="rounded-xl border border-border/70 bg-secondary/25 p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-medium">{title}</p>
                  <Badge variant="outline">{status}</Badge>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{detail}</p>
              </div>
            ))}
            <Button variant="outline">Open manager brief</Button>
          </CardContent>
        </Card>
      </div>

      <Card className="py-0">
        <CardHeader className="border-b border-border/70 py-5">
          <CardTitle>Team Rituals</CardTitle>
          <CardDescription>Recurring practices that affect sustainable velocity</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3 p-5 md:grid-cols-3">
          {[
            ["Planning health", "Scope changes dropped 12% after sprint calibration."],
            ["Review quality", "Comment resolution time improved to 5.1 hours."],
            ["Knowledge sharing", "Three high-risk repos now have backup maintainers."],
          ].map(([title, detail]) => (
            <div key={title} className="rounded-xl border border-border/70 bg-secondary/25 p-4">
              <p className="font-medium">{title}</p>
              <p className="mt-2 text-sm text-muted-foreground">{detail}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
