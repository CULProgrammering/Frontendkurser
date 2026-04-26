import type { Lesson } from "../../types";

export const boxModelLesson: Lesson = {
  id: "box-model",
  title: "Boxmodellen",
  summary:
    "Varje element är en låda — innehåll, padding, border och margin.",
  slides: [
    // ────────────────────────────── 0. Intro overview
    {
      kind: "explanation",
      title: "Boxmodellen",
      intro: "Fyra delar att lära sig. Klicka för att stega fram.",
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
              label: "innehåll",
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
          narration:
            "Allt du ser på en webbsida är en låda. Varje låda har fyra delar.",
        },
        {
          narration: "1. Innehåll — själva texten eller bilden.",
          highlight: ["box"],
        },
        {
          narration:
            "2. Padding — luft INUTI lådan. Lådan håller samma storlek, innehållet krymper.",
          styles: { box: { padding: 20 } },
        },
        {
          narration: "3. Border — själva kanten.",
          styles: {
            box: {
              padding: 20,
              border: "4px solid #fbbf24",
            },
          },
        },
        {
          narration:
            "4. Margin — luft UTANFÖR lådan. Det är yta som lådan reserverar åt sig själv — ingen annan låda får gå in där.",
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
          narration:
            "I nästa del ska vi titta på hur man ändrar storleken på lådorna",
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

    // ────────────────────────────── 1. CONTENT — explanation
    {
      kind: "explanation",
      title: "Del 1: Innehåll — bredd & höjd",
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
          narration:
            "Varje låda har en storlek. Du styr den med `width` och `height`. Den beiga lådan runt är förälder.",
        },
        {
          narration: "`width: 240px` gör lådan bredare.",
          styles: { box: { width: 240 } },
        },
        {
          narration: "`height: 100px` gör den lägre.",
          styles: { box: { height: 100 } },
        },
        {
          narration:
            "Procent fungerar också — storleken blir då RELATIV till föräldern. `width: 50%` = halva föräldern.",
          styles: { box: { width: "50%" } },
        },
        {
          narration: "`width: 25%` — en fjärdedel av förälderns bredd.",
          styles: { box: { width: "25%" } },
        },
        {
          narration: "`width: 100%` — hela förälderns bredd.",
          styles: { box: { width: "100%" } },
        },
        {
          narration: "`height: 70%` — 70% av förälderns höjd.",
          styles: { box: { height: "70%" } },
        },
        {
          narration:
            "`width: 100%; height: 100%;` — lådan fyller hela föräldern.",
          styles: { box: { width: "100%", height: "100%" } },
        },
      ],
    },

    // 1a. CONTENT — exercise 1
    {
      kind: "assignment",
      title: "Övning: sätt en storlek",
      prompt: "Gör .box 250px bred och 120px hög.",
      html: `<div class="box">Hej</div>`,
      startingCss: `.box {
  background: #c7d2fe;
  /* Lägg till width och height här */
}`,
      checks: [
        { selector: ".box", property: "width", expected: "250px" },
        { selector: ".box", property: "height", expected: "120px" },
      ],
      legend: [
        { name: "width", syntax: "width: <längd>;", example: "width: 250px;" },
        { name: "height", syntax: "height: <längd>;", example: "height: 120px;" },
      ],
    },

    // 1b. CONTENT — exercise 2
    {
      kind: "assignment",
      title: "Övning: procent",
      prompt:
        "Gör .box 50% bred (halva föräldern). Höjden får vara 80px.",
      html: `<div class="wrap"><div class="box">halv</div></div>`,
      startingCss: `.wrap { background: #eef2ff; padding: 10px; }
.box {
  background: #818cf8;
  color: white;
  /* Din width + height */
}`,
      checks: [
        { selector: ".box", property: "height", expected: "80px" },
      ],
      legend: [
        { name: "width (%)", syntax: "width: <procent>;", example: "width: 50%;", note: "Relativt till föräldern." },
        { name: "height", syntax: "height: <längd>;", example: "height: 80px;" },
      ],
    },

    // ────────────────────────────── 2. PADDING — explanation
    {
      kind: "explanation",
      title: "Del 2: Padding — luft inuti",
      demo: [
        {
          id: "box",
          label: "Innehåll",
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
          narration: "Det blå mönstret visar innehållet.",
        },
        {
          narration:
            "`padding: 20px` — lika mycket luft på alla fyra sidor.",
          styles: { box: { padding: 20 } },
        },
        {
          narration:
            "`padding: 10px 40px` — TVÅ värden: först topp/botten, sedan vänster/höger.",
          styles: { box: { padding: "10px 40px" } },
        },
        {
          narration:
            "`padding: 10px 20px 40px` — TRE värden: topp, vänster/höger, botten.",
          styles: { box: { padding: "10px 20px 40px" } },
        },
        {
          narration:
            "`padding: 10px 20px 40px 60px` — FYRA värden går MEDURS: topp, höger, botten, vänster.",
          styles: { box: { padding: "10px 20px 40px 60px" } },
        },
        {
          narration:
            "`padding-top: 30px` — bara toppen.",
          styles: { box: { padding: 0, paddingTop: 30 } },
        },
        {
          narration:
            "`padding-left: 40px` — bara vänster.",
          styles: { box: { padding: 0, paddingLeft: 40 } },
        },
        {
          narration:
            "Du kan kombinera: här `padding-top: 10px` och `padding-left: 40px`.",
          styles: { box: { padding: 0, paddingTop: 10, paddingLeft: 40 } },
        },
      ],
    },

    // 2a. PADDING — exercise 1
    {
      kind: "assignment",
      title: "Övning: lite luft",
      prompt: "Ge .box padding 20px på alla sidor.",
      html: `<div class="box">Tryck här</div>`,
      startingCss: `.box {
  display: inline-block;
  background: #818cf8;
  color: white;
  /* Din padding */
}`,
      checks: [
        { selector: ".box", property: "padding-top", expected: "20px" },
        { selector: ".box", property: "padding-right", expected: "20px" },
        { selector: ".box", property: "padding-bottom", expected: "20px" },
        { selector: ".box", property: "padding-left", expected: "20px" },
      ],
      legend: [
        { name: "padding (ett värde)", syntax: "padding: <längd>;", example: "padding: 20px;", note: "Samma på alla sidor." },
      ],
    },

    // 2b. PADDING — exercise 2
    {
      kind: "assignment",
      title: "Övning: olika sidor",
      prompt:
        "Ge .box padding 10px uppe/nere och 30px vänster/höger.",
      html: `<div class="box">Knapp</div>`,
      startingCss: `.box {
  display: inline-block;
  background: #6366f1;
  color: white;
  /* Din padding */
}`,
      checks: [
        { selector: ".box", property: "padding-top", expected: "10px" },
        { selector: ".box", property: "padding-bottom", expected: "10px" },
        { selector: ".box", property: "padding-left", expected: "30px" },
        { selector: ".box", property: "padding-right", expected: "30px" },
      ],
      legend: [
        { name: "padding (två värden)", syntax: "padding: <topp/botten> <vänster/höger>;", example: "padding: 10px 30px;" },
        { name: "padding-left osv.", syntax: "padding-left: <längd>;", example: "padding-left: 30px;" },
      ],
    },

    // ────────────────────────────── 3. BORDER — explanation
    {
      kind: "explanation",
      title: "Del 3: Border — kanten",
      demo: [
        {
          id: "box",
          label: "Innehåll",
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
          narration:
            "Border är kanten på lådan. Den har TRE delar: bredd, stil, färg.",
        },
        {
          narration:
            "`border: 2px solid red` — shorthand med alla tre i en rad.",
          styles: { box: { border: "2px solid red" } },
        },
        {
          narration:
            "Stil `solid` — en heldragen linje (den vanligaste).",
          styles: { box: { border: "4px solid red" } },
        },
        {
          narration: "Stil `dashed` — en streckad linje.",
          styles: { box: { border: "4px dashed red" } },
        },
        {
          narration: "Stil `dotted` — en prickad linje.",
          styles: { box: { border: "4px dotted red" } },
        },
        {
          narration: "Stil `double` — två parallella linjer.",
          styles: { box: { border: "6px double red" } },
        },
        {
          narration:
            "Bara en sida: `border-top: 4px solid red`.",
          styles: { box: { border: "0 solid transparent", borderTop: "4px solid red" } },
        },
        {
          narration: "`border-bottom` — nederst.",
          styles: { box: { border: "0 solid transparent", borderBottom: "4px solid red" } },
        },
        {
          narration:
            "`border-left` och `border-right` fungerar likadant — här vänster.",
          styles: { box: { border: "0 solid transparent", borderLeft: "4px solid red" } },
        },
        {
          narration:
            "Kombinera flera sidor: topp och botten samtidigt.",
          styles: {
            box: {
              border: "0 solid transparent",
              borderTop: "3px solid red",
              borderBottom: "3px solid red",
            },
          },
        },
        {
          narration:
            "Varje del kan också stylas separat:\nborder-width: 5px;\nborder-style: dotted;\nborder-color: red;",
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
      title: "Övning: en vanlig border",
      prompt: "Ge .box en 3px solid blå border.",
      html: `<div class="box">Ram mig</div>`,
      startingCss: `.box {
  display: inline-block;
  padding: 16px;
  background: white;
  color: black;
  /* Din border */
}`,
      checks: [
        { selector: ".box", property: "border-top-width", expected: "3px" },
        { selector: ".box", property: "border-top-style", expected: "solid" },
        { selector: ".box", property: "border-top-color", expected: "rgb(0, 0, 255)" },
      ],
      legend: [
        { name: "border (shorthand)", syntax: "border: <bredd> <stil> <färg>;", example: "border: 3px solid blue;" },
      ],
    },

    // 3b. BORDER — exercise 2
    {
      kind: "assignment",
      title: "Övning: bara en sida",
      prompt:
        "Ge .box endast en border NEDERST: 2px dashed grå.",
      html: `<div class="box">Understryket</div>`,
      startingCss: `.box {
  display: inline-block;
  padding: 8px 4px;
  background: white;
  color: black;
  /* Din border-bottom */
}`,
      checks: [
        { selector: ".box", property: "border-bottom-width", expected: "2px" },
        { selector: ".box", property: "border-bottom-style", expected: "dashed" },
        { selector: ".box", property: "border-bottom-color", expected: "rgb(128, 128, 128)" },
        { selector: ".box", property: "border-top-width", expected: "0px" },
      ],
      legend: [
        { name: "border-bottom", syntax: "border-bottom: <bredd> <stil> <färg>;", example: "border-bottom: 2px dashed gray;" },
        { name: "border-top / -left / -right", syntax: "border-<sida>: …;", example: "border-top: 1px solid black;" },
      ],
    },

    // ────────────────────────────── 4. MARGIN — explanation
    {
      kind: "explanation",
      title: "Del 4: Margin — luft utanför",
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
              label: "Låda",
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
              label: "Låda",
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
              label: "Låda",
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
              label: "Låda",
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
          narration:
            "Margin är luft UTANFÖR lådan. Den röda lådan är vår — se hur den knuffar undan de grå.",
        },
        {
          narration: "`margin: 20px` — lika mycket på alla fyra sidor.",
          styles: { red: { margin: 20 } },
        },
        {
          narration:
            "`margin: 10px 40px` — TVÅ värden: topp/botten, sedan vänster/höger.",
          styles: { red: { margin: "10px 40px" } },
        },
        {
          narration:
            "`margin: 10px 20px 40px` — TRE värden: topp, vänster/höger, botten.",
          styles: { red: { margin: "10px 20px 40px" } },
        },
        {
          narration:
            "`margin: 10px 20px 40px 60px` — FYRA värden MEDURS: topp, höger, botten, vänster.",
          styles: { red: { margin: "10px 20px 40px 60px" } },
        },
        {
          narration: "`margin-top: 30px` — bara toppen.",
          styles: { red: { margin: 0, marginTop: 30 } },
        },
        {
          narration: "`margin-bottom: 30px` — bara botten.",
          styles: { red: { margin: 0, marginBottom: 30 } },
        },
        {
          narration:
            "`margin-right: 40px` — knuffar grannen till höger.",
          styles: { red: { margin: 0, marginRight: 40 } },
        },
        {
          narration:
            "Specialtrick: `margin: 0 auto` centrerar lådan horisontellt (de andra lådorna är gömda för tydlighet).",
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
      title: "Övning: mellanrum",
      prompt: "Ge .box margin-top 30px och margin-bottom 10px.",
      html: `<div class="box">första</div><div class="box">andra</div>`,
      startingCss: `.box {
  background: #c7d2fe;
  padding: 10px;
  /* Din margin */
}`,
      checks: [
        { selector: ".box", property: "margin-top", expected: "30px" },
        { selector: ".box", property: "margin-bottom", expected: "10px" },
      ],
      legend: [
        { name: "margin-top", syntax: "margin-top: <längd>;", example: "margin-top: 30px;" },
        { name: "margin-bottom", syntax: "margin-bottom: <längd>;", example: "margin-bottom: 10px;" },
      ],
    },

    // 4b. MARGIN — exercise 2
    {
      kind: "assignment",
      title: "Övning: centrera",
      prompt:
        "Centrera .box horisontellt med margin auto. Ge den också en width på 200px.",
      html: `<div class="box">centrerad</div>`,
      startingCss: `.box {
  background: #818cf8;
  color: white;
  padding: 12px;
  /* Din width + margin */
}`,
      checks: [
        { selector: ".box", property: "width", expected: "200px" },
        { selector: ".box", property: "margin-left", expected: "auto" },
        { selector: ".box", property: "margin-right", expected: "auto" },
      ],
      legend: [
        { name: "margin: 0 auto", syntax: "margin: 0 auto;", example: "margin: 0 auto;", note: "Kräver att elementet har en width." },
        { name: "width", syntax: "width: <längd>;", example: "width: 200px;" },
      ],
    },

    // ────────────────────────────── 5. FINAL CHALLENGE (no legend, visual target)
    {
      kind: "assignment",
      title: "Slutövning: matcha målet",
      prompt:
        "I den nedre rutan ser du målet. Styla .card så att din version blir så lik som möjligt. Ingen hjälp denna gång — du har sett allt du behöver!",
      html: `<div class="card">OBS! Deadline är i morgon.</div>`,
      startingCss: `.card {
  background: lightblue;
  color: black;
  font-weight: 600;
  /* Bygg resten själv */
}`,
      targetCss: `.card {
  background: lightblue;
  color: black;
  font-weight: 600;
  width: 280px;
  padding: 20px;
  border: 3px solid darkred;
  margin-top: 24px;
  margin-bottom: 20px;
}`,
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
