import {
  BellIcon,
  Building2Icon,
  MailIcon,
  ShieldCheckIcon,
  UserIcon,
} from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { EditProfileDialog } from "@/components/edit-profile-dialog"

export default function SettingsPage() {
  return (
    <div className="flex flex-1 flex-col gap-6 px-4 py-4 md:px-6 md:py-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-normal">Settings</h1>
          <p className="text-sm text-muted-foreground">
            Manage profile, workspace preferences, access, and notifications.
          </p>
        </div>
        <EditProfileDialog />
      </div>

      <Card className="py-0">
        <CardHeader className="border-b border-border/70 py-5">
          <CardTitle>My Profile</CardTitle>
          <CardDescription>Personal account details used across CodePilot</CardDescription>
        </CardHeader>
        <CardContent className="p-5">
          <div className="rounded-2xl border border-border/70 bg-secondary/20 p-5">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div className="flex items-center gap-5">
                <Avatar className="size-20 rounded-2xl">
                  <AvatarImage src="https://avatars.githubusercontent.com/u/71358698?v=4&size=64" alt="Maya Chen" />
                  <AvatarFallback className="rounded-2xl">MC</AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-xl font-semibold">Maya Chen</h2>
                  <p className="text-sm text-muted-foreground">VP Engineering · San Francisco, United States</p>
                  <div className="mt-3 flex gap-2">
                    <Badge variant="secondary">Admin</Badge>
                    <Badge variant="outline">Scale workspace</Badge>
                  </div>
                </div>
              </div>
              <EditProfileDialog label="Edit" />
            </div>

            <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {[
                ["First name", "Maya"],
                ["Last name", "Chen"],
                ["Email address", "maya@codepilot.ai"],
                ["Phone", "+1 415 398 0046"],
                ["Bio", "Engineering leader"],
                ["Timezone", "America/Los_Angeles"],
                ["Workspace", "CodePilot Labs"],
                ["Role", "Owner"]
              ].map(([label, value]) => (
                <div key={label}>
                  <p className="text-xs font-medium text-muted-foreground">{label}</p>
                  <p className="mt-1 text-sm font-medium">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 @5xl/main:grid-cols-[1fr_1fr]">
        <Card className="py-0">
          <CardHeader className="border-b border-border/70 py-5">
            <CardTitle>Workspace Defaults</CardTitle>
            <CardDescription>Controls that shape analytics and reporting behavior</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3 p-5">
            {[
              [Building2Icon, "Default workspace", "CodePilot Labs"],
              [ShieldCheckIcon, "Security review SLA", "7 days"],
              [BellIcon, "Incident digest", "Every weekday at 9:00"],
              [MailIcon, "Report recipients", "Engineering leadership"]
            ].map(([Icon, label, value]) => {
              const SettingIcon = Icon as typeof Building2Icon

              return (
                <div key={label as string} className="flex items-center gap-4 rounded-xl border border-border/70 p-4">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-secondary/50 text-primary">
                    <SettingIcon className="size-5" />
                  </div>
                  <div>
                    <p className="font-medium">{label as string}</p>
                    <p className="text-sm text-muted-foreground">{value as string}</p>
                  </div>
                </div>
              )
            })}
          </CardContent>
        </Card>

        <Card className="py-0">
          <CardHeader className="border-b border-border/70 py-5">
            <CardTitle>Notification Rules</CardTitle>
            <CardDescription>Signals currently routed to this user</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3 p-5">
            {[
              "Critical vulnerability assigned",
              "Production deployment failed",
              "Weekly engineering summary ready",
              "Repository anomaly detected"
            ].map((rule) => (
              <div key={rule} className="flex items-center justify-between rounded-xl border border-border/70 p-4">
                <div className="flex items-center gap-3">
                  <UserIcon className="size-4 text-primary" />
                  <span className="font-medium">{rule}</span>
                </div>
                <Badge variant="secondary">Enabled</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
