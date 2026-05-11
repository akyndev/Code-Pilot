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

const repositories = [
  ["api-gateway", "Platform", "428", "18", "42", "4.2h", "Healthy"],
  ["billing-service", "Revenue", "286", "11", "27", "6.8h", "Watch"],
  ["mobile-sdk", "Developer Experience", "194", "7", "33", "9.1h", "Needs triage"],
  ["auth-core", "Identity", "312", "14", "18", "3.6h", "Healthy"],
]

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
          [GitCommitIcon, "Commits", "1,284", "+14% over last sprint"],
          [GitPullRequestIcon, "Merged PRs", "342", "4.2h median review"],
          [BugIcon, "Open Issues", "96", "18 marked priority"],
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
                  <TableHead>Owner</TableHead>
                  <TableHead>Commits</TableHead>
                  <TableHead>Open PRs</TableHead>
                  <TableHead>Issues</TableHead>
                  <TableHead>Review</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {repositories.map(([repo, owner, commits, prs, issues, review, status]) => (
                  <TableRow key={repo}>
                    <TableCell className="font-mono font-medium">{repo}</TableCell>
                    <TableCell>{owner}</TableCell>
                    <TableCell>{commits}</TableCell>
                    <TableCell>{prs}</TableCell>
                    <TableCell>{issues}</TableCell>
                    <TableCell>{review}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{status}</Badge>
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
            {[
              ["Draft", 24],
              ["In review", 38],
              ["Changes requested", 12],
              ["Ready to merge", 19],
            ].map(([stage, value]) => (
              <div key={stage as string}>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="font-medium">{stage as string}</span>
                  <Badge variant="secondary">{value as number}</Badge>
                </div>
                <Progress value={(value as number) * 2} />
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
          {["Flaky tests in mobile-sdk", "Billing migrations need review", "Auth-core security backlog"].map((item) => (
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
