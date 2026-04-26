import type { Course } from "../../types";
import { doorLesson } from "./level1-door";
import { forkLesson } from "./level2-fork";
import { conveyorLesson } from "./level3-conveyor";
import { multiGateLesson } from "./level4-multigate";

export const javascriptCourse: Course = {
  id: "javascript",
  title: "JavaScript",
  summary: "Logik och kontrollflöde.",
  lessons: [doorLesson, forkLesson, conveyorLesson, multiGateLesson],
};
