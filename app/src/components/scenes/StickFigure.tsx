// Minimal stick-figure SVG primitive used by intro scenes.
// Pose is a discriminator that the caller picks per step.

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
  /** Stroke color. Defaults to currentColor so it inherits the parent text color. */
  color?: string;
  /** Holds an item — renders a small box near the hand. */
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
  // Body geometry. Origin (0,0) is the figure's feet position.
  const stroke = 2.5;
  // Arm angles per pose
  const armL =
    pose === "wave" ? -120 :
    pose === "look-up" ? -45 :
    pose === "carry" ? -60 :
    pose === "walk-left" ? -25 :
    pose === "walk-right" ? -155 :
    -30;
  const armR =
    pose === "carry" ? -120 :
    pose === "walk-left" ? -155 :
    pose === "walk-right" ? -25 :
    -150;
  // Leg angles
  const legL =
    pose === "walk-left" ? -110 :
    pose === "walk-right" ? -70 :
    -80;
  const legR =
    pose === "walk-left" ? -70 :
    pose === "walk-right" ? -110 :
    -100;
  // Head tilt for look-up
  const headDy = pose === "look-up" ? -2 : 0;

  const torsoTop = -42;
  const torsoBottom = -14;
  const headCy = -50 + headDy;

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

  const armOriginY = -36;
  const hipY = -14;

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
      {/* Held item */}
      {holding && (
        <g
          transform={`translate(${aRx}, ${armOriginY + aRy})`}
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
