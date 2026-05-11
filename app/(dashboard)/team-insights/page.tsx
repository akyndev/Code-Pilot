"use client"

import * as React from "react"
import {
  BrainIcon,
  GitPullRequestIcon,
  SearchIcon,
  ShieldCheckIcon,
  UsersIcon,
} from "lucide-react"
import { Bar, BarChart, CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"

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
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
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

const performanceTrend = [
  { week: "Dec 1", throughput: 42, focus: 62, reviews: 28 },
  { week: "Dec 8", throughput: 44, focus: 64, reviews: 31 },
  { week: "Dec 15", throughput: 41, focus: 61, reviews: 35 },
  { week: "Dec 22", throughput: 38, focus: 63, reviews: 26 },
  { week: "Dec 29", throughput: 40, focus: 65, reviews: 29 },
  { week: "Jan 5", throughput: 47, focus: 66, reviews: 33 },
  { week: "Jan 12", throughput: 50, focus: 67, reviews: 36 },
  { week: "Jan 19", throughput: 53, focus: 69, reviews: 37 },
  { week: "Jan 26", throughput: 51, focus: 68, reviews: 40 },
  { week: "Feb 2", throughput: 54, focus: 70, reviews: 42 },
  { week: "Feb 9", throughput: 56, focus: 69, reviews: 45 },
  { week: "Feb 16", throughput: 53, focus: 67, reviews: 43 },
  { week: "Feb 23", throughput: 49, focus: 66, reviews: 34 },
  { week: "Mar 2", throughput: 52, focus: 68, reviews: 38 },
  { week: "Mar 9", throughput: 55, focus: 67, reviews: 41 },
  { week: "Mar 16", throughput: 57, focus: 70, reviews: 39 },
  { week: "Mar 23", throughput: 60, focus: 72, reviews: 44 },
  { week: "Mar 30", throughput: 56, focus: 70, reviews: 47 },
  { week: "Apr 6", throughput: 58, focus: 71, reviews: 42 },
  { week: "Apr 13", throughput: 64, focus: 73, reviews: 49 },
  { week: "Apr 20", throughput: 61, focus: 69, reviews: 53 },
  { week: "Apr 27", throughput: 68, focus: 75, reviews: 57 },
  { week: "May 4", throughput: 74, focus: 79, reviews: 63 },
  { week: "May 11", throughput: 78, focus: 81, reviews: 69 },
]

const workloadSamples = [
  { name: "EC", team: "Web Platform", mergedPrs: 10, reviews: 9 },
  { name: "JR", team: "Revenue Systems", mergedPrs: 8, reviews: 13 },
  { name: "SO", team: "Identity", mergedPrs: 11, reviews: 10 },
  { name: "TN", team: "Developer Experience", mergedPrs: 7, reviews: 8 },
  { name: "VL", team: "Data Platform", mergedPrs: 9, reviews: 12 },
  { name: "BK", team: "Security", mergedPrs: 6, reviews: 15 },
  { name: "HD", team: "Web Platform", mergedPrs: 13, reviews: 11 },
  { name: "IM", team: "Revenue Systems", mergedPrs: 5, reviews: 7 },
]

const performanceConfig = {
  throughput: { label: "Throughput", color: "var(--chart-1)" },
  focus: { label: "Focus index", color: "var(--chart-2)" },
} satisfies ChartConfig

const workloadConfig = {
  mergedPrs: { label: "Merged PRs", color: "var(--chart-1)" },
  reviews: { label: "Reviews", color: "var(--chart-3)" },
} satisfies ChartConfig

function getHealthLabel(focusScore: number, reviews: number) {
  if (focusScore < 62 || reviews > 22) {
    return "Watch"
  }

  if (focusScore < 74 || reviews > 18) {
    return "Balanced"
  }

  return "Healthy"
}

export default function TeamInsightsPage() {
  const [query, setQuery] = React.useState("")
  const [team, setTeam] = React.useState("all")
  const [view, setView] = React.useState("people")

  const teams = React.useMemo(
    () => Array.from(new Set(activeEngineers.map((engineer) => engineer.team))).sort(),
    []
  )

  const filteredEngineers = React.useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    return activeEngineers.filter((engineer) => {
      const matchesQuery =
        !normalizedQuery ||
        [engineer.name, engineer.email, engineer.team, engineer.role].some((value) =>
          value.toLowerCase().includes(normalizedQuery)
        )
      const matchesTeam = team === "all" || engineer.team === team

      return matchesQuery && matchesTeam
    })
  }, [query, team])

  const averageReviewLoad =
    filteredEngineers.length > 0
      ? filteredEngineers.reduce((total, engineer) => total + engineer.reviews, 0) /
        filteredEngineers.length
      : 0
  const averageFocus =
    filteredEngineers.length > 0
      ? filteredEngineers.reduce((total, engineer) => total + engineer.focusScore, 0) /
        filteredEngineers.length
      : 0
  const mergedPrs = filteredEngineers.reduce((total, engineer) => total + engineer.mergedPrs, 0)
  const normalizedWorkloadQuery = query.trim().toLowerCase()
  const workloadData = [
    ...filteredEngineers.map((engineer) => ({
      name: engineer.initials,
      team: engineer.team,
      mergedPrs: engineer.mergedPrs,
      reviews: engineer.reviews,
    })),
    ...workloadSamples.filter((sample) => {
      const matchesTeam = team === "all" || sample.team === team
      const matchesQuery =
        !normalizedWorkloadQuery ||
        [sample.name, sample.team].some((value) =>
          value.toLowerCase().includes(normalizedWorkloadQuery)
        )

      return matchesTeam && matchesQuery
    }),
  ]

  const teamBreakdown = teams.map((teamName) => {
    const teamMembers = activeEngineers.filter((engineer) => engineer.team === teamName)
    const teamFocus =
      teamMembers.reduce((total, engineer) => total + engineer.focusScore, 0) /
      teamMembers.length
    const teamReviews = teamMembers.reduce((total, engineer) => total + engineer.reviews, 0)

    return {
      team: teamName,
      members: teamMembers.length,
      focus: Math.round(teamFocus),
      reviews: teamReviews,
      delivery: teamMembers.reduce((total, engineer) => total + engineer.mergedPrs, 0),
    }
  })

  return (
    <div className="flex flex-1 flex-col gap-6 px-4 py-4 md:px-6 md:py-6">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-normal">Team Insights</h1>
          <p className="text-sm text-muted-foreground">
            Measure performance without losing the human context behind delivery.
          </p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <div className="relative">
            <SearchIcon className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              className="h-10 pl-9 sm:w-72"
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search people, teams, roles..."
              value={query}
            />
          </div>
          <Select onValueChange={setTeam} value={team}>
            <SelectTrigger className="h-10! sm:w-52">
              <SelectValue placeholder="Team" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All teams</SelectItem>
              {teams.map((item) => (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        {[
          [UsersIcon, "Contributors", filteredEngineers.length.toString(), "Active contributors in view"],
          [GitPullRequestIcon, "Merged PRs", mergedPrs.toString(), "Delivery throughput"],
          [ShieldCheckIcon, "Review load", averageReviewLoad.toFixed(1), "Reviews per engineer"],
          [BrainIcon, "Focus index", `${Math.round(averageFocus)}%`, "+5% from baseline"],
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

      <div className="grid gap-4 @5xl/main:grid-cols-[1.15fr_0.85fr]">
        <Card className="py-0">
          <CardHeader className="border-b border-border/70 py-5">
            <CardTitle>Performance Trend</CardTitle>
            <CardDescription>Throughput and focus score over the last six weeks</CardDescription>
          </CardHeader>
          <CardContent className="p-5">
            <ChartContainer className="h-72 w-full" config={performanceConfig}>
              <LineChart data={performanceTrend} margin={{ left: 12, right: 12 }}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="week" tickLine={false} axisLine={false} tickMargin={8} interval="preserveStartEnd" />
                <YAxis tickLine={false} axisLine={false} tickMargin={8} width={34} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line
                  dataKey="throughput"
                  dot={false}
                  stroke="var(--color-throughput)"
                  strokeWidth={2}
                  type="monotone"
                />
                <Line
                  dataKey="focus"
                  dot={false}
                  stroke="var(--color-focus)"
                  strokeWidth={2}
                  type="monotone"
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="py-0">
          <CardHeader className="border-b border-border/70 py-5">
            <CardTitle>Workload Balance</CardTitle>
            <CardDescription>Delivery and review work by contributor</CardDescription>
          </CardHeader>
          <CardContent className="p-5">
            <ChartContainer className="h-72 w-full" config={workloadConfig}>
              <BarChart data={workloadData}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="name" tickLine={false} axisLine={false} tickMargin={8} />
                <YAxis tickLine={false} axisLine={false} tickMargin={8} width={28} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="mergedPrs" fill="var(--color-mergedPrs)" radius={6} barSize={10} />
                <Bar dataKey="reviews" fill="var(--color-reviews)" radius={6} barSize={10} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 @5xl/main:grid-cols-[1.25fr_0.75fr]">
        <Card className="py-0">
          <CardHeader className="flex-row items-center justify-between border-b border-border/70 py-5">
            <div>
              <CardTitle>Performance Metrics</CardTitle>
              <CardDescription>Delivery, review pressure, focus health, and risk by person</CardDescription>
            </div>
            <Tabs onValueChange={setView} value={view}>
              <TabsList className="h-10">
                <TabsTrigger value="people">People</TabsTrigger>
                <TabsTrigger value="teams">Teams</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          <CardContent className="p-0">
            {view === "people" ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Contributor</TableHead>
                    <TableHead>Team</TableHead>
                    <TableHead>Merged PRs</TableHead>
                    <TableHead>Reviews</TableHead>
                    <TableHead>Focus</TableHead>
                    <TableHead>On-call</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredEngineers.map((engineer) => {
                    const status = getHealthLabel(engineer.focusScore, engineer.reviews)

                    return (
                      <TableRow key={engineer.email}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="size-9 rounded-lg">
                              <AvatarImage src="/avatars/shadcn.jpg" alt={engineer.name} />
                              <AvatarFallback className="rounded-lg">{engineer.initials}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{engineer.name}</p>
                              <p className="text-xs text-muted-foreground">{engineer.role}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{engineer.team}</TableCell>
                        <TableCell>{engineer.mergedPrs}</TableCell>
                        <TableCell>{engineer.reviews}</TableCell>
                        <TableCell className="min-w-36">
                          <Progress value={engineer.focusScore} />
                        </TableCell>
                        <TableCell>{engineer.onCallLoad}</TableCell>
                        <TableCell>
                          <Badge variant={status === "Watch" ? "destructive" : "outline"}>{status}</Badge>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Team</TableHead>
                    <TableHead>Members</TableHead>
                    <TableHead>Delivery</TableHead>
                    <TableHead>Reviews</TableHead>
                    <TableHead>Focus</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {teamBreakdown.map((item) => (
                    <TableRow key={item.team}>
                      <TableCell className="font-medium">{item.team}</TableCell>
                      <TableCell>{item.members}</TableCell>
                      <TableCell>{item.delivery}</TableCell>
                      <TableCell>{item.reviews}</TableCell>
                      <TableCell className="min-w-36">
                        <Progress value={item.focus} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
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
                  <Badge variant={status === "Watch" ? "destructive" : "outline"}>{status}</Badge>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{detail}</p>
              </div>
            ))}
            <Button variant="outline">
              <ShieldCheckIcon />
              Open manager brief
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
