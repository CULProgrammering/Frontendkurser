# Workshop Authoring Guide

Compiled 2026-04-29 after the L2 pilot landed. This is the **authoring contract** for adding `JsWorkshopSlide`s to the remaining lessons. Read this when starting a new lesson's workshop; you do not need to re-derive the rules.

Companion to [2026-04-28-online-course-lesson-architecture.md](./2026-04-28-online-course-lesson-architecture.md) (tier ordering) and [2026-04-29-workshop-microstep-format.md](./2026-04-29-workshop-microstep-format.md) (research grounding).

The L2 pilot lives in [app/src/lessons/javascript/level2-fork.ts](../app/src/lessons/javascript/level2-fork.ts) — copy its shape.

---

## What's already built

**Schema** ([app/src/types.ts](../app/src/types.ts)) — `JsWorkshopSlide`, `WorkshopStep`, `WorkshopCheck`. Don't modify the schema unless adding a new affordance.

**Renderer** ([app/src/components/JsWorkshopSlideView.tsx](../app/src/components/JsWorkshopSlideView.tsx)) — handles step counter, auto-advance, RESET reseed on step change, Ctrl/Cmd+Enter shortcut, last-step ✓.

**Runner** ([app/src/runtime/workshopRunner.ts](../app/src/runtime/workshopRunner.ts)) — `new Function`-based; assert body has lexical access to user's `let`/`const`. Strips comments before pattern matching.

**Tier wiring** ([app/src/tiers.ts](../app/src/tiers.ts)) — `js-workshop` → `workshop` tier, sits between Chips and Exercise.

**Harness** ([app/scripts/test-labs.ts](../app/scripts/test-labs.ts)) — automatically walks all `js-workshop` slides and runs each step's authored `reveal` against its checks. **No SOLUTIONS array entry needed for workshops** — the reveal IS the canonical solution.

---

## Authoring contract — non-negotiable

### 1. Surface-shift is mandatory

The lesson's other tiers already use 1-3 surfaces (chips, typed-assignment, exercise). Workshop must pick a **fourth distinct surface**:
- Different identifiers
- Different domain wrapper
- Same control-flow shape

Before authoring, **read the lesson's existing slides** and note which identifiers/domains are taken. Pick something universal-knowledge (no specialized expertise needed to follow).

### 2. Free values, fixed names — and one extension

- **Identifiers**: prescribed, case-sensitive, exact spelling. Pattern enforces them.
- **Numbers**: free unless they encode the lesson (thresholds in a comparison ladder ARE the lesson and stay strict — e.g. `wind <= 10` in the L2 fork).
- **Strings**: free. Use `assert: "return typeof X === 'string'"`, never `assert: "return X === 'specific-label'"`. The student's creative labels disappear on RESET — they see the canonical label in the next step's `starterCode` (osmosis effect).
- **Exception**: when the value IS the lesson (e.g. "type the keyword `let`"), pin it.

### 3. Hybrid checks per step

Each `WorkshopStep.checks` should mix:
- **Pattern** (`requirePattern: RegExp`) for structural gates: "did they use `if`?", "is there a `<=` operator?"
- **Assert** (`assert: string`) for behavioral gates: "did flag end up assigned?"

The check's `message` IS the failure hint (fCC pattern). One message per check; no separate hint store.

Pattern conventions:
- Whitespace-tolerant: `\bif\s*\(/`, not `if (`
- Word boundaries: `\bif\b`, not `if`
- Bare-else vs else-if: `\belse\s*\{` (bare) vs `\belse\s+if\s*\(` (else-if)
- Comments are stripped before matching — patterns can be naive about `//` lines

### 4. Step granularity

- **5-10 steps per workshop**
- Each step changes 1 token to ~5 lines
- ~5 minutes total
- One new typing operation per step (declaration, comparison, branch, etc.)

### 5. Step N's `reveal` ≈ step N+1's `starterCode`

Mostly mechanical. Test-value lines (e.g. `let wind = 5;` flipping to `let wind = 20;` to exercise a new branch) may differ deliberately — document this in the slide's `designNote` if so.

### 6. Don't write top-level `return` in user code

The runner wraps user source so it shares scope with the assert. A top-level `return` in user code short-circuits before the assert runs. If a step needs to test a return value, author the user code as `function name(...) { ... }` and have the assert call `name(args)`.

### 7. Localization

- **Prose** (`instruction`, `prompt`, `message`, `title`) — translated en/sv
- **Code** (`starterCode`, `reveal`, identifier names, string values) — English-only inside the code, even in the `sv` slot. Matches existing project convention.

### 8. Instructions describe WHAT, hints describe HOW

The `instruction` field tells the student *what to do conceptually* — what construct to use, what variable to touch, what scenario to handle. The check `message` fields tell them *how to write it* — the concrete syntax, the exact operator, the pattern they're missing.

Spell out enough in the instruction that a confident student can write the code without hints. Spell out concrete syntax in the hint so a stuck student gets help on the specific failing piece.

