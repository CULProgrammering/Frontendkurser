import type { JsWorkshopSlide } from "../../types";

/**
 * Variables-topic walkthrough: a tip-calculator script grown step by step.
 *
 * Each step's reveal is the cumulative code through that step. Step N's
 * starterCode is step N-1's reveal plus a `// Step N: ...` placeholder.
 *
 * Concepts integrated (one Variables chapter per lesson):
 *   L1 — let, const, reassignment, naming
 *   L2 — types (string, number, boolean, typeof, coercion)
 *   L3 — operators (arithmetic, comparison, logical)
 *   L4 — special values (undefined, null, NaN, Number.isNaN)
 */

// Cumulative reveal strings — authored once, shared between step N's reveal
// and step N+1's starterCode (so the chain is provably consistent).

const R1 = `const tipPercent = 0.15;
`;

const R2 = `const tipPercent = 0.15;
let bill = 200;
`;

const R3 = `const tipPercent = 0.15;
let bill = 200;
let tipAmount = bill * tipPercent;
`;

const R4 = `const tipPercent = 0.15;
let bill = 200;
let tipAmount = bill * tipPercent;
let total = bill + tipAmount;
`;

const R5 = `const tipPercent = 0.15;
let bill = 200;
let tipAmount = bill * tipPercent;
let total = bill + tipAmount;
console.log(total);
`;

const R6 = `const tipPercent = 0.15;
let bill = 200;
let tipAmount = bill * tipPercent;
let total = bill + tipAmount;
console.log(total);
bill = 350;
`;

const R7 = `const tipPercent = 0.15;
let bill = 200;
let tipAmount = bill * tipPercent;
let total = bill + tipAmount;
console.log(total);
bill = 350;
tipAmount = bill * tipPercent;
total = bill + tipAmount;
`;

const R8 = `const tipPercent = 0.15;
let bill = 200;
let tipAmount = bill * tipPercent;
let total = bill + tipAmount;
console.log(total);
bill = 350;
tipAmount = bill * tipPercent;
total = bill + tipAmount;
console.log(total);
`;

const R9 = `const tipPercent = 0.15;
let bill = 200;
let tipAmount = bill * tipPercent;
let total = bill + tipAmount;
console.log(total);
bill = 350;
tipAmount = bill * tipPercent;
total = bill + tipAmount;
console.log(total);
const customer = "Astrid";
console.log(customer + " owes " + total + " kr");
`;

const R10 = `const tipPercent = 0.15;
let bill = 200;
let tipAmount = bill * tipPercent;
let total = bill + tipAmount;
console.log(total);
bill = 350;
tipAmount = bill * tipPercent;
total = bill + tipAmount;
console.log(total);
const customer = "Astrid";
console.log(customer + " owes " + total + " kr");
console.log(\`\${customer} owes \${total} kr\`);
`;

// Step 11: VIP multiplier via boolean coercion. We multiply tipAmount by
// (1 + 0.2 * isVip). When isVip is true, JS coerces true → 1, giving a 1.2x
// tip. When false, true → 0, giving 1.0x. This stays inside the Variables
// chapter (no `if` statement) and reinforces the coercion lesson from L2.
const R11 = `const tipPercent = 0.15;
let bill = 200;
let tipAmount = bill * tipPercent;
let total = bill + tipAmount;
console.log(total);
bill = 350;
tipAmount = bill * tipPercent;
total = bill + tipAmount;
console.log(total);
const customer = "Astrid";
console.log(customer + " owes " + total + " kr");
console.log(\`\${customer} owes \${total} kr\`);
const isVip = true;
tipAmount = tipAmount * (1 + 0.2 * isVip);
total = bill + tipAmount;
`;

const R12 = `const tipPercent = 0.15;
let bill = 200;
let tipAmount = bill * tipPercent;
let total = bill + tipAmount;
console.log(total);
bill = 350;
tipAmount = bill * tipPercent;
total = bill + tipAmount;
console.log(total);
const customer = "Astrid";
console.log(customer + " owes " + total + " kr");
console.log(\`\${customer} owes \${total} kr\`);
const isVip = true;
tipAmount = tipAmount * (1 + 0.2 * isVip);
total = bill + tipAmount;
let isCheap = bill < 100;
`;

