import type { Lesson } from "../types";
import { TIER_ORDER, slidesForTier, type Tier } from "../tiers";
import { isTierComplete } from "../progress";
import { useLang } from "../i18n/LanguageContext";
import { t } from "../i18n";
import { ui } from "../i18n/strings";
import { Breadcrumb, type BreadcrumbSegment } from "./SlideDeck";

type Props = {
  courseId: string;
  lesson: Lesson;
  breadcrumb?: BreadcrumbSegment[];
  onPick: (tier: Tier) => void;
  onBack: () => void;
};

const TIER_TITLE = {
  explanation: ui.tierExplanation,
  chips: ui.tierChips,
  workshop: ui.tierWorkshop,
  exercise: ui.tierExercise,
} as const;

const TIER_DESC = {
  explanation: ui.tierExplanationDesc,
  chips: ui.tierChipsDesc,
  workshop: ui.tierWorkshopDesc,
  exercise: ui.tierExerciseDesc,
} as const;

export function LessonTierMenu({ courseId, lesson, breadcrumb, onPick, onBack }: Props) {
  const { lang } = useLang();

  return (
    <div className="min-h-full p-4 sm:p-10">
      <div className="max-w-4xl mx-auto">
        {breadcrumb ? (
          <div className="mb-4">
            <Breadcrumb segments={breadcrumb} />
          </div>
        ) : (
          <button
            onClick={onBack}
            className="text-sm mb-4
                       text-stone-500 hover:text-stone-800
                       dark:text-indigo-200/60 dark:hover:text-indigo-100"
          >
            ← {t(lesson.title, lang)}
          </button>
        )}
        <h1 className="text-2xl sm:text-4xl font-semibold text-stone-900 dark:text-indigo-50">
          {t(lesson.title, lang)}
        </h1>
        <p className="text-stone-500 dark:text-indigo-200/70 mt-1 mb-10">
          {t(lesson.summary, lang)}
        </p>

        <div className="grid sm:grid-cols-2 gap-4">
          {TIER_ORDER.map((tier) => {
            const count = slidesForTier(lesson, tier).length;
            const done = isTierComplete(courseId, lesson.id, tier);
            return (
              <button
                key={tier}
                onClick={() => onPick(tier)}
                className={
                  "text-left rounded-2xl p-5 transition-all relative " +
                  "bg-white shadow-sm hover:shadow " +
                  "dark:bg-slate-900/60 dark:shadow-none " +
                  (done
                    ? "ring-2 ring-emerald-400 hover:ring-emerald-500 dark:ring-emerald-400/60 dark:hover:ring-emerald-300/80"
                    : "ring-1 ring-stone-200 hover:ring-amber-400 dark:ring-white/10 dark:hover:ring-indigo-400/50")
                }
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="text-lg font-semibold text-stone-900 dark:text-indigo-50">
                    {t(TIER_TITLE[tier], lang)}
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
                  {t(TIER_DESC[tier], lang)}
                </div>
                <div className="text-xs text-amber-600 dark:text-indigo-300/60 mt-3">
                  {count} {t(ui.tierSlideCount, lang)}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
