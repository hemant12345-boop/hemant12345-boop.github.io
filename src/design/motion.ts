import type { Transition } from 'framer-motion'

/** Shared motion tokens. Mirrors the CSS --ease-* / --duration-* tokens. */

export const ease = {
  outExpo: [0.16, 1, 0.3, 1] as const, // Wingy's --app-ease-out
  standard: [0.25, 0.1, 0.25, 1] as const,
}

export const spring = {
  /** Message bubble popping in. Snappy with a small overshoot. */
  pop: { type: 'spring', stiffness: 520, damping: 28, mass: 0.7 } satisfies Transition,
  /** Larger things (cards, phone mockups) settling in. */
  settle: { type: 'spring', stiffness: 220, damping: 26, mass: 0.9 } satisfies Transition,
  /** Hover tilt follow. */
  tilt: { type: 'spring', stiffness: 300, damping: 22 } satisfies Transition,
}

export const chat = {
  /** How long "typing…" dots show before each of my bubbles (ms). */
  typingMin: 300,
  typingMax: 600,
  /** Pause after a bubble lands before the next one starts typing (ms). */
  gapAfterBubble: 140,
  /** Beat before the visitor's reply pops in, after my last bubble (ms). */
  replyDelay: 250,
  /** Delay before the "Seen" receipt under a visitor reply (ms). */
  seenDelay: 450,
  /** IntersectionObserver margin: start a thread once it's this far into the viewport. */
  viewMargin: '0px 0px -12% 0px' as const,
}

export const randomTypingMs = () =>
  chat.typingMin + Math.random() * (chat.typingMax - chat.typingMin)
