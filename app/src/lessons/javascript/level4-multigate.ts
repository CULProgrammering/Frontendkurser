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
        },
        {
          narration: {
            en:
              "Picture two gates in a row.\nYou must pass BOTH to get through.\nMiss one and you're stopped.",
            sv:
              "Föreställ dig två grindar i rad.\nDu måste passera BÅDA för att komma fram.\nMissar du en så stoppas du.",
          },
        },
        {
          narration: {
            en:
              "The little table on the left shows all four cases.\nOnly the FIRST line ends in true.",
            sv:
              "Lilla tabellen till vänster visar alla fyra fall.\nBara FÖRSTA raden slutar i true.",
          },
        },
        {
          narration: {
            en:
              "Read aloud: 'age 18 or more AND has a ticket'.\nIf either fails, the whole thing is false.",
            sv:
              "Läs högt: 'ålder 18 eller mer OCH har biljett'.\nFaller ett av dem så blir allt false.",
          },
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
        // p1: code A — combine with && and second operand (the new piece this lesson)
        {
          prompt: {
            en: "Combine the two checks with the right operator.",
            sv: "Kombinera de två kontrollerna med rätt operator.",
          },
          template:
            'if (age >= 18 [[]] [[]]) {\n  return "let in";\n} else {\n  return "stopped";\n}',
          chips: ["&&", "hasTicket"],
          solution: ["&&", "hasTicket"],
        },
        // p2: code A — full assembly
        {
          prompt: {
            en: "Put it all together.",
            sv: "Sätt ihop hela.",
          },
          template:
            "if ([[]] [[]] [[]]) {\n  return [[]];\n} else {\n  return [[]];\n}",
          chips: ["age >= 18", "&&", "hasTicket", '"let in"', '"stopped"'],
          solution: ["age >= 18", "&&", "hasTicket", '"let in"', '"stopped"'],
          alternatives: [["hasTicket", "&&", "age >= 18", '"let in"', '"stopped"']],
        },
        // p3: code B (fuel/hasKey) — combine with && and second operand
        {
          intro: {
            en:
              "Now: enough fuel AND has the key. Same shape with different variables.",
            sv:
              "Nu: tillräckligt med bränsle OCH har nyckeln. Samma form med andra variabler.",
          },
          prompt: {
            en: "Combine the two checks with the right operator.",
            sv: "Kombinera de två kontrollerna med rätt operator.",
          },
          template:
            'if (fuel >= 10 [[]] [[]]) {\n  return "drive";\n} else {\n  return "wait";\n}',
          chips: ["&&", "hasKey"],
          solution: ["&&", "hasKey"],
        },
        // p4: code B — full assembly
        {
          intro: {
            en:
              "Now: enough fuel AND has the key. Same shape with different variables.",
            sv:
              "Nu: tillräckligt med bränsle OCH har nyckeln. Samma form med andra variabler.",
          },
          prompt: {
            en: "Put it all together.",
            sv: "Sätt ihop hela.",
          },
          template:
            "if ([[]] [[]] [[]]) {\n  return [[]];\n} else {\n  return [[]];\n}",
          chips: ["fuel >= 10", "&&", "hasKey", '"drive"', '"wait"'],
          solution: ["fuel >= 10", "&&", "hasKey", '"drive"', '"wait"'],
          alternatives: [["hasKey", "&&", "fuel >= 10", '"drive"', '"wait"']],
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
        },
        {
          narration: {
            en:
              "Picture two doors into the same room.\nWalk through any one and you're inside.",
            sv:
              "Föreställ dig två dörrar till samma rum.\nGår du in genom någon av dem är du inne.",
          },
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
        // p1: code A — pick the right operator (with distractors)
        {
          prompt: {
            en: "Which operator means 'one side is enough'?",
            sv: "Vilken operator betyder 'en sida räcker'?",
          },
          template:
            'if (isVip [[]] hasTicket) {\n  return "let in";\n} else {\n  return "stopped";\n}',
          chips: ["||", "&&", "!"],
          solution: ["||"],
        },
        // p2: code A — full assembly
        {
          prompt: {
            en: "Put it all together.",
            sv: "Sätt ihop hela.",
          },
          template:
            "if ([[]] [[]] [[]]) {\n  return [[]];\n} [[]] {\n  return [[]];\n}",
          chips: [
            "isVip",
            "||",
            "hasTicket",
            '"let in"',
            "else",
            '"stopped"',
            "&&",
            "!",
          ],
          solution: [
            "isVip",
            "||",
            "hasTicket",
            '"let in"',
            "else",
            '"stopped"',
          ],
          alternatives: [
            [
              "hasTicket",
              "||",
              "isVip",
              '"let in"',
              "else",
              '"stopped"',
            ],
          ],
        },
        // p3: code B (isStudent/hasCoupon) — pick the right operator
        {
          intro: {
            en:
              "Now: student OR holds a coupon → discount. Same shape, different variables.",
            sv:
              "Nu: student ELLER har kupong → rabatt. Samma form, andra variabler.",
          },
          prompt: {
            en: "Which operator means 'one side is enough'?",
            sv: "Vilken operator betyder 'en sida räcker'?",
          },
          template:
            'if (isStudent [[]] hasCoupon) {\n  return "discount";\n} else {\n  return "full";\n}',
          chips: ["||", "&&", "!"],
          solution: ["||"],
        },
        // p4: code B — full assembly
        {
          intro: {
            en:
              "Now: student OR holds a coupon → discount. Same shape, different variables.",
            sv:
              "Nu: student ELLER har kupong → rabatt. Samma form, andra variabler.",
          },
          prompt: {
            en: "Put it all together.",
            sv: "Sätt ihop hela.",
          },
          template:
            "if ([[]] [[]] [[]]) {\n  return [[]];\n} [[]] {\n  return [[]];\n}",
          chips: [
            "isStudent",
            "||",
            "hasCoupon",
            '"discount"',
            "else",
            '"full"',
            "&&",
            "!",
          ],
          solution: [
            "isStudent",
            "||",
            "hasCoupon",
            '"discount"',
            "else",
            '"full"',
          ],
          alternatives: [
            [
              "hasCoupon",
              "||",
              "isStudent",
              '"discount"',
              "else",
              '"full"',
            ],
          ],
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
        },
        {
          narration: {
            en:
              "Useful when the variable already names\nthe OPPOSITE of what you want to check.\n\nExample: a variable called `banned`.\nWe want to let people in when they're NOT banned.\nSo we use !banned.",
            sv:
              "Användbart när variabeln redan beskriver\nMOTSATSEN av det du vill kolla.\n\nExempel: en variabel som heter `banned`.\nVi vill släppa in folk som INTE är bannade.\nSå vi använder !banned.",
          },
        },
        {
          narration: {
            en:
              "Read aloud: '!banned' is 'not banned'.\nIt's true when banned is false.",
            sv:
              "Läs högt: '!banned' är 'inte bannad'.\nDet är sant när banned är false.",
          },
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
        // p1: code A — place ! and the variable
        {
          prompt: {
            en: "Use ! to flip the variable's value.",
            sv: "Använd ! för att vända variabelns värde.",
          },
          template:
            'if ([[]][[]]) {\n  return "let in";\n} else {\n  return "stopped";\n}',
          chips: ["!", "banned", "&&", "||"],
          solution: ["!", "banned"],
        },
        // p2: code A — full assembly
        {
          prompt: {
            en: "Put it all together.",
            sv: "Sätt ihop hela.",
          },
          template:
            "if ([[]][[]]) {\n  return [[]];\n} [[]] {\n  return [[]];\n}",
          chips: ["!", "banned", '"let in"', "else", '"stopped"', "&&", "||"],
          solution: ["!", "banned", '"let in"', "else", '"stopped"'],
        },
        // p3: code B (raining) — place ! and the variable
        {
          prompt: {
            en: "Use ! to flip the variable's value.",
            sv: "Använd ! för att vända variabelns värde.",
          },
          template:
            'if ([[]][[]]) {\n  return "walk";\n} else {\n  return "umbrella";\n}',
          chips: ["!", "raining", "&&", "||"],
          solution: ["!", "raining"],
        },
        // p4: code B — full assembly
        {
          prompt: {
            en: "Put it all together.",
            sv: "Sätt ihop hela.",
          },
          template:
            "if ([[]][[]]) {\n  return [[]];\n} [[]] {\n  return [[]];\n}",
          chips: ["!", "raining", '"walk"', "else", '"umbrella"', "&&", "||"],
          solution: ["!", "raining", '"walk"', "else", '"umbrella"'],
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
        },
        {
          narration: {
            en:
              "Then we add && !banned at the end.\nNow ANY winning combination must also pass\nthe 'not banned' check.",
            sv:
              "Sen lägger vi till && !banned på slutet.\nNu måste VARJE vinnande kombination också klara\n'inte bannad'-kontrollen.",
          },
        },
        {
          narration: {
            en:
              "Tip: when you read the line aloud,\nthe parentheses tell you where to pause.\nIf you can't read it cleanly, add more parens.",
            sv:
              "Tips: när du läser raden högt\nvisar parenteserna var du ska pausa.\nKan du inte läsa rent — lägg till fler parenteser.",
          },
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
  ],
};
