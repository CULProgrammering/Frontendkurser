import { StickFigure } from "./StickFigure";

type Props = { step: number };

/**
 * L4 intro: figure approaches a club entrance with a bouncer.
 * The bouncer has multiple checks (age, ticket, ban list).
 *
 * Steps:
 *   0: figure approaches, bouncer at door
 *   1: check #1 — age
 *   2: check #2 — ticket
 *   3: check #3 — ban list
 *   4: all pass → enters; or fail → turned away
 */
export function BouncerScene({ step }: Props) {
  const checks = [
    { label: "age >= 18", on: step >= 1 },
    { label: "has ticket", on: step >= 2 },
    { label: "not banned", on: step >= 3 },
  ];
  const allChecksDone = step >= 4;

  // Visitor figure position
  const visitorX = step === 0 ? 60 : step >= 4 ? 240 : 130;

  return (
    <div className="w-full h-full flex items-center justify-center">
      <svg
        viewBox="0 0 400 240"
        className="w-full h-auto max-h-[420px]"
        role="img"
        aria-label="Bouncer at a club door"
      >
        <rect x={0} y={0} width={400} height={240} className="fill-stone-100 dark:fill-slate-900" />
        {/* Floor */}
        <line x1={0} y1={210} x2={400} y2={210} className="stroke-stone-300 dark:stroke-slate-700" strokeDasharray="4 4" />

        {/* Club building */}
        <rect x={250} y={60} width={140} height={150} className="fill-stone-200 dark:fill-slate-800" />
        <rect x={290} y={120} width={50} height={90} rx={3} className="fill-stone-700 dark:fill-slate-900" />
        <text x={315} y={90} textAnchor="middle" fontSize={14} fontWeight={700} className="fill-rose-500">
          CLUB
        </text>

        {/* Bouncer figure */}
        <g className="text-stone-800 dark:text-indigo-100">
          <StickFigure x={260} y={210} pose="stand" scale={1.15} />
          {/* Sunglasses — small bar over the head */}
          <rect x={252} y={154} width={16} height={3} rx={1} className="fill-stone-900 dark:fill-slate-200" />
        </g>

        {/* Visitor figure */}
        <g
          style={{
            transition: "transform 700ms ease-out",
            transform: `translateX(${visitorX - 60}px)`,
          }}
          className="text-stone-700 dark:text-indigo-100"
        >
          <StickFigure
            x={60}
            y={210}
            pose={step === 0 ? "walk-right" : step >= 4 ? "wave" : "stand"}
          />
        </g>

        {/* Checklist floats above the bouncer */}
        <g transform="translate(80, 30)">
          {checks.map((c, i) => (
            <g key={i} transform={`translate(0, ${i * 22})`}>
              <rect
                x={0}
                y={0}
                width={14}
                height={14}
                rx={2}
                className={
                  c.on
                    ? "fill-emerald-400"
                    : "fill-stone-200 dark:fill-slate-700"
                }
                stroke="currentColor"
                strokeWidth={1}
              />
              {c.on && (
                <path
                  d="M3 7 L6 10 L11 4"
                  fill="none"
                  stroke="white"
                  strokeWidth={2}
                  strokeLinecap="round"
                />
              )}
              <text
                x={22}
                y={11}
                fontSize={11}
                className="fill-stone-700 dark:fill-indigo-100"
                fontFamily="ui-monospace, monospace"
              >
                {c.label}
              </text>
            </g>
          ))}
        </g>

        {/* Outcome label */}
        {allChecksDone && (
          <g transform="translate(150, 200)">
            <rect
              x={0}
              y={0}
              width={90}
              height={22}
              rx={11}
              className="fill-emerald-100 dark:fill-emerald-500/20"
            />
            <text
              x={45}
              y={15}
              textAnchor="middle"
              fontSize={11}
              fontWeight={600}
              className="fill-emerald-700 dark:fill-emerald-300"
            >
              welcome in
            </text>
          </g>
        )}
      </svg>
    </div>
  );
}
