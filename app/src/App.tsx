import { useState } from "react";
import "./App.css";
import { COURSES } from "./lessons";
import { SlideDeck, Breadcrumb, type BreadcrumbSegment } from "./components/SlideDeck";
import { LessonTierMenu } from "./components/LessonTierMenu";
import { ThemeToggle } from "./components/ThemeToggle";
import { LanguageToggle } from "./components/LanguageToggle";
import { RoomScene } from "./components/RoomScene";
import type { Course, Lesson, Topic } from "./types";
import { isComplete } from "./progress";
import type { Tier } from "./tiers";
import { useLang } from "./i18n/LanguageContext";
import { t } from "./i18n";
import { ui } from "./i18n/strings";

const TIER_LABEL: Record<Tier, typeof ui.tierExplanation> = {
  explanation: ui.tierExplanation,
  chips: ui.tierChips,
  workshop: ui.tierWorkshop,
  exercise: ui.tierExercise,
};

type View =
  | { kind: "home" }
  | { kind: "topic"; course: Course; topic: Topic }
  | { kind: "tier-menu"; course: Course; lesson: Lesson; topic?: Topic }
  | {
      kind: "tier-deck";
      course: Course;
      lesson: Lesson;
      tier: Tier;
      topic?: Topic;
    }
  | { kind: "lesson"; course: Course; lesson: Lesson; topic?: Topic };

function pickLesson(course: Course, lesson: Lesson, topic?: Topic): View {
  // JS course uses the four-tier menu; everything else stays linear.
  return course.id === "javascript"
    ? { kind: "tier-menu", course, lesson, topic }
    : { kind: "lesson", course, lesson, topic };
}

