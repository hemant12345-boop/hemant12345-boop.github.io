import { useRef } from 'react'
import { m, useScroll, useTransform } from 'framer-motion'
import { Attachment, Avatar, Bubble, Thread } from '../components/chat'
import { Button } from '../components/ui/Button'
import { PhoneMockup, StatusBar } from '../components/ui/PhoneMockup'
import { Tilt } from '../components/ui/Tilt'
import { ProcessStrip } from '../components/reel/ProcessStrip'
import { ReelPlayer } from '../components/reel/ReelPlayer'
import { instagramReelHref } from '../content/links'

export function ReelSection() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const glowY = useTransform(scrollYProgress, [0, 1], [-60, 60])

  return (
    <section ref={ref} id="reel" aria-label="The Wingy reel" className="relative">
      {/* Parallax glow behind the phone (gradient, not filter blur: cheap to paint). */}
      <m.div
        aria-hidden
        style={{ y: glowY }}
        className="pointer-events-none absolute inset-x-[-20%] top-24 -z-10 h-[34rem] bg-[radial-gradient(closest-side,rgb(240_80_154/0.35),transparent)]"
      />
      <Thread>
        <Bubble>
          I made this for <b className="font-bold text-gold">Wingy</b> 👀
        </Bubble>

        {/* The reel is the point of the page: on screen from the first paint, autoplaying when visible. */}
        <Attachment bare instant className="animate-rise">
          <Tilt className="py-2">
            <PhoneMockup top={<StatusBar />} bottom={<ReelBottomBar />}>
              <ReelPlayer />
            </PhoneMockup>
          </Tilt>
        </Attachment>

        <Bubble>
          Animated in code — <b className="font-semibold text-pink">Remotion + Claude Code + ElevenLabs</b>.
        </Bubble>
        <Bubble>Story, voices, lip-sync rig, all built by me.</Bubble>

        <Attachment>
          <ProcessStrip />
        </Attachment>

        <Button href={instagramReelHref} variant="gold" icon={<InstagramIcon />}>
          Watch on Instagram
        </Button>
      </Thread>
    </section>
  )
}

function ReelBottomBar() {
  return (
    <div aria-hidden className="flex flex-col gap-1 px-3.5 pb-3 text-white">
      <div className="flex items-center gap-2">
        <Avatar size={22} />
        <span className="text-[12px] font-semibold">i.m.hemant_mahato</span>
        <span className="rounded-md border border-white/40 px-1.5 py-px text-[10px] font-semibold">Follow</span>
      </div>
      <p className="truncate text-[11px] text-white/70">♫ Wingy · Original audio</p>
    </div>
  )
}

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  )
}
