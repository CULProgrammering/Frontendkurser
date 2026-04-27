import { StickFigure } from "./scenes/StickFigure";

/**
 * Quiet, motionless backdrop for the home view — "the room" the student
 * walks into. Same scene every visit: a crosswalk at dusk with a single
 * stick figure standing on the curb. No labels, no logic, no interaction.
 *
 * Intent: builds a sense of place across visits without demanding anything.
 * Pairs with the project's stability-seeker audience (see INTENT.md).
 */
export function RoomScene() {
  return (
    <div
      className="w-full rounded-2xl overflow-hidden ring-1
                 bg-gradient-to-b from-amber-50 to-stone-100 ring-stone-200
                 dark:from-slate-900 dark:to-slate-950 dark:ring-white/10"
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 800 220"
        className="w-full h-auto block"
        preserveAspectRatio="xMidYMid meet"
        role="presentation"
      >
        {/* Sky band — soft dusk gradient */}
        <defs>
          <linearGradient id="roomSky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" className="[stop-color:#fef3c7] dark:[stop-color:#1e293b]" />
            <stop offset="100%" className="[stop-color:#fde68a] dark:[stop-color:#0f172a]" />
          </linearGradient>
        </defs>

        {/* Sky */}
        <rect x={0} y={0} width={800} height={150} fill="url(#roomSky)" />

        {/* Distant horizon line — a faint hill silhouette */}
        <path
          d="M0,150 C 120,128 240,138 360,132 C 480,126 600,142 800,134 L 800,150 L 0,150 Z"
          className="fill-amber-200/60 dark:fill-slate-800/70"
        />

        {/* Road */}
        <rect
          x={0}
          y={150}
          width={800}
          height={70}
          className="fill-stone-300 dark:fill-slate-800"
        />

        {/* Crosswalk stripes — centered, restful spacing */}
        {[300, 360, 420, 480, 540].map((sx) => (
          <rect
            key={sx}
            x={sx}
            y={158}
            width={40}
            height={56}
            className="fill-stone-50/90 dark:fill-slate-700/80"
          />
        ))}

        {/* Lamppost — unlit, just standing there */}
        <g>
          <line
            x1={680}
            y1={150}
            x2={680}
            y2={70}
            className="stroke-stone-400 dark:stroke-slate-600"
            strokeWidth={2.5}
          />
          <rect
            x={665}
            y={45}
            width={30}
            height={28}
            rx={3}
            className="fill-stone-300 dark:fill-slate-700"
          />
          <circle
            cx={680}
            cy={59}
            r={5}
            className="fill-amber-200/80 dark:fill-amber-300/30"
          />
        </g>

        {/* Tiny moon — present in dark mode, faint in light mode */}
        <circle
          cx={120}
          cy={50}
          r={14}
          className="fill-stone-100/60 dark:fill-indigo-100/40"
        />

        {/* Stick figure standing on the curb, idle */}
        <g className="text-stone-700 dark:text-indigo-100">
          <StickFigure x={220} y={205} pose="stand" scale={1.2} />
        </g>
      </svg>
    </div>
  );
}
