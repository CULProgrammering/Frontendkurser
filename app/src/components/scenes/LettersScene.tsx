import { StickFigure } from "./StickFigure";

type Props = { step: number };

/**
 * L2 Loops intro: figure reading letters of a word one at a time.
 *
 * The word "HELLO" is shown as 5 letter slots. As `step` advances, each
 * letter lights up — illustrating "for each letter in this word, do X."
 */
export function LettersScene({ step }: Props) {
  const word = "HELLO";
  // step 0 → idle (none lit)
  // step 1..N → each letter lit
  // step >= N+1 → all lit, figure waves
  const litUpTo = Math.min(Math.max(step - 0, 0), word.length);

  const slotW = 50;
  const slotH = 60;
  const baseX = 80;
  const baseY = 90;

  return (
    <div className="w-full h-full flex items-center justify-center">
      <svg
        viewBox="0 0 400 240"
        className="w-full h-auto max-h-[420px]"
        role="img"
        aria-label="Figure reading letters of a word"
      >
        <rect x={0} y={0} width={400} height={240} className="fill-stone-50 dark:fill-slate-900" />

        {/* Letter slots */}
        {word.split("").map((ch, i) => {
          const x = baseX + i * slotW;
          const lit = i < litUpTo;
          return (
            <g key={i}>
              <rect
                x={x}
                y={baseY}
                width={slotW - 6}
                height={slotH}
                rx={6}
                className={
                  lit
                    ? "fill-amber-200 dark:fill-amber-500/30"
                    : "fill-stone-200 dark:fill-slate-800"
                }
                stroke="currentColor"
                strokeWidth={1}
                style={{ transition: "all 400ms ease-out" }}
              />
              <text
                x={x + (slotW - 6) / 2}
                y={baseY + slotH / 2 + 8}
                textAnchor="middle"
                fontSize={26}
                fontWeight={700}
                fontFamily="ui-monospace, monospace"
                className={
                  lit
                    ? "fill-amber-800 dark:fill-amber-100"
                    : "fill-stone-400 dark:fill-slate-500"
                }
                style={{ transition: "all 400ms ease-out" }}
              >
                {ch}
              </text>
            </g>
          );
        })}

        {/* Stick figure pointing at the current letter (centered under it) */}
        {(() => {
          // Slot i center: baseX + i*slotW + (slotW - 6) / 2
          // Figure base x: figureBaseX. translateX = slotCenter - figureBaseX.
          const figureBaseX = 80;
          const slotIdx = litUpTo === 0 ? -1 : Math.min(litUpTo, word.length) - 1;
          const slotCenter =
            slotIdx < 0
              ? figureBaseX
              : baseX + slotIdx * slotW + (slotW - 6) / 2;
          const tx = slotCenter - figureBaseX;
          return (
            <g
              className="text-stone-700 dark:text-indigo-100"
              style={{
                transition: "transform 500ms ease-out",
                transform: `translateX(${tx}px)`,
              }}
            >
              <StickFigure
                x={figureBaseX}
                y={220}
                pose={
                  litUpTo === 0
                    ? "stand"
                    : litUpTo >= word.length
                    ? "wave"
                    : "look-up"
                }
              />
            </g>
          );
        })()}

        {/* Variable chip */}
        <g transform="translate(20, 30)">
          <rect
            x={0}
            y={0}
            width={130}
            height={28}
            rx={6}
            className="fill-white dark:fill-slate-800"
            stroke="currentColor"
            strokeWidth={1}
          />
          <text
            x={65}
            y={19}
            textAnchor="middle"
            fontSize={13}
            fontWeight={600}
            fontFamily="ui-monospace, monospace"
            className="fill-stone-700 dark:fill-indigo-100"
          >
            {litUpTo === 0
              ? "ch = ?"
              : `ch = "${word[Math.min(litUpTo, word.length) - 1]}"`}
          </text>
        </g>
      </svg>
    </div>
  );
}