**Allowed in instructions:**
- Construct names: `if`, `else if`, `else`, `for`, `for…of`, `while`, `do…while`, `switch`, `case`, `default`
- Variable names you've prescribed: `wind`, `flag`, `password`, etc.
- The conceptual scenario the branch handles ("when the password is too short", "for the calmest range")
- Whole-word operator references: "OR", "AND", "less than" (no symbol)
- Threshold values when they encode the lesson ("at most 10", "fewer than 8 characters")

**Forbidden in instructions — leave these for hints:**
- Exact code templates: `for (let i = 0; i < count; i++)`, `if (password.length < 8)`
- Exact comparison expressions: `wind <= 10`, `password.length < 8`
- Operator symbols: `<=`, `||`, `&&`, `+=`, `++`
- Method names like `.length` (use "the password's length" or "how many characters" instead)
- Step-by-step decomposition that would equal the canonical reveal

**Example — L5 step 3 (for-loop header).**

❌ "Write a for-loop header that runs `count` times: `for (let i = 0; i < count; i++) { ... }`."

✓ "Write a for-loop header so the body will run `count` times. Remember a for-loop's header has three parts — an initialization, a condition, and an update."

The hints (failure messages) still spell out `let i = 0`, `i < count`, `i++` so a stuck student gets concrete help on the specific piece they got wrong. A student who already knows the syntax doesn't see those hints — they just type and pass on the first Check.

Keep instructions to 1–4 sentences in second-person imperative.

---

## UX behavior (already implemented — don't reauthor)

- Step counter + Check + Restart all sit in one row above the editor (left column), buttons right-aligned.
- Counter button shows ✓ when step is `done` regardless of `current`.
- Auto-advance fires 1.2s after a step passes (cancellable by manual jump).
- Last step's pass marks the tier complete and shows "✓ Workshop complete. Nice work."
- **Ctrl/Cmd+Enter** triggers Check (Monaco's default Insert Line Below is overridden).
- Failure shows the first failed check's `message` plus, for runtime errors, the raw error in monospace.

---

## Authoring workflow

1. **Read the target lesson's existing slides.** Note the surfaces used in chips, typed-assignment (if any), and exercise. Pick a fourth surface.
2. **Plan 5-10 steps.** Each step adds ONE new typing operation. Sketch the reveals first (top-down), then derive starterCodes from previous reveals.
3. **Author the slide.** Place the `kind: "js-workshop"` slide in the lesson's `slides[]` array logically (tier filtering puts it in the workshop tier regardless of array position). Convention so far: insert before the exercise slide.
4. **Add a `designNote`** documenting the surface choice and any deviations (e.g. test-value lines that flip per step).
5. **Run the harness:**
   ```
   cd app && npx tsx scripts/test-labs.ts
   ```
   Confirm `all workshop reveals green`. The harness walks every `js-workshop` slide automatically.
6. **Per CLAUDE.md:** never claim a workshop is "ready" without a fresh green harness run.

---

## Lessons to author (after L2)

| Lesson | id | Concept | Existing surfaces (avoid these) | Workshop ideas (suggestions only) |
|---|---|---|---|---|
| L1 | `conditionals-crosswalk` | `if` / `else` | crosswalk (walk/wait), fortune picker (`fortune1-3`, `n`, `selected`) | Door access by age, vending machine accept/reject, password length OK/short |
| L3 | `conditionals-recycling` | `switch` | recycling, music player buttons (`button` → `action`) | HTTP status code → message, day-of-week → schedule, command palette action |
| L4 | `conditionals-bouncer` | `&&` / `\|\|` / `!` | bouncer (age/list), smart light (`hour`/`motion`/`manualOff` → `lightOn`) | Form-submit eligibility, alarm trigger conditions, library lending eligibility |
| L5 | `loops-stairs` | `for` | stairs, multiplication table (`factor`, `i`) | Sum 1..N, count down, render N dashes |
| L6 | `loops-letters` | `for…of` | letter search (`word`/`letter`/`found`) | Count vowels in a word, sum array of numbers, find longest item |
| L7 | `loops-countdown` | `while` | countdown, savings (`goal`/`weekly`/`saved`/`weeks`) | Halving until under threshold, repeated subtraction, drain a counter |
| L8 | `loops-tasting` | `do…while` | tasting, refill cup (`target`/`pourSize`/`cup`/`pours`) | Read at least one input, retry until success, fill bucket |

The "Workshop ideas" column is a suggestion menu — pick one or substitute, but verify identifiers/domain don't overlap the existing surfaces.

For each workshop, run the harness and confirm green before moving to the next.

---

## Cross-references

- **Pilot example**: [app/src/lessons/javascript/level2-fork.ts](../app/src/lessons/javascript/level2-fork.ts) — the wind→flag workshop. 6 steps, 14 hybrid checks, all green in the harness.
- **Per-step verification rule** in [CLAUDE.md](../CLAUDE.md) — applies to workshops too.
- **Schema docstrings** in [app/src/types.ts](../app/src/types.ts) — explain `requirePattern` vs `assert`, the RESET model, and the lexical-scope assert pattern.
