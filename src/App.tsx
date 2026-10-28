import { ChatHeader, DayDivider, VisitorReply } from './components/chat'
import { ScrollHint } from './components/ScrollHint'
import { Hero } from './sections/Hero'
import { ReelSection } from './sections/ReelSection'

export default function App() {
  return (
    <>
      <ChatHeader />
      <main className="mx-auto flex max-w-chat flex-col gap-6 px-gutter pt-2 pb-32">
        <DayDivider>Today 9:41 AM</DayDivider>
        <Hero />
        <ReelSection />
        {/* Phase 3 picks up from here: About, DM story, projects, Zero1, CTA. */}
        <VisitorReply seen>ok who are you?</VisitorReply>
      </main>
      <ScrollHint />
    </>
  )
}
