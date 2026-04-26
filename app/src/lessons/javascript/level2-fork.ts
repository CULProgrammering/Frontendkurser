import type { Lesson } from "../../types";
import { codePanelStyle, noteBoxStyle } from "./_shared";

export const forkLesson: Lesson = {
  id: "conditionals-wardrobe",
  title: { en: "2. Wardrobe — else if", sv: "2. Garderoben — else if" },
  summary: {
    en: "Pick an outfit by the temperature.",
    sv: "Välj en outfit beroende på temperaturen.",
  },
  slides: [
    // 1. Intro — wardrobe stick-figure scene
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

    // 2. Why if/else isn't enough — motivation
    {
      kind: "explanation",
      title: {
        en: "Two paths aren't always enough",
        sv: "Två vägar räcker inte alltid",
      },
      intro: {
        en:
          "if and else give you exactly two paths.\nBut sometimes you have three (or more) outcomes.",
        sv:
          "if och else ger dig exakt två vägar.\nMen ibland har du tre (eller fler) utfall.",
      },
      demo: [
        {
          id: "code",
          label:
            'if (temp <= 0) {\n  return "coat";\n} else {\n  // jacket OR t-shirt?\n  // we can\'t tell with just else\n}',
          baseStyle: codePanelStyle,
        },
      ],
      steps: [
        {
          narration: {
            en:
              "With if/else there are only two outcomes.\nWe can split cold from not-cold,\nbut we can't tell mild from warm.",
            sv:
              "Med if/else finns bara två utfall.\nVi kan skilja kallt från ej-kallt,\nmen vi kan inte skilja milt från varmt.",
          },
        },
        {
          narration: {
            en:
              "We need to ASK A SECOND QUESTION\nwhen the first answer was no.\nThat's what else if is for.",
            sv:
              "Vi behöver STÄLLA EN ANDRA FRÅGA\nnär det första svaret var nej.\nDet är vad else if används till.",
          },
        },
      ],
    },

    // 3. Anatomy of the chain
    {
      kind: "explanation",
      title: { en: "if / else if / else", sv: "if / else if / else" },
      demo: [
        {
          id: "code",
          label:
            'if (temp <= 0) {\n  return "coat";\n} else if (temp <= 15) {\n  return "jacket";\n} else {\n  return "shirt";\n}',
          baseStyle: codePanelStyle,
        },
      ],
      steps: [
        {
          narration: {
            en:
              "Three branches. Each one is a question OR a fallback.",
            sv:
              "Tre grenar. Varje gren är en fråga ELLER en reservutgång.",
          },
        },
        {
          narration: {
            en:
              "1.  if  is the first question.\nIf the answer is yes, that branch runs and we're done.",
            sv:
              "1.  if  är den första frågan.\nÄr svaret ja körs den grenen, och vi är klara.",
          },
        },
        {
          narration: {
            en:
              "2.  else if  means 'otherwise, if'.\nIt only asks its question when the FIRST one was false.\nYou can chain as many else if's as you like.",
            sv:
              "2.  else if  betyder 'annars, om'.\nDen ställer sin fråga BARA om den FÖRSTA var falsk.\nDu kan kedja hur många else if du vill.",
          },
        },
        {
          narration: {
            en:
              "3.  else  at the very end is the fallback.\nIt runs when NOTHING above matched.",
            sv:
              "3.  else  på slutet är reservutgången.\nDen körs när INGET ovan stämde.",
          },
        },
        {
          narration: {
            en:
              "Important rule: only ONE branch runs.\nThe first one whose question is true wins.\nThe rest are skipped — not even checked.",
            sv:
              "Viktig regel: bara EN gren körs.\nFörsta grenen vars fråga är true vinner.\nResten hoppas över — inte ens kollade.",
          },
        },
      ],
    },

    // 4. Trace walkthrough — step through three temperatures
    {
      kind: "explanation",
      title: {
        en: "Watching the chain run",
        sv: "Vi ser kedjan köras",
      },
      intro: {
        en:
          "Same idea as last lesson — read the code line by line.\nThis time we'll do it three times: -5°, then 10°, then 25°.",
        sv:
          "Samma tanke som förra lektionen — läs koden rad för rad.\nDen här gången gör vi det tre gånger: -5°, sen 10°, sen 25°.",
      },
      customScene: "wardrobe-trace",
      demo: [],
      steps: [
        {
          narration: {
            en:
              "On the left is the code. On the right, a thermometer and a figure.\nClick to step forward.",
            sv:
              "Till vänster är koden. Till höger en termometer och en figur.\nKlicka för att stega framåt.",
          },
        },
        {
          narration: {
            en: "First we set temp to -5.",
            sv: "Först sätter vi temp till -5.",
          },
        },
        {
          narration: {
            en: "We reach the if. It asks: is temp <= 0?",
            sv: "Vi kommer till if. Den frågar: är temp <= 0?",
          },
        },
        {
          narration: {
            en:
              "-5 <= 0 is true.\nThe if's branch runs.",
            sv:
              "-5 <= 0 är true.\nIf-grenen körs.",
          },
        },
        {
          narration: {
            en:
              'return "coat".\nThe rest of the chain (else if, else) is SKIPPED entirely.',
            sv:
              'return "coat".\nResten av kedjan (else if, else) HOPPAS ÖVER helt.',
          },
        },
        {
          narration: {
            en: "Now change temp to 10 and run the same code again.",
            sv: "Nu ändrar vi temp till 10 och kör samma kod igen.",
          },
        },
        {
          narration: {
            en: "Reach the if. Is temp <= 0?",
            sv: "Vi kommer till if. Är temp <= 0?",
          },
        },
        {
          narration: {
            en:
              "10 <= 0 is false.\nWe move on to the else if.",
            sv:
              "10 <= 0 är false.\nVi går vidare till else if.",
          },
        },
        {
          narration: {
            en: "The else if asks its OWN question: is temp <= 15?",
            sv: "else if ställer sin EGEN fråga: är temp <= 15?",
          },
        },
        {
          narration: {
            en:
              "10 <= 15 is true.\nThis branch runs.",
            sv:
              "10 <= 15 är true.\nDen här grenen körs.",
          },
        },
        {
          narration: {
            en: 'return "jacket". The else is skipped.',
            sv: 'return "jacket". else hoppas över.',
          },
        },
        {
          narration: {
            en: "Last time. Set temp to 25.",
            sv: "Sista gången. Sätt temp till 25.",
          },
        },
        {
          narration: {
            en: "Reach the if. Is temp <= 0?",
            sv: "Vi kommer till if. Är temp <= 0?",
          },
        },
        {
          narration: {
            en: "25 <= 0 is false. Move on.",
            sv: "25 <= 0 är false. Gå vidare.",
          },
        },
        {
          narration: {
            en: "else if asks: is temp <= 15?",
            sv: "else if frågar: är temp <= 15?",
          },
        },
        {
          narration: {
            en:
              "25 <= 15 is also false.\nThe else if's branch is skipped too.",
            sv:
              "25 <= 15 är också false.\nelse if-grenen hoppas också över.",
          },
        },
        {
          narration: {
            en:
              "Now we hit the final else.\nThis is the fallback — it runs no matter what.",
            sv:
              "Nu når vi det avslutande else.\nDet är reservutgången — den körs oavsett.",
          },
        },
        {
          narration: {
            en:
              'return "shirt".\n\nThree temperatures, three different outcomes — same code.',
            sv:
              'return "shirt".\n\nTre temperaturer, tre olika utfall — samma kod.',
          },
        },
      ],
    },

    // 5. Practice — pick an outfit — chip-style, no distractors (first chip in L2)
    {
      kind: "js-chip-assignment",
      title: { en: "Practice: pick an outfit", sv: "Övning: välj outfit" },
      prompt: {
        en:
          "Build the if / else-if / else chain piece by piece.",
        sv:
          "Bygg if / else-if / else-kedjan bit för bit.",
      },
      puzzles: [
        // p1: code A — build the else-if condition (the new piece this lesson)
        {
          prompt: {
            en: "Build the condition for the middle branch.",
            sv: "Bygg villkoret för mellangrenen.",
          },
          template:
            'if (temp <= 0) {\n  return "coat";\n} else if ([[]] [[]] [[]]) {\n  return "jacket";\n} else {\n  return "shirt";\n}',
          chips: ["temp", "<=", "15"],
          solution: ["temp", "<=", "15"],
        },
        // p2: code A — full assembly
        {
          prompt: {
            en: "Put it all together.",
            sv: "Sätt ihop hela.",
          },
          template:
            'if ([[]]) {\n  return [[]];\n} else if ([[]]) {\n  return [[]];\n} else {\n  return [[]];\n}',
          chips: [
            "temp <= 0",
            '"coat"',
            "temp <= 15",
            '"jacket"',
            '"shirt"',
          ],
          solution: [
            "temp <= 0",
            '"coat"',
            "temp <= 15",
            '"jacket"',
            '"shirt"',
          ],
        },
        // p3: code B (hour) — build the else-if condition
        {
          prompt: {
            en: "Build the condition for the middle branch.",
            sv: "Bygg villkoret för mellangrenen.",
          },
          template:
            'if (hour <= 11) {\n  return "morning";\n} else if ([[]] [[]] [[]]) {\n  return "afternoon";\n} else {\n  return "evening";\n}',
          chips: ["hour", "<=", "17"],
          solution: ["hour", "<=", "17"],
        },
        // p4: code B — full assembly
        {
          prompt: {
            en: "Put it all together.",
            sv: "Sätt ihop hela.",
          },
          template:
            'if ([[]]) {\n  return [[]];\n} else if ([[]]) {\n  return [[]];\n} else {\n  return [[]];\n}',
          chips: [
            "hour <= 11",
            '"morning"',
            "hour <= 17",
            '"afternoon"',
            '"evening"',
          ],
          solution: [
            "hour <= 11",
            '"morning"',
            "hour <= 17",
            '"afternoon"',
            '"evening"',
          ],
        },
      ],
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
          example: '} else { return "shirt"; }',
          note: {
            en: "The fallback. Runs when nothing above matched.",
            sv: "Reservutgången. Körs när inget ovan stämde.",
          },
        },
        {
          name: { en: "<=", sv: "<=" },
          syntax: "a <= b",
          example: "temp <= 15",
          note: {
            en: "True when a is less than or equal to b.",
            sv: "Sant när a är mindre än eller lika med b.",
          },
        },
      ],
    },

    // 6. Order matters — the buggy chain
    {
      kind: "explanation",
      title: { en: "Order matters", sv: "Ordningen spelar roll" },
      intro: {
        en:
          "Only ONE branch runs — the first one whose question is true.\nThat means the ORDER of your conditions matters a lot.",
        sv:
          "Bara EN gren körs — den första vars fråga är true.\nDet betyder att ORDNINGEN på villkoren har stor betydelse.",
      },
      demo: [
        {
          id: "code",
          label:
            'if (temp <= 25) {\n  return "shirt";\n} else if (temp <= 0) {\n  return "coat";\n}\n// freezing winter? returns "shirt".',
          baseStyle: codePanelStyle,
        },
        {
          id: "warning",
          label: {
            en:
              "Same conditions, wrong order:\n-5 <= 25 is true,\nso the chain stops at the FIRST branch\nand returns 'shirt' even though it's freezing.",
            sv:
              "Samma villkor, fel ordning:\n-5 <= 25 är true,\nså kedjan stannar vid FÖRSTA grenen\noch returnerar 'shirt' fast det är minus.",
          },
          baseStyle: { ...noteBoxStyle, marginTop: 16 },
        },
      ],
      steps: [
        {
          narration: {
            en:
              "Look at this chain. It LOOKS like it covers the cases —\nbut the order is wrong.",
            sv:
              "Titta på den här kedjan. Den SER UT att täcka fallen —\nmen ordningen är fel.",
          },
        },
        {
          narration: {
            en:
              "If temp = -5,\nthe first question is: is -5 <= 25?\nYes! So it returns 'shirt'.\nThe coat branch is never even checked.",
            sv:
              "Om temp = -5,\nförsta frågan är: är -5 <= 25?\nJa! Så den returnerar 'shirt'.\nCoat-grenen kollas aldrig ens.",
          },
        },
        {
          narration: {
            en:
              "Rule of thumb: write the NARROWEST condition first.\nFreezing first, then cold, then mild.\nThe widest condition (or else) goes LAST.",
            sv:
              "Tumregel: skriv det SMALASTE villkoret först.\nFrys först, sen kallt, sen milt.\nBredaste villkoret (eller else) kommer SIST.",
          },
        },
        {
          narration: {
            en:
              "Why? Because each branch only runs\nwhen ALL the ones above were false.\nNarrow first means the others can assume 'we know it's NOT freezing'.",
            sv:
              "Varför? Varje gren körs bara\nnär ALLA ovanför var false.\nSmalt först betyder att de andra kan anta 'vi vet att det INTE fryser'.",
          },
        },
      ],
    },

    // 7. Final — grade banding (typed-input)
    {
      kind: "js-typed-assignment",
      title: { en: "Final: a grade for the score", sv: "Slutövning: betyg på poäng" },
      prompt: {
        en:
          "Write a chain that returns a grade based on score (0–100):\n• \"A\" if >= 90\n• \"B\" if >= 75\n• \"C\" if >= 50\n• \"F\" otherwise.\n\nThink about the order — type each condition into its box.",
        sv:
          "Skriv en kedja som returnerar betyg baserat på poäng (0–100):\n• \"A\" om >= 90\n• \"B\" om >= 75\n• \"C\" om >= 50\n• \"F\" annars.\n\nTänk på ordningen — skriv varje villkor i sin ruta.",
      },
      varNames: ["score"],
      template:
        'if ([[input:c1]]) {\n  return "A";\n} else if ([[input:c2]]) {\n  return "B";\n} else if ([[input:c3]]) {\n  return "C";\n} else {\n  return "F";\n}\n',
      tests: [
        { label: { en: "100", sv: "100" }, vars: { score: 100 }, expected: "A" },
        { label: { en: "95", sv: "95" }, vars: { score: 95 }, expected: "A" },
        { label: { en: "90", sv: "90" }, vars: { score: 90 }, expected: "A" },
        { label: { en: "80", sv: "80" }, vars: { score: 80 }, expected: "B" },
        { label: { en: "75", sv: "75" }, vars: { score: 75 }, expected: "B" },
        { label: { en: "60", sv: "60" }, vars: { score: 60 }, expected: "C" },
        { label: { en: "50", sv: "50" }, vars: { score: 50 }, expected: "C" },
        { label: { en: "30", sv: "30" }, vars: { score: 30 }, expected: "F" },
        { label: { en: "0", sv: "0" }, vars: { score: 0 }, expected: "F" },
      ],
      goalHint: {
        en:
          "Use >= for the conditions. Put the highest threshold (90) FIRST and work down.",
        sv:
          "Använd >= i villkoren. Lägg den högsta gränsen (90) FÖRST och arbeta nedåt.",
      },
      allegory: {
        kind: "fork",
        config: {
          conditionLabel: { en: "grade for score", sv: "betyg för score" },
          inputKey: "score",
          branches: [
            { key: "A", label: "A" },
            { key: "B", label: "B" },
            { key: "C", label: "C" },
            { key: "F", label: "F" },
          ],
        },
      },
      legend: [
        {
          name: { en: ">=", sv: ">=" },
          syntax: "a >= b",
          example: "score >= 90",
          note: {
            en: "True when a is greater than or equal to b.",
            sv: "Sant när a är större än eller lika med b.",
          },
        },
      ],
    },
  ],
};
