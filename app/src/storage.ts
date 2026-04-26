// Single switch for sessionStorage persistence. Flip to `false` to re-enable.
// While disabled, every page load (and lesson re-entry) sees fresh starter code,
// no completion badges, and the default language.
const DISABLED = true;

export function sessionGet(key: string): string | null {
  if (DISABLED) return null;
  try {
    return sessionStorage.getItem(key);
  } catch {
    return null;
  }
}

export function sessionSet(key: string, value: string): void {
  if (DISABLED) return;
  try {
    sessionStorage.setItem(key, value);
  } catch {
    // ignore
  }
}
