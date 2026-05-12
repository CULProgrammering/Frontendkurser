import type { Lesson } from "../../types";
import { codePanelStyle, noteBoxStyle } from "./_shared";

export const tastingLesson: Lesson = {
  id: "loops-tasting",
  title: "4. Tasting — do…while",
  summary: "Run the body once, THEN check.",
  slides: [
    // 1. Intro — tasting soup
    {
      kind: "explanation",
      title: "Try it first, then decide",
      intro: "Some loops only KNOW whether to repeat\nafter they've done a lap once.",
      customScene: "tasting",
      demo: [],
      steps: [
        {
          narration: "You're cooking a soup.\nA bowl is in front of you, hot and steaming.",
        },
        {
          narration: "First taste. You can't decide if it needs salt\nuntil you've TASTED it.",
        },
        {
          narration: "Hmm — needs salt. Add a pinch.",
        },
        {
          narration: "Taste again. Still not quite right.",
        },
        {
          narration: "More salt.",
        },
        {
          narration: "Taste again. Now it's good!\n\nNotice: you ALWAYS taste at least once.\nThe decision happens AFTER each taste.\nThat's a do…while loop.",
        },
      ],
    },

    // 2. while vs do…while — order of check
    {
      kind: "explanation",
      title: "while vs do…while",
      intro: "The difference is simple but important:\nWHEN does the condition get checked?",
      demo: [
        {
          id: "while",
          label:
            "while (n > 0) {\n  // check FIRST\n  // body might not run at all\n}",
          baseStyle: codePanelStyle,
        },
        {
          id: "dowhile",
          label:
            "do {\n  // body runs FIRST\n} while (n > 0);\n  // body always runs at least once",
          baseStyle: { ...codePanelStyle, marginTop: 16 },
        },
        {
          id: "note",
          kind: "note",
          label: "If n starts at 0:\n• while  →  body runs ZERO times.\n• do…while  →  body runs ONCE, then exits.\n\nThat's the whole difference.\nUse do…while when the body MUST run at least once\n— like 'taste before deciding'.",
          baseStyle: { ...noteBoxStyle, marginTop: 16 },
        },
      ],
      steps: [
        {
          narration: "Left: a regular while.\nIf the condition is false on the FIRST check,\nthe body never runs.",
          tokenHighlight: ["while (n > 0)"],
        },
        {
          narration: "Right: do…while.\nThe body runs FIRST.\nThen the condition is checked at the end.\nIf true → loop again. If false → exit.",
          tokenHighlight: ["do", "} while (n > 0);"],
        },
        {
          narration: "Example — n = 0:\n• while (n > 0): never runs.\n• do…while (n > 0): runs once, then exits.\n\nThat 'at least once' is the whole point.",
        },
      ],
    },

    // 3. Anatomy
    {
      kind: "explanation",
      title: "do…while, piece by piece",
      demo: [
        {
          id: "code",
          label:
            "do {\n  // body — always runs at least once\n} while (condition);",
          baseStyle: codePanelStyle,
        },
      ],
      steps: [
        {
          narration: "Four parts:\ndo  { body }  while ( condition ) ;",
        },
        {
          narration: "1.  do  is the keyword.\nIt opens the body block.",
          tokenHighlight: ["do"],
        },
        {
          narration: "2.  { body }  is run once UNCONDITIONALLY,\nthen possibly again.",
          tokenHighlight: ["{", "}"],
        },
        {
          narration: "3.  while ( condition )  is checked AFTER the body.\nSame kind of expression as in a regular while.",
          tokenHighlight: ["while (condition)"],
        },
        {
          narration: "4.  ;  the semicolon at the end IS REQUIRED.\nUnlike while and for, do…while ends with a semicolon\nbecause it ends with an expression, not a block.",
          tokenHighlight: [";"],
        },
      ],
    },

    // 4. Trace
    {
      kind: "explanation",
      title: "Watching do…while run",
      intro: "Trace example: n = 2.\nThe body subtracts 1 from n and counts a tick.\nWatch the body run BEFORE the condition is checked.",
      customScene: "tasting-trace",
      demo: [],
      steps: [
        {
          narration: "Set n = 2 and count = 0.",
        },
        {
          narration: "We hit do.\nThe body will run — no condition checked yet.",
        },
        {
          narration: "Body runs. count becomes 1, n becomes 1.\nFirst 'taste'.",
        },
        {
          narration: "NOW the condition.\n1 > 0? True. Loop back.",
        },
        {
          narration: "Body runs again. count becomes 2, n becomes 0.\nSecond 'taste'.",
        },
        {
          narration: "Condition again.\n0 > 0? FALSE. Leave the loop.",
        },
        {
          narration: "return count → 2.\n\nNotice: even if n had started at 0,\nthe body would still have run once.",
        },
      ],
    },

    // 5. Practice — at least one subtraction — chip-style, no distractors (first chip in L8)
    {
      kind: "js-chip-assignment",
      title: "Practice: subtract 7",
      prompt: "Subtract 7 in a do…while loop. Keep going while n is positive.\nThe body runs at least once — even for n = 0.",
      puzzles: [
        // p1: do keyword (vs while/for/if)
        {
          prompt: "Which keyword opens the body that runs first?",
          template:
            "let count = 0;\n[[]] {\n  n = n - 7;\n  count = count + 1;\n} while (n > 0);\nreturn count;",
          chips: ["do", "while", "for", "if"],
          solution: ["do"],
        },
        // p2: while keyword after the closing }
        {
          prompt: "Which keyword comes after the closing } to check the condition?",
          template:
            "let count = 0;\ndo {\n  n = n - 7;\n  count = count + 1;\n} [[]] (n > 0);\nreturn count;",
          chips: ["while", "do", "for", "if"],
          solution: ["while"],
        },
        // p3: ; semicolon at the very end (vs , . :)
        {
          prompt: "What ends the do…while statement?",
          template:
            "let count = 0;\ndo {\n  n = n - 7;\n  count = count + 1;\n} while (n > 0)[[]]\nreturn count;",
          chips: [";", ",", ".", ":"],
          solution: [";"],
        },
        // p4: ( ) around the while condition (add 5 scenario)
        {
          intro: "Same shape — add 5 until n reaches 100.",
          prompt: "What wraps the while condition?",
          template:
            "let count = 0;\ndo {\n  n = n + 5;\n  count = count + 1;\n} while [[]]n < 100[[]];\nreturn count;",
          chips: ["(", ")", "{", "}"],
          solution: ["(", ")"],
        },
        // p5: synthesis — all syntax pieces together
        {
          prompt: "Now place all the syntax pieces you've practised.",
          template:
            "let count = 0;\n[[]] {\n  n = n - 7;\n  count = count + 1;\n} [[]] [[]]n > 0[[]][[]]\nreturn count;",
          chips: ["do", "while", "(", ")", ";", "for", "if"],
          solution: ["do", "while", "(", ")", ";"],
        },
      ],
      legend: [
        {
          name: "do…while",
          syntax: "do { ... } while (condition);",
          example: "do { n = n - 7; } while (n > 0);",
          note: "Body runs once unconditionally. After each lap, the condition decides whether to repeat.",
        },
      ],
    },

    // 6. Final — keep doubling until limit (typed-input)
    {
      kind: "js-typed-assignment",
      title: "Final: doubling",
      prompt: "Start at `n` (a positive number).\nDouble it (multiply by 2) in a loop.\nKeep going WHILE n is still less than `limit`.\nReturn how many doublings you did.\n\nBecause do…while runs the body once first,\neven if n is already past the limit on entry,\nyou still count one doubling.",
      varNames: ["n", "limit"],
      template:
        "let count = 0;\ndo {\n  n = [[input:body]];\n  count = count + 1;\n} while ([[input:cond]]);\nreturn count;\n",
      tests: [
        { label: "n=1, limit=10", vars: { n: 1, limit: 10 }, expected: 4 },
        { label: "n=1, limit=2", vars: { n: 1, limit: 2 }, expected: 1 },
        { label: "n=5, limit=3", vars: { n: 5, limit: 3 }, expected: 1 },
        { label: "n=2, limit=100", vars: { n: 2, limit: 100 }, expected: 6 },
        { label: "n=1, limit=1000", vars: { n: 1, limit: 1000 }, expected: 10 },
      ],
      goalHint: "The body box doubles n: use  n * 2. The condition box keeps going while n is below limit: use  n < limit.",
      allegory: {
        kind: "loop-result",
        config: {
          inputKeys: ["n", "limit"],
          resultLabel: "doublings",
          theme: "tasting",
        },
      },
      legend: [
        {
          name: "<",
          syntax: "a < b",
          example: "n < limit",
          note: "True when a is strictly less than b.",
        },
      ],
    },

    // Workshop tier — guided micro-steps for `do…while`.
    // Surface: keep doubling a starting value until it exceeds 1000; count
    // the doublings. Distinct from chips (n/limit) and exercise (target/
    // pourSize/cup/pours). The do…while shape ensures the body runs at least
    // once even when the start already satisfies the exit condition.
    {
      kind: "js-workshop",
      title: "Workshop: keep doubling",
      prompt: "Use a `do…while` loop to keep doubling a number until it exceeds 1000.\nThe body always runs at least once.",
      designNote:
        "L8 do…while workshop. Surface: value/steps (keep doubling). Distinct from chips (n/limit) and exercise (target/pourSize/cup/pours). The starterCode for the final step uses an initial value already > 1000 to highlight do…while's at-least-once property — but the assert tolerates either case.",
      steps: [
        {
          id: "double-declare-value",
          instruction: "Use `let` to declare `value` and assign it any positive number.",
          starterCode: "// Declare value below.\n",
          checks: [
            {
              message: "Use `let` to declare a variable named `value`.",
              requirePattern: /\blet\s+value\b/,
            },
            {
              message: "`value` should hold a positive number.",
              assert: "return typeof value === 'number' && value > 0;",
            },
          ],
          reveal: "let value = 50;\n",
        },
        {
          id: "double-declare-steps",
          instruction: "Below `value`, use `let` to declare `steps` and start it at 0 — the loop counts doublings.",
          starterCode: "let value = 50;\n// Declare steps = 0 below.\n",
          checks: [
            {
              message: "Use `let` to declare a variable named `steps`.",
              requirePattern: /\blet\s+steps\b/,
            },
            {
              message: "`steps` should start at 0.",
              assert: "return steps === 0;",
            },
          ],
          reveal: "let value = 50;\nlet steps = 0;\n",
        },
        {
          id: "double-do-while-skeleton",
          instruction: "Write the `do…while` skeleton. The loop should keep running while `value` is still 1000 or below. Leave the body empty for now — note that a `do…while` ends with a semicolon after the while-condition.",
          starterCode: "let value = 50;\nlet steps = 0;\n// Add the do { } while (value <= 1000); skeleton, body empty.\n",
          checks: [
            {
              message: "Open with `do {`.",
              requirePattern: /\bdo\s*\{/,
            },
            {
              message: "Close with `} while (value <= 1000);`.",
              requirePattern: /\}\s*while\s*\(\s*value\s*<=\s*1000\s*\)\s*;/,
            },
          ],
          reveal: "let value = 50;\nlet steps = 0;\ndo {\n} while (value <= 1000);\n",
        },
        {
          id: "double-loop-body",
          instruction: "Inside the do block, double `value` and count the doubling in `steps`. Note: the starterCode already has `value` over 1000 — try Check, then look at `steps`. The body runs at least once even when the condition is already false.",
          starterCode: "let value = 2000;\nlet steps = 0;\ndo {\n  // Double value, then increment steps.\n} while (value <= 1000);\n",
          checks: [
            {
              message: "Double `value` (e.g. `value = value * 2` or `value *= 2`).",
              requirePattern: /\bvalue\s*=\s*value\s*\*\s*2\b|\bvalue\s*\*=\s*2\b/,
            },
            {
              message: "Increment `steps` (e.g. `steps++`).",
              requirePattern: /\bsteps\s*\+\+|\bsteps\s*\+=\s*1\b|\bsteps\s*=\s*steps\s*\+\s*1\b/,
            },
            {
              message: "Even when `value` started above 1000, `steps` should be at least 1 — the do block runs once.",
              assert: "return steps >= 1;",
            },
          ],
          reveal: "let value = 2000;\nlet steps = 0;\ndo {\n  value = value * 2;\n  steps++;\n} while (value <= 1000);\n",
        },
      ],
      legend: [
        {
          name: "do…while",
          syntax: "do { ... } while (condition);",
          example: "do { value *= 2; steps++; } while (value <= 1000);",
          note: "Like while, but the body runs at least once before the condition is checked.",
        },
        {
          name: "*=",
          syntax: "x *= y",
          example: "value *= 2",
          note: "Shorthand for `x = x * y`.",
        },
      ],
    },

    // L8 final lab — refill a cup. Body must run at least once (do…while);
    // counts pours of a fixed size until target is reached. Distinct from
    // the chapter's tasting/subtract-7/doubling exercises.
    {
      kind: "exercise",
      title: "Lab: Refill a Cup",
      prompt: "Pour a fixed amount of water into a cup until it's full enough; count the pours.\n\n" +
          "User stories (variable names are suggestions):\n" +
          "1. Declare a number variable (e.g. target) — the desired amount in ml (e.g. 250).\n" +
          "2. Declare a number variable (e.g. pourSize) — how much each pour adds (e.g. 60).\n" +
          "3. Declare a number variable (e.g. cup) and set it to 0.\n" +
          "4. Declare a number variable (e.g. pours) and set it to 0.\n" +
          "5. Use a do…while loop: each iteration adds pourSize to cup and increments pours by 1.\n" +
          "   The loop continues while cup < target.\n" +
          "6. Print pours.\n" +
          "7. Print cup (the final volume).\n\n" +
          "do…while runs the body once before checking the condition — useful when at least one pour must happen.",
      starterJs:
        "// Follow the user stories shown to the left.\n\n" +
        "// 1-4. Declare target, pourSize, cup, pours:\n\n\n\n\n\n" +
        "// 5. do { ... } while (cup < target);\n\n\n\n\n" +
        "// 6-7. Print pours, then cup:\n\n",
      tests: [
        {
          label: "Console shows exactly two lines",
          assert:
            "var c = window.__console || []; return c.length === 2;",
          hint: "One console.log for pours, one for cup — both AFTER the loop ends.",
        },
        {
          label: "Each variable you print is one you declared",
          assert:
            "var src = window.__userSrc || '';" +
            "var logs = []; var re = /console\\.log\\s*\\(\\s*([A-Za-z_$][A-Za-z0-9_$]*)\\s*\\)/g;" +
            "var m; while ((m = re.exec(src)) !== null) logs.push(m[1]);" +
            "if (logs.length === 0) return false;" +
            "for (var i = 0; i < logs.length; i++) {" +
            "  var name = logs[i];" +
            "  var d = new RegExp('(?:let|const|var|function)\\\\s+' + name + '\\\\b');" +
            "  if (!d.test(src)) return false;" +
            "}" +
            "return true;",
          hint: "If a console.log line shows nothing or the wrong value, double-check the variable name — it must match what you declared with let.",
        },
        {
          label: "Line 1 (pours) is a positive whole number",
          assert:
            "var c = window.__console || [];" +
            "if (c.length < 1) return false;" +
            "var p = Number(c[0].text);" +
            "return Number.isInteger(p) && p > 0;",
          hint: "pours must be at least 1 because do…while always runs the body once.",
        },
        {
          label: "Line 2 (cup) equals pours × pourSize",
          assert:
            "var c = window.__console || [];" +
            "if (c.length < 2) return false;" +
            "var pours = Number(c[0].text);" +
            "var cup = Number(c[1].text);" +
            "if (!Number.isFinite(pours) || !Number.isFinite(cup)) return false;" +
            "if (pours <= 0 || cup <= 0) return false;" +
            "var pourSize = cup / pours;" +
            "return Number.isFinite(pourSize) && pourSize > 0 && Math.abs(pours * pourSize - cup) < 0.0001;",
          hint: "Inside the loop: cup = cup + pourSize; pours = pours + 1. cup ends up as a multiple of pourSize.",
        },
        {
          label: "Code uses do…while",
          assert:
            "var src = window.__userSrc || '';" +
            "return /\\bdo\\s*\\{[\\s\\S]*\\}\\s*while\\s*\\(/.test(src);",
          hint: "Use the form: do { ... } while (cup < target);",
        },
      ],
    },
  ],
};
