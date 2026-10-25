import { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowUpRight,
  ArrowRight,
  BookOpen,
  Code2,
  Compass,
  FlaskConical,
  FolderGit2,
  GitPullRequest,
  GraduationCap,
  House,
  Layers,
  Trophy,
} from "lucide-react";
import {
  tasks as catalog,
  repo,
  PROJECT_BLUEPRINTS,
  ENGINEERING_LABS,
  CURRICULUM_MODULES,
  CP_PROBLEMS,
} from "./data";
import {
  Learning,
  TaskList,
  TaskDetail,
  ProjectCatalog,
  ProjectDetail,
  ExploreLabs,
  CP,
} from "./MemberPages";
import { Link, Ext, Title } from "./shared";
import { Resources } from "./Resources";
import "./style.css";

const nav = [
  ["home", "Start Here", House],
  ["learn", "01. Learn", BookOpen],
  ["tasks", "02. Practise", Compass],
  ["projects", "03. Build", FolderGit2],
  ["explore", "04. Explore", FlaskConical],
  ["cp", "05. Competitive Programming", Trophy],
  ["resources", "Resources", Layers],
] as const;

export function App() {
  const [route, R] = useState(location.hash.slice(2) || "home");
  const [hubQuery, HQ] = useState("");
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

  const qNorm = hubQuery.trim().toLowerCase();
  const quickTasks = qNorm
    ? tasks
        .filter((t) =>
          `${t.title} ${t.description} ${t.category} ${t.level} ${t.skills.join(" ")}`
            .toLowerCase()
            .includes(qNorm),
        )
        .slice(0, 4)
    : [];
  const quickProjects = qNorm
    ? PROJECT_BLUEPRINTS.filter((p) =>
        `${p.title} ${p.tagline} ${p.discipline} ${p.techStack.recommended.join(" ")}`
          .toLowerCase()
          .includes(qNorm),
      ).slice(0, 3)
    : [];
  const quickLabs = qNorm
    ? ENGINEERING_LABS.filter((l) =>
        `${l.title} ${l.summary} ${l.domain}`.toLowerCase().includes(qNorm),
      ).slice(0, 3)
    : [];

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
          <span className="dot" /> ENGINEERING RESOURCE HUB
        </div>
        <div className="nav-label">LIBRARY SECTIONS</div>
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
          <p>
            An open, self-directed learning and project library for the TDA
            community.
          </p>
          <Ext url={repo}>Visit our repository</Ext>
        </div>
        <div className="sidebar-footer">Built together. Passed forward.</div>
      </aside>
      <div className="workspace">
        <header>
          <div>
            <span className="header-org">Engineering Resource Hub</span>
            <span className="slash">/</span>
            {nav.find((n) => n[0] === page)?.[1] ??
              (page === "project" ? "Project blueprint" : "Task details")}
          </div>
          <Link to="tasks?level=1" className="button secondary small">
            Start from zero (Level 1) <ArrowUpRight size={14} />
          </Link>
        </header>
        <main id="main" tabIndex={-1}>
          <div className="mode">
            <span className="dot" />
            Open engineering library
            <span>
              Level 1 (Start from zero) · Level 2 (Practise by building) · Level
              3 (Real engineering)
            </span>
          </div>
          {page === "home" && (
            <>
              <div className="hero">
                <div>
                  <span className="eyebrow">
                    TDA C&D — ENGINEERING RESOURCE HUB
                  </span>
                  <h1>
                    Your next step
                    <br />
                    starts <em>here.</em>
                  </h1>
                  <p>
                    Never built a project before? Start from zero with friendly,
                    bite-sized exercises that explain every concept in plain
                    English — then grow at your own pace into real software
                    engineering.
                  </p>
                  <div className="actions">
                    <Link to="task/print-your-name" className="button">
                      Start from zero (Exercise #1) <ArrowRight size={17} />
                    </Link>
                    <Link to="tasks?level=1" className="button secondary">
                      Browse Level 1 beginner tasks
                    </Link>
                  </div>
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
                    "I’m completely new — start with programming basics, one concept at a time.",
                    "Start learning",
                    "learn/0",
                    "mint",
                  ],
                  [
                    Code2,
                    "I know the basics.",
                    "I know a little coding — practise fundamentals by building small apps.",
                    "Find a build task",
                    "tasks?level=2",
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
                    "Find a scoped exercise or guided project and start building.",
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

              <div className="section-title" style={{ marginTop: 32 }}>
                <div>
                  <span className="eyebrow">CLEAR PROGRESSION</span>
                  <h2>Three levels of learning</h2>
                </div>
                <span className="muted">
                  Small wins early · Real engineering when you’re ready
                </span>
              </div>

              <div className="level-home-grid">
                <article className="card level-card-home">
                  <span className="badge">Level 1 · Start from zero</span>
                  <h2>No project experience required</h2>
                  <p>
                    Each exercise teaches one or two concepts at a time with a
                    plain-English explanation and a tiny worked example:
                  </p>
                  <ul>
                    <li>
                      <Link to="task/print-your-name">
                        Print your name on the screen
                      </Link>
                    </li>
                    <li>
                      <Link to="task/variables-and-calculator">
                        Create a simple calculator
                      </Link>
                    </li>
                    <li>
                      <Link to="task/number-guessing-game">
                        Write a number-guessing game
                      </Link>
                    </li>
                    <li>
                      <Link to="task/functions-reusable-blocks">
                        Practise variables, conditions, loops and functions
                      </Link>
                    </li>
                    <li>
                      <Link to="task/first-html-css-page">
                        Make a personal webpage with HTML and CSS
                      </Link>
                    </li>
                  </ul>
                  <div className="card-link">
                    <Link to="tasks?level=1">
                      Open all Level 1 exercises <ArrowRight size={16} />
                    </Link>
                  </div>
                </article>

                <article className="card level-card-home">
                  <span className="badge">Level 2 · Practise by building</span>
                  <h2>For students who know the basics</h2>
                  <p>
                    Each project combines familiar concepts and introduces one
                    practical new skill at a time:
                  </p>
                  <ul>
                    <li>
                      <Link to="task/cli-task-manager">
                        Build your first command-line task manager
                      </Link>
                    </li>
                    <li>
                      <Link to="task/todo-list-web">
                        Build an interactive To-Do list webpage
                      </Link>
                    </li>
                    <li>
                      <Link to="task/quiz-application">
                        Create a multiple-choice quiz application
                      </Link>
                    </li>
                    <li>
                      <Link to="task/weather-data-fetcher">
                        Fetch and display live weather data
                      </Link>
                    </li>
                    <li>
                      <Link to="task/expense-tracker">
                        Build a small personal expense tracker
                      </Link>
                    </li>
                  </ul>
                  <div className="card-link">
                    <Link to="tasks?level=2">
                      Open all Level 2 exercises <ArrowRight size={16} />
                    </Link>
                  </div>
                </article>

                <article className="card level-card-home">
                  <span className="badge">
                    Level 3 · Explore real engineering
                  </span>
                  <h2>For students ready for a challenge</h2>
                  <p>
                    Ambitious destinations to work toward once you’ve mastered
                    the fundamentals:
                  </p>
                  <ul>
                    <li>
                      <Link to="task/semver-dependency-resolver">
                        Semantic version (SemVer) range parser
                      </Link>
                    </li>
                    <li>
                      <Link to="task/wal-append-storage-engine">
                        Bitcask Write-Ahead Log storage engine
                      </Link>
                    </li>
                    <li>
                      <Link to="task/bytecode-stack-vm">
                        Lexer, parser and bytecode virtual machine
                      </Link>
                    </li>
                    <li>
                      <Link to="task/vector-cosine-retriever">
                        Hybrid BM25 + Vector RAG retrieval system
                      </Link>
                    </li>
                    <li>
                      <Link to="explore">
                        Cybersecurity labs & performance benchmarking
                      </Link>
                    </li>
                  </ul>
                  <div className="card-link">
                    <Link to="tasks?level=3">
                      Open all Level 3 challenges <ArrowRight size={16} />
                    </Link>
                  </div>
                </article>
              </div>

              <section className="card hub-search-box" style={{ marginTop: 24 }}>
                <label className="search-label">
                  Search across all exercises, project blueprints and labs
                  <input
                    value={hubQuery}
                    onChange={(e) => HQ(e.target.value)}
                    placeholder="Try calculator, guessing game, to-do list, weather, Git, Binary Search…"
                  />
                </label>
                {qNorm && (
                  <div className="quick-results">
                    {quickTasks.map((t) => (
                      <Link
                        key={t.id}
                        to={`task/${t.id}`}
                        className="quick-result-item"
                      >
                        <span className="badge">{t.level}</span>
                        <strong>{t.title}</strong>
                        <span className="muted">{t.durationLabel}</span>
                      </Link>
                    ))}
                    {quickProjects.map((p) => (
                      <Link
                        key={p.id}
                        to={`project/${p.id}`}
                        className="quick-result-item"
                      >
                        <span className="badge">
                          Blueprint · {p.difficulty}
                        </span>
                        <strong>{p.title}</strong>
                        <span className="muted">{p.discipline}</span>
                      </Link>
                    ))}
                    {quickLabs.map((l) => (
                      <Link
                        key={l.id}
                        to="explore"
                        className="quick-result-item"
                      >
                        <span className="badge">Lab · {l.difficulty}</span>
                        <strong>{l.title}</strong>
                        <span className="muted">{l.domain}</span>
                      </Link>
                    ))}
                    {!quickTasks.length &&
                      !quickProjects.length &&
                      !quickLabs.length && (
                        <p className="muted">
                          No matches for “{hubQuery}”. Try another topic or
                          browse all exercises.
                        </p>
                      )}
                  </div>
                )}
              </section>

              <div className="section-title" style={{ marginTop: 32 }}>
                <div>
                  <span className="eyebrow">THE FIVE PILLARS</span>
                  <h2>Explore the full library</h2>
                </div>
                <span className="muted">
                  Self-contained guides · Zero account locks
                </span>
              </div>
              <div className="pillar-grid">
                {[
                  [
                    "01. Learn",
                    "Programming fundamentals, DSA, web development, databases, operating systems, networking, Git, software engineering and specialised tracks.",
                    "learn",
                    `${CURRICULUM_MODULES.length} curriculum modules`,
                  ],
                  [
                    "02. Practise",
                    "Exercises organised across Level 1, Level 2 and Level 3 with concept explanations, worked examples, progressive hints and test cases.",
                    "tasks",
                    `${tasks.length} practical exercises`,
                  ],
                  [
                    "03. Build",
                    "Guided projects with problem statements, architecture, milestones, recommended stacks, folder structures, implementation steps and testing.",
                    "projects",
                    `${PROJECT_BLUEPRINTS.length} project blueprints`,
                  ],
                  [
                    "04. Explore",
                    "Advanced engineering labs, cybersecurity, AI/ML, systems programming, performance optimisation, open-source tooling and experiments.",
                    "explore",
                    `${ENGINEERING_LABS.length} deep-dive labs`,
                  ],
                  [
                    "05. Competitive Programming",
                    "Topic-wise problem sets, contest preparation, complexity analysis, algorithm visualisations and links to established practice platforms.",
                    "cp",
                    `${CP_PROBLEMS.length} curated problems + visualisers`,
                  ],
                ].map(([title, desc, to, count]) => (
                  <Link key={title} to={to} className="card task-card">
                    <span className="badge">{count}</span>
                    <h2>{title}</h2>
                    <p>{desc}</p>
                    <div className="card-link">
                      <span>Open section</span>
                      <ArrowRight size={16} />
                    </div>
                  </Link>
                ))}
              </div>

              <div className="home-lower">
                <section className="recommend">
                  <div>
                    <span className="eyebrow">YOUR RECOMMENDED FIRST STEP</span>
                    <h2>
                      {recommended?.title ?? "Print your name on the screen"}
                    </h2>
                    <p>
                      {recommended?.description ??
                        "Write and run your very first program in 15 minutes."}
                    </p>
                    <div className="chips">
                      <span>{recommended?.level ?? "Level 1: Start from zero"}</span>
                      <span>{recommended?.durationLabel ?? "15–25 minutes"}</span>
                      <span>No experience needed</span>
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
                  <span className="eyebrow">HOW EVERY EXERCISE WORKS</span>
                  <h3>Every exercise teaches before it tests.</h3>
                  <div className="flow">
                    {[
                      "Understand",
                      "Tiny example",
                      "Small change",
                      "Your turn",
                      "Check result",
                      "Next step",
                    ].map((s, i) => (
                      <span key={s}>
                        <b>{String(i + 1).padStart(2, "0")}</b>
                        {s}
                      </span>
                    ))}
                  </div>
                  <p>
                    Understand the concept in plain English, run a tiny example,
                    make one small change, and build confidence step by step.
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
          {page === "projects" && <ProjectCatalog />}
          {page === "project" && (
            <ProjectDetail
              key={param}
              project={PROJECT_BLUEPRINTS.find((p) => p.id === param)}
            />
          )}
          {page === "explore" && <ExploreLabs />}
          {page === "cp" && <CP />}
          {(page === "resources" || page === "maintainer") && <Resources />}
          {![
            "home",
            "learn",
            "task",
            "projects",
            "project",
            "explore",
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
              <Code2 size={15} /> TDA Coding & Development — Engineering
              Resource Hub
            </span>
            <span>
              Learn. Practise. Build. Explore.{" "}
              <span className="footer-year">2026–27</span>
            </span>
          </footer>
        </main>
      </div>
    </div>
  );
}
createRoot(document.getElementById("root")!).render(<App />);
