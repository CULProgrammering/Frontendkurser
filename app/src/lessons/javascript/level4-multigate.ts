import type { Lesson } from "../../types";
import { codePanelStyle } from "./_shared";

export const multiGateLesson: Lesson = {
  id: "conditionals-bouncer",
  title: { en: "4. The Bouncer — &&, || and !", sv: "4. Dörrvakten — &&, || och !" },
  summary: {
    en: "Combine conditions with and, or, not.",
    sv: "Kombinera villkor med och, eller, inte.",
  },
  slides: [
    // 1. Intro — bouncer scene
    {
      kind: "explanation",
      title: { en: "Multiple checks", sv: "Flera kontroller" },
      intro: {
        en: "Sometimes one condition isn't enough.",
        sv: "Ibland räcker inte ett villkor.",
      },
      customScene: "bouncer",
      demo: [],
      steps: [
        {
          narration: {
            en:
              "You walk up to a club.\nThe bouncer is at the door.",
            sv:
              "Du går mot en klubb.\nDörrvakten står vid dörren.",
          },
        },
        {
          narration: {
            en: "Check one: are you old enough?",
            sv: "Kontroll ett: är du gammal nog?",
          },
        },
        {
          narration: {
            en: "Check two: do you have a ticket?",
            sv: "Kontroll två: har du biljett?",
          },
        },
        {
          narration: {
            en: "Check three: are you on the ban list?",
            sv: "Kontroll tre: står du på avstängningslistan?",
          },
        },
        {
          narration: {
            en:
              "All three matter at the same time.\nFor that we need ways to combine conditions.",
            sv:
              "Alla tre spelar roll samtidigt.\nFör det behöver vi sätt att kombinera villkor.",
          },
        },
      ],
    },

    // 2. AND
    {
      kind: "explanation",
      title: { en: "&& — and", sv: "&& — och" },
      intro: {
        en: "&& means 'and'. Both sides must be true.",
        sv: "&& betyder 'och'. Båda sidor måste vara sanna.",
      },
      demo: [
        {
          id: "code",
          label:
            "if (age >= 18 && hasTicket) {\n  letIn();\n}",
          baseStyle: codePanelStyle,
        },
      ],
      steps: [
        {
          narration: {
            en:
              "Picture two gates in a row.\nYou must pass both to get through.",
            sv:
              "Föreställ dig två grindar i rad.\nDu måste passera båda för att komma fram.",
          },
        },
        {
          narration: {
            en:
              "&& checks the LEFT side first.\nIf it's false — the right side isn't even read.",
            sv:
              "&& kollar VÄNSTER sida först.\nÄr den falsk — höger sida läses inte ens.",
          },
        },
        {
          narration: {
            en:
              "true && true   →  true\ntrue && false  →  false\nfalse && ...   →  false (right is skipped)",
            sv:
              "true && true   →  true\ntrue && false  →  false\nfalse && ...   →  false (höger struntas i)",
          },
        },
      ],
    },

    // 3. OR
    {
      kind: "explanation",
      title: { en: "|| — or", sv: "|| — eller" },
      intro: {
        en: "|| means 'or'. One side is enough.",
        sv: "|| betyder 'eller'. En sida räcker.",
      },
      demo: [
        {
          id: "code",
          label:
            "if (isVip || hasTicket) {\n  letIn();\n}",
          baseStyle: codePanelStyle,
        },
      ],
      steps: [
        {
          narration: {
            en:
              "Picture two doors into the same room.\nIf you walk through any one, you're inside.",
            sv:
              "Föreställ dig två dörrar till samma rum.\nGår du in genom någon av dem är du inne.",
          },
        },
        {
          narration: {
            en:
              "|| also checks the left side first.\nIf it's true — the right side isn't read.",
            sv:
              "|| kollar också vänster först.\nÄr den sann — höger läses inte.",
          },
        },
        {
          narration: {
            en:
              "true || ...    →  true (right is skipped)\nfalse || true  →  true\nfalse || false →  false",
            sv:
              "true || ...    →  true (höger struntas i)\nfalse || true  →  true\nfalse || false →  false",
          },
        },
      ],
    },

    // 4. NOT
    {
      kind: "explanation",
      title: { en: "! — not", sv: "! — inte" },
      demo: [
        {
          id: "code",
          label:
            "let banned = true;\n\nif (!banned) {\n  letIn();\n}\n// flips true to false",
          baseStyle: codePanelStyle,
        },
      ],
      steps: [
        {
          narration: {
            en:
              "! goes before a value and flips it.\nTrue becomes false. False becomes true.",
            sv:
              "! står före ett värde och vänder det.\nSant blir falskt. Falskt blir sant.",
          },
        },
        {
          narration: {
            en:
              "Useful when the variable already names\nthe opposite of what you want to check.",
            sv:
              "Användbart när variabeln redan beskriver det motsatta\nav det du vill kolla.",
          },
        },
        {
          narration: {
            en: "!true   →  false\n!false  →  true",
            sv: "!true   →  false\n!false  →  true",
          },
        },
      ],
    },

    // 5. Practice — AND
    {
      kind: "js-assignment",
      title: { en: "Practice: age AND ticket", sv: "Övning: ålder OCH biljett" },
      prompt: {
        en:
          "Return true if the person is 18 or older AND has a ticket.\nOtherwise false.",
        sv:
          "Returnera true om personen är 18 eller äldre OCH har en biljett.\nAnnars false.",
      },
      functionName: "letEnter",
      starterCode: {
        en:
          "function letEnter(person) {\n" +
          "  return /* your condition with && */;\n" +
          "}\n",
        sv:
          "function letEnter(person) {\n" +
          "  return /* ditt villkor med && */;\n" +
          "}\n",
      },
      tests: [
        { label: { en: "16, ticket", sv: "16, biljett" }, input: { age: 16, hasTicket: true }, expected: false },
        { label: { en: "20, no ticket", sv: "20, ingen biljett" }, input: { age: 20, hasTicket: false }, expected: false },
        { label: { en: "20, ticket", sv: "20, biljett" }, input: { age: 20, hasTicket: true }, expected: true },
        { label: { en: "18, ticket", sv: "18, biljett" }, input: { age: 18, hasTicket: true }, expected: true },
      ],
      allegory: {
        kind: "multi-gate",
        config: {
          mode: "and",
          operandLabels: ["age", "hasTicket"],
          passLabel: { en: "Let in", sv: "Släpps in" },
          failLabel: { en: "Stopped", sv: "Stoppas" },
        },
      },
      legend: [
        {
          name: { en: "&&", sv: "&&" },
          syntax: "a && b",
          example: "age >= 18 && hasTicket",
          note: {
            en: "True only when both sides are true.",
            sv: "Sant bara när båda sidor är sanna.",
          },
        },
      ],
    },

    // 6. Practice — OR
    {
      kind: "js-assignment",
      title: { en: "Practice: VIP or ticket", sv: "Övning: VIP eller biljett" },
      prompt: {
        en: "Return true if the person IS a VIP OR has a ticket. Otherwise false.",
        sv: "Returnera true om personen ÄR VIP ELLER har biljett. Annars false.",
      },
      functionName: "letEnter",
      starterCode: {
        en:
          "function letEnter(person) {\n" +
          "  return /* your condition with || */;\n" +
          "}\n",
        sv:
          "function letEnter(person) {\n" +
          "  return /* ditt villkor med || */;\n" +
          "}\n",
      },
      tests: [
        { label: { en: "VIP, no ticket", sv: "VIP, ingen biljett" }, input: { vip: true, hasTicket: false }, expected: true },
        { label: { en: "not VIP, ticket", sv: "ej VIP, biljett" }, input: { vip: false, hasTicket: true }, expected: true },
        { label: { en: "neither", sv: "ingetdera" }, input: { vip: false, hasTicket: false }, expected: false },
        { label: { en: "both", sv: "båda" }, input: { vip: true, hasTicket: true }, expected: true },
      ],
      allegory: {
        kind: "multi-gate",
        config: {
          mode: "or",
          operandLabels: ["vip", "hasTicket"],
          passLabel: { en: "Let in", sv: "Släpps in" },
          failLabel: { en: "Stopped", sv: "Stoppas" },
        },
      },
      legend: [
        {
          name: { en: "||", sv: "||" },
          syntax: "a || b",
          example: "vip || hasTicket",
          note: {
            en: "True as soon as one side is true.",
            sv: "Sant så snart en sida är sann.",
          },
        },
      ],
    },

    // 7. Final — combine all three
    {
      kind: "js-assignment",
      title: { en: "Final: the bouncer", sv: "Slutövning: dörrvakten" },
      prompt: {
        en:
          "The person is let in if:\n• age is at least 18\n• AND they have a ticket OR are VIP\n• AND they are NOT banned.",
        sv:
          "Personen släpps in om:\n• åldern är minst 18\n• OCH de har biljett ELLER är VIP\n• OCH de är INTE bannade.",
      },
      functionName: "letEnter",
      starterCode: {
        en:
          "function letEnter(person) {\n" +
          "  // Combine &&, || and !:\n" +
          "  return false;\n" +
          "}\n",
        sv:
          "function letEnter(person) {\n" +
          "  // Kombinera &&, || och !:\n" +
          "  return false;\n" +
          "}\n",
      },
      tests: [
        { label: { en: "20 + ticket", sv: "20 + biljett" }, input: { age: 20, hasTicket: true, vip: false, banned: false }, expected: true },
        { label: { en: "20 + VIP", sv: "20 + VIP" }, input: { age: 20, hasTicket: false, vip: true, banned: false }, expected: true },
        { label: { en: "16 + ticket", sv: "16 + biljett" }, input: { age: 16, hasTicket: true, vip: false, banned: false }, expected: false },
        { label: { en: "20, nothing", sv: "20, inget" }, input: { age: 20, hasTicket: false, vip: false, banned: false }, expected: false },
        { label: { en: "20 + banned", sv: "20 + bannad" }, input: { age: 20, hasTicket: true, vip: true, banned: true }, expected: false },
      ],
      allegory: {
        kind: "multi-gate",
        config: {
          mode: "and",
          operandLabels: ["age", "banned"],
          passLabel: { en: "Let in", sv: "Släpps in" },
          failLabel: { en: "Stopped", sv: "Stoppas" },
        },
      },
    },
  ],
};
