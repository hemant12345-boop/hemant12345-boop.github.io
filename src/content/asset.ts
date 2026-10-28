/**
 * Public-folder URL that respects Vite's `base` (GitHub Pages serves a project site
 * under /<repo>/). index.html and CSS are rewritten by Vite; paths built in JS go through this.
 */
export const asset = (path: string) => import.meta.env.BASE_URL + path.replace(/^\//, '')

/** Same for every URL in a srcset string ("/a.webp 480w, /b.webp 720w"). */
export const assetSrcset = (srcset: string) =>
  srcset
    .split(',')
    .map((part) => {
      const [url, width] = part.trim().split(/\s+/)
      return `${asset(url)} ${width}`
    })
    .join(', ')
