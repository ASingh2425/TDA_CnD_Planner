import { PGlite } from "@electric-sql/pglite";
import { beforeAll, afterAll, describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
const db = new PGlite();
const member = "00000000-0000-0000-0000-000000000001",
  reviewer = "00000000-0000-0000-0000-000000000002",
  other = "00000000-0000-0000-0000-000000000003",
  admin = "00000000-0000-0000-0000-000000000004";
async function as(id: string) {
  await db.exec(
    `reset role;set role authenticated;select set_config('request.jwt.claim.sub','${id}',false);`,
  );
}
async function action(
  id: string,
  v: number,
  a: string,
  value = "",
  m: string | null = null,
  r: string | null = null,
) {
  return db.query("select public.task_action($1,$2,$3,$4,$5,$6)", [
    id,
    v,
    a,
    value,
    m,
    r,
  ]);
}
beforeAll(async () => {
  await db.exec(
    `create role anon; create role authenticated;create schema auth;create table auth.users(id uuid primary key);create function auth.uid() returns uuid language sql stable as $$select nullif(current_setting('request.jwt.claim.sub',true),'')::uuid$$;grant usage on schema auth to anon,authenticated;grant execute on function auth.uid() to anon,authenticated;`,
  );
  await db.exec(readFileSync("supabase/001_schema.sql", "utf8"));
  await db.exec(readFileSync("supabase/002_catalog.sql", "utf8"));
  await db.exec(readFileSync("supabase/003_prerequisites.sql", "utf8"));
  for (const id of [member, reviewer, other, admin]) {
    await db.query("insert into auth.users values($1)", [id]);
    await as(id);
    await db.query("select public.save_profile($1)", ["Test fixture"]);
    await db.exec("reset role");
  }
  await db.query("update public.roles set role='reviewer' where user_id=$1", [
    reviewer,
  ]);
  await db.query("update public.roles set role='admin' where user_id=$1", [
    admin,
  ]);
});
afterAll(() => db.close());
describe.sequential("database authorization and workflow", () => {
  it("public cannot mutate, profiles are private", async () => {
    await db.exec("set role anon");
    await expect(action("first-contribution", 0, "claim")).rejects.toThrow();
    expect((await db.query("select * from public.tasks")).rows).toHaveLength(
      12,
    );
    await as(other);
    expect((await db.query("select * from public.profiles")).rows).toHaveLength(
      1,
    );
  });
  it("members cannot elevate roles or bypass task workflow", async () => {
    await as(member);
    await expect(
      db.exec("update public.roles set role='admin'"),
    ).rejects.toThrow();
    await expect(
      db.exec("update public.tasks set status='Approved'"),
    ).rejects.toThrow();
    await expect(
      db.query("select public.save_task($1,0)", [{}]),
    ).rejects.toThrow();
  });
  it("claims exclusively and rejects stale duplicate requests", async () => {
    await as(member);
    await action("first-contribution", 0, "claim");
    await as(other);
    await expect(action("first-contribution", 0, "claim")).rejects.toThrow(
      "changed",
    );
    await expect(action("first-contribution", 1, "claim")).rejects.toThrow(
      "already assigned",
    );
    expect(
      (
        await db.query(
          "select * from public.assignments where task_id='first-contribution'",
        )
      ).rows,
    ).toHaveLength(0);
  });
  it("maintainer assigns a reviewer; self-review assignment fails", async () => {
    await as(admin);
    await expect(
      action("first-contribution", 1, "assign", "", reviewer, reviewer),
    ).rejects.toThrow();
    await action("first-contribution", 1, "assign", "", member, reviewer);
  });
  it("tracks blockers, resumes and validates submissions", async () => {
    await as(member);
    await action("first-contribution", 2, "start");
    await action(
      "first-contribution",
      3,
      "block",
      "Need a review of the scope",
    );
    await action("first-contribution", 4, "start");
    await expect(
      action("first-contribution", 5, "submit", "javascript:alert(1)"),
    ).rejects.toThrow();
    await action(
      "first-contribution",
      5,
      "submit",
      "https://github.com/example/repo/pull/1",
    );
  });
  it("rejects unauthorized approval and private submission reads", async () => {
    await expect(
      action("first-contribution", 6, "Approved", "Looks good"),
    ).rejects.toThrow();
    await as(other);
    expect(
      (await db.query("select * from public.submissions")).rows,
    ).toHaveLength(0);
    await expect(
      action("first-contribution", 6, "Approved", "Looks good"),
    ).rejects.toThrow();
  });
  it("supports feedback, resubmission, approval and immutable audit", async () => {
    await as(reviewer);
    await action(
      "first-contribution",
      6,
      "Changes Requested",
      "Add reproduction steps.",
    );
    await as(member);
    await action(
      "first-contribution",
      7,
      "submit",
      "https://github.com/example/repo/pull/1",
    );
    await as(reviewer);
    await action(
      "first-contribution",
      8,
      "Approved",
      "Verified reproduction and acceptance criteria.",
    );
    expect(
      (
        await db.query(
          "select status from public.tasks where id='first-contribution'",
        )
      ).rows,
    ).toEqual([{ status: "Approved" }]);
    expect((await db.query("select * from public.reviews")).rows).toHaveLength(
      2,
    );
    await expect(db.exec("delete from public.audit_events")).rejects.toThrow();
  });
  it("rejects stale metadata edits and preserves approved state", async () => {
    await as(admin);
    const t = (
      await db.query("select * from public.tasks where id='first-contribution'")
    ).rows[0];
    await expect(
      db.query("select public.save_task($1,0)", [t]),
    ).rejects.toThrow("changed");
    await db.query("select public.save_task($1,9)", [
      { ...t, title: "Updated title", status: "Available" },
    ]);
    expect(
      (
        await db.query(
          "select status from public.tasks where id='first-contribution'",
        )
      ).rows,
    ).toEqual([{ status: "Approved" }]);
  });
  it("enforces prerequisites and rejects cycles", async () => {
    await as(admin);
    await db.query("select public.set_prerequisites($1,$2)", [
      "developer-profile",
      ["cli-task-manager"],
    ]);
    await expect(
      db.query("select public.set_prerequisites($1,$2)", [
        "cli-task-manager",
        ["developer-profile"],
      ]),
    ).rejects.toThrow("cycle");
    await as(member);
    await expect(action("developer-profile", 0, "claim")).rejects.toThrow(
      "prerequisite",
    );
    await expect(
      db.query("select public.set_prerequisites($1,$2)", [
        "developer-profile",
        [],
      ]),
    ).rejects.toThrow("Maintainer");
  });
  it("allows assigning a reviewer after submission without discarding review state", async () => {
    await as(member);
    await action("cli-task-manager", 0, "claim");
    await action("cli-task-manager", 1, "start");
    await action(
      "cli-task-manager",
      2,
      "submit",
      "https://github.com/example/repo/pull/2",
    );
    await as(admin);
    await action("cli-task-manager", 3, "assign", "", member, reviewer);
    expect(
      (
        await db.query(
          "select status from public.tasks where id='cli-task-manager'",
        )
      ).rows,
    ).toEqual([{ status: "Submitted for Review" }]);
    await as(reviewer);
    await action(
      "cli-task-manager",
      4,
      "Approved",
      "Verified the command-line task manager.",
    );
  });
});
