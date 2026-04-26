import { useLang } from "../i18n/LanguageContext";

export function LanguageToggle() {
  const { lang, setLang } = useLang();
  const next = lang === "en" ? "sv" : "en";
  // Show the flag of the language you'd switch TO.
  const flag = next === "en" ? "🇬🇧" : "🇸🇪";
  const title = next === "en" ? "Switch to English" : "Byt till svenska";
  return (
    <button
      onClick={() => setLang(next)}
      title={title}
      aria-label={title}
      className="fixed top-4 right-20 z-50 w-9 h-9 flex items-center justify-center rounded-full ring-1 text-xl
                 bg-white ring-stone-200 shadow-sm hover:shadow
                 dark:bg-slate-800 dark:ring-white/10"
    >
      {flag}
    </button>
  );
}
