import type { CSSProperties } from "react";
import type { Loc } from "./i18n";

export type DemoBox = {
  id: string;
  label?: Loc;
  baseStyle?: CSSProperties;
  children?: DemoBox[];
  /**
   * Auxiliary "tip" content rather than a primary code/visual demo. When
   * present, the explanation view pulls the box out of the demo flow and
   * renders it beside the centered pane on wide screens (or inline below
   * the demos on narrower ones).
   */
  kind?: "note";
};

export type ExplanationStep = {
  narration?: Loc;
  styles?: Record<string, CSSProperties>;
  highlight?: string[];
  /**
   * Literal substrings to highlight inside any code box's label on this
   * step. All occurrences of each substring are highlighted (matching is
   * case-sensitive, no word-boundary). Useful for drawing the eye to the
   * piece of syntax the narration is currently describing.
   */
  tokenHighlight?: string[];
};

/** Identifier of a custom intro scene component (e.g. stick-figure animation). */
export type CustomSceneId =
  | "crosswalk"
  | "crosswalk-if-trace"
  | "crosswalk-if-else-trace"
  | "crosswalk-strict-trace"
  | "comparisons-table"
  | "wardrobe"
  | "wardrobe-trace"
  | "recycling"
  | "recycling-trace"
  | "bouncer"
  | "stairs"
  | "stairs-trace"
  | "letters"
  | "letters-trace"
  | "countdown"
  | "countdown-trace"
  | "tasting"
  | "tasting-trace";

export type ExplanationSlide = {
  kind: "explanation";
  title: Loc;
  intro?: Loc;
  demo: DemoBox[];
  steps: ExplanationStep[];
  /** When set, replaces the demo column with a hand-drawn scene. */
  customScene?: CustomSceneId;
};

export type StyleCheck = {
  selector: string;
  property: string;
  expected: string;
  tolerance?: number;
  hint?: Loc;
};

export type LegendEntry = {
  name: Loc;
  syntax: string;
  example: string;
  note?: Loc;
};

export type AssignmentSlide = {
  kind: "assignment";
  title: Loc;
  prompt: Loc;
  /** HTML markup for the preview iframe. May contain visible Swedish/English text. */
  html: Loc;
  startingCss: Loc;
  checks: StyleCheck[];
  legend?: LegendEntry[];
  targetCss?: Loc;
};

/**
 * Primitive values that can be injected as JavaScript `let` declarations
 * into the student's exercise. Objects/arrays are deliberately excluded —
 * the curriculum doesn't introduce them yet.
 */
export type JsPrimitive = string | number | boolean;

export type JsTest = {
  label: Loc;
  /**
   * The values for each declared variable in this test case. Keys must
   * match the slide's `varNames`. Values are primitives only.
   */
  vars: Record<string, JsPrimitive>;
  expected: unknown;
};

export type DoorConfig = {
  conditionLabel: Loc;
  inputKey?: string;
  acceptLabel?: Loc;
  rejectLabel?: Loc;
};

export type ForkBranch = { key: string; label: Loc };
export type ForkConfig = {
  conditionLabel: Loc;
  /** Name of the variable whose value is shown on the moving chip. */
  inputKey?: string;
  branches: ForkBranch[];
};

export type ConveyorBin = { key: string; label: Loc };
export type ConveyorConfig = {
  inputLabel: Loc;
  /** Name of the variable whose value is shown on the moving chip. */
  inputKey?: string;
  bins: ConveyorBin[];
  defaultBinKey?: string;
};

/**
 * Describes one piece of a composite boolean expression the MultiGate scene
 * can render. Operands are joined visually by the top-level `mode` operator.
 */
export type MultiGateOperand =
  | string                          // simple variable reference, e.g. "age"
  | { not: string }                 // !var
  | { or: [string, string] };       // (a || b)

export type MultiGateConfig = {
  mode: "and" | "or" | "not";
  operandLabels: [string, string?];
  /**
   * Optional richer expression. When present, takes priority over
   * `operandLabels` for rendering. Each operand becomes one chip; chips are
   * joined by the top-level `mode` operator.
   */
  expression?: MultiGateOperand[];
  passLabel?: Loc;
  failLabel?: Loc;
  /**
   * What the student's code must RETURN for the "pass" label to show.
   * Default: `true`. Use `"let in"` etc. for string-returning exercises.
   */
  passWhen?: unknown;
};

export type CrosswalkConfig = {
  conditionLabel: Loc;
  /** When input is an object, which property holds the light state. */
  inputKey?: string;
  /**
   * The value the user's function must return for the figure to walk.
   * Default: true. For string-returning exercises, set this to e.g. "walk".
   */
  walkWhen?: unknown;
  walkLabel?: Loc;
  waitLabel?: Loc;
  /**
   * Shown when the function returned undefined (no return path was taken).
   * If omitted, falls back to waitLabel.
   */
  nothingLabel?: Loc;
};

