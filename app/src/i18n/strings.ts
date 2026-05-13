// Centralized UI strings used by the chrome (header, picker, footer, etc.).
// Lesson content is localized inline in lesson data files.

import type { LocalizedString } from ".";

export const ui = {
  appTitle: "CUL Programmering",
  home: "Home",
  pickerSubtitle: "Pick a lesson to begin.",
  noLessons: "No lessons yet.",
  stepsCount: "steps →",
  lessonsCount: "lessons →",
  comingSoon: "Coming soon",
  doneBadge: "done",

  // Home hero
  heroTitle: "Learn frontend, one puzzle piece at a time.",
  heroSubtitle: "Short explanations, small puzzles, and labs you can run right away. No accounts, no time limit — you just need curiosity.",
  heroEyebrow: "Frontendkurser · JavaScript & frontend",
  heroContinuePrefix: "Continue",
  // Shown on the primary hero CTA at progress=0. "Continue" reads as "resume"
  // and confuses a cold student who hasn't started anything; "Start" sets
  // the right expectation. Flips back to `heroContinuePrefix` once any
  // lesson is complete.
  heroStartPrefix: "Start",
  heroStart: "Start from the beginning",
  heroProgressLabel: "Your progress so far",
  heroLessonsCompleteSuffix: "of {total} lessons complete",
  heroAllDone: "All lessons complete — nice work.",
  heroResetProgress: "Reset progress",
  heroResetConfirm:
    "Reset all progress? Your completed lessons will be cleared. This can't be undone.",
  // Topic-card variants
  topicLessonsCount: "{n} lessons",
  topicSingleLesson: "1 lesson",

  // SlideDeck
  backToLessons: "← Lessons",
  backToTiers: "← Lesson",
  prev: "◀ Back",
  next: "Next ▶",
  escapeHint: "Esc to go back",

  // LessonTierMenu
  tierExplanation: "1. Read the idea",
  tierChips: "2. Place the pieces",
  tierWorkshop: "3. Practice with hints",
  tierExercise: "4. Try it solo",
  tierExplanationDesc: "Read through the idea, step by step.",
  tierChipsDesc: "Assemble the code from chips and slots.",
  tierWorkshopDesc: "Guided edits in a real editor.",
  tierExerciseDesc: "Solve it from scratch in the lab.",
  tierSlideCount: "slides",
  tierEmpty: "No content yet.",
  tierOrderCaption:
    "Work through these in order — each one builds on the last.",

  // ExplanationSlideView. "Part" (not "Step") so it doesn't collide with
  // the outer numbered slide-jump dots — those are slides 1..N within the
  // tier; the inner counter is "Part X / Y" within the current slide.
  stepLabel: "Part",
  stepBack: "← Back",
  endOfExplanation: "End of explanation.",
  clickToContinue: "Click anywhere to continue →",
  nextSlide: "Next →",

  // AssignmentSlideView
  cssLabel: "CSS",
  jsLabel: "JavaScript",
  check: "Check",
  reset: "Reset",
  showHelp: "Show help",
  hideHelp: "Hide help",
  yourVersion: "Your version",
  preview: "Preview",
  goal: "Goal — try to match",
  doneCheers: "✓ Done. Nice work.",
  needsAdjusting: "These need adjusting:",
  outOfRight: "of",
  legendLabel: "Legend",

  // Mobile tab labels (TwoColumnLayout)
  tabCode: "Code",
  tabInstructions: "Instructions",
  tabResult: "Result",
  tabVisual: "Visual",
  tabPreview: "Preview",
  tabStory: "Story",

  // JsAssignmentSlideView
  testLabel: "Test",
  testCases: "Test cases",
  allTestsPass: "✓ Done — all tests pass.",
  testsClear: "tests passing.",
  expected: "Expected:",
  yourCodeGave: "Your code gave:",
  errorPrefix: "Error:",

  // ExerciseSlideView
  htmlLabel: "HTML",
  exerciseRun: "Run",
  exerciseTests: "Tests",
  exerciseAllPass: "✓ All checks pass. Nice work.",
  exerciseRunHint: "Press Run to check your work.",
  exercisePassedCount: "passing",
  consoleLabel: "Console",
  consoleEmpty: "(no output yet — press Run)",

  // SlideDeck — picker label above workshop/exercise tiers when there are
  // multiple slides in the tier (so the dots aren't mistaken for a step
  // indicator).
  tierLabelWorkshop: "Workshop",
  tierLabelLab: "Lab",

  // JsWorkshopSlideView. "Part" (not "Step") so it doesn't collide with the
  // outer "Workshop X / N" tier counter — the inner one is a sub-step
  // within the current workshop.
  workshopStepLabel: "Part",
  workshopHintLabel: "Hint",
  workshopHintShow: "Show hint",
  workshopHintHide: "Hide hint",
  workshopRestartStep: "Restart step",
  workshopCheckHint: "Press Check when you're ready.",
  workshopCheckShortcut: "Check (Ctrl/Cmd+Enter)",
  workshopStepPass: "✓ Step done.",
  workshopStepPassAdvancing: "✓ Step done — moving on.",
  workshopAllStepsPass: "✓ Workshop complete. Nice work.",
  workshopStepReady: "✓ Step done. Review the output, then click Next when you're ready.",
  workshopNextStep: "Next step ▶",
  /**
   * Used at the end of any slide deck to route the student back to where
   * they came from. Generic on purpose — the breadcrumb already shows
   * the destination, and "Back" works for explanation/chips/workshop
   * (back to tier menu) and walkthrough/challenge (back to topic view).
   */
  slideBack: "◀ Back",
  workshopConsoleLabel: "Console output",
  workshopConsoleEmpty: "No console output for this step.",
  /**
   * Help popover shown via the "?" button in workshop and exercise chrome.
   * Three variants — the renderer picks one based on the step's
   * `flexibility` flags (see `FlexibilityFlags` in types.ts):
   *   - both       → values + names are flexible
   *   - valuesOnly → values are flexible, names are pinned
   *   - namesOnly  → names are flexible, values are pinned
   * The button is hidden entirely on steps with neither flag set, so
   * students never see the "?" on a fully rigid step.
   */
  flexibilityHelpTitleBoth: "Values and names are flexible",
  flexibilityHelpTitleValues: "Any value works",
  flexibilityHelpTitleNames: "Any variable name works",
  flexibilityHelpBodyBoth: "You don't have to use the proposed value or variable name from the instructions.\n\n• Any value of the same datatype works (use any string, any number, any boolean).\n• Any variable name works in this step.\n\nIf you'd rather not pick — use the proposed value and name. Both routes pass the check.",
  flexibilityHelpBodyValues: "You don't have to use the proposed value from the instructions. Any value of the same datatype works — use any string, any number, or any boolean (whichever the step asks for).\n\nIf you'd rather not pick — use the proposed value. Both routes pass the check.",
  flexibilityHelpBodyNames: "You don't have to use the proposed variable name from the instructions. Any name works in this step.\n\nIf you'd rather not pick — use the proposed name. Both routes pass the check.",
  flexibilityHelpButtonLabel: "About values and names",

  // Topic-level long-form sections (rendered in the topic view).
  walkthroughsSection: "Walkthroughs",
  challengesSection: "Challenges",
  walkthroughBadge: "Walkthrough",
  challengeBadge: "Challenge",
  walkthroughsTagline: "Long-form, step-by-step. We type, you watch and try along.",
  challengesTagline: "No hand-holding. Read the spec, write the code, pass the tests.",
  walkthroughsBadgeGuided: "guided",
  challengesBadgeOpen: "open-ended",
  testsCount: "tests",
  singleTest: "test",
  stepsLabel: "steps",
  chapterPrefix: "Chapter",
  lessonsHeading: "Lessons",

  // ThemeToggle / LanguageToggle
  toLight: "Light mode",
  toDark: "Dark mode",
  toEnglish: "English",
  toSwedish: "Swedish",
} satisfies Record<string, LocalizedString>;
