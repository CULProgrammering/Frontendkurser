import { createContext, useContext, useEffect } from "react";
import type { ReactNode } from "react";
import type { Lang } from ".";

type Ctx = { lang: Lang; setLang: (l: Lang) => void };

const LanguageCtx = createContext<Ctx>({
  lang: "en",
  setLang: () => {},
});

// Swedish output is temporarily disabled pending translation review — every
// consumer is force-pinned to English regardless of any persisted preference.
// To re-enable, restore the storage-backed state from git history.
export function LanguageProvider({ children }: { children: ReactNode }) {
  const lang: Lang = "en";
  const setLang = () => {};

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <LanguageCtx.Provider value={{ lang, setLang }}>
      {children}
    </LanguageCtx.Provider>
  );
}

export function useLang(): Ctx {
  return useContext(LanguageCtx);
}
