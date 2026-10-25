# TDA C&D — Engineering Resource Hub

An open, self-directed learning and project library for the TDA Coding & Development community.

## Product Scope

- **01. Learn**: 10 core engineering curriculum modules and 6 progressive stages across Programming Fundamentals, Git, DSA, Web Development, Databases, Operating Systems, Networking, Software Engineering, AI/ML and Cybersecurity.
- **02. Practise**: 31+ self-contained coding exercises with problem statements, constraints, expected output, progressive hints, test cases, step-by-step instructions, deliverables, acceptance criteria, solution references and further challenges.
- **03. Build**: 12 architectural project blueprints with tech stack recommendations, folder structures, ordered milestones, deliverables, testing checklists and companion exercises.
- **04. Explore**: 8 advanced engineering research labs covering Bitcask WAL storage engines, bytecode VMs, Hybrid BM25+Vector RAG, BPE tokenizers, Micrograd autodiff, defensive AppSec (XSS/JWT/SSRF), wire protocols and empirical benchmarking.
- **05. Competitive Programming**: 8 interactive array/window/DP visualisers, an interactive BFS/DFS graph traversal visualiser, a 14-stage CP roadmap, input-constraint-to-complexity tables and 28+ pattern-indexed problems.
- **Resources**: Searchable and category-filterable library of official specifications, open textbooks, courses, practice platforms and developer tools.

Permanently excluded by design: member accounts, progress tracking, task claiming/assignment, submission forms, mentor review queues and maintainer dashboards.

## Run locally

Node.js 22.12+ recommended.

```sh
npm ci
npm run dev
```

## Verify and build

```sh
npm run lint
npm run typecheck
npm test
npm run test:e2e
npm run build
```

Playwright uses Microsoft Edge. Deploy the generated `dist` directory using Vercel’s Vite preset (`npm run build`). No environment variables or database setup are needed.
