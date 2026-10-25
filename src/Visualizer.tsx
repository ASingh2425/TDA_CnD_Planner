import { useEffect, useMemo, useState } from "react";
import { ALGORITHM_META, runAlgorithm } from "./algorithms";

type GraphStep = {
  visited: string[];
  frontier: string[];
  current: string | null;
  edge?: [string, string];
  message: string;
};

const GRAPH_NODES: { id: string; x: number; y: number; neighbors: string[] }[] =
  [
    { id: "A", x: 70, y: 110, neighbors: ["B", "C"] },
    { id: "B", x: 190, y: 55, neighbors: ["A", "D", "E"] },
    { id: "C", x: 190, y: 165, neighbors: ["A", "F"] },
    { id: "D", x: 320, y: 35, neighbors: ["B"] },
    { id: "E", x: 320, y: 110, neighbors: ["B", "F", "G"] },
    { id: "F", x: 320, y: 185, neighbors: ["C", "E"] },
    { id: "G", x: 445, y: 110, neighbors: ["E"] },
  ];

function buildGraphFrames(mode: "BFS (Shortest Layers)" | "DFS (Deep Backtracking)", start = "A"): GraphStep[] {
  const adj = Object.fromEntries(GRAPH_NODES.map((n) => [n.id, n.neighbors]));
  const steps: GraphStep[] = [
    {
      visited: [],
      frontier: [start],
      current: null,
      message:
        mode === "BFS (Shortest Layers)"
          ? `Initialize FIFO Queue with start node ${start}. BFS explores nodes layer by layer in O(V + E).`
          : `Initialize LIFO Stack with start node ${start}. DFS plunges deep along each branch before backtracking in O(V + E).`,
    },
  ];
  const visited = new Set<string>();
  const frontier: string[] = [start];

  while (frontier.length > 0) {
    const curr =
      mode === "BFS (Shortest Layers)" ? frontier.shift()! : frontier.pop()!;
    if (visited.has(curr)) continue;
    visited.add(curr);
    steps.push({
      visited: [...visited],
      frontier: [...frontier],
      current: curr,
      message: `Visit node ${curr}. Order so far: ${[...visited].join(" → ")}.`,
    });
    const neighbors = adj[curr] ?? [];
    const ordered =
      mode === "BFS (Shortest Layers)" ? neighbors : [...neighbors].reverse();
    for (const next of ordered) {
      if (!visited.has(next) && !frontier.includes(next)) {
        frontier.push(next);
        steps.push({
          visited: [...visited],
          frontier: [...frontier],
          current: curr,
          edge: [curr, next],
          message: `Discover unvisited neighbor ${next} from ${curr}; push ${next} to ${mode === "BFS (Shortest Layers)" ? "queue" : "stack"}.`,
        });
      }
    }
  }
  steps.push({
    visited: [...visited],
    frontier: [],
    current: null,
    message: `Complete! Full ${mode.split(" ")[0]} traversal order: ${[...visited].join(" → ")}. Time: O(V + E), Space: O(V).`,
  });
  return steps;
}

