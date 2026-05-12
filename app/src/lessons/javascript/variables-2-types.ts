import type { Lesson } from "../../types";
import { codePanelStyle, noteBoxStyle } from "./_shared";

export const typesLesson: Lesson = {
  id: "variables-types",
  title: "2. Types — what kind of value",
  summary: "Strings, numbers, booleans, and the trap of mixing them.",
  slides: [
    // 1. Intro — three primitive types
    {
      kind: "explanation",
      title: "Three kinds of values",
      intro: "Every value in JavaScript has a TYPE.\nFor now, three types matter: string, number, and boolean.",
      demo: [
        {
          id: "code",
          label:
            'let title = "Hello";   // string — text\nlet score = 42;        // number — a numeric value\nlet ready = true;      // boolean — true or false',
          baseStyle: codePanelStyle,
        },
      ],
      steps: [
        {
          narration: "A STRING is text. Wrap it in quotes — single, double, or backticks.\n\"hi\"  'hi'  `hi` are all strings.",
          tokenHighlight: ['"Hello"'],
        },
        {
          narration: "A NUMBER is a numeric value. No quotes — just the digits.\n42, 3.14, -7, 0.001 are all numbers.",
          tokenHighlight: ["42"],
        },
        {
          narration: "A BOOLEAN is one of two values: `true` or `false`.\nNo quotes. These are special words, not strings.",
          tokenHighlight: ["true"],
        },
      ],
    },

    // 2. typeof
    {
      kind: "explanation",
      title: "typeof — ask what you've got",
      intro: "`typeof value` gives you back a string naming the type.\nUseful for sanity checks and for spotting bugs.",
      demo: [
        {
          id: "code",
          label:
            'typeof "Hello"   // "string"\ntypeof 42         // "number"\ntypeof true       // "boolean"',
          baseStyle: codePanelStyle,
        },
        {
          id: "note",
          kind: "note",
          label: "Note: `typeof` returns a STRING describing the type.\n`typeof 42` is `\"number\"`, not `number`.",
          baseStyle: { ...noteBoxStyle, marginTop: 16 },
        },
      ],
      steps: [
        {
          narration: "Put `typeof` in front of any value or variable. The result is a string you can log.",
          tokenHighlight: ["typeof"],
        },
        {
          narration: "console.log(typeof score) is a quick way to confirm what's in a variable when something feels off.",
        },
      ],
    },

    // 3. Coercion hazard
    {
      kind: "explanation",
      title: "Mixing types — the + trap",
      intro: "JavaScript will sometimes silently convert values when types collide.\nThe most common surprise is `+` between a string and a number.",
      demo: [
        {
          id: "code",
          label:
            '5 + 3       // 8        — number + number, you get a number\n"5" + 3     // "53"     — string + number, you get a STRING\n"5" - 3     // 2        — minus only works on numbers',
          baseStyle: codePanelStyle,
        },
        {
          id: "note",
          kind: "note",
          label: "Why? `+` between a string and anything\nmeans CONCATENATE (join end-to-end).\nThe number gets pulled into a string first.",
          baseStyle: { ...noteBoxStyle, marginTop: 16 },
        },
      ],
      steps: [
        {
          narration: "Two numbers with `+` add up. 5 + 3 is 8.",
          tokenHighlight: ["5 + 3"],
        },
        {
          narration: "But put a string on either side and `+` glues them together.\n\"5\" + 3 is the string \"53\" — not the number 8.",
          tokenHighlight: ['"5" + 3'],
        },
        {
          narration: "Subtraction has no string meaning, so `-` always coerces TO numbers.\n\"5\" - 3 is 2 — JavaScript reads \"5\" as the number 5.",
          tokenHighlight: ['"5" - 3'],
        },
        {
          narration: "Lesson: when reading user input or building strings,\nwatch the types — bugs hide in the mixing.",
        },
      ],
    },

    // 4. Chip practice
    {
      kind: "js-chip-assignment",
      title: "Practice: name the type",
      prompt: "Pick the right type for each value.\nThen assemble a typeof check.",
      puzzles: [
        // p1: type of "hi"
        {
          prompt: "What's the type of \"hi\"?",
          template: 'typeof "hi"   // "[[]]"',
          chips: ["string", "number", "boolean", "text"],
          solution: ["string"],
        },
        // p2: type of 42
        {
          prompt: "What's the type of 42?",
          template: "typeof 42     // \"[[]]\"",
          chips: ["number", "string", "integer", "boolean"],
          solution: ["number"],
        },
        // p3: type of true
        {
          prompt: "What's the type of true?",
          template: "typeof true   // \"[[]]\"",
          chips: ["boolean", "true", "string", "number"],
          solution: ["boolean"],
        },
        // p4: "5" + 3 = ?
        {
          intro: "Now the coercion trap — what's the result?",
          prompt: "What does \"5\" + 3 evaluate to?",
          template: '"5" + 3   // [[]]',
          chips: ['"53"', "8", '"8"', "53"],
          solution: ['"53"'],
        },
        // p5: synthesis
        {
          prompt: "Build a `typeof` check on the variable `score`.",
          template: "console.log([[]] [[]]);",
          chips: ["typeof", "score", "string", "number"],
          solution: ["typeof", "score"],
        },
      ],
      legend: [
        {
          name: "typeof",
          syntax: "typeof value",
          example: 'typeof "hi"',
          note: "Returns a string naming the value's type: \"string\", \"number\", \"boolean\", and others.",
        },
        {
          name: "string + number",
          syntax: 'string + number',
          example: '"5" + 3 → "53"',
          note: "When + sees any string, it joins the operands as text.",
        },
      ],
    },

    // 5. Workshop — 4 steps
    {
      kind: "js-workshop",
      title: "Workshop: types in action",
      prompt: "Declare one of each type, check them with typeof, and witness the +-coercion bug.",
      designNote:
        "Variables L2 workshop. Four steps: declare three types, log typeof of each, observe \"5\" + 3, log a typeof. Surface: title/score/ready triple plus a visible coercion bug.",
      steps: [
        {
          id: "types-declare-three",
          instruction: "Declare three variables — `title = \"Hello\"`, `score = 42`, and `ready = true`. Use `let` for all three.",
          starterCode: "// Declare title, score, and ready below.\n",
          checks: [
            {
              message: "`title` should be a string.",
              assert: "return typeof title === 'string';",
            },
            {
              message: "`score` should be a number.",
              assert: "return typeof score === 'number';",
            },
            {
              message: "`ready` should be a boolean.",
              assert: "return typeof ready === 'boolean';",
            },
          ],
          reveal: 'let title = "Hello";\nlet score = 42;\nlet ready = true;\n',
          anyValues: true,
        },
        {
          id: "types-typeof-each",
          instruction: "Log the type of each variable using `typeof`. Three lines, three types.",
          starterCode: 'let title = "Hello";\nlet score = 42;\nlet ready = true;\n// Log typeof of each variable.\n',
          checks: [
            {
              message: "Use `typeof` on `title`, `score`, and `ready`.",
              requirePattern: /typeof\s+title[\s\S]*typeof\s+score[\s\S]*typeof\s+ready/,
            },
            {
              message: "Each `typeof` should be inside a `console.log(...)`.",
              requirePattern: /console\.log[\s\S]*console\.log[\s\S]*console\.log/,
            },
          ],
          reveal: 'let title = "Hello";\nlet score = 42;\nlet ready = true;\nconsole.log(typeof title);\nconsole.log(typeof score);\nconsole.log(typeof ready);\n',
        },
        {
          id: "types-coercion-bug",
          instruction: "Below all your code, declare `let buggy = \"5\" + 3;` and log it. Watch what happens.",
          starterCode: 'let title = "Hello";\nlet score = 42;\nlet ready = true;\nconsole.log(typeof title);\nconsole.log(typeof score);\nconsole.log(typeof ready);\n// Add buggy and log it.\n',
          checks: [
            {
              message: "Declare `buggy` with `\"5\" + 3`.",
              requirePattern: /\blet\s+buggy\s*=\s*["']5["']\s*\+\s*3\b/,
            },
            {
              message: "`buggy` should equal the string \"53\" — not the number 8.",
              assert: "return buggy === '53';",
            },
            {
              message: "Log `buggy` with `console.log`.",
              requirePattern: /console\.log\s*\(\s*buggy\s*\)/,
            },
          ],
          reveal: 'let title = "Hello";\nlet score = 42;\nlet ready = true;\nconsole.log(typeof title);\nconsole.log(typeof score);\nconsole.log(typeof ready);\nlet buggy = "5" + 3;\nconsole.log(buggy);\n',
        },
        {
          id: "types-typeof-buggy",
          instruction: "Confirm your suspicion: log `typeof buggy`. The output proves the value is a string.",
          starterCode: 'let title = "Hello";\nlet score = 42;\nlet ready = true;\nconsole.log(typeof title);\nconsole.log(typeof score);\nconsole.log(typeof ready);\nlet buggy = "5" + 3;\nconsole.log(buggy);\n// Log typeof buggy.\n',
          checks: [
            {
              message: "Log `typeof buggy`.",
              requirePattern: /console\.log\s*\(\s*typeof\s+buggy\s*\)/,
            },
          ],
          reveal: 'let title = "Hello";\nlet score = 42;\nlet ready = true;\nconsole.log(typeof title);\nconsole.log(typeof score);\nconsole.log(typeof ready);\nlet buggy = "5" + 3;\nconsole.log(buggy);\nconsole.log(typeof buggy);\n',
        },
      ],
      legend: [
        {
          name: "typeof",
          syntax: "typeof value",
          example: "typeof score",
          note: "Returns a string with the value's type.",
        },
        {
          name: "string + value",
          syntax: 'string + anything',
          example: '"5" + 3',
          note: "When either side is a string, + concatenates instead of adding.",
        },
      ],
    },

    // 6. Exercise
    {
      kind: "exercise",
      title: "Lab: type detective",
      prompt: "Use typeof to investigate four expressions.\n\n" +
          "User stories:\n" +
          "1. Declare `title = \"Hello\"`, `score = 42`, and `ready = true`.\n" +
          "2. Log the typeof of each — three lines.\n" +
          "3. Compute \"5\" + 3 and log the typeof of the result — one more line.\n" +
          "4. There should be exactly four console.log lines, and the values logged should be the four type names.",
      starterJs:
        "// 1. Declare your three variables (one of each type):\n\n\n\n" +
        "// 2. Log typeof of each — three lines:\n\n\n\n" +
        "// 3. Log typeof of \"5\" + 3 — one more line:\n\n",
      tests: [
        {
          label: "Console shows exactly four lines",
          assert:
            "var c = window.__console || []; return c.length === 4;",
          hint: "Three typeof logs for your variables, one for the coercion check — four total.",
        },
        {
          label: "First three lines are \"string\", \"number\", and \"boolean\" (any order)",
          assert:
            "var c = window.__console || [];" +
            "if (c.length < 3) return false;" +
            "var got = [c[0].text, c[1].text, c[2].text].sort();" +
            "var want = ['boolean','number','string'];" +
            "for (var i = 0; i < 3; i++) if (got[i] !== want[i]) return false;" +
            "return true;",
          hint: "Use console.log(typeof yourVariable) for each of your three variables.",
        },
        {
          label: "The fourth line is \"string\" (the coercion result)",
          assert:
            "var c = window.__console || [];" +
            "if (c.length < 4) return false;" +
            "return c[3].text === 'string';",
          hint: "console.log(typeof (\"5\" + 3)) — the result is a string, not a number.",
        },
        {
          label: "Code uses typeof at least four times",
          assert:
            "var src = window.__userSrc || '';" +
            "var m = src.match(/\\btypeof\\b/g) || [];" +
            "return m.length >= 4;",
          hint: "Each console.log should call typeof — four uses in total.",
        },
      ],
      anyValues: true,
    },

    // ──────────────────────────────────────────────────────────────────
    // Workshop 2 — Receipt bug hunt (diagnose and fix a coercion bug)
    // ──────────────────────────────────────────────────────────────────
    {
      kind: "js-workshop",
      title: "Workshop: receipt bug hunt",
      prompt: "A receipt's `total` comes out as text glue instead of a sum. Diagnose it with `typeof`, find the culprit, then fix it.",
      designNote:
        "L2 W2. Bug hunt arc — observe → diagnose with typeof → identify the string operand → fix by dropping the quotes. Distinct from W1 (basic tour) and W3/W4 (other coercion angles).",
      steps: [
        {
          id: "receipt-observe",
          instruction: "Press Check to run the buggy receipt code as-is. `price` arrived from a form as text. The starter has `let total = price + quantity;` followed by a log — what does the console print?",
          hint: "Just press Check. The bug is already there — observe the output. You'll fix it in a later step.",
          starterCode: '// Bug: total should be 89, not "3950".\nlet price = "39";\nlet quantity = 50;\nlet total = price + quantity;\nconsole.log(total);\n',
          checks: [
            {
              message: "Don't change the starter on this step — just press Check and look at the console.",
              requirePattern: /\blet\s+price\s*=\s*["']39["']/,
            },
            {
              message: "Make sure the starter `console.log(total)` is still there.",
              requirePattern: /console\.log\s*\(\s*total\s*\)/,
            },
            {
              message: "`total` should still be the buggy string `\"3950\"` on this step.",
              assert: "return total === '3950';",
            },
          ],
          reveal: 'let price = "39";\nlet quantity = 50;\nlet total = price + quantity;\nconsole.log(total);\n',
        },
        {
          id: "receipt-diagnose-total",
          instruction: "Use `typeof` to confirm `total` isn't a number. Add `console.log(typeof total);` below the existing log.",
          hint: "console.log(typeof total);",
          starterCode: 'let price = "39";\nlet quantity = 50;\nlet total = price + quantity;\nconsole.log(total);\n// Log typeof total to confirm the type.\n',
          checks: [
            {
              message: "Add a `console.log(typeof total);` line.",
              requirePattern: /console\.log\s*\(\s*typeof\s+total\s*\)/,
            },
            {
              message: "The bug is still there — `total` should still be a string.",
              assert: "return typeof total === 'string';",
            },
          ],
          reveal: 'let price = "39";\nlet quantity = 50;\nlet total = price + quantity;\nconsole.log(total);\nconsole.log(typeof total);\n',
        },
        {
          id: "receipt-find-culprit",
          instruction: "Now find the culprit. Log `typeof price` and `typeof quantity` — one of them isn't what the receipt expected.",
          hint: "console.log(typeof price);\nconsole.log(typeof quantity);",
          starterCode: 'let price = "39";\nlet quantity = 50;\nlet total = price + quantity;\nconsole.log(total);\nconsole.log(typeof total);\n// Log typeof of each operand to find the culprit.\n',
          checks: [
            {
              message: "Log `typeof price`.",
              requirePattern: /console\.log\s*\(\s*typeof\s+price\s*\)/,
            },
            {
              message: "Log `typeof quantity`.",
              requirePattern: /console\.log\s*\(\s*typeof\s+quantity\s*\)/,
            },
            {
              message: "Don't fix the bug yet — `price` should still be a string on this step.",
              assert: "return typeof price === 'string';",
            },
          ],
          reveal: 'let price = "39";\nlet quantity = 50;\nlet total = price + quantity;\nconsole.log(total);\nconsole.log(typeof total);\nconsole.log(typeof price);\nconsole.log(typeof quantity);\n',
        },
        {
          id: "receipt-fix",
          instruction: "Fix it. Change the declaration of `price` so it's a number, not a string. After your fix, `total` should be the number `89` and `typeof total` should be `\"number\"`.",
          hint: 'let price = 39;  // no quotes — it\'s a number now',
          starterCode: 'let price = "39";\nlet quantity = 50;\nlet total = price + quantity;\nconsole.log(total);\nconsole.log(typeof total);\nconsole.log(typeof price);\nconsole.log(typeof quantity);\n// Fix the price declaration above — drop the quotes.\n',
          checks: [
            {
              message: "`price` should now be declared as a number (no quotes).",
              requirePattern: /\blet\s+price\s*=\s*-?\d+(?:\.\d+)?\s*;?/,
            },
            {
              message: "`total` should now be the number `89`.",
              assert: "return total === 89;",
            },
            {
              message: "`typeof total` should now be `\"number\"`.",
              assert: "return typeof total === 'number';",
            },
          ],
          reveal: 'let price = 39;\nlet quantity = 50;\nlet total = price + quantity;\nconsole.log(total);\nconsole.log(typeof total);\nconsole.log(typeof price);\nconsole.log(typeof quantity);\n',
        },
      ],
    },

    // ──────────────────────────────────────────────────────────────────
    // Workshop 3 — Minus vs plus (asymmetric coercion)
    // ──────────────────────────────────────────────────────────────────
    {
      kind: "js-workshop",
      title: "Workshop: minus vs plus",
      prompt: "The SAME two operands — a string `\"5\"` and a number `3` — produce different TYPES depending on the operator. `+` glues, `-` calculates. Walk through it and see.",
      designNote:
        "L2 W3. Asymmetric coercion: `+` concatenates when a string is involved, `-` always coerces to number. Distinct from W2 (bug hunt) and W4 (strict vs loose equality).",
      steps: [
        {
          id: "minusplus-declare",
          instruction: "Declare two operands that LOOK similar but have different types: `textNumber` as the string `\"5\"`, and `realNumber` as the number `3`. Log `typeof` of each to confirm.",
          hint: 'let textNumber = "5";\nlet realNumber = 3;\nconsole.log(typeof textNumber);\nconsole.log(typeof realNumber);',
          starterCode: "// Declare textNumber (string \"5\") and realNumber (number 3), then log typeof of each.\n",
          checks: [
            { message: "`textNumber` should be the string `\"5\"`.", assert: "return textNumber === '5';" },
            { message: "`realNumber` should be the number `3`.", assert: "return realNumber === 3;" },
            { message: "Log `typeof textNumber` and `typeof realNumber`.", requirePattern: /typeof\s+textNumber[\s\S]*typeof\s+realNumber|typeof\s+realNumber[\s\S]*typeof\s+textNumber/ },
          ],
          reveal: 'let textNumber = "5";\nlet realNumber = 3;\nconsole.log(typeof textNumber);\nconsole.log(typeof realNumber);\n',
        },
        {
          id: "minusplus-add",
          instruction: "Now combine them with `+`. `console.log(textNumber + realNumber)` — what does it print? Because one side is a string, `+` GLUES them. The result is the string `\"53\"`.",
          hint: "console.log(textNumber + realNumber);",
          starterCode: 'let textNumber = "5";\nlet realNumber = 3;\nconsole.log(typeof textNumber);\nconsole.log(typeof realNumber);\n// Log textNumber + realNumber.\n',
          checks: [
            { message: "Log `textNumber + realNumber` (either order works).", requirePattern: /console\.log\s*\(\s*(?:textNumber\s*\+\s*realNumber|realNumber\s*\+\s*textNumber)\s*\)/ },
            { message: "The result should be a string (`+` with a string operand glues).", assert: "return typeof (textNumber + realNumber) === 'string';" },
          ],
          reveal: 'let textNumber = "5";\nlet realNumber = 3;\nconsole.log(typeof textNumber);\nconsole.log(typeof realNumber);\nconsole.log(textNumber + realNumber);\n',
        },
        {
          id: "minusplus-subtract",
          instruction: "Now the surprise: combine the SAME operands with `-`. `console.log(textNumber - realNumber)`. `-` has no string meaning, so JS coerces `\"5\"` to the number `5`. The result is the number `2`.",
          hint: "console.log(textNumber - realNumber);",
          starterCode: 'let textNumber = "5";\nlet realNumber = 3;\nconsole.log(typeof textNumber);\nconsole.log(typeof realNumber);\nconsole.log(textNumber + realNumber);\n// Same operands with -. Surprise.\n',
          checks: [
            { message: "Log `textNumber - realNumber` (either order works).", requirePattern: /console\.log\s*\(\s*(?:textNumber\s*-\s*realNumber|realNumber\s*-\s*textNumber)\s*\)/ },
            { message: "The result should be a number — `-` always coerces.", assert: "return typeof (textNumber - realNumber) === 'number';" },
          ],
          reveal: 'let textNumber = "5";\nlet realNumber = 3;\nconsole.log(typeof textNumber);\nconsole.log(typeof realNumber);\nconsole.log(textNumber + realNumber);\nconsole.log(textNumber - realNumber);\n',
        },
        {
          id: "minusplus-confirm-types",
          instruction: "Confirm what just happened. Log `typeof (textNumber + realNumber)` and `typeof (textNumber - realNumber)`. Same operands, but the operator decides the type: `+` gave `\"string\"`, `-` gave `\"number\"`.",
          hint: "console.log(typeof (textNumber + realNumber));\nconsole.log(typeof (textNumber - realNumber));",
          starterCode: 'let textNumber = "5";\nlet realNumber = 3;\nconsole.log(typeof textNumber);\nconsole.log(typeof realNumber);\nconsole.log(textNumber + realNumber);\nconsole.log(textNumber - realNumber);\n// Log typeof of each combination.\n',
          checks: [
            { message: "Log `typeof (textNumber + realNumber)` (either operand order accepted).", requirePattern: /console\.log\s*\(\s*typeof\s*\(\s*(?:textNumber\s*\+\s*realNumber|realNumber\s*\+\s*textNumber)\s*\)\s*\)/ },
            { message: "Log `typeof (textNumber - realNumber)` (either operand order accepted).", requirePattern: /console\.log\s*\(\s*typeof\s*\(\s*(?:textNumber\s*-\s*realNumber|realNumber\s*-\s*textNumber)\s*\)\s*\)/ },
          ],
          reveal: 'let textNumber = "5";\nlet realNumber = 3;\nconsole.log(typeof textNumber);\nconsole.log(typeof realNumber);\nconsole.log(textNumber + realNumber);\nconsole.log(textNumber - realNumber);\nconsole.log(typeof (textNumber + realNumber));\nconsole.log(typeof (textNumber - realNumber));\n',
        },
      ],
    },

    // ──────────────────────────────────────────────────────────────────
    // Workshop 4 — Strict vs loose equality
    // ──────────────────────────────────────────────────────────────────
    {
      kind: "js-workshop",
      title: "Workshop: strict vs loose equality",
      prompt: "`===` cares about type. `==` doesn't — it coerces first, then compares. The result can flip depending on which you pick. See why `===` is the JS rule.",
      designNote:
        "L2 W4. Strict vs loose equality. Distinct from W1 (typeof tour), W2 (bug hunt), and W3 (minus-vs-plus coercion).",
      steps: [
        {
          id: "eq-declare",
          instruction: "Declare two values that LOOK equal but have different types: `num` as the number `5`, `text` as the string `\"5\"`. Log them both, then log `typeof` of each so you can confirm the types differ.",
          hint: 'let num = 5;\nlet text = "5";\nconsole.log(num);\nconsole.log(text);\nconsole.log(typeof num);\nconsole.log(typeof text);',
          starterCode: "// Declare num (5) and text (\"5\"). Log each, then log typeof of each.\n",
          checks: [
            { message: "`num` should be the number `5`.", assert: "return num === 5;" },
            { message: "`text` should be the string `\"5\"`.", assert: "return text === '5';" },
            { message: "Log `typeof num` and `typeof text`.", requirePattern: /typeof\s+num[\s\S]*typeof\s+text|typeof\s+text[\s\S]*typeof\s+num/ },
          ],
          reveal: 'let num = 5;\nlet text = "5";\nconsole.log(num);\nconsole.log(text);\nconsole.log(typeof num);\nconsole.log(typeof text);\n',
        },
        {
          id: "eq-loose",
          instruction: "Compare them with the loose `==` operator. `console.log(num == text)`. Loose equality COERCES — it converts `\"5\"` to `5` before comparing, so the result is `true`.",
          hint: "console.log(num == text);",
          starterCode: 'let num = 5;\nlet text = "5";\nconsole.log(num);\nconsole.log(text);\nconsole.log(typeof num);\nconsole.log(typeof text);\n// Log num == text (loose).\n',
          checks: [
            { message: "Log `num == text` using the LOOSE `==` operator.", requirePattern: /console\.log\s*\(\s*num\s*==(?!=)\s*text\s*\)/ },
            { message: "`num == text` should be `true`.", assert: "return (num == text) === true;" },
          ],
          reveal: 'let num = 5;\nlet text = "5";\nconsole.log(num);\nconsole.log(text);\nconsole.log(typeof num);\nconsole.log(typeof text);\nconsole.log(num == text);\n',
        },
        {
          id: "eq-strict",
          instruction: "Now compare with strict `===`. `console.log(num === text)`. Strict equality DOES NOT coerce — it checks both the value AND the type. Since one is `number` and the other is `string`, the result is `false`. This is why `===` is the JS convention.",
          hint: "console.log(num === text);",
          starterCode: 'let num = 5;\nlet text = "5";\nconsole.log(num);\nconsole.log(text);\nconsole.log(typeof num);\nconsole.log(typeof text);\nconsole.log(num == text);\n// Log num === text (strict).\n',
          checks: [
            { message: "Log `num === text` using STRICT `===`.", requirePattern: /console\.log\s*\(\s*num\s*===\s*text\s*\)/ },
            { message: "`num === text` should be `false`.", assert: "return (num === text) === false;" },
          ],
          reveal: 'let num = 5;\nlet text = "5";\nconsole.log(num);\nconsole.log(text);\nconsole.log(typeof num);\nconsole.log(typeof text);\nconsole.log(num == text);\nconsole.log(num === text);\n',
        },
        {
          id: "eq-zero-false",
          instruction: "One more surprise: `0` and `false` look unrelated, but loose equality says they're equal. Log `0 == false` (true — both falsy, coerced) and `0 === false` (false — different types). The takeaway: ALWAYS use `===`. It never lies about types.",
          hint: "console.log(0 == false);\nconsole.log(0 === false);",
          starterCode: 'let num = 5;\nlet text = "5";\nconsole.log(num);\nconsole.log(text);\nconsole.log(typeof num);\nconsole.log(typeof text);\nconsole.log(num == text);\nconsole.log(num === text);\n// Log 0 == false and 0 === false.\n',
          checks: [
            { message: "Log `0 == false`.", requirePattern: /console\.log\s*\(\s*0\s*==(?!=)\s*false\s*\)/ },
            { message: "Log `0 === false`.", requirePattern: /console\.log\s*\(\s*0\s*===\s*false\s*\)/ },
          ],
          reveal: 'let num = 5;\nlet text = "5";\nconsole.log(num);\nconsole.log(text);\nconsole.log(typeof num);\nconsole.log(typeof text);\nconsole.log(num == text);\nconsole.log(num === text);\nconsole.log(0 == false);\nconsole.log(0 === false);\n',
        },
      ],
    },

    // ──────────────────────────────────────────────────────────────────
    // Exercise 2 — Bug hunt: fix a string-number coercion
    // ──────────────────────────────────────────────────────────────────
    {
      kind: "exercise",
      title: "Lab: bug hunt",
      prompt: "The starter has a coercion bug: `subtotal` is a string by accident, so `total` ends up as concatenated text instead of a sum. Fix the declaration so `total` is the correct number.\n\n" +
          "User stories:\n" +
          "1. Find and fix the bug — only ONE line in the starter needs to change.\n" +
          "2. After your fix, `subtotal` is a number, not a string.\n" +
          "3. After your fix, `total` is the number `205` (200 + 5).\n" +
          "4. Don't add or remove any logs — leave the existing ones in place.",
      starterJs:
        '// Bug: subtotal is a string. Fix the declaration so total is 205, not "2005".\n' +
        'let subtotal = "200";\n' +
        'let shipping = 5;\n' +
        'let total = subtotal + shipping;\n' +
        'console.log(total);\n' +
        'console.log(typeof total);\n',
      tests: [
        {
          label: "`subtotal` is now a number (not a string)",
          assert: "return typeof subtotal === 'number';",
          hint: "Drop the quotes around 200 in the subtotal declaration.",
        },
        {
          label: "`total` is the number 205",
          assert: "return total === 205;",
          hint: "Once subtotal is a number, total = subtotal + shipping = 200 + 5 = 205.",
        },
        {
          label: "Console still shows exactly two lines: `205` and `\"number\"`",
          assert:
            "var c = window.__console || [];" +
            "if (c.length !== 2) return false;" +
            "return c[0].text === '205' && c[1].text === 'number';",
          hint: "Leave the two console.log lines from the starter. After the fix they should print 205 and \"number\".",
        },
      ],
    },

    // ──────────────────────────────────────────────────────────────────
    // Exercise 3 — Predict the result (four distinct coercions)
    // ──────────────────────────────────────────────────────────────────
    {
      kind: "exercise",
      title: "Lab: predict the result",
      prompt: "Log four expressions, each producing a different type. Predict each before running. The lab is about UNDERSTANDING how operators bend types.\n\n" +
          "Each line should produce the exact result shown in parentheses:\n" +
          "1. `5 + \"3\"` → `\"53\"` (string, because `+` glues when a string is involved)\n" +
          "2. `\"5\" - 3` → `2` (number, because `-` coerces the string to a number)\n" +
          "3. `true + 1` → `2` (number, because `true` becomes `1`)\n" +
          "4. `\"5\" * 2` → `10` (number, because `*` coerces like `-`)\n\n" +
          "Log each expression in order. Exactly four console.log lines.",
      starterJs:
        "// 1. Log 5 + \"3\":\n\n\n" +
        "// 2. Log \"5\" - 3:\n\n\n" +
        "// 3. Log true + 1:\n\n\n" +
        "// 4. Log \"5\" * 2:\n\n",
      tests: [
        {
          label: "Console shows exactly four lines",
          assert: "var c = window.__console || []; return c.length === 4;",
          hint: "Four console.log calls, one per expression.",
        },
        {
          label: "Lines are \"53\", 2, 2, 10 (in order)",
          assert:
            "var c = window.__console || [];" +
            "if (c.length < 4) return false;" +
            "return c[0].text === '53' && c[1].text === '2' && c[2].text === '2' && c[3].text === '10';",
          hint: "5 + \"3\" → \"53\"; \"5\" - 3 → 2; true + 1 → 2; \"5\" * 2 → 10.",
        },
        {
          label: "Each expression appears in the source",
          assert:
            "var src = window.__userSrc || '';" +
            "if (!/5\\s*\\+\\s*[\"']3[\"']/.test(src)) return false;" +
            "if (!/[\"']5[\"']\\s*-\\s*3/.test(src)) return false;" +
            "if (!/\\btrue\\s*\\+\\s*1\\b/.test(src)) return false;" +
            "return /[\"']5[\"']\\s*\\*\\s*2/.test(src);",
          hint: "Use the four expressions exactly as written in the prompt.",
        },
      ],
    },

    // ──────────────────────────────────────────────────────────────────
    // Exercise 4 — Strict vs loose equality
    // ──────────────────────────────────────────────────────────────────
    {
      kind: "exercise",
      title: "Lab: strict vs loose equality",
      prompt: "Log four comparisons that show how `==` and `===` disagree. Each pair has the SAME operands but a different operator — and the answers flip.\n\n" +
          "Each line should produce the exact result shown in parentheses:\n" +
          "1. `5 === \"5\"` → `false` (strict: different types)\n" +
          "2. `5 == \"5\"` → `true` (loose: coerces, then compares)\n" +
          "3. `0 === false` → `false` (strict: different types)\n" +
          "4. `0 == false` → `true` (loose: both falsy, treated as equal)\n\n" +
          "Log each comparison in order. Exactly four console.log lines.",
      starterJs:
        "// 1. Log 5 === \"5\":\n\n\n" +
        "// 2. Log 5 == \"5\":\n\n\n" +
        "// 3. Log 0 === false:\n\n\n" +
        "// 4. Log 0 == false:\n\n",
      tests: [
        {
          label: "Console shows exactly four lines",
          assert: "var c = window.__console || []; return c.length === 4;",
          hint: "Four console.log calls, one per comparison.",
        },
        {
          label: "Lines are false, true, false, true (in order)",
          assert:
            "var c = window.__console || [];" +
            "if (c.length < 4) return false;" +
            "return c[0].text === 'false' && c[1].text === 'true' && c[2].text === 'false' && c[3].text === 'true';",
          hint: "Strict (===) flips false; loose (==) flips true. Stick to the order in the prompt.",
        },
        {
          label: "Code uses both `===` and `==`",
          assert:
            "var src = window.__userSrc || '';" +
            "if (!/===/.test(src)) return false;" +
            // == that is not === : negative lookbehind for = and negative lookahead for =
            "return /(?<!=)==(?!=)/.test(src);",
          hint: "Use `===` for the strict comparisons and `==` for the loose ones — exactly as written in the prompt.",
        },
      ],
    },
  ],
};
