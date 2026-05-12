import type { Lesson } from "../../types";
import { codePanelStyle, noteBoxStyle } from "./_shared";

export const multiGateLesson: Lesson = {
  id: "conditionals-bouncer",
  title: "4. The Bouncer — &&, || and !",
  summary: "Combine conditions with and, or, not.",
  slides: [
    // 1. Intro — bouncer stick-figure scene
    {
      kind: "explanation",
      title: "More than one check",
      intro: "Sometimes one condition isn't enough.",
      customScene: "bouncer",
      demo: [],
      steps: [
        {
          narration: "You walk up to a club. The bouncer is at the door.",
        },
        {
          narration: "Check one: are you old enough?",
        },
        {
          narration: "Check two: do you have a ticket?",
        },
        {
          narration: "Check three: are you NOT on the ban list?",
        },
        {
          narration: "All three matter at the same time.\nFor that we need ways to COMBINE conditions.",
        },
      ],
    },

    // 2. && — and
    {
      kind: "explanation",
      title: "&&  —  and (both)",
      intro: "&& means 'and'. Both sides must be true.",
      demo: [
        {
          id: "code",
          label:
            'let age = 20;\nlet hasTicket = true;\n\nif (age >= 18 && hasTicket) {\n  return "let in";\n}',
          baseStyle: codePanelStyle,
        },
        {
          id: "table",
          label:
            "true  && true   →  true\ntrue  && false  →  false\nfalse && true   →  false\nfalse && false  →  false",
          baseStyle: { ...codePanelStyle, marginTop: 16, fontSize: 14 },
        },
      ],
      steps: [
        {
          narration: "&& goes BETWEEN two conditions.\nLeft side AND right side — both must be true.",
          tokenHighlight: ["&&"],
        },
        {
          narration: "Picture two gates in a row.\nYou must pass BOTH to get through.\nMiss one and you're stopped.",
          tokenHighlight: ["age >= 18", "hasTicket"],
        },
        {
          narration: "The little table below shows all four cases.\nOnly the FIRST line ends in true.",
        },
        {
          narration: "Read aloud: 'age 18 or more AND has a ticket'.\nIf either fails, the whole thing is false.",
          tokenHighlight: ["age >= 18 && hasTicket"],
        },
      ],
    },

    // 3. Practice — && — chip-style, no distractors (first chip in L4)
    {
      kind: "js-chip-assignment",
      title: "Practice: age AND ticket",
      prompt: "Build the condition: 18 or older AND has a ticket.",
      puzzles: [
        // p1: && operator (vs ||, !, ===)
        {
          prompt: "Which operator means 'both must be true'?",
          template:
            'if (age >= 18 [[]] hasTicket) {\n  return "let in";\n} else {\n  return "stopped";\n}',
          chips: ["&&", "||", "!", "==="],
          solution: ["&&"],
        },
        // p2: ( ) around the condition
        {
          prompt: "What wraps the combined condition?",
          template:
            'if [[]]age >= 18 && hasTicket[[]] {\n  return "let in";\n} else {\n  return "stopped";\n}',
          chips: ["(", ")", "{", "}"],
          solution: ["(", ")"],
        },
        // p3: { } around the if body
        {
          prompt: "What wraps the if body?",
          template:
            'if (age >= 18 && hasTicket) [[]]\n  return "let in";\n[[]] else {\n  return "stopped";\n}',
          chips: ["{", "}", "(", ")"],
          solution: ["{", "}"],
        },
        // p4: ; after return value (fuel/hasKey scenario)
        {
          intro: "Same shape — enough fuel AND has the key.",
          prompt: "What ends a return statement?",
          template:
            'if (fuel >= 10 && hasKey) {\n  return "drive"[[]]\n} else {\n  return "wait";\n}',
          chips: [";", ",", ".", ":"],
          solution: [";"],
        },
        // p5: synthesis — all syntax pieces together
        {
          prompt: "Now place all the syntax pieces you've practised.",
          template:
            'if [[]]age >= 18 [[]] hasTicket[[]] [[]]\n  return "let in"[[]]\n[[]] else {\n  return "stopped";\n}',
          chips: ["(", "&&", ")", "{", ";", "}", "||", ","],
          solution: ["(", "&&", ")", "{", ";", "}"],
        },
      ],
      legend: [
        {
          name: "&&",
          syntax: "a && b",
          example: "age >= 18 && hasTicket",
          note: "True only when BOTH sides are true.",
        },
        {
          name: ">=",
          syntax: "a >= b",
          example: "age >= 18",
          note: "True when a is greater than or equal to b.",
        },
      ],
    },

    // 4. || — or
    {
      kind: "explanation",
      title: "||  —  or (one is enough)",
      intro: "|| means 'or'. One side being true is enough.",
      demo: [
        {
          id: "code",
          label:
            'let isVip = false;\nlet hasTicket = true;\n\nif (isVip || hasTicket) {\n  return "let in";\n}',
          baseStyle: codePanelStyle,
        },
        {
          id: "table",
          label:
            "true  || true   →  true\ntrue  || false  →  true\nfalse || true   →  true\nfalse || false  →  false",
          baseStyle: { ...codePanelStyle, marginTop: 16, fontSize: 14 },
        },
      ],
      steps: [
        {
          narration: "|| goes BETWEEN two conditions, just like &&.\nBut the rule is the opposite:\nleft OR right — one being true is enough.",
          tokenHighlight: ["||"],
        },
        {
          narration: "Picture two doors into the same room.\nWalk through any one and you're inside.",
          tokenHighlight: ["isVip", "hasTicket"],
        },
        {
          narration: "The table shows it: only the LAST line is false.\nEverything else has at least one true side.",
        },
        {
          narration: "Common mix-up: && and || are NOT the same.\n• && is strict — both must be true.\n• || is lenient — one is enough.",
          tokenHighlight: ["&&", "||"],
        },
      ],
    },

    // 5. Practice — || — chip-style with distractors
    {
      kind: "js-chip-assignment",
      title: "Practice: VIP or ticket",
      prompt: "VIP OR ticket gets you in. Pick the right operator.",
      puzzles: [
        // p1: || operator (vs &&, !, ===)
        {
          prompt: "Which operator means 'one side is enough'?",
          template:
            'if (isVip [[]] hasTicket) {\n  return "let in";\n} else {\n  return "stopped";\n}',
          chips: ["||", "&&", "!", "==="],
          solution: ["||"],
        },
        // p2: ( ) around the combined condition
        {
          prompt: "What wraps the combined condition?",
          template:
            'if [[]]isVip || hasTicket[[]] {\n  return "let in";\n} else {\n  return "stopped";\n}',
          chips: ["(", ")", "{", "}"],
          solution: ["(", ")"],
        },
        // p3: { } around the else body
        {
          prompt: "What wraps the else body?",
          template:
            'if (isVip || hasTicket) {\n  return "let in";\n} else [[]]\n  return "stopped";\n[[]]',
          chips: ["{", "}", "(", ")"],
          solution: ["{", "}"],
        },
        // p4: || vs && (isStudent/hasCoupon scenario)
        {
          intro: "Student OR holds a coupon — one is enough for a discount.",
          prompt: "Which operator means 'one side is enough'?",
          template:
            'if (isStudent [[]] hasCoupon) {\n  return "discount";\n} else {\n  return "full";\n}',
          chips: ["||", "&&", "!", "==="],
          solution: ["||"],
        },
        // p5: synthesis — all syntax pieces together
        {
          prompt: "Now place all the syntax pieces you've practised.",
          template:
            'if [[]]isVip [[]] hasTicket[[]] [[]]\n  return "let in";\n[[]] else {\n  return "stopped";\n}',
          chips: ["(", "||", ")", "{", "}", "&&", "!"],
          solution: ["(", "||", ")", "{", "}"],
        },
      ],
      legend: [
        {
          name: "||",
          syntax: "a || b",
          example: "isVip || hasTicket",
          note: "True as soon as ONE side is true.",
        },
      ],
    },

    // 6. ! — not
    {
      kind: "explanation",
      title: "!  —  not (flip it)",
      intro: "! goes BEFORE one value and flips it:\ntrue becomes false, false becomes true.",
      demo: [
        {
          id: "code",
          label:
            'let banned = true;\n\nif (!banned) {\n  return "let in";\n}\n// banned is true,\n// !banned is false,\n// so the if does NOT run',
          baseStyle: codePanelStyle,
        },
        {
          id: "table",
          label:
            "!true   →  false\n!false  →  true",
          baseStyle: { ...codePanelStyle, marginTop: 16, fontSize: 14 },
        },
      ],
      steps: [
        {
          narration: "Unlike && and ||, ! takes only ONE value\nand flips it.",
          tokenHighlight: ["!"],
        },
        {
          narration: "Useful when the variable already names\nthe OPPOSITE of what you want to check.\n\nExample: a variable called `banned`.\nWe want to let people in when they're NOT banned.\nSo we use !banned.",
          tokenHighlight: ["!banned"],
        },
        {
          narration: "Read aloud: '!banned' is 'not banned'.\nIt's true when banned is false.",
          tokenHighlight: ["!banned"],
        },
      ],
    },

    // 7. Practice — ! — chip-style with distractors
    {
      kind: "js-chip-assignment",
      title: "Practice: not banned",
      prompt: "Use ! to flip the variable's truth value.",
      puzzles: [
        // p1: ! operator placed before variable (vs &&, ||, ===)
        {
          prompt: "Which operator flips a boolean?",
          template:
            'if ([[]]banned) {\n  return "let in";\n} else {\n  return "stopped";\n}',
          chips: ["!", "&&", "||", "==="],
          solution: ["!"],
        },
        // p2: ( ) around !banned condition
        {
          prompt: "What wraps the condition?",
          template:
            'if [[]]!banned[[]] {\n  return "let in";\n} else {\n  return "stopped";\n}',
          chips: ["(", ")", "{", "}"],
          solution: ["(", ")"],
        },
        // p3: { } around the if body
        {
          prompt: "What wraps the if body?",
          template:
            'if (!banned) [[]]\n  return "let in";\n[[]] else {\n  return "stopped";\n}',
          chips: ["{", "}", "(", ")"],
          solution: ["{", "}"],
        },
        // p4: ! operator (raining scenario)
        {
          intro: "Walk when it is NOT raining.",
          prompt: "Which operator flips a boolean?",
          template:
            'if ([[]]raining) {\n  return "walk";\n} else {\n  return "umbrella";\n}',
          chips: ["!", "&&", "||", "==="],
          solution: ["!"],
        },
        // p5: synthesis — all syntax pieces together
        {
          prompt: "Now place all the syntax pieces you've practised.",
          template:
            'if [[]][[]]banned[[]] [[]]\n  return "let in";\n[[]] else {\n  return "stopped";\n}',
          chips: ["(", "!", ")", "{", "}", "&&", "||"],
          solution: ["(", "!", ")", "{", "}"],
        },
      ],
      legend: [
        {
          name: "!",
          syntax: "!a",
          example: "!banned",
          note: "Flips true to false and false to true.",
        },
      ],
    },

    // 8. Combining them — parentheses
    {
      kind: "explanation",
      title: "Combining — use parentheses",
      intro: "You can use &&, || and ! in the SAME condition.\nWhen you do, parentheses make it clear what goes with what.",
      demo: [
        {
          id: "code",
          label:
            'if ( (isVip || hasTicket) && !banned ) {\n  return "let in";\n}',
          baseStyle: codePanelStyle,
        },
        {
          id: "note",
          kind: "note",
          label: "Read it left to right:\n• ( isVip OR hasTicket )  — at least one of these,\n• AND  !banned  — and they are not banned.\n\nWithout parentheses the rules are easy to misread.\nAlways group with ( ) when you mix && and ||.",
          baseStyle: { ...noteBoxStyle, marginTop: 16 },
        },
      ],
      steps: [
        {
          narration: "The bouncer's full rule:\nthe person needs a ticket OR be a VIP,\nAND they must not be banned.",
        },
        {
          narration: "We wrap the OR in parentheses\nso it's clear which two conditions belong together.",
          tokenHighlight: ["(isVip || hasTicket)"],
        },
        {
          narration: "Then we add && !banned at the end.\nNow ANY winning combination must also pass\nthe 'not banned' check.",
          tokenHighlight: ["&& !banned"],
        },
        {
          narration: "Tip: when you read the line aloud,\nthe parentheses tell you where to pause.\nIf you can't read it cleanly, add more parens.",
          tokenHighlight: ["(", ")"],
        },
      ],
    },

    // 9. Final — combine all three (typed-input)
    {
      kind: "js-typed-assignment",
      title: "Final: the bouncer's rule",
      prompt: "The person is let in if:\n• age is at least 18\n• AND they have a ticket OR are a VIP\n• AND they are NOT banned.\n\nType the full condition into the box.",
      varNames: ["age", "hasTicket", "isVip", "banned"],
      template:
        '// Combine &&, || and !  —  use parentheses!\nif ([[input:cond]]) {\n  return "let in";\n} else {\n  return "stopped";\n}\n',
      tests: [
        { label: "20 + ticket", vars: { age: 20, hasTicket: true, isVip: false, banned: false }, expected: "let in" },
        { label: "20 + VIP", vars: { age: 20, hasTicket: false, isVip: true, banned: false }, expected: "let in" },
        { label: "20 + ticket + VIP", vars: { age: 20, hasTicket: true, isVip: true, banned: false }, expected: "let in" },
        { label: "16 + ticket", vars: { age: 16, hasTicket: true, isVip: false, banned: false }, expected: "stopped" },
        { label: "20, neither", vars: { age: 20, hasTicket: false, isVip: false, banned: false }, expected: "stopped" },
        { label: "20 + ticket + banned", vars: { age: 20, hasTicket: true, isVip: false, banned: true }, expected: "stopped" },
      ],
      goalHint: "Try: age >= 18 && (hasTicket || isVip) && !banned. Mind the parentheses around hasTicket || isVip.",
      allegory: {
        kind: "multi-gate",
        config: {
          mode: "and",
          operandLabels: ["age", "banned"],
          // The full bouncer expression: age && (isVip || hasTicket) && !banned
          expression: [
            "age",
            { or: ["isVip", "hasTicket"] },
            { not: "banned" },
          ],
          passWhen: "let in",
          passLabel: "Let in",
          failLabel: "Stopped",
        },
      },
    },

    // Workshop tier — guided micro-steps for &&, ||, ! and grouping.
    // Surface: members-only club door (isMember || hasGuest) && !isClosed.
    // Distinct from chips (age/hasTicket/isVip/banned) and exercise
    // (hour/motion/manualOff/lightOn).
    {
      kind: "js-workshop",
      title: "Workshop: club door",
      prompt: "Build a single boolean expression that decides whether someone can enter.\nAdd one operator at a time.",
      designNote:
        "L4 boolean-operators workshop. Surface: isMember/hasGuest/isClosed → canEnter. Each step exercises one operator (||, then && + !). Boolean values are free; the expression's STRUCTURE (operator usage and grouping) is what's pinned.",
      steps: [
        {
          id: "club-declare-isMember",
          instruction: "Use `let` to declare a variable called `isMember` and assign it `true` or `false`.",
          starterCode: "// Declare isMember below.\n",
          checks: [
            {
              message: "Use `let` to declare a variable named `isMember`.",
              requirePattern: /\blet\s+isMember\b/,
            },
            {
              message: "`isMember` should hold a boolean.",
              assert: "return typeof isMember === 'boolean';",
            },
          ],
          reveal: "let isMember = true;\n",
        },
        {
          id: "club-declare-hasGuest",
          instruction: "Below `isMember`, declare `hasGuest` and `isClosed` as booleans (any values you like).",
          starterCode: "let isMember = true;\n// Declare hasGuest and isClosed below.\n",
          checks: [
            {
              message: "Declare `hasGuest` with `let`.",
              requirePattern: /\blet\s+hasGuest\b/,
            },
            {
              message: "Declare `isClosed` with `let`.",
              requirePattern: /\blet\s+isClosed\b/,
            },
            {
              message: "Both `hasGuest` and `isClosed` should be booleans.",
              assert:
                "return typeof hasGuest === 'boolean' && typeof isClosed === 'boolean';",
            },
          ],
          reveal: "let isMember = true;\nlet hasGuest = false;\nlet isClosed = false;\n",
        },
        {
          id: "club-or",
          instruction: "Use `let` to declare `canEnter` and set it based on whether the person is a member OR has a guest pass. The result should be true if either is true.",
          starterCode: "let isMember = false;\nlet hasGuest = true;\nlet isClosed = false;\n// Declare canEnter below using ||.\n",
          checks: [
            {
              message: "Use `let` to declare a variable named `canEnter`.",
              requirePattern: /\blet\s+canEnter\b/,
            },
            {
              message: "Use the `||` operator on `isMember` and `hasGuest`.",
              requirePattern: /isMember\s*\|\|\s*hasGuest|hasGuest\s*\|\|\s*isMember/,
            },
            {
              message: "When isMember is false but hasGuest is true, `canEnter` should be true.",
              assert: "return canEnter === true;",
            },
          ],
          reveal: "let isMember = false;\nlet hasGuest = true;\nlet isClosed = false;\nlet canEnter = isMember || hasGuest;\n",
        },
        {
          id: "club-and-not",
          instruction: "Update `canEnter` so it's also blocked when the club is closed. Remember you can use `( )` to group conditions together.",
          starterCode: "let isMember = true;\nlet hasGuest = false;\nlet isClosed = true;\nlet canEnter = isMember || hasGuest;\n// Update canEnter to also require !isClosed.\n",
          checks: [
            {
              message: "Use parentheses around `isMember || hasGuest`.",
              requirePattern: /\(\s*(isMember\s*\|\|\s*hasGuest|hasGuest\s*\|\|\s*isMember)\s*\)/,
            },
            {
              message: "Combine the group with `&&`.",
              requirePattern: /&&/,
            },
            {
              message: "Apply `!` (not) to `isClosed`.",
              requirePattern: /!\s*isClosed\b/,
            },
            {
              message: "When the club is closed, `canEnter` should be false even for a member.",
              assert: "return canEnter === false;",
            },
          ],
          reveal: "let isMember = true;\nlet hasGuest = false;\nlet isClosed = true;\nlet canEnter = (isMember || hasGuest) && !isClosed;\n",
        },
      ],
      legend: [
        {
          name: "&& (and)",
          syntax: "a && b",
          example: "open && !isClosed",
          note: "True only when both sides are true.",
        },
        {
          name: "|| (or)",
          syntax: "a || b",
          example: "isMember || hasGuest",
          note: "True when at least one side is true.",
        },
        {
          name: "! (not)",
          syntax: "!a",
          example: "!isClosed",
          note: "Flips true to false and vice versa.",
        },
      ],
    },

    // L4 final lab — smart light. Combines &&, ||, ! with grouping
    // parentheses on a different scenario than the bouncer/door theme.
    {
      kind: "exercise",
      title: "Lab: Smart Light",
      prompt: "A smart light should turn on only at night when it senses motion — unless someone has switched it off manually.\n\n" +
          "User stories (variable names are suggestions — pick your own if you like):\n" +
          "1. Declare a number variable (e.g. hour) between 0 and 23.\n" +
          "2. Declare a boolean variable (e.g. motion) — true if motion is sensed.\n" +
          "3. Declare a boolean variable (e.g. manualOff) — true if the manual switch is off.\n" +
          "4. Declare a boolean variable (e.g. lightOn) and set it to false.\n" +
          "5. Set lightOn to true when ALL of these hold:\n" +
          "   - motion is true\n" +
          "   - it's night: hour < 7 OR hour >= 19\n" +
          "   - manualOff is NOT true\n" +
          "   Use && , || and ! together. Wrap the night check in parentheses.\n" +
          "6. Print hour, motion, manualOff and lightOn (four lines, in that order).",
      starterJs:
        "// Follow the user stories shown to the left.\n\n" +
        "// 1-4. Declare hour, motion, manualOff and lightOn:\n\n\n\n\n\n" +
        "// 5. One assignment that combines &&, || and ! — with parentheses:\n" +
        "// lightOn = ...\n\n\n" +
        "// 6. Print all four values in order:\n\n",
      tests: [
        {
          label: "Console shows exactly four lines",
          assert:
            "var c = window.__console || []; return c.length === 4;",
          hint: "Print hour, motion, manualOff, lightOn — one console.log each.",
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
          label: "Line 1 is a number between 0 and 23",
          assert:
            "var c = window.__console || [];" +
            "if (c.length < 1) return false;" +
            "var n = Number(c[0].text);" +
            "return Number.isFinite(n) && n >= 0 && n <= 23;",
          hint: "Set hour to an integer 0-23.",
        },
        {
          label: 'Lines 2-4 are "true" or "false"',
          assert:
            "var c = window.__console || [];" +
            "if (c.length < 4) return false;" +
            "var ok = function(s){ return s === 'true' || s === 'false'; };" +
            "return ok(c[1].text) && ok(c[2].text) && ok(c[3].text);",
          hint: "motion, manualOff and lightOn must all be booleans (not strings).",
        },
        {
          label: "lightOn matches the rule given hour, motion and manualOff",
          assert:
            "var c = window.__console || [];" +
            "if (c.length < 4) return false;" +
            "var hour = Number(c[0].text);" +
            "var motion = c[1].text === 'true';" +
            "var manualOff = c[2].text === 'true';" +
            "var actual = c[3].text === 'true';" +
            "var night = hour < 7 || hour >= 19;" +
            "var expected = motion && night && !manualOff;" +
            "return actual === expected;",
          hint: "lightOn = motion && (hour < 7 || hour >= 19) && !manualOff",
        },
        {
          label: "Code uses && , || and ! together",
          assert:
            "var src = window.__userSrc || '';" +
            "return /&&/.test(src) && /\\|\\|/.test(src) && /(^|[^!])!\\s*[A-Za-z_$]/.test(src);",
          hint: "All three operators are needed: && for AND, || for OR, ! to flip a boolean.",
        },
        {
          label: "Code uses parentheses to group the night check",
          assert:
            "var src = window.__userSrc || '';" +
            "return /\\([^()]*\\|\\|[^()]*\\)/.test(src);",
          hint: "Wrap the OR in parentheses: (hour < 7 || hour >= 19).",
        },
      ],
    },
  ],
};
