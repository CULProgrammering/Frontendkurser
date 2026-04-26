import type { Course } from "../../types";
import { boxModelLesson } from "./boxModel";

export const cssCourse: Course = {
  id: "css",
  title: "CSS",
  summary: "Layout, lådor och stil.",
  lessons: [boxModelLesson],
};
