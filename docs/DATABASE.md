# Database

Apply migrations in order in a NEW Supabase preview project using SQL Editor or psql. 001 is initial schema, not an idempotent rerun. 002 inserts catalog only and ignores existing IDs; it intentionally does not overwrite live maintainer edits. 003 adds cycle-safe prerequisite management. Back up before production migration.

| Table               | Purpose                                                                           |
| ------------------- | --------------------------------------------------------------------------------- |
| profiles            | Auth-user identity and display name                                               |
| roles               | One explicit member/reviewer/maintainer/admin role                                |
| initiatives         | Public project identity, status, lead, version and retained specification         |
| milestones          | All 48 original strategic milestones                                              |
| tasks               | Assignable work, resources, instructions, criteria, status and optimistic version |
| task_prerequisites  | Task dependency graph, with cycles rejected by RPC                                |
| assignments         | One current member and optional distinct reviewer per task; blocker               |
| submissions         | Immutable HTTPS work-link submission history                                      |
| reviews             | Feedback and approval/change-request decision for a submission                    |
| audit_events        | Append-only significant task operations                                           |
| problem_completions | Per-member manual problem completion and evidence link                            |

Foreign keys reference auth.users through profiles. Assignments, submissions and task/project relations constrain invalid records. Auth-user deletion cascades profiles/roles but historical work references intentionally restrict deleting identities with contribution history. Indexes cover member/reviewer assignment queries, submission/review relations and task statuses. Tasks include creation/update timestamps; submissions/reviews/events have timestamps. Profile/initiative timestamp enrichment remains a future migration.

Learning tracks/stages and resource metadata remain version-controlled public data, avoiding unnecessary mutable tables. Resources on tasks are JSON arrays. Initiatives are the projects, avoiding duplicate parallel entities. External platform profiles are not stored because sync is deferred.

RPCs: save_profile, task_action, save_task, save_initiative, record_problem, set_prerequisites. Helper functions has_role and can_read_task only disclose authorization booleans. Initial/admin role grants require trusted SQL access; no role elevation RPC exists.

PGlite tests execute the actual migration and seed with emulated Supabase auth.uid() and roles, then test SQL authorization as anon/authenticated. This verifies PostgreSQL behavior, not hosted email or PostgREST configuration.
