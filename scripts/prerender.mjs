// Injects the server-rendered app into dist/index.html. Runs after `vite build` + `vite build --ssr`.
// React picks its prod/dev build from NODE_ENV when first imported.
process.env.NODE_ENV = 'production'
import { readFile, rm, writeFile } from 'node:fs/promises'
import { pathToFileURL } from 'node:url'
import path from 'node:path'

const serverEntry = pathToFileURL(path.resolve('dist-server/entry-server.js')).href
const { render } = await import(serverEntry)

const file = 'dist/index.html'
const template = await readFile(file, 'utf8')
if (!template.includes('<!--app-html-->')) throw new Error('dist/index.html has no <!--app-html--> placeholder')

const html = template.replace('<!--app-html-->', render())
await writeFile(file, html)
await rm('dist-server', { recursive: true, force: true })
console.log(`prerendered dist/index.html (${(html.length / 1024).toFixed(1)} KB)`)
