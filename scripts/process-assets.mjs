// Image pipeline: raw sources in assets-src/ (git-ignored, never deployed)
// → optimized files in public/media/ + a manifest the app imports.
// Run: node scripts/process-assets.mjs
import sharp from 'sharp'
import { existsSync } from 'node:fs'
import { mkdir, readdir, writeFile } from 'node:fs/promises'
import path from 'node:path'

const SRC = 'assets-src'
const OUT = 'public/media'
const MANIFEST = 'src/content/media.generated.json'
await mkdir(OUT, { recursive: true })

const IMG = /\.(jpe?g|png|webp|avif)$/i
const listImages = async (dir) =>
  existsSync(dir) ? (await readdir(dir)).filter((f) => IMG.test(f)).sort().map((f) => path.join(dir, f)) : []

/**
 * In-page widths (for srcset) + one large copy for the lightbox. Never crops (fit: inside).
 * `thumb` is the largest in-page width, the src fallback.
 */
async function responsive(src, name, widths, largeW) {
  const sizes = []
  for (const w of widths) {
    const info = await sharp(src).resize({ width: w, withoutEnlargement: true }).webp({ quality: 78 })
      .toFile(`${OUT}/${name}-${w}.webp`)
    sizes.push({ url: `/media/${name}-${w}.webp`, info })
  }
  await sharp(src).resize({ width: largeW, height: largeW, fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 82 }).toFile(`${OUT}/${name}-${largeW}.webp`)
  const base = sizes.at(-1)
  return {
    thumb: base.url,
    srcset: sizes.map((x) => `${x.url} ${x.info.width}w`).join(', '),
    full: `/media/${name}-${largeW}.webp`,
    w: base.info.width,
    h: base.info.height,
  }
}

// ── DM screenshot: destroy the phone number only (Drive link stays readable) ──
{
  const src = `${SRC}/dm-palmonas.jpeg`
  const box = { left: 205, top: 1140, width: 185, height: 44 } // "9263541737" in the purple bubble (702×1600)
  // Pixelate first (downscale to a few px = the digits are gone), then blur the blocks smooth.
  const patch = await sharp(src).extract(box).resize(6, 2, { kernel: 'cubic' })
    .resize(box.width, box.height, { kernel: 'cubic' }).blur(6).toBuffer()
  const blurred = sharp(src).composite([{ input: patch, left: box.left, top: box.top }])
  await blurred.clone().webp({ quality: 86 }).toFile(`${OUT}/dm-palmonas.webp`)
  // Shown ~250 css px wide: 480w covers up to ~2x screens, the 702w original covers 3x.
  await blurred.clone().resize(480).webp({ quality: 84 }).toFile(`${OUT}/dm-palmonas-480.webp`)
}

// ── Zero1 photo: full frame, never cropped ───────────────────────────────────
const zero1 = await responsive(`${SRC}/zero1-photo.jpeg`, 'zero1-photo', [480, 720], 1080)

// ── Reel poster (preloaded, so keep it small) + OG image ─────────────────────
{
  const src = `${SRC}/cover.jpg`
  await sharp(src).resize(720, 1280).webp({ quality: 78 }).toFile(`${OUT}/reel-poster.webp`)
  // Link previews want ~1.91:1: the headline band of the cover.
  await sharp(src).resize(1080, 1920).extract({ left: 0, top: 160, width: 1080, height: 566 })
    .jpeg({ quality: 84, mozjpeg: true }).toFile(`${OUT}/og.jpg`)
}

// ── Projects ─────────────────────────────────────────────────────────────────
const marksheet = await responsive(`${SRC}/downloads/marksheet-yt.jpg`, 'marksheet-ai', [480, 720], 720) // in-page only, no lightbox copy

const shots = async (dir, name, order) => {
  const files = await listImages(dir)
  const sorted = order ? order.map((i) => files[i]).filter(Boolean) : files
  return Promise.all(sorted.map((f, i) => responsive(f, `${name}-${i + 1}`, [220, 300], 1080)))
}
const posesnap = await shots(`${SRC}/posesnap`, 'posesnap')
// Lead with "Block apps, manifest first": it's the whole idea of the app.
const manifest = await shots(`${SRC}/manifest`, 'manifest', [2, 0, 1])

await writeFile(
  MANIFEST,
  JSON.stringify(
    { zero1, marksheet, posesnap, manifest },
    null,
    2,
  ) + '\n',
)
console.log(`done — posesnap: ${posesnap.length}, manifest: ${manifest.length}`)
