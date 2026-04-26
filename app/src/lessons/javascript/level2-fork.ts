import type { Lesson } from "../../types";
import { codePanelStyle } from "./_shared";

export const forkLesson: Lesson = {
  id: "conditionals-wardrobe",
  title: { en: "2. Wardrobe — else if", sv: "2. Garderoben — else if" },
  summary: {
    en: "Pick an outfit by the temperature.",
    sv: "Välj en outfit beroende på temperaturen.",
  },
  slides: [
    // 1. Intro — wardrobe scene
    {
      kind: "explanation",
      title: { en: "More than two answers", sv: "Fler än två svar" },
      intro: {
        en: "Sometimes there are more than two outcomes.",
        sv: "Ibland finns det fler än två utfall.",
      },
      customScene: "wardrobe",
      demo: [],
      steps: [
        {
          narration: {
            en:
              "You stand in front of your wardrobe.\nWhat to wear depends on the temperature.",
            sv:
              "Du står framför garderoben.\nVad du tar på dig beror på temperaturen.",
          },
        },
        {
          narration: {
            en: "Cold? You grab the winter coat.",
            sv: "Kallt? Då tar du vinterkappan.",
          },
        },
        {
          narration: {
            en: "Mild? A jacket is enough.",
            sv: "Milt? En jacka räcker.",
          },
        },
        {
          narration: {
            en: "Warm? Just a t-shirt.",
            sv: "Varmt? Bara en t-shirt.",
          },
        },
      ],
    },

    // 2. else if
    {
      kind: "explanation",
      title: { en: "if / else if / else", sv: "if / else if / else" },
      demo: [
        {
          id: "code",
          label:
            "if (temp <= 0) {\n  return 'coat';\n} else if (temp <= 15) {\n  return 'jacket';\n} else {\n  return 'shirt';\n}",
          baseStyle: codePanelStyle,
        },
      ],
      steps: [
        {
          narration: {
            en:
              "We chain conditions with else if.\nIt means 'otherwise if'.",
            sv:
              "Vi kedjar villkor med else if.\nDet betyder 'annars om'.",
          },
        },
        {
          narration: {
            en:
              "JavaScript reads from top to bottom.\nThe first condition that is true wins.\nThe rest are skipped.",
            sv:
              "JavaScript läser uppifrån och ned.\nFörsta villkoret som stämmer vinner.\nResten hoppas över.",
          },
        },
        {
          narration: {
            en:
              "else at the end is a safety net.\nIt runs when nothing else matched.",
            sv:
              "else på slutet är ett skyddsnät.\nDet körs när inget annat stämde.",
          },
        },
      ],
    },

    // 3. Order matters
    {
      kind: "explanation",
      title: { en: "Order matters", sv: "Ordningen spelar roll" },
      demo: [
        {
          id: "code",
          label:
            "if (temp <= 25) {\n  return 'jacket';\n} else if (temp <= 0) {\n  return 'coat';\n}\n// freezing winter? returns 'jacket'.",
          baseStyle: codePanelStyle,
        },
      ],
      steps: [
        {
          narration: {
            en:
              "Only the first matching branch runs.\nThe others aren't even checked.",
            sv:
              "Bara första matchande grenen körs.\nDe andra läses inte ens.",
          },
        },
        {
          narration: {
            en:
              "Here: -10° is also less than 25.\nSo it picks 'jacket' — even though we wanted 'coat'.",
            sv:
              "Här: -10° är också mindre än 25.\nSå den väljer 'jacket' — även om vi ville ha 'coat'.",
          },
        },
        {
          narration: {
            en:
              "Fix: write the narrower condition first.\nFreezing, then cold, then mild.",
            sv:
              "Lösning: skriv smalare villkor först.\nFrys, sedan kallt, sedan milt.",
          },
        },
      ],
    },

    // 4. Practice — temperature → outfit
    {
      kind: "js-assignment",
      title: { en: "Practice: pick an outfit", sv: "Övning: välj outfit" },
      prompt: {
        en:
          "Return one of the strings based on temperature:\n• 'coat' when <= 0\n• 'jacket' when <= 15\n• 'shirt' otherwise.",
        sv:
          "Returnera en av strängarna baserat på temperaturen:\n• 'coat' när <= 0\n• 'jacket' när <= 15\n• 'shirt' annars.",
      },
      functionName: "pickOutfit",
      starterCode: {
        en:
          "function pickOutfit(temp) {\n" +
          "  if (/* condition */) {\n" +
          "    return 'coat';\n" +
          "  } else if (/* condition */) {\n" +
          "    return 'jacket';\n" +
          "  } else {\n" +
          "    return 'shirt';\n" +
          "  }\n" +
          "}\n",
        sv:
          "function pickOutfit(temp) {\n" +
          "  if (/* villkor */) {\n" +
          "    return 'coat';\n" +
          "  } else if (/* villkor */) {\n" +
          "    return 'jacket';\n" +
          "  } else {\n" +
          "    return 'shirt';\n" +
          "  }\n" +
          "}\n",
      },
      tests: [
        { label: { en: "-5°", sv: "-5°" }, input: -5, expected: "coat" },
        { label: { en: "0°", sv: "0°" }, input: 0, expected: "coat" },
        { label: { en: "10°", sv: "10°" }, input: 10, expected: "jacket" },
        { label: { en: "20°", sv: "20°" }, input: 20, expected: "shirt" },
        { label: { en: "30°", sv: "30°" }, input: 30, expected: "shirt" },
      ],
      allegory: {
        kind: "fork",
        config: {
          conditionLabel: "function pickOutfit(temp) { ... }",
          branches: [
            { key: "coat", label: { en: "coat", sv: "kappa" } },
            { key: "jacket", label: { en: "jacket", sv: "jacka" } },
            { key: "shirt", label: { en: "shirt", sv: "t-shirt" } },
          ],
        },
      },
      legend: [
        {
          name: { en: "else if", sv: "else if" },
          syntax: "} else if (condition) { ... }",
          example: "} else if (temp <= 15) { ... }",
          note: {
            en: "Only checked when the conditions above were false.",
            sv: "Kollas bara om villkoren ovan var falska.",
          },
        },
        {
          name: { en: "else", sv: "else" },
          syntax: "} else { ... }",
          example: "} else { return 'shirt'; }",
          note: {
            en: "Runs when no if / else if matched.",
            sv: "Körs när inget if / else if stämde.",
          },
        },
      ],
    },

    // 5. Final — grade banding
    {
      kind: "js-assignment",
      title: { en: "Final: a grade for the score", sv: "Slutövning: betyg på poäng" },
      prompt: {
        en:
          "Return a grade based on score (0–100):\n• 'A' if >= 90\n• 'B' if >= 75\n• 'C' if >= 50\n• 'F' otherwise.",
        sv:
          "Returnera betyg baserat på poäng (0–100):\n• 'A' om >= 90\n• 'B' om >= 75\n• 'C' om >= 50\n• 'F' annars.",
      },
      functionName: "grade",
      starterCode: {
        en:
          "function grade(score) {\n" +
          "  // Write your chain of conditions here:\n" +
          "  \n" +
          "  return 'F';\n" +
          "}\n",
        sv:
          "function grade(score) {\n" +
          "  // Skriv din kedja av villkor här:\n" +
          "  \n" +
          "  return 'F';\n" +
          "}\n",
      },
      tests: [
        { label: { en: "95", sv: "95" }, input: 95, expected: "A" },
        { label: { en: "80", sv: "80" }, input: 80, expected: "B" },
        { label: { en: "60", sv: "60" }, input: 60, expected: "C" },
        { label: { en: "30", sv: "30" }, input: 30, expected: "F" },
        { label: { en: "0", sv: "0" }, input: 0, expected: "F" },
        { label: { en: "100", sv: "100" }, input: 100, expected: "A" },
      ],
      allegory: {
        kind: "fork",
        config: {
          conditionLabel: "function grade(score) { ... }",
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
