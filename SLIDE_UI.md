# Slide UI Conventions

Required reading before adding a new `slide.kind` view, modifying the
slide chrome, or restyling the breadcrumb / title row. The slide chrome
(breadcrumb, title row, font-size + theme toggle, chapter jump dots) is
built from shared components — every slide view must follow the same
pattern so navigation looks consistent across tiers.

## Layout rules

- **Breadcrumb path**: built in [App.tsx](app/src/App.tsx) for every
  view (`Home › Topic? › Lesson › Tier?`) and forwarded down. Each
  slide view receives a `breadcrumb?: BreadcrumbSegment[]` prop and
  renders it via [`SlideTitleRow`](app/src/components/SlideDeck.tsx).
- **Title row layout**: wrap H1/H2 + controls inside `<SlideTitleRow>`.
  The H2 sits left with `flex-1 min-w-0` so it shrinks instead of
  pushing controls onto a second row, then `<SlideFontSizeControl />`,
  then (explanation only) `<TypewriterToggleInline />`, then
  `<ThemeToggleInline />`, then (workshop only, when `step.hint` is
  set) the **Hint** button, then (workshop and exercise only)
  `{step.flexibility && <FlexibilityHelpButton flex={step.flexibility} />}`
  — in that order, on the same flex row.
- **Click propagation**: `SlideTitleRow` stops click propagation so
  controls inside it (font size, theme, typewriter, breadcrumb,
  flexibility help) never bubble up to a slide-level click handler.
  This matters because [`ExplanationSlideView`](app/src/components/ExplanationSlideView.tsx)
  wraps its whole pane in `onClick={advance}` — without the guard,
  clicking the theme toggle would also advance the slide. Don't add a
  competing `onClick` to children of the title row.
- **Description + chapter dots row**: place the description paragraph
  and the `slideJumpDots` prop side-by-side in a
  `flex items-end justify-between gap-4` row. The description grows,
  dots stay right-aligned.
- **Slide-jump dots placement**: SlideDeck pulls the dots OUT of the
  title row for the workshop and exercise tiers and renders them in a
  centered row above both panes, prefixed with a tier label
  (`Workshop X / N` or `Lab X / N`). The dots in those tiers swap the
  whole workshop/lab — they would read as a per-step indicator if left
  inline. Other slide kinds (explanation, chip puzzle, typed
  assignment, etc.) keep their dots in the right-pane title row, so
  each slide view still receives `slideJumpDots` as a prop. SlideDeck
  passes `null` for that prop on workshop/exercise so the inline slot
  collapses.
- **No outer SlideDeck chrome**: aside from the workshop/exercise
  picker row above, SlideDeck still does NOT render a global header or
  footer. The breadcrumb lives inside each slide view's title block.
- **Centering / width**: explanation and chip-puzzle slides cap at
  `max-w-7xl mx-auto`. Workshop and exercise containers use
  `max-w-[min(1700px,92vw)] mx-auto` instead — at larger font sizes
  the editor and console want horizontal room to keep code lines from
  wrapping mid-statement. Inside the prose pane each `<p>` is capped at
  `max-w-[68ch]` so paragraph text never sprawls past ~60–80 chars
  even when the pane itself is much wider.

## Reusable building blocks

- [`Breadcrumb`, `SlideTitleRow`, `BreadcrumbSegment`](app/src/components/SlideDeck.tsx)
- [`SlideFontSizeControl`, `useSlideFontSize`](app/src/components/SlideFontSize.tsx)
- [`ThemeToggleInline`](app/src/components/ThemeToggle.tsx) — use the
  inline variant in slide views; the floating `ThemeToggle` is for
  home / topic / tier-menu views only.
- [`TypewriterToggleInline`, `useTypewriter`](app/src/components/TypewriterToggle.tsx)
  — explanation slides only. The hook exposes `enabled` from a
  process-wide pub/sub (every consumer re-renders when any one toggles)
  backed by localStorage `cul:typewriter`; default honours
  `prefers-reduced-motion`.
- [`FlexibilityHelpButton`](app/src/components/FlexibilityHelpButton.tsx)
  — workshop and exercise views only; gated by `step.flexibility` /
  `slide.flexibility`.
- **Hint button** — inline button in the workshop title row, gated by
  `step.hint` (workshops only). Toggles a soft amber band underneath
  the instruction that prints the literal answer / formula. Local to
  the step (resets on step change) — no module yet, the button + state
  live inside [`JsWorkshopSlideView`](app/src/components/JsWorkshopSlideView.tsx).

## Responsive

Breakpoints follow Tailwind defaults: `sm` (640px), `md` (768px),
`lg` (1024px). Two-column slide layouts (code | instructions) switch to
single-column with a tab toggle at `< md` via
[`TwoColumnLayout`](app/src/components/TwoColumnLayout.tsx).

## Topic view: Walkthroughs and Challenges

The topic view (lessons grid in the centre) gains two optional sections
below the grid when authored on the topic:

- **Walkthroughs** (`Topic.walkthroughs[]`) — one card per walkthrough.
  Title, "GUIDED" pill in the topic accent, and a 5-/10-column
  milestone grid (`<WalkthroughStepGrid>` in [App.tsx](app/src/App.tsx))
  where each cell is a square button with topic-accent treatment:
  done = filled accent, current = outlined accent, upcoming = neutral
  border. Picking any cell jumps the student into the walkthrough at
  that step.
- **Challenges** (`Topic.challenges[]`) — single-tap card per challenge
  with a rose "OPEN-ENDED" pill (semantic, not topic-tied), a row of
  tick marks sized to `tests.length`, and the "0 / N passing" caption.
  No step grid (challenges are single-shot).

Sections only render when their array has at least one entry — empty
arrays / undefined fields produce no headers.

## Step counter

[`WindowedStepCounter`](app/src/components/WindowedStepCounter.tsx) is
the shared step counter for any multi-step deck (lesson workshops,
topic walkthroughs). It auto-windows: flat dots when `total ≤ 10`,
windowed (`current ± 3` plus first/last with ellipses) when
`total > 10`. Edge-aware: ellipses suppress when only a single step
would be hidden (the boundary number is shown directly instead).
`isDone > isCurrent` precedence so completed cells stay filled even
when the student is parked on them.

Visual style matches the topic-view milestone grid: each cell is a
small square that takes its colour from the active topic accent
(`useAccent()`) — done = filled accent (chapter colour), current =
outlined accent, upcoming = neutral border. Lesson workshops inherit
the topic accent of their parent topic; explanation slides inherit
the topic too via the `<AccentProvider>` set in `App.tsx`.
