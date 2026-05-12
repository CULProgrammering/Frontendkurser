import type { Course } from "../../types";
import { letConstLesson } from "./variables-1-let-const";
import { typesLesson } from "./variables-2-types";
import { operatorsLesson } from "./variables-3-operators";
import { specialValuesLesson } from "./variables-4-special-values";
import { variablesWalkthrough } from "./variables-walkthrough";
import { variablesChallenge } from "./variables-challenge";
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
      id: "variables",
      title: "Variables",
      summary: "Names for values, types, operators, and special values.",
      lessons: [letConstLesson, typesLesson, operatorsLesson, specialValuesLesson],
      walkthroughs: [variablesWalkthrough],
      challenges: [variablesChallenge],
    },
    {
      id: "conditionals",
      title: "Conditionals",
      summary: "if, else, switch, and combining checks.",
      lessons: [doorLesson, forkLesson, conveyorLesson, multiGateLesson],
    },
    {
      id: "loops",
      title: "Loops",
      summary: "for, for…of, while, do…while.",
      lessons: [stairsLesson, lettersLesson, countdownLesson, tastingLesson],
    },
  ],
};
