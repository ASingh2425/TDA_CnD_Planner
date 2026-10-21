import { useState } from "react";
import { ProjectEditor } from "./ProjectEditor";
import { TaskEditor } from "./TaskEditor";
import type { User } from "@supabase/supabase-js";
import { LockKeyhole } from "lucide-react";
import { db, rpc } from "./api";
import { initiatives, tasks as catalog, type Task } from "./data";
import {
  Title,
  Link,
  message,
  type Assignment,
  type ProjectRow,
} from "./shared";
export function Maintainer({
  user,
  role,
  tasks,
  projects,
  assignments,
  refresh,
  notify,
  act,
}: {
  user: User | null;
  role: string;
  tasks: Task[];
  projects: ProjectRow[];
  assignments: Assignment[];
  refresh: () => Promise<void>;
  notify: (s: string) => void;
  act: (
    t: Task,
    a: string,
    v?: string,
    m?: string | null,
    r?: string | null,
  ) => Promise<void>;
}) {
  const [editing, E] = useState<Task | null>(null);
  if (!user || !["maintainer", "admin", "reviewer"].includes(role))
    return (
      <>
        <Title
          eyebrow="FOR TEAM LEADS & REVIEWERS"
          title="Maintainer workspace."
          text="Manage shared work, unblock members and keep feedback moving."
        />
        <div className="empty">
          <LockKeyhole />
          <h2>Authorized access required</h2>
          <p>
            {db
              ? "Sign in with an account granted a reviewer, maintainer or administrator role."
              : "The shared workspace needs Supabase configuration before operational access is available."}
          </p>
          <p>
            Roles are checked by the database. Signing in does not grant
            administrative access.
          </p>
        </div>
      </>
    );
  const manager = ["maintainer", "admin"].includes(role);
  return (
    <>
      <Title
        eyebrow="KEEP THE TEAM MOVING"
        title="Maintainer workspace."
        text="Review submissions, resolve blockers and create focused work. Milestones remain planning records, separate from approved contributions."
      />
      <div className="summary-grid">
        {["Submitted for Review", "Blocked", "Approved"].map((s) => (
          <div className="card" key={s}>
            <strong className="big-number">
              {tasks.filter((t) => t.status === s).length}
            </strong>
            <p>{s}</p>
          </div>
        ))}
      </div>
      <section className="card">
        <h2>Review & blocker queue</h2>
        {tasks
          .filter(
            (t) =>
              ["Submitted for Review", "Blocked"].includes(t.status) &&
              assignments.some(
                (a) =>
                  a.task_id === t.id && (manager || a.reviewer_id === user.id),
              ),
          )
          .map((t) => (
            <p key={t.id}>
              <Link to={`task/${t.id}`}>{t.title}</Link> — {t.status}
            </p>
          ))}
        {!tasks.some((t) =>
          ["Submitted for Review", "Blocked"].includes(t.status),
        ) && <p>No outstanding reviews or blockers.</p>}
      </section>
      {manager && (
        <>
          <section className="card">
            <div className="section-title">
              <h2>Manage tasks</h2>
              <button
                onClick={() => {
                  E({
                    ...catalog[0],
                    id: `task-${Date.now()}`,
                    title: "New scoped task",
                  });
                }}
              >
                Create task
              </button>
            </div>
            <p>
              Assign members and reviewers using the UUID from their account
              page. Reviewers must have an elevated role and cannot review their
              own work.
            </p>
            {tasks.map((t) => (
              <details key={t.id}>
                <summary>
                  {t.title} · {t.status}
                  {t.archived ? " · Archived" : ""}
                </summary>
                <Link to={`task/${t.id}`}>Open task</Link>
                <div className="actions">
                  <button
                    className="secondary"
                    onClick={() => {
                      E(t);
                    }}
                  >
                    Edit details
                  </button>
                  <button
                    className="secondary"
                    disabled={t.archived}
                    onClick={() => void act(t, "archive")}
                  >
                    Archive task
                  </button>
                </div>
                <form
                  className="filters"
                  onSubmit={(e) => {
                    e.preventDefault();
                    const f = new FormData(e.currentTarget);
                    void act(
                      t,
                      "assign",
                      "",
                      String(f.get("member")),
                      String(f.get("reviewer")) || null,
                    );
                  }}
                >
                  <label>
                    Member UUID
                    <input
                      name="member"
                      required
                      defaultValue={
                        assignments.find((a) => a.task_id === t.id)
                          ?.member_id ?? ""
                      }
                    />
                  </label>
                  <label>
                    Reviewer UUID
                    <input
                      name="reviewer"
                      defaultValue={
                        assignments.find((a) => a.task_id === t.id)
                          ?.reviewer_id ?? ""
                      }
                    />
                  </label>
                  <button>Save assignment</button>
                </form>
                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    try {
                      await rpc("set_prerequisites", {
                        p_task: t.id,
                        p_required: String(
                          new FormData(e.currentTarget).get("required"),
                        )
                          .split(",")
                          .map((x) => x.trim())
                          .filter(Boolean),
                      });
                      notify("Prerequisites updated.");
                    } catch (err) {
                      notify(message(err));
                    }
                  }}
                >
                  <label>
                    Required task IDs (comma separated; leave empty to clear)
                    <input name="required" />
                  </label>
                  <button className="secondary">Set prerequisites</button>
                </form>
              </details>
            ))}
            {editing && (
              <TaskEditor
                key={editing.id}
                task={editing}
                projects={projects}
                onCancel={() => E(null)}
                onError={notify}
                onSave={async () => {
                  E(null);
                  await refresh();
                  notify("Task saved.");
                }}
              />
            )}
          </section>
          <ProjectEditor projects={projects} onSave={refresh} notify={notify} />
          <section className="card">
            <h2>Original strategic roadmap</h2>
            <p>
              All 48 milestones and 12 initiative specifications are retained
              below. These are planning definitions, not member approvals.
              Original stack recommendations are historical and may differ from
              this implementation.
            </p>
            {initiatives.map((p) => (
              <details key={p.id}>
                <summary>
                  {p.title} · {p.tasks.length} milestones
                </summary>
                <p>{p.description}</p>
                <div className="chips">
                  {p.stack.map((s) => (
                    <span key={s}>{s}</span>
                  ))}
                </div>
                <ul>
                  {p.guidelines.map((g) => (
                    <li key={g}>{g}</li>
                  ))}
                </ul>
                <ol>
                  {p.tasks.map((t) => (
                    <li key={t.id}>
                      {t.id}: {t.text}
                    </li>
                  ))}
                </ol>
              </details>
            ))}
          </section>
          <button
            className="secondary"
            onClick={async () => {
              try {
                const audit = await db!
                  .from("audit_events")
                  .select("*")
                  .order("created_at");
                if (audit.error) throw audit.error;
                const blob = new Blob(
                  [
                    JSON.stringify(
                      {
                        exported_at: new Date().toISOString(),
                        tasks,
                        assignments,
                        audit: audit.data,
                      },
                      null,
                      2,
                    ),
                  ],
                  { type: "application/json" },
                );
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = "tda-work-summary.json";
                a.click();
                URL.revokeObjectURL(url);
              } catch (e) {
                notify(message(e));
              }
            }}
          >
            Export task summary & audit history
          </button>
        </>
      )}
    </>
  );
}
