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

    // 2. The if statement
    {
      kind: "explanation",
      title: { en: "How an if looks", sv: "Hur ett if ser ut" },
      demo: [
        {
          id: "code",
          label: 'if (light === "green") {\n  walk();\n}',
          baseStyle: codePanelStyle,
        },
      ],
      steps: [
        {
          narration: {
            en:
              "Inside the parentheses is the condition.\nHere: is the light green?",
            sv:
              "Inom parentesen står villkoret.\nHär: är ljuset grönt?",
          },
        },
        {
          narration: {
            en:
              "Inside the curly braces is the code\nthat runs when the condition is true.",
            sv:
              "Inom klammerparentesen står koden\nsom körs när villkoret är sant.",
          },
        },
        {
          narration: {
            en:
              "If the light is green — walk() runs.\nIf it is red — nothing happens.",
            sv:
              "Om ljuset är grönt — walk() körs.\nOm det är rött — ingenting händer.",
          },
        },
        {
          narration: {
            en:
              "Common comparisons:\n>   greater than\n<   less than\n>=  greater than or equal\n<=  less than or equal\n=== equal (strict)",
            sv:
              "Vanliga jämförelser:\n>   större än\n<   mindre än\n>=  större än eller lika med\n<=  mindre än eller lika med\n=== lika med (strikt)",
          },
        },
      ],
    },

    // 3. Practice — write the condition
    {
      kind: "js-assignment",
      title: { en: "Practice: walk on green", sv: "Övning: gå på grönt" },
      prompt: {
        en: "Return true when the light is the string 'green'. Otherwise false.",
        sv: "Returnera true när ljuset är strängen 'green'. Annars false.",
      },
      functionName: "canCross",
      starterCode: {
        en:
          "function canCross(light) {\n" +
          "  // Change the condition below:\n" +
          "  if (false) {\n" +
          "    return true;\n" +
          "  }\n" +
          "  return false;\n" +
          "}\n",
        sv:
          "function canCross(light) {\n" +
          "  // Ändra villkoret nedan:\n" +
          "  if (false) {\n" +
          "    return true;\n" +
          "  }\n" +
          "  return false;\n" +
          "}\n",
      },
      tests: [
        { label: { en: "red", sv: "rött" }, input: "red", expected: false },
        { label: { en: "yellow", sv: "gult" }, input: "yellow", expected: false },
        { label: { en: "green", sv: "grönt" }, input: "green", expected: true },
        { label: { en: "blue (other)", sv: "blått (annat)" }, input: "blue", expected: false },
      ],
      allegory: {
        kind: "door",
        config: {
          conditionLabel: "function canCross(light) { ... }",
          acceptLabel: { en: "Walk", sv: "Gå" },
          rejectLabel: { en: "Wait", sv: "Vänta" },
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
          syntax: "return value",
          example: "return true;",
          note: {
            en: "Sends a result back from the function.",
            sv: "Skickar tillbaka ett svar från funktionen.",
          },
        },
      ],
    },

    // 4. else
    {
      kind: "explanation",
      title: { en: "else — otherwise", sv: "else — annars" },
      demo: [
        {
          id: "code",
          label:
            'if (light === "green") {\n  walk();\n} else {\n  wait();\n}',
          baseStyle: codePanelStyle,
        },
      ],
      steps: [
        {
          narration: {
            en: "else means 'otherwise'.\nIt runs when the condition is false.",
            sv: "else betyder 'annars'.\nDen kör när villkoret är falskt.",
          },
        },
        {
          narration: {
            en:
              "Only one branch ever runs —\neither if or else, never both.",
            sv:
              "Bara en gren körs någonsin —\nantingen if eller else, aldrig båda.",
          },
        },
        {
          narration: {
            en:
              "else is optional. Sometimes you don't need\nto do anything when the condition is false.",
            sv:
              "else är frivilligt. Ibland behöver du inte\ngöra något när villkoret är falskt.",
          },
        },
      ],
    },

    // 5. = vs == vs ===
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
            'x = 5      // sets x to 5\nx == 5     // compares (avoid)\nx === 5    // compares strictly (use)',
          baseStyle: codePanelStyle,
        },
        {
          id: "warning",
          label: {
            en:
              "Common trap:\nif (x = 5) — sets x to 5\nand is always true. Almost never what you want.",
            sv:
              "Vanlig fälla:\nif (x = 5) — sätter x till 5\noch är alltid sant. Nästan aldrig vad du vill.",
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
              "Three equals signs — === — ask whether two values are equal.\nThis is what you want in a condition.",
            sv:
              "Tre likhetstecken — === — frågar om två värden är lika.\nDet är vad du vill använda i ett villkor.",
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

    // 6. Practice — if/else with strict equality
    {
      kind: "js-assignment",
      title: { en: "Practice: walk signal", sv: "Övning: gångsignal" },
      prompt: {
        en:
          "The light is an object: { signal: 'WALK' | 'STOP' }.\nReturn true if signal is exactly 'WALK'. Otherwise false.",
        sv:
          "Ljuset är ett objekt: { signal: 'WALK' | 'STOP' }.\nReturnera true om signal är exakt 'WALK'. Annars false.",
      },
      functionName: "canCross",
      starterCode: {
        en:
          "function canCross(light) {\n" +
          "  if (/* condition */) {\n" +
          "    return true;\n" +
          "  } else {\n" +
          "    return false;\n" +
          "  }\n" +
          "}\n",
        sv:
          "function canCross(light) {\n" +
          "  if (/* villkor */) {\n" +
          "    return true;\n" +
          "  } else {\n" +
          "    return false;\n" +
          "  }\n" +
          "}\n",
      },
      tests: [
        { label: { en: "WALK", sv: "WALK" }, input: { signal: "WALK" }, expected: true },
        { label: { en: "STOP", sv: "STOP" }, input: { signal: "STOP" }, expected: false },
        { label: { en: "walk (lowercase)", sv: "walk (gemener)" }, input: { signal: "walk" }, expected: false },
        { label: { en: "empty", sv: "tom" }, input: { signal: "" }, expected: false },
      ],
      allegory: {
        kind: "door",
        config: {
          conditionLabel: "light.signal === 'WALK'",
          inputKey: "signal",
          acceptLabel: { en: "Walk", sv: "Gå" },
          rejectLabel: { en: "Wait", sv: "Vänta" },
        },
      },
      legend: [
        {
          name: { en: "===", sv: "===" },
          syntax: "a === b",
          example: 'signal === "WALK"',
          note: {
            en: "True only when the values are exactly equal.",
            sv: "Sant bara om värdena är exakt lika.",
          },
        },
        {
          name: { en: "if / else", sv: "if / else" },
          syntax: "if (...) { ... } else { ... }",
          example: "if (ok) return true; else return false;",
          note: {
            en: "One branch always runs.",
            sv: "En av grenarna körs alltid.",
          },
        },
      ],
    },

    // 7. Boolean variable as condition
    {
      kind: "explanation",
      title: {
        en: "A boolean as the condition",
        sv: "En boolean som villkor",
      },
      demo: [
        {
          id: "code",
          label:
            "let lightIsGreen = true;\n\nif (lightIsGreen) {\n  walk();\n}",
          baseStyle: codePanelStyle,
        },
      ],
      steps: [
        {
          narration: {
            en:
              "A variable can already be true or false —\nthat's called a boolean.",
            sv:
              "En variabel kan redan vara sann eller falsk —\ndet kallas en boolean.",
          },
        },
        {
          narration: {
            en:
              "Then you don't need a comparison.\nThe variable IS the answer.",
            sv:
              "Då behöver du inget jämförelsetecken.\nVariabeln ÄR svaret.",
          },
        },
        {
          narration: {
            en:
              "if (lightIsGreen) reads directly:\nif the variable is true — run the code.",
            sv:
              "if (lightIsGreen) läser direkt:\nom variabeln är sann — kör koden.",
          },
        },
      ],
    },

    // 8. Final
    {
      kind: "js-assignment",
      title: { en: "Final: walk or wait", sv: "Slutövning: gå eller vänta" },
      prompt: {
        en:
          "Write a function that returns:\n• 'walk' when state.signal is 'WALK'\n• 'wait' otherwise.",
        sv:
          "Skriv en funktion som returnerar:\n• 'walk' när state.signal är 'WALK'\n• 'wait' annars.",
      },
      functionName: "canCross",
      starterCode: {
        en:
          "function canCross(state) {\n" +
          "  // Write your condition here:\n" +
          "  \n" +
          "  return 'wait';\n" +
          "}\n",
        sv:
          "function canCross(state) {\n" +
          "  // Skriv ditt villkor här:\n" +
          "  \n" +
          "  return 'wait';\n" +
          "}\n",
      },
      tests: [
        { label: { en: "WALK", sv: "WALK" }, input: { signal: "WALK" }, expected: "walk" },
        { label: { en: "STOP", sv: "STOP" }, input: { signal: "STOP" }, expected: "wait" },
        { label: { en: "FLASHING", sv: "BLINKAR" }, input: { signal: "FLASHING" }, expected: "wait" },
        { label: { en: "Walk (mixed case)", sv: "Walk (blandat)" }, input: { signal: "Walk" }, expected: "wait" },
      ],
      allegory: {
        kind: "door",
        config: {
          conditionLabel: "function canCross(state) { ... }",
          inputKey: "signal",
          acceptLabel: { en: "walk", sv: "gå" },
          rejectLabel: { en: "wait", sv: "vänta" },
        },
      },
    },
  ],
};
