export type ProjectBlueprint = {
  id: string;
  title: string;
  tagline: string;
  discipline:
    | "Web & Full-Stack"
    | "Systems & Protocols"
    | "AI & Data Engineering"
    | "Security & Cryptography"
    | "Algorithms & Developer Tools";
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  effortHours: string;
  overview: string;
  prerequisites: string;
  prerequisiteTaskIds: string[];
  techStack: {
    recommended: string[];
    alternatives: string[];
  };
  objectives: string[];
  architecture: string;
  folderStructure: string;
  implementationGuide: { step: string; detail: string }[];
  deliverables: string[];
  testing: string[];
  resources: { name: string; url: string }[];
  furtherChallenges: string[];
  relatedTaskIds: string[];
};

export type EngineeringLab = {
  id: string;
  title: string;
  domain:
    | "Systems Programming"
    | "Cybersecurity"
    | "AI & Machine Learning"
    | "Performance & Benchmarking"
    | "Networking & Distributed"
    | "Open-Source Tooling";
  difficulty: "Intermediate" | "Advanced";
  duration: string;
  summary: string;
  hypothesis: string;
  prerequisites: string;
  architectureNotes: string;
  experimentSteps: string[];
  validationChecklist: string[];
  furtherExploration: string[];
  linkedTaskIds: string[];
  linkedProjectId: string;
  resources: { name: string; url: string }[];
};

export type CurriculumModule = {
  id: string;
  number: string;
  title: string;
  category: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  summary: string;
  prerequisites: string;
  mentalModels: string[];
  objectives: string[];
  roadmapSteps: string[];
  taskIds: string[];
  projectIds: string[];
  resources: { name: string; url: string }[];
};

export type CPProblem = {
  id: string;
  title: string;
  topic: string;
  pattern: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  complexity: string;
  insight: string;
  platform: "CSES" | "Codeforces" | "LeetCode" | "USACO";
  url: string;
  relatedTaskId?: string;
};

export type LibraryResource = {
  name: string;
  url: string;
  category:
    | "Documentation & Specs"
    | "Books & Deep Dives"
    | "Courses & Curricula"
    | "Practice Platforms"
    | "Developer Tools";
  topic: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  summary: string;
};

