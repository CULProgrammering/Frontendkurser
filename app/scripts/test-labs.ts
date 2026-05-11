/**
 * Headless test harness for Monaco lab exercises AND Workshop tiers.
 *
 * Two sections:
 *   1. Exercise-tier labs — mimics the iframe runner: sets up a vm context with
 *      a console capture and window.__userSrc, evals a known-good student
 *      solution, then runs every assertion exactly as the iframe would.
 *      Each lab needs an entry in `SOLUTIONS` (manually maintained).
 *   2. Workshop-tier reveals — walks every js-workshop slide in every lesson,
 *      runs each step's authored `reveal` through runWorkshopChecks (the same
 *      function the React layer calls), and reports per-step pass/fail.
 *      No separate solutions array — the reveal IS the canonical solution.
 *
 * Run with: npx tsx scripts/test-labs.ts
 */

import vm from "node:vm";
import { javascriptCourse } from "../src/lessons/javascript";
import { letConstLesson } from "../src/lessons/javascript/variables-1-let-const";
import { typesLesson } from "../src/lessons/javascript/variables-2-types";
import { operatorsLesson } from "../src/lessons/javascript/variables-3-operators";
import { specialValuesLesson } from "../src/lessons/javascript/variables-4-special-values";
import { doorLesson } from "../src/lessons/javascript/level1-door";
import { forkLesson } from "../src/lessons/javascript/level2-fork";
import { conveyorLesson } from "../src/lessons/javascript/level3-conveyor";
import { multiGateLesson } from "../src/lessons/javascript/level4-multigate";
import { stairsLesson } from "../src/lessons/javascript/level5-stairs";
import { lettersLesson } from "../src/lessons/javascript/level6-letters";
import { countdownLesson } from "../src/lessons/javascript/level7-countdown";
import { tastingLesson } from "../src/lessons/javascript/level8-tasting";
import {
  runWorkshopChecks,
  stripJsComments,
} from "../src/runtime/workshopRunner";
import type {
  ExerciseSlide,
  JsWorkshopSlide,
  Lesson,
  WorkshopCheck,
} from "../src/types";

type LabCase = {
  lessonId: string;
  /**
   * English title of the specific exercise slide inside the lesson. Required
   * when a lesson has more than one exercise slide; if omitted, the harness
   * picks the lesson's first exercise slide. Match the `slide.title.en` exactly.
   */
  exerciseTitle?: string;
  solution: string;
};

