import { useEffect, useState } from "react";
import type { ForkConfig } from "../../types";
import type { SceneRun } from "./types";

type Props = { config: ForkConfig; run: SceneRun | null; replayKey: number };

type Phase = "idle" | "approach" | "branched";

export function ForkScene({ config, run, replayKey }: Props) {
  const [phase, setPhase] = useState<Phase>("idle");

  useEffect(() => {
    if (!run) {
      setPhase("idle");
      return;
    }
    setPhase("approach");
    const t = setTimeout(() => setPhase("branched"), 700);
    return () => clearTimeout(t);
  }, [replayKey, run]);

  // Pick the branch matching the result (or expected if no result yet).
  const matchKey = run?.result.ok ? String(run.result.value) : "";
  const matchedIdx = config.branches.findIndex((b) => b.key === matchKey);
  const branchCount = config.branches.length;

  return (
    <div className="h-full w-full flex flex-col p-6">
      <div className="rounded-lg px-3 py-2 mb-4 font-mono text-sm
                      bg-stone-100 text-stone-700
                      dark:bg-slate-800/60 dark:text-indigo-100">
        {config.conditionLabel}
      </div>

      <div className="relative flex-1 rounded-2xl overflow-hidden
                      bg-stone-50 ring-1 ring-stone-200
                      dark:bg-slate-900/40 dark:ring-white/10">
        {/* Cart */}
        <div
          className="absolute top-4 transition-all duration-700 ease-out"
          style={{
            left:
              phase === "branched" && matchedIdx >= 0
                ? `${((matchedIdx + 0.5) / branchCount) * 100}%`
                : "50%",
            top: phase === "approach" || phase === "idle" ? "1rem" : "55%",
            transform: "translate(-50%, 0)",
          }}
        >
          <div className="px-3 py-1.5 rounded-lg shadow font-mono text-sm
                          bg-amber-400 text-white
                          dark:bg-indigo-400 dark:text-slate-900">
            {run ? formatInput(run.test.input) : "?"}
          </div>
        </div>

        {/* Branch tracks at bottom */}
        <div className="absolute inset-x-0 bottom-0 h-1/2 grid"
             style={{ gridTemplateColumns: `repeat(${branchCount}, minmax(0,1fr))` }}>
          {config.branches.map((b, i) => {
            const isMatch = phase === "branched" && i === matchedIdx;
            return (
              <div
                key={b.key}
                className={
                  "border-t-2 border-dashed flex items-end justify-center pb-3 text-xs font-medium transition-colors " +
                  (isMatch
                    ? "border-emerald-400 text-emerald-700 dark:text-emerald-300"
                    : "border-stone-300 dark:border-white/10 text-stone-500 dark:text-indigo-200/60")
                }
              >
                {b.label}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function formatInput(v: unknown): string {
  if (typeof v === "string") return v;
  if (v === null || v === undefined) return "—";
  if (typeof v === "object") {
    try { return JSON.stringify(v); } catch { return "?"; }
  }
  return String(v);
}
