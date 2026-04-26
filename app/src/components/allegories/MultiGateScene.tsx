import { useEffect, useState } from "react";
import type { MultiGateConfig, MultiGateOperand } from "../../types";
import type { SceneRun } from "./types";
import { t, type Lang } from "../../i18n";
import { deepEqual } from "../../runtime/jsRunner";

type Props = {
  config: MultiGateConfig;
  run: SceneRun | null;
  replayKey: number;
  lang: Lang;
};

type Phase = "idle" | "checking" | "settled";

export function MultiGateScene({ config, run, replayKey, lang }: Props) {
  const [phase, setPhase] = useState<Phase>("idle");

  useEffect(() => {
    if (!run) {
      setPhase("idle");
      return;
    }
    setPhase("checking");
    const tm = setTimeout(() => setPhase("settled"), 700);
    return () => clearTimeout(tm);
  }, [replayKey, run]);

  const vars = run?.test.vars ?? {};

  // The "accepted" decision is driven by what the student's code RETURNED,
  // not by whether the test happened to pass. That way, a 16-year-old who
  // correctly returns "stopped" shows the "Stopped" label — even though
  // that test passed.
  const userReturned = run?.result.ok ? run.result.value : undefined;
  const passWhen = config.passWhen ?? true;
  const accepted =
    !!run && run.result.ok && deepEqual(userReturned, passWhen);

  const topSymbol =
    config.mode === "and" ? "&&" : config.mode === "or" ? "||" : "!";

  return (
    <div className="h-full w-full flex flex-col p-6">
      <div className="rounded-lg px-3 py-2 mb-4 font-mono text-sm
                      bg-stone-100 text-stone-700
                      dark:bg-slate-800/60 dark:text-indigo-100">
        {operatorDescription(config.mode, lang)}
      </div>

      <div className="relative flex-1 rounded-2xl overflow-hidden p-6
                      bg-stone-50 ring-1 ring-stone-200
                      dark:bg-slate-900/40 dark:ring-white/10">
        <div className="h-full flex items-center justify-center gap-3 flex-wrap">
          {config.expression
            ? renderExpression(config.expression, topSymbol, vars)
            : renderLegacy(config, vars, topSymbol)}

          {/* Result chip */}
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
              ? t(config.passLabel ?? { en: "true", sv: "true" }, lang)
              : t(config.failLabel ?? { en: "false", sv: "false" }, lang)}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// Rendering

function renderExpression(
  exprs: MultiGateOperand[],
  topSymbol: string,
  vars: Record<string, unknown>
) {
  const nodes: React.ReactNode[] = [];
  exprs.forEach((op, i) => {
    if (i > 0) {
      nodes.push(
        <Op key={`op-${i}`} symbol={topSymbol} />
      );
    }
    nodes.push(<Operand key={`exp-${i}`} op={op} vars={vars} />);
  });
  return <>{nodes}</>;
}

function renderLegacy(
  config: MultiGateConfig,
  vars: Record<string, unknown>,
  topSymbol: string
) {
  const v1 = readVar(vars, config.operandLabels[0]);
  const v2 = readVar(vars, config.operandLabels[1]);
  return (
    <>
      <VarChip label={config.operandLabels[0]} value={v1} />
      {config.mode !== "not" && config.operandLabels[1] !== undefined && (
        <>
          <Op symbol={topSymbol} />
          <VarChip label={config.operandLabels[1]} value={v2} />
        </>
      )}
      {config.mode === "not" && (
        <>
          <Op symbol="!" prefix />
          <VarChip label={config.operandLabels[0]} value={v1} />
        </>
      )}
    </>
  );
}

function Operand({
  op,
  vars,
}: {
  op: MultiGateOperand;
  vars: Record<string, unknown>;
}) {
  if (typeof op === "string") {
    return <VarChip label={op} value={readVar(vars, op)} />;
  }
  if ("not" in op) {
    return (
      <div className="flex items-center gap-1.5">
        <span className="font-mono text-stone-500 dark:text-indigo-200/70">!</span>
        <VarChip label={op.not} value={readVar(vars, op.not)} />
      </div>
    );
  }
  // or-group
  const [a, b] = op.or;
  return (
    <div className="flex flex-col items-center px-2 py-2 rounded-lg ring-1 ring-stone-200 dark:ring-white/10">
      <VarChip label={a} value={readVar(vars, a)} compact />
      <div className="text-xs font-mono my-0.5 text-stone-400 dark:text-indigo-200/60">||</div>
      <VarChip label={b} value={readVar(vars, b)} compact />
    </div>
  );
}

function Op({ symbol, prefix }: { symbol: string; prefix?: boolean }) {
  return (
    <div
      className={
        "font-mono text-xl text-stone-400 dark:text-indigo-200/60 " +
        (prefix ? "" : "")
      }
    >
      {symbol}
    </div>
  );
}

function VarChip({
  label,
  value,
  compact,
}: {
  label: string;
  value: unknown;
  compact?: boolean;
}) {
  return (
    <div className="flex flex-col items-center">
      <div className="text-xs text-stone-500 dark:text-indigo-200/60 mb-1 font-mono">
        {label}
      </div>
      <div
        className={
          (compact ? "px-2 py-1 text-xs " : "px-3 py-2 text-sm ") +
          "rounded-lg font-mono " +
          "bg-white ring-1 ring-stone-200 " +
          "dark:bg-slate-800 dark:ring-white/10 dark:text-indigo-100"
        }
      >
        {formatVal(value)}
      </div>
    </div>
  );
}

function readVar(vars: Record<string, unknown>, key: string | undefined): unknown {
  if (!key) return undefined;
  return vars[key];
}

function formatVal(v: unknown): string {
  if (v === undefined) return "—";
  if (typeof v === "boolean") return v ? "true" : "false";
  if (typeof v === "string") return JSON.stringify(v);
  return String(v);
}

function operatorDescription(mode: MultiGateConfig["mode"], lang: Lang): string {
  switch (mode) {
    case "and":
      return t({ en: "&& — both must be true", sv: "&& — båda måste vara sanna" }, lang);
    case "or":
      return t({ en: "|| — at least one must be true", sv: "|| — minst en måste vara sann" }, lang);
    case "not":
      return t({ en: "! — flips true to false", sv: "! — vänder sant till falskt" }, lang);
  }
}
