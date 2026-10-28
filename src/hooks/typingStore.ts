import { useSyncExternalStore } from 'react'

/**
 * Tiny global store: how many threads are "typing" right now.
 * Lets the sticky header flip from "online" to "typing…" while any
 * of my messages are being typed further down the page.
 */
let active = 0
const listeners = new Set<() => void>()
const emit = () => listeners.forEach((l) => l())

export const typingStore = {
  start() {
    active++
    emit()
  },
  stop() {
    active = Math.max(0, active - 1)
    emit()
  },
}

const subscribe = (l: () => void) => {
  listeners.add(l)
  return () => listeners.delete(l)
}

export const useIsTyping = () =>
  useSyncExternalStore(subscribe, () => active > 0, () => false) // nobody types during prerender
