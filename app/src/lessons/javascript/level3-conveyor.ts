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
              "Top: the else-if chain we already know.\nSee how `item ===` repeats three times?",
            sv:
              "Överst: else-if-kedjan vi redan kan.\nSe hur `item ===` upprepas tre gånger?",
          },
        },
        {
          narration: {
            en:
              "Bottom: the same logic, written as a switch.\nThe variable name appears ONCE at the top.\nEach case lists just the value to compare against.",
            sv:
              "Nedre: samma logik, skriven som switch.\nVariabelnamnet skrivs EN gång överst.\nVarje case listar bara värdet att jämföra mot.",
          },
        },
        {
          narration: {
            en:
              "switch only fits one shape: comparing one variable\nagainst CONCRETE VALUES (no ranges, no other variables).\nFor temperatures, stick with else-if.",
            sv:
              "switch passar bara en form: jämför en variabel\nmot KONKRETA VÄRDEN (inga intervall, inga andra variabler).\nFör temperaturer — håll dig till else-if.",
          },
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
        },
        {
          narration: {
            en:
              "2.  ( )  parentheses hold the value\nyou want to test. Here: item.",
            sv:
              "2.  ( )  parenteser innehåller värdet\ndu vill testa. Här: item.",
          },
        },
        {
          narration: {
            en:
              "3.  { }  curly braces hold ALL the cases.\nEverything between them belongs to this switch.",
            sv:
              "3.  { }  klammerparenteser håller ALLA case.\nAllt mellan dem hör till denna switch.",
          },
        },
        {
          narration: {
            en:
              "4.  case  is another keyword.\nIt's like asking 'is item equal to THIS value?'\ncase 'paper': means 'when item is \"paper\"...'",
            sv:
              "4.  case  är ett annat nyckelord.\nDet är som att fråga 'är item lika med DETTA värde?'\ncase 'paper': betyder 'när item är \"paper\"...'",
          },
        },
        {
          narration: {
            en:
              "5.  :  the colon ends the case label.\nThen the code that should run on that match\nfollows on the next line(s).",
            sv:
              "5.  :  kolonet avslutar case-etiketten.\nSen följer koden som ska köras vid match\npå nästa rad/rader.",
          },
        },
        {
          narration: {
            en:
              "6.  default  is the fallback.\nIt runs when NO case matched.\nLike else at the end of an else-if chain.",
            sv:
              "6.  default  är reservutgången.\nDen körs när INGEN case matchade.\nSom else i slutet av en else-if-kedja.",
          },
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
              'Look at the top code. With item = "paper",\nthe first case matches and prints "Paper!".\n\nBut then JavaScript keeps going DOWN —\nit also runs the "glass" case and prints "Glass!".\n\nThat\'s called fall-through. Almost always a bug.',
            sv:
              'Titta på koden överst. Med item = "paper"\nmatchar första case och skriver "Paper!".\n\nMen sen FORTSÄTTER JavaScript nedåt —\nden kör också "glass"-case och skriver "Glass!".\n\nDet kallas fall-through. Nästan alltid en bugg.',
          },
          highlight: ["buggy"],
        },
        {
          narration: {
            en:
              "The bottom code is the fix.\nbreak; at the end of each case STOPS the switch.\n\nNow item = \"paper\" prints just \"Paper!\" and exits.",
            sv:
              "Nedre koden är lösningen.\nbreak; sist i varje case STOPPAR switch.\n\nNu skriver item = \"paper\" bara \"Paper!\" och slutar.",
          },
          highlight: ["fixed"],
        },
        {
          narration: {
            en:
              "return also stops fall-through —\nand it ends the whole function at the same time.\n\nThat's why our other examples didn't need break:\nthey returned right away.",
            sv:
              "return stoppar också fall-through —\noch avslutar hela funktionen samtidigt.\n\nDärför behövde våra andra exempel inte break:\nde returnerade direkt.",
          },
        },
        {
          narration: {
            en:
              "Rule of thumb: if a case doesn't return,\nit MUST end with break;.\nForget both and the code rolls into the next case.",
            sv:
              "Tumregel: om en case inte returnerar\nMÅSTE den sluta med break;.\nGlömmer du båda så rinner koden in i nästa case.",
          },
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
        // p1: code A — case keyword + value for the first branch
        {
          prompt: {
            en: "Place the keyword and the value for the first branch.",
            sv: "Placera ordet och värdet för första grenen.",
          },
          template:
            'switch (item) {\n  [[]] [[]]:\n    return "paper-bin";\n  case "glass":\n    return "glass-bin";\n  case "plastic":\n    return "plastic-bin";\n  default:\n    return "rest-bin";\n}',
          chips: ["case", '"paper"'],
          solution: ["case", '"paper"'],
        },
        // p2: code A — full assembly — case values + default keyword
        {
          prompt: {
            en: "Place the case values and the fallback keyword.",
            sv: "Placera case-värdena och reservordet.",
          },
          template:
            'switch (item) {\n  case [[]]:\n    return "paper-bin";\n  case [[]]:\n    return "glass-bin";\n  case [[]]:\n    return "plastic-bin";\n  [[]]:\n    return "rest-bin";\n}',
          chips: ['"paper"', '"glass"', '"plastic"', "default"],
          solution: ['"paper"', '"glass"', '"plastic"', "default"],
        },
        // p3: code B (color) — case keyword + value for the first branch
        {
          prompt: {
            en: "Place the keyword and the value for the first branch.",
            sv: "Placera ordet och värdet för första grenen.",
          },
          template:
            'switch (color) {\n  [[]] [[]]:\n    return "stop";\n  case "yellow":\n    return "slow";\n  case "green":\n    return "go";\n  default:\n    return "off";\n}',
          chips: ["case", '"red"'],
          solution: ["case", '"red"'],
        },
        // p4: code B — full assembly
        {
          prompt: {
            en: "Place the case values and the fallback keyword.",
            sv: "Placera case-värdena och reservordet.",
          },
          template:
            'switch (color) {\n  case [[]]:\n    return "stop";\n  case [[]]:\n    return "slow";\n  case [[]]:\n    return "go";\n  [[]]:\n    return "off";\n}',
          chips: ['"red"', '"yellow"', '"green"', "default"],
          solution: ['"red"', '"yellow"', '"green"', "default"],
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
  ],
};
