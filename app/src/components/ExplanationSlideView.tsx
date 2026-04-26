import { useMemo, useState } from "react";
import type { DemoBox, ExplanationSlide } from "../types";
import { Typewriter } from "./Typewriter";

type Props = { slide: ExplanationSlide };

function collectIds(boxes: DemoBox[], out: string[] = []): string[] {
  for (const b of boxes) {
    out.push(b.id);
    if (b.children) collectIds(b.children, out);
  }
  return out;
}

function RenderBox({
  box,
  styles,
  highlights,
}: {
  box: DemoBox;
  styles: Record<string, React.CSSProperties>;
  highlights: Set<string>;
}) {
  const style: React.CSSProperties = {
    transition: "all 500ms cubic-bezier(.2,.8,.2,1)",
    ...styles[box.id],
    outline: highlights.has(box.id) ? "2px solid #fcd34d" : undefined,
    outlineOffset: highlights.has(box.id) ? "4px" : undefined,
  };
  return (
    <div style={style} className="text-sm font-medium">
      {box.children
        ? box.children.map((c) => (
            <RenderBox
              key={c.id}
              box={c}
              styles={styles}
              highlights={highlights}
            />
          ))
        : box.label ?? box.id}
    </div>
  );
}

export function ExplanationSlideView({ slide }: Props) {
  const [step, setStep] = useState(0);
  const atEnd = step >= slide.steps.length - 1;
  const atStart = step === 0;

  const mergedStyles = useMemo(() => {
    const ids = collectIds(slide.demo);
    const out: Record<string, React.CSSProperties> = {};
    const find = (list: DemoBox[], id: string): DemoBox | null => {
      for (const b of list) {
        if (b.id === id) return b;
        if (b.children) {
          const r = find(b.children, id);
          if (r) return r;
        }
      }
      return null;
    };
    for (const id of ids) {
      const b = find(slide.demo, id);
      out[id] = { ...(b?.baseStyle ?? {}) };
    }
    const s = slide.steps[step]?.styles;
    if (s) {
      for (const [id, style] of Object.entries(s)) {
        out[id] = { ...(out[id] ?? {}), ...style };
      }
    }
    return out;
  }, [slide, step]);

  const current = slide.steps[step];
  const highlights = new Set(current?.highlight ?? []);

  const advance = () => !atEnd && setStep((s) => s + 1);
  const back = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!atStart) setStep((s) => s - 1);
  };

  return (
    <div
      className="h-full w-full flex flex-col cursor-pointer select-none"
      onClick={advance}
    >
      <div className="px-10 pt-8">
        <h2 className="text-3xl font-semibold text-stone-900 dark:text-indigo-50">
          {slide.title}
        </h2>
        {slide.intro && (
          <p className="text-stone-500 dark:text-indigo-200/70 mt-1">
            {slide.intro}
          </p>
        )}
      </div>

      <div className="flex-1 grid grid-cols-2 gap-8 px-10 py-8 min-h-0">
        <div className="flex items-center justify-center overflow-auto p-6">
          <div className="flex flex-wrap gap-4 items-center justify-center">
            {slide.demo.map((b) => (
              <RenderBox
                key={b.id}
                box={b}
                styles={mergedStyles}
                highlights={highlights}
              />
            ))}
          </div>
        </div>

        <div className="rounded-2xl p-6 flex flex-col
                        bg-white ring-1 ring-stone-200 shadow-sm
                        dark:bg-slate-900/60 dark:ring-white/10 dark:shadow-none">
          <div className="flex items-center justify-between mb-2">
            <div className="text-xs uppercase tracking-wider text-amber-600 dark:text-indigo-300/70">
              Steg {step + 1} / {slide.steps.length}
            </div>
            {!atStart && (
              <button
                onClick={back}
                className="text-xs px-2 py-1 rounded-md
                           bg-stone-100 hover:bg-stone-200 text-stone-700 ring-1 ring-stone-200
                           dark:bg-slate-700/70 dark:hover:bg-slate-600 dark:text-indigo-100 dark:ring-white/10"
              >
                ← Bakåt
              </button>
            )}
          </div>
          <div className="text-lg leading-relaxed min-h-[6rem] whitespace-pre-line text-stone-800 dark:text-indigo-50">
            {current?.narration ? (
              <Typewriter text={current.narration} />
            ) : (
              <span className="text-stone-400 dark:text-indigo-200/50 italic">…</span>
            )}
          </div>

          <div className="flex-1" />
          <div className="text-sm text-stone-500 dark:text-indigo-200/60">
            {atEnd
              ? "Slut på förklaringen."
              : "Klicka var som helst för att fortsätta →"}
          </div>
        </div>
      </div>
    </div>
  );
}
