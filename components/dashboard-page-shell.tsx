import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import type { DashboardPage } from "@/lib/dashboard-pages"

type PageSignal = {
  name: string
  owner: string
  status: string
  value: string
}

const pageSignals: Record<string, PageSignal[]> = {
  "/repository-analytics": [
    { name: "API gateway", owner: "Platform", status: "Reviewing", value: "18 PRs" },
    { name: "Billing service", owner: "Revenue", status: "Healthy", value: "94 commits" },
    { name: "Mobile SDK", owner: "Developer Experience", status: "Needs triage", value: "11 issues" },
  ],
  "/team-insights": [
    { name: "Review balance", owner: "Engineering Managers", status: "Improving", value: "2.8 PRs" },
    { name: "Focus time", owner: "Core Apps", status: "Healthy", value: "84%" },
    { name: "On-call load", owner: "SRE", status: "Watch", value: "6 shifts" },
  ],
  "/deployment-analytics": [
    { name: "Production deploys", owner: "Release", status: "Healthy", value: "32" },
    { name: "Failed builds", owner: "CI Platform", status: "Investigating", value: "7" },
    { name: "Rollback readiness", owner: "SRE", status: "Ready", value: "100%" },
  ],
  "/api-usage": [
    { name: "Public REST API", owner: "Platform", status: "Within SLO", value: "184ms" },
    { name: "GraphQL edge", owner: "Product Infra", status: "Watch", value: "0.24%" },
    { name: "Webhook delivery", owner: "Integrations", status: "Healthy", value: "99.97%" },
  ],
  "/security-insights": [
    { name: "Critical dependency patches", owner: "Security", status: "Due soon", value: "4" },
    { name: "Container scan policy", owner: "Platform", status: "Passing", value: "91%" },
    { name: "Internet-facing repos", owner: "AppSec", status: "Reviewing", value: "5" },
  ],
  "/alerts": [
    { name: "Checkout latency", owner: "Revenue", status: "High", value: "P95 +18%" },
    { name: "CI queue saturation", owner: "Developer Experience", status: "Medium", value: "42m" },
    { name: "Webhook retries", owner: "Integrations", status: "Low", value: "312" },
  ],
  "/reports": [
    { name: "Weekly engineering review", owner: "Leadership", status: "Scheduled", value: "Mon 9:00" },
    { name: "Security remediation", owner: "Security", status: "Ready", value: "PDF" },
    { name: "Deployment quality", owner: "SRE", status: "Draft", value: "12 pages" },
  ],
  "/activity-feed": [
    { name: "PR merged in API gateway", owner: "Maya Chen", status: "Merged", value: "2m ago" },
    { name: "Production deploy completed", owner: "Release Bot", status: "Success", value: "18m ago" },
    { name: "Critical vulnerability assigned", owner: "AppSec", status: "Open", value: "44m ago" },
  ],
  "/integrations": [
    { name: "GitHub", owner: "Platform", status: "Connected", value: "48 repos" },
    { name: "Jira", owner: "Delivery", status: "Syncing", value: "2,184 issues" },
    { name: "Slack", owner: "Workspace Admin", status: "Connected", value: "12 channels" },
  ],
  "/billing": [
    { name: "Scale plan", owner: "Finance", status: "Active", value: "$18k ARR" },
    { name: "Seat usage", owner: "Workspace Admin", status: "Healthy", value: "84/100" },
    { name: "Next invoice", owner: "Billing", status: "Scheduled", value: "Jun 1" },
  ],
  "/team-management": [
    { name: "Admin access", owner: "Workspace Admin", status: "Reviewed", value: "6 users" },
    { name: "Pending invites", owner: "People Ops", status: "Open", value: "7" },
    { name: "Contractor role", owner: "Security", status: "Restricted", value: "12 users" },
  ],
  "/settings": [
    { name: "Workspace defaults", owner: "Maya Chen", status: "Configured", value: "12 rules" },
    { name: "Notification routing", owner: "Platform", status: "Active", value: "8 rules" },
    { name: "Profile completeness", owner: "Maya Chen", status: "Complete", value: "100%" },
  ],
}

