# Frontendkurser — Project Instructions

## Working Style

Unless the user's message starts with **"Do this:"**, give your input on the
proposed change BEFORE implementing it — surface trade-offs, alternatives,
and any concerns. This is intentional friction: it gives the user one more
chance to think about the change before code lands.

When the user opens with "Do this:" they've already decided. Skip the input
step and just execute.

## Post-implementation rule review

After finishing an implementation — **before** reporting it done — scan
the companion docs and CLAUDE.md itself for rules that this change made
stale, missing, or wrong. The rules drift silently if you skip this.

- Changed how a slide view is laid out, or the slide chrome? → check
  [SLIDE_UI.md](SLIDE_UI.md).
- Added a new authoring field, flag, instruction style, or check
  pattern? → check [AUTHORING.md](AUTHORING.md).
- Added, renamed, or repurposed a component / runtime file / lesson
  module? → update [CODEBASE_MAP.md](CODEBASE_MAP.md).
- Established a new workflow rule (e.g. "always run X before Y") that
  applies to every session? → put it in CLAUDE.md.

If a rule needs to change, edit it in the **same change as the code**,
not as a follow-up. A rule is only as useful as its currency.

## Lab & Workshop authoring (must run the harness)

When you author or modify a Monaco lab exercise (`kind: "exercise"`) **or**
a Workshop slide (`kind: "js-workshop"`) in any `app/src/lessons/**/*.ts`
file, you MUST run the harness in the same change:

```
cd app && npx tsx scripts/test-labs.ts
```

Confirm all assertions pass before reporting the lab/workshop as done.

**Forbidden:** claiming a lab or workshop is "ready" or "tested" without a
green run of the harness in the current session. Reading the assertion
strings is not testing.

Skipping the harness ships assertions with regex typos, off-by-one bugs, or
impossible requirements — bugs invisible at the TypeScript build level
because assertions and `requirePattern`s are strings/regexes.

## Design tokens (workbook palette)

The project ships a workbook-style palette and type scale (Fraunces /
Inter / JetBrains Mono) wired through
[`app/src/styles/tokens.ts`](app/src/styles/tokens.ts) and
[`app/src/topics.ts`](app/src/topics.ts). When you restyle a component:

- **Reach for `tokens.<role>` first.** Use `tokens.card.surface`,
  `tokens.button.primary`, `tokens.feedback.success`, `tokens.text.h1` /
  `h2` / `h3` / `eyebrow`, `tokens.step.cell` etc. Don't sprinkle the
  Tailwind utility chains inline — palette tweaks should be one-file
  changes inside `tokens.ts`.
- **Topic accent colours are HEX values, not class strings.** Tailwind's
  JIT only generates utilities whose class strings appear literally in
  source, so `text-[${hex}]` constructed at runtime silently no-ops.
  Read `accentFor(topicId, courseId).fgHex` / `.bgHex` and apply via
  inline `style={{ color, background }}`. See `topics.ts` for examples.
- **Read the active accent via `useAccent()`.** `<AccentProvider>` is
  set per route in `App.tsx`; descendant slide views and step counters
  read it instead of receiving a prop.
- **Feedback bands are semantic, not topic-tied.** Success uses teal
  (same hue as Conditionals); error uses rose (same hue as Functions).
  This is intentional reuse — feedback colours belong to the topic
  palette so the system stays calm. Use `tokens.feedback.success` /
  `.error` / `.idle`.

## i18n status (English-only for now)

The i18n infrastructure (`Loc`, `t(loc, lang)`, `LanguageContext`) is
intact and existing strings keep their `{ en, sv }` shape. New strings
should ship **English-only** — author them as plain strings. The
`LanguageToggle` is hidden from the UI; Swedish translation will be
revisited once the curriculum is feature-complete.

When that day comes, we'll do a single back-fill pass over the strings
authored in the meantime; until then, double-authoring is wasted effort.

## Companion docs

- [AUTHORING.md](AUTHORING.md) — full authoring rules (workshop
  value-flexibility, per-step `flexibility` flag, soft-introducing
  not-yet-taught concepts, bullet point convention, chip puzzle ordering,
  tier prefixes). Read this whenever you touch a `lessons/**/*.ts` file.
- [SLIDE_UI.md](SLIDE_UI.md) — slide chrome conventions (title row,
  breadcrumb, font/theme/help controls, jump dots, centering, responsive
  breakpoints). Read this before adding a new `slide.kind` view or
  modifying chrome.
- [CODEBASE_MAP.md](CODEBASE_MAP.md) — one-line-per-file map of `app/src/`
  grouped by role. Update it whenever you add a component or change a
  file's responsibility.
