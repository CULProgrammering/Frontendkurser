// Two-language support. Authors of lesson content can write either a plain
// string (used as-is in both languages) or an object with explicit en/sv.

export type Lang = "en" | "sv";

export type LocalizedString = { en: string; sv: string };

/**
 * A user-facing string. Either a plain string (same in both languages —
 * intended for code, names, and other neutral text) or a localized object.
 */
export type Loc = string | LocalizedString;

export function t(value: Loc | undefined, lang: Lang): string {
  if (value === undefined) return "";
  if (typeof value === "string") return value;
  return value[lang];
}
