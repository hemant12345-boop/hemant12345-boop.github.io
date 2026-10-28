import { useEffect, useState } from 'react'

/** "scroll ↓" pill pinned to the bottom of the first screen; gone after the first scroll. */
export function ScrollHint() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 24) {
        setVisible(false)
        window.removeEventListener('scroll', onScroll)
      }
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      aria-hidden
      className={`pointer-events-none fixed inset-x-0 bottom-[max(1.25rem,env(safe-area-inset-bottom))] z-40 flex justify-center transition-[opacity,transform] duration-base ease-out-expo ${
        visible ? 'opacity-100' : 'translate-y-3 opacity-0'
      }`}
    >
      <span className="flex items-center gap-1.5 rounded-full bg-glass px-4 py-2 text-xs font-semibold tracking-wide text-ink-2 ring-1 ring-hairline-strong backdrop-blur-xl">
        scroll
        <span className="inline-block animate-bounce">↓</span>
      </span>
    </div>
  )
}
