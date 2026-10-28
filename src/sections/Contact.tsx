import { Attachment, Bubble, Thread } from '../components/chat'
import { Button } from '../components/ui/Button'
import { EMAIL, GITHUB, INSTAGRAM_PROFILE, LINKEDIN } from '../content/links'

const mailto = `mailto:${EMAIL}?subject=${encodeURIComponent('Hey Hemant 👋')}`

export function Contact() {
  return (
    <section id="contact" aria-label="Contact" className="flex scroll-mt-24 flex-col gap-6">
      <Thread>
        <Bubble className="text-title font-display font-extrabold tracking-tightest">So… should we talk? 😄</Bubble>
        <Attachment>
          <div className="flex flex-col gap-2.5 p-4">
            <Button href={INSTAGRAM_PROFILE} size="lg" className="w-full" icon={<InstagramIcon />}>
              DM me on Instagram
            </Button>
            <Button href={mailto} variant="gold" className="w-full" icon="✉️">
              {EMAIL}
            </Button>
            <div className="grid grid-cols-2 gap-2.5">
              <Button href={LINKEDIN} variant="secondary" icon={<LinkedInIcon />}>
                LinkedIn
              </Button>
              <Button href={GITHUB} variant="secondary" icon={<GitHubIcon />}>
                GitHub
              </Button>
            </div>
          </div>
        </Attachment>
      </Thread>

      <footer className="pt-10 text-center text-sm text-faint">Built by me, with Claude Code.</footer>
    </section>
  )
}

function InstagramIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4V21H3V9.75Zm6.5 0h3.8v1.6h.06c.53-1 1.84-2.06 3.79-2.06 4.05 0 4.8 2.67 4.8 6.13V21h-4v-4.98c0-1.19-.02-2.72-1.66-2.72-1.66 0-1.92 1.3-1.92 2.63V21h-4V9.75Z" />
    </svg>
  )
}

function GitHubIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02a9.6 9.6 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.75c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
    </svg>
  )
}
