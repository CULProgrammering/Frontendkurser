import { useEffect, useState } from "react";
import type { MultiGateConfig } from "../../types";
import type { SceneRun } from "./types";

type Props = { config: MultiGateConfig; run: SceneRun | null; replayKey: number };

type Phase = "idle" | "checking" | "settled";

export function MultiGateScene({ config, run, replayKey }: Props) {
  const [phase, setPhase] = useState<Phase>("idle");

  useEffect(() => {
    if (!run) {
      setPhase("idle");
      return;
    }
    setPhase("checking");
    const t = setTimeout(() => setPhase("settled"), 700);
    return () => clearTimeout(t);
  }, [replayKey, run]);

  // Read the two operand values from the input (assume input is an object with named keys
  // matching operandLabels[0] and operandLabels[1]).
  const input = run?.test.input;
  const v1 = readOperand(input, config.operandLabels[0]);
  const v2 = readOperand(input, config.operandLabels[1]);
  const accepted = run?.pass === true;

  const symbol =
    config.mode === "and" ? "&&" : config.mode === "or" ? "||" : "!";

  return (
    <div className="h-full w-full flex flex-col p-6">
      <div className="rounded-lg px-3 py-2 mb-4 font-mono text-sm
                      bg-stone-100 text-stone-700
                      dark:bg-slate-800/60 dark:text-indigo-100">
        {operatorDescription(config.mode)}
      </div>

      <div className="relative flex-1 rounded-2xl overflow-hidden p-6
                      bg-stone-50 ring-1 ring-stone-200
                      dark:bg-slate-900/40 dark:ring-white/10">
        <div className="h-full flex items-center justify-center gap-4">
          <Operand label={config.operandLabels[0]} value={v1} />
          <div className="font-mono text-xl text-stone-400 dark:text-indigo-200/60">
            {symbol}
          </div>
          {config.mode !== "not" && (
            <Operand label={config.operandLabels[1] ?? ""} value={v2} />
          )}
          <div className="font-mono text-xl text-stone-400 dark:text-indigo-200/60">
            =
          </div>
          <div
            className={
              "px-4 py-2 rounded-lg font-semibold text-sm transition-colors " +
              (phase !== "settled"
                ? "bg-stone-200 text-stone-500 dark:bg-slate-800 dark:text-indigo-200/60"
                : accepted
                ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-200"
                : "bg-stone-200 text-stone-700 dark:bg-slate-700 dark:text-indigo-100")
            }
          >
            {phase !== "settled"
              ? "?"
              : accepted
              ? config.passLabel ?? "true"
              : config.failLabel ?? "false"}
          </div>
        </div>
      </div>
    </div>
  );
}

function Operand({ label, value }: { label: string; value: unknown }) {
  return (
    <div className="flex flex-col items-center">
      <div className="text-xs text-stone-500 dark:text-indigo-200/60 mb-1 font-mono">
        {label}
      </div>
      <div className="px-3 py-2 rounded-lg font-mono text-sm
                      bg-white ring-1 ring-stone-200
                      dark:bg-slate-800 dark:ring-white/10 dark:text-indigo-100">
        {formatVal(value)}
      </div>
    </div>
  );
}

function readOperand(input: unknown, key: string | undefined): unknown {
  if (!key) return undefined;
  if (typeof input === "object" && input !== null) {
    return (input as Record<string, unknown>)[key];
  }
  return input;
}

function formatVal(v: unknown): string {
  if (v === undefined) return "—";
  if (typeof v === "boolean") return v ? "true" : "false";
  if (typeof v === "string") return JSON.stringify(v);
  return String(v);
}

function operatorDescription(mode: MultiGateConfig["mode"]): string {
  switch (mode) {
    case "and":
      return "&& — båda måste vara sanna";
    case "or":
      return "|| — minst en måste vara sann";
    case "not":
      return "! — vänder sant till falskt";
  }
}
