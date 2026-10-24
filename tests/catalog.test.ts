import { describe, it, expect } from "vitest";
import { bubble, binary } from "../src/algorithms";
import { initiatives, tasks, stages } from "../src/data";
describe("preserved catalog", () => {
  it("retains every strategic milestone and six stages", () => {
    expect(initiatives).toHaveLength(12);
    expect(initiatives.flatMap((p) => p.tasks)).toHaveLength(48);
    expect(stages).toHaveLength(6);
  });
  it("tasks have unique IDs, valid projects and actionable criteria", () => {
    expect(new Set(tasks.map((t) => t.id)).size).toBe(tasks.length);
    for (const t of tasks) {
      expect(initiatives.some((p) => p.id === t.initiative_id)).toBe(true);
      expect(t.criteria.length).toBeGreaterThan(0);
      expect(t.deliverable.length).toBeGreaterThan(20);
    }
  });
});
describe("visualization algorithms", () => {
  for (const values of [[], [1], [3, 1, 2], [2, 2, 1], [9, 7, 0], [1, 2, 3]])
    it(`bubble sorts ${values}`, () => {
      const original = [...values];
      expect(bubble(values).at(-1)?.values).toEqual(
        [...values].sort((a, b) => a - b),
      );
      expect(values).toEqual(original);
    });
  it("binary search finds duplicates and sorts safely", () => {
    expect(binary([3, 1, 1], 1).at(-1)?.message).toContain("Found");
  });
  it("binary search reports missing and empty input", () => {
    expect(binary([], 2).at(-1)?.message).toContain("not present");
    expect(binary([1, 3], 2).at(-1)?.message).toContain("not present");
  });
});
