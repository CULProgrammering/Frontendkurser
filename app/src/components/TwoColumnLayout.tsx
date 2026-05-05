import { useState, type ReactNode } from "react";

type Props = {
  leftLabel: string;
  rightLabel: string;
  left: ReactNode;
  right: ReactNode;
  /**
   * Layout direction at md+. Defaults to "row" (side by side). Slide views
   * that historically used `grid md:grid-cols-2` look identical to "row".
   */
  desktopDirection?: "row" | "row-reverse";
  /** Gap between panels on md+. */
  desktopGap?: string;
  /** Initial active tab on <md. */
  initialTab?: "left" | "right";
  /** Optional extra classes for the outer wrapper (use for sizing). */
  className?: string;
};

/**
 * Two-pane layout that adapts to small screens. On md+ both panels render
 * side by side. On <md the panels stack behind a tab bar — only the active
 * panel is visible, but both stay mounted so editor/iframe/textarea state
 * is preserved across tab switches.
 *
 * Tab button clicks call `event.stopPropagation()` so they don't trigger
 * outer click handlers (e.g. the explanation slide's click-to-advance).
 */
export function TwoColumnLayout({
  leftLabel,
  rightLabel,
  left,
  right,
  desktopDirection = "row",
  desktopGap = "gap-6",
  initialTab = "left",
  className = "",
}: Props) {
  const [active, setActive] = useState<"left" | "right">(initialTab);

  const desktopFlex =
    desktopDirection === "row-reverse" ? "md:flex-row-reverse" : "md:flex-row";

  return (
    <div className={"flex flex-col min-h-0 " + className}>
      <div
        className="md:hidden flex border-b border-stone-200 dark:border-white/10 mb-3"
        role="tablist"
        onClick={(e) => e.stopPropagation()}
      >
        <TabButton
          active={active === "left"}
          onClick={() => setActive("left")}
          label={leftLabel}
        />
        <TabButton
          active={active === "right"}
          onClick={() => setActive("right")}
          label={rightLabel}
        />
      </div>
      <div
        className={`flex-1 min-h-0 flex flex-col ${desktopFlex} ${desktopGap}`}
      >
        <div
          className={
            "flex-1 min-h-0 flex flex-col md:flex " +
            (active === "left" ? "flex" : "hidden md:flex")
          }
          role="tabpanel"
        >
          {left}
        </div>
        <div
          className={
            "flex-1 min-h-0 flex flex-col md:flex " +
            (active === "right" ? "flex" : "hidden md:flex")
          }
          role="tabpanel"
        >
          {right}
        </div>
      </div>
    </div>
  );
}

function TabButton({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className={
        "flex-1 px-3 py-3 min-h-[44px] text-xs uppercase tracking-wider font-medium border-b-2 transition-colors " +
        (active
          ? "text-amber-700 border-amber-500 dark:text-indigo-200 dark:border-indigo-300"
          : "text-stone-500 border-transparent hover:text-stone-700 dark:text-indigo-200/60 dark:hover:text-indigo-100")
      }
    >
      {label}
    </button>
  );
}
