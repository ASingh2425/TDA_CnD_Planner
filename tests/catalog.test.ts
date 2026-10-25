import { describe, it, expect } from "vitest";
import {
  bubble,
  binary,
  insertion,
  quick,
  merge,
  twoPointers,
  slidingWindow,
  prefixSums,
} from "../src/algorithms";
import {
  initiatives,
  tasks,
  stages,
  PROJECT_BLUEPRINTS,
  ENGINEERING_LABS,
  CURRICULUM_MODULES,
  CP_PROBLEMS,
  CURATED_LIBRARY,
} from "../src/data";

describe("preserved and expanded catalog", () => {
  it("retains every strategic milestone and six stages", () => {
    expect(initiatives).toHaveLength(12);
    expect(initiatives.flatMap((p) => p.tasks)).toHaveLength(48);
    expect(stages).toHaveLength(6);
  });

  it("tasks have unique IDs, valid projects, deep implementation fields and actionable criteria", () => {
    expect(tasks.length).toBeGreaterThanOrEqual(30);
    const taskIds = new Set(tasks.map((t) => t.id));
    expect(taskIds.size).toBe(tasks.length);

    for (const t of tasks) {
      expect(initiatives.some((p) => p.id === t.initiative_id)).toBe(true);
      expect(t.criteria.length).toBeGreaterThan(0);
      expect(t.deliverable.length).toBeGreaterThan(20);
      expect(t.overview.length).toBeGreaterThan(40);
      expect(t.problemStatement.length).toBeGreaterThan(40);
      expect(t.objectives.length).toBeGreaterThanOrEqual(2);
      expect(t.constraints.length).toBeGreaterThanOrEqual(1);
      expect(t.testCases.length).toBeGreaterThanOrEqual(1);
      expect(t.hints.length).toBeGreaterThanOrEqual(1);
      expect(t.solutionReference.length).toBeGreaterThan(20);
      expect(t.furtherChallenges.length).toBeGreaterThanOrEqual(1);

      for (const prereqId of t.prerequisiteIds) {
        expect(taskIds.has(prereqId)).toBe(true);
      }
      for (const relId of t.relatedIds) {
        expect(taskIds.has(relId)).toBe(true);
      }
      for (const res of t.resources) {
        expect(res.url.startsWith("https://")).toBe(true);
      }
    }
  });

  it("project blueprints, labs, curriculum modules, CP problems and library links are valid", () => {
    const taskIds = new Set(tasks.map((t) => t.id));
    const projectIds = new Set(PROJECT_BLUEPRINTS.map((p) => p.id));

    expect(PROJECT_BLUEPRINTS).toHaveLength(12);
    for (const p of PROJECT_BLUEPRINTS) {
      expect(p.implementationGuide.length).toBeGreaterThanOrEqual(3);
      expect(p.deliverables.length).toBeGreaterThanOrEqual(2);
      expect(p.testing.length).toBeGreaterThanOrEqual(1);
      for (const tid of p.prerequisiteTaskIds) {
        expect(taskIds.has(tid)).toBe(true);
      }
      for (const tid of p.relatedTaskIds) {
        expect(taskIds.has(tid)).toBe(true);
      }
    }

    expect(ENGINEERING_LABS.length).toBeGreaterThanOrEqual(8);
    for (const lab of ENGINEERING_LABS) {
      expect(projectIds.has(lab.linkedProjectId)).toBe(true);
      for (const tid of lab.linkedTaskIds) {
        expect(taskIds.has(tid)).toBe(true);
      }
    }

    expect(CURRICULUM_MODULES).toHaveLength(10);
    for (const mod of CURRICULUM_MODULES) {
      for (const tid of mod.taskIds) {
        expect(taskIds.has(tid)).toBe(true);
      }
    }

    expect(CP_PROBLEMS.length).toBeGreaterThanOrEqual(25);
    for (const prob of CP_PROBLEMS) {
      expect(prob.url.startsWith("https://")).toBe(true);
      if (prob.relatedTaskId) {
        expect(taskIds.has(prob.relatedTaskId)).toBe(true);
      }
    }

    expect(CURATED_LIBRARY.length).toBeGreaterThanOrEqual(20);
    for (const item of CURATED_LIBRARY) {
      expect(item.url.startsWith("https://")).toBe(true);
    }
  });
});

describe("visualization algorithms", () => {
  const sampleArrays = [[], [1], [3, 1, 2], [2, 2, 1], [9, 7, 0], [1, 2, 3], [64, 34, 25, 12, 22, 11, 90]];

  for (const [name, fn] of [
    ["bubble", bubble],
    ["insertion", insertion],
    ["quick", quick],
    ["merge", merge],
  ] as const) {
    for (const values of sampleArrays) {
      it(`${name} sorts [${values.join(", ")}] without mutating input`, () => {
        const original = [...values];
        expect(fn(values).at(-1)?.values).toEqual(
          [...values].sort((a, b) => a - b),
        );
        expect(values).toEqual(original);
      });
    }
  }

  it("binary search finds duplicates and sorts safely", () => {
    expect(binary([3, 1, 1], 1).at(-1)?.message).toContain("Found");
  });

  it("binary search reports missing and empty input", () => {
    expect(binary([], 2).at(-1)?.message).toContain("not present");
    expect(binary([1, 3], 2).at(-1)?.message).toContain("not present");
  });

  it("two pointers finds target pair sum or reports absence", () => {
    expect(twoPointers([10, 2, 7, 15], 9).at(-1)?.message).toContain("Found pair");
    expect(twoPointers([1, 2, 3], 99).at(-1)?.message).toContain("No two values");
  });

  it("sliding window computes maximum subarray sum of length k", () => {
    expect(slidingWindow([2, 1, 5, 1, 3, 2], 3).at(-1)?.message).toContain("9");
  });

  it("prefix sums accumulates running totals accurately", () => {
    expect(prefixSums([3, 1, 4, 2]).at(-1)?.values).toEqual([3, 4, 8, 10]);
  });
});
