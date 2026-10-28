# Hemant — I made this for Wingy

My portfolio as a chat conversation. Vite + React + TypeScript + Tailwind + Framer Motion + Lenis,
prerendered to static HTML at build time and hosted on GitHub Pages.

## Develop

```bash
npm install
npm run dev
```

## Images and video

Raw sources live in `assets-src/` (git-ignored: originals and the unblurred DM never ship).
`npm run assets` writes the optimized files to `public/media/` and the manifest in
`src/content/media.generated.json`. Commit those outputs.

## Deploy (GitHub Pages)

1. Push this repo to GitHub (branch `main`).
2. Repo **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. Every push to `main` runs `.github/workflows/deploy.yml`: it builds with the right base path
   (`/<repo>/`, or `/` for a `<user>.github.io` repo) and the absolute site URL for link previews.

Custom domain: set it in Settings → Pages; the workflow picks up the new URL automatically.

## Build locally

```bash
npm run build    # typecheck, client build, server build, prerender into dist/index.html
npm run preview
```

For a project-site path, set `BASE_PATH=/<repo>/`; set `SITE_URL` to get absolute `og:image` URLs.
