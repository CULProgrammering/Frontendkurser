# CUL Programmering — Platform Vision

## Exercise Design Inspiration

### Sololearn — fill-in-the-blank, chip-based (simple/practice exercises)
Short, low-friction exercises where the student taps chips into slots in a code snippet. No typing means no syntax-error penalty — students discriminate between correct and wrong options without keyboard friction. Strong fit for the student profile (anxiety, neurodivergence, mixed keyboard skill).

### freeCodeCamp — open editor + tests (final exercises)
A code panel where the student fills in pieces of a working program. Tests run on the assembled code; pass/fail per test is shown inline. More realistic than chip-mode and gives group 1 (internship-track) students at least some typing reps. The platform itself remains as a low-friction entry ramp; freeCodeCamp is where students go for more demanding open-editor work.

## Slide Philosophy

- **Explanation slides** — animated stick-figure allegories paired with stepped narration (door, fork, conveyor, gate, stairs, letters, countdown, tasting). Teach the concept through story and motion.
- **Trace slides** — animated walk-throughs of code executing line by line, with live state chips. Bridge from story to actual syntax. Untouched by the chip/typed conversion.
- **Practice exercises** — `js-chip-assignment`. 4 sub-puzzles per slide, sequential, click-to-place / click-to-remove, randomized chip pool order.
- **Final exercises** — `js-typed-assignment`. Code panel with inline text inputs that grow as you type. Runs the assembled code through the existing test runner.

## Implemented Patterns (current state)

- **Chip view**: `JsChipAssignmentSlideView`. Sub-puzzles defined as `{ template, chips, solution }`. `[[]]` markers in template become slots. Click-in-pool fills the leftmost empty slot; click-on-placed returns the chip to the pool. Per-puzzle Check button. Wrong → shake. Right → green + Next.
- **Typed view**: `JsTypedAssignmentSlideView`. `[[input:id]]` markers in template become inline text inputs. Width grows with content (`box-sizing: content-box` + buffer ch).
- **Distractor convention**: each lesson's FIRST chip exercise has no distractors (gentle introduction). Subsequent chip exercises in the same lesson include 1–3 distractor chips. Distractors carry through both code A and code B versions.
- **Puzzle progression — two codes, 2+2 split**: each chip slide presents the same idiom in two parallel codes. P1 isolates the new concept on code A; P2 is full assembly of code A; P3 isolates the new concept on code B (same prompt as P1, new surface — different variable names, values, or operation direction); P4 is full assembly of code B. Forces reconstruction at P3/P4 instead of pattern-matching the same template four times.
- **Code A/B variation strategy**: for conditional lessons (L1–L4) the surface change is substantial — different scenario domain (light → door, age/ticket → fuel/key, etc.). For loop lessons (L5–L8) the loop header has less variation surface, so code B varies the *body operation* (sum + i → count + 1, halve → subtract, subtract → add) and renames accumulators. Same-prompt-different-surface is the design contract.
- **Increment forms**: from L5 onwards, code uses `i++` in for-loop updates (with a dedicated explanation slide covering `x = x + 1` / `x += 1` / `x++` / `x--` etc.). The L5 stars slide uses `i += "*"` as a sharp distractor — leverages the just-taught compound-assignment shortcut as a trap (operand is `i`, not the accumulator).

## Known Trade-offs / Open Questions

- **Allegories on chip exercises**: Chip-style currently has NO allegory — the puzzle IS the check. For L1–L4 conditionals (door, fork, conveyor, gate) this is a real pedagogical loss because the allegory IS the metaphor. Possible future extension: after a chip puzzle is solved correctly, run the assembled code through the test runner and render the allegory once. Would require adding optional `varNames` + `previewVars` per puzzle. Note: with the code-A/code-B split, this would also need to render the allegory for code B's scenario (which may not have a matching allegory at all).
- **Loop variation is thinner than conditional variation**: For L5/L7 simple while/for loops, code B only renames pieces — same loop header, same body shape. The for-loop / while header has too little structural surface to vary without introducing concepts the lesson hasn't covered. Accepted tradeoff. Halving (L7/7) and subtract-7 (L8) get richer variation by flipping operation direction in code B.
- **`noteBoxStyle` whitespace**: The shared `noteBoxStyle` doesn't preserve `\n` by default — `\n` collapses to a space, which makes multi-line bullet/table notes flow into one paragraph. The L5 increment slide overrides this inline (`whiteSpace: "pre-wrap"`). Other note boxes across the lessons still collapse line breaks; could be promoted into the shared style if consistency is desired.

## Narration (Long-term)

The animated explanation slides are designed to be narrated. The long-term plan is to add AI voice narration that reads each step's narration text aloud as the animation advances, removing the need for students to read and watch simultaneously. This supports students with reading difficulties, dyslexia, or anxiety around text-heavy instruction.

## Lesson Inventory (current state)

**Conditionals** (4 lessons):
- L1 Crosswalk — `if`
- L2 Wardrobe — `else if`
- L3 Recycling — `switch`
- L4 Bouncer — `&&`, `||`, `!`

**Loops** (4 lessons):
- L5 Stairs — `for`
- L6 Letters — `for…of`
- L7 Countdown — `while`
- L8 Tasting — `do…while`

Each lesson follows: intro allegory → concept explanation → trace walk-through → 1–3 chip practice exercises → 1 typed-input final.