// Known-good student solutions for each lab. Each must pass every test.
const SOLUTIONS: LabCase[] = [
  // Variables — Lesson 1 (let vs const) — 4 exercises
  {
    lessonId: "variables-let-const",
    exerciseTitle: "Lab: introduce yourself",
    solution: `
let age = 25;
age = 26;
const name = "Alice";
console.log(\`\${name} is \${age} years old\`);
`,
  },
  {
    lessonId: "variables-let-const",
    exerciseTitle: "Lab: step counter",
    solution: `
let stepsWalked = 0;
stepsWalked = 1500;
console.log(stepsWalked);
stepsWalked = 4500;
console.log(stepsWalked);
stepsWalked = 8500;
console.log(stepsWalked);
`,
  },
  {
    lessonId: "variables-let-const",
    exerciseTitle: "Lab: battery monitor",
    solution: `
let batteryPercent = 100;
batteryPercent -= 27;
console.log(batteryPercent);
batteryPercent -= 18;
console.log(batteryPercent);
`,
  },
  {
    lessonId: "variables-let-const",
    exerciseTitle: "Lab: quiz scoreboard",
    solution: `
const totalQuestions = 10;
let correctAnswers = 0;
let wrongAnswers = 0;
correctAnswers += 7;
wrongAnswers += 3;
console.log(\`\${correctAnswers} correct, \${wrongAnswers} wrong, out of \${totalQuestions}\`);
`,
  },
  // Variables — Lesson 2 (Types) — 4 exercises
  {
    lessonId: "variables-types",
    exerciseTitle: "Lab: type detective",
    solution: `
let title = "Hello";
let score = 42;
let ready = true;
console.log(typeof title);
console.log(typeof score);
console.log(typeof ready);
console.log(typeof ("5" + 3));
`,
  },
  {
    lessonId: "variables-types",
    exerciseTitle: "Lab: bug hunt",
    solution: `
let subtotal = 200;
let shipping = 5;
let total = subtotal + shipping;
console.log(total);
console.log(typeof total);
`,
  },
  {
    lessonId: "variables-types",
    exerciseTitle: "Lab: predict the result",
    solution: `
console.log(5 + "3");
console.log("5" - 3);
console.log(true + 1);
console.log("5" * 2);
`,
  },
  {
    lessonId: "variables-types",
    exerciseTitle: "Lab: strict vs loose equality",
    solution: `
console.log(5 === "5");
console.log(5 == "5");
console.log(0 === false);
console.log(0 == false);
`,
  },
  // Variables — Lesson 3 (Operators) — 4 exercises
  {
    lessonId: "variables-operators",
    exerciseTitle: "Lab: math and answers",
    solution: `
console.log(10 % 3);
console.log(7 * 8);
console.log(10 > 5);
console.log(10 === "10");
`,
  },
  {
    lessonId: "variables-operators",
    exerciseTitle: "Lab: discount sale",
    solution: `
console.log(250 * 0.20);
console.log(250 - (250 * 0.20));
console.log((250 - (250 * 0.20)) < 250);
console.log((250 - (250 * 0.20)) === 200);
`,
  },
  {
    lessonId: "variables-operators",
    exerciseTitle: "Lab: multiple of three",
    solution: `
console.log(12);
console.log(12 % 3);
console.log(12 % 3 === 0);
console.log(12 % 3 !== 0);
`,
  },
  {
    lessonId: "variables-operators",
    exerciseTitle: "Lab: voting age check",
    solution: `
console.log(18 >= 18);
console.log(18 < 100);
console.log(18 === 18);
console.log(18 === "18");
`,
  },
  // Variables — Lesson 4 (Special values) — 4 exercises
  {
    lessonId: "variables-special-values",
    exerciseTitle: "Lab: special-values tour",
    solution: `
let nothing;
console.log(nothing);
let answer = null;
console.log(answer);
let oops = 0 / 0;
console.log(oops);
console.log(Number.isNaN(oops));
`,
  },
  {
    lessonId: "variables-special-values",
    exerciseTitle: "Lab: chat session",
    solution: `
let currentMessage;
console.log(currentMessage);
let attachmentId = null;
console.log(attachmentId);
currentMessage = "hello";
console.log(currentMessage);
attachmentId = true;
console.log(attachmentId);
`,
  },
  {
    lessonId: "variables-special-values",
    exerciseTitle: "Lab: validate guest count",
    solution: `
console.log(Number("4"));
console.log(Number("many"));
console.log(Number.isNaN(Number("many")));
console.log(Number.isNaN(Number("4")));
`,
  },
  {
    lessonId: "variables-special-values",
    exerciseTitle: "Lab: null vs undefined",
    solution: `
console.log(null === null);
console.log(null === undefined);
console.log(typeof null);
console.log(typeof undefined);
`,
  },
  // Variables — topic-level challenge (lives on Topic.challenges, not in any
  // lesson). The harness's challenge loop below resolves this by ID against
  // every topic's `challenges[]` array.
  {
    lessonId: "variables-budget-tracker",
    exerciseTitle: "Challenge: budget tracker",
    solution: `
const currency = "kr";
let income = 30000;
let fixedExpenses = 12000;
let variableExpenses = 8000;
let totalExpenses = fixedExpenses + variableExpenses;
let remainder = income - totalExpenses;
if (Number.isNaN(remainder)) {
  remainder = 0;
}
let category = "breaking even";
if (remainder > 0) {
  category = "saver";
} else if (remainder < 0) {
  category = "deficit";
}
console.log(\`Income: \${income} \${currency}\`);
console.log(\`Fixed: \${fixedExpenses} \${currency}\`);
console.log(\`Variable: \${variableExpenses} \${currency}\`);
console.log(\`Total expenses: \${totalExpenses} \${currency}\`);
console.log(\`Remainder: \${remainder} \${currency}\`);
console.log(\`Category: \${category}\`);
`,
  },
  {
    lessonId: "conditionals-crosswalk", // L1
    solution: `
let fortune1 = "Your cat is plotting.";
let fortune2 = "Tomorrow brings rain.";
let fortune3 = "A new friend approaches.";

let n = 2;
let selected = "";

if (n === 1) { selected = fortune1; }
if (n === 2) { selected = fortune2; }
if (n === 3) { selected = fortune3; }

console.log(fortune1);
console.log(fortune2);
console.log(fortune3);
console.log(selected);
`,
  },
  {
    lessonId: "conditionals-wardrobe", // L2
    solution: `
let level = 34;
let status = "";

if (level < 10) { status = "Critical"; }
else if (level < 25) { status = "Low"; }
else if (level < 75) { status = "Medium"; }
else { status = "High"; }

console.log(level);
console.log(status);
`,
  },
  {
    lessonId: "conditionals-recycling", // L3
    solution: `
let button = "play";
let action = "";

switch (button) {
  case "play":
    action = "Playing track";
    break;
  case "pause":
    action = "Paused";
    break;
  case "stop":
    action = "Stopped";
    break;
  case "next":
    action = "Skipped to next";
    break;
  case "prev":
    action = "Back one track";
    break;
  default:
    action = "Unknown button";
}

console.log(button);
console.log(action);
`,
  },
  {
    lessonId: "conditionals-bouncer", // L4
    solution: `
let hour = 22;
let motion = true;
let manualOff = false;
let lightOn = false;

lightOn = motion && (hour < 7 || hour >= 19) && !manualOff;

console.log(hour);
console.log(motion);
console.log(manualOff);
console.log(lightOn);
`,
  },
  {
    lessonId: "loops-stairs", // L5
    solution: `
let factor = 7;

for (let i = 1; i <= 10; i++) {
  console.log(factor * i);
}
`,
  },
  {
    lessonId: "loops-letters", // L6
    solution: `
let word = "raspberry";
let letter = "r";
let found = false;

for (let ch of word) {
  if (ch === letter) {
    found = true;
  }
}

console.log(word);
console.log(letter);
console.log(found);
`,
  },
  {
    lessonId: "loops-countdown", // L7
    solution: `
let goal = 1000;
let weekly = 75;
let saved = 0;
let weeks = 0;

while (saved < goal) {
  saved = saved + weekly;
  weeks = weeks + 1;
}

console.log(weeks);
console.log(saved);
`,
  },
  {
    lessonId: "loops-tasting", // L8
    solution: `
let target = 250;
let pourSize = 60;
let cup = 0;
let pours = 0;

do {
  cup = cup + pourSize;
  pours = pours + 1;
} while (cup < target);

console.log(pours);
console.log(cup);
`,
  },
];