function App() {
  const [view, setView] = useState<View>({ kind: "home" });
  const [, setTick] = useState(0);
  const { lang } = useLang();

  if (view.kind === "lesson") {
    const lessonView = view;
    const breadcrumb: BreadcrumbSegment[] = [
      { label: t(ui.home, lang), onNavigate: () => setView({ kind: "home" }) },
      ...(lessonView.topic
        ? [
            {
              label: t(lessonView.topic.title, lang),
              onNavigate: () =>
                setView({
                  kind: "topic",
                  course: lessonView.course,
                  topic: lessonView.topic!,
                }),
            },
          ]
        : []),
      { label: t(lessonView.lesson.title, lang) },
    ];
    return (
      <>
        <LanguageToggle />
        <SlideDeck
          courseId={view.course.id}
          lesson={view.lesson}
          breadcrumb={breadcrumb}
          onExit={() => {
            if (view.topic) {
              setView({ kind: "topic", course: view.course, topic: view.topic });
            } else {
              setView({ kind: "home" });
            }
            setTick((tick) => tick + 1);
          }}
        />
      </>
    );
  }

  if (view.kind === "tier-deck") {
    const tierDeckView = view;
    const breadcrumb: BreadcrumbSegment[] = [
      { label: t(ui.home, lang), onNavigate: () => setView({ kind: "home" }) },
      ...(tierDeckView.topic
        ? [
            {
              label: t(tierDeckView.topic.title, lang),
              onNavigate: () =>
                setView({
                  kind: "topic",
                  course: tierDeckView.course,
                  topic: tierDeckView.topic!,
                }),
            },
          ]
        : []),
      {
        label: t(tierDeckView.lesson.title, lang),
        onNavigate: () =>
          setView({
            kind: "tier-menu",
            course: tierDeckView.course,
            lesson: tierDeckView.lesson,
            topic: tierDeckView.topic,
          }),
      },
      { label: t(TIER_LABEL[tierDeckView.tier], lang) },
    ];
    return (
      <>
        <LanguageToggle />
        <SlideDeck
          courseId={view.course.id}
          lesson={view.lesson}
          tier={view.tier}
          breadcrumb={breadcrumb}
          onExit={() => {
            setView({
              kind: "tier-menu",
              course: view.course,
              lesson: view.lesson,
              topic: view.topic,
            });
            setTick((tick) => tick + 1);
          }}
        />
      </>
    );
  }

  if (view.kind === "tier-menu") {
    const tierMenuView = view;
    const breadcrumb: BreadcrumbSegment[] = [
      { label: t(ui.home, lang), onNavigate: () => setView({ kind: "home" }) },
      ...(tierMenuView.topic
        ? [
            {
              label: t(tierMenuView.topic.title, lang),
              onNavigate: () =>
                setView({
                  kind: "topic",
                  course: tierMenuView.course,
                  topic: tierMenuView.topic!,
                }),
            },
          ]
        : []),
      { label: t(tierMenuView.lesson.title, lang) },
    ];
    return (
      <>
        <ThemeToggle />
        <LanguageToggle />
        <LessonTierMenu
          courseId={view.course.id}
          lesson={view.lesson}
          breadcrumb={breadcrumb}
          onPick={(tier) =>
            setView({
              kind: "tier-deck",
              course: view.course,
              lesson: view.lesson,
              tier,
              topic: view.topic,
            })
          }
          onBack={() => {
            if (view.topic) {
              setView({ kind: "topic", course: view.course, topic: view.topic });
            } else {
              setView({ kind: "home" });
            }
            setTick((tick) => tick + 1);
          }}
        />
      </>
    );
  }

  if (view.kind === "topic") {
    const topicBreadcrumb: BreadcrumbSegment[] = [
      { label: t(ui.home, lang), onNavigate: () => setView({ kind: "home" }) },
      { label: t(view.topic.title, lang) },
    ];
    return (
      <>
        <ThemeToggle />
        <LanguageToggle />
        <div className="min-h-full p-4 sm:p-10">
          <div className="max-w-4xl mx-auto">
            <div className="mb-4">
              <Breadcrumb segments={topicBreadcrumb} />
            </div>
            <h1 className="text-2xl sm:text-4xl font-semibold text-stone-900 dark:text-indigo-50">
              {t(view.topic.title, lang)}
            </h1>
            {view.topic.summary && (
              <p className="text-stone-500 dark:text-indigo-200/70 mt-1 mb-10">
                {t(view.topic.summary, lang)}
              </p>
            )}

            <LessonGrid
              course={view.course}
              topic={view.topic}
              lessons={view.topic.lessons}
              onPick={(lesson) =>
                setView(pickLesson(view.course, lesson, view.topic))
              }
              lang={lang}
            />
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <ThemeToggle />
      <LanguageToggle />
      <div className="min-h-full p-4 sm:p-10">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <RoomScene />
          </div>
          <h1 className="text-2xl sm:text-4xl font-semibold mb-1 text-stone-900 dark:text-indigo-50">
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

                {course.topics ? (
                  <TopicGrid
                    topics={course.topics}
                    onPick={(topic) =>
                      setView({ kind: "topic", course, topic })
                    }
                    lang={lang}
                  />
                ) : course.lessons && course.lessons.length > 0 ? (
                  <LessonGrid
                    course={course}
                    lessons={course.lessons}
                    onPick={(lesson) => setView(pickLesson(course, lesson))}
                    lang={lang}
                  />
                ) : (
                  <NoLessonsBox lang={lang} />
                )}
              </section>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

function TopicGrid({
  topics,
  onPick,
  lang,
}: {
  topics: Topic[];
  onPick: (t: Topic) => void;
  lang: import("./i18n").Lang;
}) {
  return (
    <div className="grid sm:grid-cols-2 gap-4">
      {topics.map((topic) => {
        const total = topic.lessons.length;
        return (
          <button
            key={topic.id}
            onClick={() => onPick(topic)}
            className="text-left rounded-2xl p-5 transition-all
                       bg-white ring-1 ring-stone-200 hover:ring-amber-400 shadow-sm hover:shadow
                       dark:bg-slate-900/60 dark:ring-white/10 dark:hover:ring-indigo-400/50 dark:shadow-none"
          >
            <div className="text-lg font-semibold text-stone-900 dark:text-indigo-50">
              {t(topic.title, lang)}
            </div>
            {topic.summary && (
              <div className="text-sm text-stone-600 dark:text-indigo-200/70 mt-1">
                {t(topic.summary, lang)}
              </div>
            )}
            <div className="text-xs text-amber-600 dark:text-indigo-300/60 mt-3">
              {total === 0
                ? t({ en: "Coming soon", sv: "Snart" }, lang)
                : `${total} ${t({ en: "lessons →", sv: "lektioner →" }, lang)}`}
            </div>
          </button>
        );
      })}
    </div>
  );
}

function LessonGrid({
  course,
  lessons,
  onPick,
  lang,
}: {
  course: Course;
  topic?: Topic;
  lessons: Lesson[];
  onPick: (l: Lesson) => void;
  lang: import("./i18n").Lang;
}) {
  if (lessons.length === 0) {
    return <NoLessonsBox lang={lang} />;
  }
  return (
    <div className="grid sm:grid-cols-2 gap-4">
      {lessons.map((lesson) => {
        const done = isComplete(course.id, lesson);
        return (
          <button
            key={lesson.id}
            onClick={() => onPick(lesson)}
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
  );
}

function NoLessonsBox({ lang }: { lang: import("./i18n").Lang }) {
  return (
    <div
      className="text-sm italic px-4 py-3 rounded-xl
                 bg-stone-100 text-stone-500
                 dark:bg-slate-900/40 dark:text-indigo-200/50"
    >
      {t(ui.noLessons, lang)}
    </div>
  );
}

export default App;
