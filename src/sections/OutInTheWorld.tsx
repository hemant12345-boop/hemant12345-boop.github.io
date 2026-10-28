import { useState } from 'react'
import { Attachment, Bubble, Thread, VisitorReply } from '../components/chat'
import { Lightbox } from '../components/ui/Lightbox'
import { Parallax } from '../components/ui/Parallax'
import { zero1 } from '../content/media'

export function OutInTheWorld() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section aria-label="Out in the world" className="flex flex-col gap-6">
      <VisitorReply>and when you're not at your laptop?</VisitorReply>
      <Thread>
        <Attachment>
          {/* Full photo, never cropped: the card takes the image's own aspect ratio. */}
          <Parallax distance={14}>
            <button type="button" onClick={() => setOpen(0)} aria-label="Open the Zero1 photo" className="block w-full">
              <img
                src={zero1.thumb}
                alt={zero1.alt}
                width={zero1.w}
                height={zero1.h}
                loading="lazy"
                decoding="async"
                className="h-auto w-full"
              />
            </button>
          </Parallax>
        </Attachment>
        <Bubble>
          Me next to a billionaire at Zero1. Combined net worth in this photo: billions. My contribution: ₹0 🙂
        </Bubble>
      </Thread>
      <VisitorReply seen>😂 fair</VisitorReply>
      <Lightbox images={[zero1]} index={open} onIndex={setOpen} />
    </section>
  )
}
