// Per-session completion tracking. Resets when the browser session ends — by design.
// Students can replay any lesson freely; completion is a soft progress marker, not a gate.

import { sessionGet, sessionSet } from "./storage";
import type { Lesson } from "./types";
import { populatedTiers, type Tier } from "./tiers";

const TIER_KEY = (courseId: string, lessonId: string, tier: Tier) =>
  `cul:tier-complete:${courseId}:${lessonId}:${tier}`;

export function markTierComplete(
  courseId: string,
  lessonId: string,
  tier: Tier
) {
  sessionSet(TIER_KEY(courseId, lessonId, tier), "1");
}

export function isTierComplete(
  courseId: string,
  lessonId: string,
  tier: Tier
): boolean {
  return sessionGet(TIER_KEY(courseId, lessonId, tier)) === "1";
}

/**
 * A lesson is complete when every populated tier is complete. The Workshop
 * tier is currently always empty and is excluded by `populatedTiers`.
 */
export function isComplete(courseId: string, lesson: Lesson): boolean {
  const tiers = populatedTiers(lesson);
  if (tiers.length === 0) return false;
  return tiers.every((t) => isTierComplete(courseId, lesson.id, t));
}
