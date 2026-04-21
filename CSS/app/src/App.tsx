import { useState } from "react";
import "./App.css";
import { boxModelLesson } from "./lessons/boxModel";
import { SlideDeck } from "./components/SlideDeck";
import { ThemeToggle } from "./components/ThemeToggle";
import type { Lesson } from "./types";

const LESSONS: Lesson[] = [boxModelLesson];

function App() {
  const [active, setActive] = useState<Lesson | null>(null);

  return (
    <>
      <ThemeToggle />
      {active ? (
        <SlideDeck lesson={active} onExit={() => setActive(null)} />
      ) : (
        <div className="min-h-full p-10">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-semibold mb-1 text-stone-900 dark:text-indigo-50">
              CUL Programmering
            </h1>
            <p className="text-stone-500 dark:text-indigo-200/70 mb-10">
              CSS-lektioner — välj en för att börja.
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              {LESSONS.map((l) => (
                <button
                  key={l.id}
                  onClick={() => setActive(l)}
                  className="text-left rounded-2xl p-5 transition-all
                             bg-white ring-1 ring-stone-200 hover:ring-amber-400 shadow-sm hover:shadow
                             dark:bg-slate-900/60 dark:ring-white/10 dark:hover:ring-indigo-400/50 dark:shadow-none"
                >
                  <div className="text-lg font-semibold text-stone-900 dark:text-indigo-50">
                    {l.title}
                  </div>
                  <div className="text-sm text-stone-600 dark:text-indigo-200/70 mt-1">
                    {l.summary}
                  </div>
                  <div className="text-xs text-amber-600 dark:text-indigo-300/60 mt-3">
                    {l.slides.length} steg →
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
