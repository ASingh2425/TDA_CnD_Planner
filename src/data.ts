import initiatives from "./initiatives.json";
import { RAW_EXERCISES } from "./catalog-exercises";
import { MORE_EXERCISES } from "./catalog-exercises-more";
import {
  PROJECT_BLUEPRINTS,
  ENGINEERING_LABS,
  CURRICULUM_MODULES,
  CP_PROBLEMS,
  COMPLEXITY_GUIDE,
  CURATED_LIBRARY,
  type ProjectBlueprint,
  type EngineeringLab,
  type CurriculumModule,
  type CPProblem,
  type LibraryResource,
} from "./catalog-projects";

export {
  initiatives,
  PROJECT_BLUEPRINTS,
  ENGINEERING_LABS,
  CURRICULUM_MODULES,
  CP_PROBLEMS,
  COMPLEXITY_GUIDE,
  CURATED_LIBRARY,
  type ProjectBlueprint,
  type EngineeringLab,
  type CurriculumModule,
  type CPProblem,
  type LibraryResource,
};

export const repo = "https://github.com/ASingh2425/TDA_CnD_Planner";

export const tracks = [
  "Developer Foundations",
  "Software Development",
  "Competitive Programming",
  "Engineering Experiments",
];

export type Task = {
  id: string;
  title: string;
  description: string;
  overview: string;
  initiative_id: string;
  track: string;
  category: string;
  difficulty: string;
  skills: string[];
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
  effort: number;
  resources: { name: string; url: string }[];
  repository_url: string;
};

const allExerciseSeeds = [...RAW_EXERCISES, ...MORE_EXERCISES];

export const tasks: Task[] = allExerciseSeeds.map((seed) => ({
  id: seed.id,
  title: seed.title,
  description: seed.description,
  overview: seed.overview,
  initiative_id:
    initiatives.find((p) => p.id === seed.initiative_id)?.id ??
    initiatives[0].id,
  track: tracks[seed.trackIndex],
  category: seed.category,
  difficulty: seed.difficulty,
  skills: seed.skills,
  prerequisites: seed.prerequisites,
  prerequisiteIds: seed.prerequisiteIds,
  objectives: seed.objectives,
  problemStatement: seed.problemStatement,
  constraints: seed.constraints,
  expectedOutput: seed.expectedOutput,
  hints: seed.hints,
  testCases: seed.testCases,
  instructions: seed.instructions,
  criteria: seed.criteria,
  deliverable: seed.deliverable,
  solutionReference: seed.solutionReference,
  furtherChallenges: seed.furtherChallenges,
  relatedIds: seed.relatedIds,
  effort: seed.effort,
  resources: seed.resources.filter((r) => r.url.startsWith("https://")),
  repository_url: repo,
}));

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
      "Validation, pagination, concurrency control, caching, deployment and maintenance. Explore Next.js as a learning option.",
    deliverable:
      "Full-stack application with validated API, composite indexing and integration tests",
    task: "cursor-pagination-api",
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

export const problems = CP_PROBLEMS;
