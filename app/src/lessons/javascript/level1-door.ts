import type { Lesson } from "../../types";
import { codePanelStyle, noteBoxStyle } from "./_shared";

export const doorLesson: Lesson = {
  id: "conditionals-crosswalk",
  title: "1. Crosswalk — if and else",
  summary: "A condition that says walk or wait.",
  slides: [
    // 1. Intro — stick-figure crosswalk scene
    {
      kind: "explanation",
      title: "A choice in code",
      intro: "Sometimes the code has to choose what happens next.",
      customScene: "crosswalk",
      demo: [],
      steps: [
        {
          narration: "You stand at the edge of a crosswalk.\nThe light tells you when to go.",
        },
        {
          narration: "When the light is red, you wait.",
        },
        {
          narration: "When it turns green, you walk across.",
        },
        {
          narration: "Same person, same crosswalk —\ndifferent action depending on the light.\nThat is a conditional.",
        },
      ],
    },

    // 2. Anatomy of an if — piece by piece
    {
      kind: "explanation",
      title: "An if, piece by piece",
      intro: "Here is what an if looks like in code.\nWe'll explain every part.",
      demo: [
        {
          id: "code",
          label: 'if (light === "green") {\n  return "walk";\n}',
          baseStyle: codePanelStyle,
        },
      ],
      steps: [
        {
          narration: "Look at the code below. Five parts:\nif   ( ... )   { ... }   return.",
        },
        {
          narration: "1.  if  is a special word. It means 'if'.\nIt asks: should the next code run?",
          tokenHighlight: ["if"],
        },
        {
          narration: "2.  ( )  parentheses come right after if.\nThe question itself goes inside them.",
          tokenHighlight: ["(", ")"],
        },
        {
          narration: "3.  Inside the parentheses\nis something that is true or false.\nWe'll look at this on the next slide.",
          tokenHighlight: ['light === "green"'],
        },
        {
          narration: "4.  { }  curly braces.\nThe code that runs when the answer is YES (true)\ngoes inside them.",
          tokenHighlight: ["{", "}"],
        },
        {
          narration: "5.  return  is another special word.\nIt sends a value back as the answer.\nWe'll see it more soon.",
          tokenHighlight: ["return"],
        },
      ],
    },

    // 3. Booleans — what goes inside ( )
    {
      kind: "explanation",
      title: "true or false — booleans",
      intro: "What goes inside the parentheses always boils down to ONE of two values:\ntrue or false.",
      customScene: "comparisons-table",
      demo: [],
      steps: [
        {
          narration: "A boolean is just a value: true or false.\nYes or no. On or off.",
        },
        {
          narration: "Compare two things and you get a boolean.\nThe table shows the six common operators —\nthe operator, how to read it, an example, the question it asks, and the answer.",
        },
        {
          narration: "A variable can also already BE true or false:\n\nlet doorOpen = true;\nif (doorOpen) { ... }\n\nNo comparison needed — the variable IS the answer.",
        },
        {
          narration: "Any of these can go inside the if's parentheses.\nThe if cares about one thing only: true or false.",
        },
      ],
    },

    // 4. return — sending an answer
    {
      kind: "explanation",
      title: "return — sending an answer back",
      demo: [
        {
          id: "code",
          label:
            "if (light === \"green\") {\n  return \"walk\";\n}",
          baseStyle: codePanelStyle,
        },
      ],
      steps: [
        {
          narration: "return is a special word.\nIt sends a value back from your code.",
          tokenHighlight: ["return"],
        },
        {
          narration: "In our example:\n• if the light is green, we return \"walk\".\n• otherwise the if is skipped — and the function ends without returning.",
          tokenHighlight: ['"walk"'],
        },
        {
          narration: "return also stops the code right there.\nNothing after a return runs.",
          tokenHighlight: ["return"],
        },
        {
          narration: "You can return any value:\n• a string, like \"walk\"\n• a number, like 42\n• true or false",
          tokenHighlight: ['"walk"'],
        },
      ],
    },

    // 5. Trace walkthrough (if-only) — read the code line by line, twice
    {
      kind: "explanation",
      title: "Watching the code run",
      intro: "Now let's read the code line by line.\nFirst with light = 'red'. Then we change it to 'green' and read it again.",
      customScene: "crosswalk-if-trace",
      demo: [],
      steps: [
        {
          narration: "On the left is the code. We'll go through it together.\nClick to step forward.",
        },
        {
          narration: "First we make a variable called light.\nIt holds the value \"red\".",
        },
        {
          narration: "Now we reach the if.\nIt asks: is light equal to \"green\"?",
        },
        {
          narration: "Replace light with its value:\n\"red\" === \"green\".\n\"red\" is NOT \"green\". The condition is false.",
        },
        {
          narration: "Because the condition was false,\nwe skip everything inside { }.\nThere's nothing else — the function just ends.\n\nThe figure does nothing.",
        },
        {
          narration: "Now we change light to \"green\"\nand run the same code again.",
        },
        {
          narration: "We reach the if again.\nSame question: is light equal to \"green\"?",
        },
        {
          narration: "Replace light with its value:\n\"green\" === \"green\".\nYes — they match. The condition is true.",
        },
        {
          narration: "Because the condition was true,\nwe run the code inside { }: return \"walk\".\n\nThe figure walks.",
        },
        {
          narration: "Notice: same code, but the if only runs sometimes.\nWhen it doesn't run, nothing happens at all.\nWhat if we want SOMETHING to happen on red too?",
        },
      ],
    },

    // 5b. Practice — if-only (no else) — chip-style, no distractors
    {
      kind: "js-chip-assignment",
      title: "Practice: walk if green",
      prompt: "Build the if-statement piece by piece.\nWalk through the four sub-puzzles.",
      puzzles: [
        // p1: keyword — if vs while/for/else
        {
          prompt: "Which keyword starts a conditional?",
          template: '[[]] (light === "green") {\n  return "walk";\n}',
          chips: ["if", "while", "for", "else"],
          solution: ["if"],
        },
        // p2: parentheses ( ) around the condition
        {
          prompt: "What wraps the condition — ( ) or { }?",
          template: 'if [[]]light === "green"[[]] {\n  return "walk";\n}',
          chips: ["(", ")", "{", "}"],
          solution: ["(", ")"],
        },
        // p3: === operator (vs == and =)
        {
          prompt: "Which operator checks strict equality?",
          template: 'if (light [[]] "green") {\n  return "walk";\n}',
          chips: ["===", "==", "=", "!=="],
          solution: ["==="],
        },
        // p4: curly braces { } around the body (door scenario)
        {
          intro: "Same shape — a door that opens.",
          prompt: "What wraps the body of the if?",
          template: 'if (door === "open") [[]]\n  return "enter";\n[[]]',
          chips: ["{", "}", "(", ")"],
          solution: ["{", "}"],
        },
        // p5: synthesis — all four elements together
        {
          prompt: "Now place all the syntax pieces you've practised.",
          template: '[[]] [[]]light [[]] "green"[[]] [[]]\n  return "walk";\n[[]]',
          chips: ["if", "(", ")", "===", "{", "}", "while", "="],
          solution: ["if", "(", ")", "===", "{", "}"],
        },
      ],
      legend: [
        {
          name: "if (no else)",
          syntax: "if (condition) { ... }",
          example: 'if (light === "green") { return "walk"; }',
          note: "When the condition is false, nothing else runs and the function ends.",
        },
        {
          name: "===",
          syntax: "a === b",
          example: 'light === "green"',
          note: "True only when both sides are exactly equal.",
        },
      ],
    },

    // 6. else
    {
      kind: "explanation",
      title: "else — otherwise",
      demo: [
        {
          id: "code",
          label:
            'if (light === "green") {\n  return "walk";\n} else {\n  return "wait";\n}',
          baseStyle: codePanelStyle,
        },
      ],
      steps: [
        {
          narration: "else is another special word. It means 'otherwise'.\nIt comes right after the closing } of the if.",
          tokenHighlight: ["else"],
        },
        {
          narration: "Then come its OWN curly braces { }\nwith code that runs when the if's answer was false.",
          tokenHighlight: ["{", "}"],
        },
        {
          narration: "Only one branch ever runs —\neither the if or the else, never both.",
          tokenHighlight: ["if", "else"],
        },
        {
          narration: "Now BOTH cases lead to a return.\nLet's read this version line by line too.",
          tokenHighlight: ["return"],
        },
      ],
    },

    // 6b. Trace walkthrough (if/else) — same shape as the if-only trace, with else added
    {
      kind: "explanation",
      title: "Watching if / else run",
      intro: "Same idea as before — read line by line.\nThis time we have an else, so red has somewhere to go.",
      customScene: "crosswalk-if-else-trace",
      demo: [],
      steps: [
        {
          narration: "Same start: light is \"red\".",
        },
        {
          narration: "We make light and give it the value \"red\".",
        },
        {
          narration: "We reach the if.\nIs light equal to \"green\"?",
        },
        {
          narration: "\"red\" === \"green\" is false.\nThe if's body is skipped.",
        },
        {
          narration: "But this time there's an else.\nWe go INTO the else block.",
        },
        {
          narration: "We run the else's code: return \"wait\".\n\nThe figure waits.",
        },
        {
          narration: "Now change light to \"green\" and run again.",
        },
        {
          narration: "We reach the if.\nIs light equal to \"green\"?",
        },
        {
          narration: "\"green\" === \"green\" is true.\nThe else is skipped.",
        },
        {
          narration: "We run the if's code: return \"walk\".\n\nThe figure walks.",
        },
      ],
    },

    // 7. Practice — if/else — chip-style with light distractors
    {
      kind: "js-chip-assignment",
      title: "Practice: walk or wait",
      prompt: "Now both branches matter — walk on green, wait on anything else.",
      puzzles: [
        // p1: else keyword (vs elif/otherwise/if)
        {
          prompt: "Pick the keyword between the } and the {.",
          template:
            'if (light === "green") {\n  return "walk";\n} [[]] {\n  return "wait";\n}',
          chips: ["else", "elif", "otherwise", "if"],
          solution: ["else"],
        },
        // p2: { } curly braces around the else body
        {
          prompt: "What wraps the else body?",
          template:
            'if (light === "green") {\n  return "walk";\n} else [[]]\n  return "wait";\n[[]]',
          chips: ["{", "}", "(", ")"],
          solution: ["{", "}"],
        },
        // p3: === vs = (assignment trap)
        {
          prompt: "Which operator compares — does not assign?",
          template:
            'if (light [[]] "green") {\n  return "walk";\n} else {\n  return "wait";\n}',
          chips: ["===", "=", "=="],
          solution: ["==="],
        },
        // p4: ; semicolon after return value (mood scenario)
        {
          intro: "Same shape — smile when happy, frown otherwise.",
          prompt: "What ends a return statement?",
          template:
            'if (mood === "happy") {\n  return "smile"[[]]\n} else {\n  return "frown";\n}',
          chips: [";", ",", ".", ":"],
          solution: [";"],
        },
        // p5: synthesis — all four elements together
        {
          prompt: "Now place all the syntax pieces you've practised.",
          template: 'if (light [[]] "green") {\n  return "walk"[[]];\n} [[]] [[]]\n  return "wait";\n[[]]',
          chips: ["===", ";", "else", "{", "}", "=", "elif"],
          solution: ["===", ";", "else", "{", "}"],
        },
      ],
      legend: [
        {
          name: "if / else",
          syntax: "if (...) { ... } else { ... }",
          example: 'if (x === "y") return "yes"; else return "no";',
          note: "One of the two branches always runs.",
        },
        {
          name: "===",
          syntax: "a === b",
          example: 'light === "green"',
          note: "True only when the values are exactly equal.",
        },
      ],
    },

    // 8. = vs == vs ===
    {
      kind: "explanation",
      title: "=, == and ===",
      intro: "Three signs that look alike but mean very different things.",
      demo: [
        {
          id: "code",
          label:
            "x = 5      // sets x to 5\nx == 5     // compares (avoid)\nx === 5    // compares strictly (use)",
          baseStyle: codePanelStyle,
        },
        {
          id: "warning",
          kind: "note",
          label: "Common trap:\nif (x = 5) — sets x to 5\nand is always true.\nAlmost never what you want.",
          baseStyle: { ...noteBoxStyle, marginTop: 16 },
        },
      ],
      steps: [
        {
          narration: "One equals sign — = — sets a value.\nIt is not a question, it is a statement.",
          tokenHighlight: ["="],
        },
        {
          narration: "Three equals signs — === — ask if two values are equal.\nThis is what you want in a condition.",
          tokenHighlight: ["==="],
        },
        {
          narration: "Two equals signs — == — also ask, but loosely.\nIt says 5 and \"5\" are equal, which is rarely true.\nUse ===.",
          tokenHighlight: ["=="],
        },
      ],
    },

    // 8b. Strict-equality trace — first =, then ===
    {
      kind: "explanation",
      title: "= versus ===",
      intro: "Let's see what happens with a single = first.\nThen we'll switch to === and watch the difference.",
      customScene: "crosswalk-strict-trace",
      demo: [],
      steps: [
        // Phase A — `=` (assignment)
        {
          narration: "First, the wrong version: a SINGLE = inside the if.\nlight starts as \"GREEN\".",
        },
        {
          narration: "We reach the if.\nThe = is between two values — what does it do here?",
        },
        {
          narration: "= ASSIGNS. light is now \"green\" (the assignment changed it).\nThe expression itself evaluates to \"green\" — which is truthy.",
        },
        {
          narration: "Because the expression was truthy, the if's body runs.\nWe return \"walk\".\n\nBut this would have happened for ANY starting value of light.\nThat's the bug — we wanted to compare, not assign.",
        },
        // Phase B — `===` mismatch
        {
          narration: "Switch to === — three equals signs.\nReset light to \"GREEN\".\nNow the if asks a question instead of assigning.",
        },
        {
          narration: "\"GREEN\" === \"green\" → false.\n=== is strict — capital and lowercase letters are NOT the same.",
        },
        {
          narration: "Body skipped. Function ends. Nothing happens.\nMuch better than before — now the value matters.",
        },
        // Phase C — `===` match
        {
          narration: "Now change light to \"green\" — all lowercase.",
        },
        {
          narration: "\"green\" === \"green\" → true.\nNow they match exactly.",
        },
        {
          narration: "The if's body runs: return \"walk\".\n\nLesson: use === to ASK, not = to ASSIGN.\nAnd === wants an EXACT match — even a single capital letter is enough to fail.",
        },
      ],
    },

    // 9. Practice — strict equality — chip-style focused on operator choice
    {
      kind: "js-chip-assignment",
      title: "Practice: pick the right operator",
      prompt: "Pick the operator that compares STRICTLY — so \"GREEN\" doesn't sneak through.",
      puzzles: [
        // p1: === vs == vs = (light scenario)
        {
          prompt: "Which operator asks 'are these exactly equal'?",
          template:
            'if (light [[]] "green") {\n  return "walk";\n} else {\n  return "wait";\n}',
          chips: ["===", "==", "="],
          solution: ["==="],
        },
        // p2: ( ) around the condition
        {
          prompt: "What wraps the condition — ( ) or { }?",
          template:
            'if [[]]light === "green"[[]] {\n  return "walk";\n} else {\n  return "wait";\n}',
          chips: ["(", ")", "{", "}"],
          solution: ["(", ")"],
        },
        // p3: } else { the joint between branches
        {
          prompt: "Place the } else { between the two branches.",
          template:
            'if (light === "green") {\n  return "walk";\n[[]] [[]] [[]]\n  return "wait";\n}',
          chips: ["}", "else", "{", "(", ")"],
          solution: ["}", "else", "{"],
        },
        // p4: === vs == vs = (door scenario)
        {
          intro: "Same idea with a door — strict comparison only.",
          prompt: "Which operator asks 'are these exactly equal'?",
          template:
            'if (door [[]] "open") {\n  return "enter";\n} else {\n  return "knock";\n}',
          chips: ["===", "==", "=", "!=="],
          solution: ["==="],
        },
        // p5: synthesis — all four elements together
        {
          prompt: "Now place all the syntax pieces you've practised.",
          template: 'if [[]]light [[]] "green"[[]] {\n  return "walk";\n[[]] [[]] [[]]\n  return "wait";\n}',
          chips: ["(", "===", ")", "}", "else", "{", "==", "="],
          solution: ["(", "===", ")", "}", "else", "{"],
        },
      ],
      legend: [
        {
          name: "===",
          syntax: "a === b",
          example: 'light === "green"',
          note: "True only when both values are EXACTLY equal — case matters.",
        },
      ],
    },

    // 10. Final — typed input
    {
      kind: "js-typed-assignment",
      title: "Final: walk or wait",
      prompt: "The signal is now an UPPERCASE string.\nReturn 'walk' when signal is exactly 'WALK'.\nReturn 'wait' otherwise.\n\nFill in the boxes — type the missing pieces yourself.",
      varNames: ["signal"],
      template:
        'if ([[input:cond]]) {\n  return [[input:then]];\n}\nreturn [[input:else]];\n',
      tests: [
        { label: "WALK", vars: { signal: "WALK" }, expected: "walk" },
        { label: "STOP", vars: { signal: "STOP" }, expected: "wait" },
        { label: "FLASHING", vars: { signal: "FLASHING" }, expected: "wait" },
        { label: "Walk (mixed case)", vars: { signal: "Walk" }, expected: "wait" },
      ],
      goalHint: "Return walk only when signal is exactly the uppercase string \"WALK\".",
      allegory: {
        kind: "crosswalk",
        config: {
          conditionLabel: "signal === \"WALK\"?",
          inputKey: "signal",
          walkWhen: "walk",
          walkLabel: "Walks",
          waitLabel: "Waits",
        },
      },
    },

    // Workshop tier — guided micro-steps for if / else (2 branches).
    // Surface: password length → verdict. Distinct from chips (signal) and
    // exercise (fortune1-3 / n / selected). String values are NOT pinned —
    // checks accept any string, leaving the student free to label creatively.
    {
      kind: "js-workshop",
      title: "Workshop: password check",
      prompt: "Build a password-length check step by step.\nA short password is rejected, otherwise it's accepted.",
      designNote:
        "L1 if/else workshop. Surface chosen to differ from chips (signal) and exercise (fortune picker). Five steps build a 2-branch chain. String labels are free (typeof check); the lesson is the if/else shape and the .length comparison.",
      steps: [
        {
          id: "pwd-declare-password",
          instruction: "Use `let` to declare a variable called `password` and assign it any string.",
          starterCode: "// Declare password below.\n",
          checks: [
            {
              message: "Use `let` to declare a variable named `password`.",
              requirePattern: /\blet\s+password\b/,
            },
            {
              message: "`password` should hold a string.",
              assert: "return typeof password === 'string';",
            },
          ],
          reveal: 'let password = "hunter2";\n',
        },
        {
          id: "pwd-declare-verdict",
          instruction: "Below `password`, use `let` to declare `verdict` with no value yet — the if-branches will set it.",
          starterCode: 'let password = "hunter2";\n// Declare verdict below (no value).\n',
          checks: [
            {
              message: "Use `let` to declare a variable named `verdict`.",
              requirePattern: /\blet\s+verdict\b/,
            },
            {
              message: "Don't assign `verdict` yet — the if-branches will set its value.",
              assert: "return typeof verdict === 'undefined';",
            },
          ],
          reveal: 'let password = "hunter2";\nlet verdict;\n',
        },
        {
          id: "pwd-if-too-short",
          instruction: "Add an `if` that runs when the password is too short — fewer than 8 characters. Inside, set `verdict` to a string (the lesson uses `\"too short\"`).",
          starterCode: 'let password = "abc";\nlet verdict;\n// Add an if that sets verdict to a string when password.length < 8.\n',
          checks: [
            {
              message: "Use `if` to start the branch.",
              requirePattern: /\bif\s*\(/,
            },
            {
              message: "Compare `password.length` to `8` with `<`.",
              requirePattern: /password\.length\s*<\s*8\b/,
            },
            {
              message: "Inside the branch, set `verdict` to a string.",
              assert: "return typeof verdict === 'string';",
            },
          ],
          reveal: 'let password = "abc";\nlet verdict;\nif (password.length < 8) {\n  verdict = "too short";\n}\n',
        },
        {
          id: "pwd-else-ok",
          instruction: "Add an `else` for the accepted case — when the password isn't too short. The else runs when the if's condition was false. The lesson uses `\"OK\"` for the accepted string.",
          starterCode: 'let password = "longenough";\nlet verdict;\nif (password.length < 8) {\n  verdict = "too short";\n}\n// Add an else (no condition) that sets verdict to a string.\n',
          checks: [
            {
              message: "Add a bare `else { ... }` (no `if` after `else`).",
              requirePattern: /\belse\s*\{/,
            },
            {
              message: "Inside the else, set `verdict` to a string.",
              assert: "return typeof verdict === 'string';",
            },
          ],
          reveal: 'let password = "longenough";\nlet verdict;\nif (password.length < 8) {\n  verdict = "too short";\n} else {\n  verdict = "OK";\n}\n',
        },
      ],
      legend: [
        {
          name: "if",
          syntax: "if (condition) { ... }",
          example: "if (password.length < 8) { ... }",
          note: "Runs when its condition is true.",
        },
        {
          name: "else",
          syntax: "} else { ... }",
          example: '} else { verdict = "OK"; }',
          note: "Runs when the if's condition was false.",
        },
        {
          name: ".length",
          syntax: "string.length",
          example: 'password.length',
          note: "How many characters are in the string.",
        },
      ],
    },

    // Final lab — a freeform Monaco exercise. JS-only, console-based: no
    // functions and no DOM (those concepts haven't been introduced yet). The
    // student declares variables, picks a number, and uses three separate
    // `if` statements (no `else if` in L1) to assign the matching value.
    {
      kind: "exercise",
      title: "Lab: Fortune Picker",
      prompt: "Pick a fortune from a list of three based on a number.\n\n" +
          "User stories (variable names are suggestions — pick your own if you like, " +
          "as long as they stay consistent through the program):\n" +
          "1. Declare three string variables (e.g. fortune1, fortune2, fortune3) — any short fortune you like.\n" +
          "2. Declare a number variable (e.g. n) and set it to 1, 2 or 3.\n" +
          "3. Declare a string variable (e.g. selected) and set it to \"\".\n" +
          "4. If your number === 1, set selected to the first fortune.\n" +
          "5. If your number === 2, set selected to the second fortune.\n" +
          "6. If your number === 3, set selected to the third fortune.\n" +
          "7. Print the three fortunes in order (three console.log lines).\n" +
          "8. Print selected (one more console.log line).\n\n" +
          "You don't have else if yet — write three separate if statements, " +
          "and compare the same number variable in each.",
      starterJs:
        "// Follow the user stories shown to the left.\n" +
        "// Reminder: declare variables with `let`, e.g.\n" +
        '//   let myWord = "hello";\n' +
        '//   let myNumber = 3;\n\n' +
        "// 1-3. Declare your variables here:\n\n\n\n" +
        "// 4-6. Three separate if-statements:\n\n\n\n\n" +
        "// 7-8. Print the three fortunes, then selected:\n\n",
      tests: [
        {
          label: "Console shows exactly four lines",
          assert:
            "var c = window.__console || [];" +
            "return c.length === 4;",
          hint: "Three console.log for the fortunes plus one for selected — four in total.",
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
          label: "All three fortunes are non-empty strings",
          assert:
            "var c = window.__console || [];" +
            "if (c.length < 3) return false;" +
            "return c[0].text.length > 0 && c[1].text.length > 0 && c[2].text.length > 0;",
          hint: 'Set fortune1, fortune2 and fortune3 to actual strings, not "".',
        },
        {
          label: "The three fortunes are different from each other",
          assert:
            "var c = window.__console || [];" +
            "if (c.length < 3) return false;" +
            "return c[0].text !== c[1].text && c[1].text !== c[2].text && c[0].text !== c[2].text;",
          hint: "Give each fortune a different string so the picker has real choices.",
        },
        {
          label: "selected matches one of the three fortunes",
          assert:
            "var c = window.__console || [];" +
            "if (c.length < 4) return false;" +
            "var sel = c[3].text;" +
            "return sel === c[0].text || sel === c[1].text || sel === c[2].text;",
          hint: "Inside each if, assign one of fortune1, fortune2 or fortune3 to selected.",
        },
        {
          label: "Code has three separate if-statements comparing the same variable to 1, 2 and 3",
          assert:
            "var src = window.__userSrc || '';" +
            "var re = /if\\s*\\(\\s*([A-Za-z_$][A-Za-z0-9_$]*)\\s*===\\s*([123])\\s*\\)/g;" +
            "var hits = []; var m;" +
            "while ((m = re.exec(src)) !== null) hits.push({ name: m[1], num: m[2] });" +
            "if (hits.length !== 3) return false;" +
            "var name = hits[0].name;" +
            "if (!hits.every(function(h){ return h.name === name; })) return false;" +
            "var nums = hits.map(function(h){ return h.num; }).sort().join(',');" +
            "return nums === '1,2,3';",
          hint: "Write three separate if-statements that all compare the same variable to 1, 2 and 3.",
        },
      ],
    },
  ],
};
