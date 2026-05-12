import type { Lesson } from "../../types";
import { codePanelStyle, noteBoxStyle } from "./_shared";

export const lettersLesson: Lesson = {
  id: "loops-letters",
  title: "2. Letters — for…of",
  summary: "Walk through every character of a string.",
  slides: [
    // 1. Intro — figure reading letters off a sign
    {
      kind: "explanation",
      title: "Each letter, one at a time",
      intro: "Sometimes you don't want a counter — you just want to look at each thing in turn.",
      customScene: "letters",
      demo: [],
      steps: [
        {
          narration: "You stand in front of a sign with a word on it.\nYou're going to read it letter by letter.",
        },
        {
          narration: "First letter: H.",
        },
        {
          narration: "Next: E.",
        },
        {
          narration: "L.",
        },
        {
          narration: "L again.",
        },
        {
          narration: "Last one: O.\n\nThat's what for…of does — it hands you each letter,\none at a time, until the word ends.",
        },
      ],
    },

    // 2. Strings as sequences
    {
      kind: "explanation",
      title: "A string is a sequence of letters",
      intro: 'When you write "HELLO", JavaScript sees five letters in order:\nH, then E, then L, then L, then O.',
      demo: [
        {
          id: "code",
          label: 'let word = "HELLO";\n//          ^ ^ ^ ^ ^\n//          H E L L O',
          baseStyle: codePanelStyle,
        },
      ],
      steps: [
        {
          narration: "A string isn't just one thing — it's a sequence of characters.\nfor…of can walk through that sequence one character at a time.",
        },
        {
          narration: "We don't need a counter. We don't pick the letters by index.\nfor…of just hands them to us in order.",
        },
      ],
    },

    // 3. Anatomy of for...of
    {
      kind: "explanation",
      title: "for…of, piece by piece",
      demo: [
        {
          id: "code",
          label: 'for (const ch of "HELLO") {\n  // body — runs once per letter\n}',
          baseStyle: codePanelStyle,
        },
      ],
      steps: [
        {
          narration: "Five parts:\nfor   ( const ch   of   string )   { body }",
        },
        {
          narration: "1.  for  is the same keyword as before.",
          tokenHighlight: ["for"],
        },
        {
          narration: "2.  const ch  declares a NEW variable.\nIt holds the current letter.\nThe name 'ch' is just a label — you can call it anything.",
          tokenHighlight: ["const ch"],
        },
        {
          narration: "3.  of  is a special keyword.\nRead 'for each ch OF the string'.\nIt's not =  it's not in — it's of.",
          tokenHighlight: [" of "],
        },
        {
          narration: "4.  the string  on the right is what we walk through.\nIt can be a literal like \"HELLO\" or a variable.",
          tokenHighlight: ['"HELLO"'],
        },
        {
          narration: "5.  { body }  runs once per letter.\nInside the body, ch is the current letter.\nNext lap, ch becomes the next letter automatically.",
          tokenHighlight: ["{", "}"],
        },
        {
          narration: "When there are no more letters, the loop ends.\nNo condition to write, no counter to update.",
        },
      ],
    },

    // 4. Trace walkthrough — count "A"s in "ABA"
    {
      kind: "explanation",
      title: "Watching for…of run",
      intro: 'Trace example: count how many A\'s are in "ABA".',
      customScene: "letters-trace",
      demo: [],
      steps: [
        {
          narration: "Code on the left, the word ABA on the right.\nClick to step.",
        },
        {
          narration: "First we make count = 0.",
        },
        {
          narration: 'Lap 1. for…of hands us the first letter.\nch = "A".',
        },
        {
          narration: 'The if asks: is ch === "A"?\n"A" === "A" → true.',
        },
        {
          narration: "Body runs. count = 0 + 1 → 1.",
        },
        {
          narration: 'Lap 2. Next letter.\nch = "B".',
        },
        {
          narration: '"B" === "A" → false.\nThe if body is skipped. count stays 1.',
        },
        {
          narration: 'Lap 3. Last letter.\nch = "A".',
        },
        {
          narration: '"A" === "A" → true.',
        },
        {
          narration: "Body runs. count = 1 + 1 → 2.",
        },
        {
          narration: "No more letters. The loop ends.\nWe move past the closing }.",
        },
        {
          narration: "return count → 2.\n\nThree letters, two of them A. The loop counted them.",
        },
      ],
    },

    // 5. for vs for...of
    {
      kind: "explanation",
      title: "for vs for…of",
      intro: "Two flavours of for. Pick based on what you actually need.",
      demo: [
        {
          id: "classic",
          label:
            'for (let i = 0; i < 5; i++) {\n  // i is 0, 1, 2, 3, 4\n}',
          baseStyle: codePanelStyle,
        },
        {
          id: "of",
          label:
            'for (const ch of "HELLO") {\n  // ch is "H", "E", "L", "L", "O"\n}',
          baseStyle: { ...codePanelStyle, marginTop: 16 },
        },
        {
          id: "note",
          kind: "note",
          label: "Use plain  for  when you need the COUNT or INDEX.\nUse  for…of  when you need each VALUE in turn.\n\nFor strings, for…of is almost always cleaner.",
          baseStyle: { ...noteBoxStyle, marginTop: 16 },
        },
      ],
      steps: [
        {
          narration: "Left: classic for. You get a number i.\nIf you wanted a letter, you'd have to write word[i] — extra step.",
          tokenHighlight: ["let i = 0"],
        },
        {
          narration: "Right: for…of. You get the letter directly.\nNo counter, no indexing — just the value you want.",
          tokenHighlight: ["const ch of"],
        },
        {
          narration: "Rule of thumb:\n• Need to count or know which position? → for\n• Just want each item? → for…of",
        },
      ],
    },

    // 6. Practice — count occurrences of a letter — chip-style, no distractors (first chip in L6)
    {
      kind: "js-chip-assignment",
      title: "Practice: count a letter",
      prompt: "Build the for…of loop that counts how often `target` appears in `word`.",
      puzzles: [
        // p1: of keyword (vs in/from/===)
        {
          prompt: "Which keyword walks through each character of a string?",
          template:
            "let count = 0;\nfor (const ch [[]] word) {\n  if (ch === target) count = count + 1;\n}\nreturn count;",
          chips: ["of", "in", "from", "==="],
          solution: ["of"],
        },
        // p2: ( ) around the for…of header
        {
          prompt: "What wraps the for…of header?",
          template:
            "let count = 0;\nfor [[]]const ch of word[[]] {\n  if (ch === target) count = count + 1;\n}\nreturn count;",
          chips: ["(", ")", "{", "}"],
          solution: ["(", ")"],
        },
        // p3: { } around the loop body
        {
          prompt: "What wraps the loop body?",
          template:
            "let count = 0;\nfor (const ch of word) [[]]\n  if (ch === target) count = count + 1;\n[[]]\nreturn count;",
          chips: ["{", "}", "(", ")"],
          solution: ["{", "}"],
        },
        // p4: of keyword (phrase/vowel scenario)
        {
          intro: "Same idea — count how often `vowel` appears in `phrase`.",
          prompt: "Which keyword walks through each character of a string?",
          template:
            "let count = 0;\nfor (const letter [[]] phrase) {\n  if (letter === vowel) count = count + 1;\n}\nreturn count;",
          chips: ["of", "in", "from", "for"],
          solution: ["of"],
        },
        // p5: synthesis — all syntax pieces together
        {
          prompt: "Now place all the syntax pieces you've practised.",
          template:
            "let count = 0;\nfor [[]]const ch [[]] word[[]] [[]]\n  if (ch === target) count = count + 1;\n[[]]\nreturn count;",
          chips: ["(", "of", ")", "{", "}", "in", "from"],
          solution: ["(", "of", ")", "{", "}"],
        },
      ],
      legend: [
        {
          name: "for…of",
          syntax: "for (const x of string) { ... }",
          example: 'for (const ch of "abc") { ... }',
          note: "Hands you each character of the string in turn.",
        },
      ],
    },

    // 7. Practice — count two letters at once — chip-style with distractors
    {
      kind: "js-chip-assignment",
      title: "Practice: count a or e",
      prompt: "Count letters that are 'a' OR 'e'. Combine two checks with ||.",
      puzzles: [
        // p1: || operator inside if (vs &&, ===, !)
        {
          prompt: "Which operator means 'one match is enough'?",
          template:
            'let count = 0;\nfor (const ch of word) {\n  if (ch === "a" [[]] ch === "e") {\n    count = count + 1;\n  }\n}\nreturn count;',
          chips: ["||", "&&", "===", "!"],
          solution: ["||"],
        },
        // p2: ( ) around the if condition
        {
          prompt: "What wraps the if condition?",
          template:
            'let count = 0;\nfor (const ch of word) {\n  if [[]]ch === "a" || ch === "e"[[]] {\n    count = count + 1;\n  }\n}\nreturn count;',
          chips: ["(", ")", "{", "}"],
          solution: ["(", ")"],
        },
        // p3: { } around the if body
        {
          prompt: "What wraps the if body?",
          template:
            'let count = 0;\nfor (const ch of word) {\n  if (ch === "a" || ch === "e") [[]]\n    count = count + 1;\n  [[]]\n}\nreturn count;',
          chips: ["{", "}", "(", ")"],
          solution: ["{", "}"],
        },
        // p4: || operator (r or n scenario)
        {
          intro: "Same shape — count 'r' OR 'n'.",
          prompt: "Which operator means 'one match is enough'?",
          template:
            'let count = 0;\nfor (const ch of text) {\n  if (ch === "r" [[]] ch === "n") {\n    count = count + 1;\n  }\n}\nreturn count;',
          chips: ["||", "&&", "===", "!"],
          solution: ["||"],
        },
        // p5: synthesis — all syntax pieces together
        {
          prompt: "Now place all the syntax pieces you've practised.",
          template:
            'let count = 0;\nfor (const ch of word) {\n  if [[]]ch === "a" [[]] ch === "e"[[]] [[]]\n    count = count + 1;\n  [[]]\n}\nreturn count;',
          chips: ["(", "||", ")", "{", "}", "&&", "==="],
          solution: ["(", "||", ")", "{", "}"],
        },
      ],
      legend: [
        {
          name: "||",
          syntax: "a || b",
          example: 'ch === "a" || ch === "e"',
          note: "True as soon as ONE side is true.",
        },
      ],
    },

    // 8. Final — write the whole for…of line yourself (typed-input)
    {
      kind: "js-typed-assignment",
      title: "Final: write the for…of",
      prompt: "Type the for…of line yourself.\nThe body just adds 1 to count for every letter,\nso the function should return the length of `word`.\n\nFor \"hello\" the answer is 5. For \"\" the answer is 0.",
      varNames: ["word"],
      template:
        "let count = 0;\n[[input:loop]] {\n  count = count + 1;\n}\nreturn count;\n",
      tests: [
        { label: "abc", vars: { word: "abc" }, expected: 3 },
        { label: "hello", vars: { word: "hello" }, expected: 5 },
        { label: "a", vars: { word: "a" }, expected: 1 },
        { label: "empty", vars: { word: "" }, expected: 0 },
        { label: "banana", vars: { word: "banana" }, expected: 6 },
      ],
      goalHint: 'The box is the whole loop header:  for (const ch of word)',
      allegory: {
        kind: "loop-result",
        config: {
          inputKeys: ["word"],
          resultLabel: "length",
          theme: "letters",
        },
      },
      legend: [
        {
          name: "for…of",
          syntax: "for (const x of string) { ... }",
          example: "for (const ch of word) { ... }",
          note: "Hands you each character of the string, one at a time, until it ends.",
        },
      ],
    },

    // Workshop tier — guided micro-steps for for…of over a string.
    // Surface: count the length of a string by walking each character.
    // Distinct from chips (word/count vowels) and exercise (word/letter/found).
    {
      kind: "js-workshop",
      title: "Workshop: count chars",
      prompt: "Walk through a string with for…of and count each character into `len`.",
      designNote:
        "L6 for…of workshop. Surface: text → len (count by iteration). Distinct from chips (word/count vowels) and exercise (word/letter/found bool). The student demonstrates that for…of yields each char so that incrementing once per iteration gives string length.",
      steps: [
        {
          id: "len-declare-text",
          instruction: "Use `let` to declare a variable called `text` and assign it any string.",
          starterCode: "// Declare text below.\n",
          checks: [
            {
              message: "Use `let` to declare a variable named `text`.",
              requirePattern: /\blet\s+text\b/,
            },
            {
              message: "`text` should hold a string.",
              assert: "return typeof text === 'string';",
            },
          ],
          reveal: 'let text = "hello";\n',
        },
        {
          id: "len-declare-len",
          instruction: "Below `text`, use `let` to declare `len` and start it at 0 — the loop will increment it.",
          starterCode: 'let text = "hello";\n// Declare len and start at 0.\n',
          checks: [
            {
              message: "Use `let` to declare a variable named `len`.",
              requirePattern: /\blet\s+len\b/,
            },
            {
              message: "`len` should start at 0.",
              assert: "return len === 0;",
            },
          ],
          reveal: 'let text = "hello";\nlet len = 0;\n',
        },
        {
          id: "len-for-of-header",
          instruction: "Write a `for…of` header that walks each character of `text`. Name the loop variable `ch`. Leave the body empty for now.",
          starterCode: 'let text = "hello";\nlet len = 0;\n// Add the for…of header walking text. Empty body.\n',
          checks: [
            {
              message: "Use `for ( ... of ... )` to iterate.",
              requirePattern: /\bfor\s*\(\s*let\s+\w+\s+of\s+text\b/,
            },
            {
              message: "Name the loop variable `ch`.",
              requirePattern: /\bfor\s*\(\s*let\s+ch\s+of\b/,
            },
          ],
          reveal: 'let text = "hello";\nlet len = 0;\nfor (let ch of text) {\n}\n',
        },
        {
          id: "len-loop-body",
          instruction: "Inside the loop, increment `len` by 1 each round. After the loop, `len` should equal the number of characters in `text`.",
          starterCode: 'let text = "hello";\nlet len = 0;\nfor (let ch of text) {\n  // Increment len here.\n}\n',
          checks: [
            {
              message: "Increment `len` (e.g. `len++` or `len += 1`).",
              requirePattern: /\blen\s*\+\+|\blen\s*\+=\s*1\b|\blen\s*=\s*len\s*\+\s*1\b/,
            },
            {
              message: "After the loop, `len` should equal the length of `text`.",
              assert: "return len === text.length;",
            },
          ],
          reveal: 'let text = "hello";\nlet len = 0;\nfor (let ch of text) {\n  len++;\n}\n',
        },
      ],
      legend: [
        {
          name: "for…of",
          syntax: "for (let ch of string) { ... }",
          example: "for (let ch of text) { ... }",
          note: "Walks each character of the string in order.",
        },
        {
          name: "++",
          syntax: "x++",
          example: "len++",
          note: "Adds 1 to `x`. Same as `x = x + 1`.",
        },
      ],
    },

    // L6 final lab — letter search. Walks the string with for...of looking for
    // a chosen single character; produces a boolean result. Distinct from the
    // chapter's "count a or e" exercise (which counts characters).
    {
      kind: "exercise",
      title: "Lab: Letter Search",
      prompt: "Check whether a word contains a chosen letter.\n\n" +
          "User stories (variable names are suggestions):\n" +
          "1. Declare a string (e.g. word) with at least 5 characters.\n" +
          "2. Declare a string (e.g. letter) with exactly one character.\n" +
          "3. Declare a boolean (e.g. found) and set it to false.\n" +
          "4. Use a for…of loop to walk through word.\n" +
          "5. Inside the loop, if the current character === letter, set found to true.\n" +
          "6. Print word, letter, and found (three lines, in that order).",
      starterJs:
        "// Follow the user stories shown to the left.\n\n" +
        "// 1-3. Declare word, letter, found:\n\n\n\n" +
        "// 4-5. for...of loop that flips found if it sees letter:\n\n\n\n" +
        "// 6. Print word, letter, found:\n\n",
      tests: [
        {
          label: "Console shows exactly three lines",
          assert:
            "var c = window.__console || []; return c.length === 3;",
          hint: "One console.log for word, one for letter, one for found.",
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
          label: "Line 1 is a string with at least 5 characters",
          assert:
            "var c = window.__console || [];" +
            "if (c.length < 1) return false;" +
            "return typeof c[0].text === 'string' && c[0].text.length >= 5;",
          hint: "Pick a longer word — at least 5 letters.",
        },
        {
          label: "Line 2 is exactly one character",
          assert:
            "var c = window.__console || [];" +
            "if (c.length < 2) return false;" +
            "return c[1].text.length === 1;",
          hint: "letter should be a single character, e.g. \"r\".",
        },
        {
          label: 'Line 3 is "true" or "false"',
          assert:
            "var c = window.__console || [];" +
            "if (c.length < 3) return false;" +
            "return c[2].text === 'true' || c[2].text === 'false';",
          hint: "found must be a boolean (not a string).",
        },
        {
          label: "found correctly reports whether word contains letter",
          assert:
            "var c = window.__console || [];" +
            "if (c.length < 3) return false;" +
            "var word = c[0].text;" +
            "var letter = c[1].text;" +
            "var actual = c[2].text === 'true';" +
            "var expected = word.indexOf(letter) !== -1;" +
            "return actual === expected;",
          hint: "Inside the loop: if (ch === letter) { found = true; }",
        },
        {
          label: "Code uses for…of",
          assert:
            "var src = window.__userSrc || '';" +
            "return /\\bfor\\s*\\(\\s*(?:let|const|var)\\s+\\w+\\s+of\\b/.test(src);",
          hint: "Use the form: for (let ch of word) { ... }",
        },
      ],
    },
  ],
};
