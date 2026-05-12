import type { Lesson } from "../../types";
import { codePanelStyle, noteBoxStyle } from "./_shared";

export const conveyorLesson: Lesson = {
  id: "conditionals-recycling",
  title: "3. Recycling — switch",
  summary: "Sort each item into the right bin.",
  slides: [
    // 1. Intro — recycling stick-figure scene
    {
      kind: "explanation",
      title: "One value, several bins",
      intro: "When you compare ONE thing against several possible values,\nswitch can make the code clearer than a long if-chain.",
      customScene: "recycling",
      demo: [],
      steps: [
        {
          narration: "You hold an item.\nIn front of you are the recycling bins.",
        },
        {
          narration: "Paper goes in the paper bin.",
        },
        {
          narration: "Glass goes in the glass bin.",
        },
        {
          narration: "If you don't know what something is,\nit goes in the rest bin.\nThat's the default.",
        },
      ],
    },

    // 2. From else-if to switch — motivation
    {
      kind: "explanation",
      title: "When else-if gets repetitive",
      intro: "Look how the same variable repeats in every condition.\nswitch is a shorter way to write this.",
      demo: [
        {
          id: "elseif",
          label:
            'if (item === "paper") {\n  return "paper-bin";\n} else if (item === "glass") {\n  return "glass-bin";\n} else if (item === "plastic") {\n  return "plastic-bin";\n} else {\n  return "rest-bin";\n}',
          baseStyle: codePanelStyle,
        },
        {
          id: "switch",
          label:
            'switch (item) {\n  case "paper":\n    return "paper-bin";\n  case "glass":\n    return "glass-bin";\n  case "plastic":\n    return "plastic-bin";\n  default:\n    return "rest-bin";\n}',
          baseStyle: { ...codePanelStyle, marginTop: 16 },
        },
      ],
      steps: [
        {
          narration: "Left: the else-if chain we already know.\nSee how `item ===` repeats three times?",
          tokenHighlight: ["item ==="],
        },
        {
          narration: "Right: the same logic, written as a switch.\nThe variable name appears ONCE at the top.\nEach case lists just the value to compare against.",
          tokenHighlight: ["switch (item)", "case"],
        },
        {
          narration: "switch only fits one shape: comparing one variable\nagainst CONCRETE VALUES (no ranges, no other variables).\nFor temperatures, stick with else-if.",
          tokenHighlight: ["switch"],
        },
      ],
    },

    // 3. Anatomy of switch — piece by piece
    {
      kind: "explanation",
      title: "switch, piece by piece",
      demo: [
        {
          id: "code",
          label:
            'switch (item) {\n  case "paper":\n    return "paper-bin";\n  case "glass":\n    return "glass-bin";\n  default:\n    return "rest-bin";\n}',
          baseStyle: codePanelStyle,
        },
      ],
      steps: [
        {
          narration: "Six parts to learn:\nswitch  ( )  { }  case  :  default.",
        },
        {
          narration: "1.  switch  is the keyword.\nIt says: I'm going to look at one value\nand pick a branch based on it.",
          tokenHighlight: ["switch"],
        },
        {
          narration: "2.  ( )  parentheses hold the value\nyou want to test. Here: item.",
          tokenHighlight: ["(", ")"],
        },
        {
          narration: "3.  { }  curly braces hold ALL the cases.\nEverything between them belongs to this switch.",
          tokenHighlight: ["{", "}"],
        },
        {
          narration: "4.  case  is another keyword.\nIt's like asking 'is item equal to THIS value?'\ncase 'paper': means 'when item is \"paper\"...'",
          tokenHighlight: ["case"],
        },
        {
          narration: "5.  :  the colon ends the case label.\nThen the code that should run on that match\nfollows on the next line(s).",
          tokenHighlight: [":"],
        },
        {
          narration: "6.  default  is the fallback.\nIt runs when NO case matched.\nLike else at the end of an else-if chain.",
          tokenHighlight: ["default"],
        },
        {
          narration: "Important: switch compares STRICTLY (===).\nSo case 1: matches the number 1, NOT the string \"1\".\nCase matters too — \"Paper\" doesn't match case \"paper\".",
        },
      ],
    },

    // 4. Trace walkthrough — read the switch line by line
    {
      kind: "explanation",
      title: "Watching switch run",
      intro: "Same idea as before — read the code line by line.\nWe'll try three items: \"paper\", \"glass\", and a banana peel.",
      customScene: "recycling-trace",
      demo: [],
      steps: [
        {
          narration: "Click to step forward.",
        },
        {
          narration: "First we set item to \"paper\".",
        },
        {
          narration: "We reach the switch.\nIt looks at item and starts checking cases\nfrom top to bottom.",
        },
        {
          narration: 'First case: \"paper\". Does item equal "paper"? Yes.\nSwitch runs the code under this case.',
        },
        {
          narration: 'return "paper-bin".\nThe other cases below are skipped entirely.',
        },
        {
          narration: 'Now change item to "glass" and run again.',
        },
        {
          narration: "Reach the switch. Start at the first case.",
        },
        {
          narration: '"glass" === "paper"? No.\nMove to the next case.',
        },
        {
          narration: '"glass" === "glass"? Yes!\nThis case matches.',
        },
        {
          narration: 'return "glass-bin". Done.',
        },
        {
          narration: 'Last try. item = "banana" — something the switch doesn\'t know.',
        },
        {
          narration: "Reach the switch.",
        },
        {
          narration: '"banana" === "paper"? No.',
        },
        {
          narration: '"banana" === "glass"? No.',
        },
        {
          narration: '"banana" === "plastic"? No.',
        },
        {
          narration: "No case matched.\nSwitch falls through to default.",
        },
        {
          narration: 'return "rest-bin".\n\nThree items, three different bins — same switch.',
        },
      ],
    },

    // 5. break vs return — the fall-through warning
    {
      kind: "explanation",
      title: "Don't forget break",
      intro: "Inside a case, the code keeps running into the NEXT case\nunless you tell it to stop.",
      demo: [
        {
          id: "buggy",
          label:
            'switch (item) {\n  case "paper":\n    log("Paper!");\n  case "glass":\n    log("Glass!");\n}',
          baseStyle: codePanelStyle,
        },
        {
          id: "fixed",
          label:
            'switch (item) {\n  case "paper":\n    log("Paper!");\n    break;\n  case "glass":\n    log("Glass!");\n    break;\n}',
          baseStyle: { ...codePanelStyle, marginTop: 16 },
        },
        {
          id: "note",
          kind: "note",
          label: "Two ways to stop:\n• return — exits the function entirely.\n• break; — exits just the switch.\n\nIn our lessons we always return,\nso fall-through can't bite us.",
          baseStyle: { ...noteBoxStyle, marginTop: 16 },
        },
      ],
      steps: [
        {
          narration: "Once switch finds a matching case,\nit starts running the code there.",
          highlight: ["buggy"],
        },
        {
          narration: 'Look at the left code. With item = "paper",\nthe first case matches and prints "Paper!".\n\nBut then JavaScript keeps going DOWN —\nit also runs the "glass" case and prints "Glass!".\n\nThat\'s called fall-through. Almost always a bug.',
          highlight: ["buggy"],
        },
        {
          narration: "The right code is the fix.\nbreak; at the end of each case STOPS the switch.\n\nNow item = \"paper\" prints just \"Paper!\" and exits.",
          highlight: ["fixed"],
          tokenHighlight: ["break;"],
        },
        {
          narration: "return also stops fall-through —\nand it ends the whole function at the same time.\n\nThat's why our other examples didn't need break:\nthey returned right away.",
          tokenHighlight: ["break;"],
        },
        {
          narration: "Rule of thumb: if a case doesn't return,\nit MUST end with break;.\nForget both and the code rolls into the next case.",
          tokenHighlight: ["break;"],
        },
      ],
    },

    // 6. Practice — sort recycling — chip-style, no distractors (first chip in L3)
    {
      kind: "js-chip-assignment",
      title: "Practice: sort the items",
      prompt: "Fill in the case values so each item lands in the right bin.",
      puzzles: [
        // p1: switch keyword (vs if/for/while)
        {
          prompt: "Which keyword starts this kind of multi-branch?",
          template:
            '[[]] (item) {\n  case "paper": return "paper-bin";\n  case "glass": return "glass-bin";\n  default: return "rest-bin";\n}',
          chips: ["switch", "if", "for", "while"],
          solution: ["switch"],
        },
        // p2: ( ) around the switch expression
        {
          prompt: "What wraps the value being tested?",
          template:
            'switch [[]]item[[]] {\n  case "paper": return "paper-bin";\n  default: return "rest-bin";\n}',
          chips: ["(", ")", "{", "}"],
          solution: ["(", ")"],
        },
        // p3: case keyword (vs if/when/else)
        {
          prompt: "Which keyword introduces each branch value?",
          template:
            'switch (item) {\n  [[]] "paper": return "paper-bin";\n  case "glass": return "glass-bin";\n  default: return "rest-bin";\n}',
          chips: ["case", "if", "when", "else"],
          solution: ["case"],
        },
        // p4: default keyword + : colon (color scenario)
        {
          intro: "Same shape — traffic-light colors.",
          prompt: "Place the fallback keyword and the colon after it.",
          template:
            'switch (color) {\n  case "red": return "stop";\n  case "yellow": return "slow";\n  [[]][[]]\n    return "off";\n}',
          chips: ["default", ":", ";", "case"],
          solution: ["default", ":"],
        },
        // p5: synthesis — all syntax pieces together
        {
          prompt: "Now place all the syntax pieces you've practised.",
          template:
            '[[]] [[]]item[[]] {\n  [[]] "paper": return "paper-bin";\n  [[]][[]]\n    return "rest-bin";\n}',
          chips: ["switch", "(", ")", "case", "default", ":", "if", ";"],
          solution: ["switch", "(", ")", "case", "default", ":"],
        },
      ],
      legend: [
        {
          name: "switch",
          syntax: "switch (expr) { case ... }",
          example: 'switch (item) { case "paper": ... }',
          note: "The value is compared strictly against each case.",
        },
        {
          name: "case ... return",
          syntax: 'case "value":\n  return ...;',
          example: 'case "paper": return "paper-bin";',
          note: "return ends both the switch and the function.",
        },
        {
          name: "default",
          syntax: "default:\n  return ...;",
          example: 'default: return "rest-bin";',
          note: "Runs when no case matched.",
        },
      ],
    },

    // 7. Final — animal sounds (typed-input)
    {
      kind: "js-typed-assignment",
      title: "Final: animal sounds",
      prompt: "Type the case values and return values for each animal:\n• \"dog\" → \"woof\"\n• \"cat\" → \"meow\"\n• \"cow\" → \"moo\"\n• anything else → \"silence\"",
      varNames: ["animal"],
      template:
        'switch (animal) {\n  case [[input:c1]]:\n    return [[input:r1]];\n  case [[input:c2]]:\n    return [[input:r2]];\n  case [[input:c3]]:\n    return [[input:r3]];\n  default:\n    return [[input:rd]];\n}\n',
      tests: [
        { label: "dog", vars: { animal: "dog" }, expected: "woof" },
        { label: "cat", vars: { animal: "cat" }, expected: "meow" },
        { label: "cow", vars: { animal: "cow" }, expected: "moo" },
        { label: "fish", vars: { animal: "fish" }, expected: "silence" },
        { label: "DOG (caps)", vars: { animal: "DOG" }, expected: "silence" },
      ],
      goalHint: "Each value is a string in quotes. The default returns \"silence\".",
      allegory: {
        kind: "conveyor",
        config: {
          inputLabel: "sound for animal",
          inputKey: "animal",
          bins: [
            { key: "woof", label: "woof" },
            { key: "meow", label: "meow" },
            { key: "moo", label: "moo" },
            { key: "silence", label: "silence" },
          ],
          defaultBinKey: "silence",
        },
      },
    },

    // Workshop tier — guided micro-steps for switch/case/break/default.
    // Surface: HTTP status code → message. Distinct from chips (recycling
    // bin / animal sounds) and exercise (music player button).
    {
      kind: "js-workshop",
      title: "Workshop: HTTP status",
      prompt: "Build a switch that turns an HTTP status number into a message.\nOne case at a time.",
      designNote:
        "L3 switch workshop. Surface: HTTP status code (200/404/500) → message. Distinct from chips (animal) and exercise (button/action). Variable named `statusCode` (rather than `status`) to avoid IDE strikethrough on the deprecated DOM `status` property. The threshold numbers ARE the lesson (they encode the cases) so they stay strict; message strings are free.",
      steps: [
        {
          id: "http-declare-statusCode",
          instruction: "Use `let` to declare a variable called `statusCode` and assign it any number (an HTTP status code).",
          starterCode: "// Declare statusCode below.\n",
          checks: [
            {
              message: "Use `let` to declare a variable named `statusCode`.",
              requirePattern: /\blet\s+statusCode\b/,
            },
            {
              message: "`statusCode` should hold a number.",
              assert: "return typeof statusCode === 'number';",
            },
          ],
          reveal: "let statusCode = 200;\n",
        },
        {
          id: "http-declare-message",
          instruction: "Below `statusCode`, use `let` to declare `message` with no value yet — the switch's cases will set it.",
          starterCode: "let statusCode = 200;\n// Declare message below (no value).\n",
          checks: [
            {
              message: "Use `let` to declare a variable named `message`.",
              requirePattern: /\blet\s+message\b/,
            },
            {
              message: "Don't assign `message` yet — the cases will set its value.",
              assert: "return typeof message === 'undefined';",
            },
          ],
          reveal: "let statusCode = 200;\nlet message;\n",
        },
        {
          id: "http-switch-case-200",
          instruction: "Open a `switch` on `statusCode` and add the first `case` for `200`. Inside, set `message` to a string (the lesson uses `\"OK\"`). Don't forget to end the case so it doesn't fall through.",
          starterCode: "let statusCode = 200;\nlet message;\n// Open a switch (statusCode) and add case 200.\n",
          checks: [
            {
              message: "Open a `switch (statusCode) { ... }` block.",
              requirePattern: /\bswitch\s*\(\s*statusCode\s*\)/,
            },
            {
              message: "Add `case 200:` inside the switch.",
              requirePattern: /\bcase\s+200\s*:/,
            },
            {
              message: "End the case with `break;`.",
              requirePattern: /\bbreak\s*;/,
            },
            {
              message: "When `statusCode` is 200, `message` should end up as a string.",
              assert: "return typeof message === 'string';",
            },
          ],
          reveal: 'let statusCode = 200;\nlet message;\nswitch (statusCode) {\n  case 200:\n    message = "OK";\n    break;\n}\n',
        },
        {
          id: "http-add-case-404",
          instruction: "Add another `case` for `404`. Set `message` to a string (the lesson uses `\"Not Found\"`). End the case so it doesn't fall through.",
          starterCode: 'let statusCode = 404;\nlet message;\nswitch (statusCode) {\n  case 200:\n    message = "OK";\n    break;\n  // Add a case for 404.\n}\n',
          checks: [
            {
              message: "Add `case 404:` inside the switch.",
              requirePattern: /\bcase\s+404\s*:/,
            },
            {
              message: "When `statusCode` is 404, `message` should end up as a string.",
              assert: "return typeof message === 'string';",
            },
          ],
          reveal: 'let statusCode = 404;\nlet message;\nswitch (statusCode) {\n  case 200:\n    message = "OK";\n    break;\n  case 404:\n    message = "Not Found";\n    break;\n}\n',
        },
        {
          id: "http-add-case-500",
          instruction: "Add another `case` for `500`. Set `message` to a string (the lesson uses `\"Server Error\"`).",
          starterCode: 'let statusCode = 500;\nlet message;\nswitch (statusCode) {\n  case 200:\n    message = "OK";\n    break;\n  case 404:\n    message = "Not Found";\n    break;\n  // Add a case for 500.\n}\n',
          checks: [
            {
              message: "Add `case 500:` inside the switch.",
              requirePattern: /\bcase\s+500\s*:/,
            },
            {
              message: "When `statusCode` is 500, `message` should end up as a string.",
              assert: "return typeof message === 'string';",
            },
          ],
          reveal: 'let statusCode = 500;\nlet message;\nswitch (statusCode) {\n  case 200:\n    message = "OK";\n    break;\n  case 404:\n    message = "Not Found";\n    break;\n  case 500:\n    message = "Server Error";\n    break;\n}\n',
        },
        {
          id: "http-add-default",
          instruction: "Add a `default:` clause that sets `message` to a string for unknown statusCode codes (the lesson uses `\"Unknown\"`). The default runs when no case matches.",
          starterCode: 'let statusCode = 418;\nlet message;\nswitch (statusCode) {\n  case 200:\n    message = "OK";\n    break;\n  case 404:\n    message = "Not Found";\n    break;\n  case 500:\n    message = "Server Error";\n    break;\n  // Add a default clause.\n}\n',
          checks: [
            {
              message: "Add `default:` inside the switch.",
              requirePattern: /\bdefault\s*:/,
            },
            {
              message: "When `statusCode` is 418 (no case matches), `message` should end up as a string from the default.",
              assert: "return typeof message === 'string';",
            },
          ],
          reveal: 'let statusCode = 418;\nlet message;\nswitch (statusCode) {\n  case 200:\n    message = "OK";\n    break;\n  case 404:\n    message = "Not Found";\n    break;\n  case 500:\n    message = "Server Error";\n    break;\n  default:\n    message = "Unknown";\n}\n',
        },
      ],
      legend: [
        {
          name: "switch",
          syntax: "switch (value) { ... }",
          example: "switch (statusCode) { ... }",
          note: "Picks one branch based on a value.",
        },
        {
          name: "case",
          syntax: "case constant: ... break;",
          example: 'case 200: message = "OK"; break;',
          note: "Runs when the switch's value strictly equals the constant.",
        },
        {
          name: "default",
          syntax: "default: ...",
          example: 'default: message = "Unknown";',
          note: "Runs when no case matched.",
        },
      ],
    },

    // L3 final lab — music player button. Uses switch with five named cases
    // plus default. Distinct from the recycling/animal-sounds themes used
    // in this chapter.
    {
      kind: "exercise",
      title: "Lab: Music Player Button",
      prompt: "Pick the right action when a music player button is pressed.\n\n" +
          "User stories (variable names are suggestions — pick your own if you like):\n" +
          "1. Declare a string variable (e.g. button) and set it to one of: \"play\", \"pause\", \"stop\", \"next\", \"prev\".\n" +
          "2. Declare a string variable (e.g. action) and set it to \"\".\n" +
          "3. Use a switch on button with these cases (each ending with break):\n" +
          "   - \"play\"  → action = \"Playing track\"\n" +
          "   - \"pause\" → action = \"Paused\"\n" +
          "   - \"stop\"  → action = \"Stopped\"\n" +
          "   - \"next\"  → action = \"Skipped to next\"\n" +
          "   - \"prev\"  → action = \"Back one track\"\n" +
          "4. Add a default case that sets action to \"Unknown button\".\n" +
          "5. Print button.\n" +
          "6. Print action.\n\n" +
          "Don't forget break — without it, cases fall through.",
      starterJs:
        "// Follow the user stories shown to the left.\n\n" +
        "// 1-2. Declare your variables:\n\n\n\n" +
        "// 3-4. switch (button) { ... }\n\n\n\n\n\n\n\n\n" +
        "// 5-6. Print button, then action:\n\n",
      tests: [
        {
          label: "Console shows exactly two lines",
          assert:
            "var c = window.__console || []; return c.length === 2;",
          hint: "One console.log for button, one for action.",
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
          label: 'Line 1 is one of "play", "pause", "stop", "next", "prev"',
          assert:
            "var c = window.__console || [];" +
            "if (c.length < 1) return false;" +
            "return ['play','pause','stop','next','prev'].indexOf(c[0].text) !== -1;",
          hint: "Set button to one of the five lowercase strings.",
        },
        {
          label: "Action matches the rule for the chosen button",
          assert:
            "var c = window.__console || [];" +
            "if (c.length < 2) return false;" +
            "var map = {play:'Playing track', pause:'Paused', stop:'Stopped', next:'Skipped to next', prev:'Back one track'};" +
            "var btn = c[0].text;" +
            "if (!(btn in map)) return false;" +
            "return c[1].text === map[btn];",
          hint: "Use the exact action strings from the user stories — capitalization counts.",
        },
        {
          label: "Code uses a switch statement",
          assert:
            "var src = window.__userSrc || '';" +
            "return /switch\\s*\\(/.test(src);",
          hint: "Start the dispatch with: switch (button) { ... }",
        },
        {
          label: "Code has at least five case clauses",
          assert:
            "var src = window.__userSrc || '';" +
            "var n = (src.match(/case\\s+/g) || []).length;" +
            "return n >= 5;",
          hint: 'One case per button: case "play":, case "pause":, etc.',
        },
        {
          label: "Code has a default case",
          assert:
            "var src = window.__userSrc || '';" +
            "return /default\\s*:/.test(src);",
          hint: 'Add: default: action = "Unknown button";',
        },
        {
          label: "Code uses break at least five times",
          assert:
            "var src = window.__userSrc || '';" +
            "var n = (src.match(/\\bbreak\\b/g) || []).length;" +
            "return n >= 5;",
          hint: "Each named case needs its own break to stop the fall-through.",
        },
      ],
    },
  ],
};
