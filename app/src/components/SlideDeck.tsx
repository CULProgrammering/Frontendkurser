import { useCallback, useEffect, useMemo, useState, Fragment } from "react";
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
      <div
        className="flex flex-wrap items-center justify-end gap-1.5"
        aria-label="Slide progress"
      >
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIdx(i)}
            aria-label={`Go to slide ${i + 1}`}
            aria-current={i === idx ? "step" : undefined}
            className={
              "h-7 w-7 rounded-full text-xs font-medium transition-colors " +
              (i === idx
                ? "bg-amber-500 text-white dark:bg-indigo-300 dark:text-slate-900"
                : i < idx
                ? "bg-amber-300 text-white hover:bg-amber-400 dark:bg-indigo-500/60 dark:text-indigo-50 dark:hover:bg-indigo-500/80"
                : "bg-stone-200 text-stone-600 hover:bg-stone-300 dark:bg-white/20 dark:text-indigo-100 dark:hover:bg-white/30")
            }
          >
            {i + 1}
          </button>
        ))}
      </div>
    ) : null;

  return (
    <div className="h-full flex flex-col bg-[#faf7f2] dark:bg-slate-950">
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

export function Breadcrumb({ segments }: { segments: BreadcrumbSegment[] }) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="flex items-center gap-2 text-sm text-stone-500 dark:text-indigo-200/60"
    >
      {segments.map((seg, i) => {
        const isLast = i === segments.length - 1;
        const clickable = !!seg.onNavigate && !isLast;
        return (
          <Fragment key={i}>
            {clickable ? (
              <button
                onClick={seg.onNavigate}
                className="truncate max-w-[14rem] hover:text-stone-800 dark:hover:text-indigo-100 transition-colors"
              >
                {seg.label}
              </button>
            ) : (
              <span
                className={
                  "truncate max-w-[18rem] " +
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
          </Fragment>
        );
      })}
    </nav>
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
      <div className="flex items-center gap-3 flex-wrap">{children}</div>
    </div>
  );
}
