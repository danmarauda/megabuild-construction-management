# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**MegaBuild Construction Management** is a React + TypeScript single-page application for managing construction projects, customers, leads, estimates, invoices, time tracking, and financials. Built with Vite, styled with Tailwind CSS v4, uses HeroUI components, and connects to a **Convex backend** for real-time data persistence.

## Common Commands

```bash
# Development server (runs on localhost:5173 by default)
npm run dev

# Convex development (starts local backend)
npx convex dev

# Build for production (deploys to Convex then builds)
npx convex deploy --cmd 'npm run build'

# Preview production build
npm run preview

# Lint code
npm run lint

# Seed database with initial data
npx convex run seed:seed

# Check database seeding status
npx convex run seed:status
```

## Architecture

### App Structure

- **Entry point**: `src/main.tsx` → `src/App.tsx`
- **Routing**: React Router v6 with client-side `BrowserRouter`
- **Theme**: Dark mode enforced by default (document element gets `dark` class in `App.tsx`)

### Data Layer

**Backend**: Convex (real-time database with reactive queries)

**Convex Schema** (`convex/schema.ts`):
- `workers` - Team members with roles
- `tasks` - Project tasks with worker assignments
- `projects` - Main construction projects with financials
- `customers` - Customer records with project references
- `leads` - Sales pipeline with status workflow
- `invoices` - Invoices with payment tracking
- `estimates` - Project estimates with approval workflow
- `timeEntries` - Worker time logs
- `files` - Project documents and media

**Convex Functions** (`convex/*.ts`):
- `projects.ts` - listProjects, getProject, createProject, updateProject, deleteProject
- `workers.ts` - listWorkers, getWorker
- `customers.ts` - listCustomers, getCustomer, createCustomer
- `leads.ts` - listLeads, getLead, createLead, updateLeadStatus
- `invoices.ts` - listInvoices, getInvoice, createInvoice
- `estimates.ts` - listEstimates, getEstimate, createEstimate
- `financials.ts` - getDashboardData

**React Hooks** (`src/hooks/useConvex.ts`):
- `useProjects()`, `useProject(id)`, `useTasks(projectId?)`
- `useCustomers()`, `useLeads()`, `useInvoices()`, `useEstimates()`
- `useWorkers()`, `useFinancialSummary()`

**Legacy Mock Data** (`src/data/mock-data.ts`):
- Kept for reference and seeding the database
- Used by `convex/seed.ts` to populate initial data

**Important**: When adding new features:
1. Update `src/types/project.ts` with new types
2. Update `convex/schema.ts` with new tables
3. Create Convex functions in `convex/*.ts`
4. Add hooks to `src/hooks/useConvex.ts`

### Type System

All domain types are centralized in `src/types/project.ts`:
- `Project`, `Task`, `Worker`, `Customer`, `Lead`, `Invoice`, `Estimate`, `TimeEntry`, `File`, `FinancialSummary`

These are the source of truth for data shapes across the application.

### Component Architecture

```
src/
├── components/       # Reusable UI components (cards, lists, views)
├── pages/           # Route-level page components (17 pages)
├── types/           # TypeScript interfaces
└── data/            # Mock data
```

**Components** are presentational and receive data via props. No state management library yet—components are functional and use React hooks directly.

**Pages** import components and mock data, render layouts, and handle routing. Pages follow the pattern of importing from `../data/mock-data` and `../components/*`.

### UI Stack

- **Tailwind CSS v4** with custom gray color palette (950-50 scale)
- **HeroUI v2.7.8** - Component library (Card, CardBody, Button, etc.)
- **@iconify/react** - Icons (Lucide icon set: `lucide:*`)
- **Recharts** - Charts for financial/timeline visualizations
- **Framer Motion** - Animations
- **date-fns** - Date formatting

Custom color scheme in `tailwind.config.js`:
- `gray-950`: `#0a0a0a` (darkest background)
- `primary` colors used for accents (blue/purple tones)

### Sidebar Navigation

`src/components/sidebar.tsx` defines the navigation structure. To add a new page:
1. Create page component in `src/pages/`
2. Add route in `src/App.tsx` `<Routes>`
3. Add sidebar item in `Sidebar()` component with icon and path

### Dark Mode

Application uses **class-based dark mode**. Tailwind config has `darkMode: "class"`, and `App.tsx` adds `dark` class to `document.documentElement` on mount. Always design with dark mode in mind—use `dark:` prefix in Tailwind classes.

## Page Routes

Current pages (as defined in `App.tsx`):
- `/` - Dashboard (financials, charts, active projects)
- `/projects` - Project list and details
- `/timeline` - Project timeline visualization
- `/tasks` - Task list view
- `/time-tracking` - Worker time entry logs
- `/leads` - Lead pipeline management
- `/estimates` - Project estimates
- `/invoices` - Invoice tracking
- `/schedule` - Calendar scheduling
- `/photos` - Project photos and files
- `/customers` - Customer management
- `/map` - Project location map
- `/reports` - Reporting
- `/finances` - Financial overview
- `/settings` - App settings
- `/support` - Support page
- `/faq` - FAQ section

## Key Patterns

### Component Props Pattern

Most components receive domain objects as props (e.g., `ProjectCard` receives `project: Project`). Types are imported from `../types/project`.

### Date Handling

Use `date-fns` for formatting. Dates in mock data are ISO strings (`YYYY-MM-DD`).

### Icon Usage

Icons from `@iconify/react` using Lucide set: `<Icon icon="lucide:icon-name" />`.

### Status Workflows

Domain objects have status enums that drive UI states:
- Project: `active | completed | on-hold`
- Task: `pending | in-progress | completed | overdue`
- Lead: `new | contacted | qualified | proposal | converted | lost`
- Invoice: `draft | sent | viewed | pending | paid | overdue`
- Estimate: `draft | sent | viewed | approved | rejected`

## Adding New Features

1. **Define types** in `src/types/project.ts`
2. **Add mock data** to `src/data/mock-data.ts`
3. **Create components** in `src/components/` if reusable
4. **Create page** in `src/pages/` or extend existing
5. **Add route** in `src/App.tsx`
6. **Add nav item** in `src/components/sidebar.tsx`

## Build Output

Production builds go to `dist/` directory (Vite default).

## Convex Backend

### Development Workflow

```bash
# Terminal 1: Start Convex dev server (auto-creates/updates backend)
npx convex dev

# Terminal 2: Start Vite dev server
npm run dev
```

The Convex dev server will:
- Create/upgrade your Convex backend
- Generate TypeScript types in `convex/_generated/`
- Provide a local dev URL (auto-discovered by the app)

### Deployment to Vercel

The project is configured for automatic Convex deployment via `vercel.json`:

```bash
# Deploy to Vercel (Convex deploys automatically during build)
git push vercel main
```

### Seeding the Database

```bash
# Seed with initial data from mock-data.ts
npx convex run seed:seed

# Check seeding status
npx convex run seed:status

# Clear all data (use with caution!)
npx convex run seed:clear
```

### Convex Dashboard

Access your Convex dashboard at: https://dashboard.convex.dev

Project: `dashing-cassowary-301`
- View database contents
- Run functions manually
- Monitor function performance
- Check deployment status

### Environment Variables

- **Local**: `.env.local` (VITE_CONVEX_URL auto-discovered)
- **Production**: `CONVEX_DEPLOY_KEY` (configured in Vercel)
