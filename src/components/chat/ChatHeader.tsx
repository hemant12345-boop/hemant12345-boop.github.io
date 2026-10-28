import { AnimatePresence, m } from 'framer-motion'
import { useIsTyping } from '../../hooks/typingStore'
import { Avatar } from './Avatar'
import { Button } from '../ui/Button'

/** Sticky DM-style header: avatar, "Hemant · online" (flips to "typing…"). */
export function ChatHeader() {
  const typing = useIsTyping()

  return (
    <header className="sticky top-0 z-50 border-b border-hairline bg-glass backdrop-blur-xl backdrop-saturate-150">
      <div className="mx-auto flex h-header max-w-chat items-center gap-3 px-gutter">
        <Avatar size={36} online />
        <div className="min-w-0 flex-1 leading-tight">
          <p className="font-semibold tracking-tighter">Hemant</p>
          <div className="relative h-4 text-xs">
            <AnimatePresence mode="wait" initial={false}>
              <m.span
                key={typing ? 'typing' : 'online'}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.18 }}
                className={`absolute inset-0 ${typing ? 'text-pink' : 'text-muted'}`}
              >
                {typing ? 'typing…' : 'online'}
              </m.span>
            </AnimatePresence>
          </div>
        </div>
        <Button href="#contact" size="sm">
          Let's talk
        </Button>
      </div>
    </header>
  )
}
