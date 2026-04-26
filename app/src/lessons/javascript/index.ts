import type { Course } from "../../types";
import { doorLesson } from "./level1-door";
import { forkLesson } from "./level2-fork";
import { conveyorLesson } from "./level3-conveyor";
import { multiGateLesson } from "./level4-multigate";
import { stairsLesson } from "./level5-stairs";
import { lettersLesson } from "./level6-letters";
import { countdownLesson } from "./level7-countdown";
import { tastingLesson } from "./level8-tasting";

export const javascriptCourse: Course = {
  id: "javascript",
  title: "JavaScript",
  summary: "Logik och kontrollflöde.",
  topics: [
    {
      id: "conditionals",
      title: { en: "Conditionals", sv: "Villkor" },
      summary: {
        en: "if, else, switch, and combining checks.",
        sv: "if, else, switch, och att kombinera kontroller.",
      },
      lessons: [doorLesson, forkLesson, conveyorLesson, multiGateLesson],
    },
    {
      id: "loops",
      title: { en: "Loops", sv: "Loopar" },
      summary: {
        en: "for, for…of, while, do…while.",
        sv: "for, for…of, while, do…while.",
      },
      lessons: [stairsLesson, lettersLesson, countdownLesson, tastingLesson],
    },
  ],
};
