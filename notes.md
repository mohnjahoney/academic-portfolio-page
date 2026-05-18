# Academic Portfolio Page

Minimal Vite app for rendering structured academic paper data from `papers.js`.

## Local Development

Use Vite for local development:

```sh
npm install
npm run dev
```

Vite will print the local URL, usually `http://127.0.0.1:5173/`. If that port is busy, it will choose the next available port.

Local development uses a root base path. Production builds use `/academic-portfolio-page/` for GitHub Pages deployment, so internal image and PDF links should be generated through Vite's base path rather than hard-coded as domain-root URLs.

Renderer variants can be selected with the `view` query parameter:

```text
/?view=bare
/?view=compact
/?view=dossier
/?view=chronicle
/?view=constellation
/?view=specimen
```

## Build

```sh
npm run build
```

The build copies `assets/article-pdfs/` into `dist/assets/article-pdfs` so local PDF links continue to work in production output.

## Images

Paper images live under `assets/images-from-pdfs/<paper-id>/`.

- `by-hand/` is the primary pathway for manually extracted figures.
- `auto/` is the fallback pathway for generated crops from PDFs.

Rendering tries `by-hand/figure-N.png` first and falls back to `auto/figure-N.png` when available.

## PDFs

```sh
npm run download:pdfs
```

This downloads and validates PDFs using `scripts/download-pdfs.sh`.
