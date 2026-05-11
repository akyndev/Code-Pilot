"use client"

import { useRouter } from "next/navigation"
import Link from "next/link"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

export function VerifyEmailForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const router = useRouter()

  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      onSubmit={(event) => {
        event.preventDefault()
        router.push("/overview")
      }}
      {...props}
    >
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Verify your email</h1>
          <p className="text-sm text-balance text-muted-foreground">
            Enter the code we sent to finish creating your account
          </p>
        </div>
        <Field>
          <FieldLabel htmlFor="code">Verification code</FieldLabel>
          <Input
            id="code"
            type="text"
            inputMode="numeric"
            placeholder="123456"
            required
            className="bg-background text-center tracking-[0.35em]"
          />
          <FieldDescription>
            The code expires shortly for your workspace security.
          </FieldDescription>
        </Field>
        <Field>
          <Button type="submit">Verify Email</Button>
          <FieldDescription className="px-6 text-center">
            Wrong account? <Link href="/sign-in">Sign in</Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  )
}
