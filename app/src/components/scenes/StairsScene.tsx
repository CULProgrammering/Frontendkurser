import { StickFigure } from "./StickFigure";

type Props = { step: number };

/**
 * L1 Loops intro: figure climbing a staircase, one step per narration step.
 *
 * Steps:
 *   0: figure idle at bottom
 *   1: on step 1
 *   2: on step 2
 *   3: on step 3
 *   4+: at the top
 */
export function StairsScene({ step }: Props) {
  // Five steps total (0..4). Each step is a rectangle.
  const totalSteps = 5;
  const stepWidth = 60;
  const stepHeight = 20;
  const baseX = 40;
  const baseY = 220;

  // Figure position — climbs up and to the right with each step.
  const figureStep = Math.min(step, totalSteps);
  const figureX = baseX + figureStep * stepWidth + stepWidth / 2;
  const figureY = baseY - figureStep * stepHeight;

  return (
    <div className="w-full h-full flex items-center justify-center">
      <svg
        viewBox="0 0 400 240"
        className="w-full h-auto max-h-[420px]"
        role="img"
        aria-label="Figure climbing stairs"
      >
        <rect x={0} y={0} width={400} height={240} className="fill-stone-50 dark:fill-slate-900" />

        {/* Stairs */}
        {Array.from({ length: totalSteps }).map((_, i) => {
          const x = baseX + i * stepWidth;
          const y = baseY - i * stepHeight;
          const reached = i <= figureStep;
          return (
            <g key={i}>
              <rect
                x={x}
                y={y}
                width={stepWidth + 2}
                height={(i + 1) * stepHeight + 1}
                className={
                  reached
                    ? "fill-amber-200 dark:fill-amber-500/30"
                    : "fill-stone-200 dark:fill-slate-800"
                }
                stroke="currentColor"
                strokeWidth={1}
                opacity={0.9}
              />
              {/* Step number label */}
              <text
                x={x + stepWidth / 2}
                y={y + 14}
                textAnchor="middle"
                fontSize={11}
                fontWeight={700}
                className={
                  reached
                    ? "fill-amber-700 dark:fill-amber-200"
                    : "fill-stone-400 dark:fill-slate-500"
                }
                fontFamily="ui-monospace, monospace"
              >
                {i}
              </text>
            </g>
          );
        })}

        {/* Stick figure on the current step */}
        <g
          className="text-stone-700 dark:text-indigo-100"
          style={{
            transition: "transform 700ms ease-out",
            transform: `translate(${figureX - 60}px, ${figureY - 220}px)`,
          }}
        >
          <StickFigure
            x={60}
            y={220}
            pose={
              step === 0
                ? "stand"
                : step >= totalSteps
                ? "wave"
                : "walk-right"
            }
          />
        </g>

        {/* Step counter chip */}
        <g transform="translate(20, 30)">
          <rect
            x={0}
            y={0}
            width={90}
            height={28}
            rx={6}
            className="fill-white ring-1 dark:fill-slate-800"
            stroke="currentColor"
            strokeWidth={1}
          />
          <text
            x={45}
            y={19}
            textAnchor="middle"
            fontSize={13}
            fontWeight={600}
            fontFamily="ui-monospace, monospace"
            className="fill-stone-700 dark:fill-indigo-100"
          >
            step = {figureStep}
          </text>
        </g>
      </svg>
    </div>
  );
}
