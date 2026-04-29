import { useEffect, useState } from "react";
import type { CrosswalkConfig } from "../../types";
import type { SceneRun } from "./types";
import { t, type Lang } from "../../i18n";
import { StickFigure } from "../scenes/StickFigure";
import { deepEqual } from "../../runtime/jsRunner";

type Props = {
  config: CrosswalkConfig;
  run: SceneRun | null;
  replayKey: number;
  lang: Lang;
  hideConditionLabel?: boolean;
};

type Phase = "idle" | "decide" | "act";

function readSignal(vars: Record<string, unknown>, key?: string): string {
  // If a key is given, read it. Otherwise pick the only var (most lessons have one).
  let v: unknown;
  if (key) {
    v = vars[key];
  } else {
    const keys = Object.keys(vars);
    v = keys.length === 1 ? vars[keys[0]] : undefined;
  }
  if (v === undefined || v === null) return "—";
  return String(v);
}

/** Pick a render mode for the signal: a coloured lamp if it's red/yellow/green, otherwise a text sign. */
function classifyLamp(signal: string): "red" | "yellow" | "green" | null {
  const s = signal.toLowerCase();
  if (s === "red") return "red";
  if (s === "yellow" || s === "amber") return "yellow";
  if (s === "green") return "green";
  return null;
}

export function CrosswalkAllegory({ config, run, replayKey, lang, hideConditionLabel }: Props) {
  const [phase, setPhase] = useState<Phase>("idle");

  useEffect(() => {
    if (!run) {
      setPhase("idle");
      return;
    }
    setPhase("decide");
    const tm = setTimeout(() => setPhase("act"), 700);
    return () => clearTimeout(tm);
  }, [replayKey, run]);

  const signal = run ? readSignal(run.test.vars, config.inputKey) : "";
  const lamp = classifyLamp(signal);

  // Should the figure walk? Driven by user's RETURNED VALUE, not by test pass/fail.
  const walkWhen = config.walkWhen ?? true;
  const userReturned = run?.result.ok ? run.result.value : undefined;
  const figureWalks =
    !!run && run.result.ok && deepEqual(userReturned, walkWhen);
  const isNothing =
    !!run && run.result.ok && userReturned === undefined && !!config.nothingLabel;

  // Position: 60 at curb, 320 across.
  const figureX = phase === "act" && figureWalks ? 320 : 60;

  return (
    <div className="w-full h-full flex flex-col p-6">
      {!hideConditionLabel && (
        <div className="rounded-lg px-3 py-2 mb-3 font-mono text-sm
                        bg-stone-100 text-stone-700
                        dark:bg-slate-800/60 dark:text-indigo-100">
          {t(config.conditionLabel, lang)}
        </div>
      )}

      <div className="relative flex-1 rounded-2xl overflow-hidden
                      bg-stone-50 ring-1 ring-stone-200
                      dark:bg-slate-900/40 dark:ring-white/10">
        <svg
          viewBox="0 0 400 240"
          className="w-full h-full"
          preserveAspectRatio="xMidYMid meet"
          role="img"
        >
          {/* Sky / road */}
          <rect x={0} y={0} width={400} height={170} className="fill-stone-100 dark:fill-slate-900" />
          <rect x={0} y={170} width={400} height={70} className="fill-stone-300 dark:fill-slate-800" />
          {/* Crosswalk stripes */}
          {[100, 140, 180, 220, 260].map((sx) => (
            <rect
              key={sx}
              x={sx}
              y={175}
              width={28}
              height={60}
              className="fill-stone-50 dark:fill-slate-700"
            />
          ))}

          {/* Signal — traffic light when red/yellow/green, otherwise a text sign */}
          {lamp ? (
            <g>
              <line x1={350} y1={170} x2={350} y2={90} className="stroke-stone-500 dark:stroke-slate-500" strokeWidth={3} />
              <rect
                x={332}
                y={42}
                width={36}
                height={70}
                rx={5}
                className="fill-stone-700 dark:fill-slate-700"
              />
              <circle cx={350} cy={56}  r={9} className={lamp === "red"    ? "fill-rose-500"    : "fill-stone-900/30 dark:fill-slate-900"} />
              <circle cx={350} cy={78}  r={9} className={lamp === "yellow" ? "fill-amber-400"   : "fill-stone-900/30 dark:fill-slate-900"} />
              <circle cx={350} cy={100} r={9} className={lamp === "green"  ? "fill-emerald-500" : "fill-stone-900/30 dark:fill-slate-900"} />
            </g>
          ) : (
            <g>
              <line x1={350} y1={170} x2={350} y2={120} className="stroke-stone-500 dark:stroke-slate-500" strokeWidth={3} />
              <rect
                x={310}
                y={70}
                width={80}
                height={50}
                rx={6}
                className="fill-white dark:fill-slate-700"
                stroke="currentColor"
                strokeWidth={1.5}
              />
              <text
                x={350}
                y={100}
                textAnchor="middle"
                fontSize={14}
                fontWeight={700}
                className="fill-stone-800 dark:fill-indigo-100"
                fontFamily="ui-monospace, monospace"
              >
                {signal || "—"}
              </text>
            </g>
          )}

          {/* Stick figure */}
          <g
            style={{
              transition: "transform 1500ms ease-in-out",
              transform: `translateX(${figureX - 60}px)`,
            }}
            className="text-stone-700 dark:text-indigo-100"
          >
            <StickFigure
              x={60}
              y={210}
              pose={
                phase === "idle"
                  ? "stand"
                  : phase === "decide"
                  ? "look-up"
                  : figureWalks
                  ? "walk-right"
                  : "stand"
              }
            />
          </g>
        </svg>

        {/* Outcome badge */}
        {phase === "act" && run && (
          <div
            className={
              "absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-medium " +
              (figureWalks
                ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-200"
                : isNothing
                ? "bg-stone-100 text-stone-500 ring-1 ring-stone-200 dark:bg-slate-800 dark:text-indigo-200/60 dark:ring-white/10"
                : "bg-stone-200 text-stone-700 dark:bg-slate-700 dark:text-indigo-100")
            }
          >
            {figureWalks
              ? t(config.walkLabel ?? { en: "Walks", sv: "Går" }, lang)
              : isNothing
              ? t(config.nothingLabel!, lang)
              : t(config.waitLabel ?? { en: "Waits", sv: "Väntar" }, lang)}
          </div>
        )}
      </div>
    </div>
  );
}
