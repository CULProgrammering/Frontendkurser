import type { Lesson } from "../../types";
import { codePanelStyle, noteBoxStyle } from "./_shared";

export const conveyorLesson: Lesson = {
  id: "conditionals-recycling",
  title: { en: "3. Recycling — switch", sv: "3. Återvinningen — switch" },
  summary: {
    en: "Sort each item into the right bin.",
    sv: "Sortera varje sak i rätt fack.",
  },
  slides: [
    // 1. Intro — recycling stick-figure scene
    {
      kind: "explanation",
      title: {
        en: "One value, several bins",
        sv: "Ett värde, flera fack",
      },
      intro: {
        en:
          "When you compare ONE thing against several possible values,\nswitch can make the code clearer than a long if-chain.",
        sv:
          "När du jämför EN sak mot flera möjliga värden\nkan switch göra koden tydligare än en lång if-kedja.",
      },
      customScene: "recycling",
      demo: [],
      steps: [
        {
          narration: {
            en:
              "You hold an item.\nIn front of you are the recycling bins.",
            sv:
              "Du håller en sak.\nFramför dig står återvinningskärlen.",
          },
        },
        {
          narration: {
            en: "Paper goes in the paper bin.",
            sv: "Papper hamnar i pappersfacket.",
          },
        },
        {
          narration: {
            en: "Glass goes in the glass bin.",
            sv: "Glas hamnar i glasfacket.",
          },
        },
        {
          narration: {
            en:
              "If you don't know what something is,\nit goes in the rest bin.\nThat's the default.",
            sv:
              "Om du inte vet vad något är\nläggs det i restfacket.\nDet är default.",
          },
        },
      ],
    },

    // 2. From else-if to switch — motivation
    {
      kind: "explanation",
      title: {
        en: "When else-if gets repetitive",
        sv: "När else-if blir tjatigt",
      },
      intro: {
        en:
          "Look how the same variable repeats in every condition.\nswitch is a shorter way to write this.",
        sv:
          "Titta hur samma variabel upprepas i varje villkor.\nswitch är ett kortare sätt att skriva detta.",
      },
      demo: [
        {
          id: "elseif",
          label:
            'if (item === "paper") {\n  return "paper-bin";\n} else if (item === "glass") {\n  return "glass-bin";\n} else if (item === "plastic") {\n  return "plastic-bin";\n} else {\n  return "rest-bin";\n}',
          baseStyle: codePanelStyle,
        },
        {
          id: "switch",
          label:
            'switch (item) {\n  case "paper":\n    return "paper-bin";\n  case "glass":\n    return "glass-bin";\n  case "plastic":\n    return "plastic-bin";\n  default:\n    return "rest-bin";\n}',
          baseStyle: { ...codePanelStyle, marginTop: 16 },
        },
      ],
      steps: [
        {
          narration: {
            en:
              "Left: the else-if chain we already know.\nSee how `item ===` repeats three times?",
            sv:
              "Vänster: else-if-kedjan vi redan kan.\nSe hur `item ===` upprepas tre gånger?",
          },
          tokenHighlight: ["item ==="],
        },
        {
          narration: {
            en:
              "Right: the same logic, written as a switch.\nThe variable name appears ONCE at the top.\nEach case lists just the value to compare against.",
            sv:
              "Höger: samma logik, skriven som switch.\nVariabelnamnet skrivs EN gång överst.\nVarje case listar bara värdet att jämföra mot.",
          },
          tokenHighlight: ["switch (item)", "case"],
        },
        {
          narration: {
            en:
              "switch only fits one shape: comparing one variable\nagainst CONCRETE VALUES (no ranges, no other variables).\nFor temperatures, stick with else-if.",
            sv:
              "switch passar bara en form: jämför en variabel\nmot KONKRETA VÄRDEN (inga intervall, inga andra variabler).\nFör temperaturer — håll dig till else-if.",
          },
          tokenHighlight: ["switch"],
        },
      ],
    },

    // 3. Anatomy of switch — piece by piece
    {
      kind: "explanation",
      title: { en: "switch, piece by piece", sv: "switch, del för del" },
      demo: [
        {
          id: "code",
          label:
            'switch (item) {\n  case "paper":\n    return "paper-bin";\n  case "glass":\n    return "glass-bin";\n  default:\n    return "rest-bin";\n}',
          baseStyle: codePanelStyle,
        },
      ],
      steps: [
        {
          narration: {
            en:
              "Six parts to learn:\nswitch  ( )  { }  case  :  default.",
            sv:
              "Sex delar att lära sig:\nswitch  ( )  { }  case  :  default.",
          },
        },
        {
          narration: {
            en:
              "1.  switch  is the keyword.\nIt says: I'm going to look at one value\nand pick a branch based on it.",
            sv:
              "1.  switch  är nyckelordet.\nDet säger: jag ska titta på ETT värde\noch välja gren baserat på det.",
          },
          tokenHighlight: ["switch"],
        },
        {
          narration: {
            en:
              "2.  ( )  parentheses hold the value\nyou want to test. Here: item.",
            sv:
              "2.  ( )  parenteser innehåller värdet\ndu vill testa. Här: item.",
          },
          tokenHighlight: ["(", ")"],
        },
        {
          narration: {
            en:
              "3.  { }  curly braces hold ALL the cases.\nEverything between them belongs to this switch.",
            sv:
              "3.  { }  klammerparenteser håller ALLA case.\nAllt mellan dem hör till denna switch.",
          },
          tokenHighlight: ["{", "}"],
        },
        {
          narration: {
            en:
              "4.  case  is another keyword.\nIt's like asking 'is item equal to THIS value?'\ncase 'paper': means 'when item is \"paper\"...'",
            sv:
              "4.  case  är ett annat nyckelord.\nDet är som att fråga 'är item lika med DETTA värde?'\ncase 'paper': betyder 'när item är \"paper\"...'",
          },
          tokenHighlight: ["case"],
        },
        {
          narration: {
            en:
              "5.  :  the colon ends the case label.\nThen the code that should run on that match\nfollows on the next line(s).",
            sv:
              "5.  :  kolonet avslutar case-etiketten.\nSen följer koden som ska köras vid match\npå nästa rad/rader.",
          },
          tokenHighlight: [":"],
        },
        {
          narration: {
            en:
              "6.  default  is the fallback.\nIt runs when NO case matched.\nLike else at the end of an else-if chain.",
            sv:
              "6.  default  är reservutgången.\nDen körs när INGEN case matchade.\nSom else i slutet av en else-if-kedja.",
          },
          tokenHighlight: ["default"],
        },
        {
          narration: {
            en:
              "Important: switch compares STRICTLY (===).\nSo case 1: matches the number 1, NOT the string \"1\".\nCase matters too — \"Paper\" doesn't match case \"paper\".",
            sv:
              "Viktigt: switch jämför STRIKT (===).\nSå case 1: matchar talet 1, INTE strängen \"1\".\nVersaler räknas — \"Paper\" matchar inte case \"paper\".",
          },
        },
      ],
    },

    // 4. Trace walkthrough — read the switch line by line
    {
      kind: "explanation",
      title: { en: "Watching switch run", sv: "Vi ser switch köras" },
      intro: {
        en:
          "Same idea as before — read the code line by line.\nWe'll try three items: \"paper\", \"glass\", and a banana peel.",
        sv:
          "Samma tanke som förut — läs koden rad för rad.\nVi testar tre saker: \"paper\", \"glass\", och ett bananskal.",
      },
      customScene: "recycling-trace",
      demo: [],
      steps: [
        {
          narration: {
            en: "Click to step forward.",
            sv: "Klicka för att stega framåt.",
          },
        },
        {
          narration: {
            en: "First we set item to \"paper\".",
            sv: "Först sätter vi item till \"paper\".",
          },
        },
        {
          narration: {
            en:
              "We reach the switch.\nIt looks at item and starts checking cases\nfrom top to bottom.",
            sv:
              "Vi kommer till switch.\nDen tittar på item och börjar kolla case\nuppifrån och ner.",
          },
        },
        {
          narration: {
            en:
              'First case: \"paper\". Does item equal "paper"? Yes.\nSwitch runs the code under this case.',
            sv:
              'Första case: \"paper\". Är item "paper"? Ja.\nSwitch kör koden under detta case.',
          },
        },
        {
          narration: {
            en:
              'return "paper-bin".\nThe other cases below are skipped entirely.',
            sv:
              'return "paper-bin".\nDe andra case nedanför hoppas över helt.',
          },
        },
        {
          narration: {
            en: 'Now change item to "glass" and run again.',
            sv: 'Nu ändrar vi item till "glass" och kör igen.',
          },
        },
        {
          narration: {
            en: "Reach the switch. Start at the first case.",
            sv: "Vi kommer till switch. Börja vid första case.",
          },
        },
        {
          narration: {
            en:
              '"glass" === "paper"? No.\nMove to the next case.',
            sv:
              '"glass" === "paper"? Nej.\nGå vidare till nästa case.',
          },
        },
        {
          narration: {
            en:
              '"glass" === "glass"? Yes!\nThis case matches.',
            sv:
              '"glass" === "glass"? Ja!\nDet här case matchar.',
          },
        },
        {
          narration: {
            en: 'return "glass-bin". Done.',
            sv: 'return "glass-bin". Klart.',
          },
        },
        {
          narration: {
            en:
              'Last try. item = "banana" — something the switch doesn\'t know.',
            sv:
              'Sista försöket. item = "banana" — något switch inte känner till.',
          },
        },
        {
          narration: {
            en: "Reach the switch.",
            sv: "Vi kommer till switch.",
          },
        },
        {
          narration: {
            en: '"banana" === "paper"? No.',
            sv: '"banana" === "paper"? Nej.',
          },
        },
        {
          narration: {
            en: '"banana" === "glass"? No.',
            sv: '"banana" === "glass"? Nej.',
          },
        },
        {
          narration: {
            en: '"banana" === "plastic"? No.',
            sv: '"banana" === "plastic"? Nej.',
          },
        },
        {
          narration: {
            en:
              "No case matched.\nSwitch falls through to default.",
            sv:
              "Ingen case matchade.\nSwitch faller ned till default.",
          },
        },
        {
          narration: {
            en:
              'return "rest-bin".\n\nThree items, three different bins — same switch.',
            sv:
              'return "rest-bin".\n\nTre saker, tre olika fack — samma switch.',
          },
        },
      ],
    },

    // 5. break vs return — the fall-through warning
    {
      kind: "explanation",
      title: { en: "Don't forget break", sv: "Glöm inte break" },
      intro: {
        en:
          "Inside a case, the code keeps running into the NEXT case\nunless you tell it to stop.",
        sv:
          "Inuti en case fortsätter koden in i NÄSTA case\nom du inte säger stopp.",
      },
      demo: [
        {
          id: "buggy",
          label:
            'switch (item) {\n  case "paper":\n    log("Paper!");\n  case "glass":\n    log("Glass!");\n}',
          baseStyle: codePanelStyle,
        },
        {
          id: "fixed",
          label:
            'switch (item) {\n  case "paper":\n    log("Paper!");\n    break;\n  case "glass":\n    log("Glass!");\n    break;\n}',
          baseStyle: { ...codePanelStyle, marginTop: 16 },
        },
        {
          id: "note",
          kind: "note",
          label: {
            en:
              "Two ways to stop:\n• return — exits the function entirely.\n• break; — exits just the switch.\n\nIn our lessons we always return,\nso fall-through can't bite us.",
            sv:
              "Två sätt att stoppa:\n• return — avslutar hela funktionen.\n• break; — avslutar bara switch.\n\nI våra lektioner använder vi alltid return,\nså fall-through kan inte bitas oss.",
          },
          baseStyle: { ...noteBoxStyle, marginTop: 16 },
        },
      ],
      steps: [
        {
          narration: {
            en:
              "Once switch finds a matching case,\nit starts running the code there.",
            sv:
              "När switch hittar en matchande case\nbörjar den köra koden där.",
          },
          highlight: ["buggy"],
        },
        {
          narration: {
            en:
              'Look at the left code. With item = "paper",\nthe first case matches and prints "Paper!".\n\nBut then JavaScript keeps going DOWN —\nit also runs the "glass" case and prints "Glass!".\n\nThat\'s called fall-through. Almost always a bug.',
            sv:
              'Titta på koden till vänster. Med item = "paper"\nmatchar första case och skriver "Paper!".\n\nMen sen FORTSÄTTER JavaScript nedåt —\nden kör också "glass"-case och skriver "Glass!".\n\nDet kallas fall-through. Nästan alltid en bugg.',
          },
          highlight: ["buggy"],
        },
        {
          narration: {
            en:
              "The right code is the fix.\nbreak; at the end of each case STOPS the switch.\n\nNow item = \"paper\" prints just \"Paper!\" and exits.",
            sv:
              "Den högra koden är lösningen.\nbreak; sist i varje case STOPPAR switch.\n\nNu skriver item = \"paper\" bara \"Paper!\" och slutar.",
          },
          highlight: ["fixed"],
          tokenHighlight: ["break;"],
        },
        {
          narration: {
            en:
              "return also stops fall-through —\nand it ends the whole function at the same time.\n\nThat's why our other examples didn't need break:\nthey returned right away.",
            sv:
              "return stoppar också fall-through —\noch avslutar hela funktionen samtidigt.\n\nDärför behövde våra andra exempel inte break:\nde returnerade direkt.",
          },
          tokenHighlight: ["break;"],
        },
        {
          narration: {
            en:
              "Rule of thumb: if a case doesn't return,\nit MUST end with break;.\nForget both and the code rolls into the next case.",
            sv:
              "Tumregel: om en case inte returnerar\nMÅSTE den sluta med break;.\nGlömmer du båda så rinner koden in i nästa case.",
          },
          tokenHighlight: ["break;"],
        },
      ],
    },

    // 6. Practice — sort recycling — chip-style, no distractors (first chip in L3)
    {
      kind: "js-chip-assignment",
      title: {
        en: "Practice: sort the items",
        sv: "Övning: sortera sakerna",
      },
      prompt: {
        en:
          "Fill in the case values so each item lands in the right bin.",
        sv:
          "Fyll i case-värdena så att varje sak hamnar i rätt fack.",
      },
      puzzles: [
        // p1: switch keyword (vs if/for/while)
        {
          prompt: {
            en: "Which keyword starts this kind of multi-branch?",
            sv: "Vilket nyckelord startar den här typen av flergren?",
          },
          template:
            '[[]] (item) {\n  case "paper": return "paper-bin";\n  case "glass": return "glass-bin";\n  default: return "rest-bin";\n}',
          chips: ["switch", "if", "for", "while"],
          solution: ["switch"],
        },
        // p2: ( ) around the switch expression
        {
          prompt: {
            en: "What wraps the value being tested?",
            sv: "Vad omger värdet som testas?",
          },
          template:
            'switch [[]]item[[]] {\n  case "paper": return "paper-bin";\n  default: return "rest-bin";\n}',
          chips: ["(", ")", "{", "}"],
          solution: ["(", ")"],
        },
        // p3: case keyword (vs if/when/else)
        {
          prompt: {
            en: "Which keyword introduces each branch value?",
            sv: "Vilket nyckelord inleder varje grenings-värde?",
          },
          template:
            'switch (item) {\n  [[]] "paper": return "paper-bin";\n  case "glass": return "glass-bin";\n  default: return "rest-bin";\n}',
          chips: ["case", "if", "when", "else"],
          solution: ["case"],
        },
        // p4: default keyword + : colon (color scenario)
        {
          intro: {
            en: "Same shape — traffic-light colors.",
            sv: "Samma form — trafikljusfärger.",
          },
          prompt: {
            en: "Place the fallback keyword and the colon after it.",
            sv: "Placera reservordet och kolonet efter det.",
          },
          template:
            'switch (color) {\n  case "red": return "stop";\n  case "yellow": return "slow";\n  [[]][[]]\n    return "off";\n}',
          chips: ["default", ":", ";", "case"],
          solution: ["default", ":"],
        },
        // p5: synthesis — all syntax pieces together
        {
          prompt: {
            en: "Now place all the syntax pieces you've practised.",
            sv: "Placera nu alla syntaxdelar du övat på.",
          },
          template:
            '[[]] [[]]item[[]] {\n  [[]] "paper": return "paper-bin";\n  [[]][[]]\n    return "rest-bin";\n}',
          chips: ["switch", "(", ")", "case", "default", ":", "if", ";"],
          solution: ["switch", "(", ")", "case", "default", ":"],
        },
      ],
      legend: [
        {
          name: { en: "switch", sv: "switch" },
          syntax: "switch (expr) { case ... }",
          example: 'switch (item) { case "paper": ... }',
          note: {
            en: "The value is compared strictly against each case.",
            sv: "Värdet jämförs strikt mot varje case.",
          },
        },
        {
          name: { en: "case ... return", sv: "case ... return" },
          syntax: 'case "value":\n  return ...;',
          example: 'case "paper": return "paper-bin";',
          note: {
            en: "return ends both the switch and the function.",
            sv: "return avslutar både switch och funktionen.",
          },
        },
        {
          name: { en: "default", sv: "default" },
          syntax: "default:\n  return ...;",
          example: 'default: return "rest-bin";',
          note: {
            en: "Runs when no case matched.",
            sv: "Körs om ingen case matchade.",
          },
        },
      ],
    },

    // 7. Final — animal sounds (typed-input)
    {
      kind: "js-typed-assignment",
      title: { en: "Final: animal sounds", sv: "Slutövning: djurens läten" },
      prompt: {
        en:
          "Type the case values and return values for each animal:\n• \"dog\" → \"woof\"\n• \"cat\" → \"meow\"\n• \"cow\" → \"moo\"\n• anything else → \"silence\"",
        sv:
          "Skriv case-värden och returvärden för varje djur:\n• \"dog\" → \"woof\"\n• \"cat\" → \"meow\"\n• \"cow\" → \"moo\"\n• allt annat → \"silence\"",
      },
      varNames: ["animal"],
      template:
        'switch (animal) {\n  case [[input:c1]]:\n    return [[input:r1]];\n  case [[input:c2]]:\n    return [[input:r2]];\n  case [[input:c3]]:\n    return [[input:r3]];\n  default:\n    return [[input:rd]];\n}\n',
      tests: [
        { label: { en: "dog", sv: "hund" }, vars: { animal: "dog" }, expected: "woof" },
        { label: { en: "cat", sv: "katt" }, vars: { animal: "cat" }, expected: "meow" },
        { label: { en: "cow", sv: "ko" }, vars: { animal: "cow" }, expected: "moo" },
        { label: { en: "fish", sv: "fisk" }, vars: { animal: "fish" }, expected: "silence" },
        { label: { en: "DOG (caps)", sv: "DOG (versaler)" }, vars: { animal: "DOG" }, expected: "silence" },
      ],
      goalHint: {
        en:
          "Each value is a string in quotes. The default returns \"silence\".",
        sv:
          "Varje värde är en sträng inom citattecken. Default returnerar \"silence\".",
      },
      allegory: {
        kind: "conveyor",
        config: {
          inputLabel: { en: "sound for animal", sv: "läte för animal" },
          inputKey: "animal",
          bins: [
            { key: "woof", label: "woof" },
            { key: "meow", label: "meow" },
            { key: "moo", label: "moo" },
            { key: "silence", label: { en: "silence", sv: "tystnad" } },
          ],
          defaultBinKey: "silence",
        },
      },
    },

    // Workshop tier — guided micro-steps for switch/case/break/default.
    // Surface: HTTP status code → message. Distinct from chips (recycling
    // bin / animal sounds) and exercise (music player button).
    {
      kind: "js-workshop",
      title: { en: "Workshop: HTTP status", sv: "Verkstad: HTTP-status" },
      prompt: {
        en:
          "Build a switch that turns an HTTP status number into a message.\nOne case at a time.",
        sv:
          "Bygg en switch som översätter ett HTTP-statusnummer till ett meddelande.\nEtt case i taget.",
      },
      designNote:
        "L3 switch workshop. Surface: HTTP status code (200/404/500) → message. Distinct from chips (animal) and exercise (button/action). Variable named `statusCode` (rather than `status`) to avoid IDE strikethrough on the deprecated DOM `status` property. The threshold numbers ARE the lesson (they encode the cases) so they stay strict; message strings are free.",
      steps: [
        {
          id: "http-declare-statusCode",
          instruction: {
            en:
              "Use `let` to declare a variable called `statusCode` and assign it any number (an HTTP status code).",
            sv:
              "Använd `let` för att deklarera en variabel som heter `statusCode` och tilldela den ett tal (en HTTP-statuskod).",
          },
          starterCode: {
            en: "// Declare statusCode below.\n",
            sv: "// Deklarera statusCode nedan.\n",
          },
          checks: [
            {
              message: {
                en: "Use `let` to declare a variable named `statusCode`.",
                sv: "Använd `let` för att deklarera en variabel som heter `statusCode`.",
              },
              requirePattern: /\blet\s+statusCode\b/,
            },
            {
              message: {
                en: "`statusCode` should hold a number.",
                sv: "`statusCode` ska innehålla ett tal.",
              },
              assert: "return typeof statusCode === 'number';",
            },
          ],
          reveal: {
            en: "let statusCode = 200;\n",
            sv: "let statusCode = 200;\n",
          },
        },
        {
          id: "http-declare-message",
          instruction: {
            en:
              "Below `statusCode`, use `let` to declare `message` with no value yet — the switch's cases will set it.",
            sv:
              "Under `statusCode`, använd `let` för att deklarera `message` utan något värde — switchens case-grenar sätter värdet.",
          },
          starterCode: {
            en: "let statusCode = 200;\n// Declare message below (no value).\n",
            sv: "let statusCode = 200;\n// Deklarera message nedan (inget värde).\n",
          },
          checks: [
            {
              message: {
                en: "Use `let` to declare a variable named `message`.",
                sv: "Använd `let` för att deklarera en variabel som heter `message`.",
              },
              requirePattern: /\blet\s+message\b/,
            },
            {
              message: {
                en: "Don't assign `message` yet — the cases will set its value.",
                sv: "Tilldela inte `message` än — case-grenarna sätter värdet.",
              },
              assert: "return typeof message === 'undefined';",
            },
          ],
          reveal: {
            en: "let statusCode = 200;\nlet message;\n",
            sv: "let statusCode = 200;\nlet message;\n",
          },
        },
        {
          id: "http-switch-case-200",
          instruction: {
            en:
              "Open a `switch` on `statusCode` and add the first `case` for `200`. Inside, set `message` to a string (the lesson uses `\"OK\"`). Don't forget to end the case so it doesn't fall through.",
            sv:
              "Öppna en `switch` på `statusCode` och lägg till första `case` för `200`. Sätt `message` till en sträng inne i grenen (lektionen använder `\"OK\"`). Glöm inte att avsluta grenen så den inte faller igenom.",
          },
          starterCode: {
            en:
              "let statusCode = 200;\nlet message;\n// Open a switch (statusCode) and add case 200.\n",
            sv:
              "let statusCode = 200;\nlet message;\n// Öppna en switch (statusCode) och lägg till case 200.\n",
          },
          checks: [
            {
              message: {
                en: "Open a `switch (statusCode) { ... }` block.",
                sv: "Öppna ett `switch (statusCode) { ... }`-block.",
              },
              requirePattern: /\bswitch\s*\(\s*statusCode\s*\)/,
            },
            {
              message: {
                en: "Add `case 200:` inside the switch.",
                sv: "Lägg till `case 200:` inuti switchen.",
              },
              requirePattern: /\bcase\s+200\s*:/,
            },
            {
              message: {
                en: "End the case with `break;`.",
                sv: "Avsluta grenen med `break;`.",
              },
              requirePattern: /\bbreak\s*;/,
            },
            {
              message: {
                en: "When `statusCode` is 200, `message` should end up as a string.",
                sv: "När `statusCode` är 200 ska `message` bli en sträng.",
              },
              assert: "return typeof message === 'string';",
            },
          ],
          reveal: {
            en:
              'let statusCode = 200;\nlet message;\nswitch (statusCode) {\n  case 200:\n    message = "OK";\n    break;\n}\n',
            sv:
              'let statusCode = 200;\nlet message;\nswitch (statusCode) {\n  case 200:\n    message = "OK";\n    break;\n}\n',
          },
        },
        {
          id: "http-add-case-404",
          instruction: {
            en:
              "Add another `case` for `404`. Set `message` to a string (the lesson uses `\"Not Found\"`). End the case so it doesn't fall through.",
            sv:
              "Lägg till en `case` för `404`. Sätt `message` till en sträng (lektionen använder `\"Not Found\"`). Avsluta grenen så den inte faller igenom.",
          },
          starterCode: {
            en:
              'let statusCode = 404;\nlet message;\nswitch (statusCode) {\n  case 200:\n    message = "OK";\n    break;\n  // Add a case for 404.\n}\n',
            sv:
              'let statusCode = 404;\nlet message;\nswitch (statusCode) {\n  case 200:\n    message = "OK";\n    break;\n  // Lägg till en case för 404.\n}\n',
          },
          checks: [
            {
              message: {
                en: "Add `case 404:` inside the switch.",
                sv: "Lägg till `case 404:` inuti switchen.",
              },
              requirePattern: /\bcase\s+404\s*:/,
            },
            {
              message: {
                en: "When `statusCode` is 404, `message` should end up as a string.",
                sv: "När `statusCode` är 404 ska `message` bli en sträng.",
              },
              assert: "return typeof message === 'string';",
            },
          ],
          reveal: {
            en:
              'let statusCode = 404;\nlet message;\nswitch (statusCode) {\n  case 200:\n    message = "OK";\n    break;\n  case 404:\n    message = "Not Found";\n    break;\n}\n',
            sv:
              'let statusCode = 404;\nlet message;\nswitch (statusCode) {\n  case 200:\n    message = "OK";\n    break;\n  case 404:\n    message = "Not Found";\n    break;\n}\n',
          },
        },
        {
          id: "http-add-case-500",
          instruction: {
            en:
              "Add another `case` for `500`. Set `message` to a string (the lesson uses `\"Server Error\"`).",
            sv:
              "Lägg till en `case` för `500`. Sätt `message` till en sträng (lektionen använder `\"Server Error\"`).",
          },
          starterCode: {
            en:
              'let statusCode = 500;\nlet message;\nswitch (statusCode) {\n  case 200:\n    message = "OK";\n    break;\n  case 404:\n    message = "Not Found";\n    break;\n  // Add a case for 500.\n}\n',
            sv:
              'let statusCode = 500;\nlet message;\nswitch (statusCode) {\n  case 200:\n    message = "OK";\n    break;\n  case 404:\n    message = "Not Found";\n    break;\n  // Lägg till en case för 500.\n}\n',
          },
          checks: [
            {
              message: {
                en: "Add `case 500:` inside the switch.",
                sv: "Lägg till `case 500:` inuti switchen.",
              },
              requirePattern: /\bcase\s+500\s*:/,
            },
            {
              message: {
                en: "When `statusCode` is 500, `message` should end up as a string.",
                sv: "När `statusCode` är 500 ska `message` bli en sträng.",
              },
              assert: "return typeof message === 'string';",
            },
          ],
          reveal: {
            en:
              'let statusCode = 500;\nlet message;\nswitch (statusCode) {\n  case 200:\n    message = "OK";\n    break;\n  case 404:\n    message = "Not Found";\n    break;\n  case 500:\n    message = "Server Error";\n    break;\n}\n',
            sv:
              'let statusCode = 500;\nlet message;\nswitch (statusCode) {\n  case 200:\n    message = "OK";\n    break;\n  case 404:\n    message = "Not Found";\n    break;\n  case 500:\n    message = "Server Error";\n    break;\n}\n',
          },
        },
        {
          id: "http-add-default",
          instruction: {
            en:
              "Add a `default:` clause that sets `message` to a string for unknown statusCode codes (the lesson uses `\"Unknown\"`). The default runs when no case matches.",
            sv:
              "Lägg till en `default:`-klausul som sätter `message` till en sträng för okända statuskoder (lektionen använder `\"Unknown\"`). default körs när inget case matchar.",
          },
          starterCode: {
            en:
              'let statusCode = 418;\nlet message;\nswitch (statusCode) {\n  case 200:\n    message = "OK";\n    break;\n  case 404:\n    message = "Not Found";\n    break;\n  case 500:\n    message = "Server Error";\n    break;\n  // Add a default clause.\n}\n',
            sv:
              'let statusCode = 418;\nlet message;\nswitch (statusCode) {\n  case 200:\n    message = "OK";\n    break;\n  case 404:\n    message = "Not Found";\n    break;\n  case 500:\n    message = "Server Error";\n    break;\n  // Lägg till en default-klausul.\n}\n',
          },
          checks: [
            {
              message: {
                en: "Add `default:` inside the switch.",
                sv: "Lägg till `default:` inuti switchen.",
              },
              requirePattern: /\bdefault\s*:/,
            },
            {
              message: {
                en:
                  "When `statusCode` is 418 (no case matches), `message` should end up as a string from the default.",
                sv:
                  "När `statusCode` är 418 (inget case matchar) ska `message` bli en sträng från default.",
              },
              assert: "return typeof message === 'string';",
            },
          ],
          reveal: {
            en:
              'let statusCode = 418;\nlet message;\nswitch (statusCode) {\n  case 200:\n    message = "OK";\n    break;\n  case 404:\n    message = "Not Found";\n    break;\n  case 500:\n    message = "Server Error";\n    break;\n  default:\n    message = "Unknown";\n}\n',
            sv:
              'let statusCode = 418;\nlet message;\nswitch (statusCode) {\n  case 200:\n    message = "OK";\n    break;\n  case 404:\n    message = "Not Found";\n    break;\n  case 500:\n    message = "Server Error";\n    break;\n  default:\n    message = "Unknown";\n}\n',
          },
        },
      ],
      legend: [
        {
          name: { en: "switch", sv: "switch" },
          syntax: "switch (value) { ... }",
          example: "switch (statusCode) { ... }",
          note: {
            en: "Picks one branch based on a value.",
            sv: "Väljer en gren baserat på ett värde.",
          },
        },
        {
          name: { en: "case", sv: "case" },
          syntax: "case constant: ... break;",
          example: 'case 200: message = "OK"; break;',
          note: {
            en: "Runs when the switch's value strictly equals the constant.",
            sv: "Körs när switchens värde är strikt lika med konstanten.",
          },
        },
        {
          name: { en: "default", sv: "default" },
          syntax: "default: ...",
          example: 'default: message = "Unknown";',
          note: {
            en: "Runs when no case matched.",
            sv: "Körs när inget case matchade.",
          },
        },
      ],
    },

    // L3 final lab — music player button. Uses switch with five named cases
    // plus default. Distinct from the recycling/animal-sounds themes used
    // in this chapter.
    {
      kind: "exercise",
      title: { en: "Lab: Music Player Button", sv: "Labb: Musikspelar-knapp" },
      prompt: {
        en:
          "Pick the right action when a music player button is pressed.\n\n" +
          "User stories (variable names are suggestions — pick your own if you like):\n" +
          "1. Declare a string variable (e.g. button) and set it to one of: \"play\", \"pause\", \"stop\", \"next\", \"prev\".\n" +
          "2. Declare a string variable (e.g. action) and set it to \"\".\n" +
          "3. Use a switch on button with these cases (each ending with break):\n" +
          "   - \"play\"  → action = \"Playing track\"\n" +
          "   - \"pause\" → action = \"Paused\"\n" +
          "   - \"stop\"  → action = \"Stopped\"\n" +
          "   - \"next\"  → action = \"Skipped to next\"\n" +
          "   - \"prev\"  → action = \"Back one track\"\n" +
          "4. Add a default case that sets action to \"Unknown button\".\n" +
          "5. Print button.\n" +
          "6. Print action.\n\n" +
          "Don't forget break — without it, cases fall through.",
        sv:
          "Välj rätt åtgärd när en knapp på musikspelaren trycks.\n\n" +
          "Användarberättelser (variabelnamnen är förslag — välj egna om du vill):\n" +
          "1. Deklarera en strängvariabel (t.ex. button) och sätt den till en av: \"play\", \"pause\", \"stop\", \"next\", \"prev\".\n" +
          "2. Deklarera en strängvariabel (t.ex. action) och sätt den till \"\".\n" +
          "3. Använd en switch på button med dessa case (varje slutar med break):\n" +
          "   - \"play\"  → action = \"Playing track\"\n" +
          "   - \"pause\" → action = \"Paused\"\n" +
          "   - \"stop\"  → action = \"Stopped\"\n" +
          "   - \"next\"  → action = \"Skipped to next\"\n" +
          "   - \"prev\"  → action = \"Back one track\"\n" +
          "4. Lägg till en default som sätter action till \"Unknown button\".\n" +
          "5. Skriv ut button.\n" +
          "6. Skriv ut action.\n\n" +
          "Glöm inte break — utan det faller case igenom.",
      },
      starterJs:
        "// Follow the user stories shown to the left.\n\n" +
        "// 1-2. Declare your variables:\n\n\n\n" +
        "// 3-4. switch (button) { ... }\n\n\n\n\n\n\n\n\n" +
        "// 5-6. Print button, then action:\n\n",
      tests: [
        {
          label: {
            en: "Console shows exactly two lines",
            sv: "Konsolen visar exakt två rader",
          },
          assert:
            "var c = window.__console || []; return c.length === 2;",
          hint: {
            en: "One console.log for button, one for action.",
            sv: "En console.log för button, en för action.",
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
            en: 'Line 1 is one of "play", "pause", "stop", "next", "prev"',
            sv: 'Rad 1 är "play", "pause", "stop", "next" eller "prev"',
          },
          assert:
            "var c = window.__console || [];" +
            "if (c.length < 1) return false;" +
            "return ['play','pause','stop','next','prev'].indexOf(c[0].text) !== -1;",
          hint: {
            en: "Set button to one of the five lowercase strings.",
            sv: "Sätt button till en av de fem strängarna med små bokstäver.",
          },
        },
        {
          label: {
            en: "Action matches the rule for the chosen button",
            sv: "Action matchar regeln för den valda knappen",
          },
          assert:
            "var c = window.__console || [];" +
            "if (c.length < 2) return false;" +
            "var map = {play:'Playing track', pause:'Paused', stop:'Stopped', next:'Skipped to next', prev:'Back one track'};" +
            "var btn = c[0].text;" +
            "if (!(btn in map)) return false;" +
            "return c[1].text === map[btn];",
          hint: {
            en: "Use the exact action strings from the user stories — capitalization counts.",
            sv: "Använd exakta action-strängar från användarberättelserna — versaler räknas.",
          },
        },
        {
          label: {
            en: "Code uses a switch statement",
            sv: "Koden använder switch",
          },
          assert:
            "var src = window.__userSrc || '';" +
            "return /switch\\s*\\(/.test(src);",
          hint: {
            en: "Start the dispatch with: switch (button) { ... }",
            sv: "Börja med: switch (button) { ... }",
          },
        },
        {
          label: {
            en: "Code has at least five case clauses",
            sv: "Koden har minst fem case-klausuler",
          },
          assert:
            "var src = window.__userSrc || '';" +
            "var n = (src.match(/case\\s+/g) || []).length;" +
            "return n >= 5;",
          hint: {
            en: 'One case per button: case "play":, case "pause":, etc.',
            sv: 'Ett case per knapp: case "play":, case "pause":, osv.',
          },
        },
        {
          label: {
            en: "Code has a default case",
            sv: "Koden har en default-klausul",
          },
          assert:
            "var src = window.__userSrc || '';" +
            "return /default\\s*:/.test(src);",
          hint: {
            en: 'Add: default: action = "Unknown button";',
            sv: 'Lägg till: default: action = "Unknown button";',
          },
        },
        {
          label: {
            en: "Code uses break at least five times",
            sv: "Koden använder break minst fem gånger",
          },
          assert:
            "var src = window.__userSrc || '';" +
            "var n = (src.match(/\\bbreak\\b/g) || []).length;" +
            "return n >= 5;",
          hint: {
            en: "Each named case needs its own break to stop the fall-through.",
            sv: "Varje namngivet case behöver sitt eget break för att stoppa fall-through.",
          },
        },
      ],
    },
  ],
};
