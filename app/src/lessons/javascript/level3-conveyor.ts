import type { Lesson } from "../../types";
import { codePanelStyle, noteBoxStyle } from "./_shared";

export const conveyorLesson: Lesson = {
  id: "conditionals-recycling",
  title: { en: "3. Recycling — switch", sv: "3. Återvinningen — switch" },
  summary: {
    en: "Sort each item into the right bin.",
    sv: "Sortera varje sak i rätt fack.",
  },
  slides: [
    // 1. Intro — recycling scene
    {
      kind: "explanation",
      title: {
        en: "One value, several bins",
        sv: "Ett värde, flera fack",
      },
      intro: {
        en:
          "When you compare ONE thing against several possible values,\nswitch can make the code clearer than a long if-chain.",
        sv:
          "När du jämför EN sak mot flera möjliga värden\nkan switch göra koden tydligare än en lång if-kedja.",
      },
      customScene: "recycling",
      demo: [],
      steps: [
        {
          narration: {
            en:
              "You hold an item.\nIn front of you stand the recycling bins.",
            sv:
              "Du håller en sak.\nFramför dig står återvinningskärlen.",
          },
        },
        {
          narration: {
            en: "Paper goes in the paper bin.",
            sv: "Papper hamnar i pappersfacket.",
          },
        },
        {
          narration: {
            en: "Glass goes in the glass bin.",
            sv: "Glas hamnar i glasfacket.",
          },
        },
        {
          narration: {
            en:
              "If you don't know what something is —\nit goes in the rest bin.\nThat's the default.",
            sv:
              "Om du inte vet vad något är —\nläggs det i restfacket.\nDet är default.",
          },
        },
      ],
    },

    // 2. switch syntax
    {
      kind: "explanation",
      title: { en: "switch — labelled bins", sv: "switch — märkta fack" },
      demo: [
        {
          id: "code",
          label:
            "switch (item) {\n  case 'paper':\n    return 'paper-bin';\n  case 'glass':\n    return 'glass-bin';\n  default:\n    return 'rest-bin';\n}",
          baseStyle: codePanelStyle,
        },
      ],
      steps: [
        {
          narration: {
            en:
              "switch (item) — what value are we sorting?\nEach case is a bin with a label.",
            sv:
              "switch (item) — vilket värde ska vi sortera?\nVarje case är ett fack med en etikett.",
          },
        },
        {
          narration: {
            en:
              "default is the 'rest' bin.\nIt catches anything that didn't match a case.",
            sv:
              "default är restfacket.\nDet tar emot allt som inte matchade en case.",
          },
        },
      ],
    },

    // 3. break and fall-through
    {
      kind: "explanation",
      title: { en: "Don't forget break", sv: "Glöm inte break" },
      demo: [
        {
          id: "code",
          label:
            "switch (item) {\n  case 'paper':\n    return 'paper-bin';\n  case 'glass':\n    return 'glass-bin';\n  case 'plastic':\n    return 'plastic-bin';\n}",
          baseStyle: codePanelStyle,
        },
        {
          id: "note",
          label: {
            en:
              "return stops the function — perfect here.\nIf you don't return, use break;\nor the code rolls into the next case.",
            sv:
              "return stoppar funktionen — perfekt här.\nOm du inte returnerar, använd break;\nannars rinner koden vidare till nästa case.",
          },
          baseStyle: { ...noteBoxStyle, marginTop: 16 },
        },
      ],
      steps: [
        {
          narration: {
            en:
              "When JavaScript finds a matching case\nit runs the code there.",
            sv:
              "När JavaScript hittar en matchande case\nkör den koden där.",
          },
        },
        {
          narration: {
            en:
              "Then it keeps going DOWN into the next case —\nunless you tell it to stop.",
            sv:
              "Sen fortsätter den NEDÅT in i nästa case —\nom du inte säger stopp.",
          },
        },
        {
          narration: {
            en:
              "return stops the function and exits switch.\nbreak; just exits switch and lets the function continue.",
            sv:
              "return stoppar funktionen och avslutar switch.\nbreak; avslutar bara switch men låter funktionen fortsätta.",
          },
        },
        {
          narration: {
            en:
              "Forget both return and break\nand the value rolls onward.\nThat's called fall-through and is almost always a bug.",
            sv:
              "Glömmer du både return och break\nrinner värdet vidare.\nDet kallas fall-through och är nästan alltid en bugg.",
          },
        },
      ],
    },

    // 4. switch is strict
    {
      kind: "explanation",
      title: { en: "switch compares strictly", sv: "switch jämför strikt" },
      demo: [
        {
          id: "code",
          label:
            "switch (1) {\n  case '1':\n    return 'string';\n  case 1:\n    return 'number';\n}\n// returns 'number'",
          baseStyle: codePanelStyle,
        },
      ],
      steps: [
        {
          narration: {
            en:
              "switch behaves like === under the hood.\nThe number 1 is not the same as the string '1'.",
            sv:
              "switch fungerar som === bakom kulisserna.\nTalet 1 är inte samma som strängen '1'.",
          },
        },
        {
          narration: {
            en:
              "It also means switch only fits comparisons\nagainst concrete values.",
            sv:
              "Det betyder också att switch bara duger\nför jämförelser mot konkreta värden.",
          },
        },
        {
          narration: {
            en:
              "Want to compare against a range —\ntemp <= 15, for example — pick if/else if instead.",
            sv:
              "Vill du jämföra mot ett intervall —\ntemp <= 15, exempelvis — välj if/else if istället.",
          },
        },
      ],
    },

    // 5. Practice — sort recycling
    {
      kind: "js-assignment",
      title: {
        en: "Practice: sort the items",
        sv: "Övning: sortera sakerna",
      },
      prompt: {
        en:
          "Return the bin name based on the item:\n• 'paper' → 'paper-bin'\n• 'glass' → 'glass-bin'\n• 'plastic' → 'plastic-bin'\n• anything else → 'rest-bin'",
        sv:
          "Returnera facket baserat på saken:\n• 'paper' → 'paper-bin'\n• 'glass' → 'glass-bin'\n• 'plastic' → 'plastic-bin'\n• allt annat → 'rest-bin'",
      },
      functionName: "pickBin",
      starterCode: {
        en:
          "function pickBin(item) {\n" +
          "  switch (item) {\n" +
          "    case '...':\n" +
          "      return '...';\n" +
          "    default:\n" +
          "      return 'rest-bin';\n" +
          "  }\n" +
          "}\n",
        sv:
          "function pickBin(item) {\n" +
          "  switch (item) {\n" +
          "    case '...':\n" +
          "      return '...';\n" +
          "    default:\n" +
          "      return 'rest-bin';\n" +
          "  }\n" +
          "}\n",
      },
      tests: [
        { label: { en: "paper", sv: "papper" }, input: "paper", expected: "paper-bin" },
        { label: { en: "glass", sv: "glas" }, input: "glass", expected: "glass-bin" },
        { label: { en: "plastic", sv: "plast" }, input: "plastic", expected: "plastic-bin" },
        { label: { en: "banana peel", sv: "bananskal" }, input: "banana peel", expected: "rest-bin" },
        { label: { en: "Paper (case)", sv: "Paper (skiftläge)" }, input: "Paper", expected: "rest-bin" },
      ],
      allegory: {
        kind: "conveyor",
        config: {
          inputLabel: "function pickBin(item) { ... }",
          bins: [
            { key: "paper-bin", label: { en: "paper", sv: "papper" } },
            { key: "glass-bin", label: { en: "glass", sv: "glas" } },
            { key: "plastic-bin", label: { en: "plastic", sv: "plast" } },
            { key: "rest-bin", label: { en: "rest (default)", sv: "rest (default)" } },
          ],
          defaultBinKey: "rest-bin",
        },
      },
      legend: [
        {
          name: { en: "switch", sv: "switch" },
          syntax: "switch (expr) { case ... }",
          example: "switch (item) { case 'paper': ... }",
          note: {
            en: "The value is compared strictly against each case.",
            sv: "Värdet jämförs strikt mot varje case.",
          },
        },
        {
          name: { en: "case ... return", sv: "case ... return" },
          syntax: "case 'value':\n  return ...;",
          example: "case 'paper': return 'paper-bin';",
          note: {
            en: "return ends both switch and the function.",
            sv: "return avslutar både switch och funktionen.",
          },
        },
        {
          name: { en: "default", sv: "default" },
          syntax: "default:\n  return ...;",
          example: "default: return 'rest-bin';",
          note: {
            en: "Runs when no case matched.",
            sv: "Körs om ingen case matchade.",
          },
        },
      ],
    },

    // 6. Final — animal sound
    {
      kind: "js-assignment",
      title: { en: "Final: animal sound", sv: "Slutövning: djurens läten" },
      prompt: {
        en:
          "Return the sound the animal makes:\n• 'dog' → 'woof'\n• 'cat' → 'meow'\n• 'cow' → 'moo'\n• anything else → 'silence'",
        sv:
          "Returnera ljudet djuret gör:\n• 'dog' → 'woof'\n• 'cat' → 'meow'\n• 'cow' → 'moo'\n• allt annat → 'silence'",
      },
      functionName: "soundOf",
      starterCode: {
        en:
          "function soundOf(animal) {\n" +
          "  // Write your switch here:\n" +
          "  \n" +
          "}\n",
        sv:
          "function soundOf(animal) {\n" +
          "  // Skriv din switch här:\n" +
          "  \n" +
          "}\n",
      },
      tests: [
        { label: { en: "dog", sv: "hund" }, input: "dog", expected: "woof" },
        { label: { en: "cat", sv: "katt" }, input: "cat", expected: "meow" },
        { label: { en: "cow", sv: "ko" }, input: "cow", expected: "moo" },
        { label: { en: "fish", sv: "fisk" }, input: "fish", expected: "silence" },
        { label: { en: "DOG (caps)", sv: "DOG (versaler)" }, input: "DOG", expected: "silence" },
      ],
      allegory: {
        kind: "conveyor",
        config: {
          inputLabel: "function soundOf(animal) { ... }",
          bins: [
            { key: "woof", label: "woof" },
            { key: "meow", label: "meow" },
            { key: "moo", label: "moo" },
            { key: "silence", label: { en: "silence", sv: "tystnad" } },
          ],
          defaultBinKey: "silence",
        },
      },
    },
  ],
};
