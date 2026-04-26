// Runs user-authored JavaScript inside the page using `new Function`.
//
// Threat model: the student is the only one who sees their own code. We are
// not isolating against malicious input — we are catching syntax/runtime
// errors and returning them as data so the UI can show neutral feedback.
//
// Limitations:
// - Synchronous only. Any `await` in user code surfaces as an error.
// - Infinite loops freeze the tab. We don't try to interrupt; loop-free
//   conditionals lessons don't need it.
// - Equality is JSON-deep for objects, strict for primitives. Sufficient
//   for inputs/outputs in conditionals lessons.

export type RunResult =
  | { ok: true; value: unknown }
  | { ok: false; error: string };

export function runUserCode(
  source: string,
  fnName: string,
  input: unknown
): RunResult {
  try {
    const body =
      `${source}\n;` +
      `if (typeof ${fnName} !== "function") {\n` +
      `  throw new Error("Funktionen \\"${fnName}\\" hittades inte. ` +
      `Använd 'function ${fnName}(...) { ... }'.");\n` +
      `}\n` +
      `return ${fnName}(__input);`;
    const fn = new Function("__input", body);
    const value = fn(input);
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
