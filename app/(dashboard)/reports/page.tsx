import {
  CalendarClockIcon,
  DownloadIcon,
  FileBarChartIcon,
  FileTextIcon,
  PlusIcon,
  SearchIcon,
  SendIcon,
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const reports = [
  ["Weekly Engineering Review", "Leadership", "Scheduled", "Mon 9:00 AM", "12 pages"],
  ["Security Remediation", "Security", "Ready", "May 10, 2026", "PDF"],
  ["Deployment Quality", "SRE", "Draft", "May 12, 2026", "8 pages"],
  ["Repository Health", "Engineering Managers", "Ready", "May 09, 2026", "CSV"],
]

export default function ReportsPage() {
  return (
    <div className="flex flex-1 flex-col gap-6 px-4 py-4 md:px-6 md:py-6">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-normal">Reports</h1>
          <p className="text-sm text-muted-foreground">
            Create, schedule, and export engineering insights for stakeholders.
          </p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <div className="relative">
            <SearchIcon className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input className="h-10 pl-9 sm:w-72" placeholder="Search reports..." />
          </div>
          <Select defaultValue="all" >
            <SelectTrigger className="h-10! bg-white sm:w-40">
              <SelectValue placeholder="Type" className="h-10"/>
            </SelectTrigger>
            <SelectContent >
              <SelectItem value="all">All reports</SelectItem>
              <SelectItem value="scheduled">Scheduled</SelectItem>
              <SelectItem value="exports">Exports</SelectItem>
            </SelectContent>
          </Select>
          <Button className="h-10">
            <PlusIcon />
            New report
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {[
          [FileBarChartIcon, "Saved reports", "24", "8 scheduled"],
          [DownloadIcon, "Exports", "156", "Last 30 days"],
          [SendIcon, "Recipients", "42", "Across leadership"],
        ].map(([Icon, label, value, detail]) => {
          const MetricIcon = Icon as typeof FileBarChartIcon

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

      <div className="grid gap-4 md:grid-cols-3">
        {[
          ["Executive Summary", "Board-ready view of delivery, reliability, and risk.", "Generate"],
          ["Security Audit", "Dependency exposure, SLA performance, and owner progress.", "Export"],
          ["Deployment Review", "Release frequency, failure rates, and recovery quality.", "Schedule"],
        ].map(([title, detail, action]) => (
          <Card key={title} className="py-0">
            <CardHeader className="min-h-44 py-5">
              <div className="flex size-11 items-center justify-center rounded-xl border border-border/70 bg-secondary/40 text-primary">
                <FileTextIcon className="size-5" />
              </div>
              <div className="pt-4">
                <CardTitle>{title}</CardTitle>
                <CardDescription className="mt-3">{detail}</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="flex items-center justify-between border-t border-border/70 p-5">
              <Badge variant="outline">Template</Badge>
              <Button variant="outline">{action}</Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="py-0">
        <CardHeader className="flex-row items-center justify-between border-b border-border/70 py-5">
          <div>
            <CardTitle>Report Library</CardTitle>
            <CardDescription>Saved and scheduled exports</CardDescription>
          </div>
          <Button variant="outline">
            <CalendarClockIcon />
            Schedule digest
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Report</TableHead>
                <TableHead>Audience</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Delivery</TableHead>
                <TableHead>Format</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reports.map(([name, audience, status, delivery, format]) => (
                <TableRow key={name}>
                  <TableCell className="font-medium">{name}</TableCell>
                  <TableCell>{audience}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{status}</Badge>
                  </TableCell>
                  <TableCell>{delivery}</TableCell>
                  <TableCell>{format}</TableCell>
                  <TableCell className="text-right">
                    <Button size="icon-sm" variant="ghost">
                      <DownloadIcon />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
