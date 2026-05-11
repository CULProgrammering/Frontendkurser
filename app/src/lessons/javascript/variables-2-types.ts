import type { Lesson } from "../../types";
import { codePanelStyle, noteBoxStyle } from "./_shared";

export const typesLesson: Lesson = {
  id: "variables-types",
  title: { en: "2. Types — what kind of value", sv: "2. Typer — vilken sorts värde" },
  summary: {
    en: "Strings, numbers, booleans, and the trap of mixing them.",
    sv: "Strängar, tal, booleans, och fällan att blanda dem.",
  },
  slides: [
    // 1. Intro — three primitive types
    {
      kind: "explanation",
      title: { en: "Three kinds of values", sv: "Tre sorters värden" },
      intro: {
        en:
          "Every value in JavaScript has a TYPE.\nFor now, three types matter: string, number, and boolean.",
        sv:
          "Varje värde i JavaScript har en TYP.\nFör nu spelar tre typer roll: string, number och boolean.",
      },
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
          narration: {
            en:
              "A STRING is text. Wrap it in quotes — single, double, or backticks.\n\"hi\"  'hi'  `hi` are all strings.",
            sv:
              "En STRING är text. Omge den med citattecken — enkla, dubbla eller backticks.\n\"hi\"  'hi'  `hi` är alla strängar.",
          },
          tokenHighlight: ['"Hello"'],
        },
        {
          narration: {
            en:
              "A NUMBER is a numeric value. No quotes — just the digits.\n42, 3.14, -7, 0.001 are all numbers.",
            sv:
              "Ett NUMBER är ett tal. Inga citattecken — bara siffrorna.\n42, 3.14, -7, 0.001 är alla tal.",
          },
          tokenHighlight: ["42"],
        },
        {
          narration: {
            en:
              "A BOOLEAN is one of two values: `true` or `false`.\nNo quotes. These are special words, not strings.",
            sv:
              "En BOOLEAN är ett av två värden: `true` eller `false`.\nInga citattecken. De är speciella ord, inte strängar.",
          },
          tokenHighlight: ["true"],
        },
      ],
    },

    // 2. typeof
    {
      kind: "explanation",
      title: { en: "typeof — ask what you've got", sv: "typeof — fråga vad du har" },
      intro: {
        en:
          "`typeof value` gives you back a string naming the type.\nUseful for sanity checks and for spotting bugs.",
        sv:
          "`typeof värde` ger tillbaka en sträng som namnger typen.\nAnvändbart för kontroller och för att hitta buggar.",
      },
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
          label: {
            en:
              "Note: `typeof` returns a STRING describing the type.\n`typeof 42` is `\"number\"`, not `number`.",
            sv:
              "Obs: `typeof` returnerar en STRÄNG som beskriver typen.\n`typeof 42` är `\"number\"`, inte `number`.",
          },
          baseStyle: { ...noteBoxStyle, marginTop: 16 },
        },
      ],
      steps: [
        {
          narration: {
            en:
              "Put `typeof` in front of any value or variable. The result is a string you can log.",
            sv:
              "Sätt `typeof` framför vilket värde eller variabel som helst. Resultatet är en sträng du kan logga.",
          },
          tokenHighlight: ["typeof"],
        },
        {
          narration: {
            en:
              "console.log(typeof score) is a quick way to confirm what's in a variable when something feels off.",
            sv:
              "console.log(typeof score) är ett snabbt sätt att bekräfta vad som finns i en variabel när något känns konstigt.",
          },
        },
      ],
    },

    // 3. Coercion hazard
    {
      kind: "explanation",
      title: { en: "Mixing types — the + trap", sv: "Att blanda typer — +-fällan" },
      intro: {
        en:
          "JavaScript will sometimes silently convert values when types collide.\nThe most common surprise is `+` between a string and a number.",
        sv:
          "JavaScript konverterar ibland värden tyst när typer krockar.\nDen vanligaste överraskningen är `+` mellan en sträng och ett tal.",
      },
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
          label: {
            en:
              "Why? `+` between a string and anything\nmeans CONCATENATE (join end-to-end).\nThe number gets pulled into a string first.",
            sv:
              "Varför? `+` mellan en sträng och vad som helst\nbetyder KONKATENERA (slå ihop).\nTalet dras in i strängen först.",
          },
          baseStyle: { ...noteBoxStyle, marginTop: 16 },
        },
      ],
      steps: [
        {
          narration: {
            en:
              "Two numbers with `+` add up. 5 + 3 is 8.",
            sv:
              "Två tal med `+` summeras. 5 + 3 är 8.",
          },
          tokenHighlight: ["5 + 3"],
        },
        {
          narration: {
            en:
              "But put a string on either side and `+` glues them together.\n\"5\" + 3 is the string \"53\" — not the number 8.",
            sv:
              "Men sätt en sträng på endera sidan så limmar `+` ihop dem.\n\"5\" + 3 är strängen \"53\" — inte talet 8.",
          },
          tokenHighlight: ['"5" + 3'],
        },
        {
          narration: {
            en:
              "Subtraction has no string meaning, so `-` always coerces TO numbers.\n\"5\" - 3 is 2 — JavaScript reads \"5\" as the number 5.",
            sv:
              "Subtraktion har ingen sträng-betydelse, så `-` tvingar alltid TILL tal.\n\"5\" - 3 är 2 — JavaScript läser \"5\" som talet 5.",
          },
          tokenHighlight: ['"5" - 3'],
        },
        {
          narration: {
            en:
              "Lesson: when reading user input or building strings,\nwatch the types — bugs hide in the mixing.",
            sv:
              "Lärdom: när du läser användardata eller bygger strängar,\nhåll koll på typerna — buggar gömmer sig i blandningen.",
          },
        },
      ],
    },

    // 4. Chip practice
    {
      kind: "js-chip-assignment",
      title: { en: "Practice: name the type", sv: "Övning: namnge typen" },
      prompt: {
        en:
          "Pick the right type for each value.\nThen assemble a typeof check.",
        sv:
          "Välj rätt typ för varje värde.\nMontera sedan en typeof-koll.",
      },
      puzzles: [
        // p1: type of "hi"
        {
          prompt: {
            en: "What's the type of \"hi\"?",
            sv: "Vilken typ har \"hi\"?",
          },
          template: 'typeof "hi"   // "[[]]"',
          chips: ["string", "number", "boolean", "text"],
          solution: ["string"],
        },
        // p2: type of 42
        {
          prompt: {
            en: "What's the type of 42?",
            sv: "Vilken typ har 42?",
          },
          template: "typeof 42     // \"[[]]\"",
          chips: ["number", "string", "integer", "boolean"],
          solution: ["number"],
        },
        // p3: type of true
        {
          prompt: {
            en: "What's the type of true?",
            sv: "Vilken typ har true?",
          },
          template: "typeof true   // \"[[]]\"",
          chips: ["boolean", "true", "string", "number"],
          solution: ["boolean"],
        },
        // p4: "5" + 3 = ?
        {
          intro: {
            en: "Now the coercion trap — what's the result?",
            sv: "Nu typkonverteringsfällan — vad blir resultatet?",
          },
          prompt: {
            en: "What does \"5\" + 3 evaluate to?",
            sv: "Vad blir \"5\" + 3?",
          },
          template: '"5" + 3   // [[]]',
          chips: ['"53"', "8", '"8"', "53"],
          solution: ['"53"'],
        },
        // p5: synthesis
        {
          prompt: {
            en: "Build a `typeof` check on the variable `score`.",
            sv: "Bygg en `typeof`-koll på variabeln `score`.",
          },
          template: "console.log([[]] [[]]);",
          chips: ["typeof", "score", "string", "number"],
          solution: ["typeof", "score"],
        },
      ],
      legend: [
        {
          name: { en: "typeof", sv: "typeof" },
          syntax: "typeof value",
          example: 'typeof "hi"',
          note: {
            en: "Returns a string naming the value's type: \"string\", \"number\", \"boolean\", and others.",
            sv: "Returnerar en sträng som namnger värdets typ: \"string\", \"number\", \"boolean\", m.fl.",
          },
        },
        {
          name: { en: "string + number", sv: "string + number" },
          syntax: 'string + number',
          example: '"5" + 3 → "53"',
          note: {
            en: "When + sees any string, it joins the operands as text.",
            sv: "När + ser en sträng slår den ihop operanderna som text.",
          },
        },
      ],
    },

    // 5. Workshop — 4 steps
    {
      kind: "js-workshop",
      title: { en: "Workshop: types in action", sv: "Verkstad: typer i praktiken" },
      prompt: {
        en:
          "Declare one of each type, check them with typeof, and witness the +-coercion bug.",
        sv:
          "Deklarera en av varje typ, kolla dem med typeof, och se +-typkonverteringsbuggen.",
      },
      designNote:
        "Variables L2 workshop. Four steps: declare three types, log typeof of each, observe \"5\" + 3, log a typeof. Surface: title/score/ready triple plus a visible coercion bug.",
      steps: [
        {
          id: "types-declare-three",
          instruction: {
            en:
              "Declare three variables — `title = \"Hello\"`, `score = 42`, and `ready = true`. Use `let` for all three.",
            sv:
              "Deklarera tre variabler — `title = \"Hello\"`, `score = 42`, och `ready = true`. Använd `let` för alla tre.",
          },
          starterCode: {
            en: "// Declare title, score, and ready below.\n",
            sv: "// Deklarera title, score och ready nedan.\n",
          },
          checks: [
            {
              message: {
                en: "`title` should be a string.",
                sv: "`title` ska vara en sträng.",
              },
              assert: "return typeof title === 'string';",
            },
            {
              message: {
                en: "`score` should be a number.",
                sv: "`score` ska vara ett tal.",
              },
              assert: "return typeof score === 'number';",
            },
            {
              message: {
                en: "`ready` should be a boolean.",
                sv: "`ready` ska vara en boolean.",
              },
              assert: "return typeof ready === 'boolean';",
            },
          ],
          reveal: {
            en:
              'let title = "Hello";\nlet score = 42;\nlet ready = true;\n',
            sv:
              'let title = "Hello";\nlet score = 42;\nlet ready = true;\n',
          },
          flexibility: { values: true },
        },
        {
          id: "types-typeof-each",
          instruction: {
            en:
              "Log the type of each variable using `typeof`. Three lines, three types.",
            sv:
              "Logga typen av varje variabel med `typeof`. Tre rader, tre typer.",
          },
          starterCode: {
            en:
              'let title = "Hello";\nlet score = 42;\nlet ready = true;\n// Log typeof of each variable.\n',
            sv:
              'let title = "Hello";\nlet score = 42;\nlet ready = true;\n// Logga typeof av varje variabel.\n',
          },
          checks: [
            {
              message: {
                en: "Use `typeof` on `title`, `score`, and `ready`.",
                sv: "Använd `typeof` på `title`, `score` och `ready`.",
              },
              requirePattern: /typeof\s+title[\s\S]*typeof\s+score[\s\S]*typeof\s+ready/,
            },
            {
              message: {
                en: "Each `typeof` should be inside a `console.log(...)`.",
                sv: "Varje `typeof` ska vara inuti `console.log(...)`.",
              },
              requirePattern: /console\.log[\s\S]*console\.log[\s\S]*console\.log/,
            },
          ],
          reveal: {
            en:
              'let title = "Hello";\nlet score = 42;\nlet ready = true;\nconsole.log(typeof title);\nconsole.log(typeof score);\nconsole.log(typeof ready);\n',
            sv:
              'let title = "Hello";\nlet score = 42;\nlet ready = true;\nconsole.log(typeof title);\nconsole.log(typeof score);\nconsole.log(typeof ready);\n',
          },
        },
        {
          id: "types-coercion-bug",
          instruction: {
            en:
              "Below all your code, declare `let buggy = \"5\" + 3;` and log it. Watch what happens.",
            sv:
              "Under all din kod, deklarera `let buggy = \"5\" + 3;` och logga den. Se vad som händer.",
          },
          starterCode: {
            en:
              'let title = "Hello";\nlet score = 42;\nlet ready = true;\nconsole.log(typeof title);\nconsole.log(typeof score);\nconsole.log(typeof ready);\n// Add buggy and log it.\n',
            sv:
              'let title = "Hello";\nlet score = 42;\nlet ready = true;\nconsole.log(typeof title);\nconsole.log(typeof score);\nconsole.log(typeof ready);\n// Lägg till buggy och logga den.\n',
          },
          checks: [
            {
              message: {
                en: "Declare `buggy` with `\"5\" + 3`.",
                sv: "Deklarera `buggy` med `\"5\" + 3`.",
              },
              requirePattern: /\blet\s+buggy\s*=\s*["']5["']\s*\+\s*3\b/,
            },
            {
              message: {
                en: "`buggy` should equal the string \"53\" — not the number 8.",
                sv: "`buggy` ska vara strängen \"53\" — inte talet 8.",
              },
              assert: "return buggy === '53';",
            },
            {
              message: {
                en: "Log `buggy` with `console.log`.",
                sv: "Logga `buggy` med `console.log`.",
              },
              requirePattern: /console\.log\s*\(\s*buggy\s*\)/,
            },
          ],
          reveal: {
            en:
              'let title = "Hello";\nlet score = 42;\nlet ready = true;\nconsole.log(typeof title);\nconsole.log(typeof score);\nconsole.log(typeof ready);\nlet buggy = "5" + 3;\nconsole.log(buggy);\n',
            sv:
              'let title = "Hello";\nlet score = 42;\nlet ready = true;\nconsole.log(typeof title);\nconsole.log(typeof score);\nconsole.log(typeof ready);\nlet buggy = "5" + 3;\nconsole.log(buggy);\n',
          },
        },
        {
          id: "types-typeof-buggy",
          instruction: {
            en:
              "Confirm your suspicion: log `typeof buggy`. The output proves the value is a string.",
            sv:
              "Bekräfta misstanken: logga `typeof buggy`. Resultatet bevisar att värdet är en sträng.",
          },
          starterCode: {
            en:
              'let title = "Hello";\nlet score = 42;\nlet ready = true;\nconsole.log(typeof title);\nconsole.log(typeof score);\nconsole.log(typeof ready);\nlet buggy = "5" + 3;\nconsole.log(buggy);\n// Log typeof buggy.\n',
            sv:
              'let title = "Hello";\nlet score = 42;\nlet ready = true;\nconsole.log(typeof title);\nconsole.log(typeof score);\nconsole.log(typeof ready);\nlet buggy = "5" + 3;\nconsole.log(buggy);\n// Logga typeof buggy.\n',
          },
          checks: [
            {
              message: {
                en: "Log `typeof buggy`.",
                sv: "Logga `typeof buggy`.",
              },
              requirePattern: /console\.log\s*\(\s*typeof\s+buggy\s*\)/,
            },
          ],
          reveal: {
            en:
              'let title = "Hello";\nlet score = 42;\nlet ready = true;\nconsole.log(typeof title);\nconsole.log(typeof score);\nconsole.log(typeof ready);\nlet buggy = "5" + 3;\nconsole.log(buggy);\nconsole.log(typeof buggy);\n',
            sv:
              'let title = "Hello";\nlet score = 42;\nlet ready = true;\nconsole.log(typeof title);\nconsole.log(typeof score);\nconsole.log(typeof ready);\nlet buggy = "5" + 3;\nconsole.log(buggy);\nconsole.log(typeof buggy);\n',
          },
        },
      ],
      legend: [
        {
          name: { en: "typeof", sv: "typeof" },
          syntax: "typeof value",
          example: "typeof score",
          note: {
            en: "Returns a string with the value's type.",
            sv: "Returnerar en sträng med värdets typ.",
          },
        },
        {
          name: { en: "string + value", sv: "string + value" },
          syntax: 'string + anything',
          example: '"5" + 3',
          note: {
            en: "When either side is a string, + concatenates instead of adding.",
            sv: "När en sida är en sträng konkatenerar + istället för att addera.",
          },
        },
      ],
    },

    // 6. Exercise
    {
      kind: "exercise",
      title: { en: "Lab: type detective", sv: "Labb: typdetektiv" },
      prompt: {
        en:
          "Use typeof to investigate four expressions.\n\n" +
          "User stories:\n" +
          "1. Declare `title = \"Hello\"`, `score = 42`, and `ready = true`.\n" +
          "2. Log the typeof of each — three lines.\n" +
          "3. Compute \"5\" + 3 and log the typeof of the result — one more line.\n" +
          "4. There should be exactly four console.log lines, and the values logged should be the four type names.",
        sv:
          "Använd typeof för att undersöka fyra uttryck.\n\n" +
          "Användarberättelser:\n" +
          "1. Deklarera `title = \"Hello\"`, `score = 42`, och `ready = true`.\n" +
          "2. Logga typeof av varje — tre rader.\n" +
          "3. Beräkna \"5\" + 3 och logga typeof av resultatet — en till rad.\n" +
          "4. Det ska bli exakt fyra console.log-rader, och värdena som loggas ska vara de fyra typnamnen.",
      },
      starterJs:
        "// 1. Declare your three variables (one of each type):\n\n\n\n" +
        "// 2. Log typeof of each — three lines:\n\n\n\n" +
        "// 3. Log typeof of \"5\" + 3 — one more line:\n\n",
      tests: [
        {
          label: {
            en: "Console shows exactly four lines",
            sv: "Konsolen visar exakt fyra rader",
          },
          assert:
            "var c = window.__console || []; return c.length === 4;",
          hint: {
            en: "Three typeof logs for your variables, one for the coercion check — four total.",
            sv: "Tre typeof-loggar för dina variabler, en för typkonverteringen — fyra totalt.",
          },
        },
        {
          label: {
            en: "First three lines are \"string\", \"number\", and \"boolean\" (any order)",
            sv: "De tre första raderna är \"string\", \"number\" och \"boolean\" (valfri ordning)",
          },
          assert:
            "var c = window.__console || [];" +
            "if (c.length < 3) return false;" +
            "var got = [c[0].text, c[1].text, c[2].text].sort();" +
            "var want = ['boolean','number','string'];" +
            "for (var i = 0; i < 3; i++) if (got[i] !== want[i]) return false;" +
            "return true;",
          hint: {
            en: "Use console.log(typeof yourVariable) for each of your three variables.",
            sv: "Använd console.log(typeof dinVariabel) för var och en av dina tre variabler.",
          },
        },
        {
          label: {
            en: "The fourth line is \"string\" (the coercion result)",
            sv: "Den fjärde raden är \"string\" (resultatet av typkonverteringen)",
          },
          assert:
            "var c = window.__console || [];" +
            "if (c.length < 4) return false;" +
            "return c[3].text === 'string';",
          hint: {
            en: "console.log(typeof (\"5\" + 3)) — the result is a string, not a number.",
            sv: "console.log(typeof (\"5\" + 3)) — resultatet är en sträng, inte ett tal.",
          },
        },
        {
          label: {
            en: "Code uses typeof at least four times",
            sv: "Koden använder typeof minst fyra gånger",
          },
          assert:
            "var src = window.__userSrc || '';" +
            "var m = src.match(/\\btypeof\\b/g) || [];" +
            "return m.length >= 4;",
          hint: {
            en: "Each console.log should call typeof — four uses in total.",
            sv: "Varje console.log ska använda typeof — fyra gånger totalt.",
          },
        },
      ],
      flexibility: { values: true },
    },

    // ──────────────────────────────────────────────────────────────────
    // Workshop 2 — Receipt bug hunt (diagnose and fix a coercion bug)
    // ──────────────────────────────────────────────────────────────────
    {
      kind: "js-workshop",
      title: { en: "Workshop: receipt bug hunt", sv: "Verkstad: kvitto­buggjakt" },
      prompt: {
        en:
          "A receipt's `total` comes out as text glue instead of a sum. Diagnose it with `typeof`, find the culprit, then fix it.",
        sv:
          "Ett kvittos `total` blir hopklistrad text istället för en summa. Diagnostisera med `typeof`, hitta boven och fixa.",
      },
      designNote:
        "L2 W2. Bug hunt arc — observe → diagnose with typeof → identify the string operand → fix by dropping the quotes. Distinct from W1 (basic tour) and W3/W4 (other coercion angles).",
      steps: [
        {
          id: "receipt-observe",
          instruction: {
            en:
              "Run the buggy receipt code as-is. `price` arrived from a form as text. The starter has `let total = price + quantity;` followed by a log — what does the console print?",
            sv:
              "Kör den buggiga koden som den är. `price` kom från ett formulär som text. Startkoden har `let total = price + quantity;` följt av en logg — vad skriver konsolen ut?",
          },
          hint: {
            en: "Just press Check. The bug is already there — observe the output. You'll fix it in a later step.",
            sv: "Tryck bara Kontrollera. Buggen är redan där — observera utskriften. Du fixar den senare.",
          },
          starterCode: {
            en:
              '// Bug: total should be 89, not "3950".\nlet price = "39";\nlet quantity = 50;\nlet total = price + quantity;\nconsole.log(total);\n',
            sv:
              '// Bug: total ska vara 89, inte "3950".\nlet price = "39";\nlet quantity = 50;\nlet total = price + quantity;\nconsole.log(total);\n',
          },
          checks: [
            {
              message: {
                en: "Don't change the starter on this step — just press Check and look at the console.",
                sv: "Ändra inte startkoden i detta steg — tryck bara Kontrollera och titta i konsolen.",
              },
              requirePattern: /\blet\s+price\s*=\s*["']39["']/,
            },
            {
              message: {
                en: "Make sure the starter `console.log(total)` is still there.",
                sv: "Se till att start­kodens `console.log(total)` finns kvar.",
              },
              requirePattern: /console\.log\s*\(\s*total\s*\)/,
            },
            {
              message: {
                en: "`total` should still be the buggy string `\"3950\"` on this step.",
                sv: "`total` ska fortfarande vara den buggiga strängen `\"3950\"` i detta steg.",
              },
              assert: "return total === '3950';",
            },
          ],
          reveal: {
            en:
              'let price = "39";\nlet quantity = 50;\nlet total = price + quantity;\nconsole.log(total);\n',
            sv:
              'let price = "39";\nlet quantity = 50;\nlet total = price + quantity;\nconsole.log(total);\n',
          },
        },
        {
          id: "receipt-diagnose-total",
          instruction: {
            en:
              "Use `typeof` to confirm `total` isn't a number. Add `console.log(typeof total);` below the existing log.",
            sv:
              "Använd `typeof` för att bekräfta att `total` inte är ett tal. Lägg till `console.log(typeof total);` under den befintliga loggen.",
          },
          hint: {
            en: "console.log(typeof total);",
            sv: "console.log(typeof total);",
          },
          starterCode: {
            en:
              'let price = "39";\nlet quantity = 50;\nlet total = price + quantity;\nconsole.log(total);\n// Log typeof total to confirm the type.\n',
            sv:
              'let price = "39";\nlet quantity = 50;\nlet total = price + quantity;\nconsole.log(total);\n// Logga typeof total för att bekräfta typen.\n',
          },
          checks: [
            {
              message: {
                en: "Add a `console.log(typeof total);` line.",
                sv: "Lägg till en `console.log(typeof total);`-rad.",
              },
              requirePattern: /console\.log\s*\(\s*typeof\s+total\s*\)/,
            },
            {
              message: {
                en: "The bug is still there — `total` should still be a string.",
                sv: "Buggen finns kvar — `total` ska fortfarande vara en sträng.",
              },
              assert: "return typeof total === 'string';",
            },
          ],
          reveal: {
            en:
              'let price = "39";\nlet quantity = 50;\nlet total = price + quantity;\nconsole.log(total);\nconsole.log(typeof total);\n',
            sv:
              'let price = "39";\nlet quantity = 50;\nlet total = price + quantity;\nconsole.log(total);\nconsole.log(typeof total);\n',
          },
        },
        {
          id: "receipt-find-culprit",
          instruction: {
            en:
              "Now find the culprit. Log `typeof price` and `typeof quantity` — one of them isn't what the receipt expected.",
            sv:
              "Hitta boven nu. Logga `typeof price` och `typeof quantity` — en av dem är inte vad kvittot förväntade sig.",
          },
          hint: {
            en: "console.log(typeof price);\nconsole.log(typeof quantity);",
            sv: "console.log(typeof price);\nconsole.log(typeof quantity);",
          },
          starterCode: {
            en:
              'let price = "39";\nlet quantity = 50;\nlet total = price + quantity;\nconsole.log(total);\nconsole.log(typeof total);\n// Log typeof of each operand to find the culprit.\n',
            sv:
              'let price = "39";\nlet quantity = 50;\nlet total = price + quantity;\nconsole.log(total);\nconsole.log(typeof total);\n// Logga typeof av varje operand för att hitta boven.\n',
          },
          checks: [
            {
              message: { en: "Log `typeof price`.", sv: "Logga `typeof price`." },
              requirePattern: /console\.log\s*\(\s*typeof\s+price\s*\)/,
            },
            {
              message: { en: "Log `typeof quantity`.", sv: "Logga `typeof quantity`." },
              requirePattern: /console\.log\s*\(\s*typeof\s+quantity\s*\)/,
            },
            {
              message: {
                en: "Don't fix the bug yet — `price` should still be a string on this step.",
                sv: "Fixa inte buggen än — `price` ska fortfarande vara en sträng i detta steg.",
              },
              assert: "return typeof price === 'string';",
            },
          ],
          reveal: {
            en:
              'let price = "39";\nlet quantity = 50;\nlet total = price + quantity;\nconsole.log(total);\nconsole.log(typeof total);\nconsole.log(typeof price);\nconsole.log(typeof quantity);\n',
            sv:
              'let price = "39";\nlet quantity = 50;\nlet total = price + quantity;\nconsole.log(total);\nconsole.log(typeof total);\nconsole.log(typeof price);\nconsole.log(typeof quantity);\n',
          },
        },
        {
          id: "receipt-fix",
          instruction: {
            en:
              "Fix it. Change the declaration of `price` so it's a number, not a string (drop the quotes). After your fix, `total` should be the number `89` and `typeof total` should be `\"number\"`.",
            sv:
              "Fixa det. Ändra deklarationen av `price` så att det är ett tal, inte en sträng (ta bort citattecknen). Efter fixet ska `total` vara talet `89` och `typeof total` vara `\"number\"`.",
          },
          hint: {
            en: 'let price = 39;  // no quotes — it\'s a number now',
            sv: 'let price = 39;  // inga citattecken — det är ett tal nu',
          },
          starterCode: {
            en:
              'let price = "39";\nlet quantity = 50;\nlet total = price + quantity;\nconsole.log(total);\nconsole.log(typeof total);\nconsole.log(typeof price);\nconsole.log(typeof quantity);\n// Fix the price declaration above — drop the quotes.\n',
            sv:
              'let price = "39";\nlet quantity = 50;\nlet total = price + quantity;\nconsole.log(total);\nconsole.log(typeof total);\nconsole.log(typeof price);\nconsole.log(typeof quantity);\n// Fixa deklarationen av price ovan — ta bort citattecknen.\n',
          },
          checks: [
            {
              message: {
                en: "`price` should now be declared as a number (no quotes).",
                sv: "`price` ska nu deklareras som ett tal (inga citattecken).",
              },
              requirePattern: /\blet\s+price\s*=\s*-?\d+(?:\.\d+)?\s*;?/,
            },
            {
              message: {
                en: "`total` should now be the number `89`.",
                sv: "`total` ska nu vara talet `89`.",
              },
              assert: "return total === 89;",
            },
            {
              message: {
                en: "`typeof total` should now be `\"number\"`.",
                sv: "`typeof total` ska nu vara `\"number\"`.",
              },
              assert: "return typeof total === 'number';",
            },
          ],
          reveal: {
            en:
              'let price = 39;\nlet quantity = 50;\nlet total = price + quantity;\nconsole.log(total);\nconsole.log(typeof total);\nconsole.log(typeof price);\nconsole.log(typeof quantity);\n',
            sv:
              'let price = 39;\nlet quantity = 50;\nlet total = price + quantity;\nconsole.log(total);\nconsole.log(typeof total);\nconsole.log(typeof price);\nconsole.log(typeof quantity);\n',
          },
        },
      ],
    },

    // ──────────────────────────────────────────────────────────────────
    // Workshop 3 — Minus vs plus (asymmetric coercion)
    // ──────────────────────────────────────────────────────────────────
    {
      kind: "js-workshop",
      title: { en: "Workshop: minus vs plus", sv: "Verkstad: minus mot plus" },
      prompt: {
        en:
          "The SAME two operands — a string `\"5\"` and a number `3` — produce different TYPES depending on the operator. `+` glues, `-` calculates. Walk through it and see.",
        sv:
          "SAMMA två operander — en sträng `\"5\"` och ett tal `3` — ger olika TYPER beroende på operatorn. `+` limmar ihop, `-` räknar. Gå igenom det och se.",
      },
      designNote:
        "L2 W3. Asymmetric coercion: `+` concatenates when a string is involved, `-` always coerces to number. Distinct from W2 (bug hunt) and W4 (strict vs loose equality).",
      steps: [
        {
          id: "minusplus-declare",
          instruction: {
            en:
              "Declare two operands that LOOK similar but have different types: `textNumber` as the string `\"5\"`, and `realNumber` as the number `3`. Log `typeof` of each to confirm.",
            sv:
              "Deklarera två operander som SER lika ut men har olika typer: `textNumber` som strängen `\"5\"`, och `realNumber` som talet `3`. Logga `typeof` av varje för att bekräfta.",
          },
          hint: {
            en: 'let textNumber = "5";\nlet realNumber = 3;\nconsole.log(typeof textNumber);\nconsole.log(typeof realNumber);',
            sv: 'let textNumber = "5";\nlet realNumber = 3;\nconsole.log(typeof textNumber);\nconsole.log(typeof realNumber);',
          },
          starterCode: {
            en: "// Declare textNumber (string \"5\") and realNumber (number 3), then log typeof of each.\n",
            sv: "// Deklarera textNumber (sträng \"5\") och realNumber (tal 3), logga sedan typeof av varje.\n",
          },
          checks: [
            { message: { en: "`textNumber` should be the string `\"5\"`.", sv: "`textNumber` ska vara strängen `\"5\"`." }, assert: "return textNumber === '5';" },
            { message: { en: "`realNumber` should be the number `3`.", sv: "`realNumber` ska vara talet `3`." }, assert: "return realNumber === 3;" },
            { message: { en: "Log `typeof textNumber` and `typeof realNumber`.", sv: "Logga `typeof textNumber` och `typeof realNumber`." }, requirePattern: /typeof\s+textNumber[\s\S]*typeof\s+realNumber|typeof\s+realNumber[\s\S]*typeof\s+textNumber/ },
          ],
          reveal: {
            en: 'let textNumber = "5";\nlet realNumber = 3;\nconsole.log(typeof textNumber);\nconsole.log(typeof realNumber);\n',
            sv: 'let textNumber = "5";\nlet realNumber = 3;\nconsole.log(typeof textNumber);\nconsole.log(typeof realNumber);\n',
          },
        },
        {
          id: "minusplus-add",
          instruction: {
            en:
              "Now combine them with `+`. `console.log(textNumber + realNumber)` — what does it print? Because one side is a string, `+` GLUES them. The result is the string `\"53\"`.",
            sv:
              "Kombinera dem nu med `+`. `console.log(textNumber + realNumber)` — vad skrivs ut? Eftersom en sida är en sträng LIMMAR `+` ihop dem. Resultatet är strängen `\"53\"`.",
          },
          hint: {
            en: "console.log(textNumber + realNumber);",
            sv: "console.log(textNumber + realNumber);",
          },
          starterCode: {
            en:
              'let textNumber = "5";\nlet realNumber = 3;\nconsole.log(typeof textNumber);\nconsole.log(typeof realNumber);\n// Log textNumber + realNumber.\n',
            sv:
              'let textNumber = "5";\nlet realNumber = 3;\nconsole.log(typeof textNumber);\nconsole.log(typeof realNumber);\n// Logga textNumber + realNumber.\n',
          },
          checks: [
            { message: { en: "Log `textNumber + realNumber`.", sv: "Logga `textNumber + realNumber`." }, requirePattern: /console\.log\s*\(\s*textNumber\s*\+\s*realNumber\s*\)/ },
            { message: { en: "The result should be the string `\"53\"`.", sv: "Resultatet ska vara strängen `\"53\"`." }, assert: "return (textNumber + realNumber) === '53';" },
          ],
          reveal: {
            en:
              'let textNumber = "5";\nlet realNumber = 3;\nconsole.log(typeof textNumber);\nconsole.log(typeof realNumber);\nconsole.log(textNumber + realNumber);\n',
            sv:
              'let textNumber = "5";\nlet realNumber = 3;\nconsole.log(typeof textNumber);\nconsole.log(typeof realNumber);\nconsole.log(textNumber + realNumber);\n',
          },
        },
        {
          id: "minusplus-subtract",
          instruction: {
            en:
              "Now the surprise: combine the SAME operands with `-`. `console.log(textNumber - realNumber)`. `-` has no string meaning, so JS coerces `\"5\"` to the number `5`. The result is the number `2`.",
            sv:
              "Nu överraskningen: kombinera SAMMA operander med `-`. `console.log(textNumber - realNumber)`. `-` har ingen sträng-betydelse, så JS omvandlar `\"5\"` till talet `5`. Resultatet är talet `2`.",
          },
          hint: {
            en: "console.log(textNumber - realNumber);",
            sv: "console.log(textNumber - realNumber);",
          },
          starterCode: {
            en:
              'let textNumber = "5";\nlet realNumber = 3;\nconsole.log(typeof textNumber);\nconsole.log(typeof realNumber);\nconsole.log(textNumber + realNumber);\n// Same operands with -. Surprise.\n',
            sv:
              'let textNumber = "5";\nlet realNumber = 3;\nconsole.log(typeof textNumber);\nconsole.log(typeof realNumber);\nconsole.log(textNumber + realNumber);\n// Samma operander med -. Överraskning.\n',
          },
          checks: [
            { message: { en: "Log `textNumber - realNumber`.", sv: "Logga `textNumber - realNumber`." }, requirePattern: /console\.log\s*\(\s*textNumber\s*-\s*realNumber\s*\)/ },
            { message: { en: "The result should be the number `2`.", sv: "Resultatet ska vara talet `2`." }, assert: "return (textNumber - realNumber) === 2;" },
          ],
          reveal: {
            en:
              'let textNumber = "5";\nlet realNumber = 3;\nconsole.log(typeof textNumber);\nconsole.log(typeof realNumber);\nconsole.log(textNumber + realNumber);\nconsole.log(textNumber - realNumber);\n',
            sv:
              'let textNumber = "5";\nlet realNumber = 3;\nconsole.log(typeof textNumber);\nconsole.log(typeof realNumber);\nconsole.log(textNumber + realNumber);\nconsole.log(textNumber - realNumber);\n',
          },
        },
        {
          id: "minusplus-confirm-types",
          instruction: {
            en:
              "Confirm what just happened. Log `typeof (textNumber + realNumber)` and `typeof (textNumber - realNumber)`. Same operands, but the operator decides the type: `+` gave `\"string\"`, `-` gave `\"number\"`.",
            sv:
              "Bekräfta vad som hände. Logga `typeof (textNumber + realNumber)` och `typeof (textNumber - realNumber)`. Samma operander, men operatorn bestämmer typen: `+` gav `\"string\"`, `-` gav `\"number\"`.",
          },
          hint: {
            en: "console.log(typeof (textNumber + realNumber));\nconsole.log(typeof (textNumber - realNumber));",
            sv: "console.log(typeof (textNumber + realNumber));\nconsole.log(typeof (textNumber - realNumber));",
          },
          starterCode: {
            en:
              'let textNumber = "5";\nlet realNumber = 3;\nconsole.log(typeof textNumber);\nconsole.log(typeof realNumber);\nconsole.log(textNumber + realNumber);\nconsole.log(textNumber - realNumber);\n// Log typeof of each combination.\n',
            sv:
              'let textNumber = "5";\nlet realNumber = 3;\nconsole.log(typeof textNumber);\nconsole.log(typeof realNumber);\nconsole.log(textNumber + realNumber);\nconsole.log(textNumber - realNumber);\n// Logga typeof av varje kombination.\n',
          },
          checks: [
            { message: { en: "Log `typeof (textNumber + realNumber)`.", sv: "Logga `typeof (textNumber + realNumber)`." }, requirePattern: /console\.log\s*\(\s*typeof\s*\(\s*textNumber\s*\+\s*realNumber\s*\)\s*\)/ },
            { message: { en: "Log `typeof (textNumber - realNumber)`.", sv: "Logga `typeof (textNumber - realNumber)`." }, requirePattern: /console\.log\s*\(\s*typeof\s*\(\s*textNumber\s*-\s*realNumber\s*\)\s*\)/ },
          ],
          reveal: {
            en:
              'let textNumber = "5";\nlet realNumber = 3;\nconsole.log(typeof textNumber);\nconsole.log(typeof realNumber);\nconsole.log(textNumber + realNumber);\nconsole.log(textNumber - realNumber);\nconsole.log(typeof (textNumber + realNumber));\nconsole.log(typeof (textNumber - realNumber));\n',
            sv:
              'let textNumber = "5";\nlet realNumber = 3;\nconsole.log(typeof textNumber);\nconsole.log(typeof realNumber);\nconsole.log(textNumber + realNumber);\nconsole.log(textNumber - realNumber);\nconsole.log(typeof (textNumber + realNumber));\nconsole.log(typeof (textNumber - realNumber));\n',
          },
        },
      ],
    },

    // ──────────────────────────────────────────────────────────────────
    // Workshop 4 — Strict vs loose equality
    // ──────────────────────────────────────────────────────────────────
    {
      kind: "js-workshop",
      title: { en: "Workshop: strict vs loose equality", sv: "Verkstad: strikt mot lös likhet" },
      prompt: {
        en:
          "`===` cares about type. `==` doesn't — it coerces first, then compares. The result can flip depending on which you pick. See why `===` is the JS rule.",
        sv:
          "`===` bryr sig om typ. `==` gör det inte — den omvandlar först och jämför sedan. Resultatet kan vända beroende på vilken du väljer. Se varför `===` är JS-regeln.",
      },
      designNote:
        "L2 W4. Strict vs loose equality. Distinct from W1 (typeof tour), W2 (bug hunt), and W3 (minus-vs-plus coercion).",
      steps: [
        {
          id: "eq-declare",
          instruction: {
            en:
              "Declare two values that LOOK equal but have different types: `num` as the number `5`, `text` as the string `\"5\"`. Log them both, then log `typeof` of each so you can confirm the types differ.",
            sv:
              "Deklarera två värden som SER lika ut men har olika typer: `num` som talet `5`, `text` som strängen `\"5\"`. Logga båda, logga sedan `typeof` av varje så du kan bekräfta att typerna skiljer sig.",
          },
          hint: {
            en: 'let num = 5;\nlet text = "5";\nconsole.log(num);\nconsole.log(text);\nconsole.log(typeof num);\nconsole.log(typeof text);',
            sv: 'let num = 5;\nlet text = "5";\nconsole.log(num);\nconsole.log(text);\nconsole.log(typeof num);\nconsole.log(typeof text);',
          },
          starterCode: {
            en: "// Declare num (5) and text (\"5\"). Log each, then log typeof of each.\n",
            sv: "// Deklarera num (5) och text (\"5\"). Logga varje, logga sedan typeof av varje.\n",
          },
          checks: [
            { message: { en: "`num` should be the number `5`.", sv: "`num` ska vara talet `5`." }, assert: "return num === 5;" },
            { message: { en: "`text` should be the string `\"5\"`.", sv: "`text` ska vara strängen `\"5\"`." }, assert: "return text === '5';" },
            { message: { en: "Log `typeof num` and `typeof text`.", sv: "Logga `typeof num` och `typeof text`." }, requirePattern: /typeof\s+num[\s\S]*typeof\s+text|typeof\s+text[\s\S]*typeof\s+num/ },
          ],
          reveal: {
            en: 'let num = 5;\nlet text = "5";\nconsole.log(num);\nconsole.log(text);\nconsole.log(typeof num);\nconsole.log(typeof text);\n',
            sv: 'let num = 5;\nlet text = "5";\nconsole.log(num);\nconsole.log(text);\nconsole.log(typeof num);\nconsole.log(typeof text);\n',
          },
        },
        {
          id: "eq-loose",
          instruction: {
            en:
              "Compare them with the loose `==` operator. `console.log(num == text)`. Loose equality COERCES — it converts `\"5\"` to `5` before comparing, so the result is `true`.",
            sv:
              "Jämför dem med den lösa `==`-operatorn. `console.log(num == text)`. Lös likhet OMVANDLAR — den konverterar `\"5\"` till `5` innan den jämför, så resultatet är `true`.",
          },
          hint: {
            en: "console.log(num == text);",
            sv: "console.log(num == text);",
          },
          starterCode: {
            en:
              'let num = 5;\nlet text = "5";\nconsole.log(num);\nconsole.log(text);\nconsole.log(typeof num);\nconsole.log(typeof text);\n// Log num == text (loose).\n',
            sv:
              'let num = 5;\nlet text = "5";\nconsole.log(num);\nconsole.log(text);\nconsole.log(typeof num);\nconsole.log(typeof text);\n// Logga num == text (lös).\n',
          },
          checks: [
            { message: { en: "Log `num == text` using the LOOSE `==` operator.", sv: "Logga `num == text` med den LÖSA `==`-operatorn." }, requirePattern: /console\.log\s*\(\s*num\s*==(?!=)\s*text\s*\)/ },
            { message: { en: "`num == text` should be `true`.", sv: "`num == text` ska vara `true`." }, assert: "return (num == text) === true;" },
          ],
          reveal: {
            en: 'let num = 5;\nlet text = "5";\nconsole.log(num);\nconsole.log(text);\nconsole.log(typeof num);\nconsole.log(typeof text);\nconsole.log(num == text);\n',
            sv: 'let num = 5;\nlet text = "5";\nconsole.log(num);\nconsole.log(text);\nconsole.log(typeof num);\nconsole.log(typeof text);\nconsole.log(num == text);\n',
          },
        },
        {
          id: "eq-strict",
          instruction: {
            en:
              "Now compare with strict `===`. `console.log(num === text)`. Strict equality DOES NOT coerce — it checks both the value AND the type. Since one is `number` and the other is `string`, the result is `false`. This is why `===` is the JS convention.",
            sv:
              "Jämför nu med strikt `===`. `console.log(num === text)`. Strikt likhet OMVANDLAR INTE — den kollar både värdet OCH typen. Eftersom en är `number` och den andra `string` blir resultatet `false`. Därför är `===` JS-konventionen.",
          },
          hint: {
            en: "console.log(num === text);",
            sv: "console.log(num === text);",
          },
          starterCode: {
            en:
              'let num = 5;\nlet text = "5";\nconsole.log(num);\nconsole.log(text);\nconsole.log(typeof num);\nconsole.log(typeof text);\nconsole.log(num == text);\n// Log num === text (strict).\n',
            sv:
              'let num = 5;\nlet text = "5";\nconsole.log(num);\nconsole.log(text);\nconsole.log(typeof num);\nconsole.log(typeof text);\nconsole.log(num == text);\n// Logga num === text (strikt).\n',
          },
          checks: [
            { message: { en: "Log `num === text` using STRICT `===`.", sv: "Logga `num === text` med STRIKT `===`." }, requirePattern: /console\.log\s*\(\s*num\s*===\s*text\s*\)/ },
            { message: { en: "`num === text` should be `false`.", sv: "`num === text` ska vara `false`." }, assert: "return (num === text) === false;" },
          ],
          reveal: {
            en: 'let num = 5;\nlet text = "5";\nconsole.log(num);\nconsole.log(text);\nconsole.log(typeof num);\nconsole.log(typeof text);\nconsole.log(num == text);\nconsole.log(num === text);\n',
            sv: 'let num = 5;\nlet text = "5";\nconsole.log(num);\nconsole.log(text);\nconsole.log(typeof num);\nconsole.log(typeof text);\nconsole.log(num == text);\nconsole.log(num === text);\n',
          },
        },
        {
          id: "eq-zero-false",
          instruction: {
            en:
              "One more surprise: `0` and `false` look unrelated, but loose equality says they're equal. Log `0 == false` (true — both falsy, coerced) and `0 === false` (false — different types). The takeaway: ALWAYS use `===`. It never lies about types.",
            sv:
              "En till överraskning: `0` och `false` ser orelaterade ut, men lös likhet säger att de är lika. Logga `0 == false` (true — båda falsy, omvandlade) och `0 === false` (false — olika typer). Lärdomen: ANVÄND ALLTID `===`. Den ljuger aldrig om typer.",
          },
          hint: {
            en: "console.log(0 == false);\nconsole.log(0 === false);",
            sv: "console.log(0 == false);\nconsole.log(0 === false);",
          },
          starterCode: {
            en:
              'let num = 5;\nlet text = "5";\nconsole.log(num);\nconsole.log(text);\nconsole.log(typeof num);\nconsole.log(typeof text);\nconsole.log(num == text);\nconsole.log(num === text);\n// Log 0 == false and 0 === false.\n',
            sv:
              'let num = 5;\nlet text = "5";\nconsole.log(num);\nconsole.log(text);\nconsole.log(typeof num);\nconsole.log(typeof text);\nconsole.log(num == text);\nconsole.log(num === text);\n// Logga 0 == false och 0 === false.\n',
          },
          checks: [
            { message: { en: "Log `0 == false`.", sv: "Logga `0 == false`." }, requirePattern: /console\.log\s*\(\s*0\s*==(?!=)\s*false\s*\)/ },
            { message: { en: "Log `0 === false`.", sv: "Logga `0 === false`." }, requirePattern: /console\.log\s*\(\s*0\s*===\s*false\s*\)/ },
          ],
          reveal: {
            en: 'let num = 5;\nlet text = "5";\nconsole.log(num);\nconsole.log(text);\nconsole.log(typeof num);\nconsole.log(typeof text);\nconsole.log(num == text);\nconsole.log(num === text);\nconsole.log(0 == false);\nconsole.log(0 === false);\n',
            sv: 'let num = 5;\nlet text = "5";\nconsole.log(num);\nconsole.log(text);\nconsole.log(typeof num);\nconsole.log(typeof text);\nconsole.log(num == text);\nconsole.log(num === text);\nconsole.log(0 == false);\nconsole.log(0 === false);\n',
          },
        },
      ],
    },

    // ──────────────────────────────────────────────────────────────────
    // Exercise 2 — Bug hunt: fix a string-number coercion
    // ──────────────────────────────────────────────────────────────────
    {
      kind: "exercise",
      title: { en: "Lab: bug hunt", sv: "Labb: buggjakt" },
      prompt: {
        en:
          "The starter has a coercion bug: `subtotal` is a string by accident, so `total` ends up as concatenated text instead of a sum. Fix the declaration so `total` is the correct number.\n\n" +
          "User stories:\n" +
          "1. Find and fix the bug — only ONE line in the starter needs to change.\n" +
          "2. After your fix, `subtotal` is a number, not a string.\n" +
          "3. After your fix, `total` is the number `205` (200 + 5).\n" +
          "4. Don't add or remove any logs — leave the existing ones in place.",
        sv:
          "Startkoden har en typkonverterings­bugg: `subtotal` är en sträng av misstag, så `total` blir sammanslagen text istället för en summa. Fixa deklarationen så att `total` blir det korrekta talet.\n\n" +
          "Användarberättelser:\n" +
          "1. Hitta och fixa buggen — endast EN rad i startkoden behöver ändras.\n" +
          "2. Efter fixet är `subtotal` ett tal, inte en sträng.\n" +
          "3. Efter fixet är `total` talet `205` (200 + 5).\n" +
          "4. Lägg inte till eller ta bort några loggar — låt de befintliga vara kvar.",
      },
      starterJs:
        '// Bug: subtotal is a string. Fix the declaration so total is 205, not "2005".\n' +
        'let subtotal = "200";\n' +
        'let shipping = 5;\n' +
        'let total = subtotal + shipping;\n' +
        'console.log(total);\n' +
        'console.log(typeof total);\n',
      tests: [
        {
          label: { en: "`subtotal` is now a number (not a string)", sv: "`subtotal` är nu ett tal (inte en sträng)" },
          assert: "return typeof subtotal === 'number';",
          hint: { en: "Drop the quotes around 200 in the subtotal declaration.", sv: "Ta bort citattecknen runt 200 i deklarationen av subtotal." },
        },
        {
          label: { en: "`total` is the number 205", sv: "`total` är talet 205" },
          assert: "return total === 205;",
          hint: { en: "Once subtotal is a number, total = subtotal + shipping = 200 + 5 = 205.", sv: "När subtotal är ett tal, total = subtotal + shipping = 200 + 5 = 205." },
        },
        {
          label: { en: "Console still shows exactly two lines: `205` and `\"number\"`", sv: "Konsolen visar fortfarande exakt två rader: `205` och `\"number\"`" },
          assert:
            "var c = window.__console || [];" +
            "if (c.length !== 2) return false;" +
            "return c[0].text === '205' && c[1].text === 'number';",
          hint: { en: "Leave the two console.log lines from the starter. After the fix they should print 205 and \"number\".", sv: "Behåll de två console.log-raderna från startkoden. Efter fixet ska de skriva ut 205 och \"number\"." },
        },
      ],
    },

    // ──────────────────────────────────────────────────────────────────
    // Exercise 3 — Predict the result (four distinct coercions)
    // ──────────────────────────────────────────────────────────────────
    {
      kind: "exercise",
      title: { en: "Lab: predict the result", sv: "Labb: förutsäg resultatet" },
      prompt: {
        en:
          "Log four expressions, each producing a different type. Predict each before running. The lab is about UNDERSTANDING how operators bend types.\n\n" +
          "Each line should produce the exact result shown in parentheses:\n" +
          "1. `5 + \"3\"` → `\"53\"` (string, because `+` glues when a string is involved)\n" +
          "2. `\"5\" - 3` → `2` (number, because `-` coerces the string to a number)\n" +
          "3. `true + 1` → `2` (number, because `true` becomes `1`)\n" +
          "4. `\"5\" * 2` → `10` (number, because `*` coerces like `-`)\n\n" +
          "Log each expression in order. Exactly four console.log lines.",
        sv:
          "Logga fyra uttryck, varje ger en annan typ. Förutsäg varje innan du kör. Labben handlar om att FÖRSTÅ hur operatorer böjer typer.\n\n" +
          "Varje rad ska ge exakt det resultat som visas i parenteserna:\n" +
          "1. `5 + \"3\"` → `\"53\"` (sträng, för `+` limmar när en sträng är inblandad)\n" +
          "2. `\"5\" - 3` → `2` (tal, för `-` omvandlar strängen till ett tal)\n" +
          "3. `true + 1` → `2` (tal, för `true` blir `1`)\n" +
          "4. `\"5\" * 2` → `10` (tal, för `*` omvandlar som `-`)\n\n" +
          "Logga varje uttryck i ordning. Exakt fyra console.log-rader.",
      },
      starterJs:
        "// 1. Log 5 + \"3\":\n\n\n" +
        "// 2. Log \"5\" - 3:\n\n\n" +
        "// 3. Log true + 1:\n\n\n" +
        "// 4. Log \"5\" * 2:\n\n",
      tests: [
        {
          label: { en: "Console shows exactly four lines", sv: "Konsolen visar exakt fyra rader" },
          assert: "var c = window.__console || []; return c.length === 4;",
          hint: { en: "Four console.log calls, one per expression.", sv: "Fyra console.log-anrop, ett per uttryck." },
        },
        {
          label: { en: "Lines are \"53\", 2, 2, 10 (in order)", sv: "Raderna är \"53\", 2, 2, 10 (i ordning)" },
          assert:
            "var c = window.__console || [];" +
            "if (c.length < 4) return false;" +
            "return c[0].text === '53' && c[1].text === '2' && c[2].text === '2' && c[3].text === '10';",
          hint: { en: "5 + \"3\" → \"53\"; \"5\" - 3 → 2; true + 1 → 2; \"5\" * 2 → 10.", sv: "5 + \"3\" → \"53\"; \"5\" - 3 → 2; true + 1 → 2; \"5\" * 2 → 10." },
        },
        {
          label: { en: "Each expression appears in the source", sv: "Varje uttryck förekommer i källkoden" },
          assert:
            "var src = window.__userSrc || '';" +
            "if (!/5\\s*\\+\\s*[\"']3[\"']/.test(src)) return false;" +
            "if (!/[\"']5[\"']\\s*-\\s*3/.test(src)) return false;" +
            "if (!/\\btrue\\s*\\+\\s*1\\b/.test(src)) return false;" +
            "return /[\"']5[\"']\\s*\\*\\s*2/.test(src);",
          hint: { en: "Use the four expressions exactly as written in the prompt.", sv: "Använd de fyra uttrycken exakt som de står i instruktionen." },
        },
      ],
    },

    // ──────────────────────────────────────────────────────────────────
    // Exercise 4 — Strict vs loose equality
    // ──────────────────────────────────────────────────────────────────
    {
      kind: "exercise",
      title: { en: "Lab: strict vs loose equality", sv: "Labb: strikt mot lös likhet" },
      prompt: {
        en:
          "Log four comparisons that show how `==` and `===` disagree. Each pair has the SAME operands but a different operator — and the answers flip.\n\n" +
          "Each line should produce the exact result shown in parentheses:\n" +
          "1. `5 === \"5\"` → `false` (strict: different types)\n" +
          "2. `5 == \"5\"` → `true` (loose: coerces, then compares)\n" +
          "3. `0 === false` → `false` (strict: different types)\n" +
          "4. `0 == false` → `true` (loose: both falsy, treated as equal)\n\n" +
          "Log each comparison in order. Exactly four console.log lines.",
        sv:
          "Logga fyra jämförelser som visar hur `==` och `===` är oense. Varje par har SAMMA operander men olika operator — och svaren vänder.\n\n" +
          "Varje rad ska ge exakt det resultat som visas i parenteserna:\n" +
          "1. `5 === \"5\"` → `false` (strikt: olika typer)\n" +
          "2. `5 == \"5\"` → `true` (lös: omvandlar, jämför sedan)\n" +
          "3. `0 === false` → `false` (strikt: olika typer)\n" +
          "4. `0 == false` → `true` (lös: båda falsy, behandlas som lika)\n\n" +
          "Logga varje jämförelse i ordning. Exakt fyra console.log-rader.",
      },
      starterJs:
        "// 1. Log 5 === \"5\":\n\n\n" +
        "// 2. Log 5 == \"5\":\n\n\n" +
        "// 3. Log 0 === false:\n\n\n" +
        "// 4. Log 0 == false:\n\n",
      tests: [
        {
          label: { en: "Console shows exactly four lines", sv: "Konsolen visar exakt fyra rader" },
          assert: "var c = window.__console || []; return c.length === 4;",
          hint: { en: "Four console.log calls, one per comparison.", sv: "Fyra console.log-anrop, ett per jämförelse." },
        },
        {
          label: { en: "Lines are false, true, false, true (in order)", sv: "Raderna är false, true, false, true (i ordning)" },
          assert:
            "var c = window.__console || [];" +
            "if (c.length < 4) return false;" +
            "return c[0].text === 'false' && c[1].text === 'true' && c[2].text === 'false' && c[3].text === 'true';",
          hint: { en: "Strict (===) flips false; loose (==) flips true. Stick to the order in the prompt.", sv: "Strikt (===) ger false; lös (==) ger true. Håll dig till ordningen i instruktionen." },
        },
        {
          label: { en: "Code uses both `===` and `==`", sv: "Koden använder både `===` och `==`" },
          assert:
            "var src = window.__userSrc || '';" +
            "if (!/===/.test(src)) return false;" +
            // == that is not === : negative lookbehind for = and negative lookahead for =
            "return /(?<!=)==(?!=)/.test(src);",
          hint: { en: "Use `===` for the strict comparisons and `==` for the loose ones — exactly as written in the prompt.", sv: "Använd `===` för de strikta jämförelserna och `==` för de lösa — exakt som i instruktionen." },
        },
      ],
    },
  ],
};
