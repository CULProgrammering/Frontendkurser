import type { Lesson } from "../../types";
import { codePanelStyle, noteBoxStyle } from "./_shared";

export const moveCopyLesson: Lesson = {
  id: "vscode-move-copy",
  title: "2. Move & copy lines",
  summary: "Rearrange and duplicate lines without cut-paste.",
  slides: [
    {
      kind: "explanation",
      title: "Move and copy lines",
      intro:
        "Three shortcuts that replace most cut-paste operations on whole lines.",
      demo: [
        {
          id: "shortcuts",
          label:
            "Alt + ↑ / ↓       Move the current line up or down\nShift+Alt + ↓    Duplicate the current line below\nShift+Alt + ↑    Duplicate the current line above\n\nCtrl+C  (no selection)   Copy the whole line\nCtrl+X  (no selection)   Cut the whole line",
          baseStyle: codePanelStyle,
        },
        {
          id: "note",
          kind: "note",
          label:
            "These all operate on the whole line\nwhen nothing is selected.\n\nCtrl+C / Ctrl+X behave normally\nwhen text IS selected.",
          baseStyle: { ...noteBoxStyle, marginTop: 16 },
        },
      ],
      steps: [
        {
          narration:
            "Alt+↓ moves the current line down by one. Alt+↑ moves it up.\nHold the keys to keep moving.",
          tokenHighlight: ["Alt + ↑ / ↓"],
        },
        {
          narration:
            "Shift+Alt+↓ duplicates the current line below.\nNo clipboard needed — the original stays in place.",
          tokenHighlight: ["Shift+Alt + ↓"],
        },
        {
          narration:
            "Ctrl+C or Ctrl+X with nothing selected treats the entire line as the selection.\nCtrl+X cuts and removes the line from the file.",
          tokenHighlight: ["Ctrl+C", "Ctrl+X"],
        },
      ],
    },

    {
      kind: "js-workshop",
      title: "Practice: move & copy lines",
      prompt:
        "Practice each shortcut from the explanation — moving up/down, duplicating up/down, and cutting whole lines.",
      steps: [
        {
          id: "move-line-down",
          instruction:
            "The lines are in the wrong order: c, a, b.\nUse **Alt+↓** to move `let c` down until the order is a, b, c.",
          starterCode: "let c = 3;\nlet a = 1;\nlet b = 2;\n",
          checks: [
            {
              message: "Move `let c` to the bottom — order should be a, b, c.",
              requirePattern: /let a[\s\S]*let b[\s\S]*let c/,
            },
          ],
          reveal: "let a = 1;\nlet b = 2;\nlet c = 3;\n",
        },
        {
          id: "move-line-up",
          instruction:
            "Now the opposite direction. The order is a, b, c — use **Alt+↑** to move `let c` up to the top so the order becomes c, a, b.",
          starterCode: "let a = 1;\nlet b = 2;\nlet c = 3;\n",
          checks: [
            {
              message: "Move `let c` to the top — order should be c, a, b.",
              requirePattern: /let c[\s\S]*let a[\s\S]*let b/,
            },
          ],
          reveal: "let c = 3;\nlet a = 1;\nlet b = 2;\n",
        },
        {
          id: "duplicate-below",
          instruction:
            "Place the cursor anywhere on the line.\nUse **Shift+Alt+↓** to duplicate it below — there should be two identical `console.log` lines.",
          starterCode: 'console.log("one");\n',
          checks: [
            {
              message: "Duplicate the line so it appears twice.",
              requirePattern:
                /console\.log\("one"\)[\s\S]*console\.log\("one"\)/,
            },
          ],
          reveal: 'console.log("one");\nconsole.log("one");\n',
        },
        {
          id: "duplicate-above",
          instruction:
            "Same idea, other direction.\nUse **Shift+Alt+↑** to duplicate the line above — the copy goes ABOVE the original this time.",
          starterCode: 'console.log("two");\n',
          checks: [
            {
              message: "Duplicate the line so it appears twice.",
              requirePattern:
                /console\.log\("two"\)[\s\S]*console\.log\("two"\)/,
            },
          ],
          reveal: 'console.log("two");\nconsole.log("two");\n',
        },
        {
          id: "cut-line",
          instruction:
            "Place the cursor anywhere on the comment line — don't select anything.\nUse **Ctrl+X** to cut the whole line. It should disappear from the file.",
          starterCode: "let a = 1;\n// cut this line\nlet b = 2;\n",
          checks: [
            {
              message: "`let a` and `let b` should still be there.",
              requirePattern: /let a[\s\S]*let b/,
            },
            {
              message: "The comment line should be gone.",
              assert: 'return !__source.includes("cut this line");',
            },
          ],
          reveal: "let a = 1;\nlet b = 2;\n",
        },
      ],
    },
  ],
};
