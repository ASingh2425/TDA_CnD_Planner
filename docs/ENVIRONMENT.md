# Environment

Public catalog mode requires no environment variables.

| Variable               | Meaning                                                       |
| ---------------------- | ------------------------------------------------------------- |
| VITE_SUPABASE_URL      | HTTPS URL of your own Supabase project                        |
| VITE_SUPABASE_ANON_KEY | Public anon key or supported publishable key for that project |

Use .env.local locally and Vercel project environment settings for Preview/Production. VITE variables are public build-time values. Never place database passwords, service-role keys, JWT signing secrets or personal access tokens in VITE variables or source files. .env files are ignored.

Supabase: enable email authentication, configure Site URL and exact allowed redirect URLs for localhost, preview and production. Configure email delivery suitable for the organization. Complete a real sign-in and profile save before testing role grants. Review access policies with the supplied tests and a separate preview project.

No GitHub token, Codeforces API credential, Redis service or cron is required. Optional automated integrations are not enabled.
