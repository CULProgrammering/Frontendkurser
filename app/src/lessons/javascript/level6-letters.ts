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
          tokenHighlight: ["for"],
        },
        {
          narration: {
            en:
              "2.  const ch  declares a NEW variable.\nIt holds the current letter.\nThe name 'ch' is just a label — you can call it anything.",
            sv:
              "2.  const ch  skapar en NY variabel.\nDen håller den nuvarande bokstaven.\nNamnet 'ch' är bara en etikett — du kan kalla den vad du vill.",
          },
          tokenHighlight: ["const ch"],
        },
        {
          narration: {
            en:
              "3.  of  is a special keyword.\nRead 'for each ch OF the string'.\nIt's not =  it's not in — it's of.",
            sv:
              "3.  of  är ett speciellt nyckelord.\nLäs 'for varje ch OF strängen'.\nDet är inte =  inte in — det är of.",
          },
          tokenHighlight: [" of "],
        },
        {
          narration: {
            en:
              "4.  the string  on the right is what we walk through.\nIt can be a literal like \"HELLO\" or a variable.",
            sv:
              "4.  strängen  till höger är vad vi går igenom.\nDet kan vara en literal som \"HELLO\" eller en variabel.",
          },
          tokenHighlight: ['"HELLO"'],
        },
        {
          narration: {
            en:
              "5.  { body }  runs once per letter.\nInside the body, ch is the current letter.\nNext lap, ch becomes the next letter automatically.",
            sv:
              "5.  { kropp }  körs en gång per bokstav.\nInne i kroppen är ch den nuvarande bokstaven.\nNästa varv blir ch automatiskt nästa bokstav.",
          },
          tokenHighlight: ["{", "}"],
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
          kind: "note",
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
              "Left: classic for. You get a number i.\nIf you wanted a letter, you'd have to write word[i] — extra step.",
            sv:
              "Vänster: klassisk for. Du får ett tal i.\nVille du ha en bokstav fick du skriva word[i] — ett extra steg.",
          },
          tokenHighlight: ["let i = 0"],
        },
        {
          narration: {
            en:
              "Right: for…of. You get the letter directly.\nNo counter, no indexing — just the value you want.",
            sv:
              "Höger: for…of. Du får bokstaven direkt.\nIngen räknare, ingen indexering — bara värdet du vill ha.",
          },
          tokenHighlight: ["const ch of"],
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
        // p1: of keyword (vs in/from/===)
        {
          prompt: {
            en: "Which keyword walks through each character of a string?",
            sv: "Vilket nyckelord går igenom varje tecken i en sträng?",
          },
          template:
            "let count = 0;\nfor (const ch [[]] word) {\n  if (ch === target) count = count + 1;\n}\nreturn count;",
          chips: ["of", "in", "from", "==="],
          solution: ["of"],
        },
        // p2: ( ) around the for…of header
        {
          prompt: {
            en: "What wraps the for…of header?",
            sv: "Vad omger for…of-huvudet?",
          },
          template:
            "let count = 0;\nfor [[]]const ch of word[[]] {\n  if (ch === target) count = count + 1;\n}\nreturn count;",
          chips: ["(", ")", "{", "}"],
          solution: ["(", ")"],
        },
        // p3: { } around the loop body
        {
          prompt: {
            en: "What wraps the loop body?",
            sv: "Vad omger loop-kroppen?",
          },
          template:
            "let count = 0;\nfor (const ch of word) [[]]\n  if (ch === target) count = count + 1;\n[[]]\nreturn count;",
          chips: ["{", "}", "(", ")"],
          solution: ["{", "}"],
        },
        // p4: of keyword (phrase/vowel scenario)
        {
          intro: {
            en: "Same idea — count how often `vowel` appears in `phrase`.",
            sv: "Samma idé — räkna hur ofta `vowel` finns i `phrase`.",
          },
          prompt: {
            en: "Which keyword walks through each character of a string?",
            sv: "Vilket nyckelord går igenom varje tecken i en sträng?",
          },
          template:
            "let count = 0;\nfor (const letter [[]] phrase) {\n  if (letter === vowel) count = count + 1;\n}\nreturn count;",
          chips: ["of", "in", "from", "for"],
          solution: ["of"],
        },
        // p5: synthesis — all syntax pieces together
        {
          prompt: {
            en: "Now place all the syntax pieces you've practised.",
            sv: "Placera nu alla syntaxdelar du övat på.",
          },
          template:
            "let count = 0;\nfor [[]]const ch [[]] word[[]] [[]]\n  if (ch === target) count = count + 1;\n[[]]\nreturn count;",
          chips: ["(", "of", ")", "{", "}", "in", "from"],
          solution: ["(", "of", ")", "{", "}"],
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
        // p1: || operator inside if (vs &&, ===, !)
        {
          prompt: {
            en: "Which operator means 'one match is enough'?",
            sv: "Vilken operator betyder 'en matchning räcker'?",
          },
          template:
            'let count = 0;\nfor (const ch of word) {\n  if (ch === "a" [[]] ch === "e") {\n    count = count + 1;\n  }\n}\nreturn count;',
          chips: ["||", "&&", "===", "!"],
          solution: ["||"],
        },
        // p2: ( ) around the if condition
        {
          prompt: {
            en: "What wraps the if condition?",
            sv: "Vad omger if-villkoret?",
          },
          template:
            'let count = 0;\nfor (const ch of word) {\n  if [[]]ch === "a" || ch === "e"[[]] {\n    count = count + 1;\n  }\n}\nreturn count;',
          chips: ["(", ")", "{", "}"],
          solution: ["(", ")"],
        },
        // p3: { } around the if body
        {
          prompt: {
            en: "What wraps the if body?",
            sv: "Vad omger if-kroppen?",
          },
          template:
            'let count = 0;\nfor (const ch of word) {\n  if (ch === "a" || ch === "e") [[]]\n    count = count + 1;\n  [[]]\n}\nreturn count;',
          chips: ["{", "}", "(", ")"],
          solution: ["{", "}"],
        },
        // p4: || operator (r or n scenario)
        {
          intro: {
            en: "Same shape — count 'r' OR 'n'.",
            sv: "Samma form — räkna 'r' ELLER 'n'.",
          },
          prompt: {
            en: "Which operator means 'one match is enough'?",
            sv: "Vilken operator betyder 'en matchning räcker'?",
          },
          template:
            'let count = 0;\nfor (const ch of text) {\n  if (ch === "r" [[]] ch === "n") {\n    count = count + 1;\n  }\n}\nreturn count;',
          chips: ["||", "&&", "===", "!"],
          solution: ["||"],
        },
        // p5: synthesis — all syntax pieces together
        {
          prompt: {
            en: "Now place all the syntax pieces you've practised.",
            sv: "Placera nu alla syntaxdelar du övat på.",
          },
          template:
            'let count = 0;\nfor (const ch of word) {\n  if [[]]ch === "a" [[]] ch === "e"[[]] [[]]\n    count = count + 1;\n  [[]]\n}\nreturn count;',
          chips: ["(", "||", ")", "{", "}", "&&", "==="],
          solution: ["(", "||", ")", "{", "}"],
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

    // Workshop tier — guided micro-steps for for…of over a string.
    // Surface: count the length of a string by walking each character.
    // Distinct from chips (word/count vowels) and exercise (word/letter/found).
    {
      kind: "js-workshop",
      title: { en: "Workshop: count chars", sv: "Verkstad: räkna tecken" },
      prompt: {
        en:
          "Walk through a string with for…of and count each character into `len`.",
        sv:
          "Gå igenom en sträng med for…of och räkna varje tecken i `len`.",
      },
      designNote:
        "L6 for…of workshop. Surface: text → len (count by iteration). Distinct from chips (word/count vowels) and exercise (word/letter/found bool). The student demonstrates that for…of yields each char so that incrementing once per iteration gives string length.",
      steps: [
        {
          id: "len-declare-text",
          instruction: {
            en:
              "Use `let` to declare a variable called `text` and assign it any string.",
            sv:
              "Använd `let` för att deklarera en variabel som heter `text` och tilldela den en sträng.",
          },
          starterCode: {
            en: "// Declare text below.\n",
            sv: "// Deklarera text nedan.\n",
          },
          checks: [
            {
              message: {
                en: "Use `let` to declare a variable named `text`.",
                sv: "Använd `let` för att deklarera en variabel som heter `text`.",
              },
              requirePattern: /\blet\s+text\b/,
            },
            {
              message: {
                en: "`text` should hold a string.",
                sv: "`text` ska innehålla en sträng.",
              },
              assert: "return typeof text === 'string';",
            },
          ],
          reveal: {
            en: 'let text = "hello";\n',
            sv: 'let text = "hello";\n',
          },
        },
        {
          id: "len-declare-len",
          instruction: {
            en:
              "Below `text`, use `let` to declare `len` and start it at 0 — the loop will increment it.",
            sv:
              "Under `text`, använd `let` för att deklarera `len` och börja på 0 — loopen räknar upp.",
          },
          starterCode: {
            en: 'let text = "hello";\n// Declare len and start at 0.\n',
            sv: 'let text = "hello";\n// Deklarera len och börja på 0.\n',
          },
          checks: [
            {
              message: {
                en: "Use `let` to declare a variable named `len`.",
                sv: "Använd `let` för att deklarera en variabel som heter `len`.",
              },
              requirePattern: /\blet\s+len\b/,
            },
            {
              message: {
                en: "`len` should start at 0.",
                sv: "`len` ska börja på 0.",
              },
              assert: "return len === 0;",
            },
          ],
          reveal: {
            en: 'let text = "hello";\nlet len = 0;\n',
            sv: 'let text = "hello";\nlet len = 0;\n',
          },
        },
        {
          id: "len-for-of-header",
          instruction: {
            en:
              "Write a `for…of` header that walks each character of `text`. Name the loop variable `ch`. Leave the body empty for now.",
            sv:
              "Skriv en `for…of`-rubrik som går igenom varje tecken i `text`. Namnge loop-variabeln `ch`. Lämna kroppen tom tills vidare.",
          },
          starterCode: {
            en:
              'let text = "hello";\nlet len = 0;\n// Add the for…of header walking text. Empty body.\n',
            sv:
              'let text = "hello";\nlet len = 0;\n// Lägg till for…of-rubriken som går igenom text. Tom kropp.\n',
          },
          checks: [
            {
              message: {
                en: "Use `for ( ... of ... )` to iterate.",
                sv: "Använd `for ( ... of ... )` för att iterera.",
              },
              requirePattern: /\bfor\s*\(\s*let\s+\w+\s+of\s+text\b/,
            },
            {
              message: {
                en: "Name the loop variable `ch`.",
                sv: "Namnge loop-variabeln `ch`.",
              },
              requirePattern: /\bfor\s*\(\s*let\s+ch\s+of\b/,
            },
          ],
          reveal: {
            en:
              'let text = "hello";\nlet len = 0;\nfor (let ch of text) {\n}\n',
            sv:
              'let text = "hello";\nlet len = 0;\nfor (let ch of text) {\n}\n',
          },
        },
        {
          id: "len-loop-body",
          instruction: {
            en:
              "Inside the loop, increment `len` by 1 each round. After the loop, `len` should equal the number of characters in `text`.",
            sv:
              "Inne i loopen, räkna upp `len` med 1 varje varv. Efter loopen ska `len` vara antalet tecken i `text`.",
          },
          starterCode: {
            en:
              'let text = "hello";\nlet len = 0;\nfor (let ch of text) {\n  // Increment len here.\n}\n',
            sv:
              'let text = "hello";\nlet len = 0;\nfor (let ch of text) {\n  // Räkna upp len här.\n}\n',
          },
          checks: [
            {
              message: {
                en: "Increment `len` (e.g. `len++` or `len += 1`).",
                sv: "Räkna upp `len` (t.ex. `len++` eller `len += 1`).",
              },
              requirePattern: /\blen\s*\+\+|\blen\s*\+=\s*1\b|\blen\s*=\s*len\s*\+\s*1\b/,
            },
            {
              message: {
                en: "After the loop, `len` should equal the length of `text`.",
                sv: "Efter loopen ska `len` vara lika med längden på `text`.",
              },
              assert: "return len === text.length;",
            },
          ],
          reveal: {
            en:
              'let text = "hello";\nlet len = 0;\nfor (let ch of text) {\n  len++;\n}\n',
            sv:
              'let text = "hello";\nlet len = 0;\nfor (let ch of text) {\n  len++;\n}\n',
          },
        },
      ],
      legend: [
        {
          name: { en: "for…of", sv: "for…of" },
          syntax: "for (let ch of string) { ... }",
          example: "for (let ch of text) { ... }",
          note: {
            en: "Walks each character of the string in order.",
            sv: "Går igenom varje tecken i strängen i ordning.",
          },
        },
        {
          name: { en: "++", sv: "++" },
          syntax: "x++",
          example: "len++",
          note: {
            en: "Adds 1 to `x`. Same as `x = x + 1`.",
            sv: "Lägger till 1 till `x`. Samma som `x = x + 1`.",
          },
        },
      ],
    },

    // L6 final lab — letter search. Walks the string with for...of looking for
    // a chosen single character; produces a boolean result. Distinct from the
    // chapter's "count a or e" exercise (which counts characters).
    {
      kind: "exercise",
      title: { en: "Lab: Letter Search", sv: "Labb: Bokstavssök" },
      prompt: {
        en:
          "Check whether a word contains a chosen letter.\n\n" +
          "User stories (variable names are suggestions):\n" +
          "1. Declare a string (e.g. word) with at least 5 characters.\n" +
          "2. Declare a string (e.g. letter) with exactly one character.\n" +
          "3. Declare a boolean (e.g. found) and set it to false.\n" +
          "4. Use a for…of loop to walk through word.\n" +
          "5. Inside the loop, if the current character === letter, set found to true.\n" +
          "6. Print word, letter, and found (three lines, in that order).",
        sv:
          "Kontrollera om ett ord innehåller en vald bokstav.\n\n" +
          "Användarberättelser (variabelnamnen är förslag):\n" +
          "1. Deklarera en sträng (t.ex. word) med minst 5 tecken.\n" +
          "2. Deklarera en sträng (t.ex. letter) med exakt ett tecken.\n" +
          "3. Deklarera en boolean (t.ex. found) och sätt den till false.\n" +
          "4. Använd en for…of-loop som går igenom word.\n" +
          "5. Inuti loopen, om nuvarande tecken === letter, sätt found till true.\n" +
          "6. Skriv ut word, letter och found (tre rader, i den ordningen).",
      },
      starterJs:
        "// Follow the user stories shown to the left.\n\n" +
        "// 1-3. Declare word, letter, found:\n\n\n\n" +
        "// 4-5. for...of loop that flips found if it sees letter:\n\n\n\n" +
        "// 6. Print word, letter, found:\n\n",
      tests: [
        {
          label: {
            en: "Console shows exactly three lines",
            sv: "Konsolen visar exakt tre rader",
          },
          assert:
            "var c = window.__console || []; return c.length === 3;",
          hint: {
            en: "One console.log for word, one for letter, one for found.",
            sv: "En console.log för word, en för letter, en för found.",
          },
        },
        {
          label: {
            en: "Each variable you print is one you declared",
            sv: "Varje variabel du skriver ut är en du deklarerat",
          },
          assert:
            "var src = window.__userSrc || '';" +
            "var logs = []; var re = /console\\.log\\s*\\(\\s*([A-Za-z_$][A-Za-z0-9_$]*)\\s*\\)/g;" +
            "var m; while ((m = re.exec(src)) !== null) logs.push(m[1]);" +
            "if (logs.length === 0) return false;" +
            "for (var i = 0; i < logs.length; i++) {" +
            "  var name = logs[i];" +
            "  var d = new RegExp('(?:let|const|var|function)\\\\s+' + name + '\\\\b');" +
            "  if (!d.test(src)) return false;" +
            "}" +
            "return true;",
          hint: {
            en:
              "If a console.log line shows nothing or the wrong value, double-check the variable name — it must match what you declared with let.",
            sv:
              "Om en console.log-rad är tom eller fel, dubbelkolla variabelnamnet — det måste matcha det du deklarerade med let.",
          },
        },
        {
          label: {
            en: "Line 1 is a string with at least 5 characters",
            sv: "Rad 1 är en sträng med minst 5 tecken",
          },
          assert:
            "var c = window.__console || [];" +
            "if (c.length < 1) return false;" +
            "return typeof c[0].text === 'string' && c[0].text.length >= 5;",
          hint: {
            en: "Pick a longer word — at least 5 letters.",
            sv: "Välj ett längre ord — minst 5 bokstäver.",
          },
        },
        {
          label: {
            en: "Line 2 is exactly one character",
            sv: "Rad 2 är exakt ett tecken",
          },
          assert:
            "var c = window.__console || [];" +
            "if (c.length < 2) return false;" +
            "return c[1].text.length === 1;",
          hint: {
            en: "letter should be a single character, e.g. \"r\".",
            sv: "letter ska vara ett enda tecken, t.ex. \"r\".",
          },
        },
        {
          label: {
            en: 'Line 3 is "true" or "false"',
            sv: 'Rad 3 är "true" eller "false"',
          },
          assert:
            "var c = window.__console || [];" +
            "if (c.length < 3) return false;" +
            "return c[2].text === 'true' || c[2].text === 'false';",
          hint: {
            en: "found must be a boolean (not a string).",
            sv: "found ska vara en boolean (inte en sträng).",
          },
        },
        {
          label: {
            en: "found correctly reports whether word contains letter",
            sv: "found rapporterar korrekt om word innehåller letter",
          },
          assert:
            "var c = window.__console || [];" +
            "if (c.length < 3) return false;" +
            "var word = c[0].text;" +
            "var letter = c[1].text;" +
            "var actual = c[2].text === 'true';" +
            "var expected = word.indexOf(letter) !== -1;" +
            "return actual === expected;",
          hint: {
            en: "Inside the loop: if (ch === letter) { found = true; }",
            sv: "I loopen: if (ch === letter) { found = true; }",
          },
        },
        {
          label: {
            en: "Code uses for…of",
            sv: "Koden använder for…of",
          },
          assert:
            "var src = window.__userSrc || '';" +
            "return /\\bfor\\s*\\(\\s*(?:let|const|var)\\s+\\w+\\s+of\\b/.test(src);",
          hint: {
            en: "Use the form: for (let ch of word) { ... }",
            sv: "Använd formen: for (let ch of word) { ... }",
          },
        },
      ],
    },
  ],
};
