import {
  AlertTriangleIcon,
  BellIcon,
  CheckCircle2Icon,
  ClockIcon,
  SirenIcon,
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
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

const incidents = [
  ["Checkout latency spike", "Revenue", "High", "Open", "6m", "Maya Chen"],
  ["CI queue saturation", "Developer Experience", "Medium", "Acknowledged", "14m", "Ari Kim"],
  ["Webhook retries elevated", "Integrations", "Low", "Monitoring", "31m", "Noah Patel"],
  ["Auth error budget burn", "Identity", "High", "Open", "42m", "Leah Stone"],
]

export default function AlertsPage() {
  return (
    <div className="flex flex-1 flex-col gap-6 px-4 py-4 md:px-6 md:py-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-normal">Alerts</h1>
          <p className="text-sm text-muted-foreground">
            Triage incidents, noisy alerts, acknowledgement times, and ownership.
          </p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Tabs defaultValue="open">
            <TabsList>
              <TabsTrigger value="open">Open</TabsTrigger>
              <TabsTrigger value="acked">Acknowledged</TabsTrigger>
              <TabsTrigger value="resolved">Resolved</TabsTrigger>
            </TabsList>
          </Tabs>
          <Button className="h-10">
            <BellIcon />
            Create rule
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        {[
          [SirenIcon, "Open incidents", "5", "1 high severity"],
          [ClockIcon, "Ack time", "6m", "Median response"],
          [AlertTriangleIcon, "Noisy alerts", "14", "-22% this month"],
          [CheckCircle2Icon, "Resolved today", "18", "Across 7 services"],
        ].map(([Icon, label, value, detail]) => {
          const MetricIcon = Icon as typeof SirenIcon

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

      <div className="grid gap-4 @5xl/main:grid-cols-[1.2fr_0.8fr]">
        <Card className="py-0">
          <CardHeader className="border-b border-border/70 py-5">
            <CardTitle>Incident Queue</CardTitle>
            <CardDescription>Active alerts requiring ownership or response</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Incident</TableHead>
                  <TableHead>Service</TableHead>
                  <TableHead>Severity</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Ack</TableHead>
                  <TableHead>Owner</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {incidents.map(([incident, service, severity, status, ack, owner]) => (
                  <TableRow key={incident}>
                    <TableCell className="font-medium">{incident}</TableCell>
                    <TableCell>{service}</TableCell>
                    <TableCell>
                      <Badge variant={severity === "High" ? "destructive" : "outline"}>
                        {severity}
                      </Badge>
                    </TableCell>
                    <TableCell>{status}</TableCell>
                    <TableCell>{ack}</TableCell>
                    <TableCell>{owner}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="py-0">
          <CardHeader className="border-b border-border/70 py-5">
            <CardTitle>Alert Noise</CardTitle>
            <CardDescription>Recurring alerts by source</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 p-5">
            {[
              ["CI flakes", 74],
              ["Webhook retries", 52],
              ["Latency thresholds", 38],
              ["Disk pressure", 21],
            ].map(([source, value]) => (
              <div key={source as string}>
                <div className="mb-2 flex justify-between text-sm">
                  <span className="font-medium">{source as string}</span>
                  <span className="text-muted-foreground">{value as number} alerts</span>
                </div>
                <Progress value={value as number} />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card className="py-0">
        <CardHeader className="border-b border-border/70 py-5">
          <CardTitle>Escalation Policies</CardTitle>
          <CardDescription>Routing rules for critical engineering signals</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3 p-5 md:grid-cols-3">
          {[
            ["Production services", "PagerDuty primary rotation", "Enabled"],
            ["Security critical", "AppSec emergency channel", "Enabled"],
            ["CI/CD failures", "Developer Experience triage", "Enabled"],
          ].map(([name, route, status]) => (
            <div key={name} className="rounded-xl border border-border/70 bg-secondary/25 p-4">
              <div className="flex items-center justify-between">
                <p className="font-medium">{name}</p>
                <Badge variant="secondary">{status}</Badge>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{route}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
