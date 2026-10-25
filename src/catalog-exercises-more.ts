import type { RawExerciseSeed } from "./catalog-exercises";

export const MORE_EXERCISES: RawExerciseSeed[] = [
  {
    id: "semver-dependency-resolver",
    title: "Build a Semantic Versioning (SemVer) range parser & matcher",
    initiative_id: "dev-culture",
    trackIndex: 0,
    category: "Programming & Git",
    difficulty: "Intermediate",
    skills: ["TypeScript", "Parsing", "Software Engineering"],
    effort: 5,
    description:
      "Parse MAJOR.MINOR.PATCH-prerelease versions and evaluate caret (^), tilde (~), and comparator ranges.",
    overview:
      "Package managers like npm, Cargo, and pnpm rely on Semantic Versioning 2.0.0 to resolve compatible library versions safely. Implementing a SemVer parser and range evaluator teaches grammar rules, precedence ordering for pre-release tags (`1.0.0-alpha.1 < 1.0.0`), and zero-major caret nuances (`^0.2.3`).",
    prerequisites: "String parsing, regular expressions, and comparator sorting.",
    prerequisiteIds: ["cli-task-manager"],
    objectives: [
      "Parse `MAJOR.MINOR.PATCH` with optional `-prerelease` and `+build` metadata according to SemVer 2.0.0.",
      "Implement total ordering `compareSemVer(a, b)` where pre-release versions have lower precedence than normal versions.",
      "Evaluate caret (`^1.2.3`, `^0.2.3`, `^0.0.3`) and tilde (`~1.2.3`) version constraints accurately.",
    ],
    problemStatement:
      "Build a `semver` utility library exporting `parseVersion(v)`, `compareVersions(a, b)`, `satisfies(version, range)`, and `maxSatisfying(versions, range)`.",
    constraints: [
      "Build metadata (`+20130313`) must be ignored when determining version precedence.",
      "`^0.2.3` must desugar to `>=0.2.3 <0.3.0` (locking MINOR when MAJOR is 0).",
    ],
    expectedOutput:
      "Tested SemVer parser and range solver passing edge cases for `0.x` caret ranges and pre-release comparisons.",
    hints: [
      "Split pre-release identifiers by `.`: numeric identifiers are compared as integers (`2 < 10`), while alphanumeric identifiers are compared ASCII-lexicographically.",
    ],
    testCases: [
      {
        input: "compareVersions('1.0.0-alpha.2', '1.0.0-alpha.10') and compareVersions('1.0.0-rc.1', '1.0.0')",
        expected: "Both return -1 (alpha.2 < alpha.10 < 1.0.0 release)",
        note: "Pre-release numeric vs release precedence",
      },
      {
        input: "maxSatisfying(['0.2.1', '0.2.9', '0.3.0'], '^0.2.3')",
        expected: "Returns '0.2.9' (0.3.0 excluded because major is 0)",
        note: "Zero-major caret rule",
      },
    ],
    instructions: [
      "Write `parseVersion` validating non-negative integers without leading zeroes.",
      "Implement `compareVersions(a, b)` handling major, minor, patch, and dot-separated pre-release identifiers.",
      "Expand `^` and `~` sugar into primitive `>=` and `<` comparator pairs.",
      "Implement `maxSatisfying(versions, range)` and test all SemVer 2.0.0 spec examples.",
    ],
    criteria: [
      "The deliverable meets the task description.",
      "Setup and verification steps are reproducible.",
      "The work handles errors and contains no secrets.",
      "You can demonstrate the result and explain your design choices.",
    ],
    deliverable:
      "A SemVer 2.0.0 parser and range resolution engine with specification unit tests.",
    solutionReference:
      "Desugaring `^` and `~` into conjunctions of primitive comparators (`>=X.Y.Z` and `<U.V.W`) keeps the core evaluator tiny and composable.",
    furtherChallenges: [
      "Add a conflict detector that explains why two package dependency constraints have an empty intersection.",
    ],
    relatedIds: ["cli-task-manager", "topological-task-scheduler"],
    resources: [
      {
        name: "Semantic Versioning 2.0.0 Official Specification",
        url: "https://semver.org/",
      },
    ],
  },
  {
    id: "css-grid-dashboard-layout",
    title: "Build a responsive container-query engineering dashboard",
    initiative_id: "core-platform",
    trackIndex: 0,
    category: "Web Development",
    difficulty: "Beginner",
    skills: ["HTML", "CSS", "Accessibility"],
    effort: 4,
    description:
      "Compose fluid CSS Grid templates, subgrids, and container queries without fragile breakpoint hacks.",
    overview:
      "Media queries only know the browser viewport width, whereas reusable UI cards live inside sidebars, split panes, or full-width grids. Modern CSS Grid (`auto-fit`, `minmax`) and `@container` queries allow components to adapt to their own available space.",
    prerequisites: "HTML5 semantic tags and basic CSS properties.",
    prerequisiteIds: ["developer-profile"],
    objectives: [
      "Use CSS Grid areas (`grid-template-areas`) for macro page shells and `repeat(auto-fit, minmax(240px, 1fr))` for fluid card grids.",
      "Use `prefers-reduced-motion: reduce` to respect user motion preferences.",
      "Verify contrast ratios (WCAG AA 4.5:1) and keyboard tab order across mobile and desktop viewports.",
    ],
    problemStatement:
      "Build a responsive engineering telemetry and status layout that adapts seamlessly from a 320px single-column mobile screen to a multi-panel 1440px workspace with zero horizontal overflow.",
    constraints: [
      "No third-party CSS frameworks required; use clean custom properties (`--space-*`, `--surface-*`).",
      "Must pass automated `scrollWidth <= innerWidth` checks at 320px, 768px, and 1280px.",
    ],
    expectedOutput:
      "Responsive semantic dashboard page with fluid cards, status tables, and mobile navigation drawer/bar.",
    hints: [
      "Add `min-width: 0` on flex and grid children containing long URLs or code snippets so they wrap instead of blowing out the grid track!",
    ],
    testCases: [
      {
        input: "Insert a 120-character unbroken URL or hash inside a grid card on a 360px screen",
        expected: "Card wraps text cleanly (`overflow-wrap: anywhere`) and viewport does not scroll horizontally",
        note: "Long-token overflow defense",
      },
    ],
    instructions: [
      "Define design tokens for colors, spacing, and typography in `:root`.",
      "Construct the responsive shell with `aside`, `header`, `main`, and `footer`.",
      "Add card components with `min-width: 0` and `overflow-wrap: anywhere`.",
      "Test at 320px, 375px, 768px, and 1440px widths.",
    ],
    criteria: [
      "The deliverable meets the task description.",
      "Setup and verification steps are reproducible.",
      "The work handles errors and contains no secrets.",
      "You can demonstrate the result and explain your design choices.",
    ],
    deliverable:
      "A responsive CSS Grid and Container Query layout verified across mobile and desktop viewports.",
    solutionReference:
      "Grid items default to `min-width: auto`, which prevents shrinking below content size; setting `min-width: 0` on cards is the single most important fix for responsive grids.",
    furtherChallenges: [
      "Add print stylesheet (`@media print`) rules that hide navigation Chrome and format cards cleanly for PDF export.",
    ],
    relatedIds: ["developer-profile", "problem-bank-ui"],
    resources: [
      {
        name: "MDN CSS Grid Layout Guide",
        url: "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout",
      },
    ],
  },
  {
    id: "form-schema-validator",
    title: "Build a type-safe schema validator from scratch (Mini-Zod)",
    initiative_id: "core-platform",
    trackIndex: 1,
    category: "Web Development",
    difficulty: "Intermediate",
    skills: ["TypeScript", "Validation", "APIs"],
    effort: 6,
    description:
      "Implement composable runtime validators (`z.string()`, `z.number()`, `z.object()`, `z.array()`) with static TypeScript type inference.",
    overview:
      "TypeScript types disappear at compile time, leaving `JSON.parse()` and HTTP request bodies completely untyped at runtime. Building a composable schema combinator library teaches TypeScript generics (`Schema<T>`, `Infer<S>`), path-aware error reporting, and functional composition.",
    prerequisites: "TypeScript generics and object recursion.",
    prerequisiteIds: ["problem-bank-ui"],
    objectives: [
      "Design a base `Schema<T>` class with `.parse(input): T` and `.safeParse(input)` returning `{ success, data, issues }`.",
      "Preserve exact field paths (`['user', 'addresses', '0', 'postalCode']`) on nested validation failures.",
      "Infer static TypeScript types from schema definitions using `type Infer<S extends Schema<any>> = S['_output']`.",
    ],
    problemStatement:
      "Implement a zero-dependency schema validation library supporting `string` (`min`, `email`, `regex`), `number` (`int`, `min`, `max`), `boolean`, `enum`, `array`, `optional`, and nested `object` schemas with aggregated path issues.",
    constraints: [
      "`safeParse` must never throw an exception; it must collect all field issues in a single pass.",
    ],
    expectedOutput:
      "Mini-Zod TypeScript library with static type inference and nested path-error unit tests.",
    hints: [
      "Pass `path: (string | number)[] = []` down recursive `.validate(val, path)` calls so nested array/object failures report their exact path.",
    ],
    testCases: [
      {
        input: "Validate { name: '', age: -5, tags: ['ok', 123] } against UserSchema",
        expected: "Returns success: false with 3 issues at paths ['name'], ['age'], and ['tags', 1]",
        note: "Multi-issue path aggregation",
      },
    ],
    instructions: [
      "Define `ValidationIssue` (`path`, `message`, `code`) and the abstract `Schema<T>` base class.",
      "Implement primitive schemas (`StringSchema`, `NumberSchema`, `BooleanSchema`) with chainable refinement methods.",
      "Implement recursive `ArraySchema` and `ObjectSchema` forwarding child paths.",
      "Write unit tests verifying both valid type narrowing and multi-field error paths.",
    ],
    criteria: [
      "The deliverable meets the task description.",
      "Setup and verification steps are reproducible.",
      "The work handles errors and contains no secrets.",
      "You can demonstrate the result and explain your design choices.",
    ],
    deliverable:
      "A composable TypeScript runtime schema validator with static type inference and unit tests.",
    solutionReference:
      "Returning `{ success: true, data: T } | { success: false, issues: Issue[] }` enables TypeScript discriminated-union narrowing right after `if (res.success)`.",
    furtherChallenges: [
      "Add `.transform(fn)` and `.refine(predicate, message)` combinators.",
    ],
    relatedIds: ["api-data-model", "problem-bank-ui"],
    resources: [
      { name: "TypeScript Handbook — Generics", url: "https://www.typescriptlang.org/docs/handbook/2/generics.html" },
    ],
  },
  {
    id: "acid-ledger-transactions",
    title: "Implement double-entry ledger transfers with ACID isolation",
    initiative_id: "core-platform",
    trackIndex: 1,
    category: "Databases & APIs",
    difficulty: "Advanced",
    skills: ["SQL", "PostgreSQL", "Transactions"],
    effort: 7,
    description:
      "Prevent race-condition overdrafts (lost updates) using row-level locking, consistent lock ordering, and immutable ledger entries.",
    overview:
      "Storing a mutable `balance` column and running `SELECT balance` followed by `UPDATE balance = balance - 100` allows two concurrent requests to overdraw an account (Time-of-Check to Time-of-Use race). Financial and credit systems use append-only double-entry ledger rows and deterministic lock acquisition order (`SELECT ... FOR UPDATE` ordered by `account_id ASC`) to prevent both overdrafts and deadlocks.",
    prerequisites: "SQL transactions (`BEGIN`, `COMMIT`, `ROLLBACK`) and foreign keys.",
    prerequisiteIds: ["api-data-model"],
    objectives: [
      "Model transfers as balanced debit/credit pairs in an immutable `ledger_entries` table where `SUM(amount) = 0` per transaction.",
      "Acquire locks in ascending `account_id` order (`Math.min(from, to)` then `Math.max(from, to)`) to eliminate AB/BA deadlocks.",
      "Enforce idempotency via a unique `transfer_reference` key.",
    ],
    problemStatement:
      "Implement `executeTransfer({ fromAccountId, toAccountId, amountCents, idempotencyKey })` that guarantees non-negative balances, zero deadlocks under bidirectional concurrent transfers (`A -> B` and `B -> A`), and invariant conservation of total system funds.",
    constraints: [
      "All currency values must be represented as integer cents/paise (never IEEE-754 floating point).",
      "Total sum of all account balances before and after any sequence of transfers must remain strictly constant.",
    ],
    expectedOutput:
      "Double-entry ledger SQL schema, transactional transfer service, and concurrent overdraft/deadlock tests.",
    hints: [
      "Always lock `[firstId, secondId] = [fromId, toId].sort()` before checking `fromId`'s balance so `transfer(A, B)` and `transfer(B, A)` never deadlock.",
    ],
    testCases: [
      {
        input: "Account A has 100 cents; fire 5 concurrent transfers of 60 cents from A to B",
        expected: "Exactly 1 transfer succeeds (A=40, B=60) and 4 fail with InsufficientFundsError",
        note: "Race-condition overdraft prevention",
      },
      {
        input: "Fire 20 concurrent transfers A->B and 20 concurrent transfers B->A simultaneously",
        expected: "All 40 complete with 0 deadlocks and conserved total balance",
        note: "Lock-order deadlock immunity",
      },
    ],
    instructions: [
      "Create `accounts` and `ledger_entries` tables using integer amounts and `CHECK (amount <> 0)`.",
      "Implement deterministic lock ordering and balance verification inside a transaction.",
      "Insert the `-amount` debit entry and `+amount` credit entry and update cached balances atomically.",
      "Write concurrency tests verifying conservation of funds and overdraft rejection.",
    ],
    criteria: [
      "The deliverable meets the task description.",
      "Setup and verification steps are reproducible.",
      "The work handles errors and contains no secrets.",
      "You can demonstrate the result and explain your design choices.",
    ],
    deliverable:
      "An ACID double-entry ledger transfer engine with concurrency, deadlock, and conservation tests.",
    solutionReference:
      "Deadlocks require a cycle in the resource wait-for graph; enforcing a strict global ordering on lock acquisition (`id1 < id2`) makes cycles mathematically impossible.",
    furtherChallenges: [
      "Add an audit reconciliation job that verifies every account's cached balance equals `SUM(ledger_entries.amount)`.",
    ],
    relatedIds: ["api-data-model", "idempotent-webhook-processor"],
    resources: [
      {
        name: "PostgreSQL Explicit Locking Documentation",
        url: "https://www.postgresql.org/docs/current/explicit-locking.html",
      },
    ],
  },
  {
    id: "rag-chunking-evaluator",
    title: "Build a Markdown AST chunker & citation verifier for RAG",
    initiative_id: "knowledge-base",
    trackIndex: 3,
    category: "AI & Machine Learning",
    difficulty: "Intermediate",
    skills: ["AI/ML", "Markdown", "TypeScript"],
    effort: 6,
    description:
      "Split technical documents along semantic heading and code-block boundaries and verify that generated answers cite real source spans.",
    overview:
      "Naive fixed-character chunking (`text.slice(0, 500)`) slices fenced code blocks in half and strips section headings, causing Retrieval-Augmented Generation (RAG) pipelines to hallucinate broken code. Context-aware AST chunking preserves heading breadcrumbs (`H1 > H2 > H3`) and keeps code blocks intact.",
    prerequisites: "String processing, Markdown structure, and TypeScript.",
    prerequisiteIds: ["markdown-linter-cli", "vector-cosine-retriever"],
    objectives: [
      "Chunk Markdown documents by heading sections while keeping fenced code blocks undivided.",
      "Attach hierarchical breadcrumb metadata (`docTitle > section > subsection`) to every chunk.",
      "Implement a citation verifier that checks whether every `[chunk-id]` citation and quoted snippet in an answer actually exists in the retrieved context.",
    ],
    problemStatement:
      "Build `chunkMarkdownDocument(doc, maxTokens)` and `verifyGroundedCitations(answerText, retrievedChunks)` to prevent ungrounded citations and code-fence truncation.",
    constraints: [
      "Never split inside a fenced ```` ``` ```` code block unless the single block itself exceeds `maxTokens`.",
      "Every emitted chunk must carry `{ id, headingPath, content, tokenEstimate }`.",
    ],
    expectedOutput:
      "Context-preserving Markdown chunker and citation grounding verifier with unit tests.",
    hints: [
      "Pre-prepend `Context: ${headingPath.join(' > ')}\\n\\n` to each chunk's embedding text so retrieval knows which topic a subsection belongs to.",
    ],
    testCases: [
      {
        input: "Markdown document with a 25-line TypeScript code block spanning a 300-char boundary",
        expected: "Code block stays whole in a single chunk with its parent H2/H3 breadcrumb attached",
        note: "Code-fence preservation",
      },
      {
        input: "Answer citing [chunk-99] which was not in retrievedChunks",
        expected: "verifyGroundedCitations flags hallucinated citation ['chunk-99']",
        note: "Citation verification",
      },
    ],
    instructions: [
      "Parse Markdown into logical blocks (headings, paragraphs, lists, code fences).",
      "Group blocks into chunks up to `maxTokens` while tracking the active heading stack `[H1, H2, H3]`.",
      "Implement `verifyGroundedCitations` extracting `[id]` markers and checking quote overlap.",
      "Test on real documentation files from `docs/`.",
    ],
    criteria: [
      "The deliverable meets the task description.",
      "Setup and verification steps are reproducible.",
      "The work handles errors and contains no secrets.",
      "You can demonstrate the result and explain your design choices.",
    ],
    deliverable:
      "A heading-aware Markdown RAG chunker and citation grounding verifier with unit tests.",
    solutionReference:
      "Attaching the ancestor heading chain (`Database > Indexing > B-Tree`) to every leaf chunk resolves pronoun and context ambiguity during retrieval.",
    furtherChallenges: [
      "Combine with `vector-cosine-retriever` to build an end-to-end local documentation Q&A inspector.",
    ],
    relatedIds: ["vector-cosine-retriever", "markdown-linter-cli"],
    resources: [
      { name: "CommonMark Official Specification", url: "https://spec.commonmark.org/" },
    ],
  },
  {
    id: "multi-stage-docker-build",
    title: "Containerize a full-stack app with a hardened multi-stage Dockerfile",
    initiative_id: "engineering-labs",
    trackIndex: 3,
    category: "Software Engineering & Testing",
    difficulty: "Intermediate",
    skills: ["Docker", "DevOps", "Security"],
    effort: 5,
    description:
      "Cut container image size by 80%, run as a non-root user, and optimize layer caching for fast CI builds.",
    overview:
      "A naive single-stage `Dockerfile` copies `node_modules`, devDependencies, TypeScript compilers, and build caches into production, resulting in a 1.2 GB image running as `root`. Multi-stage builds separate the `deps`, `build`, and minimal `runner` stages.",
    prerequisites: "Command-line basics and `package.json` build scripts.",
    prerequisiteIds: ["contributor-guide"],
    objectives: [
      "Order `COPY package.json package-lock.json` before `COPY . .` so source edits do not invalidate the dependency install cache layer.",
      "Compile static assets in a `builder` stage and copy only `dist/` into a minimal runtime stage.",
      "Configure a non-root user (`USER appuser`), `HEALTHCHECK`, and `.dockerignore` excluding `.git`, `node_modules`, and `.env`.",
    ],
    problemStatement:
      "Write a production-grade multi-stage `Dockerfile`, `.dockerignore`, and container security linter script that verifies non-root execution, layer caching order, and zero leaked secrets.",
    constraints: [
      "Final runtime stage must not run as `root` (`uid 0`).",
      "`.dockerignore` must exclude `.env*`, `.git`, `node_modules`, and `test-results`.",
    ],
    expectedOutput:
      "Hardened multi-stage `Dockerfile`, `.dockerignore`, and automated Dockerfile static policy tests.",
    hints: [
      "Pin base image tags (e.g., `node:22-alpine`) and place `USER node` before `CMD` in the final runtime stage.",
    ],
    testCases: [
      {
        input: "Run static policy analyzer on Dockerfile and .dockerignore",
        expected: "Confirms multi-stage FROM, COPY package*.json before COPY ., non-root USER, and .env in .dockerignore",
        note: "Container hardening verification",
      },
    ],
    instructions: [
      "Create `.dockerignore` to keep build context under 1 MB.",
      "Write Stage 1 (`deps`) installing deterministic dependencies via `npm ci`.",
      "Write Stage 2 (`builder`) running `npm run build`.",
      "Write Stage 3 (`runner`) copying only compiled artifacts, setting `USER`, and defining `HEALTHCHECK`.",
    ],
    criteria: [
      "The deliverable meets the task description.",
      "Setup and verification steps are reproducible.",
      "The work handles errors and contains no secrets.",
      "You can demonstrate the result and explain your design choices.",
    ],
    deliverable:
      "A hardened multi-stage Dockerfile, .dockerignore, and automated Dockerfile policy test suite.",
    solutionReference:
      "Docker caches layers top-down; copying lockfiles and running `npm ci` before copying `src/` means 99% of code commits skip dependency installation completely.",
    furtherChallenges: [
      "Add a `docker-compose.yml` with read-only root filesystem (`read_only: true`) and memory limits.",
    ],
    relatedIds: ["contributor-guide", "github-actions-ci-pipeline"],
    resources: [
      {
        name: "Docker Multi-Stage Builds Guide",
        url: "https://docs.docker.com/build/building/multi-stage/",
      },
    ],
  },
  {
    id: "github-actions-ci-pipeline",
    title: "Design a fast, parallel GitHub Actions CI & quality gate workflow",
    initiative_id: "dev-culture",
    trackIndex: 1,
    category: "Software Engineering & Testing",
    difficulty: "Intermediate",
    skills: ["CI/CD", "GitHub Actions", "Testing"],
    effort: 4,
    description:
      "Automate linting, typechecking, unit tests, link auditing, and E2E Playwright checks on every pull request.",
    overview:
      "Continuous Integration is the immune system of a shared repository. A well-engineered GitHub Actions workflow uses dependency caching, concurrency cancellation for superseded PR pushes, and least-privilege `permissions: contents: read`.",
    prerequisites: "YAML syntax, npm scripts, and Git branches.",
    prerequisiteIds: ["first-contribution", "contributor-guide"],
    objectives: [
      "Configure `concurrency` groups with `cancel-in-progress: true` to save CI minutes on rapid branch pushes.",
      "Set explicit least-privilege `permissions: { contents: read }` on workflow jobs.",
      "Run `lint`, `typecheck`, `test`, and `build` deterministically with `npm ci` and upload failure artifacts.",
    ],
    problemStatement:
      "Author a production `.github/workflows/ci.yml` pipeline and a workflow validator test that enforces Node 22 caching, `npm ci`, least-privilege permissions, and artifact upload on Playwright failure.",
    constraints: [
      "Must use `npm ci` (never `npm install`) so `package-lock.json` is strictly respected.",
      "Must declare explicit `permissions` block.",
    ],
    expectedOutput:
      "Complete `.github/workflows/ci.yml` pipeline and automated YAML policy test.",
    hints: [
      "Use `concurrency: { group: ${{ github.workflow }}-${{ github.ref }}, cancel-in-progress: true }` so pushing a typo fix cancels the redundant previous run.",
    ],
    testCases: [
      {
        input: "Validate .github/workflows/ci.yml structure",
        expected: "Confirms triggers on push/pull_request, least-privilege permissions, npm ci, and lint/typecheck/test/build steps",
        note: "CI pipeline completeness check",
      },
    ],
    instructions: [
      "Inspect existing `.github/workflows` and `package.json` scripts.",
      "Configure checkout, `actions/setup-node` with `cache: 'npm'`, and `npm ci`.",
      "Add quality gate steps (`npm run lint`, `npm run typecheck`, `npm test`, `npm run build`).",
      "Write a test verifying that all required quality scripts exist and match `package.json`.",
    ],
    criteria: [
      "The deliverable meets the task description.",
      "Setup and verification steps are reproducible.",
      "The work handles errors and contains no secrets.",
      "You can demonstrate the result and explain your design choices.",
    ],
    deliverable:
      "A hardened GitHub Actions CI workflow with concurrency control, caching, and policy tests.",
    solutionReference:
      "Pinning `npm ci` and running `typecheck` + `lint` + `test` before `build` catches defects in seconds with actionable error logs.",
    furtherChallenges: [
      "Add a matrix strategy testing across `ubuntu-latest` and `windows-latest`.",
    ],
    relatedIds: ["multi-stage-docker-build", "review-checklist"],
    resources: [
      {
        name: "GitHub Actions Documentation",
        url: "https://docs.github.com/en/actions",
      },
    ],
  },
];
