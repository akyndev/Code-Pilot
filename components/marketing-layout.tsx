import Link from "next/link"

import { CodePilotLogo } from "@/components/codepilot-logo"
import { MarketingLenis } from "@/components/marketing-lenis"
import { Button } from "@/components/ui/button"
import { marketingNav } from "@/lib/marketing-data"

const footerNav = [
  { label: "Features", href: "#features" },
  { label: "Integrations", href: "#integrations" },
  { label: "Customers", href: "#customers" },
  { label: "Pricing", href: "#pricing" },
  { label: "Blog", href: "#updates" },
  { label: "Privacy", href: "#" },
  { label: "Terms", href: "#" },
]

const socialLinks = [
  {
    label: "X",
    href: "#",
    path: "M22 4.01c-1 .49-1.98.689-3 .99-1.121-1.265-2.783-1.335-4.38-.737S11.977 6.323 12 8v1c-3.245.083-6.135-1.395-8-4 0 0-4.182 7.433 4 11-1.872 1.247-3.739 2.088-6 2 3.308 1.803 6.913 2.423 10.034 1.517 3.58-1.04 6.522-3.723 7.651-7.742.33-1.173.497-2.386.497-3.753 0-.249 1.51-2.772 1.818-4.013z",
  },
  {
    label: "LinkedIn",
    href: "#",
    path: "M4 4m0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zM8 11v5M8 8v.01M12 16v-5M16 16v-3a2 2 0 0 0-4 0",
  },
  {
    label: "GitHub",
    href: "#",
    path: "M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 1.8 5.4 2.1 5.4 2.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 8.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21",
  },
  {
    label: "Facebook",
    href: "#",
    path: "M7 10v4h3v7h4v-7h3l1-4h-4V8a1 1 0 0 1 1-1h3V3h-3a5 5 0 0 0-5 5v2z",
  },
  {
    label: "Instagram",
    href: "#",
    path: "M4 8a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v8a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4zM12 12m-3 0a3 3 0 1 0 6 0 3 3 0 1 0-6 0M16.5 7.5v.01",
  },
]

function SocialIcon({ path }: { path: string }) {
  return (
    <svg
      aria-hidden="true"
      className="size-5"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path d={path} />
    </svg>
  )
}

export function MarketingHeader() {
  const isLoggedIn = false

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6">
        <Link href="/" aria-label="CodePilot home">
          <CodePilotLogo />
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-muted-foreground lg:flex">
          {marketingNav.map((item) => (
            <Link key={item.href} href={item.href} className="transition-colors hover:text-foreground">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          {isLoggedIn ? (
            <Button asChild variant="ghost" className="hidden sm:inline-flex">
              <Link href="/overview">Dashboard</Link>
            </Button>
          ) : (
            <Button asChild variant="ghost" className="hidden sm:inline-flex">
              <Link href="/sign-in">Sign in</Link>
            </Button>
          )}
          <Button asChild>
            <Link href="/sign-up">Get started</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}

export function MarketingFooter() {
  return (
    <footer className="border-t border-border/70 bg-background px-4 py-12 md:px-6">
      <div className="mx-auto max-w-7xl border-t border-border/40 px-0 py-16">
        <div className="flex w-full flex-col items-center justify-center">
          <Link
            href="/"
            aria-label="CodePilot home"
            className="relative z-20 mb-5 flex items-center px-2 py-1 text-sm font-normal text-foreground"
          >
            <CodePilotLogo />
          </Link>

          <ul className="flex list-none flex-col items-center gap-4 text-sm text-muted-foreground transition-colors sm:flex-row sm:flex-wrap sm:justify-center">
            {footerNav.map((item) => (
              <li key={item.label} className="list-none">
                <Link href={item.href} className="transition-colors hover:text-foreground">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mx-auto mt-8 h-px w-full max-w-7xl bg-[linear-gradient(to_right,rgba(0,0,0,0.18),rgba(0,0,0,0.18)_50%,transparent_0,transparent)] [background-size:5px_1px] [mask:linear-gradient(to_left,#fff_90%,transparent),_linear-gradient(to_right,#fff_90%,transparent),_linear-gradient(black,black)] [mask-composite:exclude] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.2),rgba(255,255,255,0.2)_50%,transparent_0,transparent)]" />
        </div>

        <div className="mt-8 flex w-full flex-col items-center justify-between gap-6 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            © 2026 CodePilot Labs. All rights reserved.
          </p>
          <div className="flex gap-4">
            {socialLinks.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                aria-label={item.label}
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                <SocialIcon path={item.path} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

export function MarketingPageFrame({ children }: { children: React.ReactNode }) {
  return (
    <MarketingLenis>
      <div className="min-h-screen bg-background text-foreground">
        <MarketingHeader />
        <main>{children}</main>
        <MarketingFooter />
      </div>
    </MarketingLenis>
  )
}
