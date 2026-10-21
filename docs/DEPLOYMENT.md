# Deployment and rollback

Use the existing GitHub repository with the Vercel Vite preset. Repository root is the application root; hub is only the local clone folder name.

Install: npm ci. Build: npm run build. Output directory: dist. Node: 22.x. No environment variables, database migrations or authentication redirect configuration are needed.

Review the feature branch and preview before merging to main. Confirm the intended Vercel project, repository and production branch in the account dashboard. Production deployment is not performed by this local edit.

Verify all six sections and /#/task/first-contribution. Anyone should be able to open every track without an account. /#/maintainer opens the public Resources page for old bookmarks.

Rollback through the previous Vercel deployment or a Git revert. Earlier Git commits contain the superseded account-based application; redeploying those would restore its UI, so choose the rollback deliberately.
