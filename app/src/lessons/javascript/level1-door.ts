import type { Lesson } from "../../types";
import { codePanelStyle, noteBoxStyle } from "./_shared";

export const doorLesson: Lesson = {
  id: "conditionals-door",
  title: "1. Dörren — if och else",
  summary: "Villkor som öppnar eller stänger dörren.",
  slides: [
    // 1. Intro
    {
      kind: "explanation",
      title: "Villkor i kod",
      intro: "Ibland ska koden välja vad som händer.",
      demo: [
        {
          id: "title",
          label: "if",
          baseStyle: {
            fontFamily: "ui-monospace, monospace",
            fontSize: 96,
            fontWeight: 700,
            color: "#d97706",
            padding: 24,
          },
        },
      ],
      steps: [
        {
          narration:
            "Tänk dig en dörr.\nIbland öppnas den, ibland inte.\nVad som händer beror på ett villkor.",
        },
        {
          narration:
            "I JavaScript skriver vi villkor med ordet if.\nDet betyder ”om”.",
        },
        {
          narration:
            "Om villkoret är sant — kör koden inuti.\nOm det inte är sant — hoppa över den.",
        },
      ],
    },

    // 2. The if statement
    {
      kind: "explanation",
      title: "Så här ser ett if ut",
      demo: [
        {
          id: "code",
          label:
            "if (alder >= 18) {\n  slappIn();\n}",
          baseStyle: codePanelStyle,
        },
      ],
      steps: [
        {
          narration:
            "Inom parentesen står villkoret.\nHär: är åldern minst 18?",
        },
        {
          narration:
            "Inom klammerparentesen { } står koden\nsom körs om villkoret är sant.",
        },
        {
          narration:
            "Om alder är 20 — slappIn() körs.\nOm alder är 14 — ingenting händer.",
        },
        {
          narration:
            "Vanliga jämförelser:\n>   större än\n<   mindre än\n>=  större än eller lika med\n<=  mindre än eller lika med",
        },
      ],
    },

    // 3. First exercise — write the condition
    {
      kind: "js-assignment",
      title: "Övning: släpp in vuxna",
      prompt:
        "Skriv ett villkor som returnerar true om personen är minst 18 år. Annars false.",
      functionName: "tillats",
      starterCode:
        "function tillats(person) {\n" +
        "  // Ändra villkoret nedan:\n" +
        "  if (false) {\n" +
        "    return true;\n" +
        "  }\n" +
        "  return false;\n" +
        "}\n",
      tests: [
        { label: "ålder 14", input: { age: 14 }, expected: false },
        { label: "ålder 17", input: { age: 17 }, expected: false },
        { label: "ålder 18", input: { age: 18 }, expected: true },
        { label: "ålder 32", input: { age: 32 }, expected: true },
      ],
      allegory: {
        kind: "door",
        config: {
          conditionLabel: "function tillats(person) { ... }",
          inputKey: "age",
          acceptLabel: "Släpps in",
          rejectLabel: "Stoppas",
        },
      },
      legend: [
        {
          name: "if",
          syntax: "if (villkor) { ... }",
          example: "if (alder >= 18) { ... }",
          note: "Kör koden inuti om villkoret är sant.",
        },
        {
          name: "Jämförelser",
          syntax: ">  <  >=  <=",
          example: "person.age >= 18",
          note: "Returnerar true eller false.",
        },
        {
          name: "return",
          syntax: "return värde",
          example: "return true;",
          note: "Skickar tillbaka ett svar från funktionen.",
        },
      ],
    },

    // 4. else
    {
      kind: "explanation",
      title: "else — annars",
      demo: [
        {
          id: "code",
          label:
            "if (alder >= 18) {\n  slappIn();\n} else {\n  visaTillBaka();\n}",
          baseStyle: codePanelStyle,
        },
      ],
      steps: [
        {
          narration:
            "else betyder ”annars”.\nDen kör när villkoret är falskt.",
        },
        {
          narration:
            "Det går alltid bara en av grenarna —\nantingen if eller else, aldrig båda.",
        },
        {
          narration:
            "else är frivilligt.\nIbland behöver man inte göra något när villkoret är falskt.",
        },
      ],
    },

    // 5. = vs == vs ===
    {
      kind: "explanation",
      title: "= , == och ===",
      intro: "Tre tecken som ser lika ut men betyder helt olika saker.",
      demo: [
        {
          id: "code",
          label:
            "x = 5      // sätter x till 5\nx == 5     // jämför (undvik)\nx === 5    // jämför strikt (använd)",
          baseStyle: codePanelStyle,
        },
        {
          id: "warning",
          label:
            "Vanlig fälla:\nif (x = 5) — sätter x till 5,\nblir alltid sant. Nästan aldrig vad du vill.",
          baseStyle: { ...noteBoxStyle, marginTop: 16 },
        },
      ],
      steps: [
        {
          narration:
            "Ett likhetstecken — = — sätter ett värde.\nDet är inte en fråga, det är ett besked.",
        },
        {
          narration:
            "Tre likhetstecken — === — frågar om värdena är lika.\nDet är vad du vill använda i ett villkor.",
        },
        {
          narration:
            "Två likhetstecken — == — frågar också, men slarvigt.\nDet säger att 5 och ”5” är lika, vilket sällan stämmer.\nAnvänd ===.",
        },
      ],
    },

    // 6. Exercise — if/else with strict equality
    {
      kind: "js-assignment",
      title: "Övning: bara medlemmar",
      prompt:
        "Returnera true om person.role är exakt strängen 'medlem'. Annars false.",
      functionName: "tillats",
      starterCode:
        "function tillats(person) {\n" +
        "  if (/* villkor */) {\n" +
        "    return true;\n" +
        "  } else {\n" +
        "    return false;\n" +
        "  }\n" +
        "}\n",
      tests: [
        { label: "medlem", input: { role: "medlem" }, expected: true },
        { label: "gast", input: { role: "gast" }, expected: false },
        { label: "Medlem", input: { role: "Medlem" }, expected: false },
        { label: "tom sträng", input: { role: "" }, expected: false },
      ],
      allegory: {
        kind: "door",
        config: {
          conditionLabel: "person.role === 'medlem'",
          inputKey: "role",
          acceptLabel: "Släpps in",
          rejectLabel: "Stoppas",
        },
      },
      legend: [
        {
          name: "===",
          syntax: "a === b",
          example: "role === 'medlem'",
          note: "Sant bara om värdena är exakt lika.",
        },
        {
          name: "if / else",
          syntax: "if (...) { ... } else { ... }",
          example: "if (ok) return true; else return false;",
          note: "En av grenarna körs alltid.",
        },
      ],
    },

    // 7. Boolean variable as condition
    {
      kind: "explanation",
      title: "Villkor med en boolean",
      demo: [
        {
          id: "code",
          label:
            "let dorrenAr Olast = true;\n\nif (dorrenArOlast) {\n  slappIn();\n}",
          baseStyle: codePanelStyle,
        },
      ],
      steps: [
        {
          narration:
            "En variabel kan redan vara sann eller falsk —\ndet kallas en boolean.",
        },
        {
          narration:
            "Då behöver du inget jämförelsetecken.\nVariabeln ÄR redan svaret.",
        },
        {
          narration:
            "if (dorrenArOlast) läser direkt:\nom variabeln är true — kör koden.",
        },
      ],
    },

    // 8. Final — combine
    {
      kind: "js-assignment",
      title: "Slutövning: dörren",
      prompt:
        "Skriv en funktion som returnerar:\n• 'Välkommen' om person.aldersstatus är 'vuxen'\n• 'Stoppad' annars.",
      functionName: "tillats",
      starterCode:
        "function tillats(person) {\n" +
        "  // Skriv ditt villkor här:\n" +
        "  \n" +
        "  return 'Stoppad';\n" +
        "}\n",
      tests: [
        { label: "vuxen", input: { aldersstatus: "vuxen" }, expected: "Välkommen" },
        { label: "barn", input: { aldersstatus: "barn" }, expected: "Stoppad" },
        { label: "ungdom", input: { aldersstatus: "ungdom" }, expected: "Stoppad" },
        { label: "Vuxen (stor V)", input: { aldersstatus: "Vuxen" }, expected: "Stoppad" },
      ],
      allegory: {
        kind: "door",
        config: {
          conditionLabel: "function tillats(person) { ... }",
          inputKey: "aldersstatus",
          acceptLabel: "Välkommen",
          rejectLabel: "Stoppad",
        },
      },
      // No legend — final challenge.
    },
  ],
};
