import { createRoot, hydrateRoot } from 'react-dom/client'
import './styles/index.css'
import { Root } from './Root'

const container = document.getElementById('root')!

// Production HTML is prerendered (scripts/prerender.mjs), so hydrate it; the dev server serves an empty root.
if (container.firstElementChild) hydrateRoot(container, <Root />)
else createRoot(container).render(<Root />)
