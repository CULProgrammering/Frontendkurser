import { useEffect, useMemo, useRef, useState } from "react";
import Editor from "@monaco-editor/react";
import type { ExerciseSlide } from "../types";
import { useLang } from "../i18n/LanguageContext";
import { t } from "../i18n";
import { ui } from "../i18n/strings";
import { sessionGet, sessionSet } from "../storage";
import { useSlideFontSize, SlideFontSizeControl } from "./SlideFontSize";
import { ThemeToggleInline } from "./ThemeToggle";
import { SlideTitleRow, type BreadcrumbSegment } from "./SlideDeck";

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
  levels.forEach(function(level){
    var orig = console[level].bind(console);
    console[level] = function(){
      var args = Array.prototype.slice.call(arguments);
      var text = args.map(function(a){
        if (typeof a === 'string') return a;
        try { return JSON.stringify(a); } catch (e) { return String(a); }
      }).join(' ');
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

function buildDoc(html: string, css: string, js: string, marker: number): string {
  // The marker comment forces the srcDoc string to differ on every Run, which
  // guarantees the iframe re-loads (and thus re-executes the user's JS).
  // The user's source is exposed as window.__userSrc so assertions can do
  // regex checks on what the student wrote (useful for variable declarations
  // that aren't reachable via window — let/const).
  const userSrcLiteral = JSON.stringify(js);
  const guardedSrcLiteral = JSON.stringify(instrumentLoops(js));
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
  const { lang } = useLang();
  const { codePx } = useSlideFontSize();

  const startHtml = slide.starterHtml ? t(slide.starterHtml, lang) : "";
  const startCss = slide.starterCss ? t(slide.starterCss, lang) : "";
  const startJs = slide.starterJs ? t(slide.starterJs, lang) : "";

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

  const isDark =
    typeof document !== "undefined" &&
    document.documentElement.classList.contains("dark");

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
      ? t(ui.htmlLabel, lang)
      : k === "css"
      ? t(ui.cssLabel, lang)
      : t(ui.jsLabel, lang);

  const hasVisualPreview =
    slide.starterHtml !== undefined || slide.starterCss !== undefined;

  return (
    <div className="h-full w-full max-w-7xl mx-auto flex flex-col md:flex-row gap-4 p-4 sm:p-5">
      {/* ── LEFT: full-height editor ── */}
      <div
        className="flex-1 flex flex-col min-h-0 rounded-2xl overflow-hidden
                   bg-white ring-1 ring-stone-200 shadow-sm
                   dark:bg-slate-900/60 dark:ring-white/10 dark:shadow-none"
      >
        <div
          className="flex items-center gap-1 border-b border-stone-200 dark:border-white/10
                     bg-stone-50 dark:bg-slate-900/40"
        >
          {tabs.map((k) => (
            <button
              key={k}
              onClick={() => setTab(k)}
              className={
                "px-3 py-2 text-xs uppercase tracking-wider font-medium transition-colors " +
                (tab === k
                  ? "text-amber-700 dark:text-indigo-200 border-b-2 border-amber-500 dark:border-indigo-300"
                  : "text-stone-500 hover:text-stone-700 dark:text-indigo-200/60 dark:hover:text-indigo-100")
              }
            >
              {tabLabel(k)}
            </button>
          ))}
        </div>
        <div className="flex-1 min-h-0">
          <Editor
            height="100%"
            language={editorLang}
            theme={isDark ? "vs-dark" : "vs"}
            value={editorValue}
            onChange={(v) => setEditorValue(v ?? "")}
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
        <div className="flex gap-2 p-3 border-t border-stone-200 dark:border-white/10">
          <button
            onClick={run}
            className="px-3 py-1.5 rounded-lg text-white text-sm font-medium
                       bg-amber-500 hover:bg-amber-600
                       dark:bg-indigo-500 dark:hover:bg-indigo-400"
          >
            {t(ui.exerciseRun, lang)}
          </button>
          <button
            onClick={reset}
            className="px-3 py-1.5 rounded-lg text-sm
                       bg-stone-100 hover:bg-stone-200 text-stone-700
                       dark:bg-slate-700 dark:hover:bg-slate-600 dark:text-white"
          >
            {t(ui.reset, lang)}
          </button>
        </div>
      </div>

      {/* ── RIGHT: instructions + console + tests (scrollable) ── */}
      <div
        className="flex-1 min-h-0 overflow-y-auto rounded-2xl
                   bg-white ring-1 ring-stone-200 shadow-sm
                   dark:bg-slate-900/60 dark:ring-white/10 dark:shadow-none"
      >
        {/* Instructions */}
        <div className="px-5 pt-5 pb-4 border-b border-stone-200 dark:border-white/10">
          <SlideTitleRow breadcrumb={breadcrumb}>
            <h2 className="text-xl sm:text-2xl font-semibold text-stone-900 dark:text-indigo-50">
              {t(slide.title, lang)}
            </h2>
            <SlideFontSizeControl />
            <ThemeToggleInline />
          </SlideTitleRow>
          <div className="flex items-end justify-between gap-4 mt-2">
            <p className="text-stone-600 dark:text-indigo-200/80 whitespace-pre-line text-sm flex-1 min-w-0">
              {t(slide.prompt, lang)}
            </p>
            {slideJumpDots}
          </div>
        </div>

        {/* Visual preview */}
        {hasVisualPreview && (
          <>
            <div
              className="px-4 py-2 text-xs uppercase tracking-wider border-b
                         text-amber-600 border-stone-200
                         dark:text-indigo-300/70 dark:border-white/10"
            >
              {t(ui.preview, lang)}
            </div>
            <iframe
              ref={iframeRef}
              srcDoc={srcDoc}
              onLoad={onIframeLoad}
              title="exercise preview"
              sandbox="allow-scripts"
              className="w-full h-48 bg-white"
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
          className="px-4 py-2 text-xs uppercase tracking-wider border-b
                     text-amber-600 border-stone-200
                     dark:text-indigo-300/70 dark:border-white/10"
        >
          {t(ui.consoleLabel, lang)}
        </div>
        <div className="font-mono text-xs overflow-auto bg-stone-950 text-stone-100 dark:bg-black min-h-[3rem] max-h-48">
          {consoleEntries.length === 0 ? (
            <div className="p-3 text-stone-500 italic">
              {t(ui.consoleEmpty, lang)}
            </div>
          ) : (
            consoleEntries.map((c, i) => (
              <div
                key={i}
                className={
                  "px-3 py-0.5 border-b border-white/5 whitespace-pre-wrap " +
                  (c.level === "error"
                    ? "text-rose-300"
                    : c.level === "warn"
                    ? "text-amber-300"
                    : "text-stone-100")
                }
              >
                {c.text}
              </div>
            ))
          )}
        </div>

        {/* Tests */}
        <div
          className="px-4 py-2 text-xs uppercase tracking-wider border-y
                     text-amber-600 border-stone-200
                     dark:text-indigo-300/70 dark:border-white/10"
        >
          {t(ui.exerciseTests, lang)}
        </div>
        <div className="p-3 text-sm space-y-1">
          {results === null ? (
            <div className="text-stone-500 dark:text-indigo-200/60 italic">
              {t(ui.exerciseRunHint, lang)}
            </div>
          ) : allPass ? (
            <div className="text-emerald-700 dark:text-emerald-300 font-medium">
              {t(ui.exerciseAllPass, lang)}
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
                        ? "text-emerald-700 dark:text-emerald-300"
                        : "text-amber-700 dark:text-amber-300"
                    }
                  >
                    {passed ? "✓" : "•"} {t(tt.label, lang)}
                    {!passed && tt.hint && (
                      <span className="text-stone-500 dark:text-indigo-200/60">
                        {" "}
                        — {t(tt.hint, lang)}
                      </span>
                    )}
                    {!passed && r?.error && (
                      <span className="text-stone-500 dark:text-indigo-200/60 font-mono text-xs">
                        {" "}
                        ({r.error})
                      </span>
                    )}
                  </div>
                );
              })}
              <div className="text-emerald-700/80 dark:text-emerald-300/80 pt-1 text-xs">
                {results.filter((r) => r.pass).length} / {slide.tests.length}{" "}
                {t(ui.exercisePassedCount, lang)}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
