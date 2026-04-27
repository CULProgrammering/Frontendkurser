import { useEffect, useMemo, useRef, useState } from "react";
import type { JsChipAssignmentSlide, JsChipPuzzle } from "../types";
import { useLang } from "../i18n/LanguageContext";
import { t } from "../i18n";
import { ui } from "../i18n/strings";

const SETTLE_MS = 400;

type Props = {
  slide: JsChipAssignmentSlide;
  storageKey: string;
  onPass?: () => void;
};

type CheckState = "pending" | "right" | "wrong";

/**
 * Sequential chip-placement exercise. The student works through 1..N
 * sub-puzzles in order; each is independent state-wise. We persist only
 * the highest puzzle reached, not chip positions (state resets per visit).
 */
export function JsChipAssignmentSlideView({ slide, storageKey: _storageKey, onPass }: Props) {
  const { lang } = useLang();
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
    <div className="h-full w-full flex flex-col">
      <div className="px-10 pt-8">
        <h2 className="text-3xl font-semibold text-stone-900 dark:text-indigo-50">
          {t(slide.title, lang)}
        </h2>
        <p className="text-stone-600 dark:text-indigo-200/80 mt-1 whitespace-pre-line">
          {t(puzzle.intro ?? slide.prompt, lang)}
        </p>
        <div className="mt-3 flex items-center gap-2 text-xs text-stone-500 dark:text-indigo-200/60">
          <span className="uppercase tracking-wider">
            {lang === "sv" ? "Pussel" : "Puzzle"} {puzzleIdx + 1} / {total}
          </span>
          <div className="flex gap-1">
            {slide.puzzles.map((_, i) => (
              <div
                key={i}
                className={
                  "h-1.5 w-6 rounded-full transition-colors " +
                  (i === puzzleIdx
                    ? "bg-amber-500 dark:bg-indigo-300"
                    : i < puzzleIdx
                    ? "bg-amber-300 dark:bg-indigo-500/60"
                    : "bg-stone-300 dark:bg-white/20")
                }
              />
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 px-10 py-6 min-h-0 flex flex-col">
        <PuzzleView
          key={puzzleIdx}
          puzzle={puzzle}
          isLast={isLast}
          onAdvance={() => {
            if (isLast) {
              if (!allDoneRef.current) {
                allDoneRef.current = true;
                onPass?.();
              }
            } else {
              setPuzzleIdx((i) => i + 1);
            }
          }}
          lang={lang}
        />
      </div>

      <div className="px-10 pb-2 flex items-center gap-2">
        {hasLegend && (
          <button
            onClick={() => setShowLegend((v) => !v)}
            className="px-3 py-1.5 rounded-lg text-sm ring-1
                       bg-amber-100 hover:bg-amber-200 text-amber-800 ring-amber-300
                       dark:bg-amber-500/20 dark:hover:bg-amber-500/30 dark:text-amber-200 dark:ring-amber-400/30"
          >
            {t(showLegend ? ui.hideHelp : ui.showHelp, lang)}
          </button>
        )}
        {puzzleIdx > 0 && (
          <button
            onClick={() => setPuzzleIdx((i) => Math.max(0, i - 1))}
            className="ml-auto px-3 py-1.5 rounded-lg text-sm
                       bg-stone-100 hover:bg-stone-200 text-stone-700
                       dark:bg-slate-700 dark:hover:bg-slate-600 dark:text-white"
          >
            ◀ {lang === "sv" ? "Föregående pussel" : "Previous puzzle"}
          </button>
        )}
      </div>

      {showLegend && hasLegend && (
        <div className="mx-10 mb-6 rounded-2xl p-4 ring-1
                        bg-amber-50 ring-amber-200
                        dark:bg-amber-500/10 dark:ring-amber-400/30">
          <div className="text-xs uppercase tracking-wider mb-2
                          text-amber-700 dark:text-amber-200">
            {t(ui.legendLabel, lang)}
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {slide.legend!.map((e, i) => (
              <div
                key={i}
                className="rounded-lg p-3 ring-1
                           bg-white ring-stone-200
                           dark:bg-slate-900/60 dark:ring-white/10"
              >
                <div className="font-semibold text-amber-800 dark:text-amber-100">
                  {t(e.name, lang)}
                </div>
                <div className="font-mono text-xs text-stone-600 dark:text-indigo-200/80">
                  {e.syntax}
                </div>
                <div className="font-mono text-xs mt-1 text-emerald-700 dark:text-emerald-200/90">
                  {e.example}
                </div>
                {e.note && (
                  <div className="text-xs mt-1 text-stone-500 dark:text-indigo-200/60">
                    {t(e.note, lang)}
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
  onAdvance,
  lang,
}: {
  puzzle: JsChipPuzzle;
  isLast: boolean;
  onAdvance: () => void;
  lang: import("../i18n").Lang;
}) {
  const template = t(puzzle.template, lang);
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
  const allSlotsFilled = slots.every((s) => s !== null);

  const isSlotCorrect = (slotIdx: number, slotsArr: (number | null)[]): boolean => {
    const placed = slotsArr[slotIdx];
    if (placed === null) return false;
    const txt = puzzle.chips[placed];
    if (puzzle.solution[slotIdx] === txt) return true;
    return (puzzle.alternatives ?? []).some((alt) => alt[slotIdx] === txt);
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

  const runCheck = () => {
    if (!allSlotsFilled) return;
    const placedTexts = slots.map((s) => puzzle.chips[s as number]);
    const matches = (candidate: string[]) =>
      placedTexts.every((txt, i) => txt === candidate[i]);
    const ok =
      matches(puzzle.solution) ||
      (puzzle.alternatives ?? []).some(matches);
    if (ok) {
      setCheck("right");
      return;
    }
    setCheck("wrong");
    // Identify which slots hold a chip that doesn't match at this position
    // (under the canonical solution OR any accepted alternative). Mark them
    // as settling, then after the fade duration clear them back to the pool.
    const wrong = new Set<number>();
    for (let i = 0; i < slots.length; i++) {
      if (slots[i] !== null && !isSlotCorrect(i, slots)) wrong.add(i);
    }
    setSettling(wrong);
    if (settleTimer.current !== null) window.clearTimeout(settleTimer.current);
    settleTimer.current = window.setTimeout(() => {
      setSlots((prev) => prev.map((s, i) => (wrong.has(i) ? null : s)));
      setSettling(new Set());
      settleTimer.current = null;
    }, SETTLE_MS);
  };

  // Split template into text parts on [[]] markers.
  const parts = template.split("[[]]");

  return (
    <div className="flex-1 flex flex-col gap-4 min-h-0">
      {puzzle.prompt && (
        <p className="text-stone-700 dark:text-indigo-100 whitespace-pre-line">
          {t(puzzle.prompt, lang)}
        </p>
      )}

      {/* Code panel with embedded slots */}
      <div
        className={
          "rounded-xl p-5 font-mono text-sm whitespace-pre " +
          "bg-slate-900 text-indigo-50 ring-1 ring-white/10"
        }
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

      {/* Chip pool — rendered in shuffled order; click identity stays original. */}
      <div className="flex flex-wrap gap-2">
        {displayOrder.map((idx) => {
          const text = puzzle.chips[idx];
          const placed = placedIds.has(idx);
          return (
            <button
              key={idx}
              onClick={() => handleChipClick(idx)}
              disabled={check === "right"}
              className={
                "px-3 py-2 rounded-lg font-mono text-sm transition-all ring-1 " +
                (placed
                  ? "bg-stone-100 text-stone-300 ring-stone-200 cursor-not-allowed dark:bg-slate-800/40 dark:text-slate-600 dark:ring-white/5"
                  : "bg-amber-100 hover:bg-amber-200 text-amber-900 ring-amber-300 active:scale-95 dark:bg-indigo-500/20 dark:hover:bg-indigo-500/30 dark:text-indigo-100 dark:ring-indigo-400/30")
              }
            >
              {text}
            </button>
          );
        })}
      </div>

      {/* Action row */}
      <div className="flex items-center gap-3 mt-auto">
        {check !== "right" && (
          <button
            onClick={runCheck}
            disabled={!allSlotsFilled}
            className="px-4 py-2 rounded-lg text-white text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed
                       bg-amber-500 hover:bg-amber-600
                       dark:bg-indigo-500 dark:hover:bg-indigo-400"
          >
            {t(ui.check, lang)}
          </button>
        )}
        {check === "wrong" && (
          <div className="text-sm text-stone-600 dark:text-indigo-200/70 space-y-0.5">
            <div>{lang === "sv" ? "Inte den här." : "Not this one."}</div>
            {puzzle.wrongHint && (
              <div className="text-xs text-stone-500 dark:text-indigo-200/55 italic">
                {t(puzzle.wrongHint, lang)}
              </div>
            )}
          </div>
        )}
        {check === "right" && (
          <>
            <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
              {lang === "sv" ? "✓ Rätt!" : "✓ Correct!"}
            </span>
            <button
              onClick={onAdvance}
              className="ml-auto px-4 py-2 rounded-lg text-white text-sm font-medium
                         bg-emerald-500 hover:bg-emerald-600
                         dark:bg-emerald-500 dark:hover:bg-emerald-400"
            >
              {isLast
                ? lang === "sv"
                  ? "Slutför ✓"
                  : "Finish ✓"
                : lang === "sv"
                ? "Nästa pussel ▶"
                : "Next puzzle ▶"}
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
      }}
      className={
        "inline-block align-baseline mx-0.5 px-2 py-0.5 rounded font-mono text-sm ring-1 transition-colors " +
        (empty
          ? "bg-slate-800 ring-dashed ring-indigo-300/40 text-indigo-300/40 min-w-[3em]"
          : showRight
          ? "bg-emerald-500/20 ring-emerald-400/60 text-emerald-100"
          : showWrong
          ? // Muted amber/stone — visible as "this one isn't right" without alarm.
            "bg-amber-500/10 ring-amber-300/40 text-amber-100/80"
          : "bg-amber-500/20 ring-amber-400/60 text-amber-100 hover:bg-amber-500/30")
      }
    >
      {empty ? "▢" : chipText}
    </button>
  );
}
