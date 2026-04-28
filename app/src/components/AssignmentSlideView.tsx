import { useEffect, useMemo, useRef, useState } from "react";
import type { AssignmentSlide, StyleCheck } from "../types";
import { useLang } from "../i18n/LanguageContext";
import { t } from "../i18n";
import { ui } from "../i18n/strings";
import { sessionGet, sessionSet } from "../storage";
import { useSlideFontSize } from "./SlideFontSize";

type Props = {
  slide: AssignmentSlide;
  storageKey: string;
  onPass?: () => void;
};

type CheckResult = { check: StyleCheck; actual: string; pass: boolean };

export function AssignmentSlideView({ slide, storageKey, onPass }: Props) {
  const { lang } = useLang();
  const { codePx, prosePx } = useSlideFontSize();
  const startingCss = t(slide.startingCss, lang);

  const [css, setCss] = useState<string>(() => {
    return sessionGet(storageKey) ?? startingCss;
  });
  const [results, setResults] = useState<CheckResult[] | null>(null);
  const [showLegend, setShowLegend] = useState(false);
  const hasLegend = !!slide.legend && slide.legend.length > 0;
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    sessionSet(storageKey, css);
  }, [storageKey, css]);

  const html = t(slide.html, lang);
  const targetCss = slide.targetCss ? t(slide.targetCss, lang) : "";

  const buildDoc = (styleCss: string) =>
    `<!doctype html><html><head><meta charset="utf-8"><style>
    html,body{margin:0;padding:16px;font-family:system-ui;background:#fff;color:#111}
    ${styleCss}</style></head><body>${html}</body></html>`;

  const srcDoc = useMemo(() => buildDoc(css), [css, html]);
  const targetDoc = useMemo(
    () => (targetCss ? buildDoc(targetCss) : ""),
    [targetCss, html]
  );
  const hasTarget = !!targetCss;

  const runChecks = () => {
    const doc = iframeRef.current?.contentDocument;
    if (!doc) return;
    const out: CheckResult[] = slide.checks.map((c) => {
      const el = doc.querySelector(c.selector) as HTMLElement | null;
      if (!el) return { check: c, actual: "(not found)", pass: false };
      if (normalize(c.expected) === "auto") {
        const pass = sourceHasAuto(css, c.selector, c.property);
        return { check: c, actual: pass ? "auto" : "(missing auto)", pass };
      }
      const actual = getComputedStyle(el).getPropertyValue(c.property).trim();
      return { check: c, actual, pass: matches(c, actual) };
    });
    setResults(out);
  };

  const reset = () => {
    setCss(startingCss);
    setResults(null);
  };

  const allPass = results && results.every((r) => r.pass);

  useEffect(() => {
    if (allPass) onPass?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allPass]);

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
        <div className="flex flex-col rounded-2xl overflow-hidden
                        bg-white ring-1 ring-stone-200 shadow-sm
                        dark:bg-slate-900/60 dark:ring-white/10 dark:shadow-none">
          <div className="px-4 py-2 text-xs uppercase tracking-wider border-b
                          text-amber-600 border-stone-200
                          dark:text-indigo-300/70 dark:border-white/10">
            {t(ui.cssLabel, lang)}
          </div>
          <textarea
            value={css}
            onChange={(e) => setCss(e.target.value)}
            spellCheck={false}
            className="flex-1 font-mono p-4 outline-none resize-none
                       bg-stone-50 text-stone-900
                       dark:bg-transparent dark:text-indigo-50"
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

        <div className="flex flex-col rounded-2xl overflow-hidden
                        bg-white ring-1 ring-stone-200 shadow-sm
                        dark:bg-slate-900/60 dark:ring-white/10 dark:shadow-none">
          <div className="px-4 py-2 text-xs uppercase tracking-wider border-b
                          text-amber-600 border-stone-200
                          dark:text-indigo-300/70 dark:border-white/10">
            {t(hasTarget ? ui.yourVersion : ui.preview, lang)}
          </div>
          <iframe
            ref={iframeRef}
            srcDoc={srcDoc}
            title="preview"
            sandbox="allow-same-origin"
            className="flex-1 bg-white min-h-0"
          />
          {hasTarget && (
            <>
              <div className="px-4 py-2 text-xs uppercase tracking-wider border-y
                              text-emerald-700 border-stone-200
                              dark:text-emerald-300/80 dark:border-white/10">
                {t(ui.goal, lang)}
              </div>
              <iframe
                srcDoc={targetDoc}
                title="target"
                sandbox="allow-same-origin"
                className="flex-1 bg-white min-h-0"
              />
            </>
          )}
          {results && (
            <div
              className="border-t p-3 space-y-1 max-h-48 overflow-auto
                            border-stone-200 dark:border-white/10"
              style={{ fontSize: `${prosePx}px` }}
            >
              {allPass ? (
                <div className="text-emerald-700 dark:text-emerald-300 font-medium">
                  {t(ui.doneCheers, lang)}
                </div>
              ) : (
                <>
                  {results.filter((r) => !r.pass).length === 0 ? null : (
                    <div className="text-stone-600 dark:text-indigo-200/70 mb-1">
                      {t(ui.needsAdjusting, lang)}
                    </div>
                  )}
                  {results
                    .filter((r) => !r.pass)
                    .map((r, i) => (
                      <div
                        key={i}
                        className="text-amber-700 dark:text-amber-300"
                      >
                        • {friendlyLabel(r.check)}
                        {r.check.hint && (
                          <span className="text-stone-500 dark:text-indigo-200/60">
                            {" "}
                            — {t(r.check.hint, lang)}
                          </span>
                        )}
                      </div>
                    ))}
                  {results.some((r) => r.pass) && (
                    <div className="text-emerald-700/80 dark:text-emerald-300/80 pt-1 text-xs">
                      {results.filter((r) => r.pass).length} {t(ui.outOfRight, lang)}{" "}
                      {results.length}
                    </div>
                  )}
                </>
              )}
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

function normalize(v: string) {
  return v.replace(/\s+/g, " ").trim().toLowerCase();
}

function parsePx(v: string): number | null {
  const m = v.match(/^(-?\d+(?:\.\d+)?)px$/);
  return m ? parseFloat(m[1]) : null;
}

function matches(check: StyleCheck, actual: string): boolean {
  const a = normalize(actual);
  const e = normalize(check.expected);
  if (a === e) return true;
  const aPx = parsePx(a);
  const ePx = parsePx(e);
  if (aPx !== null && ePx !== null) {
    const tol = check.tolerance ?? 2;
    return Math.abs(aPx - ePx) <= tol;
  }
  return false;
}

function friendlyLabel(c: StyleCheck): string {
  return `${c.selector} · ${c.property}`;
}

function sourceHasAuto(css: string, selector: string, property: string): boolean {
  const sel = selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const ruleMatch = new RegExp(`${sel}\\s*\\{([^}]*)\\}`, "s").exec(css);
  if (!ruleMatch) return false;
  const body = ruleMatch[1];
  const directRe = new RegExp(
    `(?:^|[;\\s])${property}\\s*:\\s*[^;]*\\bauto\\b`,
    "i"
  );
  if (directRe.test(body)) return true;
  if (/^margin-(top|right|bottom|left)$/.test(property)) {
    return /(?:^|[;\s])margin\s*:\s*[^;]*\bauto\b/i.test(body);
  }
  return false;
}
