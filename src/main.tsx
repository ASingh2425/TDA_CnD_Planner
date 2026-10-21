import { useEffect, useState, useRef } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowUpRight,
  ArrowRight,
  BookOpen,
  Code2,
  Compass,
  FolderGit2,
  GitPullRequest,
  GraduationCap,
  House,
  Layers,
  Trophy,
} from "lucide-react";
import type { User } from "@supabase/supabase-js";
import { db, rpc } from "./api";
import { initiatives, tasks as catalog, repo, type Task } from "./data";
import { Learning, TaskList, TaskDetail, CP } from "./MemberPages";
import {
  Link,
  Ext,
  Title,
  message,
  type Assignment,
  type ProjectRow,
} from "./shared";
import { Maintainer } from "./Maintainer";
import "./style.css";
const nav = [
  ["home", "Start Here", House],
  ["learn", "Learning Paths", BookOpen],
  ["tasks", "Explore Tasks", Compass],
  ["projects", "Build with TDA", FolderGit2],
  ["cp", "Competitive Programming", Trophy],
  ["maintainer", "Maintainer Workspace", Layers],
] as const;
export function App() {
  const [route, R] = useState(location.hash.slice(2) || "home"),
    [tasks, Tasks] = useState<Task[]>(catalog),
    [user, U] = useState<User | null>(null),
    [role, Role] = useState(""),
    [notice, N] = useState(""),
    [loading, L] = useState(false),
    [assignments, A] = useState<Assignment[]>([]),
    [auth, Auth] = useState(false),
    [busy, B] = useState(false);
  const [projectRows, PR] = useState<ProjectRow[]>([]);
  useEffect(() => {
    const fn = () => {
      R(location.hash.slice(2) || "home");
      window.scrollTo(0, 0);
    };
    window.addEventListener("hashchange", fn);
    const sub = db?.auth.onAuthStateChange((_event, session) =>
      U(session?.user ?? null),
    );
    return () => {
      window.removeEventListener("hashchange", fn);
      sub?.data.subscription.unsubscribe();
    };
  }, []);
  const modalRef = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!auth) return;
    const previous = document.activeElement as HTMLElement;
    const handler = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        Auth(false);
        return;
      }
      if (event.key === "Tab") {
        const items = modalRef.current?.querySelectorAll<HTMLElement>(
          "button:not(:disabled),input,textarea,a[href]",
        );
        if (!items?.length) return;
        const first = items[0],
          last = items[items.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", handler);
    return () => {
      document.removeEventListener("keydown", handler);
      previous?.focus();
    };
  }, [auth]);
  async function refresh() {
    if (!db) return;
    L(true);
    try {
      const result = await db.from("tasks").select("*").order("created_at");
      if (result.error) throw result.error;
      Tasks(result.data as Task[]);
      const projects = await db.from("initiatives").select("*");
      if (projects.error) throw projects.error;
      PR(projects.data);
      if (user) {
        const [r, a] = await Promise.all([
          db.from("roles").select("role").eq("user_id", user.id).maybeSingle(),
          db.from("assignments").select("*"),
        ]);
        if (r.error || a.error) throw r.error || a.error;
        Role(r.data?.role ?? "");
        A(a.data ?? []);
      } else {
        Role("");
        A([]);
      }
    } catch (e) {
      N(message(e));
    } finally {
      L(false);
    }
  }
  useEffect(() => {
    void refresh();
  }, [user]);
  async function act(
    task: Task,
    action: string,
    value = "",
    member: string | null = null,
    reviewer: string | null = null,
  ) {
    B(true);
    N("");
    try {
      await rpc("task_action", {
        p_task: task.id,
        p_version: task.version,
        p_action: action,
        p_value: value,
        p_member: member,
        p_reviewer: reviewer,
      });
      await refresh();
      N("Saved to the shared workspace.");
    } catch (e) {
      N(message(e));
    } finally {
      B(false);
    }
  }
  const [page, param] = route.split("?")[0].split("/");
  const mine = tasks.filter((t) =>
    assignments.some((a) => a.task_id === t.id && a.member_id === user?.id),
  );
  const recommended =
    mine.find((t) => t.status === "Changes Requested") ??
    mine.find((t) => t.status !== "Approved") ??
    tasks.find((t) => t.id === "first-contribution") ??
    tasks[0];
  return (
    <div className="shell">
      <a
        className="skip-link"
        href="#main"
        onClick={(e) => {
          e.preventDefault();
          document.getElementById("main")?.focus();
        }}
      >
        Skip to content
      </a>
      <aside>
        <Link to="home" className="brand">
          <span className="brand-mark">
            <Code2 size={24} />
          </span>
          <span>
            TDA<span className="brand-sub">CODING & DEVELOPMENT</span>
          </span>
        </Link>
        <div className="tenure">
          <span className="dot" /> THE 2026–27 TENURE
        </div>
        <div className="nav-label">YOUR WORKSPACE</div>
        <nav aria-label="Main navigation">
          {nav.map(([id, label, Icon]) => (
            <Link
              to={id}
              key={id}
              className={page === id ? "nav-link selected" : "nav-link"}
            >
              <Icon size={18} />
              <span>{label}</span>
              {page === id && <span className="nav-dot" />}
            </Link>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <div className="community-icon">
            <GitPullRequest size={21} />
          </div>
          <h3>Small steps. Real impact.</h3>
          <p>Your first contribution could be someone else’s starting point.</p>
          <Ext url={repo}>Visit our repository</Ext>
        </div>
        <div className="sidebar-footer">Built together. Passed forward.</div>
      </aside>
      <div className="workspace">
        <header>
          <div>
            <span className="header-org">Developer Hub</span>
            <span className="slash">/</span>
            {nav.find((n) => n[0] === page)?.[1] ?? "Task details"}
          </div>
          <button className="secondary small" onClick={() => Auth(true)}>
            {user ? "Your account" : "Member sign in"}
            <ArrowUpRight size={14} />
          </button>
        </header>
        <main id="main" tabIndex={-1}>
          <div className="mode">
            <span className="dot" />
            {db ? "Shared workspace connected" : "Public learning hub"}
            <span>
              {db
                ? "Learn together. Build together."
                : "Browse freely · Sign-in setup pending"}
            </span>
          </div>
          {notice && (
            <div role="status" className="notice">
              {notice}
              <button className="text-button" onClick={() => N("")}>
                Dismiss
              </button>
            </div>
          )}
          {loading && <p role="status">Loading shared workspace…</p>}
          {page === "home" && (
            <>
              <div className="hero">
                <div>
                  <span className="eyebrow">WELCOME TO TDA C&D</span>
                  <h1>
                    Your next step
                    <br />
                    starts <em>here.</em>
                  </h1>
                  <p>
                    Learn new skills. Build real software. Find your people.
                    <br className="desktop" /> Start with one manageable task —
                    we’ll grow from there.
                  </p>
                  <Link to="learn/0" className="button">
                    Find my starting point <ArrowRight size={17} />
                  </Link>
                </div>
                <div className="hero-art" aria-hidden="true">
                  <div className="orbit orbit-one" />
                  <div className="orbit orbit-two" />
                  <div className="code-tile">
                    <Code2 size={60} />
                  </div>
                  <span className="art-label label-one">
                    <span className="dot" /> learn something
                  </span>
                  <span className="art-label label-two">
                    <GitPullRequest size={15} /> build something real
                  </span>
                  <span className="art-spark">✳</span>
                </div>
              </div>
              <div className="section-title">
                <div>
                  <span className="eyebrow">MAKE IT YOURS</span>
                  <h2>Where are you starting?</h2>
                </div>
                <span className="muted">Different paths. One community.</span>
              </div>
              <div className="entry-grid">
                {[
                  [
                    GraduationCap,
                    "I’m new to development.",
                    "Start with programming, Git and your first small win.",
                    "Start learning",
                    "learn/0",
                    "mint",
                  ],
                  [
                    Code2,
                    "I know the basics.",
                    "Turn what you know into something people can use.",
                    "Find a build task",
                    "tasks?track=Software%20Development",
                    "blue",
                  ],
                  [
                    Trophy,
                    "I want to compete.",
                    "Build your problem-solving skills, one pattern at a time.",
                    "Enter the CP track",
                    "cp",
                    "peach",
                  ],
                  [
                    GitPullRequest,
                    "I’m ready to contribute.",
                    "Find a scoped task and make your first contribution.",
                    "Explore open tasks",
                    "tasks",
                    "purple",
                  ],
                ].map(([Icon, title, desc, cta, to, color]) => {
                  const I = Icon as typeof Code2;
                  return (
                    <Link
                      to={to as string}
                      key={title as string}
                      className={`entry ${color}`}
                    >
                      <div className="entry-top">
                        <span className="icon-box">
                          <I size={23} />
                        </span>
                        <ArrowUpRight size={18} />
                      </div>
                      <h3>{title as string}</h3>
                      <p>{desc as string}</p>
                      <strong>
                        {cta as string}
                        <ArrowRight size={15} />
                      </strong>
                    </Link>
                  );
                })}
              </div>
              <div className="home-lower">
                <section className="recommend">
                  <div>
                    <span className="eyebrow">YOUR RECOMMENDED NEXT STEP</span>
                    <h2>
                      {recommended?.title ?? "Explore the learning paths"}
                    </h2>
                    <p>
                      {recommended?.description ??
                        "Start with the foundations and choose a practical exercise."}
                    </p>
                    <div className="chips">
                      <span>{recommended?.difficulty ?? "Beginner"}</span>
                      <span>{recommended?.effort ?? 2} hours</span>
                      <span>Reviewable deliverable</span>
                    </div>
                    <Link
                      to={recommended ? `task/${recommended.id}` : "learn"}
                      className="button"
                    >
                      Open the task <ArrowRight size={16} />
                    </Link>
                  </div>
                  <div className="step-number">
                    01<span>ONE STEP AT A TIME</span>
                  </div>
                </section>
                <section className="workflow">
                  <span className="eyebrow">HOW WE WORK</span>
                  <h3>You don’t have to do it alone.</h3>
                  <div className="flow">
                    {[
                      "Learn",
                      "Pick a task",
                      "Build",
                      "Submit",
                      "Review",
                      "Improve",
                    ].map((s, i) => (
                      <span key={s}>
                        <b>{String(i + 1).padStart(2, "0")}</b>
                        {s}
                      </span>
                    ))}
                  </div>
                  <p>
                    Submit your work, get feedback from a reviewer, and make it
                    better.
                  </p>
                </section>
              </div>
            </>
          )}
          {page === "learn" && <Learning selected={Number(param) || 0} />}
          {page.startsWith("tasks") && (
            <TaskList
              tasks={tasks}
              initial={
                new URLSearchParams(route.split("?")[1]).get("track") ?? ""
              }
            />
          )}
          {page === "task" && (
            <TaskDetail
              key={param}
              task={tasks.find((t) => t.id === param)}
              assignment={assignments.find((a) => a.task_id === param)}
              user={user}
              role={role}
              busy={busy}
              act={act}
              signIn={() => Auth(true)}
            />
          )}
          {page === "projects" && (
            <>
              <Title
                eyebrow="BUILD SOMETHING THAT MATTERS"
                title="Build with TDA."
                text="Twelve initiatives. Plenty of ways to make a useful contribution. Status reflects planning until a maintainer updates it."
              />
              <div className="project-grid">
                {[
                  ...initiatives,
                  ...projectRows
                    .filter((p) => !initiatives.some((i) => i.id === p.id))
                    .map((p) => ({
                      id: p.id,
                      title: p.title,
                      description: p.description,
                      stack: [],
                      resources: [],
                      tasks: [],
                      guidelines: [],
                      track: "core",
                      stage: "Proposed",
                    })),
                ].map((p, i) => {
                  const live = projectRows.find((x) => x.id === p.id);
                  return (
                    <article className="card" key={p.id}>
                      <div className="section-title">
                        <span className="project-number">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="badge">
                          {live?.status ?? "Proposed"}
                        </span>
                      </div>
                      <h2>{live?.title ?? p.title}</h2>
                      <p>{live?.description ?? p.description}</p>
                      <p className="muted">
                        Lead: {live?.lead ?? "Not assigned"} ·{" "}
                        {p.track === "labs" ? "Advanced" : "Mixed experience"}
                      </p>
                      <div className="chips">
                        {p.stack.slice(0, 3).map((s) => (
                          <span key={s}>{s}</span>
                        ))}
                      </div>
                      <details>
                        <summary>Deliverables & resources</summary>
                        <ul>
                          {p.tasks.map((t) => (
                            <li key={t.id}>{t.text}</li>
                          ))}
                        </ul>
                        {p.resources.map((r) => (
                          <p key={r.url}>
                            <Ext url={r.url}>{r.name}</Ext>
                          </p>
                        ))}
                      </details>
                      <Link to={`tasks?project=${p.id}`} className="card-link">
                        Explore contribution tasks <ArrowRight size={16} />
                      </Link>
                    </article>
                  );
                })}
              </div>
            </>
          )}
          {page === "cp" && <CP user={user} notify={N} />}
          {page === "maintainer" && (
            <Maintainer
              user={user}
              role={role}
              tasks={tasks}
              projects={projectRows}
              assignments={assignments}
              refresh={refresh}
              notify={N}
              act={act}
            />
          )}
          {!["home", "learn", "task", "projects", "cp", "maintainer"].includes(
            page,
          ) &&
            !page.startsWith("tasks") && (
              <Title
                eyebrow="PAGE NOT FOUND"
                title="Let’s find your next step."
                text="Use the navigation to return to the hub."
              />
            )}
          <footer>
            <span>
              <Code2 size={15} /> TDA Coding & Development
            </span>
            <span>
              Learn. Build. Contribute.{" "}
              <span className="footer-year">2026–27</span>
            </span>
          </footer>
        </main>
      </div>
      {auth && (
        <div className="modal-backdrop">
          <section
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="account-title"
            className="modal"
          >
            <button
              autoFocus
              className="close secondary"
              onClick={() => Auth(false)}
            >
              Close
            </button>
            <h2 id="account-title">Your TDA account</h2>
            {!db ? (
              <p>
                Member sign-in will be available when the team connects
                Supabase. You can explore every public learning path and task
                now.
              </p>
            ) : user ? (
              <>
                <p>Signed in as {user.email}</p>
                <p>
                  Your member ID: <code>{user.id}</code>
                </p>
                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    try {
                      await rpc("save_profile", {
                        p_name: new FormData(e.currentTarget).get("name"),
                      });
                      await refresh();
                      N("Profile saved.");
                      Auth(false);
                    } catch (err) {
                      N(message(err));
                    }
                  }}
                >
                  <label>
                    Display name
                    <input name="name" required maxLength={80} />
                  </label>
                  <button>Save profile</button>
                </form>
                <button
                  className="secondary"
                  onClick={() => {
                    void db?.auth.signOut();
                    Auth(false);
                  }}
                >
                  Sign out
                </button>
                <h3>Your contribution history</h3>
                {mine.length ? (
                  mine.map((t) => (
                    <p key={t.id}>
                      <Link to={`task/${t.id}`}>{t.title}</Link> — {t.status}
                    </p>
                  ))
                ) : (
                  <p>
                    No assignments yet. Save your profile, then choose an
                    available task.
                  </p>
                )}
              </>
            ) : (
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  B(true);
                  const email = String(
                    new FormData(e.currentTarget).get("email"),
                  );
                  const result = await db!.auth.signInWithOtp({
                    email,
                    options: { emailRedirectTo: location.origin },
                  });
                  N(
                    result.error
                      ? result.error.message
                      : "Check your email for a sign-in link.",
                  );
                  B(false);
                }}
              >
                <p>Use an email sign-in link. No password to remember.</p>
                <label>
                  Email
                  <input
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                  />
                </label>
                <button disabled={busy}>Send sign-in link</button>
              </form>
            )}
          </section>
        </div>
      )}
    </div>
  );
}
createRoot(document.getElementById("root")!).render(<App />);
