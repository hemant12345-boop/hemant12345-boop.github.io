import { useRef, type ReactNode } from 'react'
import { m, useScroll, useTransform } from 'framer-motion'

/**
 * Drifts its content a few px against the scroll. Moves the whole element,
 * so images are never cropped to make room. MotionConfig handles reduced motion.
 */
export function Parallax({ children, distance = 24, className = '' }: { children: ReactNode; distance?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance])

  return (
    <m.div ref={ref} style={{ y }} className={className}>
      {children}
    </m.div>
  )
}
