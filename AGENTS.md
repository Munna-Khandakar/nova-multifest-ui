# Repository Guidelines

## Project Structure & Module Organization
`app/` uses the Next.js App Router. Public-facing routes live under `app/(public)/` with route folders like `app/(public)/about/` and a shared layout in `app/layout.tsx`. Global styles live in `app/globals.css`. Reusable UI and page sections are in `components/` with subfolders like `components/sections/`, `components/navigation/`, and `components/ui/`. Shared utilities and data live in `lib/` (for example `lib/utils.ts`, `lib/constants.ts`, `lib/zod-schemas/`). Static assets are in `public/`.

## Build, Test, and Development Commands
- `npm install` installs dependencies.
- `npm run dev` starts the local dev server at `http://localhost:3000`.
- `npm run build` creates a production build.
- `npm run start` serves the production build.
- `npm run lint` runs ESLint with the Next.js config.
There is no `npm test` script or test runner configured yet.

## Coding Style & Naming Conventions
Code is TypeScript + React with Tailwind CSS. Follow existing patterns: 2-space indentation, no semicolons, and double quotes. File names are kebab-case (for example `hero-section.tsx`), while components use PascalCase (`HeroSection`). Use the `@/` path alias for root imports (e.g. `@/components/ui/button`) and the `cn` helper from `lib/utils.ts` to compose class names.

## Testing Guidelines
Automated tests are not configured in this repo. For now, rely on `npm run lint` and `npm run build` before submitting changes. If you add tests, keep them co-located or in `__tests__/` with `*.test.tsx` naming and add a corresponding script to `package.json`.

## Commit & Pull Request Guidelines
Commit history uses short, lowercase, sentence-style messages (for example “hero section updated”). Follow that style for consistency. For PRs, include a clear summary, list any new routes or configuration changes, and attach screenshots for UI updates. Link any relevant issues when available.

## Configuration Notes
Key config files include `next.config.ts`, `tsconfig.json`, `eslint.config.mjs`, and `components.json` (shadcn/ui settings). If you introduce environment variables, document them and prefer `.env.local` for local development.

## General Instructions
- Prefer shadcn/ui components whenever possible before building custom UI.
- Use Tailwind utility classes first; only add custom CSS when utilities are insufficient.
- Design mobile-first layouts and verify responsiveness at common breakpoints.
