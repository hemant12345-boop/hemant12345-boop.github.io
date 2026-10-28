import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, m } from 'framer-motion'
import { setScrollLocked } from '../SmoothScroll'
import { ease } from '../../design/motion'

export type LightboxImage = { full: string; thumb: string; srcset?: string; w: number; h: number; alt: string }

type Props = {
  images: LightboxImage[]
  /** Index to show, or null when closed. */
  index: number | null
  onIndex: (i: number | null) => void
}

/**
 * Full-screen image viewer. Esc / backdrop / ✕ closes; ← → or swipe to move.
 * Focus goes to the close button on open and back to the opener on close.
 * Portaled to <body>: chat bubbles are transformed, which would break position: fixed.
 */
export function Lightbox({ images, index, onIndex }: Props) {
  const open = index !== null
  const closeRef = useRef<HTMLButtonElement>(null)
  const openerRef = useRef<HTMLElement | null>(null)
  const [dir, setDir] = useState(0)
  // document.body doesn't exist during the build-time prerender; portal only once mounted.
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const go = useCallback(
    (step: number) => {
      if (index === null) return
      setDir(step)
      onIndex((index + step + images.length) % images.length)
    },
    [index, images.length, onIndex],
  )

  useEffect(() => {
    if (!open) return
    openerRef.current = document.activeElement as HTMLElement
    setScrollLocked(true)
    closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onIndex(null)
      if (e.key === 'ArrowRight') go(1)
      if (e.key === 'ArrowLeft') go(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      setScrollLocked(false)
      openerRef.current?.focus()
    }
  }, [open, go, onIndex])

  const img = index !== null ? images[index] : null

  if (!mounted) return null
  return createPortal(
    <AnimatePresence>
      {img && (
        <m.div
          key="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-plum-950/92 backdrop-blur-md"
          onClick={() => onIndex(null)}
        >
          <AnimatePresence mode="popLayout" initial={false} custom={dir}>
            <m.img
              key={img.full}
              src={img.full}
              alt={img.alt}
              width={img.w}
              height={img.h}
              custom={dir}
              initial={{ opacity: 0, x: dir * 60, scale: 0.96 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: dir * -60, scale: 0.96 }}
              transition={{ duration: 0.35, ease: ease.outExpo }}
              drag={images.length > 1 ? 'x' : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.6}
              onDragEnd={(_, info) => {
                if (info.offset.x < -60) go(1)
                else if (info.offset.x > 60) go(-1)
              }}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[86dvh] w-auto max-w-[92vw] touch-pan-y rounded-2xl object-contain shadow-card select-none"
              draggable={false}
            />
          </AnimatePresence>

          <button
            ref={closeRef}
            type="button"
            aria-label="Close"
            onClick={() => onIndex(null)}
            className="absolute top-[max(1rem,env(safe-area-inset-top))] right-4 grid size-11 place-items-center rounded-full bg-white/15 text-lg text-white ring-1 ring-hairline-strong backdrop-blur-md active:scale-95"
          >
            ✕
          </button>

          {images.length > 1 && (
            <>
              <NavButton side="left" label="Previous image" onClick={() => go(-1)} />
              <NavButton side="right" label="Next image" onClick={() => go(1)} />
              <p className="absolute bottom-[max(1.25rem,env(safe-area-inset-bottom))] text-sm font-medium text-muted tabular-nums">
                {index! + 1} / {images.length}
              </p>
            </>
          )}
        </m.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}

function NavButton({ side, label, onClick }: { side: 'left' | 'right'; label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={(e) => {
        e.stopPropagation()
        onClick()
      }}
      className={`absolute top-1/2 hidden size-12 -translate-y-1/2 place-items-center rounded-full bg-white/15 text-xl text-white ring-1 ring-hairline-strong backdrop-blur-md hover:bg-white/25 sm:grid ${
        side === 'left' ? 'left-4' : 'right-4'
      }`}
    >
      {side === 'left' ? '‹' : '›'}
    </button>
  )
}
