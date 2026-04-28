import type { Lesson } from "../../types";
import { codePanelStyle, noteBoxStyle } from "./_shared";

export const tastingLesson: Lesson = {
  id: "loops-tasting",
  title: { en: "4. Tasting — do…while", sv: "4. Smaka av — do…while" },
  summary: {
    en: "Run the body once, THEN check.",
    sv: "Kör kroppen en gång, SEN kolla.",
  },
  slides: [
    // 1. Intro — tasting soup
    {
      kind: "explanation",
      title: { en: "Try it first, then decide", sv: "Prova först, bestäm sen" },
      intro: {
        en:
          "Some loops only KNOW whether to repeat\nafter they've done a lap once.",
        sv:
          "Vissa loopar VET inte om de ska upprepas\nförrän de gjort ett varv.",
      },
      customScene: "tasting",
      demo: [],
      steps: [
        {
          narration: {
            en:
              "You're cooking a soup.\nA bowl is in front of you, hot and steaming.",
            sv:
              "Du lagar en soppa.\nEn skål står framför dig, het och rykande.",
          },
        },
        {
          narration: {
            en:
              "First taste. You can't decide if it needs salt\nuntil you've TASTED it.",
            sv:
              "Första smaken. Du kan inte avgöra om den behöver salt\nförrän du har SMAKAT.",
          },
        },
        {
          narration: {
            en:
              "Hmm — needs salt. Add a pinch.",
            sv:
              "Hmm — behöver salt. Lägg till en nypa.",
          },
        },
        {
          narration: {
            en:
              "Taste again. Still not quite right.",
            sv:
              "Smaka igen. Inte riktigt rätt än.",
          },
        },
        {
          narration: {
            en:
              "More salt.",
            sv:
              "Mer salt.",
          },
        },
        {
          narration: {
            en:
              "Taste again. Now it's good!\n\nNotice: you ALWAYS taste at least once.\nThe decision happens AFTER each taste.\nThat's a do…while loop.",
            sv:
              "Smaka igen. Nu är det bra!\n\nLägg märke till: du smakar ALLTID minst en gång.\nBeslutet kommer EFTER varje smak.\nDet är en do…while-loop.",
          },
        },
      ],
    },

    // 2. while vs do…while — order of check
    {
      kind: "explanation",
      title: { en: "while vs do…while", sv: "while mot do…while" },
      intro: {
        en:
          "The difference is simple but important:\nWHEN does the condition get checked?",
        sv:
          "Skillnaden är enkel men viktig:\nNÄR kollas villkoret?",
      },
      demo: [
        {
          id: "while",
          label:
            "while (n > 0) {\n  // check FIRST\n  // body might not run at all\n}",
          baseStyle: codePanelStyle,
        },
        {
          id: "dowhile",
          label:
            "do {\n  // body runs FIRST\n} while (n > 0);\n  // body always runs at least once",
          baseStyle: { ...codePanelStyle, marginTop: 16 },
        },
        {
          id: "note",
          kind: "note",
          label: {
            en:
              "If n starts at 0:\n• while  →  body runs ZERO times.\n• do…while  →  body runs ONCE, then exits.\n\nThat's the whole difference.\nUse do…while when the body MUST run at least once\n— like 'taste before deciding'.",
            sv:
              "Om n börjar på 0:\n• while  →  kroppen körs NOLL gånger.\n• do…while  →  kroppen körs EN gång, sen lämnas.\n\nDet är hela skillnaden.\nAnvänd do…while när kroppen MÅSTE köras minst en gång\n— som 'smaka innan du bestämmer'.",
          },
          baseStyle: { ...noteBoxStyle, marginTop: 16 },
        },
      ],
      steps: [
        {
          narration: {
            en:
              "Left: a regular while.\nIf the condition is false on the FIRST check,\nthe body never runs.",
            sv:
              "Vänster: vanlig while.\nÄr villkoret false vid FÖRSTA kollen\nkörs kroppen aldrig.",
          },
          tokenHighlight: ["while (n > 0)"],
        },
        {
          narration: {
            en:
              "Right: do…while.\nThe body runs FIRST.\nThen the condition is checked at the end.\nIf true → loop again. If false → exit.",
            sv:
              "Höger: do…while.\nKroppen körs FÖRST.\nSen kollas villkoret på slutet.\nTrue → loopa igen. False → lämna.",
          },
          tokenHighlight: ["do", "} while (n > 0);"],
        },
        {
          narration: {
            en:
              "Example — n = 0:\n• while (n > 0): never runs.\n• do…while (n > 0): runs once, then exits.\n\nThat 'at least once' is the whole point.",
            sv:
              "Exempel — n = 0:\n• while (n > 0): körs aldrig.\n• do…while (n > 0): körs en gång, sen lämnas.\n\n'Minst en gång' är hela poängen.",
          },
        },
      ],
    },

    // 3. Anatomy
    {
      kind: "explanation",
      title: { en: "do…while, piece by piece", sv: "do…while, del för del" },
      demo: [
        {
          id: "code",
          label:
            "do {\n  // body — always runs at least once\n} while (condition);",
          baseStyle: codePanelStyle,
        },
      ],
      steps: [
        {
          narration: {
            en:
              "Four parts:\ndo  { body }  while ( condition ) ;",
            sv:
              "Fyra delar:\ndo  { kropp }  while ( villkor ) ;",
          },
        },
        {
          narration: {
            en:
              "1.  do  is the keyword.\nIt opens the body block.",
            sv:
              "1.  do  är nyckelordet.\nDet öppnar kroppsblocket.",
          },
          tokenHighlight: ["do"],
        },
        {
          narration: {
            en:
              "2.  { body }  is run once UNCONDITIONALLY,\nthen possibly again.",
            sv:
              "2.  { kropp }  körs en gång UTAN VILLKOR,\nsen ev. fler.",
          },
          tokenHighlight: ["{", "}"],
        },
        {
          narration: {
            en:
              "3.  while ( condition )  is checked AFTER the body.\nSame kind of expression as in a regular while.",
            sv:
              "3.  while ( villkor )  kollas EFTER kroppen.\nSamma slags uttryck som i vanlig while.",
          },
          tokenHighlight: ["while (condition)"],
        },
        {
          narration: {
            en:
              "4.  ;  the semicolon at the end IS REQUIRED.\nUnlike while and for, do…while ends with a semicolon\nbecause it ends with an expression, not a block.",
            sv:
              "4.  ;  semikolonet på slutet KRÄVS.\nTill skillnad från while och for slutar do…while med semikolon\neftersom den slutar med ett uttryck, inte ett block.",
          },
          tokenHighlight: [";"],
        },
      ],
    },

    // 4. Trace
    {
      kind: "explanation",
      title: { en: "Watching do…while run", sv: "Vi ser do…while köras" },
      intro: {
        en:
          "Trace example: n = 2.\nThe body subtracts 1 from n and counts a tick.\nWatch the body run BEFORE the condition is checked.",
        sv:
          "Trace-exempel: n = 2.\nKroppen drar 1 från n och räknar ett tick.\nLägg märke till hur kroppen körs INNAN villkoret kollas.",
      },
      customScene: "tasting-trace",
      demo: [],
      steps: [
        {
          narration: {
            en:
              "Set n = 2 and count = 0.",
            sv:
              "Sätt n = 2 och count = 0.",
          },
        },
        {
          narration: {
            en:
              "We hit do.\nThe body will run — no condition checked yet.",
            sv:
              "Vi når do.\nKroppen kommer köras — inget villkor kollat än.",
          },
        },
        {
          narration: {
            en:
              "Body runs. count becomes 1, n becomes 1.\nFirst 'taste'.",
            sv:
              "Kroppen körs. count blir 1, n blir 1.\nFörsta 'smaken'.",
          },
        },
        {
          narration: {
            en:
              "NOW the condition.\n1 > 0? True. Loop back.",
            sv:
              "NU villkoret.\n1 > 0? True. Loopa tillbaka.",
          },
        },
        {
          narration: {
            en:
              "Body runs again. count becomes 2, n becomes 0.\nSecond 'taste'.",
            sv:
              "Kroppen körs igen. count blir 2, n blir 0.\nAndra 'smaken'.",
          },
        },
        {
          narration: {
            en:
              "Condition again.\n0 > 0? FALSE. Leave the loop.",
            sv:
              "Villkoret igen.\n0 > 0? FALSE. Lämna loopen.",
          },
        },
        {
          narration: {
            en:
              "return count → 2.\n\nNotice: even if n had started at 0,\nthe body would still have run once.",
            sv:
              "return count → 2.\n\nLägg märke: även om n började på 0\nskulle kroppen ändå ha körts en gång.",
          },
        },
      ],
    },

    // 5. Practice — at least one subtraction — chip-style, no distractors (first chip in L8)
    {
      kind: "js-chip-assignment",
      title: { en: "Practice: subtract 7", sv: "Övning: dra ifrån 7" },
      prompt: {
        en:
          "Subtract 7 in a do…while loop. Keep going while n is positive.\nThe body runs at least once — even for n = 0.",
        sv:
          "Dra 7 i en do…while-loop. Fortsätt så länge n är positiv.\nKroppen körs minst en gång — även för n = 0.",
      },
      puzzles: [
        // p1: do keyword (vs while/for/if)
        {
          prompt: {
            en: "Which keyword opens the body that runs first?",
            sv: "Vilket nyckelord öppnar kroppen som körs först?",
          },
          template:
            "let count = 0;\n[[]] {\n  n = n - 7;\n  count = count + 1;\n} while (n > 0);\nreturn count;",
          chips: ["do", "while", "for", "if"],
          solution: ["do"],
        },
        // p2: while keyword after the closing }
        {
          prompt: {
            en: "Which keyword comes after the closing } to check the condition?",
            sv: "Vilket nyckelord kommer efter stängande } för att kolla villkoret?",
          },
          template:
            "let count = 0;\ndo {\n  n = n - 7;\n  count = count + 1;\n} [[]] (n > 0);\nreturn count;",
          chips: ["while", "do", "for", "if"],
          solution: ["while"],
        },
        // p3: ; semicolon at the very end (vs , . :)
        {
          prompt: {
            en: "What ends the do…while statement?",
            sv: "Vad avslutar do…while-satsen?",
          },
          template:
            "let count = 0;\ndo {\n  n = n - 7;\n  count = count + 1;\n} while (n > 0)[[]]\nreturn count;",
          chips: [";", ",", ".", ":"],
          solution: [";"],
        },
        // p4: ( ) around the while condition (add 5 scenario)
        {
          intro: {
            en: "Same shape — add 5 until n reaches 100.",
            sv: "Samma form — lägg till 5 tills n når 100.",
          },
          prompt: {
            en: "What wraps the while condition?",
            sv: "Vad omger while-villkoret?",
          },
          template:
            "let count = 0;\ndo {\n  n = n + 5;\n  count = count + 1;\n} while [[]]n < 100[[]];\nreturn count;",
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
            "let count = 0;\n[[]] {\n  n = n - 7;\n  count = count + 1;\n} [[]] [[]]n > 0[[]][[]]\nreturn count;",
          chips: ["do", "while", "(", ")", ";", "for", "if"],
          solution: ["do", "while", "(", ")", ";"],
        },
      ],
      legend: [
        {
          name: { en: "do…while", sv: "do…while" },
          syntax: "do { ... } while (condition);",
          example: "do { n = n - 7; } while (n > 0);",
          note: {
            en: "Body runs once unconditionally. After each lap, the condition decides whether to repeat.",
            sv: "Kroppen körs en gång utan villkor. Efter varje varv avgör villkoret om det ska upprepas.",
          },
        },
      ],
    },

    // 6. Final — keep doubling until limit (typed-input)
    {
      kind: "js-typed-assignment",
      title: { en: "Final: doubling", sv: "Slutövning: fördubbla" },
      prompt: {
        en:
          "Start at `n` (a positive number).\nDouble it (multiply by 2) in a loop.\nKeep going WHILE n is still less than `limit`.\nReturn how many doublings you did.\n\nBecause do…while runs the body once first,\neven if n is already past the limit on entry,\nyou still count one doubling.",
        sv:
          "Börja vid `n` (positivt tal).\nFördubbla (multiplicera med 2) i en loop.\nFortsätt SÅ LÄNGE n är mindre än `limit`.\nReturnera hur många fördubblingar du gjorde.\n\nEftersom do…while kör kroppen en gång först,\nså räknas en fördubbling även om n redan är förbi limit vid start.",
      },
      varNames: ["n", "limit"],
      template:
        "let count = 0;\ndo {\n  n = [[input:body]];\n  count = count + 1;\n} while ([[input:cond]]);\nreturn count;\n",
      tests: [
        { label: { en: "n=1, limit=10", sv: "n=1, limit=10" }, vars: { n: 1, limit: 10 }, expected: 4 },
        { label: { en: "n=1, limit=2", sv: "n=1, limit=2" }, vars: { n: 1, limit: 2 }, expected: 1 },
        { label: { en: "n=5, limit=3", sv: "n=5, limit=3" }, vars: { n: 5, limit: 3 }, expected: 1 },
        { label: { en: "n=2, limit=100", sv: "n=2, limit=100" }, vars: { n: 2, limit: 100 }, expected: 6 },
        { label: { en: "n=1, limit=1000", sv: "n=1, limit=1000" }, vars: { n: 1, limit: 1000 }, expected: 10 },
      ],
      goalHint: {
        en:
          "The body box doubles n: use  n * 2. The condition box keeps going while n is below limit: use  n < limit.",
        sv:
          "Kropps-rutan fördubblar n: använd  n * 2. Villkors-rutan fortsätter så länge n är under limit: använd  n < limit.",
      },
      allegory: {
        kind: "loop-result",
        config: {
          inputKeys: ["n", "limit"],
          resultLabel: { en: "doublings", sv: "fördubblingar" },
          theme: "tasting",
        },
      },
      legend: [
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

    // L8 final lab — refill a cup. Body must run at least once (do…while);
    // counts pours of a fixed size until target is reached. Distinct from
    // the chapter's tasting/subtract-7/doubling exercises.
    {
      kind: "exercise",
      title: { en: "Lab: Refill a Cup", sv: "Labb: Fyll på koppen" },
      prompt: {
        en:
          "Pour a fixed amount of water into a cup until it's full enough; count the pours.\n\n" +
          "User stories (variable names are suggestions):\n" +
          "1. Declare a number variable (e.g. target) — the desired amount in ml (e.g. 250).\n" +
          "2. Declare a number variable (e.g. pourSize) — how much each pour adds (e.g. 60).\n" +
          "3. Declare a number variable (e.g. cup) and set it to 0.\n" +
          "4. Declare a number variable (e.g. pours) and set it to 0.\n" +
          "5. Use a do…while loop: each iteration adds pourSize to cup and increments pours by 1.\n" +
          "   The loop continues while cup < target.\n" +
          "6. Print pours.\n" +
          "7. Print cup (the final volume).\n\n" +
          "do…while runs the body once before checking the condition — useful when at least one pour must happen.",
        sv:
          "Häll en fast mängd vatten i en kopp tills den är tillräckligt full; räkna hällningarna.\n\n" +
          "Användarberättelser (variabelnamnen är förslag):\n" +
          "1. Deklarera en talvariabel (t.ex. target) — önskat belopp i ml (t.ex. 250).\n" +
          "2. Deklarera en talvariabel (t.ex. pourSize) — hur mycket varje hällning lägger till (t.ex. 60).\n" +
          "3. Deklarera en talvariabel (t.ex. cup) och sätt den till 0.\n" +
          "4. Deklarera en talvariabel (t.ex. pours) och sätt den till 0.\n" +
          "5. Använd en do…while-loop: varje iteration lägger till pourSize i cup och ökar pours med 1.\n" +
          "   Loopen fortsätter så länge cup < target.\n" +
          "6. Skriv ut pours.\n" +
          "7. Skriv ut cup (slutvolymen).\n\n" +
          "do…while kör kroppen en gång innan villkoret kollas — bra när minst en hällning måste ske.",
      },
      starterJs:
        "// Follow the user stories shown to the left.\n\n" +
        "// 1-4. Declare target, pourSize, cup, pours:\n\n\n\n\n\n" +
        "// 5. do { ... } while (cup < target);\n\n\n\n\n" +
        "// 6-7. Print pours, then cup:\n\n",
      tests: [
        {
          label: {
            en: "Console shows exactly two lines",
            sv: "Konsolen visar exakt två rader",
          },
          assert:
            "var c = window.__console || []; return c.length === 2;",
          hint: {
            en: "One console.log for pours, one for cup — both AFTER the loop ends.",
            sv: "En console.log för pours, en för cup — båda EFTER loopen.",
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
            en: "Line 1 (pours) is a positive whole number",
            sv: "Rad 1 (pours) är ett positivt heltal",
          },
          assert:
            "var c = window.__console || [];" +
            "if (c.length < 1) return false;" +
            "var p = Number(c[0].text);" +
            "return Number.isInteger(p) && p > 0;",
          hint: {
            en: "pours must be at least 1 because do…while always runs the body once.",
            sv: "pours måste vara minst 1 eftersom do…while alltid kör kroppen en gång.",
          },
        },
        {
          label: {
            en: "Line 2 (cup) equals pours × pourSize",
            sv: "Rad 2 (cup) är pours × pourSize",
          },
          assert:
            "var c = window.__console || [];" +
            "if (c.length < 2) return false;" +
            "var pours = Number(c[0].text);" +
            "var cup = Number(c[1].text);" +
            "if (!Number.isFinite(pours) || !Number.isFinite(cup)) return false;" +
            "if (pours <= 0 || cup <= 0) return false;" +
            "var pourSize = cup / pours;" +
            "return Number.isFinite(pourSize) && pourSize > 0 && Math.abs(pours * pourSize - cup) < 0.0001;",
          hint: {
            en:
              "Inside the loop: cup = cup + pourSize; pours = pours + 1. cup ends up as a multiple of pourSize.",
            sv:
              "I loopen: cup = cup + pourSize; pours = pours + 1. cup blir en multipel av pourSize.",
          },
        },
        {
          label: {
            en: "Code uses do…while",
            sv: "Koden använder do…while",
          },
          assert:
            "var src = window.__userSrc || '';" +
            "return /\\bdo\\s*\\{[\\s\\S]*\\}\\s*while\\s*\\(/.test(src);",
          hint: {
            en: "Use the form: do { ... } while (cup < target);",
            sv: "Använd formen: do { ... } while (cup < target);",
          },
        },
      ],
    },
  ],
};
