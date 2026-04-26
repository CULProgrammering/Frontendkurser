import type { Lesson } from "../../types";
import { codePanelStyle, noteBoxStyle } from "./_shared";

export const doorLesson: Lesson = {
  id: "conditionals-crosswalk",
  title: { en: "1. Crosswalk — if and else", sv: "1. Övergångsstället — if och else" },
  summary: {
    en: "A condition that says walk or wait.",
    sv: "Ett villkor som säger gå eller vänta.",
  },
  slides: [
    // 1. Intro — stick-figure crosswalk scene
    {
      kind: "explanation",
      title: { en: "A choice in code", sv: "Ett val i koden" },
      intro: {
        en: "Sometimes the code has to choose what happens next.",
        sv: "Ibland måste koden välja vad som händer.",
      },
      customScene: "crosswalk",
      demo: [],
      steps: [
        {
          narration: {
            en: "You stand at the edge of a crosswalk.\nThe light tells you when to go.",
            sv: "Du står vid kanten av ett övergångsställe.\nLjuset säger när du får gå.",
          },
        },
        {
          narration: {
            en: "When the light is red, you wait.",
            sv: "När ljuset är rött väntar du.",
          },
        },
        {
          narration: {
            en: "When it turns green, you walk across.",
            sv: "När det blir grönt går du över.",
          },
        },
        {
          narration: {
            en:
              "Same person, same crosswalk —\ndifferent action depending on the light.\nThat is a conditional.",
            sv:
              "Samma person, samma övergångsställe —\nolika handling beroende på ljuset.\nDet är ett villkor.",
          },
        },
      ],
    },

    // 2. Anatomy of an if — piece by piece
    {
      kind: "explanation",
      title: { en: "An if, piece by piece", sv: "Ett if, del för del" },
      intro: {
        en:
          "Here is what an if looks like in code.\nWe'll explain every part.",
        sv:
          "Så här ser ett if ut i kod.\nVi förklarar varje del.",
      },
      demo: [
        {
          id: "code",
          label: 'if (light === "green") {\n  return true;\n}',
          baseStyle: codePanelStyle,
        },
      ],
      steps: [
        {
          narration: {
            en:
              "Look at the code on the left. Five parts:\nif   ( ... )   { ... }   return.",
            sv:
              "Titta på koden till vänster. Fem delar:\nif   ( ... )   { ... }   return.",
          },
        },
        {
          narration: {
            en:
              "1.  if  is a special word. It means 'if'.\nIt asks: should the next code run?",
            sv:
              "1.  if  är ett speciellt ord. Det betyder 'om'.\nDet frågar: ska nästa kod köras?",
          },
        },
        {
          narration: {
            en:
              "2.  ( )  parentheses come right after if.\nThe question itself goes inside them.",
            sv:
              "2.  ( )  parenteser kommer direkt efter if.\nFrågan står inuti.",
          },
        },
        {
          narration: {
            en:
              "3.  Inside the parentheses\nis something that is true or false.\nWe'll look at this on the next slide.",
            sv:
              "3.  Inuti parenteserna\nstår något som är sant eller falskt.\nVi tittar närmare på det i nästa steg.",
          },
        },
        {
          narration: {
            en:
              "4.  { }  curly braces.\nThe code that runs when the answer is YES (true)\ngoes inside them.",
            sv:
              "4.  { }  klammerparenteser.\nKoden som körs om svaret är JA (true)\nstår inuti.",
          },
        },
        {
          narration: {
            en:
              "5.  return  is another special word.\nIt sends a value back as the answer.\nWe'll see it more soon.",
            sv:
              "5.  return  är ett annat speciellt ord.\nDet skickar tillbaka ett värde som svar.\nVi ser det mer strax.",
          },
        },
      ],
    },

    // 3. Booleans — what goes inside ( )
    {
      kind: "explanation",
      title: {
        en: "true or false — booleans",
        sv: "true eller false — booleans",
      },
      intro: {
        en:
          "What goes inside the parentheses always boils down to ONE of two values:\ntrue or false.",
        sv:
          "Det som står inuti parenteserna landar alltid i ETT av två värden:\ntrue eller false.",
      },
      demo: [
        {
          id: "code",
          label:
            "5 > 3            // true\n5 < 3            // false\n\"cat\" === \"cat\" // true\n\"cat\" === \"dog\" // false",
          baseStyle: codePanelStyle,
        },
        {
          id: "note",
          label: {
            en:
              "true  = yes\nfalse = no\nThat is what a 'boolean' is.",
            sv:
              "true  = ja\nfalse = nej\nDet är vad en 'boolean' är.",
          },
          baseStyle: { ...noteBoxStyle, marginTop: 16 },
        },
      ],
      steps: [
        {
          narration: {
            en:
              "A boolean is just a value: true or false.\nYes or no. On or off.",
            sv:
              "En boolean är bara ett värde: true eller false.\nJa eller nej. På eller av.",
          },
        },
        {
          narration: {
            en:
              "Comparing two things gives a boolean:\n>   greater than\n<   less than\n>=  greater than or equal\n<=  less than or equal\n=== equal (we'll see why three signs later)",
            sv:
              "Att jämföra två saker ger en boolean:\n>   större än\n<   mindre än\n>=  större än eller lika med\n<=  mindre än eller lika med\n=== lika med (vi ser varför tre tecken snart)",
          },
        },
        {
          narration: {
            en:
              "A variable can also already BE true or false:\n\nlet doorOpen = true;\nif (doorOpen) { ... }\n\nNo comparison needed — the variable IS the answer.",
            sv:
              "En variabel kan också redan VARA true eller false:\n\nlet doorOpen = true;\nif (doorOpen) { ... }\n\nIngen jämförelse behövs — variabeln ÄR svaret.",
          },
        },
        {
          narration: {
            en:
              "Any of these can go inside the if's parentheses.\nThe if cares about one thing only: true or false.",
            sv:
              "Vilken som helst av dessa kan stå inuti if-parenteserna.\nif bryr sig om en enda sak: true eller false.",
          },
        },
      ],
    },

    // 4. return — sending an answer
    {
      kind: "explanation",
      title: { en: "return — sending an answer back", sv: "return — skicka tillbaka ett svar" },
      demo: [
        {
          id: "code",
          label:
            "if (light === \"green\") {\n  return true;\n}\nreturn false;",
          baseStyle: codePanelStyle,
        },
      ],
      steps: [
        {
          narration: {
            en:
              "return is a special word.\nIt sends a value back from your code.",
            sv:
              "return är ett speciellt ord.\nDet skickar tillbaka ett värde från din kod.",
          },
        },
        {
          narration: {
            en:
              "In our example:\n• if the light is green, we return true.\n• otherwise, the if is skipped, and we return false.",
            sv:
              "I exemplet:\n• om ljuset är grönt returnerar vi true.\n• annars hoppas if över och vi returnerar false.",
          },
        },
        {
          narration: {
            en:
              "return also stops the code right there.\nNothing after a return runs.",
            sv:
              "return stoppar också koden direkt.\nInget efter ett return körs.",
          },
        },
        {
          narration: {
            en:
              "You can return any value:\n• true or false\n• a number, like 42\n• a string, like \"walk\"",
            sv:
              "Du kan returnera vilket värde som helst:\n• true eller false\n• ett tal, som 42\n• en sträng, som \"walk\"",
          },
        },
      ],
    },

    // 5. Practice — write the condition (bodyOnly)
    {
      kind: "js-assignment",
      title: { en: "Practice: walk on green", sv: "Övning: gå på grönt" },
      prompt: {
        en:
          "The variable `light` is already there for you.\nReturn true when light is the string \"green\". Otherwise return false.",
        sv:
          "Variabeln `light` finns redan för dig.\nReturnera true när light är strängen \"green\". Annars returnera false.",
      },
      functionName: "canCross",
      bodyOnly: true,
      paramName: "light",
      starterCode: {
        en:
          "// Change the condition below:\n" +
          "if (false) {\n" +
          "  return true;\n" +
          "}\n" +
          "return false;\n",
        sv:
          "// Ändra villkoret nedan:\n" +
          "if (false) {\n" +
          "  return true;\n" +
          "}\n" +
          "return false;\n",
      },
      tests: [
        { label: { en: "red", sv: "rött" }, input: "red", expected: false },
        { label: { en: "yellow", sv: "gult" }, input: "yellow", expected: false },
        { label: { en: "green", sv: "grönt" }, input: "green", expected: true },
        { label: { en: "blue (other)", sv: "blått (annat)" }, input: "blue", expected: false },
      ],
      allegory: {
        kind: "crosswalk",
        config: {
          conditionLabel: "canCross(light)",
          walkWhen: true,
          walkLabel: { en: "Walks", sv: "Går" },
          waitLabel: { en: "Waits", sv: "Väntar" },
        },
      },
      legend: [
        {
          name: { en: "if", sv: "if" },
          syntax: "if (condition) { ... }",
          example: 'if (light === "green") { ... }',
          note: {
            en: "Runs the code inside when the condition is true.",
            sv: "Kör koden inuti när villkoret är sant.",
          },
        },
        {
          name: { en: "===", sv: "===" },
          syntax: "a === b",
          example: 'light === "green"',
          note: {
            en: "True only when the values are exactly equal.",
            sv: "Sant bara om värdena är exakt lika.",
          },
        },
        {
          name: { en: "return", sv: "return" },
          syntax: "return value;",
          example: "return true;",
          note: {
            en: "Sends a value back and stops the code.",
            sv: "Skickar tillbaka ett värde och stoppar koden.",
          },
        },
      ],
    },

    // 6. else
    {
      kind: "explanation",
      title: { en: "else — otherwise", sv: "else — annars" },
      demo: [
        {
          id: "code",
          label:
            'if (light === "green") {\n  return true;\n} else {\n  return false;\n}',
          baseStyle: codePanelStyle,
        },
      ],
      steps: [
        {
          narration: {
            en:
              "else is another special word. It means 'otherwise'.\nIt comes right after the closing } of the if.",
            sv:
              "else är ett annat speciellt ord. Det betyder 'annars'.\nDet kommer direkt efter den stängande } i if.",
          },
        },
        {
          narration: {
            en:
              "Then come its OWN curly braces { }\nwith code that runs when the if's answer was false.",
            sv:
              "Sen kommer dess EGNA klammerparenteser { }\nmed kod som körs när if-svaret var false.",
          },
        },
        {
          narration: {
            en:
              "Only one branch ever runs —\neither the if or the else, never both.",
            sv:
              "Bara en gren körs någonsin —\nantingen if eller else, aldrig båda.",
          },
        },
        {
          narration: {
            en:
              "else is optional. Sometimes you don't need to do anything\nwhen the condition is false.",
            sv:
              "else är frivilligt. Ibland behöver du inte göra något\nnär villkoret är falskt.",
          },
        },
      ],
    },

    // 7. Practice — if/else
    {
      kind: "js-assignment",
      title: { en: "Practice: walk or wait", sv: "Övning: gå eller vänta" },
      prompt: {
        en:
          "Use both if and else this time.\nReturn true when light is \"green\", otherwise return false.",
        sv:
          "Använd både if och else den här gången.\nReturnera true när light är \"green\", annars false.",
      },
      functionName: "canCross",
      bodyOnly: true,
      paramName: "light",
      starterCode: {
        en:
          "if (/* condition */) {\n" +
          "  return true;\n" +
          "} else {\n" +
          "  return false;\n" +
          "}\n",
        sv:
          "if (/* villkor */) {\n" +
          "  return true;\n" +
          "} else {\n" +
          "  return false;\n" +
          "}\n",
      },
      tests: [
        { label: { en: "green", sv: "grönt" }, input: "green", expected: true },
        { label: { en: "red", sv: "rött" }, input: "red", expected: false },
        { label: { en: "yellow", sv: "gult" }, input: "yellow", expected: false },
      ],
      allegory: {
        kind: "crosswalk",
        config: {
          conditionLabel: "canCross(light)",
          walkWhen: true,
          walkLabel: { en: "Walks", sv: "Går" },
          waitLabel: { en: "Waits", sv: "Väntar" },
        },
      },
      legend: [
        {
          name: { en: "if / else", sv: "if / else" },
          syntax: "if (...) { ... } else { ... }",
          example: 'if (x === "y") return true; else return false;',
          note: {
            en: "One of the two branches always runs.",
            sv: "En av grenarna körs alltid.",
          },
        },
        {
          name: { en: "===", sv: "===" },
          syntax: "a === b",
          example: 'light === "green"',
          note: {
            en: "True only when the values are exactly equal.",
            sv: "Sant bara om värdena är exakt lika.",
          },
        },
      ],
    },

    // 8. = vs == vs ===
    {
      kind: "explanation",
      title: { en: "=, == and ===", sv: "=, == och ===" },
      intro: {
        en: "Three signs that look alike but mean very different things.",
        sv: "Tre tecken som ser lika ut men betyder helt olika saker.",
      },
      demo: [
        {
          id: "code",
          label:
            "x = 5      // sets x to 5\nx == 5     // compares (avoid)\nx === 5    // compares strictly (use)",
          baseStyle: codePanelStyle,
        },
        {
          id: "warning",
          label: {
            en:
              "Common trap:\nif (x = 5) — sets x to 5\nand is always true.\nAlmost never what you want.",
            sv:
              "Vanlig fälla:\nif (x = 5) — sätter x till 5\noch är alltid sant.\nNästan aldrig vad du vill.",
          },
          baseStyle: { ...noteBoxStyle, marginTop: 16 },
        },
      ],
      steps: [
        {
          narration: {
            en:
              "One equals sign — = — sets a value.\nIt is not a question, it is a statement.",
            sv:
              "Ett likhetstecken — = — sätter ett värde.\nDet är inte en fråga, det är ett besked.",
          },
        },
        {
          narration: {
            en:
              "Three equals signs — === — ask if two values are equal.\nThis is what you want in a condition.",
            sv:
              "Tre likhetstecken — === — frågar om två värden är lika.\nDet är vad du vill ha i ett villkor.",
          },
        },
        {
          narration: {
            en:
              "Two equals signs — == — also ask, but loosely.\nIt says 5 and \"5\" are equal, which is rarely true.\nUse ===.",
            sv:
              "Två likhetstecken — == — frågar också, men slarvigt.\nDet säger att 5 och \"5\" är lika, vilket sällan stämmer.\nAnvänd ===.",
          },
        },
      ],
    },

    // 9. Practice — strict equality on object
    {
      kind: "js-assignment",
      title: { en: "Practice: walk signal", sv: "Övning: gångsignal" },
      prompt: {
        en:
          "This time `light` is an object: { signal: 'WALK' | 'STOP' }.\nReach into the object with light.signal.\nReturn true if it equals 'WALK', otherwise false.",
        sv:
          "Den här gången är `light` ett objekt: { signal: 'WALK' | 'STOP' }.\nNå in i objektet med light.signal.\nReturnera true om det är 'WALK', annars false.",
      },
      functionName: "canCross",
      bodyOnly: true,
      paramName: "light",
      starterCode: {
        en:
          "if (/* light.signal === ??? */) {\n" +
          "  return true;\n" +
          "} else {\n" +
          "  return false;\n" +
          "}\n",
        sv:
          "if (/* light.signal === ??? */) {\n" +
          "  return true;\n" +
          "} else {\n" +
          "  return false;\n" +
          "}\n",
      },
      tests: [
        { label: { en: "WALK", sv: "WALK" }, input: { signal: "WALK" }, expected: true },
        { label: { en: "STOP", sv: "STOP" }, input: { signal: "STOP" }, expected: false },
        { label: { en: "walk (lowercase)", sv: "walk (gemener)" }, input: { signal: "walk" }, expected: false },
        { label: { en: "empty", sv: "tom" }, input: { signal: "" }, expected: false },
      ],
      allegory: {
        kind: "crosswalk",
        config: {
          conditionLabel: "canCross(light)",
          inputKey: "signal",
          walkWhen: true,
          walkLabel: { en: "Walks", sv: "Går" },
          waitLabel: { en: "Waits", sv: "Väntar" },
        },
      },
      legend: [
        {
          name: { en: "===", sv: "===" },
          syntax: "a === b",
          example: 'light.signal === "WALK"',
          note: {
            en: "True only when both values are exactly equal.",
            sv: "Sant bara om båda värdena är exakt lika.",
          },
        },
        {
          name: { en: "object access", sv: "läsa från objekt" },
          syntax: "object.property",
          example: "light.signal",
          note: {
            en: "Reads the named property out of an object.",
            sv: "Läser den namngivna egenskapen ur ett objekt.",
          },
        },
      ],
    },

    // 10. Final
    {
      kind: "js-assignment",
      title: { en: "Final: walk or wait", sv: "Slutövning: gå eller vänta" },
      prompt: {
        en:
          "Write a function body that returns a STRING:\n• 'walk' when state.signal is 'WALK'\n• 'wait' otherwise.",
        sv:
          "Skriv en funktionskropp som returnerar en STRÄNG:\n• 'walk' när state.signal är 'WALK'\n• 'wait' annars.",
      },
      functionName: "canCross",
      bodyOnly: true,
      paramName: "state",
      starterCode: {
        en:
          "// Write your condition here:\n" +
          "\n" +
          "return 'wait';\n",
        sv:
          "// Skriv ditt villkor här:\n" +
          "\n" +
          "return 'wait';\n",
      },
      tests: [
        { label: { en: "WALK", sv: "WALK" }, input: { signal: "WALK" }, expected: "walk" },
        { label: { en: "STOP", sv: "STOP" }, input: { signal: "STOP" }, expected: "wait" },
        { label: { en: "FLASHING", sv: "BLINKAR" }, input: { signal: "FLASHING" }, expected: "wait" },
        { label: { en: "Walk (mixed case)", sv: "Walk (blandat)" }, input: { signal: "Walk" }, expected: "wait" },
      ],
      allegory: {
        kind: "crosswalk",
        config: {
          conditionLabel: "canCross(state)",
          inputKey: "signal",
          walkWhen: "walk",
          walkLabel: { en: "Walks", sv: "Går" },
          waitLabel: { en: "Waits", sv: "Väntar" },
        },
      },
    },
  ],
};
