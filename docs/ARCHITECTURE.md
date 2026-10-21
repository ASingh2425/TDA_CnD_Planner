# Architecture

Browser: React 19, TypeScript, Vite 6, Lucide icons and plain responsive CSS. Hash routes allow direct links without server routing rules. src/main.tsx owns application navigation, session and data loading; MemberPages.tsx implements learning, task discovery/detail and CP; Maintainer.tsx, TaskEditor.tsx and ProjectEditor.tsx implement operational forms; Visualizer.tsx renders pure algorithm frames from algorithms.ts. data.ts defines public tasks and learning resources; initiatives.json preserves the original specifications.

Backend: Supabase Auth and PostgreSQL. The browser sends its authenticated JWT through supabase-js. SQL functions derive identity from auth.uid(), validate transitions and enforce roles. RLS protects private reads; direct operational writes are revoked. No client-controlled role field grants access. SECURITY DEFINER functions pin an empty search_path, use schema-qualified names and explicitly restrict execution grants.

Tasks have integer versions. task_action locks the row and checks the expected version, so concurrent claims or duplicate submissions cannot silently overwrite an update. Every workflow action is transactional and audited. Assignments enforce one current member per task. Reviews refer to immutable submissions; approval does not come from a checkbox.

Auth sessions are intentionally in memory (persistSession:false); a page reload may require signing in again. Shared data remains in PostgreSQL and is restored after sign-in from any browser. No operational data is written to localStorage. Magic-link redirects must be configured on the Supabase project.

Public catalog mode works without a database. Configured database failures display an error; successful mutations reload server state. Retry a stale update only after refresh. Production quality requires the hosted authentication and cross-session smoke tests in TESTING.md.

Reference: https://supabase.com/docs/guides/database/functions and https://supabase.com/docs/guides/database/postgres/row-level-security.
