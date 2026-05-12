import type { Lesson } from "../../types";
import { codePanelStyle, noteBoxStyle } from "./_shared";

export const operatorsLesson: Lesson = {
  id: "variables-operators",
  title: "3. Operators — doing things to values",
  summary: "Arithmetic for numbers and comparisons that return booleans.",
  slides: [
    // 1. Intro — arithmetic
    {
      kind: "explanation",
      title: "Arithmetic operators",
      intro: "Five operators do basic math: + (add), - (subtract), * (multiply), / (divide), % (remainder).",
      demo: [
        {
          id: "code",
          label:
            '10 + 4    // 14\n10 - 4    // 6\n10 * 4    // 40\n10 / 4    // 2.5\n10 % 4    // 2  (the remainder)',
          baseStyle: codePanelStyle,
        },
        {
          id: "note",
          kind: "note",
          label: "% is called modulo. It gives the LEFTOVER\nafter integer division.\n\n10 ÷ 4 = 2 remainder 2 → 10 % 4 = 2.\nIt's perfect for the 'is this even?' test.",
          baseStyle: { ...noteBoxStyle, marginTop: 16 },
        },
      ],
      steps: [
        {
          narration: "+ adds. - subtracts. * multiplies. / divides.\nNothing surprising — just like a calculator.",
        },
        {
          narration: "% is the only one new to most beginners.\nIt asks: what's left over after we divide?",
          tokenHighlight: ["%"],
        },
        {
          narration: "% has a famous use: `n % 2` is 0 when n is even, 1 when n is odd.\nWe'll use that in a moment.",
        },
      ],
    },

    // 2. Comparison operators
    {
      kind: "explanation",
      title: "Comparison — questions, not commands",
      intro: "Comparison operators ASK about values. The answer is always a boolean (true or false).",
      demo: [
        {
          id: "code",
          label:
            '10 > 5      // true\n10 < 5      // false\n5 >= 5      // true\n5 <= 4      // false\n10 === 10   // true   — strict equality\n10 !== 5    // true   — strict not-equal',
          baseStyle: codePanelStyle,
        },
        {
          id: "note",
          kind: "note",
          label: "Use === and !==,\nnot == and !=.\nThe strict version checks the type too,\nso 10 === \"10\" is false.",
          baseStyle: { ...noteBoxStyle, marginTop: 16 },
        },
      ],
      steps: [
        {
          narration: "> < >= <= compare numerically.\nGreater than, less than, greater-or-equal, less-or-equal.",
        },
        {
          narration: "=== asks 'are these EXACTLY the same — same value AND same type?'.\n!== is the opposite.",
          tokenHighlight: ["===", "!=="],
        },
        {
          narration: "Important: a comparison's result is ALWAYS a boolean.\nThat's how we get conditions for if-statements (next chapter).",
        },
      ],
    },

    // 3. Chip practice
    {
      kind: "js-chip-assignment",
      title: "Practice: pick the right operator",
      prompt: "Match each phrase to the operator that does the job.",
      puzzles: [
        // p1: % for remainder
        {
          prompt: "Which operator gives the REMAINDER of a division?",
          template: "let leftover = 10 [[]] 3;   // 1",
          chips: ["%", "/", "*", "-"],
          solution: ["%"],
        },
        // p2: * multiplication
        {
          prompt: "Which operator multiplies?",
          template: "let area = width [[]] height;",
          chips: ["*", "x", "+", "/"],
          solution: ["*"],
        },
        // p3: >= comparison
        {
          prompt: "Which comparison asks 'greater than OR equal to'?",
          template: "let canDrive = age [[]] 18;",
          chips: [">=", ">", "<=", "==="],
          solution: [">="],
        },
        // p4: === strict equality
        {
          intro: "Strict equality — type matters.",
          prompt: "Which operator asks 'exactly equal — same value AND type'?",
          template: 'let exactMatch = code [[]] "ABC";',
          chips: ["===", "==", "=", "!=="],
          solution: ["==="],
        },
        // p5: synthesis — even check
        {
          prompt: "Build the 'is even?' check — number mod 2 equals 0.",
          template: "let isEven = n [[]] 2 [[]] 0;",
          chips: ["%", "===", "/", "==", "*"],
          solution: ["%", "==="],
        },
      ],
      legend: [
        {
          name: "%",
          syntax: "a % b",
          example: "10 % 3 → 1",
          note: "The remainder after integer division.",
        },
        {
          name: "===",
          syntax: "a === b",
          example: '10 === "10" → false',
          note: "Strict equality — same value AND same type.",
        },
      ],
    },

    // 4. Workshop — 4 steps
    {
      kind: "js-workshop",
      title: "Workshop: simple math and checks",
      prompt: "Compute a few values and a few comparisons. Each step is one line.",
      designNote:
        "Variables L3 workshop. Four steps: a subtraction, a modulo even-check, a > comparison, a strict !==. Surface: shopping/age check theme; deliberate mix of arithmetic and comparison to show the boolean result.",
      steps: [
        {
          id: "ops-subtract",
          instruction: "Declare `let total = 100 - 25;` and log it. The result should be 75.",
          starterCode: "// Declare total and log it.\n",
          checks: [
            {
              message: "Use `let` to declare `total = 100 - 25`.",
              requirePattern: /\blet\s+total\s*=\s*100\s*-\s*25\b/,
            },
            {
              message: "`total` should equal 75.",
              assert: "return total === 75;",
            },
            {
              message: "Log `total` with `console.log`.",
              requirePattern: /console\.log\s*\(\s*total\s*\)/,
            },
          ],
          reveal: "let total = 100 - 25;\nconsole.log(total);\n",
        },
        {
          id: "ops-modulo-even",
          instruction: "Below that, declare `let isEven = 8 % 2 === 0;` and log it. The result should be a boolean.",
          starterCode: "let total = 100 - 25;\nconsole.log(total);\n// Declare isEven and log it.\n",
          checks: [
            {
              message: "Use `%` and `===` in the expression assigned to `isEven`.",
              requirePattern: /\blet\s+isEven\s*=\s*8\s*%\s*2\s*===\s*0\b/,
            },
            {
              message: "`isEven` should be the boolean true.",
              assert: "return isEven === true;",
            },
            {
              message: "Log `isEven` with `console.log`.",
              requirePattern: /console\.log\s*\(\s*isEven\s*\)/,
            },
          ],
          reveal: "let total = 100 - 25;\nconsole.log(total);\nlet isEven = 8 % 2 === 0;\nconsole.log(isEven);\n",
        },
        {
          id: "ops-greater-than",
          instruction: "Declare `let bigger = 10 > 5;` and log it. The result is a boolean.",
          starterCode: "let total = 100 - 25;\nconsole.log(total);\nlet isEven = 8 % 2 === 0;\nconsole.log(isEven);\n// Declare bigger and log it.\n",
          checks: [
            {
              message: "Use `>` to compare 10 and 5.",
              requirePattern: /\blet\s+bigger\s*=\s*10\s*>\s*5\b/,
            },
            {
              message: "`bigger` should be true.",
              assert: "return bigger === true;",
            },
            {
              message: "Log `bigger`.",
              requirePattern: /console\.log\s*\(\s*bigger\s*\)/,
            },
          ],
          reveal: "let total = 100 - 25;\nconsole.log(total);\nlet isEven = 8 % 2 === 0;\nconsole.log(isEven);\nlet bigger = 10 > 5;\nconsole.log(bigger);\n",
        },
        {
          id: "ops-strict-not-equal",
          instruction: "Declare `let typeMatters = 10 === \"10\";` and log it. The strict check sees that the types differ.",
          starterCode: "let total = 100 - 25;\nconsole.log(total);\nlet isEven = 8 % 2 === 0;\nconsole.log(isEven);\nlet bigger = 10 > 5;\nconsole.log(bigger);\n// Declare typeMatters and log it.\n",
          checks: [
            {
              message: "Use `===` to compare `10` and `\"10\"`.",
              requirePattern: /\blet\s+typeMatters\s*=\s*10\s*===\s*["']10["']/,
            },
            {
              message: "`typeMatters` should be false — different types don't match strictly.",
              assert: "return typeMatters === false;",
            },
            {
              message: "Log `typeMatters`.",
              requirePattern: /console\.log\s*\(\s*typeMatters\s*\)/,
            },
          ],
          reveal: "let total = 100 - 25;\nconsole.log(total);\nlet isEven = 8 % 2 === 0;\nconsole.log(isEven);\nlet bigger = 10 > 5;\nconsole.log(bigger);\nlet typeMatters = 10 === \"10\";\nconsole.log(typeMatters);\n",
        },
      ],
      legend: [
        {
          name: "%",
          syntax: "a % b",
          example: "8 % 2 → 0",
          note: "Remainder. n % 2 is 0 for even, 1 for odd.",
        },
        {
          name: "===",
          syntax: "a === b",
          example: '10 === "10" → false',
          note: "Strict equality — both value AND type must match.",
        },
      ],
    },

    // 5. Exercise
    {
      kind: "exercise",
      title: "Lab: math and answers",
      prompt: "Compute and log four small answers.\n\n" +
          "User stories:\n" +
          "1. Log the result of 10 % 3 (the remainder).\n" +
          "2. Log the result of 7 * 8.\n" +
          "3. Log the result of the comparison 10 > 5 (a boolean).\n" +
          "4. Log the result of the comparison 10 === \"10\" (a boolean).\n\n" +
          "Exactly four console.log lines, in this order.",
      starterJs:
        "// 1. Log 10 % 3:\n\n\n" +
        "// 2. Log 7 * 8:\n\n\n" +
        "// 3. Log 10 > 5:\n\n\n" +
        "// 4. Log 10 === \"10\":\n\n",
      tests: [
        {
          label: "Console shows exactly four lines",
          assert:
            "var c = window.__console || []; return c.length === 4;",
          hint: "Four console.log calls — one per user story.",
        },
        {
          label: "First line is 1 (10 % 3) and second is 56 (7 * 8)",
          assert:
            "var c = window.__console || [];" +
            "if (c.length < 2) return false;" +
            "return c[0].text === '1' && c[1].text === '56';",
          hint: "Use console.log with the actual expressions — no quotes around them.",
        },
        {
          label: "Third line is true (10 > 5)",
          assert:
            "var c = window.__console || [];" +
            "if (c.length < 3) return false;" +
            "return c[2].text === 'true';",
          hint: "console.log(10 > 5) — the result is the boolean true.",
        },
        {
          label: "Fourth line is false (10 === \"10\")",
          assert:
            "var c = window.__console || [];" +
            "if (c.length < 4) return false;" +
            "return c[3].text === 'false';",
          hint: "Strict equality compares types too — number 10 and string \"10\" are not strictly equal.",
        },
      ],
    },

    // ──────────────────────────────────────────────────────────────────
    // Workshop 2 — Tip calculator (* and +)
    // ──────────────────────────────────────────────────────────────────
    {
      kind: "js-workshop",
      title: "Workshop: tip calculator",
      prompt: "Compute a tip and a final total. Then compare to a budget threshold.",
      designNote:
        "L3 W2. Surface: tip calculator. Touches *, +, > on numbers. Different scenario from W1's plain math.",
      steps: [
        {
          id: "tip-bill",
          instruction: "Declare `let bill = 200;` and log it.",
          starterCode: "// Declare bill and log it.\n",
          checks: [
            { message: "Use `let bill = 200`.", requirePattern: /\blet\s+bill\s*=\s*200\b/ },
            { message: "Log `bill`.", requirePattern: /console\.log\s*\(\s*bill\s*\)/ },
          ],
          reveal: "let bill = 200;\nconsole.log(bill);\n",
        },
        {
          id: "tip-amount",
          instruction: "Declare `let tip = bill * 0.15;` and log it. The tip should be 30.",
          starterCode: "let bill = 200;\nconsole.log(bill);\n// Declare tip and log it.\n",
          checks: [
            { message: "Use `bill * 0.15`.", requirePattern: /\blet\s+tip\s*=\s*bill\s*\*\s*0\.15\b/ },
            { message: "`tip` should equal 30.", assert: "return tip === 30;" },
            { message: "Log `tip`.", requirePattern: /console\.log\s*\(\s*tip\s*\)/ },
          ],
          reveal: "let bill = 200;\nconsole.log(bill);\nlet tip = bill * 0.15;\nconsole.log(tip);\n",
        },
        {
          id: "tip-total",
          instruction: "Declare `let total = bill + tip;` and log it. Should be 230.",
          starterCode: "let bill = 200;\nconsole.log(bill);\nlet tip = bill * 0.15;\nconsole.log(tip);\n// Declare total and log it.\n",
          checks: [
            { message: "Use `bill + tip`.", requirePattern: /\blet\s+total\s*=\s*bill\s*\+\s*tip\b/ },
            { message: "`total` should equal 230.", assert: "return total === 230;" },
            { message: "Log `total`.", requirePattern: /console\.log\s*\(\s*total\s*\)/ },
          ],
          reveal: "let bill = 200;\nconsole.log(bill);\nlet tip = bill * 0.15;\nconsole.log(tip);\nlet total = bill + tip;\nconsole.log(total);\n",
        },
        {
          id: "tip-budget",
          instruction: "Compare against a 250 budget: declare `let underBudget = total < 250;` and log the boolean.",
          starterCode: "let bill = 200;\nconsole.log(bill);\nlet tip = bill * 0.15;\nconsole.log(tip);\nlet total = bill + tip;\nconsole.log(total);\n// Declare underBudget and log it.\n",
          checks: [
            { message: "Use `total < 250`.", requirePattern: /\blet\s+underBudget\s*=\s*total\s*<\s*250\b/ },
            { message: "`underBudget` should be true.", assert: "return underBudget === true;" },
            { message: "Log `underBudget`.", requirePattern: /console\.log\s*\(\s*underBudget\s*\)/ },
          ],
          reveal: "let bill = 200;\nconsole.log(bill);\nlet tip = bill * 0.15;\nconsole.log(tip);\nlet total = bill + tip;\nconsole.log(total);\nlet underBudget = total < 250;\nconsole.log(underBudget);\n",
        },
      ],
    },

    // ──────────────────────────────────────────────────────────────────
    // Workshop 3 — Even / odd classifier (% focus)
    // ──────────────────────────────────────────────────────────────────
    {
      kind: "js-workshop",
      title: "Workshop: even or odd?",
      prompt: "Use the modulo operator to classify a number as even or odd.",
      designNote:
        "L3 W3. Surface: even/odd classifier. Heavy focus on % and ===.",
      steps: [
        {
          id: "evenodd-n",
          instruction: "Declare `let n = 7;` and log it.",
          starterCode: "// Declare n and log it.\n",
          checks: [
            { message: "Use `let n = 7`.", requirePattern: /\blet\s+n\s*=\s*7\b/ },
            { message: "Log `n`.", requirePattern: /console\.log\s*\(\s*n\s*\)/ },
          ],
          reveal: "let n = 7;\nconsole.log(n);\n",
        },
        {
          id: "evenodd-remainder",
          instruction: "Declare `let remainder = n % 2;` and log it. For 7, the remainder is 1.",
          starterCode: "let n = 7;\nconsole.log(n);\n// Declare remainder and log it.\n",
          checks: [
            { message: "Use `n % 2`.", requirePattern: /\blet\s+remainder\s*=\s*n\s*%\s*2\b/ },
            { message: "`remainder` should equal 1.", assert: "return remainder === 1;" },
            { message: "Log `remainder`.", requirePattern: /console\.log\s*\(\s*remainder\s*\)/ },
          ],
          reveal: "let n = 7;\nconsole.log(n);\nlet remainder = n % 2;\nconsole.log(remainder);\n",
        },
        {
          id: "evenodd-isodd",
          instruction: "Declare `let isOdd = remainder === 1;` and log it. The boolean is true.",
          starterCode: "let n = 7;\nconsole.log(n);\nlet remainder = n % 2;\nconsole.log(remainder);\n// Declare isOdd and log it.\n",
          checks: [
            { message: "Use `remainder === 1`.", requirePattern: /\blet\s+isOdd\s*=\s*remainder\s*===\s*1\b/ },
            { message: "`isOdd` should be true.", assert: "return isOdd === true;" },
            { message: "Log `isOdd`.", requirePattern: /console\.log\s*\(\s*isOdd\s*\)/ },
          ],
          reveal: "let n = 7;\nconsole.log(n);\nlet remainder = n % 2;\nconsole.log(remainder);\nlet isOdd = remainder === 1;\nconsole.log(isOdd);\n",
        },
        {
          id: "evenodd-iseven",
          instruction: "Declare `let isEven = n % 2 === 0;` and log it. For 7, this is false — collapsing two operators into one expression.",
          starterCode: "let n = 7;\nconsole.log(n);\nlet remainder = n % 2;\nconsole.log(remainder);\nlet isOdd = remainder === 1;\nconsole.log(isOdd);\n// Declare isEven and log it.\n",
          checks: [
            { message: "Use `n % 2 === 0`.", requirePattern: /\blet\s+isEven\s*=\s*n\s*%\s*2\s*===\s*0\b/ },
            { message: "`isEven` should be false.", assert: "return isEven === false;" },
            { message: "Log `isEven`.", requirePattern: /console\.log\s*\(\s*isEven\s*\)/ },
          ],
          reveal: "let n = 7;\nconsole.log(n);\nlet remainder = n % 2;\nconsole.log(remainder);\nlet isOdd = remainder === 1;\nconsole.log(isOdd);\nlet isEven = n % 2 === 0;\nconsole.log(isEven);\n",
        },
      ],
    },

    // ──────────────────────────────────────────────────────────────────
    // Workshop 4 — Threshold check (>=, ===)
    // ──────────────────────────────────────────────────────────────────
    {
      kind: "js-workshop",
      title: "Workshop: threshold check",
      prompt: "Compare a temperature against a few thresholds and notice how strict equality treats type.",
      designNote:
        "L3 W4. Surface: thresholds. Touches >=, ===, and the type-strictness corner of ===.",
      steps: [
        {
          id: "thresh-temp",
          instruction: "Declare `let temperature = 24;` and log it.",
          starterCode: "// Declare temperature and log it.\n",
          checks: [
            { message: "Use `let temperature = 24`.", requirePattern: /\blet\s+temperature\s*=\s*24\b/ },
            { message: "Log `temperature`.", requirePattern: /console\.log\s*\(\s*temperature\s*\)/ },
          ],
          reveal: "let temperature = 24;\nconsole.log(temperature);\n",
        },
        {
          id: "thresh-iswarm",
          instruction: "Declare `let isWarm = temperature >= 20;` and log it.",
          starterCode: "let temperature = 24;\nconsole.log(temperature);\n// Declare isWarm and log it.\n",
          checks: [
            { message: "Use `temperature >= 20`.", requirePattern: /\blet\s+isWarm\s*=\s*temperature\s*>=\s*20\b/ },
            { message: "`isWarm` should be true.", assert: "return isWarm === true;" },
            { message: "Log `isWarm`.", requirePattern: /console\.log\s*\(\s*isWarm\s*\)/ },
          ],
          reveal: "let temperature = 24;\nconsole.log(temperature);\nlet isWarm = temperature >= 20;\nconsole.log(isWarm);\n",
        },
        {
          id: "thresh-isexact",
          instruction: "Declare `let isExact = temperature === 24;` and log it.",
          starterCode: "let temperature = 24;\nconsole.log(temperature);\nlet isWarm = temperature >= 20;\nconsole.log(isWarm);\n// Declare isExact and log it.\n",
          checks: [
            { message: "Use `temperature === 24`.", requirePattern: /\blet\s+isExact\s*=\s*temperature\s*===\s*24\b/ },
            { message: "`isExact` should be true.", assert: "return isExact === true;" },
            { message: "Log `isExact`.", requirePattern: /console\.log\s*\(\s*isExact\s*\)/ },
          ],
          reveal: "let temperature = 24;\nconsole.log(temperature);\nlet isWarm = temperature >= 20;\nconsole.log(isWarm);\nlet isExact = temperature === 24;\nconsole.log(isExact);\n",
        },
        {
          id: "thresh-isstring",
          instruction: "Declare `let isString = temperature === \"24\";` and log it. Compare a number to a numeric STRING — strict equality fails.",
          starterCode: "let temperature = 24;\nconsole.log(temperature);\nlet isWarm = temperature >= 20;\nconsole.log(isWarm);\nlet isExact = temperature === 24;\nconsole.log(isExact);\n// Declare isString and log it.\n",
          checks: [
            { message: "Use `temperature === \"24\"`.", requirePattern: /\blet\s+isString\s*=\s*temperature\s*===\s*["']24["']/ },
            { message: "`isString` should be false.", assert: "return isString === false;" },
            { message: "Log `isString`.", requirePattern: /console\.log\s*\(\s*isString\s*\)/ },
          ],
          reveal: "let temperature = 24;\nconsole.log(temperature);\nlet isWarm = temperature >= 20;\nconsole.log(isWarm);\nlet isExact = temperature === 24;\nconsole.log(isExact);\nlet isString = temperature === \"24\";\nconsole.log(isString);\n",
        },
      ],
    },

    // ──────────────────────────────────────────────────────────────────
    // Exercise 2 — Tip and total
    // ──────────────────────────────────────────────────────────────────
    {
      kind: "exercise",
      title: "Lab: discount sale",
      prompt: "Compute and log four numbers for a 20% discount on a 250-kr item.\n\n" +
          "User stories:\n" +
          "1. Log 250 * 0.20 (the discount amount).\n" +
          "2. Log 250 - (250 * 0.20) (the price after discount).\n" +
          "3. Log (250 - (250 * 0.20)) < 250 (cheaper than the original — true).\n" +
          "4. Log (250 - (250 * 0.20)) === 200 (does it exactly equal 200 — true).\n\n" +
          "Exactly four console.log lines, in this order.",
      starterJs:
        "// 1. Log 250 * 0.20:\n\n\n" +
        "// 2. Log 250 - (250 * 0.20):\n\n\n" +
        "// 3. Log (250 - (250 * 0.20)) < 250:\n\n\n" +
        "// 4. Log (250 - (250 * 0.20)) === 200:\n\n",
      tests: [
        {
          label: "Console shows exactly four lines",
          assert: "var c = window.__console || []; return c.length === 4;",
          hint: "Four console.log calls.",
        },
        {
          label: "Lines are 50, 200, true, true (in order)",
          assert:
            "var c = window.__console || [];" +
            "if (c.length < 4) return false;" +
            "return c[0].text === '50' && c[1].text === '200' && c[2].text === 'true' && c[3].text === 'true';",
          hint: "250 * 0.20 = 50; 250 - 50 = 200; 200 < 250 is true; 200 === 200 is true.",
        },
        {
          label: "Code uses *, -, < and ===",
          assert:
            "var src = window.__userSrc || '';" +
            "return /\\*/.test(src) && /-/.test(src) && /</.test(src) && /===/.test(src);",
          hint: "All four operators must appear somewhere.",
        },
        {
          label: "No quotes around the numeric expressions",
          assert:
            "var c = window.__console || [];" +
            "if (c.length < 2) return false;" +
            "return !isNaN(Number(c[0].text)) && !isNaN(Number(c[1].text));",
          hint: "Pass the expressions directly to console.log without quotes.",
        },
      ],
    },

    // ──────────────────────────────────────────────────────────────────
    // Exercise 3 — Multiple of three
    // ──────────────────────────────────────────────────────────────────
    {
      kind: "exercise",
      title: "Lab: multiple of three",
      prompt: "Use the modulo operator to test if 12 is a multiple of 3.\n\n" +
          "User stories:\n" +
          "1. Log 12 (the number itself).\n" +
          "2. Log 12 % 3 (the remainder — should be 0).\n" +
          "3. Log 12 % 3 === 0 (is it a multiple of 3 — true).\n" +
          "4. Log 12 % 3 !== 0 (is it NOT a multiple of 3 — false).\n\n" +
          "Exactly four console.log lines.",
      starterJs:
        "// 1. Log 12:\n\n\n" +
        "// 2. Log 12 % 3:\n\n\n" +
        "// 3. Log 12 % 3 === 0:\n\n\n" +
        "// 4. Log 12 % 3 !== 0:\n\n",
      tests: [
        {
          label: "Console shows exactly four lines",
          assert: "var c = window.__console || []; return c.length === 4;",
          hint: "Four console.log calls.",
        },
        {
          label: "Lines are 12, 0, true, false (in order)",
          assert:
            "var c = window.__console || [];" +
            "if (c.length < 4) return false;" +
            "return c[0].text === '12' && c[1].text === '0' && c[2].text === 'true' && c[3].text === 'false';",
          hint: "12; 12 % 3 = 0; 0 === 0 is true; 0 !== 0 is false.",
        },
        {
          label: "Code uses %, ===, and !==",
          assert:
            "var src = window.__userSrc || '';" +
            "return /%/.test(src) && /===/.test(src) && /!==/.test(src);",
          hint: "% for the remainder, === and !== for the strict comparisons.",
        },
        {
          label: "Lines 3 and 4 evaluate to a boolean",
          assert:
            "var c = window.__console || [];" +
            "if (c.length < 4) return false;" +
            "return (c[2].text === 'true' || c[2].text === 'false') && (c[3].text === 'true' || c[3].text === 'false');",
          hint: "Comparisons always produce true or false.",
        },
      ],
    },

    // ──────────────────────────────────────────────────────────────────
    // Exercise 4 — Voting age check
    // ──────────────────────────────────────────────────────────────────
    {
      kind: "exercise",
      title: "Lab: voting age check",
      prompt: "Run four eligibility checks against the number 18.\n\n" +
          "User stories:\n" +
          "1. Log 18 >= 18 (old enough to vote — true).\n" +
          "2. Log 18 < 100 (under 100 — true).\n" +
          "3. Log 18 === 18 (strictly equal to itself — true).\n" +
          "4. Log 18 === \"18\" (strict equality with the string — false).\n\n" +
          "Exactly four console.log lines.",
      starterJs:
        "// 1. Log 18 >= 18:\n\n\n" +
        "// 2. Log 18 < 100:\n\n\n" +
        "// 3. Log 18 === 18:\n\n\n" +
        "// 4. Log 18 === \"18\":\n\n",
      tests: [
        {
          label: "Console shows exactly four lines",
          assert: "var c = window.__console || []; return c.length === 4;",
          hint: "Four console.log calls.",
        },
        {
          label: "Lines are true, true, true, false (in order)",
          assert:
            "var c = window.__console || [];" +
            "if (c.length < 4) return false;" +
            "return c[0].text === 'true' && c[1].text === 'true' && c[2].text === 'true' && c[3].text === 'false';",
          hint: "Strict equality with a string is false; the rest are true.",
        },
        {
          label: "Code uses >=, <, and ===",
          assert:
            "var src = window.__userSrc || '';" +
            "return />=/.test(src) && /</.test(src) && /===/.test(src);",
          hint: "All three comparison operators should appear.",
        },
        {
          label: "Every line evaluates to a boolean",
          assert:
            "var c = window.__console || [];" +
            "if (c.length < 4) return false;" +
            "for (var i = 0; i < 4; i++) { if (c[i].text !== 'true' && c[i].text !== 'false') return false; }" +
            "return true;",
          hint: "Each console.log should print a boolean comparison's result.",
        },
      ],
    },
  ],
};
