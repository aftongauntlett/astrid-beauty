# Astrid Beauty Salon Website

Official production website for Astrid Beauty Salon.

Live site: https://byastridbeautysalon.com/

## Project Overview

This repository contains the source code for the salon’s public marketing website, including service discovery, booking entry points, social proof, and bilingual content delivery. The implementation prioritizes performance, accessibility, and maintainability for long-term business use.

## Production Scope

- Public-facing brand website for Astrid Beauty Salon
- Core pages for home and booking journeys
- English and Spanish route/content support
- Static-first rendering with selective client interactivity

## Technology Stack

- Astro 5 + TypeScript
- React 19 islands for targeted interactive elements
- CSS Modules and global design tokens
- Vitest for unit-level validation
- Playwright + axe-core for accessibility testing

## Application Structure

- `src/pages/` — route entry points (including localized routes under `src/pages/es/`)
- `src/components/pages/` — page-level composition
- `src/components/sections/` — reusable content sections
- `src/components/ui/` — shared UI primitives
- `src/components/site/` — global site shell/navigation/footer components
- `src/i18n/` — localization dictionaries, route mapping, and i18n helpers
- `src/styles/` — global styling layers and tokenized foundations

## Quality Standards

The codebase is maintained with a quality baseline focused on:

- Type-safe implementation across Astro and React components
- Linting and static analysis in CI workflows
- Unit coverage for core utility and routing behavior
- Accessibility checks for key user journeys

## Security and Privacy

This repository is limited to front-end website code and does not store customer payment data or salon management records. Any third-party integrations should be reviewed for privacy compliance and tracked through project governance.

## Ownership

This is a client production repository for Astrid Beauty Salon. Changes should preserve brand integrity, content accuracy, and accessibility requirements across supported locales.

## License

MIT. See [LICENSE](LICENSE).
