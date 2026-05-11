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
const starter = (prev: string, n: number, hint: { en: string; sv: string }) => ({
  en: `${prev}// Step ${n}: ${hint.en}\n`,
  sv: `${prev}// Steg ${n}: ${hint.sv}\n`,
});

const reveal = (code: string) => ({ en: code, sv: code });

export const variablesWalkthrough: JsWorkshopSlide = {
  kind: "js-workshop",
  title: {
    en: "Walkthrough: tip calculator",
    sv: "Genomgång: dricksräknare",
  },
  prompt: {
    en:
      "Walk through declaring, computing, and reporting a tip from start to finish.",
    sv:
      "Gå igenom hur man deklarerar, räknar ut och rapporterar dricks från början till slut.",
  },
  designNote:
    "Variables-topic walkthrough — 20 cumulative steps. Each step adds one line or two and keeps the prior code intact. Touches every Variables lesson: let/const, types, operators, special values. Console-only (no DOM). Sweden — kr.",
  steps: [
    // 1
    {
      id: "wt-1-tip-percent",
      instruction: {
        en:
          "Start the tip calculator. Declare a `const` named `tipPercent` and set it to `0.15` (15%). It's a `const` because the rate is fixed for this script.",
        sv:
          "Starta dricksräknaren. Deklarera en `const` som heter `tipPercent` och sätt den till `0.15` (15 %). Det är `const` eftersom procentsatsen är fast i det här skriptet.",
      },
      starterCode: starter("", 1, {
        en: "declare const tipPercent = 0.15",
        sv: "deklarera const tipPercent = 0.15",
      }),
      checks: [
        {
          message: {
            en: "Use `const` to declare `tipPercent`.",
            sv: "Använd `const` för att deklarera `tipPercent`.",
          },
          requirePattern: /\bconst\s+tipPercent\b/,
        },
        {
          message: {
            en: "`tipPercent` should be exactly `0.15`.",
            sv: "`tipPercent` ska vara exakt `0.15`.",
          },
          assert: "return tipPercent === 0.15;",
        },
      ],
      reveal: reveal(R1),
    },
    // 2
    {
      id: "wt-2-bill",
      instruction: {
        en:
          "Below `tipPercent`, declare `let bill = 200;`. The bill might change later (a different table, a recalculated total), so use `let`.",
        sv:
          "Under `tipPercent`, deklarera `let bill = 200;`. Räkningen kan ändras senare (annat bord, ny summa), så använd `let`.",
      },
      starterCode: starter(R1, 2, {
        en: "declare let bill = 200",
        sv: "deklarera let bill = 200",
      }),
      checks: [
        {
          message: {
            en: "Use `let` to declare `bill`.",
            sv: "Använd `let` för att deklarera `bill`.",
          },
          requirePattern: /\blet\s+bill\b/,
        },
        {
          message: {
            en: "`bill` should be the number `200`.",
            sv: "`bill` ska vara talet `200`.",
          },
          assert: "return bill === 200;",
        },
      ],
      reveal: reveal(R2),
    },
    // 3
    {
      id: "wt-3-tip-amount",
      instruction: {
        en:
          "Compute the tip. Add `let tipAmount = bill * tipPercent;` — that's a number (`200 * 0.15`) which equals `30`.",
        sv:
          "Räkna ut dricksen. Lägg till `let tipAmount = bill * tipPercent;` — det blir ett tal (`200 * 0.15`) lika med `30`.",
      },
      starterCode: starter(R2, 3, {
        en: "let tipAmount = bill * tipPercent",
        sv: "let tipAmount = bill * tipPercent",
      }),
      checks: [
        {
          message: {
            en: "Compute `tipAmount` as `bill * tipPercent`.",
            sv: "Räkna ut `tipAmount` som `bill * tipPercent`.",
          },
          requirePattern: /\blet\s+tipAmount\s*=\s*bill\s*\*\s*tipPercent\b/,
        },
        {
          message: {
            en: "`tipAmount` should equal `30`.",
            sv: "`tipAmount` ska vara `30`.",
          },
          assert: "return tipAmount === 30;",
        },
      ],
      reveal: reveal(R3),
    },
    // 4
    {
      id: "wt-4-total",
      instruction: {
        en:
          "Add the tip to the bill. Declare `let total = bill + tipAmount;`. With a 200 kr bill and 30 kr tip, `total` becomes `230`.",
        sv:
          "Lägg dricksen till räkningen. Deklarera `let total = bill + tipAmount;`. Med 200 kr i räkning och 30 kr i dricks blir `total` `230`.",
      },
      starterCode: starter(R3, 4, {
        en: "let total = bill + tipAmount",
        sv: "let total = bill + tipAmount",
      }),
      checks: [
        {
          message: {
            en: "Declare `total` as `bill + tipAmount`.",
            sv: "Deklarera `total` som `bill + tipAmount`.",
          },
          requirePattern: /\blet\s+total\s*=\s*bill\s*\+\s*tipAmount\b/,
        },
        {
          message: {
            en: "`total` should equal `230`.",
            sv: "`total` ska vara `230`.",
          },
          assert: "return total === 230;",
        },
      ],
      reveal: reveal(R4),
    },
    // 5
    {
      id: "wt-5-log-total",
      instruction: {
        en:
          "Log the total: `console.log(total);`. Press Check — you'll see `230` in the console below the editor.",
        sv:
          "Logga totalen: `console.log(total);`. Tryck Kontrollera — `230` dyker upp i konsolen under editorn.",
      },
      starterCode: starter(R4, 5, {
        en: "console.log(total)",
        sv: "console.log(total)",
      }),
      checks: [
        {
          message: {
            en: "Call `console.log(total)`.",
            sv: "Anropa `console.log(total)`.",
          },
          requirePattern: /console\.log\s*\(\s*total\s*\)/,
        },
        {
          message: {
            en: "`total` should still equal `230` at this point.",
            sv: "`total` ska fortfarande vara `230` här.",
          },
          assert: "return total === 230;",
        },
      ],
      reveal: reveal(R5),
    },
    // 6
    {
      id: "wt-6-reassign-bill",
      instruction: {
        en:
          "Now reassign `bill` to `350` — note: NO `let` on this line. Reassignment uses just `=` with the existing variable. (This is why we picked `let` for `bill`.)",
        sv:
          "Omtilldela nu `bill` till `350` — observera: INGET `let` på denna rad. Omtilldelning använder bara `=` med den befintliga variabeln. (Det är därför vi valde `let` för `bill`.)",
      },
      starterCode: starter(R5, 6, {
        en: "bill = 350 (no let)",
        sv: "bill = 350 (inget let)",
      }),
      checks: [
        {
          message: {
            en: "Reassign `bill` to `350` (no `let`).",
            sv: "Omtilldela `bill` till `350` (inget `let`).",
          },
          requirePattern: /(^|\n)\s*bill\s*=\s*350\b/,
        },
        {
          message: {
            en: "After the reassignment, `bill` should be `350`.",
            sv: "Efter omtilldelningen ska `bill` vara `350`.",
          },
          assert: "return bill === 350;",
        },
      ],
      reveal: reveal(R6),
    },
    // 7
    {
      id: "wt-7-recompute",
      instruction: {
        en:
          "Recompute `tipAmount` and `total` after the new `bill`. Both already exist, so reassign without `let`:\n\n`tipAmount = bill * tipPercent;`\n`total = bill + tipAmount;`",
        sv:
          "Räkna om `tipAmount` och `total` efter nya `bill`. Båda finns redan, så omtilldela utan `let`:\n\n`tipAmount = bill * tipPercent;`\n`total = bill + tipAmount;`",
      },
      starterCode: starter(R6, 7, {
        en: "recompute tipAmount and total (no let)",
        sv: "räkna om tipAmount och total (inget let)",
      }),
      checks: [
        {
          message: {
            en: "Reassign `tipAmount` (no `let`).",
            sv: "Omtilldela `tipAmount` (inget `let`).",
          },
          requirePattern: /(^|\n)\s*tipAmount\s*=\s*bill\s*\*\s*tipPercent\b/,
        },
        {
          message: {
            en: "Reassign `total` (no `let`).",
            sv: "Omtilldela `total` (inget `let`).",
          },
          requirePattern: /(^|\n)\s*total\s*=\s*bill\s*\+\s*tipAmount\b/,
        },
        {
          message: {
            en: "After your changes, `total` should equal `402.5` (350 + 52.5).",
            sv: "Efter dina ändringar ska `total` vara `402.5` (350 + 52,5).",
          },
          assert: "return total === 402.5;",
        },
      ],
      reveal: reveal(R7),
    },
    // 8
    {
      id: "wt-8-log-new-total",
      instruction: {
        en:
          "Log the new total. Add another `console.log(total);` so the console now shows two lines: `230` and `402.5`.",
        sv:
          "Logga den nya totalen. Lägg till ett till `console.log(total);` så konsolen visar två rader: `230` och `402.5`.",
      },
      starterCode: starter(R7, 8, {
        en: "console.log(total) again",
        sv: "console.log(total) igen",
      }),
      checks: [
        {
          message: {
            en: "Call `console.log(total)`.",
            sv: "Anropa `console.log(total)`.",
          },
          requirePattern: /console\.log\s*\(\s*total\s*\)[\s\S]*console\.log\s*\(\s*total\s*\)/,
        },
        {
          message: {
            en: "`total` should equal `402.5` at the end.",
            sv: "`total` ska vara `402.5` på slutet.",
          },
          assert: "return total === 402.5;",
        },
      ],
      reveal: reveal(R8),
    },
    // 9
    {
      id: "wt-9-customer-concat",
      instruction: {
        en:
          "Add a customer name. Declare `const customer = \"Astrid\";` and log a sentence using string concatenation with `+`:\n\n`console.log(customer + \" owes \" + total + \" kr\");`",
        sv:
          "Lägg till ett kundnamn. Deklarera `const customer = \"Astrid\";` och logga en mening med strängkonkatenering via `+`:\n\n`console.log(customer + \" owes \" + total + \" kr\");`",
      },
      starterCode: starter(R8, 9, {
        en: "const customer + concat log",
        sv: "const customer + concat-logg",
      }),
      checks: [
        {
          message: {
            en: "Declare `const customer` with a non-empty string.",
            sv: "Deklarera `const customer` med en icke-tom sträng.",
          },
          requirePattern: /\bconst\s+customer\s*=\s*["'][^"']+["']/,
        },
        {
          message: {
            en: "Log a line that joins strings with `+` and includes both `customer` and `total`.",
            sv: "Logga en rad som slår ihop strängar med `+` och innehåller både `customer` och `total`.",
          },
          requirePattern:
            /console\.log\s*\([^)]*customer[^)]*\+[^)]*total[^)]*\)|console\.log\s*\([^)]*total[^)]*\+[^)]*customer[^)]*\)/,
        },
      ],
      reveal: reveal(R9),
    },
    // 10
    {
      id: "wt-10-template-literal",
      instruction: {
        en:
          "Replace concatenation with a TEMPLATE LITERAL — backticks let you embed variables with `${variable}`.\n\nAdd this line:\n\n`` console.log(`${customer} owes ${total} kr`); ``\n\n(Preview: covered properly in the Strings chapter.)",
        sv:
          "Byt ut konkateneringen mot en TEMPLATE-LITERAL — backticks gör att du kan stoppa in variabler med `${variabel}`.\n\nLägg till raden:\n\n`` console.log(`${customer} owes ${total} kr`); ``\n\n(Förhandstitt: behandlas ordentligt i Strings-kapitlet.)",
      },
      starterCode: starter(R9, 10, {
        en: "log with a template literal",
        sv: "logga med en template-literal",
      }),
      checks: [
        {
          message: {
            en: "Use a template literal that includes both `${customer}` and `${total}`.",
            sv: "Använd en template-literal som innehåller både `${customer}` och `${total}`.",
          },
          requirePattern:
            /`[^`]*\$\{\s*customer\s*\}[^`]*\$\{\s*total\s*\}[^`]*`|`[^`]*\$\{\s*total\s*\}[^`]*\$\{\s*customer\s*\}[^`]*`/,
        },
      ],
      reveal: reveal(R10),
    },
    // 11
    {
      id: "wt-11-vip-coercion",
      instruction: {
        en:
          "VIP customers get a 20% bigger tip. Declare `const isVip = true;`, then bump the tip with a multiplier:\n\n`tipAmount = tipAmount * (1 + 0.2 * isVip);`\n`total = bill + tipAmount;`\n\nWhy does this work without an `if`? When JS does math on a boolean it COERCES it to a number — `true` → `1`, `false` → `0`. So `1 + 0.2 * isVip` becomes `1.2` when `isVip` is true, `1.0` when false. (Same coercion idea as Lesson 2.)",
        sv:
          "VIP-kunder får 20 % större dricks. Deklarera `const isVip = true;` och bumpa sedan dricksen med en multiplikator:\n\n`tipAmount = tipAmount * (1 + 0.2 * isVip);`\n`total = bill + tipAmount;`\n\nVarför fungerar detta utan `if`? När JS räknar matte på en boolean så TVINGAS den till ett tal — `true` → `1`, `false` → `0`. Så `1 + 0.2 * isVip` blir `1.2` när `isVip` är true, `1.0` när false. (Samma coercion-idé som i Lektion 2.)",
      },
      starterCode: starter(R10, 11, {
        en: "const isVip = true; multiply tipAmount; recompute total",
        sv: "const isVip = true; multiplicera tipAmount; räkna om total",
      }),
      checks: [
        {
          message: {
            en: "Declare `const isVip` set to a boolean.",
            sv: "Deklarera `const isVip` satt till en boolean.",
          },
          requirePattern: /\bconst\s+isVip\s*=\s*(?:true|false)\b/,
        },
        {
          message: {
            en: "Reassign `tipAmount` using `tipAmount * (1 + 0.2 * isVip)`.",
            sv: "Omtilldela `tipAmount` med `tipAmount * (1 + 0.2 * isVip)`.",
          },
          requirePattern:
            /(^|\n)\s*tipAmount\s*=\s*tipAmount\s*\*\s*\(\s*1\s*\+\s*0\.2\s*\*\s*isVip\s*\)/,
        },
        {
          message: {
            en: "After the VIP bump, `total` should equal `413` (350 + 63).",
            sv: "Efter VIP-höjningen ska `total` vara `413` (350 + 63).",
          },
          assert: "return total === 413;",
        },
      ],
      reveal: reveal(R11),
    },
    // 12
    {
      id: "wt-12-comparison",
      instruction: {
        en:
          "Use a comparison operator to flag a small bill. Declare `let isCheap = bill < 100;`. Comparison operators (`<`, `>`, `<=`, `>=`, `===`, `!==`) always produce a boolean — here, `350 < 100` is `false`.",
        sv:
          "Använd en jämförelseoperator för att markera en liten räkning. Deklarera `let isCheap = bill < 100;`. Jämförelseoperatorer (`<`, `>`, `<=`, `>=`, `===`, `!==`) ger alltid en boolean — här blir `350 < 100` `false`.",
      },
      starterCode: starter(R11, 12, {
        en: "let isCheap = bill < 100",
        sv: "let isCheap = bill < 100",
      }),
      checks: [
        {
          message: {
            en: "Use `<` to compare `bill` to `100`.",
            sv: "Använd `<` för att jämföra `bill` med `100`.",
          },
          requirePattern: /\blet\s+isCheap\s*=\s*bill\s*<\s*100\b/,
        },
        {
          message: {
            en: "`isCheap` should be `false` (because bill is 350).",
            sv: "`isCheap` ska vara `false` (eftersom bill är 350).",
          },
          assert: "return isCheap === false;",
        },
      ],
      reveal: reveal(R12),
    },
    // 13
    {
      id: "wt-13-log-comparison",
      instruction: {
        en: "Log the comparison result: `console.log(isCheap);`.",
        sv: "Logga jämförelsen: `console.log(isCheap);`.",
      },
      starterCode: starter(R12, 13, {
        en: "console.log(isCheap)",
        sv: "console.log(isCheap)",
      }),
      checks: [
        {
          message: {
            en: "Call `console.log(isCheap)`.",
            sv: "Anropa `console.log(isCheap)`.",
          },
          requirePattern: /console\.log\s*\(\s*isCheap\s*\)/,
        },
      ],
      reveal: reveal(R13),
    },
    // 14
    {
      id: "wt-14-typeof",
      instruction: {
        en:
          "`typeof` reports the datatype as a string. Add three lines:\n\n`console.log(typeof tipPercent);`  // \"number\"\n`console.log(typeof customer);`    // \"string\"\n`console.log(typeof isVip);`       // \"boolean\"",
        sv:
          "`typeof` rapporterar datatypen som en sträng. Lägg till tre rader:\n\n`console.log(typeof tipPercent);`  // \"number\"\n`console.log(typeof customer);`    // \"string\"\n`console.log(typeof isVip);`       // \"boolean\"",
      },
      starterCode: starter(R13, 14, {
        en: "log typeof tipPercent, customer, isVip",
        sv: "logga typeof tipPercent, customer, isVip",
      }),
      checks: [
        {
          message: {
            en: "Log `typeof tipPercent`.",
            sv: "Logga `typeof tipPercent`.",
          },
          requirePattern: /console\.log\s*\(\s*typeof\s+tipPercent\s*\)/,
        },
        {
          message: {
            en: "Log `typeof customer`.",
            sv: "Logga `typeof customer`.",
          },
          requirePattern: /console\.log\s*\(\s*typeof\s+customer\s*\)/,
        },
        {
          message: {
            en: "Log `typeof isVip`.",
            sv: "Logga `typeof isVip`.",
          },
          requirePattern: /console\.log\s*\(\s*typeof\s+isVip\s*\)/,
        },
      ],
      reveal: reveal(R14),
    },
    // 15
    {
      id: "wt-15-coercion",
      instruction: {
        en:
          "Demonstrate string vs number coercion. Add two lines:\n\n`console.log(\"5\" + 3);`         // \"53\" — `+` with a string is concatenation\n`console.log(Number(\"5\") + 3);` // 8  — converting first gives real addition",
        sv:
          "Visa coercion mellan sträng och tal. Lägg till två rader:\n\n`console.log(\"5\" + 3);`         // \"53\" — `+` med en sträng blir konkatenering\n`console.log(Number(\"5\") + 3);` // 8  — konvertering först ger riktig addition",
      },
      starterCode: starter(R14, 15, {
        en: 'log "5" + 3 and Number("5") + 3',
        sv: 'logga "5" + 3 och Number("5") + 3',
      }),
      checks: [
        {
          message: {
            en: "Log `\"5\" + 3` (the concatenation case).",
            sv: "Logga `\"5\" + 3` (konkateneringsfallet).",
          },
          requirePattern: /console\.log\s*\(\s*["']5["']\s*\+\s*3\s*\)/,
        },
        {
          message: {
            en: "Log `Number(\"5\") + 3` (the conversion case).",
            sv: "Logga `Number(\"5\") + 3` (konverteringsfallet).",
          },
          requirePattern:
            /console\.log\s*\(\s*Number\s*\(\s*["']5["']\s*\)\s*\+\s*3\s*\)/,
        },
      ],
      reveal: reveal(R15),
    },
    // 16
    {
      id: "wt-16-undefined",
      instruction: {
        en:
          "Declare a variable without a value: `let middleName;`. JavaScript fills it with the special value `undefined`. Log it — the console will show `undefined`.",
        sv:
          "Deklarera en variabel utan värde: `let middleName;`. JavaScript fyller i specialvärdet `undefined`. Logga den — konsolen visar `undefined`.",
      },
      starterCode: starter(R15, 16, {
        en: "let middleName; console.log(middleName)",
        sv: "let middleName; console.log(middleName)",
      }),
      checks: [
        {
          message: {
            en: "Declare `middleName` with `let` and no initial value.",
            sv: "Deklarera `middleName` med `let` utan startvärde.",
          },
          requirePattern: /\blet\s+middleName\s*;/,
        },
        {
          message: {
            en: "Log `middleName`.",
            sv: "Logga `middleName`.",
          },
          requirePattern: /console\.log\s*\(\s*middleName\s*\)/,
        },
        {
          message: {
            en: "`middleName` should be `undefined`.",
            sv: "`middleName` ska vara `undefined`.",
          },
          assert: "return middleName === undefined;",
        },
      ],
      reveal: reveal(R16),
    },
    // 17
    {
      id: "wt-17-nan",
      instruction: {
        en:
          "Some math produces `NaN` (Not-a-Number). Add:\n\n`let bogus = \"abc\" * 2;`\n`console.log(bogus);`              // NaN\n`console.log(Number.isNaN(bogus));` // true\n\n`Number.isNaN` is the safe way to check — `NaN === NaN` is famously `false`.",
        sv:
          "Vissa beräkningar ger `NaN` (Not-a-Number). Lägg till:\n\n`let bogus = \"abc\" * 2;`\n`console.log(bogus);`              // NaN\n`console.log(Number.isNaN(bogus));` // true\n\n`Number.isNaN` är det säkra sättet att kolla — `NaN === NaN` är ökänt nog `false`.",
      },
      starterCode: starter(R16, 17, {
        en: 'create NaN with "abc" * 2 and detect with Number.isNaN',
        sv: 'skapa NaN med "abc" * 2 och upptäck med Number.isNaN',
      }),
      checks: [
        {
          message: {
            en: "Declare `bogus` from a string * number expression.",
            sv: "Deklarera `bogus` från en sträng * tal-uttryck.",
          },
          requirePattern:
            /\blet\s+bogus\s*=\s*["'][^"']+["']\s*\*\s*\d|\blet\s+bogus\s*=\s*\d+\s*\*\s*["'][^"']+["']/,
        },
        {
          message: {
            en: "Log `bogus`.",
            sv: "Logga `bogus`.",
          },
          requirePattern: /console\.log\s*\(\s*bogus\s*\)/,
        },
        {
          message: {
            en: "Log `Number.isNaN(bogus)`.",
            sv: "Logga `Number.isNaN(bogus)`.",
          },
          requirePattern: /console\.log\s*\(\s*Number\.isNaN\s*\(\s*bogus\s*\)\s*\)/,
        },
      ],
      reveal: reveal(R17),
    },
    // 18
    {
      id: "wt-18-nan-guard",
      instruction: {
        en:
          "Guard `total` against NaN. First, deliberately pollute it: `total = total + bogus;` (adding a number to NaN gives NaN). Then heal it with a NaN-aware fallback using a ternary:\n\n`total = Number.isNaN(total) ? 0 : total;`\n\nA ternary is `condition ? whenTrue : whenFalse` — preview from the Conditionals chapter, but the shape is small enough to use here.",
        sv:
          "Skydda `total` mot NaN. Förorena den först avsiktligt: `total = total + bogus;` (NaN + tal = NaN). Läk den sedan med en NaN-medveten fallback med ternary:\n\n`total = Number.isNaN(total) ? 0 : total;`\n\nEn ternary är `villkor ? omSant : omFalskt` — förhandstitt från Conditionals-kapitlet, men formen är liten nog att använda här.",
      },
      starterCode: starter(R17, 18, {
        en: "pollute total with bogus, then guard with Number.isNaN",
        sv: "förorena total med bogus och skydda sedan med Number.isNaN",
      }),
      checks: [
        {
          message: {
            en: "Add `total = total + bogus;`.",
            sv: "Lägg till `total = total + bogus;`.",
          },
          requirePattern: /(^|\n)\s*total\s*=\s*total\s*\+\s*bogus\b/,
        },
        {
          message: {
            en: "Guard with `Number.isNaN(total)` and a ternary that falls back to `0`.",
            sv: "Skydda med `Number.isNaN(total)` och en ternary som fallbackar till `0`.",
          },
          requirePattern:
            /(^|\n)\s*total\s*=\s*Number\.isNaN\s*\(\s*total\s*\)\s*\?\s*0\s*:\s*total\b/,
        },
        {
          message: {
            en: "After the guard, `total` should be `0`.",
            sv: "Efter skyddet ska `total` vara `0`.",
          },
          assert: "return total === 0;",
        },
      ],
      reveal: reveal(R18),
    },
    // 19
    {
      id: "wt-19-summary",
      instruction: {
        en:
          "Print a final summary line with a template literal that includes `customer`, `bill`, `tipAmount`, and `total`. For example:\n\n`` console.log(`${customer}: bill ${bill} kr, tip ${tipAmount} kr, total ${total} kr`); ``",
        sv:
          "Skriv en sammanfattningsrad med en template-literal som innehåller `customer`, `bill`, `tipAmount` och `total`. Till exempel:\n\n`` console.log(`${customer}: bill ${bill} kr, tip ${tipAmount} kr, total ${total} kr`); ``",
      },
      starterCode: starter(R18, 19, {
        en: "summary line with template literal",
        sv: "sammanfattningsrad med template-literal",
      }),
      checks: [
        {
          message: {
            en: "Use a template literal that interpolates `customer`, `bill`, `tipAmount`, and `total`.",
            sv: "Använd en template-literal som interpolerar `customer`, `bill`, `tipAmount` och `total`.",
          },
          requirePattern:
            /`[^`]*\$\{\s*customer\s*\}[^`]*\$\{\s*bill\s*\}[^`]*\$\{\s*tipAmount\s*\}[^`]*\$\{\s*total\s*\}[^`]*`/,
        },
        {
          message: {
            en: "Pass that template literal to `console.log`.",
            sv: "Skicka template-literalen till `console.log`.",
          },
          requirePattern: /console\.log\s*\(\s*`[^`]*\$\{[^`]*`\s*\)/,
        },
      ],
      reveal: reveal(R19),
    },
    // 20
    {
      id: "wt-20-rounded",
      instruction: {
        en:
          "Bonus polish — round to 2 decimals. Add:\n\n`const roundedTotal = Math.round(total * 100) / 100;`\n`console.log(roundedTotal);`\n\nMultiplying by 100, rounding, then dividing by 100 keeps two decimal places. (Since `total` is currently `0`, `roundedTotal` is also `0` — try changing earlier numbers to see other values.)",
        sv:
          "Bonusputs — avrunda till 2 decimaler. Lägg till:\n\n`const roundedTotal = Math.round(total * 100) / 100;`\n`console.log(roundedTotal);`\n\nMultiplicera med 100, avrunda, dela med 100 — två decimaler kvar. (Eftersom `total` just nu är `0` blir `roundedTotal` också `0` — testa att ändra tidigare siffror för att se andra värden.)",
      },
      starterCode: starter(R19, 20, {
        en: "const roundedTotal with Math.round; log it",
        sv: "const roundedTotal med Math.round; logga den",
      }),
      checks: [
        {
          message: {
            en: "Declare `const roundedTotal` using `Math.round(total * 100) / 100`.",
            sv: "Deklarera `const roundedTotal` med `Math.round(total * 100) / 100`.",
          },
          requirePattern:
            /\bconst\s+roundedTotal\s*=\s*Math\.round\s*\(\s*total\s*\*\s*100\s*\)\s*\/\s*100\b/,
        },
        {
          message: {
            en: "Log `roundedTotal`.",
            sv: "Logga `roundedTotal`.",
          },
          requirePattern: /console\.log\s*\(\s*roundedTotal\s*\)/,
        },
        {
          message: {
            en: "`roundedTotal` should be a finite number.",
            sv: "`roundedTotal` ska vara ett ändligt tal.",
          },
          assert:
            "return typeof roundedTotal === 'number' && Number.isFinite(roundedTotal);",
        },
      ],
      reveal: reveal(R20),
    },
  ],
  legend: [
    {
      name: { en: "let / const", sv: "let / const" },
      syntax: "let x = ...; const y = ...;",
      example: "let bill = 200;\nconst tipPercent = 0.15;",
      note: {
        en: "let allows reassignment, const does not.",
        sv: "let tillåter omtilldelning, const gör det inte.",
      },
    },
    {
      name: { en: "typeof", sv: "typeof" },
      syntax: "typeof value",
      example: 'typeof "Hi" // "string"',
      note: {
        en: "Reports the datatype as a string.",
        sv: "Rapporterar datatypen som en sträng.",
      },
    },
    {
      name: { en: "Number.isNaN", sv: "Number.isNaN" },
      syntax: "Number.isNaN(value)",
      example: "Number.isNaN(0/0) // true",
      note: {
        en: "The safe NaN check — `NaN === NaN` is false.",
        sv: "Det säkra NaN-testet — `NaN === NaN` är false.",
      },
    },
  ],
};
