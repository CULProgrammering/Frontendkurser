import { useEffect, useMemo, useState } from "react";
import type { CSSProperties } from "react";
import type { DemoBox, ExplanationSlide } from "../types";
import { Typewriter } from "./Typewriter";
import { useLang } from "../i18n/LanguageContext";
import { t } from "../i18n";
import { ui } from "../i18n/strings";
import { useSlideFontSize } from "./SlideFontSize";
import { CrosswalkScene } from "./scenes/CrosswalkScene";
import { CrosswalkTraceScene } from "./scenes/CrosswalkTraceScene";
import { ComparisonsTableScene } from "./scenes/ComparisonsTableScene";
import { WardrobeScene } from "./scenes/WardrobeScene";
import { WardrobeTraceScene } from "./scenes/WardrobeTraceScene";
import { RecyclingScene } from "./scenes/RecyclingScene";
import { RecyclingTraceScene } from "./scenes/RecyclingTraceScene";
import { BouncerScene } from "./scenes/BouncerScene";
import { StairsScene } from "./scenes/StairsScene";
import { StairsTraceScene } from "./scenes/StairsTraceScene";
import { LettersScene } from "./scenes/LettersScene";
import { LettersTraceScene } from "./scenes/LettersTraceScene";
import { CountdownScene } from "./scenes/CountdownScene";
import { CountdownTraceScene } from "./scenes/CountdownTraceScene";
import { TastingScene } from "./scenes/TastingScene";
import { TastingTraceScene } from "./scenes/TastingTraceScene";

type Props = { slide: ExplanationSlide };

// Narration text is hand-authored with `\n` for visual line breaks. The right
// pane is now wide enough that those mid-sentence breaks look awkward, so we
// collapse single newlines to a space and treat blank lines (\n\n) as
// paragraph breaks — `whitespace-pre-line` then renders the paragraph gap.
function collapseSoftBreaks(text: string): string {
  return text
    .split(/\n\s*\n+/)
    .map((p) => p.replace(/\s*\n\s*/g, " ").trim())
    .join("\n\n");
}

function collectIds(boxes: DemoBox[], out: string[] = []): string[] {
  for (const b of boxes) {
    out.push(b.id);
    if (b.children) collectIds(b.children, out);
  }
  return out;
}

function RenderBox({
  box,
  styles,
  highlights,
  resolveLabel,
  fontPx,
}: {
  box: DemoBox;
  styles: Record<string, CSSProperties>;
  highlights: Set<string>;
  resolveLabel: (b: DemoBox) => string;
  fontPx: number;
}) {
  const style: CSSProperties = {
    transition: "all 500ms cubic-bezier(.2,.8,.2,1)",
    ...styles[box.id],
    outline: highlights.has(box.id) ? "2px solid #fcd34d" : undefined,
    outlineOffset: highlights.has(box.id) ? "4px" : undefined,
    fontSize: `${fontPx}px`,
  };
  return (
    <div style={style} className="font-medium">
      {box.children
        ? box.children.map((c) => (
            <RenderBox
              key={c.id}
              box={c}
              styles={styles}
              highlights={highlights}
              resolveLabel={resolveLabel}
              fontPx={fontPx}
            />
          ))
        : resolveLabel(box)}
    </div>
  );
}

