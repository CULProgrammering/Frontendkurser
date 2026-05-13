import { useCallback, useEffect, useMemo, useRef, useState, Fragment } from "react";
import type { Lesson } from "../types";
import { ExplanationSlideView } from "./ExplanationSlideView";
import { AssignmentSlideView } from "./AssignmentSlideView";
import { JsAssignmentSlideView } from "./JsAssignmentSlideView";
import { JsChipAssignmentSlideView } from "./JsChipAssignmentSlideView";
import { JsTypedAssignmentSlideView } from "./JsTypedAssignmentSlideView";
import { JsWorkshopSlideView } from "./JsWorkshopSlideView";
import { ExerciseSlideView } from "./ExerciseSlideView";
import { markSlideComplete } from "../progress";
import { slidesForTier, type Tier } from "../tiers";
import { t } from "../i18n";
import { ui } from "../i18n/strings";

export type BreadcrumbSegment = {
  label: string;
  /**
   * Optional shorter label used only by the "Back to X" button. Set when the
   * segment's natural label is verbose (e.g. a full lesson title) and a
   * tighter word reads better on the back button — e.g. `shortLabel: "menu"`
   * on the lesson segment of a tier-deck breadcrumb. Falls back to `label`.
   */
  shortLabel?: string;
  onNavigate?: () => void;
};

type Props = {
  courseId: string;
  lesson: Lesson;
  /** When provided, the deck shows only that tier's slides. */
  tier?: Tier;
  /**
   * Optional starting slide index within the (tier-filtered) slides. Used by
   * the tier menu when the student picks a specific row in a multi-slide tier
   * card (workshop/exercise) instead of the card as a whole. Defaults to 0.
   */
  initialIdx?: number;
  /**
   * Multi-segment breadcrumb forwarded to each slide view, which renders
   * it just above its title.
   */
  breadcrumb?: BreadcrumbSegment[];
  onExit: () => void;
  /**
   * Context-aware end-of-tier action. The slide view renders `primary`
   * (and `secondary` when present) at the end of the tier (last slide /
   * step / puzzle) instead of the legacy "← Back" exit. Used to surface:
   *   - "Continue → next tier" mid-lesson (primary only)
   *   - "Continue → next lesson" + "← Back to {topic}" on the final
   *     tier when a next lesson exists (primary + secondary)
   *   - "← Back to {topic / home}" on the very last lesson (primary only)
   *
   * When omitted, slide views fall back to the legacy "← Back" → `onExit`
   * behaviour (used by walkthrough flows etc. that don't have a tier
   * sequence or a curriculum-next lesson).
   */
  endAction?: EndAction;
};

export type EndAction = {
  primary: { label: string; onClick: () => void };
  /** Optional secondary button rendered alongside `primary` — used on the
   * final tier when both "back to topic" and "continue to next lesson"
   * make sense. */
  secondary?: { label: string; onClick: () => void };
};

// Minimum horizontal swipe distance (px) to count as a slide change.
const SWIPE_THRESHOLD = 50;
// Maximum vertical drift allowed during a swipe (px). Above this we treat the
// gesture as a scroll, not a swipe.
const SWIPE_VERT_TOLERANCE = 60;

