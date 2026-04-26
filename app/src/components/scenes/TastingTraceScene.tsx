import { useLang } from "../../i18n/LanguageContext";
import { t } from "../../i18n";

type Props = { step: number };

/**
 * Guided trace for do…while.
 *
 * The code being traced:
 *
 *   let n = 2;
 *   let count = 0;
 *
 *   do {
 *     count = count + 1;
 *     n = n - 1;
 *   } while (n > 0);
 *
 *   return count;
 *
 * The key beat: the BODY runs first, the condition is checked AFTER.
 */
export function TastingTraceScene({ step }: Props) {
  const { lang } = useLang();
  const s = stateAtStep(step);

  return (
    <div className="w-full h-full flex flex-col gap-3">
      <CodePanel
        highlight={s.highlight}
        evalNote={s.evalNote ? t(s.evalNote, lang) : undefined}
      />

      <div className="relative flex-1 rounded-2xl overflow-hidden
                      bg-stone-50 ring-1 ring-stone-200
                      dark:bg-slate-900/40 dark:ring-white/10">
        <div className="absolute top-3 left-3 flex flex-col gap-1 font-mono text-xs">
          <Counter label="n" value={s.nValue} active={s.highlight === "decl" || s.highlight === "while"} />
          <Counter label="count" value={s.countValue} active={s.highlight === "body"} />
        </div>

        <Bowl tastes={s.tastes} done={s.outcome !== undefined} />

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

type LineKey = "decl" | "do" | "body" | "while" | "ret";

type State = {
  nValue: number | null;
  countValue: number | null;
  highlight?: LineKey;
  evalNote?: { en: string; sv: string };
  /** Number of "tastes" — increments each time the body runs. */
  tastes: number;
  outcome?: number;
};

function stateAtStep(step: number): State {
  switch (step) {
    case 0:
      return { nValue: null, countValue: null, tastes: 0 };
    case 1:
      // n = 2, count = 0
      return {
        nValue: 2,
        countValue: 0,
        tastes: 0,
        highlight: "decl",
      };
    case 2:
      // 'do' starts — body always runs first
      return {
        nValue: 2,
        countValue: 0,
        tastes: 0,
        highlight: "do",
        evalNote: { en: "do — body runs at least once", sv: "do — kroppen körs minst en gång" },
      };
    case 3:
      // body lap 1: count=1, n=1
      return {
        nValue: 1,
        countValue: 1,
        tastes: 1,
        highlight: "body",
        evalNote: { en: "count → 1, n → 1", sv: "count → 1, n → 1" },
      };
    case 4:
      // condition: 1 > 0 → true → loop
      return {
        nValue: 1,
        countValue: 1,
        tastes: 1,
        highlight: "while",
        evalNote: { en: "1 > 0  →  true  (loop)", sv: "1 > 0  →  true  (loopa)" },
      };
    case 5:
      // body lap 2: count=2, n=0
      return {
        nValue: 0,
        countValue: 2,
        tastes: 2,
        highlight: "body",
        evalNote: { en: "count → 2, n → 0", sv: "count → 2, n → 0" },
      };
    case 6:
      // condition: 0 > 0 → false → exit
      return {
        nValue: 0,
        countValue: 2,
        tastes: 2,
        highlight: "while",
        evalNote: { en: "0 > 0  →  false  (exit)", sv: "0 > 0  →  false  (lämna)" },
      };
    case 7:
      return {
        nValue: 0,
        countValue: 2,
        tastes: 2,
        highlight: "ret",
        outcome: 2,
      };
    default:
      return { nValue: 0, countValue: 2, tastes: 2, outcome: 2 };
  }
}

// ─────────────────────────────────────────────────────────
// Visual: bowl with N taste marks

function Bowl({ tastes, done }: { tastes: number; done: boolean }) {
  return (
    <svg
      viewBox="0 0 400 200"
      className="w-full h-full"
      preserveAspectRatio="xMidYMid meet"
    >
      <rect x={0} y={0} width={400} height={200} className="fill-stone-100 dark:fill-slate-900" />

      {/* Bowl with steam */}
      <g transform="translate(200, 100)">
        <ellipse cx={0} cy={-10} rx={56} ry={10} fill="none" stroke="currentColor" strokeWidth={2} />
        <path d="M -56,-10 L -48,42 Q 0,56 48,42 L 56,-10"
              fill="none" stroke="currentColor" strokeWidth={2} />
        <ellipse cx={0} cy={-10} rx={50} ry={7} className="fill-amber-300 dark:fill-amber-500/60" />
        <path d="M -50,-10 L -44,38 Q 0,50 44,38 L 50,-10 Z" className="fill-amber-300 dark:fill-amber-500/60" />

        {/* Steam */}
        {!done && (
          <g className="stroke-stone-400 dark:stroke-slate-500" strokeWidth={1.5} fill="none" opacity={0.5}>
            <path d="M -10,-25 Q -16,-40 -10,-55" />
            <path d="M 10,-25 Q 16,-40 10,-55" />
          </g>
        )}
      </g>

      {/* Taste markers — one per body iteration */}
      <g transform="translate(60, 30)">
        {Array.from({ length: tastes }).map((_, i) => (
          <circle
            key={i}
            cx={i * 16}
            cy={0}
            r={6}
            className="fill-amber-400 dark:fill-amber-500/70"
          />
        ))}
        <text
          x={0}
          y={26}
          fontSize={11}
          fontWeight={600}
          fontFamily="ui-monospace, monospace"
          className="fill-stone-500 dark:fill-indigo-200/60"
        >
          tastes: {tastes}
        </text>
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
  highlight?: LineKey;
  evalNote?: string;
}) {
  return (
    <div className="rounded-2xl px-5 py-4 font-mono text-sm leading-relaxed
                    bg-white ring-1 ring-stone-200 shadow-sm
                    dark:bg-slate-900/60 dark:ring-white/10">
      <Line lineKey="decl" highlight={highlight}>
        <span>let n = </span>
        <span className="text-amber-600 dark:text-amber-300">2</span>
        <span>; let count = </span>
        <span className="text-amber-600 dark:text-amber-300">0</span>;
      </Line>
      <Line>{" "}</Line>
      <Line lineKey="do" highlight={highlight}>
        <span className="text-purple-600 dark:text-purple-300">do</span>
        <span> {`{`}</span>
        {highlight === "do" && evalNote && <EvalChip text={evalNote} />}
      </Line>
      <Line lineKey="body" highlight={highlight} indent>
        <span>count = count + 1;  n = n - 1;</span>
        {highlight === "body" && evalNote && <EvalChip text={evalNote} />}
      </Line>
      <Line lineKey="while" highlight={highlight}>
        <span>{`} `}</span>
        <span className="text-purple-600 dark:text-purple-300">while</span>
        <span> (n &gt; </span>
        <span className="text-amber-600 dark:text-amber-300">0</span>
        <span>);</span>
        {highlight === "while" && evalNote && <EvalChip text={evalNote} />}
      </Line>
      <Line lineKey="ret" highlight={highlight}>
        <span className="text-purple-600 dark:text-purple-300">return</span>
        <span> count;</span>
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