const LESSONS: Lesson[] = [
  letConstLesson,
  typesLesson,
  operatorsLesson,
  specialValuesLesson,
  doorLesson,
  forkLesson,
  conveyorLesson,
  multiGateLesson,
  stairsLesson,
  lettersLesson,
  countdownLesson,
  tastingLesson,
];

function findExerciseSlide(lesson: Lesson, title?: string): ExerciseSlide | null {
  const exerciseSlides = lesson.slides.filter(
    (s): s is ExerciseSlide => s.kind === "exercise"
  );
  if (exerciseSlides.length === 0) return null;
  if (!title) return exerciseSlides[0];
  return (
    exerciseSlides.find((s) => {
      const t = typeof s.title === "string" ? s.title : s.title.en;
      return t === title;
    }) ?? null
  );
}

/**
 * Resolve a challenge slide from any topic in `javascriptCourse.topics` by
 * matching its English title. Topic-level challenges aren't part of any lesson —
 * they live directly on `Topic.challenges[]` — so we look them up separately
 * from the per-lesson exercise iteration.
 */
function findTopicChallenge(title: string): ExerciseSlide | null {
  for (const topic of javascriptCourse.topics ?? []) {
    for (const challenge of topic.challenges ?? []) {
      const t =
        typeof challenge.title === "string" ? challenge.title : challenge.title.en;
      if (t === title) return challenge;
    }
  }
  return null;
}

type RunResult = {
  pass: boolean;
  error?: string;
};