export function Visualizer() {
  const [kind, K] = useState("Bubble Sort"),
    [input, I] = useState("64, 34, 25, 12, 22, 11, 90"),
    [target, T] = useState(22),
    [step, S] = useState(0),
    [playing, P] = useState(false),
    [speed, V] = useState(650),
    [graphMode, GM] = useState<"BFS (Shortest Layers)" | "DFS (Deep Backtracking)">("BFS (Shortest Layers)"),
    [graphStep, GS] = useState(0);

  const meta = ALGORITHM_META[kind] ?? ALGORITHM_META["Bubble Sort"];
  const values = input.split(",").map((v) => Number(v.trim()));
  const valid =
    values.length <= 20 &&
    values.length > 0 &&
    input.trim() !== "" &&
    values.every((v) => Number.isFinite(v) && v >= 0 && v <= 999);

  const frames = useMemo(
    () => (valid ? runAlgorithm(kind, values, target) : []),
    [input, kind, target, valid],
  );

  const graphFrames = useMemo(() => buildGraphFrames(graphMode), [graphMode]);

  useEffect(() => {
    if (!playing || !valid) return;
    const timer = setInterval(
      () =>
        S((s) => {
          if (s >= frames.length - 1) {
            P(false);
            return s;
          }
          return s + 1;
        }),
      speed,
    );
    return () => clearInterval(timer);
  }, [playing, frames.length, speed, valid]);

  const frame = frames[Math.min(step, Math.max(0, frames.length - 1))];
  const gFrame = graphFrames[Math.min(graphStep, graphFrames.length - 1)];

  function reset() {
    S(0);
    P(false);
  }

  function applyPreset(preset: string, nextTarget?: number) {
    I(preset);
    if (nextTarget !== undefined) T(nextTarget);
    reset();
  }

  return (
    <>
      <section className="card">
        <div className="section-title">
          <div>
            <span className="eyebrow">LEARN BY SEEING</span>
            <h2>Make algorithms click.</h2>
          </div>
          <select
            aria-label="Algorithm"
            value={kind}
            onChange={(e) => {
              const nextKind = e.target.value;
              K(nextKind);
              const nextMeta = ALGORITHM_META[nextKind];
              if (nextMeta?.defaultTarget !== undefined) {
                T(nextMeta.defaultTarget);
              }
              reset();
            }}
          >
            {Object.keys(ALGORITHM_META).map((algName) => (
              <option key={algName} value={algName}>
                {algName}
              </option>
            ))}
          </select>
        </div>

        <div className="filters">
          <label className="search-label">
            Values (up to 20, from 0–999)
            <input
              value={input}
              onChange={(e) => {
                I(e.target.value);
                reset();
              }}
            />
          </label>
          {meta.needsTarget && (
            <label>
              Target
              <input
                type="number"
                value={target}
                onChange={(e) => {
                  T(Number(e.target.value));
                  reset();
                }}
              />
            </label>
          )}
          <label>
            Step duration
            <select value={speed} onChange={(e) => V(Number(e.target.value))}>
              <option value={1000}>Slow</option>
              <option value={650}>Normal</option>
              <option value={200}>Fast</option>
            </select>
          </label>
        </div>

        <div className="preset-bar">
          <span className="muted">Presets:</span>
          <button
            type="button"
            className="secondary small"
            onClick={() => applyPreset("64, 34, 25, 12, 22, 11, 90", 22)}
          >
            Default
          </button>
          <button
            type="button"
            className="secondary small"
            onClick={() => applyPreset("90, 75, 60, 45, 30, 15, 5", 30)}
          >
            Reversed
          </button>
          <button
            type="button"
            className="secondary small"
            onClick={() => applyPreset("10, 12, 18, 15, 25, 30, 28, 40", 43)}
          >
            Nearly sorted
          </button>
          <button
            type="button"
            className="secondary small"
            onClick={() => applyPreset("15, 8, 15, 42, 8, 23, 4, 16", 31)}
          >
            Duplicates
          </button>
        </div>

        {!valid ? (
          <p role="alert">
            Enter 1–20 comma-separated numbers between 0 and 999.
          </p>
        ) : (
          <>
            <div className="bars">
              {frame.values.map((v, i) => {
                const isActive = frame.active.includes(i);
                const isSorted = frame.sorted?.includes(i);
                const isSecondary = frame.secondary?.includes(i);
                const pointerLabels = Object.entries(frame.pointers ?? {})
                  .filter(([, idx]) => idx === i)
                  .map(([name]) => name);
                const maxVal = Math.max(...frame.values, 1);
                return (
                  <div
                    className={
                      isActive
                        ? "bar active"
                        : isSorted
                          ? "bar sorted"
                          : isSecondary
                            ? "bar secondary-bar"
                            : "bar"
                    }
                    style={{
                      height: `${Math.max(12, (v / maxVal) * 100)}%`,
                    }}
                    key={i}
                  >
                    <span>{v}</span>
                    {pointerLabels.length > 0 && (
                      <em className="bar-pointer">{pointerLabels.join("/")}</em>
                    )}
                  </div>
                );
              })}
            </div>
            <p aria-live="polite" className="visualizer-message">
              {frame.message}
            </p>
            <div className="actions">
              <button
                onClick={() => P(!playing)}
                disabled={step === frames.length - 1}
              >
                {playing ? "Pause" : "Play"}
              </button>
              <button
                className="secondary"
                disabled={playing || step <= 0}
                onClick={() => S(Math.max(0, step - 1))}
              >
                Step back
              </button>
              <button
                className="secondary"
                disabled={playing || step >= frames.length - 1}
                onClick={() => S(step + 1)}
              >
                Step forward
              </button>
              <button className="secondary" onClick={reset}>
                Reset
              </button>
              <small>
                Step {step + 1} / {frames.length}
              </small>
            </div>

            <div className="algo-inspector">
              <div className="algo-meta-box">
                <h3>Complexity & loop invariant</h3>
                <div className="chips">
                  <span>Best: {meta.timeBest}</span>
                  <span>Avg: {meta.timeAvg}</span>
                  <span>Worst: {meta.timeWorst}</span>
                  <span>Space: {meta.space}</span>
                </div>
                <p>
                  <strong>Core invariant:</strong> {meta.invariant}
                </p>
              </div>
              <div className="algo-code-box">
                <h3>Pseudocode trace</h3>
                <pre className="pseudo-block">
                  {meta.pseudocode.map((line, idx) => (
                    <div
                      key={line}
                      className={
                        frame.codeLine === idx
                          ? "pseudo-line active"
                          : "pseudo-line"
                      }
                    >
                      <code>{line}</code>
                    </div>
                  ))}
                </pre>
              </div>
            </div>
          </>
        )}
      </section>

      <section className="card">
        <div className="section-title">
          <div>
            <span className="eyebrow">GRAPH TRAVERSAL VISUALISER</span>
            <h2>Compare BFS and DFS layer discovery.</h2>
          </div>
          <select
            aria-label="Graph traversal mode"
            value={graphMode}
            onChange={(e) => {
              GM(e.target.value as "BFS (Shortest Layers)" | "DFS (Deep Backtracking)");
              GS(0);
            }}
          >
            <option>BFS (Shortest Layers)</option>
            <option>DFS (Deep Backtracking)</option>
          </select>
        </div>

        <div className="graph-stage-grid">
          <svg
            viewBox="0 0 520 220"
            className="graph-svg"
            role="img"
            aria-label="Graph traversal diagram"
          >
            {GRAPH_NODES.flatMap((n) =>
              n.neighbors
                .filter((nb) => n.id < nb)
                .map((nb) => {
                  const targetNode = GRAPH_NODES.find((x) => x.id === nb)!;
                  const activeEdge =
                    (gFrame.edge?.[0] === n.id && gFrame.edge?.[1] === nb) ||
                    (gFrame.edge?.[1] === n.id && gFrame.edge?.[0] === nb);
                  return (
                    <line
                      key={`${n.id}-${nb}`}
                      x1={n.x}
                      y1={n.y}
                      x2={targetNode.x}
                      y2={targetNode.y}
                      stroke={activeEdge ? "#206b53" : "#cbd8cd"}
                      strokeWidth={activeEdge ? 4 : 2}
                    />
                  );
                }),
            )}
            {GRAPH_NODES.map((n) => {
              const isCurrent = gFrame.current === n.id;
              const isVisited = gFrame.visited.includes(n.id);
              const isFrontier = gFrame.frontier.includes(n.id);
              const fill = isCurrent
                ? "#206b53"
                : isVisited
                  ? "#dceee2"
                  : isFrontier
                    ? "#fcf1e6"
                    : "#ffffff";
              const textColor = isCurrent ? "#ffffff" : "#1f392e";
              return (
                <g key={n.id}>
                  <circle
                    cx={n.x}
                    cy={n.y}
                    r={21}
                    fill={fill}
                    stroke="#206b53"
                    strokeWidth={isCurrent ? 3 : 1.5}
                  />
                  <text
                    x={n.x}
                    y={n.y + 5}
                    textAnchor="middle"
                    fill={textColor}
                    fontWeight="700"
                    fontSize="14"
                  >
                    {n.id}
                  </text>
                </g>
              );
            })}
          </svg>
          <div>
            <p>{gFrame.message}</p>
            <div className="chips">
              <span>
                Visited ({gFrame.visited.length}):{" "}
                {gFrame.visited.join(" → ") || "None"}
              </span>
              <span>
                {graphMode.startsWith("BFS") ? "Queue" : "Stack"}:{" "}
                {gFrame.frontier.join(", ") || "Empty"}
              </span>
            </div>
            <div className="actions">
              <button
                type="button"
                className="secondary"
                disabled={graphStep <= 0}
                onClick={() => GS(Math.max(0, graphStep - 1))}
              >
                Previous node step
              </button>
              <button
                type="button"
                disabled={graphStep >= graphFrames.length - 1}
                onClick={() => GS(Math.min(graphFrames.length - 1, graphStep + 1))}
              >
                Next node step
              </button>
              <button
                type="button"
                className="secondary"
                onClick={() => GS(0)}
              >
                Reset graph
              </button>
              <small>
                Graph step {graphStep + 1} / {graphFrames.length}
              </small>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
