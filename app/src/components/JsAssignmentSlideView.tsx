import { useEffect, useMemo, useState } from "react";
import type { Allegory, JsAssignmentSlide, JsTest } from "../types";
import { runUserCode, deepEqual, describeValue, type RunResult } from "../runtime/jsRunner";
import { DoorScene } from "./allegories/DoorScene";
import { ForkScene } from "./allegories/ForkScene";
import { ConveyorScene } from "./allegories/ConveyorScene";
import { MultiGateScene } from "./allegories/MultiGateScene";
import { CrosswalkAllegory } from "./allegories/CrosswalkAllegory";
import type { SceneRun } from "./allegories/types";
import { useLang } from "../i18n/LanguageContext";
import { t } from "../i18n";
import type { Lang } from "../i18n";
import { ui } from "../i18n/strings";

type Props = {
  slide: JsAssignmentSlide;
  storageKey: string;
  onPass?: () => void;
};

type TestRun = { test: JsTest; result: RunResult; pass: boolean };

export function JsAssignmentSlideView({ slide, storageKey, onPass }: Props) {
  const { lang } = useLang();
  const starter = t(slide.starterCode, lang);

  const [code, setCode] = useState<string>(
    () => sessionStorage.getItem(storageKey) ?? starter
  );
  const [runs, setRuns] = useState<TestRun[] | null>(null);
  const [focusedIdx, setFocusedIdx] = useState(0);
  const [replayKey, setReplayKey] = useState(0);
  const [showLegend, setShowLegend] = useState(false);
  const hasLegend = !!slide.legend && slide.legend.length > 0;

  useEffect(() => {
    sessionStorage.setItem(storageKey, code);
  }, [storageKey, code]);

  const runChecks = () => {
    const out: TestRun[] = slide.tests.map((tst) => {
      const r = runUserCode(code, slide.functionName, tst.input, {
        bodyOnly: slide.bodyOnly,
        paramName: slide.paramName,
      });
      const pass = r.ok && deepEqual(r.value, tst.expected);
      return { test: tst, result: r, pass };
    });
    setRuns(out);
    const firstFail = out.findIndex((r) => !r.pass);
    setFocusedIdx(firstFail === -1 ? 0 : firstFail);
    setReplayKey((k) => k + 1);
  };

  const reset = () => {
    setCode(starter);
    setRuns(null);
  };

  const allPass = runs !== null && runs.every((r) => r.pass);

  useEffect(() => {
    if (allPass) onPass?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allPass]);

  const focusedRun: SceneRun | null = useMemo(() => {
    if (!runs || !runs[focusedIdx]) return null;
    return runs[focusedIdx];
  }, [runs, focusedIdx]);

  return (
    <div className="h-full w-full flex flex-col">
      <div className="px-10 pt-8">
        <h2 className="text-3xl font-semibold text-stone-900 dark:text-indigo-50">
          {t(slide.title, lang)}
        </h2>
        <p className="text-stone-600 dark:text-indigo-200/80 mt-1 whitespace-pre-line">
          {t(slide.prompt, lang)}
        </p>
      </div>

      <div className="flex-1 grid grid-cols-2 gap-6 px-10 py-6 min-h-0">
        {/* Editor column */}
        <div className="flex flex-col rounded-2xl overflow-hidden
                        bg-white ring-1 ring-stone-200 shadow-sm
                        dark:bg-slate-900/60 dark:ring-white/10 dark:shadow-none">
          <div className="px-4 py-2 text-xs uppercase tracking-wider border-b
                          text-amber-600 border-stone-200
                          dark:text-indigo-300/70 dark:border-white/10">
            {t(ui.jsLabel, lang)}
          </div>
          {slide.bodyOnly && (
            <div
              className="font-mono text-sm px-4 pt-3 pb-1 select-none
                         text-stone-400 bg-stone-50
                         dark:text-indigo-200/40 dark:bg-transparent"
              aria-hidden
            >
              {`function ${slide.functionName}(${slide.paramName ?? "input"}) {`}
            </div>
          )}
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            spellCheck={false}
            className={
              "flex-1 font-mono text-sm outline-none resize-none " +
              "bg-stone-50 text-stone-900 dark:bg-transparent dark:text-indigo-50 " +
              (slide.bodyOnly ? "px-8 py-2" : "p-4")
            }
          />
          {slide.bodyOnly && (
            <div
              className="font-mono text-sm px-4 pt-1 pb-3 select-none
                         text-stone-400 bg-stone-50
                         dark:text-indigo-200/40 dark:bg-transparent"
              aria-hidden
            >
              {"}"}
            </div>
          )}
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
              run={focusedRun}
              replayKey={replayKey}
              lang={lang}
            />
          </div>

          {runs && (
            <div className="border-t border-stone-200 dark:border-white/10 p-3">
              <div className="flex flex-wrap gap-2 mb-2">
                {runs.map((r, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setFocusedIdx(i);
                      setReplayKey((k) => k + 1);
                    }}
                    className={
                      "px-2.5 py-1 rounded-full text-xs ring-1 transition " +
                      (i === focusedIdx ? "ring-2 " : "") +
                      (r.pass
                        ? "bg-emerald-50 text-emerald-700 ring-emerald-200 dark:bg-emerald-500/15 dark:text-emerald-300 dark:ring-emerald-500/30"
                        : "bg-stone-100 text-stone-700 ring-stone-200 dark:bg-slate-800 dark:text-indigo-100 dark:ring-white/10")
                    }
                  >
                    {r.pass ? "✓" : "·"} {t(r.test.label, lang)}
                  </button>
                ))}
              </div>

              <Summary runs={runs} allPass={allPass} focused={focusedRun} lang={lang} />
            </div>
          )}
        </div>
      </div>

      {showLegend && hasLegend && (
        <div className="mx-10 mb-6 rounded-2xl p-4 ring-1
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

function Summary({
  runs,
  allPass,
  focused,
  lang,
}: {
  runs: TestRun[];
  allPass: boolean;
  focused: SceneRun | null;
  lang: Lang;
}) {
  const passCount = runs.filter((r) => r.pass).length;

  if (allPass) {
    return (
      <div className="text-emerald-700 dark:text-emerald-300 font-medium text-sm">
        {t(ui.allTestsPass, lang)}
      </div>
    );
  }

  return (
    <div className="text-sm space-y-1">
      <div className="text-stone-600 dark:text-indigo-200/70">
        {passCount} {t(ui.outOfRight, lang)} {runs.length} {t(ui.testsClear, lang)}
      </div>
      {focused && !focused.pass && <FailureDetail run={focused} lang={lang} />}
    </div>
  );
}

function FailureDetail({ run, lang }: { run: TestRun; lang: Lang }) {
  if (!run.result.ok) {
    return (
      <div className="text-amber-700 dark:text-amber-300 text-xs whitespace-pre-line">
        {t(ui.errorPrefix, lang)} {run.result.error}
      </div>
    );
  }
  return (
    <div className="text-xs text-stone-600 dark:text-indigo-200/70">
      {t(ui.expected, lang)}{" "}
      <span className="font-mono text-emerald-700 dark:text-emerald-300">
        {describeValue(run.test.expected)}
      </span>
      {" · "}
      {t(ui.yourCodeGave, lang)}{" "}
      <span className="font-mono text-amber-700 dark:text-amber-300">
        {describeValue(run.result.value)}
      </span>
    </div>
  );
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
  }
}
