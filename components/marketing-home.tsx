import Link from "next/link"
import Image from "next/image"
import {
  ArrowRightIcon,
  CheckIcon,
  SparklesIcon,
} from "lucide-react"

import { CodePilotLogo, CodePilotMark } from "@/components/codepilot-logo"
import { ProductDemo } from "@/components/marketing-demo"
import { PricingSection } from "@/components/pricing-section"
import { SlackLogo } from "@/components/slack-logo"
import { AuroraText } from "@/components/ui/aurora-text"
import { BackgroundBeams } from "@/components/ui/background-beams"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid"
import { BlurFade } from "@/components/ui/blur-fade"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DotPattern, GridPattern } from "@/components/ui/grid-pattern"
import { MagicCard } from "@/components/ui/magic-card"
import { Marquee } from "@/components/ui/marquee"
import { OrbitingCircles } from "@/components/ui/orbiting-circles"
import { TextAnimate } from "@/components/ui/text-animate"
import {
  companyStats,
  contactReasons,
  customers,
  features,
  salesHighlights,
} from "@/lib/marketing-data"

const faqs = [
  ["How fast can we connect CodePilot?", "Most teams connect GitHub, Slack, and deployment data in the first 30 minutes."],
  ["Does this monitor individual developers?", "No. CodePilot is built around team health, ownership, and delivery flow, not surveillance."],
  ["Can leadership reports be exported?", "Yes. Executive briefs, incident summaries, and delivery reports can be exported for planning rituals."],
  ["What tools do you support?", "GitHub, GitLab, Slack, Linear, Vercel, PagerDuty, and custom API sources."],
]

const integrationLogos = [
  { name: "GitHub", src: "https://cdn.simpleicons.org/github/181717" },
  { name: "GitLab", src: "https://cdn.simpleicons.org/gitlab/FC6D26" },
  { name: "Slack", logo: SlackLogo },
  { name: "Linear", src: "https://cdn.simpleicons.org/linear/5E6AD2" },
  { name: "Vercel", src: "https://cdn.simpleicons.org/vercel/000000" },
  { name: "PagerDuty", src: "https://cdn.simpleicons.org/pagerduty/06AC38" },
]

type IntegrationLogo = (typeof integrationLogos)[number]

function IntegrationLogoIcon({
  integration,
  size = "size-10",
}: {
  integration: IntegrationLogo
  size?: string
}) {
  const Logo = integration.logo

  return (
    <span
      aria-label={integration.name}
      className="grid size-full place-items-center rounded-full border border-border/70 bg-background/95 p-3 shadow-[0_12px_34px_-24px_var(--foreground)] ring-1 ring-white/25 backdrop-blur transition-transform hover:scale-105"
    >
      {Logo ? (
        <Logo className={size} />
      ) : (
        <Image
          alt=""
          className={`${size} object-contain`}
          height={40}
          src={integration.src}
          unoptimized
          width={40}
        />
      )}
      <span className="sr-only">{integration.name}</span>
    </span>
  )
}

const repoCards = [
  ["frontend-platform", "42 PRs merged", "+18% velocity"],
  ["payments-service", "3 deploy risks", "Needs review"],
  ["auth-api", "12 security fixes", "On track"],
  ["infra-control", "98.4% build health", "Stable"],
  ["mobile-shell", "6 stale reviews", "Owner assigned"],
]

const activitySignals = [
  ["Review backlog dropped", "frontend-platform", "2m ago"],
  ["Deploy failed in staging", "payments-service", "18m ago"],
  ["Ownership gap resolved", "auth-api", "41m ago"],
  ["Incident summary ready", "checkout-worker", "1h ago"],
]

const deployStages = ["Commit", "Checks", "Preview", "Approval", "Production"]

const securitySignals = [
  ["Critical", "openssl patch", "auth-api"],
  ["High", "token rotation", "payments-service"],
  ["Medium", "dependency drift", "frontend-platform"],
]

