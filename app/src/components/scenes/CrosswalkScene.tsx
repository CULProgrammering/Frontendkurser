import { StickFigure } from "./StickFigure";

type Props = { step: number };

/**
 * L1 intro: pedestrian at a crosswalk.
 *
 * Steps (kept loose — works whether the lesson has 3 or 5 narration steps):
 *   0: stand at curb, light unset
 *   1: light is RED, figure waits
 *   2: light turns GREEN, figure walks
 *   3+: figure has crossed
 */
export function CrosswalkScene({ step }: Props) {
  // Light state per step
  const lightState =
    step <= 0 ? "off" : step === 1 ? "red" : "green";

  // Figure horizontal position (% of viewBox width)
  const figureX =
    step <= 1 ? 60 : step === 2 ? 200 : 320;

  return (
    <div className="w-full h-full flex items-center justify-center">
      <svg
        viewBox="0 0 400 240"
        className="w-full h-auto max-h-[420px]"
        role="img"
        aria-label="Pedestrian at a crosswalk"
      >
        {/* Sky / background */}
        <rect x={0} y={0} width={400} height={170} className="fill-stone-100 dark:fill-slate-900" />
        {/* Road */}
        <rect x={0} y={170} width={400} height={70} className="fill-stone-300 dark:fill-slate-800" />
        {/* Crosswalk stripes */}
        {[100, 140, 180, 220, 260].map((x) => (
          <rect
            key={x}
            x={x}
            y={175}
            width={28}
            height={60}
            className="fill-stone-50 dark:fill-slate-700"
          />
        ))}

        {/* Traffic light pole */}
        <line x1={350} y1={170} x2={350} y2={90} className="stroke-stone-500 dark:stroke-slate-500" strokeWidth={3} />
        <rect
          x={335}
          y={50}
          width={30}
          height={50}
          rx={4}
          className="fill-stone-700 dark:fill-slate-700"
        />
        {/* Red lamp */}
        <circle
          cx={350}
          cy={62}
          r={8}
          className={
            lightState === "red"
              ? "fill-rose-500"
              : "fill-stone-900/30 dark:fill-slate-900"
          }
        />
        {/* Green lamp */}
        <circle
          cx={350}
          cy={86}
          r={8}
          className={
            lightState === "green"
              ? "fill-emerald-500"
              : "fill-stone-900/30 dark:fill-slate-900"
          }
        />

        {/* Stick figure */}
        <g
          style={{
            transition: "transform 700ms ease-out",
            transform: `translateX(${figureX - 60}px)`,
          }}
          className="text-stone-700 dark:text-indigo-100"
        >
          <StickFigure
            x={60}
            y={210}
            pose={
              step === 0
                ? "stand"
                : step === 1
                ? "look-up"
                : step === 2
                ? "walk-right"
                : "stand"
            }
          />
        </g>

        {/* Curb labels */}
        <text x={40} y={165} fontSize={10} className="fill-stone-500 dark:fill-indigo-200/60">
          here
        </text>
        <text x={300} y={165} fontSize={10} className="fill-stone-500 dark:fill-indigo-200/60">
          there
        </text>
      </svg>
    </div>
  );
}
