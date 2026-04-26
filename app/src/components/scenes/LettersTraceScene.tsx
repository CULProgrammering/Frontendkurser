import { useLang } from "../../i18n/LanguageContext";
import { t } from "../../i18n";

type Props = { step: number };

/**
 * Guided trace for `for...of`.
 *
 * The code being traced:
 *
 *   let count = 0;
 *   for (const ch of "ABA") {
 *     if (ch === "A") {
 *       count = count + 1;
 *     }
 *   }
 *   return count;
 *
 * Each lap: one character is delivered to `ch`, then the body decides
 * whether to bump count.
 */
export function LettersTraceScene({ step }: Props) {
  const { lang } = useLang();
  const s = stateAtStep(step);

  return (
    <div className="w-full h-full flex flex-col gap-3">
      <CodePanel
        chValue={s.chValue}
        countValue={s.countValue}
        highlight={s.highlight}
        evalNote={s.evalNote ? t(s.evalNote, lang) : undefined}
      />

      <div className="relative flex-1 rounded-2xl overflow-hidden
                      bg-stone-50 ring-1 ring-stone-200
                      dark:bg-slate-900/40 dark:ring-white/10">
        <LettersBoard activeIndex={s.activeIndex} />

        <div className="absolute top-3 left-3 flex flex-col gap-1 font-mono text-xs">
          <Counter label="ch" value={s.chValue ? `"${s.chValue}"` : "?"} active={s.highlight === "for" || s.highlight === "if"} />
          <Counter label="count" value={String(s.countValue)} active={s.highlight === "body"} />
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

const WORD = "ABA";

type LineKey = "decl" | "for" | "if" | "body" | "ret";

type State = {
  /** Index of the letter currently being processed, or null if none yet. */
  activeIndex: number | null;
  /** Value of `ch` in this state, or null. */
  chValue: string | null;
  countValue: number;
  highlight?: LineKey;
  evalNote?: { en: string; sv: string };
  outcome?: number;
};

function stateAtStep(step: number): State {
  switch (step) {
    case 0:
      return { activeIndex: null, chValue: null, countValue: 0 };
    case 1:
      // count = 0
      return {
        activeIndex: null,
        chValue: null,
        countValue: 0,
        highlight: "decl",
      };
    // Lap 1: ch = "A"
    case 2:
      return {
        activeIndex: 0,
        chValue: "A",
        countValue: 0,
        highlight: "for",
        evalNote: { en: 'first letter → ch = "A"', sv: 'första bokstaven → ch = "A"' },
      };
    case 3:
      return {
        activeIndex: 0,
        chValue: "A",
        countValue: 0,
        highlight: "if",
        evalNote: { en: '"A" === "A"  →  true', sv: '"A" === "A"  →  true' },
      };
    case 4:
      return {
        activeIndex: 0,
        chValue: "A",
        countValue: 1,
        highlight: "body",
        evalNote: { en: "count = 0 + 1  →  1", sv: "count = 0 + 1  →  1" },
      };
    // Lap 2: ch = "B"
    case 5:
      return {
        activeIndex: 1,
        chValue: "B",
        countValue: 1,
        highlight: "for",
        evalNote: { en: 'next letter → ch = "B"', sv: 'nästa bokstav → ch = "B"' },
      };
    case 6:
      return {
        activeIndex: 1,
        chValue: "B",
        countValue: 1,
        highlight: "if",
        evalNote: { en: '"B" === "A"  →  false  (skip body)', sv: '"B" === "A"  →  false  (hoppa över)' },
      };
    // Lap 3: ch = "A"
    case 7:
      return {
        activeIndex: 2,
        chValue: "A",
        countValue: 1,
        highlight: "for",
        evalNote: { en: 'next letter → ch = "A"', sv: 'nästa bokstav → ch = "A"' },
      };
    case 8:
      return {
        activeIndex: 2,
        chValue: "A",
        countValue: 1,
        highlight: "if",
        evalNote: { en: '"A" === "A"  →  true', sv: '"A" === "A"  →  true' },
      };
    case 9:
      return {
        activeIndex: 2,
        chValue: "A",
        countValue: 2,
        highlight: "body",
        evalNote: { en: "count = 1 + 1  →  2", sv: "count = 1 + 1  →  2" },
      };
    // No more letters → exit loop, return
    case 10:
      return {
        activeIndex: null,
        chValue: "A",
        countValue: 2,
        highlight: "ret",
        evalNote: { en: "no more letters — exit loop", sv: "inga fler bokstäver — lämna loopen" },
      };
    case 11:
      return {
        activeIndex: null,
        chValue: "A",
        countValue: 2,
        highlight: "ret",
        outcome: 2,
      };
    default:
      return { activeIndex: null, chValue: "A", countValue: 2, outcome: 2 };
  }
}

// ─────────────────────────────────────────────────────────
// Letters board

function LettersBoard({ activeIndex }: { activeIndex: number | null }) {
  const slotW = 60;
  const slotH = 60;
  const baseX = 110;
  const baseY = 70;

  return (
    <svg
      viewBox="0 0 400 200"
      className="w-full h-full"
      preserveAspectRatio="xMidYMid meet"
    >
      <rect x={0} y={0} width={400} height={200} className="fill-stone-100 dark:fill-slate-900" />

      {WORD.split("").map((ch, i) => {
        const x = baseX + i * slotW;
        const isActive = activeIndex === i;
        return (
          <g key={i}>
            <rect
              x={x}
              y={baseY}
              width={slotW - 6}
              height={slotH}
              rx={6}
              className={
                isActive
                  ? "fill-amber-300 dark:fill-amber-500/40"
                  : "fill-stone-200 dark:fill-slate-800"
              }
              stroke="currentColor"
              strokeWidth={isActive ? 2 : 1}
              style={{ transition: "all 350ms ease-out" }}
            />
            <text
              x={x + (slotW - 6) / 2}
              y={baseY + slotH / 2 + 8}
              textAnchor="middle"
              fontSize={26}
              fontWeight={700}
              fontFamily="ui-monospace, monospace"
              className={
                isActive
                  ? "fill-amber-900 dark:fill-amber-100"
                  : "fill-stone-500 dark:fill-slate-400"
              }
            >
              {ch}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

function Counter({
  label,
  value,
  active,
}: {
  label: string;
  value: string;
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
      {label} = {value}
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// Code panel

function CodePanel({
  highlight,
  evalNote,
}: {
  chValue: string | null;
  countValue: number;
  highlight?: LineKey;
  evalNote?: string;
}) {
  return (
    <div className="rounded-2xl px-5 py-4 font-mono text-sm leading-relaxed
                    bg-white ring-1 ring-stone-200 shadow-sm
                    dark:bg-slate-900/60 dark:ring-white/10">
      <Line lineKey="decl" highlight={highlight}>
        <span>let count = </span>
        <span className="text-amber-600 dark:text-amber-300">0</span>;
      </Line>
      <Line>{" "}</Line>
      <Line lineKey="for" highlight={highlight}>
        <span className="text-purple-600 dark:text-purple-300">for</span>
        <span> (</span>
        <span className="text-purple-600 dark:text-purple-300">const</span>
        <span> ch </span>
        <span className="text-purple-600 dark:text-purple-300">of</span>
        <span> </span>
        <span className="text-emerald-600 dark:text-emerald-300">"ABA"</span>
        <span>) {`{`}</span>
        {highlight === "for" && evalNote && <EvalChip text={evalNote} />}
      </Line>
      <Line lineKey="if" highlight={highlight} indent>
        <span className="text-purple-600 dark:text-purple-300">if</span>
        <span> (ch === </span>
        <span className="text-emerald-600 dark:text-emerald-300">"A"</span>
        <span>) {`{`}</span>
        {highlight === "if" && evalNote && <EvalChip text={evalNote} />}
      </Line>
      <Line lineKey="body" highlight={highlight} indent2>
        <span>count = count + </span>
        <span className="text-amber-600 dark:text-amber-300">1</span>;
        {highlight === "body" && evalNote && <EvalChip text={evalNote} />}
      </Line>
      <Line indent>{`}`}</Line>
      <Line>{`}`}</Line>
      <Line lineKey="ret" highlight={highlight}>
        <span className="text-purple-600 dark:text-purple-300">return</span>
        <span> count;</span>
        {highlight === "ret" && evalNote && <EvalChip text={evalNote} />}
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
