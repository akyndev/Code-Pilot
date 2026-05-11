import { CheckIcon, CreditCardIcon, DownloadIcon, PencilIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const invoices = [
  ["CP-2026-004", "May 01, 2026", "$1,500.00", "Scale", "Paid"],
  ["CP-2026-003", "Apr 01, 2026", "$1,500.00", "Scale", "Paid"],
  ["CP-2026-002", "Mar 01, 2026", "$1,500.00", "Scale", "Paid"],
  ["CP-2026-001", "Feb 01, 2026", "$1,250.00", "Growth", "Paid"]
]

export default function BillingPage() {
  return (
    <div className="flex flex-1 flex-col gap-6 px-4 py-4 md:px-6 md:py-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-normal">Billing</h1>
          <p className="text-sm text-muted-foreground">
            Manage your plan, payment methods, invoices, and billing contacts.
          </p>
        </div>
        <Button className="h-10"> 
          <DownloadIcon />
          Download statement
        </Button>
      </div>

      <div className="grid gap-4 grid-cols-1 xl:grid-cols-5 @5xl/main:grid-cols-[1.35fr_0.65fr]">
        <Card className="py-0 xl:col-span-3">
          <CardHeader className="border-b border-border/70 py-5">
            <CardTitle>Plan Details</CardTitle>
            <CardDescription>CodePilot Scale workspace subscription</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6 p-5 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="rounded-xl border border-border/70 bg-secondary/25 p-5">
              <div className="grid gap-4">
                {[
                  ["Current plan", "Scale"],
                  ["Monthly limit", "25,500 analyzed events"],
                  ["Cost", "$1,500/month"],
                  ["Renewal date", "June 01, 2026"]
                ].map(([label, value]) => (
                  <div key={label} className="border-b border-border/60 pb-4 last:border-0 last:pb-0">
                    <p className="text-sm text-muted-foreground">{label}</p>
                    <p className="font-medium">{value}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <div className="mb-2 flex justify-between text-sm">
                  <span className="font-medium">Seats</span>
                  <span className="text-muted-foreground">84 of 100 used</span>
                </div>
                <Progress value={84} />
              </div>
            </div>

            <div className="flex flex-col justify-between gap-6">
              <div>
                <h3 className="font-semibold">Plan Benefits</h3>
                <div className="mt-4 grid gap-3 text-sm">
                  {[
                    "100 member seats",
                    "Unlimited connected repositories",
                    "Security and deployment insights",
                    "Executive reporting exports",
                    "Priority support"
                  ].map((benefit) => (
                    <div key={benefit} className="flex items-center gap-2">
                      <CheckIcon className="size-4 text-primary" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <Button variant="outline">Cancel subscription</Button>
                <Button>Upgrade plan</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="py-0 xl:col-span-2">
          <CardHeader className="border-b border-border/70 py-5">
            <CardTitle>Billing Info</CardTitle>
            <CardDescription>Primary billing address</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 p-5">
            {[
              ["Name", "Maya Chen"],
              ["Company", "CodePilot Labs"],
              ["Street", "800 Mission St, Suite 400"],
              ["City/State", "San Francisco, CA"],
              ["Country", "United States"],
              ["VAT number", "CP-4920348"]
            ].map(([label, value]) => (
              <div
                key={label}
                className="grid grid-cols-[0.75fr_1fr] gap-4 border-b border-border/60 pb-3 text-sm last:border-0"
              >
                <span className="text-muted-foreground">{label}</span>
                <span className="font-medium">{value}</span>
              </div>
            ))}
            <Button className="mt-4" variant="outline">
              <PencilIcon />
              Update billing address
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card className="py-0">
        <CardHeader className="flex-row items-center justify-between border-b border-border/70 py-5">
          <div>
            <CardTitle>Payment Methods</CardTitle>
            <CardDescription>Cards and external billing methods on file</CardDescription>
          </div>
          <Button variant="outline">Add card</Button>
        </CardHeader>
        <CardContent className="grid gap-4 p-5 md:grid-cols-3">
          {[
            ["Mastercard", "**** **** **** 9029", "Default"],
            ["Visa", "**** **** **** 4328", "Backup"],
            ["PayPal", "maya@codepilot.ai", "Backup"]
          ].map(([name, detail, status]) => (
            <div key={name} className="rounded-xl border border-border/70 bg-secondary/25 p-4">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex size-11 items-center justify-center rounded-lg border border-border/70 bg-card">
                  <CreditCardIcon className="size-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold">{name}</p>
                  <p className="text-sm text-muted-foreground">{detail}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={status === "Default" ? "secondary" : "outline"}>{status}</Badge>
                <Button size="sm" variant="ghost">
                  Edit
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="py-0">
        <CardHeader className="flex-row items-center justify-between border-b border-border/70 py-5">
          <div>
            <CardTitle>Invoices</CardTitle>
            <CardDescription>Access all previous invoices</CardDescription>
          </div>
          <Button variant="outline">
            <DownloadIcon />
            Download all
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map(([invoice, date, amount, plan, status]) => (
                <TableRow key={invoice}>
                  <TableCell className="font-medium">{invoice}</TableCell>
                  <TableCell>{date}</TableCell>
                  <TableCell>{amount}</TableCell>
                  <TableCell>{plan}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{status}</Badge>
                  </TableCell>
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
