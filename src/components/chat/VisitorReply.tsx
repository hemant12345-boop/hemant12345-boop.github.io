import { useRef, type ReactNode } from 'react'
import { m, useInView } from 'framer-motion'
import { chat, spring } from '../../design/motion'
import { useTurn } from '../../hooks/conversation'

type Props = {
  children: ReactNode
  /** Show a little "Seen" receipt under the bubble. */
  seen?: boolean
  className?: string
}

/**
 * The visitor's side of the conversation (right, pink gradient, like a sent DM).
 * Used as section transitions: "ok who are you?", "show me the projects 👀".
 */
export function VisitorReply({ children, seen = false, className = '' }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: chat.viewMargin })
  const [myTurn, finishTurn] = useTurn(inView)

  return (
    <div ref={ref} className={`flex flex-col items-end gap-1 ${className}`}>
      <m.p
        initial={{ opacity: 0, scale: 0.6, y: 10 }}
        animate={myTurn ? { opacity: 1, scale: 1, y: 0 } : undefined}
        transition={{ ...spring.pop, delay: chat.replyDelay / 1000 }}
        // Framer also fires this on mount (settling `initial`), so only count the real pop.
        onAnimationComplete={() => myTurn && finishTurn()}
        style={{ originX: 1, originY: 1 }}
        className="chat-slot w-fit max-w-[80%] rounded-bubble rounded-br-tail bg-sent px-4 py-2.5 text-bubble font-medium text-white shadow-sent"
      >
        <span className="sr-only">You: </span>
        {children}
      </m.p>
      {seen && (
        <m.span
          initial={{ opacity: 0 }}
          animate={myTurn ? { opacity: 1 } : undefined}
          transition={{ delay: (chat.replyDelay + chat.seenDelay) / 1000, duration: 0.3 }}
          className="pr-1 text-xs text-muted"
        >
          Seen
        </m.span>
      )}
    </div>
  )
}
