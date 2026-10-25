import initiatives from "./initiatives.json";
import { RAW_EXERCISES } from "./catalog-exercises";
import { MORE_EXERCISES } from "./catalog-exercises-more";
import {
  LEVEL_1_AND_2_EXERCISES,
  type LearningLevel,
} from "./catalog-beginner";
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
  type LearningLevel,
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

export const learningLevels: LearningLevel[] = [
  "Level 1: Start from zero",
  "Level 2: Practise by building",
  "Level 3: Explore real engineering",
];

export type Task = {
  id: string;
  title: string;
  description: string;
  overview: string;
  initiative_id: string;
  track: string;
  level: LearningLevel;
  durationLabel: string;
  category: string;
  difficulty: string;
  skills: string[];
  prerequisites: string;
  prerequisiteIds: string[];
  objectives: string[];
  conceptExplanation: string;
  workedExample: {
    code: string;
    lineByLine: string[];
  };
  guidedActivity: string;
  milestones: { title: string; detail: string }[];
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

const LEVEL_2_IDS = new Set([
  "problem-bank-ui",
  "contributor-guide",
  "review-checklist",
  "css-grid-dashboard-layout",
  "binary-search-tests",
  "api-data-model",
  "mentor-handover",
]);

const beginnerIds = new Set(LEVEL_1_AND_2_EXERCISES.map((x) => x.id));

const remainingSeeds = [...RAW_EXERCISES, ...MORE_EXERCISES].filter(
  (seed) => !beginnerIds.has(seed.id),
);

export const tasks: Task[] = [
  ...LEVEL_1_AND_2_EXERCISES.map((seed) => ({
    id: seed.id,
    title: seed.title,
    description: seed.description,
    overview: seed.overview,
    initiative_id:
      initiatives.find((p) => p.id === seed.initiative_id)?.id ??
      initiatives[0].id,
    track: tracks[seed.trackIndex],
    level: seed.level,
    durationLabel: seed.durationLabel,
    category: seed.category,
    difficulty: seed.difficulty,
    skills: seed.skills,
    prerequisites: seed.prerequisites,
    prerequisiteIds: seed.prerequisiteIds,
    objectives: seed.objectives,
    conceptExplanation: seed.conceptExplanation,
    workedExample: seed.workedExample,
    guidedActivity: seed.guidedActivity,
    milestones: seed.milestones,
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
  })),
  ...remainingSeeds.map((seed) => {
    const level: LearningLevel = LEVEL_2_IDS.has(seed.id)
      ? "Level 2: Practise by building"
      : "Level 3: Explore real engineering";
    return {
      id: seed.id,
      title: seed.title,
      description: seed.description,
      overview: seed.overview,
      initiative_id:
        initiatives.find((p) => p.id === seed.initiative_id)?.id ??
        initiatives[0].id,
      track: tracks[seed.trackIndex],
      level,
      durationLabel: `About ${seed.effort} hours`,
      category: seed.category,
      difficulty: seed.difficulty,
      skills: seed.skills,
      prerequisites: seed.prerequisites,
      prerequisiteIds: seed.prerequisiteIds,
      objectives: seed.objectives,
      conceptExplanation: `${seed.overview} Key principle: ${seed.solutionReference}`,
      workedExample: {
        code: seed.expectedOutput,
        lineByLine: [
          `Target behaviour: ${seed.description}`,
          `Core approach: ${seed.solutionReference}`,
        ],
      },
      guidedActivity:
        seed.instructions[0] ??
        "Start by running a minimal baseline version before adding edge-case handling.",
      milestones: seed.instructions.map((inst, idx) => ({
        title: `${idx + 1}. Milestone ${idx + 1}`,
        detail: inst,
      })),
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
    };
  }),
];

export const stages = [
  {
    title: "Level 1: Start from zero — Programming basics",
    topics:
      "Printing output, variables, calculator math, if/else decisions, loops, functions, arrays and objects — one concept at a time.",
    deliverable:
      "Your first greeting script, calculator, number-guessing game and task list array",
    task: "print-your-name",
    resource: "https://javascript.info/first-steps",
  },
  {
    title: "Level 1: First webpage & Git basics",
    topics:
      "HTML tags, CSS styling, making a button respond to clicks, and saving your first Git commit and pull request.",
    deliverable: "Personal HTML/CSS webpage, click counter and first pull request",
    task: "first-html-css-page",
    resource: "https://developer.mozilla.org/en-US/docs/Learn",
  },
  {
    title: "Level 2: Practise by building — Small apps",
    topics:
      "Combining arrays, objects, DOM events and file/browser storage to build a CLI task manager, To-Do app, Quiz app and Expense tracker.",
    deliverable: "Step-by-step CLI task manager and interactive browser To-Do list",
    task: "cli-task-manager",
    resource: "https://javascript.info",
  },
  {
    title: "Level 2: Live data, React & UI filtering",
    topics:
      "Fetching live API data with loading/error states, responsive CSS Grid layouts and building a searchable React problem list.",
    deliverable: "Live weather viewer, developer profile and React problem explorer",
    task: "weather-data-fetcher",
    resource: "https://react.dev/learn",
  },
  {
    title: "Level 2–3: Databases, APIs & algorithmic patterns",
    topics:
      "Two pointers, binary search testing, relational SQL modeling, API validation and pagination.",
    deliverable: "Two-pointer solver, tested binary search and SQL project API",
    task: "cp-pattern-notes",
    resource: "https://sqlbolt.com/",
  },
  {
    title: "Level 3: Explore real engineering",
    topics:
      "Systems programming, storage engines, compilers, RAG search, cybersecurity defences, Docker and CI/CD pipelines.",
    deliverable: "Self-contained systems, AI/ML or security engineering build",
    task: "lru-cache-ttl-eviction",
    resource: "https://craftinginterpreters.com",
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
