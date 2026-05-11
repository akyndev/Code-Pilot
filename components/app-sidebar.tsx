"use client"

import * as React from "react"
import Link from "next/link"

import { CodePilotMark } from "@/components/codepilot-logo"
import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import { dashboardPages } from "@/lib/dashboard-pages"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"

function createNavItems(hrefs: string[]) {
  return hrefs.map((href) => {
    const page = dashboardPages.find((item) => item.href === href)

    if (!page) {
      throw new Error(`Unknown dashboard route: ${href}`)
    }

    return {
      title: page.title,
      url: page.href,
      icon: React.createElement(page.icon),
    }
  })
}

const data = {
  user: {
    name: "Maya Chen",
    email: "maya@codepilot.ai",
    avatar: "https://avatars.githubusercontent.com/u/71358698?v=4&size=64"
  },
  navGroups: [
    {
      label: "Core",
      items: createNavItems(["/overview"])
    },
    {
      label: "Analytics",
      items: createNavItems([
        "/repository-analytics",
        "/team-insights",
        "/deployment-analytics",
        "/api-usage",
        "/security-insights"
      ])
    },
    {
      label: "Operations",
      items: createNavItems(["/alerts", "/reports", "/activity-feed", "/integrations"])
    }
  ],
  navSecondary: createNavItems(["/billing", "/team-management", "/settings"])
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="">
        <SidebarMenu className="">
          <SidebarMenuItem className="">
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:p-1.5! hover:bg-transparent hover:text-sidebar-foreground active:bg-transparent active:text-sidebar-foreground data-active:bg-transparent data-active:text-sidebar-foreground data-active:shadow-none data-open:hover:bg-transparent data-open:hover:text-sidebar-foreground"
            >
              <Link href="/overview">
                <CodePilotMark className="border-sidebar-border" />
                <span className="text-base font-semibold tracking-tight">CodePilot</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {data.navGroups.map((group) => (
          <NavMain key={group.label} label={group.label} items={group.items} />
        ))}
        <NavSecondary
          label="Workspace"
          items={data.navSecondary}
          className="mt-auto"
        />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
