import { useEffect, useState } from "react";
import type { ConveyorConfig } from "../../types";
import type { SceneRun } from "./types";
import { t, type Lang } from "../../i18n";

type Props = {
  config: ConveyorConfig;
  run: SceneRun | null;
  replayKey: number;
  lang: Lang;
};

type Phase = "idle" | "rolling" | "settled";

export function ConveyorScene({ config, run, replayKey, lang }: Props) {
  const [phase, setPhase] = useState<Phase>("idle");

  useEffect(() => {
    if (!run) {
      setPhase("idle");
      return;
    }
    setPhase("rolling");
    const tm = setTimeout(() => setPhase("settled"), 900);
    return () => clearTimeout(tm);
  }, [replayKey, run]);

  const matchKey = run?.result.ok ? String(run.result.value) : "";
  const targetIdx = config.bins.findIndex((b) => b.key === matchKey);
  const binCount = config.bins.length;

  const itemLeft =
    phase === "idle"
      ? 4
      : phase === "rolling" || phase === "settled"
      ? targetIdx >= 0
        ? ((targetIdx + 0.5) / binCount) * 100
        : 50
      : 4;

  return (
    <div className="h-full w-full flex flex-col p-6">
      <div className="rounded-lg px-3 py-2 mb-4 font-mono text-sm
                      bg-stone-100 text-stone-700
                      dark:bg-slate-800/60 dark:text-indigo-100">
        {t(config.inputLabel, lang)}
      </div>

      <div className="relative flex-1 rounded-2xl overflow-hidden
                      bg-stone-50 ring-1 ring-stone-200
                      dark:bg-slate-900/40 dark:ring-white/10">
        <div
          className="absolute top-6 transition-all duration-700 ease-out"
          style={{
            left: `${itemLeft}%`,
            top: phase === "settled" ? "55%" : "1.5rem",
            transform: "translate(-50%, 0)",
          }}
        >
          <div className="px-3 py-1.5 rounded-lg shadow font-mono text-sm
                          bg-amber-400 text-white
                          dark:bg-indigo-400 dark:text-slate-900">
            {run ? formatInput(run.test.input) : "?"}
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-0 h-2/5 grid"
             style={{ gridTemplateColumns: `repeat(${binCount}, minmax(0,1fr))` }}>
          {config.bins.map((b, i) => {
            const active = phase === "settled" && i === targetIdx;
            return (
              <div
                key={b.key}
                className={
                  "mx-1 mb-2 rounded-b-lg border-2 border-t-0 flex items-end justify-center pb-2 text-xs font-medium transition-colors " +
                  (active
                    ? "border-emerald-400 text-emerald-700 dark:text-emerald-300"
                    : "border-stone-300 dark:border-white/10 text-stone-500 dark:text-indigo-200/60")
                }
              >
                {t(b.label, lang)}
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
