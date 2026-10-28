import { renderToString } from 'react-dom/server'
import { Root } from './Root'

/** Build-time prerender: the page's initial HTML, so the hero and reel paint before any JS runs. */
export function render() {
  return renderToString(<Root />)
}
