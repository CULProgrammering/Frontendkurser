import { useEffect, useMemo, useRef, useState } from "react";
import Editor from "@monaco-editor/react";
import type { JsWorkshopSlide, WorkshopCheck, WorkshopStep } from "../types";
import {
  runWorkshopChecks,
  type CheckResult,
} from "../runtime/workshopRunner";
import { useLang } from "../i18n/LanguageContext";
import { t } from "../i18n";
import type { Lang } from "../i18n";
import { ui } from "../i18n/strings";
import { sessionGet, sessionSet } from "../storage";
import { useSlideFontSize } from "./SlideFontSize";

const AUTO_ADVANCE_MS = 1200;

/**
 * Minimal interface for the Monaco editor instance — only the methods we
 * actually call. Avoids depending on monaco-editor's type exports.
 */
type CodeEditorHandle = {
  setPosition: (pos: { lineNumber: number; column: number }) => void;
  revealPositionInCenter: (pos: { lineNumber: number; column: number }) => void;
  focus: () => void;
  setValue: (v: string) => void;
};

/**
 * Prepare the seed for a step: produce the editor's initial value plus a
 * cursor target so the student can start typing right where they should.
 *
 * Heuristic:
 *   1. Find the last line containing a `//` comment.
 *   2. If the line BELOW it is empty/whitespace, place the cursor there.
 *   3. Otherwise (closing brace follows immediately), insert a new
 *      whitespace-only line at the comment's indent and land the cursor on it.
 *   4. If no comment is found at all, place the cursor at the end of the
 *      last line.
 */
function prepareSeed(starterCode: string): {
  code: string;
  cursor: { lineNumber: number; column: number };
} {
  const lines = starterCode.split("\n");

  let lastCommentIdx = -1;
  for (let i = lines.length - 1; i >= 0; i--) {
    if (lines[i].includes("//")) {
      lastCommentIdx = i;
      break;
    }
  }

  if (lastCommentIdx === -1) {
    // No comment — cursor at the end of the last non-empty line.
    let i = lines.length - 1;
    while (i > 0 && lines[i] === "") i--;
    return {
      code: starterCode,
      cursor: { lineNumber: i + 1, column: lines[i].length + 1 },
    };
  }

  const commentIndent = lines[lastCommentIdx].match(/^\s*/)![0];
  const nextLine = lines[lastCommentIdx + 1];

  // If the line directly below the comment is missing or whitespace-only,
  // we can land the cursor there without inserting anything.
  if (nextLine === undefined || /^\s*$/.test(nextLine)) {
    return {
      code: starterCode,
      cursor: {
        lineNumber: lastCommentIdx + 2,
        column: commentIndent.length + 1,
      },
    };
  }

  // Otherwise (closing `}` or other code follows the comment), insert an
  // indented blank line right after the comment so the cursor lands inside
  // the surrounding block.
  const newLines = [
    ...lines.slice(0, lastCommentIdx + 1),
    commentIndent,
    ...lines.slice(lastCommentIdx + 1),
  ];
  return {
    code: newLines.join("\n"),
    cursor: {
      lineNumber: lastCommentIdx + 2,
      column: commentIndent.length + 1,
    },
  };
}

type Props = {
  slide: JsWorkshopSlide;
  storageKey: string;
  onPass?: () => void;
};

/**
 * Workshop tier — guided micro-step exercise. RESET model: each step has its
 * own authored starterCode, and editor content is reseeded when the student
 * navigates to a new step (the inner StepView is keyed by step id, so it
 * fully remounts).
 *
 * Outer (this) component owns: which step is active, which steps the student
 * has cleared in this session, the auto-advance timer, and the step counter.
 * The inner WorkshopStepView owns its own code/results state and renders the
 * Check / Restart-step buttons in a row above the editor (right-aligned over
 * the editor column).
 */
