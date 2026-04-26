import { StickFigure } from "./StickFigure";

type Props = { step: number };

/**
 * L3 Loops intro: rocket countdown.
 *
 * The big number ticks 5 → 4 → 3 → 2 → 1 → LIFTOFF as `step` advances.
 */
export function CountdownScene({ step }: Props) {
  // step 0 → idle (showing 5 but not yet started)
  // step 1..5 → counting down
  // step >= 6 → liftoff
  const start = 5;
  const counting = Math.min(Math.max(step, 0), start);
  const value = step >= start + 1 ? null : start - counting;
  const liftoff = step >= start + 1;

  // Rocket lifts off when liftoff is true
  const rocketY = liftoff ? -200 : 0;

  return (
    <div className="w-full h-full flex items-center justify-center">
      <svg
        viewBox="0 0 400 240"
        className="w-full h-auto max-h-[420px]"
        role="img"
        aria-label="Rocket countdown"
      >
        <rect x={0} y={0} width={400} height={240} className="fill-stone-50 dark:fill-slate-900" />

        {/* Ground */}
        <line x1={0} y1={210} x2={400} y2={210} className="stroke-stone-300 dark:stroke-slate-700" strokeDasharray="4 4" />

        {/* Big countdown number */}
        <text
          x={120}
          y={140}
          textAnchor="middle"
          fontSize={120}
          fontWeight={800}
          fontFamily="ui-monospace, monospace"
          className={
            liftoff
              ? "fill-emerald-500"
              : value === 0
              ? "fill-rose-500"
              : "fill-amber-500 dark:fill-amber-300"
          }
          style={{ transition: "all 400ms ease-out" }}
        >
          {liftoff ? "GO!" : String(value)}
        </text>

        {/* Rocket */}
        <g
          style={{
            transition: "transform 800ms ease-in",
            transform: `translateY(${rocketY}px)`,
          }}
        >
          <g transform="translate(280, 130)">
            {/* Body */}
            <rect x={-12} y={0} width={24} height={60} rx={3} className="fill-stone-200 dark:fill-slate-700" stroke="currentColor" strokeWidth={1.5} />
            {/* Nose */}
            <polygon points="-12,0 12,0 0,-22" className="fill-rose-400 dark:fill-rose-500" stroke="currentColor" strokeWidth={1.5} />
            {/* Window */}
            <circle cx={0} cy={20} r={5} className="fill-sky-400 dark:fill-sky-500" stroke="currentColor" strokeWidth={1} />
            {/* Fins */}
            <polygon points="-12,40 -22,60 -12,60" className="fill-rose-400 dark:fill-rose-500" stroke="currentColor" strokeWidth={1.5} />
            <polygon points="12,40 22,60 12,60" className="fill-rose-400 dark:fill-rose-500" stroke="currentColor" strokeWidth={1.5} />
            {/* Flame (shows when value <= 1 or liftoff) */}
            {(liftoff || value === 1) && (
              <g>
                <polygon points="-9,60 9,60 0,90" className="fill-amber-400" />
                <polygon points="-5,60 5,60 0,75" className="fill-rose-400" />
              </g>
            )}
          </g>
        </g>

        {/* Stick figure (announcer) */}
        <g className="text-stone-700 dark:text-indigo-100">
          <StickFigure
            x={50}
            y={210}
            pose={liftoff ? "wave" : "look-up"}
          />
        </g>
      </svg>
    </div>
  );
}
