import { useEffect, useMemo, useRef, useState } from "react";
import type { ExerciseSlide } from "../types";
import { t } from "../i18n";
import { ui } from "../i18n/strings";
import { sessionGet, sessionSet } from "../storage";
import { useSlideFontSize, SlideFontSizeControl } from "./SlideFontSize";
import { ThemeToggleInline } from "./ThemeToggle";
import { ValuesPill } from "./ValuesPill";
import { SlideTitleRow, type BreadcrumbSegment } from "./SlideDeck";
import { CodeEditor } from "./CodeEditor";
import { TwoColumnLayout } from "./TwoColumnLayout";
import { tokens } from "../styles/tokens";

type Props = {
  slide: ExerciseSlide;
  storageKey: string;
  breadcrumb?: BreadcrumbSegment[];
  slideJumpDots?: React.ReactNode;
  onPass?: () => void;
};

type Tab = "html" | "css" | "js";
type TestResult = { i: number; pass: boolean; error?: string };
type ConsoleEntry = { level: "log" | "error" | "warn" | "info"; text: string };

// Installed BEFORE the user's code so every console call (including ones that
// run synchronously during script execution) is captured. Pushes onto
// window.__console for assertions and forwards each line to the parent so the
// React UI can render a console panel.
const CONSOLE_CAPTURE = `
(function(){
  window.__console = [];
  var levels = ['log','error','warn','info'];
  function fmt(a){
    if (typeof a === 'string') return a;
    if (a === undefined) return 'undefined';
    if (a === null) return 'null';
    if (typeof a === 'number' && a !== a) return 'NaN';
    if (a === Infinity) return 'Infinity';
    if (a === -Infinity) return '-Infinity';
    try { return JSON.stringify(a); } catch (e) { return String(a); }
  }
  levels.forEach(function(level){
    var orig = console[level].bind(console);
    console[level] = function(){
      var args = Array.prototype.slice.call(arguments);
      var text = args.map(fmt).join(' ');
      window.__console.push({ level: level, text: text });
      try {
        window.parent.postMessage({ type: 'console', level: level, text: text }, '*');
      } catch (e) {}
      orig.apply(console, arguments);
    };
  });
})();
`;

const RUNNER_SCRIPT = `
(function(){
  window.addEventListener('message', function(e){
    var data = e.data;
    if (!data || data.type !== 'run-tests') return;
    var tests = data.tests || [];
    var results = tests.map(function(t, i){
      try {
        var fn = new Function(t.assert);
        var value = fn.call(window);
        return { i: i, pass: !!value };
      } catch (err) {
        var msg = (err && err.message) ? err.message : String(err);
        return { i: i, pass: false, error: msg };
      }
    });
    var target = e.source || window.parent;
    target.postMessage(
      { type: 'test-results', runId: data.runId, results: results },
      '*'
    );
  });
})();
`;

// Hard upper bound for any single loop's iteration count. Beginner labs run a
// few hundred iterations at most, so 10k is comfortably above legitimate use
// and still trips infinite loops in milliseconds.
const LOOP_GUARD_MAX = 10000;

/**
 * Inject a `__checkLoop(id)` call at the start of every `while`, `do…while`,
 * and `for` body in the student's source. Each loop gets a stable id so its
 * iteration count is tracked separately. Brace-less single-statement loops
 * are not transformed — beginners almost always write braced bodies.
 */
