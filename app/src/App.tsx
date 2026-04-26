import { useState } from "react";
import "./App.css";
import { COURSES } from "./lessons";
import { SlideDeck } from "./components/SlideDeck";
import { ThemeToggle } from "./components/ThemeToggle";
import { LanguageToggle } from "./components/LanguageToggle";
import type { Course, Lesson } from "./types";
import { isComplete } from "./progress";
import { useLang } from "./i18n/LanguageContext";
import { t } from "./i18n";
import { ui } from "./i18n/strings";

type Active = { course: Course; lesson: Lesson };

function App() {
  const [active, setActive] = useState<Active | null>(null);
  const [, setTick] = useState(0);
  const { lang } = useLang();

  if (active) {
    return (
      <>
        <ThemeToggle />
        <LanguageToggle />
        <SlideDeck
          courseId={active.course.id}
          lesson={active.lesson}
          onExit={() => {
            setActive(null);
            setTick((tick) => tick + 1);
          }}
        />
      </>
    );
  }

  return (
    <>
      <ThemeToggle />
      <LanguageToggle />
      <div className="min-h-full p-10">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-semibold mb-1 text-stone-900 dark:text-indigo-50">
            {t(ui.appTitle, lang)}
          </h1>
          <p className="text-stone-500 dark:text-indigo-200/70 mb-10">
            {t(ui.pickerSubtitle, lang)}
          </p>

          <div className="space-y-10">
            {COURSES.map((course) => (
              <section key={course.id}>
                <div className="flex items-baseline gap-3 mb-3">
                  <h2 className="text-2xl font-semibold text-stone-900 dark:text-indigo-50">
                    {t(course.title, lang)}
                  </h2>
                  {course.summary && (
                    <span className="text-sm text-stone-500 dark:text-indigo-200/60">
                      {t(course.summary, lang)}
                    </span>
                  )}
                </div>

                {course.lessons.length === 0 ? (
                  <div
                    className="text-sm italic px-4 py-3 rounded-xl
                               bg-stone-100 text-stone-500
                               dark:bg-slate-900/40 dark:text-indigo-200/50"
                  >
                    {t(ui.noLessons, lang)}
                  </div>
                ) : (
                  <div className="grid sm:grid-cols-2 gap-4">
                    {course.lessons.map((lesson) => {
                      const done = isComplete(course.id, lesson.id);
                      return (
                        <button
                          key={lesson.id}
                          onClick={() => setActive({ course, lesson })}
                          className="text-left rounded-2xl p-5 transition-all relative
                                     bg-white ring-1 ring-stone-200 hover:ring-amber-400 shadow-sm hover:shadow
                                     dark:bg-slate-900/60 dark:ring-white/10 dark:hover:ring-indigo-400/50 dark:shadow-none"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="text-lg font-semibold text-stone-900 dark:text-indigo-50">
                              {t(lesson.title, lang)}
                            </div>
                            {done && (
                              <span
                                className="text-xs px-2 py-0.5 rounded-full shrink-0
                                           bg-emerald-100 text-emerald-700
                                           dark:bg-emerald-500/15 dark:text-emerald-300"
                              >
                                {t(ui.doneBadge, lang)}
                              </span>
                            )}
                          </div>
                          <div className="text-sm text-stone-600 dark:text-indigo-200/70 mt-1">
                            {t(lesson.summary, lang)}
                          </div>
                          <div className="text-xs text-amber-600 dark:text-indigo-300/60 mt-3">
                            {lesson.slides.length} {t(ui.stepsCount, lang)}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </section>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
