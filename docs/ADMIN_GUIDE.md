# Administrator and reviewer guide

## Initial administrator

1. Configure Supabase, migrations and Auth redirects as described in ENVIRONMENT.md.
2. Sign in with your real email and save your display name in Your account. Copy the member UUID from that panel.
3. In the trusted Supabase SQL Editor, verify the account identity, then run the following with that exact UUID (do not run with a placeholder):

```sql
select id, email from auth.users where id = '<verified-user-uuid>';
update public.roles set role = 'admin' where user_id = '<verified-user-uuid>';
```

4. Sign out/in to refresh the UI role. No password or admin identity is hardcoded. Only trusted database administrators can grant roles. For another designated reviewer or maintainer, verify identity then update roles to reviewer or maintainer. Never grant roles from user-submitted metadata.

## Onboard and assign

Members sign in, save their profile and choose a learning path. For self-claimed work, open the task and select Start this task. One claim wins; a conflicting claim is rejected. Prerequisites must already be approved for the member. A maintainer can assign a task explicitly after checking equivalent experience.

Maintainers open the workspace, create tasks with the structured form, and specify purpose, prerequisites, instructions, deliverable, criteria, resources and effort. Use member/reviewer UUIDs from their account panels for assignment. Reviewer must have an authorized role and must be a different person. A submitted task may receive a reviewer while keeping the same member; it cannot be reassigned to a different member. Approved work is not reopened by editing task details.

Set required task IDs through the prerequisite form; IDs must exist and cycles are rejected. Plain-language prerequisites explain the skills; linked task IDs enforce prior completion. The prerequisite form replaces the graph for that task, so inspect current requirements before saving.

Members mark work in progress, enter an HTTPS repository/PR link and submit. If blocked, enter a clear description and choose Record blocker & ask for help. This puts the task in the maintainer’s blocked queue; it does not send an email or external notification.

## Review

The assigned reviewer opens the task, follows the submitted link, checks the acceptance criteria and enters feedback. Request changes permits resubmission. Approve submission records a review against the latest submission and adds the task to the member’s approved history. Maintainer status alone does not bypass reviewer assignment.

## Maintain projects

Choose an existing initiative in the edit form or create one with a stable ID. Set a factual description, lead UUID if known and honest status. Released is a deliberate maintainer decision; review deployment evidence before selecting it. Archive tasks instead of deleting their history. Export task summary & audit history for handover; treat exported assignments as internal member data.

The retained 48 milestones are a strategic reference. New task records are independently scoped work. Refresh after a stale-data error; do not blindly retry using old values.
