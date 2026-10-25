import { useState } from "react";
import { initiatives, CURATED_LIBRARY, type LibraryResource } from "./data";
import { Title, Ext, Link } from "./shared";

export function Resources() {
  const [query, Q] = useState("");
  const [category, C] = useState("");

  const initiativeExtras: LibraryResource[] = initiatives
    .flatMap((p) => p.resources)
    .filter((r) => r.url.startsWith("https://"))
    .filter((r) => !CURATED_LIBRARY.some((c) => c.url === r.url))
    .map((r) => ({
      name: r.name,
      url: r.url,
      category: "Documentation & Specs",
      topic: "Engineering Reference",
      difficulty: "Intermediate",
      summary: "Official documentation and learning material referenced in TDA project blueprints.",
    }));

  const resources = [
    ...new Map(
      [...CURATED_LIBRARY, ...initiativeExtras].map((r) => [r.url, r]),
    ).values(),
  ];

  const categories = [...new Set(resources.map((r) => r.category))];

  const matches = resources.filter(
    (r) =>
      (!category || r.category === category) &&
      `${r.name} ${r.topic} ${r.summary} ${r.category}`
        .toLowerCase()
        .includes(query.toLowerCase()),
  );

  return (
    <>
      <Title
        eyebrow="KEEP LEARNING · DOCUMENTATION, BOOKS & TOOLS"
        title="Resources for every path."
        text="Explore the curated TDA engineering library — official specifications, open textbooks, interactive curricula, practice platforms and developer tools."
      />
      <div className="filters card">
        <label className="search-label">
          Search resources
          <input
            value={query}
            onChange={(e) => Q(e.target.value)}
            placeholder="Try Git, React, algorithms, SQL, OSTEP, OWASP, compilers…"
          />
        </label>
        <label>
          Category
          <select value={category} onChange={(e) => C(e.target.value)}>
            <option value="">All categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </label>
        <button
          type="button"
          className="secondary"
          onClick={() => {
            Q("");
            C("");
          }}
        >
          Clear filters
        </button>
      </div>

      <div className="project-grid">
        {matches.map((r) => (
          <article className="card" key={r.url}>
            <div className="section-title">
              <span className="badge">{r.category}</span>
              <span className="muted">
                {r.topic} · {r.difficulty}
              </span>
            </div>
            <h2>
              <Ext url={r.url}>{r.name}</Ext>
            </h2>
            <p>{r.summary}</p>
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
            <p>
              <Link to={`project/${p.id}`}>
                View full architectural blueprint →
              </Link>
            </p>
          </details>
        ))}
      </section>
    </>
  );
}
