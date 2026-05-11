export type Repository = {
  name: string
  team: string
  owner: string
  language: string
  commits30d: number
  openPrs: number
  issues: number
  medianReviewHours: number
  status: "Healthy" | "Watch" | "Needs triage"
}

export type Engineer = {
  name: string
  email: string
  team: string
  role: "Owner" | "Admin" | "Manager" | "Member" | "Auditor"
  status: "Active" | "Invited"
  initials: string
  mergedPrs: number
  reviews: number
  focusScore: number
  onCallLoad: number
}

export type PullRequest = {
  id: number
  title: string
  repo: string
  author: string
  stage: "Draft" | "In review" | "Changes requested" | "Ready to merge"
  checks: "Passing" | "Failing" | "Queued"
  createdAt: string
  leadTimeHours: number
}

export type Deployment = {
  service: string
  environment: "Production" | "Staging" | "Canary"
  version: string
  status: "Success" | "Failed" | "Running"
  deployedAt: string
  owner: string
  duration: string
}

export type Incident = {
  title: string
  service: string
  severity: "High" | "Medium" | "Low"
  status: "Open" | "Acknowledged" | "Monitoring" | "Resolved"
  ackTime: string
  owner: string
  startedAt: string
}

export type Invoice = {
  id: string
  date: string
  amount: string
  plan: "Scale" | "Growth"
  status: "Paid" | "Open"
}

export const repos: Repository[] = [
  {
    name: "frontend-platform",
    team: "Web Platform",
    owner: "Ari Kim",
    language: "TypeScript",
    commits30d: 512,
    openPrs: 21,
    issues: 36,
    medianReviewHours: 4.1,
    status: "Healthy",
  },
  {
    name: "payments-service",
    team: "Revenue Systems",
    owner: "Maya Chen",
    language: "Go",
    commits30d: 338,
    openPrs: 14,
    issues: 29,
    medianReviewHours: 6.7,
    status: "Watch",
  },
  {
    name: "auth-api",
    team: "Identity",
    owner: "Noah Patel",
    language: "TypeScript",
    commits30d: 287,
    openPrs: 11,
    issues: 18,
    medianReviewHours: 3.8,
    status: "Healthy",
  },
  {
    name: "mobile-sdk",
    team: "Developer Experience",
    owner: "Leah Stone",
    language: "Kotlin",
    commits30d: 196,
    openPrs: 9,
    issues: 41,
    medianReviewHours: 9.4,
    status: "Needs triage",
  },
  {
    name: "analytics-pipeline",
    team: "Data Platform",
    owner: "Mateo Alvarez",
    language: "Python",
    commits30d: 231,
    openPrs: 8,
    issues: 22,
    medianReviewHours: 5.6,
    status: "Watch",
  },
]

export const engineers: Engineer[] = [
  {
    name: "Maya Chen",
    email: "maya.chen@codepilot.ai",
    team: "Revenue Systems",
    role: "Owner",
    status: "Active",
    initials: "MC",
    mergedPrs: 16,
    reviews: 12,
    focusScore: 78,
    onCallLoad: 2,
  },
  {
    name: "Ari Kim",
    email: "ari.kim@codepilot.ai",
    team: "Web Platform",
    role: "Manager",
    status: "Active",
    initials: "AK",
    mergedPrs: 22,
    reviews: 18,
    focusScore: 84,
    onCallLoad: 1,
  },
  {
    name: "Noah Patel",
    email: "noah.patel@codepilot.ai",
    team: "Identity",
    role: "Admin",
    status: "Active",
    initials: "NP",
    mergedPrs: 14,
    reviews: 20,
    focusScore: 71,
    onCallLoad: 3,
  },
  {
    name: "Leah Stone",
    email: "leah.stone@codepilot.ai",
    team: "Security",
    role: "Auditor",
    status: "Active",
    initials: "LS",
    mergedPrs: 9,
    reviews: 24,
    focusScore: 57,
    onCallLoad: 4,
  },
  {
    name: "Mateo Alvarez",
    email: "mateo.alvarez@codepilot.ai",
    team: "Data Platform",
    role: "Member",
    status: "Active",
    initials: "MA",
    mergedPrs: 12,
    reviews: 11,
    focusScore: 76,
    onCallLoad: 1,
  },
  {
    name: "Priya Nair",
    email: "priya.nair@codepilot.ai",
    team: "Developer Experience",
    role: "Member",
    status: "Invited",
    initials: "PN",
    mergedPrs: 6,
    reviews: 7,
    focusScore: 63,
    onCallLoad: 0,
  },
]