export function JsWorkshopSlideView({ slide, storageKey, onPass }: Props) {
  const { lang } = useLang();
  const [stepIdx, setStepIdx] = useState(0);
  const [completed, setCompleted] = useState<Set<number>>(() => new Set());
  const advanceTimer = useRef<number | null>(null);

  const total = slide.steps.length;
  const step: WorkshopStep | undefined = slide.steps[stepIdx];

  // Cancel a pending auto-advance whenever the user navigates manually.
  useEffect(() => {
    return () => {
      if (advanceTimer.current !== null) {
        window.clearTimeout(advanceTimer.current);
        advanceTimer.current = null;
      }
    };
  }, [stepIdx]);

  if (!step) {
    return (
      <div className="h-full flex items-center justify-center px-6">
        <p className="text-stone-500 dark:text-indigo-200/60 italic">
          {t(ui.tierEmpty, lang)}
        </p>
      </div>
    );
  }

  const isLast = stepIdx === total - 1;

  const handleStepPass = () => {
    setCompleted((prev) => {
      if (prev.has(stepIdx)) return prev;
      const next = new Set(prev);
      next.add(stepIdx);
      return next;
    });

    if (isLast) {
      onPass?.();
      return;
    }

    if (advanceTimer.current !== null) {
      window.clearTimeout(advanceTimer.current);
    }
    advanceTimer.current = window.setTimeout(() => {
      advanceTimer.current = null;
      setStepIdx((i) => Math.min(i + 1, total - 1));
    }, AUTO_ADVANCE_MS);
  };

  const goToStep = (i: number) => {
    if (advanceTimer.current !== null) {
      window.clearTimeout(advanceTimer.current);
      advanceTimer.current = null;
    }
    setStepIdx(i);
  };

  return (
    <div className="h-full w-full flex flex-col p-4 sm:p-5">
      <div className="flex-1 min-h-0">
        <WorkshopStepView
          key={step.id}
          slide={slide}
          step={step}
          stepIdx={stepIdx}
          total={total}
          completed={completed}
          onJump={goToStep}
          storageKey={`${storageKey}:step:${step.id}`}
          lang={lang}
          onPass={handleStepPass}
        />
      </div>
    </div>
  );
}

function StepCounter({
  total,
  stepIdx,
  completed,
  onJump,
}: {
  total: number;
  stepIdx: number;
  completed: Set<number>;
  onJump: (i: number) => void;
}) {
  if (total <= 1) return null;
  return (
    <div
      className="flex flex-wrap items-center gap-1.5"
      aria-label="Workshop step progress"
    >
      {Array.from({ length: total }).map((_, i) => {
        const isCurrent = i === stepIdx;
        const isDone = completed.has(i);
        return (
          <button
            key={i}
            onClick={() => onJump(i)}
            aria-label={`Go to step ${i + 1}`}
            aria-current={isCurrent ? "step" : undefined}
            className={
              "h-7 w-7 rounded-full text-xs font-medium transition-colors " +
              (isCurrent
                ? "bg-amber-500 text-white dark:bg-indigo-300 dark:text-slate-900"
                : isDone
                ? "bg-emerald-400 text-white hover:bg-emerald-500 dark:bg-emerald-500/70 dark:text-emerald-50 dark:hover:bg-emerald-500/90"
                : "bg-stone-200 text-stone-600 hover:bg-stone-300 dark:bg-white/20 dark:text-indigo-100 dark:hover:bg-white/30")
            }
          >
            {/* Done shows ✓ regardless of current — so the last step also flips
                to ✓ when its onPass fires (instead of staying on its number). */}
            {isDone ? "✓" : i + 1}
          </button>
        );
      })}
    </div>
  );
}

