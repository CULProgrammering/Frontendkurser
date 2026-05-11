/**
 * Topic accent registry — one entry per chapter color in the design system.
 *
 * Each topic owns one hue with matched chroma + lightness across the set, so
 * the system reads as a calm chapter palette even when every topic is
 * on-screen at once. The `fg` is used for the chapter title / progress
 * fill / icon stroke; `bg` is the tinted surface behind the chapter cover.
 *
 * Resolution order (see [`accentFor`](./topics.ts)):
 *   1. exact topic id (e.g. `"variables"`)
 *   2. course-level fallback (e.g. `"css"` → blue)
 *   3. default — amber
 *
 * To add a new topic accent, add an entry here AND ensure the
 * [`ChapterCover`](./components/ChapterCover.tsx) switch handles its id (or
 * the cover falls back to a generic glyph).
 */

export type AccentHex = { light: string; dark: string };

/**
 * Note: accents use raw hex values (not Tailwind class strings) because
 * Tailwind's JIT only generates utilities whose class strings appear
 * literally in source. Constructed-at-runtime strings like
 * `text-[${hex}]` would silently no-op. Components consume `fgHex` /
 * `bgHex` via inline `style={{ color, background }}` — which is what
 * the source design prototype does too.
 */
export type TopicAccent = {
  fgHex: AccentHex;
  bgHex: AccentHex;
};

function accent(
  fgLight: string,
  fgDark: string,
  bgLight: string,
  bgDark: string
): TopicAccent {
  return {
    fgHex: { light: fgLight, dark: fgDark },
    bgHex: { light: bgLight, dark: bgDark },
  };
}

/**
 * Pick the right channel out of an `AccentHex` for the active theme.
 * Components that already hold a `theme` value can call this directly;
 * `useAccent` wraps it for convenience inside React trees.
 */
export function pickAccentHex(
  hex: AccentHex,
  theme: "light" | "dark"
): string {
  return theme === "dark" ? hex.dark : hex.light;
}

/** Six topic accents from the workbook design — equal chroma + lightness. */
export const TOPIC_ACCENTS: Record<string, TopicAccent> = {
  variables: accent("#C97A1F", "#F0B274", "#FBE8CF", "#3a2a18"),
  conditionals: accent("#1F8A6E", "#5FCAA8", "#D6EFE6", "#163029"),
  loops: accent("#6E54C8", "#A99AEC", "#E4DEF7", "#231f3a"),
  functions: accent("#C24A6B", "#EE8AA1", "#F4DCE2", "#39202a"),
  arrays: accent("#3A75C7", "#7AAAEB", "#D8E4F4", "#1c2a3d"),
  objects: accent("#7E8425", "#C5CB6A", "#E8EBC9", "#2c2e15"),
};

/**
 * Course-level fallback when a course has no `topics[]` (flat CSS course
 * today). Re-uses the same palette swatches; not a separate hue.
 */
export const COURSE_ACCENTS: Record<string, TopicAccent> = {
  // CSS course → blue (structural / layout). Easily swapped later.
  css: TOPIC_ACCENTS.arrays,
  // JavaScript course → amber default before any topic is selected.
  javascript: TOPIC_ACCENTS.variables,
};

/** Default accent used when neither the topic id nor the course id is known. */
export const DEFAULT_ACCENT: TopicAccent = TOPIC_ACCENTS.variables;

/**
 * Resolve an accent for the current view. `topicId` wins over `courseId`;
 * both are optional. Always returns a usable accent — never `undefined`.
 */
export function accentFor(topicId?: string, courseId?: string): TopicAccent {
  if (topicId && TOPIC_ACCENTS[topicId]) return TOPIC_ACCENTS[topicId];
  if (courseId && COURSE_ACCENTS[courseId]) return COURSE_ACCENTS[courseId];
  return DEFAULT_ACCENT;
}

/**
 * Tailwind utility wrappers for the two semantic feedback hues. These are
 * the same teal / rose that `conditionals` / `functions` use as topic
 * accents — feedback bands borrow from the topic palette instead of
 * introducing a separate green/red.
 */
export const FEEDBACK_HEX = {
  success: { light: "#1F8A6E", dark: "#5FCAA8" },
  error: { light: "#C24A6B", dark: "#EE8AA1" },
} as const;
