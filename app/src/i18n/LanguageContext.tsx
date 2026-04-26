import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { Lang } from ".";

type Ctx = { lang: Lang; setLang: (l: Lang) => void };

const LanguageCtx = createContext<Ctx>({
  lang: "en",
  setLang: () => {},
});

const STORAGE_KEY = "cul:lang";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    try {
      const v = sessionStorage.getItem(STORAGE_KEY);
      return v === "sv" ? "sv" : "en";
    } catch {
      return "en";
    }
  });

  const setLang = (l: Lang) => {
    setLangState(l);
    try {
      sessionStorage.setItem(STORAGE_KEY, l);
    } catch {
      // ignore
    }
  };

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
