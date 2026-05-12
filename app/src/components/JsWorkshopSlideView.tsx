import { useEffect, useMemo, useRef, useState } from "react";
import type { JsWorkshopSlide, WorkshopCheck, WorkshopStep } from "../types";
import {
  runWorkshopChecksWithConsole,
  type CheckResult,
  type ConsoleEntry,
} from "../runtime/workshopRunner";
import { t } from "../i18n";
import { ui } from "../i18n/strings";
import { sessionGet, sessionSet } from "../storage";
import { useSlideFontSize, SlideFontSizeControl } from "./SlideFontSize";
import { ThemeToggleInline } from "./ThemeToggle";
import { ValuesPill } from "./ValuesPill";
import { SlideTitleRow, type BreadcrumbSegment } from "./SlideDeck";
import { CodeEditor, type CodeEditorHandle } from "./CodeEditor";
import { TwoColumnLayout } from "./TwoColumnLayout";
import { WindowedStepCounter } from "./WindowedStepCounter";
import { tokens } from "../styles/tokens";

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
  breadcrumb?: BreadcrumbSegment[];
  slideJumpDots?: React.ReactNode;
  onPass?: () => void;
  /**
   * Called when the student finishes the final step and clicks the Back
   * button (or fires Ctrl+Enter once already on the completed last step).
   * Routes them back to the lesson's tier menu — better than hunting for
   * the breadcrumb when you've just earned a green checkmark.
   */
  onExit?: () => void;
  /**
   * Starting step index. Defaults to 0. Set when the caller wants the
   * student to land on a specific step — e.g. walkthrough step grid on
   * the topic view picks step N and routes here with initialIdx=N.
   */
  initialIdx?: number;
};

/**
 * Workshop tier — guided micro-step exercise. RESET model: each step has its
 * own authored starterCode, and editor content is reseeded when the student
 * navigates to a new step (the inner StepView is keyed by step id, so it
 * fully remounts).
 *
 * Outer (this) component owns: which step is active, which steps the student
 * has cleared in this session, and the step counter. The inner
 * WorkshopStepView owns its own code/results/console state and renders Check
 * / Restart-step / Next-step buttons. There is no auto-advance — the student
 * always clicks Next themselves, so they can review the console output before
 * moving on.
 */
export function JsWorkshopSlideView({ slide, storageKey, breadcrumb, slideJumpDots, onPass, onExit, initialIdx }: Props) {
  const [stepIdx, setStepIdx] = useState(() =>
    typeof initialIdx === "number"
      ? Math.max(0, Math.min(initialIdx, slide.steps.length - 1))
      : 0,
  );
  const [completed, setCompleted] = useState<Set<number>>(() => new Set());

  const total = slide.steps.length;
  const step: WorkshopStep | undefined = slide.steps[stepIdx];

  if (!step) {
    return (
      <div className="h-full flex items-center justify-center px-6">
        <p className="text-stone-500 dark:text-stone-400 italic">
          {t(ui.tierEmpty)}
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
    }
  };

  const advanceToNext = () => {
    setStepIdx((i) => Math.min(i + 1, total - 1));
  };

  return (
    <div className="h-full w-full flex flex-col p-4 sm:p-5 max-w-[min(1700px,92vw)] mx-auto">
      <div className="flex-1 min-h-0">
        <WorkshopStepView
          key={step.id}
          slide={slide}
          step={step}
          stepIdx={stepIdx}
          total={total}
          completed={completed}
          onJump={setStepIdx}
          storageKey={`${storageKey}:step:${step.id}`}
          breadcrumb={breadcrumb}
          slideJumpDots={slideJumpDots}
          onPass={handleStepPass}
          onAdvance={advanceToNext}
          onExit={onExit}
        />
      </div>
    </div>
  );
}

// Step counter is centralised in WindowedStepCounter — handles both the
// 4-step lesson workshop case (flat dots, no windowing) and the 20+ step
// walkthrough case (windowed with edge-aware suppression). See its file
// for the threshold and algorithm.

