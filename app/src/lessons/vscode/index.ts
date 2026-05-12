import type { Course } from "../../types";
import { introLesson } from "./vscode-1-intro";
import { moveCopyLesson } from "./vscode-2-move-copy";
import { selectLesson } from "./vscode-3-select";
import { multicursorLesson } from "./vscode-4-multicursor";
import { editingLesson } from "./vscode-5-editing";
import { navigationLesson } from "./vscode-6-navigation";

export const vscodeCourse: Course = {
  id: "vscode",
  title: "VS Code",
  summary: "Work faster in the editor.",
  lessons: [
    introLesson,
    moveCopyLesson,
    selectLesson,
    multicursorLesson,
    editingLesson,
    navigationLesson,
  ],
};
