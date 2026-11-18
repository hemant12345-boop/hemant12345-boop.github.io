import { renderToString } from 'react-dom/server'
import { Root } from './Root'
import type { Variant } from './content/variant'

/** Build-time prerender: the page's initial HTML, so the hero (and on /wingy/ the reel) paint before any JS runs. */
export function render(variant: Variant) {
  return renderToString(<Root variant={variant} />)
}
