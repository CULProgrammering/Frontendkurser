import { StickFigure } from "./StickFigure";
import { useLang } from "../../i18n/LanguageContext";
import { t } from "../../i18n";
import { useSlideFontSize } from "../SlideFontSize";

type Props = { step: number };

/**
 * Guided execution trace for the else-if chain.
 *
 * The code being traced:
 *
 *   let temp = ...;
 *
 *   if (temp <= 0) {
 *     return "coat";
 *   } else if (temp <= 15) {
 *     return "jacket";
 *   } else {
 *     return "shirt";
 *   }
 *
 * We walk through three different temperatures (-5, 10, 25) so students see
 * the chain decide between all three outcomes.
 */
export function WardrobeTraceScene({ step }: Props) {
  const { lang } = useLang();
  const s = stateAtStep(step);

  return (
    <div className="w-full h-full flex flex-col gap-3">
      <CodePanel
        tempValue={s.tempValue}
        highlight={s.highlight}
        evalNote={s.evalNote ? t(s.evalNote, lang) : undefined}
      />

      <div className="relative flex-1 rounded-2xl overflow-hidden
                      bg-stone-50 ring-1 ring-stone-200
                      dark:bg-slate-900/40 dark:ring-white/10">
        <svg
          viewBox="0 0 400 200"
          className="w-full h-full"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Floor */}
          <rect x={0} y={0} width={400} height={170} className="fill-stone-100 dark:fill-slate-900" />
          <rect x={0} y={170} width={400} height={30} className="fill-stone-300 dark:fill-slate-800" />

          {/* Thermometer */}
          <Thermometer x={70} y={40} value={s.tempValue} />

          {/* Stick figure with a coloured outfit rectangle layered on the torso */}
          <g className="text-stone-700 dark:text-indigo-100">
            {s.outcome && (
              <OutfitLayer x={300} outcome={s.outcome} />
            )}
            <StickFigure
              x={300}
              y={170}
              pose={s.outcome ? "wave" : "stand"}
            />
          </g>
        </svg>

        {s.outcome && (
          <div
            className={
              "absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-medium " +
              outcomeBadgeClass(s.outcome)
            }
          >
            {t(outcomeLabel(s.outcome), lang)}
          </div>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// State machine

type LineKey = "decl" | "if" | "ret-coat" | "elseif" | "ret-jacket" | "else" | "ret-shirt";
type Outcome = "coat" | "jacket" | "shirt";

type State = {
  /** The current value of `temp` in the trace, or null before declaration. */
  tempValue: number | null;
  highlight?: LineKey;
  evalNote?: { en: string; sv: string };
  outcome?: Outcome;
};

function stateAtStep(step: number): State {
  // Phase A: temp = -5 → matches first branch
  // Phase B: temp = 10 → matches else if
  // Phase C: temp = 25 → falls to else
  switch (step) {
    // Phase A: -5
    case 0:
      return { tempValue: null };
    case 1:
      return { tempValue: -5, highlight: "decl" };
    case 2:
      return { tempValue: -5, highlight: "if" };
    case 3:
      return {
        tempValue: -5,
        highlight: "if",
        evalNote: { en: "-5 <= 0  →  true", sv: "-5 <= 0  →  true" },
      };
    case 4:
      return {
        tempValue: -5,
        highlight: "ret-coat",
        outcome: "coat",
      };

    // Phase B: 10
    case 5:
      return { tempValue: 10, highlight: "decl" };
    case 6:
      return { tempValue: 10, highlight: "if" };
    case 7:
      return {
        tempValue: 10,
        highlight: "if",
        evalNote: { en: "10 <= 0  →  false", sv: "10 <= 0  →  false" },
      };
    case 8:
      return { tempValue: 10, highlight: "elseif" };
    case 9:
      return {
        tempValue: 10,
        highlight: "elseif",
        evalNote: { en: "10 <= 15  →  true", sv: "10 <= 15  →  true" },
      };
    case 10:
      return {
        tempValue: 10,
        highlight: "ret-jacket",
        outcome: "jacket",
      };

    // Phase C: 25
    case 11:
      return { tempValue: 25, highlight: "decl" };
    case 12:
      return { tempValue: 25, highlight: "if" };
    case 13:
      return {
        tempValue: 25,
        highlight: "if",
        evalNote: { en: "25 <= 0  →  false", sv: "25 <= 0  →  false" },
      };
    case 14:
      return { tempValue: 25, highlight: "elseif" };
    case 15:
      return {
        tempValue: 25,
        highlight: "elseif",
        evalNote: { en: "25 <= 15  →  false", sv: "25 <= 15  →  false" },
      };
    case 16:
      return { tempValue: 25, highlight: "else" };
    case 17:
      return {
        tempValue: 25,
        highlight: "ret-shirt",
        outcome: "shirt",
      };

    default:
      return { tempValue: 25, outcome: "shirt" };
  }
}

function outcomeLabel(o: Outcome) {
  switch (o) {
    case "coat":
      return { en: 'Returned "coat"', sv: 'Returnerade "coat"' };
    case "jacket":
      return { en: 'Returned "jacket"', sv: 'Returnerade "jacket"' };
    case "shirt":
      return { en: 'Returned "shirt"', sv: 'Returnerade "shirt"' };
  }
}

function outcomeBadgeClass(o: Outcome): string {
  switch (o) {
    case "coat":
      return "bg-sky-100 text-sky-800 dark:bg-sky-500/20 dark:text-sky-200";
    case "jacket":
      return "bg-amber-100 text-amber-800 dark:bg-amber-500/20 dark:text-amber-200";
    case "shirt":
      return "bg-rose-100 text-rose-800 dark:bg-rose-500/20 dark:text-rose-200";
  }
}

// ─────────────────────────────────────────────────────────
// Thermometer / outfit visuals

function Thermometer({ x, y, value }: { x: number; y: number; value: number | null }) {
  // Map -10..30 to 0..100 (mercury fill height in px, max 100).
  const mercury =
    value === null ? 0 : Math.max(2, Math.min(100, ((value + 10) / 40) * 100));
  const color =
    value === null
      ? "fill-stone-300 dark:fill-slate-600"
      : value <= 0
      ? "fill-sky-500"
      : value <= 15
      ? "fill-amber-400"
      : "fill-rose-500";
  return (
    <g transform={`translate(${x}, ${y})`}>
      <rect
        x={-9}
        y={0}
        width={18}
        height={108}
        rx={7}
        className="fill-white dark:fill-slate-700"
        stroke="currentColor"
        strokeWidth={1.5}
      />
      <rect
        x={-5}
        y={108 - mercury}
        width={10}
        height={mercury}
        className={color}
        style={{ transition: "all 600ms ease-out" }}
      />
      <circle cx={0} cy={118} r={14} className={color} />
      {value !== null && (
        <text
          x={22}
          y={62}
          fontSize={14}
          className="fill-stone-700 dark:fill-indigo-100"
          fontWeight={700}
          fontFamily="ui-monospace, monospace"
        >
          {value}°C
        </text>
      )}
    </g>
  );
}

function OutfitLayer({ x, outcome }: { x: number; outcome: Outcome }) {
  // Body (torso) in the StickFigure spans roughly y = -42..-14 from feet origin.
  // We layer a coloured rectangle over the torso to represent the outfit.
  const fill =
    outcome === "coat"
      ? "fill-sky-400"
      : outcome === "jacket"
      ? "fill-amber-400"
      : "fill-rose-300";
  const height = outcome === "coat" ? 38 : outcome === "jacket" ? 28 : 18;
  return (
    <rect
      x={x - 10}
      y={170 - height - 14 /* sit above hip */}
      width={20}
      height={height}
      rx={3}
      className={fill}
      style={{ transition: "all 600ms ease-out" }}
    />
  );
}

// ─────────────────────────────────────────────────────────
// Code panel

function CodePanel({
  tempValue,
  highlight,
  evalNote,
}: {
  tempValue: number | null;
  highlight?: LineKey;
  evalNote?: string;
}) {
  const { codePx } = useSlideFontSize();
  return (
    <div
      className="rounded-2xl px-5 py-4 font-mono leading-relaxed
                    bg-white ring-1 ring-stone-200 shadow-sm
                    dark:bg-slate-900/60 dark:ring-white/10"
      style={{ fontSize: `${codePx}px` }}
    >
      <Line lineKey="decl" highlight={highlight}>
        <span>let temp = </span>
        <span className="text-amber-600 dark:text-amber-300">
          {tempValue === null ? "?" : tempValue}
        </span>
        <span>;</span>
      </Line>
      <Line>{" "}</Line>
      <Line lineKey="if" highlight={highlight}>
        <span>if (temp &lt;= </span>
        <span className="text-amber-600 dark:text-amber-300">0</span>
        <span>) {`{`}</span>
        {highlight === "if" && evalNote && <EvalChip text={evalNote} />}
      </Line>
      <Line lineKey="ret-coat" highlight={highlight} indent>
        <span className="text-purple-600 dark:text-purple-300">return</span>{" "}
        <span className="text-emerald-600 dark:text-emerald-300">"coat"</span>;
      </Line>
      <Line lineKey="elseif" highlight={highlight}>
        <span>{`} else if (temp <= `}</span>
        <span className="text-amber-600 dark:text-amber-300">15</span>
        <span>{`) {`}</span>
        {highlight === "elseif" && evalNote && <EvalChip text={evalNote} />}
      </Line>
      <Line lineKey="ret-jacket" highlight={highlight} indent>
        <span className="text-purple-600 dark:text-purple-300">return</span>{" "}
        <span className="text-emerald-600 dark:text-emerald-300">"jacket"</span>;
      </Line>
      <Line lineKey="else" highlight={highlight}>
        <span>{`} else {`}</span>
      </Line>
      <Line lineKey="ret-shirt" highlight={highlight} indent>
        <span className="text-purple-600 dark:text-purple-300">return</span>{" "}
        <span className="text-emerald-600 dark:text-emerald-300">"shirt"</span>;
      </Line>
      <Line>{"}"}</Line>
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
