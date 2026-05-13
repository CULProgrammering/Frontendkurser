// Persistent storage helpers. We use localStorage so progress and in-progress
// editor content survive tab close, browser restart, and "open tomorrow"
// usage patterns the home-page "Continue — <lesson>" CTA implies. Function
// names retain the `session*` prefix for backwards compatibility with existing
// call sites — there are several across the slide views.
//
// Single switch for storage persistence. Flip to `true` to disable (e.g. for
// debugging "fresh student" flows). While disabled, every page load and
// lesson re-entry sees fresh starter code, no completion badges, etc.
const DISABLED = false;

export function sessionGet(key: string): string | null {
  if (DISABLED) return null;
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

export function sessionSet(key: string, value: string): void {
  if (DISABLED) return;
  try {
    localStorage.setItem(key, value);
  } catch {
    // ignore
  }
}
