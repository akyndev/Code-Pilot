"use client"

import * as React from "react"
import {
  ActivityIcon,
  CopyIcon,
  KeyRoundIcon,
  PlusIcon,
  RefreshCwIcon,
  SearchIcon,
  ServerIcon,
  Trash2Icon,
} from "lucide-react"
import { Area, AreaChart, CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"

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
import { Switch } from "@/components/ui/switch"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { repos } from "@/lib/mock-data"

const apiKeys = [
  {
    name: "Production API key",
    key: "sk_live_********4248",
    status: "Disabled",
    created: "25 Jan, 2026",
    used: "Today, 10:45 AM",
  },
  {
    name: "Development API key",
    key: "dev_live_********4923",
    status: "Active",
    created: "29 Dec, 2025",
    used: "Today, 12:40 AM",
  },
  {
    name: "Legacy API key",
    key: "leg_live_********0932",
    status: "Active",
    created: "12 Mar, 2025",
    used: "Yesterday, 11:45 PM",
  },
] as const

const trafficData = [
  { time: "00:00", requests: 126000, errors: 162, latency: 178 },
  { time: "01:00", requests: 116000, errors: 151, latency: 173 },
  { time: "02:00", requests: 108000, errors: 141, latency: 169 },
  { time: "03:00", requests: 99000, errors: 126, latency: 166 },
  { time: "04:00", requests: 94000, errors: 118, latency: 164 },
  { time: "05:00", requests: 102000, errors: 129, latency: 167 },
  { time: "06:00", requests: 121000, errors: 154, latency: 171 },
  { time: "07:00", requests: 149000, errors: 196, latency: 181 },
  { time: "08:00", requests: 188000, errors: 266, latency: 192 },
  { time: "09:00", requests: 211000, errors: 291, latency: 199 },
  { time: "10:00", requests: 224000, errors: 306, latency: 205 },
  { time: "11:00", requests: 236000, errors: 315, latency: 209 },
  { time: "12:00", requests: 246000, errors: 328, latency: 211 },
  { time: "13:00", requests: 242000, errors: 324, latency: 210 },
  { time: "14:00", requests: 238000, errors: 319, latency: 207 },
  { time: "15:00", requests: 229000, errors: 301, latency: 202 },
  { time: "16:00", requests: 219000, errors: 284, latency: 197 },
  { time: "17:00", requests: 207000, errors: 263, latency: 192 },
  { time: "18:00", requests: 196000, errors: 242, latency: 188 },
  { time: "19:00", requests: 184000, errors: 221, latency: 184 },
  { time: "20:00", requests: 171000, errors: 204, latency: 181 },
  { time: "21:00", requests: 159000, errors: 190, latency: 179 },
  { time: "22:00", requests: 148000, errors: 179, latency: 176 },
  { time: "23:00", requests: 137000, errors: 168, latency: 174 },
]

const trafficConfig = {
  requests: { label: "Requests", color: "var(--chart-1)" },
  errors: { label: "Errors", color: "var(--chart-4)" },
} satisfies ChartConfig

const latencyConfig = {
  latency: { label: "P95 latency", color: "var(--chart-2)" },
} satisfies ChartConfig

const endpoints = repos.slice(0, 5).map((repo, index) => ({
  endpoint: `/v1/repos/${repo.name}`,
  requests: ["4.2M", "2.8M", "1.6M", "890k", "740k"][index],
  p95: ["184ms", "211ms", "143ms", "268ms", "196ms"][index],
  errors: ["0.12%", "0.24%", "0.08%", "0.19%", "0.16%"][index],
  saturation: [64, 58, 42, 71, 49][index],
  status: repo.status === "Needs triage" ? "Watch" : "Within SLO",
}))

const requestLogs = [
  {
    id: "req_8a42c19",
    time: "10:45:18",
    method: "GET",
    path: "/v1/repos/frontend-platform/metrics",
    status: 200,
    latency: 143,
    key: "Production",
    region: "iad1",
  },
  {
    id: "req_7fc921e",
    time: "10:44:57",
    method: "POST",
    path: "/v1/reports/export",
    status: 202,
    latency: 384,
    key: "Development",
    region: "sfo1",
  },
  {
    id: "req_62bb014",
    time: "10:44:11",
    method: "GET",
    path: "/v1/deployments?service=payments-service",
    status: 200,
    latency: 211,
    key: "Production",
    region: "iad1",
  },
  {
    id: "req_57ac903",
    time: "10:43:36",
    method: "POST",
    path: "/v1/webhooks/github",
    status: 429,
    latency: 96,
    key: "Legacy",
    region: "fra1",
  },
  {
    id: "req_44d12af",
    time: "10:42:49",
    method: "GET",
    path: "/v1/security/vulnerabilities",
    status: 500,
    latency: 612,
    key: "Production",
    region: "iad1",
  },
  {
    id: "req_31fe782",
    time: "10:42:03",
    method: "GET",
    path: "/v1/team/insights",
    status: 200,
    latency: 176,
    key: "Development",
    region: "sfo1",
  },
]

function getStatusVariant(status: number) {
  if (status >= 500) {
    return "destructive"
  }

  if (status >= 400) {
    return "outline"
  }

  return "secondary"
}

export default function ApiUsagePage() {
  const [keyStatus, setKeyStatus] = React.useState(() =>
    Object.fromEntries(apiKeys.map((item) => [item.key, item.status === "Active"]))
  )
  const [logQuery, setLogQuery] = React.useState("")
  const [statusFilter, setStatusFilter] = React.useState("all")

  const filteredLogs = React.useMemo(() => {
    const normalizedQuery = logQuery.trim().toLowerCase()

    return requestLogs.filter((log) => {
      const matchesQuery =
        !normalizedQuery ||
        [log.id, log.method, log.path, log.key, log.region].some((value) =>
          value.toLowerCase().includes(normalizedQuery)
        )
      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "success" && log.status < 300) ||
        (statusFilter === "warning" && log.status >= 400 && log.status < 500) ||
        (statusFilter === "error" && log.status >= 500)

      return matchesQuery && matchesStatus
    })
  }, [logQuery, statusFilter])

  const totalRequests = trafficData.reduce((total, item) => total + item.requests, 0)
  const totalErrors = trafficData.reduce((total, item) => total + item.errors, 0)
  const averageLatency =
    trafficData.reduce((total, item) => total + item.latency, 0) / trafficData.length
  const errorRate = (totalErrors / totalRequests) * 100

  return (
    <div className="flex flex-1 flex-col gap-6 px-4 py-4 md:px-6 md:py-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-normal">API Usage</h1>
          <p className="text-sm text-muted-foreground">
            Monitor traffic, latency, keys, endpoint reliability, and live request logs.
          </p>
        </div>
        <Button className="h-10">
          <PlusIcon />
          Add API key
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        {[
          [ActivityIcon, "Requests", totalRequests.toLocaleString(), "Last 24 hours"],
          [ServerIcon, "P95 latency", `${Math.round(averageLatency)}ms`, "Weighted endpoint average"],
          [RefreshCwIcon, "Error rate", `${errorRate.toFixed(2)}%`, "Across all API keys"],
          [KeyRoundIcon, "Active keys", Object.values(keyStatus).filter(Boolean).length.toString(), "Currently enabled"],
        ].map(([Icon, label, value, detail]) => {
          const MetricIcon = Icon as typeof ActivityIcon

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
            <CardTitle>Request Volume</CardTitle>
            <CardDescription>Requests and errors by time of day</CardDescription>
          </CardHeader>
          <CardContent className="p-5">
            <ChartContainer className="h-72 w-full" config={trafficConfig}>
              <AreaChart data={trafficData} margin={{ left: 12, right: 12 }}>
                <defs>
                  <linearGradient id="requestsFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-requests)" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="var(--color-requests)" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="time" tickLine={false} axisLine={false} tickMargin={8} interval="preserveStartEnd" />
                <YAxis tickLine={false} axisLine={false} tickMargin={8} width={42} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area
                  dataKey="requests"
                  fill="url(#requestsFill)"
                  stroke="var(--color-requests)"
                  strokeWidth={2}
                  type="monotone"
                />
                <Area
                  dataKey="errors"
                  fill="var(--color-errors)"
                  fillOpacity={0.08}
                  stroke="var(--color-errors)"
                  strokeWidth={2}
                  type="monotone"
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="py-0">
          <CardHeader className="border-b border-border/70 py-5">
            <CardTitle>Latency</CardTitle>
            <CardDescription>P95 response time across the platform API</CardDescription>
          </CardHeader>
          <CardContent className="p-5">
            <ChartContainer className="h-72 w-full" config={latencyConfig}>
              <LineChart data={trafficData} margin={{ left: 12, right: 12 }}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="time" tickLine={false} axisLine={false} tickMargin={8} interval="preserveStartEnd" />
                <YAxis tickLine={false} axisLine={false} tickMargin={8} width={34} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line
                  dataKey="latency"
                  dot={false}
                  stroke="var(--color-latency)"
                  strokeWidth={2}
                  type="monotone"
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="py-0">
        <CardHeader className="flex-row items-center justify-between border-b border-border/70 py-5">
          <div>
            <CardTitle>API Keys</CardTitle>
            <CardDescription>Keys used to authenticate requests to the CodePilot API</CardDescription>
          </div>
          <KeyRoundIcon className="size-5 text-primary" />
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Last used</TableHead>
                <TableHead>Enabled</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {apiKeys.map((item) => {
                const enabled = keyStatus[item.key]

                return (
                  <TableRow key={item.key}>
                    <TableCell>
                      <div className="grid gap-2">
                        <span className="font-medium">{item.name}</span>
                        <div className="flex w-fit overflow-hidden rounded-lg border border-border/70 bg-secondary/20">
                          <span className="px-3 py-2 font-mono text-sm">{item.key}</span>
                          <Button className="h-full rounded-none border-l border-border/70" variant="ghost">
                            <CopyIcon />
                            Copy
                          </Button>
                          <Button className="h-full rounded-none border-l border-border/70" size="icon" variant="ghost">
                            <RefreshCwIcon />
                          </Button>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={enabled ? "secondary" : "destructive"}>
                        {enabled ? "Active" : "Disabled"}
                      </Badge>
                    </TableCell>
                    <TableCell>{item.created}</TableCell>
                    <TableCell>{item.used}</TableCell>
                    <TableCell>
                      <Switch
                        checked={enabled}
                        onCheckedChange={(checked) =>
                          setKeyStatus((current) => ({ ...current, [item.key]: checked }))
                        }
                        aria-label={`${item.name} enabled`}
                      />
                    </TableCell>
                    <TableCell className="text-right">
                      <Button size="icon-sm" variant="ghost">
                        <Trash2Icon />
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="grid gap-4 @5xl/main:grid-cols-[1.2fr_0.8fr]">
        <Card className="py-0">
          <CardHeader className="border-b border-border/70 py-5">
            <CardTitle>Endpoint SLOs</CardTitle>
            <CardDescription>Traffic, latency, error rates, and saturation by endpoint</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Endpoint</TableHead>
                  <TableHead>Requests</TableHead>
                  <TableHead>P95</TableHead>
                  <TableHead>Error rate</TableHead>
                  <TableHead>Saturation</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {endpoints.map((endpoint) => (
                  <TableRow key={endpoint.endpoint}>
                    <TableCell className="font-mono font-medium">{endpoint.endpoint}</TableCell>
                    <TableCell>{endpoint.requests}</TableCell>
                    <TableCell>{endpoint.p95}</TableCell>
                    <TableCell>{endpoint.errors}</TableCell>
                    <TableCell className="min-w-32">
                      <Progress value={endpoint.saturation} />
                    </TableCell>
                    <TableCell>
                      <Badge variant={endpoint.status === "Watch" ? "destructive" : "outline"}>
                        {endpoint.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="py-0">
          <CardHeader className="border-b border-border/70 py-5">
            <CardTitle>Usage Limits</CardTitle>
            <CardDescription>Current monthly API consumption</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-5 p-5">
            {[
              ["Requests", "12.8M of 20M", 64],
              ["Webhooks", "1.6M of 3M", 53],
              ["Reports API", "890k of 2M", 44],
              ["Log retention", "18d of 30d", 60],
            ].map(([label, value, width]) => (
              <div key={label as string}>
                <div className="mb-2 flex justify-between text-sm">
                  <span className="font-medium">{label as string}</span>
                  <span className="text-muted-foreground">{value as string}</span>
                </div>
                <Progress value={Number(width)} />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card className="py-0">
        <CardHeader className="border-b border-border/70 py-5">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <CardTitle>Request Logs</CardTitle>
              <CardDescription>Recent API activity with trace IDs and latency</CardDescription>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <div className="relative">
                <SearchIcon className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  className="h-10 pl-9 sm:w-72"
                  onChange={(event) => setLogQuery(event.target.value)}
                  placeholder="Search logs..."
                  value={logQuery}
                />
              </div>
              <Select onValueChange={setStatusFilter} value={statusFilter}>
                <SelectTrigger className="h-10! sm:w-44">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All statuses</SelectItem>
                  <SelectItem value="success">2xx</SelectItem>
                  <SelectItem value="warning">4xx</SelectItem>
                  <SelectItem value="error">5xx</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Time</TableHead>
                <TableHead>Method</TableHead>
                <TableHead>Path</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Latency</TableHead>
                <TableHead>Key</TableHead>
                <TableHead>Region</TableHead>
                <TableHead>Trace</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLogs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell className="font-mono text-xs">{log.time}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{log.method}</Badge>
                  </TableCell>
                  <TableCell className="max-w-96 truncate font-mono text-sm">{log.path}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusVariant(log.status)}>{log.status}</Badge>
                  </TableCell>
                  <TableCell>{log.latency}ms</TableCell>
                  <TableCell>{log.key}</TableCell>
                  <TableCell>{log.region}</TableCell>
                  <TableCell className="font-mono text-xs text-muted-foreground">{log.id}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
