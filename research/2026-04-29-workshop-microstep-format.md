# Workshop Micro-Step Format: Implementation, Trade-offs, and Outcomes

Research compiled 2026-04-29. 5 parallel research tracks (one re-dispatched after a tool-loading failure) synthesized into one document.

**Purpose**: Inform the design of a "Workshop" tier in Frontendkurser — a sequenced exercise where the student progresses through small steps (often one line at a time), each step independently checked, with code state **resetting** between steps. The pilot is a JavaScript conditionals lesson (`if`/`else if`/`else`). This research is the basis for the React component schema, the authoring contract, and the test harness extension.

**Sources**: ~90 web sources spanning platform engineering blogs, GitHub issues from open-source learning platforms, CS-education research (SIGCSE / ICER / ITiCSE / CHI), and learner forum threads. Primary-source grounding includes real fCC step files, real Exercism exercise layouts, Khan Academy's structured.js source, and the @freecodecamp/loop-protect package.

**Builds on**: [`2026-04-28-online-course-lesson-architecture.md`](./2026-04-28-online-course-lesson-architecture.md) (the four-tier ordering decision, hint/reveal mechanics, platform comparison). This document goes deeper on the Workshop tier specifically.

---

## Executive Summary

1. **CS-education research structurally favors RESET-per-step**; the only major persist-model advocate (freeCodeCamp) optimizes for *flow and engagement*, not for *transfer and retention*. Every formal pedagogy with controlled studies (fading worked examples, completion problems, Parsons, isomorphic problem pairs) uses reset-per-step by construction. Persist generates a documented stream of editable-region boundary bugs and "early-typo cascade" failures that are exactly the kind of demoralizing silent-corruption beginners cannot diagnose. **Recommendation: reset.**

