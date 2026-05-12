# Lesson, Workshop & Exercise Authoring

Rules for writing or editing content in `app/src/lessons/**/*.ts`. The
top-level harness requirement lives in [CLAUDE.md](CLAUDE.md). The
project is English-only — author plain strings, never `{ en, sv }`.
Everything else is here.

## Exercise tier (`kind: "exercise"`)

Each exercise lab needs a known-good solution in
[scripts/test-labs.ts](app/scripts/test-labs.ts)'s `SOLUTIONS` array —
student code that satisfies every user story. The harness mimics the
iframe runner: vm sandbox, console capture, `window.__userSrc`, and
runs every assertion exactly as the iframe would.

When the iframe runner itself changes (new globals exposed, capture
behavior), update the harness's sandbox setup to mirror the change so
the two stay in sync.

## Workshop tier (`kind: "js-workshop"`)

**No SOLUTIONS array entry needed** — the harness walks every workshop
slide and runs each step's authored `reveal` field through
`runWorkshopChecks` (the same function the React layer calls). The
reveal IS the canonical solution.

Authoring rule: **every step's `reveal` must pass that step's own
`checks`.** The harness fails the run if it doesn't. If you change the
runner itself (`app/src/runtime/workshopRunner.ts`), the runner-invariants
smoke test at the end of `test-labs.ts` should also be updated to cover
the new behavior.

## Values pill — exact vs any (`anyValues?: boolean`)

Every `JsWorkshopSlide` step and every `ExerciseSlide` renders a small
pill that tells the student up-front whether the values shown in the
spec are mandatory or just examples:

- **EXACT VALUES — keep the numbers as shown** (amber, the default).
  The checks pin specific numbers/strings/booleans from the spec. Don't
  set `anyValues` — the default is exact.
- **ANY VALUES — pick your own (same type)** (teal). The checks accept
  any value of the matching datatype. Set `anyValues: true` on the step
  or slide.

Author the flag based on **what the checks actually accept**, not what
the instruction text says. Per the workshop value-flexibility rule
(below), instructions always propose one concrete value as if required.
The pill is the student-facing signal of which mode the lab is in —
it replaces the old `FlexibilityHelpButton` "?" affordance so students
don't need to click anything to know.

The two are mutually exclusive: a lab is *either* exact-values *or*
any-values, never both. There is no third state. When in doubt, default
to exact — pinned-value tests are stricter and surface authoring
mistakes earlier.

## Design notes (author-only)

Both `JsWorkshopSlide` and `ExerciseSlide` accept an optional
`designNote?: string` — the Exercism `design.md` equivalent. The field is
**never rendered in the app**. It lives in source for the author's own
reference and for tooling (e.g. the course-review HTML) that surfaces it.

Write a design note when the slide's *intent* isn't obvious from the
checks alone. Useful things to capture:

