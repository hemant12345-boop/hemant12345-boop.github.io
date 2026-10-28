import { useCallback, useEffect, useState, useSyncExternalStore } from 'react'

/**
 * Turn-taking for the whole page, so messages arrive in order like a real chat.
 *
 * Every Thread / VisitorReply takes a ticket when it mounts (render order =
 * document order). Once it's in view it becomes "waiting", and it may play
 * only when no earlier ticket is still waiting or playing. Turns that never
 * scrolled into view (e.g. visitor jumped to #contact) don't block anyone.
 */
type State = 'idle' | 'waiting' | 'done'

let nextTicket = 0
const states = new Map<number, State>()
const listeners = new Set<() => void>()
let version = 0
const emit = () => {
  version++
  listeners.forEach((l) => l())
}
const subscribe = (l: () => void) => {
  listeners.add(l)
  return () => listeners.delete(l)
}

function isMyTurn(ticket: number) {
  for (const [t, s] of states) if (t < ticket && s === 'waiting') return false
  return true
}

/** Returns [mayPlay, finish]. Call finish() when this turn's animation is over. */
export function useTurn(inView: boolean): [boolean, () => void] {
  const [ticket] = useState(() => nextTicket++)
  useSyncExternalStore(subscribe, () => version)

  useEffect(() => {
    states.set(ticket, states.get(ticket) ?? 'idle')
    return () => {
      states.delete(ticket)
      emit()
    }
  }, [ticket])

  useEffect(() => {
    if (inView && states.get(ticket) === 'idle') {
      states.set(ticket, 'waiting')
      emit()
    }
  }, [inView, ticket])

  // Stable, so callers can list it in effect deps without restarting their timers.
  const finish = useCallback(() => {
    if (states.get(ticket) === 'done') return
    states.set(ticket, 'done')
    emit()
  }, [ticket])

  return [inView && isMyTurn(ticket), finish]
}
