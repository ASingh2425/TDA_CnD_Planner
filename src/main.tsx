import { useEffect, useState } from "react";
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
import { initiatives, tasks as catalog, repo } from "./data";
import { Learning, TaskList, TaskDetail, CP } from "./MemberPages";
import { Link, Ext, Title } from "./shared";
import { Resources } from "./Resources";
import "./style.css";
const nav = [
  ["home", "Start Here", House],
  ["learn", "Learning Paths", BookOpen],
  ["tasks", "Explore Tasks", Compass],
  ["projects", "Build with TDA", FolderGit2],
  ["cp", "Competitive Programming", Trophy],
  ["resources", "Resources", Layers],
] as const;
export function App() {
  const [route, R] = useState(location.hash.slice(2) || "home");
  const tasks = catalog;
  useEffect(() => {
    const navigate = () => {
      R(location.hash.slice(2) || "home");
      window.scrollTo(0, 0);
    };
    window.addEventListener("hashchange", navigate);
    return () => window.removeEventListener("hashchange", navigate);
  }, []);
  const [page, param] = route.split("?")[0].split("/");
  const recommended = tasks[0];
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
          <Link to="learn" className="button secondary small">
            Explore all tracks <ArrowUpRight size={14} />
          </Link>
        </header>
        <main id="main" tabIndex={-1}>
          <div className="mode">
            <span className="dot" />
            Open learning hub<span>All tracks · Open to everyone</span>
          </div>
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
                      <span>Practical exercise</span>
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
                      "Test",
                      "Share",
                      "Improve",
                    ].map((s, i) => (
                      <span key={s}>
                        <b>{String(i + 1).padStart(2, "0")}</b>
                        {s}
                      </span>
                    ))}
                  </div>
                  <p>
                    Practice at your own pace, share what you build, and learn
                    with the community.
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
            <TaskDetail key={param} task={tasks.find((t) => t.id === param)} />
          )}
          {page === "projects" && (
            <>
              <Title
                eyebrow="BUILD SOMETHING THAT MATTERS"
                title="Build with TDA."
                text="Twelve initiatives. Plenty of ways to make a useful contribution. Explore the ideas and choose what interests you."
              />
              <div className="project-grid">
                {initiatives.map((p, i) => {
                  return (
                    <article className="card" key={p.id}>
                      <div className="section-title">
                        <span className="project-number">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="badge">Proposed</span>
                      </div>
                      <h2>{p.title}</h2>
                      <p>{p.description}</p>
                      <p className="muted">
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
          {page === "cp" && <CP />}
          {(page === "resources" || page === "maintainer") && <Resources />}
          {![
            "home",
            "learn",
            "task",
            "projects",
            "cp",
            "maintainer",
            "resources",
          ].includes(page) &&
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
    </div>
  );
}
createRoot(document.getElementById("root")!).render(<App />);