const trendValues = [64, 72, 58, 81, 76, 88, 84, 92]
const trendLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun", "Now"]

function getSignals(page: DashboardPage) {
  return pageSignals[page.href] ?? page.highlights.map((highlight, index) => ({
    name: highlight,
    owner: "CodePilot",
    status: index === 0 ? "Active" : "Tracking",
    value: page.metrics[index]?.value ?? "Live",
  }))
}

function PageSpecificContent({
  page,
  signals,
}: {
  page: DashboardPage
  signals: PageSignal[]
}) {
  switch (page.href) {
    case "/repository-analytics":
      return <RepositoryView />
    case "/team-insights":
      return <TeamInsightsView />
    case "/deployment-analytics":
      return <DeploymentView />
    case "/api-usage":
      return <ApiUsageView />
    case "/security-insights":
      return <SecurityView />
    case "/alerts":
      return <AlertsView />
    case "/reports":
      return <ReportsView />
    case "/activity-feed":
      return <ActivityFeedView />
    case "/integrations":
      return <IntegrationsView />
    case "/billing":
      return <BillingView />
    case "/team-management":
      return <TeamManagementView />
    case "/settings":
      return <SettingsView />
    default:
      return <GenericSignalsView page={page} signals={signals} />
  }
}

function MiniBars({ values = trendValues }: { values?: number[] }) {
  return (
    <div className="flex h-44 items-end gap-2 rounded-xl border border-border/70 bg-secondary/25 p-4">
      {values.map((value, index) => (
        <div key={index} className="flex h-full flex-1 flex-col justify-end gap-2">
          <div
            className="rounded-t-lg bg-primary/75 ring-1 ring-primary/25"
            style={{ height: `${value}%` }}
          />
          <span className="text-center text-[0.68rem] text-muted-foreground">
            {trendLabels[index] ?? index + 1}
          </span>
        </div>
      ))}
    </div>
  )
}

