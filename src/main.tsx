import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { LazyMotion, MotionConfig } from 'framer-motion'
import '@fontsource-variable/inter/wght.css'
import './styles/index.css'
import { SmoothScroll } from './components/SmoothScroll'
import App from './App'

const loadMotionFeatures = () => import('./design/motionFeatures').then((mod) => mod.default)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LazyMotion features={loadMotionFeatures} strict>
      <MotionConfig reducedMotion="user">
        <SmoothScroll>
          <App />
        </SmoothScroll>
      </MotionConfig>
    </LazyMotion>
  </StrictMode>,
)
