import {
  CopyIcon,
  KeyRoundIcon,
  PlusIcon,
  RefreshCwIcon,
  Trash2Icon,
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
  ["Production API key", "sk_live_********4248", "Disabled", "25 Jan, 2026", "Today, 10:45 AM"],
  ["Development API key", "dev_live_********4923", "Active", "29 Dec, 2025", "Today, 12:40 AM"],
  ["Legacy API key", "leg_live_********0932", "Active", "12 Mar, 2025", "Yesterday, 11:45 PM"],
]

const endpoints = repos.slice(0, 4).map((repo, index) => ({
  endpoint: `/v1/repos/${repo.name}`,
  requests: ["4.2M", "2.8M", "1.6M", "890k"][index],
  p95: ["184ms", "211ms", "143ms", "268ms"][index],
  errors: ["0.12%", "0.24%", "0.08%", "0.19%"][index],
  status: repo.status === "Needs triage" ? "Watch" : "Within SLO",
}))

export default function ApiUsagePage() {
  return (
    <div className="flex flex-1 flex-col gap-6 px-4 py-4 md:px-6 md:py-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-normal">API Usage</h1>
          <p className="text-sm text-muted-foreground">
            Track API keys, request volume, latency, and endpoint reliability.
          </p>
        </div>
        <Button className="h-10">
          <PlusIcon />
          Add API key
        </Button>
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
              {apiKeys.map(([name, key, status, created, used]) => (
                <TableRow key={key}>
                  <TableCell>
                    <div className="grid gap-2">
                      <span className="font-medium">{name}</span>
                      <div className="flex w-fit overflow-hidden rounded-lg border border-border/70 bg-secondary/20">
                        <span className="px-3 py-2 font-mono text-sm">{key}</span>
                        <Button className="rounded-none border-l border-border/70 h-full" variant="ghost">
                          <CopyIcon />
                          Copy
                        </Button>
                        <Button className="rounded-none border-l border-border/70 h-full" size="icon" variant="ghost">
                          <RefreshCwIcon />
                        </Button>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={status === "Active" ? "secondary" : "destructive"}>
                      {status}
                    </Badge>
                  </TableCell>
                  <TableCell>{created}</TableCell>
                  <TableCell>{used}</TableCell>
                  <TableCell>
                    <Switch checked={status === "Active"} aria-label={`${name} enabled`} />
                  </TableCell>
                  <TableCell className="text-right">
                    <Button size="icon-sm" variant="ghost">
                      <Trash2Icon />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="grid gap-4 @5xl/main:grid-cols-[1.2fr_0.8fr]">
        <Card className="py-0">
          <CardHeader className="border-b border-border/70 py-5">
            <CardTitle>Endpoint SLOs</CardTitle>
            <CardDescription>Traffic, latency, and error rates by endpoint</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Endpoint</TableHead>
                  <TableHead>Requests</TableHead>
                  <TableHead>P95</TableHead>
                  <TableHead>Error rate</TableHead>
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
                    <TableCell>
                      <Badge variant="outline">{endpoint.status}</Badge>
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
    </div>
  )
}
