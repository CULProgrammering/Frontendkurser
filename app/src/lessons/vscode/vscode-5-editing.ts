import type { Lesson } from "../../types";
import { codePanelStyle, noteBoxStyle } from "./_shared";

export const editingLesson: Lesson = {
  id: "vscode-editing",
  title: "5. Editing",
  summary: "Comment lines, delete lines, and fix indentation.",
  slides: [
    {
      kind: "explanation",
      title: "Line-level editing shortcuts",
      intro: "Three shortcuts for actions you do many times a day.",
      demo: [
        {
          id: "shortcuts",
          label:
            "Ctrl + /             Toggle line comment (add or remove //)\nCtrl + Shift + K     Delete the entire current line\nTab                  Indent the line one level\nShift + Tab          Un-indent the line one level",
          baseStyle: codePanelStyle,
        },
        {
          id: "note",
          kind: "note",
          label:
            "Ctrl+/ on a selected block comments\nor uncomments every line at once.\nUseful for temporarily disabling code.",
          baseStyle: { ...noteBoxStyle, marginTop: 16 },
        },
      ],
      steps: [
        {
          narration:
            "Ctrl+/ toggles a `//` comment on the current line.\nIf the line is already a comment, pressing it again removes the `//`.",
          tokenHighlight: ["Ctrl + /"],
        },
        {
          narration:
            "Ctrl+Shift+K deletes the entire line and closes the gap.\nNo need to select the line first — just place the cursor anywhere on it.",
          tokenHighlight: ["Ctrl + Shift + K"],
        },
        {
          narration:
            "Tab indents the current line one level. Shift+Tab un-indents.\nThis works anywhere on the line — you don't need to move to the start.",
          tokenHighlight: ["Tab", "Shift + Tab"],
        },
      ],
    },

    {
      kind: "js-workshop",
      title: "Practice: editing shortcuts",
      prompt: "Use Ctrl+/, Ctrl+Shift+K, and Tab directly in the editor.",
      steps: [
        {
          id: "comment-line",
          instruction:
            "Place the cursor on the `console.log` line.\nUse **Ctrl+/** to comment it out.",
          starterCode: "let x = 5;\nconsole.log(x);\n",
          checks: [
            {
              message: "The `console.log` line should be commented out with `//`.",
              requirePattern: /\/\/.*console\.log/,
            },
          ],
          reveal: "let x = 5;\n// console.log(x);\n",
        },
        {
          id: "delete-line",
          instruction:
            "Place the cursor on the comment line.\nUse **Ctrl+Shift+K** to delete the entire line.",
          starterCode: "let a = 1;\n// remove this line\nlet b = 2;\n",
          checks: [
            {
              message: "`let a` and `let b` should still be there.",
              requirePattern: /let a[\s\S]*let b/,
            },
            {
              message: "The comment line should be gone.",
              assert: 'return !__source.includes("remove this line");',
            },
          ],
          reveal: "let a = 1;\nlet b = 2;\n",
        },
        {
          id: "indent-line",
          instruction:
            "The `console.log` inside the function is not indented.\nPlace the cursor on that line and press **Tab** to indent it.",
          starterCode: 'function greet() {\nconsole.log("hello");\n}\n',
          checks: [
            {
              message: "The `console.log` line should be indented.",
              requirePattern: /\n[ \t]+console\.log/,
            },
          ],
          reveal: 'function greet() {\n  console.log("hello");\n}\n',
        },
      ],
    },
  ],
};