export function SlideDeck({ courseId, lesson, tier, initialIdx, breadcrumb, onExit, endAction }: Props) {
  const [idx, setIdx] = useState(initialIdx ?? 0);

  const slides = useMemo(
    () => (tier ? slidesForTier(lesson, tier) : lesson.slides),
    [lesson, tier]
  );
  const total = slides.length;

  const next = useCallback(
    () => setIdx((i) => Math.min(i + 1, total - 1)),
    [total]
  );
  const prev = useCallback(() => setIdx((i) => Math.max(i - 1, 0)), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const typing =
        !!target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable);
      if (typing) return;
      if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === "Escape") onExit();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev, onExit]);

  // Touch swipe → arrow keys. Skip when the gesture starts inside an input,
  // textarea, or the Monaco editor — those need to handle their own touch
  // events without triggering a slide change.
  const swipeStart = useRef<{ x: number; y: number } | null>(null);
  const onTouchStart = (e: React.TouchEvent) => {
    const target = e.target as HTMLElement | null;
    if (
      target &&
      (target.closest("textarea") ||
        target.closest("input") ||
        target.closest(".monaco-editor"))
    ) {
      swipeStart.current = null;
      return;
    }
    const touch = e.touches[0];
    if (!touch) return;
    swipeStart.current = { x: touch.clientX, y: touch.clientY };
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const start = swipeStart.current;
    swipeStart.current = null;
    if (!start) return;
    const touch = e.changedTouches[0];
    if (!touch) return;
    const dx = touch.clientX - start.x;
    const dy = touch.clientY - start.y;
    if (Math.abs(dy) > SWIPE_VERT_TOLERANCE) return;
    if (dx <= -SWIPE_THRESHOLD) next();
    else if (dx >= SWIPE_THRESHOLD) prev();
  };

  // Explanation tier has no per-slide pass event from the slide view —
  // mark each slide as "complete" the moment the student lands on it.
  // The tier is then complete once they've reached every slide. Other
  // tiers (chip / workshop / exercise) fire onPass themselves and write
  // their own per-slide complete via the handler below.
  useEffect(() => {
    if (tier === "explanation") {
      markSlideComplete(courseId, lesson.id, "explanation", idx);
    }
  }, [tier, idx, courseId, lesson.id]);

  // Per-slide pass handler — wired into every slide kind that fires
  // `onPass`. Each slide that passes records its own completion. Tier
  // completion is then derived (`every slide in tier marked complete`)
  // rather than written as a single flag, so students who skip ahead
  // (or who finish only some sub-items) don't falsely mark the whole
  // tier done.
  const onSlidePass = tier
    ? () => markSlideComplete(courseId, lesson.id, tier, idx)
    : undefined;

  // Empty tier — show breadcrumb-as-fallback on its own.
  if (total === 0) {
    return (
      <div className="h-full flex flex-col bg-[#f6f3ec] dark:bg-[#14161c]">
        {breadcrumb && (
          <div className="px-4 sm:px-10 pt-3">
            <Breadcrumb segments={breadcrumb} />
          </div>
        )}
        <div className="flex-1 min-h-0 flex items-center justify-center">
          <p className="text-stone-500 dark:text-stone-400 italic">
            {t(ui.tierEmpty)}
          </p>
        </div>
      </div>
    );
  }

  const slide = slides[idx];
  const isLastSlide = idx === total - 1;
  // Fires on every slide pass (chip / workshop / exercise / etc.), not just
  // the last one — that's how we get honest per-slide progress and a true
  // "tier complete = all slides done" derivation.
  const passHandler = onSlidePass;

  /**
   * Strip the "Workshop:" / "Lab:" prefix from a slide title so the
   * Continue button doesn't read "Continue → 2. Workshop: Bank account".
   * Mirrors the helper used in LessonTierMenu; kept here too to avoid an
   * import cycle.
   */
  const stripTierPrefix = (title: string): string => {
    const stripped = title.replace(/^(Workshop|Lab|Verkstad|Labb)\s*:\s*/i, "").trim();
    if (stripped.length === 0) return title;
    return stripped[0].toUpperCase() + stripped.slice(1);
  };

  // Effective end action for the slide view. On the last slide of the tier
  // we forward whatever the parent supplied (Continue → next tier, or the
  // dual-button last-tier layout). On *intermediate* slides of chip /
  // workshop / exercise tiers we build a local "Continue → next sub-slide"
  // so the student flows linearly through the tier — combined with row
  // locking, this is the only viable forward path. Explanation tier
  // already has `onNextSlide` for the same purpose.
  const intermediateAdvance =
    !isLastSlide &&
    (slide.kind === "js-chip-assignment" ||
      slide.kind === "js-workshop" ||
      slide.kind === "exercise")
      ? {
          primary: {
            label: `Continue → ${idx + 2}. ${stripTierPrefix(t(slides[idx + 1].title))}`,
            onClick: () => setIdx(idx + 1),
          },
        }
      : null;
  const effectiveEndAction = isLastSlide ? endAction : intermediateAdvance ?? undefined;

  // Workshop and exercise tiers historically rendered the slide-jump dots in
  // the right-pane title row, where they looked like a per-step indicator but
  // actually swapped the whole workshop/lab. We now lift the dots out for
  // these two tiers and render them as a labelled, centered row above both
  // panes ("Workshop X / N" / "Lab X / N") so the navigation is unmistakable.
  // Other slide kinds keep the inline dots in their title row.
  const isMultiPick =
    total > 1 && (slide.kind === "js-workshop" || slide.kind === "exercise");
  const tierLabel =
    slide.kind === "js-workshop"
      ? t(ui.tierLabelWorkshop)
      : t(ui.tierLabelLab);
  const slideJumpDots =
    total > 1 && !isMultiPick ? (
      <SlideJumpDots total={total} idx={idx} onJump={setIdx} />
    ) : null;

  return (
    <div
      className="h-full flex flex-col bg-[#f6f3ec] dark:bg-[#14161c]"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {isMultiPick && (
        <div className="px-4 pt-3 pb-1 flex items-center justify-center gap-3">
          <div className="text-[11px] uppercase tracking-[0.18em] font-mono font-medium text-stone-500 dark:text-stone-400 tabular-nums">
            {tierLabel} {idx + 1} / {total}
          </div>
          <SlideJumpDots total={total} idx={idx} onJump={setIdx} />
        </div>
      )}
      <div className="flex-1 min-h-0">
        {slide.kind === "explanation" && (
          <ExplanationSlideView
            slide={slide}
            breadcrumb={breadcrumb}
            slideJumpDots={slideJumpDots}
            onNextSlide={isLastSlide ? undefined : () => setIdx(idx + 1)}
            onExit={onExit}
            endAction={effectiveEndAction}
            key={`e-${idx}`}
          />
        )}
        {slide.kind === "assignment" && (
          <AssignmentSlideView
            slide={slide}
            storageKey={`${courseId}:${lesson.id}:${idx}`}
            breadcrumb={breadcrumb}
            slideJumpDots={slideJumpDots}
            key={`a-${idx}`}
            onPass={passHandler}
          />
        )}
        {slide.kind === "js-assignment" && (
          <JsAssignmentSlideView
            slide={slide}
            storageKey={`${courseId}:${lesson.id}:${idx}`}
            breadcrumb={breadcrumb}
            slideJumpDots={slideJumpDots}
            key={`j-${idx}`}
            onPass={passHandler}
          />
        )}
        {slide.kind === "js-chip-assignment" && (
          <JsChipAssignmentSlideView
            slide={slide}
            storageKey={`${courseId}:${lesson.id}:${idx}`}
            breadcrumb={breadcrumb}
            slideJumpDots={slideJumpDots}
            key={`c-${idx}`}
            onPass={passHandler}
            onExit={onExit}
            endAction={effectiveEndAction}
          />
        )}
        {slide.kind === "js-typed-assignment" && (
          <JsTypedAssignmentSlideView
            slide={slide}
            storageKey={`${courseId}:${lesson.id}:${idx}`}
            breadcrumb={breadcrumb}
            slideJumpDots={slideJumpDots}
            key={`t-${idx}`}
            onPass={passHandler}
          />
        )}
        {slide.kind === "js-workshop" && (
          <JsWorkshopSlideView
            slide={slide}
            storageKey={`${courseId}:${lesson.id}:${idx}`}
            breadcrumb={breadcrumb}
            slideJumpDots={slideJumpDots}
            key={`w-${idx}`}
            onPass={passHandler}
            onExit={onExit}
            endAction={effectiveEndAction}
          />
        )}
        {slide.kind === "exercise" && (
          <ExerciseSlideView
            slide={slide}
            storageKey={`${courseId}:${lesson.id}:${idx}`}
            breadcrumb={breadcrumb}
            slideJumpDots={slideJumpDots}
            key={`x-${idx}`}
            onPass={passHandler}
            endAction={effectiveEndAction}
          />
        )}
      </div>
    </div>
  );
}

