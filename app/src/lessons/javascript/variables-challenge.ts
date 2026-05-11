import type { ExerciseSlide } from "../../types";

/**
 * Variables-topic challenge: budget tracker.
 *
 * Single-shot freeform exercise that asks the student to apply concepts from
 * every Variables lesson:
 *   L1 — let, const for declaration choices
 *   L2 — number type, typeof / coercion awareness
 *   L3 — arithmetic and comparison operators
 *   L4 — Number.isNaN for sanitising bad input
 *
 * 12 user stories — 6+ console lines, the right declarations, the right
 * arithmetic, a comparison, a Number.isNaN guard, and a category label.
 */
export const variablesChallenge: ExerciseSlide = {
  kind: "exercise",
  title: { en: "Challenge: budget tracker", sv: "Utmaning: budgetspårare" },
  prompt: {
    en:
      "Build a tiny budget tracker that reports your monthly remainder.\n\n" +
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
    sv:
      "Bygg en liten budgetspårare som rapporterar månadens rest.\n\n" +
      "Användarberättelser:\n" +
      "1. Deklarera `income` som ett icke-negativt tal.\n" +
      "2. Deklarera `fixedExpenses` som ett icke-negativt tal.\n" +
      "3. Deklarera `variableExpenses` som ett icke-negativt tal.\n" +
      "4. Räkna ut `totalExpenses` från de två utgiftsvärdena.\n" +
      "5. Räkna ut `remainder = income - totalExpenses`.\n" +
      "6. Använd en jämförelseoperator (`>`, `<`, `===`, m.fl.) någonstans.\n" +
      "7. Använd `Number.isNaN` någonstans för att skydda mot NaN.\n" +
      "8. Använd BÅDE `let` och `const` minst en gång.\n" +
      "9. Använd en template-literal (backticks med `${}`).\n" +
      "10. Konsolen visar minst 6 rader.\n" +
      "11. En rad ska innehålla restbeloppet.\n" +
      "12. En rad ska innehålla något av orden \"saver\", \"breaking even\" eller \"deficit\".",
  },
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
      label: {
        en: "Declares `income` as a non-negative number",
        sv: "Deklarerar `income` som ett icke-negativt tal",
      },
      assert:
        "if (typeof income !== 'number') return false;" +
        "if (Number.isNaN(income)) return false;" +
        "return income >= 0;",
      hint: {
        en: "Use `let income = ...;` or `const income = ...;` with a non-negative number.",
        sv: "Använd `let income = ...;` eller `const income = ...;` med ett icke-negativt tal.",
      },
    },
    {
      label: {
        en: "Declares `fixedExpenses` as a non-negative number",
        sv: "Deklarerar `fixedExpenses` som ett icke-negativt tal",
      },
      assert:
        "if (typeof fixedExpenses !== 'number') return false;" +
        "if (Number.isNaN(fixedExpenses)) return false;" +
        "return fixedExpenses >= 0;",
      hint: {
        en: "Add `let fixedExpenses = ...;` (or const) with a number ≥ 0.",
        sv: "Lägg till `let fixedExpenses = ...;` (eller const) med ett tal ≥ 0.",
      },
    },
    {
      label: {
        en: "Declares `variableExpenses` as a non-negative number",
        sv: "Deklarerar `variableExpenses` som ett icke-negativt tal",
      },
      assert:
        "if (typeof variableExpenses !== 'number') return false;" +
        "if (Number.isNaN(variableExpenses)) return false;" +
        "return variableExpenses >= 0;",
      hint: {
        en: "Add `let variableExpenses = ...;` (or const) with a number ≥ 0.",
        sv: "Lägg till `let variableExpenses = ...;` (eller const) med ett tal ≥ 0.",
      },
    },
    {
      label: {
        en: "Computes `totalExpenses` from the two expense values",
        sv: "Räknar ut `totalExpenses` från de två utgiftsvärdena",
      },
      assert:
        "if (typeof totalExpenses !== 'number') return false;" +
        "if (Number.isNaN(totalExpenses)) return false;" +
        "return totalExpenses === fixedExpenses + variableExpenses;",
      hint: {
        en: "Compute `totalExpenses = fixedExpenses + variableExpenses;`.",
        sv: "Räkna ut `totalExpenses = fixedExpenses + variableExpenses;`.",
      },
    },
    {
      label: {
        en: "Computes `remainder` as income minus totalExpenses",
        sv: "Räknar ut `remainder` som income minus totalExpenses",
      },
      assert:
        "if (typeof remainder !== 'number') return false;" +
        "return remainder === income - totalExpenses;",
      hint: {
        en: "Compute `remainder = income - totalExpenses;`.",
        sv: "Räkna ut `remainder = income - totalExpenses;`.",
      },
    },
    {
      label: {
        en: "Uses a comparison operator somewhere",
        sv: "Använder en jämförelseoperator någonstans",
      },
      assert:
        "var src = window.__userSrc || '';" +
        "return /(?:>=|<=|===|!==|>|<)/.test(src);",
      hint: {
        en: "Use `>`, `<`, `>=`, `<=`, `===`, or `!==` somewhere — for example to pick the category.",
        sv: "Använd `>`, `<`, `>=`, `<=`, `===` eller `!==` någonstans — t.ex. för att välja kategori.",
      },
    },
    {
      label: {
        en: "Uses `Number.isNaN` somewhere",
        sv: "Använder `Number.isNaN` någonstans",
      },
      assert:
        "var src = window.__userSrc || '';" +
        "return /\\bNumber\\.isNaN\\s*\\(/.test(src);",
      hint: {
        en: "Call `Number.isNaN(remainder)` (or another value) to guard against NaN.",
        sv: "Anropa `Number.isNaN(remainder)` (eller annat värde) för att skydda mot NaN.",
      },
    },
    {
      label: {
        en: "Uses both `let` and `const` at least once",
        sv: "Använder både `let` och `const` minst en gång",
      },
      assert:
        "var src = window.__userSrc || '';" +
        "return /\\blet\\s+\\w+/.test(src) && /\\bconst\\s+\\w+/.test(src);",
      hint: {
        en: "Pick one fixed value (e.g. a label) for `const`, and one mutable value for `let`.",
        sv: "Välj ett fast värde (t.ex. en etikett) för `const`, och ett föränderligt värde för `let`.",
      },
    },
    {
      label: {
        en: "Uses a template literal (backticks with `${...}`)",
        sv: "Använder en template-literal (backticks med `${...}`)",
      },
      assert:
        "var src = window.__userSrc || '';" +
        "return /`[^`]*\\$\\{[^`]*`/.test(src);",
      hint: {
        en: "Build at least one log line with backticks: `` `Remainder: ${remainder} kr` ``.",
        sv: "Bygg minst en rad med backticks: `` `Rest: ${remainder} kr` ``.",
      },
    },
    {
      label: {
        en: "Console output has at least 6 lines",
        sv: "Konsolen har minst 6 rader",
      },
      assert: "var c = window.__console || []; return c.length >= 6;",
      hint: {
        en: "Make at least 6 `console.log` calls — one per value plus the summary lines.",
        sv: "Gör minst 6 `console.log`-anrop — ett per värde plus sammanfattningar.",
      },
    },
    {
      label: {
        en: "One console line mentions the remainder amount",
        sv: "En konsolrad nämner restbeloppet",
      },
      assert:
        "var c = window.__console || [];" +
        "if (typeof remainder !== 'number') return false;" +
        "var needle = String(remainder);" +
        "for (var i = 0; i < c.length; i++) {" +
        "  if (c[i].text.indexOf(needle) !== -1) return true;" +
        "}" +
        "return false;",
      hint: {
        en: "Log a line that includes the value of `remainder` — e.g. `` `Remainder: ${remainder} kr` ``.",
        sv: "Logga en rad som innehåller `remainder` — t.ex. `` `Rest: ${remainder} kr` ``.",
      },
    },
    {
      label: {
        en: 'One console line contains "saver", "breaking even", or "deficit"',
        sv: 'En konsolrad innehåller "saver", "breaking even" eller "deficit"',
      },
      assert:
        "var c = window.__console || [];" +
        "for (var i = 0; i < c.length; i++) {" +
        "  var t = c[i].text.toLowerCase();" +
        "  if (t.indexOf('saver') !== -1) return true;" +
        "  if (t.indexOf('breaking even') !== -1) return true;" +
        "  if (t.indexOf('deficit') !== -1) return true;" +
        "}" +
        "return false;",
      hint: {
        en:
          "Use a comparison to pick a category, then log it — e.g. `remainder > 0 ? \"saver\" : remainder === 0 ? \"breaking even\" : \"deficit\"`.",
        sv:
          "Välj kategori med en jämförelse och logga den — t.ex. `remainder > 0 ? \"saver\" : remainder === 0 ? \"breaking even\" : \"deficit\"`.",
      },
    },
  ],
  flexibility: { values: true },
};
