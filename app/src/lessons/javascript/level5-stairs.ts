import type { Lesson } from "../../types";
import { codePanelStyle, noteBoxStyle } from "./_shared";

export const stairsLesson: Lesson = {
  id: "loops-stairs",
  title: "1. Stairs — for",
  summary: "Repeat code a known number of times.",
  slides: [
    // 1. Intro — stick figure climbing stairs
    {
      kind: "explanation",
      title: "Doing the same thing many times",
      intro: "Sometimes you need to repeat the same step over and over.",
      customScene: "stairs",
      demo: [],
      steps: [
        {
          narration: "You stand at the bottom of a staircase.\nFive steps up to the top.",
        },
        {
          narration: "You take one step. You're on step 1.",
        },
        {
          narration: "Another step. You're on step 2.",
        },
        {
          narration: "Step 3. Each step is the SAME action — lift, place, repeat.",
        },
        {
          narration: "Step 4.",
        },
        {
          narration: "And the top!\n\nIn code, this kind of 'do the same thing N times'\nis what a for loop is for.",
        },
      ],
    },

    // 2. Why a loop? — show the repetition problem
    {
      kind: "explanation",
      title: "Why a loop?",
      intro: "Without a loop, repeating means writing the same line many times.\nA loop is the short way.",
      demo: [
        {
          id: "long",
          label:
            'climbStep();\nclimbStep();\nclimbStep();\nclimbStep();\nclimbStep();\n// 5 times — but what if we wanted 100?',
          baseStyle: codePanelStyle,
        },
        {
          id: "loop",
          label:
            'for (let step = 0; step < 5; step++) {\n  climbStep();\n}\n// same thing — change 5 to climb more',
          baseStyle: { ...codePanelStyle, marginTop: 16 },
        },
      ],
      steps: [
        {
          narration: "Left: 'climb' written out five times.\nIt works — but if we wanted 100 climbs we'd need 100 lines.",
          tokenHighlight: ["climbStep();"],
        },
        {
          narration: "Right: a for loop. The body 'climbStep()' is written ONCE.\nThe loop says 'do this 5 times'. To climb 100 times, change 5 to 100.",
          tokenHighlight: ["for"],
        },
        {
          narration: "A for loop is for when you know HOW MANY TIMES.\nIn the next slide we'll break it down piece by piece.",
          tokenHighlight: ["for"],
        },
      ],
    },

    // 3. Anatomy of a for loop
    {
      kind: "explanation",
      title: "for, piece by piece",
      demo: [
        {
          id: "code",
          label:
            'for (let i = 0; i < 5; i++) {\n  // body — runs once per step\n}',
          baseStyle: codePanelStyle,
        },
      ],
      steps: [
        {
          narration: "A for loop has FIVE parts.\nfor  ( init ; condition ; update )  { body }",
        },
        {
          narration: "1.  for  is the keyword. It tells JavaScript:\n'I'm going to repeat the next block.'",
          tokenHighlight: ["for"],
        },
        {
          narration: "2.  ( )  parentheses hold THREE things,\nseparated by SEMICOLONS — not commas.",
          tokenHighlight: ["(", ")", ";"],
        },
        {
          narration: "3.  init:  let i = 0\nThis runs ONCE before the loop starts.\nIt creates a variable to count with — almost always called i.",
          tokenHighlight: ["let i = 0"],
        },
        {
          narration: "4.  condition:  i < 5\nBefore each repetition, JavaScript checks this.\nIf true → run the body. If false → STOP, leave the loop.",
          tokenHighlight: ["i < 5"],
        },
        {
          narration: "5.  update:  i++\nThis runs after each body iteration.\ni++ means 'add 1 to i'. So i goes 0, 1, 2, 3, 4.",
          tokenHighlight: ["i++"],
        },
        {
          narration: "6.  { body }  is what gets repeated.\nThe variable i is available inside — you can use it.",
          tokenHighlight: ["{", "}"],
        },
        {
          narration: "Reading order each lap:\n• First lap: init runs, then condition, then body, then update.\n• Following laps: condition, body, update — repeat.\n• When the condition becomes false, the loop ends.",
        },
      ],
    },

    // 4. Trace walkthrough — sum 1+2+3
    {
      kind: "explanation",
      title: "Watching for run",
      intro: "Let's trace through a real example: summing 1 + 2 + 3.\nClick to step. Watch i and sum on the right.",
      customScene: "stairs-trace",
      demo: [],
      steps: [
        {
          narration: "On the left is the code. On the right, a staircase\nand two counters — i and sum.",
        },
        {
          narration: "First we make sum = 0.\nIt'll hold our running total.",
        },
        {
          narration: "Now the for. The init part runs once: i = 1.",
        },
        {
          narration: "Condition check: 1 <= 3?\nYes → run the body.",
        },
        {
          narration: "Body: sum = sum + i → sum becomes 1.\nThe figure climbs one step.",
        },
        {
          narration: "Update: i++ → i becomes 2.\nNow back to the condition.",
        },
        {
          narration: "2 <= 3? Yes → body.",
        },
        {
          narration: "sum = 1 + 2 → 3.",
        },
        {
          narration: "Update again: i becomes 3.",
        },
        {
          narration: "3 <= 3? Yes (note: less-than-or-equal). Body runs.",
        },
        {
          narration: "sum = 3 + 3 → 6.",
        },
        {
          narration: "Update: i becomes 4.",
        },
        {
          narration: "4 <= 3? FALSE.\nThe loop ends. We jump past the closing }.",
        },
        {
          narration: "return sum → 6.\n\nThe loop ran 3 times — once for each value 1, 2, 3.",
        },
      ],
    },

    // 5. Three ways to add 1 — increment shortcuts
    {
      kind: "explanation",
      title: "Three ways to add 1",
      intro: "Up to now we wrote 'add 1 to x' as x = x + 1. That's the long way.\nThere are two shortcuts that mean exactly the same thing.",
      demo: [
        {
          id: "long",
          label: "x = x + 1;\n// the long way",
          baseStyle: codePanelStyle,
        },
        {
          id: "compound",
          label: "x += 1;\n// shorter — works for any amount",
          baseStyle: { ...codePanelStyle, marginTop: 16 },
        },
        {
          id: "incr",
          label: "x++;\n// shortest — only +1",
          baseStyle: { ...codePanelStyle, marginTop: 16 },
        },
        {
          id: "note",
          kind: "note",
          label: "Same family for other operators:\n\n  x -= 1   subtract 1\n  x *= 2   multiply by 2\n  x /= 2   divide by 2\n  x--      subtract 1 (like x++)\n\nFrom now on we usually write\ni++ in for-loop updates.",
          baseStyle: {
            ...noteBoxStyle,
            marginTop: 16,
            whiteSpace: "pre-wrap",
          },
        },
      ],
      steps: [
        {
          narration: "Three ways to write 'add 1 to x'.\nAll three end with x being one bigger.",
        },
        {
          narration: "x = x + 1 — the long, explicit way.\nReads almost like English: 'x becomes (whatever x was) plus one'.",
          tokenHighlight: ["x = x + 1"],
        },
        {
          narration: "x += 1 — compound assignment.\nThe '+=' means 'take what's on the right and add it to x'.\nWorks with any number: x += 5 adds 5, x += i adds i.",
          tokenHighlight: ["x += 1"],
        },
        {
          narration: "x++ — increment by 1.\nShortest form. Only does +1 — for other amounts use +=.",
          tokenHighlight: ["x++"],
        },
        {
          narration: "Same family for - * / and a decrement (x--).\nFrom here on we'll usually write i++ in for-loop updates,\nand sometimes sum += i in bodies.",
        },
      ],
    },

    // 6. Practice — sum 1..n (chip-style, no distractors)
    {
      kind: "js-chip-assignment",
      title: "Practice: sum 1 to n",
      prompt: "Build a loop that adds up the numbers from 1 to n.\nWork through the four mini-puzzles — they build the answer piece by piece.",
      puzzles: [
        // p1: for keyword (vs while/do/if)
        {
          prompt: "Which keyword starts a counted loop?",
          template:
            "let sum = 0;\n[[]] (let i = 1; i <= n; i++) {\n  sum = sum + i;\n}\nreturn sum;",
          chips: ["for", "while", "do", "if"],
          solution: ["for"],
        },
        // p2: ; semicolons separating the three header parts
        {
          prompt: "What separates the three parts of the for header?",
          template:
            "let sum = 0;\nfor (let i = 1 [[]] i <= n [[]] i++) {\n  sum = sum + i;\n}\nreturn sum;",
          chips: [";", ",", ".", ":"],
          solution: [";", ";"],
        },
        // p3: ( ) around the header
        {
          prompt: "What wraps the for-loop header?",
          template:
            "let sum = 0;\nfor [[]]let i = 1; i <= n; i++[[]] {\n  sum = sum + i;\n}\nreturn sum;",
          chips: ["(", ")", "{", "}"],
          solution: ["(", ")"],
        },
        // p4: { } around the body (count to n scenario)
        {
          intro: "Same shape — count to n instead of summing.",
          prompt: "What wraps the loop body?",
          template:
            "let count = 0;\nfor (let i = 1; i <= n; i++) [[]]\n  count = count + 1;\n[[]]",
          chips: ["{", "}", "(", ")"],
          solution: ["{", "}"],
        },
        // p5: synthesis — all syntax pieces together
        {
          prompt: "Now place all the syntax pieces you've practised.",
          template:
            "let sum = 0;\n[[]] [[]]let i = 1; i <= n[[]] i++[[]] [[]]\n  sum = sum + i;\n[[]]\nreturn sum;",
          chips: ["for", "(", ";", ")", "{", "}", "while", ","],
          solution: ["for", "(", ";", ")", "{", "}"],
        },
      ],
      legend: [
        {
          name: "for",
          syntax: "for (init; condition; update) { ... }",
          example: "for (let i = 1; i <= n; i++) { ... }",
          note: "Repeats the body while the condition is true.",
        },
        {
          name: "sum = sum + i",
          syntax: "x = x + value",
          example: "sum = sum + i",
          note: "Adds i to sum, then stores the new total back in sum.",
        },
      ],
    },

    // 7. Off-by-one — < vs <=
    {
      kind: "explanation",
      title: "< or <= ?",
      intro: "The condition decides exactly how many times the loop runs.\nGetting it wrong by one is the most common loop bug.",
      demo: [
        {
          id: "lt",
          label:
            "for (let i = 0; i < 3; i++) {\n  // i is 0, 1, 2  (three times)\n}",
          baseStyle: codePanelStyle,
        },
        {
          id: "lte",
          label:
            "for (let i = 0; i <= 3; i++) {\n  // i is 0, 1, 2, 3  (FOUR times)\n}",
          baseStyle: { ...codePanelStyle, marginTop: 16 },
        },
        {
          id: "note",
          kind: "note",
          label: "Two common patterns:\n• Start at 0, use i < n  → runs n times\n• Start at 1, use i <= n  → runs n times\n\nMixing them up causes off-by-one bugs.",
          baseStyle: { ...noteBoxStyle, marginTop: 16 },
        },
      ],
      steps: [
        {
          narration: "Left: i < 3. The loop runs while i is LESS THAN 3.\ni takes values 0, 1, 2. Three iterations.\nWhen i becomes 3, the condition is false — done.",
          tokenHighlight: ["i < 3"],
        },
        {
          narration: "Right: i <= 3. The loop runs while i is LESS THAN OR EQUAL TO 3.\ni takes values 0, 1, 2, 3. FOUR iterations.\nNotice: same numbers but ONE more lap.",
          tokenHighlight: ["i <= 3"],
        },
        {
          narration: "Tip: when the loop body uses i, decide which values it needs to see.\nThen pick start + condition to give exactly that range.",
        },
      ],
    },

    // 8. Practice — string of n asterisks (chip-style, with distractors)
    {
      kind: "js-chip-assignment",
      title: "Practice: n stars",
      prompt: "Build a string with n asterisks. For n = 4 the answer is \"****\".\nThe chips now include WRONG options too — pick the right ones.",
      puzzles: [
        // p1: i < n vs i <= n (off-by-one)
        {
          prompt: "Which condition runs the loop exactly n times when i starts at 0?",
          template:
            "let stars = \"\";\nfor (let i = 0; [[]]; i++) {\n  stars = stars + \"*\";\n}\nreturn stars;",
          chips: ["i < n", "i <= n", "i < n - 1", "i > n"],
          solution: ["i < n"],
        },
        // p2: i++ update expression (vs i--, i+2, i*2)
        {
          prompt: "Which expression advances the counter by one each lap?",
          template:
            "let stars = \"\";\nfor (let i = 0; i < n; [[]]) {\n  stars = stars + \"*\";\n}\nreturn stars;",
          chips: ["i++", "i--", "i + 1", "i * 2"],
          solution: ["i++"],
        },
        // p3: body accumulator expression (vs missing assignment)
        {
          prompt: "Which body line correctly adds a star to the result?",
          template:
            "let stars = \"\";\nfor (let i = 0; i < n; i++) {\n  [[]];\n}\nreturn stars;",
          chips: ["stars = stars + \"*\"", "stars + \"*\"", "stars = \"*\"", "i += \"*\""],
          solution: ["stars = stars + \"*\""],
        },
        // p4: ( ) around header (n dashes scenario)
        {
          intro: "Same shape — build a line of n dashes.",
          prompt: "What wraps the for-loop header?",
          template:
            "let line = \"\";\nfor [[]]let i = 0; i < n; i++[[]] {\n  line = line + \"-\";\n}\nreturn line;",
          chips: ["(", ")", "{", "}"],
          solution: ["(", ")"],
        },
        // p5: synthesis — all syntax pieces together
        {
          prompt: "Now place all the syntax pieces you've practised.",
          template:
            'let stars = "";\nfor [[]]let i = 0; [[]]; [[]][[]] {\n  [[]];\n}\nreturn stars;',
          chips: ["(", "i < n", "i++", ")", 'stars = stars + "*"', "i <= n", "i--"],
          solution: ["(", "i < n", "i++", ")", 'stars = stars + "*"'],
        },
      ],
      legend: [
        {
          name: "Joining strings",
          syntax: "a + b",
          example: 'stars = stars + "*"',
          note: "When + is used between strings it joins them end-to-end.",
        },
        {
          name: "<",
          syntax: "a < b",
          example: "i < n",
          note: "True when a is strictly less than b. With i starting at 0, i < n runs n times.",
        },
      ],
    },

    // 9. Final — factorial (typed-input mode)
    {
      kind: "js-typed-assignment",
      title: "Final: factorial",
      prompt: "Return n! (n factorial) — that's 1 × 2 × 3 × … × n.\nFor n = 5 the answer is 1×2×3×4×5 = 120.\nFor n = 0 the answer is 1 (the empty product).\n\nFill the boxes — type the missing pieces yourself.",
      varNames: ["n"],
      template:
        "let result = 1;\nfor (let i = [[input:start]]; i <= [[input:end]]; i++) {\n  result = [[input:body]];\n}\nreturn result;\n",
      tests: [
        { label: "n = 0", vars: { n: 0 }, expected: 1 },
        { label: "n = 1", vars: { n: 1 }, expected: 1 },
        { label: "n = 3", vars: { n: 3 }, expected: 6 },
        { label: "n = 5", vars: { n: 5 }, expected: 120 },
        { label: "n = 6", vars: { n: 6 }, expected: 720 },
      ],
      goalHint: "Three boxes: start at 1, go up to n, multiply result by i.",
      allegory: {
        kind: "loop-result",
        config: {
          inputKeys: ["n"],
          resultLabel: "n!",
          theme: "stairs",
        },
      },
      legend: [
        {
          name: "* (multiply)",
          syntax: "a * b",
          example: "result * i",
          note: "Multiplies two numbers. Same as × in maths.",
        },
      ],
    },

    // Workshop tier — guided micro-steps for the classic for-loop.
    // Surface: build a string of repeated symbols (count → stars).
    // Distinct from chips (n / stairs) and exercise (factor × i).
    {
      kind: "js-workshop",
      title: "Workshop: row of stars",
      prompt: "Build a string of `*` characters using a for-loop, one piece at a time.",
      designNote:
        "L5 for-loop workshop. Surface: count → stars (a string accumulator). Distinct from chips (n) and exercise (factor/i). The student writes the canonical `for (let i = 0; i < count; i++)` header and accumulates inside. The literal symbol `\"*\"` is free (any single-char string accepted via typeof string).",
      steps: [
        {
          id: "stars-declare-count",
          instruction: "Use `let` to declare a variable called `count` and assign it any positive whole number — how many stars you want.",
          starterCode: "// Declare count below.\n",
          checks: [
            {
              message: "Use `let` to declare a variable named `count`.",
              requirePattern: /\blet\s+count\b/,
            },
            {
              message: "`count` should hold a number.",
              assert: "return typeof count === 'number';",
            },
          ],
          reveal: "let count = 5;\n",
        },
        {
          id: "stars-declare-stars",
          instruction: "Below `count`, use `let` to declare `stars` and assign it the empty string `\"\"` — the loop will append to it.",
          starterCode: "let count = 5;\n// Declare stars as an empty string below.\n",
          checks: [
            {
              message: "Use `let` to declare a variable named `stars`.",
              requirePattern: /\blet\s+stars\b/,
            },
            {
              message: "`stars` should start as the empty string `\"\"`.",
              assert: "return stars === '';",
            },
          ],
          reveal: 'let count = 5;\nlet stars = "";\n',
        },
        {
          id: "stars-for-header",
          instruction: "Write a for-loop header so the body will run `count` times. Remember a for-loop's header has three parts — an initialization, a condition, and an update. Leave the body empty for now.",
          starterCode: 'let count = 5;\nlet stars = "";\n// Add the for-loop header. Leave the body empty.\n',
          checks: [
            {
              message: "Use `for` to start the loop.",
              requirePattern: /\bfor\s*\(/,
            },
            {
              message: "Initialize `let i = 0` in the loop header.",
              requirePattern: /\blet\s+i\s*=\s*0\b/,
            },
            {
              message: "Set the condition `i < count`.",
              requirePattern: /\bi\s*<\s*count\b/,
            },
            {
              message: "Update `i` with `i++` in the loop header.",
              requirePattern: /\bi\s*\+\+/,
            },
          ],
          reveal: 'let count = 5;\nlet stars = "";\nfor (let i = 0; i < count; i++) {\n}\n',
        },
        {
          id: "stars-loop-body",
          instruction: "Inside the loop body, append one `\"*\"` to `stars` each time the loop runs. After the loop, `stars` should be one star longer for every round.",
          starterCode: 'let count = 5;\nlet stars = "";\nfor (let i = 0; i < count; i++) {\n  // Append a star to stars here.\n}\n',
          checks: [
            {
              message: "Use `+=` to append onto `stars`.",
              requirePattern: /\bstars\s*\+=/,
            },
            {
              message: "After the loop, `stars` should be a string with as many characters as `count`.",
              assert:
                "return typeof stars === 'string' && stars.length === count;",
            },
          ],
          reveal: 'let count = 5;\nlet stars = "";\nfor (let i = 0; i < count; i++) {\n  stars += "*";\n}\n',
        },
      ],
      legend: [
        {
          name: "for",
          syntax: "for (init; condition; update) { ... }",
          example: "for (let i = 0; i < count; i++) { ... }",
          note: "Three parts: where to start, when to keep going, what to change each round.",
        },
        {
          name: "+=",
          syntax: "x += y",
          example: 'stars += "*"',
          note: "Shorthand for `x = x + y`.",
        },
      ],
    },

    // L5 final lab — multiplication table. Uses a counted for-loop with a
    // multiplication body. Distinct from the chapter's stairs/sum/n-stars
    // exercises; new theme entirely.
    {
      kind: "exercise",
      title: "Lab: Multiplication Table",
      prompt: "Print the first ten multiples of a number you pick.\n\n" +
          "User stories (variable names are suggestions):\n" +
          "1. Declare a number variable (e.g. factor) between 2 and 12.\n" +
          "2. Use a for loop with an index from 1 to 10 (inclusive).\n" +
          "3. Inside the loop, console.log factor multiplied by the current index.\n" +
          "4. There should be exactly ten lines of output, and each line is the product.",
      starterJs:
        "// Follow the user stories shown to the left.\n\n" +
        "// 1. Declare your factor variable:\n\n\n" +
        "// 2-3. for loop printing factor × i for i = 1..10:\n\n",
      tests: [
        {
          label: "Console shows exactly ten lines",
          assert:
            "var c = window.__console || []; return c.length === 10;",
          hint: "Loop from 1 to 10 inclusive — that's ten iterations, ten console.log calls.",
        },
        {
          label: "Every line is a finite number",
          assert:
            "var c = window.__console || [];" +
            "if (c.length !== 10) return false;" +
            "for (var i = 0; i < 10; i++) {" +
            "  var n = Number(c[i].text);" +
            "  if (!Number.isFinite(n)) return false;" +
            "}" +
            "return true;",
          hint: "Use console.log on a numeric expression like factor * i.",
        },
        {
          label: "Lines form a multiplication table (each line = factor × position)",
          assert:
            "var c = window.__console || [];" +
            "if (c.length !== 10) return false;" +
            "var first = Number(c[0].text);" +
            "if (!Number.isFinite(first) || first === 0) return false;" +
            "var factor = first;" +
            "for (var i = 0; i < 10; i++) {" +
            "  if (Number(c[i].text) !== factor * (i + 1)) return false;" +
            "}" +
            "return true;",
          hint: "Inside the loop, log factor * i where i runs 1, 2, … 10. The first line should be factor itself.",
        },
        {
          label: "Code uses a for loop",
          assert:
            "var src = window.__userSrc || '';" +
            "return /\\bfor\\s*\\(/.test(src);",
          hint: "Start with: for (let i = 1; i <= 10; i++) { ... }",
        },
      ],
    },
  ],
};