2. **Hybrid grading is the production norm.** "Necessary-but-not-sufficient" pattern-matching (regex or AST: "did the student use the technique?") + runtime assertion ("does the result match?") is what ships at fCC, Khan Academy, and Hedy. Pure regex grading is the single most-cited source of learner frustration in this space (Codecademy's 10+ years of "my code works but the grader says wrong" complaints). **Recommendation: hybrid; runtime assertion is the gate, pattern is a guard against bypass.**

3. **Workshop must do new cognitive work that chips cannot.** Faded Parsons (Weinman 2021) significantly outperforms code-writing for *pattern* acquisition; plain Parsons (Hou 2023) shows no transfer advantage on posttest. The differentiator is whether the format requires *token-level production*, not just *structural arrangement*. **Recommendation: workshop = lexical recall + runtime error exposure + cross-step composition; chips = structural arrangement only. Different cognitive operation, not "chips in Monaco."**

4. **Surface-shift between chips and workshop is mandatory.** Variability of surface features (different identifier names, different domain wrapper) is what builds transferable schema; invariant surface features build only the specific instance. If chips uses `signal === "WALK"`, workshop should use `level <= 0` for the same control-flow shape. **Recommendation: enforce surface-shift as an authoring rule.**

5. **The blank-editor freeze is real and recurring.** Multiple multi-page fCC forum threads document learners who "completed everything" and still cannot write code from scratch. Workshop is a completion-rate intervention; freeform is the only level at which transfer can actually be measured. **Recommendation: do not let workshop become the terminal experience. Keep the existing freeform Exercise tier as the actual KPI; workshop precedes it but does not replace it.**

6. **Concrete UX defaults are convergent across the major platforms** — three-pane layout (instructions / editor / preview-or-tests), single primary advance button, failure-tied contextual hints (not always-on buttons by default), non-destructive failure (typed code is never auto-cleared), `Restart Step` reset, auto-advance on test pass. Boot.dev's gamified penalties (XP loss, streak reset on failure) are an outlier and pedagogically risky for beginners.

---

## Part 1: How real platforms implement Workshop-style UX

### freeCodeCamp (modern step curriculum)

The dominant micro-step implementation in the space — 100+ steps per project, mass-deployed.

| Aspect | Implementation |
|---|---|
| Layout | Three-pane: instructions left, code editor middle, live preview / tests right. Mobile collapses to tabs. |
| Editable region | `// User Editable Region` comment markers bracket the editable lines; everything outside is read-only in Monaco. Viewport auto-scrolls to the editable region on step load. |
| Advance | Single button "Check Your Code" (Ctrl/Cmd+Enter). On all-tests-pass: **auto-advance** to next step, no separate "Next" click. fCC: *"we scroll you to the part of your codebase where you need to add your next line of code."* |
| Hints | No always-visible hint button. On test failure, a context-specific message appears below the editor, tied to *which* test failed. Format is templated: `Expected to see X but seeing Y instead`. |
| Errors | Test failures → feedback panel below editor. Syntax errors → Monaco squiggles. Logical/test failures are not annotated in the editor. |
| Reveal | No first-class "show solution" button per step. Redesigned curriculum adds a Notes tab containing solution scoped to the next-step diff. Default hidden. |
| Reset | "Restart Step" button next to the file tab. Resets the editable region to that step's seed. Non-destructive to other steps. |
| Step counter | Project-level table of steps with completed steps highlighted blue. Students can jump to any step manually. |
| Failure handling | Non-destructive — typed code persists across failed Check attempts. Only `Restart Step` clears it. |

> "Once you get the tests for the step to pass, you will seamlessly move to the next step." — fCC redesign post

### Codecademy (numbered checkpoints in a single lesson)

| Aspect | Implementation |
|---|---|
| Layout | Three-pane (or up to five): narration pane left (lesson + numbered checkpoints), code editor middle, terminal/console right. |
| Checkpoints | Numbered list (1, 2, 3 …) on the left; each gets a checkbox that ticks on pass. |
| Advance | "Run" (top-right of editor) executes student code AND runs the checkpoint's SCT. On pass: current checkpoint check-marks, next checkpoint highlights. Final navigation via "Next" button (top-right corner since Nov 2024 redesign). |
| Hints | Two-step: first click of "Stuck? Get a hint" → partial nudge; continued failure → additional hints; ultimate fallback → "Get Unstuck" panel which may show the solution. |
| Errors | Surface in the terminal pane (right) and as inline error message at top of narration on failed Run. Editor itself does not annotate. |
| Reveal | "Get Unstuck" upper-right; expands to a panel that may show solution code, video, or Q&A. |
| Reset | "Reset Exercise" beneath the editor (circle-of-arrows icon). Each checkpoint has a saved initial+final state; reset returns to the **current** checkpoint's initial state, not the lesson start. |
| Failure handling | Code persists between Run attempts within a checkpoint. |

> "If students make a mistake … Codecademy will provide an error message and sometimes a few hints, but the student won't be able to move forward until they get it right." — Codecademy curriculum docs

### Boot.dev

The clearest example of *gamification-aware* UX, and the only studied platform that penalizes failure beyond "try again."

| Aspect | Implementation |
|---|---|
| Layout | Two-pane: lesson markdown left, editor right with tabbed bottom panel for Output / Tests. |
| Advance | Two distinct buttons: gray ▶ Run (subset of tests, no submission) vs gold ▶ Submit (all tests; counts as a submission). Submit-pass marks complete; **manual** click of right-arrow advances to next lesson. |
| Hints | No traditional hint button. A sidebar AI chatbot **"Boots"** is "trained not to give you the answer" but gives "pointed hints." Always available. |
| Errors | Bottom output panel (red), with which test failed and expected vs actual. |
| Reveal | Per-lesson "instructor solution" tab. Cost: viewing solution before completing the lesson **loses ALL XP** for that lesson, unless student spends a "seer stone" (consumable). |
| Failure penalty | Submit failure resets the sharpshooter spree counter to zero. With armor, one piece is consumed instead. Code itself is NOT reset. |
| Step counter | Linear chapter/lesson tree on far-left sidebar; checkmark on completion. |

The Run-vs-Submit split exists *because of* the gamification layer: students can iterate on Run without paying the streak/XP cost. Without gamification, the split adds complexity without benefit.

### Khan Academy (coding challenges)

| Aspect | Implementation |
|---|---|
| Layout | Three-panel: instructions top-left, editor right/bottom, console below. |
| Advance | "Run" executes program AND evaluates StructuredJS assertions. On pass: step's title check-marks and next step's description appears. Auto-advance. |
| Hints | Failure-triggered messages, not on-demand. Author-written per step per failure mode. |
| Errors | Inline near the instruction panel (`"Hm, it looks like you changed the original code, but you should be writing new code instead."`). Syntax/runtime errors → console. |
| Reveal | No first-class "show solution" button. Community/forum hints only. |
| Reset | "Start Over" + an undo (curved arrow) near the editor. |
| Failure handling | Non-destructive. Khan explicitly guides students to undo rather than retype. |

### DataCamp

| Aspect | Implementation |
|---|---|
| Layout | Top: title + Context section + numbered Instructions list. Right: code panel with `script.py` (editable) and hidden `solution.py`. |
| Advance | Two buttons: "Run Code" (executes, no progression) and "Submit Answer" (Ctrl/Cmd+Shift+Enter; runs SCT, advances on pass). |
| Hints | "Show Hint" (`Ctrl+H`). One press → hint, second press of same shortcut → solution. Hints authored to "get students ~50% of the way to the answer." |
| Errors | "Incorrect Submission" feedback heading + message that "directs students to problem areas and highlights errors." First error only. |
| Reveal | Two-step disclosure (hint → solution) via the same shortcut. |
| Failure handling | Code persists between Submit attempts. |
| Auto-advance | Submit-pass auto-advances. |

### JetBrains Academy / Hyperskill

| Aspect | Implementation |
|---|---|
| Layout | Two-pane: theory + problem statement left, embedded editor + I/O right. |
| Advance | Single "Check" button. On pass: green success, "Solve next" reveals next topic. On fail: red "Wrong answer". |
| Hints | Below editor in a Comments section — community-authored, not platform-authored. |
| Errors | "Download the failed test" button below the editor lets the student grab the failing input. |
| Reveal | "Get unstuck" → Solutions tab showing other learners' submissions. **Available on most stages except the last** (deliberate gating). |
| Failure handling | Code persists. |

### Scrimba (challenge scrims)

Video-first, recorded-edit format ("scrims" are recorded keystroke + audio events). Auto-pauses and switches editor to edit mode at challenge points. Most scrims have **no automated test gate** — student edits, clicks Run, manually advances. After completing a challenge, students "compare your solution with the one provided by the expert" by playing the instructor's solution scrim side-by-side.

### Educative

Inline editable code playgrounds embedded in markdown prose. Run button per playground. For graded coding challenges (separate format): Run = public test cases, Submit = full tests + advance. Has both "Show Hint" and "Show Solution" buttons.

### Cross-platform convergent defaults

| Mechanic | Convergent default |
|---|---|
| Layout | Three-pane: instructions / editor / preview-or-tests |
| Primary advance | One button below editor, named "Check"/"Run"/"Submit"/"Check Your Code" |
| Auto-advance on pass | Yes (fCC, Khan, DataCamp, Codecademy checkpoints). Manual click only on Boot.dev, Scrimba, Hyperskill. |
| Failure | **Non-destructive across every platform studied** — typed code never auto-clears |
| Hints | Failure-derived contextual (fCC, Khan, DataCamp) is the dominant pattern; always-available is a layered fallback (Codecademy, Boot.dev, Educative) |
| Reveal | Always gated — by cost (Boot.dev XP), by progress (Hyperskill), by two-click confirmation (DataCamp, Codecademy), or absent entirely (Khan, fCC steps) |
| Reset | Discrete user-initiated button near the editor; resets to current step's seed only |
| Step counter | Visible: numbered list (Codecademy), step table (fCC), sidebar (Boot.dev, Hyperskill), inline (Khan) |
| Locked region | Common — fCC's `// User Editable Region` markers, DataCamp's `____` blanks, Khan's "don't edit seed" rule |

### Key divergence points

| Choice | Implication |
|---|---|
| Run vs Submit split | Worthwhile *only* if there's meta-progression (XP/streaks) — Boot.dev, DataCamp. For a beginner-friendly conditionals lesson, combined "Check" is simpler. |
| Auto-advance on pass | Reduces friction; manual gives a celebrate-and-read moment. fCC's auto-advance is the more popular choice. |
| Failure penalty | Boot.dev's XP/streak hit is unique and pedagogically risky for absolute beginners. Pure non-destructive failure is the norm. |
| Locked vs free editor | Locked region best for one-line steps; free editor best when student assembles a full file. |

---

## Part 2: Reset vs Persist — the architectural decision

### What the production platforms do

- **PERSIST**: freeCodeCamp. One growing file, editable region narrows per step. Student state carries forward.
- **RESET-shaped**: Codecademy, Boot.dev, DataCamp, Hyperskill. Each exercise/checkpoint has its own authored starting snapshot.
- **HYBRID**: fCC's "editable region" is *persist with reset-like guarantees enforced via UI* — the platform locks everything outside the typeable region so the student can't damage future steps.

### What the literature does

Every formal CS-education pedagogy with controlled studies behind it uses reset-shaped formats by construction:

- **Fading worked examples** (Renkl & Atkinson 2003): "the first task was a completely worked-out example. In the second task, the last solution step was omitted. In the third task, the last two steps were omitted." Each task is a fresh problem with the author controlling the starting point.
- **Completion problems** (Paas; van Merriënboer): partial worked example → student fills in the rest. Each is a separately-authored unit.
- **Parsons problems**: each is a fresh authored set of fragments.
- **Faded Parsons** (Weinman et al. CHI 2021): each problem reset; what fades across problems is the *amount of scaffolding*, not the carry-over of state.
- **Isomorphic problem pairs** (transfer research): same structure, different surface, no shared state.

### Arguments for PERSIST

- **Realism** — real coding has cumulative state.
- **Flow / continuity** — Quincy Larson: *"Our goal is for you to be able to get into a flow state and stay there. We want you to blast through dozens of these steps."* Auto-scroll-to-next-edit only works under persist.
- **Less per-step cognitive overhead** — student doesn't re-read code they already wrote.
- **Authoring efficiency at the happy path** — one solution file with marked editable regions; each step's "starting state" is implicit.
- **10+ years of large-scale deployment** at fCC.

### Arguments for RESET

- **Each step is independently checkable** against a known authored input — no "did step 3 pass because step 2 left a stale variable around?"
- **No early-typo cascade** — fCC's issue tracker carries a steady stream of editable-region boundary patches ([#52962](https://github.com/freeCodeCamp/freeCodeCamp/issues/52962), [#54402](https://github.com/freeCodeCamp/freeCodeCamp/issues/54402)) precisely because cumulative-state failures from earlier mistakes are hard for students to debug.
- **Aligns with the evidence base** (fading, completion, Parsons all use it).
- **Functions as repeated retrieval practice** — each step is a small "what comes next?" cue against a stable known state ([Retrieval Practice Transfer Guide](https://pdf.retrievalpractice.org/TransferGuide.pdf)).
- **Easier to skip/jump** — peek at step N+1 = peek at step N's solution.
- **Easier to author edge-case-correctly** — assertion runs against one guaranteed input, not against all-the-things-the-learner-could-have-done-in-prior-steps.
- **Easier for the learner to experiment without fear** — break stuff in step 3 without worrying about step 7.
- **Eliminates the silent-corruption failure mode** by construction — the demoralizing class of failure where a student "did everything right" but fails step 7 because of an invisible deviation in step 2.

### Frustration data

**Persist-model complaints (well-documented):**
- "Many learners were confused about which line to edit" — recurring fCC issue requiring per-step editable-region patches.
- "All functionality seemed to work, but the system was still saying something was wrong" — classic symptom of an assertion checking cumulative state where the learner's earlier deviation is invisible.
- *"FreeCodeCamp completely avoids providing any insight, breakdown, or even direction… For beginners who don't know how to navigate or what to look for, this approach is frustrating, ineffective, and counter-productive"* ([fCC #13657](https://github.com/freeCodeCamp/freeCodeCamp/issues/13657)).

**Reset-model complaints (much thinner):**
- The Codecademy complaints I found are about the reset *mechanism* (bulk-reset missing, save bugs), not the reset *model*. **No prominent complaint pattern of "I wish my code carried over to the next exercise."** The frustration pattern is reversed: bugs where state got lost unexpectedly.

### Authoring cost

- Real but small for a solo author at workshop scale: **step N's starting code = step N-1's solution** (mostly mechanical). The marginal cost over persist is low if you author top-down.
- fCC's persist model trades upfront-authoring savings for ongoing-maintenance overhead in the editable-region issue tracker.
- No quantitative author-hours-per-step benchmark exists in the literature.

### Verdict

**Adopt RESET.** The literature converges on reset-shaped formats for transfer and retention; the only countervailing voice is fCC, which optimizes for engagement (a different outcome variable). The failure mode of persist (silent cumulative corruption from an early invisible deviation) is exactly the kind of demoralizing failure absolute beginners cannot diagnose. The authoring overhead is real but small.

**One concession to the persist model**: per-step the editor *within* a step persists across failed Check attempts (non-destructive failure). Reset is between steps, not within.

---

## Part 3: Authoring patterns and content schemas

### Real schemas observed

#### freeCodeCamp — one Markdown file per step

A single fCC project ("Pyramid Generator") = **118 step files**. Each is a self-contained `.md`:

```markdown
---
id: 660ee6e3a242da6bd579de69
title: Step 2
challengeType: 1
dashedName: step-2
---

# --description--

Use the `let` keyword to declare a variable called `character`.

# --hints--

You should use `let` in your code.

```js
assert.match(__helpers.removeJSComments(code), /let/);
```

You should use `let` to declare a `character` variable.

```js
assert.match(__helpers.removeJSComments(code), /let\s+character/);
```

# --seed--

## --seed-contents--

```js
--fcc-editable-region--

--fcc-editable-region--
```
```

Key properties:
- **The hint description IS the assertion's failure message.** They live as adjacent siblings in the markdown — you cannot author one without the other. This forces hint-specificity to match assertion-specificity.
- **Every step's `--seed--` carries the full prior code state**, with only the editable region narrowed. fCC chose **duplication over reference** — it makes each step file independently runnable and inspectable.
- **3–5 assertions per step is typical**, ranging from "does code contain `let`?" to behavioral "does the function return the right value?".

#### Exercism — concept exercise (8 files)

```
exercises/concept/lasagna/
├── .docs/
│   ├── introduction.md   (teaches the concept)
│   ├── instructions.md   (numbered task list)
│   └── hints.md          (unstucking aids, by task heading)
├── .meta/
│   ├── config.json
│   ├── design.md         (author-only; learning objectives, scope, prerequisites)
│   └── exemplar.js       (idiomatic reference solution)
├── lasagna.js            (student stub)
└── lasagna.spec.js       (Jest tests)
```

Hints organize by task and **link to MDN docs, not solution code**:

```markdown
## 2. Calculate the remaining oven time in minutes

- [Explicitly return a number][return] from the function.
- Use the [mathematical operator for subtraction][operators] to subtract values.

[return]: https://developer.mozilla.org/...
```

`design.md` is author-only — not shown to students — and lists learning objectives and out-of-scope topics. This is the closest existing equivalent to a "what is this step supposed to teach" annotation.

#### Hedy — keyword-substitution i18n

Lesson YAML lives in `/content/<lang>.yaml`. Keywords stay in `{print}` placeholders and get filled from a central translation table at runtime. So one source-of-truth lesson per language, but keywords stay synchronized as the language evolves.

### Step granularity norms

| Platform | Step size | Per-project count |
|---|---|---|
| fCC practice projects | 1 token to ~5 lines | **~100–150 steps** per project |
| fCC older Basic JS | a function or block | ~110 challenges |
| Exercism concept exercise | 2–4 tasks, 10–40 LOC | One exercise = one concept |
| Codecademy lesson | 1–3 lines per checkpoint | Several per lesson |
| Hyperskill stage | 5–15 min of work | 4–7 stages per topic |
| Parsons research | 1–10 min per problem | n/a |

**For Frontendkurser**: fCC's micro-step granularity (1 token to ~5 lines per step) has the most evidence of success for absolute beginners. Aim for **5–10 steps per workshop slide** for a conditionals lesson; that's roughly 5 minutes of work, matching the existing 3–5 min per tier target from the prior research doc.

### Instruction-text patterns

All platforms converge on **second-person imperative** and forbid "I/we/let's." Concrete patterns observed:

- **Single-sentence imperative + optional note** (fCC): *"Use the `let` keyword to declare a variable called `character`. _Note_: It is common practice to end statements in JavaScript with a semicolon."*
- **Pure constraint when state already exists** (fCC): *"Change your `"Hello"` string to use single quotes."*
- **Show expected output as a code block when behavior is the goal** (fCC):
  > "When done correctly, you should see this output in the console.
  > ```
  > [ "London", "New York", "Mumbai" ]
  > ```"
- **Narrative framing + numbered task headings + example call** (Exercism):
  > "Implement the `remainingMinutesInOven` function that takes the actual minutes the lasagna has been in the oven as a *parameter* and *returns* how many minutes the lasagna still has to remain in the oven.
  > ```
  > remainingMinutesInOven(30); // => 10
  > ```"

fCC's contributor docs require: paragraphs 1–4 sentences, code identifiers in backticks, `<dfn>` tags around terms when first introduced, sample inputs/outputs as fenced blocks not inline.

### Hint-authoring patterns

**fCC: one hint per assertion, embedded as the assertion's description.** Hint and test are the same artifact. Pros: hints are guaranteed to match what's tested. Cons: no general "I'm stuck" hint — only assertion-specific ones.

**Exercism: hints organized by task; bullets link to docs, never spell out code.**

**No platform auto-generates hints.** Hints are always pre-written.

### Authoring tools / workflows

| Platform | Tool | Source format |
|---|---|---|
| fCC | Plain text editor + git PR. CLI `npm run build:curriculum` validates frontmatter and runs assertions. | Markdown |
| Exercism | `configlet` CLI (Nim) — lints config.json, generates README, validates schema. | Markdown + JSON |
| Hedy | Web UI for non-dev authors; Weblate for translation; YAML for built-ins. | YAML |
| Codecademy / Boot.dev / Hyperskill | Proprietary internal editors. | Not public |

For a solo dev, the **fCC model is the most copyable** (one file per step, validated by a script). Frontendkurser's existing TS-as-data approach is even simpler — skips Markdown parsing entirely.

### Internationalization

**For Swedish + English**: Hedy's keyword-substitution model is overkill (JS keywords are universal). The fCC pattern fits: one slide object per language, or a `text: { sv, en }` discriminated union per field. Translate `instruction`, `hint`, `description` strings; never translate code identifiers.

This matches the existing `Loc` type pattern already used throughout Frontendkurser.

### Recommended schema for `JsWorkshopSlide`

Distilled from fCC's step format + Exercism's separation of concerns + Frontendkurser's existing conventions:

```ts
type WorkshopStep = {
  /** Stable id for progress tracking. */
  id: string;
  /** Markdown-ish, second-person imperative. "Add a return inside the if block." */
  instruction: Loc;
  /** The full pre-state code at the start of THIS step (RESET model — ignore prior step's mutations). */
  starterCode: Loc;
  /** Optional: a [from, to] line range that's editable; outside is locked. */
  editableRange?: [number, number];
  /** One or more checks. Per fCC: hint description doubles as failure message. */
  checks: Array<{
    /** What the student sees on failure — IS the hint. */
    message: Loc;
    /** Either pattern-match on source, runtime assertion, or both (hybrid). */
    requirePattern?: RegExp;
    assert?: string;
  }>;
  /** Optional reveal — what the code should look like AFTER this step (used as next step's starterCode and as the "show me" affordance). */
  reveal?: Loc;
};

type JsWorkshopSlide = {
  kind: "js-workshop";
  title: Loc;
  prompt: Loc;       // workshop-level intro (Exercism's introduction.md equivalent)
  varNames?: string[];
  steps: WorkshopStep[];
  legend?: LegendEntry[];
  /** Author-only, not rendered. Lists what the workshop is supposed to teach. From Exercism's design.md. */
  designNote?: string;
};
```

**Authoring rule**: each step's `starterCode` is mostly equal to the previous step's `reveal`. This is mechanical and amenable to an authoring helper — but **author it explicitly**, never compute it from the previous step at runtime (RESET, not implicit-persist).

---

## Part 4: Assertion / checking strategies

### The two camps

- **Behavior-checkers**: freeCodeCamp, Boot.dev, Exercism — run student code, inspect outputs/calls.
- **Structure-checkers**: Khan Academy (AST via [structured.js](https://khan.github.io/structuredjs/)), classic Codecademy (regex on source).

### Strategy inventory

#### Regex / source-pattern

Used heavily by Codecademy (legacy), freeCodeCamp, and many MOOC graders.

Real fCC patterns from `curriculum-helpers`:

```js
// Detect a for-loop with var/let/const init
assert.match(code, /for\s*\(\s*(var|let|const)\s+\w+\s*=/);

// Detect a function declaration with a parameter
const re = __helpers.functionRegex("addTwo", ["a", "b"]);
assert.match(code, re);

// Strip comments BEFORE pattern matching
const cleaned = __helpers.removeJSComments(code);
assert.match(cleaned, /\.filter\s*\(/);
```

fCC ships purpose-built helpers because raw regex on source fails too often. Helpers include `removeJSComments`, `removeWhiteSpace`, `permutateRegex`, `concatRegex`, `functionRegex(name, params, body?)`.

**Documented failure modes:**
- **False positives**: `assert.match(code, /for/)` matches `// I will use a for loop later`. fCC's `removeJSComments` exists exactly for this.
- **False negatives**: [fCC #41951](https://github.com/freeCodeCamp/freeCodeCamp/issues/41951) — multi-line method chains break the regex because `removeJSComments` introduces unwanted whitespace. [fCC #40277](https://github.com/freeCodeCamp/freeCodeCamp/issues/40277) — `for (i=0; i<n; i++)` (no declaration keyword) fails the standard pattern.

#### AST / structural matching

Khan Academy's [structured.js](https://github.com/Khan/structuredjs):

```js
const structure = function() {
  if (_) {                          // _ = wildcard
    _ += _;
    for (var $a = _; $a < $b; $a += _) {  // $a binds an identifier
      _($a, $b, 30, 30);
    }
  }
};
const ok = Structured.match(code, structure);
```

- The matcher requires only that code *contain* the structure — extra code has no effect.
- `varCallbacks` give per-binding validation with structured failure messages (`{failure: "The increment must be smaller than the number."}`).

KA's release strategy: start strict, loosen via observed feedback. They explicitly accept that a `for` pattern needs to grow to also match `i+=1` vs `i++`, `let` vs `var`, etc.

AST matching gives whitespace/comment/semicolon insensitivity for free, and lets you check "the user wrote a `for` loop" without false positives like `// for loop` in a comment. Cost: a parser dependency (Esprima/Acorn/Babel) plus graceful handling of parse errors in mid-typing student code.

#### Runtime test execution

freeCodeCamp's runner: iframe with `sandbox="allow-scripts allow-same-origin"`, Chai assertions in the iframe context, results via `postMessage`. Tests access user code as a `code` string AND any `globalThis` exports.

Exercism: out-of-process Docker per language, 100% CPU, 3 GB RAM, **20 s timeout**. Per-track runner repos (e.g. `exercism/javascript-test-runner` wraps Jest).

Boot.dev's Run vs Submit: Run executes a subset of tests, Submit runs all (including hidden edge cases).

#### Hybrid

This is the dominant production pattern. The standard logic is **"necessary but not sufficient"**: the regex/AST gate ensures the student is using the technique being taught; the runtime gate ensures it actually works. If you only check behavior, students bypass the lesson ("I solved the for-loop exercise with `arr.reduce`"). If you only check structure, students write code that matches the regex but doesn't compute anything.

Typical fCC hybrid step:

```js
// Structural gate
assert.match(code, /const\s+/);

// Behavioral gate
assert.strictEqual(myFn(2), 4);
```

### Failure-mode catalog

#### False positives (test green on wrong code)

- Vacuous regex matching commented-out or string-literal code (`const s = "for (let i=0)"`).
- `structured.js` looseness — because the matcher requires only that code *contain* the structure, dead-code copies pass: a student can paste the example pattern verbatim and add their actual (wrong) solution alongside it.

#### False negatives (test red on correct code)

- **Codecademy line-of-instruction strictness**: 10+ years of forum complaints about whitespace, return-vs-print, string-literal exact-match.
- **fCC `for` short syntax** (#40277): `for (i=0; i<n; i++)` fails the regex even though it runs.
- **fCC method-chain on multiple lines** (#41951): `arr\n  .filter(...)\n  .map(...)` fails after `removeJSComments` mangles whitespace.
- **`forEach` vs `for`**: fCC's "Iterate Through an Array with a For Loop" challenge requires `for`; using `forEach` is rejected. This is **intentional false-negative-by-design** — a teaching choice, not a grader bug.

#### Hint exploitation

- Answer banks exist (e.g. [ummahusla/Codecademy-Exercise-Answers](https://github.com/ummahusla/Codecademy-Exercise-Answers), [JuniorDevCentral's complete fCC answer list](https://www.juniordevelopercentral.com/codecademy-javascript-answers/)).
- Test source visible in DevTools — students reading the iframe's source can see the regex.
- Brute-force iteration: paste-test-modify until green.

**Mitigation patterns:**
- Hidden tests on Submit (Boot.dev): students can't tune to tests they haven't seen.
- Multiple distinct assertions (fCC): one regex + one runtime + one edge case — harder to game all three without solving.
- Behavior-only grading (Exercism): no source pattern to read, only test cases with deliberately wide inputs.

### Beginner-friendly errors (Elm, Hedy)

**Elm**:
- Concrete source-location pointers (caret under offending token).
- Show *example correct code* alongside the error.
- "Did you mean ___?" with edit-distance suggestions for misspelled identifiers.
- Embed *links to documentation* in the error.

**Hedy**:
- Avoid blame words: never "illegal", "invalid", "bad". Frame the computer as the confused party.
- Anthropomorphic voice: *"We detected that…"*, *"I don't understand…"* — research-justified for child learners.
- Skipping faulty code (Hedy 2023 research): when a line errors, the transpiler emits a runtime stub that prints a helpful explanation but lets the rest of the program run.

**Practical translation strategies for Frontendkurser**:
1. **Catch and rewrite**: wrap student code in try/catch; intercept `error.message` and replace common patterns:
   - `Cannot read properties of undefined (reading 'x')` → "You tried to read `.x` on something that wasn't there."
   - `is not a function` → "You tried to *call* something that isn't a function."
   - `Unexpected token` → "JavaScript got confused at this point. Often a missing `)`, `}`, or `;`."
2. **Highlight the offending line**: `error.stack` includes a line number; map it back to the editor.
3. **Show assertion's intent in plain English alongside the failure** — fCC's pattern of `--fcc-expected--` / `--fcc-actual--` template substitution.

### JavaScript-specific concerns

#### Top-level `let`/`const` not on `window`

`<script>let x = 1;</script>` does NOT make `window.x === 1`. Platform responses:
- **fCC**: tests have access to user source as a `code` string, so `assert.match(code, /let\s+x/)` proves declaration. For *value*, fCC asks the student to attach to `globalThis.x`.
- **Practical pattern for Frontendkurser** (more elegant): AST-rewrite via Acorn — parse the user code, find top-level `VariableDeclaration`s, append `globalThis.foo = foo` for each binding. Lets `let`/`const` values be inspected at runtime without asking the student to write magic globals.

#### Loop / runaway protection

| Approach | Threshold | Notes |
|---|---|---|
| Frontendkurser today | 10 000 iterations | Catches ordinary infinite loops; misses *slow* infinite loops |
| JSBin / fCC | 100 ms wall-clock (Babel AST) | Drop-in: [`@freecodecamp/loop-protect`](https://www.npmjs.com/package/@freecodecamp/loop-protect) |
| Replit | iteration count AND ms; `setTimeout` guard resets timer for async yields | Most sophisticated |
| Exercism | 20 s whole-process | Out-of-process Docker |

**Recommendation for Frontendkurser**: switch to time-based via `@freecodecamp/loop-protect` — it's a drop-in Babel plugin, is more robust against slow infinite loops, and async-safe via the JSBin pattern. Keep the iteration counter as a secondary fallback.

### Multiple-correct-solutions problem

For workshop micro-steps, the choice depends on the step's pedagogical goal:
- "Demonstrate the `for` loop syntax" → enforce structure (regex or AST).
- "Solve this transformation" → enforce behavior, accept any approach.
- Most lessons benefit from a **hybrid**: structure ("use map") + behavior ("…and produce this output").

### Recommended assertion stack for Frontendkurser Workshop

1. **Default to hybrid**: each step has ≥1 `requirePattern` (or simple AST check via Acorn) AND ≥1 `assert` runtime check.
2. **Allow pattern-only steps** for early steps where there's no behavior to check (e.g. "type `let count = 0`").
3. **One hint per assertion** (fCC pattern). The hint message is the failure message.
4. **Wrap native errors** with a small translation table for the top ~20 beginner errors.
5. **Switch the loop guard** to `@freecodecamp/loop-protect` (time-based, Babel transform). 100 ms is a reasonable budget for beginner labs.
6. **Update `scripts/test-labs.ts`** to walk `JsWorkshopSlide.steps[]` with per-step solutions (one canonical code state per step, the `reveal`). The CLAUDE.md harness rule applies — no green run, no claim of "ready."

---

## Part 5: Learning outcomes, frustration, and format positioning

### Does this format actually produce learning?

**Evidence FOR (when used correctly):**
- **Faded Parsons** beats code-writing for *pattern* acquisition (Weinman et al., CHI 2021, n=237) — students preferred the format and posttest performance was significantly higher.
- **Worked examples + faded steps** is the most robustly supported sequence in cognitive-load theory (Renkl & Atkinson 2003; Kalyuga 2007).
- **van Merriënboer's 4C/ID** model recommends a "sawtooth" support pattern matching chips→workshop→freeform exactly.
- **Persistence effects for low-confidence learners** (Hou et al. 2023): low-self-efficacy students *abandoned* unscaffolded write-code problems but completed scaffolded ones (U=442.5, p<.001, CLES=.81). Workshop is a retention/persistence intervention for absolute beginners even if its transfer impact is modest.

**Evidence AGAINST (the warnings):**
- **No transfer effect on posttest for plain-Parsons-as-scaffold** (Hou et al. 2023, arXiv 2311.18115). Scaffold helped students *during practice* but the posttest gap closed. Read literally: workshop may improve completion rates without improving post-lesson skill.
- **Only 51% of scaffolding usage successfully helped students complete the corresponding write-code problem** (same study).
- **Productive Failure** (Suriyaarachchi/Denny/Nanayakkara, SIGCSE TS 2025): for Python lists with novices, problem-first then instruction produced **better delayed retention** than direct instruction. Pure scaffolding can miss this benefit.
- **The blank-editor freeze is empirically real and recurring**:
  > "finished the course and the assignments etc, then wandered off feeling like nothing had stuck." — donyd, fCC forum
  > "I feel like Free Code Camp isn't actually teaching me anything." — FletcherMartin, fCC forum
  > "I can't build projects on my own. I started to build a projects, and nothing works." — gururajankappa, fCC forum

### What can we conclude?

Workshop micro-step is a **good intervention for completion rate, time-efficiency, and pattern acquisition in low-self-efficacy beginners**. It is **not, by itself, sufficient for transfer**. The empirical literature converges on: workshop must be *paired with* (a) genuine fading, (b) varied surface features, and (c) at least one unscaffolded (freeform) attempt per concept — otherwise the gain is mostly perceived, not real.

The Productive Failure result suggests delayed retention specifically requires struggle that workshop alone removes.

**Practical implication for the four-tier order**: chips→workshop→freeform is well-supported as scaffold-fading. The risk is that workshop becomes the *terminal* experience for tired learners who skip freeform — at which point you've shipped completion theater. **Make freeform feel cheaper (smaller scope) so it doesn't get skipped.**

### Frustration pattern catalog (workshop-tier-relevant)

#### "I'm doing it but not learning" (instruction-following anxiety)

> "im doing the projects but I just feel like Im using the hints/solutions too much. im scared im not actually learning anything." — JessicaJac, fCC forum

> "These courses however, does not teach me anything. The hints aren't helpful, I cant get anywhere on it." — christopherscalf97, fCC forum

#### "My code works but the grader says wrong" (very high frequency)

Codecademy alone has at least eight forum threads with this exact title. Root causes: whitespace, return-vs-print, narrow test inputs, exact-match strings.

> "Some courses have validation issues where additional whitespace or the position of a curly brace will cause the interpreter to fail."

This is a direct design hazard for Workshop tier — assertions need to be either tolerant or spec'd so tightly that students don't get false negatives.

#### "Instructions are unclear / language is obtuse"

> "The language used in the instructions is often obtuse and confusing. The bot gives very bad feedback when you enter an incorrect solution. Most of the time it's meaningless, or actively distracts from the correct method." — totaleclipse, fCC forum

Workshop-tier hazard: "now declare a variable to hold the count" leaves beginners unsure if "declare" means `let`, `const`, `var`, or anything in scope. **Authoring rule**: name the keyword.

#### "Too much hand-holding / I'm just typing what I'm told"

Mostly from intermediates, not absolute beginners. Indicates: workshop should fade by chip-set L6+ or it actively annoys returning users (expertise reversal effect — Kalyuga 2007).

### Format positioning

#### Workshop vs Chips — pedagogical justification for both

Different cognitive operations:
- **Chips/Parsons** scaffold *plan composition* — sequencing, control flow, sub-goal ordering. Student doesn't have to recall syntax; they recall structure.
- **Workshop** scaffolds *syntax production* — identifier choice, operator selection, exact-token recall. Cognitive demand is lexical, not structural.

If your chips tier is **plain Parsons (no blanks)**, workshop is doing genuinely new pedagogical work — surfacing token-level recall that drag-only chips suppress. **Verdict: not redundant.**

If your chips tier already has fill-in-the-blank chips, workshop is closer to redundant on the cognitive axis and must justify itself on a different axis (typing-in-an-editor habituation, error message exposure, surface variability).

#### Workshop vs Freeform

- **Workshop** controls cognitive load — one operation at a time. Beneficial for novices.
- **Freeform** forces integration — must orchestrate everything at once. The only level at which blank-editor freeze is detectable; per Suriyaarachchi 2024, struggle precedes durable retention.

Workshop *replaces* freeform = tutorial hell risk. Workshop *precedes* freeform = textbook scaffold-fade.

#### Sequencing within a lesson (chips→workshop→freeform)

Supported by:

1. **4C/ID sawtooth** (van Merriënboer): high-support → low-support within a task class. Three fade levels matches the model's typical implementation.
2. **Renkl & Atkinson fading**: progressive removal of worked steps.
3. **PRIMM** (Sentance): Predict-Run-Investigate-Modify-Make. Workshop maps cleanly to **Modify**; freeform to **Make**. Chips/Explanation cover Predict-Run-Investigate. **This is the most direct pedagogical fit for the four-tier structure** — and it's the same framework the prior research doc identified.
4. **Productive Failure caveat** (Suriyaarachchi 2024): delayed retention is best when problem-solving precedes instruction *at least sometimes*. **Implication**: at least one chip-set per concept-cluster should put freeform *first* (or have a freeform "preview" attempt that is allowed to fail). Pure chips→workshop→freeform across all 15 chip-sets risks losing the PF benefit.

### Surface-shift recommendations

To prevent "didn't I just do this?":

1. **Vary surface features between chips and workshop.** If chips uses `signal === "WALK"`, workshop targets `level <= 0` for the same control-flow shape. Isomorphic-transfer research (Holyoak; ICER 2024 "Quickly Producing Isomorphic Exercises") shows variant surface features build the schema; invariant surface features build only the specific instance.
2. **Different cognitive operation, not different skin.** Chips = structure; workshop = syntax/identifier. If your chips already include blanks, workshop must add something *else* — typing-in-Monaco, error messages, multi-step composition.
3. **Larger semantic unit per workshop step.** If a chip drag is one statement, a workshop step should require composing 2–4 statements that the chips taught individually (chunking up within the fade — same Renkl/Atkinson principle).
4. **Different domain wrapper.** Chips teaches `if (signal === "WALK")` in a crosswalk context; workshop applies the same conditional shape in a wardrobe/temperature context.
5. **Show the error feedback loop.** Chips usually validate by drop position; workshop should show genuine runtime errors (`ReferenceError`, `Cannot read property`). The lesson of the workshop tier is partly "errors are normal" — chips can't teach that.

### Differentiating workshop from chips-in-Monaco

The single most important differentiator from the literature: **workshop should require typing of identifiers/operators that chips supplied as immutable tokens.** That is the qualitative cognitive shift; everything else is style.

Authorial test: *can a student who completes the workshop fail the chip-set above it?* If yes, workshop is genuinely doing different cognitive work. If no, it's mostly redundant.

---

## Contradictions & open questions

1. **fCC's flow-state argument vs CS-ed research.** fCC cites engagement and flow as the design driver. The academic literature (worked-example, fading, completion-problem effects) consistently uses reset-shaped formats. Both can be right — fCC optimizes for *engagement and persistence*, the academic work optimizes for *transfer and retention*. Different outcome variables.

2. **Hou 2023 (no posttest difference) vs Weinman 2021 (large posttest gain).** Reconciliation: Faded Parsons is a different intervention from plain Parsons-as-help. Faded Parsons forces token-fill, not just arrangement. Workshop micro-steps with blanks are closer to Faded Parsons than to plain Parsons → likely closer to Weinman's positive result.

3. **Worked examples favor scaffolding for novices; productive failure favors struggle for novices.** Reconciliation in Sinha & Kapur (2021): PF works *when problem-solving is framed as preparation for upcoming instruction*, not as a graded test. Workshop is graded; freeform-as-preview before chips/explanation could host the PF effect.

4. **Practitioner advice ("stop doing tutorials, build projects") vs scaffolding research.** Audience contradiction: practitioner advice is aimed at intermediates stuck in tutorial loops; scaffolding research is about CS1 students. For absolute beginners, scaffolding wins; the practitioner advice kicks in around L6+ of the chip-sets.

5. **Three-tier (chips→workshop→freeform) vs two-tier (chips→freeform) for novices.** No head-to-head study found. The decision is theoretical (4C/ID sawtooth, PRIMM) rather than empirical. **This is the research gap.**

6. **Authoring cost differential between persist and reset.** No quantitative benchmark. Reasoning is structural, not measured.

---

## Concrete recommendations for Frontendkurser

### Architectural

1. **Adopt RESET model** for the Workshop tier. Each step has its own authored `starterCode`. The Monaco editor's content does NOT carry forward from the previous step.
2. **Within a step, failure is non-destructive** — typed code persists across failed Check attempts. Only an explicit "Restart Step" button clears it.
3. **Pilot on L2 forkLesson** (the existing plan), add the new `JsWorkshopSlide` between Chips and Exercise.
4. **Update `scripts/test-labs.ts`** to walk `JsWorkshopSlide.steps[]` with one canonical `reveal` solution per step. Per CLAUDE.md, no green harness = no "ready."

### UX defaults

Lifted from the cross-platform convergent set:

- Three-pane layout (instructions / Monaco editor / preview-or-tests).
- Single primary advance button: **"Check"** (Cmd/Ctrl+Enter). On all-checks-pass for the step → **auto-advance** to the next step.
- **No always-on hint button.** On Check failure, show the failed assertion's `message` (which IS the hint) below the editor.
- **No "show solution" button per step.** The next step's `starterCode` (= this step's `reveal`) IS the solution; if the student is truly stuck they navigate forward and come back.
- **"Restart Step"** button near the Monaco editor (mirrors fCC pattern).
- **Step counter**: visible list of steps for the workshop, current highlighted, completed ticked. Allow jumping to any step.
- **Workshop slide as a whole** marks the Workshop tier complete when the last step's `onPass` fires — same wiring as the existing Exercise tier.

### Authoring rules

1. **Each `WorkshopStep.starterCode` must be authored explicitly.** Never compute from previous step at runtime.
2. **`reveal` of step N = `starterCode` of step N+1.** This is mostly mechanical; an authoring helper script can detect mismatches.
3. **One hint per assertion** (`message: Loc` field on each check). Hint = failure message; do not author them separately.
4. **Hybrid checks per step** (≥1 pattern + ≥1 runtime), except for early steps where there's literally no behavior to check.
5. **Surface-shift between Chips and Workshop**: different domain, different identifiers, same control-flow pattern.
6. **Step granularity**: 5–10 steps per Workshop slide, each step changing 1 token to ~5 lines. Aim for ~5 minutes total.
7. **Second-person imperative instructions, 1–4 sentences max per step.** Name the keyword (don't just say "declare a variable").

### Engineering recommendations

1. **Switch the loop guard to `@freecodecamp/loop-protect`** — Babel transform, time-based (100 ms default), drop-in. Keep the iteration counter as a secondary fallback.
2. **Wrap Monaco runtime errors** with a small translation table for the top ~20 beginner errors (Elm/Hedy pattern; reference the lesson's allegory metaphor where possible).
3. **AST-rewrite student code via Acorn** to expose top-level `let`/`const` to the test runtime as `globalThis` properties. Cleaner than asking the student to write magic globals.
4. **One ghost assertion per step (optional)** that runs only after visible ones pass, to defeat hint-exploitation by reading the iframe's source.

### Open authoring questions for the pilot

- **Workshop replaces typed-assignment or coexists?** Recommendation: in the pilot lesson, replace `js-typed-assignment` with the new Workshop slide. Typed-assignment and Workshop overlap on the lexical-recall axis; running both is redundant. Re-evaluate after the pilot.
- **Productive Failure injection**: should one of the chip-sets put freeform *first* as a low-stakes "have a go" preview? Worth testing on a single lesson — the Suriyaarachchi 2024 result is promising but narrow.

---

## Sources

### UX implementation (Part 1)
- [freeCodeCamp — Responsive Web Design redesign rationale](https://www.freecodecamp.org/news/responsive-web-design-certification-redesigned/)
- [fCC issue #43668 — Project-Based Curriculum Features](https://github.com/freeCodeCamp/freeCodeCamp/issues/43668)
- [fCC issue #54402 — Editable region updates](https://github.com/freeCodeCamp/freeCodeCamp/issues/54402)
- [fCC issue #54360 — Reset Code Button Missing](https://github.com/freeCodeCamp/freeCodeCamp/issues/54360)
- [Codecademy Help — Updates to our Learning Environment](https://help.codecademy.com/hc/en-us/articles/1260803449210-Updates-to-our-Learning-Environment)
- [Codecademy Teams+ Workspace checklist](https://codecademy-teams-curriculum-documentation.codecademy.com/exercises/workspace-checklist/)
- [Boot.dev — Lesson Failure](https://www.boot.dev/lessons/142c8a73-5ede-49a6-9460-563890646023)
- [Boot.dev — Solutions](https://www.boot.dev/lessons/6b3ce0b8-b323-4685-bf50-48cfd1c9959d)
- [Boot.dev — Unit Tests](https://www.boot.dev/lessons/f8e09afb-9769-4ad0-b3d4-95643603c433)
- [Khan Academy — Tips for Answering Programming Questions](https://support.khanacademy.org/hc/en-us/articles/202260414-Tips-for-Answering-Programming-Questions)
- [DataCamp — Coding exercise anatomy](https://instructor-support.datacamp.com/en/articles/2347523-coding-exercise-anatomy)
- [DataCamp — Hints best practices](https://instructor-support.datacamp.com/en/articles/2379164-hints-best-practices)
- [Hyperskill — How do you check my solution?](https://support.hyperskill.org/hc/en-us/articles/360038405692-How-do-you-check-my-solution-Can-I-see-your-tests-or-input-data)
- [Hyperskill — Where can I see the correct solution?](https://support.hyperskill.org/hc/en-us/articles/360038406212-Where-can-I-see-the-correct-solution-for-the-problem)
- [Scrimba — Changes to the UI: Run Code](https://forum.scrimba.com/t/changes-to-the-ui-run-code/484)
- [Educative — Creating Interactive Coding Playgrounds and Exercises](https://www.educative.io/collection/page/lta/6630002/6588797614555136/6695198449991680)

### Reset vs persist (Part 2)
- [fCC redesign post (flow-state argument)](https://www.freecodecamp.org/news/responsive-web-design-certification-redesigned/)
- [fCC issue #52962 — editable region for step 123](https://github.com/freeCodeCamp/freeCodeCamp/issues/52962)
- [fCC issue #13657 — Major Issue with the way fCC teaches](https://github.com/freeCodeCamp/freeCodeCamp/issues/13657)
- [Codecademy Help — Reset Progress](https://help.codecademy.com/hc/en-us/articles/220444588-Reset-Progress-on-a-Course-Path-or-Exercise)
- [Codecademy forum — Some exercises reset after each step](https://www.codecademy.com/forum_questions/5120b34e1e36dfa879001387)
- [Renkl & Atkinson — How Fading Worked Solution Steps Works (Springer 2003/4)](https://link.springer.com/article/10.1023/B:TRUC.0000021815.74806.f6)
- [Worked-example effect — Wikipedia overview](https://en.wikipedia.org/wiki/Worked-example_effect)
- [Faded Parsons Problems — Berkeley CHI 2021](https://acelab.berkeley.edu/wp-content/papercite-data/pdf/parsons-chi2021.pdf)
- [Retrieval Practice in Stepwise Worked Examples (Utrecht 2025)](https://research-portal.uu.nl/ws/files/269108220/1-s2.0-S0959475225001203-main.pdf)
- [Retrieval Practice Transfer Guide](https://pdf.retrievalpractice.org/TransferGuide.pdf)

### Authoring patterns (Part 3)
- [Exercism JavaScript — implementing-a-concept-exercise](https://github.com/exercism/javascript/blob/main/reference/implementing-a-concept-exercise.md)
- [Exercism docs — Concept Exercises](https://exercism.org/docs/building/tracks/concept-exercises)
- [Exercism JavaScript — lasagna concept exercise](https://github.com/exercism/javascript/tree/main/exercises/concept/lasagna)
- [fCC pyramid-generator block (118 steps)](https://github.com/freeCodeCamp/freeCodeCamp/tree/main/curriculum/challenges/english/blocks/learn-introductory-javascript-by-building-a-pyramid-generator)
- [fCC Step 2 raw .md (real example)](https://github.com/freeCodeCamp/freeCodeCamp/blob/main/curriculum/challenges/english/blocks/learn-introductory-javascript-by-building-a-pyramid-generator/660ee6e3a242da6bd579de69.md)
- [fCC contributor guide — How to work on coding challenges](https://contribute.freecodecamp.org/how-to-work-on-coding-challenges/)
- [Hedy Translation Tutorial](https://github.com/hedyorg/hedy/wiki/Hedy-Translation-Tutorial)
- [Ericson 2022 — Parsons Problems Systematic Literature Review](https://juholeinonen.com/assets/pdf/ericson2022parsons.pdf)

### Assertion strategies (Part 4)
- [Testing Framework — fCC DeepWiki](https://deepwiki.com/freeCodeCamp/freeCodeCamp/6.1-testing-framework)
- [fCC Curriculum Helpers (GitHub)](https://github.com/freeCodeCamp/curriculum-helpers)
- [@freecodecamp/loop-protect on npm](https://www.npmjs.com/package/@freecodecamp/loop-protect)
- [fCC issue #41951 — Stacked methods don't pass with removeJSComments](https://github.com/freeCodeCamp/freeCodeCamp/issues/41951)
- [fCC issue #40277 — For loop short syntax test broken](https://github.com/freeCodeCamp/freeCodeCamp/issues/40277)
- [Khan Academy Computing Blog — The Many Ways to Write a For Loop](https://cs-blog.khanacademy.org/2014/01/the-many-ways-to-write-for-loop.html)
- [Khan/structuredjs (GitHub)](https://github.com/Khan/structuredjs)
- [structured.js demo](https://khan.github.io/structuredjs/)
- [jsbin/loop-protect (GitHub)](https://github.com/jsbin/loop-protect)
- [Replit blog — Infinite Loops](https://blog.replit.com/infinite-loops)
- [Exercism Test Runner Interface](https://exercism.org/docs/building/tooling/test-runners/interface)
- [Hedy paper — ScienceDirect](https://www.sciencedirect.com/science/article/pii/S2590118422000557)
- [Elm — Compiler Errors for Humans](https://elm-lang.org/news/compiler-errors-for-humans)

### Outcomes and positioning (Part 5)
- [Hou et al. 2023 — Parsons Problems to Scaffold Code Writing (arXiv 2311.18115)](https://arxiv.org/html/2311.18115v1)
- [Ericson, Margulieux, Rick 2017 — Parsons vs fixing/writing code (Koli Calling)](https://dl.acm.org/doi/10.1145/3141880.3141895)
- [Weinman, Fox, Hearst 2021 — Faded Parsons (CHI)](https://acelab.berkeley.edu/wp-content/papercite-data/pdf/parsons-chi2021.pdf)
- [Renkl & Atkinson — Fading Worked Solution Steps](https://link.springer.com/article/10.1023/B:TRUC.0000021815.74806.f6)
- [Kalyuga — Expertise Reversal Effect](https://www.uky.edu/~gmswan3/EDC608/Kalyuga2007_Article_ExpertiseReversalEffectAndItsI.pdf)
- [Suriyaarachchi, Denny, Nanayakkara 2024 — Productive Failure for Python lists (arXiv 2411.11227)](https://arxiv.org/abs/2411.11227)
- [Sinha & Kapur 2021 — When Problem Solving Followed by Instruction Works (RER)](https://journals.sagepub.com/doi/abs/10.3102/00346543211019105)
- [van Merriënboer — 4C/ID Overview](https://www.4cid.org/wp-content/uploads/2021/04/vanmerrienboer-4cid-overview-of-main-design-principles-2021.pdf)
- [Sentance et al. — PRIMM project](https://suesentance.net/primm-project/)
- [ITiCSE 2024 — Quickly Producing Isomorphic Exercises](https://dl.acm.org/doi/10.1145/3649217.3653617)
- [fCC forum — I just completed all the JavaScript challenges](https://forum.freecodecamp.org/t/i-just-completed-all-the-javascript-challenges-and-lessons-i-still-dont-feel-comfortable-with-it-what-should-i-do-now/76418)
- [fCC forum — Starting to Think FreeCodeCamp Doesn't Actually Teach](https://forum.freecodecamp.org/t/starting-to-think-freecodecamp-doesnt-actually-teach/71330)
- [fCC forum — I'm Doing It But Don't Understand](https://forum.freecodecamp.org/t/im-doing-it-but-dont-understand/577169)
- [Boot.dev — Build Your First Coding Project and Avoid Tutorial Hell](https://blog.boot.dev/education/building-your-first-coding-project/)
- [AlgoCademy — The Illusion of Mastery](https://algocademy.com/blog/the-illusion-of-mastery-why-understanding-isnt-enough-without-application/)
