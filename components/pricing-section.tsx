"use client"

import Link from "next/link"
import { useState } from "react"
import { CheckIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { BlurFade } from "@/components/ui/blur-fade"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { TextAnimate } from "@/components/ui/text-animate"
import { cn } from "@/lib/utils"

type BillingCycle = "monthly" | "yearly"

const pricingPlans = [
  {
    name: "Starter",
    description: "For small engineering teams proving out developer analytics.",
    monthly: "$299",
    yearly: "$244",
    features: [
      "10 connected repositories",
      "25 workspace seats",
      "Weekly AI leadership digests",
      "GitHub and Slack integrations",
      "Core delivery analytics",
    ],
  },
  {
    name: "Scale",
    description: "For growing organizations with multiple product teams.",
    monthly: "$1,500",
    yearly: "$1,230",
    highlighted: true,
    features: [
      "Unlimited repositories",
      "100 workspace seats",
      "Daily AI summaries",
      "Security and deployment insights",
      "Priority support",
    ],
  },
  {
    name: "Business",
    description: "For established teams that need governance and reporting depth.",
    monthly: "$3,900",
    yearly: "$3,198",
    features: [
      "Unlimited teams and projects",
      "SSO/SAML access controls",
      "Custom data retention",
      "Executive report exports",
      "Private deployment options",
    ],
  },
]

const organizationFeatures = [
  "Unlimited repositories",
  "No cap on AI briefs",
  "Dedicated success manager",
  "Security review support",
  "Invite unlimited members",
  "Custom user roles",
  "Custom invoicing",
  "Private workspace controls",
]

function PricingCheck() {
  return (
    <span className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full bg-foreground/80 text-background">
      <CheckIcon className="size-3 stroke-[4px]" />
    </span>
  )
}

export function PricingSection() {
  const [billingCycle, setBillingCycle] = useState<BillingCycle>("monthly")
  const billingLabel = billingCycle === "monthly" ? "Per month" : "Per month, billed yearly"

  return (
    <section id="pricing" className="mx-auto max-w-7xl scroll-mt-20 px-4 py-20 md:px-6">
      <div className="mx-auto max-w-xl text-center">
        <div>

        <Badge
          variant="outline"
          className="mx-auto h-6 border-[#FF9A86]/35 bg-[#FFD6BA]/35 px-3 text-[#5f382f] shadow-sm ring-1 ring-[#FF9A86]/20"
          >
          Pricing plans
        </Badge>
          </div>
        <TextAnimate as="h2" by="word" animation="blurInUp" once className="mt-3 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
          Choose your pricing plan
        </TextAnimate>
        <TextAnimate as="p" by="word" animation="fadeIn" once delay={0.12} className="mx-auto mt-4 max-w-md text-base text-muted-foreground">
          Flexible plans designed to scale from your first engineering analytics rollout to company-wide reporting.
        </TextAnimate>
        <BlurFade delay={0.18} inView>
          <div className="mx-auto mt-6 grid w-fit grid-cols-2 rounded-sm border border-border/70 bg-card p-1 text-sm shadow-sm">
            {(["monthly", "yearly"] as BillingCycle[]).map((cycle) => (
              <button
                key={cycle}
                className={cn(
                  "rounded-[calc(var(--radius)-4px)] px-4 py-2 font-medium capitalize text-muted-foreground transition active:scale-[0.98]",
                  billingCycle === cycle && "bg-background text-foreground shadow ring-1 ring-border"
                )}
                onClick={() => setBillingCycle(cycle)}
                type="button"
              >
                {cycle}
              </button>
            ))}
          </div>
        </BlurFade>
      </div>

      <div className="py-6 md:py-10">
        <div className="grid w-full grid-cols-1 gap-3 md:grid-cols-2 md:gap-4 lg:grid-cols-3">
          {pricingPlans.map((plan, index) => {
            const price = billingCycle === "monthly" ? plan.monthly : plan.yearly

            return (
              <BlurFade key={plan.name} delay={index * 0.08} inView>
                <Card
                  className={cn(
                    "h-full rounded-sm bg-transparent p-1 shadow-none ring-0 md:p-3",
                    plan.highlighted &&
                      "border-transparent bg-card shadow-[0_24px_70px_-48px_var(--foreground)] ring-1 ring-border/70"
                  )}
                >
                  <CardContent className="flex h-full flex-col justify-start gap-1 p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex flex-col gap-1">
                        <p className="text-base font-medium text-foreground sm:text-lg">{plan.name}</p>
                      </div>
                      {plan.highlighted ? (
                        <Badge className="h-6 border-[#FF9A86]/40 bg-[#FFD6BA]/55 px-2.5 text-[#5f382f] shadow-sm ring-1 ring-[#FF9A86]/25">
                          Popular
                        </Badge>
                      ) : null}
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">{plan.description}</p>

                    <div className="my-6">
                      <div className="flex items-end">
                        <span className="text-3xl font-medium text-foreground md:text-4xl">{price}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">{billingLabel}</span>
                    </div>

                    <Button
                      asChild
                      className="mt-4 mb-2 w-full rounded-sm active:scale-[0.98]"
                      variant={plan.highlighted ? "default" : "outline"}
                    >
                      <Link href="/sign-up">Get started</Link>
                    </Button>

                    <div className="mt-1">
                      {plan.features.map((feature) => (
                        <div key={feature} className="my-5 flex items-start justify-start gap-2">
                          <PricingCheck />
                          <div className="text-sm font-medium text-muted-foreground">{feature}</div>
                        </div>
                      ))}
                    </div>
                    <div className="p-3" />
                  </CardContent>
                </Card>
              </BlurFade>
            )
          })}

          <div className="col-span-1 mt-8 md:col-span-2 lg:col-span-3">
            <BlurFade delay={0.12} inView>
              <Card className="relative overflow-hidden rounded-sm border-border/70 bg-card/70 p-0 shadow-none">
                <CardContent className="grid grid-cols-1 gap-10 p-6 md:p-8 lg:grid-cols-3 lg:gap-20">
                  <div className="lg:col-span-1">
                    <h3 className="mb-2 text-base font-medium text-foreground md:text-2xl">
                      Plan for organizations
                    </h3>
                    <p className="mb-6 text-sm text-muted-foreground">
                      Need custom controls, dedicated support, or volume pricing? Let&apos;s tailor CodePilot to your org.
                    </p>
                    <Button asChild className="w-full rounded-sm sm:w-auto">
                      <Link href="/sign-up">Contact sales</Link>
                    </Button>
                  </div>
                  <div className="lg:col-span-2">
                    <div className="grid grid-cols-1 md:grid-cols-3">
                      {organizationFeatures.map((feature) => (
                        <div key={feature} className="my-2 flex items-start justify-start gap-2">
                          <PricingCheck />
                          <div className="text-sm font-medium text-muted-foreground">{feature}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </BlurFade>
          </div>
        </div>
      </div>
    </section>
  )
}
