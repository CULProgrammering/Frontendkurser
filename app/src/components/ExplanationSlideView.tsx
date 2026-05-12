import { useEffect, useMemo, useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import type { DemoBox, ExplanationSlide } from "../types";
import { Typewriter } from "./Typewriter";
import { t } from "../i18n";
import { ui } from "../i18n/strings";
import { useSlideFontSize, SlideFontSizeControl } from "./SlideFontSize";
import { ThemeToggleInline } from "./ThemeToggle";
import { TypewriterToggleInline, useTypewriter } from "./TypewriterToggle";
import { SlideTitleRow, type BreadcrumbSegment } from "./SlideDeck";
import { TwoColumnLayout } from "./TwoColumnLayout";
import { tokens } from "../styles/tokens";
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

type Props = {
  slide: ExplanationSlide;
  breadcrumb?: BreadcrumbSegment[];
  slideJumpDots?: React.ReactNode;
  /**
   * When provided, a "Next →" button appears in the bottom-right of the slide
   * area on the final narration step as an alternative to clicking the
   * numbered slide-jump dots. Omitted when this is the last slide in the deck.
   */
  onNextSlide?: () => void;
  /**
   * Called when the student finishes the very last step of the very last
   * slide (i.e. has read all the narration in this tier) and clicks the
   * "Back to lesson" button. Routes back to the lesson tier menu so they
   * don't have to hunt for the breadcrumb. Only surfaced when both
   * `atEnd` and `!onNextSlide` (last slide) AND the typewriter has
   * finished printing the last step.
   */
  onExit?: () => void;
};

// Narration text is hand-authored with `\n` for visual line breaks. The right
// pane is now wide enough that those mid-sentence breaks look awkward, so we
// collapse single newlines to a space and treat blank lines (\n\n) as
// paragraph breaks — `whitespace-pre-line` then renders the paragraph gap.
//
// Exception: a `\n` that is immediately followed by a bullet marker `•` is
// preserved, so authored bullet lists stay on their own lines. See the
// "Slide UI Conventions" rule in CLAUDE.md — bullets always go on their
// own line and the bullet marker is `•`.
function collapseSoftBreaks(text: string): string {
  return text
    .split(/\n\s*\n+/)
    .map((p) => p.replace(/\s*\n\s*(?!•)/g, " ").trim())
    .join("\n\n");
}

function collectIds(boxes: DemoBox[], out: string[] = []): string[] {
  for (const b of boxes) {
    out.push(b.id);
    if (b.children) collectIds(b.children, out);
  }
  return out;
}

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Splits `text` so that every occurrence of any string in `tokens` is
 * wrapped in a highlighted <mark>. Tokens are matched as literal
 * substrings. For tokens made of a single repeated character (e.g. "=",
 * "==", "===") we add boundary lookarounds so that matching "=" does NOT
 * also light up the equals signs inside "==" or "===".
 */
function renderWithTokenHighlights(
  text: string,
  tokens: string[],
): ReactNode {
  const filtered = tokens.filter((t) => t.length > 0);
  if (filtered.length === 0) return text;
  const sorted = [...filtered].sort((a, b) => b.length - a.length);
  const patterns = sorted.map((tok) => {
    const ch = tok[0];
    const allSame = tok.split("").every((c) => c === ch);
    const body = escapeRegExp(tok);
    if (allSame) {
      const guard = escapeRegExp(ch);
      return `(?<!${guard})${body}(?!${guard})`;
    }
    return body;
  });
  const re = new RegExp(`(${patterns.join("|")})`, "g");
  const parts = text.split(re);
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <mark
        key={i}
        // The inner RenderBox panels carry their own `baseStyle` from the
        // lesson author — usually light/cream regardless of theme. Use a
        // saturated amber in BOTH themes with dark text so the highlight
        // pops on whatever panel surface the lesson chose.
        className="rounded px-0.5 bg-amber-200 text-stone-900 dark:bg-amber-300 dark:text-stone-900"
      >
        {part}
      </mark>
    ) : (
      <span key={i}>{part}</span>
    ),
  );
}

function RenderBox({
  box,
  styles,
  highlights,
  tokenHighlights,
  resolveLabel,
  fontPx,
}: {
  box: DemoBox;
  styles: Record<string, CSSProperties>;
  highlights: Set<string>;
  tokenHighlights: string[];
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
              tokenHighlights={tokenHighlights}
              resolveLabel={resolveLabel}
              fontPx={fontPx}
            />
          ))
        : renderWithTokenHighlights(resolveLabel(box), tokenHighlights)}
    </div>
  );
}

