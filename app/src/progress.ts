// Per-session completion tracking. Resets when the browser session ends — by design.
// Students can replay any lesson freely; completion is a soft progress marker, not a gate.

import { sessionGet, sessionSet } from "./storage";

const KEY = (courseId: string, lessonId: string) =>
  `cul:complete:${courseId}:${lessonId}`;

export function markComplete(courseId: string, lessonId: string) {
  sessionSet(KEY(courseId, lessonId), "1");
}

export function isComplete(courseId: string, lessonId: string): boolean {
  return sessionGet(KEY(courseId, lessonId)) === "1";
}
