import { useEffect, useState } from "react";
import type { LoopResultConfig } from "../../types";
import type { SceneRun } from "./types";
import { t, type Lang } from "../../i18n";
import { describeValue } from "../../runtime/jsRunner";

type Props = {
  config: LoopResultConfig;
  run: SceneRun | null;
  replayKey: number;
  lang: Lang;
};

type Phase = "idle" | "looping" | "settled";

/**
 * Generic exercise allegory for loop lessons. Shows the input variables
 * and the value the student's code returned. A faint themed background
 * (stairs / letters / countdown / tasting) provides visual flavour but
 * the focus is on input → result.
 */
export function LoopResultScene({ config, run, replayKey, lang }: Props) {
  const [phase, setPhase] = useState<Phase>("idle");

  useEffect(() => {
    if (!run) {
      setPhase("idle");
      return;
    }
    setPhase("looping");
    const tm = setTimeout(() => setPhase("settled"), 800);
    return () => clearTimeout(tm);
  }, [replayKey, run]);

  const vars = run?.test.vars ?? {};
  const returned = run?.result.ok ? run.result.value : undefined;
  const errored = !!run && !run.result.ok;

  return (
    <div className="h-full w-full flex flex-col p-6">
      <div className="rounded-lg px-3 py-2 mb-4 font-mono text-sm
                      bg-stone-100 text-stone-700
                      dark:bg-slate-800/60 dark:text-indigo-100">
        {config.inputKeys.join(", ")}{" "}
        <span className="text-stone-400 dark:text-indigo-200/50">→</span>{" "}
        {t(config.resultLabel ?? { en: "result", sv: "resultat" }, lang)}
      </div>

      <div
        className={
          "relative flex-1 rounded-2xl overflow-hidden p-6 ring-1 " +
          themeClass(config.theme)
        }
      >
        <ThemeBackdrop theme={config.theme} />

        <div className="relative z-10 h-full flex flex-col items-center justify-center gap-4">
          {/* Input chips row */}
          <div className="flex items-center gap-3 flex-wrap justify-center">
            {config.inputKeys.map((key) => (
              <Chip
                key={key}
                label={key}
                value={run ? formatValue(vars[key]) : "?"}
              />
            ))}
          </div>

          {/* Looping indicator */}
          <div className="flex items-center gap-2 text-stone-400 dark:text-indigo-200/50">
            <Spinner active={phase === "looping"} />
            <span className="font-mono text-xs">
              {phase === "looping"
                ? t({ en: "looping…", sv: "loopar…" }, lang)
                : "↓"}
            </span>
          </div>

          {/* Result chip */}
          <div className="flex flex-col items-center">
            <div className="text-xs text-stone-500 dark:text-indigo-200/60 mb-1 font-mono">
              {t(config.resultLabel ?? { en: "result", sv: "resultat" }, lang)}
            </div>
            <div
              className={
                "px-4 py-2 rounded-lg font-mono text-base font-semibold transition-colors " +
                (phase !== "settled"
                  ? "bg-stone-200 text-stone-500 dark:bg-slate-800 dark:text-indigo-200/60"
                  : errored
                  ? "bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-200"
                  : "bg-emerald-100 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-100")
              }
            >
              {phase !== "settled"
                ? "?"
                : errored
                ? t({ en: "error", sv: "fel" }, lang)
                : describeValue(returned)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Chip({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="text-xs text-stone-500 dark:text-indigo-200/60 mb-1 font-mono">
        {label}
      </div>
      <div
        className="px-3 py-2 rounded-lg font-mono text-sm
                   bg-white ring-1 ring-stone-200
                   dark:bg-slate-800 dark:ring-white/10 dark:text-indigo-100"
      >
        {value}
      </div>
    </div>
  );
}

function Spinner({ active }: { active: boolean }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      className={active ? "animate-spin" : ""}
      style={{ animationDuration: "800ms" }}
    >
      <circle
        cx={8}
        cy={8}
        r={6}
        stroke="currentColor"
        strokeWidth={2}
        fill="none"
        strokeDasharray={active ? "20 18" : "100 0"}
        opacity={active ? 1 : 0.3}
      />
    </svg>
  );
}

function formatValue(v: unknown): string {
  if (v === undefined) return "—";
  if (typeof v === "boolean") return v ? "true" : "false";
  if (typeof v === "string") return JSON.stringify(v);
  return String(v);
}

function themeClass(_theme: LoopResultConfig["theme"]): string {
  // All themes share the same base look; the backdrop differs.
  return "bg-stone-50 ring-stone-200 dark:bg-slate-900/40 dark:ring-white/10";
}

function ThemeBackdrop({ theme }: { theme: LoopResultConfig["theme"] }) {
  if (!theme || theme === "plain") return null;
  // Faint background SVG for theme flavour — stays behind the chips.
  return (
    <svg
      viewBox="0 0 400 200"
      className="absolute inset-0 w-full h-full opacity-15 dark:opacity-25"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      {theme === "stairs" && <StairsArt />}
      {theme === "letters" && <LettersArt />}
      {theme === "countdown" && <CountdownArt />}
      {theme === "tasting" && <TastingArt />}
    </svg>
  );
}

function StairsArt() {
  // Faint staircase climbing from bottom-left to upper-right.
  const steps = 6;
  const w = 50;
  const h = 22;
  const baseX = 40;
  const baseY = 180;
  return (
    <g className="fill-stone-300 dark:fill-slate-700">
      {Array.from({ length: steps }).map((_, i) => {
        const x = baseX + i * w;
        const y = baseY - i * h;
        return <rect key={i} x={x} y={y} width={w + 2} height={h * (i + 1)} />;
      })}
    </g>
  );
}

function LettersArt() {
  return (
    <g className="fill-stone-300 dark:fill-slate-700" fontFamily="ui-monospace, monospace" fontSize={28} fontWeight={700}>
      {["A", "B", "C", "D", "E", "F"].map((ch, i) => (
        <text key={i} x={50 + i * 55} y={120}>
          {ch}
        </text>
      ))}
    </g>
  );
}

function CountdownArt() {
  return (
    <g
      className="fill-stone-300 dark:fill-slate-700"
      fontFamily="ui-monospace, monospace"
      fontSize={120}
      fontWeight={800}
      textAnchor="middle"
    >
      <text x={200} y={150}>3</text>
    </g>
  );
}

function TastingArt() {
  // Simple bowl + spoon outline.
  return (
    <g className="fill-none stroke-stone-300 dark:stroke-slate-700" strokeWidth={4}>
      <ellipse cx={200} cy={130} rx={90} ry={20} />
      <path d="M110,130 Q200,210 290,130" />
      <line x1={250} y1={50} x2={300} y2={130} />
    </g>
  );
}
