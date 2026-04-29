// Runs the hybrid checks for one Workshop step.
//
// Two check modes per check:
//   - requirePattern: regex against the student's source (comments stripped).
//     STRUCTURAL gate — "did they use `let`?", "is there a comparison?".
//   - assert: a JS expression / statement-list. Run inside a Function whose
//     enclosing scope holds the student's source — so the assert body has
//     LEXICAL access to top-level `let` / `const` / `function` declarations
//     in the student's code without any AST rewriting.
//
// Authoring rule: don't write top-level `return` in a Workshop step's
// starterCode unless the assert calls a function the student declared. The
// student's top-level `return` would short-circuit out of the assert wrapper.

import type { WorkshopCheck } from "../types";

export type CheckResult =
  | { pass: true }
  | { pass: false; kind: "pattern" }
  | { pass: false; kind: "assert" }
  | { pass: false; kind: "error"; error: string };

/**
 * Strip JS comments before pattern matching so a student's "// for loop later"
 * comment doesn't satisfy a "for" check (fCC's removeJSComments equivalent).
 * Naive — handles line and block comments only. Doesn't try to be string-aware
 * because lesson regexes target keywords/operators, not literal contents.
 */
export function stripJsComments(src: string): string {
  return src
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\/\/[^\n]*/g, "");
}

export function runWorkshopChecks(
  source: string,
  checks: WorkshopCheck[]
): CheckResult[] {
  const cleanSource = stripJsComments(source);
  return checks.map((check) => runOne(source, cleanSource, check));
}

function runOne(
  source: string,
  cleanSource: string,
  check: WorkshopCheck
): CheckResult {
  if (check.requirePattern) {
    // Reset lastIndex defensively in case the same regex is reused with /g.
    check.requirePattern.lastIndex = 0;
    if (!check.requirePattern.test(cleanSource)) {
      return { pass: false, kind: "pattern" };
    }
  }

  if (check.assert) {
    try {
      // The student's source and the assert share a Function scope. The
      // assert is wrapped in an inner IIFE so its `return` doesn't conflict
      // with anything the student wrote — but it still closes over the
      // student's lexical bindings.
      const body =
        source +
        "\n;return (function () {\n" +
        check.assert +
        "\n}).call(this);";
      const fn = new Function(body);
      const value = fn();
      return value ? { pass: true } : { pass: false, kind: "assert" };
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      return { pass: false, kind: "error", error: msg };
    }
  }

  return { pass: true };
}
