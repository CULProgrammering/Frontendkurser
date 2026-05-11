import { useEffect, useState } from "react";
import { useLang } from "../i18n/LanguageContext";
import { t } from "../i18n";
import { ui } from "../i18n/strings";
import type { FlexibilityFlags } from "../types";

type Props = {
  /**
   * Which dimensions are flexible IN THIS STEP. Drives both whether the
   * popover renders at all (must have at least one flag set; the parent
   * is expected to check this and gate the button) and which body copy
   * variant to show:
   *   - both true   → "values and names are flexible"
   *   - values only → "any value of the same datatype works"
   *   - names only  → "any variable name works"
   */
  flex: FlexibilityFlags;
};

/**
 * Inline "?" button shown in the workshop and exercise title rows. Opens a
 * modal with copy tailored to which dimensions are flexible IN THIS STEP —
 * not a generic disclaimer. Authors set `flexibility` per workshop step (or
 * per exercise slide) and the button vanishes on steps where neither values
 * nor names are flexible (e.g. L3 modulo / arithmetic steps where the value
 * IS the teaching point).
 *
 * The popover is dismissed by clicking the backdrop, the close button, or
 * pressing Escape.
 */
export function FlexibilityHelpButton({ flex }: Props) {
  const { lang } = useLang();
  const [open, setOpen] = useState(false);

  // Pick which copy variant to show based on the flags. We deliberately
  // don't fall back when no flag is set — the parent should not have
  // rendered us in the first place.
  const both = flex.values && flex.names;
  const valuesOnly = flex.values && !flex.names;
  const namesOnly = flex.names && !flex.values;
  const title = both
    ? ui.flexibilityHelpTitleBoth
    : valuesOnly
    ? ui.flexibilityHelpTitleValues
    : ui.flexibilityHelpTitleNames;
  const body = both
    ? ui.flexibilityHelpBodyBoth
    : valuesOnly
    ? ui.flexibilityHelpBodyValues
    : ui.flexibilityHelpBodyNames;

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        setOpen(false);
      }
    };
    // Capture phase so we close BEFORE SlideDeck's own Escape-to-exit fires.
    window.addEventListener("keydown", onKey, true);
    return () => window.removeEventListener("keydown", onKey, true);
  }, [open]);

  if (!flex.values && !flex.names) return null;

  return (
    <>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setOpen(true);
        }}
        aria-label={t(ui.flexibilityHelpButtonLabel, lang)}
        title={t(ui.flexibilityHelpButtonLabel, lang)}
        className="w-11 h-11 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shrink-0 transition-colors
                   bg-[#FBE8CF] hover:bg-[#f6dab3] active:bg-[#e6c890] text-[#C97A1F]
                   border border-[#C97A1F]/30
                   dark:bg-[#3a2a18] dark:hover:bg-[#4a3520] dark:active:bg-[#5a4028] dark:text-[#F0B274] dark:border-[#F0B274]/30"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          className="w-5 h-5"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
          />
        </svg>
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={t(title, lang)}
          onClick={(e) => {
            e.stopPropagation();
            if (e.target === e.currentTarget) setOpen(false);
          }}
          className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/50 cursor-default"
        >
          <div
            className="max-w-lg w-full rounded-xl p-6 cursor-default border-2 shadow-xl
                       bg-[#FBE8CF] border-[#C97A1F]/30
                       dark:bg-[#3a2a18] dark:border-[#F0B274]/30"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="text-[10px] font-mono font-medium uppercase tracking-[0.18em] text-[#C97A1F] dark:text-[#F0B274]">
                {t(title, lang)}
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setOpen(false);
                }}
                aria-label={lang === "sv" ? "Stäng" : "Close"}
                className="w-11 h-11 sm:w-7 sm:h-7 rounded-full flex items-center justify-center text-xl sm:text-lg leading-none transition-colors
                           text-[#C97A1F]/70 hover:bg-[#C97A1F]/10
                           dark:text-[#F0B274]/70 dark:hover:bg-[#F0B274]/10"
              >
                ×
              </button>
            </div>
            <div className="whitespace-pre-line leading-relaxed text-stone-800 dark:text-stone-100 text-sm sm:text-base">
              {t(body, lang)}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
