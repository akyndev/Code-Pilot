"use client"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { TrendingUpIcon, TrendingDownIcon } from "lucide-react"

export function SectionCards() {
  return (
    <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Deployment Velocity</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            142
          </CardTitle>
          <CardAction>
            <Badge
              variant="outline"
              className="border-emerald-700/20 bg-emerald-700 text-white shadow-sm dark:border-emerald-300/30 dark:bg-emerald-300 dark:text-emerald-950"
            >
              <TrendingUpIcon
              />
              +12.5%
            </Badge>
          </CardAction>
        </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="line-clamp-1 flex gap-2 font-medium">
            Shipping faster this sprint{" "}
            <TrendingUpIcon className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Pull requests merged in the last 30 days
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Review Backlog</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            28
          </CardTitle>
          <CardAction>
            <Badge
              variant="outline"
              className="border-amber-700/20 bg-amber-700 text-white shadow-sm dark:border-amber-300/30 dark:bg-amber-300 dark:text-amber-950"
            >
              <TrendingDownIcon
              />
              -20%
            </Badge>
          </CardAction>
        </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="line-clamp-1 flex gap-2 font-medium">
            Fewer stalled reviews{" "}
            <TrendingDownIcon className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Open pull requests awaiting approval
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Active Contributors</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            68
          </CardTitle>
          <CardAction>
            <Badge
              variant="outline"
              className="border-emerald-700/20 bg-emerald-700 text-white shadow-sm dark:border-emerald-300/30 dark:bg-emerald-300 dark:text-emerald-950"
            >
              <TrendingUpIcon
              />
              +12.5%
            </Badge>
          </CardAction>
        </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="line-clamp-1 flex gap-2 font-medium">
            Strong team participation{" "}
            <TrendingUpIcon className="size-4" />
          </div>
          <div className="text-muted-foreground">Weekly contributors across repositories</div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Cycle Time</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            4.5d
          </CardTitle>
          <CardAction>
            <Badge
              variant="outline"
              className="border-sky-700/20 bg-sky-700 text-white shadow-sm dark:border-sky-300/30 dark:bg-sky-300 dark:text-sky-950"
            >
              <TrendingUpIcon
              />
              +4.5%
            </Badge>
          </CardAction>
        </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="line-clamp-1 flex gap-2 font-medium">
            Delivery pace improving{" "}
            <TrendingUpIcon className="size-4" />
          </div>
          <div className="text-muted-foreground">Median time from first commit to merge</div>
        </CardFooter>
      </Card>
    </div>
  )
}
