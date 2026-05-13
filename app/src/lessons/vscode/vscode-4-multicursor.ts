import type { Lesson } from "../../types";
import { codePanelStyle, noteBoxStyle } from "./_shared";

export const multicursorLesson: Lesson = {
  id: "vscode-multicursor",
  title: "4. Multiple cursors",
  summary: "Select and edit several places in the file at the same time.",
  slides: [
    {
      kind: "explanation",
      title: "Multiple cursors",
      intro:
        "VS Code can place more than one cursor in the file at once.\nAnything you type or delete happens at all cursors simultaneously.",
      demo: [
        {
          id: "shortcuts",
          label:
            "Ctrl + D               Select next occurrence of current word\nCtrl + Shift + L       Select ALL occurrences in the file\nAlt + Click            Add a cursor at the click position",
          baseStyle: codePanelStyle,
        },
        {
          id: "note",
          kind: "note",
          label:
            "Ctrl+D is the fastest way to rename\na variable — place cursor on the name,\npress Ctrl+D until all copies are\nselected, then type the new name.\n\nPress Escape to collapse back to\na single cursor.",
          baseStyle: { ...noteBoxStyle, marginTop: 16 },
        },
      ],
      steps: [
        {
          narration:
            "Ctrl+D selects the word under the cursor on the first press.\nEach subsequent press finds the NEXT occurrence and adds a cursor there.",
          tokenHighlight: ["Ctrl + D"],
        },
        {
          narration:
            "Ctrl+Shift+L selects ALL occurrences at once — useful for a file-wide rename.",
          tokenHighlight: ["Ctrl + Shift + L"],
        },
        {
          narration:
            "Alt+Click places an extra cursor wherever you click.\nUseful when the places you want to edit aren't all the same word.",
          tokenHighlight: ["Alt + Click"],
        },
        {
          narration: "Press Escape to collapse all extra cursors back to one.",
        },
      ],
    },

    {
      kind: "js-workshop",
      title: "Practice: multiple cursors",
      prompt:
        "Practice Ctrl+D, Ctrl+Shift+L, and Alt+Click — three ways to edit multiple places at once.",
      steps: [
        {
          id: "ctrl-d-rename",
          instruction:
            "Place the cursor on one of the `oldName` occurrences.\nPress **Ctrl+D** twice more to select all three, then type `score` to replace them all at once.",
          starterCode: "let oldName = 0;\noldName = oldName + 10;\n",
          checks: [
            {
              message: "Replace all occurrences of `oldName` with `score`.",
              requirePattern: /\bscore\b/,
            },
            {
              message: "`oldName` should no longer appear anywhere.",
              assert: 'return !__source.includes("oldName");',
            },
            {
              message: "`score` should be a number.",
              assert: "return typeof score === 'number';",
            },
          ],
          reveal: "let score = 0;\nscore = score + 10;\n",
        },
        {
          id: "ctrl-shift-l-rename",
          instruction:
            "Same kind of rename, but in one shot.\nPlace the cursor on any `myValue`. Press **Ctrl+Shift+L** to select ALL occurrences at once, then type `total` to rename everywhere.",
          starterCode: "let myValue = 10;\nconsole.log(myValue);\nmyValue = myValue + 5;\n",
          checks: [
            {
              message: "Replace every `myValue` with `total`.",
              requirePattern: /\btotal\b/,
            },
            {
              message: "`myValue` should no longer appear anywhere.",
              assert: 'return !__source.includes("myValue");',
            },
            {
              message: "`total` should be a number.",
              assert: "return typeof total === 'number';",
            },
          ],
          reveal: "let total = 10;\nconsole.log(total);\ntotal = total + 5;\n",
        },
        {
          id: "alt-click-edit",
          instruction:
            "Use **Alt+Click** to place a cursor right before each `\"test\"` (between the space and the opening quote).\nThen press **Shift+End** — every cursor selects to the end of its line, so all three `\"test\";` are highlighted at once. Type `\"yes\";` to replace all three.",
          starterCode: 'let x = "test";\nlet y = "test";\nlet z = "test";\n',
          checks: [
            {
              message: "`x`, `y`, and `z` should all equal `\"yes\"`.",
              assert:
                'return x === "yes" && y === "yes" && z === "yes";',
            },
          ],
          reveal: 'let x = "yes";\nlet y = "yes";\nlet z = "yes";\n',
        },
      ],
    },
  ],
};
