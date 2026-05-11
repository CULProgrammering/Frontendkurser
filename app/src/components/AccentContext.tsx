import { createContext, useContext, type ReactNode } from "react";
import { DEFAULT_ACCENT, type TopicAccent } from "../topics";

/**
 * Topic accent context — supplies the current chapter colour to every
 * descendant slide view (workshop, chip puzzle, exercise, explanation).
 *
 * Why a context: the alternative — threading `accent` through SlideDeck
 * down to each slide kind — touches half a dozen component signatures and
 * leaks a styling concern into routing. The provider is set once per view
 * in [`App.tsx`](../App.tsx) when navigating into a topic / lesson /
 * walkthrough / challenge, and read by:
 *   - [`WindowedStepCounter`](./WindowedStepCounter.tsx) — done / current
 *     cell colour.
 *   - [`JsWorkshopSlideView`](./JsWorkshopSlideView.tsx) — Check button +
 *     step grid.
 *   - [`ExerciseSlideView`](./ExerciseSlideView.tsx) — Run button accent.
 *   - [`ExplanationSlideView`](./ExplanationSlideView.tsx) — eyebrow tone.
 *
 * Default is `DEFAULT_ACCENT` (amber, matching Variables) — fine for any
 * un-themed view.
 */
const AccentContext = createContext<TopicAccent>(DEFAULT_ACCENT);

export function AccentProvider({
  accent,
  children,
}: {
  accent: TopicAccent;
  children: ReactNode;
}) {
  return (
    <AccentContext.Provider value={accent}>{children}</AccentContext.Provider>
  );
}

/** Read the current topic accent. Always returns a valid accent. */
export function useAccent(): TopicAccent {
  return useContext(AccentContext);
}
