import { useEffect, useState } from "react";

type Props = {
  text: string;
  speed?: number;
  onDone?: () => void;
  /**
   * When this flips to `true`, the typewriter immediately jumps to the end
   * of the text instead of finishing the per-character animation. Lets a
   * parent expose "click to skip the animation" without coupling to internal
   * timing state. Reset by `text` changing (the usual case).
   */
  skip?: boolean;
};

export function Typewriter({ text, speed = 18, onDone, skip = false }: Props) {
  const [n, setN] = useState(0);

  useEffect(() => {
    setN(0);
  }, [text]);

  useEffect(() => {
    if (skip && n < text.length) {
      setN(text.length);
      return;
    }
    if (n >= text.length) {
      onDone?.();
      return;
    }
    const id = window.setTimeout(() => setN((v) => v + 1), speed);
    return () => window.clearTimeout(id);
  }, [n, text, speed, onDone, skip]);

  return (
    <span>
      {text.slice(0, n)}
      {n < text.length && <span className="animate-pulse text-stone-400 dark:text-stone-500">▌</span>}
    </span>
  );
}
