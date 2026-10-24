# Testing — open learning hub

Current verification after removing accounts and management features:

- npm run lint: passed.
- npm run typecheck: passed.
- npm test: 10 catalog/algorithm tests passed.
- npm run test:e2e: 10 tests passed across desktop and mobile Edge.
- npm run build: passed; approximately 275 kB JavaScript (86 kB gzip).
- Dependency removal audit: zero vulnerabilities.

Unit tests verify the 12 initiatives, 48 milestones, six learning stages, unique task IDs and algorithm behavior including empty, duplicate, sorted and absent-target cases.

Browser tests verify four homepage entry points, task search/empty/reset states, task instructions and criteria, visualizer controls/errors, all learning tracks, public resource search, absence of account/management controls and horizontal overflow. The old maintainer URL opens Resources. The entry-point test captures browser page errors. Desktop/mobile screenshots are generated in ignored test-results/.

Database and authenticated workflow tests were removed because those features were removed, not because failures were suppressed. There is no hosted authentication or persistence to configure/test. Historical results for the previous backend are available in Git history and do not describe the current app.

The earlier external-link audit remains in LINK_CHECKS.json: 41 of 45 returned HTTP 200; four Codeforces/LeetCode links returned 403 and remain unverified. External sites may impose their own sign-in requirements. Safari/Firefox and real-member usability testing remain optional further checks.
