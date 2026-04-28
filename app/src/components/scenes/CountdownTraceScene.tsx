import { useLang } from "../../i18n/LanguageContext";
import { t } from "../../i18n";
import { useSlideFontSize } from "../SlideFontSize";

type Props = { step: number };

/**
 * Guided trace for the while loop.
 *
 * The code being traced:
 *
 *   let n = 3;
 *
 *   while (n > 0) {
 *     n = n - 1;
 *   }
 *   return n;
 *
 * Each lap: check the condition first; if true, run body and loop.
 */
export function CountdownTraceScene({ step }: Props) {
  const { lang } = useLang();
  const s = stateAtStep(step);

  return (
    <div className="w-full h-full flex flex-col gap-3">
      <CodePanel
        nValue={s.nValue}
        highlight={s.highlight}
        evalNote={s.evalNote ? t(s.evalNote, lang) : undefined}
      />

      <div className="relative flex-1 rounded-2xl overflow-hidden
                      bg-stone-50 ring-1 ring-stone-200
                      dark:bg-slate-900/40 dark:ring-white/10">
        <BigNumber value={s.nValue} liftoff={s.outcome !== undefined} />

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

type LineKey = "decl" | "while" | "body" | "ret";

type State = {
  nValue: number | null;
  highlight?: LineKey;
  evalNote?: { en: string; sv: string };
  outcome?: number;
};

function stateAtStep(step: number): State {
  switch (step) {
    case 0:
      return { nValue: null };
    case 1:
      // n = 3
      return { nValue: 3, highlight: "decl" };
    case 2:
      // condition: 3 > 0 → true
      return {
        nValue: 3,
        highlight: "while",
        evalNote: { en: "3 > 0  →  true  (run body)", sv: "3 > 0  →  true  (kör kropp)" },
      };
    case 3:
      // body: n becomes 2
      return {
        nValue: 2,
        highlight: "body",
        evalNote: { en: "n = 3 - 1  →  2", sv: "n = 3 - 1  →  2" },
      };
    case 4:
      // condition: 2 > 0 → true
      return {
        nValue: 2,
        highlight: "while",
        evalNote: { en: "2 > 0  →  true  (run body)", sv: "2 > 0  →  true  (kör kropp)" },
      };
    case 5:
      // body: n becomes 1
      return {
        nValue: 1,
        highlight: "body",
        evalNote: { en: "n = 2 - 1  →  1", sv: "n = 2 - 1  →  1" },
      };
    case 6:
      // condition: 1 > 0 → true
      return {
        nValue: 1,
        highlight: "while",
        evalNote: { en: "1 > 0  →  true  (run body)", sv: "1 > 0  →  true  (kör kropp)" },
      };
    case 7:
      // body: n becomes 0
      return {
        nValue: 0,
        highlight: "body",
        evalNote: { en: "n = 1 - 1  →  0", sv: "n = 1 - 1  →  0" },
      };
    case 8:
      // condition: 0 > 0 → false. Exit loop.
      return {
        nValue: 0,
        highlight: "while",
        evalNote: { en: "0 > 0  →  false  (exit loop)", sv: "0 > 0  →  false  (lämna loopen)" },
      };
    case 9:
      // return n → 0
      return {
        nValue: 0,
        highlight: "ret",
        outcome: 0,
      };
    default:
      return { nValue: 0, outcome: 0 };
  }
}

// ─────────────────────────────────────────────────────────
// Big number display

function BigNumber({ value, liftoff }: { value: number | null; liftoff: boolean }) {
  return (
    <svg
      viewBox="0 0 400 200"
      className="w-full h-full"
      preserveAspectRatio="xMidYMid meet"
    >
      <rect x={0} y={0} width={400} height={200} className="fill-stone-100 dark:fill-slate-900" />

      <text
        x={200}
        y={130}
        textAnchor="middle"
        fontSize={140}
        fontWeight={800}
        fontFamily="ui-monospace, monospace"
        className={
          liftoff
            ? "fill-emerald-500"
            : value === null
            ? "fill-stone-300 dark:fill-slate-600"
            : value === 0
            ? "fill-rose-500"
            : "fill-amber-500 dark:fill-amber-300"
        }
        style={{ transition: "all 400ms ease-out" }}
      >
        {liftoff ? "GO!" : value === null ? "?" : String(value)}
      </text>

      <text
        x={200}
        y={170}
        textAnchor="middle"
        fontSize={14}
        fontWeight={600}
        fontFamily="ui-monospace, monospace"
        className="fill-stone-500 dark:fill-indigo-200/60"
      >
        n
      </text>
    </svg>
  );
}

// ─────────────────────────────────────────────────────────
// Code panel

function CodePanel({
  highlight,
  evalNote,
}: {
  nValue: number | null;
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
        <span>let n = </span>
        <span className="text-amber-600 dark:text-amber-300">3</span>;
      </Line>
      <Line>{" "}</Line>
      <Line lineKey="while" highlight={highlight}>
        <span className="text-purple-600 dark:text-purple-300">while</span>
        <span> (n &gt; </span>
        <span className="text-amber-600 dark:text-amber-300">0</span>
        <span>) {`{`}</span>
        {highlight === "while" && evalNote && <EvalChip text={evalNote} />}
      </Line>
      <Line lineKey="body" highlight={highlight} indent>
        <span>n = n - </span>
        <span className="text-amber-600 dark:text-amber-300">1</span>;
        {highlight === "body" && evalNote && <EvalChip text={evalNote} />}
      </Line>
      <Line>{`}`}</Line>
      <Line lineKey="ret" highlight={highlight}>
        <span className="text-purple-600 dark:text-purple-300">return</span>
        <span> n;</span>
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
