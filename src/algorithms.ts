export type Frame = {
  values: number[];
  active: number[];
  secondary?: number[];
  sorted?: number[];
  pointers?: Record<string, number>;
  message: string;
  codeLine?: number;
};

export type AlgorithmMeta = {
  name: string;
  category: "Sorting" | "Searching" | "Pointers & Windows" | "Dynamic Programming";
  needsTarget?: boolean;
  targetLabel?: string;
  defaultTarget?: number;
  timeBest: string;
  timeAvg: string;
  timeWorst: string;
  space: string;
  invariant: string;
  pseudocode: string[];
};

export const ALGORITHM_META: Record<string, AlgorithmMeta> = {
  "Bubble Sort": {
    name: "Bubble Sort",
    category: "Sorting",
    timeBest: "O(n)",
    timeAvg: "O(n²)",
    timeWorst: "O(n²)",
    space: "O(1)",
    invariant:
      "After pass i, the last i elements are in their final sorted positions and are greater than or equal to all preceding elements.",
    pseudocode: [
      "for i = 0 to n - 1:",
      "  changed = false",
      "  for j = 0 to n - i - 2:",
      "    if a[j] > a[j + 1]: swap(a[j], a[j + 1]); changed = true",
      "  if not changed: break",
    ],
  },
  "Insertion Sort": {
    name: "Insertion Sort",
    category: "Sorting",
    timeBest: "O(n)",
    timeAvg: "O(n²)",
    timeWorst: "O(n²)",
    space: "O(1)",
    invariant:
      "At the start of iteration i, the subarray a[0..i-1] consists of the original elements in sorted order.",
    pseudocode: [
      "for i = 1 to n - 1:",
      "  key = a[i]; j = i - 1",
      "  while j >= 0 and a[j] > key:",
      "    a[j + 1] = a[j]; j = j - 1",
      "  a[j + 1] = key",
    ],
  },
  "Quick Sort": {
    name: "Quick Sort",
    category: "Sorting",
    timeBest: "O(n log n)",
    timeAvg: "O(n log n)",
    timeWorst: "O(n²)",
    space: "O(log n)",
    invariant:
      "During partition(low, high), all elements in a[low..i] are <= pivot, and all elements in a[i+1..j-1] are > pivot.",
    pseudocode: [
      "function quickSort(low, high):",
      "  if low >= high: return",
      "  pivot = a[high]; i = low",
      "  for j = low to high - 1:",
      "    if a[j] <= pivot: swap(a[i], a[j]); i++",
      "  swap(a[i], a[high]); quickSort(low, i-1); quickSort(i+1, high)",
    ],
  },
  "Merge Sort": {
    name: "Merge Sort",
    category: "Sorting",
    timeBest: "O(n log n)",
    timeAvg: "O(n log n)",
    timeWorst: "O(n log n)",
    space: "O(n)",
    invariant:
      "Each merged subarray a[left..right] contains the elements originally in that range in non-decreasing order.",
    pseudocode: [
      "function mergeSort(left, right):",
      "  if left >= right: return",
      "  mid = floor((left + right) / 2)",
      "  mergeSort(left, mid); mergeSort(mid + 1, right)",
      "  mergeSortedHalves(left, mid, right)",
    ],
  },
  "Binary Search": {
    name: "Binary Search",
    category: "Searching",
    needsTarget: true,
    targetLabel: "Target",
    defaultTarget: 22,
    timeBest: "O(1)",
    timeAvg: "O(log n)",
    timeWorst: "O(log n)",
    space: "O(1)",
    invariant:
      "If the target exists in the sorted array, its index lies within the closed interval [l, r].",
    pseudocode: [
      "sort(a); l = 0; r = n - 1",
      "while l <= r:",
      "  m = floor((l + r) / 2)",
      "  if a[m] == target: return m",
      "  if a[m] < target: l = m + 1 else: r = m - 1",
    ],
  },
  "Two Pointers (Pair Sum)": {
    name: "Two Pointers (Pair Sum)",
    category: "Pointers & Windows",
    needsTarget: true,
    targetLabel: "Target Sum",
    defaultTarget: 47,
    timeBest: "O(1)",
    timeAvg: "O(n log n)",
    timeWorst: "O(n log n)",
    space: "O(1)",
    invariant:
      "On sorted input, if a[L] + a[R] < target then L cannot pair with any index <= R; if > target then R cannot pair with any index >= L.",
    pseudocode: [
      "sort(a); L = 0; R = n - 1",
      "while L < R:",
      "  sum = a[L] + a[R]",
      "  if sum == target: return (L, R)",
      "  if sum < target: L++ else: R--",
    ],
  },
  "Sliding Window (Max Sum K)": {
    name: "Sliding Window (Max Sum K)",
    category: "Pointers & Windows",
    needsTarget: true,
    targetLabel: "Window Size K",
    defaultTarget: 3,
    timeBest: "O(n)",
    timeAvg: "O(n)",
    timeWorst: "O(n)",
    space: "O(1)",
    invariant:
      "At index r, windowSum equals the exact sum of the k contiguous elements a[r-k+1 .. r] maintained in O(1) per step.",
    pseudocode: [
      "windowSum = sum(a[0..k-1]); best = windowSum",
      "for r = k to n - 1:",
      "  windowSum += a[r] - a[r - k]",
      "  best = max(best, windowSum)",
      "return best",
    ],
  },
  "Prefix Sums": {
    name: "Prefix Sums",
    category: "Dynamic Programming",
    timeBest: "O(n)",
    timeAvg: "O(n)",
    timeWorst: "O(n)",
    space: "O(n)",
    invariant:
      "prefix[i] stores the cumulative sum a[0] + a[1] + ... + a[i], allowing any range sum(L, R) in O(1) time.",
    pseudocode: [
      "prefix[0] = a[0]",
      "for i = 1 to n - 1:",
      "  prefix[i] = prefix[i - 1] + a[i]",
      "// Range sum [L, R] = prefix[R] - (L > 0 ? prefix[L - 1] : 0)",
    ],
  },
};

