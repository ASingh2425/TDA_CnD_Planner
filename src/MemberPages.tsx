import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { ArrowRight, ArrowUpRight, Compass, LockKeyhole } from "lucide-react";
import { db, rpc } from "./api";
import {
  initiatives,
  tracks,
  stages,
  topics,
  problems,
  statuses,
  type Task,
} from "./data";
import { Visualizer } from "./Visualizer";
import { Link, Ext, Title, message, type Assignment } from "./shared";
export function Learning({ selected }: { selected: number }) {
  const [track, S] = useState(selected);
  return (
    <>
      <Title
        eyebrow="A PATH, NOT A PREREQUISITE WALL"
        title="Learn with a purpose."
        text="Choose a track. Build something tangible. Already know a stage? Show your reviewer an equivalent project and move ahead."
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
                  explain your choices and address reviewer feedback.
                </p>
                <Ext url={s.resource}>Learning resource</Ext>
                <p>
                  <Link to={`task/${s.task}`}>Open a practical task →</Link>
                </p>
                <small>
                  Next:{" "}
                  {stages[i + 1]?.title ??
                    "Choose a project contribution and join a review cycle."}
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
              statement, methodology, tests and limitations. Complete a mentor
              review before proposing production use.
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
    [status, Status] = useState(""),
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
      !t.archived &&
      (!q ||
        `${t.title} ${t.description}`
          .toLowerCase()
          .includes(q.toLowerCase())) &&
      (!track || t.track === track) &&
      (!difficulty || t.difficulty === difficulty) &&
      (!skill || t.skills.includes(skill)) &&
      (!status || t.status === status) &&
      (!effort || t.effort <= Number(effort)) &&
      (!project || t.initiative_id === project),
  );
  return (
    <>
      <Title
        eyebrow="ONE MANAGEABLE PIECE OF WORK"
        title="Find your next task."
        text="Every task has a purpose, a concrete deliverable and a review step. Find something that fits where you are."
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
          ["Status", status, Status, statuses],
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
            Status("");
            E("");
            P("");
          }}
        >
          Clear filters
        </button>
      </div>
      <p className="muted">
        {filtered.length} tasks
        {!db ? " · Public task catalog; shared assignment setup pending" : ""}
      </p>
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
              <span>{t.status}</span>
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
            Try fewer filters or explore the learning paths while a maintainer
            scopes new work.
          </p>
        </div>
      )}
    </>
  );
}
export function TaskDetail({
  task: t,
  assignment: a,
  user,
  role,
  busy,
  act,
  signIn,
}: {
  task?: Task;
  assignment?: Assignment;
  user: User | null;
  role: string;
  busy: boolean;
  act: (t: Task, a: string, v?: string) => Promise<void>;
  signIn: () => void;
}) {
  const [value, V] = useState(""),
    [history, H] = useState<
      {
        url?: string;
        decision?: string;
        feedback?: string;
        created_at: string;
      }[]
    >([]),
    [error, E] = useState("");
  useEffect(() => {
    if (!db || !t || !user) return;
    void (async () => {
      const s = await db
        .from("submissions")
        .select("*")
        .eq("task_id", t.id)
        .order("created_at");
      if (s.error) {
        E(s.error.message);
        return;
      }
      const r = await db
        .from("reviews")
        .select("*")
        .in(
          "submission_id",
          s.data.map((x) => x.id),
        );
      if (r.error) {
        E(r.error.message);
        return;
      }
      H(
        [...s.data, ...r.data].sort((a, b) =>
          a.created_at.localeCompare(b.created_at),
        ),
      );
    })();
  }, [t?.version, user]);
  if (!t)
    return (
      <Title
        eyebrow="TASK NOT FOUND"
        title="This task is unavailable."
        text="Return to Explore Tasks to choose another."
      />
    );
  return (
    <>
      <Link to="tasks">← All tasks</Link>
      <Title
        eyebrow={`${t.track} / ${t.difficulty} / ${t.effort} HOURS`}
        title={t.title}
        text={t.description}
      />
      <div className="detail-grid">
        <div>
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
          <section className="card">
            <h2>Submissions & feedback</h2>
            {error && <p role="alert">{error}</p>}
            {history.length ? (
              history.map((h, i) => (
                <article className="history" key={i}>
                  <small>{new Date(h.created_at).toLocaleString()}</small>
                  {h.url ? (
                    <p>
                      <Ext url={h.url}>Submitted work</Ext>
                    </p>
                  ) : (
                    <p>
                      <b>{h.decision}</b> — {h.feedback}
                    </p>
                  )}
                </article>
              ))
            ) : (
              <p>
                No submissions visible. The member and assigned reviewer can see
                their work here.
              </p>
            )}
          </section>
        </div>
        <section className="card task-actions">
          <span className="badge">{t.status}</span>
          <h3>Build → Submit → Review</h3>
          <p>
            Submit an HTTPS repository or pull request link. Your assigned
            reviewer checks the deliverable and leaves feedback. Approval
            requires a review.
          </p>
          <p>Assignee: {a?.member_id ?? "Not assigned / not visible"}</p>
          <p>Reviewer: {a?.reviewer_id ?? "Awaiting maintainer assignment"}</p>
          {a?.blocker && <p className="notice">Blocker: {a.blocker}</p>}
          {!db ? (
            <p className="notice">
              Shared task actions become available after the team configures
              Supabase. You can use the instructions to practice now.
            </p>
          ) : !user ? (
            <button onClick={signIn}>Sign in to start</button>
          ) : (
            <>
              {t.status === "Available" && (
                <button disabled={busy} onClick={() => void act(t, "claim")}>
                  Start this task
                </button>
              )}
              {a?.member_id === user.id && (
                <>
                  {["Assigned", "Blocked", "Changes Requested"].includes(
                    t.status,
                  ) && (
                    <button
                      disabled={busy}
                      onClick={() => void act(t, "start")}
                    >
                      Mark in progress
                    </button>
                  )}
                  {["In Progress", "Changes Requested", "Assigned"].includes(
                    t.status,
                  ) && (
                    <>
                      <label>
                        Work link or blocker details
                        <textarea
                          value={value}
                          onChange={(e) => V(e.target.value)}
                          maxLength={5000}
                        />
                      </label>
                      <div className="actions">
                        {t.status !== "Assigned" && (
                          <button
                            disabled={busy || !/^https:\/\/\S+$/.test(value)}
                            onClick={() => void act(t, "submit", value)}
                          >
                            Submit for review
                          </button>
                        )}
                        <button
                          disabled={busy || value.trim().length < 3}
                          className="secondary"
                          onClick={() => void act(t, "block", value)}
                        >
                          Record blocker & ask for help
                        </button>
                      </div>
                    </>
                  )}
                </>
              )}
              {a?.reviewer_id === user.id &&
                ["reviewer", "maintainer", "admin"].includes(role) &&
                t.status === "Submitted for Review" && (
                  <>
                    <label>
                      Reviewer feedback
                      <textarea
                        value={value}
                        onChange={(e) => V(e.target.value)}
                        maxLength={5000}
                      />
                    </label>
                    <button
                      disabled={busy || value.trim().length < 3}
                      onClick={() => void act(t, "Changes Requested", value)}
                    >
                      Request changes
                    </button>
                    <button
                      disabled={busy || value.trim().length < 3}
                      onClick={() => void act(t, "Approved", value)}
                    >
                      Approve submission
                    </button>
                  </>
                )}
            </>
          )}
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
export function CP({
  user,
  notify,
}: {
  user: User | null;
  notify: (s: string) => void;
}) {
  const [topic, T] = useState(""),
    [difficulty, D] = useState(""),
    [done, Done] = useState<string[]>([]);
  useEffect(() => {
    if (db && user)
      void db
        .from("problem_completions")
        .select("problem_id")
        .then((r) => {
          if (r.error) notify(r.error.message);
          else Done(r.data.map((p) => p.problem_id));
        });
  }, [user]);
  return (
    <>
      <Title
        eyebrow="THINK IT THROUGH. SOLVE IT YOUR WAY."
        title="Your problem-solving space."
        text="Learn a pattern, try a problem, and understand why your solution works. Progress here is manually recorded, never inferred from a rating."
      />
      <Visualizer />
      <details className="card">
        <summary>Explore the topic roadmap</summary>
        <TopicRoadmap />
      </details>
      <div className="section-title">
        <h2>A small, purposeful problem set</h2>
        <span className="muted">
          {user
            ? `${done.length} manually recorded solutions`
            : "Sign in to record your practice"}
        </span>
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
                  {done.includes(p.id) ? " · Manually recorded" : ""}
                </small>
              </div>
              {db && user && (
                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    try {
                      await rpc("record_problem", {
                        p_id: p.id,
                        p_url: new FormData(e.currentTarget).get("url"),
                      });
                      Done([...new Set([...done, p.id])]);
                      notify("Practice recorded (self-reported).");
                    } catch (err) {
                      notify(message(err));
                    }
                  }}
                >
                  <input
                    name="url"
                    aria-label={`${p.title} submission URL`}
                    type="url"
                    pattern="https://.*"
                    placeholder="Accepted submission URL"
                    required
                  />
                  <button className="secondary small">Record</button>
                </form>
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
          <Link to="task/cp-pattern-notes">
            Contribute an original explanation →
          </Link>
        </section>
        <section className="card">
          <LockKeyhole />
          <h2>Codeforces integration</h2>
          <p>
            Automatic profile sync is not configured. Ratings, solved counts and
            leaderboard positions are not collected or displayed.
          </p>
          <Ext url="https://codeforces.com/apiHelp">
            Official API documentation
          </Ext>
        </section>
      </div>
    </>
  );
}
