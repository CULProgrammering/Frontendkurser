# Frontendkurser — Project Instructions

## Lab Exercise & Workshop Authoring

When you author or modify a Monaco lab exercise (`kind: "exercise"`) **or** a
Workshop slide (`kind: "js-workshop"`) in any `app/src/lessons/**/*.ts` file,
you MUST run the harness in the same change:

```
cd app && npx tsx scripts/test-labs.ts
```

Confirm all assertions pass before reporting the lab/workshop as done.

### Exercise tier (`kind: "exercise"`)

Each exercise lab needs a known-good solution in [scripts/test-labs.ts](app/scripts/test-labs.ts)'s
`SOLUTIONS` array — student code that satisfies every user story. The harness
mimics the iframe runner: vm sandbox, console capture, `window.__userSrc`, and
runs every assertion exactly as the iframe would.

When the iframe runner itself changes (new globals exposed, capture behavior),
update the harness's sandbox setup to mirror the change so the two stay in sync.

### Workshop tier (`kind: "js-workshop"`)

**No SOLUTIONS array entry needed** — the harness walks every workshop slide and
runs each step's authored `reveal` field through `runWorkshopChecks` (the same
function the React layer calls). The reveal IS the canonical solution.

Authoring rule: **every step's `reveal` must pass that step's own `checks`.**
The harness fails the run if it doesn't. If you change the runner itself
(`app/src/runtime/workshopRunner.ts`), the runner-invariants smoke test at the
end of `test-labs.ts` should also be updated to cover the new behavior.

### Why this matters

Skipping the harness means shipping assertions that may have regex typos,
off-by-one bugs, or impossible requirements — bugs invisible at the TypeScript
build level because assertions and `requirePattern`s are strings/regexes.

**Forbidden:** claiming a lab or workshop is "ready" or "tested" without a green
run of the harness in the current session. Reading the assertion strings is not
testing.

## Slide UI Conventions

The slide chrome (breadcrumb, title row, font-size + theme toggle, chapter
jump dots) is built from shared components. New slide types must follow the
same pattern so navigation looks consistent across tiers.

- **Breadcrumb path**: built in [App.tsx](app/src/App.tsx) for every view
  (`Home › Topic? › Lesson › Tier?`) and forwarded down. Each slide view
  receives a `breadcrumb?: BreadcrumbSegment[]` prop and renders it via
  [`SlideTitleRow`](app/src/components/SlideDeck.tsx).
- **Title row layout**: wrap H1/H2 + controls inside `<SlideTitleRow>`. The
  H2 sits left, then `<SlideFontSizeControl />`, then `<ThemeToggleInline />`
  — in that order, on the same flex row.
- **Description + chapter dots row**: place the description paragraph and the
  `slideJumpDots` prop side-by-side in a `flex items-end justify-between gap-4`
  row. The description grows, dots stay right-aligned.
- **No outer SlideDeck chrome**: SlideDeck must NOT render its own header or
  footer. The breadcrumb lives inside each slide view's title block; jump dots
  are passed in as a prop.
- **Centering**: each slide view wraps its outer container in
  `max-w-7xl mx-auto` so wide screens don't sprawl.

Reusable building blocks:
- [`Breadcrumb`, `SlideTitleRow`, `BreadcrumbSegment`](app/src/components/SlideDeck.tsx)
- [`SlideFontSizeControl`, `useSlideFontSize`](app/src/components/SlideFontSize.tsx)
- [`ThemeToggleInline`](app/src/components/ThemeToggle.tsx) (use the inline
  variant in slide views; the floating `ThemeToggle` is for home / topic /
  tier-menu views only).

Responsive design plan is parked at [RESPONSIVE_PLAN.md](RESPONSIVE_PLAN.md).
