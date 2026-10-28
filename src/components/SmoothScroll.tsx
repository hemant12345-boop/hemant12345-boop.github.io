import { useEffect, type ReactNode } from 'react'
import Lenis from 'lenis'
import { useReducedMotion } from 'framer-motion'

let instance: Lenis | null = null

/** Smooth-scroll to a selector or element; falls back to native when Lenis is off. */
export function scrollToTarget(target: string | HTMLElement) {
  if (instance) {
    instance.scrollTo(target, { offset: -72 })
    return
  }
  const el = typeof target === 'string' ? document.querySelector(target) : target
  el?.scrollIntoView({ block: 'start' })
}

/**
 * Lenis smooth scroll for wheel/trackpad. Touch devices keep native scrolling
 * (Lenis default), which is what feels right coming in from Instagram.
 * Disabled entirely under prefers-reduced-motion.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion()

  useEffect(() => {
    if (reduce) return
    instance = new Lenis({ autoRaf: true, lerp: 0.1, anchors: { offset: -72 } })
    return () => {
      instance?.destroy()
      instance = null
    }
  }, [reduce])

  return children
}
