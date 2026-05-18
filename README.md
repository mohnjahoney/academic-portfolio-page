# Academic Portfolio Page

Minimal Vite app for rendering structured academic paper data from `papers.js`.

## Local Development

Use Vite for local development:

```sh
npm install
npm run dev
```

Vite will print the local URL, usually `http://127.0.0.1:5173/`. If that port is busy, it will choose the next available port.

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

The build copies `pdfs/` into `dist/pdfs` so local PDF links continue to work in production output.

## PDFs

```sh
npm run download:pdfs
```

This downloads and validates PDFs using `scripts/download-pdfs.sh`.
