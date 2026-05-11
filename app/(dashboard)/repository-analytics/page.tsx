"use client"

import * as React from "react"
import {
  AlertTriangleIcon,
  BugIcon,
  CircleDotIcon,
  GitCommitIcon,
  GitPullRequestIcon,
  SearchIcon,
  SlidersHorizontalIcon,
} from "lucide-react"
import { Bar, BarChart, CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"

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
import { pullRequests, repos, type Repository } from "@/lib/mock-data"

const repositoryTrend = [
  { week: "Dec 1", commits: 142, merged: 28, issues: 58 },
  { week: "Dec 8", commits: 151, merged: 31, issues: 55 },
  { week: "Dec 15", commits: 137, merged: 26, issues: 62 },
  { week: "Dec 22", commits: 118, merged: 22, issues: 60 },
  { week: "Dec 29", commits: 129, merged: 25, issues: 57 },
  { week: "Jan 5", commits: 166, merged: 34, issues: 53 },
  { week: "Jan 12", commits: 174, merged: 36, issues: 51 },
  { week: "Jan 19", commits: 181, merged: 38, issues: 49 },
  { week: "Jan 26", commits: 169, merged: 35, issues: 52 },
  { week: "Feb 2", commits: 192, merged: 40, issues: 46 },
  { week: "Feb 9", commits: 207, merged: 44, issues: 45 },
  { week: "Feb 16", commits: 199, merged: 42, issues: 48 },
  { week: "Feb 23", commits: 186, merged: 39, issues: 44 },
  { week: "Mar 2", commits: 204, merged: 43, issues: 42 },
  { week: "Mar 9", commits: 198, merged: 41, issues: 47 },
  { week: "Mar 16", commits: 232, merged: 50, issues: 38 },
  { week: "Mar 23", commits: 241, merged: 52, issues: 36 },
  { week: "Mar 30", commits: 226, merged: 49, issues: 40 },
  { week: "Apr 6", commits: 214, merged: 48, issues: 31 },
  { week: "Apr 13", commits: 248, merged: 54, issues: 27 },
  { week: "Apr 20", commits: 286, merged: 61, issues: 35 },
  { week: "Apr 27", commits: 269, merged: 58, issues: 29 },
  { week: "May 4", commits: 331, merged: 76, issues: 24 },
  { week: "May 11", commits: 354, merged: 82, issues: 22 },
]

const repositoryTrendConfig = {
  commits: { label: "Commits", color: "var(--chart-1)" },
  merged: { label: "Merged PRs", color: "var(--chart-2)" },
} satisfies ChartConfig

const issueConfig = {
  issues: { label: "Issues", color: "var(--chart-3)" },
} satisfies ChartConfig

const statusVariant: Record<Repository["status"], "secondary" | "outline" | "destructive"> = {
  Healthy: "secondary",
  Watch: "outline",
  "Needs triage": "destructive",
}

function getRiskScore(repo: Repository) {
  return Math.min(
    100,
    Math.round(repo.openPrs * 2.2 + repo.issues * 1.1 + repo.medianReviewHours * 4)
  )
}

export default function RepositoryAnalyticsPage() {
  const [query, setQuery] = React.useState("")
  const [status, setStatus] = React.useState("all")
  const [team, setTeam] = React.useState("all")
  const [language, setLanguage] = React.useState("all")

  const teams = React.useMemo(
    () => Array.from(new Set(repos.map((repo) => repo.team))).sort(),
    []
  )
  const languages = React.useMemo(
    () => Array.from(new Set(repos.map((repo) => repo.language))).sort(),
    []
  )

  const filteredRepos = React.useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    return repos.filter((repo) => {
      const matchesQuery =
        !normalizedQuery ||
        [repo.name, repo.owner, repo.team, repo.language].some((value) =>
          value.toLowerCase().includes(normalizedQuery)
        )
      const matchesStatus = status === "all" || repo.status === status
      const matchesTeam = team === "all" || repo.team === team
      const matchesLanguage = language === "all" || repo.language === language

      return matchesQuery && matchesStatus && matchesTeam && matchesLanguage
    })
  }, [language, query, status, team])

  const totalCommits = filteredRepos.reduce((total, repo) => total + repo.commits30d, 0)
  const totalOpenPrs = filteredRepos.reduce((total, repo) => total + repo.openPrs, 0)
  const totalIssues = filteredRepos.reduce((total, repo) => total + repo.issues, 0)
  const medianReview =
    filteredRepos.length > 0
      ? filteredRepos.reduce((total, repo) => total + repo.medianReviewHours, 0) /
        filteredRepos.length
      : 0

  return (
    <div className="flex flex-1 flex-col gap-6 px-4 py-4 md:px-6 md:py-6">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-normal">Repository Analytics</h1>
          <p className="text-sm text-muted-foreground">
            Filter repositories, inspect delivery pressure, and track code movement by team.
          </p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <div className="relative">
            <SearchIcon className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              className="h-10 pl-9 sm:w-80"
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search repositories, owners, teams..."
              value={query}
            />
          </div>
          <Tabs onValueChange={setStatus} value={status}>
            <TabsList className="h-10">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="Healthy">Healthy</TabsTrigger>
              <TabsTrigger value="Watch">Watch</TabsTrigger>
              <TabsTrigger value="Needs triage">Triage</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      <Card className="py-0">
        <CardContent className="grid gap-3 p-4 md:grid-cols-[1fr_1fr_1fr_auto]">
          <Select onValueChange={setTeam} value={team}>
            <SelectTrigger className="h-10!">
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
          <Select onValueChange={setLanguage} value={language}>
            <SelectTrigger className="h-10!">
              <SelectValue placeholder="Language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All languages</SelectItem>
              {languages.map((item) => (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="flex items-center gap-2 rounded-lg border border-border/70 px-3 text-sm text-muted-foreground">
            <SlidersHorizontalIcon className="size-4" />
            {filteredRepos.length} of {repos.length} repositories shown
          </div>
          <Button
            className="h-10"
            onClick={() => {
              setQuery("")
              setStatus("all")
              setTeam("all")
              setLanguage("all")
            }}
            variant="outline"
          >
            Reset
          </Button>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-4">
        {[
          [GitCommitIcon, "Commits", totalCommits.toLocaleString(), "Last 30 days"],
          [GitPullRequestIcon, "Open PRs", totalOpenPrs.toString(), `${medianReview.toFixed(1)}h median review`],
          [BugIcon, "Open Issues", totalIssues.toString(), "Across filtered repos"],
          [AlertTriangleIcon, "Repos at risk", filteredRepos.filter((repo) => repo.status !== "Healthy").length.toString(), "Watch or triage"],
        ].map(([Icon, label, value, detail]) => {
          const MetricIcon = Icon as typeof GitCommitIcon

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

      <div className="grid gap-4 @5xl/main:grid-cols-[1.35fr_0.65fr]">
        <Card className="py-0">
          <CardHeader className="border-b border-border/70 py-5">
            <CardTitle>Code Movement</CardTitle>
            <CardDescription>Weekly commits and merged pull requests</CardDescription>
          </CardHeader>
          <CardContent className="p-5">
            <ChartContainer className="h-72 w-full" config={repositoryTrendConfig}>
              <LineChart data={repositoryTrend} margin={{ left: 12, right: 12 }}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="week" tickLine={false} axisLine={false} tickMargin={8} interval="preserveStartEnd" />
                <YAxis tickLine={false} axisLine={false} tickMargin={8} width={34} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line
                  dataKey="commits"
                  stroke="var(--color-commits)"
                  strokeWidth={2}
                  dot={false}
                  type="monotone"
                />
                <Line
                  dataKey="merged"
                  stroke="var(--color-merged)"
                  strokeWidth={2}
                  dot={false}
                  type="monotone"
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="py-0">
          <CardHeader className="border-b border-border/70 py-5">
            <CardTitle>Issue Pressure</CardTitle>
            <CardDescription>Open issue trend by week</CardDescription>
          </CardHeader>
          <CardContent className="p-5">
            <ChartContainer className="h-72 w-full" config={issueConfig}>
              <BarChart data={repositoryTrend} barCategoryGap="38%">
                <CartesianGrid vertical={false} />
                <XAxis dataKey="week" tickLine={false} axisLine={false} tickMargin={8} interval="preserveStartEnd" />
                <YAxis tickLine={false} axisLine={false} tickMargin={8} width={28} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="issues" fill="var(--color-issues)" radius={5} barSize={6} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 @5xl/main:grid-cols-[1.35fr_0.65fr]">
        <Card className="py-0">
          <CardHeader className="border-b border-border/70 py-5">
            <CardTitle>Repository Health</CardTitle>
            <CardDescription>Filtered table with ownership, review pressure, and risk</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Repository</TableHead>
                  <TableHead>Owner</TableHead>
                  <TableHead>Team</TableHead>
                  <TableHead>Commits</TableHead>
                  <TableHead>Open PRs</TableHead>
                  <TableHead>Review</TableHead>
                  <TableHead>Risk</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRepos.map((repo) => {
                  const risk = getRiskScore(repo)

                  return (
                    <TableRow key={repo.name}>
                      <TableCell>
                        <div>
                          <p className="font-mono font-medium">{repo.name}</p>
                          <p className="text-xs text-muted-foreground">{repo.language}</p>
                        </div>
                      </TableCell>
                      <TableCell>{repo.owner}</TableCell>
                      <TableCell>{repo.team}</TableCell>
                      <TableCell>{repo.commits30d.toLocaleString()}</TableCell>
                      <TableCell>{repo.openPrs}</TableCell>
                      <TableCell>{repo.medianReviewHours.toFixed(1)}h</TableCell>
                      <TableCell className="min-w-32">
                        <div className="flex items-center gap-2">
                          <Progress value={risk} />
                          <span className="w-8 text-right text-xs text-muted-foreground">{risk}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={statusVariant[repo.status]}>{repo.status}</Badge>
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
            <CardTitle>Pull Request Queue</CardTitle>
            <CardDescription>Current reviews needing attention</CardDescription>
          </CardHeader>
          <CardContent className="divide-y divide-border/70 p-0">
            {pullRequests.map((pr) => (
              <div key={pr.id} className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-medium">#{pr.id} {pr.title}</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {pr.repo} by {pr.author} · {pr.createdAt}
                    </p>
                  </div>
                  <Badge variant={pr.checks === "Failing" ? "destructive" : "outline"}>
                    {pr.checks}
                  </Badge>
                </div>
                <div className="mt-3 flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{pr.stage}</span>
                  <span className="font-mono">{pr.leadTimeHours.toFixed(1)}h lead</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card className="py-0">
        <CardHeader className="border-b border-border/70 py-5">
          <CardTitle>Issue Hotspots</CardTitle>
          <CardDescription>Areas where repository work is backing up</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3 p-5 md:grid-cols-3">
          {[
            "Flaky Android release tests in mobile-sdk",
            "Ledger migration reviews backing up in payments-service",
            "Token refresh security backlog in auth-api",
          ].map((item) => (
            <div key={item} className="flex gap-3 rounded-xl border border-border/70 bg-secondary/25 p-4">
              <CircleDotIcon className="mt-0.5 size-4 text-primary" />
              <p className="text-sm text-muted-foreground">{item}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
