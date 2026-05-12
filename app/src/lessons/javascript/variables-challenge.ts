import type { ExerciseSlide } from "../../types";

export const variablesChallenge: ExerciseSlide = {
  kind: "exercise",
  designNote:
    "Variables-topic challenge: budget tracker. Single-shot freeform " +
    "exercise applying every Variables lesson: L1 — let/const for " +
    "declaration choices, L2 — number type and typeof/coercion awareness, " +
    "L3 — arithmetic and comparison operators, L4 — Number.isNaN for " +
    "sanitising bad input. 12 user stories: 6+ console lines, the right " +
    "declarations, the right arithmetic, a comparison, a Number.isNaN " +
    "guard, and a category label.",
  title: "Challenge: budget tracker",
  prompt: "Build a tiny budget tracker that reports your monthly remainder.\n\n" +
      "User stories:\n" +
      "1. Declare `income` as a non-negative number.\n" +
      "2. Declare `fixedExpenses` as a non-negative number.\n" +
      "3. Declare `variableExpenses` as a non-negative number.\n" +
      "4. Compute `totalExpenses` from the two expense values.\n" +
      "5. Compute `remainder = income - totalExpenses`.\n" +
      "6. Use a comparison operator (`>`, `<`, `===`, etc.) somewhere in your code.\n" +
      "7. Use `Number.isNaN` somewhere to guard against a NaN result.\n" +
      "8. Use BOTH `let` and `const` at least once.\n" +
      "9. Use a template literal (backticks with `${}`) somewhere.\n" +
      "10. Console output has at least 6 lines.\n" +
      "11. One console line includes the remainder amount.\n" +
      "12. One console line includes one of these category words: \"saver\", \"breaking even\", or \"deficit\".",
  starterJs:
    "// 1. Declare income, fixedExpenses, variableExpenses.\n" +
    "//    Use let and const between them — at least one of each.\n\n\n" +
    "// 2. Compute totalExpenses and remainder.\n\n\n" +
    "// 3. Guard remainder against NaN with Number.isNaN.\n\n\n" +
    "// 4. Choose a category — \"saver\", \"breaking even\", or \"deficit\".\n" +
    "//    Use a comparison operator to decide.\n\n\n" +
    "// 5. Log at least 6 lines: include the remainder and the category,\n" +
    "//    and use a template literal at least once.\n\n",
  tests: [
    {
      label: "Declares `income` as a non-negative number",
      assert:
        "if (typeof income !== 'number') return false;" +
        "if (Number.isNaN(income)) return false;" +
        "return income >= 0;",
      hint: "Use `let income = ...;` or `const income = ...;` with a non-negative number.",
    },
    {
      label: "Declares `fixedExpenses` as a non-negative number",
      assert:
        "if (typeof fixedExpenses !== 'number') return false;" +
        "if (Number.isNaN(fixedExpenses)) return false;" +
        "return fixedExpenses >= 0;",
      hint: "Add `let fixedExpenses = ...;` (or const) with a number ≥ 0.",
    },
    {
      label: "Declares `variableExpenses` as a non-negative number",
      assert:
        "if (typeof variableExpenses !== 'number') return false;" +
        "if (Number.isNaN(variableExpenses)) return false;" +
        "return variableExpenses >= 0;",
      hint: "Add `let variableExpenses = ...;` (or const) with a number ≥ 0.",
    },
    {
      label: "Computes `totalExpenses` from the two expense values",
      assert:
        "if (typeof totalExpenses !== 'number') return false;" +
        "if (Number.isNaN(totalExpenses)) return false;" +
        "return totalExpenses === fixedExpenses + variableExpenses;",
      hint: "Compute `totalExpenses = fixedExpenses + variableExpenses;`.",
    },
    {
      label: "Computes `remainder` as income minus totalExpenses",
      assert:
        "if (typeof remainder !== 'number') return false;" +
        "return remainder === income - totalExpenses;",
      hint: "Compute `remainder = income - totalExpenses;`.",
    },
    {
      label: "Uses a comparison operator somewhere",
      assert:
        "var src = window.__userSrc || '';" +
        "return /(?:>=|<=|===|!==|>|<)/.test(src);",
      hint: "Use `>`, `<`, `>=`, `<=`, `===`, or `!==` somewhere — for example to pick the category.",
    },
    {
      label: "Uses `Number.isNaN` somewhere",
      assert:
        "var src = window.__userSrc || '';" +
        "return /\\bNumber\\.isNaN\\s*\\(/.test(src);",
      hint: "Call `Number.isNaN(remainder)` (or another value) to guard against NaN.",
    },
    {
      label: "Uses both `let` and `const` at least once",
      assert:
        "var src = window.__userSrc || '';" +
        "return /\\blet\\s+\\w+/.test(src) && /\\bconst\\s+\\w+/.test(src);",
      hint: "Pick one fixed value (e.g. a label) for `const`, and one mutable value for `let`.",
    },
    {
      label: "Uses a template literal (backticks with `${...}`)",
      assert:
        "var src = window.__userSrc || '';" +
        "return /`[^`]*\\$\\{[^`]*`/.test(src);",
      hint: "Build at least one log line with backticks: `` `Remainder: ${remainder} kr` ``.",
    },
    {
      label: "Console output has at least 6 lines",
      assert: "var c = window.__console || []; return c.length >= 6;",
      hint: "Make at least 6 `console.log` calls — one per value plus the summary lines.",
    },
    {
      label: "One console line mentions the remainder amount",
      assert:
        "var c = window.__console || [];" +
        "if (typeof remainder !== 'number') return false;" +
        "var needle = String(remainder);" +
        "for (var i = 0; i < c.length; i++) {" +
        "  if (c[i].text.indexOf(needle) !== -1) return true;" +
        "}" +
        "return false;",
      hint: "Log a line that includes the value of `remainder` — e.g. `` `Remainder: ${remainder} kr` ``.",
    },
    {
      label: 'One console line contains "saver", "breaking even", or "deficit"',
      assert:
        "var c = window.__console || [];" +
        "for (var i = 0; i < c.length; i++) {" +
        "  var t = c[i].text.toLowerCase();" +
        "  if (t.indexOf('saver') !== -1) return true;" +
        "  if (t.indexOf('breaking even') !== -1) return true;" +
        "  if (t.indexOf('deficit') !== -1) return true;" +
        "}" +
        "return false;",
      hint: "Use a comparison to pick a category, then log it — e.g. `remainder > 0 ? \"saver\" : remainder === 0 ? \"breaking even\" : \"deficit\"`.",
    },
  ],
  anyValues: true,
};