export function bubble(values: number[]): Frame[] {
  const a = [...values],
    frames: Frame[] = [
      {
        values: [...a],
        active: [],
        sorted: [],
        message:
          "Compare adjacent values. Swap them when the left value is larger.",
        codeLine: 0,
      },
    ];
  const sortedSet: number[] = [];
  for (let i = 0; i < a.length; i++) {
    let changed = false;
    for (let j = 0; j < a.length - i - 1; j++) {
      frames.push({
        values: [...a],
        active: [j, j + 1],
        sorted: [...sortedSet],
        pointers: { j, "j+1": j + 1 },
        message: `Compare ${a[j]} and ${a[j + 1]}.`,
        codeLine: 2,
      });
      if (a[j] > a[j + 1]) {
        [a[j], a[j + 1]] = [a[j + 1], a[j]];
        changed = true;
        frames.push({
          values: [...a],
          active: [j, j + 1],
          sorted: [...sortedSet],
          pointers: { swap: j },
          message: "Swap: the smaller value moves left.",
          codeLine: 3,
        });
      }
    }
    sortedSet.push(a.length - 1 - i);
    if (!changed) break;
  }
  frames.push({
    values: [...a],
    active: [],
    sorted: a.map((_, idx) => idx),
    message:
      "Complete. The values are sorted. Worst-case time: O(n²); extra space: O(1).",
    codeLine: 4,
  });
  return frames;
}

