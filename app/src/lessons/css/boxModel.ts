import type { Lesson } from "../../types";

export const boxModelLesson: Lesson = {
  id: "box-model",
  title: "The Box Model",
  summary: "Every element is a box — content, padding, border, and margin.",
  slides: [
    // 0. Intro overview
    {
      kind: "explanation",
      title: "The Box Model",
      intro: "Four parts to learn. Click to step through.",
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
              label: "content",
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
          narration: "Everything you see on a web page is a box. Every box has four parts.",
        },
        {
          narration: "1. Content — the text or image itself.",
          highlight: ["box"],
        },
        {
          narration: "2. Padding — air INSIDE the box. The box stays the same size; the content shrinks.",
          styles: { box: { padding: 20 } },
        },
        {
          narration: "3. Border — the edge itself.",
          styles: { box: { padding: 20, border: "4px solid #fbbf24" } },
        },
        {
          narration: "4. Margin — air OUTSIDE the box. Space the box reserves for itself — no other box can step in.",
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
          narration: "Next we'll look at how to change the size of the box.",
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
      title: "Part 1: Content — width & height",
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
          narration: "Every box has a size. You set it with `width` and `height`. The beige box around it is the parent.",
        },
        {
          narration: "`width: 240px` makes the box wider.",
          styles: { box: { width: 240 } },
        },
        {
          narration: "`height: 100px` makes it shorter.",
          styles: { box: { height: 100 } },
        },
        {
          narration: "Percentages also work — the size becomes RELATIVE to the parent. `width: 50%` = half of the parent.",
          styles: { box: { width: "50%" } },
        },
        {
          narration: "`width: 25%` — a quarter of the parent's width.",
          styles: { box: { width: "25%" } },
        },
        {
          narration: "`width: 100%` — the full parent width.",
          styles: { box: { width: "100%" } },
        },
        {
          narration: "`height: 70%` — 70% of the parent's height.",
          styles: { box: { height: "70%" } },
        },
        {
          narration: "`width: 100%; height: 100%;` — the box fills the parent entirely.",
          styles: { box: { width: "100%", height: "100%" } },
        },
      ],
    },

    // 1a. CONTENT — exercise 1
    {
      kind: "assignment",
      title: "Practice: set a size",
      prompt: "Make .box 250px wide and 120px tall.",
      html: `<div class="box">Hi</div>`,
      startingCss: `.box {\n  background: #c7d2fe;\n  /* Add width and height here */\n}`,
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
      title: "Practice: percentages",
      prompt: "Make .box 50% wide (half the parent). Height can be 80px.",
      html: `<div class="wrap"><div class="box">half</div></div>`,
      startingCss: `.wrap { background: #eef2ff; padding: 10px; }\n.box {\n  background: #818cf8;\n  color: white;\n  /* Your width + height */\n}`,
      checks: [
        { selector: ".box", property: "height", expected: "80px" },
      ],
      legend: [
        {
          name: "width (%)",
          syntax: "width: <percent>;",
          example: "width: 50%;",
          note: "Relative to the parent.",
        },
        { name: "height", syntax: "height: <length>;", example: "height: 80px;" },
      ],
    },

    // 2. PADDING — explanation
    {
      kind: "explanation",
      title: "Part 2: Padding — air inside",
      demo: [
        {
          id: "box",
          label: "Content",
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
          narration: "The blue pattern shows the content area.",
        },
        {
          narration: "`padding: 20px` — equal air on all four sides.",
          styles: { box: { padding: 20 } },
        },
        {
          narration: "`padding: 10px 40px` — TWO values: top/bottom, then left/right.",
          styles: { box: { padding: "10px 40px" } },
        },
        {
          narration: "`padding: 10px 20px 40px` — THREE values: top, left/right, bottom.",
          styles: { box: { padding: "10px 20px 40px" } },
        },
        {
          narration: "`padding: 10px 20px 40px 60px` — FOUR values go CLOCKWISE: top, right, bottom, left.",
          styles: { box: { padding: "10px 20px 40px 60px" } },
        },
        {
          narration: "`padding-top: 30px` — only the top.",
          styles: { box: { padding: 0, paddingTop: 30 } },
        },
        {
          narration: "`padding-left: 40px` — only the left.",
          styles: { box: { padding: 0, paddingLeft: 40 } },
        },
        {
          narration: "You can combine: here `padding-top: 10px` and `padding-left: 40px`.",
          styles: { box: { padding: 0, paddingTop: 10, paddingLeft: 40 } },
        },
      ],
    },

    // 2a. PADDING — exercise 1
    {
      kind: "assignment",
      title: "Practice: a bit of air",
      prompt: "Give .box 20px padding on all sides.",
      html: `<div class="box">Press here</div>`,
      startingCss: `.box {\n  display: inline-block;\n  background: #818cf8;\n  color: white;\n  /* Your padding */\n}`,
      checks: [
        { selector: ".box", property: "padding-top", expected: "20px" },
        { selector: ".box", property: "padding-right", expected: "20px" },
        { selector: ".box", property: "padding-bottom", expected: "20px" },
        { selector: ".box", property: "padding-left", expected: "20px" },
      ],
      legend: [
        {
          name: "padding (one value)",
          syntax: "padding: <length>;",
          example: "padding: 20px;",
          note: "The same on all sides.",
        },
      ],
    },

    // 2b. PADDING — exercise 2
    {
      kind: "assignment",
      title: "Practice: different sides",
      prompt: "Give .box 10px padding top/bottom and 30px left/right.",
      html: `<div class="box">Button</div>`,
      startingCss: `.box {\n  display: inline-block;\n  background: #6366f1;\n  color: white;\n  /* Your padding */\n}`,
      checks: [
        { selector: ".box", property: "padding-top", expected: "10px" },
        { selector: ".box", property: "padding-bottom", expected: "10px" },
        { selector: ".box", property: "padding-left", expected: "30px" },
        { selector: ".box", property: "padding-right", expected: "30px" },
      ],
      legend: [
        {
          name: "padding (two values)",
          syntax: "padding: <top/bottom> <left/right>;",
          example: "padding: 10px 30px;",
        },
        {
          name: "padding-left etc.",
          syntax: "padding-left: <length>;",
          example: "padding-left: 30px;",
        },
      ],
    },

    // 3. BORDER — explanation
    {
      kind: "explanation",
      title: "Part 3: Border — the edge",
      demo: [
        {
          id: "box",
          label: "Content",
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
          narration: "Border is the edge of the box. It has THREE parts: width, style, color.",
        },
        {
          narration: "`border: 2px solid red` — shorthand with all three on one line.",
          styles: { box: { border: "2px solid red" } },
        },
        {
          narration: "Style `solid` — a continuous line (the most common).",
          styles: { box: { border: "4px solid red" } },
        },
        {
          narration: "Style `dashed` — a dashed line.",
          styles: { box: { border: "4px dashed red" } },
        },
        {
          narration: "Style `dotted` — a dotted line.",
          styles: { box: { border: "4px dotted red" } },
        },
        {
          narration: "Style `double` — two parallel lines.",
          styles: { box: { border: "6px double red" } },
        },
        {
          narration: "Just one side: `border-top: 4px solid red`.",
          styles: { box: { border: "0 solid transparent", borderTop: "4px solid red" } },
        },
        {
          narration: "`border-bottom` — at the bottom.",
          styles: { box: { border: "0 solid transparent", borderBottom: "4px solid red" } },
        },
        {
          narration: "`border-left` and `border-right` work the same — left here.",
          styles: { box: { border: "0 solid transparent", borderLeft: "4px solid red" } },
        },
        {
          narration: "Combine several sides: top and bottom at once.",
          styles: {
            box: {
              border: "0 solid transparent",
              borderTop: "3px solid red",
              borderBottom: "3px solid red",
            },
          },
        },
        {
          narration: "Each part can also be styled separately:\nborder-width: 5px;\nborder-style: dotted;\nborder-color: red;",
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
      title: "Practice: a regular border",
      prompt: "Give .box a 3px solid blue border.",
      html: `<div class="box">Frame me</div>`,
      startingCss: `.box {\n  display: inline-block;\n  padding: 16px;\n  background: white;\n  color: black;\n  /* Your border */\n}`,
      checks: [
        { selector: ".box", property: "border-top-width", expected: "3px" },
        { selector: ".box", property: "border-top-style", expected: "solid" },
        { selector: ".box", property: "border-top-color", expected: "rgb(0, 0, 255)" },
      ],
      legend: [
        {
          name: "border (shorthand)",
          syntax: "border: <width> <style> <color>;",
          example: "border: 3px solid blue;",
        },
      ],
    },

    // 3b. BORDER — exercise 2
    {
      kind: "assignment",
      title: "Practice: only one side",
      prompt: "Give .box only a BOTTOM border: 2px dashed gray.",
      html: `<div class="box">Underlined</div>`,
      startingCss: `.box {\n  display: inline-block;\n  padding: 8px 4px;\n  background: white;\n  color: black;\n  /* Your border-bottom */\n}`,
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
          name: "border-top / -left / -right",
          syntax: "border-<side>: …;",
          example: "border-top: 1px solid black;",
        },
      ],
    },

    // 4. MARGIN — explanation
    {
      kind: "explanation",
      title: "Part 4: Margin — air outside",
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
              label: "Box",
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
              label: "Box",
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
              label: "Box",
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
              label: "Box",
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
          narration: "Margin is air OUTSIDE the box. The red box is ours — see how it pushes the gray ones away.",
        },
        {
          narration: "`margin: 20px` — the same on all four sides.",
          styles: { red: { margin: 20 } },
        },
        {
          narration: "`margin: 10px 40px` — TWO values: top/bottom, then left/right.",
          styles: { red: { margin: "10px 40px" } },
        },
        {
          narration: "`margin: 10px 20px 40px` — THREE values: top, left/right, bottom.",
          styles: { red: { margin: "10px 20px 40px" } },
        },
        {
          narration: "`margin: 10px 20px 40px 60px` — FOUR values CLOCKWISE: top, right, bottom, left.",
          styles: { red: { margin: "10px 20px 40px 60px" } },
        },
        {
          narration: "`margin-top: 30px` — only the top.",
          styles: { red: { margin: 0, marginTop: 30 } },
        },
        {
          narration: "`margin-bottom: 30px` — only the bottom.",
          styles: { red: { margin: 0, marginBottom: 30 } },
        },
        {
          narration: "`margin-right: 40px` — pushes the right neighbor.",
          styles: { red: { margin: 0, marginRight: 40 } },
        },
        {
          narration: "Special trick: `margin: 0 auto` centers the box horizontally (the others are hidden for clarity).",
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
      title: "Practice: spacing",
      prompt: "Give .box margin-top 30px and margin-bottom 10px.",
      html: `<div class="box">first</div><div class="box">second</div>`,
      startingCss: `.box {\n  background: #c7d2fe;\n  padding: 10px;\n  /* Your margin */\n}`,
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
      title: "Practice: center",
      prompt: "Center .box horizontally with margin auto. Also give it a width of 200px.",
      html: `<div class="box">centered</div>`,
      startingCss: `.box {\n  background: #818cf8;\n  color: white;\n  padding: 12px;\n  /* Your width + margin */\n}`,
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
          note: "Requires the element to have a width.",
        },
        { name: "width", syntax: "width: <length>;", example: "width: 200px;" },
      ],
    },

    // 5. FINAL CHALLENGE
    {
      kind: "assignment",
      title: "Final: match the goal",
      prompt: "The lower preview shows the goal. Style .card so your version is as close as possible. No legend this time — you've seen everything you need!",
      html: `<div class="card">NOTE! Deadline is tomorrow.</div>`,
      startingCss: `.card {\n  background: lightblue;\n  color: black;\n  font-weight: 600;\n  /* Build the rest yourself */\n}`,
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
