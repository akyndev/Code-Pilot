import { DashboardPageShell } from "@/components/dashboard-page-shell"
import { getDashboardPage } from "@/lib/dashboard-pages"

export default function SecurityInsightsPage() {
  return <DashboardPageShell page={getDashboardPage("/security-insights")} />
}