export function insertion(values: number[]): Frame[] {
  const a = [...values];
  const frames: Frame[] = [
    {
      values: [...a],
      active: [],
      sorted: a.length > 0 ? [0] : [],
      message:
        "Insertion sort grows a sorted prefix from left to right by inserting each element into place.",
      codeLine: 0,
    },
  ];
  for (let i = 1; i < a.length; i++) {
    const key = a[i];
    let j = i - 1;
    frames.push({
      values: [...a],
      active: [i],
      sorted: Array.from({ length: i }, (_, k) => k),
      pointers: { key: i },
      message: `Select key ${key} at index ${i} to insert into sorted prefix [0..${i - 1}].`,
      codeLine: 1,
    });
    while (j >= 0 && a[j] > key) {
      frames.push({
        values: [...a],
        active: [j, j + 1],
        sorted: Array.from({ length: i }, (_, k) => k),
        pointers: { j, key: j + 1 },
        message: `${a[j]} > ${key}, so shift ${a[j]} right from index ${j} to ${j + 1}.`,
        codeLine: 2,
      });
      a[j + 1] = a[j];
      a[j] = key;
      j--;
    }
    a[j + 1] = key;
    frames.push({
      values: [...a],
      active: [j + 1],
      sorted: Array.from({ length: i + 1 }, (_, k) => k),
      pointers: { placed: j + 1 },
      message: `Inserted ${key} at index ${j + 1}. Prefix [0..${i}] is now sorted.`,
      codeLine: 4,
    });
  }
  frames.push({
    values: [...a],
    active: [],
    sorted: a.map((_, idx) => idx),
    message:
      "Complete. Insertion sort finished in O(n²) worst-case time, O(n) on nearly sorted input, and O(1) space.",
    codeLine: 4,
  });
  return frames;
}

export function quick(values: number[]): Frame[] {
  const a = [...values];
  const sorted = new Set<number>();
  const frames: Frame[] = [
    {
      values: [...a],
      active: [],
      sorted: [],
      message:
        "Quick sort partitions each subarray around a pivot so smaller elements move left and larger elements move right.",
      codeLine: 0,
    },
  ];
  function sort(low: number, high: number) {
    if (low > high) return;
    if (low === high) {
      sorted.add(low);
      return;
    }
    const pivot = a[high];
    let i = low;
    frames.push({
      values: [...a],
      active: [high],
      secondary: [low, high],
      sorted: [...sorted],
      pointers: { low, pivot: high },
      message: `Partition subarray [${low}..${high}] using pivot ${pivot} at index ${high}.`,
      codeLine: 2,
    });
    for (let j = low; j < high; j++) {
      frames.push({
        values: [...a],
        active: [j, high],
        secondary: [i],
        sorted: [...sorted],
        pointers: { i, j, pivot: high },
        message: `Compare ${a[j]} with pivot ${pivot}.`,
        codeLine: 3,
      });
      if (a[j] <= pivot) {
        if (i !== j) {
          [a[i], a[j]] = [a[j], a[i]];
          frames.push({
            values: [...a],
            active: [i, j],
            sorted: [...sorted],
            pointers: { i, j, pivot: high },
            message: `${a[i]} <= ${pivot}: swap into the left partition at index ${i}.`,
            codeLine: 4,
          });
        }
        i++;
      }
    }
    [a[i], a[high]] = [a[high], a[i]];
    sorted.add(i);
    frames.push({
      values: [...a],
      active: [i],
      sorted: [...sorted],
      pointers: { pivot: i },
      message: `Pivot ${pivot} locked into its final sorted index ${i}.`,
      codeLine: 5,
    });
    sort(low, i - 1);
    sort(i + 1, high);
  }
  if (a.length > 0) sort(0, a.length - 1);
  frames.push({
    values: [...a],
    active: [],
    sorted: a.map((_, idx) => idx),
    message:
      "Complete. Quick sort average time: O(n log n); extra stack space: O(log n).",
    codeLine: 5,
  });
  return frames;
}

