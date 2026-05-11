import * as React from "react"

import { cn } from "@/lib/utils"

type OrbitingCirclesProps = React.ComponentProps<"div"> & {
  reverse?: boolean
  duration?: number
  delay?: number
  radius?: number
  path?: boolean
  iconSize?: number
  speed?: number
}

export function OrbitingCircles({
  className,
  children,
  reverse = false,
  duration = 20,
  delay = 0,
  radius = 160,
  path = true,
  iconSize = 30,
  speed = 1,
  ...props
}: OrbitingCirclesProps) {
  const childrenArray = React.Children.toArray(children)
  const orbitDuration = duration / speed

  return (
    <div className={cn("absolute inset-0", className)} {...props}>
      {path ? (
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 rounded-full border border-border/60 bg-background/10"
          style={{
            height: radius * 2,
            transform: "translate(-50%, -50%)",
            width: radius * 2,
          }}
        />
      ) : null}
      {childrenArray.map((child, index) => (
        <div
          key={index}
          className="absolute left-1/2 top-1/2 grid place-items-center animate-[orbit_var(--duration)_linear_infinite]"
          style={
            {
              "--delay": `${delay - (index * orbitDuration) / childrenArray.length}s`,
              "--duration": `${orbitDuration}s`,
              "--icon-size": `${iconSize}px`,
              "--radius": `${radius}px`,
              animationDelay: "var(--delay)",
              animationDirection: reverse ? "reverse" : "normal",
              height: "var(--icon-size)",
              width: "var(--icon-size)",
            } as React.CSSProperties
          }
        >
          {child}
        </div>
      ))}
    </div>
  )
}
