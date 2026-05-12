# Codebase map

A high-level map of `app/src/` so you don't have to re-grep every session.
Files grouped by role; one line each. **When you add a new component
or change a file's responsibility, update this map.**

## App shell & navigation
- [`App.tsx`](app/src/App.tsx) — top-level view router (`home` / `topic` /
  `tier-menu` / `tier-deck` / `lesson` / `walkthrough` / `challenge`);
  builds breadcrumbs per view; renders the home hero (workbook surface +
  progress beads + "Continue" CTA), topic header band with chapter cover,
  walkthroughs/challenges paired side-by-side. Wraps every topic-bearing
  view in `<AccentProvider>`.
- [`main.tsx`](app/src/main.tsx) — Vite entry, mounts `<App />`.
- [`components/LessonTierMenu.tsx`](app/src/components/LessonTierMenu.tsx) —
  lesson's 4-tier card grid; rows for workshops/exercises that route to a
  specific slide via `startIdx`. Reads the topic accent from
  `useAccent()` to colour completion ribbons.
- [`components/RoomScene.tsx`](app/src/components/RoomScene.tsx) — legacy
  home illustration; no longer rendered after the workbook redesign.
  Kept for now in case it's repurposed into a slide scene.

## Slide deck & shared chrome
- [`components/SlideDeck.tsx`](app/src/components/SlideDeck.tsx) — slide
  pager; switches on `slide.kind` to pick the right view; owns
  Esc-to-exit and jump dots. Exports `Breadcrumb`, `SlideTitleRow`,
  `BreadcrumbSegment`. Page background is the workbook canvas
  (`#f6f3ec` / `#14161c`). For workshop/exercise tiers with more than
  one slide, lifts the jump dots out of the slide view and renders
  them in a centered row above both panes, labelled
  `Workshop X / N` or `Lab X / N` so students don't mistake them for
  a per-step indicator (those dots swap the whole workshop/lab).
- [`components/AccentContext.tsx`](app/src/components/AccentContext.tsx)
  — supplies the active topic accent via React context;
  `<AccentProvider accent={...}>` is set in `App.tsx` per route, and
  `useAccent()` is read by `WindowedStepCounter`, `LessonTierMenu`, and
  `WalkthroughStepGrid`.
- [`components/ChapterCover.tsx`](app/src/components/ChapterCover.tsx)
  — small abstract SVG glyph per topic id (sticky note, fork, loop
  arrow, fn-box, wardrobe row, key/value), painted in the topic accent
  on a tinted surface. Rendered on home topic cards and topic headers.
  These are NOT the same as `components/scenes/*` — those are
  per-lesson story scenes; chapter covers are quieter thumbnails.
- [`components/SlideFontSize.tsx`](app/src/components/SlideFontSize.tsx)
  — `useSlideFontSize` hook + `SlideFontSizeControl` button cluster.
- [`components/ThemeToggle.tsx`](app/src/components/ThemeToggle.tsx) —
  `ThemeToggleInline` (slide views) and floating `ThemeToggle` (home /
  topic / tier-menu views).