function WorkshopStepView({
  slide,
  step,
  stepIdx,
  total,
  completed,
  onJump,
  storageKey,
  lang,
  onPass,
}: {
  slide: JsWorkshopSlide;
  step: WorkshopStep;
  stepIdx: number;
  total: number;
  completed: Set<number>;
  onJump: (i: number) => void;
  storageKey: string;
  lang: Lang;
  onPass: () => void;
}) {
  const { codePx, prosePx } = useSlideFontSize();

  // Prepare the seed: if the last `// ...` comment line is followed by a
  // closing brace (or otherwise non-empty line), insert a blank line just
  // below the comment with matching indent so the cursor has a sensible spot
  // INSIDE the surrounding block. Also computes where to land the cursor on
  // mount so the student can start typing immediately.
  const seed = useMemo(
    () => prepareSeed(t(step.starterCode, lang)),
    [step, lang]
  );
  const seedCode = seed.code;

  const [code, setCode] = useState<string>(
    () => sessionGet(storageKey) ?? seedCode
  );
  const [results, setResults] = useState<CheckResult[] | null>(null);
  const editorRef = useRef<CodeEditorHandle | null>(null);

  useEffect(() => {
    sessionSet(storageKey, code);
  }, [storageKey, code]);

  const allPass = useMemo(
    () =>
      results !== null &&
      results.length === step.checks.length &&
      results.every((r) => r.pass),
    [results, step]
  );

  // Fire onPass once per step, when the result transitions to all-pass.
  // The outer component decides whether to auto-advance or mark tier-complete.
  const passFiredRef = useRef(false);
  useEffect(() => {
    if (allPass && !passFiredRef.current) {
      passFiredRef.current = true;
      onPass();
    }
    if (!allPass) passFiredRef.current = false;
    // onPass is stable enough — the outer wraps it. Don't refire on identity changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allPass]);

  const isDark =
    typeof document !== "undefined" &&
    document.documentElement.classList.contains("dark");

  const check = () => {
    setResults(runWorkshopChecks(code, step.checks));
  };

  const restartStep = () => {
    setCode(seedCode);
    setResults(null);
    // Reset Monaco directly so cursor + focus apply this tick instead of
    // waiting for React to commit the controlled value.
    const ed = editorRef.current;
    if (ed) {
      ed.setValue(seedCode);
      ed.setPosition(seed.cursor);
      ed.revealPositionInCenter(seed.cursor);
      ed.focus();
    }
  };

  // Ctrl/Cmd+Enter keyboard shortcut while the editor is focused. Monaco's
  // addCommand fires before the editor's default Ctrl+Enter (Insert Line Below),
  // so this overrides cleanly. We hold the latest `check` in a ref because the
  // command callback registered on first mount would otherwise close over a
  // stale `code` value.
  const checkRef = useRef(check);
  useEffect(() => {
    checkRef.current = check;
  });

  const firstFailIdx = results ? results.findIndex((r) => !r.pass) : -1;
  const firstFail =
    firstFailIdx >= 0
      ? { check: step.checks[firstFailIdx], result: results![firstFailIdx] }
      : null;

  const isLast = stepIdx === total - 1;

  return (
    <div className="h-full w-full flex flex-col md:flex-row gap-4">
      {/* LEFT column: header row (step counter + Check/Restart) above the editor. */}
      <div className="flex-1 flex flex-col min-h-0 gap-2">
        <div className="flex flex-wrap items-center gap-3">
          <StepCounter
            total={total}
            stepIdx={stepIdx}
            completed={completed}
            onJump={onJump}
          />
          <div className="ml-auto flex gap-2">
            <button
              onClick={check}
              title={t(ui.workshopCheckShortcut, lang)}
              className="px-3 py-1.5 rounded-lg text-white text-sm font-medium
                         bg-amber-500 hover:bg-amber-600
                         dark:bg-indigo-500 dark:hover:bg-indigo-400"
            >
              {t(ui.check, lang)}
            </button>
            <button
              onClick={restartStep}
              className="px-3 py-1.5 rounded-lg text-sm
                         bg-stone-100 hover:bg-stone-200 text-stone-700
                         dark:bg-slate-700 dark:hover:bg-slate-600 dark:text-white"
            >
              {t(ui.workshopRestartStep, lang)}
            </button>
          </div>
        </div>
        <div
          className="flex-1 flex flex-col min-h-0 rounded-2xl overflow-hidden
                     bg-white ring-1 ring-stone-200 shadow-sm
                     dark:bg-slate-900/60 dark:ring-white/10 dark:shadow-none"
        >
          <div
            className="px-4 py-2 text-xs uppercase tracking-wider border-b
                       text-amber-600 border-stone-200
                       dark:text-indigo-300/70 dark:border-white/10"
          >
            {t(ui.jsLabel, lang)}
          </div>
          <div className="flex-1 min-h-0">
            <Editor
              height="100%"
              language="javascript"
              theme={isDark ? "vs-dark" : "vs"}
              value={code}
              onChange={(v) => setCode(v ?? "")}
              onMount={(editor, monacoNs) => {
                editorRef.current = editor as unknown as CodeEditorHandle;
                editor.addCommand(
                  monacoNs.KeyMod.CtrlCmd | monacoNs.KeyCode.Enter,
                  () => checkRef.current()
                );
                // Land cursor on the typing line and focus so the student
                // can start typing immediately on first mount and after an
                // auto-advance (the inner component remounts per step).
                editor.setPosition(seed.cursor);
                editor.revealPositionInCenter(seed.cursor);
                editor.focus();
              }}
              options={{
                minimap: { enabled: false },
                fontSize: codePx,
                scrollBeyondLastLine: false,
                wordWrap: "on",
                tabSize: 2,
                automaticLayout: true,
                lineNumbers: "on",
                renderLineHighlight: "line",
              }}
            />
          </div>
        </div>
      </div>

      {/* RIGHT column: instructions + status */}
      <div
        className="flex-1 min-h-0 overflow-y-auto rounded-2xl
                   bg-white ring-1 ring-stone-200 shadow-sm
                   dark:bg-slate-900/60 dark:ring-white/10 dark:shadow-none"
      >
        <div className="px-5 pt-5 pb-4 border-b border-stone-200 dark:border-white/10">
          <h2 className="text-xl sm:text-2xl font-semibold text-stone-900 dark:text-indigo-50">
            {t(slide.title, lang)}
          </h2>
          <p
            className="text-stone-600 dark:text-indigo-200/80 mt-1 whitespace-pre-line"
            style={{ fontSize: `${prosePx}px` }}
          >
            {t(slide.prompt, lang)}
          </p>
        </div>

        <div className="px-5 py-4 border-b border-stone-200 dark:border-white/10">
          <div
            className="text-xs uppercase tracking-wider mb-2
                       text-amber-600 dark:text-indigo-300/70"
          >
            {t(ui.workshopStepLabel, lang)} {stepIdx + 1} / {total}
          </div>
          <p
            className="text-stone-700 dark:text-indigo-100 whitespace-pre-line"
            style={{ fontSize: `${prosePx}px` }}
          >
            {t(step.instruction, lang)}
          </p>
        </div>

        <div className="p-5" style={{ fontSize: `${prosePx}px` }}>
          {results === null && (
            <div className="text-stone-500 dark:text-indigo-200/60 italic">
              {t(ui.workshopCheckHint, lang)}
            </div>
          )}
          {allPass && (
            <div
              className="rounded-xl px-4 py-3 font-medium
                         bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200
                         dark:bg-emerald-500/10 dark:text-emerald-300 dark:ring-emerald-400/30"
            >
              {isLast
                ? t(ui.workshopAllStepsPass, lang)
                : t(ui.workshopStepPassAdvancing, lang)}
            </div>
          )}
          {!allPass && firstFail && (
            <FailureMessage
              check={firstFail.check}
              result={firstFail.result}
              lang={lang}
            />
          )}
        </div>
      </div>
    </div>
  );
}

function FailureMessage({
  check,
  result,
  lang,
}: {
  check: WorkshopCheck;
  result: CheckResult;
  lang: Lang;
}) {
  const isError = result.pass === false && result.kind === "error";
  return (
    <div
      className={
        "rounded-xl px-4 py-3 " +
        (isError
          ? "bg-rose-50 text-rose-800 ring-1 ring-rose-200 dark:bg-rose-500/10 dark:text-rose-200 dark:ring-rose-400/30"
          : "bg-amber-50 text-amber-800 ring-1 ring-amber-200 dark:bg-amber-500/10 dark:text-amber-200 dark:ring-amber-400/30")
      }
    >
      <div className="font-medium mb-1">{t(check.message, lang)}</div>
      {isError && result.kind === "error" && (
        <div className="font-mono text-xs mt-1 opacity-80">{result.error}</div>
      )}
    </div>
  );
}
