import { Attachment, Bubble, Thread, VisitorReply } from '../components/chat'

const roles = [
  { icon: '📱', title: 'Indie app builder', note: '2 apps live on the Play Store' },
  { icon: '🎨', title: 'Designer', note: 'Graphic design intern at Palmonas' },
  { icon: '🎬', title: 'Video maker', note: 'That reel up there ☝️' },
]

export function About() {
  return (
    <section aria-label="About me" className="flex flex-col gap-6">
      <VisitorReply seen>ok who are you?</VisitorReply>
      <Thread>
        <Bubble>
          4th-year engineering student 🎓 Mechanical Engineering at Chaibasa Engineering College.
        </Bubble>
        <Bubble>Based in Jamshedpur 📍</Bubble>
        <Bubble>But mostly, I make things:</Bubble>
        <Attachment>
          <ul className="divide-y divide-hairline">
            {roles.map((r) => (
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
