import type { Lesson } from "../../types";
import { codePanelStyle, noteBoxStyle } from "./_shared";

export const doorLesson: Lesson = {
  id: "conditionals-crosswalk",
  title: { en: "1. Crosswalk — if and else", sv: "1. Övergångsstället — if och else" },
  summary: {
    en: "A condition that says walk or wait.",
    sv: "Ett villkor som säger gå eller vänta.",
  },
  slides: [
    // 1. Intro — stick-figure crosswalk scene
    {
      kind: "explanation",
      title: { en: "A choice in code", sv: "Ett val i koden" },
      intro: {
        en: "Sometimes the code has to choose what happens next.",
        sv: "Ibland måste koden välja vad som händer.",
      },
      customScene: "crosswalk",
      demo: [],
      steps: [
        {
          narration: {
            en: "You stand at the edge of a crosswalk.\nThe light tells you when to go.",
            sv: "Du står vid kanten av ett övergångsställe.\nLjuset säger när du får gå.",
          },
        },
        {
          narration: {
            en: "When the light is red, you wait.",
            sv: "När ljuset är rött väntar du.",
          },
        },
        {
          narration: {
            en: "When it turns green, you walk across.",
            sv: "När det blir grönt går du över.",
          },
        },
        {
          narration: {
            en:
              "Same person, same crosswalk —\ndifferent action depending on the light.\nThat is a conditional.",
            sv:
              "Samma person, samma övergångsställe —\nolika handling beroende på ljuset.\nDet är ett villkor.",
          },
        },
      ],
    },

    // 2. Anatomy of an if — piece by piece
    {
      kind: "explanation",
      title: { en: "An if, piece by piece", sv: "Ett if, del för del" },
      intro: {
        en:
          "Here is what an if looks like in code.\nWe'll explain every part.",
        sv:
          "Så här ser ett if ut i kod.\nVi förklarar varje del.",
      },
      demo: [
        {
          id: "code",
          label: 'if (light === "green") {\n  return "walk";\n}',
          baseStyle: codePanelStyle,
        },
      ],
      steps: [
        {
          narration: {
            en:
              "Look at the code on the left. Five parts:\nif   ( ... )   { ... }   return.",
            sv:
              "Titta på koden till vänster. Fem delar:\nif   ( ... )   { ... }   return.",
          },
        },
        {
          narration: {
            en:
              "1.  if  is a special word. It means 'if'.\nIt asks: should the next code run?",
            sv:
              "1.  if  är ett speciellt ord. Det betyder 'om'.\nDet frågar: ska nästa kod köras?",
          },
        },
        {
          narration: {
            en:
              "2.  ( )  parentheses come right after if.\nThe question itself goes inside them.",
            sv:
              "2.  ( )  parenteser kommer direkt efter if.\nFrågan står inuti.",
          },
        },
        {
          narration: {
            en:
              "3.  Inside the parentheses\nis something that is true or false.\nWe'll look at this on the next slide.",
            sv:
              "3.  Inuti parenteserna\nstår något som är sant eller falskt.\nVi tittar närmare på det i nästa steg.",
          },
        },
        {
          narration: {
            en:
              "4.  { }  curly braces.\nThe code that runs when the answer is YES (true)\ngoes inside them.",
            sv:
              "4.  { }  klammerparenteser.\nKoden som körs om svaret är JA (true)\nstår inuti.",
          },
        },
        {
          narration: {
            en:
              "5.  return  is another special word.\nIt sends a value back as the answer.\nWe'll see it more soon.",
            sv:
              "5.  return  är ett annat speciellt ord.\nDet skickar tillbaka ett värde som svar.\nVi ser det mer strax.",
          },
        },
      ],
    },

    // 3. Booleans — what goes inside ( )
    {
      kind: "explanation",
      title: {
        en: "true or false — booleans",
        sv: "true eller false — booleans",
      },
      intro: {
        en:
          "What goes inside the parentheses always boils down to ONE of two values:\ntrue or false.",
        sv:
          "Det som står inuti parenteserna landar alltid i ETT av två värden:\ntrue eller false.",
      },
      customScene: "comparisons-table",
      demo: [],
      steps: [
        {
          narration: {
            en:
              "A boolean is just a value: true or false.\nYes or no. On or off.",
            sv:
              "En boolean är bara ett värde: true eller false.\nJa eller nej. På eller av.",
          },
        },
        {
          narration: {
            en:
              "Compare two things and you get a boolean.\nThe table shows the six common operators —\nthe operator, how to read it, an example, the question it asks, and the answer.",
            sv:
              "Jämför två saker och du får en boolean.\nTabellen visar de sex vanliga operatorerna —\noperatorn, hur den läses, ett exempel, frågan den ställer, och svaret.",
          },
        },
        {
          narration: {
            en:
              "A variable can also already BE true or false:\n\nlet doorOpen = true;\nif (doorOpen) { ... }\n\nNo comparison needed — the variable IS the answer.",
            sv:
              "En variabel kan också redan VARA true eller false:\n\nlet doorOpen = true;\nif (doorOpen) { ... }\n\nIngen jämförelse behövs — variabeln ÄR svaret.",
          },
        },
        {
          narration: {
            en:
              "Any of these can go inside the if's parentheses.\nThe if cares about one thing only: true or false.",
            sv:
              "Vilken som helst av dessa kan stå inuti if-parenteserna.\nif bryr sig om en enda sak: true eller false.",
          },
        },
      ],
    },

    // 4. return — sending an answer
    {
      kind: "explanation",
      title: { en: "return — sending an answer back", sv: "return — skicka tillbaka ett svar" },
      demo: [
        {
          id: "code",
          label:
            "if (light === \"green\") {\n  return \"walk\";\n}",
          baseStyle: codePanelStyle,
        },
      ],
      steps: [
        {
          narration: {
            en:
              "return is a special word.\nIt sends a value back from your code.",
            sv:
              "return är ett speciellt ord.\nDet skickar tillbaka ett värde från din kod.",
          },
        },
        {
          narration: {
            en:
              "In our example:\n• if the light is green, we return \"walk\".\n• otherwise the if is skipped — and the function ends without returning.",
            sv:
              "I exemplet:\n• om ljuset är grönt returnerar vi \"walk\".\n• annars hoppas if över — och funktionen tar slut utan att returnera något.",
          },
        },
        {
          narration: {
            en:
              "return also stops the code right there.\nNothing after a return runs.",
            sv:
              "return stoppar också koden direkt.\nInget efter ett return körs.",
          },
        },
        {
          narration: {
            en:
              "You can return any value:\n• a string, like \"walk\"\n• a number, like 42\n• true or false",
            sv:
              "Du kan returnera vilket värde som helst:\n• en sträng, som \"walk\"\n• ett tal, som 42\n• true eller false",
          },
        },
      ],
    },

    // 5. Trace walkthrough (if-only) — read the code line by line, twice
    {
      kind: "explanation",
      title: {
        en: "Watching the code run",
        sv: "Vi ser koden köras",
      },
      intro: {
        en:
          "Now let's read the code line by line.\nFirst with light = 'red'. Then we change it to 'green' and read it again.",
        sv:
          "Nu läser vi koden rad för rad.\nFörst med light = 'red'. Sen ändrar vi den till 'green' och läser igen.",
      },
      customScene: "crosswalk-if-trace",
      demo: [],
      steps: [
        {
          narration: {
            en:
              "On the left is the code. We'll go through it together.\nClick to step forward.",
            sv:
              "Till vänster ser du koden. Vi går igenom den ihop.\nKlicka för att stega framåt.",
          },
        },
        {
          narration: {
            en:
              "First we make a variable called light.\nIt holds the value \"red\".",
            sv:
              "Först skapar vi en variabel som heter light.\nDen har värdet \"red\".",
          },
        },
        {
          narration: {
            en:
              "Now we reach the if.\nIt asks: is light equal to \"green\"?",
            sv:
              "Nu kommer vi till if.\nDen frågar: är light lika med \"green\"?",
          },
        },
        {
          narration: {
            en:
              "Replace light with its value:\n\"red\" === \"green\".\n\"red\" is NOT \"green\". The condition is false.",
            sv:
              "Byt ut light mot dess värde:\n\"red\" === \"green\".\n\"red\" är INTE \"green\". Villkoret är false.",
          },
        },
        {
          narration: {
            en:
              "Because the condition was false,\nwe skip everything inside { }.\nThere's nothing else — the function just ends.\n\nThe figure does nothing.",
            sv:
              "Eftersom villkoret var false\nhoppar vi över allt inuti { }.\nDet finns inget mer — funktionen tar bara slut.\n\nFiguren gör ingenting.",
          },
        },
        {
          narration: {
            en:
              "Now we change light to \"green\"\nand run the same code again.",
            sv:
              "Nu ändrar vi light till \"green\"\noch kör samma kod igen.",
          },
        },
        {
          narration: {
            en:
              "We reach the if again.\nSame question: is light equal to \"green\"?",
            sv:
              "Vi kommer till if igen.\nSamma fråga: är light lika med \"green\"?",
          },
        },
        {
          narration: {
            en:
              "Replace light with its value:\n\"green\" === \"green\".\nYes — they match. The condition is true.",
            sv:
              "Byt ut light mot dess värde:\n\"green\" === \"green\".\nJa — de matchar. Villkoret är true.",
          },
        },
        {
          narration: {
            en:
              "Because the condition was true,\nwe run the code inside { }: return \"walk\".\n\nThe figure walks.",
            sv:
              "Eftersom villkoret var true\nkör vi koden inuti { }: return \"walk\".\n\nFiguren går.",
          },
        },
        {
          narration: {
            en:
              "Notice: same code, but the if only runs sometimes.\nWhen it doesn't run, nothing happens at all.\nWhat if we want SOMETHING to happen on red too?",
            sv:
              "Lägg märke till: samma kod, men if körs bara ibland.\nNär den inte körs händer ingenting alls.\nTänk om vi vill att NÅGOT ska hända på rött också?",
          },
        },
      ],
    },

    // 5b. Practice — if-only (no else) — chip-style, no distractors
    {
      kind: "js-chip-assignment",
      title: { en: "Practice: walk if green", sv: "Övning: gå om grönt" },
      prompt: {
        en:
          "Build the if-statement piece by piece.\nWalk through the four sub-puzzles.",
        sv:
          "Bygg if-satsen bit för bit.\nGå igenom de fyra delpusslen.",
      },
      puzzles: [
        // p1: code A — condition pieces
        {
          prompt: {
            en: "Place the three pieces of the comparison.",
            sv: "Placera de tre delarna av jämförelsen.",
          },
          template: 'if ([[]] [[]] [[]]) {\n  return "walk";\n}',
          chips: ["light", "===", '"green"'],
          solution: ["light", "===", '"green"'],
        },
        // p2: code A — full assembly
        {
          prompt: {
            en: "Put the whole thing together.",
            sv: "Sätt ihop hela.",
          },
          template: "[[]] ([[]]) {\n  [[]] [[]];\n}",
          chips: ["if", 'light === "green"', "return", '"walk"'],
          solution: ["if", 'light === "green"', "return", '"walk"'],
        },
        // p3: code B (door) — condition pieces
        {
          prompt: {
            en: "Place the three pieces of the comparison.",
            sv: "Placera de tre delarna av jämförelsen.",
          },
          template: 'if ([[]] [[]] [[]]) {\n  return "enter";\n}',
          chips: ["door", "===", '"open"'],
          solution: ["door", "===", '"open"'],
        },
        // p4: code B — full assembly
        {
          prompt: {
            en: "Put the whole thing together.",
            sv: "Sätt ihop hela.",
          },
          template: "[[]] ([[]]) {\n  [[]] [[]];\n}",
          chips: ["if", 'door === "open"', "return", '"enter"'],
          solution: ["if", 'door === "open"', "return", '"enter"'],
        },
      ],
      legend: [
        {
          name: { en: "if (no else)", sv: "if (utan else)" },
          syntax: "if (condition) { ... }",
          example: 'if (light === "green") { return "walk"; }',
          note: {
            en: "When the condition is false, nothing else runs and the function ends.",
            sv: "När villkoret är false körs inget annat, och funktionen tar slut.",
          },
        },
        {
          name: { en: "===", sv: "===" },
          syntax: "a === b",
          example: 'light === "green"',
          note: {
            en: "True only when both sides are exactly equal.",
            sv: "Sant bara när båda sidor är exakt lika.",
          },
        },
      ],
    },

    // 6. else
    {
      kind: "explanation",
      title: { en: "else — otherwise", sv: "else — annars" },
      demo: [
        {
          id: "code",
          label:
            'if (light === "green") {\n  return "walk";\n} else {\n  return "wait";\n}',
          baseStyle: codePanelStyle,
        },
      ],
      steps: [
        {
          narration: {
            en:
              "else is another special word. It means 'otherwise'.\nIt comes right after the closing } of the if.",
            sv:
              "else är ett annat speciellt ord. Det betyder 'annars'.\nDet kommer direkt efter den stängande } i if.",
          },
        },
        {
          narration: {
            en:
              "Then come its OWN curly braces { }\nwith code that runs when the if's answer was false.",
            sv:
              "Sen kommer dess EGNA klammerparenteser { }\nmed kod som körs när if-svaret var false.",
          },
        },
        {
          narration: {
            en:
              "Only one branch ever runs —\neither the if or the else, never both.",
            sv:
              "Bara en gren körs någonsin —\nantingen if eller else, aldrig båda.",
          },
        },
        {
          narration: {
            en:
              "Now BOTH cases lead to a return.\nLet's read this version line by line too.",
            sv:
              "Nu leder BÅDA fallen till ett return.\nVi läser den här versionen rad för rad också.",
          },
        },
      ],
    },

    // 6b. Trace walkthrough (if/else) — same shape as the if-only trace, with else added
    {
      kind: "explanation",
      title: {
        en: "Watching if / else run",
        sv: "Vi ser if / else köras",
      },
      intro: {
        en:
          "Same idea as before — read line by line.\nThis time we have an else, so red has somewhere to go.",
        sv:
          "Samma tanke som förut — läs rad för rad.\nDen här gången finns ett else, så röd har någonstans att ta vägen.",
      },
      customScene: "crosswalk-if-else-trace",
      demo: [],
      steps: [
        {
          narration: {
            en:
              "Same start: light is \"red\".",
            sv:
              "Samma start: light är \"red\".",
          },
        },
        {
          narration: {
            en:
              "We make light and give it the value \"red\".",
            sv:
              "Vi skapar light och ger den värdet \"red\".",
          },
        },
        {
          narration: {
            en:
              "We reach the if.\nIs light equal to \"green\"?",
            sv:
              "Vi kommer till if.\nÄr light lika med \"green\"?",
          },
        },
        {
          narration: {
            en:
              "\"red\" === \"green\" is false.\nThe if's body is skipped.",
            sv:
              "\"red\" === \"green\" är false.\nIf-kroppen hoppas över.",
          },
        },
        {
          narration: {
            en:
              "But this time there's an else.\nWe go INTO the else block.",
            sv:
              "Men nu finns ett else.\nVi går IN i else-blocket.",
          },
        },
        {
          narration: {
            en:
              "We run the else's code: return \"wait\".\n\nThe figure waits.",
            sv:
              "Vi kör else-koden: return \"wait\".\n\nFiguren väntar.",
          },
        },
        {
          narration: {
            en:
              "Now change light to \"green\" and run again.",
            sv:
              "Nu byter vi light till \"green\" och kör igen.",
          },
        },
        {
          narration: {
            en:
              "We reach the if.\nIs light equal to \"green\"?",
            sv:
              "Vi kommer till if.\nÄr light lika med \"green\"?",
          },
        },
        {
          narration: {
            en:
              "\"green\" === \"green\" is true.\nThe else is skipped.",
            sv:
              "\"green\" === \"green\" är true.\nElse hoppas över.",
          },
        },
        {
          narration: {
            en:
              "We run the if's code: return \"walk\".\n\nThe figure walks.",
            sv:
              "Vi kör if-koden: return \"walk\".\n\nFiguren går.",
          },
        },
      ],
    },

    // 7. Practice — if/else — chip-style with light distractors
    {
      kind: "js-chip-assignment",
      title: { en: "Practice: walk or wait", sv: "Övning: gå eller vänta" },
      prompt: {
        en:
          "Now both branches matter — walk on green, wait on anything else.",
        sv:
          "Nu spelar båda grenarna roll — gå på grönt, vänta på allt annat.",
      },
      puzzles: [
        // p1: code A — just the else keyword
        {
          prompt: {
            en: "Pick the keyword between the } and the {.",
            sv: "Välj ordet mellan } och {.",
          },
          template:
            'if (light === "green") {\n  return "walk";\n} [[]] {\n  return "wait";\n}',
          chips: ["else", "elif", "otherwise", "or"],
          solution: ["else"],
        },
        // p2: code A — full assembly
        {
          prompt: {
            en: "Put it all together.",
            sv: "Sätt ihop hela.",
          },
          template:
            "if ([[]]) {\n  return [[]];\n} [[]] {\n  return [[]];\n}",
          chips: [
            'light === "green"',
            '"walk"',
            "else",
            '"wait"',
            'light = "green"',
            '"red"',
          ],
          solution: ['light === "green"', '"walk"', "else", '"wait"'],
          wrongHint: {
            en:
              "Watch out for the = trap: one equals sign assigns, three compare. With = the code would change light to green and walk every time.",
            sv:
              "Se upp för =-fällan: ett likhetstecken tilldelar, tre jämför. Med = ändrar koden light till green och går varje gång.",
          },
        },
        // p3: code B (mood) — just the else keyword
        {
          intro: {
            en:
              "Same shape, different story — smile when happy, frown otherwise.",
            sv:
              "Samma form, annan berättelse — le när glad, surmula annars.",
          },
          prompt: {
            en: "Pick the keyword between the } and the {.",
            sv: "Välj ordet mellan } och {.",
          },
          template:
            'if (mood === "happy") {\n  return "smile";\n} [[]] {\n  return "frown";\n}',
          chips: ["else", "elif", "otherwise", "or"],
          solution: ["else"],
        },
        // p4: code B — full assembly
        {
          intro: {
            en:
              "Same shape, different story — smile when happy, frown otherwise.",
            sv:
              "Samma form, annan berättelse — le när glad, surmula annars.",
          },
          prompt: {
            en: "Put it all together.",
            sv: "Sätt ihop hela.",
          },
          template:
            "if ([[]]) {\n  return [[]];\n} [[]] {\n  return [[]];\n}",
          chips: [
            'mood === "happy"',
            '"smile"',
            "else",
            '"frown"',
            'mood = "happy"',
            '"sad"',
          ],
          solution: ['mood === "happy"', '"smile"', "else", '"frown"'],
        },
      ],
      legend: [
        {
          name: { en: "if / else", sv: "if / else" },
          syntax: "if (...) { ... } else { ... }",
          example: 'if (x === "y") return "yes"; else return "no";',
          note: {
            en: "One of the two branches always runs.",
            sv: "En av grenarna körs alltid.",
          },
        },
        {
          name: { en: "===", sv: "===" },
          syntax: "a === b",
          example: 'light === "green"',
          note: {
            en: "True only when the values are exactly equal.",
            sv: "Sant bara om värdena är exakt lika.",
          },
        },
      ],
    },

    // 8. = vs == vs ===
    {
      kind: "explanation",
      title: { en: "=, == and ===", sv: "=, == och ===" },
      intro: {
        en: "Three signs that look alike but mean very different things.",
        sv: "Tre tecken som ser lika ut men betyder helt olika saker.",
      },
      demo: [
        {
          id: "code",
          label:
            "x = 5      // sets x to 5\nx == 5     // compares (avoid)\nx === 5    // compares strictly (use)",
          baseStyle: codePanelStyle,
        },
        {
          id: "warning",
          label: {
            en:
              "Common trap:\nif (x = 5) — sets x to 5\nand is always true.\nAlmost never what you want.",
            sv:
              "Vanlig fälla:\nif (x = 5) — sätter x till 5\noch är alltid sant.\nNästan aldrig vad du vill.",
          },
          baseStyle: { ...noteBoxStyle, marginTop: 16 },
        },
      ],
      steps: [
        {
          narration: {
            en:
              "One equals sign — = — sets a value.\nIt is not a question, it is a statement.",
            sv:
              "Ett likhetstecken — = — sätter ett värde.\nDet är inte en fråga, det är ett besked.",
          },
        },
        {
          narration: {
            en:
              "Three equals signs — === — ask if two values are equal.\nThis is what you want in a condition.",
            sv:
              "Tre likhetstecken — === — frågar om två värden är lika.\nDet är vad du vill ha i ett villkor.",
          },
        },
        {
          narration: {
            en:
              "Two equals signs — == — also ask, but loosely.\nIt says 5 and \"5\" are equal, which is rarely true.\nUse ===.",
            sv:
              "Två likhetstecken — == — frågar också, men slarvigt.\nDet säger att 5 och \"5\" är lika, vilket sällan stämmer.\nAnvänd ===.",
          },
        },
      ],
    },

    // 8b. Strict-equality trace — first =, then ===
    {
      kind: "explanation",
      title: {
        en: "= versus ===",
        sv: "= mot ===",
      },
      intro: {
        en:
          "Let's see what happens with a single = first.\nThen we'll switch to === and watch the difference.",
        sv:
          "Vi ser först vad som händer med ett enda =.\nSen byter vi till === och tittar på skillnaden.",
      },
      customScene: "crosswalk-strict-trace",
      demo: [],
      steps: [
        // Phase A — `=` (assignment)
        {
          narration: {
            en:
              "First, the wrong version: a SINGLE = inside the if.\nlight starts as \"GREEN\".",
            sv:
              "Först den felaktiga versionen: ett ENDA = inuti if.\nlight börjar som \"GREEN\".",
          },
        },
        {
          narration: {
            en:
              "We reach the if.\nThe = is between two values — what does it do here?",
            sv:
              "Vi kommer till if.\n= står mellan två värden — vad gör det här?",
          },
        },
        {
          narration: {
            en:
              "= ASSIGNS. light is now \"green\" (the assignment changed it).\nThe expression itself evaluates to \"green\" — which is truthy.",
            sv:
              "= TILLDELAR. light är nu \"green\" (tilldelningen ändrade den).\nUttrycket självt blir \"green\" — vilket är truthy.",
          },
        },
        {
          narration: {
            en:
              "Because the expression was truthy, the if's body runs.\nWe return \"walk\".\n\nBut this would have happened for ANY starting value of light.\nThat's the bug — we wanted to compare, not assign.",
            sv:
              "Eftersom uttrycket var truthy körs if-kroppen.\nVi returnerar \"walk\".\n\nMen detta hade hänt med VILKET värde light än hade.\nDet är buggen — vi ville jämföra, inte tilldela.",
          },
        },
        // Phase B — `===` mismatch
        {
          narration: {
            en:
              "Switch to === — three equals signs.\nReset light to \"GREEN\".\nNow the if asks a question instead of assigning.",
            sv:
              "Byt till === — tre likhetstecken.\nÅterställ light till \"GREEN\".\nNu ställer if en fråga istället för att tilldela.",
          },
        },
        {
          narration: {
            en:
              "\"GREEN\" === \"green\" → false.\n=== is strict — capital and lowercase letters are NOT the same.",
            sv:
              "\"GREEN\" === \"green\" → false.\n=== är strikt — versaler och gemener är INTE samma.",
          },
        },
        {
          narration: {
            en:
              "Body skipped. Function ends. Nothing happens.\nMuch better than before — now the value matters.",
            sv:
              "Kroppen hoppas över. Funktionen tar slut. Inget händer.\nMycket bättre än förut — nu spelar värdet roll.",
          },
        },
        // Phase C — `===` match
        {
          narration: {
            en:
              "Now change light to \"green\" — all lowercase.",
            sv:
              "Ändra light till \"green\" — bara gemener.",
          },
        },
        {
          narration: {
            en:
              "\"green\" === \"green\" → true.\nNow they match exactly.",
            sv:
              "\"green\" === \"green\" → true.\nNu matchar de exakt.",
          },
        },
        {
          narration: {
            en:
              "The if's body runs: return \"walk\".\n\nLesson: use === to ASK, not = to ASSIGN.\nAnd === wants an EXACT match — even a single capital letter is enough to fail.",
            sv:
              "If-kroppen körs: return \"walk\".\n\nLärdom: använd === för att FRÅGA, inte = för att TILLDELA.\nOch === vill ha EXAKT matchning — en enda versal räcker för att det ska bli false.",
          },
        },
      ],
    },

    // 9. Practice — strict equality — chip-style focused on operator choice
    {
      kind: "js-chip-assignment",
      title: { en: "Practice: pick the right operator", sv: "Övning: välj rätt operator" },
      prompt: {
        en:
          "Pick the operator that compares STRICTLY — so \"GREEN\" doesn't sneak through.",
        sv:
          "Välj operatorn som jämför STRIKT — så att \"GREEN\" inte smiter förbi.",
      },
      puzzles: [
        // p1: code A — just the operator
        {
          prompt: {
            en: "Which operator asks 'are these exactly equal'?",
            sv: "Vilken operator frågar 'är dessa exakt lika'?",
          },
          template:
            'if (light [[]] "green") {\n  return "walk";\n} else {\n  return "wait";\n}',
          chips: ["===", "==", "="],
          solution: ["==="],
        },
        // p2: code A — full assembly
        {
          prompt: {
            en: "Put it all together — strict comparison only.",
            sv: "Sätt ihop hela — bara strikt jämförelse.",
          },
          template:
            "if ([[]] [[]] [[]]) {\n  return [[]];\n} [[]] {\n  return [[]];\n}",
          chips: [
            "light",
            "===",
            '"green"',
            '"walk"',
            "else",
            '"wait"',
            "==",
            "=",
          ],
          solution: ["light", "===", '"green"', '"walk"', "else", '"wait"'],
        },
        // p3: code B (door) — just the operator
        {
          intro: {
            en:
              "Same idea with a door — pick the operator that compares STRICTLY so only \"open\" passes.",
            sv:
              "Samma idé med en dörr — välj operatorn som jämför STRIKT så att bara \"open\" släpps igenom.",
          },
          prompt: {
            en: "Which operator asks 'are these exactly equal'?",
            sv: "Vilken operator frågar 'är dessa exakt lika'?",
          },
          template:
            'if (door [[]] "open") {\n  return "enter";\n} else {\n  return "knock";\n}',
          chips: ["===", "==", "="],
          solution: ["==="],
        },
        // p4: code B — full assembly
        {
          intro: {
            en:
              "Same idea with a door — pick the operator that compares STRICTLY so only \"open\" passes.",
            sv:
              "Samma idé med en dörr — välj operatorn som jämför STRIKT så att bara \"open\" släpps igenom.",
          },
          prompt: {
            en: "Put it all together — strict comparison only.",
            sv: "Sätt ihop hela — bara strikt jämförelse.",
          },
          template:
            "if ([[]] [[]] [[]]) {\n  return [[]];\n} [[]] {\n  return [[]];\n}",
          chips: [
            "door",
            "===",
            '"open"',
            '"enter"',
            "else",
            '"knock"',
            "==",
            "=",
            '"closed"',
          ],
          solution: ["door", "===", '"open"', '"enter"', "else", '"knock"'],
        },
      ],
      legend: [
        {
          name: { en: "===", sv: "===" },
          syntax: "a === b",
          example: 'light === "green"',
          note: {
            en: "True only when both values are EXACTLY equal — case matters.",
            sv: "Sant bara när båda värdena är EXAKT lika — versaler räknas.",
          },
        },
      ],
    },

    // 10. Final — typed input
    {
      kind: "js-typed-assignment",
      title: { en: "Final: walk or wait", sv: "Slutövning: gå eller vänta" },
      prompt: {
        en:
          "The signal is now an UPPERCASE string.\nReturn 'walk' when signal is exactly 'WALK'.\nReturn 'wait' otherwise.\n\nFill in the boxes — type the missing pieces yourself.",
        sv:
          "Signalen är nu en sträng med VERSALER.\nReturnera 'walk' när signal är exakt 'WALK'.\nReturnera 'wait' annars.\n\nFyll i rutorna — skriv de saknade bitarna själv.",
      },
      varNames: ["signal"],
      template:
        'if ([[input:cond]]) {\n  return [[input:then]];\n}\nreturn [[input:else]];\n',
      tests: [
        { label: { en: "WALK", sv: "WALK" }, vars: { signal: "WALK" }, expected: "walk" },
        { label: { en: "STOP", sv: "STOP" }, vars: { signal: "STOP" }, expected: "wait" },
        { label: { en: "FLASHING", sv: "BLINKAR" }, vars: { signal: "FLASHING" }, expected: "wait" },
        { label: { en: "Walk (mixed case)", sv: "Walk (blandat)" }, vars: { signal: "Walk" }, expected: "wait" },
      ],
      goalHint: {
        en: "Return walk only when signal is exactly the uppercase string \"WALK\".",
        sv: "Returnera walk bara när signal är exakt strängen \"WALK\".",
      },
      allegory: {
        kind: "crosswalk",
        config: {
          conditionLabel: { en: "signal === \"WALK\"?", sv: "signal === \"WALK\"?" },
          inputKey: "signal",
          walkWhen: "walk",
          walkLabel: { en: "Walks", sv: "Går" },
          waitLabel: { en: "Waits", sv: "Väntar" },
        },
      },
    },

    // Final lab — a freeform Monaco exercise. JS-only, console-based: no
    // functions and no DOM (those concepts haven't been introduced yet). The
    // student declares variables, picks a number, and uses three separate
    // `if` statements (no `else if` in L1) to assign the matching value.
    {
      kind: "exercise",
      title: { en: "Lab: Fortune Picker", sv: "Labb: Lyckokakan" },
      prompt: {
        en:
          "Pick a fortune from a list of three based on a number.\n\n" +
          "User stories (variable names are suggestions — pick your own if you like, " +
          "as long as they stay consistent through the program):\n" +
          "1. Declare three string variables (e.g. fortune1, fortune2, fortune3) — any short fortune you like.\n" +
          "2. Declare a number variable (e.g. n) and set it to 1, 2 or 3.\n" +
          "3. Declare a string variable (e.g. selected) and set it to \"\".\n" +
          "4. If your number === 1, set selected to the first fortune.\n" +
          "5. If your number === 2, set selected to the second fortune.\n" +
          "6. If your number === 3, set selected to the third fortune.\n" +
          "7. Print the three fortunes in order (three console.log lines).\n" +
          "8. Print selected (one more console.log line).\n\n" +
          "You don't have else if yet — write three separate if statements, " +
          "and compare the same number variable in each.",
        sv:
          "Välj en lyckokaka från en lista med tre baserat på ett nummer.\n\n" +
          "Användarberättelser (variabelnamnen är förslag — välj egna om du vill, " +
          "bara du håller dem konsekventa genom programmet):\n" +
          "1. Deklarera tre strängvariabler (t.ex. fortune1, fortune2, fortune3) — välj fritt.\n" +
          "2. Deklarera en talvariabel (t.ex. n) och sätt den till 1, 2 eller 3.\n" +
          "3. Deklarera en strängvariabel (t.ex. selected) och sätt den till \"\".\n" +
          "4. Om ditt nummer === 1, sätt selected till första lyckokakan.\n" +
          "5. Om ditt nummer === 2, sätt selected till andra lyckokakan.\n" +
          "6. Om ditt nummer === 3, sätt selected till tredje lyckokakan.\n" +
          "7. Skriv ut de tre lyckokakorna i ordning (tre console.log-rader).\n" +
          "8. Skriv ut selected (en till console.log-rad).\n\n" +
          "Du har inte else if än — skriv tre separata if-satser, " +
          "och jämför samma talvariabel i varje.",
      },
      starterJs:
        "// Follow the user stories shown to the left.\n" +
        "// Reminder: declare variables with `let`, e.g.\n" +
        '//   let myWord = "hello";\n' +
        '//   let myNumber = 3;\n\n' +
        "// 1-3. Declare your variables here:\n\n\n\n" +
        "// 4-6. Three separate if-statements:\n\n\n\n\n" +
        "// 7-8. Print the three fortunes, then selected:\n\n",
      tests: [
        {
          label: {
            en: "Console shows exactly four lines",
            sv: "Konsolen visar exakt fyra rader",
          },
          assert:
            "var c = window.__console || [];" +
            "return c.length === 4;",
          hint: {
            en: "Three console.log for the fortunes plus one for selected — four in total.",
            sv: "Tre console.log för lyckokakorna plus en för selected — fyra totalt.",
          },
        },
        {
          label: {
            en: "Each variable you print is one you declared",
            sv: "Varje variabel du skriver ut är en du deklarerat",
          },
          assert:
            "var src = window.__userSrc || '';" +
            "var logs = []; var re = /console\\.log\\s*\\(\\s*([A-Za-z_$][A-Za-z0-9_$]*)\\s*\\)/g;" +
            "var m; while ((m = re.exec(src)) !== null) logs.push(m[1]);" +
            "if (logs.length === 0) return false;" +
            "for (var i = 0; i < logs.length; i++) {" +
            "  var name = logs[i];" +
            "  var d = new RegExp('(?:let|const|var|function)\\\\s+' + name + '\\\\b');" +
            "  if (!d.test(src)) return false;" +
            "}" +
            "return true;",
          hint: {
            en:
              "If a console.log line shows nothing or the wrong value, double-check the variable name — it must match what you declared with let.",
            sv:
              "Om en console.log-rad är tom eller fel, dubbelkolla variabelnamnet — det måste matcha det du deklarerade med let.",
          },
        },
        {
          label: {
            en: "All three fortunes are non-empty strings",
            sv: "Alla tre lyckokakor är icke-tomma strängar",
          },
          assert:
            "var c = window.__console || [];" +
            "if (c.length < 3) return false;" +
            "return c[0].text.length > 0 && c[1].text.length > 0 && c[2].text.length > 0;",
          hint: {
            en: 'Set fortune1, fortune2 and fortune3 to actual strings, not "".',
            sv: 'Sätt fortune1, fortune2 och fortune3 till riktiga strängar, inte "".',
          },
        },
        {
          label: {
            en: "The three fortunes are different from each other",
            sv: "De tre lyckokakorna är olika varandra",
          },
          assert:
            "var c = window.__console || [];" +
            "if (c.length < 3) return false;" +
            "return c[0].text !== c[1].text && c[1].text !== c[2].text && c[0].text !== c[2].text;",
          hint: {
            en: "Give each fortune a different string so the picker has real choices.",
            sv: "Ge varje lyckokaka en egen sträng så det blir riktiga val.",
          },
        },
        {
          label: {
            en: "selected matches one of the three fortunes",
            sv: "selected matchar en av de tre lyckokakorna",
          },
          assert:
            "var c = window.__console || [];" +
            "if (c.length < 4) return false;" +
            "var sel = c[3].text;" +
            "return sel === c[0].text || sel === c[1].text || sel === c[2].text;",
          hint: {
            en: "Inside each if, assign one of fortune1, fortune2 or fortune3 to selected.",
            sv: "Inuti varje if, tilldela en av fortune1, fortune2 eller fortune3 till selected.",
          },
        },
        {
          label: {
            en:
              "Code has three separate if-statements comparing the same variable to 1, 2 and 3",
            sv:
              "Koden har tre separata if-satser som jämför samma variabel med 1, 2 och 3",
          },
          assert:
            "var src = window.__userSrc || '';" +
            "var re = /if\\s*\\(\\s*([A-Za-z_$][A-Za-z0-9_$]*)\\s*===\\s*([123])\\s*\\)/g;" +
            "var hits = []; var m;" +
            "while ((m = re.exec(src)) !== null) hits.push({ name: m[1], num: m[2] });" +
            "if (hits.length !== 3) return false;" +
            "var name = hits[0].name;" +
            "if (!hits.every(function(h){ return h.name === name; })) return false;" +
            "var nums = hits.map(function(h){ return h.num; }).sort().join(',');" +
            "return nums === '1,2,3';",
          hint: {
            en:
              "Write three separate if-statements that all compare the same variable to 1, 2 and 3.",
            sv:
              "Skriv tre separata if-satser som alla jämför samma variabel med 1, 2 och 3.",
          },
        },
      ],
    },
  ],
};