export function merge(values: number[]): Frame[] {
  const a = [...values];
  const frames: Frame[] = [
    {
      values: [...a],
      active: [],
      message:
        "Merge sort recursively splits the array in half and merges sorted halves in linear time.",
      codeLine: 0,
    },
  ];
  function divide(left: number, right: number) {
    if (left >= right) return;
    const mid = Math.floor((left + right) / 2);
    divide(left, mid);
    divide(mid + 1, right);
    const merged: number[] = [];
    let i = left,
      j = mid + 1;
    frames.push({
      values: [...a],
      active: [left, right],
      secondary: [mid],
      pointers: { L: left, M: mid, R: right },
      message: `Merge sorted halves [${left}..${mid}] and [${mid + 1}..${right}].`,
      codeLine: 4,
    });
    while (i <= mid && j <= right) {
      if (a[i] <= a[j]) merged.push(a[i++]);
      else merged.push(a[j++]);
    }
    while (i <= mid) merged.push(a[i++]);
    while (j <= right) merged.push(a[j++]);
    for (let k = 0; k < merged.length; k++) {
      a[left + k] = merged[k];
    }
    frames.push({
      values: [...a],
      active: Array.from({ length: right - left + 1 }, (_, k) => left + k),
      pointers: { L: left, R: right },
      message: `Merged range [${left}..${right}] into [${merged.join(", ")}].`,
      codeLine: 4,
    });
  }
  if (a.length > 1) divide(0, a.length - 1);
  frames.push({
    values: [...a],
    active: [],
    sorted: a.map((_, idx) => idx),
    message:
      "Complete. Merge sort guarantees O(n log n) time in best, average, and worst cases with O(n) auxiliary space.",
    codeLine: 4,
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
        codeLine: 0,
      },
    ];
  let l = 0,
    r = a.length - 1;
  while (l <= r) {
    const m = Math.floor((l + r) / 2);
    frames.push({
      values: a,
      active: [m],
      secondary: [l, r],
      pointers: { L: l, M: m, R: r },
      message: `Search indices ${l}–${r}; middle value is ${a[m]}.`,
      codeLine: 2,
    });
    if (a[m] === target) {
      frames.push({
        values: a,
        active: [m],
        sorted: [m],
        pointers: { Found: m },
        message: `Found ${target} at sorted index ${m}. Search time: O(log n).`,
        codeLine: 3,
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
    codeLine: 4,
  });
  return frames;
}

export function twoPointers(values: number[], target: number): Frame[] {
  const a = [...values].sort((x, y) => x - y);
  const frames: Frame[] = [
    {
      values: a,
      active: a.length >= 2 ? [0, a.length - 1] : [],
      pointers: a.length >= 2 ? { L: 0, R: a.length - 1 } : {},
      message: `Sort input first. Place left pointer L at 0 and right pointer R at ${Math.max(0, a.length - 1)} to find pair sum ${target}.`,
      codeLine: 0,
    },
  ];
  let l = 0,
    r = a.length - 1;
  while (l < r) {
    const sum = a[l] + a[r];
    frames.push({
      values: a,
      active: [l, r],
      pointers: { L: l, R: r },
      message: `Check a[${l}] + a[${r}] = ${a[l]} + ${a[r]} = ${sum} (target ${target}).`,
      codeLine: 2,
    });
    if (sum === target) {
      frames.push({
        values: a,
        active: [l, r],
        sorted: [l, r],
        pointers: { L: l, R: r },
        message: `Found pair (${a[l]}, ${a[r]}) at indices ${l} and ${r} summing to ${target}. Two-pointer scan time: O(n).`,
        codeLine: 3,
      });
      return frames;
    }
    if (sum < target) {
      l++;
      frames.push({
        values: a,
        active: [l, r],
        pointers: { L: l, R: r },
        message: `Sum ${sum} < ${target}: increment L to ${l} to increase the pair sum.`,
        codeLine: 4,
      });
    } else {
      r--;
      frames.push({
        values: a,
        active: [l, r],
        pointers: { L: l, R: r },
        message: `Sum ${sum} > ${target}: decrement R to ${r} to decrease the pair sum.`,
        codeLine: 4,
      });
    }
  }
  frames.push({
    values: a,
    active: [],
    message: `No two values sum to ${target}. Pointers crossed in O(n) comparisons.`,
    codeLine: 4,
  });
  return frames;
}

export function slidingWindow(values: number[], rawK: number): Frame[] {
  const a = [...values];
  const k = Math.max(1, Math.min(a.length || 1, Math.floor(rawK) || 1));
  if (a.length === 0) {
    return [
      {
        values: [],
        active: [],
        message: "Provide at least one number to run Sliding Window.",
        codeLine: 0,
      },
    ];
  }
  let windowSum = 0;
  for (let i = 0; i < k; i++) windowSum += a[i];
  let best = windowSum;
  let bestStart = 0;
  const frames: Frame[] = [
    {
      values: a,
      active: Array.from({ length: k }, (_, i) => i),
      pointers: { L: 0, R: k - 1 },
      message: `Initial window [0..${k - 1}] of size K=${k} has sum ${windowSum}.`,
      codeLine: 0,
    },
  ];
  for (let r = k; r < a.length; r++) {
    const leaving = a[r - k];
    const entering = a[r];
    windowSum += entering - leaving;
    const l = r - k + 1;
    if (windowSum > best) {
      best = windowSum;
      bestStart = l;
    }
    frames.push({
      values: a,
      active: Array.from({ length: k }, (_, i) => l + i),
      secondary: [r - k],
      pointers: { L: l, R: r },
      message: `Slide window to [${l}..${r}]: +${entering} (enter) -${leaving} (leave) → sum = ${windowSum} (best = ${best}).`,
      codeLine: 2,
    });
  }
  frames.push({
    values: a,
    active: Array.from({ length: k }, (_, i) => bestStart + i),
    sorted: Array.from({ length: k }, (_, i) => bestStart + i),
    pointers: { BestL: bestStart, BestR: bestStart + k - 1 },
    message: `Complete. Maximum subarray sum of length ${k} is ${best} at indices [${bestStart}..${bestStart + k - 1}]. Time: O(n).`,
    codeLine: 4,
  });
  return frames;
}

export function prefixSums(values: number[]): Frame[] {
  const a = [...values];
  const p = [...a];
  const frames: Frame[] = [
    {
      values: [...p],
      active: p.length ? [0] : [],
      sorted: p.length ? [0] : [],
      message:
        "Prefix sum array starts with prefix[0] = a[0] and accumulates running totals from left to right.",
      codeLine: 0,
    },
  ];
  for (let i = 1; i < p.length; i++) {
    const prev = p[i - 1];
    const curr = a[i];
    p[i] = prev + curr;
    frames.push({
      values: [...p],
      active: [i - 1, i],
      sorted: Array.from({ length: i + 1 }, (_, k) => k),
      pointers: { "i-1": i - 1, i },
      message: `prefix[${i}] = prefix[${i - 1}] (${prev}) + a[${i}] (${curr}) = ${p[i]}.`,
      codeLine: 2,
    });
  }
  frames.push({
    values: [...p],
    active: [],
    sorted: p.map((_, idx) => idx),
    message: `Complete. Prefix array built in O(n). Any range sum [L, R] can now be answered in O(1) via prefix[R] - prefix[L-1].`,
    codeLine: 3,
  });
  return frames;
}

export function runAlgorithm(
  kind: string,
  values: number[],
  target: number,
): Frame[] {
  switch (kind) {
    case "Bubble Sort":
      return bubble(values);
    case "Insertion Sort":
      return insertion(values);
    case "Quick Sort":
      return quick(values);
    case "Merge Sort":
      return merge(values);
    case "Binary Search":
      return binary(values, target);
    case "Two Pointers (Pair Sum)":
      return twoPointers(values, target);
    case "Sliding Window (Max Sum K)":
      return slidingWindow(values, target);
    case "Prefix Sums":
      return prefixSums(values);
    default:
      return bubble(values);
  }
}
