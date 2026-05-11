import type { LucideIcon } from "lucide-react"
import {
  ActivityIcon,
  BarChart3Icon,
  BellIcon,
  Code2Icon,
  CreditCardIcon,
  GaugeIcon,
  GitPullRequestIcon,
  LockKeyholeIcon,
  PlugIcon,
  RocketIcon,
  Settings2Icon,
  UsersIcon,
} from "lucide-react"

export type DashboardPage = {
  title: string
  href: string
  description: string
  icon: LucideIcon
  metrics: {
    label: string
    value: string
    detail: string
  }[]
  highlights: string[]
}

export const dashboardPages = [
  {
    title: "Overview",
    href: "/overview",
    description: "Main KPIs across engineering delivery, quality, and platform usage.",
    icon: GaugeIcon,
    metrics: [
      { label: "Delivery score", value: "92", detail: "+8 pts this month" },
      { label: "Active repos", value: "48", detail: "12 critical services" },
      { label: "Open risks", value: "7", detail: "3 require attention" },
    ],
    highlights: [
      "Executive view of team throughput and delivery health.",
      "Cross-functional rollups for repositories, deployments, and incidents.",
      "Fast path into the highest priority engineering signals.",
    ],
  },
  {
    title: "Repository Analytics",
    href: "/repository-analytics",
    description: "Commits, pull requests, issues, and repository health trends.",
    icon: GitPullRequestIcon,
    metrics: [
      { label: "Commits", value: "1,284", detail: "+14% over last sprint" },
      { label: "Merged PRs", value: "342", detail: "4.2h median review" },
      { label: "Open issues", value: "96", detail: "18 marked priority" },
    ],
    highlights: [
      "Track code movement across high-impact repositories.",
      "Spot PR bottlenecks before they slow delivery.",
      "Compare issue volume, age, and ownership by team.",
    ],
  },
  {
    title: "Team Insights",
    href: "/team-insights",
    description: "Developer productivity, focus time, and collaboration signals.",
    icon: UsersIcon,
    metrics: [
      { label: "Contributors", value: "68", detail: "+6 this week" },
      { label: "Review load", value: "2.8", detail: "PRs per reviewer" },
      { label: "Focus index", value: "84%", detail: "+5% from baseline" },
    ],
    highlights: [
      "Understand team capacity without reducing people to raw output.",
      "Balance review load across engineers and squads.",
      "Identify collaboration patterns that support sustainable velocity.",
    ],
  },
  {
    title: "Deployment Analytics",
    href: "/deployment-analytics",
    description: "Builds, release frequency, failures, and recovery trends.",
    icon: RocketIcon,
    metrics: [
      { label: "Deployments", value: "213", detail: "32 production releases" },
      { label: "Failure rate", value: "3.1%", detail: "-1.4% this month" },
      { label: "MTTR", value: "18m", detail: "Median recovery time" },
    ],
    highlights: [
      "Monitor CI/CD health across environments.",
      "Correlate deployment failures with repositories and teams.",
      "Track recovery performance after failed builds or releases.",
    ],
  },
  {
    title: "API Usage",
    href: "/api-usage",
    description: "Requests, latency, error rates, and consumer usage patterns.",
    icon: Code2Icon,
    metrics: [
      { label: "Requests", value: "12.8M", detail: "+9% week over week" },
      { label: "P95 latency", value: "184ms", detail: "Within SLO" },
      { label: "Error rate", value: "0.18%", detail: "-0.03% today" },
    ],
    highlights: [
      "Track API adoption and service demand.",
      "Monitor latency, throughput, and reliability by endpoint.",
      "Find usage spikes before they become customer-facing incidents.",
    ],
  },
  {
    title: "Security Insights",
    href: "/security-insights",
    description: "Vulnerabilities, dependency exposure, and remediation progress.",
    icon: LockKeyholeIcon,
    metrics: [
      { label: "Critical vulns", value: "4", detail: "2 due this week" },
      { label: "Patch SLA", value: "91%", detail: "+7% this quarter" },
      { label: "At-risk repos", value: "11", detail: "5 internet-facing" },
    ],
    highlights: [
      "Prioritize vulnerabilities by severity and business exposure.",
      "Track remediation progress across repository owners.",
      "Surface aging dependencies and policy exceptions.",
    ],
  },
  {
    title: "Alerts",
    href: "/alerts",
    description: "Incidents, alert volume, ownership, and acknowledgement status.",
    icon: BellIcon,
    metrics: [
      { label: "Open incidents", value: "5", detail: "1 high severity" },
      { label: "Ack time", value: "6m", detail: "Median response" },
      { label: "Noisy alerts", value: "14", detail: "-22% this month" },
    ],
    highlights: [
      "Triage incidents by service, severity, and owner.",
      "Reduce noisy alerts with trend and recurrence views.",
      "Connect alerts to deployment and repository context.",
    ],
  },
  {
    title: "Reports",
    href: "/reports",
    description: "Exportable executive summaries, engineering reviews, and audits.",
    icon: BarChart3Icon,
    metrics: [
      { label: "Saved reports", value: "24", detail: "8 scheduled" },
      { label: "Exports", value: "156", detail: "Last 30 days" },
      { label: "Recipients", value: "42", detail: "Across leadership" },
    ],
    highlights: [
      "Generate board-ready engineering performance summaries.",
      "Schedule recurring reports for stakeholders.",
      "Export delivery, reliability, and security insights.",
    ],
  },
  {
    title: "Activity Feed",
    href: "/activity-feed",
    description: "Recent events across repositories, deployments, alerts, and teams.",
    icon: ActivityIcon,
    metrics: [
      { label: "Events today", value: "482", detail: "Live workspace stream" },
      { label: "Deploy events", value: "37", detail: "6 production changes" },
      { label: "Mentions", value: "19", detail: "Need review" },
    ],
    highlights: [
      "See recent engineering activity in one chronological view.",
      "Filter by team, repository, deployment, or incident.",
      "Use activity context to investigate sudden metric changes.",
    ],
  },
  {
    title: "Integrations",
    href: "/integrations",
    description: "Connected tools, sync health, and available platform connectors.",
    icon: PlugIcon,
    metrics: [
      { label: "Connected", value: "9", detail: "GitHub, Jira, Slack, CI" },
      { label: "Sync health", value: "99.9%", detail: "Last 24 hours" },
      { label: "Pending setup", value: "3", detail: "Admin action needed" },
    ],
    highlights: [
      "Manage connected engineering and observability tools.",
      "Monitor sync freshness and connector errors.",
      "Add new sources for richer CodePilot insights.",
    ],
  },
  {
    title: "Billing",
    href: "/billing",
    description: "Plans, invoices, seats, and product usage limits.",
    icon: CreditCardIcon,
    metrics: [
      { label: "Plan", value: "Scale", detail: "Annual subscription" },
      { label: "Seats", value: "84/100", detail: "16 available" },
      { label: "Invoices", value: "12", detail: "All paid" },
    ],
    highlights: [
      "Review current plan, invoices, and billing contacts.",
      "Track seat allocation and usage limits.",
      "Prepare upgrades as teams and repositories grow.",
    ],
  },
  {
    title: "Team Management",
    href: "/team-management",
    description: "Members, roles, permissions, and workspace access.",
    icon: UsersIcon,
    metrics: [
      { label: "Members", value: "84", detail: "6 admins" },
      { label: "Invites", value: "7", detail: "Pending acceptance" },
      { label: "Roles", value: "5", detail: "Custom access groups" },
    ],
    highlights: [
      "Manage workspace members and role assignments.",
      "Control access to sensitive security and billing areas.",
      "Audit invitations, permissions, and admin activity.",
    ],
  },
  {
    title: "Settings",
    href: "/settings",
    description: "Profile, preferences, workspace defaults, and notification rules.",
    icon: Settings2Icon,
    metrics: [
      { label: "Profile", value: "Complete", detail: "Maya Chen" },
      { label: "Preferences", value: "12", detail: "Workspace defaults" },
      { label: "Notifications", value: "8", detail: "Active rules" },
    ],
    highlights: [
      "Update profile and personal preferences.",
      "Configure workspace defaults for analytics and reporting.",
      "Tune notification rules for incidents and delivery changes.",
    ],
  },
] satisfies DashboardPage[]

export function getDashboardPage(href: string) {
  const page = dashboardPages.find((item) => item.href === href)

  if (!page) {
    throw new Error(`Unknown dashboard page: ${href}`)
  }

  return page
}

export const primaryDashboardPages = dashboardPages.slice(0, 10)
export const accountDashboardPages = dashboardPages.slice(10)
