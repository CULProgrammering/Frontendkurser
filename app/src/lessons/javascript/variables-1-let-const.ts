import type { Lesson } from "../../types";
import { codePanelStyle, noteBoxStyle } from "./_shared";

export const letConstLesson: Lesson = {
  id: "variables-let-const",
  title: { en: "1. let and const — names for values", sv: "1. let och const — namn för värden" },
  summary: {
    en: "Give a value a name so you can use it later.",
    sv: "Ge ett värde ett namn så du kan använda det senare.",
  },
  slides: [
    // 1. Intro — what's a variable?
    {
      kind: "explanation",
      title: { en: "A name for a value", sv: "Ett namn för ett värde" },
      intro: {
        en:
          "Code becomes much easier to read when values have names.\nA variable is a name pointing at a value.",
        sv:
          "Kod blir mycket lättare att läsa när värden har namn.\nEn variabel är ett namn som pekar på ett värde.",
      },
      demo: [
        {
          id: "code",
          label:
            'let score = 0;\nconst pi = 3.14;\nlet name = "Alice";',
          baseStyle: codePanelStyle,
        },
        {
          id: "note",
          kind: "note",
          label: {
            en:
              "Three variables, three values.\nA name on the left,\nan equals sign,\na value on the right.",
            sv:
              "Tre variabler, tre värden.\nEtt namn till vänster,\nett likhetstecken,\nett värde till höger.",
          },
          baseStyle: { ...noteBoxStyle, marginTop: 16 },
        },
      ],
      steps: [
        {
          narration: {
            en:
              "Imagine you have a sticky note labelled `score`.\nThe label is the name. The note holds the value.",
            sv:
              "Föreställ dig en post-it-lapp med etiketten `score`.\nEtiketten är namnet. Lappen håller värdet.",
          },
        },
        {
          narration: {
            en:
              "We use two keywords to make a variable:\n• `let` — when the value MAY change later.\n• `const` — when the value WILL NOT change.",
            sv:
              "Vi använder två nyckelord för att skapa en variabel:\n• `let` — när värdet KAN ändras senare.\n• `const` — när värdet INTE ska ändras.",
          },
          tokenHighlight: ["let", "const"],
        },
      ],
    },

    // 2. Naming — rules vs convention (camelCase)
    {
      kind: "explanation",
      title: { en: "Naming variables", sv: "Namnge variabler" },
      intro: {
        en:
          "There are a few real rules for variable names — and one strong convention.\nKnowing the difference matters: rules cause errors, conventions just make code easier to read.",
        sv:
          "Det finns några riktiga regler för variabelnamn — och en stark konvention.\nSkillnaden är viktig: regler ger fel, konventioner gör koden lättare att läsa.",
      },
      demo: [
        {
          id: "rules",
          label:
            "// ✓ valid names\nlet score;\nlet $price;\nlet _hidden;\nlet user2;\n\n// ✗ won't run — rules broken\nlet 1stPlace;   // can't start with a digit\nlet user-name;  // no dashes\nlet first name; // no spaces",
          baseStyle: codePanelStyle,
        },
        {
          id: "convention",
          label:
            "// CONVENTION — all of these RUN, but only one\n// is the JavaScript norm.\n\nlet userName    = \"Alice\";  // ✓ camelCase — convention\nlet user_name   = \"Alice\";  // ✗ snake_case — not JS style\nlet UserName    = \"Alice\";  // ✗ PascalCase — reserved for classes\nlet username    = \"Alice\";  // — works, but harder to read",
          baseStyle: { ...codePanelStyle, marginTop: 16 },
        },
        {
          id: "tip",
          kind: "note",
          label: {
            en:
              "Rule of thumb:\n• Rules → JS errors out.\n• Conventions → JS is fine,\n  but other developers expect them.\n\nFollow camelCase so people\nreading your code don't trip.",
            sv:
              "Tumregel:\n• Regler → JS ger fel.\n• Konventioner → JS bryr sig inte,\n  men andra utvecklare förväntar sig dem.\n\nFölj camelCase så andra som läser\ndin kod inte snubblar.",
          },
          baseStyle: { ...noteBoxStyle, marginTop: 16 },
        },
      ],
      steps: [
        {
          narration: {
            en:
              "The real rules (break these and JS gives an error):\n• Start with a letter, `$`, or `_` — never a digit.\n• No spaces, dashes, or other punctuation.\n• Don't reuse a reserved word like `let`, `const`, or `if`.",
            sv:
              "De riktiga reglerna (bryt dem så ger JS ett fel):\n• Börja med en bokstav, `$` eller `_` — aldrig en siffra.\n• Inga mellanslag, bindestreck eller annan skiljetecken.\n• Återanvänd inte ett reserverat ord som `let`, `const` eller `if`.",
          },
        },
        {
          narration: {
            en:
              "Now the CONVENTION — not a rule.\nFor multi-word names, JavaScript developers write camelCase:\nfirst word lowercase, every following word capitalised.\n\n  userName  ✓ camelCase\n  user_name — snake_case, common in Python — not JS\n  UserName  — PascalCase, reserved for classes\n  username  — works, but harder to read past two words",
            sv:
              "Nu KONVENTIONEN — inte en regel.\nFör flerordsnamn skriver JavaScript-utvecklare camelCase:\nförsta ordet med små bokstäver, varje följande ord stor bokstav.\n\n  userName  ✓ camelCase\n  user_name — snake_case, vanligt i Python — inte JS\n  UserName  — PascalCase, reserverat för klasser\n  username  — fungerar, men är svårt att läsa förbi två ord",
          },
          tokenHighlight: ["userName"],
        },
        {
          narration: {
            en:
              "Important: all four lines below the rules ABOVE will run.\nJavaScript doesn't enforce camelCase. The convention exists so people reading your code know what to expect.\n\nFollowing it is a courtesy to your future self and your teammates.",
            sv:
              "Viktigt: alla fyra raderna under reglerna OVAN kör.\nJavaScript tvingar inte fram camelCase. Konventionen finns för att de som läser din kod ska veta vad de kan förvänta sig.\n\nAtt följa den är artighet mot ditt framtida jag och dina kollegor.",
          },
        },
        {
          narration: {
            en:
              "And finally — pick a name that says what's INSIDE the variable.\n`x` and `tmp` work but tell the reader nothing.\n`userAge`, `totalPrice`, `isLoggedIn` tell a story.\n\nA good name lets you understand the code without having to follow the value.",
            sv:
              "Och till sist — välj ett namn som säger vad som finns I variabeln.\n`x` och `tmp` fungerar men berättar inget.\n`userAge`, `totalPrice`, `isLoggedIn` berättar en historia.\n\nEtt bra namn låter dig förstå koden utan att behöva följa värdet.",
          },
        },
      ],
    },

    // 3. let — declaration + reassignment
    {
      kind: "explanation",
      title: { en: "let — a value that can change", sv: "let — ett värde som kan ändras" },
      intro: {
        en:
          "`let` declares a variable whose value you can replace later.\nThink of a sticky note: peel it off, write a new value, stick it back.",
        sv:
          "`let` deklarerar en variabel vars värde du kan byta ut senare.\nTänk på en post-it-lapp: dra av, skriv nytt värde, sätt tillbaka.",
      },
      demo: [
        {
          id: "code",
          label:
            'let city = "Stockholm";\nconsole.log(city);  // "Stockholm"\n\ncity = "Gothenburg";\nconsole.log(city);  // "Gothenburg"',
          baseStyle: codePanelStyle,
        },
      ],
      steps: [
        {
          narration: {
            en:
              "First line: declare `city` with `let` and give it the value `\"Stockholm\"`.",
            sv:
              "Första raden: deklarera `city` med `let` och ge den värdet `\"Stockholm\"`.",
          },
          tokenHighlight: ["let", "city"],
        },
        {
          narration: {
            en:
              "Logging `city` prints \"Stockholm\".\nThe variable still points at that value.",
            sv:
              "Logga `city` skriver ut \"Stockholm\".\nVariabeln pekar fortfarande på det värdet.",
          },
          tokenHighlight: ['"Stockholm"'],
        },
        {
          narration: {
            en:
              "Now reassign — note: NO `let` on the second line.\n`let` is for declaring; reassigning just uses `=` with the existing name.",
            sv:
              "Nu omtilldela — observera: INGET `let` på den andra raden.\n`let` är för att deklarera; omtilldelning använder bara `=` med det befintliga namnet.",
          },
          tokenHighlight: ['city = "Gothenburg"'],
        },
        {
          narration: {
            en:
              "Logging `city` again now prints \"Gothenburg\".\nSame name, different value.",
            sv:
              "Att logga `city` igen skriver nu \"Gothenburg\".\nSamma namn, annat värde.",
          },
          tokenHighlight: ['"Gothenburg"'],
        },
      ],
    },

    // 4. const — declaration only
    {
      kind: "explanation",
      title: { en: "const — a value that stays put", sv: "const — ett värde som inte ändras" },
      intro: {
        en:
          "`const` declares a variable that CANNOT be reassigned.\nThe label is glued on — you can't peel it off.",
        sv:
          "`const` deklarerar en variabel som INTE kan omtilldelas.\nEtiketten är fastlimmad — du kan inte dra av den.",
      },
      demo: [
        {
          id: "code",
          label:
            'const pi = 3.14;\nconsole.log(pi);  // 3.14\n\npi = 4;\n// TypeError: Assignment to constant variable.',
          baseStyle: codePanelStyle,
        },
        {
          id: "note",
          kind: "note",
          label: {
            en:
              "Rule of thumb:\nuse `const` by default.\nSwitch to `let` only when you actually need to reassign.",
            sv:
              "Tumregel:\nanvänd `const` som standard.\nByt till `let` bara när du verkligen behöver omtilldela.",
          },
          baseStyle: { ...noteBoxStyle, marginTop: 16 },
        },
      ],
      steps: [
        {
          narration: {
            en:
              "Declare `pi` with `const`. We give it a value once — that's it.",
            sv:
              "Deklarera `pi` med `const`. Vi ger den ett värde en gång — det är det.",
          },
          tokenHighlight: ["const", "pi"],
        },
        {
          narration: {
            en:
              "Trying to reassign throws a TypeError.\nJavaScript stops the program right here.",
            sv:
              "Att försöka omtilldela ger ett TypeError.\nJavaScript stoppar programmet direkt.",
          },
          tokenHighlight: ["pi = 4"],
        },
        {
          narration: {
            en:
              "Why bother? It tells the reader (and your future self):\n'this value is locked — don't worry about it changing'.",
            sv:
              "Varför då? Det säger till läsaren (och ditt framtida jag):\n'det här värdet är låst — oroa dig inte för att det ändras'.",
          },
        },
      ],
    },

    // 5. Chip practice
    {
      kind: "js-chip-assignment",
      title: { en: "Practice: declare some variables", sv: "Övning: deklarera variabler" },
      prompt: {
        en:
          "Build the variable declarations piece by piece.\nWatch the keyword carefully — let or const?",
        sv:
          "Bygg variabeldeklarationerna bit för bit.\nKolla nyckelordet noga — let eller const?",
      },
      puzzles: [
        // p1: `let` keyword
        {
          prompt: {
            en: "Pick the keyword that declares a variable you can REASSIGN.",
            sv: "Välj nyckelordet för en variabel du kan OMTILLDELA.",
          },
          template: '[[]] score = 0;\nscore = 10;',
          chips: ["let", "const", "var", "name"],
          solution: ["let"],
        },
        // p2: `const` keyword
        {
          prompt: {
            en: "Pick the keyword that LOCKS the value.",
            sv: "Välj nyckelordet som LÅSER värdet.",
          },
          template: '[[]] pi = 3.14;',
          chips: ["const", "let", "var", "fixed"],
          solution: ["const"],
        },
        // p3: assignment operator
        {
          prompt: {
            en: "Which operator GIVES the variable its value?",
            sv: "Vilken operator GER variabeln sitt värde?",
          },
          template: 'let name [[]] "Alice";',
          chips: ["=", "==", "===", ":"],
          solution: ["="],
        },
        // p4: reassignment — no keyword
        {
          intro: {
            en: "Reassigning an existing variable — no keyword on the second line.",
            sv: "Omtilldelning av en befintlig variabel — inget nyckelord på andra raden.",
          },
          prompt: {
            en: "Fill in the missing piece — note there's no let/const here.",
            sv: "Fyll i den saknade biten — märk att det inte finns let/const här.",
          },
          template: 'let count = 0;\ncount [[]] 1;',
          chips: ["=", "let", "const", "+="],
          solution: ["="],
        },
        // p5: synthesis. Either declaration may use `let` or `const` —
        // semantically `city` and `country` are both fine to lock or leave
        // mutable in this teaching context, so we accept either keyword in
        // either declaration. The `=` slots remain position-strict.
        {
          prompt: {
            en: "Place all the pieces of two declarations.",
            sv: "Placera alla bitar i två deklarationer.",
          },
          template: '[[]] city [[]] "Stockholm";\n[[]] country [[]] "Sweden";',
          chips: ["let", "const", "=", "=", "==", "var"],
          solution: ["let", "=", "const", "="],
          alternatives: [["const", "=", "let", "="]],
        },
      ],
      legend: [
        {
          name: { en: "let", sv: "let" },
          syntax: "let name = value;",
          example: 'let city = "Stockholm";',
          note: {
            en: "Declares a variable whose value you can replace later.",
            sv: "Deklarerar en variabel vars värde du kan byta senare.",
          },
        },
        {
          name: { en: "const", sv: "const" },
          syntax: "const name = value;",
          example: "const pi = 3.14;",
          note: {
            en: "Declares a variable whose value cannot be reassigned.",
            sv: "Deklarerar en variabel vars värde inte kan omtilldelas.",
          },
        },
      ],
    },

    // 6. Workshop — 4 steps
    {
      kind: "js-workshop",
      title: { en: "Workshop: declare and reassign", sv: "Verkstad: deklarera och omtilldela" },
      prompt: {
        en:
          "Walk through the four steps to practise let, reassignment, const, and using both together.",
        sv:
          "Gå igenom de fyra stegen för att öva let, omtilldelning, const och att använda båda ihop.",
      },
      designNote:
        "Variables L1 workshop. Four steps: declare let, reassign let, declare const, combine in template literal. Surface: city/country travel theme. Distinct from chips (score/pi) and exercise (custom names).",
      steps: [
        {
          id: "let-declare-city",
          instruction: {
            en:
              "Use `let` to declare a variable called `city` and give it any string value. Then log it.",
            sv:
              "Använd `let` för att deklarera en variabel som heter `city` och ge den valfri sträng. Logga den sedan.",
          },
          hint: {
            en: 'let city = "Stockholm";\nconsole.log(city);',
            sv: 'let city = "Stockholm";\nconsole.log(city);',
          },
          starterCode: {
            en: "// Declare city and log it.\n",
            sv: "// Deklarera city och logga den.\n",
          },
          checks: [
            {
              message: {
                en: "Use `let` to declare a variable named `city`.",
                sv: "Använd `let` för att deklarera en variabel som heter `city`.",
              },
              requirePattern: /\blet\s+city\b/,
            },
            {
              message: {
                en: "`city` should hold a string.",
                sv: "`city` ska innehålla en sträng.",
              },
              assert: "return typeof city === 'string';",
            },
            {
              message: {
                en: "Log `city` with `console.log`.",
                sv: "Logga `city` med `console.log`.",
              },
              requirePattern: /console\.log\s*\(\s*city\s*\)/,
            },
          ],
          reveal: {
            en: 'let city = "Stockholm";\nconsole.log(city);\n',
            sv: 'let city = "Stockholm";\nconsole.log(city);\n',
          },
          flexibility: { values: true },
        },
        {
          id: "let-reassign-city",
          instruction: {
            en:
              "Reassign `city` to a different string. Note: no `let` on the second line — the variable already exists. Log it again.",
            sv:
              "Omtilldela `city` till en annan sträng. Obs: inget `let` på den andra raden — variabeln finns redan. Logga den igen.",
          },
          hint: {
            en: 'city = "Gothenburg";\nconsole.log(city);',
            sv: 'city = "Gothenburg";\nconsole.log(city);',
          },
          starterCode: {
            en:
              'let city = "Stockholm";\nconsole.log(city);\n// Reassign city to a different string and log it again.\n',
            sv:
              'let city = "Stockholm";\nconsole.log(city);\n// Omtilldela city till en annan sträng och logga den igen.\n',
          },
          checks: [
            {
              message: {
                en: "Reassign `city` to a string different from the initial value (no `let` on this line).",
                sv: "Omtilldela `city` till en sträng som skiljer sig från startvärdet (inget `let` på denna rad).",
              },
              requirePattern: /(^|\n)\s*city\s*=\s*["'][^"']*["']/,
              // Walk the source: find the initial `let city = "..."` literal,
              // then confirm there's a later `city = "..."` line where the
              // string differs. Stops the "reassign to the same value"
              // loophole the pattern alone would accept.
              assert:
                "var m = __source.match(/\\blet\\s+city\\s*=\\s*[\"']([^\"']*)[\"']/);" +
                "if (!m) return false;" +
                "var initial = m[1];" +
                "var re = /(?:^|\\n)\\s*city\\s*=\\s*[\"']([^\"']*)[\"']/g;" +
                "var f;" +
                "while ((f = re.exec(__source)) !== null) {" +
                "  if (f[1] !== initial) return true;" +
                "}" +
                "return false;",
            },
            {
              message: {
                en: "After your changes, `city` should still be a string.",
                sv: "Efter dina ändringar ska `city` fortfarande vara en sträng.",
              },
              assert: "return typeof city === 'string';",
            },
          ],
          reveal: {
            en:
              'let city = "Stockholm";\nconsole.log(city);\ncity = "Gothenburg";\nconsole.log(city);\n',
            sv:
              'let city = "Stockholm";\nconsole.log(city);\ncity = "Gothenburg";\nconsole.log(city);\n',
          },
          flexibility: { values: true },
        },
        {
          id: "const-declare-country",
          instruction: {
            en:
              "Below the existing code, declare a `const` called `country` and give it any country name. Log it.",
            sv:
              "Under den befintliga koden, deklarera en `const` som heter `country` och ge den valfritt land. Logga den.",
          },
          hint: {
            en: 'const country = "Sweden";\nconsole.log(country);',
            sv: 'const country = "Sweden";\nconsole.log(country);',
          },
          starterCode: {
            en:
              'let city = "Stockholm";\nconsole.log(city);\ncity = "Gothenburg";\nconsole.log(city);\n// Declare country with const and log it.\n',
            sv:
              'let city = "Stockholm";\nconsole.log(city);\ncity = "Gothenburg";\nconsole.log(city);\n// Deklarera country med const och logga den.\n',
          },
          checks: [
            {
              message: {
                en: "Use `const` to declare a variable named `country`.",
                sv: "Använd `const` för att deklarera en variabel som heter `country`.",
              },
              requirePattern: /\bconst\s+country\b/,
            },
            {
              message: {
                en: "`country` should hold a string.",
                sv: "`country` ska innehålla en sträng.",
              },
              assert: "return typeof country === 'string';",
            },
            {
              message: {
                en: "Log `country` with `console.log`.",
                sv: "Logga `country` med `console.log`.",
              },
              requirePattern: /console\.log\s*\(\s*country\s*\)/,
            },
          ],
          reveal: {
            en:
              'let city = "Stockholm";\nconsole.log(city);\ncity = "Gothenburg";\nconsole.log(city);\nconst country = "Sweden";\nconsole.log(country);\n',
            sv:
              'let city = "Stockholm";\nconsole.log(city);\ncity = "Gothenburg";\nconsole.log(city);\nconst country = "Sweden";\nconsole.log(country);\n',
          },
          flexibility: { values: true },
        },
        {
          id: "try-reassign-const",
          instruction: {
            en:
              "Now try something that's NOT allowed: reassign `country` to a different string. Press Check and watch the console — JavaScript throws a TypeError because `country` was declared with `const`. The error itself is the lesson.",
            sv:
              "Pröva nu något som INTE är tillåtet: omtilldela `country` till en annan sträng. Tryck Kontrollera och titta i konsolen — JavaScript kastar ett TypeError eftersom `country` deklarerades med `const`. Felet i sig är lärdomen.",
          },
          hint: {
            en: 'country = "Norway";',
            sv: 'country = "Norway";',
          },
          starterCode: {
            en:
              'let city = "Stockholm";\nconsole.log(city);\ncity = "Gothenburg";\nconsole.log(city);\nconst country = "Sweden";\nconsole.log(country);\n// Try reassigning country (this will throw a TypeError):\n',
            sv:
              'let city = "Stockholm";\nconsole.log(city);\ncity = "Gothenburg";\nconsole.log(city);\nconst country = "Sweden";\nconsole.log(country);\n// Försök omtilldela country (det här kastar ett TypeError):\n',
          },
          checks: [
            {
              message: {
                en: "Add a line that reassigns `country` to a string — `country = \"...\";`.",
                sv: "Lägg till en rad som omtilldelar `country` till en sträng — `country = \"...\";`.",
              },
              requirePattern: /(^|\n)\s*country\s*=\s*["'][^"']*["']/,
            },
          ],
          reveal: {
            en:
              'let city = "Stockholm";\nconsole.log(city);\ncity = "Gothenburg";\nconsole.log(city);\nconst country = "Sweden";\nconsole.log(country);\ncountry = "Norway";\n',
            sv:
              'let city = "Stockholm";\nconsole.log(city);\ncity = "Gothenburg";\nconsole.log(city);\nconst country = "Sweden";\nconsole.log(country);\ncountry = "Norway";\n',
          },
          flexibility: { values: true },
        },
      ],
      legend: [
        {
          name: { en: "let", sv: "let" },
          syntax: "let name = value;",
          example: 'let city = "Stockholm";',
          note: {
            en: "Declares a variable whose value you can replace later.",
            sv: "Deklarerar en variabel vars värde du kan byta senare.",
          },
        },
        {
          name: { en: "const", sv: "const" },
          syntax: "const name = value;",
          example: 'const country = "Sweden";',
          note: {
            en: "Declares a variable that stays at one value. Reassigning throws TypeError.",
            sv: "Deklarerar en variabel som stannar på ett värde. Omtilldelning kastar TypeError.",
          },
        },
      ],
    },

    // 7. Exercise — 4 assertions
    {
      kind: "exercise",
      title: { en: "Lab: introduce yourself", sv: "Labb: presentera dig" },
      prompt: {
        en:
          "Use let and const to write a tiny self-introduction.\n\n" +
          "User stories:\n" +
          "1. Declare a let called `age` with any number, then reassign it to a different number.\n" +
          "2. Declare a const called `name` with any non-empty string.\n" +
          "3. console.log a single sentence that includes both `name` and `age`.\n\n" +
          "There should be exactly one console.log line.",
        sv:
          "Använd let och const för att skriva en kort presentation.\n\n" +
          "Användarberättelser:\n" +
          "1. Deklarera en let som heter `age` med valfritt tal, omtilldela sedan till ett annat tal.\n" +
          "2. Deklarera en const som heter `name` med valfri icke-tom sträng.\n" +
          "3. console.log en mening som använder både `name` och `age`.\n\n" +
          "Det ska bli exakt en console.log-rad.",
      },
      starterJs:
        "// 1. Declare age with let, then reassign it (no second let):\n\n\n" +
        "// 2. Declare name with const:\n\n\n" +
        "// 3. console.log a sentence using both:\n\n",
      tests: [
        {
          label: {
            en: "Declares `age` with let exactly once and reassigns it",
            sv: "Deklarerar `age` med let exakt en gång och omtilldelar",
          },
          assert:
            "var src = window.__userSrc || '';" +
            "var lets = src.match(/\\blet\\s+age\\b/g) || [];" +
            "if (lets.length !== 1) return false;" +
            "var reassigns = src.match(/\\bage\\s*=(?!=)/g) || [];" +
            "if (reassigns.length < 2) return false;" +
            "return typeof age === 'number';",
          hint: {
            en: "One `let age = ...;` plus a separate `age = ...;` line.",
            sv: "Ett `let age = ...;` plus en separat `age = ...;`-rad.",
          },
        },
        {
          label: {
            en: "Declares `name` with const and a non-empty string",
            sv: "Deklarerar `name` med const och en icke-tom sträng",
          },
          assert:
            "var src = window.__userSrc || '';" +
            "if (!/\\bconst\\s+name\\s*=\\s*[\"'][^\"']+[\"']/.test(src)) return false;" +
            "return typeof name === 'string' && name.length > 0;",
          hint: {
            en: "Use `const name = \"YourName\";`.",
            sv: "Använd `const name = \"DittNamn\";`.",
          },
        },
        {
          label: {
            en: "Console shows exactly one line",
            sv: "Konsolen visar exakt en rad",
          },
          assert:
            "var c = window.__console || []; return c.length === 1;",
          hint: {
            en: "One single console.log call.",
            sv: "En enda console.log.",
          },
        },
        {
          label: {
            en: "The logged line includes both the name and the age",
            sv: "Den utskrivna raden innehåller både namnet och åldern",
          },
          assert:
            "var c = window.__console || [];" +
            "if (c.length !== 1) return false;" +
            "var t = c[0].text;" +
            "if (typeof name !== 'string' || typeof age !== 'number') return false;" +
            "if (t.indexOf(name) === -1) return false;" +
            "return t.indexOf(String(age)) !== -1;",
          hint: {
            en:
              "Build the sentence with the variables — e.g. `` `${name} is ${age} years old` `` (template literal) or `name + \" is \" + age + \" years old\"` (concat).",
            sv:
              "Bygg meningen med variablerna — t.ex. `` `${name} is ${age} years old` `` (template-literal) eller `name + \" is \" + age + \" years old\"` (konkatenering).",
          },
        },
      ],
      flexibility: { values: true },
    },

    // ──────────────────────────────────────────────────────────────────
    // Workshop 2 — Bank account (balance changes; account number is fixed)
    // ──────────────────────────────────────────────────────────────────
    {
      kind: "js-workshop",
      title: { en: "Workshop: bank account", sv: "Verkstad: bankkonto" },
      prompt: {
        en:
          "A balance changes over time; an account number does not. Pick the right keyword for each.",
        sv:
          "Ett saldo ändras över tid; ett kontonummer gör det inte. Välj rätt nyckelord för varje.",
      },
      designNote:
        "L1 W2. Same teaching arc as W1 (let-reassign, const, template). Surface: bank account — balance + accountNumber.",
      steps: [
        {
          id: "bank-declare-balance",
          instruction: {
            en:
              "Declare a `let` called `balance` with any starting amount. Log it.",
            sv:
              "Deklarera en `let` som heter `balance` med valfritt startbelopp. Logga den.",
          },
          hint: {
            en: "let balance = 1000;\nconsole.log(balance);",
            sv: "let balance = 1000;\nconsole.log(balance);",
          },
          starterCode: {
            en: "// Declare balance and log it.\n",
            sv: "// Deklarera balance och logga den.\n",
          },
          checks: [
            {
              message: {
                en: "Use `let` to declare `balance` with any number.",
                sv: "Använd `let` för att deklarera `balance` med valfritt tal.",
              },
              requirePattern: /\blet\s+balance\b/,
            },
            {
              message: {
                en: "`balance` should be a number.",
                sv: "`balance` ska vara ett tal.",
              },
              assert: "return typeof balance === 'number';",
            },
            {
              message: {
                en: "Log `balance`.",
                sv: "Logga `balance`.",
              },
              requirePattern: /console\.log\s*\(\s*balance\s*\)/,
            },
          ],
          reveal: {
            en: "let balance = 1000;\nconsole.log(balance);\n",
            sv: "let balance = 1000;\nconsole.log(balance);\n",
          },
          flexibility: { values: true },
        },
        {
          id: "bank-deposit",
          instruction: {
            en:
              "Reassign `balance` so it grows by a deposit. Use `+` to add a number to `balance` itself. Log the new value.",
            sv:
              "Omtilldela `balance` så den ökar med en insättning. Använd `+` för att lägga till ett tal till `balance` själv. Logga det nya värdet.",
          },
          hint: {
            en: "balance = balance + 250;\n// or: balance += 250;\nconsole.log(balance);",
            sv: "balance = balance + 250;\n// eller: balance += 250;\nconsole.log(balance);",
          },
          starterCode: {
            en:
              "let balance = 1000;\nconsole.log(balance);\n// Reassign balance after the deposit and log it.\n",
            sv:
              "let balance = 1000;\nconsole.log(balance);\n// Omtilldela balance efter insättningen och logga.\n",
          },
          checks: [
            {
              message: {
                en: "Grow `balance` by adding a deposit — use `balance = balance + N` or the shorthand `balance += N` (no `let` on this line).",
                sv: "Öka `balance` med en insättning — `balance = balance + N` eller den korta formen `balance += N` (inget `let` på denna rad).",
              },
              // Accept either the explicit `balance = balance + N` form or the
              // compound-assignment shorthand `balance += N`. Both are
              // semantically identical and idiomatic JS; rejecting the
              // shorthand would punish students who already know it.
              requirePattern: /(?:^|\n)\s*balance\s*(?:=\s*balance\s*\+|\+=)\s*\d/,
              // Source-walk the starter's `let balance = N` to capture the
              // initial number, then require the runtime value to be strictly
              // greater. Stops `balance += 0` / `balance = balance + 0` from
              // counting as a deposit.
              assert:
                "var m = __source.match(/\\blet\\s+balance\\s*=\\s*(-?\\d+(?:\\.\\d+)?)/);" +
                "if (!m) return false;" +
                "var initial = Number(m[1]);" +
                "return typeof balance === 'number' && balance > initial;",
            },
          ],
          reveal: {
            en:
              "let balance = 1000;\nconsole.log(balance);\nbalance = balance + 250;\nconsole.log(balance);\n",
            sv:
              "let balance = 1000;\nconsole.log(balance);\nbalance = balance + 250;\nconsole.log(balance);\n",
          },
          flexibility: { values: true },
        },
        {
          id: "bank-account-number",
          instruction: {
            en:
              "Declare a `const` called `accountNumber` and give it any account-style string. Log it. The account number never changes.",
            sv:
              "Deklarera en `const` som heter `accountNumber` och ge den valfri kontonummer-sträng. Logga den. Kontonumret ändras aldrig.",
          },
          hint: {
            en: 'const accountNumber = "SE-9981-2345";\nconsole.log(accountNumber);',
            sv: 'const accountNumber = "SE-9981-2345";\nconsole.log(accountNumber);',
          },
          starterCode: {
            en:
              "let balance = 1000;\nconsole.log(balance);\nbalance = balance + 250;\nconsole.log(balance);\n// Declare accountNumber with const and log it.\n",
            sv:
              "let balance = 1000;\nconsole.log(balance);\nbalance = balance + 250;\nconsole.log(balance);\n// Deklarera accountNumber med const och logga den.\n",
          },
          checks: [
            {
              message: {
                en: "Use `const` to declare `accountNumber`.",
                sv: "Använd `const` för att deklarera `accountNumber`.",
              },
              requirePattern: /\bconst\s+accountNumber\b/,
            },
            {
              message: {
                en: "`accountNumber` should be a non-empty string.",
                sv: "`accountNumber` ska vara en icke-tom sträng.",
              },
              assert: "return typeof accountNumber === 'string' && accountNumber.length > 0;",
            },
            {
              message: {
                en: "Log `accountNumber`.",
                sv: "Logga `accountNumber`.",
              },
              requirePattern: /console\.log\s*\(\s*accountNumber\s*\)/,
            },
          ],
          reveal: {
            en:
              "let balance = 1000;\nconsole.log(balance);\nbalance = balance + 250;\nconsole.log(balance);\nconst accountNumber = \"SE-9981-2345\";\nconsole.log(accountNumber);\n",
            sv:
              "let balance = 1000;\nconsole.log(balance);\nbalance = balance + 250;\nconsole.log(balance);\nconst accountNumber = \"SE-9981-2345\";\nconsole.log(accountNumber);\n",
          },
          flexibility: { values: true },
        },
        {
          id: "bank-summary",
          instruction: {
            en:
              "Build a summary line by joining strings with `+`. The `+` operator between strings glues them together — for example `\"Hello, \" + name` produces `\"Hello, Alice\"`. (Preview: this is called string concatenation, covered properly in the Strings chapter.)\n\nLog a single line that includes both `accountNumber` and `balance`, joined with `+`.",
            sv:
              "Bygg en sammanfattningsrad genom att slå ihop strängar med `+`. Operatorn `+` mellan strängar limmar ihop dem — t.ex. ger `\"Hej, \" + name` strängen `\"Hej, Alice\"`. (Förhandstitt: detta heter sträng-konkatenering och behandlas ordentligt i Strings-kapitlet.)\n\nLogga en enda rad som innehåller både `accountNumber` och `balance`, ihopsatta med `+`.",
          },
          starterCode: {
            en:
              "let balance = 1000;\nconsole.log(balance);\nbalance = balance + 250;\nconsole.log(balance);\nconst accountNumber = \"SE-9981-2345\";\nconsole.log(accountNumber);\n// Log a summary that joins strings with + (concatenation).\n",
            sv:
              "let balance = 1000;\nconsole.log(balance);\nbalance = balance + 250;\nconsole.log(balance);\nconst accountNumber = \"SE-9981-2345\";\nconsole.log(accountNumber);\n// Logga en sammanfattning som slår ihop strängar med + (konkatenering).\n",
          },
          checks: [
            {
              message: {
                en: "Log a single line that mentions both `accountNumber` and `balance`.",
                sv: "Logga en rad som innehåller både `accountNumber` och `balance`.",
              },
              requirePattern: /console\.log\s*\((?:[^)]*\baccountNumber\b[^)]*\bbalance\b|[^)]*\bbalance\b[^)]*\baccountNumber\b)[^)]*\)/,
            },
            {
              message: {
                en: "Use `+` inside that `console.log` to join the parts together.",
                sv: "Använd `+` inuti den `console.log` för att slå ihop delarna.",
              },
              requirePattern: /console\.log\s*\([^)]*\+[^)]*\)/,
            },
          ],
          reveal: {
            en:
              "let balance = 1000;\nconsole.log(balance);\nbalance = balance + 250;\nconsole.log(balance);\nconst accountNumber = \"SE-9981-2345\";\nconsole.log(accountNumber);\nconsole.log(\"Account \" + accountNumber + \" now holds \" + balance + \" kr\");\n",
            sv:
              "let balance = 1000;\nconsole.log(balance);\nbalance = balance + 250;\nconsole.log(balance);\nconst accountNumber = \"SE-9981-2345\";\nconsole.log(accountNumber);\nconsole.log(\"Account \" + accountNumber + \" now holds \" + balance + \" kr\");\n",
          },
          flexibility: { values: true },
        },
      ],
    },

    // ──────────────────────────────────────────────────────────────────
    // Workshop 3 — Game scoreboard (score changes; player name is fixed)
    // ──────────────────────────────────────────────────────────────────
    {
      kind: "js-workshop",
      title: { en: "Workshop: game scoreboard", sv: "Verkstad: poängtavla" },
      prompt: {
        en:
          "Score keeps going up; the player name doesn't. Use let where it changes, const where it doesn't.",
        sv:
          "Poängen växer; spelarens namn gör det inte. Använd let där det ändras, const där det inte gör det.",
      },
      designNote:
        "L1 W3. Same teaching arc. Surface: game scoreboard — score + playerName.",
      steps: [
        {
          id: "score-declare",
          instruction: {
            en:
              "Declare a `let` called `score` starting at any number. Log it.",
            sv:
              "Deklarera en `let` som heter `score` som börjar på valfritt tal. Logga den.",
          },
          hint: {
            en: "let score = 0;\nconsole.log(score);",
            sv: "let score = 0;\nconsole.log(score);",
          },
          starterCode: {
            en: "// Declare score and log it.\n",
            sv: "// Deklarera score och logga den.\n",
          },
          checks: [
            {
              message: {
                en: "Use `let` to declare a variable named `score`.",
                sv: "Använd `let` för att deklarera en variabel som heter `score`.",
              },
              requirePattern: /\blet\s+score\b/,
            },
            {
              message: {
                en: "`score` should be a number.",
                sv: "`score` ska vara ett tal.",
              },
              assert: "return typeof score === 'number';",
            },
            {
              message: {
                en: "Log `score`.",
                sv: "Logga `score`.",
              },
              requirePattern: /console\.log\s*\(\s*score\s*\)/,
            },
          ],
          reveal: {
            en: "let score = 0;\nconsole.log(score);\n",
            sv: "let score = 0;\nconsole.log(score);\n",
          },
          flexibility: { values: true },
        },
        {
          id: "score-hit",
          instruction: {
            en:
              "After a hit, reassign `score` to a different number. Log it.",
            sv:
              "Efter en träff, omtilldela `score` till ett annat tal. Logga den.",
          },
          hint: {
            en: "score = 50;\nconsole.log(score);",
            sv: "score = 50;\nconsole.log(score);",
          },
          starterCode: {
            en:
              "let score = 0;\nconsole.log(score);\n// Reassign score to a different number and log it.\n",
            sv:
              "let score = 0;\nconsole.log(score);\n// Omtilldela score till ett annat tal och logga den.\n",
          },
          checks: [
            {
              message: {
                en: "Reassign `score` to a number (no `let` on this line).",
                sv: "Omtilldela `score` till ett tal (inget `let` på denna rad).",
              },
              requirePattern: /(^|\n)\s*score\s*=\s*\d/,
            },
            {
              message: {
                en: "After your changes, `score` should still be a number.",
                sv: "Efter ändringarna ska `score` fortfarande vara ett tal.",
              },
              assert: "return typeof score === 'number';",
            },
          ],
          reveal: {
            en:
              "let score = 0;\nconsole.log(score);\nscore = 50;\nconsole.log(score);\n",
            sv:
              "let score = 0;\nconsole.log(score);\nscore = 50;\nconsole.log(score);\n",
          },
          flexibility: { values: true },
        },
        {
          id: "score-player-name",
          instruction: {
            en:
              "Declare a `const` called `playerName` with any name. Log it.",
            sv:
              "Deklarera en `const` som heter `playerName` med valfritt namn. Logga den.",
          },
          hint: {
            en: 'const playerName = "Astra";\nconsole.log(playerName);',
            sv: 'const playerName = "Astra";\nconsole.log(playerName);',
          },
          starterCode: {
            en:
              "let score = 0;\nconsole.log(score);\nscore = 50;\nconsole.log(score);\n// Declare playerName with const and log it.\n",
            sv:
              "let score = 0;\nconsole.log(score);\nscore = 50;\nconsole.log(score);\n// Deklarera playerName med const och logga den.\n",
          },
          checks: [
            {
              message: {
                en: "Use `const` to declare `playerName`.",
                sv: "Använd `const` för att deklarera `playerName`.",
              },
              requirePattern: /\bconst\s+playerName\b/,
            },
            {
              message: {
                en: "`playerName` should be a non-empty string.",
                sv: "`playerName` ska vara en icke-tom sträng.",
              },
              assert: "return typeof playerName === 'string' && playerName.length > 0;",
            },
            {
              message: {
                en: "Log `playerName`.",
                sv: "Logga `playerName`.",
              },
              requirePattern: /console\.log\s*\(\s*playerName\s*\)/,
            },
          ],
          reveal: {
            en:
              "let score = 0;\nconsole.log(score);\nscore = 50;\nconsole.log(score);\nconst playerName = \"Astra\";\nconsole.log(playerName);\n",
            sv:
              "let score = 0;\nconsole.log(score);\nscore = 50;\nconsole.log(score);\nconst playerName = \"Astra\";\nconsole.log(playerName);\n",
          },
          flexibility: { values: true },
        },
        {
          id: "score-recap",
          instruction: {
            en:
              "Build a recap line using a TEMPLATE LITERAL. Backticks (`) let you embed a variable directly inside a string with `${variable}`. Example: `Hello, ${name}!`. (Preview: covered properly in the Strings chapter.)\n\nLog a single line including both `playerName` and `score` inside one template literal.",
            sv:
              "Bygg en sammanfattningsrad med en TEMPLATE-LITERAL. Backticks (`) gör att du kan stoppa in en variabel direkt i en sträng med `${variabel}`. Exempel: `Hej, ${name}!`. (Förhandstitt: behandlas ordentligt i Strings-kapitlet.)\n\nLogga en rad med både `playerName` och `score` inuti samma template-literal.",
          },
          starterCode: {
            en:
              "let score = 0;\nconsole.log(score);\nscore = 50;\nconsole.log(score);\nconst playerName = \"Astra\";\nconsole.log(playerName);\n// Log a recap using a template literal: `${playerName} ... ${score}`.\n",
            sv:
              "let score = 0;\nconsole.log(score);\nscore = 50;\nconsole.log(score);\nconst playerName = \"Astra\";\nconsole.log(playerName);\n// Logga en sammanfattning med template-literal: `${playerName} ... ${score}`.\n",
          },
          checks: [
            {
              message: {
                en: "Use a template literal that includes both `${playerName}` and `${score}`.",
                sv: "Använd en template-literal som innehåller både `${playerName}` och `${score}`.",
              },
              requirePattern: /`[^`]*\$\{\s*playerName\s*\}[^`]*\$\{\s*score\s*\}[^`]*`|`[^`]*\$\{\s*score\s*\}[^`]*\$\{\s*playerName\s*\}[^`]*`/,
            },
          ],
          reveal: {
            en:
              "let score = 0;\nconsole.log(score);\nscore = 50;\nconsole.log(score);\nconst playerName = \"Astra\";\nconsole.log(playerName);\nconsole.log(`${playerName} scored ${score}`);\n",
            sv:
              "let score = 0;\nconsole.log(score);\nscore = 50;\nconsole.log(score);\nconst playerName = \"Astra\";\nconsole.log(playerName);\nconsole.log(`${playerName} scored ${score}`);\n",
          },
          flexibility: { values: true },
        },
      ],
    },

    // ──────────────────────────────────────────────────────────────────
    // Workshop 4 — Weather check (temp changes; location is fixed)
    // ──────────────────────────────────────────────────────────────────
    {
      kind: "js-workshop",
      title: { en: "Workshop: weather check", sv: "Verkstad: väderkoll" },
      prompt: {
        en:
          "Temperature swings hour to hour; the place name doesn't.",
        sv:
          "Temperaturen växlar från timme till timme; ortnamnet gör det inte.",
      },
      designNote:
        "L1 W4. Same teaching arc. Surface: weather — temperatureC + location.",
      steps: [
        {
          id: "weather-declare-temp",
          instruction: {
            en:
              "Declare a `let` called `temperatureC` with any number. Log it.",
            sv:
              "Deklarera en `let` som heter `temperatureC` med valfritt tal. Logga den.",
          },
          hint: {
            en: "let temperatureC = 18;\nconsole.log(temperatureC);",
            sv: "let temperatureC = 18;\nconsole.log(temperatureC);",
          },
          starterCode: {
            en: "// Declare temperatureC and log it.\n",
            sv: "// Deklarera temperatureC och logga den.\n",
          },
          checks: [
            {
              message: {
                en: "Use `let` to declare a variable named `temperatureC`.",
                sv: "Använd `let` för att deklarera en variabel som heter `temperatureC`.",
              },
              requirePattern: /\blet\s+temperatureC\b/,
            },
            {
              message: {
                en: "`temperatureC` should be a number.",
                sv: "`temperatureC` ska vara ett tal.",
              },
              assert: "return typeof temperatureC === 'number';",
            },
            {
              message: {
                en: "Log `temperatureC`.",
                sv: "Logga `temperatureC`.",
              },
              requirePattern: /console\.log\s*\(\s*temperatureC\s*\)/,
            },
          ],
          reveal: {
            en: "let temperatureC = 18;\nconsole.log(temperatureC);\n",
            sv: "let temperatureC = 18;\nconsole.log(temperatureC);\n",
          },
          flexibility: { values: true },
        },
        {
          id: "weather-warmer",
          instruction: {
            en:
              "The temperature changes — reassign `temperatureC` to a different number. Log it again.",
            sv:
              "Temperaturen ändras — omtilldela `temperatureC` till ett annat tal. Logga igen.",
          },
          hint: {
            en: "temperatureC = 22;\nconsole.log(temperatureC);",
            sv: "temperatureC = 22;\nconsole.log(temperatureC);",
          },
          starterCode: {
            en:
              "let temperatureC = 18;\nconsole.log(temperatureC);\n// Reassign temperatureC to a different number and log it.\n",
            sv:
              "let temperatureC = 18;\nconsole.log(temperatureC);\n// Omtilldela temperatureC till ett annat tal och logga den.\n",
          },
          checks: [
            {
              message: {
                en: "Reassign `temperatureC` to a number (no `let` on this line).",
                sv: "Omtilldela `temperatureC` till ett tal (inget `let` på denna rad).",
              },
              requirePattern: /(^|\n)\s*temperatureC\s*=\s*-?\d/,
            },
            {
              message: {
                en: "After your changes, `temperatureC` should still be a number.",
                sv: "Efter ändringarna ska `temperatureC` fortfarande vara ett tal.",
              },
              assert: "return typeof temperatureC === 'number';",
            },
          ],
          reveal: {
            en:
              "let temperatureC = 18;\nconsole.log(temperatureC);\ntemperatureC = 22;\nconsole.log(temperatureC);\n",
            sv:
              "let temperatureC = 18;\nconsole.log(temperatureC);\ntemperatureC = 22;\nconsole.log(temperatureC);\n",
          },
          flexibility: { values: true },
        },
        {
          id: "weather-location",
          instruction: {
            en:
              "Declare a `const` called `location` with any place name. Log it.",
            sv:
              "Deklarera en `const` som heter `location` med valfritt ortnamn. Logga den.",
          },
          hint: {
            en: 'const location = "Hudiksvall";\nconsole.log(location);',
            sv: 'const location = "Hudiksvall";\nconsole.log(location);',
          },
          starterCode: {
            en:
              "let temperatureC = 18;\nconsole.log(temperatureC);\ntemperatureC = 22;\nconsole.log(temperatureC);\n// Declare location with const and log it.\n",
            sv:
              "let temperatureC = 18;\nconsole.log(temperatureC);\ntemperatureC = 22;\nconsole.log(temperatureC);\n// Deklarera location med const och logga den.\n",
          },
          checks: [
            {
              message: {
                en: "Use `const` to declare `location`.",
                sv: "Använd `const` för att deklarera `location`.",
              },
              requirePattern: /\bconst\s+location\b/,
            },
            {
              message: {
                en: "`location` should be a non-empty string.",
                sv: "`location` ska vara en icke-tom sträng.",
              },
              assert: "return typeof location === 'string' && location.length > 0;",
            },
            {
              message: {
                en: "Log `location`.",
                sv: "Logga `location`.",
              },
              requirePattern: /console\.log\s*\(\s*location\s*\)/,
            },
          ],
          reveal: {
            en:
              "let temperatureC = 18;\nconsole.log(temperatureC);\ntemperatureC = 22;\nconsole.log(temperatureC);\nconst location = \"Hudiksvall\";\nconsole.log(location);\n",
            sv:
              "let temperatureC = 18;\nconsole.log(temperatureC);\ntemperatureC = 22;\nconsole.log(temperatureC);\nconst location = \"Hudiksvall\";\nconsole.log(location);\n",
          },
          flexibility: { values: true },
        },
        {
          id: "weather-report",
          instruction: {
            en:
              "Log a forecast line including both `temperatureC` and `location`. Use this exact string:\n\nIn Hudiksvall the temperature is 23 degrees today.\n\n…where you replace `Hudiksvall` with the variable `location` and `23` with the variable `temperatureC`. You can either use string concatenation (`+`, what you used in W2) or template literals (backticks, what you used in W3). The line must match the wording, spacing, and punctuation exactly.",
            sv:
              "Logga en prognosrad med både `temperatureC` och `location`. Använd exakt den här strängen:\n\nIn Hudiksvall the temperature is 23 degrees today.\n\n…där du byter ut `Hudiksvall` mot variabeln `location` och `23` mot variabeln `temperatureC`. Du kan antingen använda konkatenering (`+`, som i W2) eller template-literal (backticks, som i W3). Raden ska matcha texten, mellanslagen och skiljetecknen exakt.",
          },
          hint: {
            en:
              "// Either form works as long as the output is exact:\nconsole.log(`In ${location} the temperature is ${temperatureC} degrees today.`);\n// or\nconsole.log(\"In \" + location + \" the temperature is \" + temperatureC + \" degrees today.\");",
            sv:
              "// Båda formerna funkar så länge utskriften är exakt:\nconsole.log(`In ${location} the temperature is ${temperatureC} degrees today.`);\n// eller\nconsole.log(\"In \" + location + \" the temperature is \" + temperatureC + \" degrees today.\");",
          },
          starterCode: {
            en:
              "let temperatureC = 18;\nconsole.log(temperatureC);\ntemperatureC = 22;\nconsole.log(temperatureC);\nconst location = \"Hudiksvall\";\nconsole.log(location);\n// Log the exact forecast line — see the instruction.\n",
            sv:
              "let temperatureC = 18;\nconsole.log(temperatureC);\ntemperatureC = 22;\nconsole.log(temperatureC);\nconst location = \"Hudiksvall\";\nconsole.log(location);\n// Logga den exakta prognosraden — se instruktionen.\n",
          },
          checks: [
            {
              message: {
                en: "The forecast line must reference both `location` and `temperatureC` as variables (not hard-coded text).",
                sv: "Prognosraden ska referera både `location` och `temperatureC` som variabler (inte hårdkodad text).",
              },
              // Require a console.log whose argument(s) mention BOTH variable
              // identifiers. Order-agnostic; doesn't care if the form is
              // concat or template literal.
              requirePattern: /console\.log\s*\([^)]*(?:\blocation\b[^)]*\btemperatureC\b|\btemperatureC\b[^)]*\blocation\b)[^)]*\)/,
            },
            {
              message: {
                en: "The console must show exactly: `In <location> the temperature is <temperatureC> degrees today.` (substitute your variable values).",
                sv: "Konsolen ska visa exakt: `In <location> the temperature is <temperatureC> degrees today.` (med dina variabelvärden insatta).",
              },
              // Build the expected line from the runtime values of `location`
              // and `temperatureC` so value-flexibility is preserved — any
              // city + any number works as long as the output template
              // matches exactly.
              assert:
                "if (typeof temperatureC !== 'number') return false;" +
                "if (typeof location !== 'string') return false;" +
                "var expected = 'In ' + location + ' the temperature is ' + temperatureC + ' degrees today.';" +
                "return __logs.indexOf(expected) !== -1;",
            },
          ],
          reveal: {
            en:
              "let temperatureC = 18;\nconsole.log(temperatureC);\ntemperatureC = 22;\nconsole.log(temperatureC);\nconst location = \"Hudiksvall\";\nconsole.log(location);\nconsole.log(`In ${location} the temperature is ${temperatureC} degrees today.`);\n",
            sv:
              "let temperatureC = 18;\nconsole.log(temperatureC);\ntemperatureC = 22;\nconsole.log(temperatureC);\nconst location = \"Hudiksvall\";\nconsole.log(location);\nconsole.log(`In ${location} the temperature is ${temperatureC} degrees today.`);\n",
          },
          flexibility: { values: true },
        },
      ],
    },

    // ──────────────────────────────────────────────────────────────────
    // Exercise 2 — Step counter
    // ──────────────────────────────────────────────────────────────────
    {
      kind: "exercise",
      title: { en: "Lab: step counter", sv: "Labb: stegräknare" },
      prompt: {
        en:
          "A pedometer tracks steps walked across the day — the count grows as you walk more. Same `let` variable, updated multiple times.\n\n" +
          "User stories:\n" +
          "1. Declare a let `stepsWalked` starting at 0.\n" +
          "2. Reassign `stepsWalked` to three different positive numbers — morning, midday, and evening counts (each higher than the last).\n" +
          "3. After EACH reassignment, console.log `stepsWalked` so the console shows the progression.\n\n" +
          "Exactly three console.log lines, each printing a different ascending step count.",
        sv:
          "En stegräknare följer dagens steg — antalet växer ju mer du går. Samma `let`-variabel, uppdaterad flera gånger.\n\n" +
          "Användarberättelser:\n" +
          "1. Deklarera en let `stepsWalked` som börjar på 0.\n" +
          "2. Omtilldela `stepsWalked` till tre olika positiva tal — morgon, lunch, och kväll (varje högre än det förra).\n" +
          "3. Efter VARJE omtilldelning, console.log `stepsWalked` så konsolen visar progressionen.\n\n" +
          "Exakt tre console.log-rader, varje skriver ett annat stigande antal steg.",
      },
      starterJs:
        "// 1. Declare stepsWalked with let, starting at 0:\n\n\n" +
        "// 2. Morning — reassign stepsWalked and log it:\n\n\n" +
        "// 3. Midday — reassign stepsWalked higher and log it:\n\n\n" +
        "// 4. Evening — reassign stepsWalked higher and log it:\n\n",
      tests: [
        {
          label: {
            en: "Declares `stepsWalked` with let starting at 0",
            sv: "Deklarerar `stepsWalked` med let som börjar på 0",
          },
          assert:
            "var src = window.__userSrc || '';" +
            "if (!/\\blet\\s+stepsWalked\\s*=\\s*0\\b/.test(src)) return false;" +
            "var lets = src.match(/\\blet\\s+stepsWalked\\b/g) || [];" +
            "return lets.length === 1;",
          hint: {
            en: "Use `let stepsWalked = 0;` once.",
            sv: "Använd `let stepsWalked = 0;` en gång.",
          },
        },
        {
          label: {
            en: "Reassigns `stepsWalked` at least three times (no second `let`)",
            sv: "Omtilldelar `stepsWalked` minst tre gånger (inget andra `let`)",
          },
          assert:
            "var src = window.__userSrc || '';" +
            // Count "stepsWalked = N" assignment lines (number literal). The
            // initial `let stepsWalked = 0` counts as the first; we need at
            // least 4 total (1 declaration + 3 reassignments).
            "var assigns = src.match(/\\bstepsWalked\\s*=\\s*-?\\d/g) || [];" +
            "return assigns.length >= 4;",
          hint: {
            en: "Reassign three more times after the declaration — e.g. `stepsWalked = 1500;`, then `stepsWalked = 4500;`, then `stepsWalked = 8500;`.",
            sv: "Omtilldela tre gånger till efter deklarationen — t.ex. `stepsWalked = 1500;`, sedan `stepsWalked = 4500;`, sedan `stepsWalked = 8500;`.",
          },
        },
        {
          label: {
            en: "Console shows three different ascending step counts",
            sv: "Konsolen visar tre olika stigande stegantal",
          },
          // Parse the three logged values as numbers, verify they're a
          // strictly-increasing sequence of three distinct positive
          // integers. Order-sensitive on purpose — the lab is about
          // tracking a progression.
          assert:
            "var c = window.__console || [];" +
            "if (c.length !== 3) return false;" +
            "var nums = c.map(function (e) { return Number(e.text); });" +
            "for (var i = 0; i < 3; i++) {" +
            "  if (Number.isNaN(nums[i])) return false;" +
            "  if (nums[i] <= 0) return false;" +
            "}" +
            "return nums[0] < nums[1] && nums[1] < nums[2];",
          hint: {
            en: "Three `console.log(stepsWalked);` calls, each AFTER a reassignment, each printing a higher number than the last.",
            sv: "Tre `console.log(stepsWalked);`-anrop, vart och ett EFTER en omtilldelning, vart och ett högre än det förra.",
          },
        },
      ],
      flexibility: { values: true },
    },

    // ──────────────────────────────────────────────────────────────────
    // Exercise 3 — Battery monitor
    // ──────────────────────────────────────────────────────────────────
    {
      kind: "exercise",
      title: { en: "Lab: battery monitor", sv: "Labb: batteriövervakning" },
      prompt: {
        en:
          "A phone's battery drains over the day. Use the `-` or `-=` operator to subtract from the current value MULTIPLE times — each drain mutates the same variable.\n\n" +
          "User stories:\n" +
          "1. Declare a let `batteryPercent` starting at 100.\n" +
          "2. Drain it at least TWICE — each drain uses the `-` operator on the current value (e.g. `batteryPercent = batteryPercent - 27` or the shorthand `batteryPercent -= 27`). No second `let`.\n" +
          "3. After EACH drain, console.log `batteryPercent` so the console shows the battery dropping.\n" +
          "4. `batteryPercent` must end between 0 and 100 inclusive.\n\n" +
          "At least two drains, at least two console.log lines.",
        sv:
          "En telefons batteri laddas ur under dagen. Använd `-` eller `-=`-operatorn för att dra från det nuvarande värdet FLERA gånger — varje urladdning muterar samma variabel.\n\n" +
          "Användarberättelser:\n" +
          "1. Deklarera en let `batteryPercent` som börjar på 100.\n" +
          "2. Ladda ur minst TVÅ gånger — varje urladdning använder `-`-operatorn på det nuvarande värdet (t.ex. `batteryPercent = batteryPercent - 27` eller den korta formen `batteryPercent -= 27`). Inget andra `let`.\n" +
          "3. Efter VARJE urladdning, console.log `batteryPercent` så konsolen visar nivån sjunka.\n" +
          "4. `batteryPercent` måste sluta mellan 0 och 100 inklusive.\n\n" +
          "Minst två urladdningar, minst två console.log-rader.",
      },
      starterJs:
        "// 1. Declare batteryPercent with let, starting at 100:\n\n\n" +
        "// 2. First drain (use - or -=), then log:\n\n\n" +
        "// 3. Second drain (use - or -=), then log:\n\n",
      tests: [
        {
          label: {
            en: "Declares `batteryPercent` with let starting at 100",
            sv: "Deklarerar `batteryPercent` med let som börjar på 100",
          },
          assert:
            "var src = window.__userSrc || '';" +
            "if (!/\\blet\\s+batteryPercent\\s*=\\s*100\\b/.test(src)) return false;" +
            "var lets = src.match(/\\blet\\s+batteryPercent\\b/g) || [];" +
            "return lets.length === 1;",
          hint: {
            en: "Use `let batteryPercent = 100;` once.",
            sv: "Använd `let batteryPercent = 100;` en gång.",
          },
        },
        {
          label: {
            en: "Drains `batteryPercent` at least twice using `-` or `-=`",
            sv: "Drar `batteryPercent` minst två gånger med `-` eller `-=`",
          },
          assert:
            "var src = window.__userSrc || '';" +
            // Count drain operations. Accept either explicit
            // `batteryPercent = batteryPercent - N` or shorthand
            // `batteryPercent -= N`. Need at least 2 matches.
            "var re = /(?:^|\\n|;)\\s*batteryPercent\\s*(?:=\\s*batteryPercent\\s*-|-=)\\s*\\d/g;" +
            "var matches = src.match(re) || [];" +
            "return matches.length >= 2;",
          hint: {
            en: "Two drains — e.g. `batteryPercent -= 27;` followed by `batteryPercent -= 18;`. Don't reassign to a plain literal.",
            sv: "Två urladdningar — t.ex. `batteryPercent -= 27;` följt av `batteryPercent -= 18;`. Skriv inte över med ett vanligt tal.",
          },
        },
        {
          label: {
            en: "Console shows the battery dropping (at least 2 lines, each lower than the last)",
            sv: "Konsolen visar batteriet sjunka (minst 2 rader, varje lägre än den förra)",
          },
          // Parse logged numbers and require a strictly-decreasing sequence
          // of at least 2 entries. Order-sensitive on purpose: the lab is
          // about watching the value drop.
          assert:
            "var c = window.__console || [];" +
            "if (c.length < 2) return false;" +
            "var nums = c.map(function (e) { return Number(e.text); });" +
            "for (var i = 0; i < nums.length; i++) {" +
            "  if (Number.isNaN(nums[i])) return false;" +
            "}" +
            "for (var j = 1; j < nums.length; j++) {" +
            "  if (nums[j] >= nums[j - 1]) return false;" +
            "}" +
            "return true;",
          hint: {
            en: "After EACH drain, `console.log(batteryPercent);` — the console should show two (or more) numbers, each smaller than the previous.",
            sv: "Efter VARJE urladdning, `console.log(batteryPercent);` — konsolen ska visa två (eller fler) tal, varje mindre än det förra.",
          },
        },
        {
          label: {
            en: "batteryPercent stays between 0 and 100 inclusive",
            sv: "batteryPercent håller sig mellan 0 och 100 inklusive",
          },
          assert:
            "if (typeof batteryPercent !== 'number') return false;" +
            "return batteryPercent >= 0 && batteryPercent <= 100;",
          hint: {
            en: "Pick drain amounts so batteryPercent doesn't go negative.",
            sv: "Välj urladdningsbelopp så batteryPercent inte blir negativt.",
          },
        },
      ],
    },

    // ──────────────────────────────────────────────────────────────────
    // Exercise 4 — Quiz scoreboard (two lets + one const)
    // ──────────────────────────────────────────────────────────────────
    {
      kind: "exercise",
      title: { en: "Lab: quiz scoreboard", sv: "Labb: quiz-tavla" },
      prompt: {
        en:
          "Run a small quiz and track two counters — answers correct and answers wrong — against a fixed total. This lab is about TWO let variables coexisting with one const.\n\n" +
          "User stories:\n" +
          "1. Declare a const `totalQuestions` with a positive number (the quiz length).\n" +
          "2. Declare a let `correctAnswers` starting at 0.\n" +
          "3. Declare a let `wrongAnswers` starting at 0.\n" +
          "4. Earn answers: add to BOTH `correctAnswers` and `wrongAnswers` using `+` or `+=` (the two together should equal `totalQuestions`).\n" +
          "5. console.log a single line that includes ALL THREE values: `correctAnswers`, `wrongAnswers`, and `totalQuestions`.",
        sv:
          "Kör ett litet quiz och håll koll på två räknare — rätta svar och fel svar — mot ett fast totalantal. Den här labben handlar om TVÅ let-variabler tillsammans med en const.\n\n" +
          "Användarberättelser:\n" +
          "1. Deklarera en const `totalQuestions` med ett positivt tal (frågornas antal).\n" +
          "2. Deklarera en let `correctAnswers` som börjar på 0.\n" +
          "3. Deklarera en let `wrongAnswers` som börjar på 0.\n" +
          "4. Räkna upp BÅDA `correctAnswers` och `wrongAnswers` med `+` eller `+=` (de två tillsammans ska bli `totalQuestions`).\n" +
          "5. console.log en rad som innehåller ALLA TRE värden: `correctAnswers`, `wrongAnswers`, och `totalQuestions`.",
      },
      starterJs:
        "// 1. Declare totalQuestions with const:\n\n\n" +
        "// 2. Declare correctAnswers with let, starting at 0:\n\n\n" +
        "// 3. Declare wrongAnswers with let, starting at 0:\n\n\n" +
        "// 4. Add to correctAnswers (use + or +=):\n\n\n" +
        "// 5. Add to wrongAnswers (use + or +=):\n\n\n" +
        "// 6. console.log one line with all three:\n\n",
      tests: [
        {
          label: {
            en: "Declares `totalQuestions` with const and a positive number",
            sv: "Deklarerar `totalQuestions` med const och ett positivt tal",
          },
          assert:
            "var src = window.__userSrc || '';" +
            "if (!/\\bconst\\s+totalQuestions\\s*=\\s*\\d/.test(src)) return false;" +
            "return typeof totalQuestions === 'number' && totalQuestions > 0;",
          hint: {
            en: "Use `const totalQuestions = 10;` (or any positive number).",
            sv: "Använd `const totalQuestions = 10;` (eller valfritt positivt tal).",
          },
        },
        {
          label: {
            en: "Declares `correctAnswers` and `wrongAnswers` with let, both starting at 0",
            sv: "Deklarerar `correctAnswers` och `wrongAnswers` med let, båda börjar på 0",
          },
          assert:
            "var src = window.__userSrc || '';" +
            "if (!/\\blet\\s+correctAnswers\\s*=\\s*0\\b/.test(src)) return false;" +
            "if (!/\\blet\\s+wrongAnswers\\s*=\\s*0\\b/.test(src)) return false;" +
            "var c = src.match(/\\blet\\s+correctAnswers\\b/g) || [];" +
            "var w = src.match(/\\blet\\s+wrongAnswers\\b/g) || [];" +
            "return c.length === 1 && w.length === 1;",
          hint: {
            en: "Two separate `let` declarations — `let correctAnswers = 0;` and `let wrongAnswers = 0;`.",
            sv: "Två separata `let`-deklarationer — `let correctAnswers = 0;` och `let wrongAnswers = 0;`.",
          },
        },
        {
          label: {
            en: "Adds to both counters using `+` or `+=` (no second `let`)",
            sv: "Lägger till på båda räknarna med `+` eller `+=` (inget andra `let`)",
          },
          assert:
            "var src = window.__userSrc || '';" +
            // Each counter must show an additive mutation: either
            // `x = x + N` or `x += N`. Order-independent.
            "var correctOp = /(?:^|\\n|;)\\s*correctAnswers\\s*(?:=\\s*correctAnswers\\s*\\+|\\+=)\\s*\\d/.test(src);" +
            "var wrongOp = /(?:^|\\n|;)\\s*wrongAnswers\\s*(?:=\\s*wrongAnswers\\s*\\+|\\+=)\\s*\\d/.test(src);" +
            "if (!correctOp || !wrongOp) return false;" +
            "if (typeof correctAnswers !== 'number' || typeof wrongAnswers !== 'number') return false;" +
            "return correctAnswers > 0 && wrongAnswers > 0;",
          hint: {
            en: "Two additive mutations — e.g. `correctAnswers += 7;` and `wrongAnswers += 3;`. Each counter must end above 0.",
            sv: "Två additiva muteringar — t.ex. `correctAnswers += 7;` och `wrongAnswers += 3;`. Varje räknare ska sluta över 0.",
          },
        },
        {
          label: {
            en: "Console line includes all three values: correctAnswers, wrongAnswers, totalQuestions",
            sv: "Konsolraden innehåller alla tre värden: correctAnswers, wrongAnswers, totalQuestions",
          },
          assert:
            "var c = window.__console || [];" +
            "if (c.length !== 1) return false;" +
            "var t = c[0].text;" +
            "if (typeof correctAnswers !== 'number' || typeof wrongAnswers !== 'number' || typeof totalQuestions !== 'number') return false;" +
            "if (t.indexOf(String(correctAnswers)) === -1) return false;" +
            "if (t.indexOf(String(wrongAnswers)) === -1) return false;" +
            "return t.indexOf(String(totalQuestions)) !== -1;",
          hint: {
            en:
              "One line that shows all three numbers — e.g. `` `${correctAnswers} correct, ${wrongAnswers} wrong, out of ${totalQuestions}` `` (template literal).",
            sv:
              "En rad som visar alla tre talen — t.ex. `` `${correctAnswers} rätt, ${wrongAnswers} fel, av ${totalQuestions}` `` (template-literal).",
          },
        },
      ],
      flexibility: { values: true },
    },
  ],
};
