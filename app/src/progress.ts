// Per-slide completion tracking. Persisted in localStorage via storage.ts
// so progress survives reloads and "open it tomorrow" usage patterns.
//
// Each slide a student passes (or, for explanation slides, reaches)
// flips one boolean key. A tier counts as complete only when every slide
// in that tier is marked — no more "reached the last slide = whole tier
// done" shortcut, which let students who jumped straight to row 4 of a
// 4-slide exercise tier flip the whole lesson to 13/13.
//
// Keys: `cul:slide-complete:{courseId}:{lessonId}:{tier}:{idx}` = "1"
// Old `cul:tier-complete:*` keys from the previous schema are abandoned
// (pre-launch — no migration needed).

import { sessionGet, sessionSet } from "./storage";
import type { Lesson } from "./types";
import { populatedTiers, slidesForTier, type Tier } from "./tiers";

const SLIDE_KEY = (
  courseId: string,
  lessonId: string,
  tier: Tier,
  idx: number,
) => `cul:slide-complete:${courseId}:${lessonId}:${tier}:${idx}`;

export function markSlideComplete(
  courseId: string,
  lessonId: string,
  tier: Tier,
  slideIdx: number,
) {
  sessionSet(SLIDE_KEY(courseId, lessonId, tier, slideIdx), "1");
}

export function isSlideComplete(
  courseId: string,
  lessonId: string,
  tier: Tier,
  slideIdx: number,
): boolean {
  return sessionGet(SLIDE_KEY(courseId, lessonId, tier, slideIdx)) === "1";
}

/**
 * A tier is complete when every slide within it is marked complete. An
 * empty tier (no slides authored) returns false — there's nothing to do,
 * and treating it as "done" would surface a spurious "done" badge.
 */
export function isTierComplete(
  courseId: string,
  lesson: Lesson,
  tier: Tier,
): boolean {
  const slides = slidesForTier(lesson, tier);
  if (slides.length === 0) return false;
  return slides.every((_, i) =>
    isSlideComplete(courseId, lesson.id, tier, i),
  );
}

/**
 * Lesson complete when every populated tier is complete. Empty tiers are
 * filtered out via `populatedTiers` so they don't block completion.
 */
export function isComplete(courseId: string, lesson: Lesson): boolean {
  const tiers = populatedTiers(lesson);
  if (tiers.length === 0) return false;
  return tiers.every((t) => isTierComplete(courseId, lesson, t));
}

/**
 * Returns true when at least one slide has been marked complete. Drives
 * the visibility of the home hero's "Reset progress" link — there's
 * nothing to offer when storage is empty.
 */
export function hasAnyProgress(): boolean {
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && k.startsWith("cul:slide-complete:")) return true;
    }
  } catch {
    // ignore
  }
  return false;
}

/**
 * Wipe every per-slide completion marker. Leaves preference keys (theme,
 * typewriter, font size) alone — those aren't progress and the student
 * shouldn't lose their reading preferences just because they wanted a
 * fresh slate. Surfaced via the home hero's "Reset progress" link.
 */
export function resetProgress(): void {
  try {
    const toRemove: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && k.startsWith("cul:slide-complete:")) toRemove.push(k);
    }
    for (const k of toRemove) localStorage.removeItem(k);
  } catch {
    // ignore — private mode or storage disabled
  }
}
