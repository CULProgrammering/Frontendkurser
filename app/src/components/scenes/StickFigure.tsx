// Minimal stick-figure SVG primitive used by intro scenes.
//
// Coordinate convention: SVG y increases DOWNWARD. All angles are
// expressed in standard math degrees where 0° = right, 90° = down,
// 180° = left, 270° (or -90°) = up.

type Pose =
  | "stand"
  | "walk-left"
  | "walk-right"
  | "look-up"
  | "shrug"
  | "carry"
  | "wave";

type Props = {
  x: number;
  y: number;
  pose?: Pose;
  /** Stroke color. Defaults to currentColor so it inherits parent text color. */
  color?: string;
  /** Holds an item — renders a small box near the right hand. */
  holding?: { label?: string; fill?: string };
  /** Body scale, default 1. */
  scale?: number;
};

export function StickFigure({
  x,
  y,
  pose = "stand",
  color = "currentColor",
  holding,
  scale = 1,
}: Props) {
  const stroke = 2.5;

  // Angles in SVG-degrees (0 = right, 90 = down, 180 = left, -90/270 = up).
  // Left arm:
  const armL =
    pose === "wave"      ? -110 :  // raised up-left
    pose === "look-up"   ? 100 :   // down-left
    pose === "carry"     ? 60 :    // forward-right (meets right arm)
    pose === "walk-right"? 60 :    // forward
    pose === "walk-left" ? 120 :   // back
    100;                            // stand: down-left

  // Right arm:
  const armR =
    pose === "wave"      ? 80 :    // down-right
    pose === "look-up"   ? 80 :    // down-right
    pose === "carry"     ? 120 :   // forward-left (meets left arm)
    pose === "walk-right"? 120 :   // back
    pose === "walk-left" ? 60 :    // forward
    80;                             // stand: down-right

  // Legs: walking poses get an obvious stride, stand is a slight V.
  const legL =
    pose === "walk-right" ? 70 :   // forward
    pose === "walk-left"  ? 110 :  // back
    100;                            // stand: slight left-down

  const legR =
    pose === "walk-right" ? 110 :  // back
    pose === "walk-left"  ? 70 :   // forward
    80;                             // stand: slight right-down

  const headDy = pose === "look-up" ? -2 : 0;

  // Body geometry. Origin (0,0) is at the figure's feet.
  const headCy = -50 + headDy;
  const torsoTop = -42;
  const torsoBottom = -14;
  const armOriginY = -36;
  const hipY = -14;

  const armLen = 14;
  const legLen = 16;

  const polar = (deg: number, len: number) => {
    const r = (deg * Math.PI) / 180;
    return [Math.cos(r) * len, Math.sin(r) * len] as const;
  };

  const [aLx, aLy] = polar(armL, armLen);
  const [aRx, aRy] = polar(armR, armLen);
  const [lLx, lLy] = polar(legL, legLen);
  const [lRx, lRy] = polar(legR, legLen);

  // Right hand position — for held item.
  const rightHandX = aRx;
  const rightHandY = armOriginY + aRy;

  return (
    <g
      transform={`translate(${x}, ${y}) scale(${scale})`}
      stroke={color}
      strokeWidth={stroke}
      strokeLinecap="round"
      fill="none"
      style={{ transition: "transform 600ms ease-out" }}
    >
      {/* Head */}
      <circle cx={0} cy={headCy} r={7} />
      {/* Torso */}
      <line x1={0} y1={torsoTop} x2={0} y2={torsoBottom} />
      {/* Left arm */}
      <line x1={0} y1={armOriginY} x2={aLx} y2={armOriginY + aLy} />
      {/* Right arm */}
      <line x1={0} y1={armOriginY} x2={aRx} y2={armOriginY + aRy} />
      {/* Left leg */}
      <line x1={0} y1={hipY} x2={lLx} y2={hipY + lLy} />
      {/* Right leg */}
      <line x1={0} y1={hipY} x2={lRx} y2={hipY + lRy} />
      {/* Held item near the right hand */}
      {holding && (
        <g
          transform={`translate(${rightHandX}, ${rightHandY})`}
          fill={holding.fill ?? "#fcd34d"}
          stroke={color}
          strokeWidth={1.5}
        >
          <rect x={-5} y={-5} width={10} height={10} rx={1.5} />
          {holding.label && (
            <text
              x={0}
              y={3}
              textAnchor="middle"
              fontSize={7}
              fill={color}
              stroke="none"
            >
              {holding.label}
            </text>
          )}
        </g>
      )}
    </g>
  );
}
