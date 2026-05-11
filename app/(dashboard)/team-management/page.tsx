import {
  MoreHorizontalIcon,
  PlusIcon,
  SearchIcon,
  ShieldCheckIcon,
  UserPlusIcon,
  UsersIcon,
} from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

const members = [
  ["Maya Chen", "maya@codepilot.ai", "Platform", "Admin", "Active", "MC"],
  ["Ari Kim", "ari@codepilot.ai", "Frontend Platform", "Manager", "Active", "AK"],
  ["Noah Patel", "noah@codepilot.ai", "API Systems", "Member", "Active", "NP"],
  ["Leah Stone", "leah@codepilot.ai", "Security", "Auditor", "Invited", "LS"],
]

export default function TeamManagementPage() {
  return (
    <div className="flex flex-1 flex-col gap-6 px-4 py-4 md:px-6 md:py-6">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-normal">Team Management</h1>
          <p className="text-sm text-muted-foreground">
            Manage workspace members, roles, invitations, and access controls.
          </p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <div className="relative">
            <SearchIcon className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input className="h-10 pl-9 sm:w-72" placeholder="Search members..." />
          </div>
          <Button className="h-10">
            <UserPlusIcon />
            Invite member
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {[
          [UsersIcon, "Members", "84", "6 admins"],
          [UserPlusIcon, "Invites", "7", "Pending acceptance"],
          [ShieldCheckIcon, "Roles", "5", "Custom access groups"],
        ].map(([Icon, label, value, detail]) => {
          const MetricIcon = Icon as typeof UsersIcon

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

      <Card className="py-0">
        <CardHeader className="flex-row items-center justify-between border-b border-border/70 py-5">
          <div>
            <CardTitle>Members</CardTitle>
            <CardDescription>Workspace access by team and permission level</CardDescription>
          </div>
          <Tabs defaultValue="all">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="admins">Admins</TabsTrigger>
              <TabsTrigger value="invited">Invited</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Member</TableHead>
                <TableHead>Team</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {members.map(([name, email, team, role, status, fallback]) => (
                <TableRow key={email}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="size-9 rounded-lg">
                        <AvatarImage src="/avatars/shadcn.jpg" alt={name} />
                        <AvatarFallback className="rounded-lg">{fallback}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{name}</p>
                        <p className="text-sm text-muted-foreground">{email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{team}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{role}</Badge>
                  </TableCell>
                  <TableCell>{status}</TableCell>
                  <TableCell className="text-right">
                    <Button size="icon-sm" variant="ghost">
                      <MoreHorizontalIcon />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="py-0">
          <CardHeader className="border-b border-border/70 py-5">
            <CardTitle>Role Templates</CardTitle>
            <CardDescription>Reusable access policies for workspace users</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3 p-5">
            {["Admin", "Manager", "Member", "Auditor"].map((role) => (
              <div key={role} className="flex items-center justify-between rounded-xl border border-border/70 p-4">
                <div>
                  <p className="font-medium">{role}</p>
                  <p className="text-sm text-muted-foreground">Configured permission template</p>
                </div>
                <Button size="sm" variant="outline">Edit</Button>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="py-0">
          <CardHeader className="border-b border-border/70 py-5">
            <CardTitle>Pending Invites</CardTitle>
            <CardDescription>People waiting to join this workspace</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3 p-5">
            {["sam@codepilot.ai", "victoria@codepilot.ai", "ops@codepilot.ai"].map((email) => (
              <div key={email} className="flex items-center justify-between rounded-xl border border-border/70 p-4">
                <span className="font-medium">{email}</span>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">Resend</Button>
                  <Button size="sm" variant="ghost">Cancel</Button>
                </div>
              </div>
            ))}
            <Button variant="outline">
              <PlusIcon />
              Invite another
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
