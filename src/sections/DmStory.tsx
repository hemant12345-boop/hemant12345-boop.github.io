import { m } from 'framer-motion'
import { Attachment, Bubble, Thread, VisitorReply } from '../components/chat'
import { useSlot } from '../components/chat/Thread'
import { Gallery } from '../components/ui/Gallery'
import { Parallax } from '../components/ui/Parallax'
import { PhoneMockup } from '../components/ui/PhoneMockup'
import { palmonasDesigns } from '../content/media'

export function DmStory() {
  return (
    <section aria-label="How one DM got me an internship" className="flex flex-col gap-6">
      <VisitorReply>does this stuff actually work on people? 😏</VisitorReply>
      <Thread>
        <Bubble>
          Fun fact: I got my last internship from <b className="font-bold text-gold">one DM</b>.
        </Bubble>

        <Attachment bare>
          <Parallax distance={18} className="py-2">
            <PhoneMockup fullScreen className="max-w-[16.5rem]">
              <DmScreenshot />
            </PhoneMockup>
          </Parallax>
        </Attachment>

        <Bubble>
          I DM'd <b className="font-semibold">Amol Patwari</b>, founder of Palmonas, with designs inspired by their
          jewelry.
        </Bubble>
        <Bubble>He replied "Nice work"…</Bubble>
        <Bubble variant="lilac">…and I became their Graphic Design Intern 💍</Bubble>

        {palmonasDesigns.length > 0 && (
          <Attachment caption={<span className="text-muted">Some of my Palmonas work · tap to open</span>}>
            <Gallery images={palmonasDesigns} label="Palmonas designs" />
          </Attachment>
        )}
      </Thread>
    </section>
  )
}

/** The real DM (phone number blurred), with a ring that lands on "Nice work" once it's shown. */
function DmScreenshot() {
  const { shown } = useSlot()
  return (
    <div className="relative w-full">
      <img
        src="/media/dm-palmonas.webp"
        alt="My Instagram DM to Amol Patwari with Palmonas designs, and his reply: Nice work"
        width={702}
        height={1600}
        loading="lazy"
        decoding="async"
        className="h-auto w-full"
      />
      {/* "Nice work" bubble sits at ~14–39% x, 83–87% y of the screenshot. */}
      <m.span
        aria-hidden
        initial={{ opacity: 0, scale: 1.6 }}
        animate={shown ? { opacity: 1, scale: 1 } : undefined}
        transition={{ delay: 0.5, type: 'spring', stiffness: 260, damping: 18 }}
        className="absolute top-[82.3%] left-[12.6%] h-[5.6%] w-[28%] rounded-full shadow-[0_0_24px_rgb(247_183_51/0.7)] ring-[3px] ring-gold"
      />
    </div>
  )
}
