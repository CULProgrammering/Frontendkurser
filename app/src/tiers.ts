import type { Lesson, Slide } from "./types";

export type Tier = "explanation" | "chips" | "workshop" | "exercise";

export const TIER_ORDER: readonly Tier[] = [
  "explanation",
  "chips",
  "workshop",
  "exercise",
] as const;

export function tierForSlide(slide: Slide): Tier {
  switch (slide.kind) {
    case "explanation":
      return "explanation";
    case "exercise":
      return "exercise";
    case "js-workshop":
      return "workshop";
    case "js-chip-assignment":
    case "js-typed-assignment":
    case "js-assignment":
    case "assignment":
      return "chips";
  }
}

export function slidesForTier(lesson: Lesson, tier: Tier): Slide[] {
  return lesson.slides.filter((s) => tierForSlide(s) === tier);
}

export function populatedTiers(lesson: Lesson): Tier[] {
  return TIER_ORDER.filter((t) => slidesForTier(lesson, t).length > 0);
}
