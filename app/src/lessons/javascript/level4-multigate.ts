import type { Lesson } from "../../types";
import { codePanelStyle } from "./_shared";

export const multiGateLesson: Lesson = {
  id: "conditionals-multigate",
  title: "4. Flera grindar — &&, || och !",
  summary: "Kombinera villkor med och, eller, inte.",
  slides: [
    // 1. AND
    {
      kind: "explanation",
      title: "&& — och",
      intro: "&& betyder ”och”. Båda sidorna måste vara sanna.",
      demo: [
        {
          id: "code",
          label:
            "if (alder >= 18 && harBiljett) {\n  slappIn();\n}",
          baseStyle: codePanelStyle,
        },
      ],
      steps: [
        {
          narration:
            "Tänk dig två grindar i rad.\nDu måste passera båda för att komma fram.",
        },
        {
          narration:
            "&& kollar VÄNSTER sida först.\nÄr den falsk — höger sida läses inte ens.",
        },
        {
          narration:
            "true && true   →  true\ntrue && false  →  false\nfalse && ...   →  false (höger struntas i)",
        },
      ],
    },

    // 2. OR
    {
      kind: "explanation",
      title: "|| — eller",
      intro: "|| betyder ”eller”. Minst en sida räcker.",
      demo: [
        {
          id: "code",
          label:
            "if (arVip || harBiljett) {\n  slappIn();\n}",
          baseStyle: codePanelStyle,
        },
      ],
      steps: [
        {
          narration:
            "Tänk dig två dörrar till samma rum.\nGår du in genom någon av dem är du inne.",
        },
        {
          narration:
            "|| kollar också vänster först.\nÄr den sann — höger läses inte.",
        },
        {
          narration:
            "true || ...    →  true (höger struntas i)\nfalse || true  →  true\nfalse || false →  false",
        },
      ],
    },

    // 3. NOT
    {
      kind: "explanation",
      title: "! — inte",
      demo: [
        {
          id: "code",
          label:
            "let stangd = true;\n\nif (!stangd) {\n  slappIn();\n}\n// vänder true till false",
          baseStyle: codePanelStyle,
        },
      ],
      steps: [
        {
          narration:
            "! står före ett värde och vänder det.\nSant blir falskt. Falskt blir sant.",
        },
        {
          narration:
            "Det är användbart när variabeln redan beskriver det motsatta\nav vad du vill kolla.",
        },
        {
          narration:
            "!true   →  false\n!false  →  true",
        },
      ],
    },

    // 4. Practice — AND
    {
      kind: "js-assignment",
      title: "Övning: ålder OCH biljett",
      prompt:
        "Returnera true om personen är 18 eller äldre OCH har biljett.\nAnnars false.",
      functionName: "tillats",
      starterCode:
        "function tillats(person) {\n" +
        "  return /* ditt villkor med && */;\n" +
        "}\n",
      tests: [
        { label: "16, biljett", input: { age: 16, harBiljett: true }, expected: false },
        { label: "20, ingen biljett", input: { age: 20, harBiljett: false }, expected: false },
        { label: "20, biljett", input: { age: 20, harBiljett: true }, expected: true },
        { label: "18, biljett", input: { age: 18, harBiljett: true }, expected: true },
      ],
      allegory: {
        kind: "multi-gate",
        config: {
          mode: "and",
          operandLabels: ["age", "harBiljett"],
          passLabel: "Släpps in",
          failLabel: "Stoppas",
        },
      },
      legend: [
        {
          name: "&&",
          syntax: "a && b",
          example: "age >= 18 && harBiljett",
          note: "Sant bara om båda är sanna.",
        },
      ],
    },

    // 5. Practice — OR
    {
      kind: "js-assignment",
      title: "Övning: VIP eller biljett",
      prompt:
        "Returnera true om personen ÄR VIP ELLER har biljett.\nAnnars false.",
      functionName: "tillats",
      starterCode:
        "function tillats(person) {\n" +
        "  return /* ditt villkor med || */;\n" +
        "}\n",
      tests: [
        { label: "VIP, ingen biljett", input: { vip: true, harBiljett: false }, expected: true },
        { label: "ej VIP, biljett", input: { vip: false, harBiljett: true }, expected: true },
        { label: "ingen alls", input: { vip: false, harBiljett: false }, expected: false },
        { label: "båda", input: { vip: true, harBiljett: true }, expected: true },
      ],
      allegory: {
        kind: "multi-gate",
        config: {
          mode: "or",
          operandLabels: ["vip", "harBiljett"],
          passLabel: "Släpps in",
          failLabel: "Stoppas",
        },
      },
      legend: [
        {
          name: "||",
          syntax: "a || b",
          example: "vip || harBiljett",
          note: "Sant så snart en sida är sann.",
        },
      ],
    },

    // 6. Final — combine all three
    {
      kind: "js-assignment",
      title: "Slutövning: dörrvakten",
      prompt:
        "Personen släpps in om:\n• åldern är minst 18\n• OCH personen har biljett ELLER är VIP\n• OCH personen är INTE bannad.",
      functionName: "tillats",
      starterCode:
        "function tillats(person) {\n" +
        "  // Skriv ett villkor som kombinerar &&, || och !:\n" +
        "  return false;\n" +
        "}\n",
      tests: [
        { label: "20 + biljett", input: { age: 20, harBiljett: true, vip: false, bannad: false }, expected: true },
        { label: "20 + VIP", input: { age: 20, harBiljett: false, vip: true, bannad: false }, expected: true },
        { label: "16 + biljett", input: { age: 16, harBiljett: true, vip: false, bannad: false }, expected: false },
        { label: "20, inget", input: { age: 20, harBiljett: false, vip: false, bannad: false }, expected: false },
        { label: "20 + bannad", input: { age: 20, harBiljett: true, vip: true, bannad: true }, expected: false },
      ],
      allegory: {
        kind: "multi-gate",
        config: {
          mode: "and",
          operandLabels: ["age", "bannad"],
          passLabel: "Släpps in",
          failLabel: "Stoppas",
        },
      },
    },
  ],
};
