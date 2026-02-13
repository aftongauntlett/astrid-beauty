# Astrid Beauty Salon Website

Live site: https://byastridbeautysalon.com/

Production website for Astrid Beauty Salon (client project, not a personal site). Built with Astro and a small set of React islands for interactive UI.

## Tech

- Astro + TypeScript
- React islands (interactive components)
- CSS Modules + global design tokens

## Development

- Install: `npm install`
- Dev server: `npm run dev`
- Build: `npm run build` (outputs to `dist/`)
- Preview build: `npm run preview`

## Quality checks

- Lint: `npm run lint`
- Type-check: `npm run typecheck`
- Unit tests: `npm run test`
- Accessibility (Playwright): `npm run test:a11y`

## Deployment

This is a static Astro build. Deploy the `dist/` output to your static host.

If you need correct canonical/absolute URLs, set `PUBLIC_SITE_URL` (or `SITE_URL`) in the build environment.

## License

MIT (see `LICENSE`).
