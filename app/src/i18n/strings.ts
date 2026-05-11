// Centralized UI strings used by the chrome (header, picker, footer, etc.).
// Lesson content is localized inline in lesson data files.

import type { LocalizedString } from ".";

export const ui = {
  appTitle: { en: "CUL Programmering", sv: "CUL Programmering" },
  home: { en: "Home", sv: "Hem" },
  pickerSubtitle: {
    en: "Pick a lesson to begin.",
    sv: "Välj en lektion för att börja.",
  },
  noLessons: { en: "No lessons yet.", sv: "Inga lektioner än." },
  stepsCount: { en: "steps →", sv: "steg →" },
  lessonsCount: { en: "lessons →", sv: "lektioner →" },
  comingSoon: { en: "Coming soon", sv: "Snart" },
  doneBadge: { en: "done", sv: "klar" },

  // Home hero
  heroTitle: {
    en: "Learn frontend, one puzzle piece at a time.",
    sv: "Lär dig frontend, en pusselbit i taget.",
  },
  heroSubtitle: {
    en:
      "Short explanations, small puzzles, and labs you can run right away. No accounts, no time limit — you just need curiosity.",
    sv:
      "Korta förklaringar, små pussel, och labbar du kan köra direkt. Inga konton, ingen tidsgräns — du behöver bara nyfikenhet.",
  },
  heroEyebrow: {
    en: "Frontendkurser · JavaScript & frontend",
    sv: "Frontendkurser · JavaScript & frontend",
  },
  heroContinuePrefix: { en: "Continue", sv: "Fortsätt" },
  heroStart: {
    en: "Start from the beginning",
    sv: "Börja från början",
  },
  heroProgressLabel: {
    en: "Your progress so far",
    sv: "Din väg så här långt",
  },
  heroLessonsCompleteSuffix: {
    en: "of {total} lessons complete",
    sv: "av {total} lektioner klara",
  },
  heroAllDone: {
    en: "All lessons complete — nice work.",
    sv: "Alla lektioner klara — bra jobbat.",
  },
  // Topic-card variants
  topicLessonsCount: {
    en: "{n} lessons",
    sv: "{n} lektioner",
  },
  topicSingleLesson: { en: "1 lesson", sv: "1 lektion" },

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
  nextSlide: { en: "Next →", sv: "Nästa →" },

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

  // Mobile tab labels (TwoColumnLayout)
  tabCode: { en: "Code", sv: "Kod" },
  tabInstructions: { en: "Instructions", sv: "Instruktioner" },
  tabResult: { en: "Result", sv: "Resultat" },
  tabVisual: { en: "Visual", sv: "Visuellt" },
  tabPreview: { en: "Preview", sv: "Förhandsvisning" },
  tabStory: { en: "Story", sv: "Förklaring" },

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

  // SlideDeck — picker label above workshop/exercise tiers when there are
  // multiple slides in the tier (so the dots aren't mistaken for a step
  // indicator).
  tierLabelWorkshop: { en: "Workshop", sv: "Verkstad" },
  tierLabelLab: { en: "Lab", sv: "Labb" },

  // JsWorkshopSlideView
  workshopStepLabel: { en: "Step", sv: "Steg" },
  workshopHintLabel: { en: "Hint", sv: "Tips" },
  workshopHintShow: { en: "Show hint", sv: "Visa tips" },
  workshopHintHide: { en: "Hide hint", sv: "Dölj tips" },
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
  workshopStepReady: {
    en: "✓ Step done. Review the output, then click Next when you're ready.",
    sv: "✓ Steget klart. Granska resultatet och klicka Nästa när du vill gå vidare.",
  },
  workshopNextStep: { en: "Next step ▶", sv: "Nästa steg ▶" },
  /**
   * Used at the end of any slide deck to route the student back to where
   * they came from. Generic on purpose — the breadcrumb already shows
   * the destination, and "Back" works for explanation/chips/workshop
   * (back to tier menu) and walkthrough/challenge (back to topic view).
   */
  slideBack: { en: "◀ Back", sv: "◀ Tillbaka" },
  workshopConsoleLabel: { en: "Console output", sv: "Konsol­utskrift" },
  workshopConsoleEmpty: {
    en: "No console output for this step.",
    sv: "Inget i konsolen för det här steget.",
  },
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
  flexibilityHelpTitleBoth: {
    en: "Values and names are flexible",
    sv: "Värden och namn är flexibla",
  },
  flexibilityHelpTitleValues: {
    en: "Any value works",
    sv: "Vilket värde som helst fungerar",
  },
  flexibilityHelpTitleNames: {
    en: "Any variable name works",
    sv: "Vilket variabelnamn som helst fungerar",
  },
  flexibilityHelpBodyBoth: {
    en:
      "You don't have to use the proposed value or variable name from the instructions.\n\n• Any value of the same datatype works (use any string, any number, any boolean).\n• Any variable name works in this step.\n\nIf you'd rather not pick — use the proposed value and name. Both routes pass the check.",
    sv:
      "Du behöver inte använda det föreslagna värdet eller variabelnamnet från instruktionerna.\n\n• Vilket värde som helst av samma datatyp fungerar (vilken sträng, vilket tal, vilken boolean).\n• Vilket variabelnamn som helst fungerar i detta steg.\n\nVill du inte välja — använd det föreslagna värdet och namnet. Båda vägarna klarar testet.",
  },
  flexibilityHelpBodyValues: {
    en:
      "You don't have to use the proposed value from the instructions. Any value of the same datatype works — use any string, any number, or any boolean (whichever the step asks for).\n\nIf you'd rather not pick — use the proposed value. Both routes pass the check.",
    sv:
      "Du behöver inte använda det föreslagna värdet från instruktionerna. Vilket värde som helst av samma datatyp fungerar — vilken sträng, vilket tal eller vilken boolean (det som steget efterfrågar).\n\nVill du inte välja — använd det föreslagna värdet. Båda vägarna klarar testet.",
  },
  flexibilityHelpBodyNames: {
    en:
      "You don't have to use the proposed variable name from the instructions. Any name works in this step.\n\nIf you'd rather not pick — use the proposed name. Both routes pass the check.",
    sv:
      "Du behöver inte använda det föreslagna variabelnamnet från instruktionerna. Vilket namn som helst fungerar i detta steg.\n\nVill du inte välja — använd det föreslagna namnet. Båda vägarna klarar testet.",
  },
  flexibilityHelpButtonLabel: {
    en: "About values and names",
    sv: "Om värden och namn",
  },

  // Topic-level long-form sections (rendered in the topic view).
  walkthroughsSection: { en: "Walkthroughs", sv: "Genomgångar" },
  challengesSection: { en: "Challenges", sv: "Utmaningar" },
  walkthroughBadge: { en: "Walkthrough", sv: "Genomgång" },
  challengeBadge: { en: "Challenge", sv: "Utmaning" },
  walkthroughsTagline: {
    en: "Long-form, step-by-step. We type, you watch and try along.",
    sv: "Långa genomgångar — steg för steg. Vi skriver, du följer med.",
  },
  challengesTagline: {
    en: "No hand-holding. Read the spec, write the code, pass the tests.",
    sv: "Ingen hjälp. Läs uppgiften, skriv koden, klara testerna.",
  },
  walkthroughsBadgeGuided: { en: "guided", sv: "vägledd" },
  challengesBadgeOpen: { en: "open-ended", sv: "öppen" },
  testsCount: { en: "tests", sv: "tester" },
  singleTest: { en: "test", sv: "test" },
  stepsLabel: { en: "steps", sv: "steg" },
  chapterPrefix: { en: "Chapter", sv: "Kapitel" },
  lessonsHeading: { en: "Lessons", sv: "Lektioner" },

  // ThemeToggle / LanguageToggle
  toLight: { en: "Light mode", sv: "Ljust läge" },
  toDark: { en: "Dark mode", sv: "Mörkt läge" },
  toEnglish: { en: "English", sv: "Engelska" },
  toSwedish: { en: "Swedish", sv: "Svenska" },
} satisfies Record<string, LocalizedString>;
