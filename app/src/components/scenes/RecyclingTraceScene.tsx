import { StickFigure } from "./StickFigure";
import { useLang } from "../../i18n/LanguageContext";
import { t } from "../../i18n";

type Props = { step: number };

/**
 * Guided execution trace for the switch statement.
 *
 * The code being traced:
 *
 *   let item = ...;
 *
 *   switch (item) {
 *     case "paper":
 *       return "paper-bin";
 *     case "glass":
 *       return "glass-bin";
 *     case "plastic":
 *       return "plastic-bin";
 *     default:
 *       return "rest-bin";
 *   }
 *
 * We walk through three values: "paper", "glass", and "banana" (an unknown
 * item that falls through to default).
 */
export function RecyclingTraceScene({ step }: Props) {
  const { lang } = useLang();
  const s = stateAtStep(step);

  return (
    <div className="w-full h-full flex flex-col gap-3">
      <CodePanel
        itemValue={s.itemValue}
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

          <Bins targetBinKey={s.targetBin} />

          {/* Item flying from the figure's hand to the target bin */}
          {s.itemValue !== null && s.targetBin && (
            <FlyingItem itemValue={s.itemValue} targetBinKey={s.targetBin} />
          )}

          {/* Stick figure */}
          <g className="text-stone-700 dark:text-indigo-100">
            <StickFigure
              x={50}
              y={170}
              pose="carry"
              holding={
                s.itemValue !== null && !s.targetBin
                  ? { label: itemEmoji(s.itemValue), fill: itemColor(s.itemValue) }
                  : undefined
              }
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

type LineKey =
  | "decl"
  | "switch"
  | "case-paper"
  | "ret-paper"
  | "case-glass"
  | "ret-glass"
  | "case-plastic"
  | "ret-plastic"
  | "default"
  | "ret-rest";

type BinKey = "paper" | "glass" | "plastic" | "rest";

type State = {
  itemValue: string | null;
  highlight?: LineKey;
  evalNote?: { en: string; sv: string };
  /** When set, the item flies into this bin. */
  targetBin?: BinKey;
  outcome?: BinKey;
};

function stateAtStep(step: number): State {
  switch (step) {
    case 0:
      return { itemValue: null };

    // Phase A: paper
    case 1:
      return { itemValue: "paper", highlight: "decl" };
    case 2:
      return { itemValue: "paper", highlight: "switch" };
    case 3:
      return {
        itemValue: "paper",
        highlight: "case-paper",
        evalNote: { en: '"paper" === "paper"  →  match', sv: '"paper" === "paper"  →  match' },
      };
    case 4:
      return {
        itemValue: "paper",
        highlight: "ret-paper",
        targetBin: "paper",
        outcome: "paper",
      };

    // Phase B: glass
    case 5:
      return { itemValue: "glass", highlight: "decl" };
    case 6:
      return { itemValue: "glass", highlight: "switch" };
    case 7:
      return {
        itemValue: "glass",
        highlight: "case-paper",
        evalNote: { en: '"glass" === "paper"  →  no', sv: '"glass" === "paper"  →  nej' },
      };
    case 8:
      return {
        itemValue: "glass",
        highlight: "case-glass",
        evalNote: { en: '"glass" === "glass"  →  match', sv: '"glass" === "glass"  →  match' },
      };
    case 9:
      return {
        itemValue: "glass",
        highlight: "ret-glass",
        targetBin: "glass",
        outcome: "glass",
      };

    // Phase C: banana (unknown — falls to default)
    case 10:
      return { itemValue: "banana", highlight: "decl" };
    case 11:
      return { itemValue: "banana", highlight: "switch" };
    case 12:
      return {
        itemValue: "banana",
        highlight: "case-paper",
        evalNote: { en: '"banana" === "paper"  →  no', sv: '"banana" === "paper"  →  nej' },
      };
    case 13:
      return {
        itemValue: "banana",
        highlight: "case-glass",
        evalNote: { en: '"banana" === "glass"  →  no', sv: '"banana" === "glass"  →  nej' },
      };
    case 14:
      return {
        itemValue: "banana",
        highlight: "case-plastic",
        evalNote: { en: '"banana" === "plastic"  →  no', sv: '"banana" === "plastic"  →  nej' },
      };
    case 15:
      return {
        itemValue: "banana",
        highlight: "default",
        evalNote: { en: "no case matched — default runs", sv: "ingen case matchade — default körs" },
      };
    case 16:
      return {
        itemValue: "banana",
        highlight: "ret-rest",
        targetBin: "rest",
        outcome: "rest",
      };

    default:
      return { itemValue: "banana", targetBin: "rest", outcome: "rest" };
  }
}

function itemEmoji(value: string): string {
  switch (value) {
    case "paper":
      return "📰";
    case "glass":
      return "🍾";
    case "plastic":
      return "🥤";
    default:
      return "?";
  }
}

function itemColor(value: string): string {
  switch (value) {
    case "paper":
      return "#fef3c7";
    case "glass":
      return "#bae6fd";
    case "plastic":
      return "#fbcfe8";
    default:
      return "#d6d3d1";
  }
}

function outcomeLabel(o: BinKey) {
  switch (o) {
    case "paper":
      return { en: 'Returned "paper-bin"', sv: 'Returnerade "paper-bin"' };
    case "glass":
      return { en: 'Returned "glass-bin"', sv: 'Returnerade "glass-bin"' };
    case "plastic":
      return { en: 'Returned "plastic-bin"', sv: 'Returnerade "plastic-bin"' };
    case "rest":
      return { en: 'default → returned "rest-bin"', sv: 'default → returnerade "rest-bin"' };
  }
}

function outcomeBadgeClass(o: BinKey): string {
  switch (o) {
    case "paper":
      return "bg-amber-100 text-amber-800 dark:bg-amber-500/20 dark:text-amber-200";
    case "glass":
      return "bg-sky-100 text-sky-800 dark:bg-sky-500/20 dark:text-sky-200";
    case "plastic":
      return "bg-pink-100 text-pink-800 dark:bg-pink-500/20 dark:text-pink-200";
    case "rest":
      return "bg-stone-200 text-stone-700 dark:bg-slate-700 dark:text-indigo-100";
  }
}

// ─────────────────────────────────────────────────────────
// Bins + flying item

const BIN_X: Record<BinKey, number> = {
  paper: 160,
  glass: 230,
  plastic: 300,
  rest: 360,
};

function Bins({ targetBinKey }: { targetBinKey?: BinKey }) {
  const bins: { key: BinKey; label: string; cls: string }[] = [
    { key: "paper", label: "paper", cls: "fill-amber-300 dark:fill-amber-500/60" },
    { key: "glass", label: "glass", cls: "fill-sky-300 dark:fill-sky-500/60" },
    { key: "plastic", label: "plastic", cls: "fill-pink-300 dark:fill-pink-500/60" },
    { key: "rest", label: "rest", cls: "fill-stone-400 dark:fill-slate-500" },
  ];
  return (
    <>
      {bins.map((b) => (
        <g key={b.key}>
          <rect
            x={BIN_X[b.key] - 22}
            y={110}
            width={44}
            height={60}
            rx={3}
            className={b.cls}
            stroke="currentColor"
            strokeWidth={1.5}
          />
          <rect
            x={BIN_X[b.key] - 26}
            y={104}
            width={52}
            height={8}
            rx={2}
            className="fill-stone-600 dark:fill-slate-700"
          />
          <text
            x={BIN_X[b.key]}
            y={150}
            textAnchor="middle"
            fontSize={10}
            fontWeight={600}
            className="fill-stone-700 dark:fill-indigo-100"
          >
            {b.label}
          </text>
          {targetBinKey === b.key && (
            <rect
              x={BIN_X[b.key] - 24}
              y={108}
              width={48}
              height={64}
              rx={4}
              fill="none"
              className="stroke-emerald-500"
              strokeWidth={2.5}
            />
          )}
        </g>
      ))}
    </>
  );
}

function FlyingItem({ itemValue, targetBinKey }: { itemValue: string; targetBinKey: BinKey }) {
  const targetX = BIN_X[targetBinKey];
  return (
    <g
      style={{
        transition: "transform 700ms ease-out",
        transform: `translate(${targetX - 60}px, -10px)`,
      }}
    >
      <rect
        x={56}
        y={120}
        width={18}
        height={18}
        rx={2}
        fill={itemColor(itemValue)}
        stroke="currentColor"
        strokeWidth={1.5}
      />
      <text x={65} y={134} textAnchor="middle" fontSize={10}>
        {itemEmoji(itemValue)}
      </text>
    </g>
  );
}

// ─────────────────────────────────────────────────────────
// Code panel

function CodePanel({
  itemValue,
  highlight,
  evalNote,
}: {
  itemValue: string | null;
  highlight?: LineKey;
  evalNote?: string;
}) {
  return (
    <div className="rounded-2xl px-5 py-4 font-mono text-xs leading-relaxed
                    bg-white ring-1 ring-stone-200 shadow-sm
                    dark:bg-slate-900/60 dark:ring-white/10">
      <Line lineKey="decl" highlight={highlight}>
        <span>let item = </span>
        <span className="text-emerald-600 dark:text-emerald-300">
          {itemValue === null ? '"?"' : `"${itemValue}"`}
        </span>
        <span>;</span>
      </Line>
      <Line>{" "}</Line>
      <Line lineKey="switch" highlight={highlight}>
        <span className="text-purple-600 dark:text-purple-300">switch</span>
        <span> (item) {"{"}</span>
      </Line>

      <Line lineKey="case-paper" highlight={highlight} indent>
        <span className="text-purple-600 dark:text-purple-300">case</span>{" "}
        <span className="text-emerald-600 dark:text-emerald-300">"paper"</span>:
        {highlight === "case-paper" && evalNote && <EvalChip text={evalNote} />}
      </Line>
      <Line lineKey="ret-paper" highlight={highlight} indent2>
        <span className="text-purple-600 dark:text-purple-300">return</span>{" "}
        <span className="text-emerald-600 dark:text-emerald-300">"paper-bin"</span>;
      </Line>

      <Line lineKey="case-glass" highlight={highlight} indent>
        <span className="text-purple-600 dark:text-purple-300">case</span>{" "}
        <span className="text-emerald-600 dark:text-emerald-300">"glass"</span>:
        {highlight === "case-glass" && evalNote && <EvalChip text={evalNote} />}
      </Line>
      <Line lineKey="ret-glass" highlight={highlight} indent2>
        <span className="text-purple-600 dark:text-purple-300">return</span>{" "}
        <span className="text-emerald-600 dark:text-emerald-300">"glass-bin"</span>;
      </Line>

      <Line lineKey="case-plastic" highlight={highlight} indent>
        <span className="text-purple-600 dark:text-purple-300">case</span>{" "}
        <span className="text-emerald-600 dark:text-emerald-300">"plastic"</span>:
        {highlight === "case-plastic" && evalNote && <EvalChip text={evalNote} />}
      </Line>
      <Line lineKey="ret-plastic" highlight={highlight} indent2>
        <span className="text-purple-600 dark:text-purple-300">return</span>{" "}
        <span className="text-emerald-600 dark:text-emerald-300">"plastic-bin"</span>;
      </Line>

      <Line lineKey="default" highlight={highlight} indent>
        <span className="text-purple-600 dark:text-purple-300">default</span>:
        {highlight === "default" && evalNote && <EvalChip text={evalNote} />}
      </Line>
      <Line lineKey="ret-rest" highlight={highlight} indent2>
        <span className="text-purple-600 dark:text-purple-300">return</span>{" "}
        <span className="text-emerald-600 dark:text-emerald-300">"rest-bin"</span>;
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
  indent2,
}: {
  children: React.ReactNode;
  lineKey?: LineKey;
  highlight?: LineKey;
  indent?: boolean;
  indent2?: boolean;
}) {
  const isHighlighted = !!lineKey && lineKey === highlight;
  const pad = indent2 ? "pl-10 " : indent ? "pl-6 " : "";
  return (
    <div
      className={
        "px-2 -mx-2 rounded transition-colors " +
        pad +
        (isHighlighted
          ? "bg-amber-100 dark:bg-amber-500/15 text-stone-900 dark:text-indigo-50"
          : "text-stone-700 dark:text-indigo-100")
      }
    >
      {children}
    </div>
  );
}
