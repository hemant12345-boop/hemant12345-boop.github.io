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

/** Write a small + large webp of one image; never crops (fit: inside). */
async function responsive(src, name, smallW, largeW) {
  const small = await sharp(src).resize({ width: smallW, withoutEnlargement: true }).webp({ quality: 78 })
    .toFile(`${OUT}/${name}-${smallW}.webp`)
  await sharp(src).resize({ width: largeW, height: largeW, fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 82 }).toFile(`${OUT}/${name}-${largeW}.webp`)
  return { thumb: `/media/${name}-${smallW}.webp`, full: `/media/${name}-${largeW}.webp`, w: small.width, h: small.height }
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
}

// ── Zero1 photo: full frame, never cropped ───────────────────────────────────
const zero1 = await responsive(`${SRC}/zero1-photo.jpeg`, 'zero1-photo', 720, 1080)

// ── Reel poster (preloaded, so keep it small) + OG image ─────────────────────
{
  const src = `${SRC}/cover.jpg`
  await sharp(src).resize(720, 1280).webp({ quality: 78 }).toFile(`${OUT}/reel-poster.webp`)
  // Link previews want ~1.91:1: the headline band of the cover.
  await sharp(src).resize(1080, 1920).extract({ left: 0, top: 160, width: 1080, height: 566 })
    .jpeg({ quality: 84, mozjpeg: true }).toFile(`${OUT}/og.jpg`)
}

// ── Projects ─────────────────────────────────────────────────────────────────
const marksheet = await sharp(`${SRC}/downloads/marksheet-yt.jpg`).resize(720).webp({ quality: 78 })
  .toFile(`${OUT}/marksheet-ai-720.webp`)

const shots = async (dir, name, order) => {
  const files = await listImages(dir)
  const sorted = order ? order.map((i) => files[i]).filter(Boolean) : files
  return Promise.all(sorted.map((f, i) => responsive(f, `${name}-${i + 1}`, 300, 1080)))
}
const posesnap = await shots(`${SRC}/posesnap`, 'posesnap')
// Lead with "Block apps, manifest first": it's the whole idea of the app.
const manifest = await shots(`${SRC}/manifest`, 'manifest', [2, 0, 1])

await writeFile(
  MANIFEST,
  JSON.stringify(
    { zero1, marksheet: { src: '/media/marksheet-ai-720.webp', w: marksheet.width, h: marksheet.height }, posesnap, manifest },
    null,
    2,
  ) + '\n',
)
console.log(`done — posesnap: ${posesnap.length}, manifest: ${manifest.length}`)
