import type { Lesson } from "../../types";
import { codePanelStyle, noteBoxStyle } from "./_shared";

export const navigationLesson: Lesson = {
  id: "vscode-navigation",
  title: "6. Navigation",
  summary: "Jump between files and locations without leaving the keyboard.",
  slides: [
    {
      kind: "explanation",
      title: "Moving around the editor",
      intro:
        "Once your project grows beyond a few files, finding things gets slow.\nThese shortcuts keep your hands on the keyboard.",
      demo: [
        {
          id: "shortcuts",
          label:
            "Ctrl + P             Quick open — type a filename to jump to it\nCtrl + G             Go to line — type a line number\nCtrl + Tab           Cycle through recently opened files\nCtrl + Shift + F     Search across all files in the project",
          baseStyle: codePanelStyle,
        },
        {
          id: "note",
          kind: "note",
          label:
            "Ctrl+P is the most-used shortcut\nfor most developers.\nLearn this one first.",
          baseStyle: { ...noteBoxStyle, marginTop: 16 },
        },
      ],
      steps: [
        {
          narration:
            "Ctrl+P opens a floating search box.\nStart typing any part of a filename — it fuzzy-matches instantly.\nPress Enter to open the file.",
          tokenHighlight: ["Ctrl + P"],
        },
        {
          narration:
            "Ctrl+G opens a line number prompt.\nType a number and press Enter to jump straight to that line.",
          tokenHighlight: ["Ctrl + G"],
        },
        {
          narration:
            "Ctrl+Tab cycles through recently opened files.\nHold Ctrl and press Tab repeatedly to step through the list.",
          tokenHighlight: ["Ctrl + Tab"],
        },
        {
          narration:
            "Ctrl+Shift+F opens the global search panel.\nSearch across every file in the workspace — useful for finding where a variable is used.",
          tokenHighlight: ["Ctrl + Shift + F"],
        },
      ],
    },

    {
      kind: "explanation",
      title: "A few more worth knowing",
      intro: "Some shortcuts that become useful once you're writing real code.",
      demo: [
        {
          id: "more",
          label:
            "F12                  Go to definition\nAlt + ←              Jump back (after Go to definition)\nCtrl + \\             Split the editor into two panels\nCtrl + B             Toggle the sidebar",
          baseStyle: codePanelStyle,
        },
      ],
      steps: [
        {
          narration:
            "F12 jumps to where a function or variable is defined — even in another file.\nAlt+← jumps back to where you were before.",
          tokenHighlight: ["F12", "Alt + ←"],
        },
        {
          narration:
            "Ctrl+\\ splits the editor into two panels side-by-side.\nUseful for reading a test file next to the code it tests.",
          tokenHighlight: ["Ctrl + \\"],
        },
        {
          narration:
            "Ctrl+B hides or shows the file sidebar.\nToggling it gives you more room to read code on a small screen.",
          tokenHighlight: ["Ctrl + B"],
        },
      ],
    },
  ],
};
