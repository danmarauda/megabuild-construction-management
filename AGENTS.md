# Repository Guidelines

## Project Structure & Module Organization
The Vite + React source lives in `src/`, with UI primitives in `src/components/`, route-level screens in `src/pages/`, and shared domain models in `src/types/`. Reusable mock payloads are stored in `src/data/mock-data.ts`. Global styling and theming are handled through Tailwind (`tailwind.config.js`, `postcss.config.js`) and the application entry point (`src/main.tsx`, `src/App.tsx`) wires routing plus the dark theme toggle. Static HTML scaffolding sits in `index.html`.

## Build, Test, and Development Commands
- `npm install` — restore dependencies before any other action.
- `npm run dev` — launch the HMR dev server at `http://localhost:5173`.
- `npm run build` — type-check with `tsc` and emit the production bundle to `dist/`.
- `npm run lint` — execute ESLint with the repo’s TypeScript React rules; treat warnings as build blockers.
- `npm run preview` — serve the production bundle locally for smoke checks.

## Coding Style & Naming Conventions
Write React function components in TypeScript. Export components with PascalCase names (`Sidebar`, `TimelineView`) while keeping file names kebab-case (`sidebar.tsx`, `timeline-view.tsx`). Favor Tailwind utility classes over bespoke CSS and place any shared tokens in Tailwind config. Use double quotes for imports/strings, two-space indentation, and keep imports grouped by origin (external before internal). Run `npm run lint` before pushing; add minimal comments only when intent is non-obvious.

## Testing Guidelines
A formal test harness is not yet configured; new contributions should introduce Vitest + React Testing Library where practical. Co-locate specs as `*.test.tsx` alongside the code or under `src/__tests__/`. Target meaningful coverage (≥80% for new modules), and document manual test steps in the pull request until automated suites land. Include data-stub updates in `src/data/` whenever tests rely on fixtures.

## Commit & Pull Request Guidelines
Adopt Conventional Commits (`feat: add timeline view status badges`) for clarity and changelog generation. Keep commits scoped, describing intent in the imperative voice. Pull requests must explain the motivation, summarize functional and UI changes, enumerate verification steps (`npm run lint`, `npm run preview`), and attach before/after screenshots for visual updates. Reference related issues or tasks directly in the PR description.
