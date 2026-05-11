import {
  BugIcon,
  CircleDotIcon,
  GitCommitIcon,
  GitPullRequestIcon,
  SearchIcon,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { pullRequests, repos } from "@/lib/mock-data"

const totalCommits = repos.reduce((total, repo) => total + repo.commits30d, 0)
const totalOpenPrs = repos.reduce((total, repo) => total + repo.openPrs, 0)
const totalIssues = repos.reduce((total, repo) => total + repo.issues, 0)
const medianReview =
  repos.reduce((total, repo) => total + repo.medianReviewHours, 0) / repos.length

const prStages = ["Draft", "In review", "Changes requested", "Ready to merge"] as const

export default function RepositoryAnalyticsPage() {
  return (
    <div className="flex flex-1 flex-col gap-6 px-4 py-4 md:px-6 md:py-6">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-normal">Repository Analytics</h1>
          <p className="text-sm text-muted-foreground">
            Understand code movement, pull request flow, and issue pressure by repository.
          </p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <div className="relative">
            <SearchIcon className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input className="h-10 pl-9 sm:w-80" placeholder="Search repositories..." />
          </div>
          <Tabs defaultValue="active" className="" >
            <TabsList className="">
              <TabsTrigger className="p-3" value="active">Active</TabsTrigger>
              <TabsTrigger className="p-3" value="watched">Watched</TabsTrigger>
              <TabsTrigger className="p-3" value="archived">Archived</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {[
          [GitCommitIcon, "Commits", totalCommits.toLocaleString(), "+14% over last sprint"],
          [GitPullRequestIcon, "Open PRs", totalOpenPrs.toString(), `${medianReview.toFixed(1)}h median review`],
          [BugIcon, "Open Issues", totalIssues.toString(), "18 marked priority"],
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
            <CardTitle>Repository Health</CardTitle>
            <CardDescription>Commit volume, review time, and open work across core repos</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Repository</TableHead>
                  <TableHead>Team</TableHead>
                  <TableHead>Commits</TableHead>
                  <TableHead>Open PRs</TableHead>
                  <TableHead>Issues</TableHead>
                  <TableHead>Review</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {repos.map((repo) => (
                  <TableRow key={repo.name}>
                    <TableCell>
                      <div>
                        <p className="font-mono font-medium">{repo.name}</p>
                        <p className="text-xs text-muted-foreground">{repo.language}</p>
                      </div>
                    </TableCell>
                    <TableCell>{repo.team}</TableCell>
                    <TableCell>{repo.commits30d.toLocaleString()}</TableCell>
                    <TableCell>{repo.openPrs}</TableCell>
                    <TableCell>{repo.issues}</TableCell>
                    <TableCell>{repo.medianReviewHours.toFixed(1)}h</TableCell>
                    <TableCell>
                      <Badge variant="outline">{repo.status}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="py-0">
          <CardHeader className="border-b border-border/70 py-5">
            <CardTitle>PR Flow</CardTitle>
            <CardDescription>Current pull requests by review stage</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 p-5">
            {prStages.map((stage) => {
              const value = pullRequests.filter((pr) => pr.stage === stage).length

              return (
                <div key={stage}>
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span className="font-medium">{stage}</span>
                    <Badge variant="secondary">{value}</Badge>
                  </div>
                  <Progress value={value * 22} />
                </div>
              )
            })}
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
