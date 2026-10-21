import { useState } from "react";
import { rpc } from "./api";
import { initiatives, tracks, type Task } from "./data";
export function TaskEditor({
  task,
  projects,
  onSave,
  onCancel,
  onError,
}: {
  task: Task;
  projects: { id: string; title: string }[];
  onSave: () => Promise<void>;
  onCancel: () => void;
  onError: (s: string) => void;
}) {
  const [busy, B] = useState(false);
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        B(true);
        const f = new FormData(e.currentTarget);
        const value = (key: string) => String(f.get(key) ?? "");
        const lines = (key: string) =>
          value(key)
            .split("\n")
            .map((x) => x.trim())
            .filter(Boolean);
        try {
          await rpc("save_task", {
            p_version: task.version,
            p_data: {
              ...task,
              id: value("id"),
              title: value("title"),
              description: value("description"),
              initiative_id: value("initiative_id"),
              track: value("track"),
              difficulty: value("difficulty"),
              effort: Number(value("effort")),
              skills: value("skills")
                .split(",")
                .map((x) => x.trim())
                .filter(Boolean),
              prerequisites: value("prerequisites"),
              deliverable: value("deliverable"),
              instructions: lines("instructions"),
              criteria: lines("criteria"),
              repository_url: value("repository_url"),
              resources: lines("resources").map((url) => ({
                name: new URL(url).hostname,
                url,
              })),
            },
          });
          await onSave();
        } catch (e) {
          onError(e instanceof Error ? e.message : "Could not save task");
        } finally {
          B(false);
        }
      }}
    >
      <h3>Task details</h3>
      <div className="filters">
        <label>
          Stable task ID
          <input
            name="id"
            defaultValue={task.id}
            required
            readOnly={!task.id.startsWith("task-")}
            pattern="[a-z0-9-]+"
          />
        </label>
        <label>
          Title
          <input
            name="title"
            defaultValue={task.title}
            required
            maxLength={160}
          />
        </label>
        <label>
          Initiative
          <select name="initiative_id" defaultValue={task.initiative_id}>
            {(projects.length ? projects : initiatives).map((p) => (
              <option key={p.id} value={p.id}>
                {p.title}
              </option>
            ))}
          </select>
        </label>
        <label>
          Track
          <select name="track" defaultValue={task.track}>
            {tracks.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </label>
        <label>
          Difficulty
          <select name="difficulty" defaultValue={task.difficulty}>
            {["Beginner", "Intermediate", "Advanced"].map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </label>
        <label>
          Estimated hours
          <input
            type="number"
            name="effort"
            min={1}
            max={500}
            defaultValue={task.effort}
            required
          />
        </label>
      </div>
      {[
        ["description", "Purpose", task.description],
        ["prerequisites", "Prerequisites (plain language)", task.prerequisites],
        ["deliverable", "Expected deliverable", task.deliverable],
        [
          "instructions",
          "Instructions (one per line)",
          task.instructions.join("\n"),
        ],
        [
          "criteria",
          "Acceptance criteria (one per line)",
          task.criteria.join("\n"),
        ],
      ].map(([name, label, value]) => (
        <label key={name}>
          {label}
          <textarea name={name} defaultValue={value} required />
        </label>
      ))}
      <label>
        Skills (comma separated)
        <input name="skills" defaultValue={task.skills.join(", ")} required />
      </label>
      <label>
        Repository URL
        <input
          name="repository_url"
          type="url"
          pattern="https://.*"
          defaultValue={task.repository_url}
          required
        />
      </label>
      <label>
        Resource URLs (one per line)
        <textarea
          name="resources"
          defaultValue={task.resources.map((r) => r.url).join("\n")}
        />
      </label>
      <div className="actions">
        <button disabled={busy}>Save task</button>
        <button type="button" className="secondary" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}
