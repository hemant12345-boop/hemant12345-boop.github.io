import { createRoot, hydrateRoot } from 'react-dom/client'
import './styles/index.css'
import { Root } from './Root'
import { variantOf } from './content/variant'

const container = document.getElementById('root')!
const variant = variantOf(container)

// Production HTML is prerendered (scripts/prerender.mjs), so hydrate it; the dev server serves an empty root.
if (container.firstElementChild) hydrateRoot(container, <Root variant={variant} />)
else createRoot(container).render(<Root variant={variant} />)
