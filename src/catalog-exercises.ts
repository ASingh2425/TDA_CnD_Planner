export type RawExerciseSeed = {
  id: string;
  title: string;
  initiative_id: string;
  trackIndex: 0 | 1 | 2 | 3;
  category:
    | "Programming & Git"
    | "Web Development"
    | "Databases & APIs"
    | "Data Structures & Algorithms"
    | "Systems & Networking"
    | "AI & Machine Learning"
    | "Cybersecurity"
    | "Software Engineering & Testing";
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  skills: string[];
  effort: number;
  description: string;
  overview: string;
  prerequisites: string;
  prerequisiteIds: string[];
  objectives: string[];
  problemStatement: string;
  constraints: string[];
  expectedOutput: string;
  hints: string[];
  testCases: { input: string; expected: string; note: string }[];
  instructions: string[];
  criteria: string[];
  deliverable: string;
  solutionReference: string;
  furtherChallenges: string[];
  relatedIds: string[];
  resources: { name: string; url: string }[];
};

export const RAW_EXERCISES: RawExerciseSeed[] = [
  // ==========================================
  // 1. PROGRAMMING & GIT FUNDAMENTALS
  // ==========================================
  {
    id: "first-contribution",
    title: "Make your first pull request",
    initiative_id: "junior-path",
    trackIndex: 0,
    category: "Programming & Git",
    difficulty: "Beginner",
    skills: ["Git", "Markdown", "GitHub"],
    effort: 2,
    description:
      "Improve one confusing sentence in the project documentation.",
    overview:
      "Every engineering career starts with reading an unfamiliar repository, running it locally, and making a clean, atomic improvement. This exercise walks you through forking, branching, committing with a conventional message, and verifying a documentation fix.",
    prerequisites:
      "Basic familiarity with a text editor and terminal navigation.",
    prerequisiteIds: [],
    objectives: [
      "Clone a repository, create an isolated feature/docs branch, and inspect git status/diff.",
      "Write a clear Conventional Commit message (e.g., docs: clarify local setup port).",
      "Verify that project build and test scripts still pass before opening a pull request.",
    ],
    problemStatement:
      "Locate an ambiguous, outdated, or incomplete instruction in a project README or documentation file. Rewrite the section so a newcomer can follow it from a clean checkout without guessing missing commands or file paths.",
    constraints: [
      "Keep the diff focused on a single documentation concern (no unrelated formatting sweeps).",
      "All existing Markdown links and code blocks must render properly.",
      "Commit message must follow the `docs: <concise imperative summary>` convention.",
    ],
    expectedOutput:
      "A clean branch diff showing the before/after text improvement, plus a PR description summarizing what was unclear and how you verified the new wording.",
    hints: [
      "Run `git diff` before staging to make sure no stray editor files or lockfile changes slipped in.",
      "Test every shell command in your updated README by running it verbatim in a fresh terminal tab.",
    ],
    testCases: [
      {
        input: "Follow updated README setup commands in a clean directory",
        expected: "Dev server starts and tests pass with zero undocumented steps",
        note: "Clean-checkout reproducibility check",
      },
      {
        input: "Run `git status` and `git log -n 1`",
        expected: "Working tree clean; single atomic commit on a named branch",
        note: "Git hygiene verification",
      },
    ],
    instructions: [
      "Fork and clone the target repository, then create a branch named `docs/clarify-setup`.",
      "Run the documented install and start commands and note any step that required guesswork.",
      "Edit the Markdown file to make the command, prerequisite version, or expected output explicit.",
      "Run the test suite (`npm test`) and inspect `git diff` to verify a minimal, clean change.",
    ],
    criteria: [
      "The deliverable meets the task description.",
      "Setup and verification steps are reproducible.",
      "The work handles errors and contains no secrets.",
      "You can demonstrate the result and explain your design choices.",
    ],
    deliverable:
      "A pull request explaining the original confusion and your improvement.",
    solutionReference:
      "Use imperative commit subjects (`docs: specify Node 22+ requirement in README`), include exact terminal commands inside fenced `sh` blocks, and state the expected local URL (`http://127.0.0.1:5173`).",
    furtherChallenges: [
      "Add a troubleshooting table covering common port conflicts and Node version mismatches.",
      "Write a link-checking script that verifies every URL in the documentation.",
    ],
    relatedIds: ["contributor-guide", "review-checklist", "cli-task-manager"],
    resources: [
      { name: "Pro Git Book (Ch 1–3)", url: "https://git-scm.com/book/en/v2" },
      {
        name: "GitHub Pull Request Guide",
        url: "https://docs.github.com/en/pull-requests",
      },
      {
        name: "Conventional Commits Specification",
        url: "https://www.conventionalcommits.org",
      },
    ],
  },
  {
    id: "cli-task-manager",
    title: "Build a command-line task manager",
    initiative_id: "junior-path",
    trackIndex: 0,
    category: "Programming & Git",
    difficulty: "Beginner",
    skills: ["JavaScript", "TypeScript", "Node.js", "Git"],
    effort: 6,
    description:
      "Practice variables, loops and functions by saving a list of tasks in a JSON file.",
    overview:
      "Before building web servers or databases, you should understand how programs parse command-line arguments, transform data structures in memory, and persist state safely to disk.",
    prerequisites:
      "Basic variables, arrays, functions, and running scripts with Node.js.",
    prerequisiteIds: ["first-contribution"],
    objectives: [
      "Parse CLI subcommands and flags (`add`, `list`, `done`, `remove`, `--tag`) from `process.argv`.",
      "Read and write structured JSON safely, handling missing or corrupted files gracefully.",
      "Separate pure data transformation functions from filesystem I/O so logic can be unit tested.",
    ],
    problemStatement:
      "Build a Node.js CLI application (`tasks.mjs` or `tasks.ts`) that manages a local `tasks.json` file. Support adding tasks with priority/tags, listing filtered tasks in a formatted table, marking tasks complete by ID, and deleting tasks.",
    constraints: [
      "Use only standard Node.js built-in modules (`node:fs`, `node:path`, `node:process`).",
      "Never crash with an unhandled stack trace when `tasks.json` does not exist yet or when an invalid ID is passed.",
      "Write atomic updates so interrupted writes do not corrupt existing tasks.",
    ],
    expectedOutput:
      "`$ node tasks.mjs add \"Write unit tests\" --priority high` → `Created task #1 [high]: Write unit tests`.\n`$ node tasks.mjs list --pending` → formatted list of pending tasks with IDs and timestamps.",
    hints: [
      "Create a helper `loadTasks(filePath)` that returns `[]` if `fs.existsSync(filePath)` is false.",
      "Write to `tasks.json.tmp` first and call `fs.renameSync` to replace `tasks.json` atomically.",
    ],
    testCases: [
      {
        input: "node tasks.mjs list (when tasks.json does not exist)",
        expected: "Prints 'No tasks found.' and exits with code 0",
        note: "First-run cold start",
      },
      {
        input: "node tasks.mjs add '' (empty title)",
        expected: "Prints validation error to stderr and exits with non-zero code",
        note: "Input validation",
      },
      {
        input: "node tasks.mjs done 999 (non-existent ID)",
        expected: "Prints 'Task #999 not found' without modifying tasks.json",
        note: "Missing entity handling",
      },
    ],
    instructions: [
      "Define the `TaskItem` schema (`id`, `title`, `done`, `priority`, `createdAt`).",
      "Implement pure reducer functions `addTask(list, title, priority)`, `completeTask(list, id)`, and `filterTasks(list, query)`.",
      "Build the thin CLI adapter that reads `process.argv`, loads `tasks.json`, invokes the pure function, saves the result, and prints output.",
      "Add automated unit tests for the pure functions and edge cases.",
    ],
    criteria: [
      "The deliverable meets the task description.",
      "Setup and verification steps are reproducible.",
      "The work handles errors and contains no secrets.",
      "You can demonstrate the result and explain your design choices.",
    ],
    deliverable:
      "A repository with add, list and complete commands, sample output and a README.",
    solutionReference:
      "Decouple storage from logic: `export function applyCommand(tasks, cmd, args)` returns `{ nextTasks, output, exitCode }`. This allows 100% unit test coverage without touching the disk.",
    furtherChallenges: [
      "Add `--due YYYY-MM-DD` sorting and overdue highlighting using ANSI terminal colors.",
      "Support exporting tasks to a Markdown checklist file.",
    ],
    relatedIds: ["first-contribution", "json-stream-aggregator", "markdown-linter-cli"],
    resources: [
      { name: "Node.js File System Docs", url: "https://nodejs.org/api/fs.html" },
      { name: "The Modern JavaScript Tutorial", url: "https://javascript.info" },
    ],
  },
  {
    id: "git-bisect-detective",
    title: "Isolate a regression with Git Bisect",
    initiative_id: "dev-culture",
    trackIndex: 0,
    category: "Programming & Git",
    difficulty: "Intermediate",
    skills: ["Git", "Debugging", "Testing"],
    effort: 3,
    description:
      "Use binary search across commit history to pinpoint the exact commit that broke a build.",
    overview:
      "When a subtle bug appears across hundreds of commits, checking commits one by one takes O(N) time. `git bisect` performs a binary search over the commit DAG in O(log N) steps, and can even run fully automatically with a test script.",
    prerequisites: "Comfort with Git commits, branches, and running test commands.",
    prerequisiteIds: ["first-contribution"],
    objectives: [
      "Run manual and automated `git bisect` sessions across a multi-commit history.",
      "Write a deterministic reproduction script returning exit code 0 (good) or 1 (bad).",
      "Author a root-cause postmortem and a non-destructive revert or fix commit.",
    ],
    problemStatement:
      "Create or use a repository history of at least 32 commits where one commit subtly breaks an edge case (e.g., off-by-one pagination or timezone rounding). Write a shell/Node verification script and use `git bisect run` to identify the exact offending commit hash automatically.",
    constraints: [
      "The bisect test script must complete in under 2 seconds per commit.",
      "Return exit code 125 inside the bisect script if a commit cannot be built (skip state).",
    ],
    expectedOutput:
      "`<commit-hash> is the first bad commit` output log from `git bisect run`, followed by a fix commit and regression test.",
    hints: [
      "Keep your reproduction test script outside the tracked working tree (e.g., `/tmp/check.mjs`) so checkout steps do not overwrite it.",
    ],
    testCases: [
      {
        input: "32-commit history where commit #19 introduced an off-by-one bug",
        expected: "Pinpoints commit #19 in at most 5–6 test executions",
        note: "Logarithmic commit search",
      },
    ],
    instructions: [
      "Generate a branch with 30+ commits and inject a subtle bug midway through the history.",
      "Write an automated assertion script `verify.mjs` that exits 0 when the invariant holds and 1 when broken.",
      "Execute `git bisect start HEAD <initial-commit>` and `git bisect run node verify.mjs`.",
      "Document the transcript, offending diff, and regression fix in your README.",
    ],
    criteria: [
      "The deliverable meets the task description.",
      "Setup and verification steps are reproducible.",
      "The work handles errors and contains no secrets.",
      "You can demonstrate the result and explain your design choices.",
    ],
    deliverable:
      "A repository containing the commit history, automated bisect script, bisect log transcript, and regression fix.",
    solutionReference:
      "`git bisect run` uses exit code 0 for good, 1–127 (except 125) for bad, and 125 to skip untestable commits.",
    furtherChallenges: [
      "Combine `git blame -L` and `git log -S` (pickaxe search) to trace when a specific function signature evolved.",
    ],
    relatedIds: ["first-contribution", "binary-search-tests", "review-checklist"],
    resources: [
      {
        name: "Git Tools — Debugging with Git",
        url: "https://git-scm.com/book/en/v2/Git-Tools-Debugging-with-Git",
      },
    ],
  },
  {
    id: "json-stream-aggregator",
    title: "Stream-process multi-megabyte NDJSON logs",
    initiative_id: "analytics-engine",
    trackIndex: 0,
    category: "Programming & Git",
    difficulty: "Intermediate",
    skills: ["Node.js", "Streams", "TypeScript"],
    effort: 5,
    description:
      "Aggregate telemetry metrics from newline-delimited JSON without loading the entire file into RAM.",
    overview:
      "Calling `JSON.parse(fs.readFileSync(hugeFile))` crashes Node.js when log files exceed available heap memory. Streaming line-by-line with `readline` and async iterators processes gigabytes of data in constant O(1) memory.",
    prerequisites: "JavaScript async/await, iterators, and basic file I/O.",
    prerequisiteIds: ["cli-task-manager"],
    objectives: [
      "Process newline-delimited JSON (NDJSON) using `node:readline` and `fs.createReadStream`.",
      "Compute streaming aggregations (count, error rate, p95 latency histogram) in bounded memory.",
      "Isolate malformed JSON lines into a dead-letter counter without aborting the entire pipeline.",
    ],
    problemStatement:
      "Write a streaming log analyzer that reads an NDJSON file of HTTP request events (`timestamp`, `route`, `status`, `durationMs`), skips malformed lines with warnings, and outputs per-route request counts, 5xx error rates, and p95 latency.",
    constraints: [
      "Peak heap usage overhead must stay flat regardless of input line count.",
      "Malformed lines must be counted and reported rather than crashing the stream.",
    ],
    expectedOutput:
      "JSON summary report containing `totalLines`, `malformedLines`, and per-route `{ count, errorRate, p95Ms }`.",
    hints: [
      "Use `for await (const line of readline.createInterface({ input: fileStream }))` for clean backpressure-aware iteration.",
    ],
    testCases: [
      {
        input: "10,000 valid NDJSON lines + 3 truncated lines",
        expected: "Processes all 10,000 valid records and reports malformedLines: 3",
        note: "Fault-tolerant streaming",
      },
    ],
    instructions: [
      "Create a generator script to synthesize sample NDJSON log files with configurable line counts.",
      "Implement the `for await` line reader and validate each parsed event object.",
      "Accumulate route statistics and compute summary percentiles.",
      "Write unit tests covering empty streams, corrupt lines, and latency calculations.",
    ],
    criteria: [
      "The deliverable meets the task description.",
      "Setup and verification steps are reproducible.",
      "The work handles errors and contains no secrets.",
      "You can demonstrate the result and explain your design choices.",
    ],
    deliverable:
      "A streaming NDJSON analyzer CLI with synthetic log generator and unit tests.",
    solutionReference:
      "Async iterables over Node readable streams automatically pause and resume the underlying file descriptor, guaranteeing bounded memory usage.",
    furtherChallenges: [
      "Implement a custom `Transform` stream that filters and compresses matching events to `.ndjson.gz`.",
    ],
    relatedIds: ["cli-task-manager", "tcp-backpressure-proxy"],
    resources: [
      {
        name: "Node.js Streams Documentation",
        url: "https://nodejs.org/api/stream.html",
      },
    ],
  },
  {
    id: "markdown-linter-cli",
    title: "Build a Markdown link and heading linter",
    initiative_id: "knowledge-base",
    trackIndex: 0,
    category: "Programming & Git",
    difficulty: "Intermediate",
    skills: ["TypeScript", "Regex", "CLI"],
    effort: 5,
    description:
      "Scan documentation folders for broken relative links, skipped heading levels, and missing alt text.",
    overview:
      "Documentation rots quickly unless verified in CI. Building a fast static analyzer for Markdown files teaches lexical scanning, AST/line-number tracking, and actionable compiler-style error reporting.",
    prerequisites: "String manipulation, regular expressions, and recursive directory traversal.",
    prerequisiteIds: ["cli-task-manager"],
    objectives: [
      "Recursively traverse directories while respecting ignored folders (`node_modules`, `.git`).",
      "Track exact `file:line:column` locations for every diagnostic rule violation.",
      "Ignore false positives inside fenced code blocks (```` ``` ````).",
    ],
    problemStatement:
      "Build a CLI tool `mdcheck` that validates `.md` files against three rules: (1) no skipped heading levels (e.g., `# H1` directly to `### H3`), (2) all relative file links resolve to existing files on disk, and (3) all images include non-empty alt text.",
    constraints: [
      "Do not flag `#` comments inside fenced code blocks as Markdown headings.",
      "Exit with status code 1 when violations are found and 0 when clean.",
    ],
    expectedOutput:
      "`docs/guide.md:14:1 [heading-jump] Heading jumped from H1 to H3`\n`docs/guide.md:28:12 [broken-link] Target './missing.md' does not exist`",
    hints: [
      "Maintain a boolean `inCodeFence` state toggled whenever a line starts with three or more backticks.",
    ],
    testCases: [
      {
        input: "Markdown file with `# bash comment` inside a ```sh code block",
        expected: "0 warnings (code fence contents ignored)",
        note: "Lexer state awareness",
      },
      {
        input: "Markdown file linking to `./nonexistent.md`",
        expected: "Reports exact line number and rule ID `broken-link`",
        note: "Relative path resolution",
      },
    ],
    instructions: [
      "Implement a stateful line scanner that tracks line numbers and code-fence state.",
      "Add rule checkers for heading hierarchy, image alt text `![alt](src)`, and local links `[text](./path)`.",
      "Format output in standard `filepath:line:col [rule] message` format.",
      "Add tests for valid and invalid Markdown fixtures.",
    ],
    criteria: [
      "The deliverable meets the task description.",
      "Setup and verification steps are reproducible.",
      "The work handles errors and contains no secrets.",
      "You can demonstrate the result and explain your design choices.",
    ],
    deliverable:
      "A standalone Markdown linter CLI with fixture-based unit tests and exit-code reporting.",
    solutionReference:
      "Track `lastHeadingLevel` per file; if `currentLevel > lastHeadingLevel + 1`, emit a `heading-jump` diagnostic with line metadata.",
    furtherChallenges: [
      "Validate heading anchor fragments (e.g., `./guide.md#installation`) against slugified headings in the target file.",
    ],
    relatedIds: ["contributor-guide", "first-contribution"],
    resources: [
      { name: "CommonMark Specification", url: "https://spec.commonmark.org/" },
    ],
  },

  // ==========================================
  // 2. WEB DEVELOPMENT & FRONTEND ENGINEERING
  // ==========================================
  {
    id: "developer-profile",
    title: "Build your developer profile",
    initiative_id: "junior-path",
    trackIndex: 0,
    category: "Web Development",
    difficulty: "Beginner",
    skills: ["HTML", "CSS", "JavaScript"],
    effort: 5,
    description:
      "Create an accessible profile page that describes what you want to learn.",
    overview:
      "Master the core web platform without frameworks first: semantic HTML landmarks, responsive CSS Grid/Flexbox layouts, keyboard accessibility, and asynchronous DOM updates with `fetch()`.",
    prerequisites: "Basic HTML tags and CSS selectors.",
    prerequisiteIds: ["first-contribution"],
    objectives: [
      "Structure a document with semantic landmarks (`header`, `main`, `section`, `nav`, `footer`) and proper heading order.",
      "Build a fluid layout using CSS Grid and custom properties that works from 320px mobile to desktop without horizontal scrolling.",
      "Fetch live JSON data (e.g., public GitHub repositories or a local JSON manifest) with explicit loading, empty, and error states.",
    ],
    problemStatement:
      "Create a responsive developer portfolio and learning log page in vanilla HTML, CSS, and JavaScript. Dynamically load and filter your projects or learning milestones, and handle network failures gracefully with a retry button.",
    constraints: [
      "Zero horizontal overflow (`scrollWidth <= innerWidth`) across 320px–1920px viewports.",
      "All interactive controls must be operable via keyboard (`Tab`, `Enter`, `Space`) with visible `:focus-visible` outlines.",
      "Must render an explicit error message and retry button when the `fetch` request fails.",
    ],
    expectedOutput:
      "A responsive web page displaying your bio, skills, filterable project cards, and resilient async status indicators.",
    hints: [
      "Use `aria-live=\"polite\"` on the status container so screen readers announce loading and error transitions.",
      "Use `grid-template-columns: repeat(auto-fit, minmax(260px, 1fr))` for responsive cards without media-query clutter.",
    ],
    testCases: [
      {
        input: "Simulate offline network or 500 response on project fetch",
        expected: "Shows user-friendly error banner with a working 'Try again' button",
        note: "Async error state verification",
      },
      {
        input: "Resize viewport to 360px width",
        expected: "Single-column card layout with zero horizontal scrollbar",
        note: "Mobile responsiveness check",
      },
    ],
    instructions: [
      "Write semantic `index.html` with a skip-to-content link, bio header, skill tags, and a project container.",
      "Style the page with CSS variables, responsive grid cards, and accessible focus rings.",
      "Write `app.js` to fetch project data, render cards safely using `textContent` (avoiding `innerHTML` XSS), and wire category filter buttons.",
      "Test keyboard navigation, mobile viewport sizing, and simulated network failure.",
    ],
    criteria: [
      "The deliverable meets the task description.",
      "Setup and verification steps are reproducible.",
      "The work handles errors and contains no secrets.",
      "You can demonstrate the result and explain your design choices.",
    ],
    deliverable:
      "A deployed responsive page and source repository, including a fetch request with an error state.",
    solutionReference:
      "Wrap `fetch()` in a `try/catch` block, check `if (!res.ok) throw new Error(res.statusText)`, and construct DOM nodes with `document.createElement` and `textContent`.",
    furtherChallenges: [
      "Add a dark/light theme toggle that respects `prefers-color-scheme` and persists overrides in `localStorage`.",
      "Achieve 100 across Performance, Accessibility, and Best Practices in Lighthouse.",
    ],
    relatedIds: ["problem-bank-ui", "accessible-command-palette"],
    resources: [
      {
        name: "MDN Learn Web Development",
        url: "https://developer.mozilla.org/en-US/docs/Learn",
      },
      {
        name: "W3C WAI Accessibility Tutorials",
        url: "https://www.w3.org/WAI/tutorials/",
      },
    ],
  },
  {
    id: "problem-bank-ui",
    title: "Build a searchable problem list",
    initiative_id: "dsa-bank",
    trackIndex: 1,
    category: "Web Development",
    difficulty: "Intermediate",
    skills: ["React", "JavaScript", "TypeScript"],
    effort: 8,
    description:
      "Help members find practice problems using topic and difficulty filters.",
    overview:
      "Filtering, searching, sorting, and URL query synchronization are foundational patterns in frontend engineering. In this exercise you build a fast, accessible catalog view with combinable filters and deterministic tests.",
    prerequisites: "HTML/CSS/JS fundamentals and basic React components/props/state.",
    prerequisiteIds: ["developer-profile"],
    objectives: [
      "Model derived UI state cleanly from filter inputs (search query, topic, difficulty, sort order) without redundant `useEffect` state syncing.",
      "Synchronize filter state with URL search parameters so filtered views can be bookmarked and shared.",
      "Provide informative empty states with a single-click reset action when no items match.",
    ],
    problemStatement:
      "Build a React Problem Explorer component that filters a catalog of 50+ algorithmic problems by case-insensitive keyword search (title, tags, pattern), topic dropdown, and difficulty level, displaying active filter chips and result counts.",
    constraints: [
      "Combinable filters must intersect with logical AND semantics.",
      "Every form control must have an associated `<label>` for screen readers and Playwright `getByLabel` queries.",
      "Zero unnecessary re-renders or duplicated state arrays.",
    ],
    expectedOutput:
      "Interactive React catalog with instant search, combinable dropdowns, active result counter, and clear-filters button.",
    hints: [
      "Compute `filteredProblems` directly during render (or with `useMemo`) from the source array and filter states instead of storing `filteredProblems` in `useState`.",
    ],
    testCases: [
      {
        input: "Search 'two pointers' + Difficulty 'Intermediate'",
        expected: "Shows only Intermediate problems matching 'two pointers'",
        note: "Conjunctive filter intersection",
      },
      {
        input: "Search 'xyz-nonexistent-query' then click 'Clear filters'",
        expected: "Renders empty state message, then restores full catalog on clear",
        note: "Empty state recovery",
      },
    ],
    instructions: [
      "Define the `Problem` TypeScript interface and seed at least 25 realistic problems across 6 topics.",
      "Build controlled filter inputs (`search`, `topic`, `difficulty`) with accessible labels.",
      "Derive the filtered list and result count, rendering problem cards with pattern badges.",
      "Write automated component or E2E tests verifying search, combined filters, empty state, and reset.",
    ],
    criteria: [
      "The deliverable meets the task description.",
      "Setup and verification steps are reproducible.",
      "The work handles errors and contains no secrets.",
      "You can demonstrate the result and explain your design choices.",
    ],
    deliverable:
      "A React feature with combinable filters, empty states and tests.",
    solutionReference:
      "Keep state minimal: `const [query, setQuery] = useState(''); const [topic, setTopic] = useState('');` and compute `const visible = items.filter(...)` directly.",
    furtherChallenges: [
      "Add keyboard shortcuts (`/` to focus search, `Escape` to clear) and URL hash/query persistence.",
    ],
    relatedIds: ["developer-profile", "accessible-command-palette", "virtualized-log-viewer"],
    resources: [
      { name: "React Official Learn Guide", url: "https://react.dev/learn" },
      {
        name: "Thinking in React",
        url: "https://react.dev/learn/thinking-in-react",
      },
    ],
  },
  {
    id: "accessible-command-palette",
    title: "Build a keyboard-driven command palette (Cmd+K)",
    initiative_id: "core-platform",
    trackIndex: 1,
    category: "Web Development",
    difficulty: "Intermediate",
    skills: ["React", "TypeScript", "Accessibility"],
    effort: 6,
    description:
      "Implement a fast modal launcher with fuzzy search, arrow-key navigation, focus trapping, and ARIA combobox semantics.",
    overview:
      "Modern developer tools rely on `Cmd+K` / `Ctrl+K` command palettes for rapid navigation. Building one from scratch teaches keyboard event handling, focus management, scroll-into-view synchronization, and WAI-ARIA combobox patterns.",
    prerequisites: "React hooks (`useState`, `useEffect`, `useRef`) and DOM keyboard events.",
    prerequisiteIds: ["problem-bank-ui"],
    objectives: [
      "Listen for global `Ctrl+K` / `Meta+K` and `Escape` keystrokes without leaking event listeners.",
      "Support `ArrowDown`, `ArrowUp`, `Home`, `End`, and `Enter` selection across grouped results.",
      "Restore focus to the previously active element when the dialog closes.",
    ],
    problemStatement:
      "Build a reusable Command Palette component in React + TypeScript that indexes pages, exercises, and actions, ranks matches by prefix and substring score, and lets users navigate and trigger commands purely via keyboard.",
    constraints: [
      "Arrow key navigation must wrap around cleanly from last item to first item.",
      "Input must expose `role=\"combobox\"`, `aria-expanded`, and `aria-activedescendant` pointing to the active option ID.",
    ],
    expectedOutput:
      "A modal command palette triggered via `Ctrl+K` or a header button, supporting instant search, highlighted matches, and keyboard execution.",
    hints: [
      "Clamp or modulo the `activeIndex` whenever the filtered result list changes length.",
    ],
    testCases: [
      {
        input: "Press Ctrl+K, type 'binary', press ArrowDown, press Enter",
        expected: "Opens palette, filters to Binary Search item, navigates to target route, and closes modal",
        note: "Full keyboard flow",
      },
    ],
    instructions: [
      "Create the command registry data structure (`id`, `title`, `category`, `keywords`, `action`).",
      "Implement the scoring filter that prioritizes title prefix matches over keyword substring matches.",
      "Add keyboard handlers for `ArrowUp`, `ArrowDown`, `Enter`, and `Escape`.",
      "Verify screen reader attributes and focus restoration with automated tests.",
    ],
    criteria: [
      "The deliverable meets the task description.",
      "Setup and verification steps are reproducible.",
      "The work handles errors and contains no secrets.",
      "You can demonstrate the result and explain your design choices.",
    ],
    deliverable:
      "An accessible React Command Palette component with keyboard navigation and unit/E2E tests.",
    solutionReference:
      "Use `activeIndex = ((next % count) + count) % count` for wrap-around arrow navigation and `aria-activedescendant={`cmd-opt-${activeItem.id}`}` on the search input.",
    furtherChallenges: [
      "Add recent commands history and fuzzy character subsequence matching with matched character highlighting.",
    ],
    relatedIds: ["problem-bank-ui", "virtualized-log-viewer"],
    resources: [
      {
        name: "WAI-ARIA Combobox Pattern",
        url: "https://www.w3.org/WAI/ARIA/apg/patterns/combobox/",
      },
    ],
  },
  {
    id: "virtualized-log-viewer",
    title: "Build a windowed virtual list for 100,000 rows",
    initiative_id: "analytics-engine",
    trackIndex: 1,
    category: "Web Development",
    difficulty: "Advanced",
    skills: ["React", "TypeScript", "Performance"],
    effort: 8,
    description:
      "Render massive datasets at 60 FPS by mounting only the DOM nodes visible inside the scroll viewport.",
    overview:
      "Mounting 100,000 DOM rows freezes the browser layout engine. UI virtualization (windowing) computes the visible index slice `[startIndex, endIndex]` from `scrollTop` and `viewportHeight`, keeping total DOM nodes under 40 at all times.",
    prerequisites: "DOM layout metrics (`scrollTop`, `clientHeight`) and React state.",
    prerequisiteIds: ["problem-bank-ui"],
    objectives: [
      "Calculate visible item indices and overscan buffer from scroll position and row height.",
      "Maintain a full-height inner spacer container (`totalCount * rowHeight`) so native scrollbar physics remain accurate.",
      "Support instant 'Jump to row #N' and keyword search filtering across 100,000 items.",
    ],
    problemStatement:
      "Implement a zero-dependency `<VirtualList />` component in React + TypeScript capable of scrolling smoothly through 100,000 structured log records with configurable overscan and row selection.",
    constraints: [
      "DOM node count inside the list container must never exceed `(viewportHeight / rowHeight) + 2 * overscan`.",
      "Initial render of 100,000 items must complete in under 50ms.",
    ],
    expectedOutput:
      "A smooth 60 FPS scrolling viewer for 100,000 rows showing live telemetry of `mountedNodes`, `startIndex`, and `endIndex`.",
    hints: [
      "Use `Math.max(0, Math.floor(scrollTop / rowHeight) - overscan)` for `startIndex`, and position visible rows with `transform: translateY(${index * rowHeight}px)`.",
    ],
    testCases: [
      {
        input: "Pass 100,000 items with viewportHeight=400, rowHeight=40, overscan=3",
        expected: "Mounts at most 16 row elements in the DOM at any scroll offset",
        note: "Bounded DOM node invariant",
      },
    ],
    instructions: [
      "Write the pure index-range calculator `getVisibleRange(scrollTop, viewportHeight, rowHeight, totalCount, overscan)`.",
      "Build the outer scroll container (`overflow-y: auto`) and inner height sizer (`position: relative; height: totalHeight`).",
      "Render only the slice `items.slice(startIndex, endIndex + 1)` with absolute/translated Y offsets.",
      "Add unit tests for range math and DOM node count assertions.",
    ],
    criteria: [
      "The deliverable meets the task description.",
      "Setup and verification steps are reproducible.",
      "The work handles errors and contains no secrets.",
      "You can demonstrate the result and explain your design choices.",
    ],
    deliverable:
      "A reusable virtualized list component benchmarked on 100,000 rows with unit tests.",
    solutionReference:
      "Absolute positioning with `translateY` avoids reflowing siblings on scroll; only the newly entering/leaving overscan rows mount or unmount.",
    furtherChallenges: [
      "Support variable-height rows using a prefix-sum offset array and binary search to map `scrollTop` to `startIndex` in O(log N).",
    ],
    relatedIds: ["problem-bank-ui", "prefix-sum-2d-matrix"],
    resources: [
      {
        name: "web.dev — Virtualize Large Lists",
        url: "https://web.dev/articles/virtualize-long-lists-react-window",
      },
    ],
  },
  {
    id: "optimistic-kanban-board",
    title: "Implement optimistic UI updates with rollback",
    initiative_id: "core-platform",
    trackIndex: 1,
    category: "Web Development",
    difficulty: "Intermediate",
    skills: ["React", "TypeScript", "State Management"],
    effort: 7,
    description:
      "Update board state immediately on user action and cleanly roll back if the simulated async request fails.",
    overview:
      "Waiting 400ms for a network round-trip before moving a card makes interfaces feel sluggish. Optimistic UI applies the mutation immediately, queues the async request, and restores a snapshot if the server rejects the operation.",
    prerequisites: "React state immutability, promises, and error handling.",
    prerequisiteIds: ["problem-bank-ui"],
    objectives: [
      "Design immutable state transitions for moving cards across columns and reordering.",
      "Capture pre-mutation state snapshots to guarantee exact rollback on network error.",
      "Expose a chaos-testing toggle (e.g., 30% simulated failure rate) to verify rollback resilience.",
    ],
    problemStatement:
      "Build a multi-column issue board where cards can be moved via keyboard or pointer controls. Apply moves optimistically in 0ms, display a subtle syncing badge on in-flight items, and revert the card with an accessible toast alert if the async persistence call fails.",
    constraints: [
      "Concurrent moves on different cards must not overwrite each other's rollback snapshots.",
      "Keyboard controls (`Move Left`, `Move Right`) must be available alongside drag actions.",
    ],
    expectedOutput:
      "An interactive Kanban board with instant card transitions, simulated latency/error controls, and deterministic rollback behavior.",
    hints: [
      "Maintain a `baseState` (confirmed server state) and a list of `pendingMutations` so rolling back a failed mutation simply removes it from `pendingMutations` and recomputes derived state!",
    ],
    testCases: [
      {
        input: "Move card A to 'Done' while failure toggle is ON",
        expected: "Card appears in 'Done' immediately, then snaps back to 'In Progress' with error alert after simulated latency",
        note: "Snapshot rollback verification",
      },
    ],
    instructions: [
      "Model board columns and cards with immutable helper functions.",
      "Implement an async mock client with configurable latency (200–800ms) and failure probability.",
      "Layer optimistic pending actions over confirmed state so failed actions cleanly evaporate.",
      "Write tests verifying both commit confirmation and failure rollback.",
    ],
    criteria: [
      "The deliverable meets the task description.",
      "Setup and verification steps are reproducible.",
      "The work handles errors and contains no secrets.",
      "You can demonstrate the result and explain your design choices.",
    ],
    deliverable:
      "An optimistic Kanban board with chaos-simulation controls and automated rollback tests.",
    solutionReference:
      "Computing `displayedState = pendingMutations.reduce(applyMutation, confirmedState)` eliminates race conditions when two mutations resolve out of order.",
    furtherChallenges: [
      "Persist confirmed state in `IndexedDB` and replay offline mutations when connectivity returns.",
    ],
    relatedIds: ["problem-bank-ui", "idempotent-webhook-processor"],
    resources: [
      {
        name: "React useOptimistic Pattern Reference",
        url: "https://react.dev/reference/react/useOptimistic",
      },
    ],
  },

  // ==========================================
  // 3. DATABASES, BACKEND & APIs
  // ==========================================
  {
    id: "api-data-model",
    title: "Design a small project API",
    initiative_id: "core-platform",
    trackIndex: 1,
    category: "Databases & APIs",
    difficulty: "Intermediate",
    skills: ["SQL", "APIs", "PostgreSQL", "TypeScript"],
    effort: 8,
    description:
      "Practice relational modeling and authorization with a small project tracker.",
    overview:
      "Strong backend engineering starts with schema design: choosing primary/foreign keys, enforcing constraints at the database layer, validating request payloads at the boundary, and testing authorization rules.",
    prerequisites: "Basic HTTP methods, JSON, and introductory SQL queries.",
    prerequisiteIds: ["cli-task-manager"],
    objectives: [
      "Design a normalized relational schema (3NF) with foreign keys, `NOT NULL`, `UNIQUE`, and `CHECK` constraints.",
      "Validate all incoming request payloads using schema validation (e.g., Zod) before executing queries.",
      "Enforce resource-level authorization checks and verify them with automated integration tests.",
    ],
    problemStatement:
      "Design and implement a RESTful API and SQL schema for a Project & Milestone catalogue (`projects`, `milestones`, `tags`, `project_tags`). Support filtering, pagination, input validation, and role-based write protection.",
    constraints: [
      "Use parameterized SQL queries or a typed query builder — never interpolate user strings into SQL.",
      "Return consistent HTTP status codes (`200`, `201`, `400`, `403`, `404`, `409`) and structured error payloads.",
    ],
    expectedOutput:
      "An ER diagram, SQL migration script, typed API route handlers, and a passing test suite covering CRUD, validation errors, and authorization checks.",
    hints: [
      "Use a composite primary key `(project_id, tag_id)` on the join table `project_tags` to prevent duplicate tag assignments at the database level.",
    ],
    testCases: [
      {
        input: "POST /api/projects with empty title or invalid difficulty enum",
        expected: "400 Bad Request with field-level validation errors",
        note: "Boundary schema validation",
      },
      {
        input: "DELETE /api/projects/:id by unauthorized role",
        expected: "403 Forbidden; database row remains intact",
        note: "Authorization enforcement",
      },
    ],
    instructions: [
      "Draw the Entity-Relationship (ER) diagram and write the `001_init.sql` schema migration.",
      "Create request/response validators and parameterized repository queries.",
      "Implement `GET /projects`, `POST /projects`, `PATCH /projects/:id`, and `DELETE /projects/:id`.",
      "Write automated tests covering happy paths, invalid payloads, duplicate keys, and forbidden actions.",
    ],
    criteria: [
      "The deliverable meets the task description.",
      "Setup and verification steps are reproducible.",
      "The work handles errors and contains no secrets.",
      "You can demonstrate the result and explain your design choices.",
    ],
    deliverable:
      "An ER diagram, migration, API implementation and authorization tests.",
    solutionReference:
      "Enforce invariants twice: validate with Zod at the HTTP boundary for clear 400 errors, and enforce `FOREIGN KEY ... ON DELETE CASCADE` and `CHECK` constraints in PostgreSQL/SQLite for data integrity.",
    furtherChallenges: [
      "Add keyset (cursor) pagination using `(created_at, id) < ($1, $2)` instead of `OFFSET`.",
    ],
    relatedIds: ["cursor-pagination-api", "sql-query-optimizer", "token-bucket-rate-limiter"],
    resources: [
      { name: "SQLBolt Interactive SQL Tutorial", url: "https://sqlbolt.com/" },
      {
        name: "PostgreSQL Official Documentation",
        url: "https://www.postgresql.org/docs/current/",
      },
    ],
  },
  {
    id: "cursor-pagination-api",
    title: "Implement keyset cursor pagination over 1M rows",
    initiative_id: "core-platform",
    trackIndex: 1,
    category: "Databases & APIs",
    difficulty: "Intermediate",
    skills: ["SQL", "APIs", "Performance"],
    effort: 5,
    description:
      "Replace slow OFFSET pagination with O(log N) composite cursor pagination that never skips or duplicates rows.",
    overview:
      "`SELECT * FROM events ORDER BY created_at DESC LIMIT 20 OFFSET 500000` forces the database to scan and discard 500,000 rows on every request. Keyset (cursor) pagination uses an indexed `(created_at, id)` tuple to jump directly to the next page in O(log N) time.",
    prerequisites: "SQL `ORDER BY`, `WHERE`, and basic indexing concepts.",
    prerequisiteIds: ["api-data-model"],
    objectives: [
      "Understand why `OFFSET` degrades linearly with page depth and produces duplicate/skipped items under concurrent inserts.",
      "Encode and decode opaque Base64URL cursors containing `(createdAt, id)` tie-breakers.",
      "Create a matching composite B-Tree index `ON events (created_at DESC, id DESC)`.",
    ],
    problemStatement:
      "Build a paginated feed endpoint `GET /api/events?limit=20&cursor=...` backed by SQLite or PostgreSQL. Handle identical timestamps deterministically using `id` as a secondary sort key, and return `{ items, nextCursor, hasMore }`.",
    constraints: [
      "Fetch `limit + 1` rows in a single query to determine `hasMore` without running a separate `COUNT(*)` query.",
      "Reject tampered or malformed cursor strings with `400 Bad Request`.",
    ],
    expectedOutput:
      "Paginated JSON response with stable O(1) page latency at page 1 and page 10,000, verified by concurrent-insert tests.",
    hints: [
      "Use row-value comparison `WHERE (created_at, id) < (:cursorCreatedAt, :cursorId) ORDER BY created_at DESC, id DESC LIMIT :limitPlusOne`.",
    ],
    testCases: [
      {
        input: "Two events share the exact same millisecond timestamp across a page boundary",
        expected: "Both events appear once across page 1 and page 2 with zero loss or duplication",
        note: "Tie-breaker determinism",
      },
    ],
    instructions: [
      "Create the `events` table and composite index `(created_at DESC, id DESC)`.",
      "Implement `encodeCursor(row)` and `decodeCursor(token)` with schema validation.",
      "Write the keyset query fetching `limit + 1` records and slicing to `limit`.",
      "Test pagination consistency when new rows are inserted between page requests.",
    ],
    criteria: [
      "The deliverable meets the task description.",
      "Setup and verification steps are reproducible.",
      "The work handles errors and contains no secrets.",
      "You can demonstrate the result and explain your design choices.",
    ],
    deliverable:
      "A cursor-paginated API endpoint with composite index benchmark and tie-breaker unit tests.",
    solutionReference:
      "Always include a unique column (`id`) as the final component of a cursor key and `ORDER BY` clause so total ordering is strictly deterministic.",
    furtherChallenges: [
      "Support bidirectional pagination (`before` and `after` cursors).",
    ],
    relatedIds: ["api-data-model", "sql-query-optimizer"],
    resources: [
      {
        name: "Use The Index, Luke — Seek Method Pagination",
        url: "https://use-the-index-luke.com/no-offset",
      },
    ],
  },
  {
    id: "token-bucket-rate-limiter",
    title: "Build a sliding-window & token-bucket rate limiter",
    initiative_id: "cp-leaderboard",
    trackIndex: 1,
    category: "Databases & APIs",
    difficulty: "Intermediate",
    skills: ["APIs", "Algorithms", "TypeScript"],
    effort: 6,
    description:
      "Protect APIs from traffic spikes and abuse while returning RFC-compliant rate-limit headers.",
    overview:
      "Every public API and upstream integration needs rate limiting to prevent cascading overload. Implementing both Token Bucket (burst-friendly) and Sliding Window Log/Counter teaches time-based state management and HTTP middleware design.",
    prerequisites: "HTTP middleware concepts, timestamps, and maps/hashes.",
    prerequisiteIds: ["api-data-model"],
    objectives: [
      "Implement Token Bucket refill math using monotonic elapsed time without background timers.",
      "Emit standard headers: `X-RateLimit-Limit`, `X-RateLimit-Remaining`, and `Retry-After` on `429 Too Many Requests`.",
      "Write deterministic tests using an injectable clock (`now: () => number`).",
    ],
    problemStatement:
      "Create a reusable TypeScript rate-limiter module and HTTP middleware supporting configurable `capacity` and `refillRatePerSecond` per client key. Evict stale buckets automatically so memory stays bounded.",
    constraints: [
      "No `setInterval` per client key (lazy token calculation on request arrival only).",
      "Must accept a custom clock function so unit tests can advance time instantaneously.",
    ],
    expectedOutput:
      "Rate-limiter library and middleware returning `{ allowed, remaining, retryAfterSeconds }` with 100% deterministic clock tests.",
    hints: [
      "Compute `refilled = Math.min(capacity, tokens + ((now - lastRefillMs) / 1000) * refillRate)` on each check.",
    ],
    testCases: [
      {
        input: "Capacity 5, rate 1/sec: fire 5 requests at t=0, 1 request at t=200ms, 1 request at t=1000ms",
        expected: "First 5 allowed, 6th rejected with Retry-After: 1, 7th allowed at t=1000ms",
        note: "Burst and refill accuracy",
      },
    ],
    instructions: [
      "Design the `TokenBucketLimiter` class taking `{ capacity, refillPerSec, now }`.",
      "Implement lazy refill calculation and token deduction in `consume(key, cost = 1)`.",
      "Wrap the limiter in an HTTP handler/middleware that sets `429` and `Retry-After` headers.",
      "Add unit tests covering burst exhaustion, partial refill, and stale key cleanup.",
    ],
    criteria: [
      "The deliverable meets the task description.",
      "Setup and verification steps are reproducible.",
      "The work handles errors and contains no secrets.",
      "You can demonstrate the result and explain your design choices.",
    ],
    deliverable:
      "A rate-limiter module and middleware with injectable-clock unit tests.",
    solutionReference:
      "Lazy token calculation stores only `{ tokens, lastUpdated }` per active key and requires zero background threads.",
    furtherChallenges: [
      "Port the token-bucket state update to an atomic Redis Lua script to prevent race conditions across distributed workers.",
    ],
    relatedIds: ["api-data-model", "lru-cache-ttl-eviction", "sliding-window-rate-counter"],
    resources: [
      {
        name: "IETF RateLimit Header Fields Draft",
        url: "https://datatracker.ietf.org/doc/html/draft-ietf-httpapi-ratelimit-headers",
      },
    ],
  },
  {
    id: "idempotent-webhook-processor",
    title: "Build an idempotent webhook ingestion engine",
    initiative_id: "certs-system",
    trackIndex: 1,
    category: "Databases & APIs",
    difficulty: "Advanced",
    skills: ["APIs", "SQL", "Cryptography", "TypeScript"],
    effort: 8,
    description:
      "Guarantee exactly-once business side effects even when webhook providers retry deliveries multiple times.",
    overview:
      "Distributed webhook providers (GitHub, Stripe, Upstash) guarantee at-least-once delivery, meaning the same event can arrive twice or concurrently. Idempotency keys, HMAC signature verification, and transactional state transitions ensure side effects happen at most once.",
    prerequisites: "HTTP APIs, SQL transactions, and HMAC-SHA256 hashing.",
    prerequisiteIds: ["api-data-model"],
    objectives: [
      "Verify `X-Hub-Signature-256` HMAC signatures using constant-time comparison (`crypto.timingSafeEqual`).",
      "Deduplicate retries using a unique `event_id` constraint and idempotency state (`processing`, `completed`, `failed`).",
      "Implement exponential backoff with full jitter for outbound retry simulation.",
    ],
    problemStatement:
      "Build a webhook receiver that validates HMAC-SHA256 signatures, records incoming `event_id` keys transactionally, executes a side effect (e.g., issuing a certificate record), and safely returns the cached result when duplicate deliveries arrive.",
    constraints: [
      "Never use `===` to compare cryptographic digests (prevent timing attacks).",
      "Duplicate deliveries of an already-completed `event_id` must return `200 OK` without re-running the side effect.",
    ],
    expectedOutput:
      "Webhook processor module and test suite proving that 10 concurrent deliveries of the same `event_id` produce exactly 1 database side effect.",
    hints: [
      "Use `INSERT INTO processed_webhooks (event_id, status) VALUES ($1, 'processing') ON CONFLICT (event_id) DO NOTHING` to claim the event atomically.",
    ],
    testCases: [
      {
        input: "Send identical signed webhook payload 5 times concurrently",
        expected: "All 5 return 200 OK; underlying certificate issuance executes exactly once",
        note: "Idempotent deduplication",
      },
      {
        input: "Send webhook payload with 1-byte modified body and old signature",
        expected: "Returns 401 Unauthorized before touching the database",
        note: "HMAC integrity check",
      },
    ],
    instructions: [
      "Implement `verifySignature(rawBody, secret, header)` using `crypto.createHmac` and `crypto.timingSafeEqual`.",
      "Design the `webhook_events` table with a primary key on `event_id` and response caching.",
      "Wrap event claiming and side-effect execution inside a transaction.",
      "Write tests for tampered signatures, replay storms, and transient handler failures.",
    ],
    criteria: [
      "The deliverable meets the task description.",
      "Setup and verification steps are reproducible.",
      "The work handles errors and contains no secrets.",
      "You can demonstrate the result and explain your design choices.",
    ],
    deliverable:
      "An HMAC-verified idempotent webhook processor with concurrency and replay tests.",
    solutionReference:
      "Combine constant-time HMAC verification over the raw request buffer with an atomic database upsert on `event_id`.",
    furtherChallenges: [
      "Add timestamp tolerance checking (`X-Webhook-Timestamp` within 5 minutes) to prevent replay of captured valid requests.",
    ],
    relatedIds: ["api-data-model", "cryptographic-uuid-cert-verifier", "jwt-signature-auditor"],
    resources: [
      {
        name: "GitHub Validating Webhook Deliveries",
        url: "https://docs.github.com/en/webhooks/using-webhooks/validating-webhook-deliveries",
      },
    ],
  },
  {
    id: "sql-query-optimizer",
    title: "Eliminate N+1 queries and optimize SQL execution plans",
    initiative_id: "analytics-engine",
    trackIndex: 1,
    category: "Databases & APIs",
    difficulty: "Advanced",
    skills: ["SQL", "PostgreSQL", "Performance"],
    effort: 7,
    description:
      "Use EXPLAIN ANALYZE, covering indexes, and batch joins to reduce a 101-query endpoint to 1 fast query.",
    overview:
      "The most common production performance bottleneck is the N+1 query pattern paired with missing composite indexes. Learning to read `EXPLAIN QUERY PLAN` / `EXPLAIN ANALYZE` turns database optimization from guesswork into engineering.",
    prerequisites: "SQL `JOIN`, `GROUP BY`, and relational schema basics.",
    prerequisiteIds: ["api-data-model"],
    objectives: [
      "Detect N+1 query loops using a query-counter wrapper in automated tests.",
      "Rewrite N+1 loops using `LEFT JOIN`, `WHERE id IN (...)` batching, or `GROUP BY` aggregations.",
      "Compare Sequential Scan vs Index Scan execution plans on a seeded 50,000-row dataset.",
    ],
    problemStatement:
      "Given a slow reporting module that fetches 50 projects and then runs 2 separate queries per project for task counts and contributor tags (101 queries total), refactor the data layer and add appropriate indexes so the report executes in at most 2 queries and under 15ms.",
    constraints: [
      "Automated test must assert `queryCount <= 2` regardless of whether 10 or 100 projects are returned.",
      "Output JSON structure must remain bit-for-bit identical to the baseline implementation.",
    ],
    expectedOutput:
      "Refactored repository module, SQL index definitions, `EXPLAIN` output comparison, and query-count regression test.",
    hints: [
      "Wrap your database driver's `query()` method in tests with a spy counter to assert exact query counts.",
    ],
    testCases: [
      {
        input: "Fetch dashboard summary for 50 projects with 50,000 child tasks",
        expected: "Executes <= 2 SQL queries and matches baseline JSON output",
        note: "N+1 elimination check",
      },
    ],
    instructions: [
      "Seed a local SQLite/PostgreSQL database with 50 projects and 50,000 task records.",
      "Capture baseline query count and latency for the naive loop implementation.",
      "Refactor using aggregated `JOIN` or batched `IN` queries and add foreign-key/composite indexes.",
      "Record `EXPLAIN` plans before and after indexing and lock in `queryCount <= 2` in Vitest.",
    ],
    criteria: [
      "The deliverable meets the task description.",
      "Setup and verification steps are reproducible.",
      "The work handles errors and contains no secrets.",
      "You can demonstrate the result and explain your design choices.",
    ],
    deliverable:
      "A refactored SQL analytics module with EXPLAIN plan benchmarks and query-count tests.",
    solutionReference:
      "Index all foreign keys used in `JOIN` predicates and filter columns used in `WHERE` / `ORDER BY` clauses.",
    furtherChallenges: [
      "Create a pre-aggregated daily summary table or materialized view and benchmark refresh vs read costs.",
    ],
    relatedIds: ["api-data-model", "cursor-pagination-api"],
    resources: [
      {
        name: "PostgreSQL EXPLAIN Documentation",
        url: "https://www.postgresql.org/docs/current/using-explain.html",
      },
    ],
  },

  // ==========================================
  // 4. DATA STRUCTURES, ALGORITHMS & CP
  // ==========================================
  {
    id: "cp-pattern-notes",
    title: "Explain the two-pointer pattern",
    initiative_id: "dsa-bank",
    trackIndex: 2,
    category: "Data Structures & Algorithms",
    difficulty: "Beginner",
    skills: ["Arrays", "Complexity", "Two Pointers"],
    effort: 3,
    description:
      "Solve a canonical practice problem and explain why two pointers work.",
    overview:
      "Memorizing solutions fails in contests; understanding loop invariants lets you recognize patterns across hundreds of problems. Two Pointers reduces nested O(N²) pair scans to O(N) by exploiting monotonicity.",
    prerequisites: "Arrays, sorting, and Big-O time/space notation.",
    prerequisiteIds: [],
    objectives: [
      "State the monotonic invariant that allows discarding an entire row/column of candidate pairs in O(1).",
      "Implement both opposite-direction (inward pair sum) and same-direction (fast/slow or sliding window) two-pointer algorithms.",
      "Analyze why total pointer movements are bounded by 2N even when an inner `while` loop is present.",
    ],
    problemStatement:
      "Implement `findPairWithSum(nums, target)` (returning original 1-based indices of two values summing to `target` or `null`) and `longestSubarrayAtMostK(nums, maxSum)` in O(N log N) and O(N) time respectively, accompanied by a written proof of the pointer invariant.",
    constraints: [
      "No O(N²) nested loops over all pairs.",
      "Handle duplicate elements, negative values (where applicable), and absent targets cleanly.",
    ],
    expectedOutput:
      "Tested TypeScript/C++/Python implementations + a clear Markdown pattern note with complexity proof and visual trace.",
    hints: [
      "When sorting to use inward two pointers, store `(value, originalIndex)` pairs so you can report the original indices.",
    ],
    testCases: [
      {
        input: "nums = [2, 7, 11, 15], target = 9",
        expected: "Returns indices [1, 2] (values 2 + 7 = 9)",
        note: "Standard match",
      },
      {
        input: "nums = [3, 3], target = 6",
        expected: "Returns two distinct indices [1, 2], never pairing an index with itself",
        note: "Duplicate value handling",
      },
    ],
    instructions: [
      "Solve CSES 1640 (Sum of Two Values) using sorted `(value, index)` pairs and inward pointers.",
      "Write down the formal invariant: why incrementing `L` when `a[L] + a[R] < X` never misses a valid pair.",
      "Contrast when to use a Hash Map (`O(N)` time, `O(N)` space) vs Sorted Two Pointers (`O(N log N)` time, `O(1)` auxiliary space).",
      "Add unit tests covering edge cases (`n = 1`, all duplicates, target larger than max pair).",
    ],
    criteria: [
      "The deliverable meets the task description.",
      "Setup and verification steps are reproducible.",
      "The work handles errors and contains no secrets.",
      "You can demonstrate the result and explain your design choices.",
    ],
    deliverable:
      "An original explanation, complexity analysis and a link to your accepted submission.",
    solutionReference:
      "Since `a` is sorted, if `a[L] + a[R] < target`, then for every `k < R`, `a[L] + a[k] <= a[L] + a[R] < target`, proving `L` cannot pair with any remaining index.",
    furtherChallenges: [
      "Extend to `3Sum` in O(N²) time with duplicate skipping.",
    ],
    relatedIds: ["binary-search-tests", "sliding-window-rate-counter", "monotonic-stack-skyline"],
    resources: [
      {
        name: "USACO Guide — Two Pointers",
        url: "https://usaco.guide/silver/two-pointers",
      },
      {
        name: "CSES 1640 — Sum of Two Values",
        url: "https://cses.fi/problemset/task/1640",
      },
    ],
  },
  {
    id: "binary-search-tests",
    title: "Test the binary search visualizer",
    initiative_id: "algo-visualizer",
    trackIndex: 1,
    category: "Data Structures & Algorithms",
    difficulty: "Intermediate",
    skills: ["TypeScript", "Testing", "Binary Search"],
    effort: 4,
    description:
      "Make sure members can trust what the visualization teaches.",
    overview:
      "Educational algorithm visualizers are worse than useless if they contain off-by-one bugs or mutate caller arrays. Writing thorough boundary and property tests for algorithm frame generators ensures every visual step is mathematically sound.",
    prerequisites: "Binary search mechanics and unit testing with Vitest.",
    prerequisiteIds: ["cp-pattern-notes"],
    objectives: [
      "Verify immutability: the input array passed to `binary(values, target)` must never be mutated in place.",
      "Test boundary conditions: empty array `[]`, single element `[x]`, all identical elements `[5, 5, 5]`, first/last index hits, and missing targets.",
      "Assert that total search frames never exceed `Math.floor(Math.log2(n)) + 3`.",
    ],
    problemStatement:
      "Write a comprehensive unit test suite and boundary extension for `binary(values, target)` (plus `lowerBound` and `upperBound` variants) verifying frame invariants, non-mutation, logarithmic step bounds, and duplicate handling.",
    constraints: [
      "Input array reference must remain untouched after calling any algorithm generator.",
      "Every generated frame must have `active` indices strictly within `[0, values.length - 1]`.",
    ],
    expectedOutput:
      "A Vitest test file with 15+ deterministic boundary and property assertions passing in under 200ms.",
    hints: [
      "Clone `const snapshot = [...input]` before calling `binary(input, target)` and assert `expect(input).toEqual(snapshot)`.",
    ],
    testCases: [
      {
        input: "values = [], target = 10",
        expected: "Returns final frame stating '10 is not present' with active = []",
        note: "Empty input safety",
      },
      {
        input: "values = [9, 1, 5], target = 9",
        expected: "Sorts copy to [1, 5, 9], finds 9 at sorted index 2 without mutating caller array",
        note: "Immutability + unsorted input",
      },
    ],
    instructions: [
      "Inspect `src/algorithms.ts` and `tests/catalog.test.ts` to understand the `Frame` contract.",
      "Add tests for empty arrays, 1-element arrays (hit and miss), even/odd lengths, duplicates, and extremes.",
      "Implement `lowerBound(values, target)` (first index `>= target`) and test its invariants.",
      "Run `npm test` to confirm all assertions pass.",
    ],
    criteria: [
      "The deliverable meets the task description.",
      "Setup and verification steps are reproducible.",
      "The work handles errors and contains no secrets.",
      "You can demonstrate the result and explain your design choices.",
    ],
    deliverable:
      "A pull request covering absent targets, duplicates, single values and empty arrays.",
    solutionReference:
      "In `lowerBound`, maintain `[l, r)` half-open interval: if `a[m] < target` set `l = m + 1`, else `r = m`. At termination `l` is the first index with `a[l] >= target`.",
    furtherChallenges: [
      "Implement binary search on the answer for 'Koko Eating Bananas' / 'Factory Machines (CSES 1620)'.",
    ],
    relatedIds: ["cp-pattern-notes", "benchmark-sort", "property-based-test-suite"],
    resources: [
      { name: "Vitest Documentation", url: "https://vitest.dev/" },
      {
        name: "USACO Guide — Binary Search",
        url: "https://usaco.guide/silver/binary-search",
      },
    ],
  },
  {
    id: "monotonic-stack-skyline",
    title: "Solve Next Greater Element & Largest Histogram Rectangle",
    initiative_id: "dsa-bank",
    trackIndex: 2,
    category: "Data Structures & Algorithms",
    difficulty: "Intermediate",
    skills: ["Stacks", "Arrays", "Complexity"],
    effort: 5,
    description:
      "Use a monotonic stack to find nearest smaller/greater boundaries for all array elements in O(N) time.",
    overview:
      "Whenever a problem asks for the nearest element to the left or right that is larger or smaller than `a[i]`, a monotonic stack solves it in O(N) amortized time because each index is pushed once and popped at most once.",
    prerequisites: "Stacks (LIFO) and amortized complexity analysis.",
    prerequisiteIds: ["cp-pattern-notes"],
    objectives: [
      "Maintain a strictly increasing or decreasing stack of array indices.",
      "Compute `prevSmaller[i]` and `nextSmaller[i]` for every bar in a histogram in a single pass.",
      "Prove why the nested `while` loop executes at most N pops across the entire run.",
    ],
    problemStatement:
      "Implement `nextGreaterElements(nums)` and `largestRectangleArea(heights)` using a monotonic stack in O(N) time and O(N) space.",
    constraints: [
      "Must run in O(N) time for `N = 100,000` bars (under 50ms in JS/TS).",
      "Handle non-decreasing, non-increasing, and zero-height bars accurately.",
    ],
    expectedOutput:
      "Tested O(N) implementation returning maximum rectangle area and boundary index arrays.",
    hints: [
      "Append a sentinel height `0` at the end of `heights` to flush all remaining bars from the increasing stack cleanly.",
    ],
    testCases: [
      {
        input: "heights = [2, 1, 5, 6, 2, 3]",
        expected: "Returns max area 10 (bars of height 5 and 6 spanning width 2)",
        note: "Classic histogram case",
      },
      {
        input: "heights = [4, 4, 4, 4]",
        expected: "Returns 16",
        note: "Equal heights handling",
      },
    ],
    instructions: [
      "Implement `nextGreaterElements` by storing unresolved indices on a decreasing stack.",
      "Extend the pattern to `largestRectangleArea`: when `heights[i] < heights[stack.top]`, pop `top` and compute `height * (i - newTop - 1)`.",
      "Write tests for single-element, strictly increasing, strictly decreasing, and plateau inputs.",
    ],
    criteria: [
      "The deliverable meets the task description.",
      "Setup and verification steps are reproducible.",
      "The work handles errors and contains no secrets.",
      "You can demonstrate the result and explain your design choices.",
    ],
    deliverable:
      "An O(N) monotonic stack implementation with amortized complexity proof and unit tests.",
    solutionReference:
      "Each index enters the stack once and leaves at most once, bounding total stack operations to 2N = O(N).",
    furtherChallenges: [
      "Use `largestRectangleArea` row-by-row to find the Maximal 1s Rectangle in a 2D binary matrix in O(R * C) time.",
    ],
    relatedIds: ["cp-pattern-notes", "sliding-window-rate-counter"],
    resources: [
      {
        name: "CP-Algorithms — Minimum Stack / Queue",
        url: "https://cp-algorithms.com/data_structures/stack_queue_modification.html",
      },
    ],
  },
  {
    id: "prefix-sum-2d-matrix",
    title: "Build a 2D Prefix Sum & Difference Array engine",
    initiative_id: "dsa-bank",
    trackIndex: 2,
    category: "Data Structures & Algorithms",
    difficulty: "Intermediate",
    skills: ["Arrays", "Prefix Sums", "Complexity"],
    effort: 4,
    description:
      "Answer arbitrary subgrid sum queries and apply batch rectangular updates in O(1) per operation.",
    overview:
      "1D prefix sums generalize naturally to 2D grids via the Principle of Inclusion-Exclusion. Its dual — the 2D Difference Array — allows adding a constant `delta` to any subrectangle `(r1, c1)..(r2, c2)` in O(1) time before a single O(R*C) reconstruction pass.",
    prerequisites: "2D arrays and basic algebra.",
    prerequisiteIds: ["cp-pattern-notes"],
    objectives: [
      "Construct a 1-indexed `(R+1) x (C+1)` 2D prefix sum table to eliminate boundary branches.",
      "Query any subrectangle sum in O(1) using `P[r2][c2] - P[r1-1][c2] - P[r2][c1-1] + P[r1-1][c1-1]`.",
      "Apply Q rectangular range-add updates in O(Q + R*C) using a 2D difference grid.",
    ],
    problemStatement:
      "Implement a `GridRangeEngine` class supporting `querySum(r1, c1, r2, c2)` in O(1) and a `GridDiffUpdater` supporting `addSubgrid(r1, c1, r2, c2, delta)` in O(1) with `materialize()` in O(R*C).",
    constraints: [
      "Support up to 1,000 x 1,000 grids and 100,000 queries in under 100ms.",
    ],
    expectedOutput:
      "Tested TypeScript module with inclusion-exclusion diagrams and benchmark results.",
    hints: [
      "For a 2D difference array, a subgrid update touches only 4 corners: `diff[r1][c1] += d`, `diff[r1][c2+1] -= d`, `diff[r2+1][c1] -= d`, `diff[r2+1][c2+1] += d`.",
    ],
    testCases: [
      {
        input: "3x3 grid of 1s; query (0,0) to (2,2) and (1,1) to (2,2)",
        expected: "Returns 9 and 4 respectively in O(1)",
        note: "Subgrid sum accuracy",
      },
    ],
    instructions: [
      "Implement `GridRangeEngine` with `(R+1) x (C+1)` zero-padded prefix matrix.",
      "Implement `GridDiffUpdater` using 4-corner delta markers and 2D prefix reconstruction.",
      "Validate against a brute-force O(R*C) oracle on randomized subgrid queries.",
    ],
    criteria: [
      "The deliverable meets the task description.",
      "Setup and verification steps are reproducible.",
      "The work handles errors and contains no secrets.",
      "You can demonstrate the result and explain your design choices.",
    ],
    deliverable:
      "A 2D Prefix Sum and Difference Array library verified against a randomized oracle.",
    solutionReference:
      "Zero-padding row 0 and col 0 removes all `if (r1 > 0)` conditionals from both construction and query formulas.",
    furtherChallenges: [
      "Solve CSES 1652 (Forest Queries) and LeetCode 304 (Range Sum Query 2D - Immutable).",
    ],
    relatedIds: ["cp-pattern-notes", "segment-tree-range-queries"],
    resources: [
      {
        name: "USACO Guide — More on Prefix Sums",
        url: "https://usaco.guide/silver/more-prefix-sums",
      },
    ],
  },
  {
    id: "dijkstra-route-planner",
    title: "Implement Dijkstra's Shortest Path with path reconstruction",
    initiative_id: "dsa-bank",
    trackIndex: 2,
    category: "Data Structures & Algorithms",
    difficulty: "Intermediate",
    skills: ["Graphs", "Heaps", "Algorithms"],
    effort: 6,
    description:
      "Build a binary min-heap priority queue and compute weighted shortest paths in O((V + E) log V).",
    overview:
      "JavaScript/TypeScript standard libraries lack a built-in Priority Queue. Building a binary min-heap from scratch and pairing it with lazy-deletion Dijkstra teaches heap indexing (`2i+1`, `2i+2`), relaxation invariants, and parent-pointer path reconstruction.",
    prerequisites: "Graph adjacency lists, BFS, and binary trees.",
    prerequisiteIds: ["binary-search-tests"],
    objectives: [
      "Implement a generic `MinHeap<T>` with `push` and `pop` in O(log N) time.",
      "Skip stale priority queue entries using `if (d > dist[u]) continue` to guarantee O((V + E) log V) complexity.",
      "Reconstruct the exact sequence of edges along the shortest path using a `parent` map.",
    ],
    problemStatement:
      "Implement `shortestPath(n, edges, source, target)` for a directed non-negative weighted graph. Return `{ distance, path }` or `null` if unreachable, and explicitly reject negative edge weights.",
    constraints: [
      "Must handle graphs with 100,000 vertices and 200,000 edges without stack overflow or TLE.",
      "Throw a descriptive error if any edge weight is `< 0`.",
    ],
    expectedOutput:
      "MinHeap + Dijkstra implementation returning exact shortest distances and node-by-node path arrays.",
    hints: [
      "Without the `if (d > dist[u]) continue;` guard, duplicate pushes can degrade Dijkstra to O(E²); always include that single line!",
    ],
    testCases: [
      {
        input: "Diamond graph: A->B (10), A->C (3), C->B (4), B->D (2), C->D (8)",
        expected: "Shortest A->D is distance 9 via path ['A', 'C', 'B', 'D']",
        note: "Edge relaxation override",
      },
      {
        input: "Disconnected graph where target is in another component",
        expected: "Returns null",
        note: "Unreachable target",
      },
    ],
    instructions: [
      "Build and unit-test a `MinHeap` class using a flat array representation.",
      "Build adjacency lists from `[u, v, weight]` tuples and validate `weight >= 0`.",
      "Run Dijkstra's relaxation loop recording `dist[v]` and `parent[v]`.",
      "Follow `parent` pointers backward from `target` to `source` and reverse to return the path.",
    ],
    criteria: [
      "The deliverable meets the task description.",
      "Setup and verification steps are reproducible.",
      "The work handles errors and contains no secrets.",
      "You can demonstrate the result and explain your design choices.",
    ],
    deliverable:
      "A binary min-heap and Dijkstra shortest-path module with path reconstruction and tests.",
    solutionReference:
      "Lazy deletion pushes `(newDist, v)` without mutating existing heap nodes, discarding outdated pairs on pop via `d > dist[u]`.",
    furtherChallenges: [
      "Add A* heuristic search on a 2D obstacle grid and compare expanded node counts against Dijkstra.",
    ],
    relatedIds: ["dsu-network-connectivity", "topological-task-scheduler"],
    resources: [
      {
        name: "CP-Algorithms — Dijkstra on Sparse Graphs",
        url: "https://cp-algorithms.com/graph/dijkstra_sparse.html",
      },
    ],
  },
  {
    id: "dsu-network-connectivity",
    title: "Build Disjoint Set Union (DSU) & Kruskal's MST",
    initiative_id: "dsa-bank",
    trackIndex: 2,
    category: "Data Structures & Algorithms",
    difficulty: "Intermediate",
    skills: ["Graphs", "Trees", "Algorithms"],
    effort: 5,
    description:
      "Track dynamic connected components and minimum spanning trees in near-constant O(α(N)) time.",
    overview:
      "Disjoint Set Union (Union-Find) with path compression and union by size is one of the most elegant data structures in computer science: under 25 lines of code, yet achieving inverse-Ackermann O(α(N)) time per operation.",
    prerequisites: "Arrays, trees, and sorting.",
    prerequisiteIds: ["cp-pattern-notes"],
    objectives: [
      "Implement `find(x)` with path compression and `union(a, b)` with union-by-size.",
      "Track total connected component count and largest component size dynamically.",
      "Use DSU to implement Kruskal's Minimum Spanning Tree (MST) algorithm in O(E log E).",
    ],
    problemStatement:
      "Implement a `DisjointSet` class and `kruskalMST(n, edges)` that returns the minimum total weight to connect all `n` nodes (or `null` if the graph is disconnected) along with the chosen spanning tree edges.",
    constraints: [
      "Both path compression and union by size/rank must be implemented.",
      "Correctly detect when fewer than `n - 1` edges are accepted (disconnected graph).",
    ],
    expectedOutput:
      "DSU + Kruskal module with component size queries and MST verification tests.",
    hints: [
      "`union(a, b)` should return `false` if `find(a) === find(b)` (which also detects cycles in undirected graphs!).",
    ],
    testCases: [
      {
        input: "4 nodes, edges: [0,1,10], [0,2,6], [0,3,5], [1,3,15], [2,3,4]",
        expected: "MST weight = 19 using edges [2,3,4], [0,3,5], [0,1,10]",
        note: "Cycle skipping in Kruskal",
      },
    ],
    instructions: [
      "Initialize `parent[i] = i` and `size[i] = 1` for `0..n-1`.",
      "Implement recursive or iterative path compression in `find(x)`.",
      "Merge smaller root into larger root in `union(a, b)` and decrement `components`.",
      "Sort edges by weight ascending and greedily union endpoints to build the MST.",
    ],
    criteria: [
      "The deliverable meets the task description.",
      "Setup and verification steps are reproducible.",
      "The work handles errors and contains no secrets.",
      "You can demonstrate the result and explain your design choices.",
    ],
    deliverable:
      "A Disjoint Set Union and Kruskal MST implementation with cycle-detection and connectivity tests.",
    solutionReference:
      "Combining path compression (`parent[x] = find(parent[x])`) with union by size bounds amortized time per operation to O(α(N)) <= 4 for all practical N.",
    furtherChallenges: [
      "Solve CSES 1676 (Road Construction) and CSES 1675 (Road Reparation).",
    ],
    relatedIds: ["dijkstra-route-planner", "topological-task-scheduler"],
    resources: [
      {
        name: "CP-Algorithms — Disjoint Set Union",
        url: "https://cp-algorithms.com/data_structures/disjoint_set_union.html",
      },
    ],
  },
  {
    id: "topological-task-scheduler",
    title: "Build a DAG dependency resolver & cycle detector",
    initiative_id: "dsa-bank",
    trackIndex: 2,
    category: "Data Structures & Algorithms",
    difficulty: "Intermediate",
    skills: ["Graphs", "Algorithms", "TypeScript"],
    effort: 5,
    description:
      "Order prerequisite tasks using Kahn's algorithm, compute parallel execution waves, and report exact dependency cycles.",
    overview:
      "Build systems (Turborepo, Make), package managers, and learning roadmaps all model dependencies as Directed Acyclic Graphs (DAGs). Topological sorting determines valid execution order and parallelizable stages.",
    prerequisites: "Directed graphs, queues, and BFS/DFS.",
    prerequisiteIds: ["dijkstra-route-planner"],
    objectives: [
      "Implement Kahn's in-degree BFS algorithm to produce a valid topological ordering.",
      "Group tasks into parallel execution levels (waves) where all tasks in wave `k` depend only on waves `< k`.",
      "Extract and report a concrete cycle path (`A -> B -> C -> A`) using 3-color DFS when the graph is not a DAG.",
    ],
    problemStatement:
      "Write a `resolveBuildPlan(tasks, dependencies)` engine that either returns `{ valid: true, order, parallelWaves, criticalPathLength }` or `{ valid: false, cyclePath }`.",
    constraints: [
      "Use lexicographical tie-breaking when multiple nodes have in-degree 0 so output order is 100% deterministic.",
    ],
    expectedOutput:
      "Deterministic build-order planner with parallel wave grouping and cycle-path reporting.",
    hints: [
      "In 3-color DFS (`0 = unvisited`, `1 = visiting on current recursion stack`, `2 = completed`), an edge to a node with color `1` immediately reveals a cycle.",
    ],
    testCases: [
      {
        input: "lint -> test -> build, typecheck -> build",
        expected: "Wave 1: [lint, typecheck], Wave 2: [test], Wave 3: [build]",
        note: "Parallel wave scheduling",
      },
      {
        input: "auth -> db -> config -> auth",
        expected: "valid: false, cyclePath: ['auth', 'db', 'config', 'auth']",
        note: "Cycle path extraction",
      },
    ],
    instructions: [
      "Compute in-degrees and adjacency lists for all registered task IDs.",
      "Run level-by-level Kahn's traversal to collect `parallelWaves` and `order`.",
      "If `order.length < tasks.length`, run 3-color DFS to extract the exact cycle loop.",
      "Add unit tests for diamond DAGs, disconnected components, self-loops, and multi-node cycles.",
    ],
    criteria: [
      "The deliverable meets the task description.",
      "Setup and verification steps are reproducible.",
      "The work handles errors and contains no secrets.",
      "You can demonstrate the result and explain your design choices.",
    ],
    deliverable:
      "A DAG topological scheduler with parallel wave grouping and cycle path diagnostics.",
    solutionReference:
      "Processing all current in-degree-0 nodes in batches before pushing newly unlocked in-degree-0 nodes naturally partitions the DAG into minimum parallel execution stages.",
    furtherChallenges: [
      "Add task durations and compute the weighted Critical Path Method (CPM) earliest/latest start times.",
    ],
    relatedIds: ["dijkstra-route-planner", "dsu-network-connectivity"],
    resources: [
      {
        name: "CP-Algorithms — Topological Sort",
        url: "https://cp-algorithms.com/graph/topological-sort.html",
      },
    ],
  },
  {
    id: "trie-autocomplete-engine",
    title: "Build a Prefix Trie with ranked top-K autocomplete",
    initiative_id: "knowledge-base",
    trackIndex: 2,
    category: "Data Structures & Algorithms",
    difficulty: "Intermediate",
    skills: ["Trees", "Strings", "TypeScript"],
    effort: 5,
    description:
      "Index thousands of technical terms for O(L) prefix lookup and frequency-ranked suggestions.",
    overview:
      "Scanning an array of 100,000 strings on every keystroke takes O(N * L) time. A Prefix Trie resolves prefix queries in O(L) time proportional only to the length of the typed prefix.",
    prerequisites: "Trees, maps/dictionaries, and recursion.",
    prerequisiteIds: ["problem-bank-ui"],
    objectives: [
      "Insert words with frequency weights into a Trie node hierarchy.",
      "Maintain cached top-K suggestions or traverse subtries efficiently for instant prefix completion.",
      "Support typo-tolerant Levenshtein distance-1 fallback when exact prefix matches are empty.",
    ],
    problemStatement:
      "Implement an `AutocompleteTrie` supporting `insert(term, weight)`, `complete(prefix, limit = 5)`, and `remove(term)`.",
    constraints: [
      "Prefix queries must return results sorted by descending `weight`, then alphabetically on ties.",
    ],
    expectedOutput:
      "Tested Trie module capable of indexing 50,000 terms and answering prefix queries in under 1ms.",
    hints: [
      "Normalize terms to lowercase on index traversal while storing the canonical display string on terminal nodes.",
    ],
    testCases: [
      {
        input: "Insert ('binary search', 50), ('binary tree', 40), ('binary heap', 40); query 'bin' limit 2",
        expected: "Returns ['binary search', 'binary heap'] (heap before tree alphabetically on tie)",
        note: "Ranked tie-breaking",
      },
    ],
    instructions: [
      "Define `TrieNode` with `children: Map<string, TrieNode>`, `isWord: boolean`, and `weight: number`.",
      "Implement `insert` and `searchPrefixNode(prefix)` in O(L) time.",
      "Collect candidate words from the prefix subtrie and sort/select top-K.",
      "Add unit tests for empty prefixes, missing prefixes, weight updates, and deletions.",
    ],
    criteria: [
      "The deliverable meets the task description.",
      "Setup and verification steps are reproducible.",
      "The work handles errors and contains no secrets.",
      "You can demonstrate the result and explain your design choices.",
    ],
    deliverable:
      "A weighted Prefix Trie autocomplete engine with unit tests and latency benchmark.",
    solutionReference:
      "Pre-caching the top K entries at each Trie node during `insert` reduces `complete(prefix)` query complexity to pure O(L).",
    furtherChallenges: [
      "Compress single-child chains into a Radix Tree (Compact Prefix Tree) to cut memory usage by 60%.",
    ],
    relatedIds: ["accessible-command-palette", "problem-bank-ui"],
    resources: [
      {
        name: "CP-Algorithms — Trie Fundamentals",
        url: "https://cp-algorithms.com/string/aho_corasick.html",
      },
    ],
  },
  {
    id: "knapsack-resource-allocator",
    title: "Solve 0/1 & Unbounded Dynamic Programming with item recovery",
    initiative_id: "dsa-bank",
    trackIndex: 2,
    category: "Data Structures & Algorithms",
    difficulty: "Advanced",
    skills: ["Dynamic Programming", "Algorithms", "Complexity"],
    effort: 6,
    description:
      "Optimize space from O(N*W) to O(W) while still reconstructing the exact subset of chosen items.",
    overview:
      "Dynamic programming transitions become concrete when you trace both the state table and the decision pointers. Understanding why 0/1 Knapsack iterates capacity backwards (`W` down to `w`) while Unbounded Knapsack iterates forwards (`w` up to `W`) is a core DP milestone.",
    prerequisites: "Recursion, memoization, and 1D/2D arrays.",
    prerequisiteIds: ["cp-pattern-notes"],
    objectives: [
      "Formulate state definitions, base cases, and transition equations for 0/1 Knapsack and Coin Change.",
      "Explain why backward capacity iteration prevents reusing the same item multiple times in 1D space.",
      "Reconstruct the exact chosen item indices from the DP table.",
    ],
    problemStatement:
      "Implement `solveKnapsack01(items, capacity)` returning `{ maxValue, chosenIndices }` and `minCoins(coins, amount)` returning `{ count, coinCombination }` or `null` if impossible.",
    constraints: [
      "Handle zero-weight or unreachable sums safely without infinite loops.",
    ],
    expectedOutput:
      "Tested DP solver module with state-transition documentation and decision reconstruction.",
    hints: [
      "To reconstruct items in 0/1 Knapsack, check whether `dp[i][w] !== dp[i - 1][w]`; if different, item `i - 1` was included and `w -= items[i - 1].weight`.",
    ],
    testCases: [
      {
        input: "items = [{w: 3, v: 4}, {w: 4, v: 5}, {w: 5, v: 6}], capacity = 7",
        expected: "maxValue = 9 using items 0 and 1 (weights 3 + 4 = 7)",
        note: "Optimal subset selection",
      },
      {
        input: "coins = [2, 4], amount = 7",
        expected: "Returns null (odd sum unreachable with even coins)",
        note: "Unreachable state handling",
      },
    ],
    instructions: [
      "Implement 2D 0/1 Knapsack with backtracking reconstruction of `chosenIndices`.",
      "Implement 1D space-optimized value computation and verify both return identical `maxValue`.",
      "Implement `minCoins` with parent-coin tracking to output the exact coins used.",
      "Write tests comparing DP results against an exhaustive subset search on small random inputs.",
    ],
    criteria: [
      "The deliverable meets the task description.",
      "Setup and verification steps are reproducible.",
      "The work handles errors and contains no secrets.",
      "You can demonstrate the result and explain your design choices.",
    ],
    deliverable:
      "A Dynamic Programming suite with subset reconstruction and property tests against a brute-force oracle.",
    solutionReference:
      "In 1D 0/1 Knapsack, iterating `w` from `W` down to `weight` ensures `dp[w - weight]` still holds the value from row `i - 1` rather than row `i`.",
    furtherChallenges: [
      "Implement Hirschberg's divide-and-conquer trick to reconstruct Longest Common Subsequence in O(N*M) time and O(min(N, M)) space.",
    ],
    relatedIds: ["cp-pattern-notes", "segment-tree-range-queries"],
    resources: [
      {
        name: "CSES Dynamic Programming Problem Set",
        url: "https://cses.fi/problemset/list/",
      },
      {
        name: "USACO Guide — Introduction to DP",
        url: "https://usaco.guide/gold/intro-dp",
      },
    ],
  },
  {
    id: "segment-tree-range-queries",
    title: "Build a Point-Update & Lazy-Propagation Segment Tree",
    initiative_id: "dsa-bank",
    trackIndex: 2,
    category: "Data Structures & Algorithms",
    difficulty: "Advanced",
    skills: ["Trees", "Algorithms", "Complexity"],
    effort: 8,
    description:
      "Answer dynamic range sum and range minimum queries with O(log N) updates.",
    overview:
      "Prefix sums answer static range queries in O(1) but take O(N) to update a single element. A Segment Tree balances both: O(log N) point or range updates and O(log N) range queries over any associative monoid operation (sum, min, max, GCD, XOR).",
    prerequisites: "Binary trees, recursion, and prefix sums.",
    prerequisiteIds: ["prefix-sum-2d-matrix"],
    objectives: [
      "Represent a complete binary tree compactly inside a `4N`-sized flat array.",
      "Support generic associative `combine(a, b)` operations with identity elements.",
      "Implement lazy propagation to apply range-add updates `[L, R] += delta` in O(log N).",
    ],
    problemStatement:
      "Implement a `LazySegmentTree` supporting `rangeAdd(l, r, delta)`, `rangeSum(l, r)`, and `rangeMin(l, r)` in O(log N) time per operation.",
    constraints: [
      "Verify correctness against a naive array oracle across 5,000 randomized interleaved updates and queries.",
    ],
    expectedOutput:
      "Segment tree library with lazy propagation and randomized differential test suite.",
    hints: [
      "In `pushDown(node, start, end)`, apply `lazy[node]` to left and right children before recursing into partial overlaps.",
    ],
    testCases: [
      {
        input: "Array [1, 2, 3, 4, 5]; rangeAdd(1, 3, +10); rangeSum(0, 4) and rangeMin(1, 3)",
        expected: "rangeSum = 45, rangeMin = 12",
        note: "Lazy range update + query",
      },
    ],
    instructions: [
      "Implement `build(node, l, r)` populating `tree` from the initial array in O(N).",
      "Implement `push(node, l, r)` to propagate pending lazy deltas to children.",
      "Implement `rangeAdd` and `rangeQuery` in O(log N).",
      "Write a differential fuzz test comparing `LazySegmentTree` against a simple loop array.",
    ],
    criteria: [
      "The deliverable meets the task description.",
      "Setup and verification steps are reproducible.",
      "The work handles errors and contains no secrets.",
      "You can demonstrate the result and explain your design choices.",
    ],
    deliverable:
      "A Lazy Segment Tree implementation verified by randomized differential testing.",
    solutionReference:
      "A Segment Tree splits any interval `[L, R]` into at most `2 * log2(N)` canonical tree nodes, bounding both queries and lazy updates to O(log N).",
    furtherChallenges: [
      "Implement a Fenwick Tree (Binary Indexed Tree) in 15 lines of code and benchmark its constant factor against the Segment Tree.",
    ],
    relatedIds: ["prefix-sum-2d-matrix", "knapsack-resource-allocator"],
    resources: [
      {
        name: "CP-Algorithms — Segment Tree",
        url: "https://cp-algorithms.com/data_structures/segment_tree.html",
      },
    ],
  },

  // ==========================================
  // 5. SYSTEMS PROGRAMMING, OS & NETWORKING
  // ==========================================
  {
    id: "benchmark-sort",
    title: "Compare sorting performance",
    initiative_id: "engineering-labs",
    trackIndex: 3,
    category: "Systems & Networking",
    difficulty: "Advanced",
    skills: ["Algorithms", "Testing", "Benchmarking"],
    effort: 10,
    description:
      "Measure sorting behavior on sorted, reversed and random inputs.",
    overview:
      "Asymptotic Big-O notation hides cache locality, branch prediction, allocation overhead, and input distribution sensitivity. Designing a reproducible benchmark teaches warm-up phases, high-resolution timers (`performance.now()`), and statistical reporting.",
    prerequisites: "Sorting algorithms, complexity analysis, and TypeScript/Node.js.",
    prerequisiteIds: ["binary-search-tests"],
    objectives: [
      "Compare Bubble Sort, Insertion Sort, Merge Sort, Quick Sort, and native `Array.prototype.sort` across 4 distributions (Random, Sorted, Reversed, Many Duplicates).",
      "Count exact comparisons and swaps/writes alongside wall-clock median and p95 execution times.",
      "Avoid JIT cold-start distortion by running warm-up iterations and cloning inputs before each trial.",
    ],
    problemStatement:
      "Build a reproducible sorting benchmark harness that tests multiple sorting algorithms across sizes `N = 100, 1,000, 5,000, 10,000` on sorted, reversed, random, and duplicate-heavy arrays, outputting a Markdown report of operation counts and latencies.",
    constraints: [
      "Each trial must sort a fresh clone so subsequent trials do not sort an already-sorted array!",
      "Verify that every algorithm's output matches a trusted reference sort before recording its timing.",
    ],
    expectedOutput:
      "Benchmark runner CLI, automated correctness test suite, and a Markdown report comparing theoretical vs empirical scaling.",
    hints: [
      "Naive Quick Sort picking the last element as pivot degrades to O(N²) on already-sorted or reversed arrays; compare it against median-of-three pivot selection!",
    ],
    testCases: [
      {
        input: "Insertion Sort vs Bubble Sort on an already-sorted array of N = 5,000",
        expected: "Both complete in N - 1 comparisons and 0 swaps (O(N) best case)",
        note: "Adaptive best-case verification",
      },
    ],
    instructions: [
      "Implement deterministic input generators (seeded PRNG for random, ascending, descending, 90% duplicates).",
      "Instrument sorting functions to return `{ sorted, comparisons, writes, elapsedMs }`.",
      "Run 15 trials per `(algorithm, distribution, N)` after 3 warm-up runs and compute median/p95.",
      "Document findings, JIT caveats, and crossover points where Insertion Sort beats Merge Sort on tiny arrays.",
    ],
    criteria: [
      "The deliverable meets the task description.",
      "Setup and verification steps are reproducible.",
      "The work handles errors and contains no secrets.",
      "You can demonstrate the result and explain your design choices.",
    ],
    deliverable:
      "A reproducible benchmark repository with methodology, results and limitations.",
    solutionReference:
      "Always separate array generation from the timed region and report median + IQR/p95 across multiple runs to filter out OS scheduling and GC pauses.",
    furtherChallenges: [
      "Implement a hybrid Timsort-style algorithm that switches to Insertion Sort for subarrays of size `<= 16`.",
    ],
    relatedIds: ["binary-search-tests", "lru-cache-ttl-eviction"],
    resources: [
      {
        name: "VisuAlgo Sorting Visualizations",
        url: "https://visualgo.net/en/sorting",
      },
      {
        name: "Node.js Performance Measurement APIs",
        url: "https://nodejs.org/api/perf_hooks.html",
      },
    ],
  },
  {
    id: "websocket-lab",
    title: "Build a live announcement experiment",
    initiative_id: "engineering-labs",
    trackIndex: 3,
    category: "Systems & Networking",
    difficulty: "Advanced",
    skills: ["WebSockets", "JavaScript", "Networking"],
    effort: 12,
    description:
      "Explore reconnect behavior in an isolated prototype.",
    overview:
      "Real-time connections drop constantly over Wi-Fi and mobile networks. A production-grade WebSocket client and server must handle heartbeats (ping/pong), exponential backoff with jitter on disconnect, and missed-message catchup via sequence IDs.",
    prerequisites: "Asynchronous JavaScript, event listeners, and basic networking.",
    prerequisiteIds: ["developer-profile", "token-bucket-rate-limiter"],
    objectives: [
      "Build a WebSocket broadcast server tracking connected clients and monotonic message `seq` numbers.",
      "Implement client reconnection with exponential backoff + jitter (`min(maxDelay, base * 2^attempt) * random`).",
      "Replay missed announcements since `lastSeenSeq` upon reconnection so no updates are lost.",
    ],
    problemStatement:
      "Build an isolated WebSocket server and client state machine that broadcasts structured announcements, detects half-open connections via heartbeat pings, and automatically recovers missed messages after simulated network drops.",
    constraints: [
      "Client must buffer or catch up via `resumeFromSeq` on reconnect without duplicating already-rendered messages.",
      "Include automated tests that forcibly drop the connection mid-stream and assert zero missed announcements.",
    ],
    expectedOutput:
      "Working WebSocket server/client prototype, reconnect state-machine tests, and architecture documentation.",
    hints: [
      "Maintain a bounded ring buffer of the last 100 messages on the server so reconnecting clients sending `{ type: 'HELLO', lastSeq: 42 }` immediately receive messages `43..current`.",
    ],
    testCases: [
      {
        input: "Client receives seq 1..3, disconnects while server publishes seq 4..5, then reconnects",
        expected: "Client requests catchup from seq 3 and renders 1, 2, 3, 4, 5 in exact order",
        note: "Gapless reconnect catchup",
      },
    ],
    instructions: [
      "Define the wire protocol JSON messages (`HELLO`, `ANNOUNCEMENT`, `PING`, `PONG`, `ERROR`).",
      "Implement the server with a bounded replay ring buffer and broadcast fan-out.",
      "Implement the resilient client state machine (`CONNECTING`, `OPEN`, `BACKOFF`, `CLOSED`) with injectable timers.",
      "Write automated reconnect and catchup tests.",
    ],
    criteria: [
      "The deliverable meets the task description.",
      "Setup and verification steps are reproducible.",
      "The work handles errors and contains no secrets.",
      "You can demonstrate the result and explain your design choices.",
    ],
    deliverable:
      "A working lab with reconnect tests and a documented architecture.",
    solutionReference:
      "Adding full jitter (`Math.random() * Math.min(30000, 500 * 2 ** attempt)`) prevents thundering-herd reconnection storms when a server restarts.",
    furtherChallenges: [
      "Add channel topic subscriptions and per-client slow-consumer backpressure handling (`ws.bufferedAmount`).",
    ],
    relatedIds: ["http11-socket-parser", "tcp-backpressure-proxy"],
    resources: [
      {
        name: "MDN WebSocket API Guide",
        url: "https://developer.mozilla.org/en-US/docs/Web/API/WebSocket",
      },
      {
        name: "RFC 6455 — The WebSocket Protocol",
        url: "https://datatracker.ietf.org/doc/html/rfc6455",
      },
    ],
  },
  {
    id: "http11-socket-parser",
    title: "Build an HTTP/1.1 server over raw TCP sockets",
    initiative_id: "build-scratch",
    trackIndex: 3,
    category: "Systems & Networking",
    difficulty: "Intermediate",
    skills: ["Networking", "Node.js", "Protocols"],
    effort: 8,
    description:
      "Parse raw TCP byte streams into HTTP/1.1 requests, headers, and bodies without using node:http.",
    overview:
      "Underneath Express, Next.js, and Fastify, HTTP/1.1 is just ASCII text framed by `\\r\\n\\r\\n` and `Content-Length` over a TCP stream. Building an HTTP parser over `node:net` demystifies packet fragmentation, keep-alive connections, and header framing.",
    prerequisites: "Buffers, strings, and basic TCP socket concepts.",
    prerequisiteIds: ["cli-task-manager"],
    objectives: [
      "Handle arbitrary TCP chunk boundaries where a single HTTP request arrives across multiple `data` events.",
      "Parse request lines (`METHOD /path HTTP/1.1`), case-insensitive headers, and `Content-Length` bodies.",
      "Serialize valid HTTP/1.1 responses with status lines, headers, and `Connection: keep-alive` support.",
    ],
    problemStatement:
      "Using only `node:net` (not `node:http`), implement an incremental HTTP/1.1 request parser and router that handles `GET /health`, `ECHO /echo` (with body), and `400`/`404` responses, even when TCP segments arrive 5 bytes at a time.",
    constraints: [
      "Do not import `node:http` or `node:https`.",
      "Reject headers exceeding 8 KB with `431 Request Header Fields Too Large` to prevent memory exhaustion.",
    ],
    expectedOutput:
      "Raw TCP HTTP/1.1 server and parser state machine passing fragmented-chunk and keep-alive pipelining tests.",
    hints: [
      "Accumulate incoming `Buffer` chunks until `buffer.indexOf('\\r\\n\\r\\n') !== -1`, then read `Content-Length` bytes before emitting the complete request.",
    ],
    testCases: [
      {
        input: "Stream 'POST /echo HTTP/1.1\\r\\nContent-Length: 5\\r\\n\\r\\nhello' in 3-byte chunks",
        expected: "Parser waits for all chunks and emits complete request with body 'hello'",
        note: "TCP fragmentation resilience",
      },
    ],
    instructions: [
      "Write a pure state-machine class `Http11Parser` consuming `Buffer` chunks.",
      "Parse the request line and normalize header keys to lowercase.",
      "Read exact `Content-Length` body bytes and support multiple pipelined requests on one socket.",
      "Wire the parser to `net.createServer` and test with fragmented socket writes.",
    ],
    criteria: [
      "The deliverable meets the task description.",
      "Setup and verification steps are reproducible.",
      "The work handles errors and contains no secrets.",
      "You can demonstrate the result and explain your design choices.",
    ],
    deliverable:
      "A raw TCP HTTP/1.1 server and incremental parser with fragmented-stream unit tests.",
    solutionReference:
      "TCP is a byte stream, not a message stream: a single `socket.on('data')` callback may contain half a header or two concatenated requests.",
    furtherChallenges: [
      "Add support for `Transfer-Encoding: chunked` request and response bodies.",
    ],
    relatedIds: ["websocket-lab", "dns-packet-decoder", "tcp-backpressure-proxy"],
    resources: [
      {
        name: "RFC 9112 — HTTP/1.1 Specification",
        url: "https://datatracker.ietf.org/doc/html/rfc9112",
      },
      {
        name: "Node.js net (TCP Sockets) Docs",
        url: "https://nodejs.org/api/net.html",
      },
    ],
  },
  {
    id: "lru-cache-ttl-eviction",
    title: "Implement an O(1) LRU Cache with TTL expiration",
    initiative_id: "build-scratch",
    trackIndex: 3,
    category: "Systems & Networking",
    difficulty: "Intermediate",
    skills: ["Data Structures", "Systems", "TypeScript"],
    effort: 6,
    description:
      "Combine a hash map and doubly linked list for O(1) get, put, and least-recently-used eviction.",
    overview:
      "Caches in operating systems, databases, and Redis must bound memory while keeping hot keys fast. Combining a Hash Map with an intrusive Doubly Linked List achieves strict O(1) lookup, insertion, promotion, and eviction.",
    prerequisites: "Pointers/references, maps, and complexity analysis.",
    prerequisiteIds: ["token-bucket-rate-limiter"],
    objectives: [
      "Build a Doubly Linked List with dummy `head` and `tail` sentinels to eliminate null-pointer edge cases.",
      "Achieve O(1) `get(key)`, `set(key, value, ttlMs)`, and `delete(key)`.",
      "Track cache telemetry (`hits`, `misses`, `evictions`, `expired`, `hitRate`).",
    ],
    problemStatement:
      "Implement a generic `LRUCache<K, V>` class using an explicit Doubly Linked List + `Map` (not relying on JS Map insertion order) with per-entry TTL support and hit/miss telemetry.",
    constraints: [
      "All operations (`get`, `set`, `delete`, eviction) must run in O(1) time.",
      "Expired keys accessed via `get()` must be unlinked immediately and counted as a cache miss.",
    ],
    expectedOutput:
      "Tested O(1) LRU + TTL cache implementation with sentinel-node diagram and hit-rate benchmark.",
    hints: [
      "Initialize `this.head.next = this.tail` and `this.tail.prev = this.head` so `removeNode(node)` and `insertAfterHead(node)` never branch on `null`.",
    ],
    testCases: [
      {
        input: "Capacity 2: set(A,1), set(B,2), get(A), set(C,3)",
        expected: "Evicts B (least recently used); A and C remain present",
        note: "Read-promotion invariant",
      },
      {
        input: "set(A, 1, ttl=500ms); advance clock by 501ms; get(A)",
        expected: "Returns undefined, increments expired & misses counters, removes A",
        note: "Lazy TTL expiration",
      },
    ],
    instructions: [
      "Define the `CacheNode<K, V>` class (`key`, `value`, `expiresAt`, `prev`, `next`).",
      "Implement `unlink(node)` and `moveToFront(node)` in 4 pointer assignments each.",
      "Implement `get` and `set` with capacity eviction from `tail.prev` and lazy TTL checks.",
      "Write comprehensive unit tests covering capacity=1, overwrites, TTL expiry, and telemetry.",
    ],
    criteria: [
      "The deliverable meets the task description.",
      "Setup and verification steps are reproducible.",
      "The work handles errors and contains no secrets.",
      "You can demonstrate the result and explain your design choices.",
    ],
    deliverable:
      "An O(1) Doubly-Linked-List LRU Cache with TTL expiration and telemetry tests.",
    solutionReference:
      "Sentinel head and tail nodes reduce doubly-linked-list splice logic to `node.prev.next = node.next; node.next.prev = node.prev;` with zero boundary branches.",
    furtherChallenges: [
      "Implement Segmented LRU (SLRU) or TinyLFU admission filter to resist one-hit-wonder scan pollution.",
    ],
    relatedIds: ["token-bucket-rate-limiter", "wal-append-storage-engine"],
    resources: [
      {
        name: "CMU 15-445 Database Buffer Pool Notes",
        url: "https://15445.courses.cs.cmu.edu",
      },
    ],
  },
  {
    id: "content-addressed-blob-store",
    title: "Build a Git-style content-addressed object store",
    initiative_id: "build-scratch",
    trackIndex: 3,
    category: "Systems & Networking",
    difficulty: "Advanced",
    skills: ["Cryptography", "Systems", "Git", "Node.js"],
    effort: 9,
    description:
      "Implement Git's internal storage engine: SHA-256 blob hashing, tree directories, and Merkle DAG commits.",
    overview:
      "Git is fundamentally a content-addressed Merkle DAG filesystem. When you understand how `blob`, `tree`, and `commit` objects are hashed, compressed, and linked by digest, Git commands (`checkout`, `reset`, `merge-base`) stop feeling like magic.",
    prerequisites: "File I/O, cryptographic hashing (`node:crypto`), and trees/DAGs.",
    prerequisiteIds: ["cli-task-manager", "first-contribution"],
    objectives: [
      "Compute canonical object digests (`<type> <byteLength>\\0<payload>`) and store zlib-compressed objects under `.mygit/objects/aa/bb...`.",
      "Construct `tree` objects representing nested directory snapshots and deduplicate identical files automatically.",
      "Chain `commit` objects with parent hashes and implement `log` and `diff` between any two commit hashes.",
    ],
    problemStatement:
      "Build a content-addressed version control engine supporting `init`, `hash-object`, `cat-file`, `write-tree`, `commit-tree`, `log`, and `checkout <commitHash>`.",
    constraints: [
      "Two identical files in different directories must map to the exact same single blob object on disk.",
      "Tampering with 1 byte of a stored blob must be detected on read via hash verification.",
    ],
    expectedOutput:
      "A working mini-Git CLI and library capable of snapshotting a directory tree, committing revisions, verifying Merkle integrity, and restoring past snapshots.",
    hints: [
      "Format the header as `Buffer.from(`${type} ${contentBuffer.length}\\0`)` and concatenate with `contentBuffer` before hashing and compressing with `zlib.deflateSync`.",
    ],
    testCases: [
      {
        input: "Commit directory with 2 identical files at a/hello.txt and b/copy.txt",
        expected: "Creates two tree entries pointing to the exact same blob hash",
        note: "Content-addressed deduplication",
      },
      {
        input: "Corrupt a byte inside .mygit/objects/<prefix>/<hash> and run cat-file",
        expected: "Throws integrity mismatch error",
        note: "Merkle tamper detection",
      },
    ],
    instructions: [
      "Implement `hashObject(type, buffer)` returning the hex digest and writing the zlib-compressed payload.",
      "Implement `readObject(hash)` decompressing and verifying the recomputed digest.",
      "Implement recursive `writeTree(dirPath)` and `commitTree(treeHash, parentHash, message)`.",
      "Add tests for snapshot round-trips, history walking, and tamper detection.",
    ],
    criteria: [
      "The deliverable meets the task description.",
      "Setup and verification steps are reproducible.",
      "The work handles errors and contains no secrets.",
      "You can demonstrate the result and explain your design choices.",
    ],
    deliverable:
      "A Git-compatible content-addressed object store supporting blobs, trees, commits, and integrity verification.",
    solutionReference:
      "Because every `tree` hash covers its children's hashes and every `commit` hash covers its `tree` and `parent` hashes, a single root commit hash cryptographically authenticates the entire repository history.",
    furtherChallenges: [
      "Implement `mergeBase(commitA, commitB)` (Lowest Common Ancestor on the commit DAG) and 3-way tree diffing.",
    ],
    relatedIds: ["first-contribution", "wal-append-storage-engine"],
    resources: [
      { name: "Write Yourself a Git", url: "https://wyag.thb.lt" },
      {
        name: "Pro Git — Ch 10 Git Internals",
        url: "https://git-scm.com/book/en/v2/Git-Internals-Plumbing-and-Porcelain",
      },
    ],
  },
  {
    id: "bytecode-stack-vm",
    title: "Build a Lexer, Pratt Parser & Bytecode Stack VM",
    initiative_id: "build-scratch",
    trackIndex: 3,
    category: "Systems & Networking",
    difficulty: "Advanced",
    skills: ["Compilers", "TypeScript", "Algorithms"],
    effort: 12,
    description:
      "Compile arithmetic, variables, conditionals, and loops into bytecode instructions and execute them on a virtual machine.",
    overview:
      "Language runtimes (V8, JVM, CPython, WebAssembly) translate source text into an Abstract Syntax Tree (AST), emit compact bytecode instructions, and execute them in a stack or register virtual machine.",
    prerequisites: "Recursion, trees, stacks, and state machines.",
    prerequisiteIds: ["monotonic-stack-skyline"],
    objectives: [
      "Tokenize source code with line/column spans and parse operator precedence accurately (`1 + 2 * 3 === 7`).",
      "Compile AST nodes into linear bytecode opcodes (`PUSH_CONST`, `LOAD_VAR`, `STORE_VAR`, `ADD`, `SUB`, `MUL`, `CMP_LT`, `JMP_IF_FALSE`, `JMP`, `HALT`).",
      "Execute bytecode deterministically in a fetch-decode-execute loop with a bounded instruction fuel limit.",
    ],
    problemStatement:
      "Build a toy language compiler and stack VM supporting `let` bindings, arithmetic/comparison operators, `if/else` blocks, `while` loops, and `print` statements, along with a bytecode disassembler.",
    constraints: [
      "Do not use `eval()` or `new Function()`.",
      "Enforce a configurable `maxSteps` fuel counter so infinite `while (true)` loops abort cleanly.",
    ],
    expectedOutput:
      "Lexer, Parser, Bytecode Compiler, Disassembler, and Stack VM capable of running iterative Fibonacci and factorial programs.",
    hints: [
      "When compiling `if (cond) { thenBranch }`, emit `JMP_IF_FALSE placeholder` first, compile `thenBranch`, and then backpatch `placeholder` with the current bytecode offset.",
    ],
    testCases: [
      {
        input: "let n = 5; let acc = 1; while (n > 1) { acc = acc * n; n = n - 1; } print acc;",
        expected: "Compiles to bytecode and outputs [120]",
        note: "Loop and variable mutation",
      },
      {
        input: "while (1 < 2) { } with maxSteps = 1000",
        expected: "Throws 'Execution step limit exceeded' instead of hanging",
        note: "Halting fuel safety",
      },
    ],
    instructions: [
      "Implement the `tokenize(source)` lexer producing typed tokens with source locations.",
      "Implement a recursive descent / Pratt parser building the AST.",
      "Write the bytecode emitter with jump backpatching for `if` and `while`.",
      "Implement the stack VM loop and test arithmetic precedence, conditionals, loops, and disassembly.",
    ],
    criteria: [
      "The deliverable meets the task description.",
      "Setup and verification steps are reproducible.",
      "The work handles errors and contains no secrets.",
      "You can demonstrate the result and explain your design choices.",
    ],
    deliverable:
      "A complete Lexer, Parser, Bytecode Compiler, Disassembler, and Stack VM with test suite.",
    solutionReference:
      "Backpatching records the index of an emitted jump operand (`const patchIdx = code.length - 1`) and overwrites `code[patchIdx] = code.length` once the target block has been emitted.",
    furtherChallenges: [
      "Add first-class functions with call frames (`CALL`, `RET`, frame pointer `fp`) to support recursive functions.",
    ],
    relatedIds: ["markdown-linter-cli", "wal-append-storage-engine"],
    resources: [
      {
        name: "Crafting Interpreters (Robert Nystrom)",
        url: "https://craftinginterpreters.com",
      },
    ],
  },
  {
    id: "wal-append-storage-engine",
    title: "Build a Bitcask-style Write-Ahead Log (WAL) key-value store",
    initiative_id: "build-scratch",
    trackIndex: 3,
    category: "Systems & Networking",
    difficulty: "Advanced",
    skills: ["Systems", "Databases", "Node.js"],
    effort: 10,
    description:
      "Implement an append-only binary log storage engine with CRC32 checksums, in-memory keydir index, and log compaction.",
    overview:
      "How do databases survive power loss and achieve fast writes? By appending immutable records `[CRC32 | timestamp | keyLen | valLen | key | val]` sequentially to a Write-Ahead Log while maintaining an in-memory map `key -> { fileOffset, byteLength }`.",
    prerequisites: "Binary buffers (`Buffer.alloc`, `readUInt32BE`), file descriptors, and hash maps.",
    prerequisiteIds: ["lru-cache-ttl-eviction", "content-addressed-blob-store"],
    objectives: [
      "Serialize and deserialize binary log frames with CRC32 checksum verification.",
      "Rebuild the in-memory `keydir` offset index on startup by scanning the WAL file and truncating torn trailing writes.",
      "Implement background compaction that discards superseded keys and tombstone deletions.",
    ],
    problemStatement:
      "Build a persistent key-value storage engine (`put`, `get`, `del`, `compact`, `recover`) backed by an append-only binary file. Point reads (`get`) must perform a single `fs.readSync` at the indexed byte offset in O(1) disk seeks.",
    constraints: [
      "Values must NOT be kept in RAM; RAM stores only `key -> { offset, size, timestamp }`.",
      "A simulated crash (truncated final record at EOF) must be detected via CRC mismatch and safely recovered.",
    ],
    expectedOutput:
      "Binary WAL key-value store passing crash-recovery, torn-write truncation, and compaction space-reclamation tests.",
    hints: [
      "Represent `del(key)` by appending a special tombstone flag in the binary header and removing `key` from the in-memory `keydir`.",
    ],
    testCases: [
      {
        input: "Overwrite key 'user:1' 100 times, then run compact()",
        expected: "Compacted WAL file shrinks by >95% while get('user:1') still returns the 100th value",
        note: "Compaction reclamation",
      },
      {
        input: "Append half of a corrupted frame to the end of the WAL and reopen the store",
        expected: "Recovery detects invalid CRC/EOF, truncates the torn frame, and preserves all prior committed keys",
        note: "Crash recovery safety",
      },
    ],
    instructions: [
      "Design the fixed 13-byte binary record header (`crc32: u32`, `flags: u8`, `keyLen: u32`, `valLen: u32`).",
      "Implement `put(key, val)`, `get(key)` (positional read), and `del(key)` (tombstone append).",
      "Implement startup recovery scanning frames sequentially and verifying checksums.",
      "Implement `compact()` writing live keys to a new segment file and swapping atomically.",
    ],
    criteria: [
      "The deliverable meets the task description.",
      "Setup and verification steps are reproducible.",
      "The work handles errors and contains no secrets.",
      "You can demonstrate the result and explain your design choices.",
    ],
    deliverable:
      "A Bitcask-style binary WAL storage engine with CRC checksums, crash recovery, and compaction tests.",
    solutionReference:
      "Sequential appends turn random updates into sequential disk I/O, while the in-memory `keydir` guarantees every `get(key)` requires at most 1 positional disk read.",
    furtherChallenges: [
      "Sort the in-memory table into immutable SSTables with a sparse index and Bloom filter (LSM-Tree architecture).",
    ],
    relatedIds: ["lru-cache-ttl-eviction", "content-addressed-blob-store"],
    resources: [
      {
        name: "CMU 15-445 Storage Engines & WAL",
        url: "https://15445.courses.cs.cmu.edu",
      },
    ],
  },

  // ==========================================
  // 6. AI & MACHINE LEARNING ENGINEERING
  // ==========================================
  {
    id: "vector-cosine-retriever",
    title: "Build a Hybrid BM25 + Vector Semantic Search Engine",
    initiative_id: "engineering-labs",
    trackIndex: 3,
    category: "AI & Machine Learning",
    difficulty: "Intermediate",
    skills: ["AI/ML", "Information Retrieval", "TypeScript"],
    effort: 7,
    description:
      "Combine lexical BM25 keyword scoring with dense cosine-similarity vector search using Reciprocal Rank Fusion.",
    overview:
      "Pure vector search struggles with exact identifier matches (like error codes or function names), while pure keyword search misses conceptual synonyms. Production RAG systems combine BM25 lexical search with dense vector similarity via Reciprocal Rank Fusion (RRF).",
    prerequisites: "Vectors/dot products, term frequencies, and TypeScript.",
    prerequisiteIds: ["problem-bank-ui"],
    objectives: [
      "Implement L2 vector normalization and cosine similarity `dot(A, B) / (||A|| * ||B||)`.",
      "Implement Okapi BM25 scoring (`k1 = 1.5`, `b = 0.75`) with inverse document frequency (IDF) and document-length normalization.",
      "Fuse lexical and semantic rankings using Reciprocal Rank Fusion: `score(d) = 1 / (k + rank_bm25) + 1 / (k + rank_vec)`.",
    ],
    problemStatement:
      "Build a hybrid retrieval engine over markdown technical notes that chunks documents with configurable overlap, indexes both BM25 inverted lists and embedding vectors, and evaluates Recall@K on a benchmark query set.",
    constraints: [
      "Must handle zero-norm vectors and out-of-vocabulary query tokens without producing `NaN`.",
    ],
    expectedOutput:
      "Hybrid BM25 + Vector search module with chunker, RRF ranker, and Recall@K comparison benchmark.",
    hints: [
      "Pre-normalize embedding vectors to unit length (`||v|| = 1`) at index time so cosine similarity reduces to a simple dot product!",
    ],
    testCases: [
      {
        input: "Query exact error code 'ERR_SOCKET_CLOSED' vs conceptual query 'handling dropped network connections'",
        expected: "Hybrid RRF ranks the relevant document #1 on both queries, outperforming either retriever alone",
        note: "Hybrid RRF synergy",
      },
    ],
    instructions: [
      "Implement a markdown section/window chunker preserving heading breadcrumbs.",
      "Implement the BM25 inverted index and scorer.",
      "Implement unit-norm cosine vector search and Reciprocal Rank Fusion (`k = 60`).",
      "Evaluate MRR (Mean Reciprocal Rank) and Recall@3 across 15 test queries.",
    ],
    criteria: [
      "The deliverable meets the task description.",
      "Setup and verification steps are reproducible.",
      "The work handles errors and contains no secrets.",
      "You can demonstrate the result and explain your design choices.",
    ],
    deliverable:
      "A hybrid BM25 + Vector semantic retrieval engine with RRF fusion and Recall@K evaluation suite.",
    solutionReference:
      "Reciprocal Rank Fusion (`1 / (60 + rank)`) combines heterogeneous retrievers without requiring fragile score calibration between unbounded BM25 scores and `[-1, 1]` cosine similarities.",
    furtherChallenges: [
      "Implement Maximal Marginal Relevance (MMR) reranking to penalize redundant near-duplicate chunks in the top-K context window.",
    ],
    relatedIds: ["bpe-tokenizer-from-scratch", "trie-autocomplete-engine"],
    resources: [
      {
        name: "pgvector PostgreSQL Vector Search Docs",
        url: "https://github.com/pgvector/pgvector",
      },
    ],
  },
  {
    id: "bpe-tokenizer-from-scratch",
    title: "Implement a Byte-Pair Encoding (BPE) Tokenizer from scratch",
    initiative_id: "engineering-labs",
    trackIndex: 3,
    category: "AI & Machine Learning",
    difficulty: "Advanced",
    skills: ["AI/ML", "Strings", "Algorithms", "TypeScript"],
    effort: 8,
    description:
      "Train a subword vocabulary on raw text and implement lossless encode/decode just like GPT tokenizers.",
    overview:
      "Large Language Models do not read raw characters or whole words — they operate on subword tokens produced by Byte-Pair Encoding (BPE). Implementing BPE from UTF-8 bytes up to merged token IDs explains why LLMs struggle with character counting and how compression ratios affect context windows.",
    prerequisites: "UTF-8 byte arrays (`TextEncoder` / `TextDecoder`), hash maps, and greedy algorithms.",
    prerequisiteIds: ["cp-pattern-notes"],
    objectives: [
      "Start from a base vocabulary of 256 raw UTF-8 byte values (`0..255`).",
      "Iteratively count adjacent token pairs and merge the most frequent pair `(a, b) -> newTokenId` until reaching `vocabSize`.",
      "Guarantee lossless round-trip `decode(encode(text)) === text` for any arbitrary Unicode string (including emojis and code).",
    ],
    problemStatement:
      "Implement a `BPETokenizer` class with `train(corpus, vocabSize)`, `encode(text): number[]`, `decode(tokens): string`, and `compressionRatio(text)`.",
    constraints: [
      "`decode(encode(s))` must equal `s` for all valid UTF-8 strings, including unseen characters and multi-byte emojis.",
      "Encoding must apply learned merge rules in the exact priority order they were learned during training.",
    ],
    expectedOutput:
      "Trained BPE tokenizer module, token-boundary visualizer helper, and round-trip property tests.",
    hints: [
      "During `encode(text)`, repeatedly merge the adjacent pair in the sequence that has the lowest merge rank index in your learned `merges` table.",
    ],
    testCases: [
      {
        input: "Train on code corpus with vocabSize = 320; encode & decode 'function binarySearch(arr) 🚀'",
        expected: "Lossless round-trip decode === input and token count < UTF-8 byte length",
        note: "UTF-8 lossless subword round-trip",
      },
    ],
    instructions: [
      "Convert input strings to UTF-8 byte arrays via `new TextEncoder().encode(text)`.",
      "Implement pair-frequency counting and greedy pair replacement for `numMerges = vocabSize - 256`.",
      "Implement `encode(text)` respecting merge priority order and `decode(ids)` concatenating byte expansions.",
      "Test compression ratios and Unicode round-trip invariants.",
    ],
    criteria: [
      "The deliverable meets the task description.",
      "Setup and verification steps are reproducible.",
      "The work handles errors and contains no secrets.",
      "You can demonstrate the result and explain your design choices.",
    ],
    deliverable:
      "A byte-level BPE tokenizer with training, encoding, decoding, and Unicode round-trip tests.",
    solutionReference:
      "Operating on raw UTF-8 bytes (0..255) as the base alphabet guarantees zero `<UNK>` out-of-vocabulary tokens on any Unicode text.",
    furtherChallenges: [
      "Add GPT-4 style regex pre-tokenization splits so merges never cross word-punctuation boundaries.",
    ],
    relatedIds: ["vector-cosine-retriever", "mini-autograd-engine"],
    resources: [
      {
        name: "OpenAI tiktoken BPE Repository",
        url: "https://github.com/openai/tiktoken",
      },
    ],
  },
  {
    id: "mini-autograd-engine",
    title: "Build a Micrograd scalar reverse-mode Autograd engine",
    initiative_id: "engineering-labs",
    trackIndex: 3,
    category: "AI & Machine Learning",
    difficulty: "Advanced",
    skills: ["AI/ML", "Calculus", "Graphs", "TypeScript"],
    effort: 9,
    description:
      "Implement backpropagation from first principles over a dynamic computation DAG and train a multi-layer perceptron.",
    overview:
      "PyTorch and JAX are built on reverse-mode automatic differentiation. By wrapping scalar numbers in a `Value` node that records its parent operands and local partial derivatives, you can topologically sort the expression DAG and apply the chain rule automatically.",
    prerequisites: "Chain rule derivatives, directed acyclic graphs (topological sort), and TypeScript classes.",
    prerequisiteIds: ["topological-task-scheduler"],
    objectives: [
      "Build a `Value` computation graph node supporting `add`, `mul`, `pow`, `tanh`, and `relu` with backward closures.",
      "Run reverse topological order traversal in `backward()` to accumulate `.grad` across shared nodes.",
      "Verify analytical autograd gradients against numerical finite differences `(f(x + h) - f(x - h)) / (2h)`.",
    ],
    problemStatement:
      "Implement a scalar autograd engine (`Value`) and neural network primitives (`Neuron`, `Layer`, `MLP`). Train a 2-layer MLP via gradient descent to solve the non-linear XOR classification problem.",
    constraints: [
      "Accumulate gradients with `+=` (not `=`) so variables used multiple times in an expression (`x * x + x`) receive the sum of all path derivatives.",
      "Analytical gradients must match central finite-difference numerical gradients within `1e-5`.",
    ],
    expectedOutput:
      "Micrograd engine, finite-difference gradient checker, and XOR training convergence test.",
    hints: [
      "Remember to zero out `.grad = 0` on all parameters before calling `loss.backward()` on each training step!",
    ],
    testCases: [
      {
        input: "f(a, b) = tanh(a * b + a^2) at a = 2.0, b = -3.0",
        expected: "a.grad and b.grad match numerical central difference within 1e-6",
        note: "Chain rule & multi-use variable check",
      },
      {
        input: "Train 2-4-1 MLP on XOR truth table for 200 epochs",
        expected: "Loss drops below 0.02 and all 4 XOR predictions match target classes",
        note: "End-to-end MLP convergence",
      },
    ],
    instructions: [
      "Implement `Value` with `data`, `grad`, `prev`, and `_backward` closure.",
      "Implement `backward()` using DFS topological sort starting from the output node (`this.grad = 1`).",
      "Build `Neuron`, `Layer`, and `MLP` classes with `parameters()` and `zeroGrad()`.",
      "Write finite-difference gradient check tests and train the XOR network.",
    ],
    criteria: [
      "The deliverable meets the task description.",
      "Setup and verification steps are reproducible.",
      "The work handles errors and contains no secrets.",
      "You can demonstrate the result and explain your design choices.",
    ],
    deliverable:
      "A reverse-mode autograd engine and MLP library verified with numerical gradient checks.",
    solutionReference:
      "Reverse-mode autodiff computes the gradient of a scalar loss with respect to N parameters in a single backward pass (O(N) operations), whereas numerical differentiation requires N forward passes.",
    furtherChallenges: [
      "Add an SVG computation-graph exporter that renders every `Value` node's `.data` and `.grad`.",
    ],
    relatedIds: ["topological-task-scheduler", "bpe-tokenizer-from-scratch"],
    resources: [
      {
        name: "Andrej Karpathy — micrograd Reference",
        url: "https://github.com/karpathy/micrograd",
      },
    ],
  },

  // ==========================================
  // 7. CYBERSECURITY & APPLICATION SECURITY
  // ==========================================
  {
    id: "cryptographic-uuid-cert-verifier",
    title: "Build an Ed25519 cryptographic credential signer & verifier",
    initiative_id: "certs-system",
    trackIndex: 3,
    category: "Cybersecurity",
    difficulty: "Intermediate",
    skills: ["Cryptography", "Security", "Node.js", "TypeScript"],
    effort: 6,
    description:
      "Issue tamper-evident digital credentials signed with asymmetric Ed25519 keys and random UUIDv4 identifiers.",
    overview:
      "Sequential certificate IDs (`TDA-0001`, `TDA-0002`) allow trivial enumeration, and unsigned JSON payloads can be forged by anyone. Combining CSPRNG UUIDv4 identifiers, canonical JSON serialization, and Ed25519 public-key signatures makes credentials verifiable offline without exposing private keys.",
    prerequisites: "Public/private key concepts and JSON serialization.",
    prerequisiteIds: ["api-data-model"],
    objectives: [
      "Generate Ed25519 keypairs and CSPRNG UUIDv4 identifiers using `node:crypto` / Web Crypto API.",
      "Canonicalize credential payloads (deterministic key ordering) before signing.",
      "Verify signatures and check revocation/expiration timestamps.",
    ],
    problemStatement:
      "Build a credential issuance and verification library that signs `{ id, recipient, achievement, issuedAt, skills }` with an Ed25519 private key and verifies authenticity and revocation status using only the public key and a revocation set.",
    constraints: [
      "Never use `Math.random()` for security identifiers; use `crypto.randomUUID()`.",
      "Any modification to `recipient`, `skills`, or `issuedAt` must cause `verifyCredential()` to return `{ valid: false, reason: 'SIGNATURE_MISMATCH' }`.",
    ],
    expectedOutput:
      "Ed25519 credential signer/verifier module with tamper-detection and revocation unit tests.",
    hints: [
      "Sort object keys recursively when producing the canonical signing string so key order differences do not break verification.",
    ],
    testCases: [
      {
        input: "Sign valid credential, then alter skills array by adding 'Admin' and verify",
        expected: "Returns { valid: false, reason: 'SIGNATURE_MISMATCH' }",
        note: "Payload tamper detection",
      },
      {
        input: "Verify a validly signed credential whose UUID has been added to the revoked set",
        expected: "Returns { valid: false, reason: 'REVOKED' }",
        note: "Revocation enforcement",
      },
    ],
    instructions: [
      "Implement deterministic JSON canonicalization (`canonicalize(obj)`).",
      "Implement `issueCredential(payload, privateKey)` adding `crypto.randomUUID()` and Ed25519 signature.",
      "Implement `verifyCredential(signedCert, publicKey, revokedIds)`.",
      "Write tests for valid verification, tampered fields, wrong public key, and revoked UUIDs.",
    ],
    criteria: [
      "The deliverable meets the task description.",
      "Setup and verification steps are reproducible.",
      "The work handles errors and contains no secrets.",
      "You can demonstrate the result and explain your design choices.",
    ],
    deliverable:
      "An Ed25519 cryptographic credential signing and verification gateway with tamper tests.",
    solutionReference:
      "Ed25519 signatures are 64 bytes, deterministic (immune to nonce-reuse attacks), and fast to verify using only the public key.",
    furtherChallenges: [
      "Embed the signed credential token into a compact URL-safe QR code payload.",
    ],
    relatedIds: ["idempotent-webhook-processor", "jwt-signature-auditor"],
    resources: [
      {
        name: "W3C Web Cryptography API Specification",
        url: "https://www.w3.org/TR/WebCryptoAPI/",
      },
      { name: "OWASP Cryptographic Storage Cheat Sheet", url: "https://owasp.org" },
    ],
  },
  {
    id: "jwt-signature-auditor",
    title: "Audit and harden a vulnerable JWT authentication verifier",
    initiative_id: "certs-system",
    trackIndex: 3,
    category: "Cybersecurity",
    difficulty: "Intermediate",
    skills: ["Security", "Authentication", "Cryptography", "TypeScript"],
    effort: 5,
    description:
      "Exploit and patch classic JWT vulnerabilities: alg:none bypass, HS256/RS256 key confusion, and missing exp/aud claims.",
    overview:
      "JSON Web Tokens (JWTs) fail catastrophically when verifiers trust the header's `alg` field blindly or skip claim validation (`exp`, `nbf`, `iss`, `aud`). Writing exploit tests against a naive verifier and then hardening it locks in defensive authentication habits.",
    prerequisites: "Base64URL encoding, HMAC/RSA signatures, and HTTP auth headers.",
    prerequisiteIds: ["idempotent-webhook-processor"],
    objectives: [
      "Demonstrate how `{\"alg\":\"none\"}` and algorithm confusion bypass naive token verifiers.",
      "Enforce an explicit server-side algorithm allowlist (`['HS256']` or `['EdDSA']`).",
      "Validate `exp`, `nbf`, `iss`, and `aud` claims with configurable clock skew tolerance.",
    ],
    problemStatement:
      "Build a hardened `verifyJwt(token, secretOrPublicKey, options)` implementation and a security test suite that proves immunity against `alg: none`, algorithm downgrade, expired tokens, wrong audience, and tampered payloads.",
    constraints: [
      "Reject tokens before signature verification if `header.alg` does not strictly match `options.expectedAlg`.",
      "Use `crypto.timingSafeEqual` for HMAC digest comparison.",
    ],
    expectedOutput:
      "Hardened JWT verifier module and an exploit regression suite testing 6 attack vectors.",
    hints: [
      "Verify that `parts.length === 3` and that the signature bytes length matches the expected digest length before calling `timingSafeEqual`.",
    ],
    testCases: [
      {
        input: "Token with header { alg: 'none' } and empty signature segment",
        expected: "Rejected with 'ERR_JWS_ALG_NOT_ALLOWED'",
        note: "alg:none exploit mitigation",
      },
      {
        input: "Token with exp 10 seconds in the past",
        expected: "Rejected with 'ERR_JWT_EXPIRED'",
        note: "Temporal claim enforcement",
      },
    ],
    instructions: [
      "Write a minimal Base64URL encoder/decoder without padding vulnerabilities.",
      "Implement strict header checking (`typ === 'JWT'` and `alg === options.expectedAlg`).",
      "Verify the cryptographic signature over `${rawHeader}.${rawPayload}`.",
      "Validate temporal (`exp`, `nbf`) and identity (`iss`, `aud`) claims and test all 6 attack cases.",
    ],
    criteria: [
      "The deliverable meets the task description.",
      "Setup and verification steps are reproducible.",
      "The work handles errors and contains no secrets.",
      "You can demonstrate the result and explain your design choices.",
    ],
    deliverable:
      "A hardened JWT verification library with an automated exploit regression test suite.",
    solutionReference:
      "Never let the untrusted JWT header dictate how the server interprets its verification key; bind keys to a single algorithm on the server side.",
    furtherChallenges: [
      "Implement key rotation support using a `kid` (Key ID) allowlist map.",
    ],
    relatedIds: ["cryptographic-uuid-cert-verifier", "csp-xss-defense-lab"],
    resources: [
      {
        name: "RFC 8725 — JSON Web Token Best Current Practices",
        url: "https://datatracker.ietf.org/doc/html/rfc8725",
      },
    ],
  },
  {
    id: "csp-xss-defense-lab",
    title: "Remediate DOM XSS & build an HTML sanitizer + CSP policy",
    initiative_id: "core-platform",
    trackIndex: 3,
    category: "Cybersecurity",
    difficulty: "Intermediate",
    skills: ["Security", "Web Development", "HTML", "TypeScript"],
    effort: 6,
    description:
      "Neutralize Cross-Site Scripting (XSS) vectors across HTML elements, `javascript:` URLs, event handlers, and Content Security Policy headers.",
    overview:
      "Cross-Site Scripting (XSS) remains one of the most widespread web vulnerabilities. Merely stripping `<script>` tags is easily bypassed via `<img src=x onerror=alert(1)>` or `<a href=\"javascript:alert(1)\">`. Effective defense requires allowlist sanitization and strict Content Security Policy (CSP) headers.",
    prerequisites: "HTML DOM attributes, URLs, and HTTP response headers.",
    prerequisiteIds: ["developer-profile"],
    objectives: [
      "Identify why blocklist regexes fail against `onerror`, `onload`, `svg`, and `javascript:` / `data:` URL schemes.",
      "Build a strict allowlist HTML/Markdown sanitizer permitting only safe tags (`p`, `b`, `i`, `code`, `a`) and validated `https://` or `mailto:` schemes.",
      "Generate a nonce-based `Content-Security-Policy` header (`default-src 'self'; script-src 'nonce-...'`).",
    ],
    problemStatement:
      "Implement an allowlist sanitizer `sanitizeHtml(untrustedInput)` and a `buildCspHeader(nonce)` generator that neutralize a suite of 12 OWASP XSS evasion payloads while preserving legitimate formatting.",
    constraints: [
      "Any `href` or `src` attribute must be parsed and rejected unless its protocol is explicitly `https:` or `mailto:` (blocking whitespace/control-char obfuscated `java&#x09;script:`).",
      "All `on*` event handler attributes (`onclick`, `onerror`, `onmouseover`) must be stripped unconditionally.",
    ],
    expectedOutput:
      "Allowlist HTML sanitizer, CSP header builder, and OWASP XSS payload test suite.",
    hints: [
      "Decode HTML entities and strip ASCII control characters/whitespace before checking the URL protocol with `new URL(href)`.",
    ],
    testCases: [
      {
        input: `<img src="x" onerror="alert(1)"><a href="&#106;avascript: evil()">Click</a>`,
        expected: `Strips img/onerror and neutralizes javascript: href so zero executable script remains`,
        note: "Entity-encoded scheme & event handler bypass",
      },
    ],
    instructions: [
      "Define the strict tag allowlist and per-tag attribute allowlist.",
      "Implement URL protocol validation rejecting `javascript:`, `vbscript:`, and `data:` links.",
      "Implement HTML entity escaping for text nodes and attribute values.",
      "Test against 12 canonical OWASP XSS payloads and verify clean rendering of safe Markdown.",
    ],
    criteria: [
      "The deliverable meets the task description.",
      "Setup and verification steps are reproducible.",
      "The work handles errors and contains no secrets.",
      "You can demonstrate the result and explain your design choices.",
    ],
    deliverable:
      "An allowlist HTML/URL sanitizer and CSP header generator tested against 12 OWASP XSS vectors.",
    solutionReference:
      "Defense-in-depth pairs context-aware output encoding / allowlist sanitization with a strict `Content-Security-Policy` that disables inline scripts and `eval`.",
    furtherChallenges: [
      "Add Trusted Types enforcement directives (`require-trusted-types-for 'script'`) to the CSP builder.",
    ],
    relatedIds: ["developer-profile", "jwt-signature-auditor", "ssrf-url-validator"],
    resources: [
      {
        name: "OWASP Cross Site Scripting Prevention Cheat Sheet",
        url: "https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html",
      },
      {
        name: "MDN Content Security Policy (CSP) Guide",
        url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP",
      },
    ],
  },
  {
    id: "ssrf-url-validator",
    title: "Build an SSRF-safe outbound URL & IP range validator",
    initiative_id: "engineering-labs",
    trackIndex: 3,
    category: "Cybersecurity",
    difficulty: "Advanced",
    skills: ["Security", "Networking", "TypeScript"],
    effort: 6,
    description:
      "Prevent Server-Side Request Forgery (SSRF) against cloud metadata endpoints, loopback interfaces, and RFC 1918 private networks.",
    overview:
      "Whenever an application fetches user-supplied URLs (webhooks, link previews, avatar imports), attackers try to target `http://169.254.169.254/latest/meta-data/` or `http://127.0.0.1:6379/`. Hardening outbound fetches requires parsing CIDR ranges, canonicalizing octal/hex IP encodings, and validating resolved DNS records.",
    prerequisites: "IPv4/IPv6 addressing, CIDR notation, and DNS resolution.",
    prerequisiteIds: ["http11-socket-parser"],
    objectives: [
      "Parse IPv4 addresses into 32-bit unsigned integers and match against reserved CIDR blocks (`127.0.0.0/8`, `10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`, `169.254.0.0/16`, `0.0.0.0/8`).",
      "Defeat IP obfuscation tricks (`2130706433` decimal, `0x7f.0.0.1` hex, `::ffff:127.0.0.1` IPv4-mapped IPv6).",
      "Validate every resolved DNS IP before connecting to prevent DNS rebinding / redirect bypasses.",
    ],
    problemStatement:
      "Implement `validateOutboundUrl(rawUrl, dnsResolver)` that verifies `https:` protocol, resolves the hostname, and rejects any private, loopback, link-local, or cloud-metadata IP address.",
    constraints: [
      "Must block `169.254.169.254` (AWS/GCP/Azure metadata), `127.0.0.0/8`, `::1`, and RFC 1918 private subnets.",
      "Do not follow automatic HTTP `301/302` redirects to internal IPs without re-validating the redirect target.",
    ],
    expectedOutput:
      "SSRF guard library with CIDR bitwise matcher and bypass test suite.",
    hints: [
      "In JavaScript, `new URL('http://2130706433/')` automatically normalizes `hostname` to `'127.0.0.1'` — parse and check all 4 octets after URL normalization!",
    ],
    testCases: [
      {
        input: "https://169.254.169.254/latest/meta-data/ and https://2130706433/admin",
        expected: "Both rejected with 'ERR_SSRF_PRIVATE_IP'",
        note: "Metadata & decimal IP bypass check",
      },
      {
        input: "https://evil.example.com resolving via DNS mock to ['93.184.216.34', '10.0.0.5']",
        expected: "Rejected because at least one resolved record is in a private CIDR block",
        note: "Multi-A-record DNS check",
      },
    ],
    instructions: [
      "Write `ipv4ToInt(ip)` and `inCidr(ip, cidr)` using unsigned 32-bit shifts (`>>>`).",
      "Check IPv6 loopback (`::1`), unspecified (`::`), unique local (`fc00::/7`), and IPv4-mapped (`::ffff:a.b.c.d`) addresses.",
      "Integrate hostname resolution via an injectable `resolveIps(hostname)` function and validate all returned records.",
      "Write unit tests covering 10 SSRF bypass techniques.",
    ],
    criteria: [
      "The deliverable meets the task description.",
      "Setup and verification steps are reproducible.",
      "The work handles errors and contains no secrets.",
      "You can demonstrate the result and explain your design choices.",
    ],
    deliverable:
      "An SSRF outbound URL and CIDR validator tested against private IP, metadata, and DNS-rebinding vectors.",
    solutionReference:
      "Convert IPv4 octets to a 32-bit unsigned integer `((a << 24) | (b << 16) | (c << 8) | d) >>> 0` and test `(ipInt & mask) >>> 0 === (netInt & mask) >>> 0`.",
    furtherChallenges: [
      "Pin the validated IP address directly into the socket `lookup` callback so a second DNS lookup cannot return a different IP (TOCTOU DNS rebinding).",
    ],
    relatedIds: ["csp-xss-defense-lab", "http11-socket-parser"],
    resources: [
      {
        name: "OWASP Server-Side Request Forgery Prevention Cheat Sheet",
        url: "https://cheatsheetseries.owasp.org/cheatsheets/Server_Side_Request_Forgery_Prevention_Cheat_Sheet.html",
      },
    ],
  },

  // ==========================================
  // 8. SOFTWARE ENGINEERING, TESTING & DEVOPS
  // ==========================================
  {
    id: "contributor-guide",
    title: "Write a newcomer contribution guide",
    initiative_id: "knowledge-base",
    trackIndex: 1,
    category: "Software Engineering & Testing",
    difficulty: "Beginner",
    skills: ["Git", "Markdown", "Documentation"],
    effort: 3,
    description:
      "Document how a member can run the app and submit a small change.",
    overview:
      "Great open-source projects empower newcomers to go from `git clone` to a passing test run in under 5 minutes. Writing a tested contribution guide teaches empathy for future readers and operational clarity.",
    prerequisites: "Running local Node.js commands and basic Git workflows.",
    prerequisiteIds: ["first-contribution"],
    objectives: [
      "Document exact prerequisite versions, installation commands, and verification scripts.",
      "Explain repository directory structure (`src/`, `tests/`, `docs/`) so readers know where to edit.",
      "Verify every single instruction from a fresh clone in a clean directory.",
    ],
    problemStatement:
      "Author or overhaul `CONTRIBUTING.md` so any developer can set up the project, add an exercise or fix a bug, run the linters/tests, and verify their work independently.",
    constraints: [
      "Every command listed must work copy-paste on both Windows PowerShell and macOS/Linux shells.",
      "Include troubleshooting steps for common failures (port in use, Playwright browser install).",
    ],
    expectedOutput:
      "A comprehensive, tested `CONTRIBUTING.md` guide verified from a clean checkout.",
    hints: [
      "Include a quick verification checklist table mapping each npm script (`lint`, `typecheck`, `test`, `build`) to what it checks.",
    ],
    testCases: [
      {
        input: "Execute every command block in CONTRIBUTING.md sequentially in a clean clone",
        expected: "All commands exit with code 0 and build succeeds",
        note: "Clean-room verification",
      },
    ],
    instructions: [
      "Audit the current `package.json` scripts and directory layout.",
      "Draft `CONTRIBUTING.md` covering Prerequisites, Local Setup, Architecture Map, Adding Content, and Running Checks.",
      "Follow your own guide step-by-step in a fresh folder to catch any implicit assumptions.",
    ],
    criteria: [
      "The deliverable meets the task description.",
      "Setup and verification steps are reproducible.",
      "The work handles errors and contains no secrets.",
      "You can demonstrate the result and explain your design choices.",
    ],
    deliverable:
      "A documentation pull request tested by following each instruction from a clean checkout.",
    solutionReference:
      "Organize contributor docs around user goals: 1. Run it in 60 seconds, 2. Where files live, 3. How to add an exercise/project, 4. Pre-push verification checklist.",
    furtherChallenges: [
      "Write a Node script that extracts fenced shell commands from `CONTRIBUTING.md` and dry-runs them in CI.",
    ],
    relatedIds: ["first-contribution", "review-checklist", "mentor-handover"],
    resources: [
      {
        name: "GitHub Setting Guidelines for Repository Contributors",
        url: "https://docs.github.com/en/communities/setting-up-your-project-for-healthy-contributions/setting-guidelines-for-repository-contributors",
      },
      { name: "Markdown Guide Official Spec", url: "https://www.markdownguide.org/" },
    ],
  },
  {
    id: "review-checklist",
    title: "Create an accessible review checklist",
    initiative_id: "dev-culture",
    trackIndex: 1,
    category: "Software Engineering & Testing",
    difficulty: "Beginner",
    skills: ["Markdown", "Testing", "Accessibility"],
    effort: 2,
    description:
      "Help reviewers check functionality, accessibility and error states.",
    overview:
      "Code reviews that only nitpick formatting waste everyone's time; let Prettier/ESLint handle style so humans can verify correctness, edge cases, keyboard accessibility, and security.",
    prerequisites: "Basic web development and testing familiarity.",
    prerequisiteIds: ["first-contribution"],
    objectives: [
      "Define concrete, verifiable checks for correctness, empty/error states, accessibility, and test coverage.",
      "Provide a worked example comparing a shallow review vs a high-signal engineering review.",
    ],
    problemStatement:
      "Create a reusable Engineering Self-Review & Peer-Review Checklist in Markdown, complete with a worked before/after code review example showing how to catch an unhandled error state and missing keyboard label.",
    constraints: [
      "Every checklist item must be phrased as an observable test ('Can every interactive control be reached and activated using only Tab and Enter?').",
    ],
    expectedOutput:
      "A concise review checklist document and worked example ready for use in pull request templates.",
    hints: [
      "Group the checklist into 4 fast passes: 1. Correctness & Edge Cases, 2. Accessibility & Responsiveness, 3. Security & Secrets, 4. Tests & Reproducibility.",
    ],
    testCases: [
      {
        input: "Apply the checklist to a sample component missing an input label and error state",
        expected: "Checklist items immediately flag both omissions before merge",
        note: "Defect detection efficacy",
      },
    ],
    instructions: [
      "Draft the 4-part review checklist with actionable verification prompts.",
      "Write a short worked example showing a flawed React snippet and the constructive review comments + fixed snippet.",
      "Verify formatting and links.",
    ],
    criteria: [
      "The deliverable meets the task description.",
      "Setup and verification steps are reproducible.",
      "The work handles errors and contains no secrets.",
      "You can demonstrate the result and explain your design choices.",
    ],
    deliverable:
      "A pull request containing a concise review checklist and one worked example.",
    solutionReference:
      "High-leverage code reviews focus on invariants, failure modes, accessibility semantics, and test coverage rather than subjective style preferences.",
    furtherChallenges: [
      "Integrate the checklist into `.github/PULL_REQUEST_TEMPLATE.md`.",
    ],
    relatedIds: ["contributor-guide", "mentor-handover", "developer-profile"],
    resources: [
      {
        name: "SmartBear Peer Code Review Best Practices",
        url: "https://smartbear.com/learn/code-review/best-practices-for-peer-code-review/",
      },
      {
        name: "GitHub Pull Request Review Guide",
        url: "https://docs.github.com/en/pull-requests",
      },
    ],
  },
  {
    id: "mentor-handover",
    title: "Prepare a mentorship handover guide",
    initiative_id: "mentorship-sprints",
    trackIndex: 1,
    category: "Software Engineering & Testing",
    difficulty: "Intermediate",
    skills: ["Documentation", "Architecture", "Git"],
    effort: 4,
    description:
      "Help the next mentor continue an existing learning group.",
    overview:
      "Student engineering communities thrive or collapse at tenure boundaries. Writing a thorough architecture and curriculum handover runbook ensures the next cohort inherits a self-sustaining codebase rather than tribal knowledge.",
    prerequisites: "Understanding of the repository structure, build pipeline, and learning tracks.",
    prerequisiteIds: ["contributor-guide", "review-checklist"],
    objectives: [
      "Document system architecture, deployment configuration, and quality gates clearly.",
      "Provide a repeatable runbook for running study groups, code labs, and adding new exercises.",
      "Include zero private or personally identifiable member data.",
    ],
    problemStatement:
      "Author an Engineering Runbook & Cohort Handover Guide covering how the Resource Hub is structured, how to author new exercises/projects, how to facilitate weekly study sessions, and how to verify deployments.",
    constraints: [
      "Must contain zero private member data, credentials, or external account dependencies.",
    ],
    expectedOutput:
      "A complete handover runbook in `docs/` covering architecture, content authoring, study-group facilitation, and release verification.",
    hints: [
      "Include a 'First 30 Minutes for New Maintainers' section with 5 concrete verification commands.",
    ],
    testCases: [
      {
        input: "New cohort lead reads the handover guide to add a new exercise and deploy",
        expected: "Completes schema addition, unit test, and build verification without external help",
        note: "Self-contained handover test",
      },
    ],
    instructions: [
      "Document the architecture and data flow between `src/data.ts`, catalogue files, and UI views.",
      "Write a facilitation playbook for running open study sessions and algorithm walkthroughs.",
      "Add a pre-release verification checklist (`lint`, `typecheck`, `test`, `test:e2e`, `build`).",
    ],
    criteria: [
      "The deliverable meets the task description.",
      "Setup and verification steps are reproducible.",
      "The work handles errors and contains no secrets.",
      "You can demonstrate the result and explain your design choices.",
    ],
    deliverable:
      "A reusable guide covering onboarding, blockers, feedback and handover; no private member data.",
    solutionReference:
      "Treat documentation as code: version it alongside the source, keep it free of personal state, and tie every operational claim to an executable command.",
    furtherChallenges: [
      "Add architectural decision records (ADRs) explaining why the hub uses static client-side data over a stateful backend.",
    ],
    relatedIds: ["contributor-guide", "review-checklist"],
    resources: [
      {
        name: "Write the Docs — Documentation Guide",
        url: "https://www.writethedocs.org/guide/",
      },
    ],
  },
  {
    id: "property-based-test-suite",
    title: "Write a property-based testing & shrinking harness",
    initiative_id: "dev-culture",
    trackIndex: 1,
    category: "Software Engineering & Testing",
    difficulty: "Advanced",
    skills: ["Testing", "TypeScript", "Algorithms"],
    effort: 7,
    description:
      "Generate hundreds of randomized inputs automatically and shrink failing counterexamples to their minimal form.",
    overview:
      "Example-based unit tests only check the 3–5 inputs you thought of. Property-based testing (popularized by QuickCheck and fast-check) tests universal invariants (`reverse(reverse(xs)) === xs`, `deserialize(serialize(x)) === x`) across hundreds of generated inputs and automatically shrinks any failure to the smallest counterexample.",
    prerequisites: "Unit testing with Vitest, closures, and recursion.",
    prerequisiteIds: ["binary-search-tests"],
    objectives: [
      "Build composable seeded PRNG generators (`genInt`, `genArray`, `genString`, `genRecord`).",
      "Implement automatic counterexample shrinking (binary-searching smaller integers and removing array elements while the invariant still fails).",
      "Report the exact PRNG seed so any failing run can be replayed deterministically.",
    ],
    problemStatement:
      "Implement a lightweight property-testing runner `checkProperty(gen, predicate, { runs, seed })` with automatic array/integer shrinking, and use it to test sorting, binary search, and cursor encoding invariants.",
    constraints: [
      "Must use a deterministic seeded PRNG (e.g., Mulberry32) so passing `seed` reproduces the exact sequence of generated cases.",
    ],
    expectedOutput:
      "Property-testing micro-library with shrinking engine and invariant test suite.",
    hints: [
      "To shrink a failing array `xs`, try removing halves or single elements: if `predicate(smaller)` still returns `false`, recurse on `smaller` until no single removal fails.",
    ],
    testCases: [
      {
        input: "Buggy sort function that fails whenever array contains duplicate values >= 50",
        expected: "Finds failure on a large random array and shrinks counterexample down to [50, 50]",
        note: "Minimal counterexample shrinking",
      },
    ],
    instructions: [
      "Implement the Mulberry32 seeded PRNG and primitive generators (`int`, `boolean`, `array`, `string`).",
      "Implement shrinkers for integers (towards 0) and arrays (subarray slicing and element shrinking).",
      "Implement `forAll(generator, invariant)` that throws a detailed error with `{ seed, originalInput, shrunkCounterexample }`.",
      "Write property tests for `bubble`, `quick`, `merge`, `binary`, and `LRUCache`.",
    ],
    criteria: [
      "The deliverable meets the task description.",
      "Setup and verification steps are reproducible.",
      "The work handles errors and contains no secrets.",
      "You can demonstrate the result and explain your design choices.",
    ],
    deliverable:
      "A seeded property-based testing and shrinking library with algorithm invariant tests.",
    solutionReference:
      "Shrinking turns an inscrutable 50-element random failure into a 2-element minimal reproduction (`[50, 50]`), cutting debugging time from hours to seconds.",
    furtherChallenges: [
      "Add stateful model-based command shrinking to test sequences of `put`/`get`/`delete` operations against a reference `Map`.",
    ],
    relatedIds: ["binary-search-tests", "benchmark-sort"],
    resources: [
      { name: "Vitest Official Documentation", url: "https://vitest.dev/" },
    ],
  },
  {
    id: "sliding-window-rate-counter",
    title: "Solve Sliding Window Minimum & Variable-Size Substring problems",
    initiative_id: "dsa-bank",
    trackIndex: 2,
    category: "Data Structures & Algorithms",
    difficulty: "Intermediate",
    skills: ["Arrays", "Sliding Window", "Queues"],
    effort: 5,
    description:
      "Master fixed and variable-length sliding windows alongside O(N) monotonic deque window extrema.",
    overview:
      "Sliding windows maintain a dynamic subarray `[L, R]` that expands on the right and contracts from the left when a constraint is violated. Pairing a fixed window with a monotonic deque computes running minimums/maximums in O(1) amortized time per step.",
    prerequisites: "Two pointers, hash maps, and queues/deques.",
    prerequisiteIds: ["cp-pattern-notes"],
    objectives: [
      "Implement variable-size sliding window for Longest Substring Without Repeating Characters and Minimum Window Substring.",
      "Implement a monotonic deque for Sliding Window Maximum/Minimum in O(N) time.",
    ],
    problemStatement:
      "Implement `longestUniqueSubstring(s)`, `minWindowContainingAll(s, targetChars)`, and `slidingWindowMax(nums, k)` in strict O(N) time.",
    constraints: [
      "No `Math.max(...windowSlice)` inside the loop (must be O(N) even when `k = N / 2`).",
    ],
    expectedOutput:
      "Three tested O(N) sliding-window implementations with complexity benchmarks.",
    hints: [
      "In `slidingWindowMax`, store indices in a deque: pop from back while `nums[back] <= nums[i]`, push `i`, and pop from front if `front <= i - k`.",
    ],
    testCases: [
      {
        input: "nums = [1, 3, -1, -3, 5, 3, 6, 7], k = 3",
        expected: "Returns [3, 3, 5, 5, 6, 7]",
        note: "Monotonic deque window max",
      },
    ],
    instructions: [
      "Implement `longestUniqueSubstring` using a last-seen index map to jump `L` forward in O(1).",
      "Implement `minWindowContainingAll` tracking satisfied character frequency counts.",
      "Implement `slidingWindowMax` using an array-backed circular deque of indices.",
      "Write unit tests covering `k = 1`, `k = n`, duplicate chars, and no-match strings.",
    ],
    criteria: [
      "The deliverable meets the task description.",
      "Setup and verification steps are reproducible.",
      "The work handles errors and contains no secrets.",
      "You can demonstrate the result and explain your design choices.",
    ],
    deliverable:
      "An O(N) Sliding Window and Monotonic Deque toolkit with unit and performance tests.",
    solutionReference:
      "Because both `L` and `R` only move forward from `0` to `N - 1`, total window boundary updates never exceed `2N = O(N)`.",
    furtherChallenges: [
      "Use two monotonic deques (min and max) to find the longest contiguous subarray where `max - min <= limit` in O(N).",
    ],
    relatedIds: ["cp-pattern-notes", "monotonic-stack-skyline", "token-bucket-rate-limiter"],
    resources: [
      {
        name: "USACO Guide — Sliding Window",
        url: "https://usaco.guide/gold/sliding-window",
      },
    ],
  },
  {
    id: "dns-packet-decoder",
    title: "Build a binary RFC 1035 DNS packet encoder & decoder",
    initiative_id: "build-scratch",
    trackIndex: 3,
    category: "Systems & Networking",
    difficulty: "Advanced",
    skills: ["Networking", "Protocols", "Systems", "TypeScript"],
    effort: 8,
    description:
      "Parse and construct raw binary DNS wire packets, including 12-byte bitfield headers and RFC 1035 pointer compression.",
    overview:
      "Every network request starts with DNS. Parsing binary RFC 1035 DNS messages teaches bitmask manipulation (`flags >> 15`), length-prefixed domain labels (`\\x03www\\x07example\\x03com\\x00`), and pointer-compression jumping (`0xC0` offset pointers) — including defending against infinite compression pointer loops!",
    prerequisites: "Bitwise operators (`&`, `|`, `>>`, `<<`) and binary `Uint8Array` / `DataView`.",
    prerequisiteIds: ["http11-socket-parser"],
    objectives: [
      "Pack and unpack the 12-byte DNS header (`ID`, `QR`, `OPCODE`, `AA`, `TC`, `RD`, `RA`, `RCODE`, `QDCOUNT`, `ANCOUNT`, `NSCOUNT`, `ARCOUNT`).",
      "Decode length-prefixed domain names and `0xC0` compression pointers safely.",
      "Detect and reject malicious circular compression pointer loops (`offset -> offset`) that cause infinite loops.",
    ],
    problemStatement:
      "Implement `encodeDnsQuery(domain, recordType)` and `decodeDnsPacket(uint8Array)` supporting `A` (IPv4), `AAAA` (IPv6), `CNAME`, and `TXT` resource records with compression pointer decompression.",
    constraints: [
      "Must bound compression pointer jumps (max 16 jumps or strictly backward offsets `< currentOffset`) to prevent DoS loops.",
    ],
    expectedOutput:
      "Binary DNS wire encoder/decoder passing RFC 1035 fixture tests and malicious pointer-loop fuzz tests.",
    hints: [
      "If `(byte & 0xC0) === 0xC0`, the 14-bit byte offset is `((byte & 0x3F) << 8) | nextByte`.",
    ],
    testCases: [
      {
        input: "Binary DNS response packet with 0xC00C compression pointer in answer section",
        expected: "Decodes full domain name, TTL, and IPv4 address accurately",
        note: "Pointer decompression",
      },
      {
        input: "Crafted packet where compression pointer at offset 12 points to offset 12",
        expected: "Throws 'ERR_DNS_COMPRESSION_LOOP' immediately",
        note: "Infinite loop DoS defense",
      },
    ],
    instructions: [
      "Implement `readHeader(view)` and `writeHeader(view, header)` using `DataView` big-endian methods.",
      "Implement `readDomainName(buf, startOffset)` handling both labels and `0xC0` pointers with loop detection.",
      "Parse Question and Answer Resource Records (`TYPE`, `CLASS`, `TTL`, `RDLENGTH`, `RDATA`).",
      "Write unit tests with real captured DNS query/response byte arrays.",
    ],
    criteria: [
      "The deliverable meets the task description.",
      "Setup and verification steps are reproducible.",
      "The work handles errors and contains no secrets.",
      "You can demonstrate the result and explain your design choices.",
    ],
    deliverable:
      "A binary RFC 1035 DNS packet encoder and decoder with pointer-loop protection tests.",
    solutionReference:
      "Tracking a `visitedOffsets` set and requiring `pointerOffset < currentOffset` guarantees termination in at most `packet.byteLength` steps.",
    furtherChallenges: [
      "Send your encoded query packet over UDP (`node:dgram`) to `1.1.1.1:53` or `8.8.8.8:53` and decode the live response!",
    ],
    relatedIds: ["http11-socket-parser", "ssrf-url-validator"],
    resources: [
      {
        name: "RFC 1035 — Domain Names Implementation and Specification",
        url: "https://datatracker.ietf.org/doc/html/rfc1035",
      },
    ],
  },
  {
    id: "tcp-backpressure-proxy",
    title: "Build a bounded-concurrency worker pool & backpressure queue",
    initiative_id: "engineering-labs",
    trackIndex: 3,
    category: "Systems & Networking",
    difficulty: "Intermediate",
    skills: ["Concurrency", "Async", "TypeScript"],
    effort: 6,
    description:
      "Control in-flight async tasks, enforce bounded queue depth, and propagate cancellation via AbortSignal.",
    overview:
      "`Promise.all(tenThousandUrls.map(fetch))` opens 10,000 simultaneous sockets, exhausting file descriptors and triggering rate limits. A bounded concurrency pool with queue depth limits and `AbortSignal` support is essential for reliable systems programming.",
    prerequisites: "Promises, `async/await`, and `AbortController`.",
    prerequisiteIds: ["json-stream-aggregator"],
    objectives: [
      "Enforce `activeCount <= maxConcurrency` at every instant during execution.",
      "Enforce `queue.length <= maxQueueSize`, rejecting excess arrivals immediately with `BackpressureError`.",
      "Support per-task timeouts and `AbortSignal` cancellation before or during execution.",
    ],
    problemStatement:
      "Implement a `BoundedTaskPool` class supporting `submit(fn, { signal, priority })`, `drain()`, and live metrics (`active`, `queued`, `completed`, `rejected`).",
    constraints: [
      "An aborted task waiting in the queue must be removed immediately without ever invoking `fn()`.",
      "Peak concurrent executions must never exceed `maxConcurrency`.",
    ],
    expectedOutput:
      "Bounded worker pool module with concurrency watermark assertions and backpressure tests.",
    hints: [
      "Track `currentActive` and `peakActive = Math.max(peakActive, currentActive)` inside your test tasks to prove the concurrency bound holds.",
    ],
    testCases: [
      {
        input: "Submit 50 tasks to a pool with maxConcurrency = 4",
        expected: "All 50 complete in priority order and peakActive === 4",
        note: "Concurrency ceiling verification",
      },
      {
        input: "Submit task when queue is at maxQueueSize = 10",
        expected: "Rejects immediately with BackpressureError (load shedding)",
        note: "Bounded queue backpressure",
      },
    ],
    instructions: [
      "Design the priority wait queue and active worker counter.",
      "Wire `AbortSignal` listeners so queued tasks clean themselves up on abort.",
      "Trigger `next()` in a `finally` block whenever an active task settles.",
      "Write tests verifying concurrency ceiling, priority ordering, abort cleanup, and load shedding.",
    ],
    criteria: [
      "The deliverable meets the task description.",
      "Setup and verification steps are reproducible.",
      "The work handles errors and contains no secrets.",
      "You can demonstrate the result and explain your design choices.",
    ],
    deliverable:
      "A bounded-concurrency worker pool with load-shedding backpressure and AbortSignal tests.",
    solutionReference:
      "Load shedding (failing fast when `queued >= maxQueueSize`) prevents unbounded memory growth when downstream services slow down.",
    furtherChallenges: [
      "Add adaptive concurrency control (AIMD — Additive Increase Multiplicative Decrease, like TCP congestion control) based on downstream latency.",
    ],
    relatedIds: ["json-stream-aggregator", "websocket-lab", "token-bucket-rate-limiter"],
    resources: [
      {
        name: "MDN AbortController & AbortSignal Docs",
        url: "https://developer.mozilla.org/en-US/docs/Web/API/AbortController",
      },
    ],
  },
];
