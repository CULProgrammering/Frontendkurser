import type { Lesson } from "../../types";

export const boxModelLesson: Lesson = {
  id: "box-model",
  title: { en: "The Box Model", sv: "Boxmodellen" },
  summary: {
    en: "Every element is a box — content, padding, border, and margin.",
    sv: "Varje element är en låda — innehåll, padding, border och margin.",
  },
  slides: [
    // 0. Intro overview
    {
      kind: "explanation",
      title: { en: "The Box Model", sv: "Boxmodellen" },
      intro: {
        en: "Four parts to learn. Click to step through.",
        sv: "Fyra delar att lära sig. Klicka för att stega fram.",
      },
      demo: [
        {
          id: "box",
          baseStyle: {
            background: "#d6ccb8",
            width: 200,
            height: 200,
            boxSizing: "border-box",
            border: "0 solid transparent",
            padding: 0,
            margin: 0,
            borderRadius: 6,
            display: "flex",
            transition: "all 500ms cubic-bezier(.2,.8,.2,1)",
          },
          children: [
            {
              id: "content",
              label: { en: "content", sv: "innehåll" },
              baseStyle: {
                flex: "1",
                background: "#6366f1",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 4,
                fontWeight: 600,
                transition: "all 500ms cubic-bezier(.2,.8,.2,1)",
              },
            },
          ],
        },
      ],
      steps: [
        {
          narration: {
            en: "Everything you see on a web page is a box. Every box has four parts.",
            sv: "Allt du ser på en webbsida är en låda. Varje låda har fyra delar.",
          },
        },
        {
          narration: {
            en: "1. Content — the text or image itself.",
            sv: "1. Innehåll — själva texten eller bilden.",
          },
          highlight: ["box"],
        },
        {
          narration: {
            en: "2. Padding — air INSIDE the box. The box stays the same size; the content shrinks.",
            sv: "2. Padding — luft INUTI lådan. Lådan håller samma storlek, innehållet krymper.",
          },
          styles: { box: { padding: 20 } },
        },
        {
          narration: {
            en: "3. Border — the edge itself.",
            sv: "3. Border — själva kanten.",
          },
          styles: { box: { padding: 20, border: "4px solid #fbbf24" } },
        },
        {
          narration: {
            en: "4. Margin — air OUTSIDE the box. Space the box reserves for itself — no other box can step in.",
            sv: "4. Margin — luft UTANFÖR lådan. Det är yta som lådan reserverar åt sig själv — ingen annan låda får gå in där.",
          },
          styles: {
            box: {
              padding: 20,
              border: "4px solid #fbbf24",
              margin: 16,
              boxShadow: "0 0 0 16px rgba(253,224,71,0.25)",
            },
          },
        },
        {
          narration: {
            en: "Next we'll look at how to change the size of the box.",
            sv: "I nästa del ska vi titta på hur man ändrar storleken på lådorna.",
          },
          styles: {
            box: {
              padding: 20,
              border: "4px solid #fbbf24",
              margin: 16,
              boxShadow: "0 0 0 16px rgba(253,224,71,0.25)",
            },
          },
        },
      ],
    },

    // 1. CONTENT — explanation
    {
      kind: "explanation",
      title: {
        en: "Part 1: Content — width & height",
        sv: "Del 1: Innehåll — bredd & höjd",
      },
      demo: [
        {
          id: "parent",
          baseStyle: {
            width: 400,
            height: 280,
            background: "#d6ccb8",
            border: "1px dashed #8a7f6a",
            borderRadius: 8,
            padding: 0,
            boxSizing: "border-box",
            display: "block",
            transition: "all 500ms cubic-bezier(.2,.8,.2,1)",
          },
          children: [
            {
              id: "box",
              label: "box",
              baseStyle: {
                width: 160,
                height: 160,
                background: "#6366f1",
                color: "white",
                borderRadius: 6,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 600,
                transition: "all 500ms cubic-bezier(.2,.8,.2,1)",
              },
            },
          ],
        },
      ],
      steps: [
        {
          narration: {
            en: "Every box has a size. You set it with `width` and `height`. The beige box around it is the parent.",
            sv: "Varje låda har en storlek. Du styr den med `width` och `height`. Den beiga lådan runt är förälder.",
          },
        },
        {
          narration: {
            en: "`width: 240px` makes the box wider.",
            sv: "`width: 240px` gör lådan bredare.",
          },
          styles: { box: { width: 240 } },
        },
        {
          narration: {
            en: "`height: 100px` makes it shorter.",
            sv: "`height: 100px` gör den lägre.",
          },
          styles: { box: { height: 100 } },
        },
        {
          narration: {
            en: "Percentages also work — the size becomes RELATIVE to the parent. `width: 50%` = half of the parent.",
            sv: "Procent fungerar också — storleken blir då RELATIV till föräldern. `width: 50%` = halva föräldern.",
          },
          styles: { box: { width: "50%" } },
        },
        {
          narration: {
            en: "`width: 25%` — a quarter of the parent's width.",
            sv: "`width: 25%` — en fjärdedel av förälderns bredd.",
          },
          styles: { box: { width: "25%" } },
        },
        {
          narration: {
            en: "`width: 100%` — the full parent width.",
            sv: "`width: 100%` — hela förälderns bredd.",
          },
          styles: { box: { width: "100%" } },
        },
        {
          narration: {
            en: "`height: 70%` — 70% of the parent's height.",
            sv: "`height: 70%` — 70% av förälderns höjd.",
          },
          styles: { box: { height: "70%" } },
        },
        {
          narration: {
            en: "`width: 100%; height: 100%;` — the box fills the parent entirely.",
            sv: "`width: 100%; height: 100%;` — lådan fyller hela föräldern.",
          },
          styles: { box: { width: "100%", height: "100%" } },
        },
      ],
    },

    // 1a. CONTENT — exercise 1
    {
      kind: "assignment",
      title: { en: "Practice: set a size", sv: "Övning: sätt en storlek" },
      prompt: {
        en: "Make .box 250px wide and 120px tall.",
        sv: "Gör .box 250px bred och 120px hög.",
      },
      html: {
        en: `<div class="box">Hi</div>`,
        sv: `<div class="box">Hej</div>`,
      },
      startingCss: {
        en: `.box {\n  background: #c7d2fe;\n  /* Add width and height here */\n}`,
        sv: `.box {\n  background: #c7d2fe;\n  /* Lägg till width och height här */\n}`,
      },
      checks: [
        { selector: ".box", property: "width", expected: "250px" },
        { selector: ".box", property: "height", expected: "120px" },
      ],
      legend: [
        { name: "width", syntax: "width: <length>;", example: "width: 250px;" },
        { name: "height", syntax: "height: <length>;", example: "height: 120px;" },
      ],
    },

    // 1b. CONTENT — exercise 2
    {
      kind: "assignment",
      title: { en: "Practice: percentages", sv: "Övning: procent" },
      prompt: {
        en: "Make .box 50% wide (half the parent). Height can be 80px.",
        sv: "Gör .box 50% bred (halva föräldern). Höjden får vara 80px.",
      },
      html: {
        en: `<div class="wrap"><div class="box">half</div></div>`,
        sv: `<div class="wrap"><div class="box">halv</div></div>`,
      },
      startingCss: {
        en: `.wrap { background: #eef2ff; padding: 10px; }\n.box {\n  background: #818cf8;\n  color: white;\n  /* Your width + height */\n}`,
        sv: `.wrap { background: #eef2ff; padding: 10px; }\n.box {\n  background: #818cf8;\n  color: white;\n  /* Din width + height */\n}`,
      },
      checks: [
        { selector: ".box", property: "height", expected: "80px" },
      ],
      legend: [
        {
          name: { en: "width (%)", sv: "width (%)" },
          syntax: "width: <percent>;",
          example: "width: 50%;",
          note: { en: "Relative to the parent.", sv: "Relativt till föräldern." },
        },
        { name: "height", syntax: "height: <length>;", example: "height: 80px;" },
      ],
    },

    // 2. PADDING — explanation
    {
      kind: "explanation",
      title: {
        en: "Part 2: Padding — air inside",
        sv: "Del 2: Padding — luft inuti",
      },
      demo: [
        {
          id: "box",
          label: { en: "Content", sv: "Innehåll" },
          baseStyle: {
            backgroundColor: "#d6ccb8",
            backgroundImage:
              "repeating-linear-gradient(45deg, #e0e7ff, #e0e7ff 8px, #c7d2fe 8px, #c7d2fe 16px)",
            backgroundClip: "content-box",
            backgroundOrigin: "content-box",
            border: "1px dashed #6366f1",
            padding: 0,
            borderRadius: 8,
            width: 360,
            height: 300,
            boxSizing: "border-box",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 42,
            fontWeight: 700,
            color: "#1e1b4b",
            transition: "all 500ms cubic-bezier(.2,.8,.2,1)",
          },
        },
      ],
      steps: [
        {
          narration: {
            en: "The blue pattern shows the content area.",
            sv: "Det blå mönstret visar innehållet.",
          },
        },
        {
          narration: {
            en: "`padding: 20px` — equal air on all four sides.",
            sv: "`padding: 20px` — lika mycket luft på alla fyra sidor.",
          },
          styles: { box: { padding: 20 } },
        },
        {
          narration: {
            en: "`padding: 10px 40px` — TWO values: top/bottom, then left/right.",
            sv: "`padding: 10px 40px` — TVÅ värden: först topp/botten, sedan vänster/höger.",
          },
          styles: { box: { padding: "10px 40px" } },
        },
        {
          narration: {
            en: "`padding: 10px 20px 40px` — THREE values: top, left/right, bottom.",
            sv: "`padding: 10px 20px 40px` — TRE värden: topp, vänster/höger, botten.",
          },
          styles: { box: { padding: "10px 20px 40px" } },
        },
        {
          narration: {
            en: "`padding: 10px 20px 40px 60px` — FOUR values go CLOCKWISE: top, right, bottom, left.",
            sv: "`padding: 10px 20px 40px 60px` — FYRA värden går MEDURS: topp, höger, botten, vänster.",
          },
          styles: { box: { padding: "10px 20px 40px 60px" } },
        },
        {
          narration: {
            en: "`padding-top: 30px` — only the top.",
            sv: "`padding-top: 30px` — bara toppen.",
          },
          styles: { box: { padding: 0, paddingTop: 30 } },
        },
        {
          narration: {
            en: "`padding-left: 40px` — only the left.",
            sv: "`padding-left: 40px` — bara vänster.",
          },
          styles: { box: { padding: 0, paddingLeft: 40 } },
        },
        {
          narration: {
            en: "You can combine: here `padding-top: 10px` and `padding-left: 40px`.",
            sv: "Du kan kombinera: här `padding-top: 10px` och `padding-left: 40px`.",
          },
          styles: { box: { padding: 0, paddingTop: 10, paddingLeft: 40 } },
        },
      ],
    },

    // 2a. PADDING — exercise 1
    {
      kind: "assignment",
      title: { en: "Practice: a bit of air", sv: "Övning: lite luft" },
      prompt: {
        en: "Give .box 20px padding on all sides.",
        sv: "Ge .box padding 20px på alla sidor.",
      },
      html: {
        en: `<div class="box">Press here</div>`,
        sv: `<div class="box">Tryck här</div>`,
      },
      startingCss: {
        en: `.box {\n  display: inline-block;\n  background: #818cf8;\n  color: white;\n  /* Your padding */\n}`,
        sv: `.box {\n  display: inline-block;\n  background: #818cf8;\n  color: white;\n  /* Din padding */\n}`,
      },
      checks: [
        { selector: ".box", property: "padding-top", expected: "20px" },
        { selector: ".box", property: "padding-right", expected: "20px" },
        { selector: ".box", property: "padding-bottom", expected: "20px" },
        { selector: ".box", property: "padding-left", expected: "20px" },
      ],
      legend: [
        {
          name: { en: "padding (one value)", sv: "padding (ett värde)" },
          syntax: "padding: <length>;",
          example: "padding: 20px;",
          note: { en: "The same on all sides.", sv: "Samma på alla sidor." },
        },
      ],
    },

    // 2b. PADDING — exercise 2
    {
      kind: "assignment",
      title: { en: "Practice: different sides", sv: "Övning: olika sidor" },
      prompt: {
        en: "Give .box 10px padding top/bottom and 30px left/right.",
        sv: "Ge .box padding 10px uppe/nere och 30px vänster/höger.",
      },
      html: {
        en: `<div class="box">Button</div>`,
        sv: `<div class="box">Knapp</div>`,
      },
      startingCss: {
        en: `.box {\n  display: inline-block;\n  background: #6366f1;\n  color: white;\n  /* Your padding */\n}`,
        sv: `.box {\n  display: inline-block;\n  background: #6366f1;\n  color: white;\n  /* Din padding */\n}`,
      },
      checks: [
        { selector: ".box", property: "padding-top", expected: "10px" },
        { selector: ".box", property: "padding-bottom", expected: "10px" },
        { selector: ".box", property: "padding-left", expected: "30px" },
        { selector: ".box", property: "padding-right", expected: "30px" },
      ],
      legend: [
        {
          name: { en: "padding (two values)", sv: "padding (två värden)" },
          syntax: "padding: <top/bottom> <left/right>;",
          example: "padding: 10px 30px;",
        },
        {
          name: { en: "padding-left etc.", sv: "padding-left osv." },
          syntax: "padding-left: <length>;",
          example: "padding-left: 30px;",
        },
      ],
    },

    // 3. BORDER — explanation
    {
      kind: "explanation",
      title: { en: "Part 3: Border — the edge", sv: "Del 3: Border — kanten" },
      demo: [
        {
          id: "box",
          label: { en: "Content", sv: "Innehåll" },
          baseStyle: {
            background: "white",
            color: "black",
            width: 360,
            height: 300,
            borderRadius: 6,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 42,
            fontWeight: 700,
            border: "0 solid transparent",
            boxSizing: "border-box",
            transition: "all 500ms cubic-bezier(.2,.8,.2,1)",
          },
        },
      ],
      steps: [
        {
          narration: {
            en: "Border is the edge of the box. It has THREE parts: width, style, color.",
            sv: "Border är kanten på lådan. Den har TRE delar: bredd, stil, färg.",
          },
        },
        {
          narration: {
            en: "`border: 2px solid red` — shorthand with all three on one line.",
            sv: "`border: 2px solid red` — shorthand med alla tre i en rad.",
          },
          styles: { box: { border: "2px solid red" } },
        },
        {
          narration: {
            en: "Style `solid` — a continuous line (the most common).",
            sv: "Stil `solid` — en heldragen linje (den vanligaste).",
          },
          styles: { box: { border: "4px solid red" } },
        },
        {
          narration: {
            en: "Style `dashed` — a dashed line.",
            sv: "Stil `dashed` — en streckad linje.",
          },
          styles: { box: { border: "4px dashed red" } },
        },
        {
          narration: {
            en: "Style `dotted` — a dotted line.",
            sv: "Stil `dotted` — en prickad linje.",
          },
          styles: { box: { border: "4px dotted red" } },
        },
        {
          narration: {
            en: "Style `double` — two parallel lines.",
            sv: "Stil `double` — två parallella linjer.",
          },
          styles: { box: { border: "6px double red" } },
        },
        {
          narration: {
            en: "Just one side: `border-top: 4px solid red`.",
            sv: "Bara en sida: `border-top: 4px solid red`.",
          },
          styles: { box: { border: "0 solid transparent", borderTop: "4px solid red" } },
        },
        {
          narration: { en: "`border-bottom` — at the bottom.", sv: "`border-bottom` — nederst." },
          styles: { box: { border: "0 solid transparent", borderBottom: "4px solid red" } },
        },
        {
          narration: {
            en: "`border-left` and `border-right` work the same — left here.",
            sv: "`border-left` och `border-right` fungerar likadant — här vänster.",
          },
          styles: { box: { border: "0 solid transparent", borderLeft: "4px solid red" } },
        },
        {
          narration: {
            en: "Combine several sides: top and bottom at once.",
            sv: "Kombinera flera sidor: topp och botten samtidigt.",
          },
          styles: {
            box: {
              border: "0 solid transparent",
              borderTop: "3px solid red",
              borderBottom: "3px solid red",
            },
          },
        },
        {
          narration: {
            en: "Each part can also be styled separately:\nborder-width: 5px;\nborder-style: dotted;\nborder-color: red;",
            sv: "Varje del kan också stylas separat:\nborder-width: 5px;\nborder-style: dotted;\nborder-color: red;",
          },
          styles: {
            box: {
              border: "0 solid transparent",
              borderWidth: "5px",
              borderStyle: "dotted",
              borderColor: "red",
            },
          },
        },
      ],
    },

    // 3a. BORDER — exercise 1
    {
      kind: "assignment",
      title: { en: "Practice: a regular border", sv: "Övning: en vanlig border" },
      prompt: {
        en: "Give .box a 3px solid blue border.",
        sv: "Ge .box en 3px solid blå border.",
      },
      html: {
        en: `<div class="box">Frame me</div>`,
        sv: `<div class="box">Ram mig</div>`,
      },
      startingCss: {
        en: `.box {\n  display: inline-block;\n  padding: 16px;\n  background: white;\n  color: black;\n  /* Your border */\n}`,
        sv: `.box {\n  display: inline-block;\n  padding: 16px;\n  background: white;\n  color: black;\n  /* Din border */\n}`,
      },
      checks: [
        { selector: ".box", property: "border-top-width", expected: "3px" },
        { selector: ".box", property: "border-top-style", expected: "solid" },
        { selector: ".box", property: "border-top-color", expected: "rgb(0, 0, 255)" },
      ],
      legend: [
        {
          name: { en: "border (shorthand)", sv: "border (shorthand)" },
          syntax: "border: <width> <style> <color>;",
          example: "border: 3px solid blue;",
        },
      ],
    },

    // 3b. BORDER — exercise 2
    {
      kind: "assignment",
      title: { en: "Practice: only one side", sv: "Övning: bara en sida" },
      prompt: {
        en: "Give .box only a BOTTOM border: 2px dashed gray.",
        sv: "Ge .box endast en border NEDERST: 2px dashed grå.",
      },
      html: {
        en: `<div class="box">Underlined</div>`,
        sv: `<div class="box">Understryket</div>`,
      },
      startingCss: {
        en: `.box {\n  display: inline-block;\n  padding: 8px 4px;\n  background: white;\n  color: black;\n  /* Your border-bottom */\n}`,
        sv: `.box {\n  display: inline-block;\n  padding: 8px 4px;\n  background: white;\n  color: black;\n  /* Din border-bottom */\n}`,
      },
      checks: [
        { selector: ".box", property: "border-bottom-width", expected: "2px" },
        { selector: ".box", property: "border-bottom-style", expected: "dashed" },
        { selector: ".box", property: "border-bottom-color", expected: "rgb(128, 128, 128)" },
        { selector: ".box", property: "border-top-width", expected: "0px" },
      ],
      legend: [
        {
          name: "border-bottom",
          syntax: "border-bottom: <width> <style> <color>;",
          example: "border-bottom: 2px dashed gray;",
        },
        {
          name: { en: "border-top / -left / -right", sv: "border-top / -left / -right" },
          syntax: "border-<side>: …;",
          example: "border-top: 1px solid black;",
        },
      ],
    },

    // 4. MARGIN — explanation
    {
      kind: "explanation",
      title: {
        en: "Part 4: Margin — air outside",
        sv: "Del 4: Margin — luft utanför",
      },
      demo: [
        {
          id: "stage",
          baseStyle: {
            background:
              "repeating-linear-gradient(45deg, #fef3c7, #fef3c7 8px, #fde68a 8px, #fde68a 16px)",
            border: "1px dashed #d97706",
            borderRadius: 8,
            padding: 0,
            width: 440,
            height: 440,
            display: "flex",
            flexWrap: "wrap",
            alignItems: "flex-start",
            alignContent: "flex-start",
            boxSizing: "border-box",
            transition: "all 500ms cubic-bezier(.2,.8,.2,1)",
          },
          children: [
            {
              id: "red",
              label: { en: "Box", sv: "Låda" },
              baseStyle: {
                background: "red",
                color: "white",
                width: 160,
                height: 160,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 42,
                fontWeight: 700,
                margin: 0,
                transition: "all 500ms cubic-bezier(.2,.8,.2,1)",
              },
            },
            {
              id: "g1",
              label: { en: "Box", sv: "Låda" },
              baseStyle: {
                width: 160,
                height: 160,
                background: "#a8a29e",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 42,
                fontWeight: 700,
                transition: "all 500ms cubic-bezier(.2,.8,.2,1)",
              },
            },
            {
              id: "g2",
              label: { en: "Box", sv: "Låda" },
              baseStyle: {
                width: 160,
                height: 160,
                background: "#a8a29e",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 42,
                fontWeight: 700,
                transition: "all 500ms cubic-bezier(.2,.8,.2,1)",
              },
            },
            {
              id: "g3",
              label: { en: "Box", sv: "Låda" },
              baseStyle: {
                width: 160,
                height: 160,
                background: "#a8a29e",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 42,
                fontWeight: 700,
                transition: "all 500ms cubic-bezier(.2,.8,.2,1)",
              },
            },
          ],
        },
      ],
      steps: [
        {
          narration: {
            en: "Margin is air OUTSIDE the box. The red box is ours — see how it pushes the gray ones away.",
            sv: "Margin är luft UTANFÖR lådan. Den röda lådan är vår — se hur den knuffar undan de grå.",
          },
        },
        {
          narration: {
            en: "`margin: 20px` — the same on all four sides.",
            sv: "`margin: 20px` — lika mycket på alla fyra sidor.",
          },
          styles: { red: { margin: 20 } },
        },
        {
          narration: {
            en: "`margin: 10px 40px` — TWO values: top/bottom, then left/right.",
            sv: "`margin: 10px 40px` — TVÅ värden: topp/botten, sedan vänster/höger.",
          },
          styles: { red: { margin: "10px 40px" } },
        },
        {
          narration: {
            en: "`margin: 10px 20px 40px` — THREE values: top, left/right, bottom.",
            sv: "`margin: 10px 20px 40px` — TRE värden: topp, vänster/höger, botten.",
          },
          styles: { red: { margin: "10px 20px 40px" } },
        },
        {
          narration: {
            en: "`margin: 10px 20px 40px 60px` — FOUR values CLOCKWISE: top, right, bottom, left.",
            sv: "`margin: 10px 20px 40px 60px` — FYRA värden MEDURS: topp, höger, botten, vänster.",
          },
          styles: { red: { margin: "10px 20px 40px 60px" } },
        },
        {
          narration: { en: "`margin-top: 30px` — only the top.", sv: "`margin-top: 30px` — bara toppen." },
          styles: { red: { margin: 0, marginTop: 30 } },
        },
        {
          narration: {
            en: "`margin-bottom: 30px` — only the bottom.",
            sv: "`margin-bottom: 30px` — bara botten.",
          },
          styles: { red: { margin: 0, marginBottom: 30 } },
        },
        {
          narration: {
            en: "`margin-right: 40px` — pushes the right neighbor.",
            sv: "`margin-right: 40px` — knuffar grannen till höger.",
          },
          styles: { red: { margin: 0, marginRight: 40 } },
        },
        {
          narration: {
            en: "Special trick: `margin: 0 auto` centers the box horizontally (the others are hidden for clarity).",
            sv: "Specialtrick: `margin: 0 auto` centrerar lådan horisontellt (de andra lådorna är gömda för tydlighet).",
          },
          styles: {
            stage: { display: "block" },
            red: { margin: "0 auto", width: 160 },
            g1: { display: "none" },
            g2: { display: "none" },
            g3: { display: "none" },
          },
        },
      ],
    },

    // 4a. MARGIN — exercise 1
    {
      kind: "assignment",
      title: { en: "Practice: spacing", sv: "Övning: mellanrum" },
      prompt: {
        en: "Give .box margin-top 30px and margin-bottom 10px.",
        sv: "Ge .box margin-top 30px och margin-bottom 10px.",
      },
      html: {
        en: `<div class="box">first</div><div class="box">second</div>`,
        sv: `<div class="box">första</div><div class="box">andra</div>`,
      },
      startingCss: {
        en: `.box {\n  background: #c7d2fe;\n  padding: 10px;\n  /* Your margin */\n}`,
        sv: `.box {\n  background: #c7d2fe;\n  padding: 10px;\n  /* Din margin */\n}`,
      },
      checks: [
        { selector: ".box", property: "margin-top", expected: "30px" },
        { selector: ".box", property: "margin-bottom", expected: "10px" },
      ],
      legend: [
        { name: "margin-top", syntax: "margin-top: <length>;", example: "margin-top: 30px;" },
        { name: "margin-bottom", syntax: "margin-bottom: <length>;", example: "margin-bottom: 10px;" },
      ],
    },

    // 4b. MARGIN — exercise 2
    {
      kind: "assignment",
      title: { en: "Practice: center", sv: "Övning: centrera" },
      prompt: {
        en: "Center .box horizontally with margin auto. Also give it a width of 200px.",
        sv: "Centrera .box horisontellt med margin auto. Ge den också en width på 200px.",
      },
      html: {
        en: `<div class="box">centered</div>`,
        sv: `<div class="box">centrerad</div>`,
      },
      startingCss: {
        en: `.box {\n  background: #818cf8;\n  color: white;\n  padding: 12px;\n  /* Your width + margin */\n}`,
        sv: `.box {\n  background: #818cf8;\n  color: white;\n  padding: 12px;\n  /* Din width + margin */\n}`,
      },
      checks: [
        { selector: ".box", property: "width", expected: "200px" },
        { selector: ".box", property: "margin-left", expected: "auto" },
        { selector: ".box", property: "margin-right", expected: "auto" },
      ],
      legend: [
        {
          name: "margin: 0 auto",
          syntax: "margin: 0 auto;",
          example: "margin: 0 auto;",
          note: {
            en: "Requires the element to have a width.",
            sv: "Kräver att elementet har en width.",
          },
        },
        { name: "width", syntax: "width: <length>;", example: "width: 200px;" },
      ],
    },

    // 5. FINAL CHALLENGE
    {
      kind: "assignment",
      title: { en: "Final: match the goal", sv: "Slutövning: matcha målet" },
      prompt: {
        en:
          "The lower preview shows the goal. Style .card so your version is as close as possible. No legend this time — you've seen everything you need!",
        sv:
          "I den nedre rutan ser du målet. Styla .card så att din version blir så lik som möjligt. Ingen hjälp denna gång — du har sett allt du behöver!",
      },
      html: {
        en: `<div class="card">NOTE! Deadline is tomorrow.</div>`,
        sv: `<div class="card">OBS! Deadline är i morgon.</div>`,
      },
      startingCss: {
        en: `.card {\n  background: lightblue;\n  color: black;\n  font-weight: 600;\n  /* Build the rest yourself */\n}`,
        sv: `.card {\n  background: lightblue;\n  color: black;\n  font-weight: 600;\n  /* Bygg resten själv */\n}`,
      },
      targetCss: `.card {\n  background: lightblue;\n  color: black;\n  font-weight: 600;\n  width: 280px;\n  padding: 20px;\n  border: 3px solid darkred;\n  margin-top: 24px;\n  margin-bottom: 20px;\n}`,
      checks: [
        { selector: ".card", property: "width", expected: "280px", tolerance: 15 },
        { selector: ".card", property: "padding-top", expected: "20px" },
        { selector: ".card", property: "padding-right", expected: "20px" },
        { selector: ".card", property: "padding-bottom", expected: "20px" },
        { selector: ".card", property: "padding-left", expected: "20px" },
        { selector: ".card", property: "border-top-width", expected: "3px" },
        { selector: ".card", property: "border-top-style", expected: "solid" },
        { selector: ".card", property: "border-top-color", expected: "rgb(139, 0, 0)" },
        { selector: ".card", property: "margin-top", expected: "24px", tolerance: 10 },
      ],
    },
  ],
};
