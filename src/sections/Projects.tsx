import { useState, type ReactNode } from 'react'
import { Attachment, Bubble, Thread, VisitorReply } from '../components/chat'
import { Button } from '../components/ui/Button'
import { Gallery } from '../components/ui/Gallery'
import { MARKSHEET_AI_VIDEO, POSESNAP_PLAY, SUBCONSCIOUS_PLAY } from '../content/links'
import { manifestShots, marksheetThumb, posesnapShots } from '../content/media'

export function Projects() {
  return (
    <section aria-label="Things I've built" className="flex flex-col gap-6">
      <VisitorReply seen>show me the projects 👀</VisitorReply>
      <Thread>
        <Bubble>Things I've built 🛠️</Bubble>

        <Attachment>
          <YouTubeLite id="ivkFEzrzL7g" title="Marksheet AI demo" />
          <ProjectInfo
            name="Marksheet AI"
            tag="VLM · Automation"
            blurb="VLM-based automation for checking answer sheets."
            action={
              <Button href={MARKSHEET_AI_VIDEO} variant="secondary" size="sm" icon="▶">
                Watch on YouTube
              </Button>
            }
          />
        </Attachment>

        <Attachment>
          <Gallery images={posesnapShots} label="PoseSnap screenshots" itemClassName="w-[38%]" className="pb-0" />
          <ProjectInfo
            name="PoseSnap"
            tag="Android · Camera"
            blurb="Camera app with real-time pose guidance for better pictures."
            action={<PlayStoreButton href={POSESNAP_PLAY} />}
          />
        </Attachment>

        <Attachment>
          <Gallery images={manifestShots} label="Subconscious Unlock screenshots" itemClassName="w-[38%]" className="pb-0" />
          <ProjectInfo
            name="Subconscious Unlock"
            tag="Android · Wellbeing"
            blurb="Manifestation app that locks your phone until you say your affirmations."
            action={<PlayStoreButton href={SUBCONSCIOUS_PLAY} />}
          />
        </Attachment>
      </Thread>
    </section>
  )
}

function ProjectInfo({ name, tag, blurb, action }: { name: string; tag: string; blurb: string; action: ReactNode }) {
  return (
    <div className="flex flex-col gap-2 px-4 pt-3 pb-4">
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="text-lg font-extrabold tracking-tighter">{name}</h3>
        <span className="text-xs font-medium whitespace-nowrap text-muted">{tag}</span>
      </div>
      <p className="text-[15px] leading-snug text-ink-2">{blurb}</p>
      <div className="pt-1">{action}</div>
    </div>
  )
}

function PlayStoreButton({ href }: { href: string }) {
  return (
    <Button href={href} variant="secondary" size="sm" icon={<PlayIcon />}>
      Get it on Google Play
    </Button>
  )
}

function PlayIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M5 3.5v17a1 1 0 0 0 1.5.86l14.2-8.5a1 1 0 0 0 0-1.72L6.5 2.64A1 1 0 0 0 5 3.5Z" />
    </svg>
  )
}

/** Thumbnail + play button; the real YouTube iframe (≈1 MB of JS) only loads on tap. */
function YouTubeLite({ id, title }: { id: string; title: string }) {
  const [playing, setPlaying] = useState(false)
  return (
    <div className="relative aspect-video w-full bg-black">
      {playing ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&playsinline=1`}
          title={title}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
          className="absolute inset-0 size-full"
        />
      ) : (
        <button type="button" onClick={() => setPlaying(true)} aria-label={`Play: ${title}`} className="group absolute inset-0">
          <img
            src={marksheetThumb.src}
            alt=""
            width={marksheetThumb.w}
            height={marksheetThumb.h}
            loading="lazy"
            decoding="async"
            className="size-full object-cover opacity-80 transition-opacity group-hover:opacity-100"
          />
          <span className="absolute inset-0 grid place-items-center">
            <span className="grid size-14 place-items-center rounded-full bg-sent pl-1 text-xl text-white shadow-sent transition-transform duration-base ease-out-expo group-hover:scale-110 group-active:scale-95">
              ▶
            </span>
          </span>
        </button>
      )}
    </div>
  )
}
