#!/usr/bin/env node
/**
 * One-shot migration script: replace every `{ en: "X", sv: "Y" }` literal in
 * the given files with just `"X"`. The Loc type accepts plain strings, so
 * the resulting code keeps working without further changes.
 *
 * Handles multi-line literals with `+`-concatenated string segments.
 *
 * Usage: node scripts/strip-swedish.mjs <file1> [<file2> ...]
 */
import fs from "node:fs";

// Match a string literal: double-quoted, single-quoted, or template-literal
// (no ${} interpolation — none of our Loc values use it).
const STR = "(?:\"(?:[^\"\\\\]|\\\\.)*\"|'(?:[^'\\\\]|\\\\.)*'|`[^`]*`)";
// One or more string literals joined by `+`, with arbitrary whitespace
// (including newlines) between them.
const STR_CONCAT = `${STR}(?:\\s*\\+\\s*${STR})*`;

// `{ en: <concat>, sv: <concat>, }`  — captures the en value.
const LOC_RE = new RegExp(
  `\\{\\s*en\\s*:\\s*(${STR_CONCAT})\\s*,\\s*sv\\s*:\\s*${STR_CONCAT}\\s*,?\\s*\\}`,
  "g",
);

const files = process.argv.slice(2);
if (files.length === 0) {
  console.error("Usage: node scripts/strip-swedish.mjs <file1> [<file2> ...]");
  process.exit(1);
}

let totalReplacements = 0;
for (const file of files) {
  const before = fs.readFileSync(file, "utf8");
  let count = 0;
  const after = before.replace(LOC_RE, (_match, en) => {
    count++;
    return en;
  });
  if (count > 0) {
    fs.writeFileSync(file, after);
    console.log(`  ${file}: ${count} replacements`);
    totalReplacements += count;
  }
}
console.log(`\nTotal: ${totalReplacements} Loc literals stripped`);