- The lesson scope or angle the slide is meant to test ("L1 reassignment
  with numeric values — bank deposit").
- How this slide differs from its siblings (see the variety rule below).
- Surface choice and why ("bank account, not the chips' score/pi or the
  lab's custom names").
- Trade-offs between what's pinned and what's flexible.

A note is plain prose, authored on the slide itself. One short paragraph
is enough; longer if a topic-level walkthrough/challenge needs more
context. Author it inline on the slide rather than as a JSDoc block
above the export — the field is the canonical home.

## Variety rule (workshops and labs)

Every workshop within a lesson — and every lab/exercise within a lesson
— must differ from its siblings in **both** dimensions:

1. **Context (surface / scenario)** — what's the story? bank account,
   step counter, battery, coffee shop.
2. **What the student is asked to do** — what concept or skill is the
   activity testing? declare-and-log, operator mutation, multiple
   reassignments, string concatenation, template literals, bug-hunting
   a coercion, predicting a type, comparing strict vs loose equality,
   const-as-formula-constant, etc.

A swap of surface (city → bank → game → weather) is **not** enough by
itself. If the four workshops in a lesson all walk the student through
the identical pattern with only the variable names changed, it's filler
— students get bored. Each workshop/lab should teach or apply a
distinct piece of the lesson's scope.

The same applies between a workshop and its companion lab: the lab
should test a *different angle* than the workshop on the same surface
did. If the workshop walked through "declare-reassign-const-log" and
the lab does the same thing without scaffolding, the lab adds nothing.
Pick a different concept the lesson covers and build the lab around
that.

When you can't find four distinct angles within a lesson's scope, the
lesson probably doesn't need four workshops or four labs — collapse to
two or three rather than padding with repetition.

### Workshop value-flexibility rule

Default to **shape over value** for *values*. Workshop checks should
validate the *shape* of the student's code (used `let`, used a template
literal, the variable is a string/number/boolean, the source has a
reassignment) — not pin a specific value the student must type. Use
`typeof` asserts and structural `requirePattern` regexes; let the
student pick strings and numbers freely at the **check** level.

**Names are always pinned.** When the instruction proposes a variable
name ("Declare a `let` called `balance`..."), the check **pins** that
name. The student is using Monaco with autocomplete — typing `balance`
exactly costs nothing, and the consistency between instruction and
check keeps the lab debuggable. Name-flexibility was the freeCodeCamp
spelling-pain remedy; we don't have that pain. There is no flag for
name-flexibility — names are not configurable.

**Instruction style: write a direct directive, never a hedge.**
Even when the check accepts any value, the instruction text should
propose one concrete value as if it were required:

- Good: *"Declare a `let` called `city` and set it to `\"Stockholm\"`."*
- Bad:  *"Declare a `let` called `city` — set it to any string (e.g. `\"Stockholm\"`, but anything works)."*

The hedge belongs in the **ANY VALUES** pill, not the instruction. The
pill is always visible above each step / slide, so the student sees
which mode the lab is in without clicking anything. Two groups of
students get served by this split: those who want a preassigned value
follow the instruction directly; those who want their own read the
pill and substitute.

If a step *does* require a specific value because the value itself is
the teaching point (e.g., `100 - 25 === 75` to teach subtraction,
`8 % 2 === 0` to teach modulo, `Number.isNaN(0 / 0)` to teach NaN), the
instruction is the same direct style — and the check pins the value AND
the step is left as default (`anyValues` unset). The student sees the
**EXACT VALUES** pill and knows the numbers matter.

The forbidden combination is **vague instruction + value-pinning check**.
Don't write "use any number" then assert `=== 75`.

### Hint vs instruction (don't leak the answer)

Workshop steps accept an optional `hint?: Loc`. The student sees the
instruction by default; clicking "Hint" in the title row reveals the
hint inline.

**Authoring rule**: never put the literal answer (a full code line, a
formula, an expression like `balance + 250`) in the **instruction**. Put
it in `hint`. The instruction stays directional ("Increase `balance` by
a deposit. Log the new value."), the hint is the safety net.

The split lets two groups of students get served:
- Read the instruction, infer the code, and try it cold.
- Read the instruction, get stuck, click Hint, see the literal answer.

When in doubt: if removing the backticked code from your instruction
would make it ambiguous, the instruction was carrying the answer — move
that code to `hint` and rephrase the instruction to describe the
*intent* instead.

Naming a value (`balance = 1000`) inline is still fine when the value is
arbitrary — students seeing the **ANY VALUES** pill can substitute. But
a formula or an exact line of code never belongs in the instruction.

### Soft-introducing not-yet-taught concepts

When a workshop step uses a concept the student hasn't been formally
taught yet (e.g. `+` string concatenation in L1 W2 before strings are
covered, or template literals in L1 W3), explicitly soft-intro it in
the instruction text with a 1–2 sentence preview disclaimer. The
instruction grows, but the student isn't asked to type a black-box
token. Don't introduce a concept silently and rely on the regex to
"teach" it — that's a check pretending to be a lesson.

## Bullet points in narration

When authoring explanation narration, **always put bullet points on
their own line.** The bullet marker is `•` (a single character). The
renderer (`collapseSoftBreaks` in `ExplanationSlideView.tsx`) collapses
ordinary mid-paragraph `\n` to spaces but preserves any `\n` that is
immediately followed by `•` — so authoring like this just works:

```
"We use two keywords:\n• `let` — when the value MAY change.\n• `const` — when the value will not."
```

Don't run bullets inline with prose. Don't use `-`, `*`, or `–` as
bullet markers — only `•` is preserved.

## Chip puzzle ordering

`JsChipPuzzle` defaults to **strict left-to-right matching**: the placed
chips must equal `solution` slot-for-slot. Two opt-in mechanisms relax
this when the lesson semantics call for it:

- **`alternatives: string[][]`** — for partial symmetry. Each entry is a
  full alternative ordering of the same length as `solution`. Use when
  some slots are interchangeable but others (operators, separators) are
  position-locked. Example: L1 chips final puzzle accepts both
  `["let","=","const","="]` and `["const","=","let","="]` because the
  two declarations are semantically swappable, but `=` must stay in its
  operator slots.
- **`unordered: true`** — for full symmetry. The placed chips just have
  to match `solution` as a multiset; slot order is ignored entirely.
  Use only when ALL slots are interchangeable. Don't use on mixed-role
  puzzles — it would accept invalid orderings (e.g. `=` in a keyword
  slot).

If you reach for `unordered: true` and the puzzle has slots with
different semantic roles (keyword + operator, declaration + value),
that's the signal to use `alternatives` instead.

## Topic-level long-form: walkthroughs and challenges

Two ways to extend a topic with longer integrating content. Both reuse
existing schemas — they're not new tiers, just longer authored content
attached to the topic instead of a lesson.

### Walkthrough — long-form workshop (`Topic.walkthroughs[]`)

A `JsWorkshopSlide` attached at the topic level. Same schema as
lesson-level workshops (`runWorkshopChecks`, `requirePattern` + `assert`,
cumulative `reveal` chain). What changes is the audience and length:

- **Length**: 20+ meaningful steps. No filler — every step must teach or
  apply something distinct. Reps allowed only when reinforcement has
  pedagogical value (a parallel calculation that mirrors a learned
  shape, etc.).
- **Scenario**: one cohesive build that integrates concepts from across
  the topic's lessons. Students who finish all 4 lessons should see
  every concept resurface in the walkthrough.
- **Feedback**: console output via `console.log`. No UI, no DOM, no
  iframe — walkthroughs run through the same in-page workshop runner
  as lesson workshops.
- **Title**: prefix with `"Walkthrough: "` so `LessonTierMenu`'s
  prefix-strip stays consistent.

### Challenge — long-form exercise (`Topic.challenges[]`)

An `ExerciseSlide` attached at the topic level. Same single-shot,
freeform shape as lesson-level Labs. What changes:

- **Length**: 10+ user stories per challenge (entries in `tests`).
  Each user story is the student's "instructional step" — they read
  one, write code that satisfies it, see the box tick.
- **Scenario**: integrating, applied. Real enough to feel like a build
  but small enough to fit in one editor (50–80 lines of student code is
  typical).
- **Title**: prefix with `"Challenge: "`.
- **Harness**: requires a known-good entry in
  `app/scripts/test-labs.ts`'s `SOLUTIONS` array, same as lesson Labs.
  The `lessonId` for challenges follows a `topic-id` + `-` +
  `descriptive-slug` pattern (e.g. `variables-budget-tracker`); the
  harness resolves it by walking `topic.challenges[]` if no lesson
  matches.

### Test harness

Walkthroughs are validated by the existing workshop iteration —
the harness now walks both `lesson.slides` (filtered to
`kind: "js-workshop"`) AND every `topic.walkthroughs[]`. No new
machinery beyond what workshops already use.

Challenges follow the same SOLUTIONS pattern as lesson Labs.

## Tier prefix in slide titles

Workshop slide titles are authored with a leading `"Workshop: "` prefix;
exercise titles use `"Lab: "`. Topic-level long-form versions use
`"Walkthrough: "` and `"Challenge: "` respectively. The tier menu strips
these prefixes when rendering rows (`stripTierPrefix` in
[LessonTierMenu.tsx](app/src/components/LessonTierMenu.tsx)) so the card
header isn't doubly redundant. **Keep the prefix on the slide title** —
the renderer relies on it being there. New tier prefixes must be added
to the strip regex.
