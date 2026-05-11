"use client"

import * as React from "react"
import { MonitorIcon, MoonIcon, SunIcon } from "lucide-react"
import { useTheme } from "next-themes"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"

const themes = [
  {
    value: "light",
    label: "Light",
    icon: SunIcon,
  },
  {
    value: "dark",
    label: "Dark",
    icon: MoonIcon,
  },
  {
    value: "system",
    label: "System",
    icon: MonitorIcon,
  },
]

export function ThemeToggle() {
  const { isMobile } = useSidebar()
  const { theme, setTheme } = useTheme()
  const mounted = React.useSyncExternalStore(
    (onStoreChange) => {
      queueMicrotask(onStoreChange)
      return () => {}
    },
    () => true,
    () => false
  )

  const currentTheme = mounted ? theme ?? "system" : "system"
  const activeTheme =
    themes.find((item) => item.value === currentTheme) ?? themes[2]

  return (
    <SidebarMenuItem>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <SidebarMenuButton tooltip="Theme">
            <MonitorIcon />
            <span>Theme</span>
            <span className="ml-auto text-xs text-muted-foreground capitalize group-data-[collapsible=icon]:hidden">
              {mounted ? activeTheme.label : "System"}
            </span>
          </SidebarMenuButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-40"
          side={isMobile ? "bottom" : "right"}
          align={isMobile ? "end" : "start"}
        >
          <DropdownMenuLabel>Theme</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup
            value={currentTheme}
            onValueChange={setTheme}
          >
            {themes.map((item) => {
              const Icon = item.icon

              return (
                <DropdownMenuRadioItem key={item.value} value={item.value}>
                  <Icon />
                  {item.label}
                </DropdownMenuRadioItem>
              )
            })}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </SidebarMenuItem>
  )
}