function WorkshopStepView({
  slide,
  step,
  stepIdx,
  total,
  completed,
  onJump,
  storageKey,
  breadcrumb,
  slideJumpDots,
  onPass,
  onAdvance,
  onExit,
}: {
  slide: JsWorkshopSlide;
  step: WorkshopStep;
  stepIdx: number;
  total: number;
  completed: Set<number>;
  onJump: (i: number) => void;
  storageKey: string;
  breadcrumb?: BreadcrumbSegment[];
  slideJumpDots?: React.ReactNode;
  onPass: () => void;
  onAdvance: () => void;
  onExit?: () => void;
}) {
  // Sticky completion: once the student has passed this step in this session,
  // the Next-step button stays available even if they later edit the code in
  // a way that breaks the checks. Lets them play / experiment freely without
  // losing their place.
  const isCompleted = completed.has(stepIdx);
  const { codePx, prosePx } = useSlideFontSize();
  // Hint is collapsed by default — students see only the directional
  // instruction. Click "Hint" to reveal the literal answer or a fuller nudge
  // (authored on the step). Per-step component remounts via `key={step.id}`,
  // so the hint state resets when the student moves to the next step.
  const [hintShown, setHintShown] = useState(false);

  // Prepare the seed: if the last `// ...` comment line is followed by a
  // closing brace (or otherwise non-empty line), insert a blank line just
  // below the comment with matching indent so the cursor has a sensible spot
  // INSIDE the surrounding block. Also computes where to land the cursor on
  // mount so the student can start typing immediately.
  const seed = useMemo(
    () => prepareSeed(t(step.starterCode)),
    [step]
  );
  const seedCode = seed.code;

  const [code, setCode] = useState<string>(
    () => sessionGet(storageKey) ?? seedCode
  );
  const [results, setResults] = useState<CheckResult[] | null>(null);
  const [consoleLogs, setConsoleLogs] = useState<ConsoleEntry[]>([]);
  const editorRef = useRef<CodeEditorHandle | null>(null);

  useEffect(() => {
    sessionSet(storageKey, code);
  }, [storageKey, code]);

  // On mount, auto-run the starter code purely to capture initial console
  // output. We pass an empty checks array so no pass/fail results are
  // produced — the student isn't told "wrong" before they've typed
  // anything. Steps whose starterCode contains `console.log(...)` calls
  // (e.g. demos that print a value) now show the output immediately
  // instead of requiring a Check click first.
  //
  // The output goes stale once the student edits the code; that's
  // acceptable — Check refreshes it, and re-running on every keystroke
  // would be noisy and risk tripping the loop guard.
  useEffect(() => {
    const { logs } = runWorkshopChecksWithConsole(seedCode, []);
    setConsoleLogs(logs);
    // Keyed off the step (via parent's `key={step.id}`) so this fires
    // exactly once per step mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const allPass = useMemo(
    () =>
      results !== null &&
      results.length === step.checks.length &&
      results.every((r) => r.pass),
    [results, step]
  );

  // Fire onPass once per step, when the result transitions to all-pass.
  // The outer component records completion + (for the last step) marks the
  // tier complete. There's no auto-advance — the student clicks Next.
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

  const isLast = stepIdx === total - 1;

  const check = () => {
    const { results: r, logs } = runWorkshopChecksWithConsole(code, step.checks);
    setResults(r);
    setConsoleLogs(logs);
  };

  // Ctrl+Enter inside the editor calls this. Once a step is completed the
  // "primary action" shifts: we don't want students re-checking the same
  // passing code — we want them to advance (or, on the final step, exit
  // back to the workshop selection).
  const handleEditorSubmit = () => {
    if (isCompleted) {
      if (!isLast) {
        onAdvance();
      } else if (onExit) {
        onExit();
      }
      return;
    }
    check();
  };

  const restartStep = () => {
    setCode(seedCode);
    setResults(null);
    setConsoleLogs([]);
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

  const firstFailIdx = results ? results.findIndex((r) => !r.pass) : -1;
  const firstFail =
    firstFailIdx >= 0
      ? { check: step.checks[firstFailIdx], result: results![firstFailIdx] }
      : null;

  const editorPanel = (
    <div className="flex-1 flex flex-col min-h-0 gap-2">
      <div className="flex flex-wrap items-center gap-3">
        <WindowedStepCounter
          total={total}
          stepIdx={stepIdx}
          completed={completed}
          onJump={onJump}
        />
        <div className="ml-auto flex gap-2">
          <button
            onClick={check}
            title={t(ui.workshopCheckShortcut)}
            className={`${tokens.button.primary} min-h-[44px] sm:min-h-0`}
          >
            {t(ui.check)}
          </button>
          <button
            onClick={restartStep}
            className={`${tokens.button.secondary} min-h-[44px] sm:min-h-0`}
          >
            {t(ui.workshopRestartStep)}
          </button>
        </div>
      </div>
      <div
        className={`flex-1 flex flex-col min-h-0 ${tokens.card.surface} overflow-hidden`}
      >
        <div
          className={`${tokens.text.eyebrow} px-4 py-2 border-b border-stone-900/[0.05] dark:border-white/[0.05]`}
        >
          {t(ui.jsLabel)}
        </div>
        <div className="flex-1 min-h-0">
          <CodeEditor
            language="javascript"
            value={code}
            onChange={setCode}
            fontSize={codePx}
            onSubmit={handleEditorSubmit}
            onMount={(handle) => {
              editorRef.current = handle;
              // Land cursor on the typing line and focus so the student
              // can start typing immediately on first mount and after an
              // auto-advance (the inner component remounts per step).
              handle.setPosition(seed.cursor);
              handle.revealPositionInCenter(seed.cursor);
              handle.focus();
            }}
          />
        </div>
      </div>
    </div>
  );

  const instructionsPanel = (
    <div
      className={`flex-1 min-h-0 overflow-y-auto ${tokens.card.surface}`}
    >
      <div className="px-5 pt-5 pb-4 border-b border-stone-900/[0.05] dark:border-white/[0.05]">
        <SlideTitleRow breadcrumb={breadcrumb}>
          {/* flex-1 min-w-0 lets the h2 shrink instead of pushing the
              control buttons (font / theme / help) onto a new row. */}
          <h2 className={`${tokens.text.h2} flex-1 min-w-0`}>
            {t(slide.title)}
          </h2>
          <SlideFontSizeControl />
          <ThemeToggleInline />
          {step.hint && (
            <button
              type="button"
              onClick={() => setHintShown((v) => !v)}
              aria-pressed={hintShown}
              title={hintShown ? t(ui.workshopHintHide) : t(ui.workshopHintShow)}
              className={
                "h-9 px-3 rounded-lg flex items-center justify-center font-medium text-sm transition-colors border " +
                (hintShown
                  ? "bg-[#FBE8CF] hover:bg-[#f6dab3] text-[#C97A1F] border-[#C97A1F]/30 dark:bg-[#3a2a18] dark:hover:bg-[#4a3520] dark:text-[#F0B274] dark:border-[#F0B274]/30"
                  : "bg-white text-stone-700 border-stone-900/[0.08] hover:bg-stone-50 dark:bg-[#1f232c] dark:text-stone-200 dark:border-white/[0.08] dark:hover:bg-[#252934]")
              }
            >
              {t(ui.workshopHintLabel)}
            </button>
          )}
        </SlideTitleRow>
        <div className="flex items-end justify-between gap-4 mt-2">
          <p
            className="text-stone-600 dark:text-stone-300 whitespace-pre-line flex-1 min-w-0 max-w-[68ch]"
            style={{ fontSize: `${prosePx}px` }}
          >
            {t(slide.prompt)}
          </p>
          {slideJumpDots}
        </div>
      </div>

      <div className="px-5 py-4 border-b border-stone-900/[0.05] dark:border-white/[0.05]">
        <div className="flex items-center justify-between gap-3 mb-2">
          <div className={tokens.text.eyebrow}>
            {t(ui.workshopStepLabel)} <span className="tabular-nums">{stepIdx + 1} / {total}</span>
          </div>
          <ValuesPill anyValues={!!step.anyValues} />
        </div>
        <p
          className="text-stone-800 dark:text-stone-100 whitespace-pre-line max-w-[68ch]"
          style={{ fontSize: `${prosePx}px` }}
        >
          {t(step.instruction)}
        </p>
        {step.hint && hintShown && (
          <div
            className="mt-3 max-w-[68ch] rounded-lg px-4 py-3 border-l-2
                       border-[#C97A1F] bg-[#FBE8CF] text-stone-800
                       dark:border-[#F0B274] dark:bg-[#3a2a18] dark:text-stone-100"
            style={{ fontSize: `${prosePx}px` }}
          >
            <div className="text-[10px] uppercase tracking-[0.18em] font-mono font-medium text-[#C97A1F] dark:text-[#F0B274] mb-1">
              {t(ui.workshopHintLabel)}
            </div>
            <div className="whitespace-pre-line">{t(step.hint)}</div>
          </div>
        )}
      </div>

      <div className="p-5 flex flex-col gap-3" style={{ fontSize: `${prosePx}px` }}>
        {results === null && !isCompleted && (
          <div className={tokens.feedback.idle}>
            {t(ui.workshopCheckHint)}
          </div>
        )}
        {/* Success banner is sticky — once the step is completed, it stays visible
            even if the student edits the code while experimenting. */}
        {(allPass || isCompleted) && (
          <div className={`${tokens.feedback.success} flex flex-wrap items-center gap-3`}>
            <span className="font-medium flex-1 min-w-0">
              {isLast
                ? t(ui.workshopAllStepsPass)
                : t(ui.workshopStepReady)}
            </span>
          </div>
        )}
        {/* Failure messages only show before the step is completed. After that,
            the student is free to experiment without being alarmed by checks. */}
        {!allPass && !isCompleted && firstFail && (
          <FailureMessage
            check={firstFail.check}
            result={firstFail.result}
          />
        )}
        {/* Console panel is always visible so students can see (or confirm
            the absence of) console.log output without having to hunt for it.
            Empty state has a muted placeholder line. */}
        <ConsolePreview logs={consoleLogs} codePx={codePx} />
        {isCompleted && !isLast && (
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onAdvance}
              className={`${tokens.button.primary} min-h-[44px] sm:min-h-0`}
            >
              {t(ui.workshopNextStep)}
            </button>
          </div>
        )}
        {/* On the final step, after completion, show a Back button instead.
            Routing students directly back to the tier menu beats making them
            re-find the lesson via breadcrumb. */}
        {isCompleted && isLast && onExit && (
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onExit}
              className={`${tokens.button.primary} min-h-[44px] sm:min-h-0`}
            >
              {t(ui.slideBack)}
            </button>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <TwoColumnLayout
      className="h-full w-full"
      leftLabel={t(ui.tabCode)}
      rightLabel={t(ui.tabInstructions)}
      desktopGap="gap-4"
      left={editorPanel}
      right={instructionsPanel}
    />
  );
}

function ConsolePreview({ logs, codePx }: { logs: ConsoleEntry[]; codePx: number }) {
  return (
    <div className="rounded-lg overflow-hidden bg-stone-900 dark:bg-[#0f1117] text-stone-100 border border-white/[0.05]">
      <div className="px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] font-mono font-medium text-stone-400 border-b border-white/[0.08]">
        {t(ui.workshopConsoleLabel)}
      </div>
      {logs.length === 0 ? (
        <div
          className="px-3 py-2 text-stone-500 italic"
          style={{ fontSize: `${codePx}px` }}
        >
          {t(ui.workshopConsoleEmpty)}
        </div>
      ) : (
        <div
          className="px-3 py-2 font-mono space-y-0.5 max-h-60 overflow-y-auto"
          style={{ fontSize: `${codePx}px` }}
        >
          {logs.map((entry, i) => (
            <div
              key={i}
              className={
                entry.level === "error"
                  ? "text-[#EE8AA1]"
                  : entry.level === "warn"
                  ? "text-[#F0B274]"
                  : "text-stone-100"
              }
            >
              {entry.text === "" ? " " : entry.text}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function FailureMessage({
  check,
  result,
}: {
  check: WorkshopCheck;
  result: CheckResult;
}) {
  const isError = result.pass === false && result.kind === "error";
  // Errors → rose feedback band (semantic). Hint-style failures (regex
  // mismatch, value off) → amber band — softer, since the student's code
  // ran fine, it just doesn't match what the step asked for yet.
  return (
    <div
      className={
        isError
          ? tokens.feedback.error
          : "rounded-lg px-4 py-3 border-l-2 border-[#C97A1F] dark:border-[#F0B274] bg-[#FBE8CF] dark:bg-[#3a2a18] text-[#C97A1F] dark:text-[#F0B274]"
      }
    >
      <div className="font-medium mb-1">{t(check.message)}</div>
      {isError && result.kind === "error" && (
        <div className="font-mono text-xs mt-1 opacity-80">{result.error}</div>
      )}
    </div>
  );
}
