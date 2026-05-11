"use client"

import * as React from "react"
import Link from "next/link"

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

function CodePilotMark() {
  return (
    <span className="relative flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-sidebar-border bg-primary text-primary-foreground shadow-sm">
      <span className="absolute inset-px rounded-[11px] bg-[linear-gradient(135deg,#FFD6BA_0%,#FFDCDC_48%,#FFF2EB_100%)]" />
      <svg
        aria-hidden="true"
        className="relative size-5 text-[#3a2520]"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M6.75 15.5V8.75C6.75 7.78 7.53 7 8.5 7h3"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="2.2"
        />
        <path
          d="M11 17V7h4.1c1.55 0 2.8 1.25 2.8 2.8s-1.25 2.8-2.8 2.8H11"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.2"
        />
        <path
          d="M5 18.5h14"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="2.2"
        />
      </svg>
    </span>
  )
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
                <CodePilotMark />
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
