import { useEffect, useMemo, useRef, useState } from "react";
import type { AssignmentSlide, StyleCheck } from "../types";
import { t } from "../i18n";
import { ui } from "../i18n/strings";
import { sessionGet, sessionSet } from "../storage";
import { useSlideFontSize, SlideFontSizeControl } from "./SlideFontSize";
import { ThemeToggleInline } from "./ThemeToggle";
import { SlideTitleRow, type BreadcrumbSegment } from "./SlideDeck";
import { TwoColumnLayout } from "./TwoColumnLayout";

type Props = {
  slide: AssignmentSlide;
  storageKey: string;
  breadcrumb?: BreadcrumbSegment[];
  slideJumpDots?: React.ReactNode;
  onPass?: () => void;
};

type CheckResult = { check: StyleCheck; actual: string; pass: boolean };

export function AssignmentSlideView({ slide, storageKey, breadcrumb, slideJumpDots, onPass }: Props) {
  const { codePx, prosePx } = useSlideFontSize();
  const startingCss = t(slide.startingCss);

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

  const html = t(slide.html);
  const targetCss = slide.targetCss ? t(slide.targetCss) : "";

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
    <div className="h-full w-full max-w-7xl mx-auto flex flex-col">
      <div className="px-4 sm:px-10 pt-4 sm:pt-8">
        <SlideTitleRow breadcrumb={breadcrumb}>
          <h2 className="text-xl sm:text-3xl font-semibold text-stone-900 dark:text-stone-100">
            {t(slide.title)}
          </h2>
          <SlideFontSizeControl />
          <ThemeToggleInline />
        </SlideTitleRow>
        <div className="flex items-end justify-between gap-4 mt-2">
          <p className="text-stone-600 dark:text-stone-400 whitespace-pre-line flex-1 min-w-0">
            {t(slide.prompt)}
          </p>
          {slideJumpDots}
        </div>
      </div>

      <TwoColumnLayout
        className="flex-1 px-4 sm:px-10 py-3 sm:py-6"
        leftLabel={t(ui.tabCode)}
        rightLabel={t(ui.tabPreview)}
        left={
          <div className="flex-1 flex flex-col rounded-2xl overflow-hidden min-h-0
                        bg-white ring-1 ring-stone-200 shadow-sm
                        dark:bg-[#1f232c] dark:border-white/[0.08] dark:shadow-none">
          <div className="px-4 py-2 text-xs uppercase tracking-wider border-b
                          text-amber-600 border-stone-200
                          dark:text-stone-400 dark:border-white/[0.08]">
            {t(ui.cssLabel)}
          </div>
          <textarea
            value={css}
            onChange={(e) => setCss(e.target.value)}
            spellCheck={false}
            className="flex-1 font-mono p-4 outline-none resize-none
                       bg-stone-50 text-stone-900
                       dark:bg-transparent dark:text-stone-100"
            style={{ fontSize: `${codePx}px` }}
          />
          <div className="flex gap-2 p-3 border-t border-stone-200 dark:border-white/[0.08]">
            <button
              onClick={runChecks}
              className="px-3 py-1.5 rounded-lg text-white text-sm font-medium
                         bg-amber-500 hover:bg-amber-600
                         dark:bg-indigo-500 dark:hover:bg-indigo-400"
            >
              {t(ui.check)}
            </button>
            <button
              onClick={reset}
              className="px-3 py-1.5 rounded-lg text-sm
                         bg-stone-100 hover:bg-stone-200 text-stone-700
                         dark:bg-[#2c303a] dark:hover:bg-[#252934] dark:text-white"
            >
              {t(ui.reset)}
            </button>
            {hasLegend && (
              <button
                onClick={() => setShowLegend((v) => !v)}
                className="ml-auto px-3 py-1.5 rounded-lg text-sm ring-1
                           bg-amber-100 hover:bg-amber-200 text-amber-800 ring-amber-300
                           dark:bg-amber-500/20 dark:hover:bg-amber-500/30 dark:text-amber-200 dark:ring-amber-400/30"
              >
                {t(showLegend ? ui.hideHelp : ui.showHelp)}
              </button>
            )}
          </div>
        </div>
        }
        right={
          <div className="flex-1 flex flex-col rounded-2xl overflow-hidden min-h-0
                        bg-white ring-1 ring-stone-200 shadow-sm
                        dark:bg-[#1f232c] dark:border-white/[0.08] dark:shadow-none">
            <div className="px-4 py-2 text-xs uppercase tracking-wider border-b
                            text-amber-600 border-stone-200
                            dark:text-stone-400 dark:border-white/[0.08]">
              {t(hasTarget ? ui.yourVersion : ui.preview)}
            </div>
            <iframe
              ref={iframeRef}
              srcDoc={srcDoc}
              title="preview"
              sandbox="allow-same-origin"
              className="flex-1 bg-white min-h-[10rem] max-h-72 md:max-h-none md:flex-1"
            />
            {hasTarget && (
              <>
                <div className="px-4 py-2 text-xs uppercase tracking-wider border-y
                                text-emerald-700 border-stone-200
                                dark:text-emerald-300/80 dark:border-white/[0.08]">
                  {t(ui.goal)}
                </div>
                <iframe
                  srcDoc={targetDoc}
                  title="target"
                  sandbox="allow-same-origin"
                  className="flex-1 bg-white min-h-[10rem] max-h-72 md:max-h-none md:flex-1"
                />
              </>
            )}
            {results && (
              <div
                className="border-t p-3 space-y-1 max-h-48 overflow-auto
                              border-stone-200 dark:border-white/[0.08]"
                style={{ fontSize: `${prosePx}px` }}
              >
                {allPass ? (
                  <div className="text-emerald-700 dark:text-emerald-300 font-medium">
                    {t(ui.doneCheers)}
                  </div>
                ) : (
                  <>
                    {results.filter((r) => !r.pass).length === 0 ? null : (
                      <div className="text-stone-600 dark:text-stone-400 mb-1">
                        {t(ui.needsAdjusting)}
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
                            <span className="text-stone-500 dark:text-stone-400">
                              {" "}
                              — {t(r.check.hint)}
                            </span>
                          )}
                        </div>
                      ))}
                    {results.some((r) => r.pass) && (
                      <div className="text-emerald-700/80 dark:text-emerald-300/80 pt-1 text-xs">
                        {results.filter((r) => r.pass).length} {t(ui.outOfRight)}{" "}
                        {results.length}
                      </div>
                    )}
                  </>
                )}
              </div>
            )}
          </div>
        }
      />

      {showLegend && hasLegend && (
        <div className="mx-4 sm:mx-10 mb-4 sm:mb-6 rounded-2xl p-4 ring-1
                        bg-amber-50 ring-amber-200
                        dark:bg-amber-500/10 dark:ring-amber-400/30">
          <div className="text-xs uppercase tracking-wider mb-2
                          text-amber-700 dark:text-amber-200">
            {t(ui.legendLabel)}
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {slide.legend!.map((e, i) => (
              <div
                key={i}
                className="rounded-lg p-3 ring-1
                           bg-white ring-stone-200
                           dark:bg-[#1f232c] dark:border-white/[0.08]"
              >
                <div className="font-semibold text-amber-800 dark:text-amber-100">
                  {t(e.name)}
                </div>
                <div className="font-mono text-xs text-stone-600 dark:text-stone-400">
                  {e.syntax}
                </div>
                <div className="font-mono text-xs mt-1 text-emerald-700 dark:text-emerald-200/90">
                  {e.example}
                </div>
                {e.note && (
                  <div className="text-xs mt-1 text-stone-500 dark:text-stone-400">
                    {t(e.note)}
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
