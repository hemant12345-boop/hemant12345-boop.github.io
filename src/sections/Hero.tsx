import { Bubble, Thread } from '../components/chat'
import type { Variant } from '../content/variant'

export function Hero({ variant }: { variant: Variant }) {
  return (
    <section aria-label="Intro">
      {/* Headline is shown instantly (transform-only rise) so it can be the LCP; the rest types in. */}
      <Thread>
        <Bubble instant variant="display" className="animate-rise">
          <h1>
            Hey, I'm{' '}
            <span className="whitespace-nowrap">
              <span className="text-gradient-sent">Hemant</span>{' '}
              <span className="inline-block origin-[70%_80%] motion-safe:animate-wave">👋</span>
            </span>
          </h1>
        </Bubble>
        <Bubble>4th-year engineering student from Jamshedpur.</Bubble>
        <Bubble variant="lilac">
          {variant === 'wingy'
            ? 'I make things people stop scrolling for.'
            : 'I build apps, design, and make videos people stop scrolling for.'}
        </Bubble>
      </Thread>
    </section>
  )
}
