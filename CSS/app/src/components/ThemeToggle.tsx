import { useEffect, useState } from "react";

type Theme = "light" | "dark";

const KEY = "cul-theme";

function readInitial(): Theme {
  const stored = localStorage.getItem(KEY);
  return stored === "dark" ? "dark" : "light";
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(readInitial);

  useEffect(() => {
    localStorage.setItem(KEY, theme);
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return { theme, setTheme };
}

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Byt till ljust läge" : "Byt till mörkt läge"}
      title={isDark ? "Ljust läge" : "Mörkt läge"}
      className="fixed top-3 right-3 z-50 w-9 h-9 rounded-full flex items-center justify-center
                 bg-white/90 hover:bg-white text-stone-700 shadow-sm ring-1 ring-stone-200
                 dark:bg-slate-800/90 dark:hover:bg-slate-700 dark:text-indigo-100 dark:ring-white/10"
    >
      {isDark ? (
        <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" aria-hidden>
          <path d="M12 4V2m0 20v-2m8-8h2M2 12h2m14.24-6.24l1.42-1.42M4.34 19.66l1.42-1.42m0-12.48L4.34 4.34m15.32 15.32l-1.42-1.42M12 7a5 5 0 100 10 5 5 0 000-10z" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" aria-hidden>
          <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
        </svg>
      )}
    </button>
  );
}