export function ExplanationSlideView({ slide, breadcrumb, slideJumpDots, onNextSlide, onExit }: Props) {
  const [step, setStep] = useState(0);
  const [helpOpen, setHelpOpen] = useState(false);
  // `typingDone` flips when the Typewriter finishes (onDone). Used to
  // gate the "Back to lesson" button on the final step so it doesn't pop
  // in mid-animation. Resets per step. The earlier click-to-skip flow
  // was retired once the global Typewriter toggle landed — students who
  // want instant text turn the animation off; clicks now always advance.
  const [typingDone, setTypingDone] = useState(false);
  const atEnd = step >= slide.steps.length - 1;
  const atStart = step === 0;
  const { codePx, prosePx } = useSlideFontSize();
  const typewriter = useTypewriter();

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
  const tokenHighlights = current?.tokenHighlight ?? [];

  const advance = () => {
    if (helpOpen) return;
    // Wait for the typewriter to finish before letting a click advance —
    // otherwise students fly past text they haven't read yet. When the
    // typewriter pref is OFF the Typewriter sets `n = text.length`
    // immediately and `onDone` fires the same tick, so `typingDone` is
    // true essentially right away and clicks advance straight through.
    if (!typingDone) return;
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

  // Reset the dialog and the typing-done flag whenever we move to a new
  // step so any lingering tip closes and the next step's animation gets
  // a fresh `typingDone = false` gate.
  useEffect(() => {
    setHelpOpen(false);
    setTypingDone(false);
  }, [step]);

  const resolveLabel = (b: DemoBox) =>
    b.label ? t(b.label) : b.id;

  const titleBlock = (
    <>
      <SlideTitleRow breadcrumb={breadcrumb}>
        <h2 className={`${tokens.text.h2} flex-1 min-w-0`}>
          {t(slide.title)}
        </h2>
        <SlideFontSizeControl />
        <TypewriterToggleInline />
        <ThemeToggleInline />
      </SlideTitleRow>
      <div className="flex items-end justify-between gap-4 mt-2">
        {slide.intro ? (
          <p className="text-stone-600 dark:text-stone-400 flex-1 min-w-0">
            {t(slide.intro)}
          </p>
        ) : (
          <span className="flex-1" />
        )}
        {slideJumpDots}
      </div>
    </>
  );

  return (
    <div
      className="h-full w-full max-w-7xl mx-auto flex flex-col cursor-pointer select-none"
      onClick={advance}
    >
      {isCodeTrace && <div className="px-4 sm:px-10 pt-4 sm:pt-8">{titleBlock}</div>}

      {isCodeTrace ? (
        <TwoColumnLayout
          className="flex-1 px-4 sm:px-10 py-4 sm:py-8"
          desktopGap="gap-6"
          leftLabel={t(ui.tabCode)}
          rightLabel={t(ui.tabStory)}
          initialTab="right"
          left={
            <div className="flex-1 flex items-center justify-center overflow-auto p-2 min-h-0">
              <CustomScene id={slide.customScene!} step={step} />
            </div>
          }
          right={
            <div className={`flex-1 flex flex-col p-6 min-h-0 ${tokens.card.surface}`}>
              <div className="flex items-center justify-between mb-2">
                <div className={tokens.text.eyebrow}>
                  {t(ui.stepLabel)} <span className="tabular-nums">{step + 1} / {slide.steps.length}</span>
                </div>
                {!atStart && (
                  <button
                    onClick={back}
                    className="text-xs px-3 py-2 min-h-[44px] sm:min-h-0 sm:px-2 sm:py-1 rounded-md transition-colors
                               bg-white hover:bg-stone-50 text-stone-700 border border-stone-900/[0.08]
                               dark:bg-[#1f232c] dark:hover:bg-[#252934] dark:text-stone-200 dark:border-white/[0.08]"
                  >
                    {t(ui.stepBack)}
                  </button>
                )}
              </div>
              <div
                className="leading-relaxed min-h-[6rem] whitespace-pre-line text-stone-800 dark:text-stone-100"
                style={{ fontSize: `${prosePx}px` }}
              >
                {current?.narration ? (
                  <Typewriter
                    text={collapseSoftBreaks(t(current.narration))}
                    skip={!typewriter.enabled}
                    onDone={() => setTypingDone(true)}
                  />
                ) : (
                  <span className="text-stone-400 dark:text-stone-500 italic">…</span>
                )}
              </div>

              <div className="flex-1" />
              <div className="flex items-center justify-between gap-3">
                <div
                  className="text-sm italic text-stone-500 dark:text-stone-400 transition-opacity"
                  // Dim the "Click anywhere to continue →" hint while the
                  // typewriter is still running — the click would be a
                  // no-op anyway, so showing the affordance at full
                  // strength would be misleading. As soon as `typingDone`
                  // flips, the hint brightens up to invite the next click.
                  style={{ opacity: typingDone ? 1 : 0.4 }}
                >
                  {atEnd
                    ? t(ui.endOfExplanation)
                    : t(ui.clickToContinue)}
                </div>
                {atEnd && onNextSlide && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onNextSlide();
                    }}
                    className={`${tokens.button.primary} min-h-[44px] sm:min-h-0`}
                  >
                    {t(ui.nextSlide)}
                  </button>
                )}
                {atEnd && !onNextSlide && typingDone && onExit && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onExit();
                    }}
                    className={`${tokens.button.primary} min-h-[44px] sm:min-h-0`}
                  >
                    {t(ui.slideBack)}
                  </button>
                )}
              </div>
            </div>
          }
        />
      ) : (
        <div className="flex-1 px-4 sm:px-10 pt-4 sm:pt-8 pb-4 sm:pb-8 min-h-0 flex flex-col">
          <div
            className="mx-auto flex flex-col flex-1 min-h-0 gap-6 w-full"
            style={{
              maxWidth: "min(64rem, 100%)",
            }}
          >
            <div>{titleBlock}</div>
            <div className={`flex-1 p-6 flex flex-col gap-5 ${tokens.card.surface}`}>
            <div className="flex items-center justify-between">
              <div className={tokens.text.eyebrow}>
                {t(ui.stepLabel)} <span className="tabular-nums">{step + 1} / {slide.steps.length}</span>
              </div>
              <div className="flex items-center gap-2">
                {!atStart && (
                  <button
                    onClick={back}
                    className="text-xs px-3 py-2 min-h-[44px] sm:min-h-0 sm:px-2 sm:py-1 rounded-md transition-colors
                               bg-white hover:bg-stone-50 text-stone-700 border border-stone-900/[0.08]
                               dark:bg-[#1f232c] dark:hover:bg-[#252934] dark:text-stone-200 dark:border-white/[0.08]"
                  >
                    {t(ui.stepBack)}
                  </button>
                )}
                {noteBox && (
                  <button
                    type="button"
                    onClick={openHelp}
                    aria-label={t("Show tip")}
                    title={t("Show tip")}
                    className="w-11 h-11 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-colors
                               bg-[#FBE8CF] hover:bg-[#f6dab3] active:bg-[#e6c890] text-[#C97A1F]
                               border border-[#C97A1F]/30
                               dark:bg-[#3a2a18] dark:hover:bg-[#4a3520] dark:active:bg-[#5a4028] dark:text-[#F0B274] dark:border-[#F0B274]/30"
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
              className="leading-relaxed min-h-[6rem] whitespace-pre-line text-stone-800 dark:text-stone-100 max-w-3xl mx-auto w-full"
              style={{ fontSize: `${prosePx}px` }}
            >
              {current?.narration ? (
                // `skip` is driven by the global typewriter pref only —
                // students who want instant text flip the title-row
                // toggle. `typingDone` (set via onDone) gates whether
                // a click on the slide can advance, see the `advance()`
                // handler near the top of the component.
                <Typewriter
                  text={collapseSoftBreaks(t(current.narration))}
                  skip={!typewriter.enabled}
                  onDone={() => setTypingDone(true)}
                />
              ) : (
                <span className="text-stone-400 dark:text-stone-500 italic">…</span>
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
                      tokenHighlights={tokenHighlights}
                      resolveLabel={resolveLabel}
                      fontPx={codePx}
                    />
                  ))}
                </div>
              </div>
            ) : null}

            <div className="flex-1" />
            <div className="flex items-center justify-between gap-3">
              <div className="text-sm italic text-stone-500 dark:text-stone-400">
                {atEnd
                  ? t(ui.endOfExplanation)
                  : t(ui.clickToContinue)}
              </div>
              {atEnd && onNextSlide && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onNextSlide();
                  }}
                  className={`${tokens.button.primary} min-h-[44px] sm:min-h-0`}
                >
                  {t(ui.nextSlide)}
                </button>
              )}
              {atEnd && !onNextSlide && typingDone && onExit && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onExit();
                  }}
                  className={`${tokens.button.primary} min-h-[44px] sm:min-h-0`}
                >
                  {t(ui.slideBack)}
                </button>
              )}
            </div>
          </div>
          </div>

          {noteBox && helpOpen && (
            <div
              role="dialog"
              aria-modal="true"
              aria-label={t("Tip")}
              onClick={(e) => {
                e.stopPropagation();
                if (e.target === e.currentTarget) setHelpOpen(false);
              }}
              className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/50 cursor-default"
            >
              <div
                className="max-w-lg w-full rounded-xl p-6 cursor-default border-2 shadow-xl
                           bg-[#FBE8CF] border-[#C97A1F]/30
                           dark:bg-[#3a2a18] dark:border-[#F0B274]/30"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] font-mono font-medium text-[#C97A1F] dark:text-[#F0B274]">
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
                    {t("Tip")}
                  </div>
                  <button
                    type="button"
                    onClick={closeHelp}
                    aria-label={t("Close")}
                    className="w-11 h-11 sm:w-7 sm:h-7 rounded-full flex items-center justify-center text-xl sm:text-lg leading-none transition-colors
                               text-[#C97A1F]/70 hover:bg-[#C97A1F]/10
                               dark:text-[#F0B274]/70 dark:hover:bg-[#F0B274]/10"
                  >
                    ×
                  </button>
                </div>
                <div
                  className="whitespace-pre-line leading-relaxed text-stone-800 dark:text-stone-100"
                  style={{ fontSize: `${prosePx}px` }}
                >
                  {noteBox.label ? t(noteBox.label) : ""}
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
