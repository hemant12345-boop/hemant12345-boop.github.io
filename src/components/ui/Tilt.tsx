import type { PointerEvent, ReactNode } from 'react'
import { m, useReducedMotion, useSpring } from 'framer-motion'
import { spring } from '../../design/motion'

/** Subtle 3D tilt toward the mouse. Mouse only (no touch jitter), off under reduced motion. */
export function Tilt({ children, max = 6, className = '' }: { children: ReactNode; max?: number; className?: string }) {
  const reduce = useReducedMotion()
  const rotateX = useSpring(0, spring.tilt)
  const rotateY = useSpring(0, spring.tilt)

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (reduce || e.pointerType !== 'mouse') return
    const r = e.currentTarget.getBoundingClientRect()
    rotateY.set(((e.clientX - r.left) / r.width - 0.5) * 2 * max)
    rotateX.set(-((e.clientY - r.top) / r.height - 0.5) * 2 * max)
  }
  const reset = () => {
    rotateX.set(0)
    rotateY.set(0)
  }

  return (
    <m.div
      onPointerMove={onMove}
      onPointerLeave={reset}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      className={className}
    >
      {children}
    </m.div>
  )
}