/**
 * Breadcrumb. On screens narrower than `sm` (640px) we collapse middle
 * segments behind a `…` button to keep the chrome inside the viewport;
 * tapping the `…` expands the full path inline.
 */
export function Breadcrumb({ segments }: { segments: BreadcrumbSegment[] }) {
  const [expanded, setExpanded] = useState(false);
  const canCollapse = segments.length >= 3;
  const isMiddle = (i: number) => i !== 0 && i !== segments.length - 1;

  // Parent = the segment immediately before the current page. Drives the
  // "← Back to X" quick-exit button on the right of the row. We only render
  // the button when that segment has an onNavigate (i.e. it's actually
  // navigable — not the case on the home view, which has no breadcrumb at
  // all). `shortLabel` lets the call-site override the back-button text
  // when the natural segment label is too long for a button (lesson titles).
  const parent =
    segments.length >= 2 ? segments[segments.length - 2] : undefined;
  const backLabel = parent?.shortLabel ?? parent?.label;

  return (
    <nav
      aria-label="Breadcrumb"
      className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-stone-500 dark:text-stone-400 min-w-0 flex-wrap"
    >
      {segments.map((seg, i) => {
        const isLast = i === segments.length - 1;
        const clickable = !!seg.onNavigate && !isLast;
        const hideOnMobile = canCollapse && isMiddle(i) && !expanded;
        const wrapperClass =
          (hideOnMobile ? "hidden sm:inline-flex" : "inline-flex") +
          " items-center gap-1.5 sm:gap-2 min-w-0";

        return (
          <Fragment key={i}>
            {/* Ellipsis pill: rendered once, just before the first middle
                segment, on <sm only. Disappears once expanded. */}
            {canCollapse && i === 1 && !expanded && (
              <Fragment>
                <button
                  type="button"
                  onClick={() => setExpanded(true)}
                  aria-label="Show full breadcrumb"
                  className="sm:hidden px-2 min-h-[28px] rounded hover:bg-stone-200 dark:hover:bg-[#252934] transition-colors"
                >
                  …
                </button>
                <span
                  aria-hidden="true"
                  className="sm:hidden text-stone-400 dark:text-stone-500"
                >
                  ›
                </span>
              </Fragment>
            )}
            <span className={wrapperClass}>
              {clickable ? (
                // Clickable segments — paper-tinted pill, deeper on hover.
                // Reinforces that each segment is a tap target so students
                // can navigate up without hunting for a Back button.
                <button
                  onClick={seg.onNavigate}
                  className="truncate max-w-[8rem] sm:max-w-[14rem] px-2 py-0.5 rounded-md transition-colors
                             bg-stone-100 text-stone-600 hover:bg-stone-200 hover:text-stone-900
                             dark:bg-[#222630] dark:text-stone-400 dark:hover:bg-[#2c303a] dark:hover:text-stone-100"
                >
                  {seg.label}
                </button>
              ) : (
                // Last segment — current page. Stronger neutral pill +
                // bold text, no hover. Tells the student "you are here".
                <span
                  className={
                    "truncate max-w-[10rem] sm:max-w-[18rem] px-2 py-0.5 rounded-md " +
                    (isLast
                      ? "bg-stone-200 text-stone-900 font-medium dark:bg-[#2c303a] dark:text-stone-100"
                      : "")
                  }
                  aria-current={isLast ? "page" : undefined}
                >
                  {seg.label}
                </span>
              )}
              {!isLast && (
                <span aria-hidden="true" className="text-stone-400 dark:text-stone-500">
                  ›
                </span>
              )}
            </span>
          </Fragment>
        );
      })}
      {/* "← Back to X" — quick one-level-up exit. Right-aligned so it sits
          opposite the breadcrumb chain, where the eye finishes scanning.
          Bordered + slightly larger so it reads as a primary action rather
          than chrome. Hidden when there's no navigable parent (home). */}
      {parent?.onNavigate && backLabel && (
        <button
          onClick={parent.onNavigate}
          className="ml-auto inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-sm font-medium whitespace-nowrap transition-colors
                     bg-white text-stone-800 border border-stone-900/[0.15] hover:bg-stone-100 hover:border-stone-900/30
                     dark:bg-[#222630] dark:text-stone-100 dark:border-white/[0.12] dark:hover:bg-[#2c303a] dark:hover:border-white/25"
        >
          <span aria-hidden="true">←</span>
          <span className="truncate max-w-[12rem]">Back to {backLabel}</span>
        </button>
      )}
    </nav>
  );
}

/**
 * Slide-progress dots. On <sm with more than 6 slides we collapse to a
 * compact "n / total" button that opens a sheet with the full grid; on
 * sm+ we always render the inline row.
 */
function SlideJumpDots({
  total,
  idx,
  onJump,
}: {
  total: number;
  idx: number;
  onJump: (i: number) => void;
}) {
  const [open, setOpen] = useState(false);
  const useCompact = total > 6;

  const dotClass = (i: number) =>
    "h-7 w-7 rounded-md text-xs font-mono font-medium tabular-nums transition-colors border " +
    (i === idx
      ? "bg-stone-900 dark:bg-[#F0B274] text-stone-50 dark:text-stone-900 border-transparent"
      : i < idx
        ? "bg-[#FBE8CF] dark:bg-[#3a2a18] text-[#C97A1F] dark:text-[#F0B274] border-transparent hover:opacity-80"
        : "bg-transparent text-stone-500 dark:text-stone-400 border-stone-900/[0.12] dark:border-white/[0.10] hover:bg-stone-100 dark:hover:bg-[#252934]");

  return (
    <>
      {/* Full inline dots — always shown on sm+; on <sm only when total <= 6. */}
      <div
        className={
          (useCompact ? "hidden sm:flex" : "flex") +
          " flex-wrap items-center justify-end gap-1.5"
        }
        aria-label="Slide progress"
      >
        {Array.from({ length: total }, (_, i) => (
          <button
            key={i}
            onClick={() => onJump(i)}
            aria-label={`Go to slide ${i + 1}`}
            aria-current={i === idx ? "step" : undefined}
            className={dotClass(i)}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {/* Compact button — only on <sm with >6 dots. */}
      {useCompact && (
        <>
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Jump to slide"
            className="sm:hidden inline-flex items-center gap-1 min-h-[36px] px-3 py-1.5 rounded-lg text-xs font-mono font-medium tabular-nums
                       bg-white dark:bg-[#1f232c] border border-stone-900/[0.08] dark:border-white/[0.08] text-stone-700 dark:text-stone-200
                       hover:bg-stone-50 dark:hover:bg-[#252934]"
          >
            {idx + 1} / {total} ▾
          </button>
          {open && (
            <div
              role="dialog"
              aria-modal="true"
              aria-label="Slide list"
              onClick={(e) => {
                if (e.target === e.currentTarget) setOpen(false);
              }}
              className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-4 sm:hidden"
            >
              <div className="w-full max-w-md rounded-2xl bg-white dark:bg-[#1f232c] shadow-xl border border-stone-900/[0.08] dark:border-white/[0.08] p-4 mb-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-[10px] uppercase tracking-[0.18em] font-mono text-stone-500 dark:text-stone-400">
                    Slide {idx + 1} / {total}
                  </div>
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    aria-label="Close"
                    className="w-11 h-11 rounded-full text-xl leading-none
                               text-stone-500 hover:bg-stone-100
                               dark:text-stone-400 dark:hover:bg-[#252934]"
                  >
                    ×
                  </button>
                </div>
                <div className="grid grid-cols-6 gap-2">
                  {Array.from({ length: total }, (_, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        onJump(i);
                        setOpen(false);
                      }}
                      aria-label={`Go to slide ${i + 1}`}
                      aria-current={i === idx ? "step" : undefined}
                      className={
                        "h-11 rounded-lg text-sm font-mono font-medium tabular-nums transition-colors border " +
                        (i === idx
                          ? "bg-stone-900 dark:bg-[#F0B274] text-stone-50 dark:text-stone-900 border-transparent"
                          : i < idx
                            ? "bg-[#FBE8CF] dark:bg-[#3a2a18] text-[#C97A1F] dark:text-[#F0B274] border-transparent"
                            : "bg-transparent text-stone-600 dark:text-stone-300 border-stone-900/[0.12] dark:border-white/[0.10]")
                      }
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}

/** Convenience — breadcrumb + flex row of the title and inline controls.
 *
 * Stops click propagation: ExplanationSlideView wraps its whole pane in
 * `onClick={advance}` so clicking outside controls advances the slide.
 * Without this guard, clicking the theme toggle / font-size pill /
 * typewriter toggle / breadcrumb would also advance — that surprised
 * the student the first time they reached for the toggle. Stopping
 * propagation on the title row keeps "click anywhere to continue"
 * intuitive while still letting controls do their thing.
 */
export function SlideTitleRow({
  breadcrumb,
  children,
}: {
  breadcrumb?: BreadcrumbSegment[];
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1" onClick={(e) => e.stopPropagation()}>
      {breadcrumb && <Breadcrumb segments={breadcrumb} />}
      <div className="flex flex-col items-stretch gap-2 sm:flex-row sm:items-center sm:gap-3 sm:flex-wrap">
        {children}
      </div>
    </div>
  );
}
