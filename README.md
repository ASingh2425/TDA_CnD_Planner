# TDA Coding & Development Hub

A member-first workspace for the 2026–27 tenure: learn a skill, pick a task, deliver work and improve through review.

The original single-file planner is preserved at `archive/original.html`. Its 12 initiatives, 48 strategic milestones and six-stage pathway remain available. The new app separates planning milestones from assignable member tasks.

## Start locally

Node.js 22.12+ is recommended.

```sh
npm ci
npm run dev
```

Open the URL printed by Vite. Without environment variables the site runs as a public learning catalog. It does not simulate sign-in, assignments, reviews or shared progress.

## Shared workspace

Create a Supabase preview project. Apply `supabase/001_schema.sql`, `002_catalog.sql`, then `003_prerequisites.sql` in order. Copy `.env.example` to `.env.local`, enter the project URL and public anon/publishable key, and restart Vite. Configure Auth email links and allowed redirect URLs. Never put a service-role key in the client.

Sign in and save your profile. A database administrator explicitly grants the first administrator role using the procedure in `docs/ADMIN_GUIDE.md`. The client cannot grant roles.

## Commands

- `npm run dev` — local server
- `npm run build` — TypeScript check and production bundle
- `npm run lint` — ESLint
- `npm run typecheck` — strict TypeScript
- `npm test` — algorithm, catalog and PostgreSQL authorization integration tests
- `npm run test:e2e` — desktop/mobile Edge user journeys
- `node scripts/seed.mjs` — regenerate public catalog seed from structured source

## What is implemented

Six-section navigation, four homepage entry points, four learning tracks, task filtering and dedicated detail routes, 12 project descriptions, CP topic roadmap and canonical practice links, Bubble Sort and Binary Search playback, account/profile UI, persistent assignment/submission/review workflow, reviewer and maintainer operations, initiative/task editing, blockers, prerequisite enforcement, manual problem history, audit export and secure SQL migrations.

Shared operations need a configured Supabase project. Email delivery and actual hosted Supabase integration have not been verified. Codeforces sync, automated GitHub data and a full editorial CMS are deferred. This branch has not been deployed to production.

See `docs/ACCEPTANCE.md` for implementation boundaries and `docs/TESTING.md` for measured results. Setup, database, deployment, handover and product documentation live in `docs/`.
