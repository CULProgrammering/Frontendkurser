/**
 * Headless test harness for the Monaco lab exercises.
 *
 * Mimics the iframe runner: sets up a vm context with a console capture and
 * window.__userSrc, evals a known-good student solution, then runs every
 * assertion exactly as the iframe would. Reports per-test pass/fail per lab.
 *
 * Run with: npx tsx scripts/test-labs.ts
 */

import vm from "node:vm";
import { doorLesson } from "../src/lessons/javascript/level1-door";
import { forkLesson } from "../src/lessons/javascript/level2-fork";
import { conveyorLesson } from "../src/lessons/javascript/level3-conveyor";
import { multiGateLesson } from "../src/lessons/javascript/level4-multigate";
import { stairsLesson } from "../src/lessons/javascript/level5-stairs";
import { lettersLesson } from "../src/lessons/javascript/level6-letters";
import { countdownLesson } from "../src/lessons/javascript/level7-countdown";
import { tastingLesson } from "../src/lessons/javascript/level8-tasting";
import type { ExerciseSlide, Lesson } from "../src/types";

type LabCase = {
  lessonId: string;
  solution: string;
};

// Known-good student solutions for each lab. Each must pass every test.
const SOLUTIONS: LabCase[] = [
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
  doorLesson,
  forkLesson,
  conveyorLesson,
  multiGateLesson,
  stairsLesson,
  lettersLesson,
  countdownLesson,
  tastingLesson,
];

function findExerciseSlide(lesson: Lesson): ExerciseSlide | null {
  for (const slide of lesson.slides) {
    if (slide.kind === "exercise") return slide;
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
  const lesson = LESSONS.find((l) => l.id === lab.lessonId);
  if (!lesson) {
    console.error(`✗ Lesson not found: ${lab.lessonId}`);
    labFailures++;
    continue;
  }
  const slide = findExerciseSlide(lesson);
  if (!slide) {
    console.error(`✗ No exercise slide in: ${lab.lessonId}`);
    labFailures++;
    continue;
  }

  console.log(`\n━━━ ${lesson.id} — ${typeof slide.title === "string" ? slide.title : slide.title.en} ━━━`);

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
  `\n━━━ summary: ${totalPass}/${totalTests} tests passing across ${SOLUTIONS.length} labs ━━━`
);
if (labFailures > 0) {
  console.log(`  ✗ ${labFailures} lab(s) had failures`);
  process.exit(1);
}
console.log("  ✓ all labs green");

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
