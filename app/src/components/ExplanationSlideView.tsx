import { useMemo, useState } from "react";
import type { CSSProperties } from "react";
import type { DemoBox, ExplanationSlide } from "../types";
import { Typewriter } from "./Typewriter";
import { useLang } from "../i18n/LanguageContext";
import { t } from "../i18n";
import { ui } from "../i18n/strings";
import { CrosswalkScene } from "./scenes/CrosswalkScene";
import { WardrobeScene } from "./scenes/WardrobeScene";
import { RecyclingScene } from "./scenes/RecyclingScene";
import { BouncerScene } from "./scenes/BouncerScene";

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
  resolveLabel,
}: {
  box: DemoBox;
  styles: Record<string, CSSProperties>;
  highlights: Set<string>;
  resolveLabel: (b: DemoBox) => string;
}) {
  const style: CSSProperties = {
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
              resolveLabel={resolveLabel}
            />
          ))
        : resolveLabel(box)}
    </div>
  );
}

export function ExplanationSlideView({ slide }: Props) {
  const [step, setStep] = useState(0);
  const atEnd = step >= slide.steps.length - 1;
  const atStart = step === 0;
  const { lang } = useLang();

  const mergedStyles = useMemo(() => {
    const ids = collectIds(slide.demo);
    const out: Record<string, CSSProperties> = {};
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

  const resolveLabel = (b: DemoBox) =>
    b.label ? t(b.label, lang) : b.id;

  return (
    <div
      className="h-full w-full flex flex-col cursor-pointer select-none"
      onClick={advance}
    >
      <div className="px-10 pt-8">
        <h2 className="text-3xl font-semibold text-stone-900 dark:text-indigo-50">
          {t(slide.title, lang)}
        </h2>
        {slide.intro && (
          <p className="text-stone-500 dark:text-indigo-200/70 mt-1">
            {t(slide.intro, lang)}
          </p>
        )}
      </div>

      <div className="flex-1 grid grid-cols-2 gap-8 px-10 py-8 min-h-0">
        <div className="flex items-center justify-center overflow-auto p-2">
          {slide.customScene ? (
            <CustomScene id={slide.customScene} step={step} />
          ) : (
            <div className="flex flex-wrap gap-4 items-center justify-center">
              {slide.demo.map((b) => (
                <RenderBox
                  key={b.id}
                  box={b}
                  styles={mergedStyles}
                  highlights={highlights}
                  resolveLabel={resolveLabel}
                />
              ))}
            </div>
          )}
        </div>

        <div className="rounded-2xl p-6 flex flex-col
                        bg-white ring-1 ring-stone-200 shadow-sm
                        dark:bg-slate-900/60 dark:ring-white/10 dark:shadow-none">
          <div className="flex items-center justify-between mb-2">
            <div className="text-xs uppercase tracking-wider text-amber-600 dark:text-indigo-300/70">
              {t(ui.stepLabel, lang)} {step + 1} / {slide.steps.length}
            </div>
            {!atStart && (
              <button
                onClick={back}
                className="text-xs px-2 py-1 rounded-md
                           bg-stone-100 hover:bg-stone-200 text-stone-700 ring-1 ring-stone-200
                           dark:bg-slate-700/70 dark:hover:bg-slate-600 dark:text-indigo-100 dark:ring-white/10"
              >
                {t(ui.stepBack, lang)}
              </button>
            )}
          </div>
          <div className="text-lg leading-relaxed min-h-[6rem] whitespace-pre-line text-stone-800 dark:text-indigo-50">
            {current?.narration ? (
              <Typewriter text={t(current.narration, lang)} />
            ) : (
              <span className="text-stone-400 dark:text-indigo-200/50 italic">…</span>
            )}
          </div>

          <div className="flex-1" />
          <div className="text-sm text-stone-500 dark:text-indigo-200/60">
            {atEnd
              ? t(ui.endOfExplanation, lang)
              : t(ui.clickToContinue, lang)}
          </div>
        </div>
      </div>
    </div>
  );
}

function CustomScene({ id, step }: { id: string; step: number }) {
  switch (id) {
    case "crosswalk":
      return <CrosswalkScene step={step} />;
    case "wardrobe":
      return <WardrobeScene step={step} />;
    case "recycling":
      return <RecyclingScene step={step} />;
    case "bouncer":
      return <BouncerScene step={step} />;
    default:
      return null;
  }
}
