import type { Lesson } from "../../types";
import { codePanelStyle, noteBoxStyle } from "./_shared";

export const specialValuesLesson: Lesson = {
  id: "variables-special-values",
  title: { en: "4. undefined, null, and NaN", sv: "4. undefined, null och NaN" },
  summary: {
    en: "Three values that mean 'nothing' — but each one differently.",
    sv: "Tre värden som betyder 'inget' — men på olika sätt.",
  },
  slides: [
    // 1. undefined
    {
      kind: "explanation",
      title: { en: "undefined — never set", sv: "undefined — aldrig satt" },
      intro: {
        en:
          "When you declare a variable but don't give it a value,\nJavaScript fills it with `undefined`.",
        sv:
          "När du deklarerar en variabel utan att ge den ett värde,\nfyller JavaScript den med `undefined`.",
      },
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
          label: {
            en:
              "If you ever see `undefined`\nin a log when you didn't expect it,\nit usually means you forgot\nto assign the variable.",
            sv:
              "Om du nånsin ser `undefined`\ni en logg utan att vänta dig det,\nbetyder det oftast att du glömt\ntilldela variabeln.",
          },
          baseStyle: { ...noteBoxStyle, marginTop: 16 },
        },
      ],
      steps: [
        {
          narration: {
            en:
              "`let score;` — no value assigned.\nThe variable exists, but its value is `undefined`.",
            sv:
              "`let score;` — inget värde tilldelat.\nVariabeln finns, men dess värde är `undefined`.",
          },
          tokenHighlight: ["let score;"],
        },
        {
          narration: {
            en:
              "`undefined` is a value AND a type.\n`typeof score` returns the string `\"undefined\"`.",
            sv:
              "`undefined` är ett värde OCH en typ.\n`typeof score` returnerar strängen `\"undefined\"`.",
          },
          tokenHighlight: ["typeof"],
        },
      ],
    },

    // 2. null
    {
      kind: "explanation",
      title: { en: "null — intentionally empty", sv: "null — avsiktligt tomt" },
      intro: {
        en:
          "`null` is a value YOU set when you want to say\n'this slot is empty on purpose'.",
        sv:
          "`null` är ett värde DU sätter när du vill säga\n'den här platsen är tom med flit'.",
      },
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
          label: {
            en:
              "Beware: `typeof null` is `\"object\"`.\nIt's a famous JavaScript quirk\nthat's been there since 1995.\nDon't use typeof to check for null —\nuse `value === null` instead.",
            sv:
              "Varning: `typeof null` är `\"object\"`.\nEn känd JavaScript-egenhet\nsom funnits sedan 1995.\nAnvänd inte typeof för att kolla null —\nanvänd `värde === null` istället.",
          },
          baseStyle: { ...noteBoxStyle, marginTop: 16 },
        },
      ],
      steps: [
        {
          narration: {
            en:
              "Use `null` when you mean to say 'no value yet — but I picked that on purpose'.\nDifferent from `undefined`, which means 'I never even tried'.",
            sv:
              "Använd `null` när du menar 'inget värde än — men jag valde det med flit'.\nSkiljer sig från `undefined`, som betyder 'jag försökte aldrig ens'.",
          },
        },
        {
          narration: {
            en:
              "To check for null, write `value === null`.\nDon't rely on `typeof` — it lies and says \"object\".",
            sv:
              "För att kolla null, skriv `värde === null`.\nLita inte på `typeof` — den ljuger och säger \"object\".",
          },
          tokenHighlight: ["=== null"],
        },
      ],
    },

    // 3. NaN
    {
      kind: "explanation",
      title: { en: "NaN — Not a Number", sv: "NaN — inte ett tal" },
      intro: {
        en:
          "`NaN` is what you get when math fails.\n`0 / 0`, `Number(\"hello\")`, all give `NaN`.",
        sv:
          "`NaN` är vad du får när matten misslyckas.\n`0 / 0`, `Number(\"hello\")`, ger alla `NaN`.",
      },
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
          label: {
            en:
              "NaN is the ONLY value in JS\nthat is not equal to itself.\nThat's why we have `Number.isNaN(value)` —\nit's the reliable way to check.",
            sv:
              "NaN är det ENDA värdet i JS\nsom inte är lika med sig självt.\nDärför finns `Number.isNaN(värde)` —\ndet är det pålitliga sättet att kolla.",
          },
          baseStyle: { ...noteBoxStyle, marginTop: 16 },
        },
      ],
      steps: [
        {
          narration: {
            en:
              "`NaN` shows up when you try to do math on something that isn't really a number.\n`0 / 0` is undefined math; `Number(\"hello\")` is a failed conversion.",
            sv:
              "`NaN` dyker upp när du försöker räkna på något som inte är ett tal.\n`0 / 0` är odefinierad matte; `Number(\"hello\")` är en misslyckad konvertering.",
          },
          tokenHighlight: ["NaN"],
        },
        {
          narration: {
            en:
              "Funny twist: `NaN === NaN` is `false`.\nNaN is the only value not equal to itself — by design.",
            sv:
              "Lustig sak: `NaN === NaN` är `false`.\nNaN är det enda värdet som inte är lika med sig självt — enligt design.",
          },
          tokenHighlight: ["NaN === NaN"],
        },
        {
          narration: {
            en:
              "To test if something is NaN, use `Number.isNaN(value)`.\nIt returns true only when the value really is NaN.",
            sv:
              "För att testa om något är NaN, använd `Number.isNaN(värde)`.\nDet ger true bara när värdet verkligen är NaN.",
          },
          tokenHighlight: ["Number.isNaN"],
        },
      ],
    },

    // 4. Chip practice
    {
      kind: "js-chip-assignment",
      title: { en: "Practice: name that nothing", sv: "Övning: namnge det tomma" },
      prompt: {
        en:
          "Match each scenario with the right value or check.",
        sv:
          "Matcha varje situation med rätt värde eller koll.",
      },
      puzzles: [
        // p1: undefined for unassigned
        {
          prompt: {
            en: "What does an unassigned `let` variable hold?",
            sv: "Vad innehåller en otilldelad `let`-variabel?",
          },
          template: 'let x;\nconsole.log(x);   // [[]]',
          chips: ["undefined", "null", "NaN", '""'],
          solution: ["undefined"],
        },
        // p2: null for intentional empty
        {
          prompt: {
            en: "Which value says 'empty on purpose'?",
            sv: "Vilket värde säger 'tom med flit'?",
          },
          template: "let answer = [[]];",
          chips: ["null", "undefined", "NaN", "0"],
          solution: ["null"],
        },
        // p3: NaN from bad math
        {
          prompt: {
            en: "What does `Number(\"hello\")` evaluate to?",
            sv: "Vad blir `Number(\"hello\")`?",
          },
          template: 'console.log(Number("hello"));  // [[]]',
          chips: ["NaN", "0", "null", "undefined"],
          solution: ["NaN"],
        },
        // p4: Number.isNaN check
        {
          intro: {
            en: "The reliable NaN check.",
            sv: "Den pålitliga NaN-kollen.",
          },
          prompt: {
            en: "Which call tests whether `value` is NaN?",
            sv: "Vilket anrop testar om `value` är NaN?",
          },
          template: "if ([[]](value)) { ... }",
          chips: ["Number.isNaN", "value === NaN", "typeof value", "isNumber"],
          solution: ["Number.isNaN"],
        },
        // p5: synthesis — pick the comparison
        {
          prompt: {
            en: "Build a comparison to test if `answer` is null.",
            sv: "Bygg en jämförelse för att testa om `answer` är null.",
          },
          template: "if (answer [[]] [[]]) { ... }",
          chips: ["===", "null", "==", "undefined", "NaN"],
          solution: ["===", "null"],
        },
      ],
      legend: [
        {
          name: { en: "undefined", sv: "undefined" },
          syntax: "let x;",
          example: "let score; // score is undefined",
          note: {
            en: "The default for a declared but unassigned variable.",
            sv: "Standardvärdet för en deklarerad men otilldelad variabel.",
          },
        },
        {
          name: { en: "null", sv: "null" },
          syntax: "let x = null;",
          example: "let answer = null;",
          note: {
            en: "An intentional 'no value'. Check with === null.",
            sv: "Ett avsiktligt 'inget värde'. Kolla med === null.",
          },
        },
        {
          name: { en: "Number.isNaN", sv: "Number.isNaN" },
          syntax: "Number.isNaN(value)",
          example: "Number.isNaN(0 / 0) → true",
          note: {
            en: "The reliable way to check for NaN — direct === comparison doesn't work.",
            sv: "Det pålitliga sättet att kolla NaN — direkt ===-jämförelse fungerar inte.",
          },
        },
      ],
    },

    // 5. Workshop — 4 steps
    {
      kind: "js-workshop",
      title: { en: "Workshop: special values up close", sv: "Verkstad: specialvärden på nära håll" },
      prompt: {
        en:
          "See undefined, null, NaN, and Number.isNaN in action — one per step.",
        sv:
          "Se undefined, null, NaN och Number.isNaN i praktiken — ett per steg.",
      },
      designNote:
        "Variables L4 workshop. Four steps: declare-without-assign (undefined), assign null, produce NaN via 0/0, verify with Number.isNaN. Surface emphasizes 'three kinds of nothing' arc.",
      steps: [
        {
          id: "specials-undefined",
          instruction: {
            en:
              "Declare `let score;` (no value). Then log it. The output is `undefined`.",
            sv:
              "Deklarera `let score;` (utan värde). Logga den. Resultatet är `undefined`.",
          },
          starterCode: {
            en: "// Declare score with no value, then log it.\n",
            sv: "// Deklarera score utan värde, logga den sedan.\n",
          },
          checks: [
            {
              message: {
                en: "Declare `score` with `let` and no initial value.",
                sv: "Deklarera `score` med `let` utan startvärde.",
              },
              requirePattern: /\blet\s+score\s*;/,
            },
            {
              message: {
                en: "`score` should be `undefined`.",
                sv: "`score` ska vara `undefined`.",
              },
              assert: "return typeof score === 'undefined';",
            },
            {
              message: {
                en: "Log `score`.",
                sv: "Logga `score`.",
              },
              requirePattern: /console\.log\s*\(\s*score\s*\)/,
            },
          ],
          reveal: {
            en: "let score;\nconsole.log(score);\n",
            sv: "let score;\nconsole.log(score);\n",
          },
        },
        {
          id: "specials-null",
          instruction: {
            en:
              "Below that, declare `let answer = null;` and log it.",
            sv:
              "Under det, deklarera `let answer = null;` och logga den.",
          },
          starterCode: {
            en:
              "let score;\nconsole.log(score);\n// Declare answer = null and log it.\n",
            sv:
              "let score;\nconsole.log(score);\n// Deklarera answer = null och logga den.\n",
          },
          checks: [
            {
              message: {
                en: "Declare `answer` with the value `null`.",
                sv: "Deklarera `answer` med värdet `null`.",
              },
              requirePattern: /\blet\s+answer\s*=\s*null\b/,
            },
            {
              message: {
                en: "`answer` should be `null`.",
                sv: "`answer` ska vara `null`.",
              },
              assert: "return answer === null;",
            },
            {
              message: {
                en: "Log `answer`.",
                sv: "Logga `answer`.",
              },
              requirePattern: /console\.log\s*\(\s*answer\s*\)/,
            },
          ],
          reveal: {
            en:
              "let score;\nconsole.log(score);\nlet answer = null;\nconsole.log(answer);\n",
            sv:
              "let score;\nconsole.log(score);\nlet answer = null;\nconsole.log(answer);\n",
          },
        },
        {
          id: "specials-nan",
          instruction: {
            en:
              "Declare `let oops = 0 / 0;` and log it. Watch what bad math produces.",
            sv:
              "Deklarera `let oops = 0 / 0;` och logga den. Se vad dålig matte ger.",
          },
          starterCode: {
            en:
              "let score;\nconsole.log(score);\nlet answer = null;\nconsole.log(answer);\n// Declare oops = 0 / 0 and log it.\n",
            sv:
              "let score;\nconsole.log(score);\nlet answer = null;\nconsole.log(answer);\n// Deklarera oops = 0 / 0 och logga den.\n",
          },
          checks: [
            {
              message: {
                en: "Declare `oops` with the expression `0 / 0`.",
                sv: "Deklarera `oops` med uttrycket `0 / 0`.",
              },
              requirePattern: /\blet\s+oops\s*=\s*0\s*\/\s*0\b/,
            },
            {
              message: {
                en: "`oops` should be NaN — check with Number.isNaN(oops).",
                sv: "`oops` ska vara NaN — kolla med Number.isNaN(oops).",
              },
              assert: "return Number.isNaN(oops);",
            },
            {
              message: {
                en: "Log `oops`.",
                sv: "Logga `oops`.",
              },
              requirePattern: /console\.log\s*\(\s*oops\s*\)/,
            },
          ],
          reveal: {
            en:
              "let score;\nconsole.log(score);\nlet answer = null;\nconsole.log(answer);\nlet oops = 0 / 0;\nconsole.log(oops);\n",
            sv:
              "let score;\nconsole.log(score);\nlet answer = null;\nconsole.log(answer);\nlet oops = 0 / 0;\nconsole.log(oops);\n",
          },
        },
        {
          id: "specials-isnan-check",
          instruction: {
            en:
              "Log `Number.isNaN(oops)` — the reliable way to confirm a value is NaN. The output should be `true`.",
            sv:
              "Logga `Number.isNaN(oops)` — det pålitliga sättet att bekräfta att ett värde är NaN. Resultatet ska bli `true`.",
          },
          starterCode: {
            en:
              "let score;\nconsole.log(score);\nlet answer = null;\nconsole.log(answer);\nlet oops = 0 / 0;\nconsole.log(oops);\n// Log Number.isNaN(oops).\n",
            sv:
              "let score;\nconsole.log(score);\nlet answer = null;\nconsole.log(answer);\nlet oops = 0 / 0;\nconsole.log(oops);\n// Logga Number.isNaN(oops).\n",
          },
          checks: [
            {
              message: {
                en: "Log `Number.isNaN(oops)`.",
                sv: "Logga `Number.isNaN(oops)`.",
              },
              requirePattern: /console\.log\s*\(\s*Number\.isNaN\s*\(\s*oops\s*\)\s*\)/,
            },
          ],
          reveal: {
            en:
              "let score;\nconsole.log(score);\nlet answer = null;\nconsole.log(answer);\nlet oops = 0 / 0;\nconsole.log(oops);\nconsole.log(Number.isNaN(oops));\n",
            sv:
              "let score;\nconsole.log(score);\nlet answer = null;\nconsole.log(answer);\nlet oops = 0 / 0;\nconsole.log(oops);\nconsole.log(Number.isNaN(oops));\n",
          },
        },
      ],
      legend: [
        {
          name: { en: "undefined", sv: "undefined" },
          syntax: "let x;",
          example: "let score; // undefined",
          note: {
            en: "Default for declared-but-unassigned variables.",
            sv: "Standard för deklarerade men otilldelade variabler.",
          },
        },
        {
          name: { en: "null", sv: "null" },
          syntax: "let x = null;",
          example: "let answer = null;",
          note: {
            en: "Means 'no value, on purpose'.",
            sv: "Betyder 'inget värde, med flit'.",
          },
        },
        {
          name: { en: "Number.isNaN", sv: "Number.isNaN" },
          syntax: "Number.isNaN(value)",
          example: "Number.isNaN(0 / 0) // true",
          note: {
            en: "Reliable test for NaN — direct === doesn't work.",
            sv: "Pålitligt test för NaN — direkt === fungerar inte.",
          },
        },
      ],
    },

    // 6. Exercise
    {
      kind: "exercise",
      title: { en: "Lab: special-values tour", sv: "Labb: rundtur i specialvärden" },
      prompt: {
        en:
          "Show each of the special values in turn.\n\n" +
          "User stories:\n" +
          "1. Declare a variable with `let` and no value, then log it. The output should be `undefined`.\n" +
          "2. Declare a variable with the value `null` and log it. The output should be `null`.\n" +
          "3. Cause a NaN (e.g. `0 / 0` or `Number(\"abc\")`) and log it. The output should be `NaN`.\n" +
          "4. After your NaN line, log `Number.isNaN(yourNanVariable)` — the output should be `true`.\n\n" +
          "Exactly four console.log lines, in this order.",
        sv:
          "Visa vart och ett av specialvärdena i tur och ordning.\n\n" +
          "Användarberättelser:\n" +
          "1. Deklarera en variabel med `let` utan värde, logga den. Resultatet ska vara `undefined`.\n" +
          "2. Deklarera en variabel med värdet `null` och logga den. Resultatet ska vara `null`.\n" +
          "3. Skapa ett NaN (t.ex. `0 / 0` eller `Number(\"abc\")`) och logga det. Resultatet ska vara `NaN`.\n" +
          "4. Efter NaN-raden, logga `Number.isNaN(dinNaNVariabel)` — resultatet ska vara `true`.\n\n" +
          "Exakt fyra console.log-rader, i den ordningen.",
      },
      starterJs:
        "// 1. Declare a variable with no value and log it (undefined):\n\n\n" +
        "// 2. Declare a variable with value null and log it:\n\n\n" +
        "// 3. Make a NaN and log it:\n\n\n" +
        "// 4. Log Number.isNaN of your NaN variable:\n\n",
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
            sv: "Fyra console.log — ett per användarberättelse.",
          },
        },
        {
          label: {
            en: "First line is \"undefined\" and second is \"null\"",
            sv: "Första raden är \"undefined\" och andra är \"null\"",
          },
          assert:
            "var c = window.__console || [];" +
            "if (c.length < 2) return false;" +
            "return c[0].text === 'undefined' && c[1].text === 'null';",
          hint: {
            en: "First: declare with no value. Second: declare with the value null.",
            sv: "Först: deklarera utan värde. Sen: deklarera med värdet null.",
          },
        },
        {
          label: {
            en: "Third line is \"NaN\"",
            sv: "Tredje raden är \"NaN\"",
          },
          assert:
            "var c = window.__console || [];" +
            "if (c.length < 3) return false;" +
            "return c[2].text === 'NaN';",
          hint: {
            en: "Try 0 / 0 or Number(\"abc\") — both produce NaN.",
            sv: "Pröva 0 / 0 eller Number(\"abc\") — båda ger NaN.",
          },
        },
        {
          label: {
            en: "Fourth line is \"true\" and code uses Number.isNaN",
            sv: "Fjärde raden är \"true\" och koden använder Number.isNaN",
          },
          assert:
            "var c = window.__console || [];" +
            "if (c.length < 4) return false;" +
            "var src = window.__userSrc || '';" +
            "return c[3].text === 'true' && /\\bNumber\\.isNaN\\b/.test(src);",
          hint: {
            en: "console.log(Number.isNaN(yourVariable)) — pass the NaN variable to Number.isNaN.",
            sv: "console.log(Number.isNaN(dinVariabel)) — skicka NaN-variabeln till Number.isNaN.",
          },
        },
      ],
    },

    // ──────────────────────────────────────────────────────────────────
    // Workshop 2 — Form fields awaiting input
    // ──────────────────────────────────────────────────────────────────
    {
      kind: "js-workshop",
      title: { en: "Workshop: form fields", sv: "Verkstad: formulärfält" },
      prompt: {
        en:
          "A form starts with empty fields. Some are `undefined` (never touched), some are `null` (deliberately empty).",
        sv:
          "Ett formulär börjar med tomma fält. Vissa är `undefined` (aldrig rörda), vissa är `null` (medvetet tomma).",
      },
      designNote:
        "L4 W2. Surface: form field lifecycle (declared → assigned). Touches undefined and null in a real-feeling scenario.",
      steps: [
        {
          id: "form-username-empty",
          instruction: {
            en: "Declare `let username;` (no value). Log it — the field is `undefined`.",
            sv: "Deklarera `let username;` (utan värde). Logga den — fältet är `undefined`.",
          },
          starterCode: { en: "// Declare username with no value, then log it.\n", sv: "// Deklarera username utan värde, logga sedan.\n" },
          checks: [
            { message: { en: "Declare `username` with `let` and no value.", sv: "Deklarera `username` med `let` utan värde." }, requirePattern: /\blet\s+username\s*;/ },
            { message: { en: "`username` should be `undefined`.", sv: "`username` ska vara `undefined`." }, assert: "return typeof username === 'undefined';" },
            { message: { en: "Log `username`.", sv: "Logga `username`." }, requirePattern: /console\.log\s*\(\s*username\s*\)/ },
          ],
          reveal: { en: "let username;\nconsole.log(username);\n", sv: "let username;\nconsole.log(username);\n" },
        },
        {
          id: "form-username-set",
          instruction: {
            en: "The user types in their username — reassign `username` to `\"alice\"` and log it.",
            sv: "Användaren skriver in sitt användarnamn — omtilldela `username` till `\"alice\"` och logga igen.",
          },
          starterCode: {
            en: "let username;\nconsole.log(username);\n// Reassign username to a string and log it.\n",
            sv: "let username;\nconsole.log(username);\n// Omtilldela username till en sträng och logga.\n",
          },
          checks: [
            { message: { en: "Reassign `username` to a string (no `let` on this line).", sv: "Omtilldela `username` till en sträng (inget `let` på denna rad)." }, requirePattern: /(^|\n)\s*username\s*=\s*["'][^"']+["']/ },
            { message: { en: "`username` should be a non-empty string.", sv: "`username` ska vara en icke-tom sträng." }, assert: "return typeof username === 'string' && username.length > 0;" },
          ],
          reveal: {
            en: 'let username;\nconsole.log(username);\nusername = "alice";\nconsole.log(username);\n',
            sv: 'let username;\nconsole.log(username);\nusername = "alice";\nconsole.log(username);\n',
          },
          flexibility: { values: true },
        },
        {
          id: "form-terms-null",
          instruction: {
            en: "The terms-checkbox starts unchecked, on purpose. Declare `let acceptedTerms = null;` and log it.",
            sv: "Villkors­rutan är medvetet omarkerad i början. Deklarera `let acceptedTerms = null;` och logga den.",
          },
          starterCode: {
            en: 'let username;\nconsole.log(username);\nusername = "alice";\nconsole.log(username);\n// Declare acceptedTerms = null and log it.\n',
            sv: 'let username;\nconsole.log(username);\nusername = "alice";\nconsole.log(username);\n// Deklarera acceptedTerms = null och logga.\n',
          },
          checks: [
            { message: { en: "Declare `acceptedTerms = null`.", sv: "Deklarera `acceptedTerms = null`." }, requirePattern: /\blet\s+acceptedTerms\s*=\s*null\b/ },
            { message: { en: "`acceptedTerms` should be `null`.", sv: "`acceptedTerms` ska vara `null`." }, assert: "return acceptedTerms === null;" },
            { message: { en: "Log `acceptedTerms`.", sv: "Logga `acceptedTerms`." }, requirePattern: /console\.log\s*\(\s*acceptedTerms\s*\)/ },
          ],
          reveal: {
            en: 'let username;\nconsole.log(username);\nusername = "alice";\nconsole.log(username);\nlet acceptedTerms = null;\nconsole.log(acceptedTerms);\n',
            sv: 'let username;\nconsole.log(username);\nusername = "alice";\nconsole.log(username);\nlet acceptedTerms = null;\nconsole.log(acceptedTerms);\n',
          },
        },
        {
          id: "form-terms-checked",
          instruction: {
            en: "The user takes action — reassign `acceptedTerms` to `true` and log it.",
            sv: "Användaren agerar — omtilldela `acceptedTerms` till `true` och logga.",
          },
          starterCode: {
            en: 'let username;\nconsole.log(username);\nusername = "alice";\nconsole.log(username);\nlet acceptedTerms = null;\nconsole.log(acceptedTerms);\n// Reassign acceptedTerms (no longer null) and log it.\n',
            sv: 'let username;\nconsole.log(username);\nusername = "alice";\nconsole.log(username);\nlet acceptedTerms = null;\nconsole.log(acceptedTerms);\n// Omtilldela acceptedTerms (inte null längre) och logga.\n',
          },
          checks: [
            { message: { en: "Add a reassignment line for `acceptedTerms` (no `let`).", sv: "Lägg till en omtilldelningsrad för `acceptedTerms` (inget `let`)." }, requirePattern: /(^|\n)\s*acceptedTerms\s*=\s*(?!null\b)/ },
            { message: { en: "`acceptedTerms` should no longer be `null`.", sv: "`acceptedTerms` ska inte längre vara `null`." }, assert: "return acceptedTerms !== null && typeof acceptedTerms !== 'undefined';" },
          ],
          reveal: {
            en: 'let username;\nconsole.log(username);\nusername = "alice";\nconsole.log(username);\nlet acceptedTerms = null;\nconsole.log(acceptedTerms);\nacceptedTerms = true;\nconsole.log(acceptedTerms);\n',
            sv: 'let username;\nconsole.log(username);\nusername = "alice";\nconsole.log(username);\nlet acceptedTerms = null;\nconsole.log(acceptedTerms);\nacceptedTerms = true;\nconsole.log(acceptedTerms);\n',
          },
          flexibility: { values: true },
        },
      ],
    },

    // ──────────────────────────────────────────────────────────────────
    // Workshop 3 — Parsing user input (NaN territory)
    // ──────────────────────────────────────────────────────────────────
    {
      kind: "js-workshop",
      title: { en: "Workshop: parsing user input", sv: "Verkstad: tolka användardata" },
      prompt: {
        en:
          "When you parse a string to a number, you might get NaN. Use `Number.isNaN` to check.",
        sv:
          "När du tolkar en sträng till tal kan du få NaN. Använd `Number.isNaN` för att kolla.",
      },
      designNote:
        "L4 W3. Surface: input parsing. Touches NaN and Number.isNaN.",
      steps: [
        {
          id: "parse-good",
          instruction: {
            en: "Declare `let typed = \"30\";` and `let parsed = Number(typed);`. Log `parsed`. It should be the number 30.",
            sv: "Deklarera `let typed = \"30\";` och `let parsed = Number(typed);`. Logga `parsed`. Det ska bli talet 30.",
          },
          starterCode: { en: "// Declare typed and parsed below, then log parsed.\n", sv: "// Deklarera typed och parsed nedan, logga sedan parsed.\n" },
          checks: [
            { message: { en: "Declare `typed = \"30\"`.", sv: "Deklarera `typed = \"30\"`." }, requirePattern: /\blet\s+typed\s*=\s*["']30["']/ },
            { message: { en: "Declare `parsed = Number(typed)`.", sv: "Deklarera `parsed = Number(typed)`." }, requirePattern: /\blet\s+parsed\s*=\s*Number\s*\(\s*typed\s*\)/ },
            { message: { en: "`parsed` should equal 30.", sv: "`parsed` ska vara 30." }, assert: "return parsed === 30;" },
            { message: { en: "Log `parsed`.", sv: "Logga `parsed`." }, requirePattern: /console\.log\s*\(\s*parsed\s*\)/ },
          ],
          reveal: {
            en: 'let typed = "30";\nlet parsed = Number(typed);\nconsole.log(parsed);\n',
            sv: 'let typed = "30";\nlet parsed = Number(typed);\nconsole.log(parsed);\n',
          },
        },
        {
          id: "parse-bad",
          instruction: {
            en: "Now an invalid input. Declare `let typedBad = \"abc\";` and `let parsedBad = Number(typedBad);`. Log it — you'll see `NaN`.",
            sv: "Nu en ogiltig inmatning. Deklarera `let typedBad = \"abc\";` och `let parsedBad = Number(typedBad);`. Logga den — du ser `NaN`.",
          },
          starterCode: {
            en: 'let typed = "30";\nlet parsed = Number(typed);\nconsole.log(parsed);\n// Declare typedBad and parsedBad, then log parsedBad.\n',
            sv: 'let typed = "30";\nlet parsed = Number(typed);\nconsole.log(parsed);\n// Deklarera typedBad och parsedBad, logga sedan parsedBad.\n',
          },
          checks: [
            { message: { en: "Declare `typedBad = \"abc\"`.", sv: "Deklarera `typedBad = \"abc\"`." }, requirePattern: /\blet\s+typedBad\s*=\s*["']abc["']/ },
            { message: { en: "Declare `parsedBad = Number(typedBad)`.", sv: "Deklarera `parsedBad = Number(typedBad)`." }, requirePattern: /\blet\s+parsedBad\s*=\s*Number\s*\(\s*typedBad\s*\)/ },
            { message: { en: "`parsedBad` should be NaN.", sv: "`parsedBad` ska vara NaN." }, assert: "return Number.isNaN(parsedBad);" },
            { message: { en: "Log `parsedBad`.", sv: "Logga `parsedBad`." }, requirePattern: /console\.log\s*\(\s*parsedBad\s*\)/ },
          ],
          reveal: {
            en: 'let typed = "30";\nlet parsed = Number(typed);\nconsole.log(parsed);\nlet typedBad = "abc";\nlet parsedBad = Number(typedBad);\nconsole.log(parsedBad);\n',
            sv: 'let typed = "30";\nlet parsed = Number(typed);\nconsole.log(parsed);\nlet typedBad = "abc";\nlet parsedBad = Number(typedBad);\nconsole.log(parsedBad);\n',
          },
        },
        {
          id: "parse-isnan-bad",
          instruction: {
            en: "Verify with `Number.isNaN(parsedBad)` — should log `true`.",
            sv: "Verifiera med `Number.isNaN(parsedBad)` — ska logga `true`.",
          },
          starterCode: {
            en: 'let typed = "30";\nlet parsed = Number(typed);\nconsole.log(parsed);\nlet typedBad = "abc";\nlet parsedBad = Number(typedBad);\nconsole.log(parsedBad);\n// Log Number.isNaN(parsedBad).\n',
            sv: 'let typed = "30";\nlet parsed = Number(typed);\nconsole.log(parsed);\nlet typedBad = "abc";\nlet parsedBad = Number(typedBad);\nconsole.log(parsedBad);\n// Logga Number.isNaN(parsedBad).\n',
          },
          checks: [
            { message: { en: "Log `Number.isNaN(parsedBad)`.", sv: "Logga `Number.isNaN(parsedBad)`." }, requirePattern: /console\.log\s*\(\s*Number\.isNaN\s*\(\s*parsedBad\s*\)\s*\)/ },
          ],
          reveal: {
            en: 'let typed = "30";\nlet parsed = Number(typed);\nconsole.log(parsed);\nlet typedBad = "abc";\nlet parsedBad = Number(typedBad);\nconsole.log(parsedBad);\nconsole.log(Number.isNaN(parsedBad));\n',
            sv: 'let typed = "30";\nlet parsed = Number(typed);\nconsole.log(parsed);\nlet typedBad = "abc";\nlet parsedBad = Number(typedBad);\nconsole.log(parsedBad);\nconsole.log(Number.isNaN(parsedBad));\n',
          },
        },
        {
          id: "parse-isnan-good",
          instruction: {
            en: "Compare with `Number.isNaN(parsed)` — should log `false`. The valid number is, well, a valid number.",
            sv: "Jämför med `Number.isNaN(parsed)` — ska logga `false`. Det giltiga talet är ju ett giltigt tal.",
          },
          starterCode: {
            en: 'let typed = "30";\nlet parsed = Number(typed);\nconsole.log(parsed);\nlet typedBad = "abc";\nlet parsedBad = Number(typedBad);\nconsole.log(parsedBad);\nconsole.log(Number.isNaN(parsedBad));\n// Log Number.isNaN(parsed).\n',
            sv: 'let typed = "30";\nlet parsed = Number(typed);\nconsole.log(parsed);\nlet typedBad = "abc";\nlet parsedBad = Number(typedBad);\nconsole.log(parsedBad);\nconsole.log(Number.isNaN(parsedBad));\n// Logga Number.isNaN(parsed).\n',
          },
          checks: [
            { message: { en: "Log `Number.isNaN(parsed)`.", sv: "Logga `Number.isNaN(parsed)`." }, requirePattern: /console\.log\s*\(\s*Number\.isNaN\s*\(\s*parsed\s*\)\s*\)/ },
          ],
          reveal: {
            en: 'let typed = "30";\nlet parsed = Number(typed);\nconsole.log(parsed);\nlet typedBad = "abc";\nlet parsedBad = Number(typedBad);\nconsole.log(parsedBad);\nconsole.log(Number.isNaN(parsedBad));\nconsole.log(Number.isNaN(parsed));\n',
            sv: 'let typed = "30";\nlet parsed = Number(typed);\nconsole.log(parsed);\nlet typedBad = "abc";\nlet parsedBad = Number(typedBad);\nconsole.log(parsedBad);\nconsole.log(Number.isNaN(parsedBad));\nconsole.log(Number.isNaN(parsed));\n',
          },
        },
      ],
    },

    // ──────────────────────────────────────────────────────────────────
    // Workshop 4 — Optional middle name (null vs undefined)
    // ──────────────────────────────────────────────────────────────────
    {
      kind: "js-workshop",
      title: { en: "Workshop: optional fields", sv: "Verkstad: valfria fält" },
      prompt: {
        en:
          "Some people don't have a middle name. Use `null` to say 'this slot is empty on purpose', and notice that `typeof null` is the famous JS gotcha.",
        sv:
          "Vissa har inget mellannamn. Använd `null` för att säga 'platsen är tom med flit' och se den klassiska `typeof null`-fällan.",
      },
      designNote:
        "L4 W4. Surface: optional middle name. Distinguishes null (intentional) from undefined (never set), and exposes typeof null === 'object' gotcha.",
      steps: [
        {
          id: "optional-declare",
          instruction: {
            en: "Declare three name parts: `firstName = \"Alice\"`, `middleName = null` (the lesson — intentionally empty), and `lastName = \"Smith\"`. Log all three on separate lines.",
            sv: "Deklarera tre namndelar: `firstName = \"Alice\"`, `middleName = null` (lektionen — medvetet tom), och `lastName = \"Smith\"`. Logga alla tre på separata rader.",
          },
          starterCode: { en: "// Declare the three name parts and log each.\n", sv: "// Deklarera de tre namndelarna och logga var och en.\n" },
          checks: [
            { message: { en: "`firstName` should be a non-empty string.", sv: "`firstName` ska vara en icke-tom sträng." }, assert: "return typeof firstName === 'string' && firstName.length > 0;" },
            { message: { en: "`middleName` should be `null` (intentionally empty).", sv: "`middleName` ska vara `null` (medvetet tom)." }, assert: "return middleName === null;" },
            { message: { en: "`lastName` should be a non-empty string.", sv: "`lastName` ska vara en icke-tom sträng." }, assert: "return typeof lastName === 'string' && lastName.length > 0;" },
            {
              message: { en: "Log all three.", sv: "Logga alla tre." },
              requirePattern: /console\.log[\s\S]*console\.log[\s\S]*console\.log/,
            },
          ],
          reveal: {
            en: 'let firstName = "Alice";\nlet middleName = null;\nlet lastName = "Smith";\nconsole.log(firstName);\nconsole.log(middleName);\nconsole.log(lastName);\n',
            sv: 'let firstName = "Alice";\nlet middleName = null;\nlet lastName = "Smith";\nconsole.log(firstName);\nconsole.log(middleName);\nconsole.log(lastName);\n',
          },
          flexibility: { values: true },
        },
        {
          id: "optional-check-null",
          instruction: {
            en: "Confirm middleName is null with `console.log(middleName === null);` — should log `true`.",
            sv: "Bekräfta att middleName är null med `console.log(middleName === null);` — ska logga `true`.",
          },
          starterCode: {
            en: 'let firstName = "Alice";\nlet middleName = null;\nlet lastName = "Smith";\nconsole.log(firstName);\nconsole.log(middleName);\nconsole.log(lastName);\n// Log middleName === null.\n',
            sv: 'let firstName = "Alice";\nlet middleName = null;\nlet lastName = "Smith";\nconsole.log(firstName);\nconsole.log(middleName);\nconsole.log(lastName);\n// Logga middleName === null.\n',
          },
          checks: [
            { message: { en: "Use `middleName === null` inside `console.log`.", sv: "Använd `middleName === null` i `console.log`." }, requirePattern: /console\.log\s*\(\s*middleName\s*===\s*null\s*\)/ },
          ],
          reveal: {
            en: 'let firstName = "Alice";\nlet middleName = null;\nlet lastName = "Smith";\nconsole.log(firstName);\nconsole.log(middleName);\nconsole.log(lastName);\nconsole.log(middleName === null);\n',
            sv: 'let firstName = "Alice";\nlet middleName = null;\nlet lastName = "Smith";\nconsole.log(firstName);\nconsole.log(middleName);\nconsole.log(lastName);\nconsole.log(middleName === null);\n',
          },
        },
        {
          id: "optional-typeof-quirk",
          instruction: {
            en: "Now the famous JS gotcha: log `typeof middleName`. The result is `\"object\"`, not `\"null\"`.",
            sv: "Nu den klassiska JS-fällan: logga `typeof middleName`. Resultatet blir `\"object\"`, inte `\"null\"`.",
          },
          starterCode: {
            en: 'let firstName = "Alice";\nlet middleName = null;\nlet lastName = "Smith";\nconsole.log(firstName);\nconsole.log(middleName);\nconsole.log(lastName);\nconsole.log(middleName === null);\n// Log typeof middleName.\n',
            sv: 'let firstName = "Alice";\nlet middleName = null;\nlet lastName = "Smith";\nconsole.log(firstName);\nconsole.log(middleName);\nconsole.log(lastName);\nconsole.log(middleName === null);\n// Logga typeof middleName.\n',
          },
          checks: [
            { message: { en: "Log `typeof middleName`.", sv: "Logga `typeof middleName`." }, requirePattern: /console\.log\s*\(\s*typeof\s+middleName\s*\)/ },
          ],
          reveal: {
            en: 'let firstName = "Alice";\nlet middleName = null;\nlet lastName = "Smith";\nconsole.log(firstName);\nconsole.log(middleName);\nconsole.log(lastName);\nconsole.log(middleName === null);\nconsole.log(typeof middleName);\n',
            sv: 'let firstName = "Alice";\nlet middleName = null;\nlet lastName = "Smith";\nconsole.log(firstName);\nconsole.log(middleName);\nconsole.log(lastName);\nconsole.log(middleName === null);\nconsole.log(typeof middleName);\n',
          },
        },
        {
          id: "optional-undefined-contrast",
          instruction: {
            en: "Compare with `undefined`. Declare `let nickname;` (no value) and log `nickname === undefined` — should be `true`.",
            sv: "Jämför med `undefined`. Deklarera `let nickname;` (utan värde) och logga `nickname === undefined` — ska vara `true`.",
          },
          starterCode: {
            en: 'let firstName = "Alice";\nlet middleName = null;\nlet lastName = "Smith";\nconsole.log(firstName);\nconsole.log(middleName);\nconsole.log(lastName);\nconsole.log(middleName === null);\nconsole.log(typeof middleName);\n// Declare nickname and log nickname === undefined.\n',
            sv: 'let firstName = "Alice";\nlet middleName = null;\nlet lastName = "Smith";\nconsole.log(firstName);\nconsole.log(middleName);\nconsole.log(lastName);\nconsole.log(middleName === null);\nconsole.log(typeof middleName);\n// Deklarera nickname och logga nickname === undefined.\n',
          },
          checks: [
            { message: { en: "Declare `nickname` with no value.", sv: "Deklarera `nickname` utan värde." }, requirePattern: /\blet\s+nickname\s*;/ },
            { message: { en: "Log `nickname === undefined`.", sv: "Logga `nickname === undefined`." }, requirePattern: /console\.log\s*\(\s*nickname\s*===\s*undefined\s*\)/ },
          ],
          reveal: {
            en: 'let firstName = "Alice";\nlet middleName = null;\nlet lastName = "Smith";\nconsole.log(firstName);\nconsole.log(middleName);\nconsole.log(lastName);\nconsole.log(middleName === null);\nconsole.log(typeof middleName);\nlet nickname;\nconsole.log(nickname === undefined);\n',
            sv: 'let firstName = "Alice";\nlet middleName = null;\nlet lastName = "Smith";\nconsole.log(firstName);\nconsole.log(middleName);\nconsole.log(lastName);\nconsole.log(middleName === null);\nconsole.log(typeof middleName);\nlet nickname;\nconsole.log(nickname === undefined);\n',
          },
        },
      ],
    },

    // ──────────────────────────────────────────────────────────────────
    // Exercise 2 — Form initial state
    // ──────────────────────────────────────────────────────────────────
    {
      kind: "exercise",
      title: { en: "Lab: chat session", sv: "Labb: chatt­session" },
      prompt: {
        en:
          "Show the four stages of a chat session's state.\n\n" +
          "User stories:\n" +
          "1. Declare a variable with `let` and no value, then log it (undefined).\n" +
          "2. Declare a variable with the value `null`, then log it.\n" +
          "3. Reassign the first variable to a non-empty string and log it.\n" +
          "4. Reassign the second variable to `true` and log it.\n\n" +
          "Exactly four console.log lines, in this order.",
        sv:
          "Visa de fyra stadier en chatt­session kan vara i.\n\n" +
          "Användarberättelser:\n" +
          "1. Deklarera en variabel med `let` utan värde, logga (undefined).\n" +
          "2. Deklarera en variabel med värdet `null`, logga.\n" +
          "3. Omtilldela den första variabeln till en icke-tom sträng, logga.\n" +
          "4. Omtilldela den andra variabeln till `true`, logga.\n\n" +
          "Exakt fyra console.log-rader, i den ordningen.",
      },
      starterJs:
        "// 1. Declare an empty variable and log it (undefined):\n\n\n" +
        "// 2. Declare a null variable and log it:\n\n\n" +
        "// 3. Reassign the first one to a string and log it:\n\n\n" +
        "// 4. Reassign the second one to true and log it:\n\n",
      tests: [
        {
          label: { en: "Console shows exactly four lines", sv: "Konsolen visar exakt fyra rader" },
          assert: "var c = window.__console || []; return c.length === 4;",
          hint: { en: "Four console.log calls.", sv: "Fyra console.log-anrop." },
        },
        {
          label: { en: "First line is \"undefined\" and second is \"null\"", sv: "Första raden är \"undefined\" och andra är \"null\"" },
          assert:
            "var c = window.__console || [];" +
            "if (c.length < 2) return false;" +
            "return c[0].text === 'undefined' && c[1].text === 'null';",
          hint: { en: "First: declare with no value. Second: declare with the value null.", sv: "Först: deklarera utan värde. Sedan: deklarera med null." },
        },
        {
          label: { en: "Third line is a non-empty string", sv: "Tredje raden är en icke-tom sträng" },
          assert:
            "var c = window.__console || [];" +
            "if (c.length < 3) return false;" +
            "return c[2].text.length > 0 && c[2].text !== 'undefined' && c[2].text !== 'null';",
          hint: { en: "Reassign the first variable to a string and log it.", sv: "Omtilldela den första variabeln till en sträng och logga." },
        },
        {
          label: { en: "Fourth line is \"true\"", sv: "Fjärde raden är \"true\"" },
          assert:
            "var c = window.__console || [];" +
            "if (c.length < 4) return false;" +
            "return c[3].text === 'true';",
          hint: { en: "Reassign the second variable to true and log it.", sv: "Omtilldela den andra variabeln till true och logga." },
        },
      ],
      flexibility: { values: true },
    },

    // ──────────────────────────────────────────────────────────────────
    // Exercise 3 — Parse and verify
    // ──────────────────────────────────────────────────────────────────
    {
      kind: "exercise",
      title: { en: "Lab: validate guest count", sv: "Labb: validera gästantal" },
      prompt: {
        en:
          "Parse two RSVP strings and use Number.isNaN to verify the results.\n\n" +
          "User stories:\n" +
          "1. Log `Number(\"4\")` (a successful parse — 4).\n" +
          "2. Log `Number(\"many\")` (a failed parse — NaN).\n" +
          "3. Log `Number.isNaN(Number(\"many\"))` (true).\n" +
          "4. Log `Number.isNaN(Number(\"4\"))` (false).\n\n" +
          "Exactly four console.log lines, in this order.",
        sv:
          "Tolka två RSVP-strängar och använd Number.isNaN för att verifiera resultatet.\n\n" +
          "Användarberättelser:\n" +
          "1. Logga `Number(\"4\")` (lyckad tolkning — 4).\n" +
          "2. Logga `Number(\"many\")` (misslyckad — NaN).\n" +
          "3. Logga `Number.isNaN(Number(\"many\"))` (true).\n" +
          "4. Logga `Number.isNaN(Number(\"4\"))` (false).\n\n" +
          "Exakt fyra console.log-rader, i den ordningen.",
      },
      starterJs:
        "// 1. Log Number(\"4\"):\n\n\n" +
        "// 2. Log Number(\"many\"):\n\n\n" +
        "// 3. Log Number.isNaN(Number(\"many\")):\n\n\n" +
        "// 4. Log Number.isNaN(Number(\"4\")):\n\n",
      tests: [
        {
          label: { en: "Console shows exactly four lines", sv: "Konsolen visar exakt fyra rader" },
          assert: "var c = window.__console || []; return c.length === 4;",
          hint: { en: "Four console.log calls.", sv: "Fyra console.log-anrop." },
        },
        {
          label: { en: "Lines are 4, NaN, true, false (in order)", sv: "Raderna är 4, NaN, true, false (i ordning)" },
          assert:
            "var c = window.__console || [];" +
            "if (c.length < 4) return false;" +
            "return c[0].text === '4' && c[1].text === 'NaN' && c[2].text === 'true' && c[3].text === 'false';",
          hint: { en: 'Number("4") = 4; Number("many") = NaN; isNaN of NaN = true; isNaN of 4 = false.', sv: 'Number("4") = 4; Number("many") = NaN; isNaN av NaN = true; isNaN av 4 = false.' },
        },
        {
          label: { en: "Code uses Number(...) at least four times", sv: "Koden använder Number(...) minst fyra gånger" },
          assert:
            "var src = window.__userSrc || '';" +
            "return (src.match(/\\bNumber\\s*\\(/g) || []).length >= 4;",
          hint: { en: "Each line builds on Number(...) — explicit parsing.", sv: "Varje rad använder Number(...) — explicit tolkning." },
        },
        {
          label: { en: "Code uses Number.isNaN at least twice", sv: "Koden använder Number.isNaN minst två gånger" },
          assert:
            "var src = window.__userSrc || '';" +
            "return (src.match(/\\bNumber\\.isNaN\\b/g) || []).length >= 2;",
          hint: { en: "Use Number.isNaN to test the parse result.", sv: "Använd Number.isNaN för att testa parsens resultat." },
        },
      ],
    },

    // ──────────────────────────────────────────────────────────────────
    // Exercise 4 — null vs undefined
    // ──────────────────────────────────────────────────────────────────
    {
      kind: "exercise",
      title: { en: "Lab: null vs undefined", sv: "Labb: null mot undefined" },
      prompt: {
        en:
          "Show how `null` and `undefined` look the same — and aren't.\n\n" +
          "User stories:\n" +
          "1. Log `null === null` (true).\n" +
          "2. Log `null === undefined` (false — strict equality cares about type).\n" +
          "3. Log `typeof null` (the famous \"object\" gotcha).\n" +
          "4. Log `typeof undefined` (\"undefined\").\n\n" +
          "Exactly four console.log lines, in this order.",
        sv:
          "Visa hur `null` och `undefined` ser lika ut — men inte är det.\n\n" +
          "Användarberättelser:\n" +
          "1. Logga `null === null` (true).\n" +
          "2. Logga `null === undefined` (false — strikt likhet bryr sig om typ).\n" +
          "3. Logga `typeof null` (den berömda \"object\"-fällan).\n" +
          "4. Logga `typeof undefined` (\"undefined\").\n\n" +
          "Exakt fyra console.log-rader, i den ordningen.",
      },
      starterJs:
        "// 1. Log null === null:\n\n\n" +
        "// 2. Log null === undefined:\n\n\n" +
        "// 3. Log typeof null:\n\n\n" +
        "// 4. Log typeof undefined:\n\n",
      tests: [
        {
          label: { en: "Console shows exactly four lines", sv: "Konsolen visar exakt fyra rader" },
          assert: "var c = window.__console || []; return c.length === 4;",
          hint: { en: "Four console.log calls.", sv: "Fyra console.log-anrop." },
        },
        {
          label: { en: "Lines are true, false, object, undefined (in order)", sv: "Raderna är true, false, object, undefined (i ordning)" },
          assert:
            "var c = window.__console || [];" +
            "if (c.length < 4) return false;" +
            "return c[0].text === 'true' && c[1].text === 'false' && c[2].text === 'object' && c[3].text === 'undefined';",
          hint: { en: "null === null is true; null === undefined is false; typeof null is \"object\"; typeof undefined is \"undefined\".", sv: "null === null är true; null === undefined är false; typeof null är \"object\"; typeof undefined är \"undefined\"." },
        },
        {
          label: { en: "Code uses strict equality (===)", sv: "Koden använder strikt likhet (===)" },
          assert:
            "var src = window.__userSrc || '';" +
            "return /===/.test(src);",
          hint: { en: "Use === for the comparison lines.", sv: "Använd === för jämförelseraderna." },
        },
        {
          label: { en: "Code uses typeof at least twice", sv: "Koden använder typeof minst två gånger" },
          assert:
            "var src = window.__userSrc || '';" +
            "return (src.match(/\\btypeof\\b/g) || []).length >= 2;",
          hint: { en: "Use typeof on null and on undefined.", sv: "Använd typeof på null och på undefined." },
        },
      ],
    },
  ],
};
