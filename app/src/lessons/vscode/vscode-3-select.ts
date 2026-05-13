import type { Lesson } from "../../types";
import { codePanelStyle, noteBoxStyle } from "./_shared";

export const selectLesson: Lesson = {
  id: "vscode-select",
  title: "3. Select quickly",
  summary: "Extend selections with the keyboard instead of click-dragging.",
  slides: [
    {
      kind: "explanation",
      title: "Selecting without the mouse",
      intro:
        "Add Shift to any movement key to extend the selection.\nA few combinations are worth memorising.",
      demo: [
        {
          id: "shortcuts",
          label:
            "Shift + End            Select to end of line\nShift + Home           Select to start of line\nCtrl + Shift + →       Select one word at a time (right)\nCtrl + Shift + ←       Select one word at a time (left)\nCtrl + A               Select everything",
          baseStyle: codePanelStyle,
        },
        {
          id: "note",
          kind: "note",
          label:
            "Shift+End → Backspace\nis the fastest way to delete\nthe rest of a line.",
          baseStyle: { ...noteBoxStyle, marginTop: 16 },
        },
      ],
      steps: [
        {
          narration:
            "Shift+End moves the cursor to the end of the line AND selects everything in between.\nShift+Home does the same toward the start.",
          tokenHighlight: ["Shift + End", "Shift + Home"],
        },
        {
          narration:
            "Ctrl+Shift+→ jumps one word right and selects as it goes.\nPress it repeatedly to select multiple words without lifting your hand.",
          tokenHighlight: ["Ctrl + Shift + →"],
        },
        {
          narration:
            "Ctrl+A selects the entire file — useful before a full replace or bulk delete.",
          tokenHighlight: ["Ctrl + A"],
        },
      ],
    },

    {
      kind: "js-workshop",
      title: "Practice: select and replace",
      prompt:
        "Practice each selection shortcut from the explanation — end/start of line, word-by-word, and select-all.",
      steps: [
        {
          id: "shift-end",
          instruction:
            "Place the cursor right after the semicolon on line 1.\nUse **Shift+End** to select to the end of the line, then press **Backspace** to remove the trailing comment.",
          starterCode: "let x = 10; // TODO: change this later\n",
          checks: [
            {
              message: "`let x = 10` should still be there.",
              requirePattern: /\blet x = 10\b/,
            },
            {
              message: "The `// TODO` comment should be gone.",
              assert: 'return !__source.includes("TODO");',
            },
          ],
          reveal: "let x = 10;\n",
        },
        {
          id: "shift-home",
          instruction:
            "Place the cursor right before `let`.\nUse **Shift+Home** to select from the cursor back to the start of the line, then press **Backspace** to remove the comment prefix.",
          starterCode: "// old comment   let value = 5;\n",
          checks: [
            {
              message: "`let value = 5` should still be there.",
              requirePattern: /\blet value = 5\b/,
            },
            {
              message: "The `// old comment` prefix should be gone.",
              assert: 'return !__source.includes("old comment");',
            },
          ],
          reveal: "let value = 5;\n",
        },
        {
          id: "ctrl-shift-right",
          instruction:
            "Place the cursor at the very start of `myVariable`.\nUse **Ctrl+Shift+→** to select the whole word going right, then type `total` to replace it.",
          starterCode: 'let myVariable = "hello";\n',
          checks: [
            {
              message: "The variable should be renamed to `total`.",
              requirePattern: /\btotal\b/,
            },
            {
              message: "`myVariable` should no longer appear in the code.",
              assert: 'return !__source.includes("myVariable");',
            },
          ],
          reveal: 'let total = "hello";\n',
        },
        {
          id: "ctrl-shift-left",
          instruction:
            "Place the cursor right after `oldname` (before the space and `=`).\nUse **Ctrl+Shift+←** to select the word going left, then type `count` to replace it.",
          starterCode: "let oldname = 42;\n",
          checks: [
            {
              message: "The variable should be renamed to `count`.",
              requirePattern: /\bcount\s*=/,
            },
            {
              message: "`oldname` should no longer appear in the code.",
              assert: 'return !__source.includes("oldname");',
            },
          ],
          reveal: "let count = 42;\n",
        },
        {
          id: "ctrl-a",
          instruction:
            "The editor has some old code you want to throw away.\nUse **Ctrl+A** to select everything, then type `let answer = 42;` to replace it all in one go.",
          starterCode: "// scrap this\nlet old = 1;\nlet stale = 2;\n",
          checks: [
            {
              message: "`let answer = 42` should be in the editor.",
              requirePattern: /\blet answer\s*=\s*42\b/,
            },
            {
              message: "None of the old lines should remain.",
              assert:
                'return !__source.includes("scrap") && !__source.includes("let old") && !__source.includes("let stale");',
            },
          ],
          reveal: "let answer = 42;\n",
        },
      ],
    },
  ],
};
