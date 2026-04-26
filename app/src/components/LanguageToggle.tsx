import { useLang } from "../i18n/LanguageContext";

export function LanguageToggle() {
  const { lang, setLang } = useLang();
  const next = lang === "en" ? "sv" : "en";
  const label = next === "en" ? "EN" : "SV";
  const title = next === "en" ? "Switch to English" : "Byt till svenska";
  return (
    <button
      onClick={() => setLang(next)}
      title={title}
      className="fixed top-4 right-20 z-50 px-3 py-1.5 rounded-full ring-1 text-xs font-semibold
                 bg-white text-stone-700 ring-stone-200 shadow-sm hover:shadow
                 dark:bg-slate-800 dark:text-indigo-100 dark:ring-white/10"
    >
      {label}
    </button>
  );
}
