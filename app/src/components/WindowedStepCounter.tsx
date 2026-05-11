import type { ReactNode } from "react";
import { useAccent } from "./AccentContext";
import { useTheme } from "./ThemeToggle";
import { pickAccentHex } from "../topics";

type Props = {
  total: number;
  stepIdx: number;
  completed: Set<number>;
  onJump: (i: number) => void;
};

const WINDOW_HALF = 3;

/**
 * Step counter for workshops, walkthroughs, and any other multi-step
 * deck. The lesson-level workshop convention is 4 steps; the topic-level
 * walkthrough convention is 20+. To handle both without two components,
 * this one decides whether to window:
 *
 *   - total ≤ 10  → flat row of all dots (lesson workshops, short labs)
 *   - total > 10  → window of `current ± 3`, plus first/last pinned with
 *     ellipses, with edge-aware suppression so the first/last cells
 *     don't duplicate cells already inside the window.
 *
 * Done > current dot precedence — completed dots stay topic-coloured even
 * when the student is parked on them.
 *
 * Visual language matches the design: cells are squares with rounded
 * corners; done = filled accent (chapter colour), current = outlined
 * accent, upcoming = neutral border. The chapter colour is read from
 * `useAccent()` so each lesson / walkthrough draws its own hue.
 *
 * Edge-aware suppression examples (total = 15):
 *
 *   current 1   →  1 2 3 4 ... 15
 *   current 4   →  1 2 3 4 5 6 7 ... 15           (no left ellipsis)
 *   current 5   →  1 2 3 4 5 6 7 8 ... 15         (still no left ellipsis,
 *                                                  step 1 already adjacent)
 *   current 8   →  1 ... 5 6 7 8 9 10 11 ... 15
 *   current 11  →  1 ... 8 9 10 11 12 13 14 15    (no right ellipsis)
 *   current 15  →  1 ... 12 13 14 15
 *
 * The "no ellipsis when adjacent" rule means a single skipped step never
 * gets replaced by `...` (which would take the same space and read
 * worse) — instead we just include the boundary number directly.
 */
export function WindowedStepCounter({ total, stepIdx, completed, onJump }: Props) {
  if (total <= 1) return null;

  // Below the threshold: flat dots, no windowing. Handles 4-step
  // lesson workshops without needing a separate component.
  const items: (number | "gap-left" | "gap-right")[] = [];
  if (total <= 10) {
    for (let i = 0; i < total; i++) items.push(i);
  } else {
    const windowStart = Math.max(0, stepIdx - WINDOW_HALF);
    const windowEnd = Math.min(total - 1, stepIdx + WINDOW_HALF);

    // Left side: pin first if not already in window. If first is exactly
    // adjacent to windowStart (one step gap), include it without an
    // ellipsis — `1 2 3 ...` reads worse than `1 2 3 ...` when the gap
    // is a single step that we'd be hiding behind dots.
    if (windowStart > 0) {
      items.push(0);
      if (windowStart > 1) items.push("gap-left");
    }

    for (let i = windowStart; i <= windowEnd; i++) items.push(i);

    // Mirror on the right: pin last if outside the window; collapse the
    // single-step gap.
    if (windowEnd < total - 1) {
      if (windowEnd < total - 2) items.push("gap-right");
      items.push(total - 1);
    }
  }

  return (
    <div
      className="flex flex-wrap items-center gap-1.5"
      aria-label="Step progress"
    >
      {items.map((it, idx) => {
        if (it === "gap-left" || it === "gap-right") {
          return (
            <span
              key={`${it}-${idx}`}
              className="text-stone-400 dark:text-stone-500 select-none px-1"
              aria-hidden="true"
            >
              …
            </span>
          );
        }
        const i = it;
        const isCurrent = i === stepIdx;
        const isDone = completed.has(i);
        return (
          <Cell
            key={i}
            idx={i}
            isCurrent={isCurrent}
            isDone={isDone}
            onClick={() => onJump(i)}
          />
        );
      })}
    </div>
  );
}

function Cell({
  idx,
  isCurrent,
  isDone,
  onClick,
}: {
  idx: number;
  isCurrent: boolean;
  isDone: boolean;
  onClick: () => void;
}): ReactNode {
  const accent = useAccent();
  const { theme } = useTheme();
  const dark = theme === "dark";
  const fg = pickAccentHex(accent.fgHex, theme);

  // Three states share the same square shape — fill / outline / neutral.
  // Done > current: a completed cell stays filled even when the student
  // is parked on it.
  let style: React.CSSProperties;
  if (isDone) {
    style = {
      background: fg,
      color: dark ? "#1c1a16" : "#fdfaf3",
      borderColor: "transparent",
    };
  } else if (isCurrent) {
    style = {
      background: "transparent",
      color: fg,
      borderColor: fg,
      borderWidth: 2,
    };
  } else {
    style = {
      background: "transparent",
      color: dark ? "#9ba0ab" : "#6b6557",
      borderColor: dark ? "rgba(255,255,255,0.10)" : "rgba(0,0,0,0.12)",
    };
  }

  return (
    <button
      onClick={onClick}
      aria-label={`Go to step ${idx + 1}`}
      aria-current={isCurrent ? "step" : undefined}
      className="h-9 w-9 sm:h-7 sm:w-7 rounded-md text-sm sm:text-xs font-mono font-medium tabular-nums border transition-all hover:scale-[1.05]"
      style={style}
    >
      {isDone ? "✓" : idx + 1}
    </button>
  );
}
