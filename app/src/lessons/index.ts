import type { Course } from "../types";
import { vscodeCourse } from "./vscode";
import { cssCourse } from "./css";
import { javascriptCourse } from "./javascript";

export const COURSES: Course[] = [vscodeCourse, cssCourse, javascriptCourse];
