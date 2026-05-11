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

export type ConsoleEntry = { level: "log" | "error" | "warn" | "info"; text: string };

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

/**
 * Format a console.* argument the same way the iframe runner does so the
 * Workshop console preview matches what the student sees in the Exercise tier.
 */
function formatConsoleArg(a: unknown): string {
  if (typeof a === "string") return a;
  if (a === undefined) return "undefined";
  if (a === null) return "null";
  if (typeof a === "number" && Number.isNaN(a)) return "NaN";
  if (a === Infinity) return "Infinity";
  if (a === -Infinity) return "-Infinity";
  try {
    return JSON.stringify(a);
  } catch {
    return String(a);
  }
}

export function runWorkshopChecks(
  source: string,
  checks: WorkshopCheck[]
): CheckResult[] {
  const cleanSource = stripJsComments(source);
  return checks.map((check) => runOne(source, cleanSource, check));
}

/**
 * Like runWorkshopChecks but also runs the student's source once with console
 * patched, returning the captured output so the workshop view can preview what
 * the code logged. The capture pass is independent of the per-check evaluations
 * so a runtime error during the source eval doesn't corrupt the check results.
 */
export function runWorkshopChecksWithConsole(
  source: string,
  checks: WorkshopCheck[]
): { results: CheckResult[]; logs: ConsoleEntry[] } {
  const logs: ConsoleEntry[] = [];
  const orig = {
    log: console.log,
    error: console.error,
    warn: console.warn,
    info: console.info,
  };
  const patch = (level: ConsoleEntry["level"]) =>
    function (...args: unknown[]) {
      logs.push({ level, text: args.map(formatConsoleArg).join(" ") });
    };
  console.log = patch("log");
  console.error = patch("error");
  console.warn = patch("warn");
  console.info = patch("info");
  try {
    // Run the source for log capture. Surface any runtime error as a console
    // entry so the student sees it in the workshop console preview — that's
    // how lessons like "try to reassign a const" teach via the TypeError.
    try {
      new Function(source)();
    } catch (e) {
      const msg = e instanceof Error ? `${e.name}: ${e.message}` : String(e);
      logs.push({ level: "error", text: msg });
    }
  } finally {
    console.log = orig.log;
    console.error = orig.error;
    console.warn = orig.warn;
    console.info = orig.info;
  }
  const results = runWorkshopChecks(source, checks);
  return { results, logs };
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
    // Patch `console.log` in the OUTER JS scope (NOT inside the Function
    // body) so we can capture into `__logs` without introducing a try/catch
    // block scope that would hide the student's top-level `let`/`const`
    // from the assert. The function is invoked synchronously; the finally
    // restores `console.log` before runOne returns, so other code paths
    // (UI capture, React render logs) aren't affected.
    const capturedLogs: string[] = [];
    const origLog = console.log;
    console.log = (...args: unknown[]) => {
      capturedLogs.push(args.map(formatConsoleArg).join(" "));
    };
    try {
      // The student's source and the assert share a Function scope. The
      // assert is wrapped in an inner IIFE so its `return` doesn't conflict
      // with anything the student wrote — but it still closes over the
      // student's lexical bindings.
      //
      // Three lexical extras for asserts:
      //   - `__source`: the raw student source (for light source-walking
      //     like "did they reassign to a NEW string literal?").
      //   - `__logs`: array of formatted console.log output strings captured
      //     while running the student's code, in order. Lets asserts test
      //     exact console output without re-running the source.
      //   - The Function takes `__logs` as its first parameter so the assert
      //     reads the same array we populate in the outer scope.
      const body =
        "var __source = " + JSON.stringify(source) + ";\n" +
        source +
        "\n;return (function () {\n" +
        check.assert +
        "\n}).call(this);";
      const fn = new Function("__logs", body);
      const value = fn(capturedLogs);
      return value ? { pass: true } : { pass: false, kind: "assert" };
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      return { pass: false, kind: "error", error: msg };
    } finally {
      console.log = origLog;
    }
  }

  return { pass: true };
}
