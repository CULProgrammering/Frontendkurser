import { useEffect, useMemo, useRef, useState } from "react";
import type { JsChipAssignmentSlide, JsChipPuzzle } from "../types";
import { t } from "../i18n";
import { ui } from "../i18n/strings";
import { useSlideFontSize, SlideFontSizeControl } from "./SlideFontSize";
import { ThemeToggleInline } from "./ThemeToggle";
import { SlideTitleRow, type BreadcrumbSegment, type EndAction } from "./SlideDeck";
import { tokens } from "../styles/tokens";

const SETTLE_MS = 400;

type Props = {
  slide: JsChipAssignmentSlide;
  storageKey: string;
  breadcrumb?: BreadcrumbSegment[];
  slideJumpDots?: React.ReactNode;
  onPass?: () => void;
  /**
   * Called when the student finishes the LAST puzzle and clicks the
   * "Back to lesson" button — routes them back to the tier menu so they
   * don't have to navigate via breadcrumb. Marking the slide done
   * (`onPass`) and exiting are bundled into the same click.
   */
  onExit?: () => void;
  /**
   * Context-aware end-of-tier action. When provided, replaces the default
   * "← Back" button on the last-puzzle success state. `primary` is rendered
   * inline with the chips (where the legacy "← Back" lived); `secondary`
   * (when present) sits to its left in the same row. Takes precedence
   * over `onExit`.
   */
  endAction?: EndAction;
};

type CheckState = "pending" | "right" | "wrong";

/**
 * Sequential chip-placement exercise. The student works through 1..N
 * sub-puzzles in order; each is independent state-wise. We persist only
 * the highest puzzle reached, not chip positions (state resets per visit).
 */
