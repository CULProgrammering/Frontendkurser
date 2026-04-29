// Centralized UI strings used by the chrome (header, picker, footer, etc.).
// Lesson content is localized inline in lesson data files.

import type { LocalizedString } from ".";

export const ui = {
  appTitle: { en: "CUL Programmering", sv: "CUL Programmering" },
  pickerSubtitle: {
    en: "Pick a lesson to begin.",
    sv: "Välj en lektion för att börja.",
  },
  noLessons: { en: "No lessons yet.", sv: "Inga lektioner än." },
  stepsCount: { en: "steps →", sv: "steg →" },
  doneBadge: { en: "done", sv: "klar" },

  // SlideDeck
  backToLessons: { en: "← Lessons", sv: "← Lektioner" },
  backToTiers: { en: "← Lesson", sv: "← Lektion" },
  prev: { en: "◀ Back", sv: "◀ Förra" },
  next: { en: "Next ▶", sv: "Nästa ▶" },
  escapeHint: { en: "Esc to go back", sv: "Esc för att gå tillbaka" },

  // LessonTierMenu
  tierExplanation: { en: "Explanation", sv: "Förklaring" },
  tierChips: { en: "Chips", sv: "Pussel" },
  tierWorkshop: { en: "Workshop", sv: "Verkstad" },
  tierExercise: { en: "Exercise", sv: "Övning" },
  tierExplanationDesc: {
    en: "Read through the idea, step by step.",
    sv: "Läs igenom idén, steg för steg.",
  },
  tierChipsDesc: {
    en: "Assemble the code from chips and slots.",
    sv: "Sätt ihop koden från pusselbitar.",
  },
  tierWorkshopDesc: {
    en: "Guided edits in a real editor.",
    sv: "Vägledda steg i en riktig editor.",
  },
  tierExerciseDesc: {
    en: "Solve it from scratch in the lab.",
    sv: "Lös det från noll i labbet.",
  },
  tierSlideCount: { en: "slides", sv: "sidor" },
  tierEmpty: { en: "No content yet.", sv: "Inget innehåll än." },

  // ExplanationSlideView
  stepLabel: { en: "Step", sv: "Steg" },
  stepBack: { en: "← Back", sv: "← Bakåt" },
  endOfExplanation: { en: "End of explanation.", sv: "Slut på förklaringen." },
  clickToContinue: {
    en: "Click anywhere to continue →",
    sv: "Klicka var som helst för att fortsätta →",
  },

  // AssignmentSlideView
  cssLabel: { en: "CSS", sv: "CSS" },
  jsLabel: { en: "JavaScript", sv: "JavaScript" },
  check: { en: "Check", sv: "Kontrollera" },
  reset: { en: "Reset", sv: "Återställ" },
  showHelp: { en: "Show help", sv: "Visa hjälp" },
  hideHelp: { en: "Hide help", sv: "Dölj hjälp" },
  yourVersion: { en: "Your version", sv: "Din version" },
  preview: { en: "Preview", sv: "Förhandsvisning" },
  goal: { en: "Goal — try to match", sv: "Mål — försök att matcha" },
  doneCheers: { en: "✓ Done. Nice work.", sv: "✓ Klart! Bra jobbat." },
  needsAdjusting: {
    en: "These need adjusting:",
    sv: "Följande behöver justeras:",
  },
  outOfRight: { en: "of", sv: "av" },
  legendLabel: { en: "Legend", sv: "Legend" },

  // JsAssignmentSlideView
  testLabel: { en: "Test", sv: "Test" },
  testCases: { en: "Test cases", sv: "Testfall" },
  allTestsPass: {
    en: "✓ Done — all tests pass.",
    sv: "✓ Klart — alla testfall stämmer.",
  },
  testsClear: { en: "tests passing.", sv: "testfall klara." },
  expected: { en: "Expected:", sv: "Förväntat:" },
  yourCodeGave: { en: "Your code gave:", sv: "Din kod gav:" },
  errorPrefix: { en: "Error:", sv: "Fel:" },

  // ExerciseSlideView
  htmlLabel: { en: "HTML", sv: "HTML" },
  exerciseRun: { en: "Run", sv: "Kör" },
  exerciseTests: { en: "Tests", sv: "Tester" },
  exerciseAllPass: {
    en: "✓ All checks pass. Nice work.",
    sv: "✓ Alla kontroller klara. Bra jobbat.",
  },
  exerciseRunHint: {
    en: "Press Run to check your work.",
    sv: "Tryck Kör för att kontrollera.",
  },
  exercisePassedCount: { en: "passing", sv: "klara" },
  consoleLabel: { en: "Console", sv: "Konsol" },
  consoleEmpty: {
    en: "(no output yet — press Run)",
    sv: "(ingen utskrift än — tryck Kör)",
  },

  // JsWorkshopSlideView
  workshopStepLabel: { en: "Step", sv: "Steg" },
  workshopRestartStep: { en: "Restart step", sv: "Börja om steget" },
  workshopCheckHint: {
    en: "Press Check when you're ready.",
    sv: "Tryck Kontrollera när du är redo.",
  },
  workshopCheckShortcut: {
    en: "Check (Ctrl/Cmd+Enter)",
    sv: "Kontrollera (Ctrl/Cmd+Enter)",
  },
  workshopStepPass: {
    en: "✓ Step done.",
    sv: "✓ Steget klart.",
  },
  workshopStepPassAdvancing: {
    en: "✓ Step done — moving on.",
    sv: "✓ Steget klart — vi går vidare.",
  },
  workshopAllStepsPass: {
    en: "✓ Workshop complete. Nice work.",
    sv: "✓ Verkstaden klar. Bra jobbat.",
  },

  // ThemeToggle / LanguageToggle
  toLight: { en: "Light mode", sv: "Ljust läge" },
  toDark: { en: "Dark mode", sv: "Mörkt läge" },
  toEnglish: { en: "English", sv: "Engelska" },
  toSwedish: { en: "Swedish", sv: "Svenska" },
} satisfies Record<string, LocalizedString>;
