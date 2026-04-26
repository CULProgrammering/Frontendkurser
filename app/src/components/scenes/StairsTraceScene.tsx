import { StickFigure } from "./StickFigure";
import { useLang } from "../../i18n/LanguageContext";
import { t } from "../../i18n";

type Props = { step: number };

/**
 * Guided execution trace for the for-loop.
 *
 * The code being traced:
 *
 *   let sum = 0;
 *   for (let i = 1; i <= 3; i++) {
 *     sum += i;
 *   }
 *   return sum;
 *
 * The figure climbs three stairs while the trace highlights the for parts:
 * init, condition, body, update — and the running `i` and `sum` values.
 */
export function StairsTraceScene({ step }: Props) {
  const { lang } = useLang();
  const s = stateAtStep(step);

  return (
    <div className="w-full h-full flex flex-col gap-3">
      <CodePanel
        iValue={s.iValue}
        sumValue={s.sumValue}
        highlight={s.highlight}
        evalNote={s.evalNote ? t(s.evalNote, lang) : undefined}
      />

      <div className="relative flex-1 rounded-2xl overflow-hidden
                      bg-stone-50 ring-1 ring-stone-200
                      dark:bg-slate-900/40 dark:ring-white/10">
        <Stairs figureStep={s.climbedTo} />

        {/* Side panel: i and sum */}
        <div className="absolute top-3 left-3 flex flex-col gap-1 font-mono text-xs">
          <Counter label="i" value={s.iValue} active={s.highlight === "init" || s.highlight === "cond" || s.highlight === "update"} />
          <Counter label="sum" value={s.sumValue} active={s.highlight === "decl" || s.highlight === "body"} />
        </div>

        {s.outcome !== undefined && (
          <div className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-medium
                          bg-emerald-100 text-emerald-700
                          dark:bg-emerald-500/20 dark:text-emerald-200">
            {t({ en: "Returned", sv: "Returnerade" }, lang)} {s.outcome}
          </div>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// State machine

type LineKey = "decl" | "init" | "cond" | "body" | "update" | "ret";

type State = {
  iValue: number | null;
  sumValue: number;
  /** How many stair-steps the figure has climbed (visual). */
  climbedTo: number;
  highlight?: LineKey;
  evalNote?: { en: string; sv: string };
  outcome?: number;
};

function stateAtStep(step: number): State {
  switch (step) {
    case 0:
      return { iValue: null, sumValue: 0, climbedTo: 0 };
    case 1:
      // sum = 0
      return { iValue: null, sumValue: 0, climbedTo: 0, highlight: "decl" };
    case 2:
      // for init: i = 1
      return { iValue: 1, sumValue: 0, climbedTo: 0, highlight: "init" };
    case 3:
      // condition check: 1 <= 3 → true
      return {
        iValue: 1,
        sumValue: 0,
        climbedTo: 0,
        highlight: "cond",
        evalNote: { en: "1 <= 3  →  true", sv: "1 <= 3  →  true" },
      };
    case 4:
      // body: sum += i → sum = 1
      return {
        iValue: 1,
        sumValue: 1,
        climbedTo: 1,
        highlight: "body",
        evalNote: { en: "sum = 0 + 1  →  1", sv: "sum = 0 + 1  →  1" },
      };
    case 5:
      // update: i++ → i = 2
      return { iValue: 2, sumValue: 1, climbedTo: 1, highlight: "update" };
    case 6:
      return {
        iValue: 2,
        sumValue: 1,
        climbedTo: 1,
        highlight: "cond",
        evalNote: { en: "2 <= 3  →  true", sv: "2 <= 3  →  true" },
      };
    case 7:
      return {
        iValue: 2,
        sumValue: 3,
        climbedTo: 2,
        highlight: "body",
        evalNote: { en: "sum = 1 + 2  →  3", sv: "sum = 1 + 2  →  3" },
      };
    case 8:
      return { iValue: 3, sumValue: 3, climbedTo: 2, highlight: "update" };
    case 9:
      return {
        iValue: 3,
        sumValue: 3,
        climbedTo: 2,
        highlight: "cond",
        evalNote: { en: "3 <= 3  →  true", sv: "3 <= 3  →  true" },
      };
    case 10:
      return {
        iValue: 3,
        sumValue: 6,
        climbedTo: 3,
        highlight: "body",
        evalNote: { en: "sum = 3 + 3  →  6", sv: "sum = 3 + 3  →  6" },
      };
    case 11:
      return { iValue: 4, sumValue: 6, climbedTo: 3, highlight: "update" };
    case 12:
      return {
        iValue: 4,
        sumValue: 6,
        climbedTo: 3,
        highlight: "cond",
        evalNote: { en: "4 <= 3  →  false  (exit loop)", sv: "4 <= 3  →  false  (lämna loopen)" },
      };
    case 13:
      return {
        iValue: 4,
        sumValue: 6,
        climbedTo: 3,
        highlight: "ret",
        outcome: 6,
      };
    default:
      return { iValue: 4, sumValue: 6, climbedTo: 3, outcome: 6 };
  }
}

// ─────────────────────────────────────────────────────────
// Stairs visual

function Stairs({ figureStep }: { figureStep: number }) {
  const totalSteps = 4; // 0..3 visible
  const stepWidth = 60;
  const stepHeight = 22;
  const baseX = 70;
  const baseY = 180;

  const figX = baseX + figureStep * stepWidth + stepWidth / 2;
  const figY = baseY - figureStep * stepHeight;

  return (
    <svg
      viewBox="0 0 400 200"
      className="w-full h-full"
      preserveAspectRatio="xMidYMid meet"
    >
      <rect x={0} y={0} width={400} height={200} className="fill-stone-100 dark:fill-slate-900" />

      {Array.from({ length: totalSteps }).map((_, i) => {
        const x = baseX + i * stepWidth;
        const y = baseY - i * stepHeight;
        const reached = i <= figureStep;
        return (
          <g key={i}>
            <rect
              x={x}
              y={y}
              width={stepWidth + 2}
              height={(i + 1) * stepHeight + 1}
              className={
                reached
                  ? "fill-amber-200 dark:fill-amber-500/30"
                  : "fill-stone-200 dark:fill-slate-800"
              }
              stroke="currentColor"
              strokeWidth={1}
              opacity={0.9}
            />
            <text
              x={x + stepWidth / 2}
              y={y + 14}
              textAnchor="middle"
              fontSize={11}
              fontWeight={700}
              className={
                reached
                  ? "fill-amber-700 dark:fill-amber-200"
                  : "fill-stone-400 dark:fill-slate-500"
              }
              fontFamily="ui-monospace, monospace"
            >
              {i}
            </text>
          </g>
        );
      })}

      <g
        className="text-stone-700 dark:text-indigo-100"
        style={{
          transition: "transform 600ms ease-out",
          transform: `translate(${figX - 60}px, ${figY - 180}px)`,
        }}
      >
        <StickFigure x={60} y={180} pose={figureStep === 0 ? "stand" : "walk-right"} />
      </g>
    </svg>
  );
}

function Counter({
  label,
  value,
  active,
}: {
  label: string;
  value: number | null;
  active?: boolean;
}) {
  return (
    <div
      className={
        "px-2 py-1 rounded-md ring-1 transition-colors " +
        (active
          ? "bg-amber-100 ring-amber-300 text-amber-900 dark:bg-amber-500/20 dark:text-amber-100 dark:ring-amber-400/40"
          : "bg-white ring-stone-200 text-stone-700 dark:bg-slate-800 dark:ring-white/10 dark:text-indigo-100")
      }
    >
      {label} = {value === null ? "?" : value}
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// Code panel

function CodePanel({
  highlight,
  evalNote,
}: {
  iValue: number | null;
  sumValue: number;
  highlight?: LineKey;
  evalNote?: string;
}) {
  return (
    <div className="rounded-2xl px-5 py-4 font-mono text-sm leading-relaxed
                    bg-white ring-1 ring-stone-200 shadow-sm
                    dark:bg-slate-900/60 dark:ring-white/10">
      <Line lineKey="decl" highlight={highlight}>
        <span>let sum = </span>
        <span className="text-amber-600 dark:text-amber-300">0</span>;
      </Line>
      <Line>{" "}</Line>
      <Line lineKey={highlight === "init" || highlight === "cond" || highlight === "update" ? highlight : undefined} highlight={highlight}>
        <span className="text-purple-600 dark:text-purple-300">for</span>
        <span> (</span>
        <Span on={highlight === "init"}>let i = <span className="text-amber-600 dark:text-amber-300">1</span></Span>
        <span>; </span>
        <Span on={highlight === "cond"}>i &lt;= <span className="text-amber-600 dark:text-amber-300">3</span></Span>
        <span>; </span>
        <Span on={highlight === "update"}>i++</Span>
        <span>) {`{`}</span>
        {(highlight === "cond" || highlight === "init" || highlight === "update") && evalNote && (
          <EvalChip text={evalNote} />
        )}
      </Line>
      <Line lineKey="body" highlight={highlight} indent>
        <span>sum = sum + i;</span>
        {highlight === "body" && evalNote && <EvalChip text={evalNote} />}
      </Line>
      <Line>{`}`}</Line>
      <Line lineKey="ret" highlight={highlight}>
        <span className="text-purple-600 dark:text-purple-300">return</span>{" "}
        <span>sum;</span>
      </Line>
    </div>
  );
}

function EvalChip({ text }: { text: string }) {
  return (
    <span className="ml-3 inline-block px-2 py-0.5 rounded-md
                     bg-amber-100 text-amber-800 ring-1 ring-amber-300
                     dark:bg-amber-500/15 dark:text-amber-200 dark:ring-amber-400/30
                     text-xs">
      {text}
    </span>
  );
}

function Span({ on, children }: { on?: boolean; children: React.ReactNode }) {
  return (
    <span
      className={
        on
          ? "px-1 rounded bg-amber-200/70 text-stone-900 dark:bg-amber-400/30 dark:text-indigo-50"
          : ""
      }
    >
      {children}
    </span>
  );
}

function Line({
  children,
  lineKey,
  highlight,
  indent,
}: {
  children: React.ReactNode;
  lineKey?: LineKey;
  highlight?: LineKey;
  indent?: boolean;
}) {
  const isHighlighted = !!lineKey && lineKey === highlight;
  return (
    <div
      className={
        "px-2 -mx-2 rounded transition-colors " +
        (indent ? "pl-6 " : "") +
        (isHighlighted
          ? "bg-amber-100 dark:bg-amber-500/15 text-stone-900 dark:text-indigo-50"
          : "text-stone-700 dark:text-indigo-100")
      }
    >
      {children}
    </div>
  );
}
