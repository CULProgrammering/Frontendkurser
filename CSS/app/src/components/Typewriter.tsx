import { useEffect, useState } from "react";

type Props = { text: string; speed?: number; onDone?: () => void };

export function Typewriter({ text, speed = 18, onDone }: Props) {
  const [n, setN] = useState(0);

  useEffect(() => {
    setN(0);
  }, [text]);

  useEffect(() => {
    if (n >= text.length) {
      onDone?.();
      return;
    }
    const id = window.setTimeout(() => setN((v) => v + 1), speed);
    return () => window.clearTimeout(id);
  }, [n, text, speed, onDone]);

  return (
    <span>
      {text.slice(0, n)}
      {n < text.length && <span className="animate-pulse text-indigo-300">▌</span>}
    </span>
  );
}
