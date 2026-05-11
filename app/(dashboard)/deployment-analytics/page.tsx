import {
  AlertTriangleIcon,
  CheckCircle2Icon,
  ClockIcon,
  RocketIcon,
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
import { Progress } from "@/components/ui/progress"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const deployments = [
  ["api-gateway", "Production", "v2.18.0", "Success", "18m ago", "Maya Chen"],
  ["billing-service", "Staging", "v1.42.3", "Failed", "44m ago", "Release Bot"],
  ["mobile-sdk", "Production", "v5.9.1", "Success", "2h ago", "Ari Kim"],
  ["auth-core", "Canary", "v3.4.8", "Running", "3h ago", "Noah Patel"],
]

export default function DeploymentAnalyticsPage() {
  return (
    <div className="flex flex-1 flex-col gap-6 px-4 py-4 md:px-6 md:py-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-normal">Deployment Analytics</h1>
          <p className="text-sm text-muted-foreground">
            Monitor release frequency, build failures, and recovery performance.
          </p>
        </div>
        <Button className="h-10"> 
          <RocketIcon />
          Start release review
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        {[
          [RocketIcon, "Deployments", "213", "32 production releases"],
          [AlertTriangleIcon, "Failure rate", "3.1%", "-1.4% this month"],
          [ClockIcon, "MTTR", "18m", "Median recovery"],
          [CheckCircle2Icon, "Change success", "96.9%", "+4.2% this quarter"],
        ].map(([Icon, label, value, detail]) => {
          const MetricIcon = Icon as typeof RocketIcon

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

      <Card className="py-0">
        <CardHeader className="border-b border-border/70 py-5">
          <CardTitle>Release Pipeline</CardTitle>
          <CardDescription>Current readiness across the release path</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 p-5 md:grid-cols-4">
          {[
            ["Build", "98.4%", "Passing", 98],
            ["Test", "94.1%", "2 flaky suites", 94],
            ["Staging", "100%", "Ready", 100],
            ["Production", "96.9%", "1 rollback", 97],
          ].map(([stage, score, detail, progress]) => (
            <div key={stage as string} className="rounded-xl border border-border/70 bg-secondary/25 p-4">
              <div className="mb-5 flex items-center justify-between">
                <p className="font-medium">{stage as string}</p>
                <Badge variant="outline">{detail as string}</Badge>
              </div>
              <p className="mb-3 text-3xl font-semibold">{score as string}</p>
              <Progress value={progress as number} />
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="grid gap-4 @5xl/main:grid-cols-[1.2fr_0.8fr]">
        <Card className="py-0">
          <CardHeader className="border-b border-border/70 py-5">
            <CardTitle>Deployment History</CardTitle>
            <CardDescription>Latest releases and environment status</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Service</TableHead>
                  <TableHead>Env</TableHead>
                  <TableHead>Version</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>When</TableHead>
                  <TableHead>Owner</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {deployments.map(([service, env, version, status, when, owner]) => (
                  <TableRow key={`${service}-${version}`}>
                    <TableCell className="font-mono font-medium">{service}</TableCell>
                    <TableCell>{env}</TableCell>
                    <TableCell>{version}</TableCell>
                    <TableCell>
                      <Badge variant={status === "Failed" ? "destructive" : "outline"}>{status}</Badge>
                    </TableCell>
                    <TableCell>{when}</TableCell>
                    <TableCell>{owner}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="py-0">
          <CardHeader className="border-b border-border/70 py-5">
            <CardTitle>Failure Breakdown</CardTitle>
            <CardDescription>Why builds and releases failed this week</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 p-5">
            {[
              ["Test failures", 42],
              ["Config drift", 27],
              ["Dependency install", 18],
              ["Manual rollback", 9],
            ].map(([reason, value]) => (
              <div key={reason as string}>
                <div className="mb-2 flex justify-between text-sm">
                  <span className="font-medium">{reason as string}</span>
                  <span className="text-muted-foreground">{value as number}%</span>
                </div>
                <Progress value={value as number} />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
