import { useState } from "react";
import "./App.css";
import { COURSES } from "./lessons";
import { SlideDeck, Breadcrumb, type BreadcrumbSegment } from "./components/SlideDeck";
import { LessonTierMenu } from "./components/LessonTierMenu";
import { JsWorkshopSlideView } from "./components/JsWorkshopSlideView";
import { ExerciseSlideView } from "./components/ExerciseSlideView";
import { ThemeToggleInline, useTheme } from "./components/ThemeToggle";
import { ChapterCover } from "./components/ChapterCover";
import { AccentProvider } from "./components/AccentContext";
import type { Course, ExerciseSlide, JsWorkshopSlide, Lesson, Topic } from "./types";
import { hasAnyProgress, isComplete, resetProgress } from "./progress";
import { populatedTiers, type Tier } from "./tiers";
import { t } from "./i18n";
import { ui } from "./i18n/strings";
import { tokens } from "./styles/tokens";
import { accentFor, pickAccentHex, type TopicAccent } from "./topics";
import {
  findNextLesson,
  lessonNumber,
  lessonProgressTotal,
  lessonStatuses,
  nextLessonAfter,
  type LessonRef,
} from "./homeProgress";
import type { EndAction } from "./components/SlideDeck";

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
      /**
       * Optional starting slide index within the tier. Set when the tier menu
       * lists individual rows (e.g. one workshop or exercise per row) and the
       * student picks a specific row instead of the card as a whole.
       */
      startIdx?: number;
    }
  | { kind: "lesson"; course: Course; lesson: Lesson; topic?: Topic }
  | {
      kind: "walkthrough";
      course: Course;
      topic: Topic;
      /** Index into `topic.walkthroughs[]` so storage keys are stable. */
      idx: number;
      slide: JsWorkshopSlide;
      /** Step the student picked from the topic-view step grid. Defaults to 0. */
      startIdx?: number;
    }
  | {
      kind: "challenge";
      course: Course;
      topic: Topic;
      /** Index into `topic.challenges[]` so storage keys are stable. */
      idx: number;
      slide: ExerciseSlide;
    };

function pickLesson(course: Course, lesson: Lesson, topic?: Topic): View {
  // JS course uses the four-tier menu; everything else stays linear.
  return course.id === "javascript"
    ? { kind: "tier-menu", course, lesson, topic }
    : { kind: "lesson", course, lesson, topic };
}

/**
 * Formats the "Continue → next lesson" primary button label, e.g.
 * "Continue → 2. Types — what kind of value". Every lesson in the
 * curriculum already authors its number into the title ("2. ...",
 * "1. ..."), so we don't re-prepend the index — that doubled the prefix
 * in earlier iterations ("2. 2. Move & copy lines"). If a lesson title
 * ever ships without the leading number, prepend the computed one from
 * `lessonNumber` so the button still numbers itself.
 */
function continueToLessonLabel(ref: LessonRef): string {
  const title = ref.lesson.title;
  const alreadyNumbered = /^\d+\.\s/.test(title);
  if (alreadyNumbered) return `Continue → ${title}`;
  const n = lessonNumber(ref);
  return n !== null ? `Continue → ${n}. ${title}` : `Continue → ${title}`;
}

