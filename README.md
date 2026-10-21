# TDA Coding & Development Hub

An open learning and project hub for TDA. Every visitor can explore all four tracks, task instructions, twelve project initiatives, resources and algorithm visualizers. There are no accounts, sign-up, assignments, submission forms, approvals or maintainer actions. No database is required.

## Run locally

Node.js 22.12+ recommended.

```sh
npm ci
npm run dev
```

## Verify and build

```sh
npm run lint
npm run typecheck
npm test
npm run test:e2e
npm run build
```

Playwright uses Microsoft Edge. Deploy the generated dist directory using Vercel’s Vite preset (npm run build). No environment variables or database setup are needed.

## Content

- src/data.ts: four learning tracks, six stages, practice tasks and canonical problem links.
- src/initiatives.json: all twelve original initiatives and 48 milestone definitions.
- src/Resources.tsx: searchable public resource library and strategic roadmap.
- archive/original.html: original planner preserved verbatim for reference, not the running site.

The six sections are Start Here, Learning Paths, Explore Tasks, Build with TDA, Competitive Programming and Resources. The old maintainer URL opens Resources for compatibility. Tasks are self-directed exercises, not assignments. Topic prerequisites are guidance, not access restrictions.

See docs/ARCHITECTURE.md, docs/CONTENT_GUIDE.md and docs/DEPLOYMENT.md for maintenance and handover.
