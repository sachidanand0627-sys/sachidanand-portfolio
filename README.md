# Sachidanand — Portfolio

Personal design portfolio built with React, Vite and Tailwind CSS, featuring an interactive hero game, animated sections and case study pages.

## Tech stack

- React 18 + React Router 7
- Vite 5
- Tailwind CSS 3
- GSAP, Motion, OGL

## Getting started

```bash
npm install
npm run dev
```

Other scripts:

```bash
npm run build     # production build to dist/
npm run preview   # preview the production build locally
```

## Project structure

```
public/            static assets (images, videos, logos, case study media)
src/components/    page sections and UI components
src/pages/         case study pages
src/index.css      global styles
```

## Deployment

The site uses client-side routing (`BrowserRouter`), so the host must serve `index.html` for unknown paths.

- **Netlify:** `public/_redirects` is included, no extra setup.
- **Vercel:** add a `vercel.json` with a rewrite of `/(.*)` to `/index.html`.
- Build command: `npm run build`, output directory: `dist`.
