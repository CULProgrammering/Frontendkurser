import { StickFigure } from "./StickFigure";

type Props = { step: number };

/**
 * L3 intro: figure sorting items into recycling bins.
 *
 * Steps:
 *   0: figure holds an item, bins waiting
 *   1: item is "paper" → goes to paper bin
 *   2: item is "glass" → goes to glass bin
 *   3: item is "?"     → goes to default bin
 */
export function RecyclingScene({ step }: Props) {
  const items = [
    { label: "?", fill: "#d6d3d1" },
    { label: "📰", fill: "#fef3c7" },
    { label: "🍾", fill: "#bae6fd" },
    { label: "?", fill: "#d6d3d1" },
  ];
  const bins = [
    { key: "paper", label: "paper", color: "fill-amber-300", x: 130 },
    { key: "glass", label: "glass", color: "fill-sky-300", x: 220 },
    { key: "default", label: "rest", color: "fill-stone-400", x: 310 },
  ];

  const currentItem = items[Math.min(step, items.length - 1)];
  const targetBinKey =
    step === 1 ? "paper" : step === 2 ? "glass" : step === 3 ? "default" : null;
  const targetBin = bins.find((b) => b.key === targetBinKey);

  return (
    <div className="w-full h-full flex items-center justify-center">
      <svg
        viewBox="0 0 400 240"
        className="w-full h-auto max-h-[420px]"
        role="img"
        aria-label="Figure sorting recycling"
      >
        <rect x={0} y={0} width={400} height={240} className="fill-stone-50 dark:fill-slate-900" />

        {/* Floor line */}
        <line x1={0} y1={210} x2={400} y2={210} className="stroke-stone-300 dark:stroke-slate-700" strokeDasharray="4 4" />

        {/* Bins */}
        {bins.map((b) => (
          <g key={b.key}>
            <rect
              x={b.x - 24}
              y={150}
              width={48}
              height={60}
              rx={4}
              className={b.color + " dark:opacity-80"}
              stroke="currentColor"
              strokeWidth={1.5}
            />
            <rect
              x={b.x - 28}
              y={144}
              width={56}
              height={8}
              rx={2}
              className="fill-stone-600 dark:fill-slate-700"
            />
            <text
              x={b.x}
              y={185}
              textAnchor="middle"
              fontSize={11}
              fontWeight={600}
              className="fill-stone-700 dark:fill-indigo-100"
            >
              {b.label}
            </text>
            {targetBin?.key === b.key && (
              <rect
                x={b.x - 26}
                y={148}
                width={52}
                height={64}
                rx={5}
                fill="none"
                className="stroke-emerald-500"
                strokeWidth={2.5}
              />
            )}
          </g>
        ))}

        {/* Item — flies from figure's hand to the target bin */}
        {step > 0 && targetBin && (
          <g
            style={{
              transition: "transform 700ms ease-out",
              transform: `translate(${targetBin.x - 60}px, ${
                step === 0 ? 0 : -10
              }px)`,
            }}
          >
            <rect
              x={56}
              y={120}
              width={18}
              height={18}
              rx={2}
              fill={currentItem.fill}
              stroke="currentColor"
              strokeWidth={1.5}
            />
            <text x={65} y={133} textAnchor="middle" fontSize={10}>
              {currentItem.label}
            </text>
          </g>
        )}

        {/* Stick figure */}
        <g className="text-stone-700 dark:text-indigo-100">
          <StickFigure
            x={60}
            y={210}
            pose={step === 0 ? "carry" : "stand"}
            holding={
              step === 0
                ? { label: currentItem.label, fill: currentItem.fill }
                : undefined
            }
          />
        </g>
      </svg>
    </div>
  );
}
