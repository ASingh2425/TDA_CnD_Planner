export type Frame = { values: number[]; active: number[]; message: string };
export function bubble(values: number[]): Frame[] {
  const a = [...values],
    frames: Frame[] = [
      {
        values: [...a],
        active: [],
        message:
          "Compare adjacent values. Swap them when the left value is larger.",
      },
    ];
  for (let i = 0; i < a.length; i++) {
    let changed = false;
    for (let j = 0; j < a.length - i - 1; j++) {
      frames.push({
        values: [...a],
        active: [j, j + 1],
        message: `Compare ${a[j]} and ${a[j + 1]}.`,
      });
      if (a[j] > a[j + 1]) {
        [a[j], a[j + 1]] = [a[j + 1], a[j]];
        changed = true;
        frames.push({
          values: [...a],
          active: [j, j + 1],
          message: "Swap: the smaller value moves left.",
        });
      }
    }
    if (!changed) break;
  }
  frames.push({
    values: [...a],
    active: [],
    message:
      "Complete. The values are sorted. Worst-case time: O(n²); extra space: O(1).",
  });
  return frames;
}
export function binary(values: number[], target: number): Frame[] {
  const a = [...values].sort((x, y) => x - y),
    frames: Frame[] = [
      {
        values: a,
        active: [],
        message:
          "Binary search requires sorted input. Values are sorted first.",
      },
    ];
  let l = 0,
    r = a.length - 1;
  while (l <= r) {
    const m = Math.floor((l + r) / 2);
    frames.push({
      values: a,
      active: [m],
      message: `Search indices ${l}–${r}; middle value is ${a[m]}.`,
    });
    if (a[m] === target) {
      frames.push({
        values: a,
        active: [m],
        message: `Found ${target} at sorted index ${m}. Search time: O(log n).`,
      });
      return frames;
    }
    if (a[m] < target) l = m + 1;
    else r = m - 1;
  }
  frames.push({
    values: a,
    active: [],
    message: `${target} is not present. Search time: O(log n).`,
  });
  return frames;
}
