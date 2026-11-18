import { Attachment, Bubble, Thread, VisitorReply } from '../components/chat'
import type { Variant } from '../content/variant'

const roles = [
  { icon: '📱', title: 'Indie app builder', note: '2 apps live on the Play Store' },
  { icon: '🎨', title: 'Designer', note: "Worked 2 months as a graphic design intern with Palmonas' social media team" },
  { icon: '🎬', title: 'Video maker', note: 'That reel up there ☝️' },
]

// The main page has no reel, so no Video maker row.
const rolesFor = (variant: Variant) => (variant === 'wingy' ? roles : roles.filter((r) => r.title !== 'Video maker'))

export function About({ variant }: { variant: Variant }) {
  return (
    <section aria-label="About me" className="flex flex-col gap-6">
      <h2 className="sr-only">About me</h2>
      {/* Main page: this follows the hero directly, so the visitor asks for more instead. */}
      <VisitorReply seen>{variant === 'wingy' ? 'ok who are you?' : 'nice 👋 tell me more'}</VisitorReply>
      <Thread>
        <Bubble>
          4th-year engineering student 🎓 Mechanical Engineering at Chaibasa Engineering College.
        </Bubble>
        <Bubble>Based in Jamshedpur 📍</Bubble>
        <Bubble>But mostly, I make things:</Bubble>
        <Attachment>
          <ul className="divide-y divide-hairline">
            {rolesFor(variant).map((r) => (
              <li key={r.title} className="flex items-center gap-3 px-4 py-3">
                <span aria-hidden className="grid size-10 shrink-0 place-items-center rounded-xl bg-white/10 text-xl">
                  {r.icon}
                </span>
                <span className="leading-tight">
                  <span className="block font-semibold tracking-tighter">{r.title}</span>
                  <span className="text-sm text-muted">{r.note}</span>
                </span>
              </li>
            ))}
          </ul>
        </Attachment>
      </Thread>
    </section>
  )
}
