import type { ExerciseSlide, JsWorkshopSlide, Lesson } from "../types";
import { TIER_ORDER, slidesForTier, type Tier } from "../tiers";
import { isSlideComplete, isTierComplete } from "../progress";
import { t } from "../i18n";
import { ui } from "../i18n/strings";
import { Breadcrumb, type BreadcrumbSegment } from "./SlideDeck";
import { tokens } from "../styles/tokens";
import { useAccent } from "./AccentContext";
import { useTheme, ThemeToggleInline } from "./ThemeToggle";
import { pickAccentHex } from "../topics";

type Props = {
  courseId: string;
  lesson: Lesson;
  breadcrumb?: BreadcrumbSegment[];
  /**
   * Picked a tier card. When the tier has multiple slides surfaced as rows
   * (workshop, exercise), `startIdx` is the slide index within that tier.
   * Omitted when the student clicks a tier with a single slide (or no rows).
   */
  onPick: (tier: Tier, startIdx?: number) => void;
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

/**
 * Strip the redundant tier prefix ("Workshop:", "Lab:", "Verkstad:", "Labb:")
 * from slide titles when rendering them inside the corresponding tier card.
 * The card's own header already says which tier it is, so the prefix just
 * adds noise. Capitalises the first remaining letter so "declare ..." reads
 * as "Declare ...".
 */
function stripTierPrefix(title: string): string {
  const stripped = title.replace(/^(Workshop|Lab|Verkstad|Labb)\s*:\s*/i, "").trim();
  if (stripped.length === 0) return title;
  return stripped[0].toUpperCase() + stripped.slice(1);
}

/**
 * One row per workshop slide in this lesson, in slide order. Each lesson is
 * authored with up to 4 distinct workshops; we render their titles so the
 * student can see the four scenarios up-front.
 */
function workshopRows(lesson: Lesson): { key: string; preview: string }[] {
  const slides = slidesForTier(lesson, "workshop") as JsWorkshopSlide[];
  return slides.map((slide, i) => ({
    key: `w-${i}`,
    preview: stripTierPrefix(t(slide.title)),
  }));
}

/**
 * One row per exercise lab slide in this lesson, in slide order.
 */
function exerciseRows(lesson: Lesson): { key: string; preview: string }[] {
  const slides = slidesForTier(lesson, "exercise") as ExerciseSlide[];
  return slides.map((slide, i) => ({
    key: `e-${i}`,
    preview: stripTierPrefix(t(slide.title)),
  }));
}

/**
 * Small padlock glyph used on locked tier cards and locked sub-rows. Inline
 * SVG so it inherits `currentColor` and styles cleanly in both themes.
 */
function LockIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="4" y="11" width="16" height="10" rx="2" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </svg>
  );
}

