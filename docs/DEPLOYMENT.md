# Deployment and rollback

Do not assume the existing Vercel project is connected to this repository. Verify its Git provider, repository, production branch and Root Directory in the Vercel dashboard first. The cloned repository root is the application root; `hub` is only its local enclosing folder name.

1. Review the feature branch / pull request. Keep main unchanged.
2. Create a Supabase PREVIEW project. Apply 001_schema.sql, 002_catalog.sql, 003_prerequisites.sql in order.
3. Configure Vercel preview variables listed in ENVIRONMENT.md. Framework: Vite; install: npm ci; build: npm run build; output: dist; Node: 22.x.
4. Allow the preview origin in Supabase Auth redirects. Sign in as separate member, reviewer and maintainer accounts; follow TESTING.md. Never seed fictional users into production.
5. Verify the preview at mobile/tablet/desktop sizes and check browser console errors. Verify deep links such as /#/task/first-contribution.
6. With explicit production approval, apply migrations to the intended production database after a backup, configure production environment/auth URLs, merge and let the existing Vercel integration build.
7. Verify the live URL and actual deployed commit before claiming deployment success.

Rollback: redeploy the last known good Vercel deployment. Preserve the database and contribution history; never drop tables as a rollback shortcut. The original c92a8e9 commit remains available for restoring the static planner. Rolling back to it will not display new shared work, but must not destroy that work.

No production deployment or Supabase migration has been performed by this change. Hosted integration and Vercel project binding require the account owner’s configuration.
