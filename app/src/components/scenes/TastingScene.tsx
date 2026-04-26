import { StickFigure } from "./StickFigure";

type Props = { step: number };

/**
 * L4 Loops intro: figure tasting soup, adjusting, tasting again.
 *
 * The pose alternates between "tasting" and "adding salt" for several
 * iterations, then ends in a happy "wave" once it's right.
 */
export function TastingScene({ step }: Props) {
  // step 0: idle, looking at bowl
  // step 1: tasting (1st)
  // step 2: frowning / adding salt
  // step 3: tasting (2nd)
  // step 4: still frowning / adding more
  // step 5: tasting (3rd) — happy
  // step 6+: done, wave
  const phase =
    step === 0
      ? "look"
      : step === 1
      ? "taste"
      : step === 2
      ? "season"
      : step === 3
      ? "taste"
      : step === 4
      ? "season"
      : step === 5
      ? "taste-good"
      : "done";

  // Fill level shrinks slightly as taste-cycles continue.
  const fillTopY = 70 + Math.min(step, 4) * 4;

  return (
    <div className="w-full h-full flex items-center justify-center">
      <svg
        viewBox="0 0 400 240"
        className="w-full h-auto max-h-[420px]"
        role="img"
        aria-label="Figure tasting soup"
      >
        <rect x={0} y={0} width={400} height={240} className="fill-stone-50 dark:fill-slate-900" />

        {/* Counter */}
        <line x1={0} y1={210} x2={400} y2={210} className="stroke-stone-300 dark:stroke-slate-700" strokeDasharray="4 4" />

        {/* Bowl */}
        <g transform="translate(200, 120)">
          {/* Soup fill */}
          <ellipse
            cx={0}
            cy={fillTopY - 110}
            rx={62}
            ry={10}
            className="fill-amber-300 dark:fill-amber-500/60"
            style={{ transition: "all 500ms ease-out" }}
          />
          <path
            d={`M -64,${fillTopY - 110}  L -54,40  Q 0,55 54,40  L 64,${fillTopY - 110} Z`}
            className="fill-amber-300 dark:fill-amber-500/60"
            style={{ transition: "all 500ms ease-out" }}
          />
          {/* Bowl rim & body */}
          <ellipse cx={0} cy={-30} rx={64} ry={11} fill="none" stroke="currentColor" strokeWidth={2} />
          <path
            d="M -64,-30  L -54,40  Q 0,55 54,40  L 64,-30"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
          />

          {/* Steam */}
          {phase !== "done" && (
            <g className="stroke-stone-400 dark:stroke-slate-500" strokeWidth={1.5} fill="none" opacity={0.6}>
              <path d="M -10,-40 Q -16,-55 -10,-70 Q -4,-85 -10,-100" />
              <path d="M 10,-40 Q 16,-55 10,-70 Q 4,-85 10,-100" />
            </g>
          )}
        </g>

        {/* Salt shaker — appears during 'season' phases */}
        {phase === "season" && (
          <g
            transform="translate(285, 95)"
            className="text-stone-700 dark:text-indigo-100"
            style={{ transition: "transform 400ms ease-out" }}
          >
            <rect x={-9} y={0} width={18} height={26} rx={3} className="fill-white dark:fill-slate-700" stroke="currentColor" strokeWidth={1.5} />
            <rect x={-9} y={0} width={18} height={4} className="fill-stone-500 dark:fill-slate-500" />
            {/* Salt grains */}
            {[0, 6, 12].map((dy, i) => (
              <circle key={i} cx={-3 + i * 3} cy={32 + dy} r={1.2} className="fill-stone-400 dark:fill-slate-400" />
            ))}
          </g>
        )}

        {/* Verdict bubble */}
        {(phase === "season" || phase === "taste-good" || phase === "done") && (
          <g transform="translate(60, 60)">
            <rect
              x={0}
              y={0}
              width={130}
              height={32}
              rx={16}
              className={
                phase === "taste-good" || phase === "done"
                  ? "fill-emerald-100 dark:fill-emerald-500/20"
                  : "fill-stone-100 dark:fill-slate-800"
              }
              stroke="currentColor"
              strokeWidth={1}
            />
            <text
              x={65}
              y={21}
              textAnchor="middle"
              fontSize={12}
              fontWeight={600}
              fontFamily="ui-monospace, monospace"
              className={
                phase === "taste-good" || phase === "done"
                  ? "fill-emerald-700 dark:fill-emerald-200"
                  : "fill-stone-700 dark:fill-indigo-100"
              }
            >
              {phase === "season"
                ? "needs salt"
                : phase === "taste-good"
                ? "tastes good!"
                : "ready"}
            </text>
          </g>
        )}

        {/* Stick figure */}
        <g className="text-stone-700 dark:text-indigo-100">
          <StickFigure
            x={130}
            y={210}
            pose={
              phase === "look"
                ? "look-up"
                : phase === "season"
                ? "shrug"
                : phase === "done"
                ? "wave"
                : "carry"
            }
          />
        </g>
      </svg>
    </div>
  );
}
