import {
  Children,
  createContext,
  isValidElement,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { m, useInView, useReducedMotion, type Variants } from 'framer-motion'
import { chat, randomTypingMs, spring } from '../../design/motion'
import { typingStore } from '../../hooks/typingStore'
import { useTurn } from '../../hooks/conversation'
import { Avatar } from './Avatar'
import { TypingDots } from './TypingDots'

/** Where a bubble sits in its run (to square off joined corners) and whether it has landed yet. */
type SlotInfo = { first: boolean; last: boolean; shown: boolean }
const SlotContext = createContext<SlotInfo>({ first: true, last: true, shown: true })
export const useSlot = () => useContext(SlotContext)

const bubbleVariants: Variants = {
  hidden: { opacity: 0, scale: 0.6, y: 10 },
  shown: { opacity: 1, scale: 1, y: 0, transition: spring.pop },
}

/** Big things (phone mockups, cards) settle in instead of popping from 60%. */
const settleVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9, y: 28 },
  shown: { opacity: 1, scale: 1, y: 0, transition: spring.settle },
}

/** Components can opt into the settle reveal with a static `reveal = 'settle'`. */
const revealOf = (child: ReactNode) =>
  isValidElement(child) && (child.type as { reveal?: string }).reveal === 'settle' ? settleVariants : bubbleVariants

type Props = {
  children: ReactNode
  /** Show the first N messages straight away, no typing (the hero headline, for a fast LCP). */
  instant?: number
  className?: string
}

/**
 * A run of my messages. When it scrolls into view (and it's its turn — see
 * hooks/conversation.ts), each child plays typing dots (300–600ms) → bubble
 * springs in, one after another.
 *
 * Every bubble is rendered up front (just invisible) so its space is
 * reserved: nothing below jumps when messages land (zero CLS), and the
 * text is in the DOM for crawlers and screen readers.
 */
export function Thread({ children, instant = 0, className = '' }: Props) {
  const items = Children.toArray(children)
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: chat.viewMargin })
  const [myTurn, finishTurn] = useTurn(inView)
  const reduce = useReducedMotion()
  const avatarId = useId()

  const [shown, setShown] = useState(instant)
  const [typing, setTyping] = useState(false)

  useEffect(() => {
    if (!myTurn) return
    if (shown >= items.length) {
      finishTurn()
      return
    }
    if (reduce) {
      setShown(items.length)
      return
    }
    let typingTimer: number | undefined
    const startTimer = window.setTimeout(
      () => {
        setTyping(true)
        typingTimer = window.setTimeout(() => {
          setTyping(false)
          setShown((s) => s + 1)
        }, randomTypingMs())
      },
      shown === 0 ? 0 : chat.gapAfterBubble,
    )
    return () => {
      window.clearTimeout(startTimer)
      window.clearTimeout(typingTimer)
    }
  }, [myTurn, shown, items.length, reduce, finishTurn])

  // Tell the header I'm typing.
  useEffect(() => {
    if (!typing) return
    typingStore.start()
    return () => typingStore.stop()
  }, [typing])

  // The avatar rides next to whichever slot is active: the one being typed, else the latest bubble.
  const activeIndex = typing ? shown : shown - 1

  return (
    <div ref={ref} role="group" aria-label="Hemant" className={`flex flex-col gap-1 ${className}`}>
      {items.map((child, i) => {
        const status = i < shown ? 'shown' : typing && i === shown ? 'typing' : 'hidden'
        return (
          <div key={i} className="grid grid-cols-[28px_minmax(0,1fr)] items-end gap-2">
            <div className="h-7">
              {i === activeIndex && (
                <m.div layoutId={avatarId} transition={spring.settle}>
                  <Avatar size={28} />
                </m.div>
              )}
            </div>
            <div className="relative">
              {status === 'typing' && <TypingDots className="absolute top-0 left-0" />}
              <m.div
                initial={false}
                animate={status === 'shown' ? 'shown' : 'hidden'}
                variants={revealOf(child)}
                style={{ originX: 0, originY: 1 }}
              >
                <SlotContext.Provider value={{ first: i === 0, last: i === items.length - 1, shown: status === 'shown' }}>
                  {child}
                </SlotContext.Provider>
              </m.div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
