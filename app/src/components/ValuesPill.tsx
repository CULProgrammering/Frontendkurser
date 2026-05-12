/**
 * Small pill rendered above the prompt / instruction on every workshop step
 * and every exercise lab. Communicates whether the student must use the
 * specific values shown in the spec, or can substitute their own.
 *
 * Authored on the slide / step via `anyValues?: boolean` (default = exact).
 * Pill colours:
 *   - EXACT (default) — warm amber, signals constraint.
 *   - ANY            — teal, signals flexibility (same hue as feedback success).
 *
 * Replaces the prior `FlexibilityHelpButton` "?" affordance — the pill is
 * always visible so students don't need to click anything to know which
 * mode the lab is in.
 */
type Props = {
  anyValues: boolean;
  className?: string;
};

export function ValuesPill({ anyValues, className }: Props) {
  const labelMain = anyValues ? "Any values" : "Exact values";
  const labelTail = anyValues
    ? "— pick your own (same type)"
    : "— keep the numbers as shown";

  const palette = anyValues
    ? "border-teal-300/60 dark:border-teal-700/50 text-teal-700 dark:text-teal-400 bg-teal-50/70 dark:bg-teal-950/30"
    : "border-amber-300/60 dark:border-amber-700/50 text-amber-700 dark:text-amber-400 bg-amber-50/70 dark:bg-amber-950/30";

  const tail = anyValues
    ? "text-teal-700/70 dark:text-teal-400/70"
    : "text-amber-700/70 dark:text-amber-400/70";

  return (
    <div
      className={`inline-flex items-center gap-1.5 px-2 py-1 rounded text-[10px] tracking-[0.12em] uppercase font-semibold border ${palette} ${className ?? ""}`}
    >
      <span>{labelMain}</span>
      <span className={`font-normal normal-case tracking-normal ${tail}`}>
        {labelTail}
      </span>
    </div>
  );
}
