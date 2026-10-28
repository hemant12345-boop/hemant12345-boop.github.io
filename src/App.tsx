import { ChatHeader, DayDivider } from './components/chat'
import { ScrollHint } from './components/ScrollHint'
import { About } from './sections/About'
import { Contact } from './sections/Contact'
import { DmStory } from './sections/DmStory'
import { Hero } from './sections/Hero'
import { OutInTheWorld } from './sections/OutInTheWorld'
import { Projects } from './sections/Projects'
import { ReelSection } from './sections/ReelSection'

export default function App() {
  return (
    <>
      <ChatHeader />
      <main className="mx-auto flex max-w-chat flex-col gap-6 px-gutter pt-2 pb-16">
        <DayDivider>Today 9:41 AM</DayDivider>
        <Hero />
        <ReelSection />
        <About />
        <DmStory />
        <Projects />
        <OutInTheWorld />
        <Contact />
      </main>
      <ScrollHint />
    </>
  )
}