// Mirror of the iframe's loop guard. Inject a __checkLoop call at the start
// of every loop body so an infinite loop in a solution throws here instead of
// hanging the harness process.
const LOOP_GUARD_MAX = 10000;
function instrumentLoops(src: string): string {
  let id = 0;
  return src.replace(
    /(\bwhile\s*\([^()]*\)\s*\{|\bdo\s*\{|\bfor\s*\([^()]*\)\s*\{)/g,
    (m) => `${m} __checkLoop(${id++});`
  );
}

function runLab(lab: LabCase, slide: ExerciseSlide): RunResult[] {
  // Build a fresh sandbox per lab — same shape as the iframe window.
  const win: Record<string, unknown> = {};
  win.__console = [] as Array<{ level: string; text: string }>;
  win.__userSrc = lab.solution;

  const loopCounters: Record<number, number> = {};
  const sandbox: Record<string, unknown> = {
    window: win,
    Number,
    String,
    Boolean,
    Array,
    Object,
    JSON,
    RegExp,
    Math,
    __checkLoop: (id: number) => {
      loopCounters[id] = (loopCounters[id] || 0) + 1;
      if (loopCounters[id] > LOOP_GUARD_MAX) {
        throw new Error(
          `Loop exceeded ${LOOP_GUARD_MAX} iterations — looks like an infinite loop.`
        );
      }
    },
    console: {
      log: (...args: unknown[]) => pushConsole("log", args),
      error: (...args: unknown[]) => pushConsole("error", args),
      warn: (...args: unknown[]) => pushConsole("warn", args),
      info: (...args: unknown[]) => pushConsole("info", args),
    },
  };

  function pushConsole(level: string, args: unknown[]) {
    const text = args
      .map((a) => {
        if (typeof a === "string") return a;
        if (a === undefined) return "undefined";
        if (a === null) return "null";
        if (typeof a === "number" && Number.isNaN(a)) return "NaN";
        if (a === Infinity) return "Infinity";
        if (a === -Infinity) return "-Infinity";
        try {
          return JSON.stringify(a);
        } catch {
          return String(a);
        }
      })
      .join(" ");
    (win.__console as Array<{ level: string; text: string }>).push({
      level,
      text,
    });
  }

  vm.createContext(sandbox);

  // Run the user's solution (instrumented). Errors bubble up so the harness
  // reports them as a console.error entry.
  try {
    vm.runInContext(instrumentLoops(lab.solution), sandbox);
  } catch (e) {
    const msg = e instanceof Error ? `${e.name}: ${e.message}` : String(e);
    (win.__console as Array<{ level: string; text: string }>).push({
      level: "error",
      text: msg,
    });
  }

  // Evaluate every assertion as a function body, exactly like the runner does.
  return slide.tests.map((t) => {
    try {
      const fnSrc = `(function(){ ${t.assert} }).call(window)`;
      const value = vm.runInContext(fnSrc, sandbox);
      return { pass: !!value };
    } catch (e) {
      const msg = e instanceof Error ? `${e.name}: ${e.message}` : String(e);
      return { pass: false, error: msg };
    }
  });
}

// --------------- run ---------------

let totalTests = 0;
let totalPass = 0;
let labFailures = 0;

for (const lab of SOLUTIONS) {
  // Lessons are looked up first. If no lesson matches, try resolving the title
  // against any topic's `challenges[]` — that's where topic-level challenges
  // (e.g. "Challenge: budget tracker") live.
  const lesson = LESSONS.find((l) => l.id === lab.lessonId);
  let slide: ExerciseSlide | null = null;
  let displayId: string;

  if (lesson) {
    slide = findExerciseSlide(lesson, lab.exerciseTitle);
    displayId = lesson.id;
    if (!slide) {
      const which = lab.exerciseTitle ? ` (title: ${lab.exerciseTitle})` : "";
      console.error(`✗ No exercise slide in: ${lab.lessonId}${which}`);
      labFailures++;
      continue;
    }
  } else if (lab.exerciseTitle) {
    slide = findTopicChallenge(lab.exerciseTitle);
    displayId = lab.lessonId;
    if (!slide) {
      console.error(
        `✗ No lesson or topic-challenge found: ${lab.lessonId} (title: ${lab.exerciseTitle})`
      );
      labFailures++;
      continue;
    }
  } else {
    console.error(`✗ Lesson not found: ${lab.lessonId}`);
    labFailures++;
    continue;
  }

  console.log(`\n━━━ ${displayId} — ${typeof slide.title === "string" ? slide.title : slide.title.en} ━━━`);

  const results = runLab(lab, slide);
  let labPass = 0;
  results.forEach((r, i) => {
    const label =
      typeof slide.tests[i].label === "string"
        ? (slide.tests[i].label as string)
        : (slide.tests[i].label as { en: string }).en;
    if (r.pass) {
      console.log(`  ✓ ${label}`);
      labPass++;
    } else {
      console.log(`  ✗ ${label}${r.error ? ` (${r.error})` : ""}`);
    }
  });
  totalTests += results.length;
  totalPass += labPass;
  if (labPass !== results.length) labFailures++;

  console.log(`  → ${labPass}/${results.length} passing`);
}

console.log(
  `\n━━━ exercise summary: ${totalPass}/${totalTests} tests passing across ${SOLUTIONS.length} labs ━━━`
);
if (labFailures > 0) {
  console.log(`  ✗ ${labFailures} lab(s) had failures`);
  process.exit(1);
}
console.log("  ✓ all labs green");

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Workshop tier — walk every js-workshop slide and verify each step's reveal.
//
// No SOLUTIONS array needed: the canonical solution per step is the authored
// `reveal` field on the WorkshopStep, which the next step's starterCode also
// builds on. We import the same runWorkshopChecks the React layer calls — no
// vm/iframe simulation needed because the runner is in-process by design.
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

let workshopChecksTotal = 0;
let workshopChecksPass = 0;
let workshopStepFailures = 0;
let workshopSlideCount = 0;

function runWorkshop(
  workshop: JsWorkshopSlide,
  scopeLabel: string
): void {
  workshopSlideCount++;
  const title =
    typeof workshop.title === "string" ? workshop.title : workshop.title.en;
  console.log(`\n━━━ ${scopeLabel} — ${title} (workshop) ━━━`);

  for (const step of workshop.steps) {
    if (!step.reveal) {
      console.log(`  ⚠ ${step.id} — no reveal authored (skipping)`);
      continue;
    }
    const code =
      typeof step.reveal === "string" ? step.reveal : step.reveal.en;
    const results = runWorkshopChecks(code, step.checks);
    workshopChecksTotal += results.length;
    workshopChecksPass += results.filter((r) => r.pass).length;

    if (results.every((r) => r.pass)) {
      console.log(`  ✓ ${step.id} (${results.length} checks)`);
    } else {
      console.log(`  ✗ ${step.id}`);
      results.forEach((r, i) => {
        if (r.pass) return;
        const check = step.checks[i];
        const msg =
          typeof check.message === "string"
            ? check.message
            : check.message.en;
        const kind = "kind" in r ? r.kind : "?";
        const err = "error" in r ? ` (${r.error})` : "";
        console.log(`     ${i}: [${kind}] ${msg}${err}`);
      });
      workshopStepFailures++;
    }
  }
}

// Lesson-level workshops.
for (const lesson of LESSONS) {
  const workshops = lesson.slides.filter(
    (s): s is JsWorkshopSlide => s.kind === "js-workshop"
  );
  for (const workshop of workshops) {
    runWorkshop(workshop, lesson.id);
  }
}

// Topic-level walkthroughs (same shape as JsWorkshopSlide; one per topic).
for (const topic of javascriptCourse.topics ?? []) {
  for (const walkthrough of topic.walkthroughs ?? []) {
    runWorkshop(walkthrough, `${topic.id} (walkthrough)`);
  }
}

if (workshopSlideCount > 0) {
  console.log(
    `\n━━━ workshop summary: ${workshopChecksPass}/${workshopChecksTotal} checks passing across ${workshopSlideCount} workshop slide(s) ━━━`
  );
  if (workshopStepFailures > 0) {
    console.log(`  ✗ ${workshopStepFailures} step(s) had failures`);
    process.exit(1);
  }
  console.log("  ✓ all workshop reveals green");
}

// --------------- loop-guard smoke test ---------------
//
// Confirm the infinite-loop guard actually fires. We run a deliberately bad
// while-loop through the same instrumented runner; if the guard works, it
// throws within milliseconds. If the guard is broken or removed, this would
// hang the harness — which is itself a useful signal.
console.log("\n━━━ loop guard smoke test ━━━");
{
  const sandbox: Record<string, unknown> = {
    window: { __console: [] as Array<{ level: string; text: string }> },
    Number,
    Math,
    __checkLoop: (() => {
      const counters: Record<number, number> = {};
      return (id: number) => {
        counters[id] = (counters[id] || 0) + 1;
        if (counters[id] > LOOP_GUARD_MAX) {
          throw new Error("Loop guard fired");
        }
      };
    })(),
  };
  vm.createContext(sandbox);
  const badSrc = "let n = 0; while (n < 100) { /* forgot n++ */ }";
  const start = Date.now();
  let caught: string | null = null;
  try {
    vm.runInContext(instrumentLoops(badSrc), sandbox, { timeout: 3000 });
  } catch (e) {
    caught = e instanceof Error ? e.message : String(e);
  }
  const ms = Date.now() - start;
  if (caught && ms < 1000) {
    console.log(`  ✓ infinite loop trapped after ${ms}ms (${caught})`);
  } else if (!caught) {
    console.log(`  ✗ guard did NOT fire — bad solution ran to completion (${ms}ms)`);
    process.exit(1);
  } else {
    console.log(`  ✗ guard fired but took ${ms}ms — too slow`);
    process.exit(1);
  }
}

// --------------- workshop runner smoke test ---------------
//
// Verifies invariants of runWorkshopChecks against fixed fixtures, independent
// of any lesson content. If the runner's behavior regresses (comment-stripping,
// lexical scope visibility from the assert IIFE, error capture), a per-lesson
// reveal might still pass while the runner is silently broken. These guard the
// runner itself.
console.log("\n━━━ workshop runner smoke test ━━━");
{
  const TRIVIAL_MSG = { en: "", sv: "" };
  type SmokeCase = {
    label: string;
    src: string;
    checks: WorkshopCheck[];
    expectAllPass: boolean;
  };
  const cases: SmokeCase[] = [
    {
      label: "comment-stripping defense — commented match doesn't satisfy",
      src: "// let lux = 5;\nconst x = 1;\n",
      checks: [{ message: TRIVIAL_MSG, requirePattern: /\blet\s+lux\b/ }],
      expectAllPass: false,
    },
    {
      label: "lexical scope — assert reads user `let` binding",
      src: "let lux = 42;\n",
      checks: [{ message: TRIVIAL_MSG, assert: "return lux === 42;" }],
      expectAllPass: true,
    },
    {
      label: "syntax error in user code surfaces as error result, not crash",
      src: "let lux = ;\n",
      checks: [{ message: TRIVIAL_MSG, assert: "return true;" }],
      expectAllPass: false,
    },
    {
      label: "hybrid — pattern AND assert both required",
      src: "let lux = 5;\n",
      checks: [
        {
          message: TRIVIAL_MSG,
          requirePattern: /\bconst\b/,
          assert: "return typeof lux === 'number';",
        },
      ],
      expectAllPass: false,
    },
  ];

  let smokeFailures = 0;
  for (const c of cases) {
    const results = runWorkshopChecks(c.src, c.checks);
    const allPass = results.every((r) => r.pass);
    const ok = allPass === c.expectAllPass;
    console.log(`  ${ok ? "✓" : "✗"} ${c.label}`);
    if (!ok) smokeFailures++;
  }

  // stripJsComments — direct test
  const stripped = stripJsComments(
    "let x = 1; // for loop later\n/* let y */ let z = 3;"
  );
  const strippedOk =
    !stripped.includes("for loop") && !stripped.includes("let y");
  console.log(`  ${strippedOk ? "✓" : "✗"} stripJsComments removes line and block comments`);
  if (!strippedOk) smokeFailures++;

  if (smokeFailures > 0) {
    console.log(`  ✗ ${smokeFailures} runner invariant(s) broken`);
    process.exit(1);
  }
}
