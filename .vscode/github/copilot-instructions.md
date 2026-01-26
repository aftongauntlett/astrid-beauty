# By Astrid Beauty — Copilot Instructions

This is a production marketing site for a real salon. Prioritize accessibility, performance, correctness, and maintainability. Avoid “demo” shortcuts.

## Project snapshot (keep in sync with the repo)

- Framework: Astro (pages in `src/pages`, shared layout in `src/layouts/BaseLayout.astro`)
- UI: Astro components + small React islands via `@astrojs/react` (React is not the default)
- Styling: CSS custom properties (design tokens) in `src/styles/global.css` + component styles (CSS + CSS modules)
- i18n: typed dictionaries in `src/i18n` (English default + Spanish under `/es`)
- Quality gates: `astro check` (typecheck), ESLint, Vitest
- Animation: `framer-motion` is installed, but we do not yet have established motion patterns/components

## Core principles

### 1) Reuse before creating

Before adding new components or patterns, look for an existing one in `src/components`.

Prefer existing UI/site primitives (examples):

- UI: `src/components/ui/*` (e.g., Button/Card/Accordion/SectionIntro)
- Site shell: `src/components/site/*` (Header/Nav/Footer/SkipLink/SettingsMenu/ThemeToggle/LanguageToggle)
- Pages: `src/components/pages/*` (shared page sections)

Avoid one-off components for something that can be handled by an existing primitive + styles.

### 2) Token-first styling (CSS variables)

This project’s “design system” is the CSS variables in `src/styles/global.css`.

Rules:

- Prefer `var(--...)` tokens for color/spacing/radius/typography.
- Avoid hardcoding hex colors and magic numbers in component styles.
- Ensure styles work in both themes (light + dark) using `html[data-theme="dark"]` overrides.

Note: Tailwind is not currently part of this repo’s tooling. Do not assume Tailwind utilities exist.

### 3) Accessibility is required

All UI must be keyboard accessible and screen-reader friendly.

- Use semantic HTML first.
- Use ARIA only when necessary; follow ARIA authoring practices (roles/labels/states must be coherent).
- Preserve and extend the existing a11y primitives (SkipLink, focus styles, menu keyboard behavior).
- Respect `prefers-reduced-motion` for any animation.

### 4) i18n (English + Spanish)

The site is bilingual:

- English: `/...` (default)
- Spanish: `/es/...`

User-facing copy should come from typed dictionaries:

- Types: `src/i18n/types.ts`
- Messages: `src/i18n/en.ts`, `src/i18n/es.ts`
- Access: `getMessages(lang)` from `src/i18n/index.ts`

When adding new copy:

1. Add/extend the type in `src/i18n/types.ts`
2. Add values to both `en.ts` and `es.ts`
3. Read via `getMessages(lang)` and pass `lang` through components

Language preference is stored as `preferredLang` in `localStorage`. Auto-redirect is handled early in `src/layouts/BaseLayout.astro` and only occurs when the user has explicitly chosen a preference.

### 5) Routing + SEO (canonical + hreflang)

Use `src/layouts/BaseLayout.astro` for pages. It already sets:

- `<html lang>`
- canonical URL
- hreflang alternates (`en`, `es`, `x-default`)

When creating a new route, create both:

- `src/pages/<route>.astro` with `lang="en"`
- `src/pages/es/<route>.astro` with `lang="es"`

Prefer sharing the actual page UI via a single component (pass `lang`) to avoid divergence.

### 6) Astro first; React islands only when needed

Default to Astro components and minimal inline scripts.

Use React only for genuinely stateful/complex interactions. If using React:

- Keep islands small and scoped.
- Use the lightest hydration directive that works (`client:visible` / `client:idle` over `client:load`).
- Do not convert entire pages to React.

### 7) Motion & animation (Framer Motion planned)

Motion should be subtle, purposeful, and consistent.

Current state:

- `framer-motion` is installed, but there is no shared motion system yet.

Guidance until a motion system exists:

- Avoid sprinkling ad-hoc Framer Motion usage across unrelated components.
- If introducing Framer Motion, create/extend a small shared wrapper/component pattern and use it consistently.
- Always include reduced-motion behavior (`useReducedMotion` or equivalent) and avoid scroll-jank.

### 8) Brand tone

This is a boutique beauty brand site:

- Favor generous whitespace, calm layout, elegant typography.
- Avoid “dashboard/enterprise” UI vibes (dense grids, harsh borders, overly techy visuals).

### 9) Content safety

Do not hardcode prices unless explicitly requested. Prefer descriptive service copy.

### 10) Production mindset + verification

Avoid debug UI, temporary scaffolding, or placeholder copy unless asked.

Before handing off changes, prefer running the relevant scripts:

- Typecheck: `npm run typecheck`
- Lint: `npm run lint`
- Tests: `npm run test`
- Build (when appropriate): `npm run build`
