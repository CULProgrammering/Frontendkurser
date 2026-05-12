// Single-language project (English). The `Loc` alias is now just `string`,
// and `t()` is essentially an identity function — both kept so existing call
// sites keep compiling without a global churn.
//
// Previously this module supported two languages with `{ en, sv }` objects.
// Swedish was retired; the `Lang` type and the second argument to `t()` are
// kept as no-ops for backward compatibility with code that still passes a
// `lang` value around. New code should treat `Loc` as a plain string and
// drop the second `t()` argument.

export type Loc = string;
export type Lang = "en";
// Back-compat alias; existing code that imported the old `{ en, sv }` shape
// can keep its imports. New code should use `string` (or `Loc`) directly.
export type LocalizedString = string;

export function t(value: Loc | undefined, _lang?: unknown): string {
  return value ?? "";
}
