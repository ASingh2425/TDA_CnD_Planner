# Contributing and handover

Clone the repository and use npm ci. Start from a small task and confirm acceptance criteria with its reviewer. Use a feature branch (this implementation uses codex/member-developer-hub); never push directly to main. Open a pull request with the task/issue, before/after behavior, test results and screenshots for UI changes.

Run lint, typecheck, unit/database tests, browser tests and production build. Do not commit .env, credentials, node_modules, dist, screenshots containing member data, or test output. Document schema changes as a new migration; never silently rewrite a migration already applied to production.

Resources live in src/data.ts and src/initiatives.json. Keep original milestone IDs stable. node scripts/seed.mjs regenerates the catalog seed; it only inserts missing rows and never replaces shared records. Original historical specifications are not mandates to use outdated technology.

Review correctness, permission enforcement, responsive layout, accessibility, error states and data migration safety. At least one human reviewer should approve before merging; the repository owner must configure branch protection (not automatically changed here).

Handover checklist: repository/Vercel ownership, Supabase ownership and backup procedure, Auth/email setup, role grants, open reviews/blockers, unfinished initiatives, rollback URL and audit export. Transfer account access through official organization controls, never through shared passwords in documentation.