/**
 * Generic allegory for loop exercises: shows the input variables and what
 * the student's code returned. Optional themed background (e.g. stairs)
 * can decorate it.
 */
export type LoopResultConfig = {
  /** Names of variables to display as input chips, in order. */
  inputKeys: string[];
  /** Label for the result chip (e.g. "result", "sum", "letters"). */
  resultLabel?: Loc;
  /** Optional theme — affects only the background art. */
  theme?: "stairs" | "letters" | "countdown" | "tasting" | "plain";
};

export type Allegory =
  | { kind: "door"; config: DoorConfig }
  | { kind: "fork"; config: ForkConfig }
  | { kind: "conveyor"; config: ConveyorConfig }
  | { kind: "multi-gate"; config: MultiGateConfig }
  | { kind: "crosswalk"; config: CrosswalkConfig }
  | { kind: "loop-result"; config: LoopResultConfig };

export type JsAssignmentSlide = {
  kind: "js-assignment";
  title: Loc;
  prompt: Loc;
  /**
   * The student's editable starter code. Runs as the body of an internal
   * function — students can use `return` at top level. The variables listed
   * in `varNames` are pre-declared with each test's values; the student does
   * not see or write a function wrapper.
   */
  starterCode: Loc;
  /**
   * Variables made available to the student's code. Shown as a read-only
   * `let x = ...;` panel above the editor, with values from the focused test.
   */
  varNames: string[];
  /**
   * One-line goal hint shown below the scene when the student's code doesn't
   * yet pass.
   */
  goalHint?: Loc;
  /**
   * Optional code-shape requirement. When set, the success state (animation
   * + "Done") only fires if the student's code matches this pattern AND all
   * tests pass. Useful when tests alone can't distinguish a wrong but
   * accidentally-passing solution.
   */
  requirePattern?: RegExp;
  tests: JsTest[];
  allegory: Allegory;
  legend?: LegendEntry[];
};

/**
 * One sub-puzzle inside a chip-assignment slide. Student drags chips into
 * slots in the code template; ordering is left-to-right.
 *
 * The `template` contains `[[]]` markers that become slots. The number of
 * `[[]]` markers must equal `solution.length`. Chips in `chips` that are
 * NOT in `solution` are distractors.
 */
export type JsChipPuzzle = {
  /** Optional sub-prompt above this puzzle. */
  prompt?: Loc;
  /**
   * Optional per-puzzle override of the slide-level prompt, shown at the
   * top of the slide while this puzzle is active. Useful when the same
   * chip-assignment slide cycles through different "code A / code B"
   * variants with different named values.
   */
  intro?: Loc;
  /**
   * Code template with `[[]]` markers where chips go (left-to-right).
   * Newlines preserved with monospace rendering.
   */
  template: Loc;
  /**
   * The chips available in the pool. May include distractors. The order
   * here is the initial display order; placing chips marks them as used.
   */
  chips: string[];
  /**
   * The correct chip strings, in slot order (left-to-right).
   * Length must equal the number of `[[]]` markers in template.
   */
  solution: string[];
  /**
   * Additional accepted orderings — useful for commutative operators
   * like `||` and `&&` where operand order doesn't matter semantically.
   * Each entry is a full alternative to `solution`, same length.
   */
  alternatives?: string[][];
  /**
   * Optional sense-making sentence shown when the student's assembly is
   * wrong. Describes what the wrong code would actually do (e.g. "this
   * would always return 'walk', even on red"). Authored per puzzle —
   * leave undefined to fall back to the generic soft message.
   */
  wrongHint?: Loc;
};

/**
 * Chip-style exercise. The student completes a series of sub-puzzles by
 * placing chips into slots. No code editor, no test runner — the puzzle
 * IS the check. Click chip in pool → fills next empty slot; click placed
 * chip → returns it to the pool.
 */
export type JsChipAssignmentSlide = {
  kind: "js-chip-assignment";
  title: Loc;
  prompt: Loc;
  /** Sub-puzzles, completed sequentially. */
  puzzles: JsChipPuzzle[];
  legend?: LegendEntry[];
};

/**
 * Final-style exercise: a code panel with embedded typed input fields.
 * The student types into the inputs; on Check, we substitute their values
 * into the template and run the assembled code through the standard runner.
 *
 * The `template` contains `[[input:id]]` markers that become text inputs.
 */
