// Injects the server-rendered app into each built page. Runs after `vite build` + `vite build --ssr`.
// React picks its prod/dev build from NODE_ENV when first imported.
process.env.NODE_ENV = 'production'
import { readFile, rm, writeFile } from 'node:fs/promises'
import { pathToFileURL } from 'node:url'
import path from 'node:path'

const serverEntry = pathToFileURL(path.resolve('dist-server/entry-server.js')).href
const { render } = await import(serverEntry)

// Page file → variant (see src/content/variant.ts).
const pages = [
  ['dist/index.html', 'main'],
  ['dist/wingy/index.html', 'wingy'],
]

for (const [file, variant] of pages) {
  const template = await readFile(file, 'utf8')
  if (!template.includes('<!--app-html-->')) throw new Error(`${file} has no <!--app-html--> placeholder`)
  const html = template.replace('<!--app-html-->', render(variant))
  await writeFile(file, html)
  console.log(`prerendered ${file} (${(html.length / 1024).toFixed(1)} KB)`)
}
await rm('dist-server', { recursive: true, force: true })
