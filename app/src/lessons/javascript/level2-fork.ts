import type { Lesson } from "../../types";
import { codePanelStyle } from "./_shared";

export const forkLesson: Lesson = {
  id: "conditionals-fork",
  title: "2. Vägkorsningen — else if",
  summary: "Flera vägar att välja mellan.",
  slides: [
    // 1. Intro
    {
      kind: "explanation",
      title: "Flera vägar",
      intro: "Ibland finns det fler än två svar.",
      demo: [
        {
          id: "code",
          label:
            "if (temp <= 0) {\n  return 'frys';\n} else if (temp <= 15) {\n  return 'kallt';\n} else {\n  return 'varmt';\n}",
          baseStyle: codePanelStyle,
        },
      ],
      steps: [
        {
          narration:
            "En vagn rullar mot en korsning.\nDär finns flera spår — den måste välja ett.",
        },
        {
          narration:
            "I koden skriver vi else if.\nDet betyder ”annars om”.",
        },
        {
          narration:
            "JavaScript läser uppifrån och ned.\nFörsta villkoret som stämmer — det vinner.\nResten hoppas över.",
        },
        {
          narration:
            "else på slutet är ett skyddsnät.\nDet körs när inget annat stämde.",
        },
      ],
    },

    // 2. Order matters
    {
      kind: "explanation",
      title: "Ordningen spelar roll",
      demo: [
        {
          id: "code",
          label:
            "if (temp <= 25) {\n  return 'milt';\n} else if (temp <= 0) {\n  return 'frys';\n}\n// fryskall vinter? returnerar 'milt'.",
          baseStyle: codePanelStyle,
        },
      ],
      steps: [
        {
          narration:
            "Vagnen tar första spåret som passar.\nDen kollar inte de andra.",
        },
        {
          narration:
            "Här: -10 grader är mindre än 25.\nVagnen tar första spåret och säger ”milt”.\nDet andra villkoret nås aldrig.",
        },
        {
          narration:
            "Lösning: skriv smalare villkor först.\nFörst frys, sedan kallt, sedan milt.",
        },
      ],
    },

    // 3. Practice — temperature
    {
      kind: "js-assignment",
      title: "Övning: temperaturen",
      prompt:
        "Returnera en av strängarna baserat på temperaturen:\n• 'frys' om <= 0\n• 'kallt' om <= 15\n• 'milt' om <= 25\n• 'varmt' annars.",
      functionName: "valjSpar",
      starterCode:
        "function valjSpar(temp) {\n" +
        "  if (/* villkor */) {\n" +
        "    return 'frys';\n" +
        "  } else if (/* villkor */) {\n" +
        "    return 'kallt';\n" +
        "  } else if (/* villkor */) {\n" +
        "    return 'milt';\n" +
        "  } else {\n" +
        "    return 'varmt';\n" +
        "  }\n" +
        "}\n",
      tests: [
        { label: "-5°", input: -5, expected: "frys" },
        { label: "0°", input: 0, expected: "frys" },
        { label: "10°", input: 10, expected: "kallt" },
        { label: "20°", input: 20, expected: "milt" },
        { label: "30°", input: 30, expected: "varmt" },
      ],
      allegory: {
        kind: "fork",
        config: {
          conditionLabel: "function valjSpar(temp) { ... }",
          branches: [
            { key: "frys", label: "frys" },
            { key: "kallt", label: "kallt" },
            { key: "milt", label: "milt" },
            { key: "varmt", label: "varmt" },
          ],
        },
      },
      legend: [
        {
          name: "else if",
          syntax: "} else if (villkor) { ... }",
          example: "} else if (temp <= 15) { ... }",
          note: "Kollas bara om villkoren ovan var falska.",
        },
        {
          name: "else",
          syntax: "} else { ... }",
          example: "} else { return 'varmt'; }",
          note: "Körs när inget av if/else if stämde.",
        },
      ],
    },

    // 4. Final
    {
      kind: "js-assignment",
      title: "Slutövning: poängsystem",
      prompt:
        "Returnera betyg baserat på poäng (0–100):\n• 'A' om >= 90\n• 'B' om >= 75\n• 'C' om >= 50\n• 'F' annars.",
      functionName: "betyg",
      starterCode:
        "function betyg(poang) {\n" +
        "  // Skriv din kedja av villkor här:\n" +
        "  \n" +
        "  return 'F';\n" +
        "}\n",
      tests: [
        { label: "95", input: 95, expected: "A" },
        { label: "80", input: 80, expected: "B" },
        { label: "60", input: 60, expected: "C" },
        { label: "30", input: 30, expected: "F" },
        { label: "0", input: 0, expected: "F" },
        { label: "100", input: 100, expected: "A" },
      ],
      allegory: {
        kind: "fork",
        config: {
          conditionLabel: "function betyg(poang) { ... }",
          branches: [
            { key: "A", label: "A" },
            { key: "B", label: "B" },
            { key: "C", label: "C" },
            { key: "F", label: "F" },
          ],
        },
      },
    },
  ],
};
