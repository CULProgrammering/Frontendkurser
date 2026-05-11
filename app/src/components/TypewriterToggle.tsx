import { useEffect, useState } from "react";

/**
 * Per-student preference for the explanation-slide typewriter animation.
 * Persisted in localStorage so the choice survives reloads, mirroring the
 * pattern used by [`useTheme`](./ThemeToggle.tsx) and the slide font-size
 * preference.
 *
 * Default is auto-detected from `prefers-reduced-motion` — students who
 * have asked their OS for less motion get an instant-text experience by
 * default and don't need to find this setting. They can still override
 * either way with the toggle.
 *
 * The hook returns the on/off state and a setter; consumers can also
 * read the current value imperatively from `localStorage[KEY]` if needed,
 * but the hook is preferred so React stays in sync.
 */

const KEY = "cul:typewriter";

type State = "on" | "off";

/**
 * Tiny in-process pub/sub so every `useTypewriter()` consumer re-renders
 * when ANY of them flips the pref. Without this, the toggle button and
 * the ExplanationSlideView each hold their own `useState` snapshot —
 * writing localStorage from one wouldn't propagate to the other until a
 * full remount (which is why before the fix the change was only
 * visible on the next slide).
 *
 * `storage` events don't help here: the browser only fires those across
 * tabs, not within the same window. So a manual subscriber set it is.
 */
const subscribers = new Set<() => void>();

function readState(): State {
  if (typeof window === "undefined") return "on";
  const stored = window.localStorage.getItem(KEY);
  if (stored === "on" || stored === "off") return stored;
  if (
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    return "off";
  }
  return "on";
}

function writeState(next: State) {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(KEY, next);
  }
  // Fan out to every mounted hook instance.
  subscribers.forEach((fn) => fn());
}

export function useTypewriter() {
  const [state, setStateLocal] = useState<State>(readState);

  // Subscribe — any writer triggers every consumer to re-read.
  useEffect(() => {
    const onChange = () => setStateLocal(readState());
    subscribers.add(onChange);
    return () => {
      subscribers.delete(onChange);
    };
  }, []);

  return {
    enabled: state === "on",
    setEnabled: (on: boolean) => writeState(on ? "on" : "off"),
    toggle: () => writeState(readState() === "on" ? "off" : "on"),
  };
}

/**
 * Inline toggle button — drop into the slide title row alongside
 * `ThemeToggleInline` and the font-size control. Renders a small icon
 * (typewriter cursor) that's solid when animation is on and outlined
 * when it's off, matching the icon-button density of the other slide
 * controls.
 */
export function TypewriterToggleInline() {
  const { enabled, toggle } = useTypewriter();
  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={enabled}
      aria-label={
        enabled ? "Turn off text animation" : "Turn on text animation"
      }
      title={enabled ? "Text animation: on" : "Text animation: off"}
      className="w-9 h-9 rounded-lg flex items-center justify-center transition-colors
                 bg-white text-stone-700 border border-stone-900/[0.08] hover:bg-stone-50
                 dark:bg-[#1f232c] dark:text-stone-200 dark:border-white/[0.08] dark:hover:bg-[#252934]"
    >
      <TypewriterIcon strike={!enabled} />
    </button>
  );
}

/**
 * Small typewriter pictogram. Sheet of paper rising from a flat platen, a
 * body underneath with two key rows, sitting on a base. At 16px this reads
 * as "typewriter" without the keys becoming dots. When `strike` is true,
 * a diagonal line is overlaid to signal the disabled state — same idiom
 * as a no-entry / toggled-off icon.
 */
function TypewriterIcon({ strike }: { strike: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      // Near-full-bleed inside the 36px button — 1–2px breathing room
      // on each side after the 1px button border.
      className="w-8 h-8"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {/* Paper rising from the platen */}
      <path d="M9 2 L15 2 L15 6 L9 6 Z" />
      {/* Platen — the cylinder the paper feeds over */}
      <line x1="6" y1="7" x2="18" y2="7" />
      {/* Body (slightly trapezoidal, keys angle toward you) */}
      <path d="M5 9 L19 9 L20 15 L4 15 Z" />
      {/* Two short key rows */}
      <line x1="7.5" y1="11" x2="16.5" y2="11" />
      <line x1="8.5" y1="13" x2="15.5" y2="13" />
      {/* Base */}
      <line x1="3.5" y1="16" x2="20.5" y2="16" />
      {/* Strike-through when animation is off */}
      {strike && (
        <line
          x1="3"
          y1="20"
          x2="21"
          y2="3"
          strokeWidth="1.8"
        />
      )}
    </svg>
  );
}
