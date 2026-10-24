import { useState } from "react";
import { initiatives } from "./data";
import { Title, Ext } from "./shared";
export function Resources() {
  const [query, Q] = useState("");
  const resources = [
    ...new Map(
      initiatives
        .flatMap((p) => p.resources)
        .filter((r) => r.url.startsWith("https://"))
        .map((r) => [r.url, r]),
    ).values(),
  ];
  const matches = resources.filter((r) =>
    r.name.toLowerCase().includes(query.toLowerCase()),
  );
  return (
    <>
      <Title
        eyebrow="KEEP LEARNING"
        title="Resources for every path."
        text="Explore the original TDA learning library. Everything here is open to everyone — choose what helps you next."
      />
      <label>
        Search resources
        <input
          value={query}
          onChange={(e) => Q(e.target.value)}
          placeholder="Try Git, React, algorithms…"
        />
      </label>
      <div className="project-grid">
        {matches.map((r) => (
          <article className="card" key={r.url}>
            <h2>
              <Ext url={r.url}>{r.name}</Ext>
            </h2>
          </article>
        ))}
      </div>
      {!matches.length && (
        <p role="status">No matching resources. Try another topic.</p>
      )}
      <section className="card" style={{ marginTop: 24 }}>
        <h2>TDA project roadmap</h2>
        <p>
          The original 12 initiatives and 48 milestones are preserved as
          reference material. These describe project ideas, not required steps
          or recorded completion.
        </p>
        {initiatives.map((p) => (
          <details key={p.id}>
            <summary>{p.title}</summary>
            <p>{p.description}</p>
            <ul>
              {p.tasks.map((t) => (
                <li key={t.id}>{t.text}</li>
              ))}
            </ul>
          </details>
        ))}
      </section>
    </>
  );
}
