import { useEffect, useMemo, useState } from "react";
import { binary, bubble } from "./algorithms";
export function Visualizer() {
  const [kind, K] = useState("Bubble Sort"),
    [input, I] = useState("64, 34, 25, 12, 22, 11, 90"),
    [target, T] = useState(22),
    [step, S] = useState(0),
    [playing, P] = useState(false),
    [speed, V] = useState(650);
  const values = input.split(",").map((v) => Number(v.trim()));
  const valid =
    values.length <= 20 &&
    values.length > 0 &&
    input.trim() !== "" &&
    values.every((v) => Number.isFinite(v) && v >= 0 && v <= 999);
  const frames = useMemo(
    () => (kind === "Bubble Sort" ? bubble(values) : binary(values, target)),
    [input, kind, target],
  );
  useEffect(() => {
    if (!playing) return;
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
  }, [playing, frames.length, speed]);
  const frame = frames[Math.min(step, frames.length - 1)];
  function reset() {
    S(0);
    P(false);
  }
  return (
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
            K(e.target.value);
            reset();
          }}
        >
          <option>Bubble Sort</option>
          <option>Binary Search</option>
        </select>
      </div>
      <div className="filters">
        <label>
          Values (up to 20, from 0–999)
          <input
            value={input}
            onChange={(e) => {
              I(e.target.value);
              reset();
            }}
          />
        </label>
        {kind === "Binary Search" && (
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
      {!valid ? (
        <p role="alert">
          Enter 1–20 comma-separated numbers between 0 and 999.
        </p>
      ) : (
        <>
          <div className="bars">
            {frame.values.map((v, i) => (
              <div
                className={frame.active.includes(i) ? "bar active" : "bar"}
                style={{
                  height: `${Math.max(12, (v / Math.max(...values, 1)) * 100)}%`,
                }}
                key={i}
              >
                <span>{v}</span>
              </div>
            ))}
          </div>
          <p aria-live="polite">{frame.message}</p>
          <div className="actions">
            <button
              onClick={() => P(!playing)}
              disabled={step === frames.length - 1}
            >
              {playing ? "Pause" : "Play"}
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
        </>
      )}
    </section>
  );
}
