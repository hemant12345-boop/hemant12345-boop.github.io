import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, m, useReducedMotion } from 'framer-motion'
import { media } from '../../content/links'
import { spring } from '../../design/motion'
import { useSlot } from '../chat/Thread'

/**
 * The Wingy reel. Muted autoplay + loop while it's on screen (paused off screen,
 * so it doesn't eat battery or bandwidth), with a big "tap for sound" button that
 * restarts it from the top with audio. Nothing downloads until it's first visible.
 * Reduced motion: no autoplay, just the poster and a play button.
 */
export function ReelPlayer() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const barRef = useRef<HTMLSpanElement>(null)
  const reduce = useReducedMotion()
  // Don't start (or download) until my message carrying the phone has actually landed.
  const { shown: revealed } = useSlot()
  const [withSound, setWithSound] = useState(false)
  const [paused, setPaused] = useState(true)

  // Autoplay (muted) only once revealed and while ≥ 50% visible.
  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    v.muted = true // React doesn't reliably set the muted attribute; iOS needs it for autoplay.
    if (reduce || !revealed) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) v.play().catch(() => {})
        else v.pause()
      },
      { threshold: 0.5 },
    )
    io.observe(v)
    return () => io.disconnect()
  }, [reduce, revealed])

  // Progress bar driven by rAF (timeupdate only fires ~4×/s and looks choppy).
  useEffect(() => {
    if (paused) return
    let raf = 0
    const tick = () => {
      const v = videoRef.current
      if (v && barRef.current && v.duration) {
        barRef.current.style.transform = `scaleX(${v.currentTime / v.duration})`
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [paused])

  const playWithSound = () => {
    const v = videoRef.current
    if (!v) return
    v.muted = false
    v.currentTime = 0
    v.play().catch(() => {})
    setWithSound(true)
  }

  const togglePlay = () => {
    const v = videoRef.current
    if (!v) return
    if (v.paused) v.play().catch(() => {})
    else v.pause()
  }

  const toggleMute = () => {
    const v = videoRef.current
    if (!v) return
    v.muted = !v.muted
    setWithSound(!v.muted)
  }

  return (
    <div className="absolute inset-0 bg-plum-900">
      <video
        ref={videoRef}
        src={media.reel}
        poster={media.reelPoster}
        muted
        loop
        playsInline
        preload="none"
        aria-label="Wingy reel: She sent it to his MOM. Animated by Hemant."
        className="size-full object-cover"
        onPlay={() => setPaused(false)}
        onPause={() => setPaused(true)}
        onClick={withSound ? togglePlay : playWithSound}
      />

      {/* progress */}
      <span aria-hidden className="absolute inset-x-0 bottom-0 h-[3px] bg-white/20">
        <span ref={barRef} className="block h-full origin-left scale-x-0 bg-white" />
      </span>

      <AnimatePresence>
        {!withSound && (
          <m.button
            type="button"
            key="sound"
            onClick={playWithSound}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={spring.pop}
            className="absolute bottom-6 left-1/2 flex h-12 -translate-x-1/2 items-center gap-2 rounded-full bg-white px-5 text-[15px] font-bold tracking-tighter whitespace-nowrap text-plum-800 shadow-[0_10px_30px_-6px_rgb(0_0_0/0.6)] active:scale-[0.97]"
          >
            <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-white/50 motion-reduce:hidden [animation-duration:2s]" />
            {reduce ? '▶ play with sound' : 'tap for sound 🔊'}
          </m.button>
        )}
      </AnimatePresence>

      {withSound && (
        <div className="absolute top-3 right-3 flex gap-2">
          <IconButton label={paused ? 'Play' : 'Pause'} onClick={togglePlay}>
            {paused ? '▶' : '❚❚'}
          </IconButton>
          {/* Muting brings back the big "tap for sound" button, which is the unmute. */}
          <IconButton label="Mute" onClick={toggleMute}>
            🔇
          </IconButton>
        </div>
      )}
    </div>
  )
}

function IconButton({ label, onClick, children }: { label: string; onClick: () => void; children: string }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="grid size-9 place-items-center rounded-full bg-black/45 text-xs text-white backdrop-blur-md active:scale-95"
    >
      {children}
    </button>
  )
}