export const PROJECT_BLUEPRINTS: ProjectBlueprint[] = [
  {
    id: "junior-path",
    title: "CLI & Web Foundations Starter Suite",
    tagline:
      "A progressive 3-part build taking you from a persistent Node.js CLI to a responsive web portfolio and filterable React catalogue.",
    discipline: "Web & Full-Stack",
    difficulty: "Beginner",
    effortHours: "15–20 hours",
    overview:
      "Jumping straight into heavy full-stack frameworks without understanding standard streams, JSON file persistence, semantic HTML, and client-side state leads to fragile code. In this guided project you build three clean, self-contained artifacts that form your foundational engineering portfolio.",
    prerequisites:
      "Basic programming variables, loops, and functions in JavaScript or TypeScript.",
    prerequisiteTaskIds: ["first-contribution", "cli-task-manager"],
    techStack: {
      recommended: ["Node.js 22+", "TypeScript", "HTML5 & CSS Grid", "React 19", "Vitest"],
      alternatives: ["Python 3.12 CLI + Vanilla JS", "Deno / Bun"],
    },
    objectives: [
      "Separate pure domain logic from I/O adapters (CLI arguments, filesystem, DOM events).",
      "Design semantic, keyboard-accessible responsive layouts without horizontal overflow.",
      "Model client-side search and multi-criteria filtering with zero redundant state.",
    ],
    architecture:
      "A monorepo or three modular folders (`packages/cli`, `packages/profile`, `packages/catalog`) sharing a common TypeScript data schema and Vitest test runner.",
    folderStructure: `foundations-suite/
├── cli/
│   ├── tasks.ts          # Pure reducer + atomic JSON file persistence
│   └── tasks.test.ts     # Unit tests for add/list/complete/remove
├── profile/
│   ├── index.html        # Semantic landmarks + skip link
│   ├── style.css         # Fluid CSS Grid + focus-visible states
│   └── app.ts            # Resilient fetch() with loading/error retry
├── catalog/
│   └── ProblemList.tsx   # Combinable search, topic & difficulty filters
└── README.md             # Setup, architecture notes & verification steps`,
    implementationGuide: [
      {
        step: "01. Atomic CLI Task Manager",
        detail:
          "Implement pure state reducers for adding, completing, and filtering tasks. Persist state to tasks.json using write-to-temp-and-rename so interrupted writes never corrupt the file.",
      },
      {
        step: "02. Accessible Developer Profile",
        detail:
          "Build a responsive portfolio page using semantic landmarks, CSS Grid auto-fit cards, and an async project loader with explicit loading, empty, and error-retry states.",
      },
      {
        step: "03. Interactive React Problem Explorer",
        detail:
          "Build a filterable exercise/problem directory in React that combines keyword search, topic selection, and difficulty filtering with URL query synchronization.",
      },
      {
        step: "04. End-to-End Verification",
        detail:
          "Add unit tests for the CLI and React filter logic, and verify mobile/desktop viewport responsiveness.",
      },
    ],
    deliverables: [
      "Working CLI task manager with atomic JSON persistence and help output.",
      "Responsive developer profile page passing keyboard navigation and 320px viewport checks.",
      "Filterable React catalogue component with empty-state recovery and automated tests.",
    ],
    testing: [
      "Run CLI against missing, empty, and malformed JSON files to confirm graceful error exit codes.",
      "Simulate network failure in the profile page and verify the retry button recovers.",
      "Verify that combining search + topic + difficulty filters returns the exact set intersection.",
    ],
    resources: [
      { name: "MDN Learn Web Development", url: "https://developer.mozilla.org/en-US/docs/Learn" },
      { name: "React Official Learn Guide", url: "https://react.dev/learn" },
      { name: "Pro Git Book (Ch 1–3)", url: "https://git-scm.com/book/en/v2" },
    ],
    furtherChallenges: [
      "Share the same JSON task schema between the CLI tool and the web dashboard.",
      "Add keyboard shortcuts (`/` to search, `Escape` to reset filters) and dark-mode support.",
    ],
    relatedTaskIds: [
      "first-contribution",
      "cli-task-manager",
      "developer-profile",
      "problem-bank-ui",
      "css-grid-dashboard-layout",
    ],
  },
  {
    id: "algo-visualizer",
    title: "Interactive Algorithm & Graph Visualization Engine",
    tagline:
      "Step-by-step deterministic visualiser for sorting, searching, two-pointer windows, and graph traversals.",
    discipline: "Algorithms & Developer Tools",
    difficulty: "Intermediate",
    effortHours: "16–24 hours",
    overview:
      "An algorithm visualiser makes abstract loop invariants visible. By strictly decoupling pure frame-generation functions (`algorithms.ts`) from the playback UI (`Visualizer.tsx`), you gain deterministic time-travel debugging (step forward, step back, jump to frame) and 100% unit-testable algorithm telemetry.",
    prerequisites:
      "TypeScript arrays, sorting/searching algorithms, and React state hooks.",
    prerequisiteTaskIds: ["binary-search-tests", "cp-pattern-notes"],
    techStack: {
      recommended: ["TypeScript", "React 19", "SVG / CSS Flexbox", "Vitest", "Playwright"],
      alternatives: ["HTML5 Canvas 2D", "Svelte / SolidJS"],
    },
    objectives: [
      "Decouple pure algorithm frame generators (`Frame[]`) from UI timers and rendering.",
      "Render active comparisons, swaps, sorted partitions, and named index pointers (`L`, `M`, `R`, `pivot`).",
      "Synchronize live pseudocode line highlighting and loop invariant explanations with each step.",
    ],
    architecture:
      "Pure functions take `(values, target)` and return an immutable array of `Frame` snapshots. The React component manages only `{ algorithm, input, stepIndex, isPlaying, speedMs }` and renders the current snapshot.",
    folderStructure: `algo-visualizer/
├── src/
│   ├── algorithms.ts     # Pure generators: bubble, insertion, quick, merge, binary, twoPointers
│   ├── graph-algos.ts    # BFS & DFS step-by-step frontier/visited frame builders
│   ├── Visualizer.tsx    # Playback controls, SVG/bar stage, pseudocode inspector
│   └── style.css         # Accessible color tokens & reduced-motion support
└── tests/
    └── algorithms.test.ts # Immutability, boundary & sorting correctness tests`,
    implementationGuide: [
      {
        step: "01. Frame Contract & Pure Generators",
        detail:
          "Define the Frame type (`values`, `active`, `sorted`, `pointers`, `message`, `codeLine`). Implement Bubble Sort, Insertion Sort, Quick Sort, Merge Sort, and Binary Search without mutating caller arrays.",
      },
      {
        step: "02. Time-Travel Playback Controller",
        detail:
          "Build Play/Pause (`setInterval`), Step Forward, Step Back, Reset, and Speed controls. Clamp step indices safely when input changes.",
      },
      {
        step: "03. Pseudocode & Invariant Inspector",
        detail:
          "Pair each algorithm with its Best/Avg/Worst complexity, loop invariant statement, and highlighted pseudocode lines.",
      },
      {
        step: "04. Graph BFS/DFS Layer Explorer",
        detail:
          "Render an SVG node-link graph comparing FIFO Queue (BFS) vs LIFO Stack (DFS) discovery order.",
      },
    ],
    deliverables: [
      "Pure generator module supporting at least 6 array algorithms and 2 graph traversals.",
      "Interactive playback UI with input validation (`1–20 numbers from 0–999`), presets, and `aria-live` announcements.",
      "Unit and E2E test suite verifying non-mutation, boundary inputs, and playback controls.",
    ],
    testing: [
      "Test empty `[]`, single-element `[42]`, duplicate `[5, 5, 1]`, sorted, and reversed inputs.",
      "Verify invalid user input (`'bad'`, `> 20 numbers`, negative values) displays an accessible `role=\"alert\"` message.",
    ],
    resources: [
      { name: "VisuAlgo Visual Reference", url: "https://visualgo.net/en" },
      { name: "MDN SVG Tutorial", url: "https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial" },
      { name: "CP-Algorithms Knowledge Base", url: "https://cp-algorithms.com/" },
    ],
    furtherChallenges: [
      "Add Dijkstra's shortest-path weighted edge relaxation to the SVG graph stage.",
      "Add a side-by-side race mode comparing O(N²) Insertion Sort vs O(N log N) Merge Sort on the same input.",
    ],
    relatedTaskIds: [
      "binary-search-tests",
      "benchmark-sort",
      "cp-pattern-notes",
      "dijkstra-route-planner",
    ],
  },
  {
    id: "dsa-bank",
    title: "Curated DSA Problem Bank & Pattern Explorer",
    tagline:
      "A pattern-indexed algorithmic practice library with prerequisite DAG navigation, complexity guides, and local notes.",
    discipline: "Algorithms & Developer Tools",
    difficulty: "Intermediate",
    effortHours: "14–20 hours",
    overview:
      "Solving 500 random problems without categorizing the underlying algorithmic invariant is inefficient. This project builds a fast, searchable DSA Problem Bank organized around 14 canonical patterns, complete with prerequisite topic graphs, complexity cheat-sheets, and self-contained pattern notes.",
    prerequisites:
      "React fundamentals, TypeScript data modeling, and basic data structures.",
    prerequisiteTaskIds: ["problem-bank-ui", "cp-pattern-notes"],
    techStack: {
      recommended: ["TypeScript", "React 19", "Zod / Schema Validation", "Vitest"],
      alternatives: ["Next.js Static Export", "Astro + React Islands"],
    },
    objectives: [
      "Index canonical problems from CSES, Codeforces, USACO, and LeetCode by algorithmic pattern rather than arbitrary tags.",
      "Model topic prerequisites as a Directed Acyclic Graph (DAG) so learners know what to study first.",
      "Provide instant multi-facet filtering (pattern, difficulty, platform, time complexity).",
    ],
    architecture:
      "Static typed dataset validated at build/test time, paired with a client-side search index, prerequisite DAG renderer, and complexity calculator.",
    folderStructure: `dsa-problem-bank/
├── src/
│   ├── problems.ts       # Canonical problem definitions, patterns & complexity hints
│   ├── roadmap-dag.ts    # 14-stage topic dependency graph
│   ├── ProblemBank.tsx   # Multi-filter search, complexity table & pattern notes
│   └── ComplexityCalc.tsx# Input constraint N -> safe Big-O selector
└── tests/
    └── catalog.test.ts   # Uniqueness, HTTPS link & DAG acyclicity checks`,
    implementationGuide: [
      {
        step: "01. Canonical Problem Schema",
        detail:
          "Define problem records with `id`, `title`, `topic`, `pattern`, `difficulty`, `complexity`, `insight`, and canonical `https://` URL.",
      },
      {
        step: "02. Multi-Facet Search & Filter UI",
        detail:
          "Build instant filtering across pattern, difficulty, and keyword search with clear-filter reset and accessible status announcements.",
      },
      {
        step: "03. Constraint-to-Complexity Reference",
        detail:
          "Add an interactive lookup mapping input size bounds (`N <= 20` up to `N <= 10^7`) to allowed time complexities and recommended patterns.",
      },
    ],
    deliverables: [
      "Curated problem dataset spanning all 14 competitive programming topics.",
      "Filterable problem explorer with expandable key insights and complexity targets.",
      "Automated schema validation ensuring unique IDs and valid HTTPS problem URLs.",
    ],
    testing: [
      "Verify every problem has a valid HTTPS URL and maps to a recognized roadmap topic.",
      "Test filter combinations and empty search states.",
    ],
    resources: [
      { name: "USACO Guide Curated Roadmap", url: "https://usaco.guide/" },
      { name: "CSES Problem Set", url: "https://cses.fi/problemset/" },
      { name: "CP-Algorithms Knowledge Base", url: "https://cp-algorithms.com/" },
    ],
    furtherChallenges: [
      "Add an exportable Markdown study plan generator based on selected weak topics.",
    ],
    relatedTaskIds: [
      "problem-bank-ui",
      "cp-pattern-notes",
      "monotonic-stack-skyline",
      "sliding-window-rate-counter",
      "knapsack-resource-allocator",
    ],
  },
  {
    id: "build-scratch",
    title: "Build-from-Scratch Systems Engineering Suite",
    tagline:
      "Implement core systems primitives without frameworks: a raw TCP HTTP/1.1 server, an O(1) LRU+TTL cache, a Git blob store, and a bytecode VM.",
    discipline: "Systems & Protocols",
    difficulty: "Advanced",
    effortHours: "30–45 hours",
    overview:
      "High-level frameworks hide how sockets frame messages, how databases persist bytes safely, how Git hashes directory trees, and how virtual machines execute bytecode. In this flagship systems project, you build clean, well-tested implementations of these core mechanisms from first principles.",
    prerequisites:
      "Comfortable programming in TypeScript/Node.js, Rust, C++, or Go; familiarity with binary buffers and data structures.",
    prerequisiteTaskIds: [
      "http11-socket-parser",
      "lru-cache-ttl-eviction",
      "content-addressed-blob-store",
      "bytecode-stack-vm",
    ],
    techStack: {
      recommended: ["Node.js (net, fs, crypto, zlib)", "TypeScript", "Vitest"],
      alternatives: ["Rust (std::net, sha2, flate2)", "Go (net, crypto/sha256)", "C++20"],
    },
    objectives: [
      "Parse fragmented TCP byte streams into structured protocol frames with bounded buffers.",
      "Design O(1) intrusive data structures (Doubly Linked List + Hash Map) and append-only binary logs.",
      "Build a complete compiler pipeline: Lexer → AST Parser → Bytecode Emitter → Stack Virtual Machine.",
    ],
    architecture:
      "Four independent, zero-framework modules (`http-raw/`, `lru-ttl/`, `mini-git/`, `bytecode-vm/`), each with its own RFC-style design note and deterministic unit test suite.",
    folderStructure: `systems-from-scratch/
├── 01-http11-tcp/        # Incremental HTTP/1.1 parser & keep-alive socket server
├── 02-lru-cache/         # Intrusive Doubly Linked List + HashMap with lazy TTL
├── 03-git-object-store/  # SHA-256 blob, tree & commit Merkle DAG store
├── 04-bytecode-vm/       # Lexer, Pratt parser, compiler, disassembler & stack VM
└── docs/                 # Wire format diagrams & benchmark notes`,
    implementationGuide: [
      {
        step: "01. Raw TCP HTTP/1.1 Protocol Parser",
        detail:
          "Build a streaming state machine that parses request lines, headers, and Content-Length bodies across arbitrary TCP chunk boundaries.",
      },
      {
        step: "02. Intrusive O(1) LRU Cache with TTL",
        detail:
          "Combine sentinel doubly-linked list nodes with a hash map for O(1) promotion and eviction, instrumented with hit/miss telemetry.",
      },
      {
        step: "03. Content-Addressed Merkle Object Store",
        detail:
          "Implement Git-compatible blob, tree, and commit hashing with zlib compression and tamper verification.",
      },
      {
        step: "04. Bytecode Compiler & Stack VM",
        detail:
          "Compile arithmetic, conditionals, and while loops into linear bytecode with jump backpatching and execute with fuel limits.",
      },
    ],
    deliverables: [
      "Working implementations of at least two (or all four) systems modules with zero external runtime dependencies.",
      "Architecture notes documenting wire formats, invariants, and failure modes.",
      "Automated test suite covering fragmented packets, hash corruption, cache eviction, and infinite-loop fuel limits.",
    ],
    testing: [
      "Feed 3-byte fragmented TCP chunks into the HTTP parser and verify complete request reconstruction.",
      "Corrupt a single byte in a compressed Git object file and assert hash verification throws an integrity error.",
      "Run iterative factorial and Fibonacci programs on the bytecode VM and assert exact stack outputs.",
    ],
    resources: [
      { name: "Crafting Interpreters (Robert Nystrom)", url: "https://craftinginterpreters.com" },
      { name: "Write Yourself a Git", url: "https://wyag.thb.lt" },
      { name: "CMU Database Systems (15-445)", url: "https://15445.courses.cs.cmu.edu" },
      { name: "Redis Serialization Protocol (RESP)", url: "https://redis.io/docs/reference/protocol-spec/" },
    ],
    furtherChallenges: [
      "Expose the WAL key-value store over a Redis RESP wire protocol socket so `redis-cli` can connect to your server!",
    ],
    relatedTaskIds: [
      "http11-socket-parser",
      "lru-cache-ttl-eviction",
      "content-addressed-blob-store",
      "bytecode-stack-vm",
      "wal-append-storage-engine",
      "dns-packet-decoder",
    ],
  },
  {
    id: "core-platform",
    title: "Full-Stack Engineering Resource & Catalogue Platform",
    tagline:
      "End-to-end architecture for a fast, type-safe engineering resource portal with relational modeling, cursor pagination, and command palette discovery.",
    discipline: "Web & Full-Stack",
    difficulty: "Intermediate",
    effortHours: "20–30 hours",
    overview:
      "Learn how to structure a modern full-stack application where data schemas, API endpoints, database indexes, and keyboard-first UI components work together coherently. Can be built as a static-first Vite/Next.js application or backed by PostgreSQL/SQLite.",
    prerequisites:
      "React, TypeScript, basic SQL schema design, and HTTP fundamentals.",
    prerequisiteTaskIds: ["problem-bank-ui", "api-data-model"],
    techStack: {
      recommended: ["React 19 / Next.js", "TypeScript", "PostgreSQL / SQLite", "Zod", "Playwright"],
      alternatives: ["Remix / React Router v7", "Astro + Hono + Drizzle ORM"],
    },
    objectives: [
      "Model normalized entities (`tracks`, `exercises`, `blueprints`, `tags`) with strict runtime schema validation.",
      "Implement fast multi-criteria discovery, URL-synced filters, and a global `Ctrl+K` command palette.",
      "Enforce accessibility standards (skip links, landmarks, focus management, zero horizontal overflow).",
    ],
    architecture:
      "Modular domain catalogue paired with validated API/query layers, composite database indexes for keyset pagination, and accessible React views.",
    folderStructure: `resource-platform/
├── src/
│   ├── schema/           # Type-safe validators & domain types
│   ├── catalog/          # Exercises, project blueprints & learning roadmaps
│   ├── components/       # CommandPalette, FilterBar, Visualizer, DetailViews
│   └── main.tsx          # Hash/URL router & responsive workspace shell
└── tests/
    ├── catalog.test.ts   # Data integrity & algorithm unit tests
    └── e2e/              # Desktop & mobile Playwright user journeys`,
    implementationGuide: [
      {
        step: "01. Domain Schema & Data Integrity Tests",
        detail:
          "Define strict TypeScript types and automated integrity tests ensuring unique IDs, valid cross-references, and reachable HTTPS links.",
      },
      {
        step: "02. Discovery & Filter Engine",
        detail:
          "Build combinable search, track, category, difficulty, and skill tag filters with instant feedback and URL parameter synchronization.",
      },
      {
        step: "03. Deep Resource Detail Pages",
        detail:
          "Render self-contained exercise and project blueprint views with problem statements, progressive hints, test cases, and prerequisite links.",
      },
      {
        step: "04. Responsive & Accessibility Audit",
        detail:
          "Verify keyboard navigation, focus states, and zero horizontal overflow on both desktop and mobile viewports.",
      },
    ],
    deliverables: [
      "Full-featured resource hub with search, multi-facet filtering, and deep detail pages.",
      "Validated relational/JSON schema with zero broken internal cross-links.",
      "Passing unit and Playwright E2E test suites across desktop and mobile profiles.",
    ],
    testing: [
      "Verify all entry points, filter combinations, empty states, and detail pages in Playwright.",
      "Check `document.documentElement.scrollWidth <= window.innerWidth` across every route.",
    ],
    resources: [
      { name: "Official Next.js Learn Course", url: "https://nextjs.org/learn" },
      { name: "Prisma PostgreSQL Quickstart", url: "https://www.prisma.io/docs/getting-started" },
      { name: "shadcn/ui Component Catalog", url: "https://ui.shadcn.com" },
    ],
    furtherChallenges: [
      "Add offline service-worker caching so the entire engineering library works without an internet connection.",
    ],
    relatedTaskIds: [
      "api-data-model",
      "cursor-pagination-api",
      "accessible-command-palette",
      "form-schema-validator",
    ],
  },
  {
    id: "certs-system",
    title: "Cryptographic Credential & Verification Gateway",
    tagline:
      "Generate and verify tamper-evident digital certificates using Ed25519 asymmetric signatures, CSPRNG UUIDs, and QR verification payloads.",
    discipline: "Security & Cryptography",
    difficulty: "Intermediate",
    effortHours: "14–18 hours",
    overview:
      "Digital certificates and badges are trivial to forge if they rely on sequential IDs (`CERT-001`) or unauthenticated PDFs. This project builds an end-to-end cryptographic issuance and verification pipeline using Ed25519 digital signatures, canonical JSON serialization, and offline-verifiable QR payloads.",
    prerequisites:
      "TypeScript/Node.js, public-key cryptography basics, and HTTP APIs.",
    prerequisiteTaskIds: ["cryptographic-uuid-cert-verifier", "idempotent-webhook-processor"],
    techStack: {
      recommended: ["Web Crypto API / node:crypto", "Ed25519", "PDF-Lib", "QRCode", "TypeScript"],
      alternatives: ["Rust (ed25519-dalek)", "Go (crypto/ed25519)"],
    },
    objectives: [
      "Sign canonicalized credential claims with Ed25519 private keys and verify them using only the public key.",
      "Prevent ID enumeration using CSPRNG UUIDv4 identifiers.",
      "Embed high-contrast verification URLs/tokens into downloadable PDFs and QR codes.",
    ],
    architecture:
      "Keypair generator + Canonical JSON Signer + PDF/QR Renderer + Stateless Public Verifier widget.",
    folderStructure: `crypto-credentials/
├── src/
│   ├── canonical.ts      # Deterministic JSON key sorting
│   ├── signer.ts         # Ed25519 key generation, signing & verification
│   ├── pdf-issuer.ts     # PDF-Lib certificate template + QR code embedding
│   └── verifier-ui.tsx   # Public verification inspector (Valid / Tampered / Revoked)
└── tests/
    └── security.test.ts  # Tamper, wrong-key, replay & revocation tests`,
    implementationGuide: [
      {
        step: "01. Canonical Payload & Ed25519 Signer",
        detail:
          "Implement deterministic JSON serialization and sign `{ id, recipient, title, issuedAt, skills }` with an Ed25519 private key.",
      },
      {
        step: "02. Verification & Revocation Checker",
        detail:
          "Build `verifyCredential(bundle, publicKey, revocationList)` returning detailed status (`VALID`, `TAMPERED_SIGNATURE`, `REVOKED`).",
      },
      {
        step: "03. PDF & QR Code Generation",
        detail:
          "Render a clean printable certificate with PDF-Lib containing an embedded QR code linking to the signed verification payload.",
      },
    ],
    deliverables: [
      "Ed25519 signing and verification toolkit with canonical JSON serialization.",
      "PDF/QR generator producing verifiable credential artifacts.",
      "Security test suite proving detection of 1-bit payload tampering and revoked UUIDs.",
    ],
    testing: [
      "Mutate any field in a signed credential JSON and assert signature verification fails.",
      "Verify that sequential IDs are never generated and UUIDv4 format is strictly enforced.",
    ],
    resources: [
      { name: "W3C Web Cryptography API", url: "https://www.w3.org/TR/WebCryptoAPI/" },
      { name: "PDF-Lib Documentation", url: "https://pdf-lib.js.org/" },
      { name: "OWASP Cryptographic Security", url: "https://owasp.org" },
    ],
    furtherChallenges: [
      "Add Merkle-tree batch timestamping so thousands of credentials can be anchored to a single root hash.",
    ],
    relatedTaskIds: [
      "cryptographic-uuid-cert-verifier",
      "jwt-signature-auditor",
      "idempotent-webhook-processor",
    ],
  },
  {
    id: "cp-leaderboard",
    title: "Resilient Public API Aggregator & Caching Proxy",
    tagline:
      "Build a rate-limit-aware API client with Redis/TTL caching, exponential backoff retries, and circuit-breaker protection.",
    discipline: "Systems & Protocols",
    difficulty: "Intermediate",
    effortHours: "12–16 hours",
    overview:
      "Querying third-party APIs (like Codeforces, GitHub, or weather/financial feeds) directly on every page render triggers `429 Too Many Requests` bans and causes cascading outages when the upstream API is slow. This project builds a resilient caching proxy with stale-while-revalidate TTLs, token-bucket rate limiting, and circuit breakers.",
    prerequisites:
      "Async JavaScript/TypeScript, HTTP status codes, and caching concepts.",
    prerequisiteTaskIds: ["token-bucket-rate-limiter", "lru-cache-ttl-eviction"],
    techStack: {
      recommended: ["TypeScript", "Node.js Fetch", "Redis / In-Memory LRU+TTL", "Vitest"],
      alternatives: ["Go net/http + Redis", "Cloudflare Workers + KV"],
    },
    objectives: [
      "Prevent upstream rate-limit violations using client-side token buckets and response caching.",
      "Implement exponential backoff with full jitter on transient `502`/`503`/`429` errors.",
      "Implement a 3-state Circuit Breaker (`CLOSED`, `OPEN`, `HALF_OPEN`) that serves stale cached data during upstream outages.",
    ],
    architecture:
      "Request → Cache Lookup (Fresh / Stale) → Rate Limiter → Circuit Breaker → Upstream Fetch with Retry → Cache Write.",
    folderStructure: `resilient-api-proxy/
├── src/
│   ├── cache.ts          # TTL + Stale-While-Revalidate cache store
│   ├── circuit-breaker.ts# CLOSED / OPEN / HALF_OPEN state machine
│   ├── retry-client.ts   # Exponential backoff + jitter HTTP client
│   └── cf-adapter.ts     # Typed Codeforces contest & problemset fetcher
└── tests/
    └── resilience.test.ts# Simulated 429/503 outage & cache hit tests`,
    implementationGuide: [
      {
        step: "01. Backoff Retry HTTP Client",
        detail:
          "Wrap `fetch` with configurable timeouts (`AbortSignal.timeout`), retrying `429`/`5xx` responses with exponential backoff and jitter.",
      },
      {
        step: "02. Stale-While-Revalidate Cache Layer",
        detail:
          "Store `{ value, freshUntil, staleUntil }` so expired entries can still be served as a fallback if the upstream API is down.",
      },
      {
        step: "03. Circuit Breaker State Machine",
        detail:
          "Trip the circuit to `OPEN` after N consecutive upstream failures, failing fast to cached data for a cool-down window before probing in `HALF_OPEN`.",
      },
    ],
    deliverables: [
      "Resilient API client with TTL caching, exponential backoff, and circuit breaker.",
      "Deterministic test suite simulating upstream 429 rate limits and 503 outages.",
    ],
    testing: [
      "Simulate 5 consecutive 503 responses and verify the circuit opens and serves stale cached data in < 1ms.",
      "Verify `Retry-After` headers on 429 responses are respected.",
    ],
    resources: [
      { name: "Codeforces Official API Documentation", url: "https://codeforces.com/apiHelp" },
      { name: "Upstash Redis Caching Guide", url: "https://upstash.com/docs/redis/overall" },
    ],
    furtherChallenges: [
      "Add request coalescing (singleflight) so 50 concurrent cache misses for the same key trigger only 1 upstream HTTP request.",
    ],
    relatedTaskIds: [
      "token-bucket-rate-limiter",
      "lru-cache-ttl-eviction",
      "tcp-backpressure-proxy",
    ],
  },
  {
    id: "analytics-engine",
    title: "High-Throughput Telemetry & Time-Series Aggregator",
    tagline:
      "Stream-ingest event logs, pre-aggregate daily rollups in SQL, and render 100k-row virtualized views and SVG charts.",
    discipline: "AI & Data Engineering",
    difficulty: "Intermediate",
    effortHours: "16–22 hours",
    overview:
      "Computing analytics on the fly over millions of raw event rows brings databases to a halt. Production telemetry systems ingest events via streaming pipelines, pre-aggregate hourly/daily snapshots (materialized rollups), and use virtualized tables on the frontend.",
    prerequisites:
      "SQL aggregations (`GROUP BY`), Node.js streams, and React.",
    prerequisiteTaskIds: ["json-stream-aggregator", "sql-query-optimizer", "virtualized-log-viewer"],
    techStack: {
      recommended: ["TypeScript", "SQLite / PostgreSQL", "Node.js Streams", "React + SVG Charts"],
      alternatives: ["DuckDB / ClickHouse Local", "Python Polars + FastAPI"],
    },
    objectives: [
      "Ingest multi-megabyte NDJSON event streams in bounded O(1) memory.",
      "Design idempotent daily rollup tables (`daily_route_metrics`) that refresh incrementally.",
      "Render responsive SVG heatmaps, latency histograms, and 100,000-row virtualized log tables.",
    ],
    architecture:
      "NDJSON Stream Ingestor → Raw Events & Materialized Daily Rollup Tables → Fast Indexed Query API → Virtualized Log & SVG Chart Dashboard.",
    folderStructure: `telemetry-engine/
├── src/
│   ├── ingest-stream.ts  # Backpressure-safe NDJSON parser & batch inserter
│   ├── rollups.sql       # Materialized daily summary schema & indexes
│   ├── VirtualLogs.tsx   # 60 FPS windowed table for 100k log entries
│   └── LatencyChart.tsx  # Zero-dependency SVG p50/p95/p99 bar & heatmap charts
└── tests/
    └── pipeline.test.ts  # Stream fault tolerance & rollup accuracy tests`,
    implementationGuide: [
      {
        step: "01. Streaming NDJSON Ingestion",
        detail:
          "Read raw event logs line-by-line, Quarantine corrupt records, and batch-insert valid events inside transactions.",
      },
      {
        step: "02. Pre-Aggregated Rollup Queries",
        detail:
          "Write SQL rollup queries computing request count, error rate, and latency buckets per day and route, verified with EXPLAIN QUERY PLAN.",
      },
      {
        step: "03. Virtualized Explorer & SVG Charts",
        detail:
          "Build the frontend log inspector using DOM windowing and accessible SVG charts.",
      },
    ],
    deliverables: [
      "Streaming NDJSON ingestion pipeline with dead-letter counting.",
      "Indexed SQL rollup queries eliminating full-table scans on dashboard loads.",
      "Virtualized log table and SVG visualization components.",
    ],
    testing: [
      "Verify that re-running the daily rollup job for the same date is idempotent (`ON CONFLICT DO UPDATE`) and never double-counts events.",
    ],
    resources: [
      { name: "PostgreSQL Materialized Views Guide", url: "https://www.postgresql.org/docs/current/rules-materializedviews.html" },
      { name: "Recharts Visualization Reference", url: "https://recharts.org/" },
    ],
    furtherChallenges: [
      "Implement a HyperLogLog or reservoir sampling sketch to estimate unique keys and p99 latencies in fixed memory.",
    ],
    relatedTaskIds: [
      "json-stream-aggregator",
      "sql-query-optimizer",
      "virtualized-log-viewer",
    ],
  },
  {
    id: "engineering-labs",
    title: "Experimental Engineering & AI Retrieval Sandbox",
    tagline:
      "Build isolated research prototypes: Hybrid BM25+Vector RAG, BPE Tokenizers, Micrograd Autodiff, and Resilient WebSockets.",
    discipline: "AI & Data Engineering",
    difficulty: "Advanced",
    effortHours: "24–36 hours",
    overview:
      "Before adopting new technologies like Vector Search, LLM Tokenizers, or WebSockets in production, strong engineers build isolated, measurable prototypes. Each sandbox follows a rigorous scientific loop: Problem Statement → Hypothesis → Baseline Implementation → Benchmark Evaluation → Documented Limitations.",
    prerequisites:
      "Comfortable with TypeScript/Python, linear algebra basics, and async networking.",
    prerequisiteTaskIds: [
      "vector-cosine-retriever",
      "bpe-tokenizer-from-scratch",
      "mini-autograd-engine",
      "websocket-lab",
    ],
    techStack: {
      recommended: ["TypeScript", "Node.js", "pgvector / In-Memory Vector Index", "WebSockets", "Vitest"],
      alternatives: ["Python 3.12 + NumPy + FastAPI"],
    },
    objectives: [
      "Build a hybrid BM25 + Cosine Vector search engine with Reciprocal Rank Fusion and Recall@K benchmarks.",
      "Train a byte-level BPE tokenizer and a reverse-mode scalar autograd neural network from scratch.",
      "Prototype a resilient WebSocket broadcast server with sequence-number catchup on reconnect.",
    ],
    architecture:
      "Self-contained `/labs` workspaces where each experiment exposes a pure library, a CLI benchmark runner, and a reproducible evaluation report.",
    folderStructure: `engineering-labs/
├── lab-01-websocket-catchup/ # Sequence-numbered broadcast + backoff reconnect
├── lab-02-hybrid-rag/        # Markdown AST chunker + BM25 + Vector RRF
├── lab-03-bpe-tokenizer/     # UTF-8 Byte-Pair Encoding trainer & encoder
├── lab-04-micrograd/         # Reverse-mode autograd DAG & MLP trainer
└── BENCHMARKS.md             # Empirical Recall@K, compression & latency tables`,
    implementationGuide: [
      {
        step: "01. Context-Aware Markdown Chunker",
        detail:
          "Split technical notes along heading boundaries while preserving code blocks and attaching `H1 > H2 > H3` breadcrumbs.",
      },
      {
        step: "02. Hybrid BM25 + Vector Retrieval",
        detail:
          "Index chunks in both an inverted BM25 index and a unit-normalized vector table; fuse rankings via Reciprocal Rank Fusion (`k = 60`).",
      },
      {
        step: "03. Citation Grounding Evaluator",
        detail:
          "Verify that every cited `[chunk-id]` in a synthesized response corresponds to a retrieved source passage.",
      },
    ],
    deliverables: [
      "Working prototype of at least one complete engineering lab with automated tests.",
      "Empirical benchmark report comparing baseline vs improved algorithms (e.g., BM25-only vs Vector-only vs Hybrid RRF).",
      "Clear documentation of trade-offs, failure modes, and memory costs.",
    ],
    testing: [
      "Run Recall@3 and MRR evaluation queries on the Hybrid RAG lab.",
      "Verify lossless Unicode round-trip `decode(encode(s)) === s` on the BPE tokenizer.",
    ],
    resources: [
      { name: "pgvector PostgreSQL Extension Docs", url: "https://github.com/pgvector/pgvector" },
      { name: "Docker Get Started Guide", url: "https://docs.docker.com/get-started/" },
      { name: "MDN WebSocket API Guide", url: "https://developer.mozilla.org/en-US/docs/Web/API/WebSocket" },
    ],
    furtherChallenges: [
      "Implement Product Quantization (PQ) or int8 scalar quantization on embedding vectors and measure the Recall@K vs memory compression trade-off.",
    ],
    relatedTaskIds: [
      "vector-cosine-retriever",
      "rag-chunking-evaluator",
      "bpe-tokenizer-from-scratch",
      "mini-autograd-engine",
      "websocket-lab",
    ],
  },
  {
    id: "dev-culture",
    title: "Automated Quality Gates, CI/CD & Property Testing Toolkit",
    tagline:
      "Build a zero-flake engineering workflow: GitHub Actions pipelines, property-based shrinking tests, SemVer resolvers, and PR checklists.",
    discipline: "Algorithms & Developer Tools",
    difficulty: "Intermediate",
    effortHours: "10–15 hours",
    overview:
      "High-velocity software teams rely on automated guardrails rather than manual policing. In this project you build a reusable quality engineering toolkit: deterministic CI workflows, a property-based test generator with counterexample shrinking, and automated repository health checks.",
    prerequisites:
      "Git workflows, TypeScript, and unit testing with Vitest.",
    prerequisiteTaskIds: [
      "first-contribution",
      "review-checklist",
      "github-actions-ci-pipeline",
      "property-based-test-suite",
    ],
    techStack: {
      recommended: ["GitHub Actions", "Vitest", "Playwright", "TypeScript", "ESLint"],
      alternatives: ["GitLab CI", "Dagger / Turborepo"],
    },
    objectives: [
      "Design fast, cached CI pipelines with least-privilege permissions and concurrency cancellation.",
      "Build a seeded property-based test runner that shrinks failing inputs to minimal counterexamples.",
      "Automate documentation link verification and container security policy checks.",
    ],
    architecture:
      "CI Workflow YAML + Property Testing Library (`propcheck.ts`) + Repository Health Auditor CLI (`audit-repo.mjs`).",
    folderStructure: `quality-engineering-toolkit/
├── .github/
│   ├── workflows/ci.yml          # Parallel lint, typecheck, unit & E2E pipeline
│   └── PULL_REQUEST_TEMPLATE.md  # Verification & accessibility checklist
├── src/
│   ├── propcheck.ts              # Seeded PRNG generators & counterexample shrinker
│   └── semver.ts                 # SemVer 2.0.0 parser & range evaluator
└── scripts/
    └── check-links.mjs           # Automated external/internal URL auditor`,
    implementationGuide: [
      {
        step: "01. Deterministic CI Pipeline",
        detail:
          "Configure `.github/workflows/ci.yml` with `npm ci`, Node 22 cache, concurrency cancellation, and Playwright artifact uploads.",
      },
      {
        step: "02. Property-Based Testing Engine",
        detail:
          "Implement `forAll(generator, invariant)` with Mulberry32 seeded PRNG and automatic array/number shrinking.",
      },
      {
        step: "03. Repository & Link Health Auditor",
        detail:
          "Build a script that validates all Markdown links, JSON schemas, and Dockerfile security rules on every commit.",
      },
    ],
    deliverables: [
      "Production-ready `.github/workflows/ci.yml` and PR template.",
      "Seeded property-based test harness with shrinking tests.",
      "Automated repository health and link checker script.",
    ],
    testing: [
      "Inject a deliberate edge-case bug into a sort function and verify the property tester shrinks the failing array to 2 elements.",
    ],
    resources: [
      { name: "Conventional Commits 1.0.0", url: "https://www.conventionalcommits.org" },
      { name: "GitHub Pull Request Review Guide", url: "https://docs.github.com/en/pull-requests" },
      { name: "Vitest Fast Unit Test Runner", url: "https://vitest.dev/" },
    ],
    furtherChallenges: [
      "Add mutation testing (automatically flipping `<` to `<=` or `+` to `-` in source files) to measure whether your test suite catches injected bugs.",
    ],
    relatedTaskIds: [
      "review-checklist",
      "github-actions-ci-pipeline",
      "property-based-test-suite",
      "semver-dependency-resolver",
      "git-bisect-detective",
    ],
  },
  {
    id: "knowledge-base",
    title: "Static-First Technical Documentation & Search Engine",
    tagline:
      "A version-controlled Markdown knowledge base with a custom linter, Prefix Trie autocomplete, and client-side full-text search.",
    discipline: "Web & Full-Stack",
    difficulty: "Intermediate",
    effortHours: "14–18 hours",
    overview:
      "Great engineering documentation lives in Git alongside code, builds statically with zero runtime database dependencies, and offers sub-millisecond search. In this project you build a Markdown documentation compiler, a static link/heading linter, and a Prefix Trie + BM25 search bar.",
    prerequisites:
      "Markdown, TypeScript string processing, and basic tree data structures.",
    prerequisiteTaskIds: ["markdown-linter-cli", "trie-autocomplete-engine", "contributor-guide"],
    techStack: {
      recommended: ["TypeScript", "React 19", "Markdown / MDX", "Prefix Trie + BM25"],
      alternatives: ["Nextra", "Astro Starlight", "Docusaurus"],
    },
    objectives: [
      "Lint Markdown files for broken relative links, skipped heading levels, and missing alt text.",
      "Compile Markdown documents into structured sections with table-of-contents anchors.",
      "Index all headings and paragraphs into a Prefix Trie + inverted index for instant client-side search.",
    ],
    architecture:
      "Markdown Files in Git → Linter & AST Indexer → Static Search Manifest JSON → React Reader UI with Instant Autocomplete.",
    folderStructure: `knowledge-base-engine/
├── content/              # Version-controlled Markdown guides (DSA, Web, Systems)
├── src/
│   ├── linter.ts         # Heading hierarchy & relative link validator
│   ├── trie-index.ts     # Weighted Prefix Trie + BM25 search index
│   └── DocReader.tsx     # Sidebar navigation, TOC & Cmd+K search modal
└── tests/
    └── docs.test.ts      # Zero broken links & search ranking tests`,
    implementationGuide: [
      {
        step: "01. Markdown Static Linter",
        detail:
          "Scan all `.md` files, ignoring fenced code blocks, and report `file:line:col` diagnostics for broken links and heading jumps.",
      },
      {
        step: "02. Search Index & Prefix Trie",
        detail:
          "Extract headings, tags, and paragraphs into a weighted Prefix Trie for instant autocomplete and BM25 snippet ranking.",
      },
      {
        step: "03. Accessible Reader Interface",
        detail:
          "Render clean typography, copyable code blocks, prerequisite badges, and related-guide links.",
      },
    ],
    deliverables: [
      "Markdown linter CLI enforcing zero broken links and valid heading hierarchy.",
      "Client-side Prefix Trie autocomplete and full-text search engine.",
      "Curated set of technical guides with code examples and practice exercises.",
    ],
    testing: [
      "Verify that fenced code blocks containing `# comments` do not trigger false heading warnings.",
      "Assert prefix queries return top-weighted matches in under 1ms.",
    ],
    resources: [
      { name: "Nextra Documentation Framework", url: "https://nextra.site/" },
      { name: "Markdown Guide Official Spec", url: "https://www.markdownguide.org/" },
    ],
    furtherChallenges: [
      "Add interactive runnable code sandboxes or inline algorithm visualizers inside Markdown guides.",
    ],
    relatedTaskIds: [
      "markdown-linter-cli",
      "trie-autocomplete-engine",
      "rag-chunking-evaluator",
      "contributor-guide",
    ],
  },
  {
    id: "mentorship-sprints",
    title: "Open Study-Group & Workshop Playbook Kit",
    tagline:
      "Self-contained workshop blueprints, study-group facilitation guides, and architecture kata templates for peer learning.",
    discipline: "Algorithms & Developer Tools",
    difficulty: "Beginner",
    effortHours: "8–12 hours",
    overview:
      "Anyone in the community should be able to host a high-impact 90-minute coding lab or study group without needing central administration. This project provides ready-to-run workshop kits, starter kata repositories, and peer code-review playbooks.",
    prerequisites:
      "Git fundamentals and enthusiasm for collaborative learning.",
    prerequisiteTaskIds: ["first-contribution", "mentor-handover", "review-checklist"],
    techStack: {
      recommended: ["Markdown", "Git", "TypeScript / Python Starter Katas", "Vitest"],
      alternatives: ["Jupyter Notebooks", "GitHub Classroom Templates"],
    },
    objectives: [
      "Structure a 90-minute technical workshop: 15m concept & invariant, 50m hands-on build, 25m edge-case testing & discussion.",
      "Create starter kata repositories where tests fail initially and guide learners step-by-step toward a working implementation.",
      "Establish constructive, ego-free peer code review habits focused on correctness, accessibility, and clarity.",
    ],
    architecture:
      "Workshop Facilitator Guides + Failing-Test Starter Kata Templates + Self-Check Solution Walkthroughs.",
    folderStructure: `workshop-playbook-kit/
├── workshops/
│   ├── 01-git-and-cli/       # 90-min terminal & branching lab
│   ├── 02-two-pointers-cp/   # Invariant proof + live visualiser lab
│   └── 03-web-security-xss/  # Hands-on sanitization & CSP lab
├── checklists/
│   └── peer-review.md        # Self-review & peer-review rubric
└── HANDOVER.md               # Succession & cohort playbook`,
    implementationGuide: [
      {
        step: "01. Design a Failing-Test Kata",
        detail:
          "Create a starter exercise with clear TypeScript interfaces and 8 unit tests (from basic to edge cases) that learners make green one by one.",
      },
      {
        step: "02. Write the Facilitator Runbook",
        detail:
          "Document timing checkpoints, common misconceptions, and progressive hints so any peer can lead the session.",
      },
      {
        step: "03. Verify Clean-Checkout Experience",
        detail:
          "Test the kata setup on both Windows and macOS/Linux to ensure zero friction during live sessions.",
      },
    ],
    deliverables: [
      "Three 90-minute workshop blueprints with starter katas and test suites.",
      "Peer code-review guide and cohort handover documentation.",
    ],
    testing: [
      "Confirm starter katas install and run tests in under 10 seconds from a clean clone.",
    ],
    resources: [
      {
        name: "Effective Peer Code Review Protocols",
        url: "https://smartbear.com/learn/code-review/best-practices-for-peer-code-review/",
      },
      {
        name: "Write the Docs Guide",
        url: "https://www.writethedocs.org/guide/",
      },
    ],
    furtherChallenges: [
      "Create an interactive browser-based kata runner that executes unit tests directly in a Web Worker.",
    ],
    relatedTaskIds: [
      "mentor-handover",
      "review-checklist",
      "contributor-guide",
      "first-contribution",
    ],
  },
];