function DataRows({
  columns,
  rows,
}: {
  columns: string[]
  rows: string[][]
}) {
  return (
    <div className="overflow-x-auto rounded-xl border border-border/70">
      <div className="min-w-[680px]">
        <div
          className="grid border-b border-border/70 bg-muted/40 px-4 py-3 text-xs font-medium text-muted-foreground"
          style={{ gridTemplateColumns: `repeat(${columns.length}, minmax(0, 1fr))` }}
        >
          {columns.map((column) => (
            <span key={column}>{column}</span>
          ))}
        </div>
        {rows.map((row) => (
          <div
            key={row.join("-")}
            className="grid items-center border-b border-border/70 px-4 py-3 text-sm last:border-0"
            style={{ gridTemplateColumns: `repeat(${columns.length}, minmax(0, 1fr))` }}
          >
            {row.map((cell, index) => (
              <span
                key={`${cell}-${index}`}
                className={index === 0 ? "font-medium" : "text-muted-foreground"}
              >
                {index === row.length - 1 ? <Badge variant="outline">{cell}</Badge> : cell}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

function RepositoryView() {
  return (
    <div className="grid gap-4 @5xl/main:grid-cols-[1.2fr_0.8fr]">
      <Card>
        <CardHeader>
          <CardTitle>Repository Health</CardTitle>
          <CardDescription>Commit volume, review pressure, and issue load by repo.</CardDescription>
        </CardHeader>
        <CardContent>
          <DataRows
            columns={["Repository", "Owner", "Open PRs", "Review time", "Status"]}
            rows={[
              ["api-gateway", "Platform", "18", "4.2h", "Healthy"],
              ["billing-service", "Revenue", "11", "6.8h", "Watch"],
              ["mobile-sdk", "DX", "7", "9.1h", "Needs triage"],
              ["auth-core", "Identity", "14", "3.6h", "Healthy"],
            ]}
          />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>PR Flow</CardTitle>
          <CardDescription>Pull requests moving through review stages.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3">
          {[
            ["Draft", "24"],
            ["Review", "38"],
            ["Changes requested", "12"],
            ["Ready to merge", "19"],
          ].map(([stage, count]) => (
            <div key={stage} className="rounded-xl border border-border/70 p-4">
              <div className="mb-3 flex items-center justify-between">
                <span className="font-medium">{stage}</span>
                <Badge variant="secondary">{count}</Badge>
              </div>
              <Progress
                className="[&_[data-slot=progress-indicator]]:bg-current"
                value={Number(count) * 2}
              />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

function TeamInsightsView() {
  return (
    <div className="grid gap-4 @5xl/main:grid-cols-[0.95fr_1.05fr]">
      <Card>
        <CardHeader>
          <CardTitle>Developer Load</CardTitle>
          <CardDescription>Review and delivery load across active contributors.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          {[
            ["Ari Kim", "Frontend Platform", 82],
            ["Noah Patel", "API Systems", 68],
            ["Leah Stone", "Security", 44],
            ["Maya Chen", "Infrastructure", 73],
          ].map(([name, team, load]) => (
            <div key={name as string} className="grid gap-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium">{name}</span>
                <span className="text-muted-foreground">{team}</span>
              </div>
              <Progress value={Number(load)} />
            </div>
          ))}
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Team Rituals</CardTitle>
          <CardDescription>Signals that help managers coach without micromanaging.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-2">
          {["Review rotation is balanced", "On-call load needs smoothing", "Focus time improved 5%", "Two squads need reviewer backup"].map((item) => (
            <div key={item} className="rounded-xl border border-border/70 bg-secondary/30 p-4 text-sm">
              {item}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

function DeploymentView() {
  return (
    <div className="grid gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Release Pipeline</CardTitle>
          <CardDescription>Build, test, deploy, and rollback readiness by stage.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-4">
          {[
            ["Build", "98.4%", "Passing"],
            ["Test", "94.1%", "2 flaky suites"],
            ["Staging", "100%", "Ready"],
            ["Production", "96.9%", "1 rollback"],
          ].map(([stage, score, detail]) => (
            <div key={stage} className="rounded-xl border border-border/70 bg-secondary/30 p-4">
              <p className="text-sm text-muted-foreground">{stage}</p>
              <p className="mt-2 text-2xl font-semibold">{score}</p>
              <Badge className="mt-3" variant="outline">{detail}</Badge>
            </div>
          ))}
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Failure Trend</CardTitle>
          <CardDescription>Failed builds and releases over the last week.</CardDescription>
        </CardHeader>
        <CardContent>
          <MiniBars values={[34, 28, 42, 21, 18, 26, 14, 11]} />
        </CardContent>
      </Card>
    </div>
  )
}

function ApiUsageView() {
  return (
    <div className="grid gap-4 @5xl/main:grid-cols-[1fr_1fr]">
      <Card>
        <CardHeader>
          <CardTitle>Endpoint SLOs</CardTitle>
          <CardDescription>Latency and reliability by public surface.</CardDescription>
        </CardHeader>
        <CardContent>
          <DataRows
            columns={["Endpoint", "Requests", "P95", "Status"]}
            rows={[
              ["/v1/runs", "4.2M", "184ms", "Within SLO"],
              ["/v1/repos", "2.8M", "211ms", "Watch"],
              ["/v1/webhooks", "1.6M", "143ms", "Healthy"],
            ]}
          />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Traffic Mix</CardTitle>
          <CardDescription>Request distribution by API consumer type.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3">
          {["Enterprise apps", "Internal services", "CLI clients", "Partner webhooks"].map((label, index) => (
            <div key={label} className="flex items-center gap-3">
              <Progress className="h-3 flex-1" value={82 - index * 14} />
              <span className="w-36 text-sm text-muted-foreground">{label}</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

function SecurityView() {
  return (
    <div className="grid gap-4 @5xl/main:grid-cols-[0.8fr_1.2fr]">
      <Card>
        <CardHeader>
          <CardTitle>Risk Queue</CardTitle>
          <CardDescription>Vulnerability work sorted by exposure.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3">
          {["Critical dependency patches", "Public container images", "Secrets rotation", "Policy exceptions"].map((item, index) => (
            <div key={item} className="flex items-center justify-between rounded-xl border border-border/70 p-4">
              <span className="font-medium">{item}</span>
              <Badge variant={index === 0 ? "destructive" : "outline"}>{index + 1}</Badge>
            </div>
          ))}
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Remediation Progress</CardTitle>
          <CardDescription>Patch SLA performance by owner.</CardDescription>
        </CardHeader>
        <CardContent>
          <DataRows
            columns={["Owner", "Critical", "High", "SLA"]}
            rows={[
              ["Platform", "1", "8", "94%"],
              ["Revenue", "2", "5", "88%"],
              ["Developer Experience", "1", "7", "91%"],
            ]}
          />
        </CardContent>
      </Card>
    </div>
  )
}

function AlertsView() {
  return (
    <div className="grid gap-4 @5xl/main:grid-cols-3">
      {["High", "Medium", "Low"].map((severity, severityIndex) => (
        <Card key={severity}>
          <CardHeader>
            <CardTitle>{severity} Priority</CardTitle>
            <CardDescription>Active incidents requiring {severity.toLowerCase()} response.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3">
            {["Checkout latency", "CI queue saturation", "Webhook retries"].map((incident, index) => (
              <div key={incident} className="rounded-xl border border-border/70 bg-secondary/30 p-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{incident}</span>
                  <Badge variant={severityIndex === 0 ? "destructive" : "outline"}>{index + 1} owner</Badge>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">Escalation policy and linked service context are attached.</p>
              </div>
            ))}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

function ReportsView() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {["Weekly Review", "Security Audit", "Deployment Quality"].map((report, index) => (
        <Card key={report}>
          <CardHeader>
            <CardTitle>{report}</CardTitle>
            <CardDescription>{index === 0 ? "Executive summary" : "Export-ready report"}</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="rounded-xl border border-border/70 bg-secondary/30 p-5">
              <p className="text-3xl font-semibold">{index + 8}</p>
              <p className="text-sm text-muted-foreground">sections prepared</p>
            </div>
            <Button variant="outline">Preview report</Button>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

function ActivityFeedView() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Live Timeline</CardTitle>
        <CardDescription>Recent events grouped by engineering workflow.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        {["PR merged in API gateway", "Production deploy completed", "Critical vulnerability assigned", "Jira issue moved to Done"].map((event, index) => (
          <div key={event} className="grid grid-cols-[auto_1fr] gap-4">
            <div className="flex flex-col items-center">
              <div className="size-3 rounded-full bg-primary" />
              {index < 3 ? <div className="h-14 w-px bg-border" /> : null}
            </div>
            <div>
              <p className="font-medium">{event}</p>
              <p className="text-sm text-muted-foreground">{2 + index * 14}m ago · CodePilot workspace</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

function IntegrationsView() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {["GitHub", "Jira", "Slack", "Linear", "Datadog", "Vercel"].map((tool, index) => (
        <Card key={tool}>
          <CardHeader>
            <CardTitle>{tool}</CardTitle>
            <CardDescription>{index < 3 ? "Connected and syncing" : "Available connector"}</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-between">
            <Badge variant={index < 3 ? "secondary" : "outline"}>{index < 3 ? "Connected" : "Connect"}</Badge>
            <Button variant="ghost" size="sm">{index < 3 ? "Manage" : "Add"}</Button>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

function BillingView() {
  return (
    <div className="grid gap-4 @5xl/main:grid-cols-[0.9fr_1.1fr]">
      <Card>
        <CardHeader>
          <CardTitle>Scale Plan</CardTitle>
          <CardDescription>Annual workspace subscription.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-4xl font-semibold">$18k</p>
          <p className="mt-2 text-sm text-muted-foreground">100 seats · 48 repositories · premium support</p>
          <Button className="mt-5">Manage plan</Button>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Invoices</CardTitle>
          <CardDescription>Recent billing history.</CardDescription>
        </CardHeader>
        <CardContent>
          <DataRows
            columns={["Invoice", "Date", "Amount", "Status"]}
            rows={[
              ["CP-2026-004", "Apr 1", "$1,500", "Paid"],
              ["CP-2026-003", "Mar 1", "$1,500", "Paid"],
              ["CP-2026-002", "Feb 1", "$1,500", "Paid"],
            ]}
          />
        </CardContent>
      </Card>
    </div>
  )
}

function TeamManagementView() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Members & Roles</CardTitle>
        <CardDescription>Workspace access by team and permission level.</CardDescription>
      </CardHeader>
      <CardContent>
        <DataRows
          columns={["Member", "Team", "Role", "Status"]}
          rows={[
            ["Maya Chen", "Platform", "Admin", "Active"],
            ["Ari Kim", "Frontend Platform", "Manager", "Active"],
            ["Noah Patel", "API Systems", "Member", "Active"],
            ["Leah Stone", "Security", "Auditor", "Invited"],
          ]}
        />
      </CardContent>
    </Card>
  )
}

function SettingsView() {
  return (
    <div className="grid gap-4 @5xl/main:grid-cols-[0.85fr_1.15fr]">
      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>Personal workspace identity.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3">
          {["Maya Chen", "maya@codepilot.ai", "Engineering Leader"].map((item) => (
            <div key={item} className="rounded-lg border border-border/70 bg-secondary/30 px-3 py-2 text-sm">
              {item}
            </div>
          ))}
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Preferences</CardTitle>
          <CardDescription>Workspace defaults and notification routing.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3">
          {["Weekly executive digest", "Security escalation alerts", "Deployment failure summaries", "Repository anomaly detection"].map((setting) => (
            <div key={setting} className="flex items-center justify-between rounded-xl border border-border/70 p-4">
              <span className="font-medium">{setting}</span>
              <Badge variant="secondary">Enabled</Badge>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

function GenericSignalsView({
  page,
  signals,
}: {
  page: DashboardPage
  signals: PageSignal[]
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Signals</CardTitle>
        <CardDescription>
          Live items CodePilot is tracking for {page.title.toLowerCase()}.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <DataRows
          columns={["Signal", "Owner", "Value", "Status"]}
          rows={signals.map((signal) => [
            signal.name,
            signal.owner,
            signal.value,
            signal.status,
          ])}
        />
      </CardContent>
    </Card>
  )
}

export function DashboardPageShell({ page }: { page: DashboardPage }) {
  const Icon = page.icon
  const signals = getSignals(page)

  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 px-4 py-4 md:gap-6 md:px-6 md:py-6">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div className="flex items-start gap-3">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-border/70 bg-secondary/60 text-primary">
                <Icon className="size-5" />
              </div>
              <div>
                <h1 className="text-2xl font-semibold tracking-normal md:text-3xl">
                  {page.title}
                </h1>
                <p className="max-w-2xl text-sm text-muted-foreground">
                  {page.description}
                </p>
              </div>
            </div>
            <Badge className="w-fit" variant="secondary">
              Live workspace
            </Badge>
          </div>

          <div className="grid gap-4 @xl/main:grid-cols-3">
            {page.metrics.map((metric) => (
              <Card key={metric.label}>
                <CardHeader>
                  <CardDescription>{metric.label}</CardDescription>
                  <CardAction>
                    <Badge variant="outline">Now</Badge>
                  </CardAction>
                  <CardTitle className="text-3xl tabular-nums">
                    {metric.value}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {metric.detail}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <PageSpecificContent page={page} signals={signals} />
        </div>
      </div>
    </div>
  )
}