function App() {
  const [view, setView] = useState<View>({ kind: "home" });
  const [, setTick] = useState(0);

  if (view.kind === "lesson") {
    const lessonView = view;
    const breadcrumb: BreadcrumbSegment[] = [
      { label: t(ui.home), onNavigate: () => setView({ kind: "home" }) },
      ...(lessonView.topic
        ? [
            {
              label: t(lessonView.topic.title),
              onNavigate: () =>
                setView({
                  kind: "topic",
                  course: lessonView.course,
                  topic: lessonView.topic!,
                }),
            },
          ]
        : []),
      { label: t(lessonView.lesson.title) },
    ];
    // Linear-lesson end action: "Continue → next lesson" when one exists
    // (curriculum order). At the end of the very last lesson, fall back to
    // the legacy back-to-parent so the student isn't dead-ended.
    const lessonNextRef = nextLessonAfter(view.course.id, view.lesson.id);
    const lessonBackToParent = view.topic
      ? {
          label: `← Back to ${t(view.topic.title)}`,
          onClick: () => {
            setView({ kind: "topic", course: view.course, topic: view.topic! });
            setTick((tick) => tick + 1);
          },
        }
      : {
          label: `← Back to ${t(ui.home)}`,
          onClick: () => {
            setView({ kind: "home" });
            setTick((tick) => tick + 1);
          },
        };
    const lessonEndAction: EndAction = lessonNextRef
      ? {
          primary: {
            label: continueToLessonLabel(lessonNextRef),
            onClick: () => {
              setView(
                pickLesson(
                  lessonNextRef.course,
                  lessonNextRef.lesson,
                  lessonNextRef.topic,
                ),
              );
              setTick((tick) => tick + 1);
            },
          },
        }
      : { primary: lessonBackToParent };
    return (
      <AccentProvider accent={accentFor(view.topic?.id, view.course.id)}>
        <SlideDeck
          // Re-key on the lesson id so SlideDeck's internal `idx` counter
          // resets when the "Continue → next lesson" end action crosses a
          // lesson boundary. Otherwise idx carries over and may point at
          // a non-existent slide in the next lesson (crash).
          key={view.lesson.id}
          courseId={view.course.id}
          lesson={view.lesson}
          breadcrumb={breadcrumb}
          endAction={lessonEndAction}
          onExit={() => {
            if (view.topic) {
              setView({ kind: "topic", course: view.course, topic: view.topic });
            } else {
              setView({ kind: "home" });
            }
            setTick((tick) => tick + 1);
          }}
        />
      </AccentProvider>
    );
  }

  if (view.kind === "tier-deck") {
    const tierDeckView = view;
    const breadcrumb: BreadcrumbSegment[] = [
      { label: t(ui.home), onNavigate: () => setView({ kind: "home" }) },
      ...(tierDeckView.topic
        ? [
            {
              label: t(tierDeckView.topic.title),
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
        label: t(tierDeckView.lesson.title),
        // Back button on slide views uses the tighter word "menu" instead
        // of the full lesson title — keeps the button compact and reads
        // cleanly. Breadcrumb pill still shows the full lesson title.
        shortLabel: "menu",
        onNavigate: () =>
          setView({
            kind: "tier-menu",
            course: tierDeckView.course,
            lesson: tierDeckView.lesson,
            topic: tierDeckView.topic,
          }),
      },
      { label: t(TIER_LABEL[tierDeckView.tier]) },
    ];
    // End-of-tier action. Three contexts, three button layouts:
    //   - Mid-lesson (next tier exists): single "Continue → next tier"
    //   - Last tier WITH a next lesson: dual buttons —
    //       secondary "← Back to {topic / home}" + primary "Continue → next lesson"
    //   - Last tier AND last lesson in curriculum: single "← Back to {topic / home}"
    // The top-row "← Back to menu" breadcrumb button still covers the
    // "I want to re-pick a tier" escape on every tier.
    const populated = populatedTiers(view.lesson);
    const currentTierIdx = populated.indexOf(view.tier);
    const nextTier =
      currentTierIdx >= 0 && currentTierIdx < populated.length - 1
        ? populated[currentTierIdx + 1]
        : null;

    const backToParent = view.topic
      ? {
          label: `← Back to ${t(view.topic.title)}`,
          onClick: () => {
            setView({
              kind: "topic",
              course: view.course,
              topic: view.topic!,
            });
            setTick((tick) => tick + 1);
          },
        }
      : {
          label: `← Back to ${t(ui.home)}`,
          onClick: () => {
            setView({ kind: "home" });
            setTick((tick) => tick + 1);
          },
        };

    const nextLessonRef = nextLessonAfter(view.course.id, view.lesson.id);
    const continueToNextLesson = nextLessonRef
      ? {
          label: continueToLessonLabel(nextLessonRef),
          onClick: () => {
            setView(
              pickLesson(
                nextLessonRef.course,
                nextLessonRef.lesson,
                nextLessonRef.topic,
              ),
            );
            setTick((tick) => tick + 1);
          },
        }
      : null;

    const tierDeckEndAction: EndAction = nextTier
      ? {
          primary: {
            label: `Continue → ${t(TIER_LABEL[nextTier])}`,
            onClick: () => {
              setView({
                kind: "tier-deck",
                course: view.course,
                lesson: view.lesson,
                tier: nextTier,
                topic: view.topic,
                startIdx: 0,
              });
              setTick((tick) => tick + 1);
            },
          },
        }
      : continueToNextLesson
        ? {
            primary: continueToNextLesson,
            secondary: backToParent,
          }
        : { primary: backToParent };

    return (
      <AccentProvider accent={accentFor(view.topic?.id, view.course.id)}>
        <SlideDeck
          // Re-key on the tier so SlideDeck remounts with fresh state
          // (the internal `idx` counter especially) when the student
          // crosses a tier boundary via the "Continue → next tier" end
          // action. Without this, idx from the previous tier carries
          // over and points at a non-existent slide in the new tier,
          // crashing the renderer with "cannot read 'kind' of undefined".
          // Within the same tier, the key stays constant so navigation
          // between sub-slides preserves state as expected.
          key={`${view.lesson.id}:${view.tier}`}
          courseId={view.course.id}
          lesson={view.lesson}
          tier={view.tier}
          initialIdx={view.startIdx}
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
          endAction={tierDeckEndAction}
        />
      </AccentProvider>
    );
  }

  if (view.kind === "tier-menu") {
    const tierMenuView = view;
    const breadcrumb: BreadcrumbSegment[] = [
      { label: t(ui.home), onNavigate: () => setView({ kind: "home" }) },
      ...(tierMenuView.topic
        ? [
            {
              label: t(tierMenuView.topic.title),
              onNavigate: () =>
                setView({
                  kind: "topic",
                  course: tierMenuView.course,
                  topic: tierMenuView.topic!,
                }),
            },
          ]
        : []),
      { label: t(tierMenuView.lesson.title) },
    ];
    return (
      <AccentProvider accent={accentFor(view.topic?.id, view.course.id)}>
        <LessonTierMenu
          courseId={view.course.id}
          lesson={view.lesson}
          breadcrumb={breadcrumb}
          onPick={(tier, startIdx) =>
            setView({
              kind: "tier-deck",
              course: view.course,
              lesson: view.lesson,
              tier,
              topic: view.topic,
              startIdx,
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
      </AccentProvider>
    );
  }

  if (view.kind === "walkthrough") {
    const wView = view;
    const breadcrumb: BreadcrumbSegment[] = [
      { label: t(ui.home), onNavigate: () => setView({ kind: "home" }) },
      {
        label: t(wView.topic.title),
        onNavigate: () =>
          setView({
            kind: "topic",
            course: wView.course,
            topic: wView.topic,
          }),
      },
      { label: t(wView.slide.title) },
    ];
    return (
      <AccentProvider accent={accentFor(wView.topic.id, wView.course.id)}>
        <JsWorkshopSlideView
          slide={wView.slide}
          storageKey={`${wView.course.id}:${wView.topic.id}:walkthrough:${wView.idx}`}
          breadcrumb={breadcrumb}
          initialIdx={wView.startIdx}
          onExit={() => {
            setView({
              kind: "topic",
              course: wView.course,
              topic: wView.topic,
            });
            setTick((tick) => tick + 1);
          }}
        />
      </AccentProvider>
    );
  }

  if (view.kind === "challenge") {
    const cView = view;
    const breadcrumb: BreadcrumbSegment[] = [
      { label: t(ui.home), onNavigate: () => setView({ kind: "home" }) },
      {
        label: t(cView.topic.title),
        onNavigate: () =>
          setView({
            kind: "topic",
            course: cView.course,
            topic: cView.topic,
          }),
      },
      { label: t(cView.slide.title) },
    ];
    return (
      <AccentProvider accent={accentFor(cView.topic.id, cView.course.id)}>
        <ExerciseSlideView
          slide={cView.slide}
          storageKey={`${cView.course.id}:${cView.topic.id}:challenge:${cView.idx}`}
          breadcrumb={breadcrumb}
          onPass={() => setTick((tick) => tick + 1)}
        />
      </AccentProvider>
    );
  }

  if (view.kind === "topic") {
    const topicBreadcrumb: BreadcrumbSegment[] = [
      { label: t(ui.home), onNavigate: () => setView({ kind: "home" }) },
      { label: t(view.topic.title) },
    ];
    return (
      <TopicScreen
        course={view.course}
        topic={view.topic}
        breadcrumb={topicBreadcrumb}
        onPickLesson={(lesson) =>
          setView(pickLesson(view.course, lesson, view.topic))
        }
        onPickWalkthrough={(idx, slide, startIdx) =>
          setView({
            kind: "walkthrough",
            course: view.course,
            topic: view.topic,
            idx,
            slide,
            startIdx,
          })
        }
        onPickChallenge={(idx, slide) =>
          setView({
            kind: "challenge",
            course: view.course,
            topic: view.topic,
            idx,
            slide,
          })
        }
      />
    );
  }

  return (
    <HomeScreen
      onPickTopic={(course, topic) =>
        setView({ kind: "topic", course, topic })
      }
      onPickLesson={(course, lesson) =>
        setView(pickLesson(course, lesson))
      }
    />
  );
}

/* ------------------------------------------------------------------ */
/* Home — hero band + course list                                      */
/* ------------------------------------------------------------------ */

function HomeScreen({
  onPickTopic,
  onPickLesson,
}: {
  onPickTopic: (course: Course, topic: Topic) => void;
  onPickLesson: (course: Course, lesson: Lesson) => void;
}) {
  // Local tick — bumped by the "Reset progress" button so the derived
  // values (next, total, beads) recompute from a wiped localStorage on
  // the same render. Cheaper than a full `location.reload()` and keeps
  // any in-memory state the parent App holds intact.
  const [, setResetTick] = useState(0);
  const next = findNextLesson();
  const total = lessonProgressTotal();
  const allDone = total.total > 0 && total.done === total.total;

  const onReset = () => {
    if (!window.confirm(t(ui.heroResetConfirm))) return;
    resetProgress();
    setResetTick((n) => n + 1);
  };

  function navigateTo(ref: LessonRef) {
    if (ref.topic) onPickTopic(ref.course, ref.topic);
    else onPickLesson(ref.course, ref.lesson);
  }

  // Continue → next incomplete lesson; falls back to the very first when
  // everything is complete (so the CTA still does something).
  const onContinue = () => {
    const dest = next ?? lessonStatuses()[0];
    if (dest) navigateTo(dest);
  };

  // Start over — always the very first lesson, regardless of progress.
  const onStartOver = () => {
    const first = lessonStatuses()[0];
    if (first) navigateTo(first);
  };

  return (
    <div className="min-h-full">
      {/* Hero band */}
      <header
        className={`${tokens.page.surface} paper-texture px-4 sm:px-10 pt-10 pb-12`}
      >
        <div className="max-w-6xl mx-auto">
          <div className={`mb-3 ${tokens.text.eyebrow}`}>
            {t(ui.heroEyebrow)}
          </div>

          <div className="flex flex-col md:flex-row md:items-end gap-8">
            <div className="flex-1 max-w-xl">
              <div className="flex items-start justify-between gap-3 mb-4">
                <h1 className={`${tokens.text.h1} flex-1 min-w-0`}>
                  {t(ui.heroTitle)}
                </h1>
                <ThemeToggleInline />
              </div>
              <p className="text-base text-stone-700 dark:text-stone-300 max-w-md mb-6 leading-relaxed">
                {t(ui.heroSubtitle)}
              </p>
              <HeroCtas
                next={next}
                done={total.done}
                allDone={allDone}
                onContinue={onContinue}
                onStartOver={onStartOver}
              />
            </div>

            {total.total > 0 && (
              <ProgressBeads
                total={total.total}
                done={total.done}
                onReset={onReset}
              />
            )}
          </div>
        </div>
      </header>

      {/* Course sections */}
      <div className="px-4 sm:px-10 py-10">
        <div className="max-w-6xl mx-auto space-y-12">
          {COURSES.map((course) => {
            const courseAccent = accentFor(undefined, course.id);
            return (
              <section key={course.id}>
                <div className="flex items-baseline gap-3 mb-5">
                  <h2 className={tokens.text.h2}>{t(course.title)}</h2>
                  {course.summary && (
                    <span className="text-sm text-stone-500 dark:text-stone-400">
                      {t(course.summary)}
                    </span>
                  )}
                </div>

                {course.topics && course.topics.length > 0 ? (
                  <TopicGrid
                    courseId={course.id}
                    topics={course.topics}
                    onPick={(topic) => onPickTopic(course, topic)}
                  />
                ) : course.lessons && course.lessons.length > 0 ? (
                  <LessonGrid
                    course={course}
                    lessons={course.lessons}
                    accent={courseAccent}
                    onPick={(lesson) => onPickLesson(course, lesson)}
                  />
                ) : (
                  <NoLessonsBox />
                )}
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function HeroCtas({
  next,
  done,
  allDone,
  onContinue,
  onStartOver,
}: {
  next: LessonRef | null;
  /** Lessons completed so far. Drives the "Start" vs "Continue" label
   *  so a cold student isn't told to "Continue" something they haven't
   *  started. */
  done: number;
  allDone: boolean;
  onContinue: () => void;
  onStartOver: () => void;
}) {
  if (allDone) {
    return (
      <div className="flex flex-col gap-3">
        <div className="text-sm font-medium text-stone-700 dark:text-stone-300">
          {t(ui.heroAllDone)}
        </div>
        <button onClick={onStartOver} className={tokens.button.secondary}>
          {t(ui.heroStart)}
        </button>
      </div>
    );
  }

  // Prefix flips at progress=0 so the CTA reads honestly: nothing to
  // continue yet → "Start — <title>". Once any lesson is complete, the
  // button reverts to "Continue — <title>".
  const prefix = done === 0 ? t(ui.heroStartPrefix) : t(ui.heroContinuePrefix);
  const continueLabel = next
    ? `${prefix} — ${t(next.lesson.title)}`
    : prefix;

  // Hide the "Start over" CTA when no progress has been made — the
  // primary "Continue" already takes you to the first lesson.
  const showStartOver = !!next && next !== lessonStatuses()[0];

  return (
    <div className="flex flex-wrap items-center gap-3">
      <button onClick={onContinue} className={tokens.button.primary}>
        {continueLabel}
      </button>
      {showStartOver && (
        <button onClick={onStartOver} className={tokens.button.secondary}>
          {t(ui.heroStart)}
        </button>
      )}
    </div>
  );
}

function ProgressBeads({
  total,
  done,
  onReset,
}: {
  total: number;
  done: number;
  /** Wipe all completion state and re-render the home page. Hidden when
   *  there's nothing to reset (done === 0) to avoid offering a destructive
   *  action a fresh student has no reason for. */
  onReset?: () => void;
}) {
  const { theme } = useTheme();
  const dark = theme === "dark";
  const all = lessonStatuses();
  const filledColor = dark ? "#F0B274" : "#C97A1F";
  const emptyColor = dark ? "#2c303a" : "#e8e2d3";

  const suffix = t(ui.heroLessonsCompleteSuffix).replace(
    "{total}",
    String(total),
  );

  return (
    <div className="flex flex-col gap-3 md:w-[280px] md:pb-2">
      <div className={tokens.text.eyebrow}>{t(ui.heroProgressLabel)}</div>
      <div className="flex flex-wrap gap-1.5">
        {all.map((ref, i) => (
          <span
            key={i}
            aria-label={`${t(ref.lesson.title)}${ref.complete ? " — " + t(ui.doneBadge) : ""}`}
            className="w-3.5 h-3.5 rounded-sm"
            style={{ background: ref.complete ? filledColor : emptyColor }}
          />
        ))}
      </div>
      <div className="flex items-center justify-between gap-3">
        <div className="text-xs text-stone-600 dark:text-stone-400 tabular-nums">
          {done} {suffix}
        </div>
        {/* "Reset progress" — subtle text link, shown whenever ANY slide
            has been marked complete (not just whole lessons), so students
            who've poked at one tier and want a fresh slate can clear it.
            Click prompts a window.confirm to guard accidental wipes. */}
        {onReset && hasAnyProgress() && (
          <button
            type="button"
            onClick={onReset}
            className="text-xs text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-100 hover:underline transition-colors"
          >
            {t(ui.heroResetProgress)}
          </button>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Topic — header band + lessons grid + Walkthroughs/Challenges        */
/* ------------------------------------------------------------------ */

function TopicScreen({
  course,
  topic,
  breadcrumb,
  onPickLesson,
  onPickWalkthrough,
  onPickChallenge,
}: {
  course: Course;
  topic: Topic;
  breadcrumb: BreadcrumbSegment[];
  onPickLesson: (lesson: Lesson) => void;
  onPickWalkthrough: (
    idx: number,
    slide: JsWorkshopSlide,
    startIdx: number,
  ) => void;
  onPickChallenge: (idx: number, slide: ExerciseSlide) => void;
}) {
  const { theme } = useTheme();
  const dark = theme === "dark";
  const accent = accentFor(topic.id, course.id);
  const fg = pickAccentHex(accent.fgHex, theme);
  const bg = dark ? accent.bgHex.dark : accent.bgHex.light;
  const chapterIdx =
    course.topics?.findIndex((t) => t.id === topic.id) ?? -1;
  const chapterLabel =
    chapterIdx >= 0 ? `${t(ui.chapterPrefix)} ${String(chapterIdx + 1).padStart(2, "0")}` : null;

  return (
    <div className="min-h-full">
      {/* Topic header band */}
      <header
        className={`${tokens.page.surface} paper-texture px-4 sm:px-10 pt-6 pb-8`}
      >
        <div className="max-w-6xl mx-auto">
          <div className="mb-4">
            <Breadcrumb segments={breadcrumb} />
          </div>
          <div className="flex items-end gap-5 sm:gap-6">
            <div className="hidden sm:block w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
              <ChapterCover topicId={topic.id} accent={accent} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                {chapterLabel && (
                  <span
                    className="text-[10px] font-mono uppercase tracking-widest px-1.5 py-0.5 rounded"
                    style={{ background: bg, color: fg }}
                  >
                    {chapterLabel}
                  </span>
                )}
                <span className={tokens.text.eyebrow}>
                  {topicMetaLabel(topic)}
                </span>
              </div>
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className={tokens.text.h1}>{t(topic.title)}</h1>
                <ThemeToggleInline />
              </div>
              {topic.summary && (
                <p className="text-stone-600 dark:text-stone-400 text-base mt-1.5">
                  {t(topic.summary)}
                </p>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Body */}
      <div className="px-4 sm:px-10 py-10">
        <div className="max-w-6xl mx-auto space-y-10">
          {/* Lessons */}
          <section>
            <div className="flex items-baseline justify-between mb-4">
              <h2 className={tokens.text.h2}>{t(ui.lessonsHeading)}</h2>
              <span className={tokens.text.eyebrow}>
                {topic.lessons.length} {t(ui.lessonsCount).replace(" →", "")}
              </span>
            </div>
            <TopicLessonGrid
              course={course}
              lessons={topic.lessons}
              accent={accent}
              onPick={onPickLesson}
            />
          </section>

          {/* Walkthroughs + Challenges paired side-by-side at lg */}
          {(topic.walkthroughs?.length || topic.challenges?.length) ? (
            <div className="grid lg:grid-cols-2 gap-6">
              {topic.walkthroughs && topic.walkthroughs.length > 0 ? (
                <WalkthroughsSection
                  walkthroughs={topic.walkthroughs}
                  accent={accent}
                  onPick={onPickWalkthrough}
                />
              ) : (
                <div />
              )}
              {topic.challenges && topic.challenges.length > 0 ? (
                <ChallengesSection
                  challenges={topic.challenges}
                  onPick={onPickChallenge}
                />
              ) : (
                <div />
              )}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function topicMetaLabel(topic: Topic): string {
  // "4 lessons · 1 walkthrough · 1 challenge" — adapts to authored content.
  const parts: string[] = [];
  parts.push(`${topic.lessons.length} ${t(ui.lessonsCount).replace(" →", "")}`);
  if (topic.walkthroughs?.length)
    parts.push(
      topic.walkthroughs.length === 1
        ? t(ui.walkthroughBadge).toLowerCase()
        : `${topic.walkthroughs.length} ${t(ui.walkthroughsSection).toLowerCase()}`,
    );
  if (topic.challenges?.length)
    parts.push(
      topic.challenges.length === 1
        ? t(ui.challengeBadge).toLowerCase()
        : `${topic.challenges.length} ${t(ui.challengesSection).toLowerCase()}`,
    );
  return parts.join(" · ");
}

/**
 * Lesson grid for the topic view — wider cards with index numbers,
 * description, and a topic-coloured progress bar.
 */
function TopicLessonGrid({
  course,
  lessons,
  accent,
  onPick,
}: {
  course: Course;
  lessons: Lesson[];
  accent: TopicAccent;
  onPick: (l: Lesson) => void;
}) {
  if (lessons.length === 0) return <NoLessonsBox />;
  return (
    <div className="grid sm:grid-cols-2 gap-3">
      {lessons.map((lesson, i) => (
        <TopicLessonCard
          key={lesson.id}
          courseId={course.id}
          lesson={lesson}
          accent={accent}
          index={i + 1}
          onPick={() => onPick(lesson)}
        />
      ))}
    </div>
  );
}

function TopicLessonCard({
  courseId,
  lesson,
  accent,
  index,
  onPick,
}: {
  courseId: string;
  lesson: Lesson;
  accent: TopicAccent;
  index: number;
  onPick: () => void;
}) {
  const { theme } = useTheme();
  const fg = pickAccentHex(accent.fgHex, theme);
  const done = isComplete(courseId, lesson);
  const total = lesson.slides.length;

  return (
    <button
      onClick={onPick}
      className={`group ${tokens.card.surface} ${tokens.card.hover} text-left p-5`}
    >
      <div className="flex items-baseline gap-3 mb-1">
        <span
          className="font-mono text-xs font-medium tabular-nums"
          style={{ color: fg }}
        >
          {String(index).padStart(2, "0")}
        </span>
        <h3 className={`${tokens.text.h3} flex-1`}>{t(lesson.title)}</h3>
      </div>
      <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed mb-4">
        {t(lesson.summary)}
      </p>
      <div className="flex items-center gap-3">
        <div className="flex-1 h-1 rounded-full overflow-hidden bg-[#e8e2d3] dark:bg-[#2c303a]">
          <div
            className="h-full rounded-full transition-all"
            style={{
              width: done ? "100%" : "0%",
              background: fg,
            }}
          />
        </div>
        <span className="text-[11px] font-mono text-stone-500 dark:text-stone-400 tabular-nums">
          {done ? `${total}/${total}` : `0/${total}`}
        </span>
        <span className="text-xs font-medium text-stone-500 dark:text-stone-400 group-hover:translate-x-0.5 transition-transform">
          →
        </span>
      </div>
    </button>
  );
}

function TopicGrid({
  courseId,
  topics,
  onPick,
}: {
  courseId: string;
  topics: Topic[];
  onPick: (t: Topic) => void;
}) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {topics.map((topic) => (
        <TopicCard
          key={topic.id}
          courseId={courseId}
          topic={topic}
          onPick={() => onPick(topic)}
        />
      ))}
    </div>
  );
}

function TopicCard({
  courseId,
  topic,
  onPick,
}: {
  courseId: string;
  topic: Topic;
  onPick: () => void;
}) {
  const { theme } = useTheme();
  const dark = theme === "dark";
  const accent = accentFor(topic.id);
  const fg = pickAccentHex(accent.fgHex, theme);
  const total = topic.lessons.length;
  const lessonsLabel =
    total === 0
      ? t(ui.comingSoon)
      : total === 1
        ? t(ui.topicSingleLesson)
        : t(ui.topicLessonsCount).replace("{n}", String(total));
  const stepCount = topic.lessons.reduce((n, l) => n + l.slides.length, 0);
  // Soft topic-level progress: 12 ticks scaled to the share of complete
  // lessons. Doesn't claim per-step precision, just gives the eye a hint.
  const completedLessons = topic.lessons.filter((l) =>
    isComplete(courseId, l),
  ).length;
  const filled =
    total > 0
      ? Math.max(0, Math.min(12, Math.round((completedLessons / total) * 12)))
      : 0;

  return (
    <button
      onClick={onPick}
      className={`group ${tokens.card.surface} ${tokens.card.hover} text-left p-4 transition-colors`}
    >
      <div className="mb-3">
        <ChapterCover topicId={topic.id} accent={accent} />
      </div>
      <div className="flex items-center justify-between mb-1 gap-2">
        <span className={tokens.text.h3}>{t(topic.title)}</span>
        <span
          className="text-[10px] font-mono uppercase tracking-widest px-1.5 py-0.5 rounded shrink-0"
          style={{
            background: dark ? accent.bgHex.dark : accent.bgHex.light,
            color: fg,
          }}
        >
          {lessonsLabel}
        </span>
      </div>
      {topic.summary && (
        <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed mb-3">
          {t(topic.summary)}
        </p>
      )}
      <div className="flex items-center justify-between">
        <div className="flex gap-0.5">
          {Array.from({ length: 12 }).map((_, i) => (
            <span
              key={i}
              className="h-1 w-2 rounded-sm"
              style={{
                background:
                  i < filled ? fg : dark ? "#2c303a" : "#e8e2d3",
              }}
            />
          ))}
        </div>
        <span className="text-[11px] font-mono text-stone-500 dark:text-stone-400 group-hover:translate-x-0.5 transition-transform">
          {stepCount > 0
            ? `${stepCount} ${t(ui.stepsCount)}`
            : t(ui.comingSoon)}
        </span>
      </div>
    </button>
  );
}

function LessonGrid({
  course,
  lessons,
  accent,
  onPick,
}: {
  course: Course;
  topic?: Topic;
  lessons: Lesson[];
  /** Accent applied to the progress bar; falls back to course accent. */
  accent?: TopicAccent;
  onPick: (l: Lesson) => void;
}) {
  if (lessons.length === 0) {
    return <NoLessonsBox />;
  }
  const a = accent ?? accentFor(undefined, course.id);
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {lessons.map((lesson) => (
        <LessonCard
          key={lesson.id}
          course={course}
          lesson={lesson}
          accent={a}
          onPick={() => onPick(lesson)}
        />
      ))}
    </div>
  );
}

function LessonCard({
  course,
  lesson,
  accent,
  onPick,
}: {
  course: Course;
  lesson: Lesson;
  accent: TopicAccent;
  onPick: () => void;
}) {
  const { theme } = useTheme();
  const dark = theme === "dark";
  const fg = pickAccentHex(accent.fgHex, theme);
  const done = isComplete(course.id, lesson);
  const total = lesson.slides.length;

  return (
    <button
      onClick={onPick}
      className={`group ${tokens.card.surface} ${tokens.card.hover} text-left p-5 relative`}
    >
      <div className="flex items-start justify-between gap-3 mb-1">
        <h3 className={tokens.text.h3}>{t(lesson.title)}</h3>
        {done && (
          <span
            className="text-[10px] font-mono uppercase tracking-widest px-1.5 py-0.5 rounded shrink-0"
            style={{
              background: dark ? "#163029" : "#D6EFE6",
              color: dark ? "#5FCAA8" : "#1F8A6E",
            }}
          >
            {t(ui.doneBadge)}
          </span>
        )}
      </div>
      <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed mb-4">
        {t(lesson.summary)}
      </p>
      <div className="flex items-center justify-between">
        <div className="text-[11px] font-mono text-stone-500 dark:text-stone-400">
          {total} {t(ui.stepsCount)}
        </div>
        <span
          className="text-xs ml-3 font-medium text-stone-500 dark:text-stone-400 group-hover:translate-x-0.5 transition-transform"
          style={{ color: done ? fg : undefined }}
        >
          →
        </span>
      </div>
    </button>
  );
}

function NoLessonsBox({}) {
  return (
    <div
      className="text-sm italic px-4 py-3 rounded-xl
                 bg-stone-100 text-stone-500
                 dark:bg-[#222630] dark:text-stone-400"
    >
      {t(ui.noLessons)}
    </div>
  );
}

/**
 * Walkthroughs section on the topic view. Each walkthrough renders as a
 * card with a milestone-style step grid — picking any cell jumps the
 * student into the walkthrough at that step. Replaces the dashed-utility
 * grid with a 5-column cell grid (done / current / upcoming have visual
 * identity) so the section reads as a map of the walkthrough rather than
 * a row of empty boxes.
 */
function WalkthroughsSection({
  walkthroughs,
  accent,
  onPick,
}: {
  walkthroughs: JsWorkshopSlide[];
  accent: TopicAccent;
  onPick: (idx: number, slide: JsWorkshopSlide, startIdx: number) => void;
}) {
  const { theme } = useTheme();
  const dark = theme === "dark";
  const fg = pickAccentHex(accent.fgHex, theme);
  const bg = dark ? accent.bgHex.dark : accent.bgHex.light;
  return (
    <section>
      <div className="flex items-baseline justify-between mb-3 flex-wrap gap-2">
        <div className="flex items-baseline gap-2">
          <h2 className={tokens.text.h2}>{t(ui.walkthroughsSection)}</h2>
          <span
            className="text-[10px] font-mono uppercase tracking-widest px-1.5 py-0.5 rounded"
            style={{ background: bg, color: fg }}
          >
            {t(ui.walkthroughsBadgeGuided)}
          </span>
        </div>
      </div>
      <p className="text-xs text-stone-500 dark:text-stone-400 mb-3">
        {t(ui.walkthroughsTagline)}
      </p>
      <div className="space-y-3">
        {walkthroughs.map((wt, idx) => (
          <div
            key={idx}
            className={`${tokens.card.surface} p-4`}
          >
            <div className="flex items-baseline justify-between mb-3 gap-3 flex-wrap">
              <button
                onClick={() => onPick(idx, wt, 0)}
                className={`${tokens.text.h3} text-left hover:opacity-80 transition-opacity`}
              >
                {t(wt.title)}
              </button>
              <span className="text-[10px] font-mono text-stone-500 dark:text-stone-400">
                {wt.steps.length} {t(ui.stepsLabel)}
              </span>
            </div>
            <WalkthroughStepGrid
              total={wt.steps.length}
              accent={accent}
              onJump={(stepIdx) => onPick(idx, wt, stepIdx)}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

/**
 * Challenges section on the topic view. Single-shot exercises — no step
 * grid, just a card per challenge with a tag and test count. The 12-segment
 * gutter stays empty since challenges are pass/fail (no per-step progress).
 */
function ChallengesSection({
  challenges,
  onPick,
}: {
  challenges: ExerciseSlide[];
  onPick: (idx: number, slide: ExerciseSlide) => void;
}) {
  const { theme } = useTheme();
  const dark = theme === "dark";
  // Challenges borrow the rose ("functions") accent for their tag — semantic
  // signal for "open-ended", paired with the amber/topic Walkthrough tag.
  const tagBg = dark ? "#39202a" : "#F4DCE2";
  const tagFg = dark ? "#EE8AA1" : "#C24A6B";
  return (
    <section>
      <div className="flex items-baseline justify-between mb-3 flex-wrap gap-2">
        <div className="flex items-baseline gap-2">
          <h2 className={tokens.text.h2}>{t(ui.challengesSection)}</h2>
          <span
            className="text-[10px] font-mono uppercase tracking-widest px-1.5 py-0.5 rounded"
            style={{ background: tagBg, color: tagFg }}
          >
            {t(ui.challengesBadgeOpen)}
          </span>
        </div>
      </div>
      <p className="text-xs text-stone-500 dark:text-stone-400 mb-3">
        {t(ui.challengesTagline)}
      </p>
      <div className="space-y-3">
        {challenges.map((ch, idx) => {
          const testsLabel = ch.tests.length === 1
            ? `1 ${t(ui.singleTest)}`
            : `${ch.tests.length} ${t(ui.testsCount)}`;
          return (
            <button
              key={idx}
              onClick={() => onPick(idx, ch)}
              className={`group ${tokens.card.surface} ${tokens.card.hover} w-full text-left p-4`}
            >
              <div className="flex items-baseline justify-between mb-2 gap-3 flex-wrap">
                <h3 className={tokens.text.h3}>{t(ch.title)}</h3>
                <span className="text-[10px] font-mono text-stone-500 dark:text-stone-400">
                  {testsLabel}
                </span>
              </div>
              <div
                className="grid gap-1"
                style={{
                  gridTemplateColumns: `repeat(${ch.tests.length}, minmax(0, 1fr))`,
                }}
              >
                {Array.from({ length: ch.tests.length }).map((_, i) => (
                  <span
                    key={i}
                    className="h-2 rounded-sm bg-[#e8e2d3] dark:bg-[#2c303a]"
                  />
                ))}
              </div>
              <div className="text-[11px] font-mono text-stone-500 dark:text-stone-400 mt-3 tabular-nums">
                0 / {ch.tests.length} {t(ui.exercisePassedCount)}
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}

/**
 * Walkthrough step grid — the 5-column milestone map. Each cell is a button
 * that jumps the student into the walkthrough at that step. `current` (when
 * provided) draws an outlined accent ring; cells before it show as "done"
 * (filled accent), cells after as "upcoming" (neutral border). When no
 * `current` is passed all cells render as neutral upcoming, which is the
 * topic-view default (no in-flight state to show).
 *
 * Used in two places:
 * - Topic view: as part of `WalkthroughsSection`.
 * - Mid-walkthrough chrome: drives `WindowedStepCounter` once we wire it up
 *   in Slice 5 — same visual language top-to-bottom.
 */
export function WalkthroughStepGrid({
  total,
  current,
  accent,
  onJump,
}: {
  total: number;
  /** 0-based current step index. Cells before are "done"; the cell at this
   * index is "current". When omitted, all cells show as upcoming. */
  current?: number;
  accent: TopicAccent;
  onJump: (stepIdx: number) => void;
}) {
  const { theme } = useTheme();
  const dark = theme === "dark";
  const fg = pickAccentHex(accent.fgHex, theme);

  return (
    <div>
      <div className="grid grid-cols-5 sm:grid-cols-10 gap-1.5">
        {Array.from({ length: total }).map((_, i) => {
          const isCurrent = current === i;
          const isDone = current !== undefined && i < current;
          const cellStyle: React.CSSProperties = isDone
            ? { background: fg, color: dark ? "#1c1a16" : "#fdfaf3", borderColor: "transparent" }
            : isCurrent
              ? { background: "transparent", color: fg, borderColor: fg, borderWidth: 2 }
              : {
                  background: "transparent",
                  color: dark ? "#9ba0ab" : "#6b6557",
                  borderColor: dark
                    ? "rgba(255,255,255,0.10)"
                    : "rgba(0,0,0,0.12)",
                };
          return (
            <button
              key={i}
              onClick={() => onJump(i)}
              aria-label={`Go to step ${i + 1}`}
              aria-current={isCurrent ? "step" : undefined}
              className={tokens.step.cell + " border bg-transparent"}
              style={cellStyle}
            >
              {i + 1}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default App;
