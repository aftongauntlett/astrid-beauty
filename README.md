# Astrid Beauty (Salon Website)

![Astro](https://img.shields.io/badge/Astro-FF5D01?style=flat&logo=astro&logoColor=white)
![GitHub commit activity](https://img.shields.io/github/commit-activity/m/aftongauntlett/astrid-beauty)

View live: https://byastridbeautysalon.com/

Production salon website built for Astrid (the salon owner) with Astro + React islands, TypeScript, and CSS Modules.

## Highlights

- Bilingual routing (English `/`, Spanish `/es`) with a persisted language preference
- Light/dark theme toggle persisted in `localStorage`
- Accessibility-first UI (skip link, focus styles, semantic landmarks) + automated a11y checks
- Token-driven styling (colors/spacing/typography/motion) with `prefers-reduced-motion` support

## Stack

- **Astro** (routing, layouts, `.astro` components)
- **React** islands for interactive UI (motion / menu toggles)
- **TypeScript**
- **CSS Modules** + global design tokens (`src/styles/global.css`)
- **Vitest** (unit tests)
- **Playwright + Axe-core** (a11y tests)
- **ESLint** (Astro + TS + a11y)

## Structure

- UI primitives: `src/components/ui/`
- Site chrome (header/footer/nav/toggles): `src/components/site/`
- Motion / interactive islands: `src/components/motion/`
- i18n messages and routing helpers: `src/i18n/`
- Layout wrapper: `src/layouts/BaseLayout.astro`
- Shared utilities: `src/lib/`

## Commands

- Dev server: `npm run dev`
- Production build: `npm run build`
- Preview build: `npm run preview`
- Lint: `npm run lint`
- Type-check: `npm run typecheck`
- Run tests: `npm run test`
- Watch tests: `npm run test:watch`
- Accessibility tests: `npm run test:a11y`
- Accessibility tests (UI): `npm run test:a11y:ui`

## Notes

- Images live in `public/images/`.
- i18n messages live in `src/i18n/`.
- Theme and motion tokens live in `src/styles/global.css`.

## Deploy

- Build: `npm run build` (outputs to `dist/`)
- Preview locally: `npm run preview`
- Deploy `dist/` to your static host (Netlify/Vercel/S3/Cloudflare Pages, etc.)

## License

MIT (see `LICENSE`).

---

Built by [Afton Gauntlett](https://www.aftongauntlett.com/)
