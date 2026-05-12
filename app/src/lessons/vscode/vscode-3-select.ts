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
      prompt: "Use keyboard selection shortcuts to make targeted edits.",
      steps: [
        {
          id: "select-word-rename",
          instruction:
            "Place the cursor at the very start of `myVariable`.\nUse **Ctrl+Shift+→** to select the whole word, then type `total` to replace it.",
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
          id: "select-to-end",
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
      ],
    },
  ],
};
