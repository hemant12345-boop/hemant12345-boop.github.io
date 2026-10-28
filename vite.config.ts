import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

/**
 * GitHub Pages: a project site lives under /<repo>/, a user site (<user>.github.io) at /.
 * The deploy workflow sets both from actions/configure-pages; locally they default to / and empty.
 */
const base = process.env.BASE_PATH || '/'

/** Absolute site URL (incl. base path) for canonical + og:image — link previews need absolute URLs. */
const siteUrl = (process.env.SITE_URL ?? '').replace(/\/$/, '')

function siteUrlPlugin(): Plugin {
  return {
    name: 'site-url',
    transformIndexHtml(html, ctx) {
      if (!siteUrl && !ctx.server) {
        this.warn('SITE_URL is not set: og:image and canonical will be relative, so link previews may not show an image.')
      }
      return html.replaceAll('%SITE_URL%', siteUrl)
    },
  }
}

export default defineConfig({
  base,
  plugins: [react(), tailwindcss(), siteUrlPlugin()],
})