const trustedCompanies = [
  { name: "GitHub", src: "https://cdn.simpleicons.org/github/181717" },
  { name: "GitLab", src: "https://cdn.simpleicons.org/gitlab/FC6D26" },
  { name: "Slack", logo: SlackLogo },
  { name: "Linear", src: "https://cdn.simpleicons.org/linear/5E6AD2" },
  { name: "Vercel", src: "https://cdn.simpleicons.org/vercel/000000" },
  { name: "Sentry", src: "https://cdn.simpleicons.org/sentry/362D59" },
  { name: "Datadog", src: "https://cdn.simpleicons.org/datadog/632CA6" },
  { name: "PagerDuty", src: "https://cdn.simpleicons.org/pagerduty/06AC38" },
]

type TrustedCompany = (typeof trustedCompanies)[number]

function TrustLogo({ company }: { company: TrustedCompany }) {
  const Logo = company.logo

  return (
    <div className="flex h-12 min-w-44 shrink-0 items-center justify-center gap-2.5 rounded-full border border-border/70 bg-background/65 px-5 text-sm font-semibold text-muted-foreground shadow-sm ring-1 ring-white/20 backdrop-blur-md transition-colors hover:text-foreground">
      {Logo ? (
        <Logo className="size-5" />
      ) : (
        <Image
          alt=""
          className="size-5 object-contain"
          height={20}
          src={company.src}
          unoptimized
          width={20}
        />
      )}
      <span>{company.name}</span>
    </div>
  )
}

function RepositoryIntelligenceBackground() {
  return (
    <Marquee
      pauseOnHover
      className="absolute top-8 w-full mask-[linear-gradient(to_top,transparent_8%,#000_85%)] [--duration:22s]"
    >
      {repoCards.map(([name, metric, status]) => (
        <figure
          key={name}
          className="w-44 shrink-0 rounded-xl border border-border/70 bg-background/80 p-4 text-left shadow-sm transition-all duration-300 hover:bg-background"
        >
          <figcaption className="text-sm font-semibold">{name}</figcaption>
          <p className="mt-3 text-xl font-semibold">{metric}</p>
          <p className="mt-1 text-xs text-muted-foreground">{status}</p>
        </figure>
      ))}
    </Marquee>
  )
}

function TeamSignalsBackground() {
  return (
    <div className="absolute right-4 top-4 grid w-[92%] gap-3 transition-transform duration-300 group-hover:scale-[1.02]">
      {activitySignals.map(([title, repo, time], index) => (
        <div
          key={title}
          className="rounded-xl border border-border/70 bg-background/85 p-3 shadow-sm"
          style={{ opacity: 1 - index * 0.12 }}
        >
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-medium">{title}</p>
            <span className="text-xs text-muted-foreground">{time}</span>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">{repo}</p>
        </div>
      ))}
    </div>
  )
}

function DeploymentFlowBackground() {
  return (
    <div className="absolute inset-x-6 top-12">
      <div className="relative flex items-center justify-between">
        <div className="absolute left-8 right-8 top-5 h-px bg-gradient-to-r from-[#FF9A86]/20 via-[#FF9A86]/80 to-[#FF9A86]/20" />
        {deployStages.map((stage, index) => (
          <div key={stage} className="relative z-10 grid justify-items-center gap-2">
            <span className="grid size-10 place-items-center rounded-full border border-border/70 bg-background text-sm font-semibold shadow-sm">
              {index + 1}
            </span>
            <span className="text-xs text-muted-foreground">{stage}</span>
          </div>
        ))}
      </div>
      <div className="mt-10 rounded-2xl border border-border/70 bg-background/80 p-4 shadow-sm">
        <div className="mb-3 flex items-center justify-between text-sm">
          <span className="font-medium">Release confidence</span>
          <span className="font-semibold text-emerald-700">96.9%</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-secondary">
          <div className="h-full w-[82%] rounded-full bg-[#FF9A86]" />
        </div>
      </div>
    </div>
  )
}