export function JsChipAssignmentSlideView({ slide, storageKey: _storageKey, breadcrumb, slideJumpDots, onPass, onExit, endAction }: Props) {
  const { codePx, prosePx } = useSlideFontSize();
  const [puzzleIdx, setPuzzleIdx] = useState(0);
  const puzzle = slide.puzzles[puzzleIdx];
  const total = slide.puzzles.length;
  const isLast = puzzleIdx === total - 1;
  const [showLegend, setShowLegend] = useState(false);
  const hasLegend = !!slide.legend && slide.legend.length > 0;

  // When the student finishes the LAST puzzle, mark the slide passed.
  // Sentinel ref prevents re-firing onPass on subsequent renders.
  const allDoneRef = useRef(false);

  return (
    <div className="h-full w-full max-w-7xl mx-auto flex flex-col">
      <div className="px-4 sm:px-10 pt-4 sm:pt-8">
        <div className="max-w-3xl mx-auto">
          <SlideTitleRow breadcrumb={breadcrumb}>
            <h2 className={`${tokens.text.h2} flex-1 min-w-0`}>
              {t(slide.title)}
            </h2>
            <SlideFontSizeControl />
            <ThemeToggleInline />
          </SlideTitleRow>
          <div className="flex items-end justify-between gap-4 mt-2">
            <p
              className="text-stone-600 dark:text-stone-300 whitespace-pre-line flex-1 min-w-0"
              style={{ fontSize: `${prosePx}px` }}
            >
              {t(puzzle.intro ?? slide.prompt)}
            </p>
            {slideJumpDots}
          </div>
          <div className="mt-3 flex items-center gap-2">
            <span className={tokens.text.eyebrow}>
              Puzzle <span className="tabular-nums">{puzzleIdx + 1} / {total}</span>
            </span>
            <div className="flex gap-1">
              {slide.puzzles.map((_, i) => (
                <div
                  key={i}
                  className={
                    "h-1.5 w-6 rounded-full transition-colors " +
                    (i === puzzleIdx
                      ? "bg-stone-900 dark:bg-[#F0B274]"
                      : i < puzzleIdx
                        ? "bg-[#C97A1F] dark:bg-[#F0B274]/60"
                        : "bg-[#e8e2d3] dark:bg-[#2c303a]")
                  }
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 px-4 sm:px-10 py-3 sm:py-6 min-h-0 flex flex-col">
        <div className="max-w-3xl mx-auto w-full flex-1 flex flex-col min-h-0">
          <PuzzleView
            key={puzzleIdx}
            puzzle={puzzle}
            isLast={isLast}
            lastButtonLabel={endAction?.primary.label ?? t(ui.slideBack)}
            secondaryAction={endAction?.secondary}
            onAdvance={() => {
              if (isLast) {
                // Last puzzle correct: mark the slide done, then route
                // the student onward in the same click. `endAction` (when
                // supplied by SlideDeck) takes precedence — that's the
                // "Continue → next tier / next lesson" path. Falls back
                // to `onExit` (tier-menu) for callers that haven't wired
                // the contextual action.
                if (!allDoneRef.current) {
                  allDoneRef.current = true;
                  onPass?.();
                }
                if (endAction) endAction.primary.onClick();
                else onExit?.();
              } else {
                setPuzzleIdx((i) => i + 1);
              }
            }}
            codePx={codePx}
            prosePx={prosePx}
          />
        </div>
      </div>

      <div className="px-4 sm:px-10 pb-2">
        <div className="max-w-3xl mx-auto flex items-center gap-2">
          {hasLegend && (
            <button
              onClick={() => setShowLegend((v) => !v)}
              className="px-4 py-2 min-h-[44px] sm:min-h-0 sm:px-3 sm:py-1.5 rounded-lg text-sm font-medium transition-colors
                         bg-[#FBE8CF] hover:bg-[#f6dab3] text-[#C97A1F] border border-[#C97A1F]/30
                         dark:bg-[#3a2a18] dark:hover:bg-[#4a3520] dark:text-[#F0B274] dark:border-[#F0B274]/30"
            >
              {t(showLegend ? ui.hideHelp : ui.showHelp)}
            </button>
          )}
          {puzzleIdx > 0 && (
            <button
              onClick={() => setPuzzleIdx((i) => Math.max(0, i - 1))}
              className={`ml-auto ${tokens.button.secondary} min-h-[44px] sm:min-h-0`}
            >
              ◀ Previous puzzle
            </button>
          )}
        </div>
      </div>

      {showLegend && hasLegend && (
        <div
          className="mx-4 sm:mx-10 mb-4 sm:mb-6 rounded-xl p-4 border-2
                     bg-[#FBE8CF] border-[#C97A1F]/30
                     dark:bg-[#3a2a18] dark:border-[#F0B274]/30"
        >
          <div className={`${tokens.text.eyebrow} text-[#C97A1F] dark:text-[#F0B274] mb-2`}>
            {t(ui.legendLabel)}
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {slide.legend!.map((e, i) => (
              <div
                key={i}
                className={`${tokens.card.surface} p-3`}
              >
                <div className="font-display font-medium text-stone-900 dark:text-stone-100">
                  {t(e.name)}
                </div>
                <div className="font-mono text-xs text-stone-600 dark:text-stone-400">
                  {e.syntax}
                </div>
                <div className="font-mono text-xs mt-1 text-[#1F8A6E] dark:text-[#5FCAA8]">
                  {e.example}
                </div>
                {e.note && (
                  <div className="text-xs mt-1 text-stone-500 dark:text-stone-400">
                    {t(e.note)}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function PuzzleView({
  puzzle,
  isLast,
  lastButtonLabel,
  secondaryAction,
  onAdvance,
  codePx,
  prosePx,
}: {
  puzzle: JsChipPuzzle;
  isLast: boolean;
  /** Label for the success-state advance button on the last puzzle. */
  lastButtonLabel: string;
  /** Optional secondary button rendered alongside the primary on the last
   * puzzle's success state — e.g. "← Back to Variables" when the primary
   * is "Continue → next lesson". */
  secondaryAction?: { label: string; onClick: () => void };
  onAdvance: () => void;
  codePx: number;
  prosePx: number;
}) {
  const template = t(puzzle.template);
  const numSlots = useMemo(
    () => (template.match(/\[\[\]\]/g) || []).length,
    [template]
  );
  // slots: which chip-index is placed in each slot; null = empty.
  const [slots, setSlots] = useState<(number | null)[]>(() =>
    Array(numSlots).fill(null)
  );
  // Display order for chips in the pool — shuffled once when the puzzle
  // mounts so the answer isn't given away by left-to-right order.
  // Logic still uses original chip indices; only the rendered order changes.
  const displayOrder = useMemo(() => shuffle(puzzle.chips.length), [puzzle]);
  const [check, setCheck] = useState<CheckState>("pending");
  // Slot indices currently fading out after a wrong check. While a slot is
  // settling, it renders at opacity 0; after SETTLE_MS we clear it back to
  // null so the chip returns to the pool — softer than a shake.
  const [settling, setSettling] = useState<Set<number>>(() => new Set());
  const settleTimer = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (settleTimer.current !== null) window.clearTimeout(settleTimer.current);
    };
  }, []);

  // chip-index is placed if it appears in any slot.
  const placedIds = new Set(slots.filter((s): s is number => s !== null));

  // For `unordered: true` puzzles, the placed chips just have to match
  // `solution` as a multiset — slot order is ignored. Used by both the
  // per-slot correctness check (which slots to fade out on a wrong attempt)
  // and the all-slots-full final check.
  const multisetMatches = (placedTexts: string[], candidate: string[]): boolean => {
    if (placedTexts.length !== candidate.length) return false;
    const remaining = [...candidate];
    for (const txt of placedTexts) {
      const i = remaining.indexOf(txt);
      if (i === -1) return false;
      remaining.splice(i, 1);
    }
    return true;
  };

  const isSlotCorrect = (slotIdx: number, slotsArr: (number | null)[]): boolean => {
    const placed = slotsArr[slotIdx];
    if (placed === null) return false;
    const txt = puzzle.chips[placed];
    if (puzzle.unordered) {
      // In unordered mode, a slot is "correct" iff its chip text appears in
      // the solution multiset and isn't already accounted for by other slots
      // earlier in the array. Walk left-to-right consuming solution entries
      // — same chip text in a duplicate-allowed solution stays valid.
      const remaining = [...puzzle.solution];
      for (let i = 0; i < slotsArr.length; i++) {
        const cur = slotsArr[i];
        if (cur === null) continue;
        const curTxt = puzzle.chips[cur];
        const at = remaining.indexOf(curTxt);
        if (at === -1) {
          // This earlier (or current) slot is the one that breaks the multiset.
          if (i === slotIdx) return false;
          continue;
        }
        remaining.splice(at, 1);
        if (i === slotIdx) return true;
      }
      return false;
    }
    if (puzzle.solution[slotIdx] === txt) return true;
    return (puzzle.alternatives ?? []).some((alt) => alt[slotIdx] === txt);
  };

  // Run the check against an arbitrary slots arrangement. Used from chip
  // placement so we react the moment all slots fill — no explicit "Check"
  // button. Wrong placements fade back; correct ones surface "Next" right away.
  const runCheckOn = (next: (number | null)[]) => {
    if (next.some((s) => s === null)) return;
    const placedTexts = next.map((s) => puzzle.chips[s as number]);
    const matches = (candidate: string[]) =>
      placedTexts.every((txt, i) => txt === candidate[i]);
    const ok = puzzle.unordered
      ? multisetMatches(placedTexts, puzzle.solution)
      : matches(puzzle.solution) ||
        (puzzle.alternatives ?? []).some(matches);
    if (ok) {
      setCheck("right");
      return;
    }
    setCheck("wrong");
    const wrong = new Set<number>();
    for (let i = 0; i < next.length; i++) {
      if (next[i] !== null && !isSlotCorrect(i, next)) wrong.add(i);
    }
    setSettling(wrong);
    if (settleTimer.current !== null) window.clearTimeout(settleTimer.current);
    settleTimer.current = window.setTimeout(() => {
      setSlots((prev) => prev.map((s, i) => (wrong.has(i) ? null : s)));
      setSettling(new Set());
      settleTimer.current = null;
    }, SETTLE_MS);
  };

  const handleChipClick = (chipIdx: number) => {
    if (check === "right") return; // locked after correct
    // If already placed, return it to pool.
    const slotIdx = slots.indexOf(chipIdx);
    if (slotIdx !== -1) {
      const next = [...slots];
      next[slotIdx] = null;
      setSlots(next);
      setCheck("pending");
      return;
    }
    // Otherwise, place in leftmost empty slot.
    const empty = slots.indexOf(null);
    if (empty === -1) return; // all slots full — ignore
    const next = [...slots];
    next[empty] = chipIdx;
    setSlots(next);
    setCheck("pending");
    // If that placement filled the last slot, auto-check.
    if (next.every((s) => s !== null)) {
      runCheckOn(next);
    }
  };

  const handleSlotClick = (slotIdx: number) => {
    if (check === "right") return;
    const cur = slots[slotIdx];
    if (cur === null) return;
    const next = [...slots];
    next[slotIdx] = null;
    setSlots(next);
    setCheck("pending");
  };

  // Split template into text parts on [[]] markers.
  const parts = template.split("[[]]");

  return (
    <div className="flex-1 flex flex-col gap-4 min-h-0">
      {puzzle.prompt && (
        <p
          className="text-stone-700 dark:text-stone-200 whitespace-pre-line"
          style={{ fontSize: `${prosePx}px` }}
        >
          {t(puzzle.prompt)}
        </p>
      )}

      {/* Code panel with embedded slots */}
      <div
        className="rounded-lg p-5 font-mono whitespace-pre overflow-x-auto bg-stone-900 dark:bg-[#0f1117] text-stone-100 leading-relaxed"
        style={{ fontSize: `${codePx}px` }}
      >
        {parts.map((segment, i) => (
          <span key={i}>
            {segment}
            {i < parts.length - 1 && (
              <Slot
                chipIdx={slots[i]}
                chipText={
                  slots[i] !== null ? puzzle.chips[slots[i] as number] : null
                }
                state={check}
                isCorrect={
                  check !== "pending" &&
                  slots[i] !== null &&
                  isSlotCorrect(i, slots)
                }
                settling={settling.has(i)}
                onClick={() => handleSlotClick(i)}
              />
            )}
          </span>
        ))}
      </div>

      {/* Affordance hint: cold students don't always read chips as buttons
          on first glance — especially against the dark code panel above.
          A small instruction line in the chip area names the mechanic
          explicitly. Hidden once all slots are filled (then the verdict
          row carries the next signal) and once the puzzle has been
          solved. */}
      {check === "pending" && slots.some((s) => s === null) && (
        <div className="text-xs text-stone-500 dark:text-stone-400 italic">
          Tap a chip to drop it into the next empty slot.
        </div>
      )}

      {/* Chips sit right under the code; verdict/advance flow inline beside
          them — no big gap, no right-alignment. Click identity stays
          original; chips render in shuffled order. */}
      <div className="flex flex-wrap items-center gap-2">
        {displayOrder.map((idx) => {
          const text = puzzle.chips[idx];
          const placed = placedIds.has(idx);
          return (
            <button
              key={idx}
              onClick={() => handleChipClick(idx)}
              disabled={check === "right"}
              className={
                "px-3 py-3 sm:py-2 min-h-[44px] sm:min-h-0 rounded-md font-mono border-2 transition-all " +
                (placed
                  ? "bg-stone-100 text-stone-300 border-transparent cursor-not-allowed dark:bg-[#222630] dark:text-stone-600"
                  : "cursor-pointer shadow-sm hover:shadow-md hover:-translate-y-0.5 bg-amber-50 hover:bg-amber-100 active:bg-amber-200 text-stone-800 border-stone-900/[0.06] active:scale-95 dark:bg-stone-800 dark:hover:bg-stone-700 dark:text-stone-100 dark:border-white/[0.08]")
              }
              style={{ fontSize: `${codePx}px` }}
            >
              {text}
            </button>
          );
        })}
        {check === "wrong" && (
          <div className={`${tokens.feedback.error} ml-2 text-sm`}>
            <div className="font-medium">Not this one.</div>
            {puzzle.wrongHint && (
              <div className="text-xs italic mt-0.5 opacity-80">
                {t(puzzle.wrongHint)}
              </div>
            )}
          </div>
        )}
        {check === "right" && (
          <>
            {isLast && secondaryAction && (
              <button
                onClick={secondaryAction.onClick}
                className={`ml-2 ${tokens.button.secondary} min-h-[44px] sm:min-h-0`}
              >
                {secondaryAction.label}
              </button>
            )}
            <button
              onClick={onAdvance}
              className={`ml-2 ${tokens.button.primary} min-h-[44px] sm:min-h-0 inline-flex items-center max-w-[20rem]`}
            >
              <span className="truncate">
                {isLast ? lastButtonLabel : "Next puzzle ▶"}
              </span>
            </button>
          </>
        )}
      </div>

    </div>
  );
}

/** Returns a shuffled permutation of [0..n-1] (Fisher-Yates). */
function shuffle(n: number): number[] {
  const arr = Array.from({ length: n }, (_, i) => i);
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function Slot({
  chipIdx,
  chipText,
  state,
  isCorrect,
  settling,
  onClick,
}: {
  chipIdx: number | null;
  chipText: string | null;
  state: CheckState;
  isCorrect: boolean;
  settling: boolean;
  onClick: () => void;
}) {
  const empty = chipIdx === null;
  // A slot reads as "wrong" only while a chip still occupies it. Once the
  // settle timer clears the slot, the chip is gone and we show the empty
  // placeholder again — no leftover red.
  const showWrong = !empty && state === "wrong" && !isCorrect;
  const showRight = !empty && state === "right";

  return (
    <button
      onClick={onClick}
      style={{
        opacity: settling ? 0 : 1,
        transition: `opacity ${SETTLE_MS}ms ease-out`,
        fontSize: "inherit",
      }}
      className={
        "inline-block align-baseline mx-0.5 px-2 py-0.5 rounded font-mono border-2 transition-colors " +
        (empty
          ? // Empty slot — dashed border on the dark code panel.
            "bg-transparent border-dashed border-stone-500/50 text-stone-500/60 min-w-[3em]"
          : showRight
            ? // Correct: teal (semantic success — same hue as Conditionals).
              "bg-[#163029] border-[#5FCAA8] text-[#5FCAA8]"
            : showWrong
              ? // Wrong: rose (semantic error — same hue as Functions).
                "bg-[#39202a] border-[#EE8AA1]/60 text-[#EE8AA1]/90"
              : // Filled, awaiting check: warm amber.
                "bg-[#3a2a18] border-[#F0B274]/60 text-[#F0B274] hover:bg-[#4a3520]")
      }
    >
      {empty ? "▢" : chipText}
    </button>
  );
}
