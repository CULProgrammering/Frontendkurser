import type { Lesson } from "../../types";
import { codePanelStyle, noteBoxStyle } from "./_shared";

export const countdownLesson: Lesson = {
  id: "loops-countdown",
  title: { en: "3. Countdown — while", sv: "3. Nedräkningen — while" },
  summary: {
    en: "Repeat as long as a condition holds.",
    sv: "Upprepa så länge ett villkor stämmer.",
  },
  slides: [
    // 1. Intro — rocket countdown
    {
      kind: "explanation",
      title: { en: "Repeat until something happens", sv: "Upprepa tills något händer" },
      intro: {
        en:
          "Sometimes you don't know how many laps you'll need —\nyou just keep going UNTIL a condition flips.",
        sv:
          "Ibland vet du inte hur många varv du behöver —\ndu bara fortsätter TILLS ett villkor vänder.",
      },
      customScene: "countdown",
      demo: [],
      steps: [
        {
          narration: {
            en:
              "A rocket sits on the launchpad.\nThe count is 5. We're going to count down to zero.",
            sv:
              "En raket står på rampen.\nNedräkningen är 5. Vi ska räkna ner till noll.",
          },
        },
        {
          narration: {
            en: "5. Still above zero — keep counting down.",
            sv: "5. Fortfarande över noll — fortsätt räkna ner.",
          },
        },
        {
          narration: {
            en: "4. Still going.",
            sv: "4. Fortsätter.",
          },
        },
        {
          narration: {
            en: "3. Same step every time — subtract one.",
            sv: "3. Samma steg varje gång — minska med ett.",
          },
        },
        {
          narration: {
            en: "2.",
            sv: "2.",
          },
        },
        {
          narration: {
            en: "1.",
            sv: "1.",
          },
        },
        {
          narration: {
            en:
              "Zero! The condition is no longer 'above zero' — STOP.\nThat's a while loop: keep going WHILE the condition is true.",
            sv:
              "Noll! Villkoret är inte längre 'över noll' — STOPP.\nDet är en while-loop: kör SÅ LÄNGE villkoret är sant.",
          },
        },
      ],
    },

    // 2. for vs while — when to use which
    {
      kind: "explanation",
      title: { en: "for vs while", sv: "for mot while" },
      intro: {
        en:
          "Both are loops. The difference is what you know up front.",
        sv:
          "Båda är loopar. Skillnaden är vad du vet på förhand.",
      },
      demo: [
        {
          id: "for",
          label:
            'for (let i = 0; i < 5; i++) {\n  // exactly 5 laps\n}',
          baseStyle: codePanelStyle,
        },
        {
          id: "while",
          label:
            'let n = 5;\nwhile (n > 0) {\n  n = n - 1;\n  // run until n hits zero\n}',
          baseStyle: { ...codePanelStyle, marginTop: 16 },
        },
        {
          id: "note",
          kind: "note",
          label: {
            en:
              "for is best when you KNOW the count up front.\nwhile is best when you only know the STOPPING CONDITION.\n\nA while loop has no init or update built in —\nyou prepare the variable BEFORE,\nand change it INSIDE the body.",
            sv:
              "for passar när du VET antalet i förväg.\nwhile passar när du bara vet STOPPVILLKORET.\n\nEn while-loop har inget init eller update inbyggt —\ndu förbereder variabeln INNAN,\noch ändrar den I kroppen.",
          },
          baseStyle: { ...noteBoxStyle, marginTop: 16 },
        },
      ],
      steps: [
        {
          narration: {
            en:
              "Left: a for loop. It runs exactly 5 times.\nThe count is hard-coded into the loop itself.",
            sv:
              "Vänster: en for-loop. Den kör exakt 5 varv.\nAntalet är inbyggt i loopen själv.",
          },
          tokenHighlight: ["for"],
        },
        {
          narration: {
            en:
              "Right: a while loop. It runs until n hits 0.\nIf n started as 5 it runs 5 times. If n started as 100 it runs 100.\nThe count is decided by the data, not the code.",
            sv:
              "Höger: en while-loop. Den kör tills n blir 0.\nÄr n från början 5 — 5 varv. Är n från början 100 — 100 varv.\nAntalet bestäms av datan, inte koden.",
          },
          tokenHighlight: ["while"],
        },
        {
          narration: {
            en:
              "Notice: while doesn't have an init or an update slot.\nYou set up the variable BEFORE the loop,\nand you must change it INSIDE the body.\nForget to change it and the loop runs forever.",
            sv:
              "Lägg märke till: while har ingen init eller update.\nDu sätter upp variabeln INNAN loopen,\noch du måste ändra den INNE i kroppen.\nGlömmer du så kör loopen för evigt.",
          },
          tokenHighlight: ["let n = 5;", "n = n - 1;"],
        },
      ],
    },

    // 3. Anatomy
    {
      kind: "explanation",
      title: { en: "while, piece by piece", sv: "while, del för del" },
      demo: [
        {
          id: "code",
          label:
            "while (n > 0) {\n  // body — runs if condition is true\n}",
          baseStyle: codePanelStyle,
        },
      ],
      steps: [
        {
          narration: {
            en:
              "Three parts:\nwhile  ( condition )  { body }",
            sv:
              "Tre delar:\nwhile  ( villkor )  { kropp }",
          },
        },
        {
          narration: {
            en:
              "1.  while  is the keyword.\nLike for, it tells JavaScript 'I'm about to repeat'.",
            sv:
              "1.  while  är nyckelordet.\nLiksom for säger det 'jag ska upprepa'.",
          },
          tokenHighlight: ["while"],
        },
        {
          narration: {
            en:
              "2.  ( condition )  is checked BEFORE each lap.\nIt must end up true or false (a boolean).\nSame kind of expression as in an if.",
            sv:
              "2.  ( villkor )  kollas INNAN varje varv.\nDet måste landa i true eller false (en boolean).\nSamma slags uttryck som i ett if.",
          },
          tokenHighlight: ["(n > 0)"],
        },
        {
          narration: {
            en:
              "3.  { body }  runs when the condition is true.\nWhen the body finishes, JavaScript JUMPS BACK\nto check the condition again.",
            sv:
              "3.  { kropp }  körs när villkoret är true.\nNär kroppen slutar HOPPAR JavaScript TILLBAKA\noch kollar villkoret igen.",
          },
          tokenHighlight: ["{", "}"],
        },
        {
          narration: {
            en:
              "If the condition is false the FIRST time,\nthe body never runs at all.\nA while loop can run zero times.",
            sv:
              "Om villkoret är false FÖRSTA gången\nkörs kroppen aldrig.\nEn while-loop kan köra noll varv.",
          },
        },
      ],
    },

    // 4. Trace walkthrough — countdown from 3
    {
      kind: "explanation",
      title: { en: "Watching while run", sv: "Vi ser while köras" },
      intro: {
        en:
          "Trace example: count down from n = 3 to 0.\nClick to step.",
        sv:
          "Trace-exempel: räkna ner från n = 3 till 0.\nKlicka för att stega.",
      },
      customScene: "countdown-trace",
      demo: [],
      steps: [
        {
          narration: {
            en:
              "We start. n is set to 3.",
            sv:
              "Vi startar. n sätts till 3.",
          },
        },
        {
          narration: {
            en:
              "Reach the while.\nCondition: 3 > 0 → true. Body runs.",
            sv:
              "Vi kommer till while.\nVillkor: 3 > 0 → true. Kroppen körs.",
          },
        },
        {
          narration: {
            en:
              "Body: n = n - 1 → n becomes 2.\nJump back to the condition.",
            sv:
              "Kropp: n = n - 1 → n blir 2.\nHoppa tillbaka till villkoret.",
          },
        },
        {
          narration: {
            en:
              "2 > 0? True. Body runs.",
            sv:
              "2 > 0? True. Kroppen körs.",
          },
        },
        {
          narration: {
            en:
              "n becomes 1. Back to condition.",
            sv:
              "n blir 1. Tillbaka till villkoret.",
          },
        },
        {
          narration: {
            en:
              "1 > 0? True. Body runs.",
            sv:
              "1 > 0? True. Kroppen körs.",
          },
        },
        {
          narration: {
            en:
              "n becomes 0. Back to condition.",
            sv:
              "n blir 0. Tillbaka till villkoret.",
          },
        },
        {
          narration: {
            en:
              "0 > 0? FALSE.\nThe loop ends — we leave it.",
            sv:
              "0 > 0? FALSE.\nLoopen slutar — vi lämnar den.",
          },
        },
        {
          narration: {
            en:
              "return n → 0.\n\nThe body ran 3 times, exactly the starting value of n.",
            sv:
              "return n → 0.\n\nKroppen körde 3 varv, precis n:s startvärde.",
          },
        },
      ],
    },

    // 5. The infinite-loop trap
    {
      kind: "explanation",
      title: { en: "The infinite loop trap", sv: "Oändlig-loop-fällan" },
      intro: {
        en:
          "If the variable in the condition NEVER changes,\nthe loop runs forever and freezes the program.",
        sv:
          "Om variabeln i villkoret ALDRIG ändras\nkör loopen för evigt och fryser programmet.",
      },
      demo: [
        {
          id: "bad",
          label:
            "let n = 5;\nwhile (n > 0) {\n  // we forgot to change n!\n  // 5 > 0 is true forever\n}",
          baseStyle: codePanelStyle,
        },
        {
          id: "good",
          label:
            "let n = 5;\nwhile (n > 0) {\n  n = n - 1;  // ← this is the fix\n}",
          baseStyle: { ...codePanelStyle, marginTop: 16 },
        },
        {
          id: "note",
          kind: "note",
          label: {
            en:
              "Rule: every while loop should change the\nvariable used in its condition,\nin a way that EVENTUALLY makes the condition false.\n\nIf you write while (true) on purpose, you need\na break inside (we don't use that yet).",
            sv:
              "Regel: varje while-loop bör ändra variabeln\nsom används i villkoret\npå ett sätt som TILL SLUT gör villkoret false.\n\nOm du skriver while (true) med flit\nbehövs ett break inuti (det använder vi inte än).",
          },
          baseStyle: { ...noteBoxStyle, marginTop: 16 },
        },
      ],
      steps: [
        {
          narration: {
            en:
              "Left: a broken loop. n stays 5 forever.\n5 > 0 is always true. The loop never ends.\nYour browser tab would freeze.",
            sv:
              "Vänster: trasig loop. n stannar på 5 för evigt.\n5 > 0 är alltid true. Loopen slutar aldrig.\nWebbläsaren skulle frysa.",
          },
          highlight: ["bad"],
        },
        {
          narration: {
            en:
              "Right: the fix. Inside the body we change n.\nEach lap n drops by 1, so eventually it hits 0\nand the condition becomes false.",
            sv:
              "Höger: lösningen. I kroppen ändrar vi n.\nVarje varv minskar n med 1, så till slut blir det 0\noch villkoret blir false.",
          },
          highlight: ["good"],
          tokenHighlight: ["n = n - 1;"],
        },
        {
          narration: {
            en:
              "Tip: when you write a while loop,\nask yourself 'what makes this STOP?'\nIf you can't answer, you have an infinite loop.",
            sv:
              "Tips: när du skriver en while-loop,\nfråga dig 'vad gör att den STOPPAR?'\nKan du inte svara har du en oändlig loop.",
          },
        },
      ],
    },

    // 6. Practice — count UP to n (n hardcoded to 10) — chip-style, no distractors (first chip in L7)
    {
      kind: "js-chip-assignment",
      title: { en: "Practice: count up to n", sv: "Övning: räkna upp till n" },
      prompt: {
        en:
          "n is set to 10. Build a while loop that counts up to it.",
        sv:
          "n är satt till 10. Bygg en while-loop som räknar upp till det.",
      },
      puzzles: [
        // p1: while keyword (vs for/do/if)
        {
          prompt: {
            en: "Which keyword runs a loop while a condition holds?",
            sv: "Vilket nyckelord kör en loop så länge ett villkor stämmer?",
          },
          template:
            "let count = 0;\nlet n = 10;\n[[]] (count < n) {\n  count = count + 1;\n}\nreturn count;",
          chips: ["while", "for", "do", "if"],
          solution: ["while"],
        },
        // p2: ( ) around the condition
        {
          prompt: {
            en: "What wraps the while condition?",
            sv: "Vad omger while-villkoret?",
          },
          template:
            "let count = 0;\nlet n = 10;\nwhile [[]]count < n[[]] {\n  count = count + 1;\n}\nreturn count;",
          chips: ["(", ")", "{", "}"],
          solution: ["(", ")"],
        },
        // p3: { } around the loop body
        {
          prompt: {
            en: "What wraps the loop body?",
            sv: "Vad omger loop-kroppen?",
          },
          template:
            "let count = 0;\nlet n = 10;\nwhile (count < n) [[]]\n  count = count + 1;\n[[]]\nreturn count;",
          chips: ["{", "}", "(", ")"],
          solution: ["{", "}"],
        },
        // p4: < condition operator (coins/goal scenario)
        {
          intro: {
            en: "Same shape — count coins up to a goal.",
            sv: "Samma form — räkna mynt upp till ett mål.",
          },
          prompt: {
            en: "Which operator keeps the loop running while coins hasn't reached the goal?",
            sv: "Vilken operator håller loopen igång medan mynt inte nått målet?",
          },
          template:
            "let coins = 0;\nlet goal = 5;\nwhile (coins [[]] goal) {\n  coins = coins + 1;\n}\nreturn coins;",
          chips: ["<", "<=", ">", ">="],
          solution: ["<"],
        },
        // p5: synthesis — all syntax pieces together
        {
          prompt: {
            en: "Now place all the syntax pieces you've practised.",
            sv: "Placera nu alla syntaxdelar du övat på.",
          },
          template:
            "let count = 0;\nlet n = 10;\n[[]] [[]]count [[]] n[[]] [[]]\n  count = count + 1;\n[[]]\nreturn count;",
          chips: ["while", "(", "<", ")", "{", "}", "for", ">"],
          solution: ["while", "(", "<", ")", "{", "}"],
        },
      ],
      legend: [
        {
          name: { en: "while", sv: "while" },
          syntax: "while (condition) { ... }",
          example: "while (count < n) { ... }",
          note: {
            en: "Repeats the body while the condition is true.",
            sv: "Upprepar kroppen så länge villkoret är true.",
          },
        },
        {
          name: { en: "<", sv: "<" },
          syntax: "a < b",
          example: "count < n",
          note: {
            en: "True when a is less than b.",
            sv: "Sant när a är mindre än b.",
          },
        },
      ],
    },

    // 7. Practice — halve until below 1 — chip-style with distractors
    {
      kind: "js-chip-assignment",
      title: {
        en: "Practice: halving",
        sv: "Övning: halvera",
      },
      prompt: {
        en:
          "Halve n until it's below 1. Count the halvings.",
        sv:
          "Halvera n tills den är under 1. Räkna halveringarna.",
      },
      puzzles: [
        // p1: n / 2 halving expression (vs n * 2, n - 2, n + 2)
        {
          prompt: {
            en: "Which expression halves n each lap?",
            sv: "Vilket uttryck halverar n varje varv?",
          },
          template:
            "let count = 0;\nwhile (n >= 1) {\n  n = [[]];\n  count = count + 1;\n}\nreturn count;",
          chips: ["n / 2", "n * 2", "n - 2", "n + 2"],
          solution: ["n / 2"],
        },
        // p2: >= condition (vs >, <=, <)
        {
          prompt: {
            en: "Which condition keeps looping while n is at least 1?",
            sv: "Vilket villkor håller loopen igång så länge n är minst 1?",
          },
          template:
            "let count = 0;\nwhile ([[]] 1) {\n  n = n / 2;\n  count = count + 1;\n}\nreturn count;",
          chips: ["n >=", "n >", "n <=", "n <"],
          solution: ["n >="],
        },
        // p3: { } around the body
        {
          prompt: {
            en: "What wraps the loop body?",
            sv: "Vad omger loop-kroppen?",
          },
          template:
            "let count = 0;\nwhile (n >= 1) [[]]\n  n = n / 2;\n  count = count + 1;\n[[]]\nreturn count;",
          chips: ["{", "}", "(", ")"],
          solution: ["{", "}"],
        },
        // p4: n - 5 subtraction expression (subtract 5 scenario)
        {
          intro: {
            en: "Same shape — subtract 5 until n is no longer positive.",
            sv: "Samma form — dra 5 tills n inte längre är positiv.",
          },
          prompt: {
            en: "Which expression subtracts 5 from n each lap?",
            sv: "Vilket uttryck drar 5 från n varje varv?",
          },
          template:
            "let count = 0;\nwhile (n > 0) {\n  n = [[]];\n  count = count + 1;\n}\nreturn count;",
          chips: ["n - 5", "n + 5", "n * 5", "n / 5"],
          solution: ["n - 5"],
        },
        // p5: synthesis — all syntax pieces together
        {
          prompt: {
            en: "Now place all the syntax pieces you've practised.",
            sv: "Placera nu alla syntaxdelar du övat på.",
          },
          template:
            "let count = 0;\nwhile ([[]] 1) [[]]\n  n = [[]];\n  count = count + 1;\n[[]]\nreturn count;",
          chips: ["n >=", "{", "n / 2", "}", "n >", "n * 2"],
          solution: ["n >=", "{", "n / 2", "}"],
        },
      ],
      legend: [
        {
          name: { en: "/", sv: "/" },
          syntax: "a / b",
          example: "n / 2",
          note: {
            en: "Divides a by b. Same as ÷ in maths.",
            sv: "Dividerar a med b. Samma som ÷ i matten.",
          },
        },
        {
          name: { en: ">=", sv: ">=" },
          syntax: "a >= b",
          example: "n >= 1",
          note: {
            en: "True when a is greater than or equal to b.",
            sv: "Sant när a är större än eller lika med b.",
          },
        },
      ],
    },

    // 8. Final — keep doubling past a limit (typed-input)
    {
      kind: "js-typed-assignment",
      title: { en: "Final: keep doubling", sv: "Slutövning: fördubbla" },
      prompt: {
        en:
          "Start at n = 1. Keep doubling n while it is still less than `limit`.\nReturn the final value of n (the first one that REACHED OR PASSED limit).\n\nFor limit = 10:  1 → 2 → 4 → 8 → 16. Answer: 16.\nFor limit = 100: 1 → 2 → 4 → 8 → 16 → 32 → 64 → 128. Answer: 128.",
        sv:
          "Börja vid n = 1. Fördubbla n så länge den är mindre än `limit`.\nReturnera n:s slutvärde (det första som nått eller passerat limit).\n\nFör limit = 10:  1 → 2 → 4 → 8 → 16. Svar: 16.\nFör limit = 100: 1 → 2 → 4 → 8 → 16 → 32 → 64 → 128. Svar: 128.",
      },
      varNames: ["limit"],
      template:
        "let n = 1;\nwhile ([[input:cond]]) {\n  n = [[input:body]];\n}\nreturn n;\n",
      tests: [
        { label: { en: "limit = 10", sv: "limit = 10" }, vars: { limit: 10 }, expected: 16 },
        { label: { en: "limit = 100", sv: "limit = 100" }, vars: { limit: 100 }, expected: 128 },
        { label: { en: "limit = 1", sv: "limit = 1" }, vars: { limit: 1 }, expected: 1 },
        { label: { en: "limit = 2", sv: "limit = 2" }, vars: { limit: 2 }, expected: 2 },
        { label: { en: "limit = 50", sv: "limit = 50" }, vars: { limit: 50 }, expected: 64 },
        { label: { en: "limit = 1000", sv: "limit = 1000" }, vars: { limit: 1000 }, expected: 1024 },
      ],
      goalHint: {
        en:
          "Keep going while n is still BELOW limit. The condition is  n < limit. The body is  n * 2.",
        sv:
          "Fortsätt så länge n fortfarande är UNDER limit. Villkoret är  n < limit. Kroppen är  n * 2.",
      },
      allegory: {
        kind: "loop-result",
        config: {
          inputKeys: ["limit"],
          resultLabel: { en: "n", sv: "n" },
          theme: "countdown",
        },
      },
      legend: [
        {
          name: { en: "*  (multiply)", sv: "*  (multiplicera)" },
          syntax: "a * b",
          example: "n * 2",
          note: {
            en: "Multiplies two numbers. n * 2 doubles n.",
            sv: "Multiplicerar två tal. n * 2 fördubblar n.",
          },
        },
        {
          name: { en: "<", sv: "<" },
          syntax: "a < b",
          example: "n < limit",
          note: {
            en: "True when a is strictly less than b.",
            sv: "Sant när a är strikt mindre än b.",
          },
        },
      ],
    },

    // L7 final lab — savings goal. Repeats while a running total falls short
    // of a target; counts the iterations. Distinct from the chapter's
    // count-up-to-n and keep-doubling exercises (linear addition until cross).
    {
      kind: "exercise",
      title: { en: "Lab: Save Up Money", sv: "Labb: Spara ihop" },
      prompt: {
        en:
          "Count how many weeks of fixed savings are needed to reach a goal.\n\n" +
          "User stories (variable names are suggestions):\n" +
          "1. Declare a number variable (e.g. goal) — the amount you want to save (e.g. 1000).\n" +
          "2. Declare a number variable (e.g. weekly) — how much you save each week (e.g. 75).\n" +
          "3. Declare a number variable (e.g. saved) and set it to 0.\n" +
          "4. Declare a number variable (e.g. weeks) and set it to 0.\n" +
          "5. Use a while loop that runs while saved < goal:\n" +
          "   - add weekly to saved\n" +
          "   - increment weeks by 1\n" +
          "6. Print weeks.\n" +
          "7. Print saved (the final amount, after the loop ends).",
        sv:
          "Räkna hur många veckors fast sparande som krävs för att nå ett mål.\n\n" +
          "Användarberättelser (variabelnamnen är förslag):\n" +
          "1. Deklarera en talvariabel (t.ex. goal) — beloppet du vill spara (t.ex. 1000).\n" +
          "2. Deklarera en talvariabel (t.ex. weekly) — hur mycket du sparar per vecka (t.ex. 75).\n" +
          "3. Deklarera en talvariabel (t.ex. saved) och sätt den till 0.\n" +
          "4. Deklarera en talvariabel (t.ex. weeks) och sätt den till 0.\n" +
          "5. Använd en while-loop som körs så länge saved < goal:\n" +
          "   - lägg weekly till saved\n" +
          "   - öka weeks med 1\n" +
          "6. Skriv ut weeks.\n" +
          "7. Skriv ut saved (det slutgiltiga beloppet efter loopen).",
      },
      starterJs:
        "// Follow the user stories shown to the left.\n\n" +
        "// 1-4. Declare goal, weekly, saved, weeks:\n\n\n\n\n\n" +
        "// 5. while loop — keep adding weekly until saved reaches goal:\n\n\n\n\n" +
        "// 6-7. Print weeks, then saved:\n\n",
      tests: [
        {
          label: {
            en: "Console shows exactly two lines",
            sv: "Konsolen visar exakt två rader",
          },
          assert:
            "var c = window.__console || []; return c.length === 2;",
          hint: {
            en: "One console.log for weeks (after the loop), one for saved.",
            sv: "En console.log för weeks (efter loopen), en för saved.",
          },
        },
        {
          label: {
            en: "Each variable you print is one you declared",
            sv: "Varje variabel du skriver ut är en du deklarerat",
          },
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
          hint: {
            en:
              "If a console.log line shows nothing or the wrong value, double-check the variable name — it must match what you declared with let.",
            sv:
              "Om en console.log-rad är tom eller fel, dubbelkolla variabelnamnet — det måste matcha det du deklarerade med let.",
          },
        },
        {
          label: {
            en: "Line 1 (weeks) is a positive whole number",
            sv: "Rad 1 (weeks) är ett positivt heltal",
          },
          assert:
            "var c = window.__console || [];" +
            "if (c.length < 1) return false;" +
            "var w = Number(c[0].text);" +
            "return Number.isInteger(w) && w > 0;",
          hint: {
            en: "weeks should be incremented inside the loop and printed at the end.",
            sv: "weeks ska ökas i loopen och skrivas ut efter loopen.",
          },
        },
        {
          label: {
            en: "Line 2 (saved) is a positive number",
            sv: "Rad 2 (saved) är ett positivt tal",
          },
          assert:
            "var c = window.__console || [];" +
            "if (c.length < 2) return false;" +
            "var s = Number(c[1].text);" +
            "return Number.isFinite(s) && s > 0;",
          hint: {
            en: "saved should hold the running total at the end of the loop.",
            sv: "saved ska innehålla totalsumman när loopen är klar.",
          },
        },
        {
          label: {
            en: "saved equals weekly × weeks (the loop accumulated correctly)",
            sv: "saved är lika med weekly × weeks (loopen ackumulerade rätt)",
          },
          assert:
            "var c = window.__console || [];" +
            "if (c.length < 2) return false;" +
            "var weeks = Number(c[0].text);" +
            "var saved = Number(c[1].text);" +
            "if (!Number.isFinite(weeks) || !Number.isFinite(saved)) return false;" +
            "if (weeks <= 0) return false;" +
            "var weekly = saved / weeks;" +
            "if (!Number.isFinite(weekly) || weekly <= 0) return false;" +
            "return Math.abs(weekly * weeks - saved) < 0.0001;",
          hint: {
            en:
              "Inside the loop: saved = saved + weekly; weeks = weeks + 1. The loop runs until saved >= goal.",
            sv:
              "I loopen: saved = saved + weekly; weeks = weeks + 1. Loopen kör tills saved >= goal.",
          },
        },
        {
          label: {
            en: "Code uses a while loop",
            sv: "Koden använder en while-loop",
          },
          assert:
            "var src = window.__userSrc || '';" +
            "return /\\bwhile\\s*\\(/.test(src);",
          hint: {
            en: "Use the form: while (saved < goal) { ... }",
            sv: "Använd formen: while (saved < goal) { ... }",
          },
        },
      ],
    },
  ],
};
