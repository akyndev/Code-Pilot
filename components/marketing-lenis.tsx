"use client"

import { ReactLenis } from "lenis/react"

export function MarketingLenis({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        anchors: true,
        autoRaf: true,
        duration: 1.15,
        easing: (time) => Math.min(1, 1.001 - Math.pow(2, -10 * time)),
        lerp: 0.08,
        smoothWheel: true,
        stopInertiaOnNavigate: true,
      }}
    >
      {children}
    </ReactLenis>
  )
}
