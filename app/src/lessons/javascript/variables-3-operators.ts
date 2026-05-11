import type { Lesson } from "../../types";
import { codePanelStyle, noteBoxStyle } from "./_shared";

export const operatorsLesson: Lesson = {
  id: "variables-operators",
  title: { en: "3. Operators — doing things to values", sv: "3. Operatorer — göra saker med värden" },
  summary: {
    en: "Arithmetic for numbers and comparisons that return booleans.",
    sv: "Aritmetik för tal och jämförelser som ger booleans.",
  },
  slides: [
    // 1. Intro — arithmetic
    {
      kind: "explanation",
      title: { en: "Arithmetic operators", sv: "Aritmetiska operatorer" },
      intro: {
        en:
          "Five operators do basic math: + (add), - (subtract), * (multiply), / (divide), % (remainder).",
        sv:
          "Fem operatorer gör grundläggande matte: + (plus), - (minus), * (gånger), / (dela), % (rest).",
      },
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
          label: {
            en:
              "% is called modulo. It gives the LEFTOVER\nafter integer division.\n\n10 ÷ 4 = 2 remainder 2 → 10 % 4 = 2.\nIt's perfect for the 'is this even?' test.",
            sv:
              "% heter modulo. Det ger RESTEN\nefter heltalsdivision.\n\n10 ÷ 4 = 2 rest 2 → 10 % 4 = 2.\nPerfekt för 'är detta jämnt?'-testet.",
          },
          baseStyle: { ...noteBoxStyle, marginTop: 16 },
        },
      ],
      steps: [
        {
          narration: {
            en:
              "+ adds. - subtracts. * multiplies. / divides.\nNothing surprising — just like a calculator.",
            sv:
              "+ adderar. - subtraherar. * multiplicerar. / dividerar.\nInget oväntat — precis som en miniräknare.",
          },
        },
        {
          narration: {
            en:
              "% is the only one new to most beginners.\nIt asks: what's left over after we divide?",
            sv:
              "% är den enda som är ny för de flesta nybörjare.\nDen frågar: vad blir kvar efter vi dividerat?",
          },
          tokenHighlight: ["%"],
        },
        {
          narration: {
            en:
              "% has a famous use: `n % 2` is 0 when n is even, 1 when n is odd.\nWe'll use that in a moment.",
            sv:
              "% har en känd användning: `n % 2` är 0 när n är jämnt, 1 när n är udda.\nVi använder det strax.",
          },
        },
      ],
    },

    // 2. Comparison operators
    {
      kind: "explanation",
      title: { en: "Comparison — questions, not commands", sv: "Jämförelser — frågor, inte besked" },
      intro: {
        en:
          "Comparison operators ASK about values. The answer is always a boolean (true or false).",
        sv:
          "Jämförelseoperatorer FRÅGAR om värden. Svaret är alltid en boolean (true eller false).",
      },
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
          label: {
            en:
              "Use === and !==,\nnot == and !=.\nThe strict version checks the type too,\nso 10 === \"10\" is false.",
            sv:
              "Använd === och !==,\ninte == och !=.\nDen strikta versionen kollar typen också,\nså 10 === \"10\" är false.",
          },
          baseStyle: { ...noteBoxStyle, marginTop: 16 },
        },
      ],
      steps: [
        {
          narration: {
            en:
              "> < >= <= compare numerically.\nGreater than, less than, greater-or-equal, less-or-equal.",
            sv:
              "> < >= <= jämför numeriskt.\nStörre än, mindre än, större-eller-lika, mindre-eller-lika.",
          },
        },
        {
          narration: {
            en:
              "=== asks 'are these EXACTLY the same — same value AND same type?'.\n!== is the opposite.",
            sv:
              "=== frågar 'är dessa EXAKT lika — samma värde OCH samma typ?'.\n!== är motsatsen.",
          },
          tokenHighlight: ["===", "!=="],
        },
        {
          narration: {
            en:
              "Important: a comparison's result is ALWAYS a boolean.\nThat's how we get conditions for if-statements (next chapter).",
            sv:
              "Viktigt: en jämförelses resultat är ALLTID en boolean.\nDet är så vi får villkor för if-satser (nästa kapitel).",
          },
        },
      ],
    },

    // 3. Chip practice
    {
      kind: "js-chip-assignment",
      title: { en: "Practice: pick the right operator", sv: "Övning: välj rätt operator" },
      prompt: {
        en:
          "Match each phrase to the operator that does the job.",
        sv:
          "Matcha varje fras med operatorn som gör jobbet.",
      },
      puzzles: [
        // p1: % for remainder
        {
          prompt: {
            en: "Which operator gives the REMAINDER of a division?",
            sv: "Vilken operator ger RESTEN av en division?",
          },
          template: "let leftover = 10 [[]] 3;   // 1",
          chips: ["%", "/", "*", "-"],
          solution: ["%"],
        },
        // p2: * multiplication
        {
          prompt: {
            en: "Which operator multiplies?",
            sv: "Vilken operator multiplicerar?",
          },
          template: "let area = width [[]] height;",
          chips: ["*", "x", "+", "/"],
          solution: ["*"],
        },
        // p3: >= comparison
        {
          prompt: {
            en: "Which comparison asks 'greater than OR equal to'?",
            sv: "Vilken jämförelse frågar 'större än ELLER lika med'?",
          },
          template: "let canDrive = age [[]] 18;",
          chips: [">=", ">", "<=", "==="],
          solution: [">="],
        },
        // p4: === strict equality
        {
          intro: {
            en: "Strict equality — type matters.",
            sv: "Strikt likhet — typen spelar roll.",
          },
          prompt: {
            en: "Which operator asks 'exactly equal — same value AND type'?",
            sv: "Vilken operator frågar 'exakt lika — samma värde OCH typ'?",
          },
          template: 'let exactMatch = code [[]] "ABC";',
          chips: ["===", "==", "=", "!=="],
          solution: ["==="],
        },
        // p5: synthesis — even check
        {
          prompt: {
            en: "Build the 'is even?' check — number mod 2 equals 0.",
            sv: "Bygg 'är jämnt?'-kollen — tal mod 2 lika med 0.",
          },
          template: "let isEven = n [[]] 2 [[]] 0;",
          chips: ["%", "===", "/", "==", "*"],
          solution: ["%", "==="],
        },
      ],
      legend: [
        {
          name: { en: "%", sv: "%" },
          syntax: "a % b",
          example: "10 % 3 → 1",
          note: {
            en: "The remainder after integer division.",
            sv: "Resten efter heltalsdivision.",
          },
        },
        {
          name: { en: "===", sv: "===" },
          syntax: "a === b",
          example: '10 === "10" → false',
          note: {
            en: "Strict equality — same value AND same type.",
            sv: "Strikt likhet — samma värde OCH samma typ.",
          },
        },
      ],
    },

    // 4. Workshop — 4 steps
    {
      kind: "js-workshop",
      title: { en: "Workshop: simple math and checks", sv: "Verkstad: enkel matte och kontroller" },
      prompt: {
        en:
          "Compute a few values and a few comparisons. Each step is one line.",
        sv:
          "Beräkna ett par värden och ett par jämförelser. Varje steg är en rad.",
      },
      designNote:
        "Variables L3 workshop. Four steps: a subtraction, a modulo even-check, a > comparison, a strict !==. Surface: shopping/age check theme; deliberate mix of arithmetic and comparison to show the boolean result.",
      steps: [
        {
          id: "ops-subtract",
          instruction: {
            en:
              "Declare `let total = 100 - 25;` and log it. The result should be 75.",
            sv:
              "Deklarera `let total = 100 - 25;` och logga den. Resultatet ska vara 75.",
          },
          starterCode: {
            en: "// Declare total and log it.\n",
            sv: "// Deklarera total och logga den.\n",
          },
          checks: [
            {
              message: {
                en: "Use `let` to declare `total = 100 - 25`.",
                sv: "Använd `let` för att deklarera `total = 100 - 25`.",
              },
              requirePattern: /\blet\s+total\s*=\s*100\s*-\s*25\b/,
            },
            {
              message: {
                en: "`total` should equal 75.",
                sv: "`total` ska vara 75.",
              },
              assert: "return total === 75;",
            },
            {
              message: {
                en: "Log `total` with `console.log`.",
                sv: "Logga `total` med `console.log`.",
              },
              requirePattern: /console\.log\s*\(\s*total\s*\)/,
            },
          ],
          reveal: {
            en: "let total = 100 - 25;\nconsole.log(total);\n",
            sv: "let total = 100 - 25;\nconsole.log(total);\n",
          },
        },
        {
          id: "ops-modulo-even",
          instruction: {
            en:
              "Below that, declare `let isEven = 8 % 2 === 0;` and log it. The result should be a boolean.",
            sv:
              "Under det, deklarera `let isEven = 8 % 2 === 0;` och logga den. Resultatet ska vara en boolean.",
          },
          starterCode: {
            en:
              "let total = 100 - 25;\nconsole.log(total);\n// Declare isEven and log it.\n",
            sv:
              "let total = 100 - 25;\nconsole.log(total);\n// Deklarera isEven och logga den.\n",
          },
          checks: [
            {
              message: {
                en: "Use `%` and `===` in the expression assigned to `isEven`.",
                sv: "Använd `%` och `===` i uttrycket som tilldelas `isEven`.",
              },
              requirePattern: /\blet\s+isEven\s*=\s*8\s*%\s*2\s*===\s*0\b/,
            },
            {
              message: {
                en: "`isEven` should be the boolean true.",
                sv: "`isEven` ska vara boolean true.",
              },
              assert: "return isEven === true;",
            },
            {
              message: {
                en: "Log `isEven` with `console.log`.",
                sv: "Logga `isEven` med `console.log`.",
              },
              requirePattern: /console\.log\s*\(\s*isEven\s*\)/,
            },
          ],
          reveal: {
            en:
              "let total = 100 - 25;\nconsole.log(total);\nlet isEven = 8 % 2 === 0;\nconsole.log(isEven);\n",
            sv:
              "let total = 100 - 25;\nconsole.log(total);\nlet isEven = 8 % 2 === 0;\nconsole.log(isEven);\n",
          },
        },
        {
          id: "ops-greater-than",
          instruction: {
            en:
              "Declare `let bigger = 10 > 5;` and log it. The result is a boolean.",
            sv:
              "Deklarera `let bigger = 10 > 5;` och logga den. Resultatet är en boolean.",
          },
          starterCode: {
            en:
              "let total = 100 - 25;\nconsole.log(total);\nlet isEven = 8 % 2 === 0;\nconsole.log(isEven);\n// Declare bigger and log it.\n",
            sv:
              "let total = 100 - 25;\nconsole.log(total);\nlet isEven = 8 % 2 === 0;\nconsole.log(isEven);\n// Deklarera bigger och logga den.\n",
          },
          checks: [
            {
              message: {
                en: "Use `>` to compare 10 and 5.",
                sv: "Använd `>` för att jämföra 10 och 5.",
              },
              requirePattern: /\blet\s+bigger\s*=\s*10\s*>\s*5\b/,
            },
            {
              message: {
                en: "`bigger` should be true.",
                sv: "`bigger` ska vara true.",
              },
              assert: "return bigger === true;",
            },
            {
              message: {
                en: "Log `bigger`.",
                sv: "Logga `bigger`.",
              },
              requirePattern: /console\.log\s*\(\s*bigger\s*\)/,
            },
          ],
          reveal: {
            en:
              "let total = 100 - 25;\nconsole.log(total);\nlet isEven = 8 % 2 === 0;\nconsole.log(isEven);\nlet bigger = 10 > 5;\nconsole.log(bigger);\n",
            sv:
              "let total = 100 - 25;\nconsole.log(total);\nlet isEven = 8 % 2 === 0;\nconsole.log(isEven);\nlet bigger = 10 > 5;\nconsole.log(bigger);\n",
          },
        },
        {
          id: "ops-strict-not-equal",
          instruction: {
            en:
              "Declare `let typeMatters = 10 === \"10\";` and log it. The strict check sees that the types differ.",
            sv:
              "Deklarera `let typeMatters = 10 === \"10\";` och logga den. Den strikta kollen ser att typerna skiljer sig.",
          },
          starterCode: {
            en:
              "let total = 100 - 25;\nconsole.log(total);\nlet isEven = 8 % 2 === 0;\nconsole.log(isEven);\nlet bigger = 10 > 5;\nconsole.log(bigger);\n// Declare typeMatters and log it.\n",
            sv:
              "let total = 100 - 25;\nconsole.log(total);\nlet isEven = 8 % 2 === 0;\nconsole.log(isEven);\nlet bigger = 10 > 5;\nconsole.log(bigger);\n// Deklarera typeMatters och logga den.\n",
          },
          checks: [
            {
              message: {
                en: "Use `===` to compare `10` and `\"10\"`.",
                sv: "Använd `===` för att jämföra `10` och `\"10\"`.",
              },
              requirePattern: /\blet\s+typeMatters\s*=\s*10\s*===\s*["']10["']/,
            },
            {
              message: {
                en: "`typeMatters` should be false — different types don't match strictly.",
                sv: "`typeMatters` ska vara false — olika typer matchar inte strikt.",
              },
              assert: "return typeMatters === false;",
            },
            {
              message: {
                en: "Log `typeMatters`.",
                sv: "Logga `typeMatters`.",
              },
              requirePattern: /console\.log\s*\(\s*typeMatters\s*\)/,
            },
          ],
          reveal: {
            en:
              "let total = 100 - 25;\nconsole.log(total);\nlet isEven = 8 % 2 === 0;\nconsole.log(isEven);\nlet bigger = 10 > 5;\nconsole.log(bigger);\nlet typeMatters = 10 === \"10\";\nconsole.log(typeMatters);\n",
            sv:
              "let total = 100 - 25;\nconsole.log(total);\nlet isEven = 8 % 2 === 0;\nconsole.log(isEven);\nlet bigger = 10 > 5;\nconsole.log(bigger);\nlet typeMatters = 10 === \"10\";\nconsole.log(typeMatters);\n",
          },
        },
      ],
      legend: [
        {
          name: { en: "%", sv: "%" },
          syntax: "a % b",
          example: "8 % 2 → 0",
          note: {
            en: "Remainder. n % 2 is 0 for even, 1 for odd.",
            sv: "Rest. n % 2 är 0 för jämna, 1 för udda.",
          },
        },
        {
          name: { en: "===", sv: "===" },
          syntax: "a === b",
          example: '10 === "10" → false',
          note: {
            en: "Strict equality — both value AND type must match.",
            sv: "Strikt likhet — både värde OCH typ måste matcha.",
          },
        },
      ],
    },

    // 5. Exercise
    {
      kind: "exercise",
      title: { en: "Lab: math and answers", sv: "Labb: matte och svar" },
      prompt: {
        en:
          "Compute and log four small answers.\n\n" +
          "User stories:\n" +
          "1. Log the result of 10 % 3 (the remainder).\n" +
          "2. Log the result of 7 * 8.\n" +
          "3. Log the result of the comparison 10 > 5 (a boolean).\n" +
          "4. Log the result of the comparison 10 === \"10\" (a boolean).\n\n" +
          "Exactly four console.log lines, in this order.",
        sv:
          "Beräkna och logga fyra små svar.\n\n" +
          "Användarberättelser:\n" +
          "1. Logga resultatet av 10 % 3 (resten).\n" +
          "2. Logga resultatet av 7 * 8.\n" +
          "3. Logga resultatet av jämförelsen 10 > 5 (en boolean).\n" +
          "4. Logga resultatet av jämförelsen 10 === \"10\" (en boolean).\n\n" +
          "Exakt fyra console.log-rader, i den ordningen.",
      },
      starterJs:
        "// 1. Log 10 % 3:\n\n\n" +
        "// 2. Log 7 * 8:\n\n\n" +
        "// 3. Log 10 > 5:\n\n\n" +
        "// 4. Log 10 === \"10\":\n\n",
      tests: [
        {
          label: {
            en: "Console shows exactly four lines",
            sv: "Konsolen visar exakt fyra rader",
          },
          assert:
            "var c = window.__console || []; return c.length === 4;",
          hint: {
            en: "Four console.log calls — one per user story.",
            sv: "Fyra console.log-anrop — ett per användarberättelse.",
          },
        },
        {
          label: {
            en: "First line is 1 (10 % 3) and second is 56 (7 * 8)",
            sv: "Första raden är 1 (10 % 3) och andra är 56 (7 * 8)",
          },
          assert:
            "var c = window.__console || [];" +
            "if (c.length < 2) return false;" +
            "return c[0].text === '1' && c[1].text === '56';",
          hint: {
            en: "Use console.log with the actual expressions — no quotes around them.",
            sv: "Använd console.log med själva uttrycken — inga citattecken runt dem.",
          },
        },
        {
          label: {
            en: "Third line is true (10 > 5)",
            sv: "Tredje raden är true (10 > 5)",
          },
          assert:
            "var c = window.__console || [];" +
            "if (c.length < 3) return false;" +
            "return c[2].text === 'true';",
          hint: {
            en: "console.log(10 > 5) — the result is the boolean true.",
            sv: "console.log(10 > 5) — resultatet är boolean true.",
          },
        },
        {
          label: {
            en: "Fourth line is false (10 === \"10\")",
            sv: "Fjärde raden är false (10 === \"10\")",
          },
          assert:
            "var c = window.__console || [];" +
            "if (c.length < 4) return false;" +
            "return c[3].text === 'false';",
          hint: {
            en: "Strict equality compares types too — number 10 and string \"10\" are not strictly equal.",
            sv: "Strikt likhet jämför typer också — talet 10 och strängen \"10\" är inte strikt lika.",
          },
        },
      ],
    },

    // ──────────────────────────────────────────────────────────────────
    // Workshop 2 — Tip calculator (* and +)
    // ──────────────────────────────────────────────────────────────────
    {
      kind: "js-workshop",
      title: { en: "Workshop: tip calculator", sv: "Verkstad: dricks­räknare" },
      prompt: {
        en:
          "Compute a tip and a final total. Then compare to a budget threshold.",
        sv:
          "Beräkna dricks och slutsumma. Jämför sedan mot ett budget­tröskelvärde.",
      },
      designNote:
        "L3 W2. Surface: tip calculator. Touches *, +, > on numbers. Different scenario from W1's plain math.",
      steps: [
        {
          id: "tip-bill",
          instruction: { en: "Declare `let bill = 200;` and log it.", sv: "Deklarera `let bill = 200;` och logga den." },
          starterCode: { en: "// Declare bill and log it.\n", sv: "// Deklarera bill och logga den.\n" },
          checks: [
            { message: { en: "Use `let bill = 200`.", sv: "Använd `let bill = 200`." }, requirePattern: /\blet\s+bill\s*=\s*200\b/ },
            { message: { en: "Log `bill`.", sv: "Logga `bill`." }, requirePattern: /console\.log\s*\(\s*bill\s*\)/ },
          ],
          reveal: { en: "let bill = 200;\nconsole.log(bill);\n", sv: "let bill = 200;\nconsole.log(bill);\n" },
        },
        {
          id: "tip-amount",
          instruction: { en: "Declare `let tip = bill * 0.15;` and log it. The tip should be 30.", sv: "Deklarera `let tip = bill * 0.15;` och logga den. Dricksen ska bli 30." },
          starterCode: {
            en: "let bill = 200;\nconsole.log(bill);\n// Declare tip and log it.\n",
            sv: "let bill = 200;\nconsole.log(bill);\n// Deklarera tip och logga den.\n",
          },
          checks: [
            { message: { en: "Use `bill * 0.15`.", sv: "Använd `bill * 0.15`." }, requirePattern: /\blet\s+tip\s*=\s*bill\s*\*\s*0\.15\b/ },
            { message: { en: "`tip` should equal 30.", sv: "`tip` ska vara 30." }, assert: "return tip === 30;" },
            { message: { en: "Log `tip`.", sv: "Logga `tip`." }, requirePattern: /console\.log\s*\(\s*tip\s*\)/ },
          ],
          reveal: {
            en: "let bill = 200;\nconsole.log(bill);\nlet tip = bill * 0.15;\nconsole.log(tip);\n",
            sv: "let bill = 200;\nconsole.log(bill);\nlet tip = bill * 0.15;\nconsole.log(tip);\n",
          },
        },
        {
          id: "tip-total",
          instruction: { en: "Declare `let total = bill + tip;` and log it. Should be 230.", sv: "Deklarera `let total = bill + tip;` och logga den. Ska bli 230." },
          starterCode: {
            en: "let bill = 200;\nconsole.log(bill);\nlet tip = bill * 0.15;\nconsole.log(tip);\n// Declare total and log it.\n",
            sv: "let bill = 200;\nconsole.log(bill);\nlet tip = bill * 0.15;\nconsole.log(tip);\n// Deklarera total och logga den.\n",
          },
          checks: [
            { message: { en: "Use `bill + tip`.", sv: "Använd `bill + tip`." }, requirePattern: /\blet\s+total\s*=\s*bill\s*\+\s*tip\b/ },
            { message: { en: "`total` should equal 230.", sv: "`total` ska vara 230." }, assert: "return total === 230;" },
            { message: { en: "Log `total`.", sv: "Logga `total`." }, requirePattern: /console\.log\s*\(\s*total\s*\)/ },
          ],
          reveal: {
            en: "let bill = 200;\nconsole.log(bill);\nlet tip = bill * 0.15;\nconsole.log(tip);\nlet total = bill + tip;\nconsole.log(total);\n",
            sv: "let bill = 200;\nconsole.log(bill);\nlet tip = bill * 0.15;\nconsole.log(tip);\nlet total = bill + tip;\nconsole.log(total);\n",
          },
        },
        {
          id: "tip-budget",
          instruction: {
            en: "Compare against a 250 budget: declare `let underBudget = total < 250;` and log the boolean.",
            sv: "Jämför mot en budget på 250: deklarera `let underBudget = total < 250;` och logga boolean.",
          },
          starterCode: {
            en: "let bill = 200;\nconsole.log(bill);\nlet tip = bill * 0.15;\nconsole.log(tip);\nlet total = bill + tip;\nconsole.log(total);\n// Declare underBudget and log it.\n",
            sv: "let bill = 200;\nconsole.log(bill);\nlet tip = bill * 0.15;\nconsole.log(tip);\nlet total = bill + tip;\nconsole.log(total);\n// Deklarera underBudget och logga den.\n",
          },
          checks: [
            { message: { en: "Use `total < 250`.", sv: "Använd `total < 250`." }, requirePattern: /\blet\s+underBudget\s*=\s*total\s*<\s*250\b/ },
            { message: { en: "`underBudget` should be true.", sv: "`underBudget` ska vara true." }, assert: "return underBudget === true;" },
            { message: { en: "Log `underBudget`.", sv: "Logga `underBudget`." }, requirePattern: /console\.log\s*\(\s*underBudget\s*\)/ },
          ],
          reveal: {
            en: "let bill = 200;\nconsole.log(bill);\nlet tip = bill * 0.15;\nconsole.log(tip);\nlet total = bill + tip;\nconsole.log(total);\nlet underBudget = total < 250;\nconsole.log(underBudget);\n",
            sv: "let bill = 200;\nconsole.log(bill);\nlet tip = bill * 0.15;\nconsole.log(tip);\nlet total = bill + tip;\nconsole.log(total);\nlet underBudget = total < 250;\nconsole.log(underBudget);\n",
          },
        },
      ],
    },

    // ──────────────────────────────────────────────────────────────────
    // Workshop 3 — Even / odd classifier (% focus)
    // ──────────────────────────────────────────────────────────────────
    {
      kind: "js-workshop",
      title: { en: "Workshop: even or odd?", sv: "Verkstad: jämnt eller udda?" },
      prompt: {
        en:
          "Use the modulo operator to classify a number as even or odd.",
        sv:
          "Använd modulo-operatorn för att avgöra om ett tal är jämnt eller udda.",
      },
      designNote:
        "L3 W3. Surface: even/odd classifier. Heavy focus on % and ===.",
      steps: [
        {
          id: "evenodd-n",
          instruction: { en: "Declare `let n = 7;` and log it.", sv: "Deklarera `let n = 7;` och logga den." },
          starterCode: { en: "// Declare n and log it.\n", sv: "// Deklarera n och logga den.\n" },
          checks: [
            { message: { en: "Use `let n = 7`.", sv: "Använd `let n = 7`." }, requirePattern: /\blet\s+n\s*=\s*7\b/ },
            { message: { en: "Log `n`.", sv: "Logga `n`." }, requirePattern: /console\.log\s*\(\s*n\s*\)/ },
          ],
          reveal: { en: "let n = 7;\nconsole.log(n);\n", sv: "let n = 7;\nconsole.log(n);\n" },
        },
        {
          id: "evenodd-remainder",
          instruction: {
            en: "Declare `let remainder = n % 2;` and log it. For 7, the remainder is 1.",
            sv: "Deklarera `let remainder = n % 2;` och logga den. För 7 blir resten 1.",
          },
          starterCode: {
            en: "let n = 7;\nconsole.log(n);\n// Declare remainder and log it.\n",
            sv: "let n = 7;\nconsole.log(n);\n// Deklarera remainder och logga den.\n",
          },
          checks: [
            { message: { en: "Use `n % 2`.", sv: "Använd `n % 2`." }, requirePattern: /\blet\s+remainder\s*=\s*n\s*%\s*2\b/ },
            { message: { en: "`remainder` should equal 1.", sv: "`remainder` ska vara 1." }, assert: "return remainder === 1;" },
            { message: { en: "Log `remainder`.", sv: "Logga `remainder`." }, requirePattern: /console\.log\s*\(\s*remainder\s*\)/ },
          ],
          reveal: {
            en: "let n = 7;\nconsole.log(n);\nlet remainder = n % 2;\nconsole.log(remainder);\n",
            sv: "let n = 7;\nconsole.log(n);\nlet remainder = n % 2;\nconsole.log(remainder);\n",
          },
        },
        {
          id: "evenodd-isodd",
          instruction: {
            en: "Declare `let isOdd = remainder === 1;` and log it. The boolean is true.",
            sv: "Deklarera `let isOdd = remainder === 1;` och logga den. Boolean blir true.",
          },
          starterCode: {
            en: "let n = 7;\nconsole.log(n);\nlet remainder = n % 2;\nconsole.log(remainder);\n// Declare isOdd and log it.\n",
            sv: "let n = 7;\nconsole.log(n);\nlet remainder = n % 2;\nconsole.log(remainder);\n// Deklarera isOdd och logga den.\n",
          },
          checks: [
            { message: { en: "Use `remainder === 1`.", sv: "Använd `remainder === 1`." }, requirePattern: /\blet\s+isOdd\s*=\s*remainder\s*===\s*1\b/ },
            { message: { en: "`isOdd` should be true.", sv: "`isOdd` ska vara true." }, assert: "return isOdd === true;" },
            { message: { en: "Log `isOdd`.", sv: "Logga `isOdd`." }, requirePattern: /console\.log\s*\(\s*isOdd\s*\)/ },
          ],
          reveal: {
            en: "let n = 7;\nconsole.log(n);\nlet remainder = n % 2;\nconsole.log(remainder);\nlet isOdd = remainder === 1;\nconsole.log(isOdd);\n",
            sv: "let n = 7;\nconsole.log(n);\nlet remainder = n % 2;\nconsole.log(remainder);\nlet isOdd = remainder === 1;\nconsole.log(isOdd);\n",
          },
        },
        {
          id: "evenodd-iseven",
          instruction: {
            en: "Declare `let isEven = n % 2 === 0;` and log it. For 7, this is false — collapsing two operators into one expression.",
            sv: "Deklarera `let isEven = n % 2 === 0;` och logga den. För 7 blir det false — två operatorer i samma uttryck.",
          },
          starterCode: {
            en: "let n = 7;\nconsole.log(n);\nlet remainder = n % 2;\nconsole.log(remainder);\nlet isOdd = remainder === 1;\nconsole.log(isOdd);\n// Declare isEven and log it.\n",
            sv: "let n = 7;\nconsole.log(n);\nlet remainder = n % 2;\nconsole.log(remainder);\nlet isOdd = remainder === 1;\nconsole.log(isOdd);\n// Deklarera isEven och logga den.\n",
          },
          checks: [
            { message: { en: "Use `n % 2 === 0`.", sv: "Använd `n % 2 === 0`." }, requirePattern: /\blet\s+isEven\s*=\s*n\s*%\s*2\s*===\s*0\b/ },
            { message: { en: "`isEven` should be false.", sv: "`isEven` ska vara false." }, assert: "return isEven === false;" },
            { message: { en: "Log `isEven`.", sv: "Logga `isEven`." }, requirePattern: /console\.log\s*\(\s*isEven\s*\)/ },
          ],
          reveal: {
            en: "let n = 7;\nconsole.log(n);\nlet remainder = n % 2;\nconsole.log(remainder);\nlet isOdd = remainder === 1;\nconsole.log(isOdd);\nlet isEven = n % 2 === 0;\nconsole.log(isEven);\n",
            sv: "let n = 7;\nconsole.log(n);\nlet remainder = n % 2;\nconsole.log(remainder);\nlet isOdd = remainder === 1;\nconsole.log(isOdd);\nlet isEven = n % 2 === 0;\nconsole.log(isEven);\n",
          },
        },
      ],
    },

    // ──────────────────────────────────────────────────────────────────
    // Workshop 4 — Threshold check (>=, ===)
    // ──────────────────────────────────────────────────────────────────
    {
      kind: "js-workshop",
      title: { en: "Workshop: threshold check", sv: "Verkstad: tröskel­koll" },
      prompt: {
        en:
          "Compare a temperature against a few thresholds and notice how strict equality treats type.",
        sv:
          "Jämför en temperatur mot några tröskelvärden och se hur strikt likhet hanterar typ.",
      },
      designNote:
        "L3 W4. Surface: thresholds. Touches >=, ===, and the type-strictness corner of ===.",
      steps: [
        {
          id: "thresh-temp",
          instruction: { en: "Declare `let temperature = 24;` and log it.", sv: "Deklarera `let temperature = 24;` och logga den." },
          starterCode: { en: "// Declare temperature and log it.\n", sv: "// Deklarera temperature och logga den.\n" },
          checks: [
            { message: { en: "Use `let temperature = 24`.", sv: "Använd `let temperature = 24`." }, requirePattern: /\blet\s+temperature\s*=\s*24\b/ },
            { message: { en: "Log `temperature`.", sv: "Logga `temperature`." }, requirePattern: /console\.log\s*\(\s*temperature\s*\)/ },
          ],
          reveal: { en: "let temperature = 24;\nconsole.log(temperature);\n", sv: "let temperature = 24;\nconsole.log(temperature);\n" },
        },
        {
          id: "thresh-iswarm",
          instruction: { en: "Declare `let isWarm = temperature >= 20;` and log it.", sv: "Deklarera `let isWarm = temperature >= 20;` och logga den." },
          starterCode: {
            en: "let temperature = 24;\nconsole.log(temperature);\n// Declare isWarm and log it.\n",
            sv: "let temperature = 24;\nconsole.log(temperature);\n// Deklarera isWarm och logga den.\n",
          },
          checks: [
            { message: { en: "Use `temperature >= 20`.", sv: "Använd `temperature >= 20`." }, requirePattern: /\blet\s+isWarm\s*=\s*temperature\s*>=\s*20\b/ },
            { message: { en: "`isWarm` should be true.", sv: "`isWarm` ska vara true." }, assert: "return isWarm === true;" },
            { message: { en: "Log `isWarm`.", sv: "Logga `isWarm`." }, requirePattern: /console\.log\s*\(\s*isWarm\s*\)/ },
          ],
          reveal: {
            en: "let temperature = 24;\nconsole.log(temperature);\nlet isWarm = temperature >= 20;\nconsole.log(isWarm);\n",
            sv: "let temperature = 24;\nconsole.log(temperature);\nlet isWarm = temperature >= 20;\nconsole.log(isWarm);\n",
          },
        },
        {
          id: "thresh-isexact",
          instruction: { en: "Declare `let isExact = temperature === 24;` and log it.", sv: "Deklarera `let isExact = temperature === 24;` och logga den." },
          starterCode: {
            en: "let temperature = 24;\nconsole.log(temperature);\nlet isWarm = temperature >= 20;\nconsole.log(isWarm);\n// Declare isExact and log it.\n",
            sv: "let temperature = 24;\nconsole.log(temperature);\nlet isWarm = temperature >= 20;\nconsole.log(isWarm);\n// Deklarera isExact och logga den.\n",
          },
          checks: [
            { message: { en: "Use `temperature === 24`.", sv: "Använd `temperature === 24`." }, requirePattern: /\blet\s+isExact\s*=\s*temperature\s*===\s*24\b/ },
            { message: { en: "`isExact` should be true.", sv: "`isExact` ska vara true." }, assert: "return isExact === true;" },
            { message: { en: "Log `isExact`.", sv: "Logga `isExact`." }, requirePattern: /console\.log\s*\(\s*isExact\s*\)/ },
          ],
          reveal: {
            en: "let temperature = 24;\nconsole.log(temperature);\nlet isWarm = temperature >= 20;\nconsole.log(isWarm);\nlet isExact = temperature === 24;\nconsole.log(isExact);\n",
            sv: "let temperature = 24;\nconsole.log(temperature);\nlet isWarm = temperature >= 20;\nconsole.log(isWarm);\nlet isExact = temperature === 24;\nconsole.log(isExact);\n",
          },
        },
        {
          id: "thresh-isstring",
          instruction: {
            en: "Declare `let isString = temperature === \"24\";` and log it. Compare a number to a numeric STRING — strict equality fails.",
            sv: "Deklarera `let isString = temperature === \"24\";` och logga den. Jämför ett tal mot en numerisk STRÄNG — strikt likhet ger false.",
          },
          starterCode: {
            en: "let temperature = 24;\nconsole.log(temperature);\nlet isWarm = temperature >= 20;\nconsole.log(isWarm);\nlet isExact = temperature === 24;\nconsole.log(isExact);\n// Declare isString and log it.\n",
            sv: "let temperature = 24;\nconsole.log(temperature);\nlet isWarm = temperature >= 20;\nconsole.log(isWarm);\nlet isExact = temperature === 24;\nconsole.log(isExact);\n// Deklarera isString och logga den.\n",
          },
          checks: [
            { message: { en: "Use `temperature === \"24\"`.", sv: "Använd `temperature === \"24\"`." }, requirePattern: /\blet\s+isString\s*=\s*temperature\s*===\s*["']24["']/ },
            { message: { en: "`isString` should be false.", sv: "`isString` ska vara false." }, assert: "return isString === false;" },
            { message: { en: "Log `isString`.", sv: "Logga `isString`." }, requirePattern: /console\.log\s*\(\s*isString\s*\)/ },
          ],
          reveal: {
            en: "let temperature = 24;\nconsole.log(temperature);\nlet isWarm = temperature >= 20;\nconsole.log(isWarm);\nlet isExact = temperature === 24;\nconsole.log(isExact);\nlet isString = temperature === \"24\";\nconsole.log(isString);\n",
            sv: "let temperature = 24;\nconsole.log(temperature);\nlet isWarm = temperature >= 20;\nconsole.log(isWarm);\nlet isExact = temperature === 24;\nconsole.log(isExact);\nlet isString = temperature === \"24\";\nconsole.log(isString);\n",
          },
        },
      ],
    },

    // ──────────────────────────────────────────────────────────────────
    // Exercise 2 — Tip and total
    // ──────────────────────────────────────────────────────────────────
    {
      kind: "exercise",
      title: { en: "Lab: discount sale", sv: "Labb: rea­pris" },
      prompt: {
        en:
          "Compute and log four numbers for a 20% discount on a 250-kr item.\n\n" +
          "User stories:\n" +
          "1. Log 250 * 0.20 (the discount amount).\n" +
          "2. Log 250 - (250 * 0.20) (the price after discount).\n" +
          "3. Log (250 - (250 * 0.20)) < 250 (cheaper than the original — true).\n" +
          "4. Log (250 - (250 * 0.20)) === 200 (does it exactly equal 200 — true).\n\n" +
          "Exactly four console.log lines, in this order.",
        sv:
          "Beräkna och logga fyra siffror för 20% rabatt på en vara för 250 kr.\n\n" +
          "Användarberättelser:\n" +
          "1. Logga 250 * 0.20 (rabattens belopp).\n" +
          "2. Logga 250 - (250 * 0.20) (priset efter rabatt).\n" +
          "3. Logga (250 - (250 * 0.20)) < 250 (billigare än originalet — true).\n" +
          "4. Logga (250 - (250 * 0.20)) === 200 (exakt 200 — true).\n\n" +
          "Exakt fyra console.log-rader, i den ordningen.",
      },
      starterJs:
        "// 1. Log 250 * 0.20:\n\n\n" +
        "// 2. Log 250 - (250 * 0.20):\n\n\n" +
        "// 3. Log (250 - (250 * 0.20)) < 250:\n\n\n" +
        "// 4. Log (250 - (250 * 0.20)) === 200:\n\n",
      tests: [
        {
          label: { en: "Console shows exactly four lines", sv: "Konsolen visar exakt fyra rader" },
          assert: "var c = window.__console || []; return c.length === 4;",
          hint: { en: "Four console.log calls.", sv: "Fyra console.log-anrop." },
        },
        {
          label: { en: "Lines are 50, 200, true, true (in order)", sv: "Raderna är 50, 200, true, true (i ordning)" },
          assert:
            "var c = window.__console || [];" +
            "if (c.length < 4) return false;" +
            "return c[0].text === '50' && c[1].text === '200' && c[2].text === 'true' && c[3].text === 'true';",
          hint: { en: "250 * 0.20 = 50; 250 - 50 = 200; 200 < 250 is true; 200 === 200 is true.", sv: "250 * 0.20 = 50; 250 - 50 = 200; 200 < 250 är true; 200 === 200 är true." },
        },
        {
          label: { en: "Code uses *, -, < and ===", sv: "Koden använder *, -, < och ===" },
          assert:
            "var src = window.__userSrc || '';" +
            "return /\\*/.test(src) && /-/.test(src) && /</.test(src) && /===/.test(src);",
          hint: { en: "All four operators must appear somewhere.", sv: "Alla fyra operatorer ska förekomma." },
        },
        {
          label: { en: "No quotes around the numeric expressions", sv: "Inga citattecken runt de numeriska uttrycken" },
          assert:
            "var c = window.__console || [];" +
            "if (c.length < 2) return false;" +
            "return !isNaN(Number(c[0].text)) && !isNaN(Number(c[1].text));",
          hint: { en: "Pass the expressions directly to console.log without quotes.", sv: "Skicka uttrycken direkt till console.log utan citattecken." },
        },
      ],
    },

    // ──────────────────────────────────────────────────────────────────
    // Exercise 3 — Multiple of three
    // ──────────────────────────────────────────────────────────────────
    {
      kind: "exercise",
      title: { en: "Lab: multiple of three", sv: "Labb: delbart med tre" },
      prompt: {
        en:
          "Use the modulo operator to test if 12 is a multiple of 3.\n\n" +
          "User stories:\n" +
          "1. Log 12 (the number itself).\n" +
          "2. Log 12 % 3 (the remainder — should be 0).\n" +
          "3. Log 12 % 3 === 0 (is it a multiple of 3 — true).\n" +
          "4. Log 12 % 3 !== 0 (is it NOT a multiple of 3 — false).\n\n" +
          "Exactly four console.log lines.",
        sv:
          "Använd modulo för att kolla om 12 är delbart med 3.\n\n" +
          "Användarberättelser:\n" +
          "1. Logga 12 (själva talet).\n" +
          "2. Logga 12 % 3 (resten — ska bli 0).\n" +
          "3. Logga 12 % 3 === 0 (är det delbart med 3 — true).\n" +
          "4. Logga 12 % 3 !== 0 (är det INTE delbart med 3 — false).\n\n" +
          "Exakt fyra console.log-rader.",
      },
      starterJs:
        "// 1. Log 12:\n\n\n" +
        "// 2. Log 12 % 3:\n\n\n" +
        "// 3. Log 12 % 3 === 0:\n\n\n" +
        "// 4. Log 12 % 3 !== 0:\n\n",
      tests: [
        {
          label: { en: "Console shows exactly four lines", sv: "Konsolen visar exakt fyra rader" },
          assert: "var c = window.__console || []; return c.length === 4;",
          hint: { en: "Four console.log calls.", sv: "Fyra console.log-anrop." },
        },
        {
          label: { en: "Lines are 12, 0, true, false (in order)", sv: "Raderna är 12, 0, true, false (i ordning)" },
          assert:
            "var c = window.__console || [];" +
            "if (c.length < 4) return false;" +
            "return c[0].text === '12' && c[1].text === '0' && c[2].text === 'true' && c[3].text === 'false';",
          hint: { en: "12; 12 % 3 = 0; 0 === 0 is true; 0 !== 0 is false.", sv: "12; 12 % 3 = 0; 0 === 0 är true; 0 !== 0 är false." },
        },
        {
          label: { en: "Code uses %, ===, and !==", sv: "Koden använder %, === och !==" },
          assert:
            "var src = window.__userSrc || '';" +
            "return /%/.test(src) && /===/.test(src) && /!==/.test(src);",
          hint: { en: "% for the remainder, === and !== for the strict comparisons.", sv: "% för resten, === och !== för de strikta jämförelserna." },
        },
        {
          label: { en: "Lines 3 and 4 evaluate to a boolean", sv: "Rad 3 och 4 ger en boolean" },
          assert:
            "var c = window.__console || [];" +
            "if (c.length < 4) return false;" +
            "return (c[2].text === 'true' || c[2].text === 'false') && (c[3].text === 'true' || c[3].text === 'false');",
          hint: { en: "Comparisons always produce true or false.", sv: "Jämförelser ger alltid true eller false." },
        },
      ],
    },

    // ──────────────────────────────────────────────────────────────────
    // Exercise 4 — Voting age check
    // ──────────────────────────────────────────────────────────────────
    {
      kind: "exercise",
      title: { en: "Lab: voting age check", sv: "Labb: röst­ålderskoll" },
      prompt: {
        en:
          "Run four eligibility checks against the number 18.\n\n" +
          "User stories:\n" +
          "1. Log 18 >= 18 (old enough to vote — true).\n" +
          "2. Log 18 < 100 (under 100 — true).\n" +
          "3. Log 18 === 18 (strictly equal to itself — true).\n" +
          "4. Log 18 === \"18\" (strict equality with the string — false).\n\n" +
          "Exactly four console.log lines.",
        sv:
          "Kör fyra behörighets­kontroller mot talet 18.\n\n" +
          "Användarberättelser:\n" +
          "1. Logga 18 >= 18 (gammal nog att rösta — true).\n" +
          "2. Logga 18 < 100 (under 100 — true).\n" +
          "3. Logga 18 === 18 (strikt lika med sig själv — true).\n" +
          "4. Logga 18 === \"18\" (strikt likhet med strängen — false).\n\n" +
          "Exakt fyra console.log-rader.",
      },
      starterJs:
        "// 1. Log 18 >= 18:\n\n\n" +
        "// 2. Log 18 < 100:\n\n\n" +
        "// 3. Log 18 === 18:\n\n\n" +
        "// 4. Log 18 === \"18\":\n\n",
      tests: [
        {
          label: { en: "Console shows exactly four lines", sv: "Konsolen visar exakt fyra rader" },
          assert: "var c = window.__console || []; return c.length === 4;",
          hint: { en: "Four console.log calls.", sv: "Fyra console.log-anrop." },
        },
        {
          label: { en: "Lines are true, true, true, false (in order)", sv: "Raderna är true, true, true, false (i ordning)" },
          assert:
            "var c = window.__console || [];" +
            "if (c.length < 4) return false;" +
            "return c[0].text === 'true' && c[1].text === 'true' && c[2].text === 'true' && c[3].text === 'false';",
          hint: { en: "Strict equality with a string is false; the rest are true.", sv: "Strikt likhet mot en sträng är false; resten är true." },
        },
        {
          label: { en: "Code uses >=, <, and ===", sv: "Koden använder >=, < och ===" },
          assert:
            "var src = window.__userSrc || '';" +
            "return />=/.test(src) && /</.test(src) && /===/.test(src);",
          hint: { en: "All three comparison operators should appear.", sv: "Alla tre jämförelseoperatorer ska finnas." },
        },
        {
          label: { en: "Every line evaluates to a boolean", sv: "Varje rad ger en boolean" },
          assert:
            "var c = window.__console || [];" +
            "if (c.length < 4) return false;" +
            "for (var i = 0; i < 4; i++) { if (c[i].text !== 'true' && c[i].text !== 'false') return false; }" +
            "return true;",
          hint: { en: "Each console.log should print a boolean comparison's result.", sv: "Varje console.log ska skriva ut en jämförelses boolean." },
        },
      ],
    },
  ],
};