- [`components/TypewriterToggle.tsx`](app/src/components/TypewriterToggle.tsx)
  — `useTypewriter()` hook + `TypewriterToggleInline` button (small
  inline-SVG typewriter; strike-through when off). Persists the on/off
  pref in localStorage (`cul:typewriter`); first-visit default honours
  `prefers-reduced-motion`. Uses a process-wide pub/sub so every
  consumer (toggle button, ExplanationSlideView's hook) re-renders on
  any write — without it, the toggle button's own `useState` snapshot
  would be the only one that updates and the change would only land
  on the next slide remount.
- [`components/TwoColumnLayout.tsx`](app/src/components/TwoColumnLayout.tsx)
  — responsive code | instructions split; collapses to single column at
  `< md` with tab toggle.
- [`components/ValuesPill.tsx`](app/src/components/ValuesPill.tsx)
  — small pill rendered above the prompt / instruction on every
  workshop step and every exercise lab. **EXACT VALUES** (amber) when
  the values are pinned by checks; **ANY VALUES** (teal) when the
  step / slide opts in with `anyValues: true`. Replaced the prior
  `FlexibilityHelpButton`.

## Slide views (one per `slide.kind`)
- [`components/ExplanationSlideView.tsx`](app/src/components/ExplanationSlideView.tsx)
  — `"explanation"`: narration steps + optional scene. Whole pane is
  click-to-advance, gated on `typingDone` (the click waits for the
  current Typewriter to finish — students can't skim past unread text).
  Animation on/off lives in the title-row `TypewriterToggleInline`; no
  per-click skip behaviour. Sticky-note "Tip" dialog (amber) per slide
  via `kind: "note"` demo boxes.
- [`components/AssignmentSlideView.tsx`](app/src/components/AssignmentSlideView.tsx)
  — `"assignment"` (legacy CSS-style task).
- [`components/JsAssignmentSlideView.tsx`](app/src/components/JsAssignmentSlideView.tsx)
  — `"js-assignment"` (legacy free-form JS task).
- [`components/JsChipAssignmentSlideView.tsx`](app/src/components/JsChipAssignmentSlideView.tsx)
  — `"js-chip-assignment"`: drag chips into code slots; supports
  `alternatives` and `unordered`.
- [`components/JsTypedAssignmentSlideView.tsx`](app/src/components/JsTypedAssignmentSlideView.tsx)
  — `"js-typed-assignment"`: typed inputs in a code template.
- [`components/JsWorkshopSlideView.tsx`](app/src/components/JsWorkshopSlideView.tsx)
  — `"js-workshop"`: multi-step guided coding with sticky completion,
  always-on console preview, auto-run starter code on step mount,
  Back-on-last-step. Title row carries an inline **Hint** button when
  the active step authors a `hint?: Loc`; clicking it toggles a soft
  amber band under the instruction that prints the literal answer.
  Hint state is per-step (resets on step change via the inner
  `key={step.id}` remount). Console panel and prose paragraphs honour
  the slide font-size pref — `codePx` for the console, `prosePx` for
  the instruction; paragraphs cap at `max-w-[68ch]` so they don't
  sprawl when the outer container is wide.
- [`components/ExerciseSlideView.tsx`](app/src/components/ExerciseSlideView.tsx)
  — `"exercise"`: full Monaco lab in an iframe sandbox. Used for
  lesson-level Labs AND topic-level Challenges (same schema). Console
  scales with `codePx`; the instruction prompt and per-test labels
  scale with `prosePx`; runtime errors render in `codePx` mono.
- [`components/WindowedStepCounter.tsx`](app/src/components/WindowedStepCounter.tsx)
  — step counter used by every multi-step deck. Flat row when
  `total ≤ 10`, windowed (`current ± 3` plus first/last with
  ellipses, edge-aware suppression) when `total > 10`. Replaced the
  inline `StepCounter` in `JsWorkshopSlideView`.

## Editor & runtime
- [`components/CodeEditor.tsx`](app/src/components/CodeEditor.tsx) —
  Monaco wrapper exposing a handle (`setValue`, `setPosition`, `focus`,
  `onSubmit` for Ctrl+Enter).
- [`components/Typewriter.tsx`](app/src/components/Typewriter.tsx) —
  narration animation; honours a `skip` prop for click-to-finish.
- [`runtime/workshopRunner.ts`](app/src/runtime/workshopRunner.ts) —
  workshop check engine. `runWorkshopChecks` (hybrid pattern + assert),
  `runWorkshopChecksWithConsole` (also captures console output).
- [`runtime/jsRunner.ts`](app/src/runtime/jsRunner.ts) — exercise tier
  iframe sandbox: builds the iframe, captures console, exposes
  `__userSrc` to assertions.

## Custom scenes
- [`components/scenes/*`](app/src/components/scenes/) — per-lesson
  allegory and code-trace illustrations (Crosswalk, Wardrobe, Bouncer,
  Stairs, Letters, Countdown, Tasting, Recycling, ComparisonsTable).
  Each scene is wired into `ExplanationSlideView`'s `CustomScene` switch
  via the `customScene` slide field.

## Data layer
- [`types.ts`](app/src/types.ts) — every slide/lesson/course shape;
  `Slide` discriminated union; `WorkshopStep`, `ExerciseSlide`,
  `JsChipPuzzle`, `anyValues` flag on workshop steps + exercises. `Topic` carries optional
  `walkthroughs?: JsWorkshopSlide[]` and `challenges?: ExerciseSlide[]`
  for topic-level long-form content (rendered on the topic view as
  separate sections below the lesson grid).
- [`tiers.ts`](app/src/tiers.ts) — `TIER_ORDER` + `slidesForTier`.
- [`progress.ts`](app/src/progress.ts) — localStorage-backed completion
  tracking (`isComplete`, `isTierComplete`).
- [`storage.ts`](app/src/storage.ts) — `sessionGet` / `sessionSet`
  helpers (per-step editor content survives navigation).
- [`lessons/index.ts`](app/src/lessons/index.ts) — `COURSES` export
  (root of the curriculum).
- [`lessons/javascript/*.ts`](app/src/lessons/javascript/) — lesson
  modules; `_shared.ts` holds shared style constants (`codePanelStyle`,
  `noteBoxStyle`); `variables-walkthrough.ts` and
  `variables-challenge.ts` are the Variables-topic long-form pieces,
  attached via `Topic.walkthroughs[]` / `Topic.challenges[]`.
- [`lessons/css/*.ts`](app/src/lessons/css/) — CSS course lessons.

## Design system
- [`styles/tokens.ts`](app/src/styles/tokens.ts) — semantic class strings
  keyed by role (`tokens.card.surface`, `tokens.button.primary`,
  `tokens.feedback.success`, `tokens.text.h1` / `h2` / `h3` / `eyebrow`,
  `tokens.step.cell`, etc.). Components import the role they need
  instead of repeating Tailwind utility chains. **Do not add palette
  decisions inline** — promote them here so future palette tweaks are
  one-file changes. Also exports a tiny `cx(...parts)` join helper.
- [`topics.ts`](app/src/topics.ts) — topic accent registry. Six chapter
  hues (Variables/amber, Conditionals/teal, Loops/violet, Functions/rose,
  Arrays/blue, Objects/olive) sharing chroma + lightness. Exposes
  `accentFor(topicId, courseId)` and `pickAccentHex(hex, theme)`.
  Accents store **raw hex values**, not Tailwind class strings, because
  Tailwind's JIT only generates utilities whose strings appear literally
  in source — accents are consumed via inline `style` props.
  `FEEDBACK_HEX` exposes the success (teal) and error (rose) hues for
  semantic banners — same hues that Conditionals / Functions topics
  wear, kept intentional so feedback colours never collide with topic
  colours.
- [`homeProgress.ts`](app/src/homeProgress.ts) — home-hero progress
  helpers (`walkLessons`, `findNextLesson`, `lessonStatuses`,
  `lessonProgressTotal`). Aggregates `progress.ts`'s per-tier completion
  flags into the lesson granularity the hero needs.
- [`index.css`](app/src/index.css) — Tailwind base + the canvas /
  surface CSS variables and the `.paper-texture` utility (subtle dot
  grid for hero / surface bands). Restoration of the legacy
  `--body-bg` is here.
- [`tailwind.config.js`](app/tailwind.config.js) — extends `fontFamily`
  with `display` (Fraunces), `sans` (Inter), `mono` (JetBrains Mono),
  and registers the canvas / surface / ink colour names.

## i18n (English-only)
The project is single-language. The i18n module is kept as a no-op
shim for back-compat with code that still passes a `lang` argument.
- [`i18n/index.ts`](app/src/i18n/index.ts) — `Loc = string`, `Lang = "en"`,
  and a `t(value, _lang?)` identity helper. The second argument is
  ignored; new code can drop it.
- [`i18n/strings.ts`](app/src/i18n/strings.ts) — the `ui` object
  containing every interface string as a plain `Loc` (string).
- [`i18n/LanguageContext.tsx`](app/src/i18n/LanguageContext.tsx) —
  `useLang` hook returning `{ lang: "en" }`. Pinned to English; provider
  is a pass-through. Kept so existing `useLang()` consumers compile.

## Test harness
- [`app/scripts/test-labs.ts`](app/scripts/test-labs.ts) — vm-based
  exercise/workshop runner that mirrors the iframe runner. Walks every
  exercise in `SOLUTIONS` (resolves by `lessonId` + optional
  `exerciseTitle`; falls back to `Topic.challenges[]` when no lesson
  matches), and every workshop slide across all `Lesson.slides` AND
  `Topic.walkthroughs[]`. Adding a new challenge requires a SOLUTIONS
  entry; walkthroughs validate via their authored `reveal` chain.
