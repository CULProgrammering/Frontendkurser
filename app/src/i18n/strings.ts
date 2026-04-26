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
  prev: { en: "◀ Back", sv: "◀ Förra" },
  next: { en: "Next ▶", sv: "Nästa ▶" },
  escapeHint: { en: "Esc to go back", sv: "Esc för att gå tillbaka" },

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

  // ThemeToggle / LanguageToggle
  toLight: { en: "Light mode", sv: "Ljust läge" },
  toDark: { en: "Dark mode", sv: "Mörkt läge" },
  toEnglish: { en: "English", sv: "Engelska" },
  toSwedish: { en: "Swedish", sv: "Svenska" },
} satisfies Record<string, LocalizedString>;
