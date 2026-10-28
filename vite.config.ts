import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

/**
 * Absolute site URL for canonical + og:image (link previews need absolute URLs).
 * The Pages workflow sets it from actions/configure-pages; locally it's empty.
 */
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
  // User site (hemant12345-boop.github.io) is served from the domain root.
  base: '/',
  plugins: [react(), tailwindcss(), siteUrlPlugin()],
})
