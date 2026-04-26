import type { Lesson } from "../../types";
import { codePanelStyle, noteBoxStyle } from "./_shared";

export const lettersLesson: Lesson = {
  id: "loops-letters",
  title: { en: "2. Letters — for…of", sv: "2. Bokstäverna — for…of" },
  summary: {
    en: "Walk through every character of a string.",
    sv: "Gå igenom varje tecken i en sträng.",
  },
  slides: [
    // 1. Intro — figure reading letters off a sign
    {
      kind: "explanation",
      title: { en: "Each letter, one at a time", sv: "Varje bokstav, en i taget" },
      intro: {
        en:
          "Sometimes you don't want a counter — you just want to look at each thing in turn.",
        sv:
          "Ibland vill du inte ha en räknare — du vill bara titta på varje sak i tur och ordning.",
      },
      customScene: "letters",
      demo: [],
      steps: [
        {
          narration: {
            en:
              "You stand in front of a sign with a word on it.\nYou're going to read it letter by letter.",
            sv:
              "Du står framför en skylt med ett ord.\nDu ska läsa det bokstav för bokstav.",
          },
        },
        {
          narration: {
            en: "First letter: H.",
            sv: "Första bokstaven: H.",
          },
        },
        {
          narration: {
            en: "Next: E.",
            sv: "Nästa: E.",
          },
        },
        {
          narration: {
            en: "L.",
            sv: "L.",
          },
        },
        {
          narration: {
            en: "L again.",
            sv: "L igen.",
          },
        },
        {
          narration: {
            en:
              "Last one: O.\n\nThat's what for…of does — it hands you each letter,\none at a time, until the word ends.",
            sv:
              "Sista: O.\n\nDet är vad for…of gör — den ger dig varje bokstav,\nen i taget, tills ordet är slut.",
          },
        },
      ],
    },

    // 2. Strings as sequences
    {
      kind: "explanation",
      title: {
        en: "A string is a sequence of letters",
        sv: "En sträng är en sekvens av bokstäver",
      },
      intro: {
        en:
          'When you write "HELLO", JavaScript sees five letters in order:\nH, then E, then L, then L, then O.',
        sv:
          'När du skriver "HELLO" ser JavaScript fem bokstäver i ordning:\nH, sen E, sen L, sen L, sen O.',
      },
      demo: [
        {
          id: "code",
          label: 'let word = "HELLO";\n//          ^ ^ ^ ^ ^\n//          H E L L O',
          baseStyle: codePanelStyle,
        },
      ],
      steps: [
        {
          narration: {
            en:
              "A string isn't just one thing — it's a sequence of characters.\nfor…of can walk through that sequence one character at a time.",
            sv:
              "En sträng är inte bara en sak — det är en sekvens av tecken.\nfor…of kan gå igenom sekvensen ett tecken i taget.",
          },
        },
        {
          narration: {
            en:
              "We don't need a counter. We don't pick the letters by index.\nfor…of just hands them to us in order.",
            sv:
              "Vi behöver ingen räknare. Vi väljer inte bokstäver med index.\nfor…of räcker dem helt enkelt i ordning.",
          },
        },
      ],
    },

    // 3. Anatomy of for...of
    {
      kind: "explanation",
      title: { en: "for…of, piece by piece", sv: "for…of, del för del" },
      demo: [
        {
          id: "code",
          label: 'for (const ch of "HELLO") {\n  // body — runs once per letter\n}',
          baseStyle: codePanelStyle,
        },
      ],
      steps: [
        {
          narration: {
            en:
              "Five parts:\nfor   ( const ch   of   string )   { body }",
            sv:
              "Fem delar:\nfor   ( const ch   of   sträng )   { kropp }",
          },
        },
        {
          narration: {
            en:
              "1.  for  is the same keyword as before.",
            sv:
              "1.  for  är samma nyckelord som förra lektionen.",
          },
        },
        {
          narration: {
            en:
              "2.  const ch  declares a NEW variable.\nIt holds the current letter.\nThe name 'ch' is just a label — you can call it anything.",
            sv:
              "2.  const ch  skapar en NY variabel.\nDen håller den nuvarande bokstaven.\nNamnet 'ch' är bara en etikett — du kan kalla den vad du vill.",
          },
        },
        {
          narration: {
            en:
              "3.  of  is a special keyword.\nRead 'for each ch OF the string'.\nIt's not =  it's not in — it's of.",
            sv:
              "3.  of  är ett speciellt nyckelord.\nLäs 'for varje ch OF strängen'.\nDet är inte =  inte in — det är of.",
          },
        },
        {
          narration: {
            en:
              "4.  the string  on the right is what we walk through.\nIt can be a literal like \"HELLO\" or a variable.",
            sv:
              "4.  strängen  till höger är vad vi går igenom.\nDet kan vara en literal som \"HELLO\" eller en variabel.",
          },
        },
        {
          narration: {
            en:
              "5.  { body }  runs once per letter.\nInside the body, ch is the current letter.\nNext lap, ch becomes the next letter automatically.",
            sv:
              "5.  { kropp }  körs en gång per bokstav.\nInne i kroppen är ch den nuvarande bokstaven.\nNästa varv blir ch automatiskt nästa bokstav.",
          },
        },
        {
          narration: {
            en:
              "When there are no more letters, the loop ends.\nNo condition to write, no counter to update.",
            sv:
              "När det inte finns fler bokstäver slutar loopen.\nInget villkor att skriva, ingen räknare att uppdatera.",
          },
        },
      ],
    },

    // 4. Trace walkthrough — count "A"s in "ABA"
    {
      kind: "explanation",
      title: { en: "Watching for…of run", sv: "Vi ser for…of köras" },
      intro: {
        en:
          'Trace example: count how many A\'s are in "ABA".',
        sv:
          'Trace-exempel: räkna hur många A som finns i "ABA".',
      },
      customScene: "letters-trace",
      demo: [],
      steps: [
        {
          narration: {
            en:
              "Code on the left, the word ABA on the right.\nClick to step.",
            sv:
              "Kod till vänster, ordet ABA till höger.\nKlicka för att stega.",
          },
        },
        {
          narration: {
            en: "First we make count = 0.",
            sv: "Först gör vi count = 0.",
          },
        },
        {
          narration: {
            en:
              'Lap 1. for…of hands us the first letter.\nch = "A".',
            sv:
              'Varv 1. for…of räcker oss första bokstaven.\nch = "A".',
          },
        },
        {
          narration: {
            en:
              'The if asks: is ch === "A"?\n"A" === "A" → true.',
            sv:
              'if frågar: är ch === "A"?\n"A" === "A" → true.',
          },
        },
        {
          narration: {
            en: "Body runs. count = 0 + 1 → 1.",
            sv: "Kroppen körs. count = 0 + 1 → 1.",
          },
        },
        {
          narration: {
            en:
              'Lap 2. Next letter.\nch = "B".',
            sv:
              'Varv 2. Nästa bokstav.\nch = "B".',
          },
        },
        {
          narration: {
            en:
              '"B" === "A" → false.\nThe if body is skipped. count stays 1.',
            sv:
              '"B" === "A" → false.\nIf-kroppen hoppas över. count stannar på 1.',
          },
        },
        {
          narration: {
            en:
              'Lap 3. Last letter.\nch = "A".',
            sv:
              'Varv 3. Sista bokstaven.\nch = "A".',
          },
        },
        {
          narration: {
            en: '"A" === "A" → true.',
            sv: '"A" === "A" → true.',
          },
        },
        {
          narration: {
            en: "Body runs. count = 1 + 1 → 2.",
            sv: "Kroppen körs. count = 1 + 1 → 2.",
          },
        },
        {
          narration: {
            en:
              "No more letters. The loop ends.\nWe move past the closing }.",
            sv:
              "Inga fler bokstäver. Loopen slutar.\nVi går förbi avslutande }.",
          },
        },
        {
          narration: {
            en:
              "return count → 2.\n\nThree letters, two of them A. The loop counted them.",
            sv:
              "return count → 2.\n\nTre bokstäver, två av dem A. Loopen räknade dem.",
          },
        },
      ],
    },

    // 5. for vs for...of
    {
      kind: "explanation",
      title: { en: "for vs for…of", sv: "for mot for…of" },
      intro: {
        en:
          "Two flavours of for. Pick based on what you actually need.",
        sv:
          "Två varianter av for. Välj baserat på vad du faktiskt behöver.",
      },
      demo: [
        {
          id: "classic",
          label:
            'for (let i = 0; i < 5; i++) {\n  // i is 0, 1, 2, 3, 4\n}',
          baseStyle: codePanelStyle,
        },
        {
          id: "of",
          label:
            'for (const ch of "HELLO") {\n  // ch is "H", "E", "L", "L", "O"\n}',
          baseStyle: { ...codePanelStyle, marginTop: 16 },
        },
        {
          id: "note",
          label: {
            en:
              "Use plain  for  when you need the COUNT or INDEX.\nUse  for…of  when you need each VALUE in turn.\n\nFor strings, for…of is almost always cleaner.",
            sv:
              "Använd vanligt  for  när du behöver ANTALET eller INDEXET.\nAnvänd  for…of  när du behöver varje VÄRDE i tur och ordning.\n\nFör strängar är for…of nästan alltid renare.",
          },
          baseStyle: { ...noteBoxStyle, marginTop: 16 },
        },
      ],
      steps: [
        {
          narration: {
            en:
              "Top: classic for. You get a number i.\nIf you wanted a letter, you'd have to write word[i] — extra step.",
            sv:
              "Överst: klassisk for. Du får ett tal i.\nVille du ha en bokstav fick du skriva word[i] — ett extra steg.",
          },
        },
        {
          narration: {
            en:
              "Bottom: for…of. You get the letter directly.\nNo counter, no indexing — just the value you want.",
            sv:
              "Nedre: for…of. Du får bokstaven direkt.\nIngen räknare, ingen indexering — bara värdet du vill ha.",
          },
        },
        {
          narration: {
            en:
              "Rule of thumb:\n• Need to count or know which position? → for\n• Just want each item? → for…of",
            sv:
              "Tumregel:\n• Behöver räkna eller veta position? → for\n• Vill bara ha varje sak? → for…of",
          },
        },
      ],
    },

    // 6. Practice — count occurrences of a letter — chip-style, no distractors (first chip in L6)
    {
      kind: "js-chip-assignment",
      title: {
        en: "Practice: count a letter",
        sv: "Övning: räkna en bokstav",
      },
      prompt: {
        en:
          "Build the for…of loop that counts how often `target` appears in `word`.",
        sv:
          "Bygg for…of-loopen som räknar hur ofta `target` finns i `word`.",
      },
      puzzles: [
        // p1: code A — for…of header pieces (the new piece this lesson)
        {
          prompt: {
            en: "Place the pieces of the for…of header.",
            sv: "Placera delarna i for…of-huvudet.",
          },
          template:
            "let count = 0;\nfor ([[]] [[]] [[]] [[]]) {\n  if (ch === target) {\n    count = count + 1;\n  }\n}\nreturn count;",
          chips: ["const", "ch", "of", "word"],
          solution: ["const", "ch", "of", "word"],
        },
        // p2: code A — full assembly
        {
          prompt: {
            en: "Put it all together.",
            sv: "Sätt ihop hela.",
          },
          template:
            "let count = 0;\nfor ([[]] [[]] [[]] [[]]) {\n  if ([[]] [[]] [[]]) {\n    count = count + 1;\n  }\n}\nreturn count;",
          chips: ["const", "ch", "of", "word", "ch", "===", "target"],
          solution: ["const", "ch", "of", "word", "ch", "===", "target"],
        },
        // p3: code B (phrase/vowel, loop var renamed to letter) — for…of header pieces
        {
          prompt: {
            en: "Place the pieces of the for…of header.",
            sv: "Placera delarna i for…of-huvudet.",
          },
          template:
            "let count = 0;\nfor ([[]] [[]] [[]] [[]]) {\n  if (letter === vowel) {\n    count = count + 1;\n  }\n}\nreturn count;",
          chips: ["const", "letter", "of", "phrase"],
          solution: ["const", "letter", "of", "phrase"],
        },
        // p4: code B — full assembly
        {
          prompt: {
            en: "Put it all together.",
            sv: "Sätt ihop hela.",
          },
          template:
            "let count = 0;\nfor ([[]] [[]] [[]] [[]]) {\n  if ([[]] [[]] [[]]) {\n    count = count + 1;\n  }\n}\nreturn count;",
          chips: ["const", "letter", "of", "phrase", "letter", "===", "vowel"],
          solution: ["const", "letter", "of", "phrase", "letter", "===", "vowel"],
        },
      ],
      legend: [
        {
          name: { en: "for…of", sv: "for…of" },
          syntax: "for (const x of string) { ... }",
          example: 'for (const ch of "abc") { ... }',
          note: {
            en: "Hands you each character of the string in turn.",
            sv: "Räcker dig varje tecken i strängen i tur och ordning.",
          },
        },
      ],
    },

    // 7. Practice — count two letters at once — chip-style with distractors
    {
      kind: "js-chip-assignment",
      title: { en: "Practice: count a or e", sv: "Övning: räkna a eller e" },
      prompt: {
        en:
          "Count letters that are 'a' OR 'e'. Combine two checks with ||.",
        sv:
          "Räkna bokstäver som är 'a' ELLER 'e'. Kombinera två kontroller med ||.",
      },
      puzzles: [
        // p1: code A — pick the operator
        {
          prompt: {
            en: "Which operator means 'one match is enough'?",
            sv: "Vilken operator betyder 'en matchning räcker'?",
          },
          template:
            'let count = 0;\nfor (const ch of word) {\n  if (ch === "a" [[]] ch === "e") {\n    count = count + 1;\n  }\n}\nreturn count;',
          chips: ["||", "&&", "==="],
          solution: ["||"],
        },
        // p2: code A — full assembly of condition
        {
          prompt: {
            en: "Build the whole condition.",
            sv: "Bygg hela villkoret.",
          },
          template:
            'let count = 0;\nfor (const ch of word) {\n  if ([[]] [[]] [[]] [[]] [[]] [[]] [[]]) {\n    count = count + 1;\n  }\n}\nreturn count;',
          chips: ["ch", "===", '"a"', "||", "ch", "===", '"e"', "&&"],
          solution: ["ch", "===", '"a"', "||", "ch", "===", '"e"'],
        },
        // p3: code B (text, "r" or "n") — pick the operator
        {
          prompt: {
            en: "Which operator means 'one match is enough'?",
            sv: "Vilken operator betyder 'en matchning räcker'?",
          },
          template:
            'let count = 0;\nfor (const ch of text) {\n  if (ch === "r" [[]] ch === "n") {\n    count = count + 1;\n  }\n}\nreturn count;',
          chips: ["||", "&&", "==="],
          solution: ["||"],
        },
        // p4: code B — full assembly of condition
        {
          prompt: {
            en: "Build the whole condition.",
            sv: "Bygg hela villkoret.",
          },
          template:
            'let count = 0;\nfor (const ch of text) {\n  if ([[]] [[]] [[]] [[]] [[]] [[]] [[]]) {\n    count = count + 1;\n  }\n}\nreturn count;',
          chips: ["ch", "===", '"r"', "||", "ch", "===", '"n"', "&&"],
          solution: ["ch", "===", '"r"', "||", "ch", "===", '"n"'],
        },
      ],
      legend: [
        {
          name: { en: "||", sv: "||" },
          syntax: "a || b",
          example: 'ch === "a" || ch === "e"',
          note: {
            en: "True as soon as ONE side is true.",
            sv: "Sant så snart EN sida är sann.",
          },
        },
      ],
    },

    // 8. Final — write the whole for…of line yourself (typed-input)
    {
      kind: "js-typed-assignment",
      title: { en: "Final: write the for…of", sv: "Slutövning: skriv for…of-raden" },
      prompt: {
        en:
          "Type the for…of line yourself.\nThe body just adds 1 to count for every letter,\nso the function should return the length of `word`.\n\nFor \"hello\" the answer is 5. For \"\" the answer is 0.",
        sv:
          "Skriv for…of-raden själv.\nKroppen lägger bara till 1 till count för varje bokstav,\nså funktionen ska returnera längden på `word`.\n\nFör \"hello\" är svaret 5. För \"\" är svaret 0.",
      },
      varNames: ["word"],
      template:
        "let count = 0;\n[[input:loop]] {\n  count = count + 1;\n}\nreturn count;\n",
      tests: [
        { label: { en: "abc", sv: "abc" }, vars: { word: "abc" }, expected: 3 },
        { label: { en: "hello", sv: "hello" }, vars: { word: "hello" }, expected: 5 },
        { label: { en: "a", sv: "a" }, vars: { word: "a" }, expected: 1 },
        { label: { en: "empty", sv: "tom" }, vars: { word: "" }, expected: 0 },
        { label: { en: "banana", sv: "banana" }, vars: { word: "banana" }, expected: 6 },
      ],
      goalHint: {
        en:
          'The box is the whole loop header:  for (const ch of word)',
        sv:
          'Rutan är hela loop-raden:  for (const ch of word)',
      },
      allegory: {
        kind: "loop-result",
        config: {
          inputKeys: ["word"],
          resultLabel: { en: "length", sv: "längd" },
          theme: "letters",
        },
      },
      legend: [
        {
          name: { en: "for…of", sv: "for…of" },
          syntax: "for (const x of string) { ... }",
          example: "for (const ch of word) { ... }",
          note: {
            en: "Hands you each character of the string, one at a time, until it ends.",
            sv: "Räcker dig varje tecken i strängen, en i taget, tills det är slut.",
          },
        },
      ],
    },
  ],
};