export function LessonTierMenu({ courseId, lesson, breadcrumb, onPick, onBack }: Props) {
  const { theme } = useTheme();
  const accent = useAccent();
  const fg = pickAccentHex(accent.fgHex, theme);
  const dark = theme === "dark";
  const tagBg = dark ? accent.bgHex.dark : accent.bgHex.light;

  // First incomplete populated tier in order — the recommended entry point.
  // Drives the "current" card styling so a cold student has an obvious next
  // step; upcoming tiers render dimmer to push them down the visual hierarchy
  // without locking access (clarity fix, not a gate).
  const populatedTiers = TIER_ORDER.filter(
    (tier) => slidesForTier(lesson, tier).length > 0,
  );
  const currentTier =
    populatedTiers.find((tier) => !isTierComplete(courseId, lesson, tier)) ??
    null;

  return (
    <div className="min-h-full">
      {/* Lesson header band — same visual language as topic / home headers. */}
      <header
        className={`${tokens.page.surface} paper-texture px-4 sm:px-10 pt-6 pb-8`}
      >
        <div className="max-w-5xl mx-auto">
          {breadcrumb ? (
            <div className="mb-4">
              <Breadcrumb segments={breadcrumb} />
            </div>
          ) : (
            <button
              onClick={onBack}
              className="text-sm mb-4 text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-100"
            >
              ← {t(lesson.title)}
            </button>
          )}
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className={tokens.text.h1}>{t(lesson.title)}</h1>
            <ThemeToggleInline />
          </div>
          <p className="text-stone-600 dark:text-stone-400 text-base mt-1.5">
            {t(lesson.summary)}
          </p>
          <p className="text-stone-500 dark:text-stone-400 text-sm italic mt-2">
            {t(ui.tierOrderCaption)}
          </p>
        </div>
      </header>

      <div className="px-4 sm:px-10 py-10">
        <div className="max-w-5xl mx-auto">
          {/* Single column < md to avoid awkward height mismatches; the
              workshop/exercise cards are taller than explanation/chips. */}
          <div className="grid md:grid-cols-2 gap-4">
            {TIER_ORDER.map((tier) => {
              const count = slidesForTier(lesson, tier).length;
              const done = isTierComplete(courseId, lesson, tier);
              const isCurrent = tier === currentTier;
              const isUpcoming = !done && !isCurrent;
              const rows =
                tier === "workshop"
                  ? workshopRows(lesson)
                  : tier === "exercise"
                    ? exerciseRows(lesson)
                    : null;

              const header = (
                <>
                  <div className="flex items-start justify-between gap-3">
                    <h2 className={`${tokens.text.h3} inline-flex items-center gap-2`}>
                      {isUpcoming && (
                        <LockIcon className="w-4 h-4 text-stone-500 dark:text-stone-400 shrink-0" />
                      )}
                      <span>{t(TIER_TITLE[tier])}</span>
                    </h2>
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
                  <p className="text-sm text-stone-600 dark:text-stone-400 mt-1">
                    {t(TIER_DESC[tier])}
                  </p>
                </>
              );

              // Row-style card (workshop, exercise): each row is its own button
              // navigating to that specific slide within the tier.
              if (rows && rows.length > 0) {
                // Row-level locking: row N is unlocked iff every prior row in
                // this tier is complete. Row 0 is always unlocked at the row
                // level — the tier card itself enforces the tier-level lock
                // (only the "current" or "done" tier exposes its rows).
                const rowSlideComplete = rows.map((_, i) =>
                  isSlideComplete(courseId, lesson.id, tier, i),
                );
                const isRowLocked = (i: number) =>
                  rowSlideComplete.slice(0, i).some((c) => !c);
                return (
                  <div
                    key={tier}
                    className={`${tokens.card.surface} p-5 transition-shadow ${
                      isUpcoming ? "opacity-60" : ""
                    }`}
                    style={
                      done
                        ? {
                            borderColor: fg,
                            boxShadow: `inset 3px 0 0 ${fg}`,
                          }
                        : isCurrent
                          ? {
                              borderColor: fg,
                              boxShadow: `inset 3px 0 0 ${fg}, 0 1px 2px rgba(0,0,0,0.04)`,
                            }
                          : undefined
                    }
                  >
                    {header}
                    <ol className="mt-4 space-y-1.5 text-sm">
                      {rows.map((row, i) => {
                        const rowLocked = isUpcoming || isRowLocked(i);
                        const rowDone = rowSlideComplete[i];
                        return (
                          <li key={row.key}>
                            <button
                              onClick={() => onPick(tier, i)}
                              disabled={rowLocked}
                              title={
                                rowLocked
                                  ? "Finish the previous step first"
                                  : undefined
                              }
                              className={
                                "w-full text-left flex items-start gap-2 rounded-lg px-2 py-1.5 transition-colors " +
                                "bg-stone-50 dark:bg-[#222630] border border-stone-900/[0.05] dark:border-white/[0.05] " +
                                (rowLocked
                                  ? "opacity-50 cursor-not-allowed"
                                  : "hover:bg-stone-100 dark:hover:bg-[#252934]")
                              }
                            >
                              <span
                                className="shrink-0 inline-flex items-center justify-center w-5 h-5 rounded-full text-[11px] font-mono font-medium tabular-nums"
                                style={{ background: tagBg, color: fg }}
                              >
                                {rowLocked && !rowDone ? (
                                  <LockIcon className="w-3 h-3" />
                                ) : (
                                  i + 1
                                )}
                              </span>
                              <span className="text-stone-800 dark:text-stone-100 leading-snug flex-1">
                                {row.preview}
                              </span>
                              {rowDone && (
                                <span
                                  className="text-[10px] font-mono uppercase tracking-widest shrink-0"
                                  style={{ color: dark ? "#5FCAA8" : "#1F8A6E" }}
                                >
                                  ✓
                                </span>
                              )}
                            </button>
                          </li>
                        );
                      })}
                    </ol>
                  </div>
                );
              }

              // Single-button card (explanation, chips): the whole card is the
              // tap target. Locked when `isUpcoming` — student must clear
              // the previous tier before this one becomes interactive.
              return (
                <button
                  key={tier}
                  onClick={() => onPick(tier)}
                  disabled={isUpcoming}
                  title={
                    isUpcoming ? "Finish the previous step first" : undefined
                  }
                  className={`${tokens.card.surface} text-left p-5 ${
                    isUpcoming
                      ? "opacity-60 cursor-not-allowed"
                      : tokens.card.hover
                  }`}
                  style={
                    done
                      ? {
                          borderColor: fg,
                          boxShadow: `inset 3px 0 0 ${fg}`,
                        }
                      : isCurrent
                        ? {
                            borderColor: fg,
                            boxShadow: `inset 3px 0 0 ${fg}, 0 1px 2px rgba(0,0,0,0.04)`,
                          }
                        : undefined
                  }
                >
                  {header}
                  <div className="text-[11px] font-mono text-stone-500 dark:text-stone-400 mt-3 tabular-nums">
                    {count} {t(ui.tierSlideCount)}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
