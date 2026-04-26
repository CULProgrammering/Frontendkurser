import { useEffect, useMemo, useState } from "react";
import type { Allegory, JsPrimitive, JsTest, JsTypedAssignmentSlide } from "../types";
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

type Props = {
  slide: JsTypedAssignmentSlide;
  storageKey: string;
  onPass?: () => void;
};

type TestRun = { test: JsTest; result: RunResult; pass: boolean };

/**
 * Final-style exercise: code panel with embedded text inputs at marked
 * slots. On Check we substitute input values into the template and run
 * the assembled code through the standard test runner.
 */
export function JsTypedAssignmentSlideView({ slide, storageKey, onPass }: Props) {
  const { lang } = useLang();
  const template = t(slide.template, lang);

  // Parse the template into segments and slot ids.
  // /\[\[input:(\w+)\]\]/g splits and captures slot ids.
  const segments = useMemo(() => parseTemplate(template), [template]);
  const slotIds = useMemo(
    () => segments.filter((s): s is { kind: "slot"; id: string } => s.kind === "slot").map((s) => s.id),
    [segments]
  );

  // Slot values, persisted per-storage-key.
  const initial: Record<string, string> = useMemo(() => {
    const stored = sessionGet(storageKey);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed && typeof parsed === "object") {
          return { ...defaultsFor(slide, slotIds), ...parsed };
        }
      } catch {
        /* ignore */
      }
    }
    return defaultsFor(slide, slotIds);
  }, [storageKey, slide, slotIds]);

  const [values, setValues] = useState<Record<string, string>>(initial);
  const [runs, setRuns] = useState<TestRun[] | null>(null);
  const [focusedIdx, setFocusedIdx] = useState(0);
  const [replayKey, setReplayKey] = useState(0);
  const [showLegend, setShowLegend] = useState(false);
  const hasLegend = !!slide.legend && slide.legend.length > 0;

  useEffect(() => {
    sessionSet(storageKey, JSON.stringify(values));
  }, [storageKey, values]);

  const assembledCode = useMemo(
    () => assembleCode(segments, values),
    [segments, values]
  );

  const runChecks = () => {
    const out: TestRun[] = slide.tests.map((tst) => {
      const r = runUserCode(assembledCode, tst.vars);
      const pass = r.ok && deepEqual(r.value, tst.expected);
      return { test: tst, result: r, pass };
    });
    setRuns(out);
    const firstFail = out.findIndex((r) => !r.pass);
    setFocusedIdx(firstFail === -1 ? 0 : firstFail);
    setReplayKey((k) => k + 1);
  };

  const reset = () => {
    setValues(defaultsFor(slide, slotIds));
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

  const displayedVars: Record<string, JsPrimitive | undefined> = useMemo(() => {
    const source = focusedRun?.test ?? slide.tests[0];
    return source ? source.vars : {};
  }, [focusedRun, slide.tests]);

  const runtimeError: string | null = (() => {
    if (!runs || runs.length === 0 || allPass) return null;
    const focused = runs[focusedIdx];
    if (focused && !focused.result.ok) return focused.result.error;
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
      <div className="px-10 pt-8">
        <h2 className="text-3xl font-semibold text-stone-900 dark:text-indigo-50">
          {t(slide.title, lang)}
        </h2>
        <p className="text-stone-600 dark:text-indigo-200/80 mt-1 whitespace-pre-line">
          {t(slide.prompt, lang)}
        </p>
      </div>

      <div className={"flex-1 grid gap-6 px-10 py-6 min-h-0 " + (slide.allegory ? "grid-cols-2" : "grid-cols-1")}>
        {/* Code panel with embedded inputs */}
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
              className="font-mono text-sm px-4 pt-3 pb-1 select-none border-b
                         text-stone-500 bg-stone-100 border-stone-200
                         dark:text-indigo-200/60 dark:bg-slate-900/40 dark:border-white/10"
              aria-label="declared variables"
            >
              {slide.varNames.map((name) => {
                const value = displayedVars[name];
                return (
                  <div key={name}>{`let ${name} = ${formatPrimitive(value)};`}</div>
                );
              })}
            </div>
          )}
          <div
            className="flex-1 font-mono text-sm p-4 whitespace-pre overflow-auto
                       bg-slate-900 text-indigo-50 dark:bg-slate-950"
          >
            {segments.map((seg, i) =>
              seg.kind === "text" ? (
                <span key={i}>{seg.text}</span>
              ) : (
                <SlotInput
                  key={i}
                  value={values[seg.id] ?? ""}
                  onChange={(v) =>
                    setValues((prev) => ({ ...prev, [seg.id]: v }))
                  }
                />
              )
            )}
          </div>
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

        {/* Scene + status (only if allegory) */}
        {slide.allegory && (
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

            {runs && allPass && (
              <div className="border-t border-stone-200 dark:border-white/10 px-4 py-3
                              text-sm font-medium text-emerald-700 dark:text-emerald-300">
                {t({ en: "✓ Done", sv: "✓ Klart" }, lang)}
              </div>
            )}
            {runs && !allPass && runtimeError && (
              <div className="border-t border-stone-200 dark:border-white/10 px-4 py-3
                              text-sm
                              bg-rose-50 text-rose-800
                              dark:bg-rose-500/10 dark:text-rose-200">
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
            {runs && !allPass && !runtimeError && slide.goalHint && (
              <div className="border-t border-stone-200 dark:border-white/10 px-4 py-3
                              text-sm text-stone-600 dark:text-indigo-200/80">
                {t(slide.goalHint, lang)}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Status row when there's no allegory column */}
      {!slide.allegory && runs && (
        <div className="mx-10 mb-4">
          {allPass ? (
            <div className="rounded-xl px-4 py-3 text-sm font-medium
                            bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200
                            dark:bg-emerald-500/10 dark:text-emerald-300 dark:ring-emerald-400/30">
              {t({ en: "✓ Done — all tests pass.", sv: "✓ Klart — alla testfall stämmer." }, lang)}
            </div>
          ) : runtimeError ? (
            <div className="rounded-xl px-4 py-3 text-sm
                            bg-rose-50 text-rose-800 ring-1 ring-rose-200
                            dark:bg-rose-500/10 dark:text-rose-200 dark:ring-rose-400/30">
              <div className="font-medium mb-1">
                {t({ en: "The code couldn't run — check for typos:", sv: "Koden kunde inte köras — kolla efter typo:" }, lang)}
              </div>
              <div className="font-mono text-xs">{runtimeError}</div>
            </div>
          ) : slide.goalHint ? (
            <div className="rounded-xl px-4 py-3 text-sm
                            bg-stone-50 text-stone-700 ring-1 ring-stone-200
                            dark:bg-slate-900/60 dark:text-indigo-200 dark:ring-white/10">
              {t(slide.goalHint, lang)}
            </div>
          ) : null}
        </div>
      )}

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

// --- helpers ---

type Segment = { kind: "text"; text: string } | { kind: "slot"; id: string };

function parseTemplate(template: string): Segment[] {
  const out: Segment[] = [];
  const re = /\[\[input:([A-Za-z0-9_]+)\]\]/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(template)) !== null) {
    if (m.index > last) out.push({ kind: "text", text: template.slice(last, m.index) });
    out.push({ kind: "slot", id: m[1] });
    last = m.index + m[0].length;
  }
  if (last < template.length) out.push({ kind: "text", text: template.slice(last) });
  return out;
}

function assembleCode(segments: Segment[], values: Record<string, string>): string {
  return segments
    .map((seg) => (seg.kind === "text" ? seg.text : values[seg.id] ?? ""))
    .join("");
}

function defaultsFor(slide: JsTypedAssignmentSlide, slotIds: string[]): Record<string, string> {
  const out: Record<string, string> = {};
  for (const id of slotIds) {
    out[id] = slide.initialValues?.[id] ?? "";
  }
  return out;
}

function formatPrimitive(v: JsPrimitive | undefined): string {
  if (v === undefined) return "undefined";
  if (typeof v === "string") return JSON.stringify(v);
  return String(v);
}

function SlotInput({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  // Width grows with content; min keeps the slot visible when empty.
  // We use content-box so the `ch`-based width sizes the TEXT AREA, not the
  // padded box. Plus a 1ch tail so the cursor (and trailing space) stay
  // visible without forcing horizontal scrolling.
  const width = Math.max(value.length, 4) + 1;
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      spellCheck={false}
      autoCapitalize="off"
      autoCorrect="off"
      className="inline-block align-baseline mx-0.5 px-1.5 py-0 rounded
                 font-mono text-sm
                 bg-amber-500/20 text-amber-100 ring-1 ring-amber-400/60
                 focus:outline-none focus:ring-2 focus:ring-amber-300
                 dark:bg-indigo-500/20 dark:text-indigo-100 dark:ring-indigo-400/60
                 dark:focus:ring-indigo-300"
      style={{ width: `${width}ch`, boxSizing: "content-box" }}
    />
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
    case "loop-result":
      return <LoopResultScene config={allegory.config} run={run} replayKey={replayKey} lang={lang} />;
  }
}