export function ExplanationSlideView({ slide }: Props) {
  const [step, setStep] = useState(0);
  const [helpOpen, setHelpOpen] = useState(false);
  const atEnd = step >= slide.steps.length - 1;
  const atStart = step === 0;
  const { lang } = useLang();
  const { codePx, prosePx } = useSlideFontSize();

  // "-trace" customScenes show actual code with highlighted lines as the
  // narration walks through execution — they need the wide left pane so the
  // code stays readable. Other customScenes are allegory animations and fit
  // inside the centered card.
  const isCodeTrace = !!slide.customScene && slide.customScene.endsWith("-trace");

  // Notes are auxiliary "tip" callouts. We pull them out of the demo flow so
  // they can sit in the right gutter beside the pane on wide screens.
  const noteBox = slide.demo.find((b) => b.kind === "note");
  const codeBoxes = slide.demo.filter((b) => b.kind !== "note");

  const mergedStyles = useMemo(() => {
    const ids = collectIds(slide.demo);
    const out: Record<string, CSSProperties> = {};
    const find = (list: DemoBox[], id: string): DemoBox | null => {
      for (const b of list) {
        if (b.id === id) return b;
        if (b.children) {
          const r = find(b.children, id);
          if (r) return r;
        }
      }
      return null;
    };
    for (const id of ids) {
      const b = find(slide.demo, id);
      out[id] = { ...(b?.baseStyle ?? {}) };
    }
    const s = slide.steps[step]?.styles;
    if (s) {
      for (const [id, style] of Object.entries(s)) {
        out[id] = { ...(out[id] ?? {}), ...style };
      }
    }
    return out;
  }, [slide, step]);

  const current = slide.steps[step];
  const highlights = new Set(current?.highlight ?? []);

  const advance = () => {
    if (helpOpen) return;
    if (!atEnd) setStep((s) => s + 1);
  };
  const back = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!atStart) setStep((s) => s - 1);
  };
  const openHelp = (e: React.MouseEvent) => {
    e.stopPropagation();
    setHelpOpen(true);
  };
  const closeHelp = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setHelpOpen(false);
  };

  useEffect(() => {
    if (!helpOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        setHelpOpen(false);
      }
    };
    // capture-phase so we run before SlideDeck's Escape-to-exit handler.
    window.addEventListener("keydown", onKey, true);
    return () => window.removeEventListener("keydown", onKey, true);
  }, [helpOpen]);

  // Reset the dialog when navigating between steps so a stale tip doesn't
  // linger over the next step's content.
  useEffect(() => {
    setHelpOpen(false);
  }, [step]);

  const resolveLabel = (b: DemoBox) =>
    b.label ? t(b.label, lang) : b.id;

  const titleBlock = (
    <>
      <h2 className="text-xl sm:text-3xl font-semibold text-stone-900 dark:text-indigo-50">
        {t(slide.title, lang)}
      </h2>
      {slide.intro && (
        <p className="text-stone-500 dark:text-indigo-200/70 mt-1">
          {t(slide.intro, lang)}
        </p>
      )}
    </>
  );

  return (
    <div
      className="h-full w-full flex flex-col cursor-pointer select-none"
      onClick={advance}
    >
      {isCodeTrace && <div className="px-4 sm:px-10 pt-4 sm:pt-8">{titleBlock}</div>}

      {isCodeTrace ? (
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 px-4 sm:px-10 py-4 sm:py-8 min-h-0">
          <div className="flex items-center justify-center overflow-auto p-2">
            <CustomScene id={slide.customScene!} step={step} />
          </div>

          <div className="rounded-2xl p-6 flex flex-col
                          bg-white ring-1 ring-stone-200 shadow-sm
                          dark:bg-slate-900/60 dark:ring-white/10 dark:shadow-none">
            <div className="flex items-center justify-between mb-2">
              <div className="text-xs uppercase tracking-wider text-amber-600 dark:text-indigo-300/70">
                {t(ui.stepLabel, lang)} {step + 1} / {slide.steps.length}
              </div>
              {!atStart && (
                <button
                  onClick={back}
                  className="text-xs px-2 py-1 rounded-md
                             bg-stone-100 hover:bg-stone-200 text-stone-700 ring-1 ring-stone-200
                             dark:bg-slate-700/70 dark:hover:bg-slate-600 dark:text-indigo-100 dark:ring-white/10"
                >
                  {t(ui.stepBack, lang)}
                </button>
              )}
            </div>
            <div
              className="leading-relaxed min-h-[6rem] whitespace-pre-line text-stone-800 dark:text-indigo-50"
              style={{ fontSize: `${prosePx}px` }}
            >
              {current?.narration ? (
                <Typewriter text={collapseSoftBreaks(t(current.narration, lang))} />
              ) : (
                <span className="text-stone-400 dark:text-indigo-200/50 italic">…</span>
              )}
            </div>

            <div className="flex-1" />
            <div className="text-sm text-stone-500 dark:text-indigo-200/60">
              {atEnd
                ? t(ui.endOfExplanation, lang)
                : t(ui.clickToContinue, lang)}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 px-4 sm:px-10 pt-4 sm:pt-8 pb-4 sm:pb-8 min-h-0 flex flex-col">
          <div
            className="mx-auto flex flex-col flex-1 min-h-0 gap-6"
            style={{
              width: "max-content",
              minWidth: "min(64rem, 100%)",
              maxWidth: "100%",
            }}
          >
            <div>{titleBlock}</div>
            <div className="flex-1 rounded-2xl p-6 flex flex-col gap-5
                            bg-white ring-1 ring-stone-200 shadow-sm
                            dark:bg-slate-900/60 dark:ring-white/10 dark:shadow-none">
            <div className="flex items-center justify-between">
              <div className="text-xs uppercase tracking-wider text-amber-600 dark:text-indigo-300/70">
                {t(ui.stepLabel, lang)} {step + 1} / {slide.steps.length}
              </div>
              <div className="flex items-center gap-2">
                {!atStart && (
                  <button
                    onClick={back}
                    className="text-xs px-2 py-1 rounded-md
                               bg-stone-100 hover:bg-stone-200 text-stone-700 ring-1 ring-stone-200
                               dark:bg-slate-700/70 dark:hover:bg-slate-600 dark:text-indigo-100 dark:ring-white/10"
                  >
                    {t(ui.stepBack, lang)}
                  </button>
                )}
                {noteBox && (
                  <button
                    type="button"
                    onClick={openHelp}
                    aria-label={t({ en: "Show tip", sv: "Visa tips" }, lang)}
                    title={t({ en: "Show tip", sv: "Visa tips" }, lang)}
                    className="w-8 h-8 rounded-full flex items-center justify-center
                               bg-amber-100 hover:bg-amber-200 text-amber-700
                               ring-1 ring-amber-300 shadow-sm
                               dark:bg-amber-500/20 dark:hover:bg-amber-500/30 dark:text-amber-200 dark:ring-amber-400/30
                               transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      className="w-5 h-5"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
                      />
                    </svg>
                  </button>
                )}
              </div>
            </div>

            <div
              className="leading-relaxed min-h-[6rem] whitespace-pre-line text-stone-800 dark:text-indigo-50 max-w-3xl mx-auto w-full"
              style={{ fontSize: `${prosePx}px` }}
            >
              {current?.narration ? (
                <Typewriter text={collapseSoftBreaks(t(current.narration, lang))} />
              ) : (
                <span className="text-stone-400 dark:text-indigo-200/50 italic">…</span>
              )}
            </div>

            {slide.customScene ? (
              <div className="flex items-center justify-center p-2">
                <CustomScene id={slide.customScene} step={step} />
              </div>
            ) : codeBoxes.length > 0 ? (
              <div className="flex items-center justify-center p-2">
                <div className="flex flex-wrap gap-4 items-center justify-center">
                  {codeBoxes.map((b) => (
                    <RenderBox
                      key={b.id}
                      box={b}
                      styles={mergedStyles}
                      highlights={highlights}
                      resolveLabel={resolveLabel}
                      fontPx={codePx}
                    />
                  ))}
                </div>
              </div>
            ) : null}

            <div className="flex-1" />
            <div className="text-sm text-stone-500 dark:text-indigo-200/60">
              {atEnd
                ? t(ui.endOfExplanation, lang)
                : t(ui.clickToContinue, lang)}
            </div>
          </div>
          </div>

          {noteBox && helpOpen && (
            <div
              role="dialog"
              aria-modal="true"
              aria-label={t({ en: "Tip", sv: "Tips" }, lang)}
              onClick={(e) => {
                e.stopPropagation();
                if (e.target === e.currentTarget) setHelpOpen(false);
              }}
              className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/50 cursor-default"
            >
              <div
                className="max-w-lg w-full rounded-2xl p-6 cursor-default
                           bg-amber-50 ring-1 ring-amber-200 shadow-xl
                           dark:bg-slate-900 dark:ring-amber-400/30"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-amber-700 dark:text-amber-200">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      className="w-4 h-4"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
                      />
                    </svg>
                    {t({ en: "Tip", sv: "Tips" }, lang)}
                  </div>
                  <button
                    type="button"
                    onClick={closeHelp}
                    aria-label={t({ en: "Close", sv: "Stäng" }, lang)}
                    className="w-7 h-7 rounded-full flex items-center justify-center text-lg leading-none
                               text-stone-500 hover:bg-stone-200 dark:text-indigo-200/70 dark:hover:bg-slate-700"
                  >
                    ×
                  </button>
                </div>
                <div
                  className="whitespace-pre-line leading-relaxed text-stone-800 dark:text-amber-100/90"
                  style={{ fontSize: `${prosePx}px` }}
                >
                  {noteBox.label ? t(noteBox.label, lang) : ""}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function CustomScene({ id, step }: { id: string; step: number }) {
  switch (id) {
    case "crosswalk":
      return <CrosswalkScene step={step} />;
    case "crosswalk-if-trace":
      return <CrosswalkTraceScene step={step} mode="if-only" />;
    case "crosswalk-if-else-trace":
      return <CrosswalkTraceScene step={step} mode="if-else" />;
    case "crosswalk-strict-trace":
      return <CrosswalkTraceScene step={step} mode="strict-equality" />;
    case "comparisons-table":
      return <ComparisonsTableScene step={step} />;
    case "wardrobe":
      return <WardrobeScene step={step} />;
    case "wardrobe-trace":
      return <WardrobeTraceScene step={step} />;
    case "recycling":
      return <RecyclingScene step={step} />;
    case "recycling-trace":
      return <RecyclingTraceScene step={step} />;
    case "bouncer":
      return <BouncerScene step={step} />;
    case "stairs":
      return <StairsScene step={step} />;
    case "stairs-trace":
      return <StairsTraceScene step={step} />;
    case "letters":
      return <LettersScene step={step} />;
    case "letters-trace":
      return <LettersTraceScene step={step} />;
    case "countdown":
      return <CountdownScene step={step} />;
    case "countdown-trace":
      return <CountdownTraceScene step={step} />;
    case "tasting":
      return <TastingScene step={step} />;
    case "tasting-trace":
      return <TastingTraceScene step={step} />;
    default:
      return null;
  }
}