function SecurityBriefBackground() {
  return (
    <div className="absolute inset-x-5 top-8 rounded-2xl border border-border/70 bg-background/85 p-4 shadow-sm transition-transform duration-300 group-hover:-translate-y-1">
      <div className="mb-4 flex items-center justify-between">
        <Badge className="bg-[#FFD6BA]/60 text-[#5f382f]">AI brief</Badge>
        <span className="text-xs text-muted-foreground">Live</span>
      </div>
      <div className="grid gap-3">
        {securitySignals.map(([severity, title, repo]) => (
          <div key={title} className="rounded-xl border border-border/60 bg-card/75 p-3">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-medium">{title}</p>
              <span className="rounded-full bg-background px-2 py-0.5 text-xs text-muted-foreground">
                {severity}
              </span>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">{repo}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export function MarketingHome() {
  return (
    <>
      <section id="home" className="relative isolate overflow-hidden px-4 pt-14 pb-20 md:px-6 md:pt-20">
        <GridPattern />
        <BackgroundBeams />
        <div className="absolute inset-x-0 top-0 -z-10 h-[620px] bg-[radial-gradient(circle_at_50%_0%,#FFD6A6_0%,#FFDCDC_28%,transparent_62%)] opacity-60" />
        <BlurFade className="relative mx-auto flex max-w-4xl flex-col items-center text-center" duration={0.65} offset={28}>
          <BlurFade delay={0.08} duration={0.45} offset={0} blur="3px">
            <CodePilotLogo />
          </BlurFade>
          <BlurFade delay={0.12}>
            <Badge className="mt-8 gap-1.5" variant="secondary">
              <SparklesIcon className="size-3.5" />
              AI developer analytics for leadership teams
            </Badge>
          </BlurFade>
          <h1 className="mt-5 text-5xl font-semibold tracking-normal text-balance md:text-7xl">
            <TextAnimate as="span" by="word" animation="blurInUp" delay={0.18} once className="inline">
              Understand engineering work
            </TextAnimate>{" "}
            <AuroraText>
              before it becomes risk.
            </AuroraText>
          </h1>
          <TextAnimate
            as="p"
            by="word"
            animation="fadeIn"
            delay={0.68}
            once
            className=" max-w-2xl text-base leading-7 text-muted-foreground md:mt-5 mt-4 md:text-lg"
          >
            CodePilot turns repositories, deploys, incidents, and team signals into a beautiful operating view for modern engineering leaders.
          </TextAnimate>
          <BlurFade delay={0.85}>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link href="/sign-up">
                  Get started
                  <ArrowRightIcon />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="#features">Explore platform</Link>
              </Button>
            </div>
          </BlurFade>
        </BlurFade>

        <BlurFade delay={0.95} duration={0.75} offset={18} className="relative mx-auto mt-14 max-w-7xl">
          <ProductDemo />
        </BlurFade>
      </section>

      <section className="border-y border-border/70 bg-card/40 py-8">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <p className="text-center text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
            Trusted by teams building reliable software at scale
          </p>
          <div className="relative mt-6 flex w-full items-center justify-center overflow-hidden">
            <Marquee pauseOnHover className="[--duration:28s] [--gap:1.5rem]">
              {trustedCompanies.map((company) => (
                <TrustLogo key={company.name} company={company} />
              ))}
            </Marquee>
            <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-card/95 to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-card/95 to-transparent" />
          </div>
        </div>
      </section>



      <BlurFade
        className="relative mx-auto max-w-7xl scroll-mt-20 px-4 py-16 md:px-6"
        inView
        id="features"
        offset={26}
      >
        <DotPattern className="-z-10" />
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <Badge variant="outline">Features</Badge>
          <TextAnimate as="h2" by="word" animation="blurInUp" once className="mt-3 text-3xl font-semibold md:text-4xl">
            A premium control room for engineering operations.
          </TextAnimate>
          <p className="mt-3 text-muted-foreground">
            Measure delivery, reliability, team load, and executive reporting in one carefully designed view.
          </p>
        </div>
        <BentoGrid>
          {[
            {
              ...features[0],
              className: "md:col-span-1",
              background: <RepositoryIntelligenceBackground />,
            },
            {
              ...features[1],
              className: "md:col-span-2",
              background: <TeamSignalsBackground />,
            },
            {
              ...features[2],
              className: "md:col-span-2",
              background: <DeploymentFlowBackground />,
            },
            {
              Icon: SparklesIcon,
              name: "AI risk briefs",
              description:
                "Turn security, incidents, reviews, and deploy activity into concise leadership-ready recommendations.",
              className: "md:col-span-1",
              background: <SecurityBriefBackground />,
            },
          ].map((feature, index) => (
            <BlurFade
              key={feature.name ?? feature.title}
              className={`h-full ${feature.className}`}
              delay={index * 0.07}
              inView
            >
              <BentoCard
                Icon={feature.Icon ?? feature.icon}
                background={feature.background}
                cta="Explore feature"
                description={feature.description}
                href="/sign-up"
                name={feature.name ?? feature.title}
              />
            </BlurFade>
          ))}
        </BentoGrid>
      </BlurFade>

      <BlurFade className="mx-auto max-w-7xl px-4 py-16 md:px-6" id="metrics" inView offset={26}>
        <div className="grid gap-4 md:grid-cols-3">
          {companyStats.slice(1).map(([value, label], index) => (
            <BlurFade key={value} delay={index * 0.07} inView>
              <Card className="bg-card/70 text-center">
                <CardHeader>
                  <CardTitle className="text-5xl">{value}</CardTitle>
                  <CardDescription>{label}</CardDescription>
                </CardHeader>
              </Card>
            </BlurFade>
          ))}
        </div>
      </BlurFade>

      <BlurFade
        className="relative overflow-hidden border-y border-border/70 bg-card/40 py-20"
        id="integrations"
        inView
        offset={26}
      >
        <GridPattern className="opacity-20" />
        <div className="relative mx-auto grid max-w-7xl gap-8 px-4 md:px-6 lg:grid-cols-[0.75fr_1.25fr]">
          <div>
            <Badge variant="outline">Integrations</Badge>
            <TextAnimate as="h2" by="word" animation="slideUp" once className="mt-3 text-3xl font-semibold md:text-4xl">
              Works with the tools your teams already trust.
            </TextAnimate>
            <p className="mt-3 text-muted-foreground">
              Connect source control, deploy platforms, issue trackers, incident tools, and chat in one operating layer.
            </p>
            <div className="mt-6 grid gap-3 text-sm text-muted-foreground">
              {["Least-privilege OAuth scopes", "Near real-time sync jobs", "Ownership mapping across teams"].map((item, index) => (
                <BlurFade key={item} delay={index * 0.06} inView>
                  <p className="flex items-center gap-2">
                  <CheckIcon className="size-4 text-emerald-600" />
                  {item}
                  </p>
                </BlurFade>
              ))}
            </div>
          </div>
          <BlurFade inView>
            <MagicCard>
            <div className="relative flex min-h-[420px] items-center justify-center overflow-hidden rounded-[calc(1.5rem-1px)] p-5 md:min-h-[520px] md:p-6">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#FFD6A6_0%,transparent_42%)] opacity-25" />
              <div className="absolute left-1/2 top-1/2 size-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,#FFF2EB_0%,transparent_68%)] opacity-75 blur-2xl" />
              <div className="relative z-10 grid size-24 place-items-center rounded-full border border-border/70 bg-background/95 shadow-xl ring-1 ring-white/30">
                <CodePilotMark className="size-14 rounded-2xl" />
              </div>
              <OrbitingCircles iconSize={58} radius={92} duration={18} reverse>
                {integrationLogos.slice(0, 3).map((integration) => (
                  <IntegrationLogoIcon key={integration.name} integration={integration} size="size-8" />
                ))}
              </OrbitingCircles>
              <OrbitingCircles iconSize={54} radius={154} duration={26}>
                {integrationLogos.slice(3).map((integration) => (
                  <IntegrationLogoIcon
                    key={integration.name}
                    integration={integration}
                    size="size-7"
                  />
                ))}
              </OrbitingCircles>
            </div>
            </MagicCard>
          </BlurFade>
        </div>
      </BlurFade>

      <PricingSection />

      <BlurFade className="mx-auto max-w-7xl scroll-mt-20 px-4 py-16 md:px-6" id="customers" inView offset={26}>
        <div className="mb-8 grid gap-4 md:grid-cols-[0.8fr_1.2fr] md:items-end">
          <div>
            <Badge variant="outline">Stories</Badge>
            <h2 className="mt-3 text-3xl font-semibold md:text-4xl">People love building with CodePilot.</h2>
          </div>
          <p className="text-muted-foreground">
            Fake but realistic customer stories for teams that need delivery clarity at executive speed.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {customers.map((customer) => (
            <Card key={customer.company}>
              <CardHeader>
                <Badge variant="secondary" className="w-fit">{customer.industry}</Badge>
                <CardTitle>{customer.company}</CardTitle>
                <CardDescription>{customer.quote}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-semibold">{customer.result}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </BlurFade>

      <BlurFade className="border-y border-border/70 bg-card/40 py-20" inView offset={26}>
        <div className="mx-auto grid max-w-7xl gap-8 px-4 md:px-6 lg:grid-cols-[0.75fr_1.25fr]">
          <div>
            <Badge variant="outline">FAQ</Badge>
            <h2 className="mt-3 text-3xl font-semibold md:text-4xl">Frequently asked questions</h2>
          </div>
          <Accordion type="single" collapsible className="grid gap-3">
            {faqs.map(([question, answer]) => (
              <AccordionItem key={question} value={question}>
                <AccordionTrigger>{question}</AccordionTrigger>
                <AccordionContent>{answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </BlurFade>

      <BlurFade
        className="relative mx-auto max-w-7xl scroll-mt-20 overflow-hidden rounded-[2rem] border border-border/70 bg-card/70 px-4 py-12 shadow-[0_24px_80px_-62px_var(--foreground)]  my-16 md:px-10 md:py-14"
        id="contact"
        inView
        offset={26}
      >
        <BackgroundBeams className="opacity-35" />
        <div className="pointer-events-none absolute -left-24 top-10 size-72 rounded-full bg-[#FFD6A6]/35 blur-3xl" />
        <div className="pointer-events-none absolute -right-24 bottom-0 size-80 rounded-full bg-[#FF9A86]/20 blur-3xl" />
        <div className="relative grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <Badge variant="secondary">Start your workspace</Badge>
            <h2 className="mt-4 max-w-xl text-3xl font-semibold tracking-tight md:text-5xl">
              Turn engineering activity into clarity today.
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
              Create a CodePilot workspace, connect your repositories, and start seeing delivery health, risk signals, and AI briefs in one operating view.
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {contactReasons.map((reason, index) => (
                <div
                  key={reason}
                  className="flex items-center gap-3 rounded-2xl border border-border/70 bg-background/70 p-3 text-sm font-medium shadow-sm backdrop-blur"
                >
                  <span className="grid size-7 shrink-0 place-items-center rounded-full bg-[#FFD6BA]/60 text-xs font-semibold text-[#5f382f]">
                    {index + 1}
                  </span>
                  {reason}
                </div>
              ))}
            </div>
            <div className="mt-8 grid gap-4 border-t border-border/70 pt-6">
              {salesHighlights.map((item) => {
                const Icon = item.icon

                return (
                  <div key={item.title} className="flex gap-3">
                    <span className="grid size-9 shrink-0 place-items-center rounded-full border border-border/70 bg-background/75">
                      <Icon className="size-4 text-[#5f382f]" />
                    </span>
                    <div>
                      <p className="text-sm font-semibold">{item.title}</p>
                      <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
          <MagicCard className="relative">
            <Card className="border-0 bg-background/80 shadow-none backdrop-blur">
              <CardHeader>
                <Badge className="w-fit bg-[#FFD6BA]/60 text-[#5f382f]">Setup in minutes</Badge>
                <CardTitle>Create your workspace</CardTitle>
                <CardDescription>
                  Start from the product, then connect your tools when you are ready.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-5">
                <div className="grid gap-3">
                  {["Create a workspace", "Connect GitHub or GitLab", "Invite your engineering leads"].map((step) => (
                    <div
                      key={step}
                      className="flex items-center gap-3 rounded-2xl border border-border/70 bg-card/70 p-3 text-sm font-medium"
                    >
                      <span className="grid size-7 place-items-center rounded-full bg-emerald-500/15 text-emerald-700">
                        <CheckIcon className="size-4" />
                      </span>
                      {step}
                    </div>
                  ))}
                </div>
                <div className="rounded-2xl border border-border/70 bg-card/70 p-4">
                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">First insight</p>
                      <p className="mt-1 text-2xl font-semibold">Under 10 min</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Card required</p>
                      <p className="mt-1 text-2xl font-semibold">No</p>
                    </div>
                  </div>
                </div>
                <Button asChild className="h-11">
                  <Link href="/sign-up">
                    Get started
                    <ArrowRightIcon />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </MagicCard>
        </div>
      </BlurFade>
    </>
  )
}
