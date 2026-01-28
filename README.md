# Astrid Beauty (Salon Website)

![Astro](https://img.shields.io/badge/Astro-FF5D01?style=flat&logo=astro&logoColor=white)
![GitHub commit activity](https://img.shields.io/github/commit-activity/m/aftongauntlett/astrid-beauty)

View live: https://byastridbeautysalon.com/

Production salon website built with Astro + React islands, TypeScript, and CSS Modules.

## Stack

- **Astro** (routing, layouts, `.astro` components)
- **React** islands for interactive UI (e.g. motion/CTA)
- **CSS Modules** and global CSS (`src/styles/global.css`)
- **i18n** content/messages in `src/i18n`
- **Theme** toggle (light/dark) persisted in `localStorage`

## Tooling

- **Astro** for static site routing, layouts, and components
- **TypeScript**
- **ESLint** (Astro + TS + a11y)
- **Vitest** (unit tests)
- **Astro Check** (`astro check`)

## Commands

- Dev server: `npm run dev`
- Production build: `npm run build`
- Preview build: `npm run preview`
- Lint: `npm run lint`
- Type-check: `npm run typecheck`
- Run tests: `npm run test`
- Watch tests: `npm run test:watch`

## i18n

- **English** is served at `/`
- **Spanish** is served at `/es`
- The language toggle updates a persisted preference (`preferredLang`) and keeps hash/query when switching.
- First-time visitors may be auto-directed based on browser language; once chosen, preference is respected.

## Theme

- Light/dark theme is controlled via `data-theme` on `<html>` and persisted to `localStorage` (`theme`).
- Theme can be changed from the header theme toggle and the settings menu.

## Assets

- Gallery and site images live in `public/images`.

## Deploy

- Build: `npm run build` (outputs to `dist/`)
- Preview locally: `npm run preview`
- Deploy `dist/` to your static host (Netlify/Vercel/S3/Cloudflare Pages, etc.)

## Notes

- Semantic HTML + accessibility primitives are used throughout (skip link, landmarks, focus outlines).

## License

MIT License

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

---

Built by [Afton Gauntlett](https://www.aftongauntlett.com/)
