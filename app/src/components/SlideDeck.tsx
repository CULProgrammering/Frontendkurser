import { useCallback, useEffect, useMemo, useState } from "react";
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
import { SlideFontSizeControl } from "./SlideFontSize";

type Props = {
  courseId: string;
  lesson: Lesson;
  /** When provided, the deck shows only that tier's slides. */
  tier?: Tier;
  onExit: () => void;
};

export function SlideDeck({ courseId, lesson, tier, onExit }: Props) {
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

  // Empty tier — show a placeholder with just a back button.
  if (total === 0) {
    return (
      <div className="h-full flex flex-col bg-[#faf7f2] dark:bg-slate-950">
        <header className="flex items-center gap-3 px-4 sm:px-6 py-3 border-b border-stone-200 dark:border-white/10">
          <button
            onClick={onExit}
            className="shrink-0 text-sm text-stone-500 hover:text-stone-800 dark:text-indigo-200/70 dark:hover:text-indigo-100"
          >
            {t(ui.backToTiers, lang)}
          </button>
          <div className="min-w-0 truncate text-sm text-stone-500 dark:text-indigo-200/60">
            {t(lesson.title, lang)}
          </div>
        </header>
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

  return (
    <div className="h-full flex flex-col bg-[#faf7f2] dark:bg-slate-950">
      <header className="flex items-center gap-3 px-4 sm:px-6 py-3 border-b border-stone-200 dark:border-white/10">
        <button
          onClick={onExit}
          className="shrink-0 text-sm text-stone-500 hover:text-stone-800 dark:text-indigo-200/70 dark:hover:text-indigo-100"
        >
          {t(tier ? ui.backToTiers : ui.backToLessons, lang)}
        </button>
        <div className="min-w-0 truncate text-sm text-stone-500 dark:text-indigo-200/60">
          {t(lesson.title, lang)}
        </div>
      </header>

      {/* Numbered jump buttons — sit above the slide content, right-aligned.
          On two-pane slide layouts they line up over the right pane. */}
      <div
        className="flex flex-wrap items-center justify-end gap-1.5 px-4 sm:px-10 pt-3"
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

      <div className="flex-1 min-h-0">
        {slide.kind === "explanation" && (
          <ExplanationSlideView slide={slide} key={`e-${idx}`} />
        )}
        {slide.kind === "assignment" && (
          <AssignmentSlideView
            slide={slide}
            storageKey={`${courseId}:${lesson.id}:${idx}`}
            key={`a-${idx}`}
            onPass={passHandler}
          />
        )}
        {slide.kind === "js-assignment" && (
          <JsAssignmentSlideView
            slide={slide}
            storageKey={`${courseId}:${lesson.id}:${idx}`}
            key={`j-${idx}`}
            onPass={passHandler}
          />
        )}
        {slide.kind === "js-chip-assignment" && (
          <JsChipAssignmentSlideView
            slide={slide}
            storageKey={`${courseId}:${lesson.id}:${idx}`}
            key={`c-${idx}`}
            onPass={passHandler}
          />
        )}
        {slide.kind === "js-typed-assignment" && (
          <JsTypedAssignmentSlideView
            slide={slide}
            storageKey={`${courseId}:${lesson.id}:${idx}`}
            key={`t-${idx}`}
            onPass={passHandler}
          />
        )}
        {slide.kind === "js-workshop" && (
          <JsWorkshopSlideView
            slide={slide}
            storageKey={`${courseId}:${lesson.id}:${idx}`}
            key={`w-${idx}`}
            onPass={passHandler}
          />
        )}
        {slide.kind === "exercise" && (
          <ExerciseSlideView
            slide={slide}
            storageKey={`${courseId}:${lesson.id}:${idx}`}
            key={`x-${idx}`}
            onPass={passHandler}
          />
        )}
      </div>

      <div className="flex justify-center px-6 pb-2">
        <SlideFontSizeControl />
      </div>

      <footer className="flex items-center justify-between px-6 py-3 border-t border-stone-200 dark:border-white/10">
        <button
          onClick={prev}
          disabled={idx === 0}
          className="px-3 py-1.5 rounded-lg text-sm disabled:opacity-30
                     bg-stone-100 hover:bg-stone-200 text-stone-700
                     dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-indigo-100"
        >
          {t(ui.prev, lang)}
        </button>
        <div className="text-xs text-stone-500 dark:text-indigo-200/50">
          {idx + 1} / {total}<span className="hidden sm:inline"> · {t(ui.escapeHint, lang)}</span>
        </div>
        <button
          onClick={next}
          disabled={idx === total - 1}
          className="px-3 py-1.5 rounded-lg text-sm text-white disabled:opacity-30
                     bg-amber-500 hover:bg-amber-600
                     dark:bg-indigo-500 dark:hover:bg-indigo-400"
        >
          {t(ui.next, lang)}
        </button>
      </footer>
    </div>
  );
}
