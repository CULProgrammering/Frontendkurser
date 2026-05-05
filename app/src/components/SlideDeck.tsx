import { useCallback, useEffect, useMemo, useRef, useState, Fragment } from "react";
import type { Lesson } from "../types";
import { ExplanationSlideView } from "./ExplanationSlideView";
import { AssignmentSlideView } from "./AssignmentSlideView";
import { JsAssignmentSlideView } from "./JsAssignmentSlideView";
import { JsChipAssignmentSlideView } from "./JsChipAssignmentSlideView";
import { JsTypedAssignmentSlideView } from "./JsTypedAssignmentSlideView";
import { JsWorkshopSlideView } from "./JsWorkshopSlideView";
import { ExerciseSlideView } from "./ExerciseSlideView";
import { markTierComplete } from "../progress";
import { slidesForTier, type Tier } from "../tiers";
import { useLang } from "../i18n/LanguageContext";
import { t } from "../i18n";
import { ui } from "../i18n/strings";

export type BreadcrumbSegment = {
  label: string;
  onNavigate?: () => void;
};

type Props = {
  courseId: string;
  lesson: Lesson;
  /** When provided, the deck shows only that tier's slides. */
  tier?: Tier;
  /**
   * Multi-segment breadcrumb forwarded to each slide view, which renders
   * it just above its title.
   */
  breadcrumb?: BreadcrumbSegment[];
  onExit: () => void;
};

// Minimum horizontal swipe distance (px) to count as a slide change.
const SWIPE_THRESHOLD = 50;
// Maximum vertical drift allowed during a swipe (px). Above this we treat the
// gesture as a scroll, not a swipe.
const SWIPE_VERT_TOLERANCE = 60;

export function SlideDeck({ courseId, lesson, tier, breadcrumb, onExit }: Props) {
  const [idx, setIdx] = useState(0);
  const { lang } = useLang();

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

  // Explanation tier has no per-slide pass event — mark the tier complete as
  // soon as the student reaches the final slide.
  useEffect(() => {
    if (tier === "explanation" && total > 0 && idx === total - 1) {
      markTierComplete(courseId, lesson.id, "explanation");
    }
  }, [tier, idx, total, courseId, lesson.id]);

  const onTierPass = tier
    ? () => markTierComplete(courseId, lesson.id, tier)
    : undefined;

  // Empty tier — show breadcrumb-as-fallback on its own.
  if (total === 0) {
    return (
      <div className="h-full flex flex-col bg-[#faf7f2] dark:bg-slate-950">
        {breadcrumb && (
          <div className="px-4 sm:px-10 pt-3">
            <Breadcrumb segments={breadcrumb} />
          </div>
        )}
        <div className="flex-1 min-h-0 flex items-center justify-center">
          <p className="text-stone-500 dark:text-indigo-200/60 italic">
            {t(ui.tierEmpty, lang)}
          </p>
        </div>
      </div>
    );
  }

  const slide = slides[idx];
  const isLastSlide = idx === total - 1;
  const passHandler = isLastSlide ? onTierPass : undefined;

  const slideJumpDots =
    total > 1 ? (
      <SlideJumpDots total={total} idx={idx} onJump={setIdx} />
    ) : null;

  return (
    <div
      className="h-full flex flex-col bg-[#faf7f2] dark:bg-slate-950"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className="flex-1 min-h-0">
        {slide.kind === "explanation" && (
          <ExplanationSlideView
            slide={slide}
            breadcrumb={breadcrumb}
            slideJumpDots={slideJumpDots}
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

  return (
    <nav
      aria-label="Breadcrumb"
      className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-stone-500 dark:text-indigo-200/60 min-w-0 flex-wrap"
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
                  className="sm:hidden px-2 min-h-[28px] rounded hover:bg-stone-200 dark:hover:bg-slate-700/60 transition-colors"
                >
                  …
                </button>
                <span
                  aria-hidden="true"
                  className="sm:hidden text-stone-300 dark:text-indigo-200/30"
                >
                  ›
                </span>
              </Fragment>
            )}
            <span className={wrapperClass}>
              {clickable ? (
                <button
                  onClick={seg.onNavigate}
                  className="truncate max-w-[8rem] sm:max-w-[14rem] hover:text-stone-800 dark:hover:text-indigo-100 transition-colors"
                >
                  {seg.label}
                </button>
              ) : (
                <span
                  className={
                    "truncate max-w-[10rem] sm:max-w-[18rem] " +
                    (isLast ? "text-stone-800 dark:text-indigo-100 font-medium" : "")
                  }
                  aria-current={isLast ? "page" : undefined}
                >
                  {seg.label}
                </span>
              )}
              {!isLast && (
                <span aria-hidden="true" className="text-stone-300 dark:text-indigo-200/30">
                  ›
                </span>
              )}
            </span>
          </Fragment>
        );
      })}
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
    "h-7 w-7 rounded-full text-xs font-medium transition-colors " +
    (i === idx
      ? "bg-amber-500 text-white dark:bg-indigo-300 dark:text-slate-900"
      : i < idx
      ? "bg-amber-300 text-white hover:bg-amber-400 dark:bg-indigo-500/60 dark:text-indigo-50 dark:hover:bg-indigo-500/80"
      : "bg-stone-200 text-stone-600 hover:bg-stone-300 dark:bg-white/20 dark:text-indigo-100 dark:hover:bg-white/30");

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
            className="sm:hidden inline-flex items-center gap-1 min-h-[36px] px-3 py-1.5 rounded-lg text-xs font-medium
                       bg-stone-200 hover:bg-stone-300 text-stone-700
                       dark:bg-white/20 dark:hover:bg-white/30 dark:text-indigo-100"
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
              <div className="w-full max-w-md rounded-2xl bg-white dark:bg-slate-900 shadow-xl ring-1 ring-stone-200 dark:ring-white/10 p-4 mb-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-xs uppercase tracking-wider text-stone-500 dark:text-indigo-200/70">
                    Slide {idx + 1} / {total}
                  </div>
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    aria-label="Close"
                    className="w-11 h-11 rounded-full text-xl leading-none
                               text-stone-500 hover:bg-stone-200
                               dark:text-indigo-200/70 dark:hover:bg-slate-700"
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
                        "h-11 rounded-lg text-sm font-medium transition-colors " +
                        (i === idx
                          ? "bg-amber-500 text-white dark:bg-indigo-300 dark:text-slate-900"
                          : i < idx
                          ? "bg-amber-300 text-white dark:bg-indigo-500/60 dark:text-indigo-50"
                          : "bg-stone-200 text-stone-600 dark:bg-white/20 dark:text-indigo-100")
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

/** Convenience — breadcrumb + flex row of the title and inline controls. */
export function SlideTitleRow({
  breadcrumb,
  children,
}: {
  breadcrumb?: BreadcrumbSegment[];
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1">
      {breadcrumb && <Breadcrumb segments={breadcrumb} />}
      <div className="flex flex-col items-stretch gap-2 sm:flex-row sm:items-center sm:gap-3 sm:flex-wrap">
        {children}
      </div>
    </div>
  );
}
