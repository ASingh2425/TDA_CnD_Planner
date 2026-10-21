# Acceptance record

Status meanings: **tested** = automated/local checks actually passed; **implemented** = code exists but hosted verification remains; **blocked** = requires account configuration; **deferred** = explicit scope still outstanding.

| Requirement                                                                         | Status / evidence                                                                               |
| ----------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| Audit actual repository and history                                                 | Tested: one-commit static HTML repository, default main; docs/AUDIT.md                          |
| Preserve 12 initiatives / 48 milestones / six stages                                | Tested: catalog assertions and verbatim archive                                                 |
| Four useful entry points / six navigation sections                                  | Tested: desktop + mobile browser journeys                                                       |
| Learning prerequisites, resources, deliverables and next steps                      | Implemented in MemberPages.tsx and data.ts; equivalency is a human reviewer decision            |
| Four tracks, advanced experiments clearly marked                                    | Implemented; software track reuses six-stage progression                                        |
| Search and track/difficulty/skill/status/effort/project filters                     | Tested search/empty/reset journey; remaining filters implemented                                |
| Dedicated task views and concrete criteria                                          | Tested browser journey                                                                          |
| Task assignment, in-progress, blockers, submission, changes, resubmission, approval | Tested against actual PostgreSQL migrations                                                     |
| Duplicate/stale claim protection                                                    | Tested version guards; locking implemented; separate-client concurrency stress test remains     |
| Unauthorized access / role escalation / self-review                                 | Tested SQL negative cases and protected public UI                                               |
| Persistence across real browsers and sessions                                       | Implemented in PostgreSQL; hosted test blocked pending Supabase                                 |
| Shared member profiles and auth                                                     | Implemented; real email delivery/redirects blocked pending Supabase setup                       |
| Maintainer create/edit/archive tasks, assignment/reassignment                       | Implemented, core SQL authorization and stale edits tested                                      |
| Reviewer assignment after submission                                                | Tested; preserves submitted status                                                              |
| Prerequisite editing and cycle rejection                                            | Tested SQL graph enforcement                                                                    |
| Initiative editing, lead and status                                                 | Implemented; needs hosted UI smoke test                                                         |
| Queues, contribution history, status summary, audit export                          | Implemented; no invented activity; status counts are shared data                                |
| Full project-level analytics                                                        | Deferred; directory/task filters and explicit status exist, no velocity or percentage dashboard |
| Problem bank, canonical links, topic/difficulty filters                             | Implemented; no republished problem statements                                                  |
| Manual problem history                                                              | Implemented database persistence, labelled self-reported; hosted verification blocked           |
| Bubble Sort / Binary Search controls and edge cases                                 | Tested pure algorithms and browser controls                                                     |
| Codeforces profiles, leaderboard, sync and caches                                   | Deferred, visibly unconfigured; no ratings fabricated                                           |
| GitHub automated API integration                                                    | Deferred; canonical repository/PR links suffice for current workflow                            |
| Member editorial publishing                                                         | Scoped contribution task exists; dedicated editorial publishing/storage deferred                |
| Mobile/desktop navigation and overflow                                              | Tested in Chromium/Edge at desktop and iPhone-sized viewport                                    |
| Keyboard sign-in dialog                                                             | Tested Escape; focus trap and skip link implemented                                             |
| Lint / strict types / unit + integration tests / production build                   | Executed; see TESTING.md                                                                        |
| Browser console and internal navigation                                             | Entry-point test captures page errors; critical routes exercised                                |
| External links                                                                      | Bounded HTTP checks recorded in LINK_CHECKS.json; timeouts/403 explicitly unverified            |
| Production deployment and domain source binding                                     | Existing domain returns HTTP 200; Vercel project binding not verified, new branch not deployed  |
| Administrator setup and environment documentation                                   | Implemented in ADMIN_GUIDE.md and ENVIRONMENT.md                                                |
| Feature branch, commit, push and pull request                                       | See delivery report for actual Git result                                                       |

## Prioritized remaining work

1. Configure an isolated Supabase preview project, test email redirects and full multi-account member/reviewer/maintainer browser journey. Confirm existing Vercel project source and review the preview before production approval.
2. Add hosted PostgREST integration tests and simultaneous-client load tests. Test Safari/Firefox and conduct a newcomer usability session with actual first-/second-year members.
3. Add a richer member/reviewer directory picker, visible prerequisite graph, per-project progress, and member notification preferences. Current UUID-based assignment is functional but requires coordination.
4. Add Codeforces synchronization only with explicit caching, rate-limit handling, verified handle ownership and stale-data labelling. Build original editorial publishing when there is a review process.
5. Add persistent learning-stage evidence/waivers and richer timestamps/audit for initiative metadata. Currently task evidence is the reviewed completion record; learning stages are public curriculum.
