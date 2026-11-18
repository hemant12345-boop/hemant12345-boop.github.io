// Generic link-preview card for the main page (public/media/og-home.jpg), in the site's palette.
// The /wingy/ page keeps og.jpg (a frame of the reel). Run: node scripts/og-card.mjs
import sharp from 'sharp'

const W = 1200
const H = 630
const font = "Inter, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif"

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#1E0A1F"/><stop offset="1" stop-color="#4A1048"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.85" cy="0.2" r="0.6">
      <stop offset="0" stop-color="#F0509A" stop-opacity="0.35"/><stop offset="1" stop-color="#F0509A" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="name" x1="0" y1="0" x2="1" y2="0.2">
      <stop offset="0" stop-color="#F0509A"/><stop offset="1" stop-color="#F7B733"/>
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#bg)"/>
  <rect width="100%" height="100%" fill="url(#glow)"/>
  <text x="90" y="250" font-family="${font}" font-weight="800" font-size="104" letter-spacing="-4" fill="#FFFFFF">Hey, I'm <tspan fill="url(#name)">Hemant</tspan></text>
  <text x="90" y="350" font-family="${font}" font-weight="700" font-size="50" letter-spacing="-1.5" fill="#E6C6E6">Apps &amp; Design</text>
  <rect x="90" y="420" width="534" height="76" rx="38" fill="#FFFFFF" fill-opacity="0.1"/>
  <text x="124" y="469" font-family="${font}" font-weight="600" font-size="30" fill="#FFFFFF" fill-opacity="0.85">Engineering student · Jamshedpur</text>
</svg>`

await sharp(Buffer.from(svg)).jpeg({ quality: 88, mozjpeg: true }).toFile('public/media/og-home.jpg')
console.log('wrote public/media/og-home.jpg')