export const ENGINEERING_LABS: EngineeringLab[] = [
  {
    id: "lab-wal-storage",
    title: "Lab 01: Bitcask Write-Ahead Log & Crash Recovery Engine",
    domain: "Systems Programming",
    difficulty: "Advanced",
    duration: "8–10 hours",
    summary:
      "Build an append-only binary storage engine with CRC32 frame checksums, O(1) in-memory keydir offset indexing, and torn-write crash recovery.",
    hypothesis:
      "Appending immutable records sequentially to disk while indexing file offsets in RAM achieves O(1) point reads and fast writes without B-Tree page split overhead.",
    prerequisites: "Binary buffers, file descriptors, and hash maps.",
    architectureNotes:
      "Each record is framed as `[CRC32 (4B) | Flags (1B) | KeyLen (4B) | ValLen (4B) | Key | Value]`. Startup scans the log sequentially, verifying CRC32 digests and truncating any incomplete trailing write caused by power loss.",
    experimentSteps: [
      "Implement binary frame serialization and IEEE CRC32 checksum calculation.",
      "Build the in-memory `keydir` mapping `key -> { fileOffset, recordLength }`, performing a single positional `fs.readSync` per `get(key)`.",
      "Inject a simulated crash by writing half a frame at EOF and verify `recover()` detects the checksum mismatch and truncates cleanly.",
      "Implement log compaction that rewrites only live keys to a new segment file and measures disk space reclaimed.",
    ],
    validationChecklist: [
      "Point reads perform exactly 1 positional file read (`O(1)` disk seeks).",
      "Torn writes at EOF are truncated automatically during startup recovery without losing prior committed keys.",
      "Compaction removes overwritten values and tombstone records.",
    ],
    furtherExploration: [
      "Add a Bloom filter in front of disk reads to reject non-existent keys in O(1) RAM checks.",
    ],
    linkedTaskIds: ["wal-append-storage-engine", "lru-cache-ttl-eviction"],
    linkedProjectId: "build-scratch",
    resources: [
      { name: "CMU 15-445 Storage Engines", url: "https://15445.courses.cs.cmu.edu" },
    ],
  },
  {
    id: "lab-bytecode-vm",
    title: "Lab 02: Toy Compiler, Bytecode Emitter & Stack Virtual Machine",
    domain: "Systems Programming",
    difficulty: "Advanced",
    duration: "10–12 hours",
    summary:
      "Design a complete language execution pipeline: lexical scanner, Pratt precedence parser, jump-backpatched bytecode compiler, and bounded-fuel stack VM.",
    hypothesis:
      "Compiling AST nodes into linear bytecode instructions eliminates recursive AST-walking overhead and allows deterministic instruction counting (fuel limits).",
    prerequisites: "Trees, stacks, recursion, and state machines.",
    architectureNotes:
      "Source string → Token stream → AST → Linear `Instruction[]` array (`PUSH`, `LOAD`, `STORE`, `ADD`, `SUB`, `MUL`, `LT`, `JZ`, `JMP`, `HALT`) → Stack VM with `ip` (instruction pointer) and `stack[]`.",
    experimentSteps: [
      "Write a lexer and Pratt parser that correctly binds `1 + 2 * 3` as `1 + (2 * 3)`.",
      "Compile `if/else` and `while` statements using forward jump placeholders and backpatching.",
      "Build a disassembler that prints human-readable bytecode with jump targets.",
      "Execute programs in a stack VM with a configurable `maxInstructions` budget to prevent infinite loops.",
    ],
    validationChecklist: [
      "Operator precedence and parenthesized expressions evaluate accurately.",
      "Iterative loops (`while`) compute factorial(10) and fibonacci(20) accurately.",
      "Infinite `while (true)` loops abort deterministically when instruction fuel reaches 0.",
    ],
    furtherExploration: [
      "Add lexical scopes and call frames (`CALL`, `RET`) for recursive user functions.",
    ],
    linkedTaskIds: ["bytecode-stack-vm", "monotonic-stack-skyline"],
    linkedProjectId: "build-scratch",
    resources: [
      { name: "Crafting Interpreters", url: "https://craftinginterpreters.com" },
    ],
  },
  {
    id: "lab-hybrid-rag",
    title: "Lab 03: Hybrid BM25 + Dense Vector Search with Reciprocal Rank Fusion",
    domain: "AI & Machine Learning",
    difficulty: "Intermediate",
    duration: "6–8 hours",
    summary:
      "Evaluate lexical BM25 search, unit-norm cosine vector retrieval, and Hybrid Reciprocal Rank Fusion (RRF) over technical Markdown documentation.",
    hypothesis:
      "Reciprocal Rank Fusion (`1 / (60 + rank)`) outperforms either pure BM25 or pure vector search across mixed queries containing both exact API identifiers and conceptual questions.",
    prerequisites: "Vectors, dot products, term frequency maps, and TypeScript.",
    architectureNotes:
      "Markdown documents are split along heading boundaries (keeping fenced code blocks intact) with `H1 > H2 > H3` breadcrumb prefixes. Both an inverted BM25 index and an L2-normalized embedding matrix are queried and fused.",
    experimentSteps: [
      "Chunk a corpus of technical guides using the heading-aware AST chunker.",
      "Implement Okapi BM25 (`k1 = 1.5, b = 0.75`) and unit-vector cosine similarity.",
      "Implement Reciprocal Rank Fusion and measure Recall@3 and MRR across 20 test queries.",
      "Run the citation verifier to detect any ungrounded `[chunk-id]` references.",
    ],
    validationChecklist: [
      "Code blocks are never sliced mid-fence during document chunking.",
      "Hybrid RRF achieves higher Mean Reciprocal Rank (MRR) than BM25-only or Vector-only baselines.",
      "Citation verifier catches fabricated chunk IDs 100% of the time.",
    ],
    furtherExploration: [
      "Implement Maximal Marginal Relevance (MMR) to diversify top-K chunks.",
    ],
    linkedTaskIds: ["vector-cosine-retriever", "rag-chunking-evaluator", "trie-autocomplete-engine"],
    linkedProjectId: "engineering-labs",
    resources: [
      { name: "pgvector Vector Similarity Docs", url: "https://github.com/pgvector/pgvector" },
    ],
  },
  {
    id: "lab-bpe-micrograd",
    title: "Lab 04: Subword BPE Tokenizer & Micrograd Autodiff Engine",
    domain: "AI & Machine Learning",
    difficulty: "Advanced",
    duration: "8–10 hours",
    summary:
      "Build the two foundational pillars of modern deep learning from scratch: byte-level Byte-Pair Encoding tokenization and reverse-mode automatic differentiation.",
    hypothesis:
      "Starting BPE from 256 UTF-8 bytes guarantees zero out-of-vocabulary tokens on arbitrary Unicode, and topological reverse-mode autodiff computes exact analytical gradients in a single backward pass.",
    prerequisites: "UTF-8 encoding, directed acyclic graphs, and chain-rule derivatives.",
    architectureNotes:
      "Part A: UTF-8 bytes → Iterative pair frequency counting → Ordered merge table → Subword encoder/decoder. Part B: Scalar `Value` DAG → Topological sort → Reverse chain-rule `.backward()` → MLP training loop.",
    experimentSteps: [
      "Train the BPE tokenizer on source code and prose, measuring compression ratio (bytes per token).",
      "Verify lossless `decode(encode(text)) === text` across ASCII, code symbols, and multi-byte emojis.",
      "Implement `Value` nodes with `add`, `mul`, `pow`, `tanh`, and `relu` backward closures.",
      "Verify analytical gradients against central finite differences `(f(x+h) - f(x-h)) / 2h` and train an XOR classifier.",
    ],
    validationChecklist: [
      "100% lossless Unicode round-trip on the BPE tokenizer.",
      "Autograd analytical gradients match numerical finite differences within `1e-5`.",
      "2-layer MLP converges to < 0.02 loss on the non-linear XOR dataset.",
    ],
    furtherExploration: [
      "Add Adam optimizer momentum/variance state to compare convergence speed against vanilla SGD.",
    ],
    linkedTaskIds: ["bpe-tokenizer-from-scratch", "mini-autograd-engine", "topological-task-scheduler"],
    linkedProjectId: "engineering-labs",
    resources: [
      { name: "OpenAI tiktoken Repository", url: "https://github.com/openai/tiktoken" },
      { name: "Andrej Karpathy micrograd", url: "https://github.com/karpathy/micrograd" },
    ],
  },
  {
    id: "lab-appsec-sandbox",
    title: "Lab 05: Defensive AppSec Lab — XSS Sanitization, JWT Hardening & SSRF Guards",
    domain: "Cybersecurity",
    difficulty: "Intermediate",
    duration: "7–9 hours",
    summary:
      "Exploit and remediate three critical web vulnerability classes: DOM XSS via obfuscated attributes, JWT algorithm confusion, and SSRF against internal CIDR blocks.",
    hypothesis:
      "Blocklist filtering fails against encoding/protocol tricks; only strict allowlist parsing (HTML tag/scheme allowlists, server-bound JWT algorithms, and bitwise CIDR IP validation) provides reliable security.",
    prerequisites: "HTTP headers, URLs, IPv4 CIDR notation, and cryptographic signatures.",
    architectureNotes:
      "Three isolated security gateways (`sanitizeHtml`, `verifyJwt`, `validateOutboundUrl`), each paired with an adversarial red-team test suite attempting 10+ bypass vectors.",
    experimentSteps: [
      "Test naive regex sanitizers against `<img src=x onerror=...>` and `&#106;avascript:` links, then build a strict allowlist sanitizer + nonce CSP builder.",
      "Exploit a naive JWT verifier with `alg: 'none'` and expired claims, then harden it with algorithm pinning and `crypto.timingSafeEqual`.",
      "Convert IPv4 strings (including decimal `2130706433`) into 32-bit integers and block loopback, RFC 1918 private networks, and cloud metadata `169.254.169.254`.",
    ],
    validationChecklist: [
      "All 12 OWASP XSS vectors are neutralized while safe formatting remains intact.",
      "JWT verifier rejects `alg: none`, wrong audience, expired tokens, and 1-byte signature tampering.",
      "SSRF guard blocks `127.0.0.0/8`, `10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`, `169.254.0.0/16`, and `::1`.",
    ],
    furtherExploration: [
      "Combine with Ed25519 asymmetric credential signing for zero-shared-secret verification.",
    ],
    linkedTaskIds: [
      "csp-xss-defense-lab",
      "jwt-signature-auditor",
      "ssrf-url-validator",
      "cryptographic-uuid-cert-verifier",
    ],
    linkedProjectId: "certs-system",
    resources: [
      { name: "OWASP Cheat Sheet Series", url: "https://cheatsheetseries.owasp.org/" },
      { name: "RFC 8725 — JWT Best Practices", url: "https://datatracker.ietf.org/doc/html/rfc8725" },
    ],
  },
  {
    id: "lab-network-protocols",
    title: "Lab 06: Wire Protocols & Backpressure — HTTP/1.1, DNS RFC 1035 & WebSockets",
    domain: "Networking & Distributed",
    difficulty: "Advanced",
    duration: "9–12 hours",
    summary:
      "Implement binary and text wire protocols from raw byte buffers and test reconnection catchup and bounded-queue backpressure.",
    hypothesis:
      "Explicit state machines with bounded queues and sequence-number replay handle packet fragmentation, pointer-compression attacks, and network drops deterministically.",
    prerequisites: "TCP/UDP sockets, binary `DataView` / `Uint8Array`, and async streams.",
    architectureNotes:
      "Includes the incremental TCP HTTP/1.1 parser, the binary RFC 1035 DNS packet encoder/decoder with `0xC0` pointer loop detection, and the sequence-numbered WebSocket catchup server.",
    experimentSteps: [
      "Feed arbitrarily chunked byte buffers into the HTTP/1.1 parser and verify pipelined request parsing.",
      "Encode and decode binary DNS packets, testing `0xC0` compression pointers and circular pointer loop defenses.",
      "Simulate mid-stream WebSocket disconnections and verify gapless message catchup from `lastSeenSeq`.",
    ],
    validationChecklist: [
      "HTTP parser handles 3-byte TCP fragments and enforces max header size limits.",
      "DNS decoder extracts compressed domain labels and aborts circular pointer loops in O(1).",
      "WebSocket client reconnects with jittered backoff and recovers all missed broadcasts.",
    ],
    furtherExploration: [
      "Add AIMD adaptive concurrency control to the bounded worker pool.",
    ],
    linkedTaskIds: [
      "http11-socket-parser",
      "dns-packet-decoder",
      "websocket-lab",
      "tcp-backpressure-proxy",
    ],
    linkedProjectId: "build-scratch",
    resources: [
      { name: "RFC 9112 — HTTP/1.1", url: "https://datatracker.ietf.org/doc/html/rfc9112" },
      { name: "RFC 1035 — DNS Specification", url: "https://datatracker.ietf.org/doc/html/rfc1035" },
    ],
  },
  {
    id: "lab-perf-benchmarking",
    title: "Lab 07: Empirical Algorithm & UI Performance Benchmarking Lab",
    domain: "Performance & Benchmarking",
    difficulty: "Intermediate",
    duration: "6–8 hours",
    summary:
      "Measure theoretical Big-O predictions against empirical wall-clock latencies across sorting distributions, SQL index plans, and 100k-row DOM virtualization.",
    hypothesis:
      "Cache locality, branch prediction, and DOM layout reflows dominate real-world latency; small-N Insertion Sort beats Merge Sort, composite keyset indexes beat OFFSET by 100x, and DOM windowing keeps 100k-row scroll frame times under 16ms.",
    prerequisites: "Sorting algorithms, SQL indexing, and browser rendering basics.",
    architectureNotes:
      "Warm-up trials + seeded PRNG input generators + operation counters (`comparisons`, `swaps`, `mountedDomNodes`, `sqlRowsScanned`) + median/p95 statistical aggregator.",
    experimentSteps: [
      "Run the sorting benchmark across Random, Sorted, Reversed, and Duplicate distributions for `N = 100..10,000`.",
      "Compare `OFFSET 50000` vs composite keyset cursor `(created_at, id) < (?, ?)` query plans.",
      "Measure mounted DOM node counts and render times in the 100,000-row virtualized log viewer.",
    ],
    validationChecklist: [
      "Every benchmark clones inputs per trial and runs warm-up iterations before timing.",
      "Reports both hardware-independent operation counts and median/p95 wall-clock milliseconds.",
    ],
    furtherExploration: [
      "Benchmark typed arrays (`Int32Array`) vs boxed JavaScript number arrays.",
    ],
    linkedTaskIds: [
      "benchmark-sort",
      "virtualized-log-viewer",
      "cursor-pagination-api",
      "sql-query-optimizer",
    ],
    linkedProjectId: "analytics-engine",
    resources: [
      { name: "Node.js Performance Hooks", url: "https://nodejs.org/api/perf_hooks.html" },
      { name: "Use The Index, Luke", url: "https://use-the-index-luke.com/" },
    ],
  },
  {
    id: "lab-open-source-tooling",
    title: "Lab 08: Property-Based Shrinking, Git Merkle Internals & Static Analysis",
    domain: "Open-Source Tooling",
    difficulty: "Intermediate",
    duration: "7–9 hours",
    summary:
      "Build developer tools that make other engineers faster: a QuickCheck-style property shrinker, a Markdown AST linter, and a content-addressed Git store.",
    hypothesis:
      "Randomized property testing with counterexample shrinking uncovers boundary bugs missed by hand-written unit tests and reduces failing inputs to minimal 2-element reproductions.",
    prerequisites: "TypeScript generics, recursion, and CLI tooling.",
    architectureNotes:
      "Seeded Mulberry32 generator combinators + Shrink tree search + Stateful line/fence lexer for Markdown analysis.",
    experimentSteps: [
      "Build `genInt`, `genArray`, and `genString` combinators driven by a deterministic PRNG seed.",
      "Implement recursive counterexample shrinking and test it against a deliberately buggy sorting or binary-search function.",
      "Run the Markdown static linter across the repository `docs/` directory.",
    ],
    validationChecklist: [
      "Failing property runs print the exact replay seed and shrunk minimal input.",
      "Markdown linter reports exact `file:line:col` locations without false positives inside code blocks.",
    ],
    furtherExploration: [
      "Add stateful command-sequence shrinking to test `LRUCache` and `DisjointSet` operations.",
    ],
    linkedTaskIds: [
      "property-based-test-suite",
      "markdown-linter-cli",
      "content-addressed-blob-store",
      "semver-dependency-resolver",
    ],
    linkedProjectId: "dev-culture",
    resources: [
      { name: "Vitest Testing Guide", url: "https://vitest.dev/" },
      { name: "Write Yourself a Git", url: "https://wyag.thb.lt" },
    ],
  },
];

