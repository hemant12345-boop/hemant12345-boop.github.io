import type { ReactNode } from 'react'
import { useSlot } from './Thread'

type Variant = 'default' | 'lilac' | 'display'

const variants: Record<Variant, string> = {
  default: 'bg-bubble text-ink shadow-bubble px-4 py-2.5 text-bubble',
  lilac: 'bg-lilac text-plum-800 shadow-bubble px-4 py-2.5 text-bubble font-medium',
  // Big headline-as-message (hero). No bubble chrome, just type.
  display: 'px-0 py-1 text-display font-display font-extrabold tracking-tightest',
}

/**
 * Corner shape for a left-side message, IG-DM style: the bottom-left corner
 * points at the avatar, and a bubble joined to the one above squares its top-left.
 */
export function leftCorners(first: boolean) {
  return `rounded-bubble rounded-bl-tail ${first ? '' : 'rounded-tl-tail'}`
}

type Props = {
  children: ReactNode
  variant?: Variant
  className?: string
}

/** One of my messages. Must live inside a <Thread>. */
export function Bubble({ children, variant = 'default', className = '' }: Props) {
  const { first } = useSlot()
  const shape = variant === 'display' ? '' : leftCorners(first)
  return (
    <div className={`w-fit max-w-[88%] text-pretty ${shape} ${variants[variant]} ${className}`}>
      {children}
    </div>
  )
}
