import type { Lesson } from "../../types";
import { codePanelStyle, noteBoxStyle } from "./_shared";

export const specialValuesLesson: Lesson = {
  id: "variables-special-values",
  title: "4. undefined, null, and NaN",
  summary: "Three values that mean 'nothing' — but each one differently.",
  slides: [
    // 1. undefined
    {
      kind: "explanation",
      title: "undefined — never set",
      intro: "When you declare a variable but don't give it a value,\nJavaScript fills it with `undefined`.",
      demo: [
        {
          id: "code",
          label:
            'let score;\nconsole.log(score);     // undefined\nconsole.log(typeof score); // "undefined"',
          baseStyle: codePanelStyle,
        },
        {
          id: "note",
          kind: "note",
          label: "If you ever see `undefined`\nin a log when you didn't expect it,\nit usually means you forgot\nto assign the variable.",
          baseStyle: { ...noteBoxStyle, marginTop: 16 },
        },
      ],
      steps: [
        {
          narration: "`let score;` — no value assigned.\nThe variable exists, but its value is `undefined`.",
          tokenHighlight: ["let score;"],
        },
        {
          narration: "`undefined` is a value AND a type.\n`typeof score` returns the string `\"undefined\"`.",
          tokenHighlight: ["typeof"],
        },
      ],
    },

    // 2. null
    {
      kind: "explanation",
      title: "null — intentionally empty",
      intro: "`null` is a value YOU set when you want to say\n'this slot is empty on purpose'.",
      demo: [
        {
          id: "code",
          label:
            'let answer = null;\nconsole.log(answer);          // null\nconsole.log(typeof answer);   // "object"  ← gotcha!',
          baseStyle: codePanelStyle,
        },
        {
          id: "note",
          kind: "note",
          label: "Beware: `typeof null` is `\"object\"`.\nIt's a famous JavaScript quirk\nthat's been there since 1995.\nDon't use typeof to check for null —\nuse `value === null` instead.",
          baseStyle: { ...noteBoxStyle, marginTop: 16 },
        },
      ],
      steps: [
        {
          narration: "Use `null` when you mean to say 'no value yet — but I picked that on purpose'.\nDifferent from `undefined`, which means 'I never even tried'.",
        },
        {
          narration: "To check for null, write `value === null`.\nDon't rely on `typeof` — it lies and says \"object\".",
          tokenHighlight: ["=== null"],
        },
      ],
    },

    // 3. NaN
    {
      kind: "explanation",
      title: "NaN — Not a Number",
      intro: "`NaN` is what you get when math fails.\n`0 / 0`, `Number(\"hello\")`, all give `NaN`.",
      demo: [
        {
          id: "code",
          label:
            'console.log(0 / 0);                 // NaN\nconsole.log(Number("hello"));       // NaN\n\nconsole.log(NaN === NaN);           // false  ← surprise!\nconsole.log(Number.isNaN(NaN));     // true',
          baseStyle: codePanelStyle,
        },
        {
          id: "note",
          kind: "note",
          label: "NaN is the ONLY value in JS\nthat is not equal to itself.\nThat's why we have `Number.isNaN(value)` —\nit's the reliable way to check.",
          baseStyle: { ...noteBoxStyle, marginTop: 16 },
        },
      ],
      steps: [
        {
          narration: "`NaN` shows up when you try to do math on something that isn't really a number.\n`0 / 0` is undefined math; `Number(\"hello\")` is a failed conversion.",
          tokenHighlight: ["NaN"],
        },
        {
          narration: "Funny twist: `NaN === NaN` is `false`.\nNaN is the only value not equal to itself — by design.",
          tokenHighlight: ["NaN === NaN"],
        },
        {
          narration: "To test if something is NaN, use `Number.isNaN(value)`.\nIt returns true only when the value really is NaN.",
          tokenHighlight: ["Number.isNaN"],
        },
      ],
    },

    // 4. Chip practice
    {
      kind: "js-chip-assignment",
      title: "Practice: name that nothing",
      prompt: "Match each scenario with the right value or check.",
      puzzles: [
        // p1: undefined for unassigned
        {
          prompt: "What does an unassigned `let` variable hold?",
          template: 'let x;\nconsole.log(x);   // [[]]',
          chips: ["undefined", "null", "NaN", '""'],
          solution: ["undefined"],
        },
        // p2: null for intentional empty
        {
          prompt: "Which value says 'empty on purpose'?",
          template: "let answer = [[]];",
          chips: ["null", "undefined", "NaN", "0"],
          solution: ["null"],
        },
        // p3: NaN from bad math
        {
          prompt: "What does `Number(\"hello\")` evaluate to?",
          template: 'console.log(Number("hello"));  // [[]]',
          chips: ["NaN", "0", "null", "undefined"],
          solution: ["NaN"],
        },
        // p4: Number.isNaN check
        {
          intro: "The reliable NaN check.",
          prompt: "Which call tests whether `value` is NaN?",
          template: "if ([[]](value)) { ... }",
          chips: ["Number.isNaN", "value === NaN", "typeof value", "isNumber"],
          solution: ["Number.isNaN"],
        },
        // p5: synthesis — pick the comparison
        {
          prompt: "Build a comparison to test if `answer` is null.",
          template: "if (answer [[]] [[]]) { ... }",
          chips: ["===", "null", "==", "undefined", "NaN"],
          solution: ["===", "null"],
        },
      ],
      legend: [
        {
          name: "undefined",
          syntax: "let x;",
          example: "let score; // score is undefined",
          note: "The default for a declared but unassigned variable.",
        },
        {
          name: "null",
          syntax: "let x = null;",
          example: "let answer = null;",
          note: "An intentional 'no value'. Check with === null.",
        },
        {
          name: "Number.isNaN",
          syntax: "Number.isNaN(value)",
          example: "Number.isNaN(0 / 0) → true",
          note: "The reliable way to check for NaN — direct === comparison doesn't work.",
        },
      ],
    },

    // 5. Workshop — 4 steps
    {
      kind: "js-workshop",
      title: "Workshop: special values up close",
      prompt: "See undefined, null, NaN, and Number.isNaN in action — one per step.",
      designNote:
        "Variables L4 workshop. Four steps: declare-without-assign (undefined), assign null, produce NaN via 0/0, verify with Number.isNaN. Surface emphasizes 'three kinds of nothing' arc.",
      steps: [
        {
          id: "specials-undefined",
          instruction: "Declare `let score;` (no value). Then log it. The output is `undefined`.",
          starterCode: "// Declare score with no value, then log it.\n",
          checks: [
            {
              message: "Declare `score` with `let` and no initial value.",
              requirePattern: /\blet\s+score\s*;/,
            },
            {
              message: "`score` should be `undefined`.",
              assert: "return typeof score === 'undefined';",
            },
            {
              message: "Log `score`.",
              requirePattern: /console\.log\s*\(\s*score\s*\)/,
            },
          ],
          reveal: "let score;\nconsole.log(score);\n",
        },
        {
          id: "specials-null",
          instruction: "Below that, declare `let answer = null;` and log it.",
          starterCode: "let score;\nconsole.log(score);\n// Declare answer = null and log it.\n",
          checks: [
            {
              message: "Declare `answer` with the value `null`.",
              requirePattern: /\blet\s+answer\s*=\s*null\b/,
            },
            {
              message: "`answer` should be `null`.",
              assert: "return answer === null;",
            },
            {
              message: "Log `answer`.",
              requirePattern: /console\.log\s*\(\s*answer\s*\)/,
            },
          ],
          reveal: "let score;\nconsole.log(score);\nlet answer = null;\nconsole.log(answer);\n",
        },
        {
          id: "specials-nan",
          instruction: "Declare `let oops = 0 / 0;` and log it. Watch what bad math produces.",
          starterCode: "let score;\nconsole.log(score);\nlet answer = null;\nconsole.log(answer);\n// Declare oops = 0 / 0 and log it.\n",
          checks: [
            {
              message: "Declare `oops` with the expression `0 / 0`.",
              requirePattern: /\blet\s+oops\s*=\s*0\s*\/\s*0\b/,
            },
            {
              message: "`oops` should be NaN — check with Number.isNaN(oops).",
              assert: "return Number.isNaN(oops);",
            },
            {
              message: "Log `oops`.",
              requirePattern: /console\.log\s*\(\s*oops\s*\)/,
            },
          ],
          reveal: "let score;\nconsole.log(score);\nlet answer = null;\nconsole.log(answer);\nlet oops = 0 / 0;\nconsole.log(oops);\n",
        },
        {
          id: "specials-isnan-check",
          instruction: "Log `Number.isNaN(oops)` — the reliable way to confirm a value is NaN. The output should be `true`.",
          starterCode: "let score;\nconsole.log(score);\nlet answer = null;\nconsole.log(answer);\nlet oops = 0 / 0;\nconsole.log(oops);\n// Log Number.isNaN(oops).\n",
          checks: [
            {
              message: "Log `Number.isNaN(oops)`.",
              requirePattern: /console\.log\s*\(\s*Number\.isNaN\s*\(\s*oops\s*\)\s*\)/,
            },
          ],
          reveal: "let score;\nconsole.log(score);\nlet answer = null;\nconsole.log(answer);\nlet oops = 0 / 0;\nconsole.log(oops);\nconsole.log(Number.isNaN(oops));\n",
        },
      ],
      legend: [
        {
          name: "undefined",
          syntax: "let x;",
          example: "let score; // undefined",
          note: "Default for declared-but-unassigned variables.",
        },
        {
          name: "null",
          syntax: "let x = null;",
          example: "let answer = null;",
          note: "Means 'no value, on purpose'.",
        },
        {
          name: "Number.isNaN",
          syntax: "Number.isNaN(value)",
          example: "Number.isNaN(0 / 0) // true",
          note: "Reliable test for NaN — direct === doesn't work.",
        },
      ],
    },

    // 6. Exercise
    {
      kind: "exercise",
      title: "Lab: special-values tour",
      prompt: "Show each of the special values in turn.\n\n" +
          "User stories:\n" +
          "1. Declare a variable with `let` and no value, then log it. The output should be `undefined`.\n" +
          "2. Declare a variable with the value `null` and log it. The output should be `null`.\n" +
          "3. Cause a NaN (e.g. `0 / 0` or `Number(\"abc\")`) and log it. The output should be `NaN`.\n" +
          "4. After your NaN line, log `Number.isNaN(yourNanVariable)` — the output should be `true`.\n\n" +
          "Exactly four console.log lines, in this order.",
      starterJs:
        "// 1. Declare a variable with no value and log it (undefined):\n\n\n" +
        "// 2. Declare a variable with value null and log it:\n\n\n" +
        "// 3. Make a NaN and log it:\n\n\n" +
        "// 4. Log Number.isNaN of your NaN variable:\n\n",
      tests: [
        {
          label: "Console shows exactly four lines",
          assert:
            "var c = window.__console || []; return c.length === 4;",
          hint: "Four console.log calls — one per user story.",
        },
        {
          label: "First line is \"undefined\" and second is \"null\"",
          assert:
            "var c = window.__console || [];" +
            "if (c.length < 2) return false;" +
            "return c[0].text === 'undefined' && c[1].text === 'null';",
          hint: "First: declare with no value. Second: declare with the value null.",
        },
        {
          label: "Third line is \"NaN\"",
          assert:
            "var c = window.__console || [];" +
            "if (c.length < 3) return false;" +
            "return c[2].text === 'NaN';",
          hint: "Try 0 / 0 or Number(\"abc\") — both produce NaN.",
        },
        {
          label: "Fourth line is \"true\" and code uses Number.isNaN",
          assert:
            "var c = window.__console || [];" +
            "if (c.length < 4) return false;" +
            "var src = window.__userSrc || '';" +
            "return c[3].text === 'true' && /\\bNumber\\.isNaN\\b/.test(src);",
          hint: "console.log(Number.isNaN(yourVariable)) — pass the NaN variable to Number.isNaN.",
        },
      ],
    },

    // ──────────────────────────────────────────────────────────────────
    // Workshop 2 — Form fields awaiting input
    // ──────────────────────────────────────────────────────────────────
    {
      kind: "js-workshop",
      title: "Workshop: form fields",
      prompt: "A form starts with empty fields. Some are `undefined` (never touched), some are `null` (deliberately empty).",
      designNote:
        "L4 W2. Surface: form field lifecycle (declared → assigned). Touches undefined and null in a real-feeling scenario.",
      steps: [
        {
          id: "form-username-empty",
          instruction: "Declare `let username;` (no value). Log it — the field is `undefined`.",
          starterCode: "// Declare username with no value, then log it.\n",
          checks: [
            { message: "Declare `username` with `let` and no value.", requirePattern: /\blet\s+username\s*;/ },
            { message: "`username` should be `undefined`.", assert: "return typeof username === 'undefined';" },
            { message: "Log `username`.", requirePattern: /console\.log\s*\(\s*username\s*\)/ },
          ],
          reveal: "let username;\nconsole.log(username);\n",
        },
        {
          id: "form-username-set",
          instruction: "The user types in their username — reassign `username` to `\"alice\"` and log it.",
          starterCode: "let username;\nconsole.log(username);\n// Reassign username to a string and log it.\n",
          checks: [
            { message: "Reassign `username` to a string (no `let` on this line).", requirePattern: /(^|\n)\s*username\s*=\s*["'][^"']+["']/ },
            { message: "`username` should be a non-empty string.", assert: "return typeof username === 'string' && username.length > 0;" },
          ],
          reveal: 'let username;\nconsole.log(username);\nusername = "alice";\nconsole.log(username);\n',
          anyValues: true,
        },
        {
          id: "form-terms-null",
          instruction: "The terms-checkbox starts unchecked, on purpose. Declare `let acceptedTerms = null;` and log it.",
          starterCode: 'let username;\nconsole.log(username);\nusername = "alice";\nconsole.log(username);\n// Declare acceptedTerms = null and log it.\n',
          checks: [
            { message: "Declare `acceptedTerms = null`.", requirePattern: /\blet\s+acceptedTerms\s*=\s*null\b/ },
            { message: "`acceptedTerms` should be `null`.", assert: "return acceptedTerms === null;" },
            { message: "Log `acceptedTerms`.", requirePattern: /console\.log\s*\(\s*acceptedTerms\s*\)/ },
          ],
          reveal: 'let username;\nconsole.log(username);\nusername = "alice";\nconsole.log(username);\nlet acceptedTerms = null;\nconsole.log(acceptedTerms);\n',
        },
        {
          id: "form-terms-checked",
          instruction: "The user takes action — reassign `acceptedTerms` to `true` and log it.",
          starterCode: 'let username;\nconsole.log(username);\nusername = "alice";\nconsole.log(username);\nlet acceptedTerms = null;\nconsole.log(acceptedTerms);\n// Reassign acceptedTerms (no longer null) and log it.\n',
          checks: [
            { message: "Add a reassignment line for `acceptedTerms` (no `let`).", requirePattern: /(^|\n)\s*acceptedTerms\s*=\s*(?!null\b)/ },
            { message: "`acceptedTerms` should no longer be `null`.", assert: "return acceptedTerms !== null && typeof acceptedTerms !== 'undefined';" },
          ],
          reveal: 'let username;\nconsole.log(username);\nusername = "alice";\nconsole.log(username);\nlet acceptedTerms = null;\nconsole.log(acceptedTerms);\nacceptedTerms = true;\nconsole.log(acceptedTerms);\n',
          anyValues: true,
        },
      ],
    },

    // ──────────────────────────────────────────────────────────────────
    // Workshop 3 — Parsing user input (NaN territory)
    // ──────────────────────────────────────────────────────────────────
    {
      kind: "js-workshop",
      title: "Workshop: parsing user input",
      prompt: "When you parse a string to a number, you might get NaN. Use `Number.isNaN` to check.",
      designNote:
        "L4 W3. Surface: input parsing. Touches NaN and Number.isNaN.",
      steps: [
        {
          id: "parse-good",
          instruction: "Declare `let typed = \"30\";` and `let parsed = Number(typed);`. Log `parsed`. It should be the number 30.",
          starterCode: "// Declare typed and parsed below, then log parsed.\n",
          checks: [
            { message: "Declare `typed = \"30\"`.", requirePattern: /\blet\s+typed\s*=\s*["']30["']/ },
            { message: "Declare `parsed = Number(typed)`.", requirePattern: /\blet\s+parsed\s*=\s*Number\s*\(\s*typed\s*\)/ },
            { message: "`parsed` should equal 30.", assert: "return parsed === 30;" },
            { message: "Log `parsed`.", requirePattern: /console\.log\s*\(\s*parsed\s*\)/ },
          ],
          reveal: 'let typed = "30";\nlet parsed = Number(typed);\nconsole.log(parsed);\n',
        },
        {
          id: "parse-bad",
          instruction: "Now an invalid input. Declare `let typedBad = \"abc\";` and `let parsedBad = Number(typedBad);`. Log it — you'll see `NaN`.",
          starterCode: 'let typed = "30";\nlet parsed = Number(typed);\nconsole.log(parsed);\n// Declare typedBad and parsedBad, then log parsedBad.\n',
          checks: [
            { message: "Declare `typedBad = \"abc\"`.", requirePattern: /\blet\s+typedBad\s*=\s*["']abc["']/ },
            { message: "Declare `parsedBad = Number(typedBad)`.", requirePattern: /\blet\s+parsedBad\s*=\s*Number\s*\(\s*typedBad\s*\)/ },
            { message: "`parsedBad` should be NaN.", assert: "return Number.isNaN(parsedBad);" },
            { message: "Log `parsedBad`.", requirePattern: /console\.log\s*\(\s*parsedBad\s*\)/ },
          ],
          reveal: 'let typed = "30";\nlet parsed = Number(typed);\nconsole.log(parsed);\nlet typedBad = "abc";\nlet parsedBad = Number(typedBad);\nconsole.log(parsedBad);\n',
        },
        {
          id: "parse-isnan-bad",
          instruction: "Verify with `Number.isNaN(parsedBad)` — should log `true`.",
          starterCode: 'let typed = "30";\nlet parsed = Number(typed);\nconsole.log(parsed);\nlet typedBad = "abc";\nlet parsedBad = Number(typedBad);\nconsole.log(parsedBad);\n// Log Number.isNaN(parsedBad).\n',
          checks: [
            { message: "Log `Number.isNaN(parsedBad)`.", requirePattern: /console\.log\s*\(\s*Number\.isNaN\s*\(\s*parsedBad\s*\)\s*\)/ },
          ],
          reveal: 'let typed = "30";\nlet parsed = Number(typed);\nconsole.log(parsed);\nlet typedBad = "abc";\nlet parsedBad = Number(typedBad);\nconsole.log(parsedBad);\nconsole.log(Number.isNaN(parsedBad));\n',
        },
        {
          id: "parse-isnan-good",
          instruction: "Compare with `Number.isNaN(parsed)` — should log `false`. The valid number is, well, a valid number.",
          starterCode: 'let typed = "30";\nlet parsed = Number(typed);\nconsole.log(parsed);\nlet typedBad = "abc";\nlet parsedBad = Number(typedBad);\nconsole.log(parsedBad);\nconsole.log(Number.isNaN(parsedBad));\n// Log Number.isNaN(parsed).\n',
          checks: [
            { message: "Log `Number.isNaN(parsed)`.", requirePattern: /console\.log\s*\(\s*Number\.isNaN\s*\(\s*parsed\s*\)\s*\)/ },
          ],
          reveal: 'let typed = "30";\nlet parsed = Number(typed);\nconsole.log(parsed);\nlet typedBad = "abc";\nlet parsedBad = Number(typedBad);\nconsole.log(parsedBad);\nconsole.log(Number.isNaN(parsedBad));\nconsole.log(Number.isNaN(parsed));\n',
        },
      ],
    },

    // ──────────────────────────────────────────────────────────────────
    // Workshop 4 — Optional middle name (null vs undefined)
    // ──────────────────────────────────────────────────────────────────
    {
      kind: "js-workshop",
      title: "Workshop: optional fields",
      prompt: "Some people don't have a middle name. Use `null` to say 'this slot is empty on purpose', and notice that `typeof null` is the famous JS gotcha.",
      designNote:
        "L4 W4. Surface: optional middle name. Distinguishes null (intentional) from undefined (never set), and exposes typeof null === 'object' gotcha.",
      steps: [
        {
          id: "optional-declare",
          instruction: "Declare three name parts: `firstName = \"Alice\"`, `middleName = null` (the lesson — intentionally empty), and `lastName = \"Smith\"`. Log all three on separate lines.",
          starterCode: "// Declare the three name parts and log each.\n",
          checks: [
            { message: "`firstName` should be a non-empty string.", assert: "return typeof firstName === 'string' && firstName.length > 0;" },
            { message: "`middleName` should be `null` (intentionally empty).", assert: "return middleName === null;" },
            { message: "`lastName` should be a non-empty string.", assert: "return typeof lastName === 'string' && lastName.length > 0;" },
            {
              message: "Log all three.",
              requirePattern: /console\.log[\s\S]*console\.log[\s\S]*console\.log/,
            },
          ],
          reveal: 'let firstName = "Alice";\nlet middleName = null;\nlet lastName = "Smith";\nconsole.log(firstName);\nconsole.log(middleName);\nconsole.log(lastName);\n',
          anyValues: true,
        },
        {
          id: "optional-check-null",
          instruction: "Confirm middleName is null with `console.log(middleName === null);` — should log `true`.",
          starterCode: 'let firstName = "Alice";\nlet middleName = null;\nlet lastName = "Smith";\nconsole.log(firstName);\nconsole.log(middleName);\nconsole.log(lastName);\n// Log middleName === null.\n',
          checks: [
            { message: "Use `middleName === null` inside `console.log`.", requirePattern: /console\.log\s*\(\s*middleName\s*===\s*null\s*\)/ },
          ],
          reveal: 'let firstName = "Alice";\nlet middleName = null;\nlet lastName = "Smith";\nconsole.log(firstName);\nconsole.log(middleName);\nconsole.log(lastName);\nconsole.log(middleName === null);\n',
        },
        {
          id: "optional-typeof-quirk",
          instruction: "Now the famous JS gotcha: log `typeof middleName`. The result is `\"object\"`, not `\"null\"`.",
          starterCode: 'let firstName = "Alice";\nlet middleName = null;\nlet lastName = "Smith";\nconsole.log(firstName);\nconsole.log(middleName);\nconsole.log(lastName);\nconsole.log(middleName === null);\n// Log typeof middleName.\n',
          checks: [
            { message: "Log `typeof middleName`.", requirePattern: /console\.log\s*\(\s*typeof\s+middleName\s*\)/ },
          ],
          reveal: 'let firstName = "Alice";\nlet middleName = null;\nlet lastName = "Smith";\nconsole.log(firstName);\nconsole.log(middleName);\nconsole.log(lastName);\nconsole.log(middleName === null);\nconsole.log(typeof middleName);\n',
        },
        {
          id: "optional-undefined-contrast",
          instruction: "Compare with `undefined`. Declare `let nickname;` (no value) and log `nickname === undefined` — should be `true`.",
          starterCode: 'let firstName = "Alice";\nlet middleName = null;\nlet lastName = "Smith";\nconsole.log(firstName);\nconsole.log(middleName);\nconsole.log(lastName);\nconsole.log(middleName === null);\nconsole.log(typeof middleName);\n// Declare nickname and log nickname === undefined.\n',
          checks: [
            { message: "Declare `nickname` with no value.", requirePattern: /\blet\s+nickname\s*;/ },
            { message: "Log `nickname === undefined`.", requirePattern: /console\.log\s*\(\s*nickname\s*===\s*undefined\s*\)/ },
          ],
          reveal: 'let firstName = "Alice";\nlet middleName = null;\nlet lastName = "Smith";\nconsole.log(firstName);\nconsole.log(middleName);\nconsole.log(lastName);\nconsole.log(middleName === null);\nconsole.log(typeof middleName);\nlet nickname;\nconsole.log(nickname === undefined);\n',
        },
      ],
    },

    // ──────────────────────────────────────────────────────────────────
    // Exercise 2 — Form initial state
    // ──────────────────────────────────────────────────────────────────
    {
      kind: "exercise",
      title: "Lab: chat session",
      prompt: "Show the four stages of a chat session's state.\n\n" +
          "User stories:\n" +
          "1. Declare a variable with `let` and no value, then log it (undefined).\n" +
          "2. Declare a variable with the value `null`, then log it.\n" +
          "3. Reassign the first variable to a non-empty string and log it.\n" +
          "4. Reassign the second variable to `true` and log it.\n\n" +
          "Exactly four console.log lines, in this order.",
      starterJs:
        "// 1. Declare an empty variable and log it (undefined):\n\n\n" +
        "// 2. Declare a null variable and log it:\n\n\n" +
        "// 3. Reassign the first one to a string and log it:\n\n\n" +
        "// 4. Reassign the second one to true and log it:\n\n",
      tests: [
        {
          label: "Console shows exactly four lines",
          assert: "var c = window.__console || []; return c.length === 4;",
          hint: "Four console.log calls.",
        },
        {
          label: "First line is \"undefined\" and second is \"null\"",
          assert:
            "var c = window.__console || [];" +
            "if (c.length < 2) return false;" +
            "return c[0].text === 'undefined' && c[1].text === 'null';",
          hint: "First: declare with no value. Second: declare with the value null.",
        },
        {
          label: "Third line is a non-empty string",
          assert:
            "var c = window.__console || [];" +
            "if (c.length < 3) return false;" +
            "return c[2].text.length > 0 && c[2].text !== 'undefined' && c[2].text !== 'null';",
          hint: "Reassign the first variable to a string and log it.",
        },
        {
          label: "Fourth line is \"true\"",
          assert:
            "var c = window.__console || [];" +
            "if (c.length < 4) return false;" +
            "return c[3].text === 'true';",
          hint: "Reassign the second variable to true and log it.",
        },
      ],
      anyValues: true,
    },

    // ──────────────────────────────────────────────────────────────────
    // Exercise 3 — Parse and verify
    // ──────────────────────────────────────────────────────────────────
    {
      kind: "exercise",
      title: "Lab: validate guest count",
      prompt: "Parse two RSVP strings and use Number.isNaN to verify the results.\n\n" +
          "User stories:\n" +
          "1. Log `Number(\"4\")` (a successful parse — 4).\n" +
          "2. Log `Number(\"many\")` (a failed parse — NaN).\n" +
          "3. Log `Number.isNaN(Number(\"many\"))` (true).\n" +
          "4. Log `Number.isNaN(Number(\"4\"))` (false).\n\n" +
          "Exactly four console.log lines, in this order.",
      starterJs:
        "// 1. Log Number(\"4\"):\n\n\n" +
        "// 2. Log Number(\"many\"):\n\n\n" +
        "// 3. Log Number.isNaN(Number(\"many\")):\n\n\n" +
        "// 4. Log Number.isNaN(Number(\"4\")):\n\n",
      tests: [
        {
          label: "Console shows exactly four lines",
          assert: "var c = window.__console || []; return c.length === 4;",
          hint: "Four console.log calls.",
        },
        {
          label: "Lines are 4, NaN, true, false (in order)",
          assert:
            "var c = window.__console || [];" +
            "if (c.length < 4) return false;" +
            "return c[0].text === '4' && c[1].text === 'NaN' && c[2].text === 'true' && c[3].text === 'false';",
          hint: 'Number("4") = 4; Number("many") = NaN; isNaN of NaN = true; isNaN of 4 = false.',
        },
        {
          label: "Code uses Number(...) at least four times",
          assert:
            "var src = window.__userSrc || '';" +
            "return (src.match(/\\bNumber\\s*\\(/g) || []).length >= 4;",
          hint: "Each line builds on Number(...) — explicit parsing.",
        },
        {
          label: "Code uses Number.isNaN at least twice",
          assert:
            "var src = window.__userSrc || '';" +
            "return (src.match(/\\bNumber\\.isNaN\\b/g) || []).length >= 2;",
          hint: "Use Number.isNaN to test the parse result.",
        },
      ],
    },

    // ──────────────────────────────────────────────────────────────────
    // Exercise 4 — null vs undefined
    // ──────────────────────────────────────────────────────────────────
    {
      kind: "exercise",
      title: "Lab: null vs undefined",
      prompt: "Show how `null` and `undefined` look the same — and aren't.\n\n" +
          "User stories:\n" +
          "1. Log `null === null` (true).\n" +
          "2. Log `null === undefined` (false — strict equality cares about type).\n" +
          "3. Log `typeof null` (the famous \"object\" gotcha).\n" +
          "4. Log `typeof undefined` (\"undefined\").\n\n" +
          "Exactly four console.log lines, in this order.",
      starterJs:
        "// 1. Log null === null:\n\n\n" +
        "// 2. Log null === undefined:\n\n\n" +
        "// 3. Log typeof null:\n\n\n" +
        "// 4. Log typeof undefined:\n\n",
      tests: [
        {
          label: "Console shows exactly four lines",
          assert: "var c = window.__console || []; return c.length === 4;",
          hint: "Four console.log calls.",
        },
        {
          label: "Lines are true, false, object, undefined (in order)",
          assert:
            "var c = window.__console || [];" +
            "if (c.length < 4) return false;" +
            "return c[0].text === 'true' && c[1].text === 'false' && c[2].text === 'object' && c[3].text === 'undefined';",
          hint: "null === null is true; null === undefined is false; typeof null is \"object\"; typeof undefined is \"undefined\".",
        },
        {
          label: "Code uses strict equality (===)",
          assert:
            "var src = window.__userSrc || '';" +
            "return /===/.test(src);",
          hint: "Use === for the comparison lines.",
        },
        {
          label: "Code uses typeof at least twice",
          assert:
            "var src = window.__userSrc || '';" +
            "return (src.match(/\\btypeof\\b/g) || []).length >= 2;",
          hint: "Use typeof on null and on undefined.",
        },
      ],
    },
  ],
};