const R13 = `const tipPercent = 0.15;
let bill = 200;
let tipAmount = bill * tipPercent;
let total = bill + tipAmount;
console.log(total);
bill = 350;
tipAmount = bill * tipPercent;
total = bill + tipAmount;
console.log(total);
const customer = "Astrid";
console.log(customer + " owes " + total + " kr");
console.log(\`\${customer} owes \${total} kr\`);
const isVip = true;
tipAmount = tipAmount * (1 + 0.2 * isVip);
total = bill + tipAmount;
let isCheap = bill < 100;
console.log(isCheap);
`;

const R14 = `const tipPercent = 0.15;
let bill = 200;
let tipAmount = bill * tipPercent;
let total = bill + tipAmount;
console.log(total);
bill = 350;
tipAmount = bill * tipPercent;
total = bill + tipAmount;
console.log(total);
const customer = "Astrid";
console.log(customer + " owes " + total + " kr");
console.log(\`\${customer} owes \${total} kr\`);
const isVip = true;
tipAmount = tipAmount * (1 + 0.2 * isVip);
total = bill + tipAmount;
let isCheap = bill < 100;
console.log(isCheap);
console.log(typeof tipPercent);
console.log(typeof customer);
console.log(typeof isVip);
`;

const R15 = `const tipPercent = 0.15;
let bill = 200;
let tipAmount = bill * tipPercent;
let total = bill + tipAmount;
console.log(total);
bill = 350;
tipAmount = bill * tipPercent;
total = bill + tipAmount;
console.log(total);
const customer = "Astrid";
console.log(customer + " owes " + total + " kr");
console.log(\`\${customer} owes \${total} kr\`);
const isVip = true;
tipAmount = tipAmount * (1 + 0.2 * isVip);
total = bill + tipAmount;
let isCheap = bill < 100;
console.log(isCheap);
console.log(typeof tipPercent);
console.log(typeof customer);
console.log(typeof isVip);
console.log("5" + 3);
console.log(Number("5") + 3);
`;

const R16 = `const tipPercent = 0.15;
let bill = 200;
let tipAmount = bill * tipPercent;
let total = bill + tipAmount;
console.log(total);
bill = 350;
tipAmount = bill * tipPercent;
total = bill + tipAmount;
console.log(total);
const customer = "Astrid";
console.log(customer + " owes " + total + " kr");
console.log(\`\${customer} owes \${total} kr\`);
const isVip = true;
tipAmount = tipAmount * (1 + 0.2 * isVip);
total = bill + tipAmount;
let isCheap = bill < 100;
console.log(isCheap);
console.log(typeof tipPercent);
console.log(typeof customer);
console.log(typeof isVip);
console.log("5" + 3);
console.log(Number("5") + 3);
let middleName;
console.log(middleName);
`;

const R17 = `const tipPercent = 0.15;
let bill = 200;
let tipAmount = bill * tipPercent;
let total = bill + tipAmount;
console.log(total);
bill = 350;
tipAmount = bill * tipPercent;
total = bill + tipAmount;
console.log(total);
const customer = "Astrid";
console.log(customer + " owes " + total + " kr");
console.log(\`\${customer} owes \${total} kr\`);
const isVip = true;
tipAmount = tipAmount * (1 + 0.2 * isVip);
total = bill + tipAmount;
let isCheap = bill < 100;
console.log(isCheap);
console.log(typeof tipPercent);
console.log(typeof customer);
console.log(typeof isVip);
console.log("5" + 3);
console.log(Number("5") + 3);
let middleName;
console.log(middleName);
let bogus = "abc" * 2;
console.log(bogus);
console.log(Number.isNaN(bogus));
`;

