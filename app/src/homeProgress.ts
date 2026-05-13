/**
 * Home-page progress helpers — aggregate the per-tier completion data from
 * [`progress.ts`](./progress.ts) into the shape the home hero needs:
 * "next lesson to continue" and "X of Y lessons complete".
 *
 * Lesson granularity (not tier or step) is intentional: the hero CTA reads
 * cleanest as "Continue — Variables · let and const", and the progress
 * beads form a calm progress bar at the size the design specifies.
 */

import type { Course, Lesson, Topic } from "./types";
import { COURSES } from "./lessons";
import { isComplete } from "./progress";

export type LessonRef = {
  course: Course;
  /** Present when the lesson belongs to a course with topics. */
  topic?: Topic;
  lesson: Lesson;
};

/**
 * Walk every lesson in the curriculum, in display order. Topics are
 * traversed before flat course lessons so a CSS-then-JS COURSES list reads
 * left-to-right; if you reorder COURSES the walk follows.
 */
export function walkLessons(): LessonRef[] {
  const out: LessonRef[] = [];
  for (const course of COURSES) {
    if (course.topics && course.topics.length > 0) {
      for (const topic of course.topics) {
        for (const lesson of topic.lessons) {
          out.push({ course, topic, lesson });
        }
      }
    } else if (course.lessons && course.lessons.length > 0) {
      for (const lesson of course.lessons) {
        out.push({ course, lesson });
      }
    }
  }
  return out;
}

/**
 * Find the next lesson to "Continue" on the hero. The first lesson whose
 * `isComplete` returns false wins — that includes both partly-started and
 * never-touched lessons. Returns `null` when every lesson is complete.
 */
export function findNextLesson(): LessonRef | null {
  for (const ref of walkLessons()) {
    if (!isComplete(ref.course.id, ref.lesson)) return ref;
  }
  return null;
}

/**
 * Curriculum-order "next lesson" — the lesson that immediately follows the
 * given (courseId, lessonId) in walk order, regardless of completion state.
 * Used by the end-of-lesson "Continue → {next lesson}" button. Returns
 * `null` when this is the last lesson in the curriculum.
 */
export function nextLessonAfter(
  courseId: string,
  lessonId: string,
): LessonRef | null {
  const all = walkLessons();
  const idx = all.findIndex(
    (ref) => ref.course.id === courseId && ref.lesson.id === lessonId,
  );
  if (idx < 0) return null;
  return all[idx + 1] ?? null;
}

/**
 * Display number for a lesson within its parent grouping — the "2." in
 * "2. Types — what kind of value". Uses position within the topic when a
 * topic is present (Variables 1..4); otherwise position within the flat
 * course.lessons array (VS Code 1..N). Returns `null` when neither grouping
 * is found (defensive — shouldn't happen for a ref produced by
 * `walkLessons`).
 */
export function lessonNumber(ref: LessonRef): number | null {
  if (ref.topic) {
    const idx = ref.topic.lessons.findIndex((l) => l.id === ref.lesson.id);
    return idx >= 0 ? idx + 1 : null;
  }
  const flat = ref.course.lessons ?? [];
  const idx = flat.findIndex((l) => l.id === ref.lesson.id);
  return idx >= 0 ? idx + 1 : null;
}

/** Per-bead status for the home hero progress strip. */
export type LessonStatus = LessonRef & { complete: boolean };

export function lessonStatuses(): LessonStatus[] {
  return walkLessons().map((ref) => ({
    ...ref,
    complete: isComplete(ref.course.id, ref.lesson),
  }));
}

export function lessonProgressTotal(): { done: number; total: number } {
  const all = walkLessons();
  let done = 0;
  for (const ref of all) {
    if (isComplete(ref.course.id, ref.lesson)) done++;
  }
  return { done, total: all.length };
}
