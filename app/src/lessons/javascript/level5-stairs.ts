import type { Lesson } from "../../types";
import { codePanelStyle, noteBoxStyle } from "./_shared";

export const stairsLesson: Lesson = {
  id: "loops-stairs",
  title: { en: "1. Stairs — for", sv: "1. Trappan — for" },
  summary: {
    en: "Repeat code a known number of times.",
    sv: "Upprepa kod ett känt antal gånger.",
  },
  slides: [
    // 1. Intro — stick figure climbing stairs
    {
      kind: "explanation",
      title: { en: "Doing the same thing many times", sv: "Att göra samma sak många gånger" },
      intro: {
        en: "Sometimes you need to repeat the same step over and over.",
        sv: "Ibland behöver du upprepa samma steg om och om igen.",
      },
      customScene: "stairs",
      demo: [],
      steps: [
        {
          narration: {
            en:
              "You stand at the bottom of a staircase.\nFive steps up to the top.",
            sv:
              "Du står längst ner i en trappa.\nFem steg upp till toppen.",
          },
        },
        {
          narration: {
            en:
              "You take one step. You're on step 1.",
            sv:
              "Du tar ett steg. Du är på steg 1.",
          },
        },
        {
          narration: {
            en: "Another step. You're on step 2.",
            sv: "Ett till steg. Du är på steg 2.",
          },
        },
        {
          narration: {
            en: "Step 3. Each step is the SAME action — lift, place, repeat.",
            sv: "Steg 3. Varje steg är SAMMA handling — lyft, sätt ner, upprepa.",
          },
        },
        {
          narration: {
            en: "Step 4.",
            sv: "Steg 4.",
          },
        },
        {
          narration: {
            en:
              "And the top!\n\nIn code, this kind of 'do the same thing N times'\nis what a for loop is for.",
            sv:
              "Och toppen!\n\nI kod är det här ('gör samma sak N gånger')\nvad en for-loop är till för.",
          },
        },
      ],
    },

    // 2. Why a loop? — show the repetition problem
    {
      kind: "explanation",
      title: { en: "Why a loop?", sv: "Varför en loop?" },
      intro: {
        en:
          "Without a loop, repeating means writing the same line many times.\nA loop is the short way.",
        sv:
          "Utan loop blir upprepning att skriva samma rad många gånger.\nEn loop är det korta sättet.",
      },
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
          narration: {
            en:
              "Left: 'climb' written out five times.\nIt works — but if we wanted 100 climbs we'd need 100 lines.",
            sv:
              "Vänster: 'climb' skriven fem gånger.\nDet funkar — men för 100 klättringar behövs 100 rader.",
          },
        },
        {
          narration: {
            en:
              "Right: a for loop. The body 'climbStep()' is written ONCE.\nThe loop says 'do this 5 times'. To climb 100 times, change 5 to 100.",
            sv:
              "Höger: en for-loop. Kroppen 'climbStep()' skrivs EN gång.\nLoopen säger 'gör detta 5 gånger'. För 100 klättringar — ändra 5 till 100.",
          },
        },
        {
          narration: {
            en:
              "A for loop is for when you know HOW MANY TIMES.\nIn the next slide we'll break it down piece by piece.",
            sv:
              "En for-loop är för när du vet HUR MÅNGA GÅNGER.\nI nästa steg bryter vi ner den del för del.",
          },
        },
      ],
    },

    // 3. Anatomy of a for loop
    {
      kind: "explanation",
      title: { en: "for, piece by piece", sv: "for, del för del" },
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
          narration: {
            en:
              "A for loop has FIVE parts.\nfor  ( init ; condition ; update )  { body }",
            sv:
              "En for-loop har FEM delar.\nfor  ( init ; villkor ; update )  { kropp }",
          },
        },
        {
          narration: {
            en:
              "1.  for  is the keyword. It tells JavaScript:\n'I'm going to repeat the next block.'",
            sv:
              "1.  for  är nyckelordet. Det säger till JavaScript:\n'Jag ska upprepa nästa block.'",
          },
        },
        {
          narration: {
            en:
              "2.  ( )  parentheses hold THREE things,\nseparated by SEMICOLONS — not commas.",
            sv:
              "2.  ( )  parenteserna håller TRE saker,\nseparerade med SEMIKOLON — inte komma.",
          },
        },
        {
          narration: {
            en:
              "3.  init:  let i = 0\nThis runs ONCE before the loop starts.\nIt creates a variable to count with — almost always called i.",
            sv:
              "3.  init:  let i = 0\nDetta körs EN gång innan loopen startar.\nDen skapar en räknare — nästan alltid kallad i.",
          },
        },
        {
          narration: {
            en:
              "4.  condition:  i < 5\nBefore each repetition, JavaScript checks this.\nIf true → run the body. If false → STOP, leave the loop.",
            sv:
              "4.  villkor:  i < 5\nFöre varje varv kollar JavaScript detta.\nOm sant → kör kroppen. Om falskt → STANNA, lämna loopen.",
          },
        },
        {
          narration: {
            en:
              "5.  update:  i++\nThis runs after each body iteration.\ni++ means 'add 1 to i'. So i goes 0, 1, 2, 3, 4.",
            sv:
              "5.  update:  i++\nDet körs efter varje varv av kroppen.\ni++ betyder 'lägg till 1 till i'. Så i blir 0, 1, 2, 3, 4.",
          },
        },
        {
          narration: {
            en:
              "6.  { body }  is what gets repeated.\nThe variable i is available inside — you can use it.",
            sv:
              "6.  { kropp }  är det som upprepas.\nVariabeln i finns inuti — du kan använda den.",
          },
        },
        {
          narration: {
            en:
              "Reading order each lap:\n• First lap: init runs, then condition, then body, then update.\n• Following laps: condition, body, update — repeat.\n• When the condition becomes false, the loop ends.",
            sv:
              "Läsordning per varv:\n• Första varvet: init, sen villkor, sen kropp, sen update.\n• Följande varv: villkor, kropp, update — upprepa.\n• När villkoret blir falskt slutar loopen.",
          },
        },
      ],
    },

    // 4. Trace walkthrough — sum 1+2+3
    {
      kind: "explanation",
      title: { en: "Watching for run", sv: "Vi ser for köras" },
      intro: {
        en:
          "Let's trace through a real example: summing 1 + 2 + 3.\nClick to step. Watch i and sum on the right.",
        sv:
          "Vi tracar ett riktigt exempel: summera 1 + 2 + 3.\nKlicka för att stega. Titta på i och sum till höger.",
      },
      customScene: "stairs-trace",
      demo: [],
      steps: [
        {
          narration: {
            en:
              "On the left is the code. On the right, a staircase\nand two counters — i and sum.",
            sv:
              "Till vänster är koden. Till höger en trappa\noch två räknare — i och sum.",
          },
        },
        {
          narration: {
            en:
              "First we make sum = 0.\nIt'll hold our running total.",
            sv:
              "Först gör vi sum = 0.\nDen håller vår löpande summa.",
          },
        },
        {
          narration: {
            en:
              "Now the for. The init part runs once: i = 1.",
            sv:
              "Nu kommer for. Init körs en gång: i = 1.",
          },
        },
        {
          narration: {
            en:
              "Condition check: 1 <= 3?\nYes → run the body.",
            sv:
              "Villkorskoll: 1 <= 3?\nJa → kör kroppen.",
          },
        },
        {
          narration: {
            en:
              "Body: sum = sum + i → sum becomes 1.\nThe figure climbs one step.",
            sv:
              "Kropp: sum = sum + i → sum blir 1.\nFiguren klättrar ett steg.",
          },
        },
        {
          narration: {
            en:
              "Update: i++ → i becomes 2.\nNow back to the condition.",
            sv:
              "Update: i++ → i blir 2.\nNu tillbaka till villkoret.",
          },
        },
        {
          narration: {
            en:
              "2 <= 3? Yes → body.",
            sv:
              "2 <= 3? Ja → kropp.",
          },
        },
        {
          narration: {
            en:
              "sum = 1 + 2 → 3.",
            sv:
              "sum = 1 + 2 → 3.",
          },
        },
        {
          narration: {
            en: "Update again: i becomes 3.",
            sv: "Update igen: i blir 3.",
          },
        },
        {
          narration: {
            en: "3 <= 3? Yes (note: less-than-or-equal). Body runs.",
            sv: "3 <= 3? Ja (obs: mindre-eller-lika-med). Kroppen körs.",
          },
        },
        {
          narration: {
            en: "sum = 3 + 3 → 6.",
            sv: "sum = 3 + 3 → 6.",
          },
        },
        {
          narration: {
            en: "Update: i becomes 4.",
            sv: "Update: i blir 4.",
          },
        },
        {
          narration: {
            en:
              "4 <= 3? FALSE.\nThe loop ends. We jump past the closing }.",
            sv:
              "4 <= 3? FALSE.\nLoopen slutar. Vi hoppar förbi avslutande }.",
          },
        },
        {
          narration: {
            en:
              "return sum → 6.\n\nThe loop ran 3 times — once for each value 1, 2, 3.",
            sv:
              "return sum → 6.\n\nLoopen körde 3 varv — ett för varje värde 1, 2, 3.",
          },
        },
      ],
    },

    // 5. Three ways to add 1 — increment shortcuts
    {
      kind: "explanation",
      title: { en: "Three ways to add 1", sv: "Tre sätt att lägga till 1" },
      intro: {
        en:
          "Up to now we wrote 'add 1 to x' as x = x + 1. That's the long way.\nThere are two shortcuts that mean exactly the same thing.",
        sv:
          "Hittills har vi skrivit 'lägg till 1 till x' som x = x + 1. Det är det långa sättet.\nDet finns två kortare sätt som betyder exakt samma sak.",
      },
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
          label: {
            en:
              "Same family for other operators:\n\n  x -= 1   subtract 1\n  x *= 2   multiply by 2\n  x /= 2   divide by 2\n  x--      subtract 1 (like x++)\n\nFrom now on we usually write\ni++ in for-loop updates.",
            sv:
              "Samma familj för andra operatorer:\n\n  x -= 1   minus 1\n  x *= 2   gånger 2\n  x /= 2   delat med 2\n  x--      minus 1 (som x++)\n\nFrån och med nu skriver vi\nvanligtvis i++ i for-loopens update.",
          },
          baseStyle: {
            ...noteBoxStyle,
            marginTop: 16,
            whiteSpace: "pre-wrap",
          },
        },
      ],
      steps: [
        {
          narration: {
            en:
              "Three ways to write 'add 1 to x'.\nAll three end with x being one bigger.",
            sv:
              "Tre sätt att skriva 'lägg till 1 till x'.\nAlla tre slutar med att x är ett större.",
          },
        },
        {
          narration: {
            en:
              "x = x + 1 — the long, explicit way.\nReads almost like English: 'x becomes (whatever x was) plus one'.",
            sv:
              "x = x + 1 — det långa, tydliga sättet.\nLäses nästan som svenska: 'x blir (vad x var) plus ett'.",
          },
        },
        {
          narration: {
            en:
              "x += 1 — compound assignment.\nThe '+=' means 'take what's on the right and add it to x'.\nWorks with any number: x += 5 adds 5, x += i adds i.",
            sv:
              "x += 1 — sammansatt tilldelning.\n'+=' betyder 'ta det till höger och lägg till x'.\nFungerar med vilket tal som helst: x += 5 lägger till 5, x += i lägger till i.",
          },
        },
        {
          narration: {
            en:
              "x++ — increment by 1.\nShortest form. Only does +1 — for other amounts use +=.",
            sv:
              "x++ — öka med 1.\nKortaste formen. Gör bara +1 — för andra tal, använd +=.",
          },
        },
        {
          narration: {
            en:
              "Same family for - * / and a decrement (x--).\nFrom here on we'll usually write i++ in for-loop updates,\nand sometimes sum += i in bodies.",
            sv:
              "Samma familj för - * / och en decrement (x--).\nFrån och med nu skriver vi vanligtvis i++ i for-loopens update,\noch ibland sum += i i kropparna.",
          },
        },
      ],
    },

    // 6. Practice — sum 1..n (chip-style, no distractors)
    {
      kind: "js-chip-assignment",
      title: { en: "Practice: sum 1 to n", sv: "Övning: summa 1 till n" },
      prompt: {
        en:
          "Build a loop that adds up the numbers from 1 to n.\nWork through the four mini-puzzles — they build the answer piece by piece.",
        sv:
          "Bygg en loop som lägger ihop talen från 1 till n.\nJobba dig igenom de fyra mini-pusslen — de bygger svaret bit för bit.",
      },
      puzzles: [
        // p1: for keyword (vs while/do/if)
        {
          prompt: {
            en: "Which keyword starts a counted loop?",
            sv: "Vilket nyckelord startar en räknad loop?",
          },
          template:
            "let sum = 0;\n[[]] (let i = 1; i <= n; i++) {\n  sum = sum + i;\n}\nreturn sum;",
          chips: ["for", "while", "do", "if"],
          solution: ["for"],
        },
        // p2: ; semicolons separating the three header parts
        {
          prompt: {
            en: "What separates the three parts of the for header?",
            sv: "Vad separerar de tre delarna i for-huvudet?",
          },
          template:
            "let sum = 0;\nfor (let i = 1 [[]] i <= n [[]] i++) {\n  sum = sum + i;\n}\nreturn sum;",
          chips: [";", ",", ".", ":"],
          solution: [";", ";"],
        },
        // p3: ( ) around the header
        {
          prompt: {
            en: "What wraps the for-loop header?",
            sv: "Vad omger for-loopens huvud?",
          },
          template:
            "let sum = 0;\nfor [[]]let i = 1; i <= n; i++[[]] {\n  sum = sum + i;\n}\nreturn sum;",
          chips: ["(", ")", "{", "}"],
          solution: ["(", ")"],
        },
        // p4: { } around the body (count to n scenario)
        {
          intro: {
            en: "Same shape — count to n instead of summing.",
            sv: "Samma form — räkna till n istället för att summera.",
          },
          prompt: {
            en: "What wraps the loop body?",
            sv: "Vad omger loop-kroppen?",
          },
          template:
            "let count = 0;\nfor (let i = 1; i <= n; i++) [[]]\n  count = count + 1;\n[[]]",
          chips: ["{", "}", "(", ")"],
          solution: ["{", "}"],
        },
        // p5: synthesis — all syntax pieces together
        {
          prompt: {
            en: "Now place all the syntax pieces you've practised.",
            sv: "Placera nu alla syntaxdelar du övat på.",
          },
          template:
            "let sum = 0;\n[[]] [[]]let i = 1; i <= n[[]] i++[[]] [[]]\n  sum = sum + i;\n[[]]\nreturn sum;",
          chips: ["for", "(", ";", ")", "{", "}", "while", ","],
          solution: ["for", "(", ";", ")", "{", "}"],
        },
      ],
      legend: [
        {
          name: { en: "for", sv: "for" },
          syntax: "for (init; condition; update) { ... }",
          example: "for (let i = 1; i <= n; i++) { ... }",
          note: {
            en: "Repeats the body while the condition is true.",
            sv: "Upprepar kroppen så länge villkoret är sant.",
          },
        },
        {
          name: { en: "sum = sum + i", sv: "sum = sum + i" },
          syntax: "x = x + value",
          example: "sum = sum + i",
          note: {
            en: "Adds i to sum, then stores the new total back in sum.",
            sv: "Lägger till i till sum, sparar sedan nya summan i sum.",
          },
        },
      ],
    },

    // 7. Off-by-one — < vs <=
    {
      kind: "explanation",
      title: { en: "< or <= ?", sv: "< eller <= ?" },
      intro: {
        en:
          "The condition decides exactly how many times the loop runs.\nGetting it wrong by one is the most common loop bug.",
        sv:
          "Villkoret avgör exakt hur många varv loopen kör.\nAtt missa med ett är den vanligaste loop-buggen.",
      },
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
          label: {
            en:
              "Two common patterns:\n• Start at 0, use i < n  → runs n times\n• Start at 1, use i <= n  → runs n times\n\nMixing them up causes off-by-one bugs.",
            sv:
              "Två vanliga mönster:\n• Börja vid 0, använd i < n  → kör n varv\n• Börja vid 1, använd i <= n  → kör n varv\n\nBlandar du ihop dem får du off-by-one-buggar.",
          },
          baseStyle: { ...noteBoxStyle, marginTop: 16 },
        },
      ],
      steps: [
        {
          narration: {
            en:
              "Left: i < 3. The loop runs while i is LESS THAN 3.\ni takes values 0, 1, 2. Three iterations.\nWhen i becomes 3, the condition is false — done.",
            sv:
              "Vänster: i < 3. Loopen kör så länge i är MINDRE ÄN 3.\ni tar värdena 0, 1, 2. Tre varv.\nNär i blir 3 är villkoret falskt — klart.",
          },
        },
        {
          narration: {
            en:
              "Right: i <= 3. The loop runs while i is LESS THAN OR EQUAL TO 3.\ni takes values 0, 1, 2, 3. FOUR iterations.\nNotice: same numbers but ONE more lap.",
            sv:
              "Höger: i <= 3. Loopen kör så länge i är MINDRE ELLER LIKA MED 3.\ni tar värdena 0, 1, 2, 3. FYRA varv.\nLägg märke: samma tal men ETT varv mer.",
          },
        },
        {
          narration: {
            en:
              "Tip: when the loop body uses i, decide which values it needs to see.\nThen pick start + condition to give exactly that range.",
            sv:
              "Tips: när kroppen använder i — bestäm vilka värden den ska se.\nVälj sen start + villkor som ger exakt det intervallet.",
          },
        },
      ],
    },

    // 8. Practice — string of n asterisks (chip-style, with distractors)
    {
      kind: "js-chip-assignment",
      title: { en: "Practice: n stars", sv: "Övning: n stjärnor" },
      prompt: {
        en:
          "Build a string with n asterisks. For n = 4 the answer is \"****\".\nThe chips now include WRONG options too — pick the right ones.",
        sv:
          "Bygg en sträng med n asterisker. För n = 4 är svaret \"****\".\nChipsen innehåller nu även FELAKTIGA alternativ — välj rätt.",
      },
      puzzles: [
        // p1: i < n vs i <= n (off-by-one)
        {
          prompt: {
            en: "Which condition runs the loop exactly n times when i starts at 0?",
            sv: "Vilket villkor kör loopen exakt n gånger när i börjar på 0?",
          },
          template:
            "let stars = \"\";\nfor (let i = 0; [[]]; i++) {\n  stars = stars + \"*\";\n}\nreturn stars;",
          chips: ["i < n", "i <= n", "i < n - 1", "i > n"],
          solution: ["i < n"],
        },
        // p2: i++ update expression (vs i--, i+2, i*2)
        {
          prompt: {
            en: "Which expression advances the counter by one each lap?",
            sv: "Vilket uttryck ökar räknaren med ett per varv?",
          },
          template:
            "let stars = \"\";\nfor (let i = 0; i < n; [[]]) {\n  stars = stars + \"*\";\n}\nreturn stars;",
          chips: ["i++", "i--", "i + 1", "i * 2"],
          solution: ["i++"],
        },
        // p3: body accumulator expression (vs missing assignment)
        {
          prompt: {
            en: "Which body line correctly adds a star to the result?",
            sv: "Vilken kroppsrad lägger korrekt till en stjärna i resultatet?",
          },
          template:
            "let stars = \"\";\nfor (let i = 0; i < n; i++) {\n  [[]];\n}\nreturn stars;",
          chips: ["stars = stars + \"*\"", "stars + \"*\"", "stars = \"*\"", "i += \"*\""],
          solution: ["stars = stars + \"*\""],
        },
        // p4: ( ) around header (n dashes scenario)
        {
          intro: {
            en: "Same shape — build a line of n dashes.",
            sv: "Samma form — bygg en rad med n streck.",
          },
          prompt: {
            en: "What wraps the for-loop header?",
            sv: "Vad omger for-loopens huvud?",
          },
          template:
            "let line = \"\";\nfor [[]]let i = 0; i < n; i++[[]] {\n  line = line + \"-\";\n}\nreturn line;",
          chips: ["(", ")", "{", "}"],
          solution: ["(", ")"],
        },
        // p5: synthesis — all syntax pieces together
        {
          prompt: {
            en: "Now place all the syntax pieces you've practised.",
            sv: "Placera nu alla syntaxdelar du övat på.",
          },
          template:
            'let stars = "";\nfor [[]]let i = 0; [[]]; [[]][[]] {\n  [[]];\n}\nreturn stars;',
          chips: ["(", "i < n", "i++", ")", 'stars = stars + "*"', "i <= n", "i--"],
          solution: ["(", "i < n", "i++", ")", 'stars = stars + "*"'],
        },
      ],
      legend: [
        {
          name: { en: "Joining strings", sv: "Slå ihop strängar" },
          syntax: "a + b",
          example: 'stars = stars + "*"',
          note: {
            en: "When + is used between strings it joins them end-to-end.",
            sv: "När + står mellan strängar slår det ihop dem.",
          },
        },
        {
          name: { en: "<", sv: "<" },
          syntax: "a < b",
          example: "i < n",
          note: {
            en: "True when a is strictly less than b. With i starting at 0, i < n runs n times.",
            sv: "Sant när a är strikt mindre än b. Med i som börjar på 0 kör i < n n varv.",
          },
        },
      ],
    },

    // 9. Final — factorial (typed-input mode)
    {
      kind: "js-typed-assignment",
      title: { en: "Final: factorial", sv: "Slutövning: fakultet" },
      prompt: {
        en:
          "Return n! (n factorial) — that's 1 × 2 × 3 × … × n.\nFor n = 5 the answer is 1×2×3×4×5 = 120.\nFor n = 0 the answer is 1 (the empty product).\n\nFill the boxes — type the missing pieces yourself.",
        sv:
          "Returnera n! (n fakultet) — det är 1 × 2 × 3 × … × n.\nFör n = 5 är svaret 1×2×3×4×5 = 120.\nFör n = 0 är svaret 1 (tomma produkten).\n\nFyll i rutorna — skriv de saknade bitarna själv.",
      },
      varNames: ["n"],
      template:
        "let result = 1;\nfor (let i = [[input:start]]; i <= [[input:end]]; i++) {\n  result = [[input:body]];\n}\nreturn result;\n",
      tests: [
        { label: { en: "n = 0", sv: "n = 0" }, vars: { n: 0 }, expected: 1 },
        { label: { en: "n = 1", sv: "n = 1" }, vars: { n: 1 }, expected: 1 },
        { label: { en: "n = 3", sv: "n = 3" }, vars: { n: 3 }, expected: 6 },
        { label: { en: "n = 5", sv: "n = 5" }, vars: { n: 5 }, expected: 120 },
        { label: { en: "n = 6", sv: "n = 6" }, vars: { n: 6 }, expected: 720 },
      ],
      goalHint: {
        en:
          "Three boxes: start at 1, go up to n, multiply result by i.",
        sv:
          "Tre rutor: börja vid 1, gå upp till n, multiplicera result med i.",
      },
      allegory: {
        kind: "loop-result",
        config: {
          inputKeys: ["n"],
          resultLabel: { en: "n!", sv: "n!" },
          theme: "stairs",
        },
      },
      legend: [
        {
          name: { en: "* (multiply)", sv: "* (multiplicera)" },
          syntax: "a * b",
          example: "result * i",
          note: {
            en: "Multiplies two numbers. Same as × in maths.",
            sv: "Multiplicerar två tal. Samma som × i matten.",
          },
        },
      ],
    },

    // L5 final lab — multiplication table. Uses a counted for-loop with a
    // multiplication body. Distinct from the chapter's stairs/sum/n-stars
    // exercises; new theme entirely.
    {
      kind: "exercise",
      title: { en: "Lab: Multiplication Table", sv: "Labb: Multiplikationstabell" },
      prompt: {
        en:
          "Print the first ten multiples of a number you pick.\n\n" +
          "User stories (variable names are suggestions):\n" +
          "1. Declare a number variable (e.g. factor) between 2 and 12.\n" +
          "2. Use a for loop with an index from 1 to 10 (inclusive).\n" +
          "3. Inside the loop, console.log factor multiplied by the current index.\n" +
          "4. There should be exactly ten lines of output, and each line is the product.",
        sv:
          "Skriv ut de första tio multiplerna av ett tal du väljer.\n\n" +
          "Användarberättelser (variabelnamnen är förslag):\n" +
          "1. Deklarera en talvariabel (t.ex. factor) mellan 2 och 12.\n" +
          "2. Använd en for-loop med ett index från 1 till 10 (inklusive).\n" +
          "3. I loopen, console.log factor multiplicerat med aktuellt index.\n" +
          "4. Det ska bli exakt tio rader, var och en är produkten.",
      },
      starterJs:
        "// Follow the user stories shown to the left.\n\n" +
        "// 1. Declare your factor variable:\n\n\n" +
        "// 2-3. for loop printing factor × i for i = 1..10:\n\n",
      tests: [
        {
          label: {
            en: "Console shows exactly ten lines",
            sv: "Konsolen visar exakt tio rader",
          },
          assert:
            "var c = window.__console || []; return c.length === 10;",
          hint: {
            en: "Loop from 1 to 10 inclusive — that's ten iterations, ten console.log calls.",
            sv: "Loopa från 1 till 10 inklusive — tio iterationer, tio console.log.",
          },
        },
        {
          label: {
            en: "Every line is a finite number",
            sv: "Varje rad är ett ändligt tal",
          },
          assert:
            "var c = window.__console || [];" +
            "if (c.length !== 10) return false;" +
            "for (var i = 0; i < 10; i++) {" +
            "  var n = Number(c[i].text);" +
            "  if (!Number.isFinite(n)) return false;" +
            "}" +
            "return true;",
          hint: {
            en: "Use console.log on a numeric expression like factor * i.",
            sv: "Använd console.log på ett numeriskt uttryck som factor * i.",
          },
        },
        {
          label: {
            en: "Lines form a multiplication table (each line = factor × position)",
            sv: "Raderna bildar en multiplikationstabell (varje rad = factor × position)",
          },
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
          hint: {
            en:
              "Inside the loop, log factor * i where i runs 1, 2, … 10. The first line should be factor itself.",
            sv:
              "I loopen, logga factor * i där i går 1, 2, … 10. Första raden är factor själv.",
          },
        },
        {
          label: {
            en: "Code uses a for loop",
            sv: "Koden använder en for-loop",
          },
          assert:
            "var src = window.__userSrc || '';" +
            "return /\\bfor\\s*\\(/.test(src);",
          hint: {
            en: "Start with: for (let i = 1; i <= 10; i++) { ... }",
            sv: "Börja med: for (let i = 1; i <= 10; i++) { ... }",
          },
        },
      ],
    },
  ],
};
