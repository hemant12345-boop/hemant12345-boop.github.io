import generated from './media.generated.json'
import type { LightboxImage } from '../components/ui/Lightbox'
import { asset, assetSrcset } from './asset'

/** Typed view over the manifest written by scripts/process-assets.mjs, plus alt text and base-aware URLs. */
type Img = { thumb: string; srcset: string; full: string; w: number; h: number }
const resolve = (img: Img): Img => ({ ...img, thumb: asset(img.thumb), srcset: assetSrcset(img.srcset), full: asset(img.full) })
const withAlt = (imgs: Img[], alt: (i: number) => string): LightboxImage[] =>
  imgs.map((img, i) => ({ ...resolve(img), alt: alt(i) }))

export const zero1: LightboxImage = {
  ...resolve(generated.zero1),
  alt: 'Hemant at the Zero1 event, standing between two speakers in front of a Zero1 backdrop',
}

export const marksheetThumb = resolve(generated.marksheet)

const posesnapAlts = [
  'PoseSnap: live pose guides for the perfect shot',
  'PoseSnap: premium pose packs for every occasion',
  'PoseSnap: dozens of poses to pick from',
]
export const posesnapShots = withAlt(generated.posesnap, (i) => posesnapAlts[i] ?? `PoseSnap screenshot ${i + 1}`)

const manifestAlts = [
  'Subconscious Unlock: complete your affirmations to unlock your phone',
  'Subconscious Unlock: daily affirmations that transform your mindset',
  'Subconscious Unlock: easy setup, works on all Android devices',
]
export const manifestShots = withAlt(generated.manifest, (i) => manifestAlts[i] ?? `Subconscious Unlock screenshot ${i + 1}`)
