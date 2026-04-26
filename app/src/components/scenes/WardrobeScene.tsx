import { StickFigure } from "./StickFigure";

type Props = { step: number };

/**
 * L2 intro: figure in front of a wardrobe, picking outfits by temperature.
 *
 * Steps:
 *   0: figure idle, thermometer unset
 *   1: cold (-5°C) → winter coat
 *   2: mild (12°C) → jacket
 *   3: warm (25°C) → t-shirt
 */
export function WardrobeScene({ step }: Props) {
  const tempByStep = [null, -5, 12, 25];
  const temp = tempByStep[Math.min(step, tempByStep.length - 1)];

  // Mercury fill height (out of 60 px). Maps -10..30 to 0..60.
  const mercury =
    temp === null ? 0 : Math.max(2, Math.min(60, ((temp + 10) / 40) * 60));

  // Figure layer color hints
  const layer =
    temp === null
      ? "none"
      : temp <= 0
      ? "winter"
      : temp <= 15
      ? "jacket"
      : "shirt";

  return (
    <div className="w-full h-full flex items-center justify-center">
      <svg
        viewBox="0 0 400 240"
        className="w-full h-auto max-h-[420px]"
        role="img"
        aria-label="Figure choosing an outfit"
      >
        <rect x={0} y={0} width={400} height={240} className="fill-stone-50 dark:fill-slate-900" />

        {/* Wardrobe */}
        <rect x={20} y={50} width={120} height={170} rx={6} className="fill-stone-200 dark:fill-slate-800" />
        <line x1={80} y1={50} x2={80} y2={220} className="stroke-stone-400 dark:stroke-slate-600" strokeWidth={2} />
        <circle cx={75} cy={135} r={2} className="fill-stone-500 dark:fill-slate-400" />
        <circle cx={85} cy={135} r={2} className="fill-stone-500 dark:fill-slate-400" />
        {/* Hangers — three outfits hinted */}
        <g className="stroke-stone-500 dark:stroke-slate-500" strokeWidth={1.5} fill="none">
          <line x1={40} y1={70} x2={60} y2={70} />
          <line x1={50} y1={70} x2={50} y2={90} />
          <rect x={40} y={90} width={20} height={28} className="fill-rose-300 dark:fill-rose-500/40" />
        </g>

        {/* Thermometer */}
        <g transform="translate(200, 60)">
          <rect x={-8} y={0} width={16} height={90} rx={6} className="fill-white dark:fill-slate-700" stroke="currentColor" strokeWidth={1.5} />
          <rect
            x={-5}
            y={90 - mercury}
            width={10}
            height={mercury}
            className={
              temp === null
                ? "fill-stone-300 dark:fill-slate-600"
                : temp <= 0
                ? "fill-sky-500"
                : temp <= 15
                ? "fill-amber-400"
                : "fill-rose-500"
            }
            style={{ transition: "all 600ms ease-out" }}
          />
          <circle cx={0} cy={100} r={12} className="fill-rose-500" />
          {temp !== null && (
            <text x={20} y={50} fontSize={14} className="fill-stone-700 dark:fill-indigo-100" fontWeight={600}>
              {temp}°C
            </text>
          )}
        </g>

        {/* Stick figure with outfit hint */}
        <g className="text-stone-700 dark:text-indigo-100">
          {/* Outfit layer (drawn behind figure) */}
          {layer !== "none" && (
            <g style={{ transition: "all 600ms ease-out" }}>
              {/* Coat / jacket / shirt as a colored torso */}
              <rect
                x={310}
                y={170}
                width={20}
                height={
                  layer === "winter" ? 36 : layer === "jacket" ? 26 : 18
                }
                rx={3}
                className={
                  layer === "winter"
                    ? "fill-sky-400"
                    : layer === "jacket"
                    ? "fill-amber-400"
                    : "fill-rose-300"
                }
              />
            </g>
          )}
          <StickFigure x={320} y={220} pose={step === 0 ? "stand" : "wave"} />
        </g>
      </svg>
    </div>
  );
}
