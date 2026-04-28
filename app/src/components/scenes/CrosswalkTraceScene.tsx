import { StickFigure } from "./StickFigure";
import { useLang } from "../../i18n/LanguageContext";
import { t } from "../../i18n";
import { useSlideFontSize } from "../SlideFontSize";

type Mode = "if-only" | "if-else" | "strict-equality";
type Props = { step: number; mode: Mode };

/**
 * Guided execution trace.
 *
 * - "if-only" walks through the simplest form: just an if. When the condition
 *   is false, NOTHING happens — the function ends without returning. The
 *   figure stays put.
 * - "if-else" walks through the same code with an else branch added. Now
 *   both cases return something and the figure either walks or waits.
 */
export function CrosswalkTraceScene({ step, mode }: Props) {
  const { lang } = useLang();
  const s = stateAtStep(step, mode);

  const figureX = s.figurePhase === "walks" ? 320 : 60;

  return (
    <div className="w-full h-full flex flex-col gap-3">
      <CodePanel
        mode={mode}
        lightValue={s.lightValue}
        highlight={s.highlight}
        evalNote={s.evalNote ? t(s.evalNote, lang) : undefined}
        op={s.op}
      />

      <div className="relative flex-1 rounded-2xl overflow-hidden
                      bg-stone-50 ring-1 ring-stone-200
                      dark:bg-slate-900/40 dark:ring-white/10">
        <svg
          viewBox="0 0 400 200"
          className="w-full h-full"
          preserveAspectRatio="xMidYMid meet"
        >
          <rect x={0} y={0} width={400} height={140} className="fill-stone-100 dark:fill-slate-900" />
          <rect x={0} y={140} width={400} height={60} className="fill-stone-300 dark:fill-slate-800" />
          {[100, 140, 180, 220, 260].map((sx) => (
            <rect
              key={sx}
              x={sx}
              y={145}
              width={28}
              height={50}
              className="fill-stone-50 dark:fill-slate-700"
            />
          ))}

          {/* Traffic light */}
          <line x1={350} y1={140} x2={350} y2={70} className="stroke-stone-500 dark:stroke-slate-500" strokeWidth={3} />
          <rect x={332} y={28} width={36} height={56} rx={4} className="fill-stone-700 dark:fill-slate-700" />
          {(() => {
            const lamp = s.lampColor ?? deriveLamp(s.lightValue);
            return (
              <>
                <circle cx={350} cy={42} r={8} className={lamp === "red" ? "fill-rose-500" : "fill-stone-900/30 dark:fill-slate-900"} />
                <circle cx={350} cy={70} r={8} className={lamp === "green" ? "fill-emerald-500" : "fill-stone-900/30 dark:fill-slate-900"} />
              </>
            );
          })()}

          <g
            style={{
              transition: "transform 1500ms ease-in-out",
              transform: `translateX(${figureX - 60}px)`,
            }}
            className="text-stone-700 dark:text-indigo-100"
          >
            <StickFigure
              x={60}
              y={180}
              pose={
                s.figurePhase === "walks"
                  ? "walk-right"
                  : s.figurePhase === "looking"
                  ? "look-up"
                  : "stand"
              }
            />
          </g>
        </svg>

        {s.outcome && (
          <div
            className={
              "absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-medium " +
              (s.outcome === "walk"
                ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-200"
                : s.outcome === "wait"
                ? "bg-stone-200 text-stone-700 dark:bg-slate-700 dark:text-indigo-100"
                : "bg-stone-100 text-stone-500 ring-1 ring-stone-200 dark:bg-slate-800 dark:text-indigo-200/60 dark:ring-white/10")
            }
          >
            {s.outcome === "walk"
              ? t({ en: "Walks", sv: "Går" }, lang)
              : s.outcome === "wait"
              ? t({ en: "Waits", sv: "Väntar" }, lang)
              : t({ en: "Function ends — nothing happens", sv: "Funktionen tar slut — inget händer" }, lang)}
          </div>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// State machines

type LineKey = "decl" | "if" | "ret-walk" | "close-if" | "else" | "ret-wait" | "close-else";

type State = {
  lightValue: string;
  /** Optional lamp colour override; defaults to deriving from lightValue. */
  lampColor?: "red" | "green" | "off";
  highlight?: LineKey;
  evalNote?: { en: string; sv: string };
  figurePhase: "idle" | "looking" | "walks";
  outcome?: "walk" | "wait" | "nothing";
  /** Operator rendered between `light` and "green" in the if line. Defaults to "===". */
  op?: "=" | "===";
};

function stateAtStep(step: number, mode: Mode): State {
  if (mode === "if-only") return ifOnlyAt(step);
  if (mode === "if-else") return ifElseAt(step);
  return strictEqAt(step);
}

function deriveLamp(value: string): "red" | "green" | "off" {
  if (value === "red") return "red";
  if (value === "green") return "green";
  return "off";
}

function ifOnlyAt(step: number): State {
  switch (step) {
    case 0:
      return { lightValue: "red", figurePhase: "idle" };
    case 1:
      return { lightValue: "red", highlight: "decl", figurePhase: "idle" };
    case 2:
      return { lightValue: "red", highlight: "if", figurePhase: "looking" };
    case 3:
      return {
        lightValue: "red",
        highlight: "if",
        figurePhase: "looking",
        evalNote: { en: '"red" === "green"  →  false', sv: '"red" === "green"  →  false' },
      };
    case 4:
      return {
        lightValue: "red",
        figurePhase: "idle",
        outcome: "nothing",
      };
    case 5:
      return { lightValue: "green", highlight: "decl", figurePhase: "idle" };
    case 6:
      return { lightValue: "green", highlight: "if", figurePhase: "looking" };
    case 7:
      return {
        lightValue: "green",
        highlight: "if",
        figurePhase: "looking",
        evalNote: { en: '"green" === "green"  →  true', sv: '"green" === "green"  →  true' },
      };
    case 8:
      return {
        lightValue: "green",
        highlight: "ret-walk",
        figurePhase: "walks",
        outcome: "walk",
      };
    default:
      return { lightValue: "green", figurePhase: "walks", outcome: "walk" };
  }
}

function strictEqAt(step: number): State {
  // Three phases: bad `=` (always runs), then `===` mismatch (case differs), then `===` match.
  const upper = "GREEN";
  const lower = "green";
  switch (step) {
    // ── Phase A — bad `=` (assignment) ────────
    case 0:
      return { lightValue: upper, lampColor: "green", figurePhase: "idle", op: "=" };
    case 1:
      return {
        lightValue: upper,
        lampColor: "green",
        highlight: "if",
        figurePhase: "looking",
        op: "=",
      };
    case 2:
      // The `=` ASSIGNS — light becomes "green", and the expression evaluates to "green" (truthy).
      return {
        lightValue: lower,
        lampColor: "green",
        highlight: "if",
        figurePhase: "looking",
        op: "=",
        evalNote: {
          en: '= ASSIGNS — light is now "green"; expression is "green" (truthy)',
          sv: '= TILLDELAR — light är nu "green"; uttrycket är "green" (truthy)',
        },
      };
    case 3:
      // Body runs because the expression was truthy.
      return {
        lightValue: lower,
        lampColor: "green",
        highlight: "ret-walk",
        figurePhase: "walks",
        outcome: "walk",
        op: "=",
      };
    // ── Phase B — switch to `===`, reset to "GREEN" ────────
    case 4:
      return {
        lightValue: upper,
        lampColor: "green",
        highlight: "if",
        figurePhase: "looking",
        op: "===",
      };
    case 5:
      return {
        lightValue: upper,
        lampColor: "green",
        highlight: "if",
        figurePhase: "looking",
        op: "===",
        evalNote: { en: '"GREEN" === "green"  →  false', sv: '"GREEN" === "green"  →  false' },
      };
    case 6:
      return {
        lightValue: upper,
        lampColor: "green",
        figurePhase: "idle",
        outcome: "nothing",
        op: "===",
      };
    // ── Phase C — `===` with a real match ────────
    case 7:
      return {
        lightValue: lower,
        lampColor: "green",
        highlight: "decl",
        figurePhase: "idle",
        op: "===",
      };
    case 8:
      return {
        lightValue: lower,
        lampColor: "green",
        highlight: "if",
        figurePhase: "looking",
        op: "===",
        evalNote: { en: '"green" === "green"  →  true', sv: '"green" === "green"  →  true' },
      };
    case 9:
      return {
        lightValue: lower,
        lampColor: "green",
        highlight: "ret-walk",
        figurePhase: "walks",
        outcome: "walk",
        op: "===",
      };
    default:
      return {
        lightValue: lower,
        lampColor: "green",
        figurePhase: "walks",
        outcome: "walk",
        op: "===",
      };
  }
}

function ifElseAt(step: number): State {
  switch (step) {
    case 0:
      return { lightValue: "red", figurePhase: "idle" };
    case 1:
      return { lightValue: "red", highlight: "decl", figurePhase: "idle" };
    case 2:
      return { lightValue: "red", highlight: "if", figurePhase: "looking" };
    case 3:
      return {
        lightValue: "red",
        highlight: "if",
        figurePhase: "looking",
        evalNote: { en: '"red" === "green"  →  false', sv: '"red" === "green"  →  false' },
      };
    case 4:
      return { lightValue: "red", highlight: "else", figurePhase: "looking" };
    case 5:
      return {
        lightValue: "red",
        highlight: "ret-wait",
        figurePhase: "idle",
        outcome: "wait",
      };
    case 6:
      return { lightValue: "green", highlight: "decl", figurePhase: "idle" };
    case 7:
      return { lightValue: "green", highlight: "if", figurePhase: "looking" };
    case 8:
      return {
        lightValue: "green",
        highlight: "if",
        figurePhase: "looking",
        evalNote: { en: '"green" === "green"  →  true', sv: '"green" === "green"  →  true' },
      };
    case 9:
      return {
        lightValue: "green",
        highlight: "ret-walk",
        figurePhase: "walks",
        outcome: "walk",
      };
    default:
      return { lightValue: "green", figurePhase: "walks", outcome: "walk" };
  }
}

// ─────────────────────────────────────────────────────────
// Code panel

function CodePanel({
  mode,
  lightValue,
  highlight,
  evalNote,
  op,
}: {
  mode: Mode;
  lightValue: string;
  highlight?: LineKey;
  evalNote?: string;
  op?: "=" | "===";
}) {
  const operator = op ?? "===";
  const { codePx } = useSlideFontSize();
  return (
    <div
      className="rounded-2xl px-5 py-4 font-mono leading-relaxed
                    bg-white ring-1 ring-stone-200 shadow-sm
                    dark:bg-slate-900/60 dark:ring-white/10"
      style={{ fontSize: `${codePx}px` }}
    >
      <Line lineKey="decl" highlight={highlight}>
        <span>let light = </span>
        <span className={lightValue === "red" ? "text-rose-600 dark:text-rose-300" : "text-emerald-600 dark:text-emerald-300"}>
          "{lightValue}"
        </span>
        <span>;</span>
      </Line>
      <Line>{" "}</Line>
      <Line lineKey="if" highlight={highlight}>
        <span>if (light </span>
        <span
          className={
            operator === "="
              ? "px-1 rounded text-rose-700 bg-rose-100 dark:bg-rose-500/15 dark:text-rose-300 font-bold"
              : ""
          }
        >
          {operator}
        </span>
        <span> </span>
        <span className="text-emerald-600 dark:text-emerald-300">"green"</span>
        <span>) {`{`}</span>
        {evalNote && (
          <span className="ml-3 inline-block px-2 py-0.5 rounded-md
                           bg-amber-100 text-amber-800 ring-1 ring-amber-300
                           dark:bg-amber-500/15 dark:text-amber-200 dark:ring-amber-400/30
                           text-xs">
            {evalNote}
          </span>
        )}
      </Line>
      <Line lineKey="ret-walk" highlight={highlight} indent>
        <span className="text-purple-600 dark:text-purple-300">return</span>{" "}
        <span className="text-emerald-600 dark:text-emerald-300">"walk"</span>
        <span>;</span>
      </Line>
      {mode === "if-else" ? (
        <>
          <Line lineKey="else" highlight={highlight}>
            <span>{`} else {`}</span>
          </Line>
          <Line lineKey="ret-wait" highlight={highlight} indent>
            <span className="text-purple-600 dark:text-purple-300">return</span>{" "}
            <span className="text-emerald-600 dark:text-emerald-300">"wait"</span>
            <span>;</span>
          </Line>
          <Line lineKey="close-else" highlight={highlight}>
            {"}"}
          </Line>
        </>
      ) : (
        <Line lineKey="close-if" highlight={highlight}>
          {"}"}
        </Line>
      )}
    </div>
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