// Step 18: rebind `total` itself to a NaN-safe value. We deliberately pollute
// total with NaN first so the guard has something to catch, then reassign to 0.
const R18 = `const tipPercent = 0.15;
let bill = 200;
let tipAmount = bill * tipPercent;
let total = bill + tipAmount;
console.log(total);
bill = 350;
tipAmount = bill * tipPercent;
total = bill + tipAmount;
console.log(total);
const customer = "Astrid";
console.log(customer + " owes " + total + " kr");
console.log(\`\${customer} owes \${total} kr\`);
const isVip = true;
tipAmount = tipAmount * (1 + 0.2 * isVip);
total = bill + tipAmount;
let isCheap = bill < 100;
console.log(isCheap);
console.log(typeof tipPercent);
console.log(typeof customer);
console.log(typeof isVip);
console.log("5" + 3);
console.log(Number("5") + 3);
let middleName;
console.log(middleName);
let bogus = "abc" * 2;
console.log(bogus);
console.log(Number.isNaN(bogus));
total = total + bogus;
total = Number.isNaN(total) ? 0 : total;
`;

const R19 = `const tipPercent = 0.15;
let bill = 200;
let tipAmount = bill * tipPercent;
let total = bill + tipAmount;
console.log(total);
bill = 350;
tipAmount = bill * tipPercent;
total = bill + tipAmount;
console.log(total);
const customer = "Astrid";
console.log(customer + " owes " + total + " kr");
console.log(\`\${customer} owes \${total} kr\`);
const isVip = true;
tipAmount = tipAmount * (1 + 0.2 * isVip);
total = bill + tipAmount;
let isCheap = bill < 100;
console.log(isCheap);
console.log(typeof tipPercent);
console.log(typeof customer);
console.log(typeof isVip);
console.log("5" + 3);
console.log(Number("5") + 3);
let middleName;
console.log(middleName);
let bogus = "abc" * 2;
console.log(bogus);
console.log(Number.isNaN(bogus));
total = total + bogus;
total = Number.isNaN(total) ? 0 : total;
console.log(\`\${customer}: bill \${bill} kr, tip \${tipAmount} kr, total \${total} kr\`);
`;

const R20 = `const tipPercent = 0.15;
let bill = 200;
let tipAmount = bill * tipPercent;
let total = bill + tipAmount;
console.log(total);
bill = 350;
tipAmount = bill * tipPercent;
total = bill + tipAmount;
console.log(total);
const customer = "Astrid";
console.log(customer + " owes " + total + " kr");
console.log(\`\${customer} owes \${total} kr\`);
const isVip = true;
tipAmount = tipAmount * (1 + 0.2 * isVip);
total = bill + tipAmount;
let isCheap = bill < 100;
console.log(isCheap);
console.log(typeof tipPercent);
console.log(typeof customer);
console.log(typeof isVip);
console.log("5" + 3);
console.log(Number("5") + 3);
let middleName;
console.log(middleName);
let bogus = "abc" * 2;
console.log(bogus);
console.log(Number.isNaN(bogus));
total = total + bogus;
total = Number.isNaN(total) ? 0 : total;
console.log(\`\${customer}: bill \${bill} kr, tip \${tipAmount} kr, total \${total} kr\`);
const roundedTotal = Math.round(total * 100) / 100;
console.log(roundedTotal);
`;

// Helpers — build "previous reveal + placeholder comment" starter strings.
const starter = (prev: string, n: number, hint: string): string =>
  `${prev}// Step ${n}: ${hint}\n`;

const reveal = (code: string): string => code;

