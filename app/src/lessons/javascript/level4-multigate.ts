import type { Lesson } from "../../types";
import { codePanelStyle, noteBoxStyle } from "./_shared";

export const multiGateLesson: Lesson = {
  id: "conditionals-bouncer",
  title: { en: "4. The Bouncer — &&, || and !", sv: "4. Dörrvakten — &&, || och !" },
  summary: {
    en: "Combine conditions with and, or, not.",
    sv: "Kombinera villkor med och, eller, inte.",
  },
  slides: [
    // 1. Intro — bouncer stick-figure scene
    {
      kind: "explanation",
      title: { en: "More than one check", sv: "Fler än en kontroll" },
      intro: {
        en: "Sometimes one condition isn't enough.",
        sv: "Ibland räcker inte ett villkor.",
      },
      customScene: "bouncer",
      demo: [],
      steps: [
        {
          narration: {
            en: "You walk up to a club. The bouncer is at the door.",
            sv: "Du går mot en klubb. Dörrvakten står vid dörren.",
          },
        },
        {
          narration: {
            en: "Check one: are you old enough?",
            sv: "Kontroll ett: är du gammal nog?",
          },
        },
        {
          narration: {
            en: "Check two: do you have a ticket?",
            sv: "Kontroll två: har du biljett?",
          },
        },
        {
          narration: {
            en: "Check three: are you NOT on the ban list?",
            sv: "Kontroll tre: står du INTE på avstängningslistan?",
          },
        },
        {
          narration: {
            en:
              "All three matter at the same time.\nFor that we need ways to COMBINE conditions.",
            sv:
              "Alla tre spelar roll samtidigt.\nFör det behöver vi sätt att KOMBINERA villkor.",
          },
        },
      ],
    },

    // 2. && — and
    {
      kind: "explanation",
      title: { en: "&&  —  and (both)", sv: "&&  —  och (båda)" },
      intro: {
        en: "&& means 'and'. Both sides must be true.",
        sv: "&& betyder 'och'. Båda sidor måste vara sanna.",
      },
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
          narration: {
            en:
              "&& goes BETWEEN two conditions.\nLeft side AND right side — both must be true.",
            sv:
              "&& står MELLAN två villkor.\nVänster sida OCH höger sida — båda måste vara sanna.",
          },
          tokenHighlight: ["&&"],
        },
        {
          narration: {
            en:
              "Picture two gates in a row.\nYou must pass BOTH to get through.\nMiss one and you're stopped.",
            sv:
              "Föreställ dig två grindar i rad.\nDu måste passera BÅDA för att komma fram.\nMissar du en så stoppas du.",
          },
          tokenHighlight: ["age >= 18", "hasTicket"],
        },
        {
          narration: {
            en:
              "The little table below shows all four cases.\nOnly the FIRST line ends in true.",
            sv:
              "Lilla tabellen nedanför visar alla fyra fall.\nBara FÖRSTA raden slutar i true.",
          },
        },
        {
          narration: {
            en:
              "Read aloud: 'age 18 or more AND has a ticket'.\nIf either fails, the whole thing is false.",
            sv:
              "Läs högt: 'ålder 18 eller mer OCH har biljett'.\nFaller ett av dem så blir allt false.",
          },
          tokenHighlight: ["age >= 18 && hasTicket"],
        },
      ],
    },

    // 3. Practice — && — chip-style, no distractors (first chip in L4)
    {
      kind: "js-chip-assignment",
      title: { en: "Practice: age AND ticket", sv: "Övning: ålder OCH biljett" },
      prompt: {
        en:
          "Build the condition: 18 or older AND has a ticket.",
        sv:
          "Bygg villkoret: 18 eller äldre OCH har biljett.",
      },
      puzzles: [
        // p1: && operator (vs ||, !, ===)
        {
          prompt: {
            en: "Which operator means 'both must be true'?",
            sv: "Vilken operator betyder 'båda måste vara sanna'?",
          },
          template:
            'if (age >= 18 [[]] hasTicket) {\n  return "let in";\n} else {\n  return "stopped";\n}',
          chips: ["&&", "||", "!", "==="],
          solution: ["&&"],
        },
        // p2: ( ) around the condition
        {
          prompt: {
            en: "What wraps the combined condition?",
            sv: "Vad omger det kombinerade villkoret?",
          },
          template:
            'if [[]]age >= 18 && hasTicket[[]] {\n  return "let in";\n} else {\n  return "stopped";\n}',
          chips: ["(", ")", "{", "}"],
          solution: ["(", ")"],
        },
        // p3: { } around the if body
        {
          prompt: {
            en: "What wraps the if body?",
            sv: "Vad omger if-kroppen?",
          },
          template:
            'if (age >= 18 && hasTicket) [[]]\n  return "let in";\n[[]] else {\n  return "stopped";\n}',
          chips: ["{", "}", "(", ")"],
          solution: ["{", "}"],
        },
        // p4: ; after return value (fuel/hasKey scenario)
        {
          intro: {
            en: "Same shape — enough fuel AND has the key.",
            sv: "Samma form — tillräckligt bränsle OCH har nyckeln.",
          },
          prompt: {
            en: "What ends a return statement?",
            sv: "Vad avslutar en return-sats?",
          },
          template:
            'if (fuel >= 10 && hasKey) {\n  return "drive"[[]]\n} else {\n  return "wait";\n}',
          chips: [";", ",", ".", ":"],
          solution: [";"],
        },
        // p5: synthesis — all syntax pieces together
        {
          prompt: {
            en: "Now place all the syntax pieces you've practised.",
            sv: "Placera nu alla syntaxdelar du övat på.",
          },
          template:
            'if [[]]age >= 18 [[]] hasTicket[[]] [[]]\n  return "let in"[[]]\n[[]] else {\n  return "stopped";\n}',
          chips: ["(", "&&", ")", "{", ";", "}", "||", ","],
          solution: ["(", "&&", ")", "{", ";", "}"],
        },
      ],
      legend: [
        {
          name: { en: "&&", sv: "&&" },
          syntax: "a && b",
          example: "age >= 18 && hasTicket",
          note: {
            en: "True only when BOTH sides are true.",
            sv: "Sant bara när BÅDA sidor är sanna.",
          },
        },
        {
          name: { en: ">=", sv: ">=" },
          syntax: "a >= b",
          example: "age >= 18",
          note: {
            en: "True when a is greater than or equal to b.",
            sv: "Sant när a är större än eller lika med b.",
          },
        },
      ],
    },

    // 4. || — or
    {
      kind: "explanation",
      title: { en: "||  —  or (one is enough)", sv: "||  —  eller (en räcker)" },
      intro: {
        en: "|| means 'or'. One side being true is enough.",
        sv: "|| betyder 'eller'. En sida som är sann räcker.",
      },
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
          narration: {
            en:
              "|| goes BETWEEN two conditions, just like &&.\nBut the rule is the opposite:\nleft OR right — one being true is enough.",
            sv:
              "|| står MELLAN två villkor, precis som &&.\nMen regeln är omvänd:\nvänster ELLER höger — en sann sida räcker.",
          },
          tokenHighlight: ["||"],
        },
        {
          narration: {
            en:
              "Picture two doors into the same room.\nWalk through any one and you're inside.",
            sv:
              "Föreställ dig två dörrar till samma rum.\nGår du in genom någon av dem är du inne.",
          },
          tokenHighlight: ["isVip", "hasTicket"],
        },
        {
          narration: {
            en:
              "The table shows it: only the LAST line is false.\nEverything else has at least one true side.",
            sv:
              "Tabellen visar det: bara SISTA raden är false.\nAlla andra har minst en sann sida.",
          },
        },
        {
          narration: {
            en:
              "Common mix-up: && and || are NOT the same.\n• && is strict — both must be true.\n• || is lenient — one is enough.",
            sv:
              "Vanlig sammanblandning: && och || är INTE samma.\n• && är strikt — båda måste vara sanna.\n• || är slappare — en räcker.",
          },
          tokenHighlight: ["&&", "||"],
        },
      ],
    },

    // 5. Practice — || — chip-style with distractors
    {
      kind: "js-chip-assignment",
      title: { en: "Practice: VIP or ticket", sv: "Övning: VIP eller biljett" },
      prompt: {
        en:
          "VIP OR ticket gets you in. Pick the right operator.",
        sv:
          "VIP ELLER biljett släpper in dig. Välj rätt operator.",
      },
      puzzles: [
        // p1: || operator (vs &&, !, ===)
        {
          prompt: {
            en: "Which operator means 'one side is enough'?",
            sv: "Vilken operator betyder 'en sida räcker'?",
          },
          template:
            'if (isVip [[]] hasTicket) {\n  return "let in";\n} else {\n  return "stopped";\n}',
          chips: ["||", "&&", "!", "==="],
          solution: ["||"],
        },
        // p2: ( ) around the combined condition
        {
          prompt: {
            en: "What wraps the combined condition?",
            sv: "Vad omger det kombinerade villkoret?",
          },
          template:
            'if [[]]isVip || hasTicket[[]] {\n  return "let in";\n} else {\n  return "stopped";\n}',
          chips: ["(", ")", "{", "}"],
          solution: ["(", ")"],
        },
        // p3: { } around the else body
        {
          prompt: {
            en: "What wraps the else body?",
            sv: "Vad omger else-kroppen?",
          },
          template:
            'if (isVip || hasTicket) {\n  return "let in";\n} else [[]]\n  return "stopped";\n[[]]',
          chips: ["{", "}", "(", ")"],
          solution: ["{", "}"],
        },
        // p4: || vs && (isStudent/hasCoupon scenario)
        {
          intro: {
            en: "Student OR holds a coupon — one is enough for a discount.",
            sv: "Student ELLER har kupong — en räcker för rabatt.",
          },
          prompt: {
            en: "Which operator means 'one side is enough'?",
            sv: "Vilken operator betyder 'en sida räcker'?",
          },
          template:
            'if (isStudent [[]] hasCoupon) {\n  return "discount";\n} else {\n  return "full";\n}',
          chips: ["||", "&&", "!", "==="],
          solution: ["||"],
        },
        // p5: synthesis — all syntax pieces together
        {
          prompt: {
            en: "Now place all the syntax pieces you've practised.",
            sv: "Placera nu alla syntaxdelar du övat på.",
          },
          template:
            'if [[]]isVip [[]] hasTicket[[]] [[]]\n  return "let in";\n[[]] else {\n  return "stopped";\n}',
          chips: ["(", "||", ")", "{", "}", "&&", "!"],
          solution: ["(", "||", ")", "{", "}"],
        },
      ],
      legend: [
        {
          name: { en: "||", sv: "||" },
          syntax: "a || b",
          example: "isVip || hasTicket",
          note: {
            en: "True as soon as ONE side is true.",
            sv: "Sant så snart EN sida är sann.",
          },
        },
      ],
    },

    // 6. ! — not
    {
      kind: "explanation",
      title: { en: "!  —  not (flip it)", sv: "!  —  inte (vänd på det)" },
      intro: {
        en:
          "! goes BEFORE one value and flips it:\ntrue becomes false, false becomes true.",
        sv:
          "! står FÖRE ett värde och vänder det:\ntrue blir false, false blir true.",
      },
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
          narration: {
            en:
              "Unlike && and ||, ! takes only ONE value\nand flips it.",
            sv:
              "Till skillnad från && och || tar ! bara ETT värde\noch vänder det.",
          },
          tokenHighlight: ["!"],
        },
        {
          narration: {
            en:
              "Useful when the variable already names\nthe OPPOSITE of what you want to check.\n\nExample: a variable called `banned`.\nWe want to let people in when they're NOT banned.\nSo we use !banned.",
            sv:
              "Användbart när variabeln redan beskriver\nMOTSATSEN av det du vill kolla.\n\nExempel: en variabel som heter `banned`.\nVi vill släppa in folk som INTE är bannade.\nSå vi använder !banned.",
          },
          tokenHighlight: ["!banned"],
        },
        {
          narration: {
            en:
              "Read aloud: '!banned' is 'not banned'.\nIt's true when banned is false.",
            sv:
              "Läs högt: '!banned' är 'inte bannad'.\nDet är sant när banned är false.",
          },
          tokenHighlight: ["!banned"],
        },
      ],
    },

    // 7. Practice — ! — chip-style with distractors
    {
      kind: "js-chip-assignment",
      title: { en: "Practice: not banned", sv: "Övning: inte bannad" },
      prompt: {
        en:
          "Use ! to flip the variable's truth value.",
        sv:
          "Använd ! för att vända variabelns sanningsvärde.",
      },
      puzzles: [
        // p1: ! operator placed before variable (vs &&, ||, ===)
        {
          prompt: {
            en: "Which operator flips a boolean?",
            sv: "Vilken operator vänder en boolean?",
          },
          template:
            'if ([[]]banned) {\n  return "let in";\n} else {\n  return "stopped";\n}',
          chips: ["!", "&&", "||", "==="],
          solution: ["!"],
        },
        // p2: ( ) around !banned condition
        {
          prompt: {
            en: "What wraps the condition?",
            sv: "Vad omger villkoret?",
          },
          template:
            'if [[]]!banned[[]] {\n  return "let in";\n} else {\n  return "stopped";\n}',
          chips: ["(", ")", "{", "}"],
          solution: ["(", ")"],
        },
        // p3: { } around the if body
        {
          prompt: {
            en: "What wraps the if body?",
            sv: "Vad omger if-kroppen?",
          },
          template:
            'if (!banned) [[]]\n  return "let in";\n[[]] else {\n  return "stopped";\n}',
          chips: ["{", "}", "(", ")"],
          solution: ["{", "}"],
        },
        // p4: ! operator (raining scenario)
        {
          intro: {
            en: "Walk when it is NOT raining.",
            sv: "Gå när det INTE regnar.",
          },
          prompt: {
            en: "Which operator flips a boolean?",
            sv: "Vilken operator vänder en boolean?",
          },
          template:
            'if ([[]]raining) {\n  return "walk";\n} else {\n  return "umbrella";\n}',
          chips: ["!", "&&", "||", "==="],
          solution: ["!"],
        },
        // p5: synthesis — all syntax pieces together
        {
          prompt: {
            en: "Now place all the syntax pieces you've practised.",
            sv: "Placera nu alla syntaxdelar du övat på.",
          },
          template:
            'if [[]][[]]banned[[]] [[]]\n  return "let in";\n[[]] else {\n  return "stopped";\n}',
          chips: ["(", "!", ")", "{", "}", "&&", "||"],
          solution: ["(", "!", ")", "{", "}"],
        },
      ],
      legend: [
        {
          name: { en: "!", sv: "!" },
          syntax: "!a",
          example: "!banned",
          note: {
            en: "Flips true to false and false to true.",
            sv: "Vänder true till false och false till true.",
          },
        },
      ],
    },

    // 8. Combining them — parentheses
    {
      kind: "explanation",
      title: { en: "Combining — use parentheses", sv: "Kombinera — använd parenteser" },
      intro: {
        en:
          "You can use &&, || and ! in the SAME condition.\nWhen you do, parentheses make it clear what goes with what.",
        sv:
          "Du kan använda &&, || och ! i SAMMA villkor.\nNär du gör det gör parenteser tydligt vad som hör ihop.",
      },
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
          label: {
            en:
              "Read it left to right:\n• ( isVip OR hasTicket )  — at least one of these,\n• AND  !banned  — and they are not banned.\n\nWithout parentheses the rules are easy to misread.\nAlways group with ( ) when you mix && and ||.",
            sv:
              "Läs vänster till höger:\n• ( isVip ELLER hasTicket )  — minst en av dessa,\n• OCH  !banned  — och de är inte bannade.\n\nUtan parenteser är det lätt att läsa fel.\nGruppera alltid med ( ) när du blandar && och ||.",
          },
          baseStyle: { ...noteBoxStyle, marginTop: 16 },
        },
      ],
      steps: [
        {
          narration: {
            en:
              "The bouncer's full rule:\nthe person needs a ticket OR be a VIP,\nAND they must not be banned.",
            sv:
              "Dörrvaktens fulla regel:\npersonen behöver biljett ELLER vara VIP,\nOCH de får inte vara bannade.",
          },
        },
        {
          narration: {
            en:
              "We wrap the OR in parentheses\nso it's clear which two conditions belong together.",
            sv:
              "Vi sluter OR-uttrycket inom parenteser\nså det är tydligt vilka villkor som hör ihop.",
          },
          tokenHighlight: ["(isVip || hasTicket)"],
        },
        {
          narration: {
            en:
              "Then we add && !banned at the end.\nNow ANY winning combination must also pass\nthe 'not banned' check.",
            sv:
              "Sen lägger vi till && !banned på slutet.\nNu måste VARJE vinnande kombination också klara\n'inte bannad'-kontrollen.",
          },
          tokenHighlight: ["&& !banned"],
        },
        {
          narration: {
            en:
              "Tip: when you read the line aloud,\nthe parentheses tell you where to pause.\nIf you can't read it cleanly, add more parens.",
            sv:
              "Tips: när du läser raden högt\nvisar parenteserna var du ska pausa.\nKan du inte läsa rent — lägg till fler parenteser.",
          },
          tokenHighlight: ["(", ")"],
        },
      ],
    },

    // 9. Final — combine all three (typed-input)
    {
      kind: "js-typed-assignment",
      title: { en: "Final: the bouncer's rule", sv: "Slutövning: dörrvaktens regel" },
      prompt: {
        en:
          "The person is let in if:\n• age is at least 18\n• AND they have a ticket OR are a VIP\n• AND they are NOT banned.\n\nType the full condition into the box.",
        sv:
          "Personen släpps in om:\n• åldern är minst 18\n• OCH de har biljett ELLER är VIP\n• OCH de är INTE bannade.\n\nSkriv hela villkoret i rutan.",
      },
      varNames: ["age", "hasTicket", "isVip", "banned"],
      template:
        '// Combine &&, || and !  —  use parentheses!\nif ([[input:cond]]) {\n  return "let in";\n} else {\n  return "stopped";\n}\n',
      tests: [
        { label: { en: "20 + ticket", sv: "20 + biljett" }, vars: { age: 20, hasTicket: true, isVip: false, banned: false }, expected: "let in" },
        { label: { en: "20 + VIP", sv: "20 + VIP" }, vars: { age: 20, hasTicket: false, isVip: true, banned: false }, expected: "let in" },
        { label: { en: "20 + ticket + VIP", sv: "20 + biljett + VIP" }, vars: { age: 20, hasTicket: true, isVip: true, banned: false }, expected: "let in" },
        { label: { en: "16 + ticket", sv: "16 + biljett" }, vars: { age: 16, hasTicket: true, isVip: false, banned: false }, expected: "stopped" },
        { label: { en: "20, neither", sv: "20, ingetdera" }, vars: { age: 20, hasTicket: false, isVip: false, banned: false }, expected: "stopped" },
        { label: { en: "20 + ticket + banned", sv: "20 + biljett + bannad" }, vars: { age: 20, hasTicket: true, isVip: false, banned: true }, expected: "stopped" },
      ],
      goalHint: {
        en:
          "Try: age >= 18 && (hasTicket || isVip) && !banned. Mind the parentheses around hasTicket || isVip.",
        sv:
          "Försök: age >= 18 && (hasTicket || isVip) && !banned. Tänk på parenteserna runt hasTicket || isVip.",
      },
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
          passLabel: { en: "Let in", sv: "Släpps in" },
          failLabel: { en: "Stopped", sv: "Stoppas" },
        },
      },
    },

    // L4 final lab — smart light. Combines &&, ||, ! with grouping
    // parentheses on a different scenario than the bouncer/door theme.
    {
      kind: "exercise",
      title: { en: "Lab: Smart Light", sv: "Labb: Smart lampa" },
      prompt: {
        en:
          "A smart light should turn on only at night when it senses motion — unless someone has switched it off manually.\n\n" +
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
        sv:
          "En smart lampa ska tändas endast på natten när rörelse upptäcks — om den inte är manuellt avstängd.\n\n" +
          "Användarberättelser (variabelnamnen är förslag — välj egna om du vill):\n" +
          "1. Deklarera en talvariabel (t.ex. hour) mellan 0 och 23.\n" +
          "2. Deklarera en boolesk variabel (t.ex. motion) — true om rörelse upptäcks.\n" +
          "3. Deklarera en boolesk variabel (t.ex. manualOff) — true om brytaren är manuellt av.\n" +
          "4. Deklarera en boolesk variabel (t.ex. lightOn) och sätt den till false.\n" +
          "5. Sätt lightOn till true när ALLA dessa stämmer:\n" +
          "   - motion är true\n" +
          "   - det är natt: hour < 7 ELLER hour >= 19\n" +
          "   - manualOff är INTE true\n" +
          "   Använd && , || och ! tillsammans. Sätt parentes runt natt-kollen.\n" +
          "6. Skriv ut hour, motion, manualOff och lightOn (fyra rader, i den ordningen).",
      },
      starterJs:
        "// Follow the user stories shown to the left.\n\n" +
        "// 1-4. Declare hour, motion, manualOff and lightOn:\n\n\n\n\n\n" +
        "// 5. One assignment that combines &&, || and ! — with parentheses:\n" +
        "// lightOn = ...\n\n\n" +
        "// 6. Print all four values in order:\n\n",
      tests: [
        {
          label: {
            en: "Console shows exactly four lines",
            sv: "Konsolen visar exakt fyra rader",
          },
          assert:
            "var c = window.__console || []; return c.length === 4;",
          hint: {
            en: "Print hour, motion, manualOff, lightOn — one console.log each.",
            sv: "Skriv ut hour, motion, manualOff, lightOn — en console.log var.",
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
            en: "Line 1 is a number between 0 and 23",
            sv: "Rad 1 är ett tal mellan 0 och 23",
          },
          assert:
            "var c = window.__console || [];" +
            "if (c.length < 1) return false;" +
            "var n = Number(c[0].text);" +
            "return Number.isFinite(n) && n >= 0 && n <= 23;",
          hint: {
            en: "Set hour to an integer 0-23.",
            sv: "Sätt hour till ett heltal 0-23.",
          },
        },
        {
          label: {
            en: 'Lines 2-4 are "true" or "false"',
            sv: 'Rad 2-4 är "true" eller "false"',
          },
          assert:
            "var c = window.__console || [];" +
            "if (c.length < 4) return false;" +
            "var ok = function(s){ return s === 'true' || s === 'false'; };" +
            "return ok(c[1].text) && ok(c[2].text) && ok(c[3].text);",
          hint: {
            en: "motion, manualOff and lightOn must all be booleans (not strings).",
            sv: "motion, manualOff och lightOn måste vara booleans (inte strängar).",
          },
        },
        {
          label: {
            en: "lightOn matches the rule given hour, motion and manualOff",
            sv: "lightOn matchar regeln givet hour, motion och manualOff",
          },
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
          hint: {
            en: "lightOn = motion && (hour < 7 || hour >= 19) && !manualOff",
            sv: "lightOn = motion && (hour < 7 || hour >= 19) && !manualOff",
          },
        },
        {
          label: {
            en: "Code uses && , || and ! together",
            sv: "Koden använder && , || och ! tillsammans",
          },
          assert:
            "var src = window.__userSrc || '';" +
            "return /&&/.test(src) && /\\|\\|/.test(src) && /(^|[^!])!\\s*[A-Za-z_$]/.test(src);",
          hint: {
            en: "All three operators are needed: && for AND, || for OR, ! to flip a boolean.",
            sv: "Alla tre operatorer behövs: && för OCH, || för ELLER, ! för att vända en boolean.",
          },
        },
        {
          label: {
            en: "Code uses parentheses to group the night check",
            sv: "Koden använder parenteser för att gruppera natt-kollen",
          },
          assert:
            "var src = window.__userSrc || '';" +
            "return /\\([^()]*\\|\\|[^()]*\\)/.test(src);",
          hint: {
            en: "Wrap the OR in parentheses: (hour < 7 || hour >= 19).",
            sv: "Sätt OR inom parentes: (hour < 7 || hour >= 19).",
          },
        },
      ],
    },
  ],
};