function instrumentLoops(src: string): string {
  let id = 0;
  return src.replace(
    /(\bwhile\s*\([^()]*\)\s*\{|\bdo\s*\{|\bfor\s*\([^()]*\)\s*\{)/g,
    (m) => `${m} __checkLoop(${id++});`
  );
}

/**
 * Walk the student's source for top-level-looking `let` / `const` / `var`
 * declarations and append `window.<name> = <name>;` for each. Without this,
 * exercise asserts can't read student variables via `typeof X`: the student
 * code runs inside `eval(...)` inside an IIFE, and ES2015+ direct eval
 * scopes top-level `let` / `const` to the eval's own lexical environment,
 * so the bindings disappear before the runner posts test-results.
 *
 * The regex is intentionally naive — it catches anything that *looks like*
 * a top-level declaration line, including ones nested inside functions or
 * blocks. That's fine: the appended `window.X = X` is wrapped in try/catch,
 * so a nested name that's out of scope at the end silently skips. Worst
 * case, we expose a name we shouldn't have; never a crash. The whole block
 * is appended inside the eval, after the student's last line, so it runs in
 * the same lexical scope as their declarations.
 */
function exposeDecls(src: string): string {
  const re = /(?:^|\n|;)\s*(?:let|const|var)\s+([a-zA-Z_$][\w$]*)/g;
  const names = new Set<string>();
  let m: RegExpExecArray | null;
  while ((m = re.exec(src)) !== null) {
    names.add(m[1]);
  }
  if (names.size === 0) return src;
  const exposeLines = Array.from(names)
    .map((n) => `try { window.${n} = ${n}; } catch (__e) {}`)
    .join("\n");
  return src + "\n" + exposeLines;
}

function buildDoc(html: string, css: string, js: string, marker: number): string {
  // The marker comment forces the srcDoc string to differ on every Run, which
  // guarantees the iframe re-loads (and thus re-executes the user's JS).
  // The user's source is exposed as window.__userSrc so assertions can do
  // regex checks on what the student wrote (useful for variable declarations
  // that aren't reachable via window — let/const).
  const userSrcLiteral = JSON.stringify(js);
  // exposeDecls THEN instrument: instrumentLoops only adds `__checkLoop`
  // calls inside loop bodies, so it doesn't interfere with the appended
  // window.X = X lines (which contain no loop keywords).
  const guardedSrcLiteral = JSON.stringify(instrumentLoops(exposeDecls(js)));
  return `<!doctype html>
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="Content-Security-Policy" content="default-src 'self' 'unsafe-inline' data: blob:; script-src 'unsafe-inline' 'unsafe-eval'; style-src 'unsafe-inline'">
<style>
html,body{margin:0;padding:12px;font-family:system-ui,sans-serif;background:#fff;color:#111}
${css}
</style>
</head>
<body>
${html}
<script>${CONSOLE_CAPTURE}</script>
<script>window.__userSrc = ${userSrcLiteral};</script>
<script>
// Run the student's source via eval so SyntaxError (e.g. an orphaned else
// after a stray semicolon) is caught here and shown in the console panel.
// We also instrument loop bodies with __checkLoop so an accidental infinite
// loop (e.g. a while without an updater) throws after ${LOOP_GUARD_MAX}
// iterations instead of hanging the iframe — which would otherwise freeze
// the whole page until the browser kills the script.
(function(){
  var __loopCounters = {};
  function __checkLoop(id) {
    __loopCounters[id] = (__loopCounters[id] || 0) + 1;
    if (__loopCounters[id] > ${LOOP_GUARD_MAX}) {
      throw new Error('Loop exceeded ${LOOP_GUARD_MAX} iterations — looks like an infinite loop. Make sure something inside the loop changes the condition.');
    }
  }
  try {
    eval(${guardedSrcLiteral});
  } catch (e) {
    var msg = (e && e.name ? e.name + ': ' : '') + (e && e.message ? e.message : String(e));
    console.error(msg);
  }
})();
</script>
<script>${RUNNER_SCRIPT}</script>
<!-- run:${marker} -->
</body>
</html>`;
}

export function ExerciseSlideView({ slide, storageKey, breadcrumb, slideJumpDots, onPass }: Props) {
  const { codePx, prosePx } = useSlideFontSize();

  const startHtml = slide.starterHtml ? t(slide.starterHtml) : "";
  const startCss = slide.starterCss ? t(slide.starterCss) : "";
  const startJs = slide.starterJs ? t(slide.starterJs) : "";

  const [html, setHtml] = useState<string>(
    () => sessionGet(`${storageKey}:html`) ?? startHtml
  );
  const [css, setCss] = useState<string>(
    () => sessionGet(`${storageKey}:css`) ?? startCss
  );
  const [js, setJs] = useState<string>(
    () => sessionGet(`${storageKey}:js`) ?? startJs
  );

  useEffect(() => sessionSet(`${storageKey}:html`, html), [storageKey, html]);
  useEffect(() => sessionSet(`${storageKey}:css`, css), [storageKey, css]);
  useEffect(() => sessionSet(`${storageKey}:js`, js), [storageKey, js]);

  const tabs = useMemo<Tab[]>(() => {
    const ts: Tab[] = [];
    if (slide.starterHtml !== undefined) ts.push("html");
    if (slide.starterCss !== undefined) ts.push("css");
    if (slide.starterJs !== undefined) ts.push("js");
    return ts.length ? ts : ["html"];
  }, [slide]);

  const [tab, setTab] = useState<Tab>(tabs[0]);

  const [previewMarker, setPreviewMarker] = useState(0);
  const [pendingRunId, setPendingRunId] = useState<number | null>(null);
  const runIdRef = useRef(0);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [results, setResults] = useState<TestResult[] | null>(null);
  const [consoleEntries, setConsoleEntries] = useState<ConsoleEntry[]>([]);

  // Debounced live preview: bump the marker when user stops editing.
  useEffect(() => {
    const id = setTimeout(() => setPreviewMarker((m) => m + 1), 400);
    return () => clearTimeout(id);
  }, [html, css, js]);

  const srcDoc = useMemo(
    () => buildDoc(html, css, js, previewMarker),
    [html, css, js, previewMarker]
  );

  // Reset console when iframe reloads (srcDoc changed).
  useEffect(() => {
    setConsoleEntries([]);
  }, [srcDoc]);

  // Receive test results AND console output from the iframe.
  useEffect(() => {
    function onMessage(e: MessageEvent) {
      const data = e.data;
      if (!data) return;
      if (data.type === "test-results") {
        if (data.runId !== runIdRef.current) return;
        setResults(data.results as TestResult[]);
        setPendingRunId(null);
      } else if (data.type === "console") {
        setConsoleEntries((prev) => [
          ...prev,
          { level: data.level, text: data.text },
        ]);
      }
    }
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  // When iframe finishes loading after a Run, post the tests.
  const onIframeLoad = () => {
    if (pendingRunId === null) return;
    const iframe = iframeRef.current;
    if (!iframe?.contentWindow) return;
    iframe.contentWindow.postMessage(
      {
        type: "run-tests",
        runId: pendingRunId,
        tests: slide.tests.map((tt) => ({ assert: tt.assert })),
      },
      "*"
    );
  };

  const run = () => {
    runIdRef.current += 1;
    setPendingRunId(runIdRef.current);
    setPreviewMarker((m) => m + 1); // force iframe reload
    setResults(null);
  };

  const reset = () => {
    setHtml(startHtml);
    setCss(startCss);
    setJs(startJs);
    setResults(null);
  };

  const allPass =
    results !== null &&
    results.length === slide.tests.length &&
    results.every((r) => r.pass);

  useEffect(() => {
    if (allPass) onPass?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allPass]);

  const editorValue = tab === "html" ? html : tab === "css" ? css : js;
  const setEditorValue = (v: string) => {
    if (tab === "html") setHtml(v);
    else if (tab === "css") setCss(v);
    else setJs(v);
  };
  const editorLang =
    tab === "html" ? "html" : tab === "css" ? "css" : "javascript";

  const tabLabel = (k: Tab) =>
    k === "html"
      ? t(ui.htmlLabel)
      : k === "css"
      ? t(ui.cssLabel)
      : t(ui.jsLabel);

  const hasVisualPreview =
    slide.starterHtml !== undefined || slide.starterCss !== undefined;

  const editorPanel = (
    <div
      className={`flex-1 flex flex-col min-h-0 ${tokens.card.surface} overflow-hidden`}
    >
      <div className="flex items-center gap-1 border-b border-stone-900/[0.05] dark:border-white/[0.05] bg-stone-50 dark:bg-[#222630]">
        {tabs.map((k) => (
          <button
            key={k}
            onClick={() => setTab(k)}
            className={
              "px-3 py-2 min-h-[44px] text-[10px] uppercase tracking-[0.18em] font-mono font-medium transition-colors " +
              (tab === k
                ? "text-stone-900 dark:text-stone-100 border-b-2 border-stone-900 dark:border-[#F0B274]"
                : "text-stone-500 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-200")
            }
          >
            {tabLabel(k)}
          </button>
        ))}
      </div>
      <div className="flex-1 min-h-0">
        <CodeEditor
          language={editorLang}
          value={editorValue}
          onChange={setEditorValue}
          fontSize={codePx}
          onSubmit={run}
        />
      </div>
      <div className="flex gap-2 p-3 border-t border-stone-900/[0.05] dark:border-white/[0.05]">
        <button
          onClick={run}
          className={`${tokens.button.primary} min-h-[44px] sm:min-h-0`}
        >
          {t(ui.exerciseRun)}
        </button>
        <button
          onClick={reset}
          className={`${tokens.button.secondary} min-h-[44px] sm:min-h-0`}
        >
          {t(ui.reset)}
        </button>
      </div>
    </div>
  );

  const instructionsPanel = (
    <div
      className={`flex-1 min-h-0 overflow-y-auto ${tokens.card.surface}`}
    >
        {/* Instructions */}
        <div className="px-5 pt-5 pb-4 border-b border-stone-900/[0.05] dark:border-white/[0.05]">
          <SlideTitleRow breadcrumb={breadcrumb}>
            {/* flex-1 min-w-0 lets the h2 shrink instead of pushing the
                control buttons (font / theme / help) onto a new row. */}
            <h2 className={`${tokens.text.h2} flex-1 min-w-0`}>
              {t(slide.title)}
            </h2>
            <SlideFontSizeControl />
            <ThemeToggleInline />
          </SlideTitleRow>
          <ValuesPill anyValues={!!slide.anyValues} className="mt-2" />
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

        {/* Visual preview */}
        {hasVisualPreview && (
          <>
            <div
              className={`${tokens.text.eyebrow} px-4 py-2 border-b border-stone-900/[0.05] dark:border-white/[0.05]`}
            >
              {t(ui.preview)}
            </div>
            <iframe
              ref={iframeRef}
              srcDoc={srcDoc}
              onLoad={onIframeLoad}
              title="exercise preview"
              sandbox="allow-scripts"
              className="w-full h-40 sm:h-48 bg-white"
            />
          </>
        )}
        {/* JS-only: hidden runner iframe */}
        {!hasVisualPreview && (
          <iframe
            ref={iframeRef}
            srcDoc={srcDoc}
            onLoad={onIframeLoad}
            title="exercise runner"
            sandbox="allow-scripts"
            aria-hidden
            className="absolute w-px h-px opacity-0 pointer-events-none"
          />
        )}

        {/* Console */}
        <div
          className={`${tokens.text.eyebrow} px-4 py-2 border-b border-stone-900/[0.05] dark:border-white/[0.05]`}
        >
          {t(ui.consoleLabel)}
        </div>
        <div
          className="font-mono overflow-auto bg-stone-900 dark:bg-[#0f1117] text-stone-100 min-h-[3rem] max-h-60"
          style={{ fontSize: `${codePx}px` }}
        >
          {consoleEntries.length === 0 ? (
            <div className="p-3 text-stone-500 italic">
              {t(ui.consoleEmpty)}
            </div>
          ) : (
            consoleEntries.map((c, i) => (
              <div
                key={i}
                className={
                  "px-3 py-0.5 border-b border-white/[0.04] whitespace-pre-wrap " +
                  (c.level === "error"
                    ? "text-[#EE8AA1]"
                    : c.level === "warn"
                    ? "text-[#F0B274]"
                    : "text-stone-100")
                }
              >
                {c.text}
              </div>
            ))
          )}
        </div>

        {/* Tests — earned a permanent home in the brief pane. Each row reads
            at a glance from the leading status mark. */}
        <div
          className={`${tokens.text.eyebrow} px-4 py-2 border-y border-stone-900/[0.05] dark:border-white/[0.05]`}
        >
          {t(ui.exerciseTests)}
        </div>
        <div
          className="p-3 space-y-1"
          style={{ fontSize: `${prosePx}px` }}
        >
          {results === null ? (
            <div className="text-stone-500 dark:text-stone-400 italic">
              {t(ui.exerciseRunHint)}
            </div>
          ) : allPass ? (
            <div className={`${tokens.feedback.success} font-medium`}>
              {t(ui.exerciseAllPass)}
            </div>
          ) : (
            <>
              {slide.tests.map((tt, i) => {
                const r = results[i];
                const passed = !!r?.pass;
                return (
                  <div
                    key={i}
                    className={
                      passed
                        ? "text-[#1F8A6E] dark:text-[#5FCAA8]"
                        : "text-[#C97A1F] dark:text-[#F0B274]"
                    }
                  >
                    {passed ? "✓" : "•"} {t(tt.label)}
                    {!passed && tt.hint && (
                      <span className="text-stone-500 dark:text-stone-400">
                        {" "}
                        — {t(tt.hint)}
                      </span>
                    )}
                    {!passed && r?.error && (
                      <span
                        className="text-stone-500 dark:text-stone-400 font-mono"
                        style={{ fontSize: `${codePx}px` }}
                      >
                        {" "}
                        ({r.error})
                      </span>
                    )}
                  </div>
                );
              })}
              <div className="text-stone-500 dark:text-stone-400 pt-1 tabular-nums text-xs">
                {results.filter((r) => r.pass).length} / {slide.tests.length}{" "}
                {t(ui.exercisePassedCount)}
              </div>
            </>
          )}
        </div>
      </div>
    );

  return (
    <TwoColumnLayout
      className="h-full w-full max-w-[min(1700px,92vw)] mx-auto p-4 sm:p-5"
      leftLabel={t(ui.tabCode)}
      rightLabel={t(ui.tabResult)}
      desktopGap="gap-4"
      left={editorPanel}
      right={instructionsPanel}
    />
  );
}