export type JsTypedAssignmentSlide = {
  kind: "js-typed-assignment";
  title: Loc;
  prompt: Loc;
  /** Code with `[[input:id]]` markers. */
  template: Loc;
  /** Pre-declared variables (read-only panel above the code). */
  varNames: string[];
  /** Optional initial value for each input slot. */
  initialValues?: Record<string, string>;
  /** Tests run after substitution, same shape as JsAssignmentSlide. */
  tests: JsTest[];
  goalHint?: Loc;
  allegory?: Allegory;
  legend?: LegendEntry[];
};

/**
 * One step inside a Workshop slide. The student sees `instruction`, edits
 * `starterCode` in Monaco, and clicks Check. Each `check` is hybrid:
 *
 * - `requirePattern`: a regex run against the student's source. Use for
 *   STRUCTURAL gates ("did they use `let`?", "is there a comparison
 *   operator?"). Whitespace-tolerant by default; comments are stripped before
 *   matching.
 * - `assert`: a JS expression / statement-list run in the iframe sandbox.
 *   The body should `return <bool>`. Use for BEHAVIORAL gates ("does the
 *   variable hold the right value?"). Only author this when the value is
 *   what the step is teaching — otherwise leave it off and accept any value
 *   the student chose.
 *
 * The `message` doubles as the failure hint (fCC pattern). On failure, the
 * student sees the first failed check's message — no separate hint store.
 *
 * Workshop uses the RESET model: the editor is reseeded with `starterCode`
 * when the student moves to a new step. `reveal`, when present, is the
 * canonical solution for this step and should equal the next step's
 * `starterCode` (authored, not computed).
 */
export type WorkshopCheck = {
  message: Loc;
  requirePattern?: RegExp;
  assert?: string;
};

export type WorkshopStep = {
  /** Stable id for keying React state and progress tracking. */
  id: string;
  /** Second-person imperative; 1–4 sentences. Name the keyword. */
  instruction: Loc;
  /** Full pre-state code at the start of THIS step. RESET model — never carries over from prior step. */
  starterCode: Loc;
  /** Hybrid checks, ≥1 per step. Pattern only is OK for "type this token" steps. */
  checks: WorkshopCheck[];
  /** Canonical solution after this step. Should equal next step's starterCode. */
  reveal?: Loc;
};

export type JsWorkshopSlide = {
  kind: "js-workshop";
  title: Loc;
  /** Workshop-level intro shown above the editor on every step. */
  prompt: Loc;
  steps: WorkshopStep[];
  legend?: LegendEntry[];
  /** Author-only design note (Exercism design.md equivalent). Not rendered. */
  designNote?: string;
};

/**
 * One assertion in a freeform exercise. The `assert` string is treated as the
 * BODY of a function executed inside the iframe's window. Use `return <expr>`
 * to yield a boolean — truthy = pass, falsy or thrown = fail. Multiple
 * statements are allowed, so a single test can call a student-defined function
 * and then check the resulting DOM state.
 *
 * Inside the body, `document`, `window`, and any globals declared by the
 * student's code (function declarations, var) are available directly. Note
 * that top-level `let`/`const` in the student's code are NOT on `window`;
 * source-regex checks against `__userJs` are required for those.
 */
export type ExerciseTest = {
  label: Loc;
  assert: string;
  hint?: Loc;
};

/**
 * Freeform "lab"-style exercise. The student edits HTML, CSS, and JS in a
 * Monaco editor; output renders live in a sandboxed iframe; a list of named
 * checks reports pass/fail. The exercise is purely formative — the user's
 * code is never persisted into the rest of the app.
 */
export type ExerciseSlide = {
  kind: "exercise";
  title: Loc;
  prompt: Loc;
  starterHtml?: Loc;
  starterCss?: Loc;
  starterJs?: Loc;
  tests: ExerciseTest[];
};

export type Slide =
  | ExplanationSlide
  | AssignmentSlide
  | JsAssignmentSlide
  | JsChipAssignmentSlide
  | JsTypedAssignmentSlide
  | JsWorkshopSlide
  | ExerciseSlide;

export type Lesson = {
  id: string;
  title: Loc;
  summary: Loc;
  slides: Slide[];
};

/**
 * A grouping of related lessons within a course (e.g. "Conditionals" or
 * "Loops" inside the JavaScript course). Courses with topics get a
 * topic-card view between the home screen and the lesson cards.
 */
export type Topic = {
  id: string;
  title: Loc;
  summary?: Loc;
  lessons: Lesson[];
};

export type Course = {
  id: string;
  title: Loc;
  summary?: Loc;
  /** Flat list of lessons (used by simple courses like CSS). */
  lessons?: Lesson[];
  /** Lessons grouped into topics (used by larger courses like JavaScript). */
  topics?: Topic[];
};
