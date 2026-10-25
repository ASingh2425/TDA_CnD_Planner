import { useEffect, useState } from "react";
import { ArrowRight, ArrowUpRight, Compass } from "lucide-react";
import {
  initiatives,
  tracks,
  stages,
  topics,
  problems,
  tasks as allTasks,
  PROJECT_BLUEPRINTS,
  ENGINEERING_LABS,
  CURRICULUM_MODULES,
  COMPLEXITY_GUIDE,
  type Task,
  type ProjectBlueprint,
} from "./data";
import { Visualizer } from "./Visualizer";
import { Link, Ext, Title } from "./shared";

export function Learning({ selected }: { selected: number }) {
  const [track, S] = useState(selected);
  const [moduleFilter, MF] = useState("All");

  const filteredModules = CURRICULUM_MODULES.filter(
    (m) => moduleFilter === "All" || m.category === moduleFilter,
  );

  return (
    <>
      <Title
        eyebrow="01. LEARN · ROADMAPS & CORE DISCIPLINES"
        title="Learn with a purpose."
        text="Choose a track. Build something tangible. Already know a stage? Move ahead to the skills you want to learn."
      />
      <div className="track-tabs">
        {tracks.map((t, i) => (
          <button
            className={track === i ? "" : "secondary"}
            key={t}
            onClick={() => {
              S(i);
              MF(tracks[i]);
            }}
          >
            {t}
          </button>
        ))}
        <button
          className={moduleFilter === "All" && track === -1 ? "" : "secondary"}
          onClick={() => {
            S(-1);
            MF("All");
          }}
        >
          All 10 Core Tracks
        </button>
      </div>

      {(track === 0 || track === 1) && (
        <div className="stage-list">
          {stages.map((s, i) => (
            <article className="card stage" key={s.title}>
              <span className="stage-index">0{i + 1}</span>
              <div>
                <span className="eyebrow">
                  {i === 0
                    ? "START HERE"
                    : `AFTER STAGE ${i} OR EQUIVALENT EXPERIENCE`}
                </span>
                <h2>{s.title}</h2>
                <p>{s.topics}</p>
                <p>
                  <b>Build & deliver:</b> {s.deliverable}.
                </p>
                <p>
                  <b>Completion criteria:</b> Demonstrate the working result,
                  explain your choices and check your result against the
                  exercise criteria.
                </p>
                <Ext url={s.resource}>Learning resource</Ext>
                <p>
                  <Link to={`task/${s.task}`}>Open a practical task →</Link>
                </p>
                <small>
                  Next:{" "}
                  {stages[i + 1]?.title ??
                    "Choose a project idea and build something useful."}
                </small>
              </div>
            </article>
          ))}
        </div>
      )}

      {track === 2 && (
        <>
          <TopicRoadmap />
          <p>
            <Link className="button" to="cp">
              Open the CP workspace <ArrowRight size={16} />
            </Link>
          </p>
        </>
      )}

      {track === 3 && (
        <div className="card">
          <h2>Engineering experiments · Advanced</h2>
          <p>
            Explore algorithm visualization, systems programming, developer
            tooling, performance benchmarks, open source, AI applications and
            cybersecurity labs.
          </p>
          <p>
            Prerequisites: comfortable programming, Git workflows and tests.
            Start with a working baseline before adding experimental technology.
          </p>
          <p>
            Deliver a reproducible prototype, benchmark or tool with a problem
            statement, methodology, tests and limitations. Document what works
            and what still needs improvement.
          </p>
          <div className="actions">
            <Link to="explore" className="button">
              Open Engineering Labs <ArrowRight size={16} />
            </Link>
            <Link
              to="tasks?track=Engineering%20Experiments"
              className="button secondary"
            >
              Find an experiment exercise →
            </Link>
            <Ext url="https://craftinginterpreters.com">
              Build-from-scratch resource
            </Ext>
          </div>
        </div>
      )}

      <div className="section-title" style={{ marginTop: 32 }}>
        <div>
          <span className="eyebrow">DEEP TECHNICAL CURRICULUM</span>
          <h2>10 Core Engineering Modules</h2>
        </div>
        <label>
          Filter curriculum
          <select
            value={moduleFilter}
            onChange={(e) => MF(e.target.value)}
          >
            {["All", ...tracks].map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="project-grid">
        {filteredModules.map((mod) => (
          <article className="card" key={mod.id}>
            <div className="section-title">
              <span className="project-number">{mod.number}</span>
              <span className="badge">
                {mod.category} · {mod.difficulty}
              </span>
            </div>
            <h2>{mod.title}</h2>
            <p>{mod.summary}</p>
            <p className="muted">
              <strong>Prerequisites:</strong> {mod.prerequisites}
            </p>
            <h3>Core mental models</h3>
            <ul>
              {mod.mentalModels.map((mm) => (
                <li key={mm}>{mm}</li>
              ))}
            </ul>
            <details>
              <summary>
                Learning objectives & ordered study path ({mod.objectives.length}{" "}
                objectives)
              </summary>
              <h3>Learning objectives</h3>
              <ul>
                {mod.objectives.map((obj) => (
                  <li key={obj}>{obj}</li>
                ))}
              </ul>
              <h3>Study path</h3>
              <ol>
                {mod.roadmapSteps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
              <h3>External references</h3>
              {mod.resources.map((r) => (
                <p key={r.url}>
                  <Ext url={r.url}>{r.name}</Ext>
                </p>
              ))}
            </details>
            <h3>Practise exercises in this module</h3>
            <div className="chips">
              {mod.taskIds.map((tid) => {
                const taskObj = allTasks.find((x) => x.id === tid);
                return taskObj ? (
                  <Link key={tid} to={`task/${tid}`} className="chip-link">
                    {taskObj.title} →
                  </Link>
                ) : null;
              })}
            </div>
            <div className="card-link">
              {mod.projectIds[0] ? (
                <Link to={`project/${mod.projectIds[0]}`}>
                  Guided blueprint:{" "}
                  {PROJECT_BLUEPRINTS.find((b) => b.id === mod.projectIds[0])
                    ?.title ?? mod.projectIds[0]}{" "}
                  →
                </Link>
              ) : (
                <Link to="tasks">Explore exercises →</Link>
              )}
            </div>
          </article>
        ))}
      </div>
    </>
  );
}

export function TaskList({
  tasks,
  initial,
}: {
  tasks: Task[];
  initial: string;
}) {
  const [q, Q] = useState(""),
    [track, T] = useState(initial),
    [category, C] = useState(""),
    [difficulty, D] = useState(""),
    [skill, S] = useState(""),
    [effort, E] = useState(""),
    [project, P] = useState(
      new URLSearchParams(location.hash.split("?")[1]).get("project") ?? "",
    );

  useEffect(() => {
    T(initial);
    P(new URLSearchParams(location.hash.split("?")[1]).get("project") ?? "");
  }, [initial, location.hash]);

  const categories = [...new Set(tasks.map((t) => t.category))];

  const filtered = tasks.filter(
    (t) =>
      (!q ||
        `${t.title} ${t.description} ${t.overview} ${t.category} ${t.skills.join(" ")}`
          .toLowerCase()
          .includes(q.toLowerCase())) &&
      (!track || t.track === track) &&
      (!category || t.category === category) &&
      (!difficulty || t.difficulty === difficulty) &&
      (!skill || t.skills.includes(skill)) &&
      (!effort || t.effort <= Number(effort)) &&
      (!project || t.initiative_id === project),
  );

  return (
    <>
      <Title
        eyebrow="02. PRACTISE · SELF-CONTAINED CODING EXERCISES"
        title="Find your next task."
        text="Every exercise includes a problem statement, constraints, expected output, hints, test cases and acceptance criteria. Pick any exercise that fits your interests."
      />
      <div className="filters card">
        <label className="search-label">
          Search tasks
          <input
            placeholder="Try Git, profile, algorithms, SQL, Docker, RAG, XSS…"
            value={q}
            onChange={(e) => Q(e.target.value)}
          />
        </label>
        {[
          ["Track", track, T, tracks],
          ["Category", category, C, categories],
          [
            "Difficulty",
            difficulty,
            D,
            ["Beginner", "Intermediate", "Advanced"],
          ],
          ["Skill", skill, S, [...new Set(tasks.flatMap((t) => t.skills))]],
          ["Effort", effort, E, ["2", "4", "8", "12"]],
        ].map(([label, value, set, options]) => (
          <label key={label as string}>
            {label as string}
            <select
              value={value as string}
              onChange={(e) => (set as (s: string) => void)(e.target.value)}
            >
              <option value="">All</option>
              {(options as string[]).map((o) => (
                <option key={o} value={o}>
                  {label === "Effort" ? `Up to ${o} hours` : o}
                </option>
              ))}
            </select>
          </label>
        ))}
        <label>
          Project
          <select value={project} onChange={(e) => P(e.target.value)}>
            <option value="">All projects</option>
            {initiatives.map((p) => (
              <option key={p.id} value={p.id}>
                {p.title}
              </option>
            ))}
          </select>
        </label>
        <button
          className="secondary"
          onClick={() => {
            Q("");
            T("");
            C("");
            D("");
            S("");
            E("");
            P("");
          }}
        >
          Clear filters
        </button>
      </div>

      <p className="muted">
        {filtered.length} tasks · Open practice catalog across{" "}
        {categories.length} engineering disciplines
      </p>

      <div className="project-grid">
        {filtered.map((t) => (
          <Link className="card task-card" to={`task/${t.id}`} key={t.id}>
            <div className="section-title">
              <span className="badge">
                {t.difficulty} · {t.category}
              </span>
              <span className="muted">{t.effort} hours</span>
            </div>
            <h2>{t.title}</h2>
            <p>{t.description}</p>
            <div className="chips">
              {t.skills.map((s) => (
                <span key={s}>{s}</span>
              ))}
            </div>
            <div className="card-link">
              <span>Explore task</span>
              <ArrowUpRight size={18} />
            </div>
          </Link>
        ))}
      </div>
      {!filtered.length && (
        <div className="empty">
          <Compass />
          <h2>No matching tasks yet.</h2>
          <p>
            Try fewer filters or explore the learning paths to find another
            exercise.
          </p>
        </div>
      )}
    </>
  );
}

export function TaskDetail({ task: t }: { task?: Task }) {
  if (!t)
    return (
      <Title
        eyebrow="TASK NOT FOUND"
        title="This task is unavailable."
        text="Explore the task catalog to find something to build."
      />
    );

  const prereqTasks = t.prerequisiteIds
    .map((id) => allTasks.find((x) => x.id === id))
    .filter((x): x is Task => Boolean(x));

  const relatedTasks = t.relatedIds
    .map((id) => allTasks.find((x) => x.id === id))
    .filter((x): x is Task => Boolean(x));

  const parentBlueprint = PROJECT_BLUEPRINTS.find(
    (b) => b.id === t.initiative_id,
  );

  return (
    <>
      <Link to="tasks">← All tasks</Link>
      <Title
        eyebrow={`${t.track} / ${t.category} / ${t.difficulty} / ${t.effort} HOURS`}
        title={t.title}
        text={t.description}
      />
      <div className="detail-grid">
        <section className="card">
          <h2>Overview</h2>
          <p>{t.overview}</p>

          <h2>What you’ll deliver</h2>
          <p>{t.deliverable}</p>

          <h3>Before you start</h3>
          <p>{t.prerequisites}</p>
          {prereqTasks.length > 0 && (
            <div className="chips">
              {prereqTasks.map((pt) => (
                <Link key={pt.id} to={`task/${pt.id}`} className="chip-link">
                  Prerequisite: {pt.title} →
                </Link>
              ))}
            </div>
          )}
          <div className="chips">
            {t.skills.map((s) => (
              <span key={s}>{s}</span>
            ))}
          </div>

          <h3>Learning objectives</h3>
          <ul>
            {t.objectives.map((obj) => (
              <li key={obj}>{obj}</li>
            ))}
          </ul>

          <h3>Problem statement</h3>
          <p>{t.problemStatement}</p>

          <h3>Constraints & requirements</h3>
          <ul>
            {t.constraints.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>

          <h3>Expected output & behaviour</h3>
          <pre className="code-block">{t.expectedOutput}</pre>

          <h3>Step by step</h3>
          <ol>
            {t.instructions.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ol>

          <h3>Test cases & edge cases</h3>
          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Scenario / Input</th>
                  <th>Expected Behaviour</th>
                  <th>Focus</th>
                </tr>
              </thead>
              <tbody>
                {t.testCases.map((tc) => (
                  <tr key={tc.input}>
                    <td>{tc.input}</td>
                    <td>{tc.expected}</td>
                    <td>{tc.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <details>
            <summary>Progressive hints ({t.hints.length})</summary>
            <ul>
              {t.hints.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
          </details>

          <details>
            <summary>Solution reference & architectural pattern</summary>
            <p>{t.solutionReference}</p>
          </details>

          <h3>What success looks like</h3>
          <ul>
            {t.criteria.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>

          <h3>Further challenges</h3>
          <ul>
            {t.furtherChallenges.map((fc) => (
              <li key={fc}>{fc}</li>
            ))}
          </ul>

          <h3>Useful resources</h3>
          {t.resources.map((r) => (
            <p key={r.url}>
              <Ext url={r.url}>{r.name}</Ext>
            </p>
          ))}
          <Ext url={t.repository_url}>Project repository</Ext>
        </section>

        <section className="card task-actions">
          <span className="badge">Open to everyone</span>
          <h2>Start whenever you’re ready.</h2>
          <p>
            No account, assignment or approval is needed to explore this task.
            Use the steps as a practical exercise and check your result against
            the criteria.
          </p>
          <p>
            Build in your own repository, test your work and share what you
            learned with the TDA community.
          </p>
          {parentBlueprint && (
            <>
              <h3>Part of guided project</h3>
              <p>
                <Link to={`project/${parentBlueprint.id}`}>
                  {parentBlueprint.title} →
                </Link>
              </p>
            </>
          )}
          {relatedTasks.length > 0 && (
            <>
              <h3>Related exercises</h3>
              <ul>
                {relatedTasks.map((rt) => (
                  <li key={rt.id}>
                    <Link to={`task/${rt.id}`}>
                      {rt.title} ({rt.difficulty})
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          )}
          <Link to="learn" className="button">
            Explore learning tracks →
          </Link>
        </section>
      </div>
    </>
  );
}

export function ProjectCatalog() {
  const [discipline, D] = useState(""),
    [difficulty, Diff] = useState(""),
    [q, Q] = useState("");

  const disciplines = [
    ...new Set(PROJECT_BLUEPRINTS.map((p) => p.discipline)),
  ];

  const filtered = PROJECT_BLUEPRINTS.filter(
    (p) =>
      (!discipline || p.discipline === discipline) &&
      (!difficulty || p.difficulty === difficulty) &&
      (!q ||
        `${p.title} ${p.tagline} ${p.overview} ${p.techStack.recommended.join(" ")}`
          .toLowerCase()
          .includes(q.toLowerCase())),
  );

  return (
    <>
      <Title
        eyebrow="03. BUILD · GUIDED ENGINEERING BLUEPRINTS"
        title="Build with TDA."
        text="Twelve initiatives and complete architectural blueprints. Every project includes problem statements, recommended stacks, folder structures, implementation steps, testing checklists and extension ideas."
      />
      <div className="filters card">
        <label className="search-label">
          Search projects
          <input
            placeholder="Try systems, Next.js, compiler, RAG, cryptography…"
            value={q}
            onChange={(e) => Q(e.target.value)}
          />
        </label>
        <label>
          Discipline
          <select value={discipline} onChange={(e) => D(e.target.value)}>
            <option value="">All disciplines</option>
            {disciplines.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </label>
        <label>
          Difficulty
          <select value={difficulty} onChange={(e) => Diff(e.target.value)}>
            <option value="">All levels</option>
            {["Beginner", "Intermediate", "Advanced"].map((lvl) => (
              <option key={lvl} value={lvl}>
                {lvl}
              </option>
            ))}
          </select>
        </label>
        <button
          type="button"
          className="secondary"
          onClick={() => {
            Q("");
            D("");
            Diff("");
          }}
        >
          Clear filters
        </button>
      </div>

      <div className="project-grid">
        {filtered.map((p, i) => {
          const initiative = initiatives.find((init) => init.id === p.id);
          return (
            <article className="card" key={p.id}>
              <div className="section-title">
                <span className="project-number">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="badge">
                  {p.discipline} · {p.difficulty}
                </span>
              </div>
              <h2>{p.title}</h2>
              <p>{p.tagline}</p>
              <p className="muted">
                Estimated effort: {p.effortHours} ·{" "}
                {p.relatedTaskIds.length} linked exercises
              </p>
              <div className="chips">
                {p.techStack.recommended.map((s) => (
                  <span key={s}>{s}</span>
                ))}
              </div>
              <details>
                <summary>Deliverables, architecture & resources</summary>
                <p>{p.overview}</p>
                <h3>Deliverables</h3>
                <ul>
                  {p.deliverables.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                  {initiative?.tasks.map((t) => (
                    <li key={t.id}>{t.text}</li>
                  ))}
                </ul>
                {p.resources.map((r) => (
                  <p key={r.url}>
                    <Ext url={r.url}>{r.name}</Ext>
                  </p>
                ))}
              </details>
              <div className="card-link">
                <Link to={`project/${p.id}`}>
                  Open project blueprint <ArrowRight size={16} />
                </Link>
                <Link to={`tasks?project=${p.id}`}>
                  Explore contribution tasks <ArrowUpRight size={16} />
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </>
  );
}

export function ProjectDetail({ project: p }: { project?: ProjectBlueprint }) {
  if (!p)
    return (
      <Title
        eyebrow="PROJECT NOT FOUND"
        title="This project blueprint is unavailable."
        text="Return to Build with TDA to explore guided project blueprints."
      />
    );

  const prereqTasks = p.prerequisiteTaskIds
    .map((id) => allTasks.find((t) => t.id === id))
    .filter((t): t is Task => Boolean(t));

  const linkedTasks = p.relatedTaskIds
    .map((id) => allTasks.find((t) => t.id === id))
    .filter((t): t is Task => Boolean(t));

  return (
    <>
      <Link to="projects">← All guided projects</Link>
      <Title
        eyebrow={`${p.discipline} / ${p.difficulty} / ${p.effortHours}`}
        title={p.title}
        text={p.tagline}
      />
      <div className="detail-grid">
        <section className="card">
          <h2>Overview</h2>
          <p>{p.overview}</p>

          <h3>Difficulty and prerequisites</h3>
          <p>
            <strong>{p.difficulty}</strong> ({p.effortHours}) —{" "}
            {p.prerequisites}
          </p>
          {prereqTasks.length > 0 && (
            <div className="chips">
              {prereqTasks.map((pt) => (
                <Link key={pt.id} to={`task/${pt.id}`} className="chip-link">
                  Prerequisite exercise: {pt.title} →
                </Link>
              ))}
            </div>
          )}

          <h3>Tech stack</h3>
          <p>
            <strong>Recommended:</strong> {p.techStack.recommended.join(" · ")}
          </p>
          <p>
            <strong>Alternatives:</strong>{" "}
            {p.techStack.alternatives.join(" · ")}
          </p>

          <h3>Learning objectives</h3>
          <ul>
            {p.objectives.map((obj) => (
              <li key={obj}>{obj}</li>
            ))}
          </ul>

          <h3>Architecture & folder structure</h3>
          <p>{p.architecture}</p>
          <pre className="code-block">{p.folderStructure}</pre>

          <h3>Implementation guide</h3>
          <ol>
            {p.implementationGuide.map((step) => (
              <li key={step.step}>
                <strong>{step.step}:</strong> {step.detail}
              </li>
            ))}
          </ol>

          <h3>Deliverables and acceptance checklist</h3>
          <ul>
            {p.deliverables.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>

          <h3>Testing & validation methods</h3>
          <ul>
            {p.testing.map((testItem) => (
              <li key={testItem}>{testItem}</li>
            ))}
          </ul>

          <h3>Further challenges</h3>
          <ul>
            {p.furtherChallenges.map((fc) => (
              <li key={fc}>{fc}</li>
            ))}
          </ul>

          <h3>Resources & documentation</h3>
          {p.resources.map((r) => (
            <p key={r.url}>
              <Ext url={r.url}>{r.name}</Ext>
            </p>
          ))}
        </section>

        <section className="card task-actions">
          <span className="badge">Self-Directed Blueprint</span>
          <h2>Build in your own repository.</h2>
          <p>
            No submission workflow or approval is required. Use this blueprint
            to architect, test and document your own implementation from start
            to finish.
          </p>
          <h3>Companion exercises ({linkedTasks.length})</h3>
          <ul>
            {linkedTasks.map((lt) => (
              <li key={lt.id}>
                <Link to={`task/${lt.id}`}>
                  {lt.title} ({lt.difficulty})
                </Link>
              </li>
            ))}
          </ul>
          <Link to={`tasks?project=${p.id}`} className="button">
            Filter exercises for this project →
          </Link>
        </section>
      </div>
    </>
  );
}

export function ExploreLabs() {
  const [domain, D] = useState(""),
    [q, Q] = useState("");

  const domains = [...new Set(ENGINEERING_LABS.map((l) => l.domain))];
  const filtered = ENGINEERING_LABS.filter(
    (l) =>
      (!domain || l.domain === domain) &&
      (!q ||
        `${l.title} ${l.summary} ${l.hypothesis} ${l.domain}`
          .toLowerCase()
          .includes(q.toLowerCase())),
  );

  return (
    <>
      <Title
        eyebrow="04. EXPLORE · ADVANCED ENGINEERING LABS & RESEARCH"
        title="Advanced Engineering Labs."
        text="Deep-dive sandboxes in systems programming, cybersecurity, AI/ML, wire protocols, performance optimisation and open-source developer tooling."
      />
      <div className="filters card">
        <label className="search-label">
          Search labs
          <input
            placeholder="Try WAL, BPE, micrograd, XSS, SSRF, DNS, benchmark…"
            value={q}
            onChange={(e) => Q(e.target.value)}
          />
        </label>
        <label>
          Domain
          <select value={domain} onChange={(e) => D(e.target.value)}>
            <option value="">All domains</option>
            {domains.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </label>
        <button
          type="button"
          className="secondary"
          onClick={() => {
            Q("");
            D("");
          }}
        >
          Clear filters
        </button>
      </div>

      <div className="project-grid">
        {filtered.map((lab, idx) => (
          <article className="card" key={lab.id}>
            <div className="section-title">
              <span className="project-number">
                0{idx + 1}
              </span>
              <span className="badge">
                {lab.domain} · {lab.difficulty} · {lab.duration}
              </span>
            </div>
            <h2>{lab.title}</h2>
            <p>{lab.summary}</p>
            <p>
              <strong>Core hypothesis:</strong> {lab.hypothesis}
            </p>
            <p className="muted">
              <strong>Prerequisites:</strong> {lab.prerequisites}
            </p>
            <h3>Architecture & mechanism</h3>
            <p>{lab.architectureNotes}</p>
            <details>
              <summary>
                Experiment protocol & validation checklist (
                {lab.experimentSteps.length} steps)
              </summary>
              <h3>Ordered experiment steps</h3>
              <ol>
                {lab.experimentSteps.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ol>
              <h3>Validation checklist</h3>
              <ul>
                {lab.validationChecklist.map((v) => (
                  <li key={v}>{v}</li>
                ))}
              </ul>
              <h3>Further exploration</h3>
              <ul>
                {lab.furtherExploration.map((fe) => (
                  <li key={fe}>{fe}</li>
                ))}
              </ul>
              {lab.resources.map((r) => (
                <p key={r.url}>
                  <Ext url={r.url}>{r.name}</Ext>
                </p>
              ))}
            </details>
            <h3>Hands-on lab exercises</h3>
            <div className="chips">
              {lab.linkedTaskIds.map((tid) => {
                const taskObj = allTasks.find((t) => t.id === tid);
                return taskObj ? (
                  <Link key={tid} to={`task/${tid}`} className="chip-link">
                    {taskObj.title} →
                  </Link>
                ) : null;
              })}
            </div>
            <div className="card-link">
              <Link to={`project/${lab.linkedProjectId}`}>
                Open companion project blueprint →
              </Link>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}

function TopicRoadmap() {
  return (
    <div className="card">
      <h2>Your problem-solving roadmap</h2>
      <p>
        Follow this order. Each topic builds on the previous topics; demonstrate
        equivalent knowledge to skip ahead.
      </p>
      <ol className="topic-list">
        {topics.map((t, i) => (
          <li key={t}>
            <strong>{t}</strong>
            <small>
              {i === 0
                ? "No prerequisites"
                : `After ${topics[i - 1].toLowerCase()}`}
            </small>
          </li>
        ))}
      </ol>
      <p>
        For each topic: read a guide, solve two relevant problems, explain your
        complexity, then verify your invariant on boundary inputs.
      </p>
      <Ext url="https://usaco.guide/">Study guides and practice sets</Ext>
    </div>
  );
}

export function CP() {
  const [topic, T] = useState(""),
    [difficulty, D] = useState(""),
    [search, Q] = useState("");

  const filteredProblems = problems.filter(
    (p) =>
      (!topic || p.topic === topic) &&
      (!difficulty || p.difficulty === difficulty) &&
      (!search ||
        `${p.title} ${p.pattern} ${p.topic} ${p.insight}`
          .toLowerCase()
          .includes(search.toLowerCase())),
  );

  return (
    <>
      <Title
        eyebrow="05. COMPETITIVE PROGRAMMING · PATTERNS, VISUALISERS & PROBLEM SETS"
        title="Your problem-solving space."
        text="Learn a pattern, try a problem, and understand why your solution works. Choose any topic and practice at your own pace."
      />
      <Visualizer />

      <details className="card">
        <summary>Explore the 14-stage topic roadmap & complexity guide</summary>
        <TopicRoadmap />
        <div className="card" style={{ marginTop: 16 }}>
          <h3>Input constraint → Target time complexity</h3>
          <p>
            Standard contest judges execute roughly 10⁸ simple operations per
            second. Use the maximum constraint <code>n</code> to narrow down
            viable algorithms before writing code:
          </p>
          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Max Input Bound (n)</th>
                  <th>Safe Time Complexity</th>
                  <th>Candidate Algorithmic Patterns</th>
                </tr>
              </thead>
              <tbody>
                {COMPLEXITY_GUIDE.map((row) => (
                  <tr key={row.bound}>
                    <td>
                      <code>{row.bound}</code>
                    </td>
                    <td>
                      <strong>{row.targetComplexity}</strong>
                    </td>
                    <td>{row.typicalPatterns}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </details>

      <div className="section-title">
        <div>
          <span className="eyebrow">CURATED PATTERN PROBLEM BANK</span>
          <h2>Topic-wise problem set ({filteredProblems.length} problems)</h2>
        </div>
        <span className="muted">Practice freely at your own pace</span>
      </div>

      <div className="filters card">
        <label className="search-label">
          Search problems or patterns
          <input
            placeholder="Try monotonic stack, Dijkstra, knapsack, binary search…"
            value={search}
            onChange={(e) => Q(e.target.value)}
          />
        </label>
        <label>
          Pattern
          <select value={topic} onChange={(e) => T(e.target.value)}>
            <option value="">All patterns</option>
            {[...new Set(problems.map((p) => p.topic))].map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </label>
        <label>
          Difficulty
          <select value={difficulty} onChange={(e) => D(e.target.value)}>
            <option value="">All levels</option>
            {["Beginner", "Intermediate", "Advanced"].map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </label>
      </div>

      <div className="card">
        {filteredProblems.map((p) => (
          <div className="problem" key={p.id}>
            <div>
              <Ext url={p.url}>{p.title}</Ext>
              <small>
                {p.topic} · {p.difficulty} · <strong>{p.pattern}</strong> ·{" "}
                <code>{p.complexity}</code>
              </small>
              <p className="problem-insight">{p.insight}</p>
            </div>
            {p.relatedTaskId && (
              <Link to={`task/${p.relatedTaskId}`} className="button secondary small">
                Practice exercise →
              </Link>
            )}
          </div>
        ))}
      </div>

      <div className="project-grid">
        <section className="card">
          <h2>Prepare for your next contest</h2>
          <p>
            Practice under a time limit. Afterwards, upsolve one missed problem
            and write down the pattern you overlooked.
          </p>
          <Ext url="https://codeforces.com/contests">Codeforces contests</Ext>
          <p>
            <Ext url="https://cp-algorithms.com/">Algorithm explanations</Ext>
          </p>
          <p>
            <Ext url="https://cses.fi/problemset/">CSES Problem Set</Ext>
          </p>
          <Link to="task/cp-pattern-notes">
            Contribute an original explanation →
          </Link>
        </section>
        <section className="card">
          <h2>Explore Codeforces & USACO</h2>
          <p>
            Find more problems and contests on Codeforces, AtCoder and USACO
            Guide. This hub does not collect profiles, ratings or submission
            history.
          </p>
          <Ext url="https://codeforces.com/apiHelp">
            Official API documentation
          </Ext>
          <p>
            <Ext url="https://usaco.guide/">USACO Guide Roadmaps</Ext>
          </p>
        </section>
      </div>
    </>
  );
}