export const pullRequests: PullRequest[] = [
  {
    id: 4821,
    title: "Ship usage-based billing ledger",
    repo: "payments-service",
    author: "Maya Chen",
    stage: "Ready to merge",
    checks: "Passing",
    createdAt: "May 11, 2026",
    leadTimeHours: 18.5,
  },
  {
    id: 4818,
    title: "Refactor repository health cards",
    repo: "frontend-platform",
    author: "Ari Kim",
    stage: "In review",
    checks: "Passing",
    createdAt: "May 10, 2026",
    leadTimeHours: 9.2,
  },
  {
    id: 4809,
    title: "Rotate auth signing key metadata",
    repo: "auth-api",
    author: "Noah Patel",
    stage: "Changes requested",
    checks: "Failing",
    createdAt: "May 9, 2026",
    leadTimeHours: 31.4,
  },
  {
    id: 4797,
    title: "Stabilize Android release smoke tests",
    repo: "mobile-sdk",
    author: "Priya Nair",
    stage: "In review",
    checks: "Queued",
    createdAt: "May 8, 2026",
    leadTimeHours: 26.8,
  },
  {
    id: 4788,
    title: "Add late-arriving event compaction",
    repo: "analytics-pipeline",
    author: "Mateo Alvarez",
    stage: "Draft",
    checks: "Passing",
    createdAt: "May 7, 2026",
    leadTimeHours: 12.7,
  },
]

export const deployments: Deployment[] = [
  {
    service: "frontend-platform",
    environment: "Production",
    version: "web-2026.05.11-3",
    status: "Success",
    deployedAt: "18m ago",
    owner: "Ari Kim",
    duration: "7m 42s",
  },
  {
    service: "payments-service",
    environment: "Staging",
    version: "pay-v1.42.3",
    status: "Failed",
    deployedAt: "44m ago",
    owner: "Maya Chen",
    duration: "12m 08s",
  },
  {
    service: "mobile-sdk",
    environment: "Production",
    version: "android-v5.9.1",
    status: "Success",
    deployedAt: "2h ago",
    owner: "Priya Nair",
    duration: "16m 31s",
  },
  {
    service: "auth-api",
    environment: "Canary",
    version: "auth-v3.4.8",
    status: "Running",
    deployedAt: "3h ago",
    owner: "Noah Patel",
    duration: "9m 14s",
  },
]

export const incidents: Incident[] = [
  {
    title: "Checkout authorization latency spike",
    service: "payments-service",
    severity: "High",
    status: "Open",
    ackTime: "6m",
    owner: "Maya Chen",
    startedAt: "09:47 AM",
  },
  {
    title: "CI queue saturation for web builds",
    service: "frontend-platform",
    severity: "Medium",
    status: "Acknowledged",
    ackTime: "14m",
    owner: "Ari Kim",
    startedAt: "09:31 AM",
  },
  {
    title: "Webhook retries elevated",
    service: "analytics-pipeline",
    severity: "Low",
    status: "Monitoring",
    ackTime: "31m",
    owner: "Mateo Alvarez",
    startedAt: "09:02 AM",
  },
  {
    title: "Token refresh error budget burn",
    service: "auth-api",
    severity: "High",
    status: "Open",
    ackTime: "42m",
    owner: "Noah Patel",
    startedAt: "08:51 AM",
  },
]

export const invoices: Invoice[] = [
  {
    id: "CP-2026-005",
    date: "May 01, 2026",
    amount: "$1,500.00",
    plan: "Scale",
    status: "Paid",
  },
  {
    id: "CP-2026-004",
    date: "Apr 01, 2026",
    amount: "$1,500.00",
    plan: "Scale",
    status: "Paid",
  },
  {
    id: "CP-2026-003",
    date: "Mar 01, 2026",
    amount: "$1,500.00",
    plan: "Scale",
    status: "Paid",
  },
  {
    id: "CP-2026-002",
    date: "Feb 01, 2026",
    amount: "$1,250.00",
    plan: "Growth",
    status: "Paid",
  },
]
