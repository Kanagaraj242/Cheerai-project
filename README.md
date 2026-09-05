# Cheerio AI — Platform

Production React application for the Cheerio AI customer engagement and workflow
automation platform. Rebuilt from the static HTML/CSS/JS prototype in
`legacy-prototypes/` into a proper component-driven app while preserving the
prototype's visual design, layouts, and interactions.

## Stack

- **React 19 + TypeScript + Vite** — app shell and build tooling
- **Tailwind CSS v4** — design tokens are defined once in `src/index.css` and
  mirror the prototype's CSS custom properties (colors, radii, shadows)
- **shadcn/ui-style primitives** (Radix UI + `class-variance-authority`) — see
  `src/components/ui`
- **React Router** — client-side routing (`src/App.tsx`)
- **Zustand** — lightweight state stores per feature (`src/stores`)
- **React Hook Form + Zod** — the sign-in form
- **Recharts** — dashboard charts, sparklines, funnels, agent performance
- **@xyflow/react (React Flow)** — the visual workflow builder canvas
- **TanStack Query** — provider wired up and ready for real data fetching
- **Lucide React** — icon set

## Project layout

```
src/
  components/ui/        shared primitives (button, card, table, tabs, dialog, ...)
  components/layout/    app shell (sidebar, topbar)
  components/navigation/  nav config, route → title map
  components/charts/     small reusable stat/chart components
  layouts/               AppLayout, ProtectedRoute
  pages/<Page>/          one folder per route, with local components/
  workflow/               React Flow node components + styling helpers
  stores/                 Zustand stores (auth, inbox, contacts, campaigns, workflow, connectors)
  data/                   typed mock data ported from the prototype
  types/                  shared TypeScript types
  lib/                    cn() helper, icon lookup map
```

## Getting started

```bash
npm install
npm run dev       # start the dev server
npm run build     # type-check + production build
npm run lint      # oxlint
```

Sign in with any email/password (6+ characters) — authentication is mocked
client-side and persisted to `localStorage` for the demo.
