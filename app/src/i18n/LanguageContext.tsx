import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { Lang } from ".";
import { sessionGet, sessionSet } from "../storage";

type Ctx = { lang: Lang; setLang: (l: Lang) => void };

const LanguageCtx = createContext<Ctx>({
  lang: "en",
  setLang: () => {},
});

const STORAGE_KEY = "cul:lang";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    const v = sessionGet(STORAGE_KEY);
    return v === "sv" ? "sv" : "en";
  });

  const setLang = (l: Lang) => {
    setLangState(l);
    sessionSet(STORAGE_KEY, l);
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
