// Runs user-authored JavaScript inside the page using `new Function`.
//
// Threat model: the student is the only one who sees their own code. We are
// not isolating against malicious input — we are catching syntax/runtime
// errors and returning them as data so the UI can show neutral feedback.
//
// Variable-based exercise model:
// The student writes code that uses pre-declared variables (e.g. `light`,
// `age`). For each test, we build a function whose body starts with
// `let varName = <test value>;` declarations followed by the student's code.
// Students can use `return` at "top level" (it returns from the wrapper).

import type { JsPrimitive } from "../types";

export type RunResult =
  | { ok: true; value: unknown }
  | { ok: false; error: string };

/**
 * Run the student's code with the given variables in scope. Returns whatever
 * `return`s from the body (or `undefined` if no return is reached).
 */
export function runUserCode(
  source: string,
  vars: Record<string, JsPrimitive>
): RunResult {
  try {
    const decls = Object.entries(vars)
      .map(([k, v]) => `let ${k} = ${JSON.stringify(v)};`)
      .join("\n");
    const body = decls + "\n" + source;
    const fn = new Function(body);
    const value = fn();
    return { ok: true, value };
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    return { ok: false, error: msg };
  }
}

export function deepEqual(a: unknown, b: unknown): boolean {
  if (Object.is(a, b)) return true;
  if (typeof a !== typeof b) return false;
  if (a === null || b === null) return false;
  if (typeof a === "object") {
    try {
      return JSON.stringify(a) === JSON.stringify(b);
    } catch {
      return false;
    }
  }
  return false;
}

export function describeValue(v: unknown): string {
  if (typeof v === "string") return JSON.stringify(v);
  if (v === undefined) return "undefined";
  if (v === null) return "null";
  if (typeof v === "object") {
    try {
      return JSON.stringify(v);
    } catch {
      return String(v);
    }
  }
  return String(v);
}
