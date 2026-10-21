# Audit and implementation decisions

## Repository evidence

Audited `ASingh2425/TDA_CnD_Planner`, default branch `main`, original commit `c92a8e9` (one commit: Add files via upload). The repository contains only index.html. It is not Next.js: it uses inline JavaScript, Tailwind CDN styling and Google Fonts. There is no package manifest, backend, environment configuration, database, CI or Vercel configuration.

The enclosing desktop directory belongs to an unrelated Git repository. Work therefore lives in the isolated `hub` clone on `codex/member-developer-hub`; the enclosing repository and other local website were not modified.

## Original behavior

Working: tab navigation, local checklist persistence, initiative filtering, six-stage learning content, resources and generator-based Bubble Sort / Binary Search. The original HTML is retained verbatim in archive/original.html. Twelve initiative records and 48 milestone IDs/texts were extracted into src/initiatives.json.

Incomplete / conceptual: shared project progress, member accounts, role permissions, Codeforces analytics, leaderboard, shared task assignment and reviewed completion. Checklist ticks were local and could not establish that a project had shipped. Some save-problem code references state not implemented as a shared system.

## Deployment

The public URL supplied is https://tda-cnd26.vercel.app/. The repository contains no .vercel project binding or deployment configuration. Remote GitHub metadata confirms main as default but does not prove which Vercel project/branch serves the domain. Initial web retrieval failed and browser inspection stalled. A later direct HTTP check returned 200 and confirmed that the live HTML exactly matches the archived repository original after line-ending normalization (docs/LIVE_AUDIT.json). The Vercel account/project binding remains unverified. Do not change the existing production branch until preview verification.

## Implementation phases

1. Preserve source; extract original catalog; add actionable public journeys and modular UI.
2. Add dedicated member tasks and persistent transactional assignment/submission/review operations.
3. Add Supabase Auth, private profile/role/assignment data, RLS, protected RPCs and administrator setup.
4. Add focused CP practice, manual progress and tested algorithm playback. Defer API synchronization until a caching/rate-limit service is configured.

React/TypeScript/Vite retain the static delivery model while Supabase provides PostgreSQL transactions, authentication and server-enforced authorization. Next.js is still a learning resource, not the runtime. A migration to an application server is unnecessary for these database-owned workflows. CSS provides a small consistent design system without runtime Tailwind CDN dependencies.
