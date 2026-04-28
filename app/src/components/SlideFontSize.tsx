import { createContext, useContext, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { sessionGet, sessionSet } from "../storage";

export type SlideFontSize = "sm" | "md" | "lg";

type Ctx = {
  size: SlideFontSize;
  setSize: (s: SlideFontSize) => void;
  codePx: number;
  prosePx: number;
};

const SlideFontSizeCtx = createContext<Ctx>({
  size: "sm",
  setSize: () => {},
  codePx: 14,
  prosePx: 18,
});

const STORAGE_KEY = "cul:slideFontSize";

const SIZES: Record<SlideFontSize, { codePx: number; prosePx: number }> = {
  sm: { codePx: 14, prosePx: 18 },
  md: { codePx: 18, prosePx: 22 },
  lg: { codePx: 22, prosePx: 26 },
};

function readStored(): SlideFontSize {
  const v = sessionGet(STORAGE_KEY);
  return v === "md" || v === "lg" ? v : "sm";
}

export function SlideFontSizeProvider({ children }: { children: ReactNode }) {
  const [size, setSizeState] = useState<SlideFontSize>(() => readStored());
  const setSize = (s: SlideFontSize) => {
    setSizeState(s);
    sessionSet(STORAGE_KEY, s);
  };
  const value = useMemo<Ctx>(
    () => ({ size, setSize, codePx: SIZES[size].codePx, prosePx: SIZES[size].prosePx }),
    [size]
  );
  return (
    <SlideFontSizeCtx.Provider value={value}>{children}</SlideFontSizeCtx.Provider>
  );
}

export function useSlideFontSize(): Ctx {
  return useContext(SlideFontSizeCtx);
}

export function SlideFontSizeControl() {
  const { size, setSize } = useSlideFontSize();
  const items: { id: SlideFontSize; px: number }[] = [
    { id: "sm", px: SIZES.sm.prosePx },
    { id: "md", px: SIZES.md.prosePx },
    { id: "lg", px: SIZES.lg.prosePx },
  ];
  return (
    <div
      className="flex items-center gap-1 rounded-lg p-1 ring-1
                 bg-white ring-stone-200
                 dark:bg-slate-900/60 dark:ring-white/10"
      role="group"
      aria-label="Slide text size"
    >
      {items.map((it) => {
        const active = it.id === size;
        return (
          <button
            key={it.id}
            type="button"
            onClick={() => setSize(it.id)}
            aria-pressed={active}
            title={`${it.id.toUpperCase()} (${it.px}px)`}
            className={
              "px-2 py-0.5 rounded-md font-serif leading-none transition-colors " +
              (active
                ? "bg-amber-500 text-white dark:bg-indigo-500"
                : "text-stone-600 hover:bg-stone-100 dark:text-indigo-100 dark:hover:bg-slate-700")
            }
            style={{ fontSize: `${it.px}px` }}
          >
            abc
          </button>
        );
      })}
    </div>
  );
}
