import {
  ActivityIcon,
  BellRingIcon,
  BookOpenIcon,
  BriefcaseBusinessIcon,
  Building2Icon,
  ChartNoAxesCombinedIcon,
  GitBranchIcon,
  GitPullRequestIcon,
  LockKeyholeIcon,
  MessageSquareIcon,
  RocketIcon,
  ShieldCheckIcon,
  SparklesIcon,
  UsersIcon,
} from "lucide-react"

export const marketingNav = [
  { label: "Features", href: "#features" },
  { label: "Integrations", href: "#integrations" },
  { label: "Customers", href: "#customers" },
  { label: "Pricing", href: "#pricing" },
  { label: "Get started", href: "#contact" },
]

export const features = [
  {
    title: "Repository intelligence",
    description: "Track commit health, stale pull requests, issue pressure, and ownership risks across every service.",
    icon: GitBranchIcon,
  },
  {
    title: "Team operating signals",
    description: "See focus time, reviewer load, on-call balance, and collaboration patterns without spying on developers.",
    icon: UsersIcon,
  },
  {
    title: "Deployment risk scoring",
    description: "Spot release fragility early with build trends, rollback history, flaky checks, and environment readiness.",
    icon: RocketIcon,
  },
  {
    title: "Security insight routing",
    description: "Prioritize vulnerabilities by service ownership, production exposure, and remediation momentum.",
    icon: ShieldCheckIcon,
  },
  {
    title: "Executive reports",
    description: "Generate board-ready engineering summaries with the context behind velocity, quality, and reliability.",
    icon: ChartNoAxesCombinedIcon,
  },
  {
    title: "AI incident summaries",
    description: "Turn noisy engineering activity into clear narratives your leadership team can act on.",
    icon: SparklesIcon,
  },
]

export const integrations = [
  { name: "GitHub", description: "Repos, PRs, checks, issues, and code ownership.", icon: GitPullRequestIcon },
  { name: "GitLab", description: "Merge requests, pipelines, incidents, and groups.", icon: GitBranchIcon },
  { name: "Slack", description: "Alerts, digests, mentions, and incident channels.", icon: MessageSquareIcon },
  { name: "Linear", description: "Cycles, roadmap issues, project health, and milestones.", icon: ActivityIcon },
  { name: "Vercel", description: "Preview builds, production deploys, and web vitals.", icon: RocketIcon },
  { name: "PagerDuty", description: "Incidents, escalation policies, and response times.", icon: BellRingIcon },
]

export const plans = [
  {
    name: "Starter",
    price: "$299",
    description: "For small teams proving out engineering analytics.",
    features: ["10 repositories", "25 seats", "Weekly digests", "GitHub + Slack integrations"],
  },
  {
    name: "Scale",
    price: "$1,500",
    description: "For growing engineering organizations with multiple teams.",
    features: ["Unlimited repositories", "100 seats", "AI summaries", "Security and deployment insights"],
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For platform teams needing governance and custom reporting.",
    features: ["SSO/SAML", "Custom data retention", "Dedicated success", "Private deployment options"],
  },
]

export const customers = [
  {
    company: "Northstar Bank",
    industry: "Fintech",
    quote: "CodePilot helped us explain engineering risk in business language before a major platform migration.",
    result: "31% faster incident review",
  },
  {
    company: "BrightCart",
    industry: "Commerce",
    quote: "We finally saw which repos were slowing launches without turning team health into a blame game.",
    result: "18% lower review backlog",
  },
  {
    company: "HelioCloud",
    industry: "Infrastructure",
    quote: "The deployment analytics gave our VP staff a shared source of truth for release quality.",
    result: "42% fewer failed releases",
  },
]

export const docs = [
  { title: "Quickstart", description: "Connect your first repository and invite your workspace.", icon: BookOpenIcon },
  { title: "Data model", description: "Understand how CodePilot maps repos, teams, PRs, deploys, and incidents.", icon: Building2Icon },
  { title: "Security", description: "Review permissions, encryption, retention, and access controls.", icon: LockKeyholeIcon },
  { title: "Alerts", description: "Configure rules for incidents, delivery risk, and security ownership.", icon: BellRingIcon },
]

export const posts = [
  {
    title: "Changelog: deployment risk scoring",
    date: "May 6, 2026",
    description: "New rollout confidence metrics for teams shipping to production daily.",
  },
  {
    title: "How healthy teams use engineering analytics",
    date: "Apr 22, 2026",
    description: "A practical framework for measuring flow without creating surveillance theater.",
  },
  {
    title: "Introducing AI leadership briefs",
    date: "Apr 9, 2026",
    description: "Weekly narratives for executives who need signal instead of dashboards.",
  },
]

export const jobs = [
  { title: "Senior Product Engineer", team: "Product", location: "Remote US / Canada" },
  { title: "Developer Advocate", team: "Go-to-market", location: "Remote" },
  { title: "Staff Data Engineer", team: "Data Platform", location: "New York or Remote" },
]

export const demoMetrics = [
  ["Release confidence", "96.9%", "Up 4.2%"],
  ["Review backlog", "28", "Down 20%"],
  ["Focus index", "84%", "Up 5%"],
  ["Open risks", "5", "1 critical"],
]

export const footerLinks = [
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "Company", href: "#company" },
  { label: "Get started", href: "#contact" },
]

export const contactReasons = [
  "Create a workspace",
  "Connect your first repositories",
  "Invite engineering leaders",
  "Generate your first AI brief",
]

export const companyStats = [
  ["2019", "Founded by engineering leaders"],
  ["68k+", "Repositories analyzed"],
  ["42%", "Average failed-release reduction"],
  ["SOC 2", "Enterprise-ready controls"],
]

export const proofPoints = [
  "Trusted by engineering teams at growth-stage SaaS, fintech, and infrastructure companies.",
  "Built for leaders who need truthful delivery signals without turning dashboards into surveillance.",
  "Designed around developer trust, source-control context, and operational reality.",
]

export const salesHighlights = [
  { title: "No rip-and-replace", description: "Connect GitHub, Slack, Linear, PagerDuty, and deploy tools in minutes.", icon: MessageSquareIcon },
  { title: "Leadership-ready by default", description: "Every report explains what changed, why it matters, and who owns the next step.", icon: BriefcaseBusinessIcon },
  { title: "Secure from day one", description: "Least-privilege scopes, SSO-ready access, and audit-friendly activity trails.", icon: LockKeyholeIcon },
]
