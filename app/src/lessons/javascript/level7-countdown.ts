import type { Lesson } from "../../types";
import { codePanelStyle, noteBoxStyle } from "./_shared";

export const countdownLesson: Lesson = {
  id: "loops-countdown",
  title: "3. Countdown — while",
  summary: "Repeat as long as a condition holds.",
  slides: [
    // 1. Intro — rocket countdown
    {
      kind: "explanation",
      title: "Repeat until something happens",
      intro: "Sometimes you don't know how many laps you'll need —\nyou just keep going UNTIL a condition flips.",
      customScene: "countdown",
      demo: [],
      steps: [
        {
          narration: "A rocket sits on the launchpad.\nThe count is 5. We're going to count down to zero.",
        },
        {
          narration: "5. Still above zero — keep counting down.",
        },
        {
          narration: "4. Still going.",
        },
        {
          narration: "3. Same step every time — subtract one.",
        },
        {
          narration: "2.",
        },
        {
          narration: "1.",
        },
        {
          narration: "Zero! The condition is no longer 'above zero' — STOP.\nThat's a while loop: keep going WHILE the condition is true.",
        },
      ],
    },

    // 2. for vs while — when to use which
    {
      kind: "explanation",
      title: "for vs while",
      intro: "Both are loops. The difference is what you know up front.",
      demo: [
        {
          id: "for",
          label:
            'for (let i = 0; i < 5; i++) {\n  // exactly 5 laps\n}',
          baseStyle: codePanelStyle,
        },
        {
          id: "while",
          label:
            'let n = 5;\nwhile (n > 0) {\n  n = n - 1;\n  // run until n hits zero\n}',
          baseStyle: { ...codePanelStyle, marginTop: 16 },
        },
        {
          id: "note",
          kind: "note",
          label: "for is best when you KNOW the count up front.\nwhile is best when you only know the STOPPING CONDITION.\n\nA while loop has no init or update built in —\nyou prepare the variable BEFORE,\nand change it INSIDE the body.",
          baseStyle: { ...noteBoxStyle, marginTop: 16 },
        },
      ],
      steps: [
        {
          narration: "Left: a for loop. It runs exactly 5 times.\nThe count is hard-coded into the loop itself.",
          tokenHighlight: ["for"],
        },
        {
          narration: "Right: a while loop. It runs until n hits 0.\nIf n started as 5 it runs 5 times. If n started as 100 it runs 100.\nThe count is decided by the data, not the code.",
          tokenHighlight: ["while"],
        },
        {
          narration: "Notice: while doesn't have an init or an update slot.\nYou set up the variable BEFORE the loop,\nand you must change it INSIDE the body.\nForget to change it and the loop runs forever.",
          tokenHighlight: ["let n = 5;", "n = n - 1;"],
        },
      ],
    },

    // 3. Anatomy
    {
      kind: "explanation",
      title: "while, piece by piece",
      demo: [
        {
          id: "code",
          label:
            "while (n > 0) {\n  // body — runs if condition is true\n}",
          baseStyle: codePanelStyle,
        },
      ],
      steps: [
        {
          narration: "Three parts:\nwhile  ( condition )  { body }",
        },
        {
          narration: "1.  while  is the keyword.\nLike for, it tells JavaScript 'I'm about to repeat'.",
          tokenHighlight: ["while"],
        },
        {
          narration: "2.  ( condition )  is checked BEFORE each lap.\nIt must end up true or false (a boolean).\nSame kind of expression as in an if.",
          tokenHighlight: ["(n > 0)"],
        },
        {
          narration: "3.  { body }  runs when the condition is true.\nWhen the body finishes, JavaScript JUMPS BACK\nto check the condition again.",
          tokenHighlight: ["{", "}"],
        },
        {
          narration: "If the condition is false the FIRST time,\nthe body never runs at all.\nA while loop can run zero times.",
        },
      ],
    },

    // 4. Trace walkthrough — countdown from 3
    {
      kind: "explanation",
      title: "Watching while run",
      intro: "Trace example: count down from n = 3 to 0.\nClick to step.",
      customScene: "countdown-trace",
      demo: [],
      steps: [
        {
          narration: "We start. n is set to 3.",
        },
        {
          narration: "Reach the while.\nCondition: 3 > 0 → true. Body runs.",
        },
        {
          narration: "Body: n = n - 1 → n becomes 2.\nJump back to the condition.",
        },
        {
          narration: "2 > 0? True. Body runs.",
        },
        {
          narration: "n becomes 1. Back to condition.",
        },
        {
          narration: "1 > 0? True. Body runs.",
        },
        {
          narration: "n becomes 0. Back to condition.",
        },
        {
          narration: "0 > 0? FALSE.\nThe loop ends — we leave it.",
        },
        {
          narration: "return n → 0.\n\nThe body ran 3 times, exactly the starting value of n.",
        },
      ],
    },

    // 5. The infinite-loop trap
    {
      kind: "explanation",
      title: "The infinite loop trap",
      intro: "If the variable in the condition NEVER changes,\nthe loop runs forever and freezes the program.",
      demo: [
        {
          id: "bad",
          label:
            "let n = 5;\nwhile (n > 0) {\n  // we forgot to change n!\n  // 5 > 0 is true forever\n}",
          baseStyle: codePanelStyle,
        },
        {
          id: "good",
          label:
            "let n = 5;\nwhile (n > 0) {\n  n = n - 1;  // ← this is the fix\n}",
          baseStyle: { ...codePanelStyle, marginTop: 16 },
        },
        {
          id: "note",
          kind: "note",
          label: "Rule: every while loop should change the\nvariable used in its condition,\nin a way that EVENTUALLY makes the condition false.\n\nIf you write while (true) on purpose, you need\na break inside (we don't use that yet).",
          baseStyle: { ...noteBoxStyle, marginTop: 16 },
        },
      ],
      steps: [
        {
          narration: "Left: a broken loop. n stays 5 forever.\n5 > 0 is always true. The loop never ends.\nYour browser tab would freeze.",
          highlight: ["bad"],
        },
        {
          narration: "Right: the fix. Inside the body we change n.\nEach lap n drops by 1, so eventually it hits 0\nand the condition becomes false.",
          highlight: ["good"],
          tokenHighlight: ["n = n - 1;"],
        },
        {
          narration: "Tip: when you write a while loop,\nask yourself 'what makes this STOP?'\nIf you can't answer, you have an infinite loop.",
        },
      ],
    },

    // 6. Practice — count UP to n (n hardcoded to 10) — chip-style, no distractors (first chip in L7)
    {
      kind: "js-chip-assignment",
      title: "Practice: count up to n",
      prompt: "n is set to 10. Build a while loop that counts up to it.",
      puzzles: [
        // p1: while keyword (vs for/do/if)
        {
          prompt: "Which keyword runs a loop while a condition holds?",
          template:
            "let count = 0;\nlet n = 10;\n[[]] (count < n) {\n  count = count + 1;\n}\nreturn count;",
          chips: ["while", "for", "do", "if"],
          solution: ["while"],
        },
        // p2: ( ) around the condition
        {
          prompt: "What wraps the while condition?",
          template:
            "let count = 0;\nlet n = 10;\nwhile [[]]count < n[[]] {\n  count = count + 1;\n}\nreturn count;",
          chips: ["(", ")", "{", "}"],
          solution: ["(", ")"],
        },
        // p3: { } around the loop body
        {
          prompt: "What wraps the loop body?",
          template:
            "let count = 0;\nlet n = 10;\nwhile (count < n) [[]]\n  count = count + 1;\n[[]]\nreturn count;",
          chips: ["{", "}", "(", ")"],
          solution: ["{", "}"],
        },
        // p4: < condition operator (coins/goal scenario)
        {
          intro: "Same shape — count coins up to a goal.",
          prompt: "Which operator keeps the loop running while coins hasn't reached the goal?",
          template:
            "let coins = 0;\nlet goal = 5;\nwhile (coins [[]] goal) {\n  coins = coins + 1;\n}\nreturn coins;",
          chips: ["<", "<=", ">", ">="],
          solution: ["<"],
        },
        // p5: synthesis — all syntax pieces together
        {
          prompt: "Now place all the syntax pieces you've practised.",
          template:
            "let count = 0;\nlet n = 10;\n[[]] [[]]count [[]] n[[]] [[]]\n  count = count + 1;\n[[]]\nreturn count;",
          chips: ["while", "(", "<", ")", "{", "}", "for", ">"],
          solution: ["while", "(", "<", ")", "{", "}"],
        },
      ],
      legend: [
        {
          name: "while",
          syntax: "while (condition) { ... }",
          example: "while (count < n) { ... }",
          note: "Repeats the body while the condition is true.",
        },
        {
          name: "<",
          syntax: "a < b",
          example: "count < n",
          note: "True when a is less than b.",
        },
      ],
    },

    // 7. Practice — halve until below 1 — chip-style with distractors
    {
      kind: "js-chip-assignment",
      title: "Practice: halving",
      prompt: "Halve n until it's below 1. Count the halvings.",
      puzzles: [
        // p1: n / 2 halving expression (vs n * 2, n - 2, n + 2)
        {
          prompt: "Which expression halves n each lap?",
          template:
            "let count = 0;\nwhile (n >= 1) {\n  n = [[]];\n  count = count + 1;\n}\nreturn count;",
          chips: ["n / 2", "n * 2", "n - 2", "n + 2"],
          solution: ["n / 2"],
        },
        // p2: >= condition (vs >, <=, <)
        {
          prompt: "Which condition keeps looping while n is at least 1?",
          template:
            "let count = 0;\nwhile ([[]] 1) {\n  n = n / 2;\n  count = count + 1;\n}\nreturn count;",
          chips: ["n >=", "n >", "n <=", "n <"],
          solution: ["n >="],
        },
        // p3: { } around the body
        {
          prompt: "What wraps the loop body?",
          template:
            "let count = 0;\nwhile (n >= 1) [[]]\n  n = n / 2;\n  count = count + 1;\n[[]]\nreturn count;",
          chips: ["{", "}", "(", ")"],
          solution: ["{", "}"],
        },
        // p4: n - 5 subtraction expression (subtract 5 scenario)
        {
          intro: "Same shape — subtract 5 until n is no longer positive.",
          prompt: "Which expression subtracts 5 from n each lap?",
          template:
            "let count = 0;\nwhile (n > 0) {\n  n = [[]];\n  count = count + 1;\n}\nreturn count;",
          chips: ["n - 5", "n + 5", "n * 5", "n / 5"],
          solution: ["n - 5"],
        },
        // p5: synthesis — all syntax pieces together
        {
          prompt: "Now place all the syntax pieces you've practised.",
          template:
            "let count = 0;\nwhile ([[]] 1) [[]]\n  n = [[]];\n  count = count + 1;\n[[]]\nreturn count;",
          chips: ["n >=", "{", "n / 2", "}", "n >", "n * 2"],
          solution: ["n >=", "{", "n / 2", "}"],
        },
      ],
      legend: [
        {
          name: "/",
          syntax: "a / b",
          example: "n / 2",
          note: "Divides a by b. Same as ÷ in maths.",
        },
        {
          name: ">=",
          syntax: "a >= b",
          example: "n >= 1",
          note: "True when a is greater than or equal to b.",
        },
      ],
    },

    // 8. Final — keep doubling past a limit (typed-input)
    {
      kind: "js-typed-assignment",
      title: "Final: keep doubling",
      prompt: "Start at n = 1. Keep doubling n while it is still less than `limit`.\nReturn the final value of n (the first one that REACHED OR PASSED limit).\n\nFor limit = 10:  1 → 2 → 4 → 8 → 16. Answer: 16.\nFor limit = 100: 1 → 2 → 4 → 8 → 16 → 32 → 64 → 128. Answer: 128.",
      varNames: ["limit"],
      template:
        "let n = 1;\nwhile ([[input:cond]]) {\n  n = [[input:body]];\n}\nreturn n;\n",
      tests: [
        { label: "limit = 10", vars: { limit: 10 }, expected: 16 },
        { label: "limit = 100", vars: { limit: 100 }, expected: 128 },
        { label: "limit = 1", vars: { limit: 1 }, expected: 1 },
        { label: "limit = 2", vars: { limit: 2 }, expected: 2 },
        { label: "limit = 50", vars: { limit: 50 }, expected: 64 },
        { label: "limit = 1000", vars: { limit: 1000 }, expected: 1024 },
      ],
      goalHint: "Keep going while n is still BELOW limit. The condition is  n < limit. The body is  n * 2.",
      allegory: {
        kind: "loop-result",
        config: {
          inputKeys: ["limit"],
          resultLabel: "n",
          theme: "countdown",
        },
      },
      legend: [
        {
          name: "*  (multiply)",
          syntax: "a * b",
          example: "n * 2",
          note: "Multiplies two numbers. n * 2 doubles n.",
        },
        {
          name: "<",
          syntax: "a < b",
          example: "n < limit",
          note: "True when a is strictly less than b.",
        },
      ],
    },

    // Workshop tier — guided micro-steps for `while`.
    // Surface: halve a balance until it drops below 1; count the halvings.
    // Distinct from chips (limit / countdown) and exercise (goal/weekly/saved/weeks).
    {
      kind: "js-workshop",
      title: "Workshop: halving balance",
      prompt: "Use a `while` loop to halve a number until it drops below 1, counting the halvings.",
      designNote:
        "L7 while-loop workshop. Surface: balance → halvings (count operations until balance < 1). Distinct from chips (limit) and exercise (goal/weekly/saved/weeks). The student writes a while header that reads from a state and a body that mutates that state — the heart of the while pattern.",
      steps: [
        {
          id: "halve-declare-balance",
          instruction: "Use `let` to declare `balance` and assign it any positive number greater than 1.",
          starterCode: "// Declare balance below.\n",
          checks: [
            {
              message: "Use `let` to declare a variable named `balance`.",
              requirePattern: /\blet\s+balance\b/,
            },
            {
              message: "`balance` should hold a number greater than 1.",
              assert: "return typeof balance === 'number' && balance > 1;",
            },
          ],
          reveal: "let balance = 100;\n",
        },
        {
          id: "halve-declare-halvings",
          instruction: "Below `balance`, use `let` to declare `halvings` and start it at 0 — the loop will count up.",
          starterCode: "let balance = 100;\n// Declare halvings = 0 below.\n",
          checks: [
            {
              message: "Use `let` to declare a variable named `halvings`.",
              requirePattern: /\blet\s+halvings\b/,
            },
            {
              message: "`halvings` should start at 0.",
              assert: "return halvings === 0;",
            },
          ],
          reveal: "let balance = 100;\nlet halvings = 0;\n",
        },
        {
          id: "halve-while-header",
          instruction: "Write a `while` loop that keeps running as long as `balance` is still 1 or more. Leave the body empty for now.",
          starterCode: "let balance = 100;\nlet halvings = 0;\n// Add the while header. Empty body for now.\n",
          checks: [
            {
              message: "Use `while` to start the loop.",
              requirePattern: /\bwhile\s*\(/,
            },
            {
              message: "Compare `balance` to `1` with `>=`.",
              requirePattern: /\bbalance\s*>=\s*1\b/,
            },
          ],
          reveal: "let balance = 100;\nlet halvings = 0;\nwhile (balance >= 1) {\n}\n",
        },
        {
          id: "halve-loop-body",
          instruction: "Inside the loop, halve `balance` and increment `halvings` by 1. After the loop, `balance` should be less than 1 — and `halvings` should record how many rounds it took to get there.",
          starterCode: "let balance = 100;\nlet halvings = 0;\nwhile (balance >= 1) {\n  // Halve balance, then increment halvings.\n}\n",
          checks: [
            {
              message: "Halve `balance` (e.g. `balance = balance / 2` or `balance /= 2`).",
              requirePattern: /\bbalance\s*=\s*balance\s*\/\s*2\b|\bbalance\s*\/=\s*2\b/,
            },
            {
              message: "Increment `halvings` (e.g. `halvings++`).",
              requirePattern: /\bhalvings\s*\+\+|\bhalvings\s*\+=\s*1\b|\bhalvings\s*=\s*halvings\s*\+\s*1\b/,
            },
            {
              message: "After the loop, `balance` should be less than 1 and `halvings` should be a positive number.",
              assert: "return balance < 1 && halvings > 0;",
            },
          ],
          reveal: "let balance = 100;\nlet halvings = 0;\nwhile (balance >= 1) {\n  balance = balance / 2;\n  halvings++;\n}\n",
        },
      ],
      legend: [
        {
          name: "while",
          syntax: "while (condition) { ... }",
          example: "while (balance >= 1) { ... }",
          note: "Repeats the body as long as the condition is true. Make sure something inside changes the condition.",
        },
        {
          name: "/=",
          syntax: "x /= y",
          example: "balance /= 2",
          note: "Shorthand for `x = x / y`.",
        },
      ],
    },

    // L7 final lab — savings goal. Repeats while a running total falls short
    // of a target; counts the iterations. Distinct from the chapter's
    // count-up-to-n and keep-doubling exercises (linear addition until cross).
    {
      kind: "exercise",
      title: "Lab: Save Up Money",
      prompt: "Count how many weeks of fixed savings are needed to reach a goal.\n\n" +
          "User stories (variable names are suggestions):\n" +
          "1. Declare a number variable (e.g. goal) — the amount you want to save (e.g. 1000).\n" +
          "2. Declare a number variable (e.g. weekly) — how much you save each week (e.g. 75).\n" +
          "3. Declare a number variable (e.g. saved) and set it to 0.\n" +
          "4. Declare a number variable (e.g. weeks) and set it to 0.\n" +
          "5. Use a while loop that runs while saved < goal:\n" +
          "   - add weekly to saved\n" +
          "   - increment weeks by 1\n" +
          "6. Print weeks.\n" +
          "7. Print saved (the final amount, after the loop ends).",
      starterJs:
        "// Follow the user stories shown to the left.\n\n" +
        "// 1-4. Declare goal, weekly, saved, weeks:\n\n\n\n\n\n" +
        "// 5. while loop — keep adding weekly until saved reaches goal:\n\n\n\n\n" +
        "// 6-7. Print weeks, then saved:\n\n",
      tests: [
        {
          label: "Console shows exactly two lines",
          assert:
            "var c = window.__console || []; return c.length === 2;",
          hint: "One console.log for weeks (after the loop), one for saved.",
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
          label: "Line 1 (weeks) is a positive whole number",
          assert:
            "var c = window.__console || [];" +
            "if (c.length < 1) return false;" +
            "var w = Number(c[0].text);" +
            "return Number.isInteger(w) && w > 0;",
          hint: "weeks should be incremented inside the loop and printed at the end.",
        },
        {
          label: "Line 2 (saved) is a positive number",
          assert:
            "var c = window.__console || [];" +
            "if (c.length < 2) return false;" +
            "var s = Number(c[1].text);" +
            "return Number.isFinite(s) && s > 0;",
          hint: "saved should hold the running total at the end of the loop.",
        },
        {
          label: "saved equals weekly × weeks (the loop accumulated correctly)",
          assert:
            "var c = window.__console || [];" +
            "if (c.length < 2) return false;" +
            "var weeks = Number(c[0].text);" +
            "var saved = Number(c[1].text);" +
            "if (!Number.isFinite(weeks) || !Number.isFinite(saved)) return false;" +
            "if (weeks <= 0) return false;" +
            "var weekly = saved / weeks;" +
            "if (!Number.isFinite(weekly) || weekly <= 0) return false;" +
            "return Math.abs(weekly * weeks - saved) < 0.0001;",
          hint: "Inside the loop: saved = saved + weekly; weeks = weeks + 1. The loop runs until saved >= goal.",
        },
        {
          label: "Code uses a while loop",
          assert:
            "var src = window.__userSrc || '';" +
            "return /\\bwhile\\s*\\(/.test(src);",
          hint: "Use the form: while (saved < goal) { ... }",
        },
      ],
    },
  ],
};
