import { useEffect, useState } from "react";
import { ArrowRight, ArrowUpRight, Compass } from "lucide-react";
import {
  initiatives,
  tracks,
  stages,
  topics,
  problems,
  type Task,
} from "./data";
import { Visualizer } from "./Visualizer";
import { Link, Ext, Title } from "./shared";
export function Learning({ selected }: { selected: number }) {
  const [track, S] = useState(selected);
  return (
    <>
      <Title
        eyebrow="A PATH, NOT A PREREQUISITE WALL"
        title="Learn with a purpose."
        text="Choose a track. Build something tangible. Already know a stage? Move ahead to the skills you want to learn."
      />
      <div className="track-tabs">
        {tracks.map((t, i) => (
          <button
            className={track === i ? "" : "secondary"}
            key={t}
            onClick={() => S(i)}
          >
            {t}
          </button>
        ))}
      </div>
      {track === 0 || track === 1 ? (
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
      ) : track === 2 ? (
        <>
          <TopicRoadmap />
          <Link className="button" to="cp">
            Open the CP workspace <ArrowRight size={16} />
          </Link>
        </>
      ) : (
        <>
          <div className="card">
            <h2>Engineering experiments · Advanced</h2>
            <p>
              Explore algorithm visualization, systems programming, developer
              tooling, performance benchmarks, open source, AI applications and
              internal automation.
            </p>
            <p>
              Prerequisites: comfortable programming, Git workflows and tests.
              Start with a working baseline before adding experimental
              technology.
            </p>
            <p>
              Deliver a reproducible prototype, benchmark or tool with a problem
              statement, methodology, tests and limitations. Document what works
              and what still needs improvement.
            </p>
            <Ext url="https://craftinginterpreters.com">
              Build-from-scratch resource
            </Ext>
          </div>
          <Link to="tasks?track=Engineering%20Experiments" className="button">
            Find an experiment →
          </Link>
        </>
      )}
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
  const filtered = tasks.filter(
    (t) =>
      (!q ||
        `${t.title} ${t.description}`
          .toLowerCase()
          .includes(q.toLowerCase())) &&
      (!track || t.track === track) &&
      (!difficulty || t.difficulty === difficulty) &&
      (!skill || t.skills.includes(skill)) &&
      (!effort || t.effort <= Number(effort)) &&
      (!project || t.initiative_id === project),
  );
  return (
    <>
      <Title
        eyebrow="ONE MANAGEABLE PIECE OF WORK"
        title="Find your next task."
        text="Every task has a purpose and a concrete deliverable. Pick any exercise that fits your interests."
      />
      <div className="filters card">
        <label className="search-label">
          Search tasks
          <input
            placeholder="Try Git, profile, algorithms…"
            value={q}
            onChange={(e) => Q(e.target.value)}
          />
        </label>
        {[
          ["Track", track, T, tracks],
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
            D("");
            S("");
            E("");
            P("");
          }}
        >
          Clear filters
        </button>
      </div>
      <p className="muted">{filtered.length} tasks · Open practice catalog</p>
      <div className="project-grid">
        {filtered.map((t) => (
          <Link className="card task-card" to={`task/${t.id}`} key={t.id}>
            <div className="section-title">
              <span className="badge">{t.difficulty}</span>
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
  return (
    <>
      <Link to="tasks">← All tasks</Link>
      <Title
        eyebrow={t.track + " / " + t.difficulty + " / " + t.effort + " HOURS"}
        title={t.title}
        text={t.description}
      />
      <div className="detail-grid">
        <section className="card">
          <h2>What you’ll deliver</h2>
          <p>{t.deliverable}</p>
          <h3>Before you start</h3>
          <p>{t.prerequisites}</p>
          <div className="chips">
            {t.skills.map((s) => (
              <span key={s}>{s}</span>
            ))}
          </div>
          <h3>Step by step</h3>
          <ol>
            {t.instructions.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ol>
          <h3>What success looks like</h3>
          <ul>
            {t.criteria.map((s) => (
              <li key={s}>{s}</li>
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
          <Link to="learn" className="button">
            Explore learning tracks →
          </Link>
        </section>
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
        complexity, then review your reasoning with a mentor.
      </p>
      <Ext url="https://usaco.guide/">Study guides and practice sets</Ext>
    </div>
  );
}
export function CP() {
  const [topic, T] = useState(""),
    [difficulty, D] = useState("");
  return (
    <>
      <Title
        eyebrow="THINK IT THROUGH. SOLVE IT YOUR WAY."
        title="Your problem-solving space."
        text="Learn a pattern, try a problem, and understand why your solution works. Choose any topic and practice at your own pace."
      />
      <Visualizer />
      <details className="card">
        <summary>Explore the topic roadmap</summary>
        <TopicRoadmap />
      </details>
      <div className="section-title">
        <h2>A small, purposeful problem set</h2>
        <span className="muted">Practice freely at your own pace</span>
      </div>
      <div className="filters">
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
        {problems
          .filter(
            (p) =>
              (!topic || p.topic === topic) &&
              (!difficulty || p.difficulty === difficulty),
          )
          .map((p) => (
            <div className="problem" key={p.id}>
              <div>
                <Ext url={p.url}>{p.title}</Ext>
                <small>
                  {p.topic} · {p.difficulty}
                </small>
              </div>
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
          <Link to="task/cp-pattern-notes">
            Contribute an original explanation →
          </Link>
        </section>
        <section className="card">
          <h2>Explore Codeforces</h2>
          <p>
            Find more problems and contests on Codeforces. This hub does not
            collect profiles, ratings or submission history.
          </p>
          <Ext url="https://codeforces.com/apiHelp">
            Official API documentation
          </Ext>
        </section>
      </div>
    </>
  );
}
