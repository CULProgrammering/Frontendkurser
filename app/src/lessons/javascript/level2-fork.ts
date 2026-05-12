import type { Lesson } from "../../types";
import { codePanelStyle, noteBoxStyle } from "./_shared";

export const forkLesson: Lesson = {
  id: "conditionals-wardrobe",
  title: "2. Wardrobe — else if",
  summary: "Pick an outfit by the temperature.",
  slides: [
    // 1. Intro — wardrobe stick-figure scene
    {
      kind: "explanation",
      title: "More than two answers",
      intro: "Sometimes there are more than two outcomes.",
      customScene: "wardrobe",
      demo: [],
      steps: [
        {
          narration: "You stand in front of your wardrobe.\nWhat to wear depends on the temperature.",
        },
        {
          narration: "Cold? You grab the winter coat.",
        },
        {
          narration: "Mild? A jacket is enough.",
        },
        {
          narration: "Warm? Just a t-shirt.",
        },
      ],
    },

    // 2. Why if/else isn't enough — motivation
    {
      kind: "explanation",
      title: "Two paths aren't always enough",
      intro: "if and else give you exactly two paths.\nBut sometimes you have three (or more) outcomes.",
      demo: [
        {
          id: "code",
          label:
            'if (temp <= 0) {\n  return "coat";\n} else {\n  // jacket OR t-shirt?\n  // we can\'t tell with just else\n}',
          baseStyle: codePanelStyle,
        },
      ],
      steps: [
        {
          narration: "With if/else there are only two outcomes.\nWe can split cold from not-cold,\nbut we can't tell mild from warm.",
          tokenHighlight: ["if", "else"],
        },
        {
          narration: "We need to ASK A SECOND QUESTION\nwhen the first answer was no.\nThat's what else if is for.",
        },
      ],
    },

    // 3. Anatomy of the chain
    {
      kind: "explanation",
      title: "if / else if / else",
      demo: [
        {
          id: "code",
          label:
            'if (temp <= 0) {\n  return "coat";\n} else if (temp <= 15) {\n  return "jacket";\n} else {\n  return "shirt";\n}',
          baseStyle: codePanelStyle,
        },
      ],
      steps: [
        {
          narration: "Three branches. Each one is a question OR a fallback.",
        },
        {
          narration: "1.  if  is the first question.\nIf the answer is yes, that branch runs and we're done.",
          tokenHighlight: ["if (temp <= 0)"],
        },
        {
          narration: "2.  else if  means 'otherwise, if'.\nIt only asks its question when the FIRST one was false.\nYou can chain as many else if's as you like.",
          tokenHighlight: ["else if"],
        },
        {
          narration: "3.  else  at the very end is the fallback.\nIt runs when NOTHING above matched.",
          tokenHighlight: ["} else {"],
        },
        {
          narration: "Important rule: only ONE branch runs.\nThe first one whose question is true wins.\nThe rest are skipped — not even checked.",
        },
      ],
    },

    // 4. Trace walkthrough — step through three temperatures
    {
      kind: "explanation",
      title: "Watching the chain run",
      intro: "Same idea as last lesson — read the code line by line.\nThis time we'll do it three times: -5°, then 10°, then 25°.",
      customScene: "wardrobe-trace",
      demo: [],
      steps: [
        {
          narration: "On the left is the code. On the right, a thermometer and a figure.\nClick to step forward.",
        },
        {
          narration: "First we set temp to -5.",
        },
        {
          narration: "We reach the if. It asks: is temp <= 0?",
        },
        {
          narration: "-5 <= 0 is true.\nThe if's branch runs.",
        },
        {
          narration: 'return "coat".\nThe rest of the chain (else if, else) is SKIPPED entirely.',
        },
        {
          narration: "Now change temp to 10 and run the same code again.",
        },
        {
          narration: "Reach the if. Is temp <= 0?",
        },
        {
          narration: "10 <= 0 is false.\nWe move on to the else if.",
        },
        {
          narration: "The else if asks its OWN question: is temp <= 15?",
        },
        {
          narration: "10 <= 15 is true.\nThis branch runs.",
        },
        {
          narration: 'return "jacket". The else is skipped.',
        },
        {
          narration: "Last time. Set temp to 25.",
        },
        {
          narration: "Reach the if. Is temp <= 0?",
        },
        {
          narration: "25 <= 0 is false. Move on.",
        },
        {
          narration: "else if asks: is temp <= 15?",
        },
        {
          narration: "25 <= 15 is also false.\nThe else if's branch is skipped too.",
        },
        {
          narration: "Now we hit the final else.\nThis is the fallback — it runs no matter what.",
        },
        {
          narration: 'return "shirt".\n\nThree temperatures, three different outcomes — same code.',
        },
      ],
    },

    // 5. Practice — pick an outfit — chip-style, no distractors (first chip in L2)
    {
      kind: "js-chip-assignment",
      title: "Practice: pick an outfit",
      prompt: "Build the if / else-if / else chain piece by piece.",
      puzzles: [
        // p1: else if keywords (both needed, vs while/or)
        {
          prompt: "Which two keywords open the middle branch?",
          template:
            'if (temp <= 0) {\n  return "coat";\n} [[]] [[]] (temp <= 15) {\n  return "jacket";\n} else {\n  return "shirt";\n}',
          chips: ["else", "if", "while", "or"],
          solution: ["else", "if"],
        },
        // p2: ( ) around the else-if condition
        {
          prompt: "What wraps the else-if condition?",
          template:
            'if (temp <= 0) {\n  return "coat";\n} else if [[]]temp <= 15[[]] {\n  return "jacket";\n} else {\n  return "shirt";\n}',
          chips: ["(", ")", "{", "}"],
          solution: ["(", ")"],
        },
        // p3: <= operator in the middle condition
        {
          prompt: "Which operator means 'less than or equal'?",
          template:
            'if (temp <= 0) {\n  return "coat";\n} else if (temp [[]] 15) {\n  return "jacket";\n} else {\n  return "shirt";\n}',
          chips: ["<=", "<", ">=", "==="],
          solution: ["<="],
        },
        // p4: { } around the else-if body (hour scenario)
        {
          intro: "Same shape — morning, afternoon, or evening.",
          prompt: "What wraps the else-if body?",
          template:
            'if (hour <= 11) {\n  return "morning";\n} else if (hour <= 17) [[]]\n  return "afternoon";\n[[]] else {\n  return "evening";\n}',
          chips: ["{", "}", "(", ")"],
          solution: ["{", "}"],
        },
        // p5: synthesis — all syntax pieces together
        {
          prompt: "Now place all the syntax pieces you've practised.",
          template:
            'if (temp <= 0) {\n  return "coat";\n} [[]] [[]] [[]]temp [[]] 15[[]] [[]]\n  return "jacket";\n[[]] else {\n  return "shirt";\n}',
          chips: ["else", "if", "(", "<=", ")", "{", "}", "<", "while"],
          solution: ["else", "if", "(", "<=", ")", "{", "}"],
        },
      ],
      legend: [
        {
          name: "else if",
          syntax: "} else if (condition) { ... }",
          example: "} else if (temp <= 15) { ... }",
          note: "Only checked when the conditions above were false.",
        },
        {
          name: "else",
          syntax: "} else { ... }",
          example: '} else { return "shirt"; }',
          note: "The fallback. Runs when nothing above matched.",
        },
        {
          name: "<=",
          syntax: "a <= b",
          example: "temp <= 15",
          note: "True when a is less than or equal to b.",
        },
      ],
    },

    // 6. Order matters — the buggy chain
    {
      kind: "explanation",
      title: "Order matters",
      intro: "Only ONE branch runs — the first one whose question is true.\nThat means the ORDER of your conditions matters a lot.",
      demo: [
        {
          id: "code",
          label:
            'if (temp <= 25) {\n  return "shirt";\n} else if (temp <= 0) {\n  return "coat";\n}\n// freezing winter? returns "shirt".',
          baseStyle: codePanelStyle,
        },
        {
          id: "warning",
          kind: "note",
          label: "Same conditions, wrong order:\n-5 <= 25 is true,\nso the chain stops at the FIRST branch\nand returns 'shirt' even though it's freezing.",
          baseStyle: { ...noteBoxStyle, marginTop: 16 },
        },
      ],
      steps: [
        {
          narration: "Look at this chain. It LOOKS like it covers the cases —\nbut the order is wrong.",
        },
        {
          narration: "If temp = -5,\nthe first question is: is -5 <= 25?\nYes! So it returns 'shirt'.\nThe coat branch is never even checked.",
          tokenHighlight: ["temp <= 25", '"shirt"'],
        },
        {
          narration: "Rule of thumb: write the NARROWEST condition first.\nFreezing first, then cold, then mild.\nThe widest condition (or else) goes LAST.",
        },
        {
          narration: "Why? Because each branch only runs\nwhen ALL the ones above were false.\nNarrow first means the others can assume 'we know it's NOT freezing'.",
        },
      ],
    },

    // 7. Final — grade banding (typed-input)
    {
      kind: "js-typed-assignment",
      title: "Final: a grade for the score",
      prompt: "Write a chain that returns a grade based on score (0–100):\n• \"A\" if >= 90\n• \"B\" if >= 75\n• \"C\" if >= 50\n• \"F\" otherwise.\n\nThink about the order — type each condition into its box.",
      varNames: ["score"],
      template:
        'if ([[input:c1]]) {\n  return "A";\n} else if ([[input:c2]]) {\n  return "B";\n} else if ([[input:c3]]) {\n  return "C";\n} else {\n  return "F";\n}\n',
      tests: [
        { label: "100", vars: { score: 100 }, expected: "A" },
        { label: "95", vars: { score: 95 }, expected: "A" },
        { label: "90", vars: { score: 90 }, expected: "A" },
        { label: "80", vars: { score: 80 }, expected: "B" },
        { label: "75", vars: { score: 75 }, expected: "B" },
        { label: "60", vars: { score: 60 }, expected: "C" },
        { label: "50", vars: { score: 50 }, expected: "C" },
        { label: "30", vars: { score: 30 }, expected: "F" },
        { label: "0", vars: { score: 0 }, expected: "F" },
      ],
      goalHint: "Use >= for the conditions. Put the highest threshold (90) FIRST and work down.",
      allegory: {
        kind: "fork",
        config: {
          conditionLabel: "grade for score",
          inputKey: "score",
          branches: [
            { key: "A", label: "A" },
            { key: "B", label: "B" },
            { key: "C", label: "C" },
            { key: "F", label: "F" },
          ],
        },
      },
      legend: [
        {
          name: ">=",
          syntax: "a >= b",
          example: "score >= 90",
          note: "True when a is greater than or equal to b.",
        },
      ],
    },

    // Workshop tier — guided micro-steps. Pilot content for the L2 fork
    // lesson. Surface-shifted from Chips (wardrobe/temp), Typed-Assignment
    // (grade/score), and Exercise (battery/level): wind speed → sailing flag.
    //
    // Each step's starterCode changes the test value of `wind` so the
    // newly-added branch is exercised by the assert. This deliberately
    // deviates from "reveal of N == starterCode of N+1" on the wind-init
    // line — the structural code carries forward, only the test value flips.
    {
      kind: "js-workshop",
      title: "Workshop: wind to flag",
      prompt: "Build a classifier that picks a sailing flag from a wind speed.\nOne branch at a time, type each piece into the editor.",
      designNote:
        "Pilot Workshop for L2-fork. Six steps build a 4-branch if/else-if/else chain over the wind-flag domain. Surface chosen to differ from chips (wardrobe), typed-assignment (grades), and exercise (battery). Wind init value flips per step to exercise each newly-added branch via a single-shot assert. String values inside each branch are NOT pinned — checks only require `typeof flag === 'string'`, leaving the student free to label branches creatively. Canonical labels (\"calm\", etc.) appear in subsequent steps' starterCode reveals so the student sees them organically. Threshold numbers (10, 25, 50) ARE pinned because they encode the lesson's branch ordering.",
      steps: [
        {
          id: "wind-declare-input",
          instruction: "Use `let` to declare a variable called `wind` and assign it any number (knots — wind speed).",
          starterCode: "// Declare wind below.\n",
          checks: [
            {
              message: "Use `let` to declare a variable named `wind`.",
              requirePattern: /\blet\s+wind\b/,
            },
            {
              message: "`wind` should hold a number.",
              assert: "return typeof wind === 'number';",
            },
          ],
          reveal: "let wind = 30;\n",
        },
        {
          id: "wind-declare-flag",
          instruction: "Below `wind`, use `let` to declare `flag` with no value yet — the branches you'll add next will set it.",
          starterCode: "let wind = 30;\n// Declare flag below (no value).\n",
          checks: [
            {
              message: "Use `let` to declare a variable named `flag`.",
              requirePattern: /\blet\s+flag\b/,
            },
            {
              message: "Don't assign `flag` yet — the if-branches will set its value.",
              assert: "return typeof flag === 'undefined';",
            },
          ],
          reveal: "let wind = 30;\nlet flag;\n",
        },
        {
          id: "wind-if-calm",
          instruction: "Add an `if` for the calmest range — wind at most 10. Inside, set `flag` to a string (the lesson uses `\"calm\"`).",
          starterCode: "let wind = 5;\nlet flag;\n// Add an if that sets flag to a string when wind <= 10.\n",
          checks: [
            {
              message: "Use `if` to start the branch.",
              requirePattern: /\bif\s*\(/,
            },
            {
              message: "Compare `wind` to `10` with `<=`.",
              requirePattern: /wind\s*<=\s*10\b/,
            },
            {
              message: "Inside the branch, set `flag` to a string.",
              assert: "return typeof flag === 'string';",
            },
          ],
          reveal: "let wind = 5;\nlet flag;\nif (wind <= 10) {\n  flag = \"calm\";\n}\n",
        },
        {
          id: "wind-elseif-small-craft",
          instruction: "After the `if`, add an `else if` for the next range — wind at most 25. Inside, set `flag` to a string (the lesson uses `\"small craft\"`).",
          starterCode: "let wind = 20;\nlet flag;\nif (wind <= 10) {\n  flag = \"calm\";\n}\n// Add an else if for wind <= 25 that sets flag to a string.\n",
          checks: [
            {
              message: "Use `else if` to add the next branch.",
              requirePattern: /\belse\s+if\s*\(/,
            },
            {
              message: "Compare `wind` to `25` with `<=`.",
              requirePattern: /wind\s*<=\s*25\b/,
            },
            {
              message: "Inside the new branch, set `flag` to a string.",
              assert: "return typeof flag === 'string';",
            },
          ],
          reveal: "let wind = 20;\nlet flag;\nif (wind <= 10) {\n  flag = \"calm\";\n} else if (wind <= 25) {\n  flag = \"small craft\";\n}\n",
        },
        {
          id: "wind-elseif-gale",
          instruction: "Add another `else if` for the next range — wind at most 50. Inside, set `flag` to a string (the lesson uses `\"gale\"`).",
          starterCode: "let wind = 40;\nlet flag;\nif (wind <= 10) {\n  flag = \"calm\";\n} else if (wind <= 25) {\n  flag = \"small craft\";\n}\n// Add an else if for wind <= 50 that sets flag to a string.\n",
          checks: [
            {
              message: "Compare `wind` to `50` with `<=`.",
              requirePattern: /wind\s*<=\s*50\b/,
            },
            {
              message: "Inside the new branch, set `flag` to a string.",
              assert: "return typeof flag === 'string';",
            },
          ],
          reveal: "let wind = 40;\nlet flag;\nif (wind <= 10) {\n  flag = \"calm\";\n} else if (wind <= 25) {\n  flag = \"small craft\";\n} else if (wind <= 50) {\n  flag = \"gale\";\n}\n",
        },
        {
          id: "wind-else-storm",
          instruction: "Finish the chain with a final `else` for everything that didn't match above. Set `flag` to a string (the lesson uses `\"storm\"`).",
          starterCode: "let wind = 70;\nlet flag;\nif (wind <= 10) {\n  flag = \"calm\";\n} else if (wind <= 25) {\n  flag = \"small craft\";\n} else if (wind <= 50) {\n  flag = \"gale\";\n}\n// Add a final else (no condition) that sets flag to a string.\n",
          checks: [
            {
              message: "Add a bare `else { ... }` at the end (no `if` after `else`).",
              // Bare else: `else` followed by `{` (not `if`). Whitespace tolerant.
              requirePattern: /\belse\s*\{/,
            },
            {
              message: "Inside the else, set `flag` to a string.",
              assert: "return typeof flag === 'string';",
            },
          ],
          reveal: "let wind = 70;\nlet flag;\nif (wind <= 10) {\n  flag = \"calm\";\n} else if (wind <= 25) {\n  flag = \"small craft\";\n} else if (wind <= 50) {\n  flag = \"gale\";\n} else {\n  flag = \"storm\";\n}\n",
        },
      ],
      legend: [
        {
          name: "if",
          syntax: "if (condition) { ... }",
          example: "if (wind <= 10) { flag = \"calm\"; }",
          note: "The first branch. Runs when its condition is true.",
        },
        {
          name: "else if",
          syntax: "} else if (condition) { ... }",
          example: "} else if (wind <= 25) { flag = \"small craft\"; }",
          note: "Only checked when the conditions above were false.",
        },
        {
          name: "else",
          syntax: "} else { ... }",
          example: "} else { flag = \"storm\"; }",
          note: "The fallback. Runs when nothing above matched.",
        },
        {
          name: "<=",
          syntax: "a <= b",
          example: "wind <= 10",
          note: "True when a is less than or equal to b.",
        },
      ],
    },

    // L2 final lab — battery indicator. Uses else if + numeric ranges, so it
    // exercises ordering (cases narrow as you go down). Distinct from the
    // wardrobe/grade themes used in this chapter.
    {
      kind: "exercise",
      title: "Lab: Battery Indicator",
      prompt: "Show a battery's status based on its charge level.\n\n" +
          "User stories (variable names are suggestions — pick your own if you like):\n" +
          "1. Declare a number variable (e.g. level) between 0 and 100.\n" +
          "2. Declare a string variable (e.g. status) and set it to \"\".\n" +
          "3. If level is less than 10, set status to \"Critical\".\n" +
          "4. Else if level is less than 25, set status to \"Low\".\n" +
          "5. Else if level is less than 75, set status to \"Medium\".\n" +
          "6. Else, set status to \"High\".\n" +
          "7. Print level.\n" +
          "8. Print status.\n\n" +
          "Use one if / else if / else chain — the order of the checks matters.",
      starterJs:
        "// Follow the user stories shown to the left.\n" +
        "// Reminder: declare with `let` (e.g. let myNumber = 5;).\n\n" +
        "// 1-2. Declare your variables here:\n\n\n\n" +
        "// 3-6. One if / else if / else chain:\n\n\n\n\n\n" +
        "// 7-8. Print level, then status:\n\n",
      tests: [
        {
          label: "Console shows exactly two lines",
          assert:
            "var c = window.__console || []; return c.length === 2;",
          hint: "One console.log for the level, one for the status.",
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
          label: "Line 1 is a number between 0 and 100",
          assert:
            "var c = window.__console || [];" +
            "if (c.length < 1) return false;" +
            "var n = Number(c[0].text);" +
            "return Number.isFinite(n) && n >= 0 && n <= 100;",
          hint: "Set the level variable to a number 0-100, then print it.",
        },
        {
          label: 'Line 2 is one of "Critical", "Low", "Medium", "High"',
          assert:
            "var c = window.__console || [];" +
            "if (c.length < 2) return false;" +
            "return ['Critical','Low','Medium','High'].indexOf(c[1].text) !== -1;",
          hint: "Use exactly those four words (capitalized) inside your branches.",
        },
        {
          label: "Status matches the rule for the chosen level",
          assert:
            "var c = window.__console || [];" +
            "if (c.length < 2) return false;" +
            "var n = Number(c[0].text);" +
            "var expected = n < 10 ? 'Critical' : n < 25 ? 'Low' : n < 75 ? 'Medium' : 'High';" +
            "return c[1].text === expected;",
          hint: "Check the boundaries — < 10, < 25, < 75. Order them from smallest up.",
        },
        {
          label: "Code uses one if, two else if, and a final else",
          assert:
            "var src = window.__userSrc || '';" +
            "var elseIfs = (src.match(/\\belse\\s+if\\b/g) || []).length;" +
            "var allElses = (src.match(/\\belse\\b/g) || []).length;" +
            "var bareElses = allElses - elseIfs;" +
            "return elseIfs >= 2 && bareElses >= 1;",
          hint: "Use one if, then two else if branches for the middle ranges, then a final else for everything left over.",
        },
      ],
    },
  ],
};