export const CURRICULUM_MODULES: CurriculumModule[] = [
  {
    id: "mod-foundations",
    number: "01",
    title: "Programming Fundamentals & the Command Line",
    category: "Developer Foundations",
    difficulty: "Beginner",
    summary:
      "Variables, control flow, pure functions, data representation, streams, and navigating the POSIX/PowerShell command line with confidence.",
    prerequisites: "No prior experience required.",
    mentalModels: [
      "Programs are data pipelines: parse untrusted input at the boundary, transform immutable data structures in pure functions, and perform side effects (disk/network) at the edges.",
      "Streams process gigabytes of data in constant O(1) memory by handling one chunk or line at a time.",
    ],
    objectives: [
      "Write modular scripts in JavaScript/TypeScript with clear separation between pure logic and I/O.",
      "Handle missing files, malformed JSON, and invalid CLI flags with informative exit codes.",
      "Process multi-megabyte NDJSON logs using async iterators without exhausting RAM.",
    ],
    roadmapSteps: [
      "Master primitive types, arrays, maps, closures, and synchronous vs asynchronous execution.",
      "Build a command-line task manager that persists JSON atomically.",
      "Build a streaming NDJSON log aggregator and a SemVer version range parser.",
    ],
    taskIds: [
      "cli-task-manager",
      "json-stream-aggregator",
      "semver-dependency-resolver",
      "markdown-linter-cli",
    ],
    projectIds: ["junior-path"],
    resources: [
      { name: "Harvard CS50x Introduction to CS", url: "https://cs50.harvard.edu/x/" },
      { name: "The Modern JavaScript Tutorial", url: "https://javascript.info" },
    ],
  },
  {
    id: "mod-git",
    number: "02",
    title: "Git Internals, Version Control & Open-Source Workflows",
    category: "Developer Foundations",
    difficulty: "Beginner",
    summary:
      "Branching, atomic commits, pull requests, binary-searching regressions with `git bisect`, and how Git stores content-addressed Merkle trees.",
    prerequisites: "Basic command-line navigation.",
    mentalModels: [
      "Git is not a chain of diffs — every commit points to a complete, content-addressed Merkle tree snapshot of your files where identical blobs are stored once by SHA digest.",
      "Small, atomic commits with clear reasons make `git bisect` and `git revert` effortless.",
    ],
    objectives: [
      "Execute clean branch, stage, diff, commit, rebase, and pull request workflows.",
      "Use automated `git bisect run` to isolate a regression across dozens of commits in O(log N) steps.",
      "Implement a Git-style content-addressed blob and tree object store from scratch.",
    ],
    roadmapSteps: [
      "Make a clean, verified documentation improvement on a feature branch.",
      "Use `git bisect` with a test script to pinpoint a historical regression.",
      "Build a content-addressed Merkle object store supporting `hash-object`, `write-tree`, and `commit-tree`.",
    ],
    taskIds: [
      "first-contribution",
      "git-bisect-detective",
      "contributor-guide",
      "content-addressed-blob-store",
    ],
    projectIds: ["junior-path", "build-scratch"],
    resources: [
      { name: "Pro Git Book (Full Edition)", url: "https://git-scm.com/book/en/v2" },
      { name: "Write Yourself a Git", url: "https://wyag.thb.lt" },
    ],
  },
  {
    id: "mod-dsa",
    number: "03",
    title: "Data Structures, Algorithms & Complexity Analysis",
    category: "Competitive Programming",
    difficulty: "Intermediate",
    summary:
      "Asymptotic complexity, loop invariants, two pointers, sliding windows, binary search, monotonic stacks, graphs, dynamic programming, and segment trees.",
    prerequisites: "Arrays, loops, recursion, and basic algebra.",
    mentalModels: [
      "Every optimization replaces redundant work with an invariant: sorted order enables O(log N) Binary Search and O(N) Two Pointers; associativity enables Prefix Sums and Segment Trees.",
      "Amortized analysis counts how many times each element can enter and leave a data structure (e.g., Monotonic Stack and Sliding Window Deque are O(N) because each element is pushed once and popped once).",
    ],
    objectives: [
      "Map input constraints (`N <= 20` vs `N <= 10^5`) immediately to target time complexities.",
      "Implement and test sorting, binary search, two pointers, sliding windows, and prefix sums.",
      "Implement graphs (BFS, DFS, Dijkstra, DSU, Topological Sort), tries, DP, and lazy segment trees.",
    ],
    roadmapSteps: [
      "Explore sorting, binary search, two pointers, and sliding windows in the interactive visualiser.",
      "Solve two-pointer, prefix-sum, and monotonic-stack exercises with written complexity proofs.",
      "Build Dijkstra, Disjoint Set Union, Topological Sort, Prefix Tries, 0/1 Knapsack, and Lazy Segment Trees.",
    ],
    taskIds: [
      "cp-pattern-notes",
      "binary-search-tests",
      "sliding-window-rate-counter",
      "monotonic-stack-skyline",
      "prefix-sum-2d-matrix",
      "dijkstra-route-planner",
      "dsu-network-connectivity",
      "topological-task-scheduler",
      "trie-autocomplete-engine",
      "knapsack-resource-allocator",
      "segment-tree-range-queries",
    ],
    projectIds: ["algo-visualizer", "dsa-bank"],
    resources: [
      { name: "USACO Guide Curated Curriculum", url: "https://usaco.guide/" },
      { name: "CP-Algorithms Encyclopedia", url: "https://cp-algorithms.com/" },
      { name: "CSES Problem Set", url: "https://cses.fi/problemset/" },
    ],
  },
  {
    id: "mod-web",
    number: "04",
    title: "Web Development, React Architecture & Accessible UI",
    category: "Software Development",
    difficulty: "Beginner",
    summary:
      "Semantic HTML, fluid CSS Grid & Container Queries, DOM events, React component design, keyboard accessibility, optimistic updates, and DOM virtualization.",
    prerequisites: "JavaScript fundamentals.",
    mentalModels: [
      "UI is a pure function of state: derive filtered/sorted views during render rather than synchronizing duplicate state copies in `useEffect`.",
      "Accessibility is engineering quality: semantic landmarks, explicit `<label>` bindings, keyboard focus management, and `aria-live` status regions make apps usable by everyone and testable by Playwright.",
    ],
    objectives: [
      "Build responsive layouts with CSS Grid that work from 320px mobile to 1440px desktop without horizontal scroll.",
      "Build filterable React catalogs, `Cmd+K` command palettes, and optimistic Kanban boards with rollback.",
      "Render 100,000 rows at 60 FPS using viewport windowing (virtualization).",
    ],
    roadmapSteps: [
      "Build your responsive semantic developer profile with resilient `fetch` error states.",
      "Build the React searchable problem bank and type-safe runtime form schema validator.",
      "Implement the keyboard-driven command palette, optimistic Kanban board, and 100k-row virtual list.",
    ],
    taskIds: [
      "developer-profile",
      "css-grid-dashboard-layout",
      "problem-bank-ui",
      "form-schema-validator",
      "accessible-command-palette",
      "optimistic-kanban-board",
      "virtualized-log-viewer",
    ],
    projectIds: ["junior-path", "core-platform"],
    resources: [
      { name: "MDN Learn Web Development", url: "https://developer.mozilla.org/en-US/docs/Learn" },
      { name: "React Official Documentation", url: "https://react.dev/learn" },
      { name: "WAI-ARIA Authoring Practices Guide", url: "https://www.w3.org/WAI/ARIA/apg/" },
    ],
  },
  {
    id: "mod-databases",
    number: "05",
    title: "Relational Databases, SQL Optimization & API Design",
    category: "Software Development",
    difficulty: "Intermediate",
    summary:
      "3NF schema design, foreign keys, B-Tree composite indexing, cursor pagination, N+1 query elimination, ACID double-entry transactions, and idempotent webhooks.",
    prerequisites: "Basic HTTP concepts and introductory SQL.",
    mentalModels: [
      "Application code changes every week, while database state lives for years — enforce integrity (`FOREIGN KEY`, `UNIQUE`, `CHECK`, `NOT NULL`) in the database schema, not just in UI forms.",
      "An index is a sorted B-Tree: composite index column order `(created_at DESC, id DESC)` must match your `WHERE` and `ORDER BY` clauses to avoid full table scans.",
    ],
    objectives: [
      "Design normalized relational schemas and REST APIs with boundary validation.",
      "Replace `OFFSET` with O(log N) keyset cursor pagination and eliminate N+1 query loops.",
      "Guarantee race-free ACID balance transfers and exactly-once idempotent webhook processing.",
    ],
    roadmapSteps: [
      "Design the project tracker ER schema, SQL migrations, and validated CRUD handlers.",
      "Implement composite keyset pagination and optimize N+1 reporting queries using `EXPLAIN`.",
      "Build the double-entry ACID ledger transfer engine and HMAC idempotent webhook processor.",
    ],
    taskIds: [
      "api-data-model",
      "cursor-pagination-api",
      "sql-query-optimizer",
      "acid-ledger-transactions",
      "idempotent-webhook-processor",
      "token-bucket-rate-limiter",
    ],
    projectIds: ["core-platform", "analytics-engine"],
    resources: [
      { name: "SQLBolt Interactive Lessons", url: "https://sqlbolt.com/" },
      { name: "Use The Index, Luke — SQL Indexing Guide", url: "https://use-the-index-luke.com/" },
      { name: "PostgreSQL Documentation", url: "https://www.postgresql.org/docs/current/" },
    ],
  },
  {
    id: "mod-os-systems",
    number: "06",
    title: "Operating Systems, Memory, Storage Engines & Compilers",
    category: "Engineering Experiments",
    difficulty: "Advanced",
    summary:
      "Process memory, buffer pools (O(1) LRU+TTL), append-only Write-Ahead Logs (WAL), crash recovery, bounded concurrency pools, and bytecode virtual machines.",
    prerequisites: "Data structures, binary buffers, and asynchronous programming.",
    mentalModels: [
      "Random disk I/O is slow; sequential append is fast. Write-Ahead Logs (WAL) achieve both durability and speed by appending immutable checksummed frames sequentially.",
      "Unbounded queues turn temporary downstream slowdowns into Out-Of-Memory crashes; always enforce bounded concurrency and explicit load-shedding backpressure.",
    ],
    objectives: [
      "Implement an O(1) Doubly-Linked-List LRU cache with lazy TTL eviction.",
      "Build a crash-resilient binary Write-Ahead Log key-value storage engine with compaction.",
      "Build a bounded-concurrency worker pool and a complete Lexer → Parser → Bytecode Stack VM.",
    ],
    roadmapSteps: [
      "Implement the O(1) LRU + TTL cache and the bounded concurrency worker pool.",
      "Build the Bitcask-style binary WAL storage engine with CRC32 crash recovery.",
      "Build the toy compiler and bytecode stack virtual machine.",
    ],
    taskIds: [
      "lru-cache-ttl-eviction",
      "tcp-backpressure-proxy",
      "wal-append-storage-engine",
      "bytecode-stack-vm",
      "benchmark-sort",
    ],
    projectIds: ["build-scratch", "analytics-engine"],
    resources: [
      { name: "Operating Systems: Three Easy Pieces (OSTEP)", url: "https://pages.cs.wisc.edu/~remzi/OSTEP/" },
      { name: "CMU 15-445 Database Systems", url: "https://15445.courses.cs.cmu.edu" },
      { name: "Crafting Interpreters", url: "https://craftinginterpreters.com" },
    ],
  },
  {
    id: "mod-networking",
    number: "07",
    title: "Computer Networking, Sockets & Wire Protocols",
    category: "Engineering Experiments",
    difficulty: "Advanced",
    summary:
      "TCP byte-stream framing, HTTP/1.1 keep-alive parsing, RFC 1035 binary DNS packets, WebSocket heartbeats, exponential backoff with jitter, and circuit breakers.",
    prerequisites: "Async I/O, binary byte arrays, and basic client-server concepts.",
    mentalModels: [
      "TCP is a continuous byte stream, not a message queue: a single `data` event may hold half a header or three pipelined requests.",
      "When a server restarts, synchronized client retries create a thundering herd; exponential backoff with full random jitter spreads reconnection load evenly.",
    ],
    objectives: [
      "Parse HTTP/1.1 requests and bodies directly over raw TCP sockets.",
      "Encode and decode binary RFC 1035 DNS packets with pointer-compression loop protection.",
      "Build a resilient WebSocket broadcast protocol with sequence-number replay on reconnect.",
    ],
    roadmapSteps: [
      "Build the incremental HTTP/1.1 parser over `node:net`.",
      "Implement the binary RFC 1035 DNS packet encoder and decoder.",
      "Implement the WebSocket announcement lab with jittered backoff and missed-message catchup.",
    ],
    taskIds: [
      "http11-socket-parser",
      "dns-packet-decoder",
      "websocket-lab",
      "token-bucket-rate-limiter",
      "ssrf-url-validator",
    ],
    projectIds: ["build-scratch", "cp-leaderboard"],
    resources: [
      { name: "RFC 9112 — HTTP/1.1 Specification", url: "https://datatracker.ietf.org/doc/html/rfc9112" },
      { name: "RFC 1035 — Domain Names (DNS)", url: "https://datatracker.ietf.org/doc/html/rfc1035" },
      { name: "MDN WebSockets API", url: "https://developer.mozilla.org/en-US/docs/Web/API/WebSocket" },
    ],
  },
  {
    id: "mod-software-eng",
    number: "08",
    title: "Software Engineering, Testing, Docker & CI/CD",
    category: "Software Development",
    difficulty: "Intermediate",
    summary:
      "Unit and E2E testing, property-based testing with shrinking, multi-stage Docker containerization, GitHub Actions CI pipelines, and high-signal code reviews.",
    prerequisites: "Git basics and running tests locally.",
    mentalModels: [
      "Example tests prove code works on 3 chosen inputs; property-based tests verify universal invariants across thousands of generated edge cases.",
      "CI pipelines and Dockerfiles should be deterministic (`npm ci`, pinned base images, layer-cached lockfiles, non-root runtime users).",
    ],
    objectives: [
      "Write deterministic unit tests (Vitest), E2E journeys (Playwright), and property-based shrinkers.",
      "Containerize applications using hardened multi-stage Dockerfiles running as non-root users.",
      "Configure fast GitHub Actions workflows and actionable peer review checklists.",
    ],
    roadmapSteps: [
      "Author the newcomer contribution guide, review checklist, and mentorship handover runbook.",
      "Configure the GitHub Actions CI pipeline and hardened multi-stage Dockerfile.",
      "Build the property-based testing and counterexample shrinking harness.",
    ],
    taskIds: [
      "contributor-guide",
      "review-checklist",
      "mentor-handover",
      "github-actions-ci-pipeline",
      "multi-stage-docker-build",
      "property-based-test-suite",
    ],
    projectIds: ["dev-culture", "mentorship-sprints"],
    resources: [
      { name: "Vitest Documentation", url: "https://vitest.dev/" },
      { name: "Playwright End-to-End Testing", url: "https://playwright.dev/" },
      { name: "Docker Multi-Stage Build Guide", url: "https://docs.docker.com/build/building/multi-stage/" },
    ],
  },
  {
    id: "mod-ai-ml",
    number: "09",
    title: "AI/ML Engineering, Tokenizers, Autodiff & RAG Systems",
    category: "Engineering Experiments",
    difficulty: "Advanced",
    summary:
      "Byte-Pair Encoding (BPE) subword tokenizers, reverse-mode automatic differentiation (Micrograd), hybrid BM25 + dense vector search, RRF fusion, and citation verification.",
    prerequisites: "Linear algebra basics (dot products), trees/DAGs, and TypeScript or Python.",
    mentalModels: [
      "LLMs see integer subword token IDs, not characters; understanding BPE merges explains tokenization artifacts and context-window budgets.",
      "Production RAG is an information-retrieval engineering problem: structure-aware chunking + hybrid lexical/vector fusion (RRF) + strict citation grounding beats naive prompt stuffing.",
    ],
    objectives: [
      "Implement a lossless UTF-8 Byte-Pair Encoding (BPE) tokenizer from scratch.",
      "Build a reverse-mode scalar autograd engine (`Value`) and train a neural network on XOR.",
      "Build a context-aware Markdown chunker, Hybrid BM25 + Vector retriever, and citation verifier.",
    ],
    roadmapSteps: [
      "Build the heading-aware Markdown RAG chunker and citation grounding verifier.",
      "Implement Hybrid BM25 + Cosine Vector search with Reciprocal Rank Fusion and Recall@K benchmarks.",
      "Implement the BPE subword tokenizer and Micrograd reverse-mode autodiff engine.",
    ],
    taskIds: [
      "vector-cosine-retriever",
      "rag-chunking-evaluator",
      "bpe-tokenizer-from-scratch",
      "mini-autograd-engine",
    ],
    projectIds: ["engineering-labs", "knowledge-base"],
    resources: [
      { name: "Andrej Karpathy — Neural Networks: Zero to Hero", url: "https://karpathy.ai/zero-to-hero.html" },
      { name: "OpenAI tiktoken BPE Tokenizer", url: "https://github.com/openai/tiktoken" },
      { name: "pgvector Vector Similarity Search", url: "https://github.com/pgvector/pgvector" },
    ],
  },
  {
    id: "mod-cybersecurity",
    number: "10",
    title: "Cybersecurity, Cryptography & Defensive Application Security",
    category: "Engineering Experiments",
    difficulty: "Intermediate",
    summary:
      "Ed25519 digital signatures, constant-time HMAC verification, JWT hardening, allowlist XSS sanitization, Content Security Policy (CSP), and SSRF network guards.",
    prerequisites: "Web fundamentals, HTTP headers, and basic networking.",
    mentalModels: [
      "Never use blocklists where allowlists are possible: permit only known-safe HTML tags, explicit `https:` / `mailto:` URL schemes, pinned JWT signature algorithms, and public routable IP ranges.",
      "Compare cryptographic MACs using constant-time `crypto.timingSafeEqual` so response latency never leaks signature bytes.",
    ],
    objectives: [
      "Sign and verify tamper-evident digital credentials with Ed25519 and CSPRNG UUIDv4.",
      "Harden JWT verifiers against `alg: none`, algorithm confusion, and claim expiration bypasses.",
      "Neutralize OWASP DOM XSS payloads and block SSRF requests targeting private CIDR networks and cloud metadata.",
    ],
    roadmapSteps: [
      "Build the allowlist HTML/URL sanitizer and CSP header generator.",
      "Audit and harden the JWT verifier and idempotent HMAC webhook receiver.",
      "Build the Ed25519 credential signer/verifier and the SSRF CIDR outbound validator.",
    ],
    taskIds: [
      "csp-xss-defense-lab",
      "jwt-signature-auditor",
      "cryptographic-uuid-cert-verifier",
      "ssrf-url-validator",
      "idempotent-webhook-processor",
    ],
    projectIds: ["certs-system"],
    resources: [
      { name: "OWASP Top 10 & Cheat Sheet Series", url: "https://cheatsheetseries.owasp.org/" },
      { name: "MDN Content Security Policy (CSP)", url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP" },
      { name: "W3C Web Cryptography API", url: "https://www.w3.org/TR/WebCryptoAPI/" },
    ],
  },
];

export const CP_PROBLEMS: CPProblem[] = [
  // Fundamentals & Complexity
  {
    id: "cf-4a",
    title: "Watermelon",
    topic: "Fundamentals",
    pattern: "Parity & Edge Case Check",
    difficulty: "Beginner",
    complexity: "O(1) time · O(1) space",
    insight:
      "An even weight w can be split into two positive even parts iff w is even AND w > 2 (since 2 = 1 + 1 is odd).",
    platform: "Codeforces",
    url: "https://codeforces.com/problemset/problem/4/A",
  },
  {
    id: "cses-1068",
    title: "Weird Algorithm",
    topic: "Fundamentals",
    pattern: "Simulation & 64-bit Overflow",
    difficulty: "Beginner",
    complexity: "O(steps) time · O(1) space",
    insight:
      "Intermediate values in 3n + 1 can exceed 32-bit signed integer limits even when starting from n <= 10^6; always use 64-bit integers (long long / BigInt).",
    platform: "CSES",
    url: "https://cses.fi/problemset/task/1068",
  },
  {
    id: "cses-1083",
    title: "Missing Number",
    topic: "Fundamentals",
    pattern: "Gauss Sum / XOR Invariant",
    difficulty: "Beginner",
    complexity: "O(n) time · O(1) space",
    insight:
      "Subtract the sum of the given n-1 numbers from n*(n+1)/2 (using 64-bit arithmetic), or XOR all indices 1..n with all input values.",
    platform: "CSES",
    url: "https://cses.fi/problemset/task/1083",
  },
  {
    id: "cses-1069",
    title: "Repetitions",
    topic: "Arrays and strings",
    pattern: "Single-Pass Run-Length Scan",
    difficulty: "Beginner",
    complexity: "O(n) time · O(1) space",
    insight:
      "Track the length of the current contiguous identical character run, resetting to 1 whenever s[i] !== s[i-1].",
    platform: "CSES",
    url: "https://cses.fi/problemset/task/1069",
  },
  {
    id: "cses-1094",
    title: "Increasing Array",
    topic: "Arrays and strings",
    pattern: "Running Prefix Maximum",
    difficulty: "Beginner",
    complexity: "O(n) time · O(1) space",
    insight:
      "Each element must be raised to at least the maximum value seen to its left; accumulate max(0, prevMax - a[i]).",
    platform: "CSES",
    url: "https://cses.fi/problemset/task/1094",
  },
  // Hashing
  {
    id: "cses-1621",
    title: "Distinct Numbers",
    topic: "Hashing",
    pattern: "Sorting vs Hash Set Collisions",
    difficulty: "Beginner",
    complexity: "O(n log n) time · O(1) space",
    insight:
      "Sorting the array and counting adjacent inequalities a[i] !== a[i-1] avoids adversarial anti-hash tests that trigger O(n²) collisions on unordered_set.",
    platform: "CSES",
    url: "https://cses.fi/problemset/task/1621",
  },
  {
    id: "lc-49",
    title: "Group Anagrams",
    topic: "Hashing",
    pattern: "Canonical Frequency Key",
    difficulty: "Beginner",
    complexity: "O(n · k) time · O(n · k) space",
    insight:
      "Map each word to its canonical sorted string or 26-letter frequency signature so all anagrams collide into the same hash bucket.",
    platform: "LeetCode",
    url: "https://leetcode.com/problems/group-anagrams/",
  },
  // Two pointers and sliding window
  {
    id: "cses-1640",
    title: "Sum of Two Values",
    topic: "Two pointers",
    pattern: "Inward Two Pointers on Sorted Pairs",
    difficulty: "Intermediate",
    complexity: "O(n log n) time · O(n) space",
    insight:
      "Pair each value with its 1-based original index, sort by value, and move L++ when sum < x or R-- when sum > x.",
    platform: "CSES",
    url: "https://cses.fi/problemset/task/1640",
    relatedTaskId: "cp-pattern-notes",
  },
  {
    id: "cses-1641",
    title: "Sum of Three Values",
    topic: "Two pointers",
    pattern: "Fix One + Inward Two Pointers",
    difficulty: "Intermediate",
    complexity: "O(n²) time · O(n) space",
    insight:
      "Sort (value, index) pairs; outer loop fixes i from 0..n-3, and inner L=i+1, R=n-1 searches for x - a[i] in O(n).",
    platform: "CSES",
    url: "https://cses.fi/problemset/task/1641",
    relatedTaskId: "cp-pattern-notes",
  },
  {
    id: "cses-1141",
    title: "Playlist",
    topic: "Two pointers",
    pattern: "Variable Sliding Window + Last Seen Map",
    difficulty: "Intermediate",
    complexity: "O(n log n) time · O(n) space",
    insight:
      "Maintain window [L, R] of unique song IDs; when song[R] was last seen at index idx >= L, jump L directly to idx + 1.",
    platform: "CSES",
    url: "https://cses.fi/problemset/task/1141",
    relatedTaskId: "sliding-window-rate-counter",
  },
  {
    id: "cf-279b",
    title: "Books",
    topic: "Two pointers",
    pattern: "Sliding Window Maximum Length <= T",
    difficulty: "Intermediate",
    complexity: "O(n) time · O(1) space",
    insight:
      "Since book reading times are non-negative, expand R and increment L while windowSum > freeMinutes.",
    platform: "Codeforces",
    url: "https://codeforces.com/problemset/problem/279/B",
    relatedTaskId: "sliding-window-rate-counter",
  },
  // Prefix sums
  {
    id: "cses-1646",
    title: "Static Range Sum Queries",
    topic: "Prefix sums",
    pattern: "1D Prefix Sum Array",
    difficulty: "Intermediate",
    complexity: "O(n + q) time · O(n) space",
    insight:
      "Precompute P[i] = P[i-1] + a[i] with P[0] = 0; each range sum [a, b] is answered in O(1) as P[b] - P[a-1].",
    platform: "CSES",
    url: "https://cses.fi/problemset/task/1646",
    relatedTaskId: "prefix-sum-2d-matrix",
  },
  {
    id: "cses-1661",
    title: "Subarray Sums II",
    topic: "Prefix sums",
    pattern: "Prefix Sum + Hash Map Frequency",
    difficulty: "Intermediate",
    complexity: "O(n log n) time · O(n) space",
    insight:
      "Subarray (L, R] sums to X iff P[R] - P[L] == X, which rearranges to P[L] == P[R] - X. Count how many prior prefix sums equal currentPrefix - X.",
    platform: "CSES",
    url: "https://cses.fi/problemset/task/1661",
  },
  {
    id: "cses-1652",
    title: "Forest Queries",
    topic: "Prefix sums",
    pattern: "2D Inclusion-Exclusion Prefix Matrix",
    difficulty: "Intermediate",
    complexity: "O(n² + q) time · O(n²) space",
    insight:
      "Use P[r2][c2] - P[r1-1][c2] - P[r2][c1-1] + P[r1-1][c1-1] to count trees in any subrectangle in O(1).",
    platform: "CSES",
    url: "https://cses.fi/problemset/task/1652",
    relatedTaskId: "prefix-sum-2d-matrix",
  },
  // Binary Search
  {
    id: "cses-1620",
    title: "Factory Machines",
    topic: "Binary search",
    pattern: "Binary Search on the Answer (Monotonic Predicate)",
    difficulty: "Intermediate",
    complexity: "O(n log(maxTime)) time · O(1) space",
    insight:
      "In time T, machine i produces floor(T / k[i]) items. Since total production is monotonic in T, binary search the minimum T where sum(floor(T / k[i])) >= target.",
    platform: "CSES",
    url: "https://cses.fi/problemset/task/1620",
    relatedTaskId: "binary-search-tests",
  },
  {
    id: "cses-1085",
    title: "Array Division",
    topic: "Binary search",
    pattern: "Min-Max Partition via Binary Search",
    difficulty: "Intermediate",
    complexity: "O(n log(sum)) time · O(1) space",
    insight:
      "Binary search the maximum allowed subarray sum M in [max(a), sum(a)], greedily checking if the array can be split into <= k subarrays each summing to <= M.",
    platform: "CSES",
    url: "https://cses.fi/problemset/task/1085",
    relatedTaskId: "binary-search-tests",
  },
  // Recursion & Backtracking
  {
    id: "cses-1623",
    title: "Apple Division",
    topic: "Recursion and backtracking",
    pattern: "Subset Generation / Bitmask Enumeration",
    difficulty: "Beginner",
    complexity: "O(2^n) time · O(n) space",
    insight:
      "With n <= 20, 2^20 = 1,048,576 subsets easily fit in the 1-second limit; recurse on index i choosing either pile A or pile B.",
    platform: "CSES",
    url: "https://cses.fi/problemset/task/1623",
  },
  {
    id: "cses-1624",
    title: "Chessboard and Queens",
    topic: "Recursion and backtracking",
    pattern: "Row-by-Row Backtracking with Diagonal Bitsets",
    difficulty: "Intermediate",
    complexity: "O(N!) pruned · O(N) space",
    insight:
      "Place one queen per row r and track occupied columns col[c], main diagonals diag1[r - c + 7], and anti-diagonals diag2[r + c] in O(1).",
    platform: "CSES",
    url: "https://cses.fi/problemset/task/1624",
  },
  // Stacks, Queues & Linked Lists
  {
    id: "cses-1645",
    title: "Nearest Smaller Values",
    topic: "Stacks, queues and linked lists",
    pattern: "Monotonic Increasing Stack",
    difficulty: "Intermediate",
    complexity: "O(n) time · O(n) space",
    insight:
      "Pop stack elements >= a[i] because a[i] is both smaller and further right, making popped elements permanently redundant for future indices.",
    platform: "CSES",
    url: "https://cses.fi/problemset/task/1645",
    relatedTaskId: "monotonic-stack-skyline",
  },
  {
    id: "cses-1142",
    title: "Advertisement",
    topic: "Stacks, queues and linked lists",
    pattern: "Largest Rectangle in Histogram",
    difficulty: "Advanced",
    complexity: "O(n) time · O(n) space",
    insight:
      "Use a monotonic stack to find for each board i the first smaller board to its left and right; max area is max(h[i] * (R[i] - L[i] - 1)).",
    platform: "CSES",
    url: "https://cses.fi/problemset/task/1142",
    relatedTaskId: "monotonic-stack-skyline",
  },
  // Trees and Heaps
  {
    id: "cses-1674",
    title: "Subordinates",
    topic: "Trees and heaps",
    pattern: "Subtree Size DFS Aggregation",
    difficulty: "Intermediate",
    complexity: "O(n) time · O(n) space",
    insight:
      "The number of subordinates of node u is the sum of (1 + subordinates[v]) over all direct children v of u in a post-order traversal.",
    platform: "CSES",
    url: "https://cses.fi/problemset/task/1674",
  },
  {
    id: "cses-1131",
    title: "Tree Diameter",
    topic: "Trees and heaps",
    pattern: "Two-BFS Farthest Node / Tree DP",
    difficulty: "Intermediate",
    complexity: "O(n) time · O(n) space",
    insight:
      "Run BFS from an arbitrary node 1 to find the farthest node u; then run a second BFS from u to find the farthest node v — dist(u, v) is the diameter.",
    platform: "CSES",
    url: "https://cses.fi/problemset/task/1131",
  },
  // Graph Algorithms
  {
    id: "cses-1666",
    title: "Building Roads",
    topic: "Graph algorithms",
    pattern: "Connected Components (BFS / DFS / DSU)",
    difficulty: "Intermediate",
    complexity: "O(V + E) time · O(V) space",
    insight:
      "Find C connected components; you need exactly C - 1 new roads linking the representative of component i to component i + 1.",
    platform: "CSES",
    url: "https://cses.fi/problemset/task/1666",
    relatedTaskId: "dsu-network-connectivity",
  },
  {
    id: "cses-1667",
    title: "Message Route",
    topic: "Graph algorithms",
    pattern: "Unweighted Shortest Path BFS + Parent Array",
    difficulty: "Intermediate",
    complexity: "O(V + E) time · O(V) space",
    insight:
      "BFS on unweighted edges visits nodes in non-decreasing distance order; record parent[v] = u on first discovery to reconstruct the shortest path.",
    platform: "CSES",
    url: "https://cses.fi/problemset/task/1667",
  },
  {
    id: "cses-1671",
    title: "Shortest Routes I",
    topic: "Graph algorithms",
    pattern: "Dijkstra's Algorithm with Min-Heap",
    difficulty: "Intermediate",
    complexity: "O((V + E) log V) time · O(V + E) space",
    insight:
      "Pop (d, u) from min-heap; immediately skip if d > dist[u] (stale entry) before relaxing outgoing edges.",
    platform: "CSES",
    url: "https://cses.fi/problemset/task/1671",
    relatedTaskId: "dijkstra-route-planner",
  },
  {
    id: "cses-1679",
    title: "Course Schedule",
    topic: "Graph algorithms",
    pattern: "Topological Sort (Kahn's BFS / 3-Color DFS)",
    difficulty: "Intermediate",
    complexity: "O(V + E) time · O(V + E) space",
    insight:
      "Push all in-degree 0 courses to a queue; if the emitted topological order has fewer than n nodes, a prerequisite cycle makes completion impossible.",
    platform: "CSES",
    url: "https://cses.fi/problemset/task/1679",
    relatedTaskId: "topological-task-scheduler",
  },
  {
    id: "cses-1676",
    title: "Road Construction",
    topic: "Graph algorithms",
    pattern: "Disjoint Set Union Component Tracking",
    difficulty: "Intermediate",
    complexity: "O(E α(V)) time · O(V) space",
    insight:
      "Each successful union(u, v) decrements total components by 1 and updates maxComponentSize = max(maxComponentSize, size[root]).",
    platform: "CSES",
    url: "https://cses.fi/problemset/task/1676",
    relatedTaskId: "dsu-network-connectivity",
  },
  // Greedy Algorithms
  {
    id: "cses-1629",
    title: "Movie Festival",
    topic: "Greedy algorithms",
    pattern: "Interval Scheduling by Earliest End Time",
    difficulty: "Intermediate",
    complexity: "O(n log n) time · O(1) space",
    insight:
      "Sorting intervals by ascending end time (not start time or duration!) always leaves maximum room for remaining intervals.",
    platform: "CSES",
    url: "https://cses.fi/problemset/task/1629",
  },
  {
    id: "cses-1090",
    title: "Ferris Wheel",
    topic: "Greedy algorithms",
    pattern: "Greedy Two-Pointer Pairing",
    difficulty: "Beginner",
    complexity: "O(n log n) time · O(1) space",
    insight:
      "Sort weights; pair the heaviest remaining child R with the lightest child L if weight[L] + weight[R] <= x, otherwise R rides alone.",
    platform: "CSES",
    url: "https://cses.fi/problemset/task/1090",
  },
  // Dynamic Programming
  {
    id: "cses-1633",
    title: "Dice Combinations",
    topic: "Dynamic programming",
    pattern: "1D Counting DP (Ordered Sums)",
    difficulty: "Advanced",
    complexity: "O(n) time · O(n) space",
    insight:
      "dp[x] = sum(dp[x - d] for d in 1..6) mod (10^9 + 7), with base case dp[0] = 1.",
    platform: "CSES",
    url: "https://cses.fi/problemset/task/1633",
    relatedTaskId: "knapsack-resource-allocator",
  },
  {
    id: "cses-1634",
    title: "Minimizing Coins",
    topic: "Dynamic programming",
    pattern: "Unbounded Coin Change Minimization",
    difficulty: "Advanced",
    complexity: "O(n · x) time · O(x) space",
    insight:
      "Initialize dp[0] = 0 and dp[1..x] = INF; transition dp[s] = min(dp[s], dp[s - c] + 1) for each coin c <= s.",
    platform: "CSES",
    url: "https://cses.fi/problemset/task/1634",
    relatedTaskId: "knapsack-resource-allocator",
  },
  {
    id: "cses-1158",
    title: "Book Shop",
    topic: "Dynamic programming",
    pattern: "0/1 Knapsack (Backward Capacity Loop)",
    difficulty: "Advanced",
    complexity: "O(n · x) time · O(x) space",
    insight:
      "Iterate budget w backwards from X down to price[i] so each book can be purchased at most once in 1D O(X) space.",
    platform: "CSES",
    url: "https://cses.fi/problemset/task/1158",
    relatedTaskId: "knapsack-resource-allocator",
  },
  {
    id: "cses-1639",
    title: "Edit Distance",
    topic: "Dynamic programming",
    pattern: "2D String Alignment DP (Levenshtein)",
    difficulty: "Advanced",
    complexity: "O(n · m) time · O(min(n, m)) space",
    insight:
      "dp[i][j] matches s1[i-1] == s2[j-1] via dp[i-1][j-1], or takes 1 + min(insert dp[i][j-1], delete dp[i-1][j], replace dp[i-1][j-1]).",
    platform: "CSES",
    url: "https://cses.fi/problemset/task/1639",
  },
  {
    id: "cses-1648",
    title: "Dynamic Range Sum Queries",
    topic: "Trees and heaps",
    pattern: "Fenwick Tree / Segment Tree Point Update",
    difficulty: "Advanced",
    complexity: "O((n + q) log n) time · O(n) space",
    insight:
      "When array values change between range queries, static prefix sums take O(n) per update; a Segment Tree or Fenwick Tree supports both in O(log n).",
    platform: "CSES",
    url: "https://cses.fi/problemset/task/1648",
    relatedTaskId: "segment-tree-range-queries",
  },
];

export const COMPLEXITY_GUIDE = [
  {
    bound: "n ≤ 10 .. 11",
    targetComplexity: "O(n!)",
    typicalPatterns: "Permutations, brute-force orderings, next_permutation",
  },
  {
    bound: "n ≤ 18 .. 20",
    targetComplexity: "O(2^n) or O(n · 2^n)",
    typicalPatterns: "Bitmask enumeration, backtracking, Bitmask DP (TSP)",
  },
  {
    bound: "n ≤ 40",
    targetComplexity: "O(2^(n/2))",
    typicalPatterns: "Meet-in-the-middle (split into two 20-element halves + sort/two-pointer)",
  },
  {
    bound: "n ≤ 400 .. 500",
    targetComplexity: "O(n³)",
    typicalPatterns: "Floyd-Warshall all-pairs shortest path, interval DP, matrix multiplication",
  },
  {
    bound: "n ≤ 2,000 .. 5,000",
    targetComplexity: "O(n²)",
    typicalPatterns: "2D DP (Knapsack, Edit Distance, LCS), quadratic pair scans",
  },
  {
    bound: "n ≤ 100,000 .. 200,000",
    targetComplexity: "O(n log n) or O(n log² n)",
    typicalPatterns: "Sorting, Binary Search on Answer, Dijkstra, Merge Sort, Segment Tree, DSU",
  },
  {
    bound: "n ≤ 1,000,000 .. 5,000,000",
    targetComplexity: "O(n)",
    typicalPatterns: "Two Pointers, Sliding Window, Prefix Sums, Monotonic Stack/Queue, BFS/DFS",
  },
  {
    bound: "n ≤ 10^18",
    targetComplexity: "O(log n) or O(√n) or O(1)",
    typicalPatterns: "Binary Search, Binary Exponentiation, Matrix Exponentiation, Number Theory / Math",
  },
];

export const CURATED_LIBRARY: LibraryResource[] = [
  {
    name: "Pro Git Book (Ch 1–10)",
    url: "https://git-scm.com/book/en/v2",
    category: "Books & Deep Dives",
    topic: "Git & Version Control",
    difficulty: "Beginner",
    summary:
      "The definitive open-access book covering everyday Git branching, rebasing, debugging (`bisect`), and plumbing internals (`blob`, `tree`, `commit`).",
  },
  {
    name: "MDN Learn Web Development",
    url: "https://developer.mozilla.org/en-US/docs/Learn",
    category: "Documentation & Specs",
    topic: "Web Development",
    difficulty: "Beginner",
    summary:
      "Comprehensive, standards-based tutorials on semantic HTML5, modern CSS Grid/Flexbox, DOM scripting, HTTP, and web accessibility.",
  },
  {
    name: "The Modern JavaScript Tutorial",
    url: "https://javascript.info",
    category: "Books & Deep Dives",
    topic: "Programming Fundamentals",
    difficulty: "Beginner",
    summary:
      "Structured reference from variables and closures to promises, async iterators, event loops, and browser DOM APIs.",
  },
  {
    name: "React Official Learn Documentation",
    url: "https://react.dev/learn",
    category: "Documentation & Specs",
    topic: "Web Development",
    difficulty: "Beginner",
    summary:
      "Interactive guide to thinking in React: declarative state, pure rendering, escape hatches (`useRef`, `useEffect`), and component composition.",
  },
  {
    name: "Harvard CS50x",
    url: "https://cs50.harvard.edu/x/",
    category: "Courses & Curricula",
    topic: "Programming Fundamentals",
    difficulty: "Beginner",
    summary:
      "Foundational computer science curriculum spanning memory, pointers, data structures, algorithms, SQL, and web engineering.",
  },
  {
    name: "SQLBolt Interactive SQL Lessons",
    url: "https://sqlbolt.com/",
    category: "Practice Platforms",
    topic: "Databases & SQL",
    difficulty: "Beginner",
    summary:
      "Hands-on browser exercises covering `SELECT`, `JOIN`, `GROUP BY`, subqueries, and schema manipulation.",
  },
  {
    name: "Use The Index, Luke!",
    url: "https://use-the-index-luke.com/",
    category: "Books & Deep Dives",
    topic: "Databases & SQL",
    difficulty: "Intermediate",
    summary:
      "Deep guide to SQL indexing and query tuning for developers: B-Trees, composite indexes, covering indexes, and keyset cursor pagination.",
  },
  {
    name: "USACO Guide",
    url: "https://usaco.guide/",
    category: "Courses & Curricula",
    topic: "Competitive Programming",
    difficulty: "Intermediate",
    summary:
      "Structured topic-by-topic competitive programming curriculum from Bronze fundamentals to Platinum segment trees and flows.",
  },
  {
    name: "CSES Problem Set",
    url: "https://cses.fi/problemset/",
    category: "Practice Platforms",
    topic: "Competitive Programming",
    difficulty: "Intermediate",
    summary:
      "300 canonical, zero-fluff algorithmic problems covering Sorting & Searching, Dynamic Programming, Graph Algorithms, Range Queries, and Trees.",
  },
  {
    name: "CP-Algorithms Encyclopedia",
    url: "https://cp-algorithms.com/",
    category: "Documentation & Specs",
    topic: "Competitive Programming",
    difficulty: "Intermediate",
    summary:
      "Detailed algorithm explanations, complexity proofs, and reference implementations for data structures, graphs, strings, and combinatorics.",
  },
  {
    name: "VisuAlgo Algorithm Visualizations",
    url: "https://visualgo.net/en",
    category: "Developer Tools",
    topic: "Data Structures & Algorithms",
    difficulty: "Beginner",
    summary:
      "Step-by-step visual animations of sorting, balanced trees, heaps, hash tables, and graph shortest-path algorithms.",
  },
  {
    name: "Crafting Interpreters (Robert Nystrom)",
    url: "https://craftinginterpreters.com",
    category: "Books & Deep Dives",
    topic: "Systems Programming",
    difficulty: "Advanced",
    summary:
      "Masterpiece guide to building both a tree-walk interpreter and a bytecode compiler + virtual machine with garbage collection from scratch.",
  },
  {
    name: "Write Yourself a Git",
    url: "https://wyag.thb.lt",
    category: "Books & Deep Dives",
    topic: "Systems Programming",
    difficulty: "Intermediate",
    summary:
      "Learn how Git works under the hood by implementing repositories, SHA object stores, trees, commits, and refs from scratch.",
  },
  {
    name: "CMU 15-445 Database Systems",
    url: "https://15445.courses.cs.cmu.edu",
    category: "Courses & Curricula",
    topic: "Databases & Systems",
    difficulty: "Advanced",
    summary:
      "Carnegie Mellon's flagship database internals course covering buffer pool managers, B+Trees, query execution, concurrency control, and WAL recovery.",
  },
  {
    name: "Operating Systems: Three Easy Pieces (OSTEP)",
    url: "https://pages.cs.wisc.edu/~remzi/OSTEP/",
    category: "Books & Deep Dives",
    topic: "Systems Programming",
    difficulty: "Intermediate",
    summary:
      "Free classic textbook explaining OS virtualization (processes, scheduling, virtual memory), concurrency (locks, threads), and persistence (filesystems, crash consistency).",
  },
  {
    name: "OWASP Cheat Sheet Series",
    url: "https://cheatsheetseries.owasp.org/",
    category: "Documentation & Specs",
    topic: "Cybersecurity",
    difficulty: "Intermediate",
    summary:
      "Actionable application security engineering guides covering XSS prevention, SQL injection, authentication, JWTs, SSRF, and cryptographic storage.",
  },
  {
    name: "W3C Web Cryptography API Specification",
    url: "https://www.w3.org/TR/WebCryptoAPI/",
    category: "Documentation & Specs",
    topic: "Cybersecurity",
    difficulty: "Intermediate",
    summary:
      "Standard API reference for cryptographic primitives (`SubtleCrypto.sign`, `verify`, `digest`, `Ed25519`, `AES-GCM`) in browsers and Node.js.",
  },
  {
    name: "Andrej Karpathy — Neural Networks: Zero to Hero",
    url: "https://karpathy.ai/zero-to-hero.html",
    category: "Courses & Curricula",
    topic: "AI & Machine Learning",
    difficulty: "Advanced",
    summary:
      "Hands-on series building backpropagation (`micrograd`), bigram/MLP language models (`makemore`), Byte-Pair Encoding tokenizers (`minbpe`), and GPT from scratch.",
  },
  {
    name: "pgvector — Open-Source Vector Similarity for PostgreSQL",
    url: "https://github.com/pgvector/pgvector",
    category: "Developer Tools",
    topic: "AI & Machine Learning",
    difficulty: "Intermediate",
    summary:
      "Exact and approximate nearest-neighbor vector search (HNSW and IVFFlat indexes) directly inside PostgreSQL alongside relational filters.",
  },
  {
    name: "PostgreSQL Official Documentation",
    url: "https://www.postgresql.org/docs/current/",
    category: "Documentation & Specs",
    topic: "Databases & SQL",
    difficulty: "Intermediate",
    summary:
      "Reference manual for SQL syntax, transaction isolation levels, `EXPLAIN ANALYZE`, MVCC, indexing, and materialized views.",
  },
  {
    name: "Vitest Fast Unit Test Framework",
    url: "https://vitest.dev/",
    category: "Developer Tools",
    topic: "Software Engineering & Testing",
    difficulty: "Beginner",
    summary:
      "Vite-native unit and integration testing framework with TypeScript support, mocking, and fast watch mode.",
  },
  {
    name: "Playwright End-to-End Testing",
    url: "https://playwright.dev/",
    category: "Developer Tools",
    topic: "Software Engineering & Testing",
    difficulty: "Intermediate",
    summary:
      "Cross-browser automation and user-journey testing using resilient accessibility locators (`getByRole`, `getByLabel`).",
  },
  {
    name: "Docker Official Get Started Guide",
    url: "https://docs.docker.com/get-started/",
    category: "Documentation & Specs",
    topic: "Software Engineering & Testing",
    difficulty: "Intermediate",
    summary:
      "Fundamentals of container images, layer caching, multi-stage builds, and reproducible development environments.",
  },
  {
    name: "Conventional Commits 1.0.0",
    url: "https://www.conventionalcommits.org",
    category: "Documentation & Specs",
    topic: "Git & Version Control",
    difficulty: "Beginner",
    summary:
      "Lightweight convention on top of commit messages (`feat:`, `fix:`, `docs:`, `test:`, `refactor:`) that communicates intent clearly.",
  },
];
