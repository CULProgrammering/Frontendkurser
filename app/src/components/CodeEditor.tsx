import { useEffect, useRef, useState } from "react";
import Editor from "@monaco-editor/react";

/**
 * Imperative handle exposed by the editor on mount. The shape mirrors the
 * subset of Monaco's editor API used by callers (cursor positioning + a
 * direct setValue that bypasses React's controlled-component cycle so the
 * cursor lands on the right line on the same tick the value resets).
 */
export type CodeEditorHandle = {
  setPosition: (pos: { lineNumber: number; column: number }) => void;
  revealPositionInCenter: (pos: { lineNumber: number; column: number }) => void;
  focus: () => void;
  setValue: (v: string) => void;
};

type Props = {
  language: string;
  value: string;
  onChange: (value: string) => void;
  fontSize: number;
  onMount?: (handle: CodeEditorHandle) => void;
  /** Triggered when the user presses Ctrl/Cmd+Enter while the editor has focus. */
  onSubmit?: () => void;
};

const MOBILE_BREAKPOINT_PX = 640; // Tailwind sm

function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(
    () =>
      typeof window !== "undefined" && window.innerWidth < MOBILE_BREAKPOINT_PX
  );
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT_PX - 1}px)`);
    const update = () => setIsMobile(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, []);
  return isMobile;
}

/**
 * Editor wrapper that renders Monaco on tablets/desktops and a native
 * `<textarea>` on phones. Monaco's mobile UX is poor — the soft keyboard
 * fights with its custom input, scrolling is awkward, and tap targets are
 * tiny. The textarea swap loses syntax highlighting but gives back native
 * caret handling, autoscroll, and a normal mobile selection experience.
 */
export function CodeEditor({
  language,
  value,
  onChange,
  fontSize,
  onMount,
  onSubmit,
}: Props) {
  const isMobile = useIsMobile();
  const onSubmitRef = useRef(onSubmit);
  useEffect(() => {
    onSubmitRef.current = onSubmit;
  });

  if (isMobile) {
    return (
      <TextareaEditor
        value={value}
        onChange={onChange}
        fontSize={fontSize}
        onMount={onMount}
        onSubmit={onSubmit}
      />
    );
  }

  const isDark =
    typeof document !== "undefined" &&
    document.documentElement.classList.contains("dark");

  return (
    <Editor
      height="100%"
      language={language}
      theme={isDark ? "vs-dark" : "vs"}
      value={value}
      onChange={(v) => onChange(v ?? "")}
      onMount={(editor, monacoNs) => {
        if (onMount) {
          onMount({
            setPosition: (p) => editor.setPosition(p),
            revealPositionInCenter: (p) => editor.revealPositionInCenter(p),
            focus: () => editor.focus(),
            setValue: (v) => editor.setValue(v),
          });
        }
        editor.addCommand(
          monacoNs.KeyMod.CtrlCmd | monacoNs.KeyCode.Enter,
          () => onSubmitRef.current?.()
        );
      }}
      options={{
        minimap: { enabled: false },
        fontSize,
        scrollBeyondLastLine: false,
        wordWrap: "on",
        tabSize: 2,
        automaticLayout: true,
        lineNumbers: "on",
        renderLineHighlight: "line",
      }}
    />
  );
}

function offsetForPos(
  text: string,
  pos: { lineNumber: number; column: number }
): number {
  const lines = text.split("\n");
  let off = 0;
  const targetLine = Math.min(pos.lineNumber, lines.length);
  for (let i = 0; i < targetLine - 1; i++) {
    off += lines[i].length + 1; // +1 for the newline
  }
  off += Math.max(0, pos.column - 1);
  return Math.min(off, text.length);
}

function TextareaEditor({
  value,
  onChange,
  fontSize,
  onMount,
  onSubmit,
}: {
  value: string;
  onChange: (v: string) => void;
  fontSize: number;
  onMount?: (handle: CodeEditorHandle) => void;
  onSubmit?: () => void;
}) {
  const taRef = useRef<HTMLTextAreaElement | null>(null);
  // valueRef keeps the latest value visible to the imperative handle without
  // forcing it to be recreated on every render.
  const valueRef = useRef(value);
  useEffect(() => {
    valueRef.current = value;
  }, [value]);

  // Register the imperative handle once. Position/setValue calls defer with
  // requestAnimationFrame so they apply after React commits the new value.
  useEffect(() => {
    if (!onMount) return;
    onMount({
      setPosition: (p) => {
        requestAnimationFrame(() => {
          const ta = taRef.current;
          if (!ta) return;
          const off = offsetForPos(valueRef.current, p);
          ta.setSelectionRange(off, off);
        });
      },
      revealPositionInCenter: (p) => {
        requestAnimationFrame(() => {
          const ta = taRef.current;
          if (!ta) return;
          const totalLines = (valueRef.current.match(/\n/g) ?? []).length + 1;
          const ratio = (p.lineNumber - 1) / Math.max(1, totalLines - 1);
          const max = Math.max(0, ta.scrollHeight - ta.clientHeight);
          ta.scrollTop = ratio * max;
        });
      },
      focus: () => {
        // Defer so focus runs after a sibling state update commits.
        requestAnimationFrame(() => taRef.current?.focus());
      },
      setValue: (v) => {
        // Push through the parent's onChange so React stays the source of
        // truth; valueRef is updated immediately so a setPosition call that
        // follows on the same tick computes the right offset.
        valueRef.current = v;
        onChange(v);
      },
    });
    // onMount changes per render in some callers — we deliberately register
    // on every mount/render to keep the handle pointing at fresh closures.
  });

  return (
    <textarea
      ref={taRef}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={(e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
          e.preventDefault();
          onSubmit?.();
        }
      }}
      spellCheck={false}
      autoCapitalize="off"
      autoCorrect="off"
      className="w-full h-full font-mono outline-none resize-none p-3
                 bg-stone-50 text-stone-900
                 dark:bg-slate-900 dark:text-indigo-50"
      style={{ fontSize: `${fontSize}px` }}
    />
  );
}
