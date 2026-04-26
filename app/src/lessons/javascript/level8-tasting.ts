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
              "Top: a regular while.\nIf the condition is false on the FIRST check,\nthe body never runs.",
            sv:
              "Överst: vanlig while.\nÄr villkoret false vid FÖRSTA kollen\nkörs kroppen aldrig.",
          },
        },
        {
          narration: {
            en:
              "Bottom: do…while.\nThe body runs FIRST.\nThen the condition is checked at the end.\nIf true → loop again. If false → exit.",
            sv:
              "Nedre: do…while.\nKroppen körs FÖRST.\nSen kollas villkoret på slutet.\nTrue → loopa igen. False → lämna.",
          },
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
        },
        {
          narration: {
            en:
              "2.  { body }  is run once UNCONDITIONALLY,\nthen possibly again.",
            sv:
              "2.  { kropp }  körs en gång UTAN VILLKOR,\nsen ev. fler.",
          },
        },
        {
          narration: {
            en:
              "3.  while ( condition )  is checked AFTER the body.\nSame kind of expression as in a regular while.",
            sv:
              "3.  while ( villkor )  kollas EFTER kroppen.\nSamma slags uttryck som i vanlig while.",
          },
        },
        {
          narration: {
            en:
              "4.  ;  the semicolon at the end IS REQUIRED.\nUnlike while and for, do…while ends with a semicolon\nbecause it ends with an expression, not a block.",
            sv:
              "4.  ;  semikolonet på slutet KRÄVS.\nTill skillnad från while och for slutar do…while med semikolon\neftersom den slutar med ett uttryck, inte ett block.",
          },
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
        // p1: code A — body line + condition
        {
          prompt: {
            en: "Place the body line and the keep-going condition.",
            sv: "Placera kropps-raden och fortsätt-villkoret.",
          },
          template:
            "let count = 0;\ndo {\n  [[]];\n  count = count + 1;\n} while ([[]]);\nreturn count;",
          chips: ["n = n - 7", "n > 0"],
          solution: ["n = n - 7", "n > 0"],
        },
        // p2: code A — full assembly with do/while keywords
        {
          prompt: {
            en: "Put it all together.",
            sv: "Sätt ihop hela.",
          },
          template:
            "let count = 0;\n[[]] {\n  [[]];\n  count = count + 1;\n} [[]] ([[]]);\nreturn count;",
          chips: ["do", "n = n - 7", "while", "n > 0"],
          solution: ["do", "n = n - 7", "while", "n > 0"],
        },
        // p3: code B (add 5 until reaching 100) — body line + condition
        {
          prompt: {
            en: "Place the body line and the keep-going condition.",
            sv: "Placera kropps-raden och fortsätt-villkoret.",
          },
          template:
            "let count = 0;\ndo {\n  [[]];\n  count = count + 1;\n} while ([[]]);\nreturn count;",
          chips: ["n = n + 5", "n < 100"],
          solution: ["n = n + 5", "n < 100"],
        },
        // p4: code B — full assembly with do/while keywords
        {
          prompt: {
            en: "Put it all together.",
            sv: "Sätt ihop hela.",
          },
          template:
            "let count = 0;\n[[]] {\n  [[]];\n  count = count + 1;\n} [[]] ([[]]);\nreturn count;",
          chips: ["do", "n = n + 5", "while", "n < 100"],
          solution: ["do", "n = n + 5", "while", "n < 100"],
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
  ],
};
