import initiatives from "./initiatives.json";
export { initiatives };
export const repo = "https://github.com/ASingh2425/TDA_CnD_Planner";
export const tracks = [
  "Developer Foundations",
  "Software Development",
  "Competitive Programming",
  "Engineering Experiments",
];
export const statuses = [
  "Available",
  "Assigned",
  "In Progress",
  "Submitted for Review",
  "Changes Requested",
  "Approved",
  "Blocked",
];
export type Task = {
  id: string;
  title: string;
  description: string;
  initiative_id: string;
  track: string;
  difficulty: string;
  skills: string[];
  prerequisites: string;
  instructions: string[];
  criteria: string[];
  deliverable: string;
  effort: number;
  status: string;
  version: number;
  archived: boolean;
  resources: { name: string; url: string }[];
  repository_url: string;
  created_at?: string;
  updated_at?: string;
};
const starter = [
  [
    "first-contribution",
    "Make your first pull request",
    "junior-path",
    0,
    "Beginner",
    "Git",
    2,
    "Improve one confusing sentence in the project documentation.",
    "A pull request explaining the original confusion and your improvement.",
  ],
  [
    "cli-task-manager",
    "Build a command-line task manager",
    "junior-path",
    0,
    "Beginner",
    "JavaScript,Git",
    6,
    "Practice variables, loops and functions by saving a list of tasks in a JSON file.",
    "A repository with add, list and complete commands, sample output and a README.",
  ],
  [
    "developer-profile",
    "Build your developer profile",
    "junior-path",
    0,
    "Beginner",
    "HTML,CSS,JavaScript",
    5,
    "Create an accessible profile page that describes what you want to learn.",
    "A deployed responsive page and source repository, including a fetch request with an error state.",
  ],
  [
    "problem-bank-ui",
    "Build a searchable problem list",
    "dsa-bank",
    1,
    "Intermediate",
    "React,JavaScript",
    8,
    "Help members find practice problems using topic and difficulty filters.",
    "A React feature with combinable filters, empty states and tests.",
  ],
  [
    "binary-search-tests",
    "Test the binary search visualizer",
    "algo-visualizer",
    1,
    "Intermediate",
    "TypeScript,Testing",
    4,
    "Make sure members can trust what the visualization teaches.",
    "A pull request covering absent targets, duplicates, single values and empty arrays.",
  ],
  [
    "cp-pattern-notes",
    "Explain the two-pointer pattern",
    "dsa-bank",
    2,
    "Beginner",
    "Arrays,Complexity",
    3,
    "Solve a canonical practice problem and explain why two pointers work.",
    "An original explanation, complexity analysis and a link to your accepted submission.",
  ],
  [
    "api-data-model",
    "Design a small project API",
    "core-platform",
    1,
    "Intermediate",
    "SQL,APIs",
    8,
    "Practice relational modeling and authorization with a small project tracker.",
    "An ER diagram, migration, API implementation and authorization tests.",
  ],
  [
    "benchmark-sort",
    "Compare sorting performance",
    "engineering-labs",
    3,
    "Advanced",
    "Algorithms,Testing",
    10,
    "Measure sorting behavior on sorted, reversed and random inputs.",
    "A reproducible benchmark repository with methodology, results and limitations.",
  ],
  [
    "contributor-guide",
    "Write a newcomer contribution guide",
    "knowledge-base",
    1,
    "Beginner",
    "Git,Markdown",
    3,
    "Document how a member can run the app and submit a small change.",
    "A documentation pull request tested by following each instruction from a clean checkout.",
  ],
  [
    "review-checklist",
    "Create an accessible review checklist",
    "dev-culture",
    1,
    "Beginner",
    "Markdown,Testing",
    2,
    "Help reviewers check functionality, accessibility and error states.",
    "A pull request containing a concise review checklist and one worked example.",
  ],
  [
    "mentor-handover",
    "Prepare a mentorship handover guide",
    "mentorship-sprints",
    1,
    "Intermediate",
    "Documentation",
    4,
    "Help the next mentor continue an existing learning group.",
    "A reusable guide covering onboarding, blockers, feedback and handover; no private member data.",
  ],
  [
    "websocket-lab",
    "Build a live announcement experiment",
    "engineering-labs",
    3,
    "Advanced",
    "WebSockets,JavaScript",
    12,
    "Explore reconnect behavior in an isolated prototype.",
    "A working lab with reconnect tests and a documented architecture.",
  ],
] as const;
export const tasks: Task[] = starter.map(
  ([
    id,
    title,
    project,
    t,
    difficulty,
    skill,
    effort,
    description,
    deliverable,
  ]) => ({
    id,
    title,
    description,
    initiative_id:
      initiatives.find((p) => p.id === project)?.id ??
      initiatives[t === 0 ? 1 : t === 2 ? 2 : 0].id,
    track: tracks[t],
    difficulty,
    skills: skill.split(","),
    prerequisites:
      t === 0
        ? "No prior contribution required. Learn the listed skills as you go."
        : `Comfort with ${skill.toLowerCase()}; demonstrate these skills before starting.`,
    instructions: [
      "Read the linked resources and inspect the existing project.",
      "Agree on a small scope with your reviewer before implementation.",
      "Build the deliverable, test the edge cases and document how to reproduce it.",
      "Submit a repository or pull request link with a short explanation.",
    ],
    criteria: [
      "The deliverable meets the task description.",
      "Setup and verification steps are reproducible.",
      "The work handles errors and contains no secrets.",
      "An assigned reviewer has reviewed the evidence.",
    ],
    deliverable,
    effort,
    status: "Available",
    version: 0,
    archived: false,
    resources: initiatives[t === 0 ? 1 : t === 2 ? 2 : 0].resources.filter(
      (r) => r.url.startsWith("https:"),
    ),
    repository_url: repo,
  }),
);
export const stages = [
  {
    title: "Programming & Git fundamentals",
    topics:
      "Variables, loops, functions, data structures, command-line navigation and Git branching.",
    deliverable: "CLI task manager that persists JSON",
    task: "cli-task-manager",
    resource: "https://git-scm.com/book/en/v2",
  },
  {
    title: "Web fundamentals & the DOM",
    topics:
      "Semantic HTML, CSS layouts, responsive design, DOM events, promises and fetch.",
    deliverable: "Responsive developer profile with loading and error states",
    task: "developer-profile",
    resource: "https://developer.mozilla.org/en-US/docs/Learn",
  },
  {
    title: "React & components",
    topics: "Props, state, components, effects and accessible forms.",
    deliverable: "Searchable frontend problem bank",
    task: "problem-bank-ui",
    resource: "https://react.dev/learn",
  },
  {
    title: "Databases & APIs",
    topics: "Relational modeling, SQL, constraints, migrations and API design.",
    deliverable: "ER diagram and tested schema migration",
    task: "api-data-model",
    resource: "https://sqlbolt.com/",
  },
  {
    title: "Full-stack applications",
    topics:
      "Authentication, permission checks, validation, deployment and maintenance. Explore Next.js as a learning option.",
    deliverable:
      "Deployed application with protected CRUD and authorization tests",
    task: "api-data-model",
    resource: "https://nextjs.org/learn",
  },
  {
    title: "Your first production contribution",
    topics:
      "Issues, branches, pull requests, testing, review feedback and deployment checks.",
    deliverable: "Reviewed pull request with passing checks",
    task: "first-contribution",
    resource: "https://docs.github.com/en/pull-requests",
  },
];
export const topics = [
  "Programming fundamentals",
  "Complexity analysis",
  "Arrays and strings",
  "Hashing",
  "Two pointers and sliding window",
  "Prefix sums",
  "Binary search",
  "Recursion and backtracking",
  "Stacks, queues and linked lists",
  "Trees and heaps",
  "Graph algorithms",
  "Greedy algorithms",
  "Dynamic programming",
  "Contest practice and editorial analysis",
];
export const problems = [
  {
    id: "cf-4a",
    title: "Watermelon",
    topic: "Fundamentals",
    difficulty: "Beginner",
    url: "https://codeforces.com/problemset/problem/4/A",
  },
  {
    id: "cses-1068",
    title: "Weird Algorithm",
    topic: "Fundamentals",
    difficulty: "Beginner",
    url: "https://cses.fi/problemset/task/1068",
  },
  {
    id: "cses-1640",
    title: "Sum of Two Values",
    topic: "Two pointers",
    difficulty: "Intermediate",
    url: "https://cses.fi/problemset/task/1640",
  },
  {
    id: "cses-1646",
    title: "Static Range Sum Queries",
    topic: "Prefix sums",
    difficulty: "Intermediate",
    url: "https://cses.fi/problemset/task/1646",
  },
  {
    id: "cses-1633",
    title: "Dice Combinations",
    topic: "Dynamic programming",
    difficulty: "Advanced",
    url: "https://cses.fi/problemset/task/1633",
  },
];
