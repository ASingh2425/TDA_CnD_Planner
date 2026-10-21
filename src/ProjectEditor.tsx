import { useState } from "react";
import { rpc } from "./api";
import { message, type ProjectRow } from "./shared";
export function ProjectEditor({
  projects,
  onSave,
  notify,
}: {
  projects: ProjectRow[];
  onSave: () => Promise<void>;
  notify: (s: string) => void;
}) {
  const [selected, S] = useState<ProjectRow | null>(null),
    [busy, B] = useState(false);
  return (
    <section className="card">
      <h2>Create or edit an initiative</h2>
      <label>
        Choose an initiative
        <select
          value={selected?.id ?? ""}
          onChange={(e) =>
            S(projects.find((p) => p.id === e.target.value) ?? null)
          }
        >
          <option value="">Create a new initiative</option>
          {projects.map((p) => (
            <option value={p.id} key={p.id}>
              {p.title}
            </option>
          ))}
        </select>
      </label>
      <form
        key={selected?.id ?? "new"}
        onSubmit={async (e) => {
          e.preventDefault();
          B(true);
          const f = new FormData(e.currentTarget);
          try {
            await rpc("save_initiative", {
              p_id: f.get("id"),
              p_title: f.get("title"),
              p_description: f.get("description"),
              p_status: f.get("status"),
              p_lead: String(f.get("lead")) || null,
              p_version: selected?.version ?? 0,
            });
            await onSave();
            S(null);
            notify("Initiative saved.");
          } catch (e) {
            notify(message(e));
          } finally {
            B(false);
          }
        }}
      >
        <div className="filters">
          <label>
            Stable ID
            <input
              name="id"
              defaultValue={selected?.id}
              readOnly={!!selected}
              required
              pattern="[a-z0-9-]+"
            />
          </label>
          <label>
            Title
            <input
              name="title"
              defaultValue={selected?.title}
              required
              maxLength={160}
            />
          </label>
          <label>
            Status
            <select name="status" defaultValue={selected?.status ?? "Proposed"}>
              {[
                "Proposed",
                "Planned",
                "In Progress",
                "In Review",
                "Released",
              ].map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </label>
          <label>
            Lead UUID (optional)
            <input name="lead" defaultValue={selected?.lead ?? ""} />
          </label>
        </div>
        <label>
          Description
          <textarea
            name="description"
            defaultValue={selected?.description}
            required
          />
        </label>
        <button disabled={busy}>Save initiative</button>
      </form>
    </section>
  );
}
