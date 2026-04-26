// Per-session completion tracking. Resets when the browser session ends — by design.
// Students can replay any lesson freely; completion is a soft progress marker, not a gate.

const KEY = (courseId: string, lessonId: string) =>
  `cul:complete:${courseId}:${lessonId}`;

export function markComplete(courseId: string, lessonId: string) {
  try {
    sessionStorage.setItem(KEY(courseId, lessonId), "1");
  } catch {
    // sessionStorage can throw in privacy modes — silently ignore.
  }
}

export function isComplete(courseId: string, lessonId: string): boolean {
  try {
    return sessionStorage.getItem(KEY(courseId, lessonId)) === "1";
  } catch {
    return false;
  }
}
