import type { Lesson } from "../../types";
import { codePanelStyle, noteBoxStyle } from "./_shared";

export const letConstLesson: Lesson = {
  id: "variables-let-const",
  title: "1. let and const — names for values",
  summary: "Give a value a name so you can use it later.",
  slides: [
    // 1. Intro — what's a variable?
    {
      kind: "explanation",
      title: "A name for a value",
      intro: "Code becomes much easier to read when values have names.\nA variable is a name pointing at a value.",
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
          label: "Three variables, three values.\nA name on the left,\nan equals sign,\na value on the right.",
          baseStyle: { ...noteBoxStyle, marginTop: 16 },
        },
      ],
      steps: [
        {
          narration: "Imagine you have a sticky note labelled `score`.\nThe label is the name. The note holds the value.",
        },
        {
          narration: "We use two keywords to make a variable:\n• `let` — when the value MAY change later.\n• `const` — when the value WILL NOT change.",
          tokenHighlight: ["let", "const"],
        },
      ],
    },

    // 2. Naming — rules vs convention (camelCase)
    {
      kind: "explanation",
      title: "Naming variables",
      intro: "There are a few real rules for variable names — and one strong convention.\nKnowing the difference matters: rules cause errors, conventions just make code easier to read.",
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
          label: "Rule of thumb:\n• Rules → JS errors out.\n• Conventions → JS is fine,\n  but other developers expect them.\n\nFollow camelCase so people\nreading your code don't trip.",
          baseStyle: { ...noteBoxStyle, marginTop: 16 },
        },
      ],
      steps: [
        {
          narration: "The real rules (break these and JS gives an error):\n• Start with a letter, `$`, or `_` — never a digit.\n• No spaces, dashes, or other punctuation.\n• Don't reuse a reserved word like `let`, `const`, or `if`.",
        },
        {
          narration: "Now the CONVENTION — not a rule.\nFor multi-word names, JavaScript developers write camelCase:\nfirst word lowercase, every following word capitalised.\n\n  userName  ✓ camelCase\n  user_name — snake_case, common in Python — not JS\n  UserName  — PascalCase, reserved for classes\n  username  — works, but harder to read past two words",
          tokenHighlight: ["userName"],
        },
        {
          narration: "Important: all four lines below the rules ABOVE will run.\nJavaScript doesn't enforce camelCase. The convention exists so people reading your code know what to expect.\n\nFollowing it is a courtesy to your future self and your teammates.",
        },
        {
          narration: "And finally — pick a name that says what's INSIDE the variable.\n`x` and `tmp` work but tell the reader nothing.\n`userAge`, `totalPrice`, `isLoggedIn` tell a story.\n\nA good name lets you understand the code without having to follow the value.",
        },
      ],
    },

    // 3. let — declaration + reassignment
    {
      kind: "explanation",
      title: "let — a value that can change",
      intro: "`let` declares a variable whose value you can replace later.\nThink of a sticky note: peel it off, write a new value, stick it back.",
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
          narration: "First line: declare `city` with `let` and give it the value `\"Stockholm\"`.",
          tokenHighlight: ["let", "city"],
        },
        {
          narration: "Logging `city` prints \"Stockholm\".\nThe variable still points at that value.",
          tokenHighlight: ['"Stockholm"'],
        },
        {
          narration: "Now reassign — note: NO `let` on the second line.\n`let` is for declaring; reassigning just uses `=` with the existing name.",
          tokenHighlight: ['city = "Gothenburg"'],
        },
        {
          narration: "Logging `city` again now prints \"Gothenburg\".\nSame name, different value.",
          tokenHighlight: ['"Gothenburg"'],
        },
      ],
    },

    // 4. const — declaration only
    {
      kind: "explanation",
      title: "const — a value that stays put",
      intro: "`const` declares a variable that CANNOT be reassigned.\nThe label is glued on — you can't peel it off.",
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
          label: "Rule of thumb:\nuse `const` by default.\nSwitch to `let` only when you actually need to reassign.",
          baseStyle: { ...noteBoxStyle, marginTop: 16 },
        },
      ],
      steps: [
        {
          narration: "Declare `pi` with `const`. We give it a value once — that's it.",
          tokenHighlight: ["const", "pi"],
        },
        {
          narration: "Trying to reassign throws a TypeError.\nJavaScript stops the program right here.",
          tokenHighlight: ["pi = 4"],
        },
        {
          narration: "Why bother? It tells the reader (and your future self):\n'this value is locked — don't worry about it changing'.",
        },
      ],
    },

    // 5. Chip practice
    {
      kind: "js-chip-assignment",
      title: "Practice: declare some variables",
      prompt: "Build the variable declarations piece by piece.\nWatch the keyword carefully — let or const?",
      puzzles: [
        // p1: `let` keyword
        {
          prompt: "Pick the keyword that declares a variable you can REASSIGN.",
          template: '[[]] score = 0;\nscore = 10;',
          chips: ["let", "const", "var", "name"],
          solution: ["let"],
        },
        // p2: `const` keyword
        {
          prompt: "Pick the keyword that LOCKS the value.",
          template: '[[]] pi = 3.14;',
          chips: ["const", "let", "var", "fixed"],
          solution: ["const"],
        },
        // p3: assignment operator
        {
          prompt: "Which operator GIVES the variable its value?",
          template: 'let name [[]] "Alice";',
          chips: ["=", "==", "===", ":"],
          solution: ["="],
        },
        // p4: reassignment — no keyword
        {
          intro: "Reassigning an existing variable — no keyword on the second line.",
          prompt: "Fill in the missing piece — note there's no let/const here.",
          template: 'let count = 0;\ncount [[]] 1;',
          chips: ["=", "let", "const", "+="],
          solution: ["="],
        },
        // p5: synthesis. Either declaration may use `let` or `const` —
        // semantically `city` and `country` are both fine to lock or leave
        // mutable in this teaching context, so we accept either keyword in
        // either declaration. The `=` slots remain position-strict.
        {
          prompt: "Place all the pieces of two declarations.",
          template: '[[]] city [[]] "Stockholm";\n[[]] country [[]] "Sweden";',
          chips: ["let", "const", "=", "=", "==", "var"],
          solution: ["let", "=", "const", "="],
          alternatives: [["const", "=", "let", "="]],
        },
      ],
      legend: [
        {
          name: "let",
          syntax: "let name = value;",
          example: 'let city = "Stockholm";',
          note: "Declares a variable whose value you can replace later.",
        },
        {
          name: "const",
          syntax: "const name = value;",
          example: "const pi = 3.14;",
          note: "Declares a variable whose value cannot be reassigned.",
        },
      ],
    },

    // 6. Workshop — 4 steps
    {
      kind: "js-workshop",
      title: "Workshop: declare and reassign",
      prompt: "Walk through the four steps to practise let, reassignment, const, and using both together.",
      designNote:
        "Variables L1 workshop. Four steps: declare let, reassign let, declare const, combine in template literal. Surface: city/country travel theme. Distinct from chips (score/pi) and exercise (custom names).",
      steps: [
        {
          id: "let-declare-city",
          instruction: "Use `let` to declare a variable called `city` and give it any string value. Then log it.",
          hint: 'let city = "Stockholm";\nconsole.log(city);',
          starterCode: "// Declare city and log it.\n",
          checks: [
            {
              message: "Use `let` to declare a variable named `city`.",
              requirePattern: /\blet\s+city\b/,
            },
            {
              message: "`city` should hold a string.",
              assert: "return typeof city === 'string';",
            },
            {
              message: "Log `city` with `console.log`.",
              requirePattern: /console\.log\s*\(\s*city\s*\)/,
            },
          ],
          reveal: 'let city = "Stockholm";\nconsole.log(city);\n',
          anyValues: true,
        },
        {
          id: "let-reassign-city",
          instruction: "Reassign `city` to a different string. Note: no `let` on the second line — the variable already exists. Log it again.",
          hint: 'city = "Gothenburg";\nconsole.log(city);',
          starterCode: 'let city = "Stockholm";\nconsole.log(city);\n// Reassign city to a different string and log it again.\n',
          checks: [
            {
              message: "Reassign `city` to a string different from the initial value (no `let` on this line).",
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
              message: "After your changes, `city` should still be a string.",
              assert: "return typeof city === 'string';",
            },
          ],
          reveal: 'let city = "Stockholm";\nconsole.log(city);\ncity = "Gothenburg";\nconsole.log(city);\n',
          anyValues: true,
        },
        {
          id: "const-declare-country",
          instruction: "Below the existing code, declare a `const` called `country` and give it any country name. Log it.",
          hint: 'const country = "Sweden";\nconsole.log(country);',
          starterCode: 'let city = "Stockholm";\nconsole.log(city);\ncity = "Gothenburg";\nconsole.log(city);\n// Declare country with const and log it.\n',
          checks: [
            {
              message: "Use `const` to declare a variable named `country`.",
              requirePattern: /\bconst\s+country\b/,
            },
            {
              message: "`country` should hold a string.",
              assert: "return typeof country === 'string';",
            },
            {
              message: "Log `country` with `console.log`.",
              requirePattern: /console\.log\s*\(\s*country\s*\)/,
            },
          ],
          reveal: 'let city = "Stockholm";\nconsole.log(city);\ncity = "Gothenburg";\nconsole.log(city);\nconst country = "Sweden";\nconsole.log(country);\n',
          anyValues: true,
        },
        {
          id: "try-reassign-const",
          instruction: "Now try something that's NOT allowed: reassign `country` to a different string. Press Check and watch the console — JavaScript throws a TypeError because `country` was declared with `const`. The error itself is the lesson.",
          hint: 'country = "Norway";',
          starterCode: 'let city = "Stockholm";\nconsole.log(city);\ncity = "Gothenburg";\nconsole.log(city);\nconst country = "Sweden";\nconsole.log(country);\n// Try reassigning country (this will throw a TypeError):\n',
          checks: [
            {
              message: "Add a line that reassigns `country` to a string — `country = \"...\";`.",
              requirePattern: /(^|\n)\s*country\s*=\s*["'][^"']*["']/,
            },
          ],
          reveal: 'let city = "Stockholm";\nconsole.log(city);\ncity = "Gothenburg";\nconsole.log(city);\nconst country = "Sweden";\nconsole.log(country);\ncountry = "Norway";\n',
          anyValues: true,
        },
      ],
      legend: [
        {
          name: "let",
          syntax: "let name = value;",
          example: 'let city = "Stockholm";',
          note: "Declares a variable whose value you can replace later.",
        },
        {
          name: "const",
          syntax: "const name = value;",
          example: 'const country = "Sweden";',
          note: "Declares a variable that stays at one value. Reassigning throws TypeError.",
        },
      ],
    },

    // 7. Exercise — 4 assertions
    {
      kind: "exercise",
      title: "Lab: introduce yourself",
      prompt: "Use let and const to write a tiny self-introduction.\n\n" +
          "User stories:\n" +
          "1. Declare a let called `age` with any number, then reassign it to a different number.\n" +
          "2. Declare a const called `name` with any non-empty string.\n" +
          "3. console.log a single sentence that includes both `name` and `age`.\n\n" +
          "There should be exactly one console.log line.",
      starterJs:
        "// 1. Declare age with let, then reassign it (no second let):\n\n\n" +
        "// 2. Declare name with const:\n\n\n" +
        "// 3. console.log a sentence using both:\n\n",
      tests: [
        {
          label: "Declares `age` with let exactly once and reassigns it",
          assert:
            "var src = window.__userSrc || '';" +
            "var lets = src.match(/\\blet\\s+age\\b/g) || [];" +
            "if (lets.length !== 1) return false;" +
            "var reassigns = src.match(/\\bage\\s*=(?!=)/g) || [];" +
            "if (reassigns.length < 2) return false;" +
            "return typeof age === 'number';",
          hint: "One `let age = ...;` plus a separate `age = ...;` line.",
        },
        {
          label: "Declares `name` with const and a non-empty string",
          assert:
            "var src = window.__userSrc || '';" +
            "if (!/\\bconst\\s+name\\s*=\\s*[\"'][^\"']+[\"']/.test(src)) return false;" +
            "return typeof name === 'string' && name.length > 0;",
          hint: "Use `const name = \"YourName\";`.",
        },
        {
          label: "Console shows exactly one line",
          assert:
            "var c = window.__console || []; return c.length === 1;",
          hint: "One single console.log call.",
        },
        {
          label: "The logged line includes both the name and the age",
          assert:
            "var c = window.__console || [];" +
            "if (c.length !== 1) return false;" +
            "var t = c[0].text;" +
            "if (typeof name !== 'string' || typeof age !== 'number') return false;" +
            "if (t.indexOf(name) === -1) return false;" +
            "return t.indexOf(String(age)) !== -1;",
          hint: "Build the sentence with the variables — e.g. `` `${name} is ${age} years old` `` (template literal) or `name + \" is \" + age + \" years old\"` (concat).",
        },
      ],
      anyValues: true,
    },

    // ──────────────────────────────────────────────────────────────────
    // Workshop 2 — Bank account (balance changes; account number is fixed)
    // ──────────────────────────────────────────────────────────────────
    {
      kind: "js-workshop",
      title: "Workshop: bank account",
      prompt: "A balance changes over time; an account number does not. Pick the right keyword for each.",
      designNote:
        "L1 W2. Same teaching arc as W1 (let-reassign, const, template). Surface: bank account — balance + accountNumber.",
      steps: [
        {
          id: "bank-declare-balance",
          instruction: "Declare a `let` called `balance` with any starting amount. Log it.",
          hint: "let balance = 1000;\nconsole.log(balance);",
          starterCode: "// Declare balance and log it.\n",
          checks: [
            {
              message: "Use `let` to declare `balance` with any number.",
              requirePattern: /\blet\s+balance\b/,
            },
            {
              message: "`balance` should be a number.",
              assert: "return typeof balance === 'number';",
            },
            {
              message: "Log `balance`.",
              requirePattern: /console\.log\s*\(\s*balance\s*\)/,
            },
          ],
          reveal: "let balance = 1000;\nconsole.log(balance);\n",
          anyValues: true,
        },
        {
          id: "bank-deposit",
          instruction: "Reassign `balance` so it grows by a deposit. Use `+` to add a number to `balance` itself. Log the new value.",
          hint: "balance = balance + 250;\n// or: balance += 250;\nconsole.log(balance);",
          starterCode: "let balance = 1000;\nconsole.log(balance);\n// Reassign balance after the deposit and log it.\n",
          checks: [
            {
              message: "Grow `balance` by adding a deposit — use `balance = balance + N` or the shorthand `balance += N` (no `let` on this line).",
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
          reveal: "let balance = 1000;\nconsole.log(balance);\nbalance = balance + 250;\nconsole.log(balance);\n",
          anyValues: true,
        },
        {
          id: "bank-account-number",
          instruction: "Declare a `const` called `accountNumber` and give it any account-style string. Log it. The account number never changes.",
          hint: 'const accountNumber = "SE-9981-2345";\nconsole.log(accountNumber);',
          starterCode: "let balance = 1000;\nconsole.log(balance);\nbalance = balance + 250;\nconsole.log(balance);\n// Declare accountNumber with const and log it.\n",
          checks: [
            {
              message: "Use `const` to declare `accountNumber`.",
              requirePattern: /\bconst\s+accountNumber\b/,
            },
            {
              message: "`accountNumber` should be a non-empty string.",
              assert: "return typeof accountNumber === 'string' && accountNumber.length > 0;",
            },
            {
              message: "Log `accountNumber`.",
              requirePattern: /console\.log\s*\(\s*accountNumber\s*\)/,
            },
          ],
          reveal: "let balance = 1000;\nconsole.log(balance);\nbalance = balance + 250;\nconsole.log(balance);\nconst accountNumber = \"SE-9981-2345\";\nconsole.log(accountNumber);\n",
          anyValues: true,
        },
        {
          id: "bank-summary",
          instruction: "Build a summary line by joining strings with `+`. The `+` operator between strings glues them together — for example `\"Hello, \" + name` produces `\"Hello, Alice\"`. (Preview: this is called string concatenation, covered properly in the Strings chapter.)\n\nLog a single line that includes both `accountNumber` and `balance`, joined with `+`.",
          starterCode: "let balance = 1000;\nconsole.log(balance);\nbalance = balance + 250;\nconsole.log(balance);\nconst accountNumber = \"SE-9981-2345\";\nconsole.log(accountNumber);\n// Log a summary that joins strings with + (concatenation).\n",
          checks: [
            {
              message: "Log a single line that mentions both `accountNumber` and `balance`.",
              requirePattern: /console\.log\s*\((?:[^)]*\baccountNumber\b[^)]*\bbalance\b|[^)]*\bbalance\b[^)]*\baccountNumber\b)[^)]*\)/,
            },
            {
              message: "Use `+` inside that `console.log` to join the parts together.",
              requirePattern: /console\.log\s*\([^)]*\+[^)]*\)/,
            },
          ],
          reveal: "let balance = 1000;\nconsole.log(balance);\nbalance = balance + 250;\nconsole.log(balance);\nconst accountNumber = \"SE-9981-2345\";\nconsole.log(accountNumber);\nconsole.log(\"Account \" + accountNumber + \" now holds \" + balance + \" kr\");\n",
          anyValues: true,
        },
      ],
    },

    // ──────────────────────────────────────────────────────────────────
    // Workshop 3 — Game scoreboard (score changes; player name is fixed)
    // ──────────────────────────────────────────────────────────────────
    {
      kind: "js-workshop",
      title: "Workshop: game scoreboard",
      prompt: "Score keeps going up; the player name doesn't. Use let where it changes, const where it doesn't.",
      designNote:
        "L1 W3. Same teaching arc. Surface: game scoreboard — score + playerName.",
      steps: [
        {
          id: "score-declare",
          instruction: "Declare a `let` called `score` starting at any number. Log it.",
          hint: "let score = 0;\nconsole.log(score);",
          starterCode: "// Declare score and log it.\n",
          checks: [
            {
              message: "Use `let` to declare a variable named `score`.",
              requirePattern: /\blet\s+score\b/,
            },
            {
              message: "`score` should be a number.",
              assert: "return typeof score === 'number';",
            },
            {
              message: "Log `score`.",
              requirePattern: /console\.log\s*\(\s*score\s*\)/,
            },
          ],
          reveal: "let score = 0;\nconsole.log(score);\n",
          anyValues: true,
        },
        {
          id: "score-hit",
          instruction: "After a hit, reassign `score` to a different number. Log it.",
          hint: "score = 50;\nconsole.log(score);",
          starterCode: "let score = 0;\nconsole.log(score);\n// Reassign score to a different number and log it.\n",
          checks: [
            {
              message: "Reassign `score` to a number (no `let` on this line).",
              requirePattern: /(^|\n)\s*score\s*=\s*\d/,
            },
            {
              message: "After your changes, `score` should still be a number.",
              assert: "return typeof score === 'number';",
            },
          ],
          reveal: "let score = 0;\nconsole.log(score);\nscore = 50;\nconsole.log(score);\n",
          anyValues: true,
        },
        {
          id: "score-player-name",
          instruction: "Declare a `const` called `playerName` with any name. Log it.",
          hint: 'const playerName = "Astra";\nconsole.log(playerName);',
          starterCode: "let score = 0;\nconsole.log(score);\nscore = 50;\nconsole.log(score);\n// Declare playerName with const and log it.\n",
          checks: [
            {
              message: "Use `const` to declare `playerName`.",
              requirePattern: /\bconst\s+playerName\b/,
            },
            {
              message: "`playerName` should be a non-empty string.",
              assert: "return typeof playerName === 'string' && playerName.length > 0;",
            },
            {
              message: "Log `playerName`.",
              requirePattern: /console\.log\s*\(\s*playerName\s*\)/,
            },
          ],
          reveal: "let score = 0;\nconsole.log(score);\nscore = 50;\nconsole.log(score);\nconst playerName = \"Astra\";\nconsole.log(playerName);\n",
          anyValues: true,
        },
        {
          id: "score-recap",
          instruction: "Build a recap line using a TEMPLATE LITERAL. Backticks (`) let you embed a variable directly inside a string with `${variable}`. Example: `Hello, ${name}!`. (Preview: covered properly in the Strings chapter.)\n\nLog a single line including both `playerName` and `score` inside one template literal.",
          starterCode: "let score = 0;\nconsole.log(score);\nscore = 50;\nconsole.log(score);\nconst playerName = \"Astra\";\nconsole.log(playerName);\n// Log a recap using a template literal: `${playerName} ... ${score}`.\n",
          checks: [
            {
              message: "Use a template literal that includes both `${playerName}` and `${score}`.",
              requirePattern: /`[^`]*\$\{\s*playerName\s*\}[^`]*\$\{\s*score\s*\}[^`]*`|`[^`]*\$\{\s*score\s*\}[^`]*\$\{\s*playerName\s*\}[^`]*`/,
            },
          ],
          reveal: "let score = 0;\nconsole.log(score);\nscore = 50;\nconsole.log(score);\nconst playerName = \"Astra\";\nconsole.log(playerName);\nconsole.log(`${playerName} scored ${score}`);\n",
          anyValues: true,
        },
      ],
    },

    // ──────────────────────────────────────────────────────────────────
    // Workshop 4 — Weather check (temp changes; location is fixed)
    // ──────────────────────────────────────────────────────────────────
    {
      kind: "js-workshop",
      title: "Workshop: weather check",
      prompt: "Temperature swings hour to hour; the place name doesn't.",
      designNote:
        "L1 W4. Same teaching arc. Surface: weather — temperatureC + location.",
      steps: [
        {
          id: "weather-declare-temp",
          instruction: "Declare a `let` called `temperatureC` with any number. Log it.",
          hint: "let temperatureC = 18;\nconsole.log(temperatureC);",
          starterCode: "// Declare temperatureC and log it.\n",
          checks: [
            {
              message: "Use `let` to declare a variable named `temperatureC`.",
              requirePattern: /\blet\s+temperatureC\b/,
            },
            {
              message: "`temperatureC` should be a number.",
              assert: "return typeof temperatureC === 'number';",
            },
            {
              message: "Log `temperatureC`.",
              requirePattern: /console\.log\s*\(\s*temperatureC\s*\)/,
            },
          ],
          reveal: "let temperatureC = 18;\nconsole.log(temperatureC);\n",
          anyValues: true,
        },
        {
          id: "weather-warmer",
          instruction: "The temperature changes — reassign `temperatureC` to a different number. Log it again.",
          hint: "temperatureC = 22;\nconsole.log(temperatureC);",
          starterCode: "let temperatureC = 18;\nconsole.log(temperatureC);\n// Reassign temperatureC to a different number and log it.\n",
          checks: [
            {
              message: "Reassign `temperatureC` to a number (no `let` on this line).",
              requirePattern: /(^|\n)\s*temperatureC\s*=\s*-?\d/,
            },
            {
              message: "After your changes, `temperatureC` should still be a number.",
              assert: "return typeof temperatureC === 'number';",
            },
          ],
          reveal: "let temperatureC = 18;\nconsole.log(temperatureC);\ntemperatureC = 22;\nconsole.log(temperatureC);\n",
          anyValues: true,
        },
        {
          id: "weather-location",
          instruction: "Declare a `const` called `location` with any place name. Log it.",
          hint: 'const location = "Hudiksvall";\nconsole.log(location);',
          starterCode: "let temperatureC = 18;\nconsole.log(temperatureC);\ntemperatureC = 22;\nconsole.log(temperatureC);\n// Declare location with const and log it.\n",
          checks: [
            {
              message: "Use `const` to declare `location`.",
              requirePattern: /\bconst\s+location\b/,
            },
            {
              message: "`location` should be a non-empty string.",
              assert: "return typeof location === 'string' && location.length > 0;",
            },
            {
              message: "Log `location`.",
              requirePattern: /console\.log\s*\(\s*location\s*\)/,
            },
          ],
          reveal: "let temperatureC = 18;\nconsole.log(temperatureC);\ntemperatureC = 22;\nconsole.log(temperatureC);\nconst location = \"Hudiksvall\";\nconsole.log(location);\n",
          anyValues: true,
        },
        {
          id: "weather-report",
          instruction: "Log a forecast line including both `temperatureC` and `location`. Use this exact string:\n\nIn Hudiksvall the temperature is 23 degrees today.\n\n…where you replace `Hudiksvall` with the variable `location` and `23` with the variable `temperatureC`. You can either use string concatenation (`+`, what you used in W2) or template literals (backticks, what you used in W3). The line must match the wording, spacing, and punctuation exactly.",
          hint: "// Either form works as long as the output is exact:\nconsole.log(`In ${location} the temperature is ${temperatureC} degrees today.`);\n// or\nconsole.log(\"In \" + location + \" the temperature is \" + temperatureC + \" degrees today.\");",
          starterCode: "let temperatureC = 18;\nconsole.log(temperatureC);\ntemperatureC = 22;\nconsole.log(temperatureC);\nconst location = \"Hudiksvall\";\nconsole.log(location);\n// Log the exact forecast line — see the instruction.\n",
          checks: [
            {
              message: "The forecast line must reference both `location` and `temperatureC` as variables (not hard-coded text).",
              // Require a console.log whose argument(s) mention BOTH variable
              // identifiers. Order-agnostic; doesn't care if the form is
              // concat or template literal.
              requirePattern: /console\.log\s*\([^)]*(?:\blocation\b[^)]*\btemperatureC\b|\btemperatureC\b[^)]*\blocation\b)[^)]*\)/,
            },
            {
              message: "The console must show exactly: `In <location> the temperature is <temperatureC> degrees today.` (substitute your variable values).",
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
          reveal: "let temperatureC = 18;\nconsole.log(temperatureC);\ntemperatureC = 22;\nconsole.log(temperatureC);\nconst location = \"Hudiksvall\";\nconsole.log(location);\nconsole.log(`In ${location} the temperature is ${temperatureC} degrees today.`);\n",
          anyValues: true,
        },
      ],
    },

    // ──────────────────────────────────────────────────────────────────
    // Exercise 2 — Step counter
    // ──────────────────────────────────────────────────────────────────
    {
      kind: "exercise",
      title: "Lab: step counter",
      prompt: "A pedometer tracks steps walked across the day — the count grows as you walk more. Same `let` variable, updated multiple times.\n\n" +
          "User stories:\n" +
          "1. Declare a let `stepsWalked` starting at 0.\n" +
          "2. Reassign `stepsWalked` to three different positive numbers — morning, midday, and evening counts (each higher than the last).\n" +
          "3. After EACH reassignment, console.log `stepsWalked` so the console shows the progression.\n\n" +
          "Exactly three console.log lines, each printing a different ascending step count.",
      starterJs:
        "// 1. Declare stepsWalked with let, starting at 0:\n\n\n" +
        "// 2. Morning — reassign stepsWalked and log it:\n\n\n" +
        "// 3. Midday — reassign stepsWalked higher and log it:\n\n\n" +
        "// 4. Evening — reassign stepsWalked higher and log it:\n\n",
      tests: [
        {
          label: "Declares `stepsWalked` with let starting at 0",
          assert:
            "var src = window.__userSrc || '';" +
            "if (!/\\blet\\s+stepsWalked\\s*=\\s*0\\b/.test(src)) return false;" +
            "var lets = src.match(/\\blet\\s+stepsWalked\\b/g) || [];" +
            "return lets.length === 1;",
          hint: "Use `let stepsWalked = 0;` once.",
        },
        {
          label: "Reassigns `stepsWalked` at least three times (no second `let`)",
          assert:
            "var src = window.__userSrc || '';" +
            // Count "stepsWalked = N" assignment lines (number literal). The
            // initial `let stepsWalked = 0` counts as the first; we need at
            // least 4 total (1 declaration + 3 reassignments).
            "var assigns = src.match(/\\bstepsWalked\\s*=\\s*-?\\d/g) || [];" +
            "return assigns.length >= 4;",
          hint: "Reassign three more times after the declaration — e.g. `stepsWalked = 1500;`, then `stepsWalked = 4500;`, then `stepsWalked = 8500;`.",
        },
        {
          label: "Console shows three different ascending step counts",
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
          hint: "Three `console.log(stepsWalked);` calls, each AFTER a reassignment, each printing a higher number than the last.",
        },
      ],
      anyValues: true,
    },

    // ──────────────────────────────────────────────────────────────────
    // Exercise 3 — Battery monitor
    // ──────────────────────────────────────────────────────────────────
    {
      kind: "exercise",
      title: "Lab: battery monitor",
      prompt: "A phone's battery drains over the day. Use the `-` or `-=` operator to subtract from the current value MULTIPLE times — each drain mutates the same variable.\n\n" +
          "User stories:\n" +
          "1. Declare a let `batteryPercent` starting at 100.\n" +
          "2. Drain it at least TWICE — each drain uses the `-` operator on the current value (e.g. `batteryPercent = batteryPercent - 27` or the shorthand `batteryPercent -= 27`). No second `let`.\n" +
          "3. After EACH drain, console.log `batteryPercent` so the console shows the battery dropping.\n" +
          "4. `batteryPercent` must end between 0 and 100 inclusive.\n\n" +
          "At least two drains, at least two console.log lines.",
      starterJs:
        "// 1. Declare batteryPercent with let, starting at 100:\n\n\n" +
        "// 2. First drain (use - or -=), then log:\n\n\n" +
        "// 3. Second drain (use - or -=), then log:\n\n",
      tests: [
        {
          label: "Declares `batteryPercent` with let starting at 100",
          assert:
            "var src = window.__userSrc || '';" +
            "if (!/\\blet\\s+batteryPercent\\s*=\\s*100\\b/.test(src)) return false;" +
            "var lets = src.match(/\\blet\\s+batteryPercent\\b/g) || [];" +
            "return lets.length === 1;",
          hint: "Use `let batteryPercent = 100;` once.",
        },
        {
          label: "Drains `batteryPercent` at least twice using `-` or `-=`",
          assert:
            "var src = window.__userSrc || '';" +
            // Count drain operations. Accept either explicit
            // `batteryPercent = batteryPercent - N` or shorthand
            // `batteryPercent -= N`. Need at least 2 matches.
            "var re = /(?:^|\\n|;)\\s*batteryPercent\\s*(?:=\\s*batteryPercent\\s*-|-=)\\s*\\d/g;" +
            "var matches = src.match(re) || [];" +
            "return matches.length >= 2;",
          hint: "Two drains — e.g. `batteryPercent -= 27;` followed by `batteryPercent -= 18;`. Don't reassign to a plain literal.",
        },
        {
          label: "Console shows the battery dropping (at least 2 lines, each lower than the last)",
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
          hint: "After EACH drain, `console.log(batteryPercent);` — the console should show two (or more) numbers, each smaller than the previous.",
        },
        {
          label: "batteryPercent stays between 0 and 100 inclusive",
          assert:
            "if (typeof batteryPercent !== 'number') return false;" +
            "return batteryPercent >= 0 && batteryPercent <= 100;",
          hint: "Pick drain amounts so batteryPercent doesn't go negative.",
        },
      ],
    },

    // ──────────────────────────────────────────────────────────────────
    // Exercise 4 — Quiz scoreboard (two lets + one const)
    // ──────────────────────────────────────────────────────────────────
    {
      kind: "exercise",
      title: "Lab: quiz scoreboard",
      prompt: "Run a small quiz and track two counters — answers correct and answers wrong — against a fixed total. This lab is about TWO let variables coexisting with one const.\n\n" +
          "User stories:\n" +
          "1. Declare a const `totalQuestions` with a positive number (the quiz length).\n" +
          "2. Declare a let `correctAnswers` starting at 0.\n" +
          "3. Declare a let `wrongAnswers` starting at 0.\n" +
          "4. Earn answers: add to BOTH `correctAnswers` and `wrongAnswers` using `+` or `+=` (the two together should equal `totalQuestions`).\n" +
          "5. console.log a single line that includes ALL THREE values: `correctAnswers`, `wrongAnswers`, and `totalQuestions`.",
      starterJs:
        "// 1. Declare totalQuestions with const:\n\n\n" +
        "// 2. Declare correctAnswers with let, starting at 0:\n\n\n" +
        "// 3. Declare wrongAnswers with let, starting at 0:\n\n\n" +
        "// 4. Add to correctAnswers (use + or +=):\n\n\n" +
        "// 5. Add to wrongAnswers (use + or +=):\n\n\n" +
        "// 6. console.log one line with all three:\n\n",
      tests: [
        {
          label: "Declares `totalQuestions` with const and a positive number",
          assert:
            "var src = window.__userSrc || '';" +
            "if (!/\\bconst\\s+totalQuestions\\s*=\\s*\\d/.test(src)) return false;" +
            "return typeof totalQuestions === 'number' && totalQuestions > 0;",
          hint: "Use `const totalQuestions = 10;` (or any positive number).",
        },
        {
          label: "Declares `correctAnswers` and `wrongAnswers` with let, both starting at 0",
          assert:
            "var src = window.__userSrc || '';" +
            "if (!/\\blet\\s+correctAnswers\\s*=\\s*0\\b/.test(src)) return false;" +
            "if (!/\\blet\\s+wrongAnswers\\s*=\\s*0\\b/.test(src)) return false;" +
            "var c = src.match(/\\blet\\s+correctAnswers\\b/g) || [];" +
            "var w = src.match(/\\blet\\s+wrongAnswers\\b/g) || [];" +
            "return c.length === 1 && w.length === 1;",
          hint: "Two separate `let` declarations — `let correctAnswers = 0;` and `let wrongAnswers = 0;`.",
        },
        {
          label: "Adds to both counters using `+` or `+=` (no second `let`)",
          assert:
            "var src = window.__userSrc || '';" +
            // Each counter must show an additive mutation: either
            // `x = x + N` or `x += N`. Order-independent.
            "var correctOp = /(?:^|\\n|;)\\s*correctAnswers\\s*(?:=\\s*correctAnswers\\s*\\+|\\+=)\\s*\\d/.test(src);" +
            "var wrongOp = /(?:^|\\n|;)\\s*wrongAnswers\\s*(?:=\\s*wrongAnswers\\s*\\+|\\+=)\\s*\\d/.test(src);" +
            "if (!correctOp || !wrongOp) return false;" +
            "if (typeof correctAnswers !== 'number' || typeof wrongAnswers !== 'number') return false;" +
            "return correctAnswers > 0 && wrongAnswers > 0;",
          hint: "Two additive mutations — e.g. `correctAnswers += 7;` and `wrongAnswers += 3;`. Each counter must end above 0.",
        },
        {
          label: "Console line includes all three values: correctAnswers, wrongAnswers, totalQuestions",
          assert:
            "var c = window.__console || [];" +
            "if (c.length !== 1) return false;" +
            "var t = c[0].text;" +
            "if (typeof correctAnswers !== 'number' || typeof wrongAnswers !== 'number' || typeof totalQuestions !== 'number') return false;" +
            "if (t.indexOf(String(correctAnswers)) === -1) return false;" +
            "if (t.indexOf(String(wrongAnswers)) === -1) return false;" +
            "return t.indexOf(String(totalQuestions)) !== -1;",
          hint: "One line that shows all three numbers — e.g. `` `${correctAnswers} correct, ${wrongAnswers} wrong, out of ${totalQuestions}` `` (template literal).",
        },
      ],
      anyValues: true,
    },
  ],
};
