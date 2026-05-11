import { useTheme } from "./ThemeToggle";
import { accentFor, type TopicAccent } from "../topics";

/**
 * Small, abstract chapter-cover glyph for topic and course cards. One scene
 * per topic id; each glyph is a single SVG rendered in monochrome on a
 * tinted surface that uses the topic's accent.
 *
 * The glyphs are intentionally **not** the same as the lesson-internal scenes
 * in [`components/scenes`](./scenes) — those tell a story inside slides
 * (crosswalk traffic light, wardrobe outfits, bouncer doorman). The covers
 * here are quieter and exist just to give each topic-card a recognizable
 * thumbprint in the lesson list.
 *
 * Adding a new topic id:
 *   1. Add an accent entry in [`topics.ts`](../topics.ts).
 *   2. Add a `case` to the `<switch>` below — or rely on the default glyph.
 */

type Props = {
  /** Topic id (matches the keys in `TOPIC_ACCENTS`). */
  topicId?: string;
  /** Course id — used as fallback when `topicId` is unknown. */
  courseId?: string;
  /** Pre-resolved accent. When provided, overrides the topic/course lookup. */
  accent?: TopicAccent;
  /** Optional extra class on the outer wrapper (e.g. `rounded-lg`). */
  className?: string;
};

export function ChapterCover({ topicId, courseId, accent, className }: Props) {
  const { theme } = useTheme();
  const dark = theme === "dark";
  const a = accent ?? accentFor(topicId, courseId);
  const fg = dark ? a.fgHex.dark : a.fgHex.light;
  const bg = dark ? a.bgHex.dark : a.bgHex.light;

  return (
    <div
      className={`relative w-full aspect-[4/3] rounded-lg overflow-hidden ${className ?? ""}`}
      style={{ background: bg }}
      aria-hidden
    >
      <svg viewBox="0 0 88 66" className="w-full h-full">
        {pickGlyph(topicId, courseId, fg)}
      </svg>
    </div>
  );
}

function pickGlyph(
  topicId: string | undefined,
  courseId: string | undefined,
  fg: string,
) {
  switch (topicId) {
    case "variables":
      return <Variables fg={fg} />;
    case "conditionals":
      return <Conditionals fg={fg} />;
    case "loops":
      return <Loops fg={fg} />;
    case "functions":
      return <Functions fg={fg} />;
    case "arrays":
      return <Arrays fg={fg} />;
    case "objects":
      return <Objects fg={fg} />;
    default:
      // CSS course (no topics) gets the box-model-ish "Arrays" wardrobe row;
      // anything else falls back to the sticky-note (Variables) glyph.
      if (courseId === "css") return <Arrays fg={fg} />;
      return <Variables fg={fg} />;
  }
}

/* ------------------------------------------------------------------ */
/* Glyphs                                                              */
/* ------------------------------------------------------------------ */
/* Each glyph is sized for the 88×66 viewBox. Stroke widths are tuned
 * so the glyph reads at thumbnail size (≤ 80px) without going hairline.
 */

function Variables({ fg }: { fg: string }) {
  // Sticky note — the metaphor used in the Variables explanation tier.
  return (
    <g>
      <rect
        x="22"
        y="14"
        width="44"
        height="44"
        rx="3"
        fill={fg}
        fillOpacity="0.18"
        stroke={fg}
        strokeWidth="1.5"
      />
      <line x1="28" y1="26" x2="58" y2="26" stroke={fg} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="28" y1="34" x2="52" y2="34" stroke={fg} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="28" y1="42" x2="46" y2="42" stroke={fg} strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="44" cy="14" r="3" fill={fg} />
    </g>
  );
}

function Conditionals({ fg }: { fg: string }) {
  // Branching path — a fork with two destinations (one bright, one dim).
  return (
    <g>
      <path
        d="M 44 12 L 44 36 M 44 36 L 30 56 M 44 36 L 58 56"
        stroke={fg}
        strokeWidth="1.8"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="30" cy="58" r="3" fill={fg} />
      <circle cx="58" cy="58" r="3" fill={fg} fillOpacity="0.4" />
      <rect x="40" y="8" width="8" height="8" rx="1.5" fill={fg} fillOpacity="0.3" />
    </g>
  );
}

function Loops({ fg }: { fg: string }) {
  // Circular arrow — the canonical loop icon, with three iteration dots.
  return (
    <g>
      <path
        d="M 26 36 A 18 18 0 1 1 44 54"
        stroke={fg}
        strokeWidth="1.8"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M 38 50 L 44 54 L 42 47"
        stroke={fg}
        strokeWidth="1.8"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="44" cy="36" r="2" fill={fg} />
      <circle cx="38" cy="42" r="2" fill={fg} fillOpacity="0.4" />
      <circle cx="50" cy="42" r="2" fill={fg} fillOpacity="0.4" />
    </g>
  );
}

function Functions({ fg }: { fg: string }) {
  // Box with input + output arrows — the bouncer-scene metaphor.
  return (
    <g>
      <rect x="30" y="22" width="28" height="28" rx="3" stroke={fg} strokeWidth="1.5" fill={fg} fillOpacity="0.15" />
      <path d="M 18 36 L 30 36" stroke={fg} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M 26 32 L 30 36 L 26 40" stroke={fg} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M 58 36 L 70 36" stroke={fg} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M 66 32 L 70 36 L 66 40" stroke={fg} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <text
        x="44"
        y="40"
        textAnchor="middle"
        fontSize="9"
        fontFamily="JetBrains Mono, ui-monospace, monospace"
        fill={fg}
      >
        fn
      </text>
    </g>
  );
}

function Arrays({ fg }: { fg: string }) {
  // Wardrobe row — slots with different fill heights echoing array index access.
  return (
    <g>
      <rect x="20" y="20" width="48" height="32" rx="2" stroke={fg} strokeWidth="1.5" fill="none" />
      <line x1="32" y1="20" x2="32" y2="52" stroke={fg} strokeWidth="1.2" />
      <line x1="44" y1="20" x2="44" y2="52" stroke={fg} strokeWidth="1.2" />
      <line x1="56" y1="20" x2="56" y2="52" stroke={fg} strokeWidth="1.2" />
      <rect x="22" y="28" width="8" height="8" fill={fg} fillOpacity="0.5" />
      <rect x="34" y="32" width="8" height="14" fill={fg} fillOpacity="0.3" />
      <rect x="46" y="24" width="8" height="20" fill={fg} fillOpacity="0.4" />
      <rect x="58" y="30" width="8" height="10" fill={fg} fillOpacity="0.25" />
    </g>
  );
}

function Objects({ fg }: { fg: string }) {
  // Key/value rows — each row a label + value pair.
  return (
    <g>
      <rect x="22" y="18" width="44" height="36" rx="3" stroke={fg} strokeWidth="1.5" fill="none" />
      <line x1="28" y1="28" x2="36" y2="28" stroke={fg} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="42" y1="28" x2="58" y2="28" stroke={fg} strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.5" />
      <line x1="28" y1="36" x2="36" y2="36" stroke={fg} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="42" y1="36" x2="54" y2="36" stroke={fg} strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.5" />
      <line x1="28" y1="44" x2="36" y2="44" stroke={fg} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="42" y1="44" x2="50" y2="44" stroke={fg} strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.5" />
    </g>
  );
}
