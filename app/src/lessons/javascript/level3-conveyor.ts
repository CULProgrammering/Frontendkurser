import type { Lesson } from "../../types";
import { codePanelStyle, noteBoxStyle } from "./_shared";

export const conveyorLesson: Lesson = {
  id: "conditionals-conveyor",
  title: "3. Sorteringsbandet — switch",
  summary: "switch sorterar värden i fack.",
  slides: [
    // 1. Intro
    {
      kind: "explanation",
      title: "switch — ett värde, många fack",
      intro:
        "När du jämför EN sak mot flera möjliga värden\nkan switch göra koden tydligare än en lång if-kedja.",
      demo: [
        {
          id: "code",
          label:
            "switch (dag) {\n  case 'mån':\n    return 'måndag';\n  case 'tis':\n    return 'tisdag';\n  default:\n    return 'okänd';\n}",
          baseStyle: codePanelStyle,
        },
      ],
      steps: [
        {
          narration:
            "Tänk dig ett sorteringsband.\nEtt paket dimper ner och letar sitt fack.",
        },
        {
          narration:
            "switch (dag) — vad ska vi titta på?\nVarje case är ett fack med en etikett.",
        },
        {
          narration:
            "default är resten-facket.\nDär hamnar paket som inte matchade någon case.",
        },
      ],
    },

    // 2. break and fall-through
    {
      kind: "explanation",
      title: "Glöm inte break",
      demo: [
        {
          id: "code",
          label:
            "switch (dag) {\n  case 'fre':\n    return 'fredag';\n  case 'lör':\n    return 'lördag';\n  case 'sön':\n    return 'söndag';\n}",
          baseStyle: codePanelStyle,
        },
        {
          id: "note",
          label:
            "return stoppar funktionen och passar bra här.\nOm du inte returnerar — använd break;\nannars rinner koden vidare till nästa case.",
          baseStyle: { ...noteBoxStyle, marginTop: 16 },
        },
      ],
      steps: [
        {
          narration:
            "När JavaScript hittar en case som matchar\nkör den koden där.",
        },
        {
          narration:
            "Sen fortsätter den NEDÅT in i nästa case —\nom du inte säger stopp.",
        },
        {
          narration:
            "return stoppar funktionen och avslutar switch.\nbreak; stoppar bara switch men låter funktionen fortsätta.",
        },
        {
          narration:
            "Glömmer du både return och break\nså rinner värdet vidare. Det kallas fall-through\noch är nästan alltid en bugg.",
        },
      ],
    },

    // 3. switch is strict
    {
      kind: "explanation",
      title: "switch jämför strikt",
      demo: [
        {
          id: "code",
          label:
            "switch (1) {\n  case '1':\n    return 'sträng';\n  case 1:\n    return 'siffra';\n}\n// returnerar 'siffra'",
          baseStyle: codePanelStyle,
        },
      ],
      steps: [
        {
          narration:
            "switch fungerar som === bakom kulisserna.\nTalet 1 är inte samma som strängen '1'.",
        },
        {
          narration:
            "Det betyder också att switch bara duger\ntill jämförelser med konkreta värden.",
        },
        {
          narration:
            "Vill du jämföra med ett intervall —\ntemp <= 15, exempelvis — välj if/else if istället.",
        },
      ],
    },

    // 4. Practice
    {
      kind: "js-assignment",
      title: "Övning: dagens humör",
      prompt:
        "Returnera ett ord baserat på vilken dag det är (kort form):\n• 'mån' → 'tungt'\n• 'fre' → 'helg-känsla'\n• 'lör' → 'helg'\n• 'sön' → 'helg'\n• allt annat → 'vardag'",
      functionName: "humor",
      starterCode:
        "function humor(dag) {\n" +
        "  switch (dag) {\n" +
        "    case '...':\n" +
        "      return '...';\n" +
        "    default:\n" +
        "      return 'vardag';\n" +
        "  }\n" +
        "}\n",
      tests: [
        { label: "mån", input: "mån", expected: "tungt" },
        { label: "tis", input: "tis", expected: "vardag" },
        { label: "fre", input: "fre", expected: "helg-känsla" },
        { label: "lör", input: "lör", expected: "helg" },
        { label: "sön", input: "sön", expected: "helg" },
      ],
      allegory: {
        kind: "conveyor",
        config: {
          inputLabel: "function humor(dag) { ... }",
          bins: [
            { key: "tungt", label: "tungt" },
            { key: "helg-känsla", label: "helg-känsla" },
            { key: "helg", label: "helg" },
            { key: "vardag", label: "vardag (default)" },
          ],
          defaultBinKey: "vardag",
        },
      },
      legend: [
        {
          name: "switch",
          syntax: "switch (uttryck) { case ... }",
          example: "switch (dag) { case 'mån': ... }",
          note: "Värdet jämförs strikt mot varje case.",
        },
        {
          name: "case ... return",
          syntax: "case 'värde':\n  return ...;",
          example: "case 'mån': return 'tungt';",
          note: "return avslutar både switch och funktionen.",
        },
        {
          name: "default",
          syntax: "default:\n  return ...;",
          example: "default: return 'vardag';",
          note: "Körs om ingen case matchade.",
        },
      ],
    },

    // 5. Final
    {
      kind: "js-assignment",
      title: "Slutövning: trafikljus",
      prompt:
        "Returnera vad föraren ska göra:\n• 'röd' → 'stanna'\n• 'gul' → 'sakta in'\n• 'grön' → 'kör'\n• allt annat → 'okänd'",
      functionName: "trafikljus",
      starterCode:
        "function trafikljus(farg) {\n" +
        "  // Skriv din switch här:\n" +
        "  \n" +
        "}\n",
      tests: [
        { label: "röd", input: "röd", expected: "stanna" },
        { label: "gul", input: "gul", expected: "sakta in" },
        { label: "grön", input: "grön", expected: "kör" },
        { label: "blå", input: "blå", expected: "okänd" },
        { label: "RÖD", input: "RÖD", expected: "okänd" },
      ],
      allegory: {
        kind: "conveyor",
        config: {
          inputLabel: "function trafikljus(farg) { ... }",
          bins: [
            { key: "stanna", label: "stanna" },
            { key: "sakta in", label: "sakta in" },
            { key: "kör", label: "kör" },
            { key: "okänd", label: "okänd" },
          ],
          defaultBinKey: "okänd",
        },
      },
    },
  ],
};
