import { useEffect, useMemo, useState } from "react";
import type { Allegory, JsAssignmentSlide, JsPrimitive, JsTest } from "../types";
import { runUserCode, deepEqual, type RunResult } from "../runtime/jsRunner";
import { DoorScene } from "./allegories/DoorScene";
import { ForkScene } from "./allegories/ForkScene";
import { ConveyorScene } from "./allegories/ConveyorScene";
import { MultiGateScene } from "./allegories/MultiGateScene";
import { CrosswalkAllegory } from "./allegories/CrosswalkAllegory";
import { LoopResultScene } from "./allegories/LoopResultScene";
import type { SceneRun } from "./allegories/types";
import { useLang } from "../i18n/LanguageContext";
import { t } from "../i18n";
import type { Lang } from "../i18n";
import { ui } from "../i18n/strings";
import { sessionGet, sessionSet } from "../storage";
import { useSlideFontSize } from "./SlideFontSize";

type Props = {
  slide: JsAssignmentSlide;
  storageKey: string;
  onPass?: () => void;
};

type TestRun = { test: JsTest; result: RunResult; pass: boolean };

export function JsAssignmentSlideView({ slide, storageKey, onPass }: Props) {
  const { lang } = useLang();
  const { codePx, prosePx } = useSlideFontSize();
  const starter = t(slide.starterCode, lang);

  const [code, setCode] = useState<string>(
    () => sessionGet(storageKey) ?? starter
  );
  const [runs, setRuns] = useState<TestRun[] | null>(null);
  const [focusedIdx, setFocusedIdx] = useState(0);
  const [replayKey, setReplayKey] = useState(0);
  const [showLegend, setShowLegend] = useState(false);
  const hasLegend = !!slide.legend && slide.legend.length > 0;

  useEffect(() => {
    sessionSet(storageKey, code);
  }, [storageKey, code]);

  const runChecks = () => {
    const out: TestRun[] = slide.tests.map((tst) => {
      const r = runUserCode(code, tst.vars);
      const pass = r.ok && deepEqual(r.value, tst.expected);
      return { test: tst, result: r, pass };
    });
    setRuns(out);

    const firstFail = out.findIndex((r) => !r.pass);
    let focused = 0;
    if (firstFail !== -1) {
      focused = firstFail;
    } else if (slide.allegory.kind === "crosswalk") {
      // All pass — focus a test where the figure visibly walks, so the student
      // gets a clear "you did it" signal instead of a passive "nothing happens".
      const walkWhen = slide.allegory.config.walkWhen ?? true;
      const walkIdx = out.findIndex(
        (r) => r.result.ok && deepEqual(r.result.value, walkWhen)
      );
      if (walkIdx !== -1) focused = walkIdx;
    }
    setFocusedIdx(focused);
    setReplayKey((k) => k + 1);
  };

  const reset = () => {
    setCode(starter);
    setRuns(null);
  };

  const allPass = runs !== null && runs.every((r) => r.pass);
  const patternMet = !slide.requirePattern || slide.requirePattern.test(code);
  const showSuccess = allPass && patternMet;

  useEffect(() => {
    if (showSuccess) onPass?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showSuccess]);

  const focusedRun: SceneRun | null = useMemo(() => {
    if (!runs || !runs[focusedIdx]) return null;
    return runs[focusedIdx];
  }, [runs, focusedIdx]);

  // Variables shown in the read-only `let ...` panel above the editor.
  // Default: the first test's values. After Check: the focused test's values
  // (so a failing test shows the inputs that produced the failure).
  const displayedVars: Record<string, JsPrimitive | undefined> = useMemo(() => {
    const source = focusedRun?.test ?? slide.tests[0];
    return source ? source.vars : {};
  }, [focusedRun, slide.tests]);

  // When `requirePattern` blocks success, suppress the animation entirely so
  // the student doesn't see a misleading "looks like it worked" replay.
  const animationRun: SceneRun | null =
    runs !== null && slide.requirePattern && !showSuccess ? null : focusedRun;

  // Specific-placeholder hints — override the slide's general goalHint when
  // a known unfilled placeholder is detected in the source.
  const placeholderHint = detectPlaceholderHint(code, lang);

  // If every run failed with the SAME error (or the focused run errored),
  // surface that error so the student isn't stuck guessing why nothing happens.
  // Typo-level mistakes (missing quote, missing brace) hide silently otherwise.
  const runtimeError: string | null = (() => {
    if (!runs || runs.length === 0 || showSuccess) return null;
    // Prefer the focused run's error if it has one.
    const focused = runs[focusedIdx];
    if (focused && !focused.result.ok) return focused.result.error;
    // Otherwise, if all runs share the same error, show that.
    const errs = runs
      .map((r) => (r.result.ok ? null : r.result.error))
      .filter((e): e is string => e !== null);
    if (errs.length === runs.length && errs.every((e) => e === errs[0])) {
      return errs[0];
    }
    return null;
  })();

  return (
    <div className="h-full w-full flex flex-col">
      <div className="px-4 sm:px-10 pt-4 sm:pt-8">
        <h2 className="text-xl sm:text-3xl font-semibold text-stone-900 dark:text-indigo-50">
          {t(slide.title, lang)}
        </h2>
        <p className="text-stone-600 dark:text-indigo-200/80 mt-1 whitespace-pre-line">
          {t(slide.prompt, lang)}
        </p>
      </div>

      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 px-4 sm:px-10 py-3 sm:py-6 min-h-0">
        {/* Editor column */}
        <div className="flex flex-col rounded-2xl overflow-hidden
                        bg-white ring-1 ring-stone-200 shadow-sm
                        dark:bg-slate-900/60 dark:ring-white/10 dark:shadow-none">
          <div className="px-4 py-2 text-xs uppercase tracking-wider border-b
                          text-amber-600 border-stone-200
                          dark:text-indigo-300/70 dark:border-white/10">
            {t(ui.jsLabel, lang)}
          </div>
          {slide.varNames.length > 0 && (
            <div
              className="font-mono px-4 pt-3 pb-1 select-none border-b
                         text-stone-500 bg-stone-100 border-stone-200
                         dark:text-indigo-200/60 dark:bg-slate-900/40 dark:border-white/10"
              aria-label="declared variables"
              style={{ fontSize: `${codePx}px` }}
            >
              {slide.varNames.map((name) => {
                const value = displayedVars[name];
                return (
                  <div key={name}>
                    {`let ${name} = ${formatPrimitive(value)};`}
                  </div>
                );
              })}
            </div>
          )}
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            spellCheck={false}
            className={
              "flex-1 font-mono outline-none resize-none p-4 " +
              "bg-stone-50 text-stone-900 dark:bg-transparent dark:text-indigo-50"
            }
            style={{ fontSize: `${codePx}px` }}
          />
          <div className="flex gap-2 p-3 border-t border-stone-200 dark:border-white/10">
            <button
              onClick={runChecks}
              className="px-3 py-1.5 rounded-lg text-white text-sm font-medium
                         bg-amber-500 hover:bg-amber-600
                         dark:bg-indigo-500 dark:hover:bg-indigo-400"
            >
              {t(ui.check, lang)}
            </button>
            <button
              onClick={reset}
              className="px-3 py-1.5 rounded-lg text-sm
                         bg-stone-100 hover:bg-stone-200 text-stone-700
                         dark:bg-slate-700 dark:hover:bg-slate-600 dark:text-white"
            >
              {t(ui.reset, lang)}
            </button>
            {hasLegend && (
              <button
                onClick={() => setShowLegend((v) => !v)}
                className="ml-auto px-3 py-1.5 rounded-lg text-sm ring-1
                           bg-amber-100 hover:bg-amber-200 text-amber-800 ring-amber-300
                           dark:bg-amber-500/20 dark:hover:bg-amber-500/30 dark:text-amber-200 dark:ring-amber-400/30"
              >
                {t(showLegend ? ui.hideHelp : ui.showHelp, lang)}
              </button>
            )}
          </div>
        </div>

        {/* Scene + results column */}
        <div className="flex flex-col rounded-2xl overflow-hidden min-h-0
                        bg-white ring-1 ring-stone-200 shadow-sm
                        dark:bg-slate-900/60 dark:ring-white/10 dark:shadow-none">
          <div className="px-4 py-2 text-xs uppercase tracking-wider border-b
                          text-amber-600 border-stone-200
                          dark:text-indigo-300/70 dark:border-white/10">
            {focusedRun
              ? `${t(ui.testLabel, lang)} ${focusedIdx + 1}: ${t(focusedRun.test.label, lang)}`
              : t(ui.testCases, lang)}
          </div>

          <div className="flex-1 min-h-0">
            <SceneMount
              allegory={slide.allegory}
              run={animationRun}
              replayKey={replayKey}
              lang={lang}
            />
          </div>

          {/* Status footer: appears after Check.
              showSuccess → "✓ Done"; otherwise → placeholder hint or goalHint. */}
          {runs && showSuccess && (
            <div
              className="border-t border-stone-200 dark:border-white/10 px-4 py-3
                            font-medium text-emerald-700 dark:text-emerald-300"
              style={{ fontSize: `${prosePx}px` }}
            >
              {t({ en: "✓ Done", sv: "✓ Klart" }, lang)}
            </div>
          )}
          {runs && !showSuccess && runtimeError && (
            <div
              className="border-t border-stone-200 dark:border-white/10 px-4 py-3
                            bg-rose-50 text-rose-800
                            dark:bg-rose-500/10 dark:text-rose-200"
              style={{ fontSize: `${prosePx}px` }}
            >
              <div className="font-medium mb-1">
                {t(
                  {
                    en: "The code couldn't run — check for typos:",
                    sv: "Koden kunde inte köras — kolla efter typo:",
                  },
                  lang
                )}
              </div>
              <div className="font-mono text-xs">{runtimeError}</div>
            </div>
          )}
          {runs && !showSuccess && !runtimeError && (placeholderHint || slide.goalHint) && (
            <div
              className="border-t border-stone-200 dark:border-white/10 px-4 py-3
                            text-stone-600 dark:text-indigo-200/80"
              style={{ fontSize: `${prosePx}px` }}
            >
              {placeholderHint
                ? t(placeholderHint, lang)
                : t(slide.goalHint!, lang)}
            </div>
          )}
        </div>
      </div>

      {showLegend && hasLegend && (
        <div className="mx-4 sm:mx-10 mb-4 sm:mb-6 rounded-2xl p-4 ring-1
                        bg-amber-50 ring-amber-200
                        dark:bg-amber-500/10 dark:ring-amber-400/30">
          <div className="text-xs uppercase tracking-wider mb-2
                          text-amber-700 dark:text-amber-200">
            {t(ui.legendLabel, lang)}
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {slide.legend!.map((e, i) => (
              <div
                key={i}
                className="rounded-lg p-3 ring-1
                           bg-white ring-stone-200
                           dark:bg-slate-900/60 dark:ring-white/10"
              >
                <div className="font-semibold text-amber-800 dark:text-amber-100">
                  {t(e.name, lang)}
                </div>
                <div className="font-mono text-xs text-stone-600 dark:text-indigo-200/80">
                  {e.syntax}
                </div>
                <div className="font-mono text-xs mt-1 text-emerald-700 dark:text-emerald-200/90">
                  {e.example}
                </div>
                {e.note && (
                  <div className="text-xs mt-1 text-stone-500 dark:text-indigo-200/60">
                    {t(e.note, lang)}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * Look at the user's code for known unfilled placeholders. Returns a friendly
 * Localized string when one is detected, otherwise null (caller falls back to
 * the slide's general goalHint).
 *
 * Patterns:
 *  - `if (___)`               → condition placeholder
 *  - `} ___ {`                → else-keyword placeholder (between the if's
 *                                closing } and the else's opening {)
 */
function detectPlaceholderHint(code: string, _lang: import("../i18n").Lang) {
  // Check condition placeholder first — students should fix the if(...) before else.
  if (/if\s*\(\s*___\s*\)/.test(code)) {
    return {
      en: "Fill in the condition inside the if's parentheses.",
      sv: "Fyll i villkoret inuti if-parenteserna.",
    };
  }
  if (/}\s*___\s*\{/.test(code)) {
    return {
      en: "The ___ between the } and the { needs to be the keyword: else",
      sv: "___ mellan } och { ska vara nyckelordet: else",
    };
  }
  return null;
}

/** Render a primitive the way it would appear in JS source. */
function formatPrimitive(v: JsPrimitive | undefined): string {
  if (v === undefined) return "undefined";
  if (typeof v === "string") return JSON.stringify(v);
  return String(v);
}

function SceneMount({
  allegory,
  run,
  replayKey,
  lang,
}: {
  allegory: Allegory;
  run: SceneRun | null;
  replayKey: number;
  lang: Lang;
}) {
  switch (allegory.kind) {
    case "door":
      return <DoorScene config={allegory.config} run={run} replayKey={replayKey} lang={lang} />;
    case "fork":
      return <ForkScene config={allegory.config} run={run} replayKey={replayKey} lang={lang} />;
    case "conveyor":
      return <ConveyorScene config={allegory.config} run={run} replayKey={replayKey} lang={lang} />;
    case "multi-gate":
      return <MultiGateScene config={allegory.config} run={run} replayKey={replayKey} lang={lang} />;
    case "crosswalk":
      return <CrosswalkAllegory config={allegory.config} run={run} replayKey={replayKey} lang={lang} />;
    case "loop-result":
      return <LoopResultScene config={allegory.config} run={run} replayKey={replayKey} lang={lang} />;
  }
}
