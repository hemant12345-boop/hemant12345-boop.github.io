import { StrictMode } from 'react'
import { LazyMotion, MotionConfig } from 'framer-motion'
import { SmoothScroll } from './components/SmoothScroll'
import App from './App'

const loadMotionFeatures = () => import('./design/motionFeatures').then((mod) => mod.default)

/** Shared by the browser entry (hydrate) and the build-time prerender. */
export function Root() {
  return (
    <StrictMode>
      <LazyMotion features={loadMotionFeatures} strict>
        <MotionConfig reducedMotion="user">
          <SmoothScroll>
            <App />
          </SmoothScroll>
        </MotionConfig>
      </LazyMotion>
    </StrictMode>
  )
}
