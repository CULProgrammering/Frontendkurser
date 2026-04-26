import { useEffect, useState } from "react";
import type { DoorConfig } from "../../types";
import type { SceneRun } from "./types";

type Props = {
  config: DoorConfig;
  run: SceneRun | null;
  /** Bumping this restarts the animation. */
  replayKey: number;
};

type Phase = "idle" | "approach" | "evaluate" | "settle";

function inputDisplay(config: DoorConfig, input: unknown): string {
  if (config.inputKey && typeof input === "object" && input !== null) {
    const v = (input as Record<string, unknown>)[config.inputKey];
    return String(v);
  }
  if (typeof input === "string") return input;
  if (input === null || input === undefined) return "—";
  if (typeof input === "object") {
    try {
      return JSON.stringify(input);
    } catch {
      return "?";
    }
  }
  return String(input);
}

export function DoorScene({ config, run, replayKey }: Props) {
  const [phase, setPhase] = useState<Phase>("idle");

  useEffect(() => {
    if (!run) {
      setPhase("idle");
      return;
    }
    setPhase("approach");
    const t1 = setTimeout(() => setPhase("evaluate"), 600);
    const t2 = setTimeout(() => setPhase("settle"), 1100);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [replayKey, run]);

  const accepted = run?.pass === true;
  const showResult = phase === "settle";

  // Person horizontal position (% of stage width)
  const personLeft =
    phase === "idle"
      ? 8
      : phase === "approach"
      ? 40
      : phase === "evaluate"
      ? 40
      : accepted
      ? 92
      : 8;

  const doorOpen = showResult && accepted;

  return (
    <div className="h-full w-full flex flex-col p-6">
      {/* Code/condition readout */}
      <div className="rounded-lg px-3 py-2 mb-4 font-mono text-sm
                      bg-stone-100 text-stone-700
                      dark:bg-slate-800/60 dark:text-indigo-100">
        {config.conditionLabel}
      </div>

      {/* Stage */}
      <div className="relative flex-1 rounded-2xl overflow-hidden
                      bg-stone-50 ring-1 ring-stone-200
                      dark:bg-slate-900/40 dark:ring-white/10">
        {/* Floor line */}
        <div className="absolute left-0 right-0 bottom-12 border-t border-dashed border-stone-300 dark:border-white/10" />

        {/* Person */}
        <div
          className="absolute bottom-12 transition-all duration-500 ease-out"
          style={{ left: `${personLeft}%`, transform: "translate(-50%, 50%)" }}
        >
          <div className="w-12 h-12 rounded-full flex items-center justify-center font-semibold text-sm shadow
                          bg-amber-400 text-white
                          dark:bg-indigo-400 dark:text-slate-900">
            {run ? inputDisplay(config, run.test.input) : "?"}
          </div>
        </div>

        {/* Door (two halves) */}
        <div className="absolute bottom-12 right-[6%] h-32 w-20 -translate-y-0">
          <div className="relative h-full w-full">
            <div
              className="absolute top-0 bottom-0 w-1/2 left-0 transition-transform duration-500
                         bg-stone-300 dark:bg-slate-700"
              style={{ transform: doorOpen ? "translateX(-110%)" : "translateX(0)" }}
            />
            <div
              className="absolute top-0 bottom-0 w-1/2 right-0 transition-transform duration-500
                         bg-stone-300 dark:bg-slate-700"
              style={{ transform: doorOpen ? "translateX(110%)" : "translateX(0)" }}
            />
            {/* Door frame */}
            <div className="absolute inset-0 ring-2 ring-stone-400 dark:ring-slate-500 rounded-t-lg pointer-events-none" />
          </div>
        </div>

        {/* Outcome label */}
        {showResult && run && (
          <div
            className={
              "absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-medium " +
              (accepted
                ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-200"
                : "bg-stone-200 text-stone-700 dark:bg-slate-700 dark:text-indigo-100")
            }
          >
            {accepted
              ? config.acceptLabel ?? "Släpps in"
              : config.rejectLabel ?? "Stoppas"}
          </div>
        )}
      </div>
    </div>
  );
}
