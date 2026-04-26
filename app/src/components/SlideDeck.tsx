import { useCallback, useEffect, useState } from "react";
import type { Lesson } from "../types";
import { ExplanationSlideView } from "./ExplanationSlideView";
import { AssignmentSlideView } from "./AssignmentSlideView";
import { markComplete } from "../progress";

type Props = { courseId: string; lesson: Lesson; onExit: () => void };

export function SlideDeck({ courseId, lesson, onExit }: Props) {
  const [idx, setIdx] = useState(0);
  const total = lesson.slides.length;

  const next = useCallback(
    () => setIdx((i) => Math.min(i + 1, total - 1)),
    [total]
  );
  const prev = useCallback(() => setIdx((i) => Math.max(i - 1, 0)), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      const typing =
        !!t &&
        (t.tagName === "INPUT" ||
          t.tagName === "TEXTAREA" ||
          t.isContentEditable);
      if (typing) return;
      if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === "Escape") onExit();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev, onExit]);

  const slide = lesson.slides[idx];

  return (
    <div className="h-full flex flex-col bg-[#faf7f2] dark:bg-slate-950">
      <header className="flex items-center gap-3 px-6 py-3 border-b border-stone-200 dark:border-white/10">
        <button
          onClick={onExit}
          className="text-sm text-stone-500 hover:text-stone-800 dark:text-indigo-200/70 dark:hover:text-indigo-100"
        >
          ← Lektioner
        </button>
        <div className="text-sm text-stone-500 dark:text-indigo-200/60">
          {lesson.title}
        </div>
        <div className="ml-auto flex items-center gap-1">
          {lesson.slides.map((_, i) => (
            <div
              key={i}
              className={
                "h-2 w-2 rounded-full transition-colors " +
                (i === idx
                  ? "bg-amber-500 dark:bg-indigo-300"
                  : i < idx
                  ? "bg-amber-300 dark:bg-indigo-500/60"
                  : "bg-stone-200 dark:bg-white/15")
              }
            />
          ))}
        </div>
      </header>

      <div className="flex-1 min-h-0">
        {slide.kind === "explanation" && (
          <ExplanationSlideView slide={slide} key={`e-${idx}`} />
        )}
        {slide.kind === "assignment" && (
          <AssignmentSlideView
            slide={slide}
            storageKey={`${courseId}:${lesson.id}:${idx}`}
            key={`a-${idx}`}
            onPass={
              idx === total - 1
                ? () => markComplete(courseId, lesson.id)
                : undefined
            }
          />
        )}
      </div>

      <footer className="flex items-center justify-between px-6 py-3 border-t border-stone-200 dark:border-white/10">
        <button
          onClick={prev}
          disabled={idx === 0}
          className="px-3 py-1.5 rounded-lg text-sm disabled:opacity-30
                     bg-stone-100 hover:bg-stone-200 text-stone-700
                     dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-indigo-100"
        >
          ◀ Förra
        </button>
        <div className="text-xs text-stone-500 dark:text-indigo-200/50">
          {idx + 1} / {total} · Esc för att gå tillbaka
        </div>
        <button
          onClick={next}
          disabled={idx === total - 1}
          className="px-3 py-1.5 rounded-lg text-sm text-white disabled:opacity-30
                     bg-amber-500 hover:bg-amber-600
                     dark:bg-indigo-500 dark:hover:bg-indigo-400"
        >
          Nästa ▶
        </button>
      </footer>
    </div>
  );
}