export const variablesWalkthrough: JsWorkshopSlide = {
  kind: "js-workshop",
  title: "Walkthrough: tip calculator",
  prompt: "Walk through declaring, computing, and reporting a tip from start to finish.",
  designNote:
    "Variables-topic walkthrough — 20 cumulative steps. Each step adds one line or two and keeps the prior code intact. Touches every Variables lesson: let/const, types, operators, special values. Console-only (no DOM). Sweden — kr.",
  steps: [
    // 1
    {
      id: "wt-1-tip-percent",
      instruction: "Start the tip calculator. Declare a `const` named `tipPercent` and set it to `0.15` (15%). It's a `const` because the rate is fixed for this script.",
      starterCode: starter("", 1, "declare const tipPercent = 0.15"),
      checks: [
        {
          message: "Use `const` to declare `tipPercent`.",
          requirePattern: /\bconst\s+tipPercent\b/,
        },
        {
          message: "`tipPercent` should be a number.",
          assert: "return typeof tipPercent === 'number';",
        },
      ],
      reveal: reveal(R1),
      anyValues: true,
    },
    // 2
    {
      id: "wt-2-bill",
      instruction: "Below `tipPercent`, declare `let bill = 200;`. The bill might change later (a different table, a recalculated total), so use `let`.",
      starterCode: starter(R1, 2, "declare let bill = 200"),
      checks: [
        {
          message: "Use `let` to declare `bill`.",
          requirePattern: /\blet\s+bill\b/,
        },
        {
          message: "`bill` should be a number.",
          assert: "return typeof bill === 'number';",
        },
      ],
      reveal: reveal(R2),
      anyValues: true,
    },
    // 3
    {
      id: "wt-3-tip-amount",
      instruction: "Compute the tip. Add `let tipAmount = bill * tipPercent;` — that's a number (`200 * 0.15`) which equals `30`.",
      starterCode: starter(R2, 3, "let tipAmount = bill * tipPercent"),
      checks: [
        {
          message: "Compute `tipAmount` as `bill * tipPercent`.",
          requirePattern: /\blet\s+tipAmount\s*=\s*bill\s*\*\s*tipPercent\b/,
        },
        {
          message: "`tipAmount` should equal `bill * tipPercent`.",
          assert: "return tipAmount === bill * tipPercent;",
        },
      ],
      reveal: reveal(R3),
      anyValues: true,
    },
    // 4
    {
      id: "wt-4-total",
      instruction: "Add the tip to the bill. Declare `let total = bill + tipAmount;`. With a 200 kr bill and 30 kr tip, `total` becomes `230`.",
      starterCode: starter(R3, 4, "let total = bill + tipAmount"),
      checks: [
        {
          message: "Declare `total` as `bill + tipAmount`.",
          requirePattern: /\blet\s+total\s*=\s*bill\s*\+\s*tipAmount\b/,
        },
        {
          message: "`total` should equal `bill + tipAmount`.",
          assert: "return total === bill + tipAmount;",
        },
      ],
      reveal: reveal(R4),
      anyValues: true,
    },
    // 5
    {
      id: "wt-5-log-total",
      instruction: "Log the total: `console.log(total);`. Press Check — you'll see `230` in the console below the editor.",
      starterCode: starter(R4, 5, "console.log(total)"),
      checks: [
        {
          message: "Call `console.log(total)`.",
          requirePattern: /console\.log\s*\(\s*total\s*\)/,
        },
        {
          message: "`total` should still be a number at this point.",
          assert: "return typeof total === 'number';",
        },
      ],
      reveal: reveal(R5),
      anyValues: true,
    },
    // 6
    {
      id: "wt-6-reassign-bill",
      instruction: "Now reassign `bill` to `350` — note: NO `let` on this line. Reassignment uses just `=` with the existing variable. (This is why we picked `let` for `bill`.)",
      starterCode: starter(R5, 6, "bill = 350 (no let)"),
      checks: [
        {
          message: "Reassign `bill` to a new number (no `let`).",
          requirePattern: /(^|\n)\s*bill\s*=\s*-?\d+(?:\.\d+)?\b/,
        },
        {
          message: "After the reassignment, `bill` should still be a number.",
          assert: "return typeof bill === 'number';",
        },
      ],
      reveal: reveal(R6),
      anyValues: true,
    },
    // 7
    {
      id: "wt-7-recompute",
      instruction: "Recompute `tipAmount` and `total` after the new `bill`. Both already exist, so reassign without `let`:\n\n`tipAmount = bill * tipPercent;`\n`total = bill + tipAmount;`",
      starterCode: starter(R6, 7, "recompute tipAmount and total (no let)"),
      checks: [
        {
          message: "Reassign `tipAmount` (no `let`).",
          requirePattern: /(^|\n)\s*tipAmount\s*=\s*bill\s*\*\s*tipPercent\b/,
        },
        {
          message: "Reassign `total` (no `let`).",
          requirePattern: /(^|\n)\s*total\s*=\s*bill\s*\+\s*tipAmount\b/,
        },
        {
          message: "After your changes, `total` should still equal `bill + tipAmount`.",
          assert: "return total === bill + tipAmount;",
        },
      ],
      reveal: reveal(R7),
      anyValues: true,
    },
    // 8
    {
      id: "wt-8-log-new-total",
      instruction: "Log the new total. Add another `console.log(total);` so the console now shows two lines: `230` and `402.5`.",
      starterCode: starter(R7, 8, "console.log(total) again"),
      checks: [
        {
          message: "Call `console.log(total)`.",
          requirePattern: /console\.log\s*\(\s*total\s*\)[\s\S]*console\.log\s*\(\s*total\s*\)/,
        },
        {
          message: "`total` should still be a number at the end.",
          assert: "return typeof total === 'number';",
        },
      ],
      reveal: reveal(R8),
      anyValues: true,
    },
    // 9
    {
      id: "wt-9-customer-concat",
      instruction: "Add a customer name. Declare `const customer = \"Astrid\";` and log a sentence using string concatenation with `+`:\n\n`console.log(customer + \" owes \" + total + \" kr\");`",
      starterCode: starter(R8, 9, "const customer + concat log"),
      checks: [
        {
          message: "Declare `const customer` with a non-empty string.",
          requirePattern: /\bconst\s+customer\s*=\s*["'][^"']+["']/,
        },
        {
          message: "Log a line that joins strings with `+` and includes both `customer` and `total`.",
          requirePattern:
            /console\.log\s*\([^)]*customer[^)]*\+[^)]*total[^)]*\)|console\.log\s*\([^)]*total[^)]*\+[^)]*customer[^)]*\)/,
        },
      ],
      reveal: reveal(R9),
      anyValues: true,
    },
    // 10
    {
      id: "wt-10-template-literal",
      instruction: "Replace concatenation with a TEMPLATE LITERAL — backticks let you embed variables with `${variable}`.\n\nAdd this line:\n\n`` console.log(`${customer} owes ${total} kr`); ``\n\n(Preview: covered properly in the Strings chapter.)",
      starterCode: starter(R9, 10, "log with a template literal"),
      checks: [
        {
          message: "Use a template literal that includes both `${customer}` and `${total}`.",
          requirePattern:
            /`[^`]*\$\{\s*customer\s*\}[^`]*\$\{\s*total\s*\}[^`]*`|`[^`]*\$\{\s*total\s*\}[^`]*\$\{\s*customer\s*\}[^`]*`/,
        },
      ],
      reveal: reveal(R10),
      anyValues: true,
    },
    // 11
    {
      id: "wt-11-vip-coercion",
      instruction: "VIP customers get a 20% bigger tip. Declare `const isVip = true;`, then bump the tip with a multiplier:\n\n`tipAmount = tipAmount * (1 + 0.2 * isVip);`\n`total = bill + tipAmount;`\n\nWhy does this work without an `if`? When JS does math on a boolean it COERCES it to a number — `true` → `1`, `false` → `0`. So `1 + 0.2 * isVip` becomes `1.2` when `isVip` is true, `1.0` when false. (Same coercion idea as Lesson 2.)",
      starterCode: starter(R10, 11, "const isVip = true; multiply tipAmount; recompute total"),
      checks: [
        {
          message: "Declare `const isVip` set to a boolean.",
          requirePattern: /\bconst\s+isVip\s*=\s*(?:true|false)\b/,
        },
        {
          message: "Reassign `tipAmount` using `tipAmount * (1 + <number> * isVip)`.",
          requirePattern:
            /(^|\n)\s*tipAmount\s*=\s*tipAmount\s*\*\s*\(\s*1\s*\+\s*\d+(?:\.\d+)?\s*\*\s*isVip\s*\)/,
        },
        {
          message: "After the VIP bump, `total` should still be a number.",
          assert: "return typeof total === 'number';",
        },
      ],
      reveal: reveal(R11),
      anyValues: true,
    },
    // 12
    {
      id: "wt-12-comparison",
      instruction: "Use a comparison operator to flag a small bill. Declare `let isCheap = bill < 100;`. Comparison operators (`<`, `>`, `<=`, `>=`, `===`, `!==`) always produce a boolean — here, `350 < 100` is `false`.",
      starterCode: starter(R11, 12, "let isCheap = bill < 100"),
      checks: [
        {
          message: "Use `<` to compare `bill` to a number.",
          requirePattern: /\blet\s+isCheap\s*=\s*bill\s*<\s*-?\d+(?:\.\d+)?\b/,
        },
        {
          message: "`isCheap` should be a boolean (comparisons always are).",
          assert: "return typeof isCheap === 'boolean';",
        },
      ],
      reveal: reveal(R12),
      anyValues: true,
    },
    // 13
    {
      id: "wt-13-log-comparison",
      instruction: "Log the comparison result: `console.log(isCheap);`.",
      starterCode: starter(R12, 13, "console.log(isCheap)"),
      checks: [
        {
          message: "Call `console.log(isCheap)`.",
          requirePattern: /console\.log\s*\(\s*isCheap\s*\)/,
        },
      ],
      reveal: reveal(R13),
      anyValues: true,
    },
    // 14
    {
      id: "wt-14-typeof",
      instruction: "`typeof` reports the datatype as a string. Add three lines:\n\n`console.log(typeof tipPercent);`  // \"number\"\n`console.log(typeof customer);`    // \"string\"\n`console.log(typeof isVip);`       // \"boolean\"",
      starterCode: starter(R13, 14, "log typeof tipPercent, customer, isVip"),
      checks: [
        {
          message: "Log `typeof tipPercent`.",
          requirePattern: /console\.log\s*\(\s*typeof\s+tipPercent\s*\)/,
        },
        {
          message: "Log `typeof customer`.",
          requirePattern: /console\.log\s*\(\s*typeof\s+customer\s*\)/,
        },
        {
          message: "Log `typeof isVip`.",
          requirePattern: /console\.log\s*\(\s*typeof\s+isVip\s*\)/,
        },
      ],
      reveal: reveal(R14),
      anyValues: true,
    },
    // 15
    {
      id: "wt-15-coercion",
      instruction: "Demonstrate string vs number coercion. Add two lines:\n\n`console.log(\"5\" + 3);`         // \"53\" — `+` with a string is concatenation\n`console.log(Number(\"5\") + 3);` // 8  — converting first gives real addition",
      starterCode: starter(R14, 15, 'log "5" + 3 and Number("5") + 3'),
      checks: [
        {
          message: "Log a string number `+` a real number (the concatenation case).",
          requirePattern: /console\.log\s*\(\s*["']\d+["']\s*\+\s*\d+\s*\)/,
        },
        {
          message: "Log `Number(\"...\") + <number>` (the conversion case).",
          requirePattern:
            /console\.log\s*\(\s*Number\s*\(\s*["']\d+["']\s*\)\s*\+\s*\d+\s*\)/,
        },
      ],
      reveal: reveal(R15),
      anyValues: true,
    },
    // 16
    {
      id: "wt-16-undefined",
      instruction: "Declare a variable without a value: `let middleName;`. JavaScript fills it with the special value `undefined`. Log it — the console will show `undefined`.",
      starterCode: starter(R15, 16, "let middleName; console.log(middleName)"),
      checks: [
        {
          message: "Declare `middleName` with `let` and no initial value.",
          requirePattern: /\blet\s+middleName\s*;/,
        },
        {
          message: "Log `middleName`.",
          requirePattern: /console\.log\s*\(\s*middleName\s*\)/,
        },
        {
          message: "`middleName` should be `undefined`.",
          assert: "return middleName === undefined;",
        },
      ],
      reveal: reveal(R16),
      anyValues: true,
    },
    // 17
    {
      id: "wt-17-nan",
      instruction: "Some math produces `NaN` (Not-a-Number). Add:\n\n`let bogus = \"abc\" * 2;`\n`console.log(bogus);`              // NaN\n`console.log(Number.isNaN(bogus));` // true\n\n`Number.isNaN` is the safe way to check — `NaN === NaN` is famously `false`.",
      starterCode: starter(R16, 17, 'create NaN with "abc" * 2 and detect with Number.isNaN'),
      checks: [
        {
          message: "Declare `bogus` from a string * number expression.",
          requirePattern:
            /\blet\s+bogus\s*=\s*["'][^"']+["']\s*\*\s*\d|\blet\s+bogus\s*=\s*\d+\s*\*\s*["'][^"']+["']/,
        },
        {
          message: "Log `bogus`.",
          requirePattern: /console\.log\s*\(\s*bogus\s*\)/,
        },
        {
          message: "Log `Number.isNaN(bogus)`.",
          requirePattern: /console\.log\s*\(\s*Number\.isNaN\s*\(\s*bogus\s*\)\s*\)/,
        },
      ],
      reveal: reveal(R17),
      anyValues: true,
    },
    // 18
    {
      id: "wt-18-nan-guard",
      instruction: "Guard `total` against NaN. First, deliberately pollute it: `total = total + bogus;` (adding a number to NaN gives NaN). Then heal it with a NaN-aware fallback using a ternary:\n\n`total = Number.isNaN(total) ? 0 : total;`\n\nA ternary is `condition ? whenTrue : whenFalse` — preview from the Conditionals chapter, but the shape is small enough to use here.",
      starterCode: starter(R17, 18, "pollute total with bogus, then guard with Number.isNaN"),
      checks: [
        {
          message: "Add `total = total + bogus;`.",
          requirePattern: /(^|\n)\s*total\s*=\s*total\s*\+\s*bogus\b/,
        },
        {
          message: "Guard with `Number.isNaN(total)` and a ternary that falls back to a number.",
          requirePattern:
            /(^|\n)\s*total\s*=\s*Number\.isNaN\s*\(\s*total\s*\)\s*\?\s*-?\d+(?:\.\d+)?\s*:\s*total\b/,
        },
        {
          message: "After the guard, `total` should be a number (the fallback).",
          assert: "return typeof total === 'number';",
        },
      ],
      reveal: reveal(R18),
      anyValues: true,
    },
    // 19
    {
      id: "wt-19-summary",
      instruction: "Print a final summary line with a template literal that includes `customer`, `bill`, `tipAmount`, and `total`. For example:\n\n`` console.log(`${customer}: bill ${bill} kr, tip ${tipAmount} kr, total ${total} kr`); ``",
      starterCode: starter(R18, 19, "summary line with template literal"),
      checks: [
        {
          message: "Use a template literal that interpolates `customer`, `bill`, `tipAmount`, and `total`.",
          requirePattern:
            /`[^`]*\$\{\s*customer\s*\}[^`]*\$\{\s*bill\s*\}[^`]*\$\{\s*tipAmount\s*\}[^`]*\$\{\s*total\s*\}[^`]*`/,
        },
        {
          message: "Pass that template literal to `console.log`.",
          requirePattern: /console\.log\s*\(\s*`[^`]*\$\{[^`]*`\s*\)/,
        },
      ],
      reveal: reveal(R19),
      anyValues: true,
    },
    // 20
    {
      id: "wt-20-rounded",
      instruction: "Bonus polish — round to 2 decimals. Add:\n\n`const roundedTotal = Math.round(total * 100) / 100;`\n`console.log(roundedTotal);`\n\nMultiplying by 100, rounding, then dividing by 100 keeps two decimal places. (Since `total` is currently `0`, `roundedTotal` is also `0` — try changing earlier numbers to see other values.)",
      starterCode: starter(R19, 20, "const roundedTotal with Math.round; log it"),
      checks: [
        {
          message: "Declare `const roundedTotal` using `Math.round(total * 100) / 100`.",
          requirePattern:
            /\bconst\s+roundedTotal\s*=\s*Math\.round\s*\(\s*total\s*\*\s*100\s*\)\s*\/\s*100\b/,
        },
        {
          message: "Log `roundedTotal`.",
          requirePattern: /console\.log\s*\(\s*roundedTotal\s*\)/,
        },
        {
          message: "`roundedTotal` should be a finite number.",
          assert:
            "return typeof roundedTotal === 'number' && Number.isFinite(roundedTotal);",
        },
      ],
      reveal: reveal(R20),
      anyValues: true,
    },
  ],
  legend: [
    {
      name: "let / const",
      syntax: "let x = ...; const y = ...;",
      example: "let bill = 200;\nconst tipPercent = 0.15;",
      note: "let allows reassignment, const does not.",
    },
    {
      name: "typeof",
      syntax: "typeof value",
      example: 'typeof "Hi" // "string"',
      note: "Reports the datatype as a string.",
    },
    {
      name: "Number.isNaN",
      syntax: "Number.isNaN(value)",
      example: "Number.isNaN(0/0) // true",
      note: "The safe NaN check — `NaN === NaN` is false.",
    },
  ],
};
