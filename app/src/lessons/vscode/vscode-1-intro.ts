import type { Lesson } from "../../types";
import { codePanelStyle, noteBoxStyle } from "./_shared";

export const introLesson: Lesson = {
  id: "vscode-intro",
  title: "1. Why shortcuts?",
  summary: "Why keyboard shortcuts save more time than you think.",
  slides: [
    {
      kind: "explanation",
      title: "The mouse costs time",
      intro:
        "Moving your hand to the mouse and back takes about 2 seconds.\nThat adds up fast when you do it dozens of times an hour.",
      demo: [
        {
          id: "mouse",
          label:
            "With the mouse:\n  → reach for mouse\n  → find the cursor\n  → click, drag, click\n  → hand back to keyboard\n  ≈ 4–5 seconds per action",
          baseStyle: codePanelStyle,
        },
        {
          id: "keyboard",
          label:
            "With a shortcut:\n  → press two keys\n  ≈ 0.5 seconds per action",
          baseStyle: { ...codePanelStyle, marginTop: 16 },
        },
        {
          id: "note",
          kind: "note",
          label:
            "The real gain isn't just speed.\nStaying on the keyboard keeps your focus on the code,\nnot on moving a cursor.",
          baseStyle: { ...noteBoxStyle, marginTop: 16 },
        },
      ],
      steps: [
        {
          narration:
            "Every time you reach for the mouse, you break your typing rhythm.\nA simple task — cut a line, comment it out — costs 4–5 seconds via mouse.",
        },
        {
          narration:
            "The same action with a keyboard shortcut: half a second.\nOver a day of coding, that difference adds up.",
          tokenHighlight: ["0.5 seconds"],
        },
        {
          narration:
            "But the bigger win is focus. When you don't have to think about the mouse,\nyou can think about the code.",
        },
      ],
    },

    {
      kind: "explanation",
      title: "What you'll learn",
      intro:
        "Five groups of shortcuts — one lesson each.\nThey take an hour to learn and save time every day.",
      demo: [
        {
          id: "list",
          label:
            "2. Move & copy lines    Alt+↑/↓  Shift+Alt+↓\n3. Select quickly       Shift+End  Ctrl+Shift+→\n4. Multiple cursors     Ctrl+D  Alt+Click\n5. Editing              Ctrl+/  Ctrl+Shift+K  Tab\n6. Navigation           Ctrl+P  Ctrl+G  Ctrl+Shift+F",
          baseStyle: codePanelStyle,
        },
        {
          id: "note",
          kind: "note",
          label:
            "All shortcuts shown are the VS Code defaults\nfor Windows and Linux.\n\nOn Mac: Ctrl → ⌘, Alt → ⌥",
          baseStyle: { ...noteBoxStyle, marginTop: 16 },
        },
      ],
      steps: [
        {
          narration:
            "Five lessons ahead. Each one covers a small group of related shortcuts.",
        },
        {
          narration:
            "Lessons 2–5 have practice exercises inside a real editor.\nLesson 6 is reference only — navigation shortcuts work across files,\nwhich a single editor can't simulate.",
        },
        {
          narration:
            "You won't remember them all immediately — that's normal.\nEach time you catch yourself reaching for the mouse,\nask: 'is there a shortcut for this?'",
        },
      ],
    },
  ],
};
