import type { ReactNode } from 'react'
import { useSlot } from './Thread'

type Props = {
  children: ReactNode
  /** Optional caption row under the media, like a link preview. */
  caption?: ReactNode
  /** Drop the card chrome (e.g. a phone mockup brings its own frame). */
  bare?: boolean
  /** Visible from first paint, no typing (read by <Thread>). */
  instant?: boolean
  className?: string
}

/** A media/card message in my thread: projects, phone mockups, galleries. */
export function Attachment({ children, caption, bare = false, className = '' }: Props) {
  const { first } = useSlot()
  if (bare) return <div className={`w-full ${className}`}>{children}</div>
  return (
    <div
      className={`w-full max-w-[22rem] overflow-hidden rounded-card rounded-bl-tail border border-hairline bg-bubble shadow-card ${
        first ? '' : 'rounded-tl-tail'
      } ${className}`}
    >
      {children}
      {caption && <div className="px-4 py-3 text-[15px] leading-snug text-ink-2">{caption}</div>}
    </div>
  )
}
Attachment.reveal = 'settle' as const
