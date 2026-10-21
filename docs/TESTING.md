# Testing

## Results from this implementation session

- `npm run lint`: passed, no errors.
- `npm run typecheck`: passed with strict TypeScript.
- `npm test`: 20 tests passed across 2 files (Vitest 4.1.12).
- `npm run test:e2e`: 10 tests passed across desktop/mobile Edge, including keyboard account-dialog checks.
- `npm run build`: final production bundle passed (approximately 288 kB JavaScript / 90 kB gzip).
- Dependency installation audit: zero vulnerabilities after updating Vitest to a patched version.
- Desktop screenshot inspected; browser suite verifies horizontal overflow on all six sections on desktop and a mobile viewport.
- External HTTP checks: see LINK_CHECKS.json. 45 links checked: 41 returned HTTP 200 and four returned HTTP 403 (Codeforces and LeetCode). Those four are unverified, not claimed broken or working. Links are retained rather than silently discarded.

The local sandbox blocks compiler/browser subprocess spawning. Build/test commands were rerun with explicit approved execution; no checks were disabled.

## Automated coverage

Catalog: original counts, unique task IDs, project references, concrete criteria. Algorithms: sorting order, immutable input, empty/single/duplicate/already-sorted arrays, absent and present search targets. Database: actual migration and seed execution using PGlite PostgreSQL, RLS private reads, forbidden direct writes, role escalation, exclusive claims/stale versions, self-review, blocked/resume, URL validation, feedback/resubmission/approval, immutable audit, stale metadata edits, prerequisite cycles and reviewer assignment after submission.

PGlite creates synthetic auth.users and auth.uid ONLY in its in-memory test database. Fixture users and test submissions are never seeded into Supabase. Hosted Supabase Auth, JWT signature verification, email delivery, PostgREST configuration and real network races are not emulated by these tests.

Playwright uses installed Microsoft Edge; CI installs it. It checks homepage routing, task search and empty state, task deliverables, algorithm controls and invalid input, maintainer lock state, no horizontal overflow and dialog Escape. The entry-point test fails on browser page errors. This is public-mode E2E, not a passing claim for authenticated hosted workflows.

## Required hosted preview smoke test

Use separate real preview accounts for a member, reviewer, unrelated member and maintainer. Save profiles, grant roles through trusted SQL, claim the same task from two browsers, check the loser sees a conflict, assign a reviewer, submit a valid link, request changes, resubmit and approve. Attempt direct data writes and private submission reads as the unrelated member. Refresh/sign in again and verify task state, reviews and contribution history persist. Confirm profile/role ownership and no elevated metadata in user-controlled fields.

Verify edit/archive/initiative/prerequisite forms, blocked queue and JSON export against the preview database. Confirm sign-in redirects, expired tokens, offline requests and revoked roles. Check focus and form labels manually; test Safari/Firefox separately. Run production build and test its output on the Vercel preview, not only the Vite development server.
