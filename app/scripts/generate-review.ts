/**
 * Generates two standalone HTML review files at the project root:
 *   - course-review-docs.html     (CLAUDE.md, AUTHORING.md, CODEBASE_MAP.md, SLIDE_UI.md)
 *   - course-review-lessons.html  (every workshop / exercise / assignment, grouped)
 *
 * Both files share the same chrome, CSS, and feedback storage (localStorage,
 * keyed `fr:<itemId>`), so notes survive regeneration as long as item IDs
 * stay stable. Item IDs are lesson.id for lessons; for topic-level long-form,
 * we use synthetic ids `wt-<topicId>-<index>` / `ch-<topicId>-<index>`.
 *
 * Run from the app/ directory:  npx tsx scripts/generate-review.ts
 */

import { COURSES } from "../src/lessons";
import type {
  Lesson,
  JsWorkshopSlide,
  ExerciseSlide,
  AssignmentSlide,
  ExplanationSlide,
  Loc,
} from "../src/types";
import * as fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..", "..");

// ─── helpers ──────────────────────────────────────────────────────
// `Loc` is now plain `string` (Swedish was retired). The `en()` alias is
// kept around for readability so the extraction code reads "extract the
// English value" instead of being a bare cast.
const en = (loc: Loc): string => loc;
const TIER_RE = /^(Workshop|Lab|Walkthrough|Challenge):\s*/i;
const stripTier = (s: string) => s.replace(TIER_RE, "");
const stripEm = (s: string) => {
  const i = s.indexOf("—");
  return i > 0 ? s.slice(0, i).trim() : s;
};
const titleCase = (s: string) =>
  s.replace(/\b\w/g, (c) => c.toUpperCase());

// ─── shapes ───────────────────────────────────────────────────────
type WorkshopOut = {
  title: string;
  designNote: string | null;
  steps: { i: string; c: string[]; anyValues: boolean }[];
};
type ExerciseOut = {
  title: string;
  prompt: string;
  designNote: string | null;
  anyValues: boolean;
  tests: string[];
};
type LessonOut = {
  title: string;
  slideTypes: string[];
  explanationCount: number;
  customScenes: string[];
  workshops: WorkshopOut[];
  exercises: ExerciseOut[];
};

type NavItem = {
  id: string;
  type: "lesson" | "doc";
  title: string;
  file?: string;
  src?: string;
  variant?: "walkthrough" | "challenge";
};
type NavTopic = {
  id: string;
  label: string;
  type: "topic";
  items: NavItem[];
};
type NavGroup = {
  id: string;
  label: string;
  type: "group";
  items: (NavTopic | NavItem)[];
};

// ─── extract ──────────────────────────────────────────────────────
function extractWorkshop(s: JsWorkshopSlide): WorkshopOut {
  return {
    title: en(s.title),
    designNote: s.designNote ?? null,
    steps: s.steps.map((step) => ({
      i: en(step.instruction),
      c: step.checks.map((ck) => en(ck.message)),
      anyValues: step.anyValues === true,
    })),
  };
}

function extractExercise(s: ExerciseSlide): ExerciseOut {
  return {
    title: en(s.title),
    prompt: en(s.prompt),
    designNote: s.designNote ?? null,
    anyValues: s.anyValues === true,
    tests: s.tests.map((t) => en(t.label)),
  };
}

function extractAssignment(s: AssignmentSlide): ExerciseOut {
  return {
    title: en(s.title),
    prompt: en(s.prompt),
    designNote: null,
    anyValues: false,
    tests: s.checks.map((c) => {
      const tol = c.tolerance != null ? ` (tolerance: ${c.tolerance})` : "";
      return `${c.property}: ${c.expected}${tol}`;
    }),
  };
}

function extractLesson(l: Lesson): LessonOut {
  const slideTypes = Array.from(new Set(l.slides.map((s) => s.kind)));
  const workshops: WorkshopOut[] = [];
  const exercises: ExerciseOut[] = [];
  const explanations: ExplanationSlide[] = [];

  for (const slide of l.slides) {
    if (slide.kind === "js-workshop") {
      workshops.push(extractWorkshop(slide));
    } else if (slide.kind === "exercise") {
      exercises.push(extractExercise(slide));
    } else if (slide.kind === "assignment") {
      exercises.push(extractAssignment(slide));
    } else if (slide.kind === "explanation") {
      explanations.push(slide);
    }
  }

  const customScenes = Array.from(
    new Set(
      explanations
        .map((e) => e.customScene)
        .filter((s): s is string => typeof s === "string"),
    ),
  );

  return {
    title: en(l.title),
    slideTypes,
    explanationCount: explanations.length,
    customScenes,
    workshops,
    exercises,
  };
}

function extractWalkthrough(wt: JsWorkshopSlide): LessonOut {
  return {
    title: en(wt.title),
    slideTypes: ["js-workshop"],
    explanationCount: 0,
    customScenes: [],
    workshops: [extractWorkshop(wt)],
    exercises: [],
  };
}

function extractChallenge(ch: ExerciseSlide): LessonOut {
  return {
    title: en(ch.title),
    slideTypes: ["exercise"],
    explanationCount: 0,
    customScenes: [],
    workshops: [],
    exercises: [extractExercise(ch)],
  };
}

// ─── build lessons data + nav ─────────────────────────────────────
function buildLessons(): { LD: Record<string, LessonOut>; NAV: NavGroup[] } {
  const LD: Record<string, LessonOut> = {};
  const NAV: NavGroup[] = [];

  const jsCourse = COURSES.find((c) => c.id === "javascript");
  if (jsCourse?.topics) {
    const groupItems: NavTopic[] = [];
    for (const topic of jsCourse.topics) {
      const items: NavItem[] = [];
      for (const lesson of topic.lessons) {
        LD[lesson.id] = extractLesson(lesson);
        items.push({
          id: lesson.id,
          type: "lesson",
          title: stripEm(en(lesson.title)),
          file: lesson.id,
        });
      }
      (topic.walkthroughs ?? []).forEach((wt, i) => {
        const id = `wt-${topic.id}-${i}`;
        LD[id] = extractWalkthrough(wt);
        items.push({
          id,
          type: "lesson",
          title: `Walkthrough · ${titleCase(stripTier(en(wt.title)))}`,
          file: id,
          variant: "walkthrough",
        });
      });
      (topic.challenges ?? []).forEach((ch, i) => {
        const id = `ch-${topic.id}-${i}`;
        LD[id] = extractChallenge(ch);
        items.push({
          id,
          type: "lesson",
          title: `Challenge · ${titleCase(stripTier(en(ch.title)))}`,
          file: id,
          variant: "challenge",
        });
      });
      groupItems.push({
        id: `tp-${topic.id}`,
        label: en(topic.title),
        type: "topic",
        items,
      });
    }
    NAV.push({ id: "js", label: "JavaScript", type: "group", items: groupItems });
  }

  const cssCourse = COURSES.find((c) => c.id === "css");
  if (cssCourse?.lessons?.length) {
    const cssItems: NavItem[] = [];
    for (const lesson of cssCourse.lessons) {
      LD[lesson.id] = extractLesson(lesson);
      cssItems.push({
        id: lesson.id,
        type: "lesson",
        title: en(lesson.title),
        file: lesson.id,
      });
    }
    NAV.push({
      id: "css",
      label: "CSS",
      type: "group",
      items: [{ id: "tp-css", label: "Box Model", type: "topic", items: cssItems }],
    });
  }

  return { LD, NAV };
}

// ─── docs ─────────────────────────────────────────────────────────
type Doc = { id: string; title: string; content: string };

function buildDocs(): Doc[] {
  const list = [
    { id: "doc-claude", title: "CLAUDE.md", file: "CLAUDE.md" },
    { id: "doc-authoring", title: "AUTHORING.md", file: "AUTHORING.md" },
    { id: "doc-codebase", title: "CODEBASE_MAP.md", file: "CODEBASE_MAP.md" },
    { id: "doc-slideui", title: "SLIDE_UI.md", file: "SLIDE_UI.md" },
  ];
  return list.map((d) => ({
    id: d.id,
    title: d.title,
    content: fs.readFileSync(path.join(ROOT, d.file), "utf8"),
  }));
}

// ─── shared HTML chunks ───────────────────────────────────────────
const HEAD_AND_STYLES = `<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&family=Fira+Code:wght@400;500&display=swap" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/marked@9/marked.min.js"></script>
<style>
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{
  --bg:#13120f;--bg-sidebar:#0f0e0c;--bg-card:#1c1b17;--bg-card-alt:#201f1a;
  --border:#2e2b25;--border-mid:#3d3a33;
  --text:#e8e2d4;--text-muted:#a09890;--text-dim:#5c564e;
  --amber:#d4913a;--amber-soft:#e8b460;--amber-bg:#2a2010;--amber-border:#4a3820;
  --blue:#5b8db5;--blue-bg:#0e1f2e;--blue-border:#1a3a5c;
  --rust:#c47b50;--rust-bg:#2a1508;--rust-border:#4a2510;
  --green:#6ea86e;--green-bg:#102010;--check:#5ea870;
}
html,body{height:100%;overflow:hidden}
body{font-family:'DM Sans',sans-serif;background:var(--bg);color:var(--text);display:flex;flex-direction:column}

#hdr{height:48px;background:var(--bg-sidebar);border-bottom:1px solid var(--border);display:flex;align-items:stretch;flex-shrink:0;z-index:10}
#hdr-logo{width:260px;flex-shrink:0;padding:0 16px;border-right:1px solid var(--border);display:flex;flex-direction:column;justify-content:center;gap:2px}
#hdr-logo .ey{font-size:9px;letter-spacing:.12em;text-transform:uppercase;color:var(--amber);font-weight:500}
#hdr-logo .ti{font-family:'Libre Baskerville',serif;font-size:14px;color:var(--text)}
#hdr-tabs{display:flex;align-items:center;gap:4px;padding:0 18px;border-right:1px solid var(--border)}
#hdr-tabs a{font-size:12px;color:var(--text-muted);text-decoration:none;padding:5px 12px;border-radius:4px;transition:all .12s;border:1px solid transparent}
#hdr-tabs a:hover{color:var(--text);background:rgba(255,255,255,.03)}
#hdr-tabs a.cur{color:var(--amber-soft);background:var(--amber-bg);border-color:var(--amber-border)}
#hdr-meta{display:flex;align-items:center;padding:0 20px;margin-left:auto;font-size:12px;color:var(--text-muted);gap:10px}
#hdr-meta b{color:var(--amber-soft);font-weight:600}
.export-btn{background:none;border:1px solid var(--border-mid);color:var(--text-muted);padding:5px 11px;border-radius:4px;font-size:11px;font-family:'DM Sans',sans-serif;cursor:pointer;transition:all .15s;font-weight:500}
.export-btn:hover{color:var(--amber-soft);border-color:var(--amber-border);background:var(--amber-bg)}
.export-btn.copied{color:#1a0e00;background:var(--amber);border-color:var(--amber)}
.clear-all-btn:hover{color:#e89090;border-color:#6a2828;background:rgba(122,40,40,.18)}

#app{display:flex;flex:1;overflow:hidden}
#sidebar{width:260px;flex-shrink:0;background:var(--bg-sidebar);border-right:1px solid var(--border);overflow-y:auto;overflow-x:hidden;padding-bottom:40px}
#sidebar::-webkit-scrollbar{width:4px}
#sidebar::-webkit-scrollbar-track{background:transparent}
#sidebar::-webkit-scrollbar-thumb{background:var(--border-mid);border-radius:2px}

.ng{margin-top:4px}
.ng-btn{width:100%;background:none;border:none;cursor:pointer;padding:9px 14px 6px;display:flex;align-items:center;gap:7px;color:var(--text-muted);font-size:10px;font-weight:500;letter-spacing:.1em;text-transform:uppercase;font-family:'DM Sans',sans-serif;transition:color .15s}
.ng-btn:hover{color:var(--text)}
.ng-btn .arr{font-size:7px;transition:transform .2s;display:inline-block;margin-right:1px}
.ng.closed .arr{transform:rotate(-90deg)}
.ng.closed .ng-body{display:none}

.nt{margin-top:1px}
.nt-lbl{padding:4px 14px 3px 22px;font-size:10px;letter-spacing:.08em;text-transform:uppercase;color:var(--text-dim);font-weight:500;cursor:pointer;display:flex;align-items:center;gap:5px;user-select:none}
.nt-lbl .arr{font-size:7px;transition:transform .15s;color:var(--text-dim)}
.nt.closed .arr{transform:rotate(-90deg)}
.nt.closed .nt-body{display:none}

.ni{display:flex;align-items:center;padding:5px 12px 5px 28px;cursor:pointer;font-size:12.5px;color:var(--text-muted);border-left:2px solid transparent;transition:all .12s;gap:5px;line-height:1.3}
.ni:hover{color:var(--text);background:rgba(255,255,255,.03)}
.ni.active{color:var(--amber-soft);border-left-color:var(--amber);background:var(--amber-bg)}
.ni .fdot{width:5px;height:5px;border-radius:50%;background:var(--amber);flex-shrink:0;margin-left:auto;display:none}
.ni.has-note .fdot{display:block}
.ni .vbadge{font-size:9px;padding:1px 5px;border-radius:3px;font-weight:500;flex-shrink:0}
.vbadge-w{background:var(--green-bg);color:var(--green)}
.vbadge-c{background:var(--rust-bg);color:var(--rust)}

#content{flex:1;overflow-y:auto;overflow-x:hidden;padding:40px 56px;scroll-behavior:smooth}
#content::-webkit-scrollbar{width:6px}
#content::-webkit-scrollbar-track{background:transparent}
#content::-webkit-scrollbar-thumb{background:var(--border-mid);border-radius:3px}
#ci{max-width:860px;margin:0 auto}
body.lessons #content{padding:40px 36px}
body.lessons #ci{max-width:none;margin:0}

#empty{height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;color:var(--text-dim)}
#empty .big{font-family:'Libre Baskerville',serif;font-size:20px;color:var(--text-muted)}
#empty .sm{font-size:13px}

.c-ey{font-size:10px;letter-spacing:.12em;text-transform:uppercase;color:var(--amber);font-weight:500;margin-bottom:8px}
.c-title{font-family:'Libre Baskerville',serif;font-size:26px;font-weight:700;color:var(--text);line-height:1.25;margin-bottom:14px}
.c-hdr{margin-bottom:28px}
.badges{display:flex;flex-wrap:wrap;gap:6px;margin-top:8px}
.badge{font-size:10px;font-weight:500;padding:3px 9px;border-radius:4px;letter-spacing:.04em}
.b-expl{background:#1e1e1e;color:var(--text-muted);border:1px solid var(--border-mid)}
.b-wksh{background:var(--blue-bg);color:var(--blue);border:1px solid var(--blue-border)}
.b-exer{background:var(--rust-bg);color:var(--rust);border:1px solid var(--rust-border)}
.b-chip{background:#1a1a2e;color:#8080d4;border:1px solid #2a2a4a}
.b-type{background:#2e1a2e;color:#c878c8;border:1px solid #4a2a4a}
.b-scene{background:#0e1e20;color:#6ebaba;border:1px solid #1a3a3e}
.b-assign{background:#1e1a10;color:#a89060;border:1px solid #3a3020}

.design-note{background:var(--amber-bg);border:1px solid var(--amber-border);border-left:3px solid var(--amber);padding:11px 15px;border-radius:0 6px 6px 0;font-size:12.5px;color:#c8a870;line-height:1.6;margin-bottom:24px;font-style:italic}
.design-note::before{content:"Design note";display:block;font-style:normal;font-size:9px;font-weight:600;letter-spacing:.1em;text-transform:uppercase;color:var(--amber);margin-bottom:5px}
.dn-wrap{padding:13px 15px;border-bottom:1px solid var(--border)}
.dn-wrap .design-note{margin-bottom:0}

/* ─── Tabs ────────────────────────────────────────────────── */
.tabs{display:flex;gap:2px;border-bottom:1px solid var(--border);margin-bottom:20px}
.tab{background:none;border:none;font-family:'DM Sans',sans-serif;color:var(--text-muted);font-size:12px;font-weight:500;padding:9px 16px;cursor:pointer;border-bottom:2px solid transparent;margin-bottom:-1px;display:flex;align-items:center;gap:7px;transition:color .12s}
.tab:hover{color:var(--text)}
.tab.active{color:var(--amber-soft);border-bottom-color:var(--amber)}
.tab .count{font-size:10px;background:#1e1e1e;padding:1px 7px;border-radius:8px;color:var(--text-muted);border:1px solid var(--border-mid);font-weight:500;line-height:1.4}
.tab.active .count{background:var(--amber-bg);color:var(--amber-soft);border-color:var(--amber-border)}
.tab-panel{display:none}
.tab-panel.active{display:block}
.empty-tab{padding:48px 20px;text-align:center;color:var(--text-dim);font-style:italic;font-size:13px;border:1px dashed var(--border);border-radius:8px}

/* ─── Cards grid ─────────────────────────────────────────── */
.cards-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:14px;align-items:start}
@media (max-width:900px){.cards-grid{grid-template-columns:1fr}}

/* ─── Per-card feedback ──────────────────────────────────── */
.card-fb{padding:11px 15px 13px;background:rgba(212,145,58,.04);border-top:1px solid var(--border)}
.card-fb-ta{width:100%;min-height:54px;background:var(--amber-bg);border:1px solid var(--amber-border);border-radius:5px;padding:8px 11px;font-family:'Libre Baskerville',serif;font-size:12px;color:var(--text);resize:vertical;outline:none;line-height:1.6;transition:border-color .15s}
.card-fb-ta::placeholder{color:var(--text-dim);font-style:italic}
.card-fb-ta:focus{border-color:var(--amber)}
.card-fb-bar{display:flex;align-items:center;gap:8px;margin-top:6px;min-height:22px}
.card-fb-clr{background:none;border:1px solid var(--border-mid);color:var(--text-dim);width:22px;height:22px;border-radius:4px;font-size:14px;line-height:1;cursor:pointer;padding:0;display:flex;align-items:center;justify-content:center;transition:all .12s;font-family:'DM Sans',sans-serif}
.card-fb-clr:hover{color:#e89090;border-color:#6a2828;background:rgba(122,40,40,.18)}
.card-fb-st{font-size:10px;color:var(--text-dim);transition:all .25s;margin-left:auto;min-height:13px}
.card-fb-st.ok{color:var(--check)}

.scenes{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:20px}
.scene-tag{font-size:11px;background:#0e1e20;color:#6ebaba;border:1px solid #1a3a3e;padding:3px 10px;border-radius:4px;font-family:'Fira Code',monospace}

.sec-hd{font-family:'Libre Baskerville',serif;font-size:10px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--text-muted);padding-bottom:8px;border-bottom:1px solid var(--border);margin-bottom:16px;margin-top:36px}

.wk-block{margin-bottom:20px;background:var(--bg-card);border:1px solid var(--border);border-radius:8px;overflow:hidden}
.wk-title{background:var(--blue-bg);border-bottom:1px solid var(--blue-border);padding:9px 15px;font-size:13px;font-weight:500;color:var(--blue);display:flex;align-items:center;gap:8px}
.wk-title::before{content:"WORKSHOP";font-size:8px;letter-spacing:.12em;background:rgba(91,141,181,.18);padding:2px 7px;border-radius:3px}
.step-blk{padding:13px 15px;border-bottom:1px solid var(--border)}
.step-blk:last-child{border-bottom:none}
.step-num{font-size:9px;font-weight:600;letter-spacing:.1em;text-transform:uppercase;color:var(--text-dim);margin-bottom:5px}
.step-instr{font-size:13px;color:var(--text);line-height:1.65;margin-bottom:9px}
.step-instr code,.check-msg code,.test-lbl code,.chk code{font-family:'Fira Code',monospace;font-size:11.5px;background:rgba(255,255,255,.07);padding:1px 5px;border-radius:3px;color:#d0c8b0}
.checks{list-style:none;display:flex;flex-direction:column;gap:4px}
.chk{font-size:12px;color:var(--text-muted);line-height:1.5;display:flex;gap:8px;align-items:flex-start}
.chk::before{content:"\\2713";color:var(--check);font-size:11px;flex-shrink:0;margin-top:1px}

.ex-block{margin-bottom:20px;background:var(--bg-card);border:1px solid var(--border);border-radius:8px;overflow:hidden}
.ex-title{background:var(--rust-bg);border-bottom:1px solid var(--rust-border);padding:9px 15px;font-size:13px;font-weight:500;color:var(--rust);display:flex;align-items:center;gap:8px}
.ex-title::before{content:"EXERCISE";font-size:8px;letter-spacing:.12em;background:rgba(196,123,80,.15);padding:2px 7px;border-radius:3px}
.values-pill{font-size:8px;letter-spacing:.12em;padding:2px 7px;border-radius:3px;font-weight:600}
.values-pill.exact{background:var(--amber-bg);color:var(--amber-soft);border:1px solid var(--amber-border)}
.values-pill.any{background:rgba(74,154,138,.15);color:var(--teal);border:1px solid rgba(74,154,138,.35)}
.ex-title .values-pill{margin-left:auto}
.step-num-row{display:flex;align-items:center;gap:8px;margin-bottom:5px}
.step-num-row .step-num{margin-bottom:0}
.ex-body{padding:13px 15px}
.ex-prompt{font-size:13px;color:var(--text-muted);line-height:1.6;margin-bottom:11px;font-style:italic}
.tests{list-style:none;display:flex;flex-direction:column;gap:4px}
.test-lbl{font-size:12px;color:var(--text-muted);line-height:1.5;display:flex;gap:8px;align-items:flex-start}
.test-lbl::before{content:"\\25FB";color:var(--text-dim);font-size:10px;flex-shrink:0;margin-top:1px}

.fb-section{margin-top:48px;padding-top:28px;border-top:1px solid var(--border)}
.fb-label{font-family:'Libre Baskerville',serif;font-size:13px;font-weight:700;color:var(--amber-soft);margin-bottom:9px;display:flex;align-items:center;gap:7px}
.fb-label::before{content:"\\270F";font-size:14px}
textarea.fb-ta{width:100%;min-height:96px;background:var(--amber-bg);border:1px solid var(--amber-border);border-radius:6px;padding:11px 13px;font-family:'Libre Baskerville',serif;font-size:13px;color:var(--text);resize:vertical;outline:none;line-height:1.7;transition:border-color .15s}
textarea.fb-ta::placeholder{color:var(--text-dim);font-style:italic}
textarea.fb-ta:focus{border-color:var(--amber)}
.fb-footer{display:flex;align-items:center;gap:10px;margin-top:9px}
.btn-save{background:var(--amber);color:#1a0e00;border:none;padding:7px 18px;border-radius:5px;font-size:12px;font-weight:600;font-family:'DM Sans',sans-serif;cursor:pointer;transition:all .15s}
.btn-save:hover{background:var(--amber-soft)}
.btn-save:active{transform:scale(.97)}
.btn-clr{background:none;border:1px solid var(--border-mid);color:var(--text-dim);padding:7px 13px;border-radius:5px;font-size:12px;font-family:'DM Sans',sans-serif;cursor:pointer;transition:all .15s}
.btn-clr:hover{color:var(--text-muted);border-color:var(--text-dim)}
.save-st{font-size:11px;color:var(--text-dim);margin-left:auto;transition:all .3s}
.save-st.ok{color:var(--check)}

.md{font-size:14px;line-height:1.8;color:var(--text-muted)}
.md h1{font-family:'Libre Baskerville',serif;font-size:26px;font-weight:700;color:var(--text);margin-bottom:20px;line-height:1.25}
.md h2{font-family:'Libre Baskerville',serif;font-size:18px;font-weight:700;color:var(--text);margin-top:36px;margin-bottom:12px;padding-bottom:8px;border-bottom:1px solid var(--border)}
.md h3{font-family:'Libre Baskerville',serif;font-size:15px;font-weight:700;color:var(--text);margin-top:24px;margin-bottom:8px}
.md h4{font-size:11px;font-weight:600;color:var(--amber-soft);margin-top:20px;margin-bottom:6px;letter-spacing:.06em;text-transform:uppercase}
.md p{margin-bottom:14px}
.md a{color:var(--amber-soft);text-underline-offset:2px}
.md a:hover{color:var(--amber)}
.md code{font-family:'Fira Code',monospace;font-size:12px;background:rgba(255,255,255,.08);padding:2px 6px;border-radius:3px;color:#d0c8b0}
.md pre{background:#0e0d0b;border:1px solid var(--border-mid);border-radius:6px;padding:16px;overflow-x:auto;margin:14px 0}
.md pre code{background:none;padding:0;font-size:12.5px;color:#c8c0a8}
.md ul,.md ol{padding-left:20px;margin-bottom:14px}
.md li{margin-bottom:5px}
.md strong{color:var(--text);font-weight:600}
.md em{color:#b8b0a0}
.md hr{border:none;border-top:1px solid var(--border-mid);margin:28px 0}
.md blockquote{border-left:3px solid var(--amber-border);padding:8px 16px;background:var(--amber-bg);margin:14px 0;border-radius:0 4px 4px 0}
.md table{width:100%;border-collapse:collapse;margin:16px 0;font-size:13px}
.md th{background:var(--bg-card-alt);color:var(--text);padding:8px 12px;text-align:left;border:1px solid var(--border-mid);font-weight:600;font-size:11px;letter-spacing:.06em;text-transform:uppercase}
.md td{padding:8px 12px;border:1px solid var(--border);color:var(--text-muted)}
.md tr:nth-child(even) td{background:rgba(255,255,255,.02)}

@keyframes fadeUp{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}
.fadein{animation:fadeUp .18s ease-out}
</style>`;

const APP_JS = `
const $ = id => document.getElementById(id);
const pi = s => (window.marked && marked.parseInline) ? marked.parseInline(s) : s;

const noteKey = id => 'fr:' + id;
const getNote = id => localStorage.getItem(noteKey(id)) || '';
const saveNote = (id, txt) => localStorage.setItem(noteKey(id), txt);
const delNote = id => localStorage.removeItem(noteKey(id));

function hasAnyNote(itemId) {
  const prefix = 'fr:' + itemId;
  for (let i = 0; i < localStorage.length; i++) {
    const k = localStorage.key(i);
    if (!k) continue;
    if (k === prefix) {
      if (localStorage.getItem(k)) return true;
    } else if (k.indexOf(prefix + ':') === 0) {
      if (localStorage.getItem(k)) return true;
    }
  }
  return false;
}

function allIds() {
  const ids = new Set();
  function walk(items) {
    for (const it of items) {
      if (it.type === 'topic') walk(it.items);
      else ids.add(it.id);
    }
  }
  for (const g of NAV) walk(g.items);
  return ids;
}

function noteCountForThisFile() {
  const ids = allIds();
  let n = 0;
  ids.forEach(id => { if (hasAnyNote(id)) n++; });
  return n;
}

const TAB_KEY = 'cul:reviewtab';
const getSavedTab = () => localStorage.getItem(TAB_KEY) || 'workshops';
const setSavedTab = (t) => localStorage.setItem(TAB_KEY, t);

let current = null;

function buildNav() {
  const root = $('nav-root');
  root.innerHTML = NAV.map(buildGroup).join('');
  root.addEventListener('click', onNavClick);
}

function buildGroup(g) {
  const body = g.items.map(it => it.type === 'topic' ? buildTopic(it) : buildItem(it)).join('');
  return '<div class="ng" data-gid="' + g.id + '"><button class="ng-btn"><span class="arr">\\u25BE</span>' + g.label + '</button><div class="ng-body">' + body + '</div></div>';
}

function buildTopic(t) {
  const body = t.items.map(buildItem).join('');
  return '<div class="nt" data-tid="' + t.id + '"><div class="nt-lbl"><span class="arr">\\u25BE</span>' + t.label + '</div><div class="nt-body">' + body + '</div></div>';
}

function buildItem(it) {
  const vbadge = it.variant === 'walkthrough' ? '<span class="vbadge vbadge-w">W</span>'
               : it.variant === 'challenge'   ? '<span class="vbadge vbadge-c">C</span>'
               : '';
  const hasNote = getNote(it.id) ? 'has-note' : '';
  return '<div class="ni ' + hasNote + '" data-iid="' + it.id + '">' + vbadge + it.title + '<span class="fdot"></span></div>';
}

function onNavClick(e) {
  const gb = e.target.closest('.ng-btn');
  if (gb) { gb.closest('.ng').classList.toggle('closed'); return; }
  const tl = e.target.closest('.nt-lbl');
  if (tl) { tl.closest('.nt').classList.toggle('closed'); return; }
  const item = e.target.closest('.ni');
  if (item) loadById(item.dataset.iid);
}

function setActive(id) {
  document.querySelectorAll('.ni').forEach(el => el.classList.toggle('active', el.dataset.iid === id));
}

function refreshDots() {
  document.querySelectorAll('.ni').forEach(el => {
    el.classList.toggle('has-note', hasAnyNote(el.dataset.iid));
  });
  $('note-count').textContent = noteCountForThisFile();
}

function findItem(id) {
  for (const g of NAV) {
    for (const it of g.items) {
      if (it.type === 'topic') {
        for (const li of it.items) if (li.id === id) return li;
      } else if (it.id === id) return it;
    }
  }
  return null;
}

function loadById(id) {
  const item = findItem(id);
  if (!item) return;
  current = id;
  setActive(id);
  const ci = $('ci');
  ci.innerHTML = item.type === 'doc' ? renderDoc(item) : renderLesson(item);
  ci.classList.remove('fadein');
  void ci.offsetWidth;
  ci.classList.add('fadein');
  $('content').scrollTop = 0;
  if (item.type === 'doc') {
    attachFeedback(id);
  } else {
    initLessonTabs(item.id);
    attachCardFeedback();
  }
}

function renderDoc(item) {
  const raw = ($(item.src) && $(item.src).textContent) || '';
  const html = marked.parse(raw);
  return '<div class="c-hdr"><div class="c-ey">Documentation</div><div class="c-title">' + item.title + '</div></div><div class="md">' + html + '</div>' + feedbackSection(item.id);
}

function renderLesson(item) {
  const d = LD[item.file];
  if (!d) return '<p>Data not found for ' + item.file + '.</p>';

  let topicLabel = 'JavaScript';
  for (const g of NAV) {
    for (const it of g.items) {
      if (it.type === 'topic') {
        for (const li of it.items) {
          if (li.id === item.id) { topicLabel = g.label + ' · ' + it.label; break; }
        }
      }
    }
  }

  const bMap = {
    'explanation':'b-expl','js-workshop':'b-wksh','exercise':'b-exer',
    'js-chip-assignment':'b-chip','js-typed-assignment':'b-type',
    'assignment':'b-assign','js-assignment':'b-assign'
  };
  const bLabel = {
    'explanation':'Explanation \\u00D7' + d.explanationCount,
    'js-workshop':'Workshop \\u00D7' + d.workshops.length,
    'exercise':'Exercise \\u00D7' + d.exercises.length,
    'js-chip-assignment':'Chip puzzle',
    'js-typed-assignment':'Typed assignment',
    'assignment':'Assignment \\u00D7' + d.exercises.length,
    'js-assignment':'JS Assignment'
  };

  const badges = d.slideTypes.map(t => '<span class="badge ' + (bMap[t] || 'b-expl') + '">' + (bLabel[t] || t) + '</span>').join('');

  const scenes = d.customScenes && d.customScenes.length
    ? '<div class="scenes">' + d.customScenes.map(s => '<span class="scene-tag">' + s + '</span>').join('') + '</div>'
    : '';

  const exLabel = d.slideTypes.indexOf('assignment') !== -1 ? 'Assignments' : 'Exercises';

  const tabs = '<div class="tabs" id="lesson-tabs">'
    + '<button class="tab" data-tab="workshops">Workshops <span class="count">' + d.workshops.length + '</span></button>'
    + '<button class="tab" data-tab="exercises">' + exLabel + ' <span class="count">' + d.exercises.length + '</span></button>'
    + '</div>';

  const wkPanel = d.workshops.length
    ? '<div class="cards-grid">' + d.workshops.map((w, i) => renderWorkshop(w, item.id, i)).join('') + '</div>'
    : '<div class="empty-tab">No workshops in this lesson.</div>';

  const exPanel = d.exercises.length
    ? '<div class="cards-grid">' + d.exercises.map((e, i) => renderExercise(e, item.id, i)).join('') + '</div>'
    : '<div class="empty-tab">No ' + exLabel.toLowerCase() + ' in this lesson.</div>';

  const panels = '<div class="tab-panel" data-panel="workshops">' + wkPanel + '</div>'
    + '<div class="tab-panel" data-panel="exercises">' + exPanel + '</div>';

  return '<div class="c-hdr"><div class="c-ey">' + topicLabel + '</div><div class="c-title">' + d.title + '</div><div class="badges">' + badges + '</div></div>' + scenes + tabs + panels;
}

function renderDesignNote(text) {
  return text ? '<div class="design-note dn-inline">' + text + '</div>' : '';
}

function valuesPill(anyValues) {
  return anyValues
    ? '<span class="values-pill any">ANY VALUES</span>'
    : '<span class="values-pill exact">EXACT VALUES</span>';
}

function renderWorkshop(w, lessonId, idx) {
  const cardId = lessonId + ':wk:' + idx;
  const steps = w.steps.map((s, i) =>
    '<div class="step-blk">'
    + '<div class="step-num-row"><div class="step-num">Step ' + (i + 1) + '</div>' + valuesPill(s.anyValues) + '</div>'
    + '<div class="step-instr">' + pi(s.i) + '</div>'
    + '<ul class="checks">' + s.c.map(c => '<li class="chk">' + pi(c) + '</li>').join('') + '</ul>'
    + '</div>'
  ).join('');
  return '<div class="wk-block">'
    + '<div class="wk-title">' + w.title + '</div>'
    + (w.designNote ? '<div class="dn-wrap">' + renderDesignNote(w.designNote) + '</div>' : '')
    + steps
    + cardFeedback(cardId, 'workshop')
    + '</div>';
}

function renderExercise(e, lessonId, idx) {
  const cardId = lessonId + ':ex:' + idx;
  const tests = e.tests.map(t => '<li class="test-lbl">' + pi(t) + '</li>').join('');
  return '<div class="ex-block">'
    + '<div class="ex-title">' + e.title + valuesPill(e.anyValues) + '</div>'
    + (e.designNote ? '<div class="dn-wrap">' + renderDesignNote(e.designNote) + '</div>' : '')
    + '<div class="ex-body"><div class="ex-prompt">' + pi(e.prompt) + '</div><ul class="tests">' + tests + '</ul></div>'
    + cardFeedback(cardId, 'exercise')
    + '</div>';
}

function cardFeedback(cardId, kind) {
  const saved = getNote(cardId);
  const placeholder = 'Notes for this ' + kind + '\\u2026';
  return '<div class="card-fb">'
    + '<textarea class="card-fb-ta" data-card-id="' + cardId + '" placeholder="' + placeholder + '">' + saved.replace(/</g, '&lt;') + '</textarea>'
    + '<div class="card-fb-bar">'
    +   '<button class="card-fb-clr" data-clear-id="' + cardId + '" title="Clear this note" aria-label="Clear this note">\\u00D7</button>'
    +   '<span class="card-fb-st' + (saved ? ' ok' : '') + '" data-status-for="' + cardId + '">' + (saved ? 'Saved' : '') + '</span>'
    + '</div>'
    + '</div>';
}

function initLessonTabs(lessonId) {
  const tabsRoot = $('lesson-tabs');
  if (!tabsRoot) return;

  const wkCount = document.querySelectorAll('[data-panel="workshops"] .wk-block').length;
  const exCount = document.querySelectorAll('[data-panel="exercises"] .ex-block').length;

  let initial = getSavedTab();
  if (initial === 'workshops' && wkCount === 0 && exCount > 0) initial = 'exercises';
  if (initial === 'exercises' && exCount === 0 && wkCount > 0) initial = 'workshops';

  activateTab(initial);

  tabsRoot.addEventListener('click', e => {
    const btn = e.target.closest('.tab');
    if (!btn) return;
    activateTab(btn.dataset.tab);
    setSavedTab(btn.dataset.tab);
  });
}

function activateTab(name) {
  document.querySelectorAll('#lesson-tabs .tab').forEach(b => {
    b.classList.toggle('active', b.dataset.tab === name);
  });
  document.querySelectorAll('.tab-panel').forEach(p => {
    p.classList.toggle('active', p.dataset.panel === name);
  });
}

function attachCardFeedback() {
  document.querySelectorAll('.card-fb-ta').forEach(ta => {
    let timer = null;
    ta.addEventListener('input', () => {
      const cardId = ta.dataset.cardId;
      const st = document.querySelector('[data-status-for="' + cardId + '"]');
      if (st) { st.textContent = 'Typing\\u2026'; st.className = 'card-fb-st'; }
      clearTimeout(timer);
      timer = setTimeout(() => {
        const val = ta.value.trim();
        if (val) saveNote(cardId, val);
        else delNote(cardId);
        if (st) { st.textContent = '\\u2713 Saved'; st.className = 'card-fb-st ok'; }
        refreshDots();
      }, 600);
    });
    ta.addEventListener('blur', () => {
      if (!timer) return;
      clearTimeout(timer);
      timer = null;
      const cardId = ta.dataset.cardId;
      const st = document.querySelector('[data-status-for="' + cardId + '"]');
      const val = ta.value.trim();
      if (val) saveNote(cardId, val);
      else delNote(cardId);
      if (st) { st.textContent = '\\u2713 Saved'; st.className = 'card-fb-st ok'; }
      refreshDots();
    });
  });

  document.querySelectorAll('.card-fb-clr').forEach(btn => {
    btn.addEventListener('click', () => {
      const cardId = btn.dataset.clearId;
      const ta = document.querySelector('.card-fb-ta[data-card-id="' + cardId + '"]');
      const st = document.querySelector('[data-status-for="' + cardId + '"]');
      if (ta) ta.value = '';
      delNote(cardId);
      if (st) {
        st.textContent = 'Cleared';
        st.className = 'card-fb-st';
        setTimeout(() => { if (st.textContent === 'Cleared') st.textContent = ''; }, 1500);
      }
      refreshDots();
    });
  });
}

function clearAllNotes() {
  const count = noteCountForThisFile();
  if (count === 0) { alert('No notes to clear.'); return; }
  const msg = 'Clear ALL notes (' + count + ' item' + (count === 1 ? '' : 's') + ')?\\n\\nThis cannot be undone.';
  if (!confirm(msg)) return;

  const toDelete = [];
  for (let i = 0; i < localStorage.length; i++) {
    const k = localStorage.key(i);
    if (k && k.indexOf('fr:') === 0) toDelete.push(k);
  }
  toDelete.forEach(k => localStorage.removeItem(k));

  document.querySelectorAll('.card-fb-ta').forEach(ta => { ta.value = ''; });
  document.querySelectorAll('.fb-ta').forEach(ta => { ta.value = ''; });
  document.querySelectorAll('.card-fb-st').forEach(s => { s.textContent = ''; s.className = 'card-fb-st'; });
  document.querySelectorAll('.save-st').forEach(s => { s.textContent = ''; s.className = 'save-st'; });
  refreshDots();
}

function feedbackSection(id) {
  const saved = getNote(id);
  return '<div class="fb-section"><div class="fb-label">Notes</div><textarea class="fb-ta" id="fb-ta" placeholder="Add your feedback, concerns, ideas, or TODOs for this item\\u2026">' + saved.replace(/</g, '&lt;') + '</textarea><div class="fb-footer"><button class="btn-save" onclick="doSave()">Save Note</button><button class="btn-clr" onclick="doClear()">Clear</button><span class="save-st" id="save-st">' + (saved ? 'Saved' : '') + '</span></div></div>';
}

function attachFeedback(id) {
  const ta = $('fb-ta');
  if (!ta) return;
  ta.addEventListener('input', () => {
    const st = $('save-st');
    if (st) { st.textContent = 'Unsaved changes'; st.className = 'save-st'; }
  });
}

function doSave() {
  const ta = $('fb-ta'); if (!ta) return;
  saveNote(current, ta.value.trim());
  const st = $('save-st');
  if (st) { st.textContent = '\\u2713 Saved'; st.className = 'save-st ok'; }
  refreshDots();
}

function doClear() {
  const ta = $('fb-ta'); if (!ta) return;
  if (ta.value && !confirm('Clear this note?')) return;
  ta.value = '';
  delNote(current);
  const st = $('save-st');
  if (st) { st.textContent = 'Cleared'; st.className = 'save-st'; }
  refreshDots();
}

function exportNotes() {
  const lines = [];
  const stamp = new Date().toISOString().slice(0, 16).replace('T', ' ');
  lines.push('# Course Review Notes  (exported ' + stamp + ')');
  lines.push('');

  let anyNote = false;

  function walkLessonItem(item, crumb) {
    const data = LD[item.file];
    if (!data) return;

    const sections = [];

    const legacy = getNote(item.id);
    if (legacy) sections.push({ heading: 'General', body: legacy });

    data.workshops.forEach((w, i) => {
      const n = getNote(item.id + ':wk:' + i);
      if (n) sections.push({ heading: 'Workshop — ' + w.title, body: n });
    });

    data.exercises.forEach((e, i) => {
      const n = getNote(item.id + ':ex:' + i);
      if (n) sections.push({ heading: 'Exercise — ' + e.title, body: n });
    });

    if (sections.length === 0) return;
    anyNote = true;

    lines.push('## ' + crumb + ' · ' + data.title);
    lines.push('_id: ' + item.id + '_');
    lines.push('');
    for (const sec of sections) {
      lines.push('### ' + sec.heading);
      lines.push(sec.body);
      lines.push('');
    }
  }

  function walkDocItem(item, crumb) {
    const n = getNote(item.id);
    if (!n) return;
    anyNote = true;
    lines.push('## ' + crumb + ' · ' + (item.title || item.file));
    lines.push('_id: ' + item.id + '_');
    lines.push('');
    lines.push(n);
    lines.push('');
  }

  for (const group of NAV) {
    for (const it of group.items) {
      if (it.type === 'topic') {
        for (const li of it.items) {
          const crumb = group.label + ' · ' + it.label;
          if (li.type === 'doc') walkDocItem(li, crumb);
          else walkLessonItem(li, crumb);
        }
      } else if (it.type === 'doc') {
        walkDocItem(it, group.label);
      } else {
        walkLessonItem(it, group.label);
      }
    }
  }

  if (!anyNote) {
    lines.push('_(No notes saved yet.)_');
  }

  const text = lines.join('\\n');
  const btn = $('export-btn');

  const fallback = () => {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.left = '-9999px';
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); } catch (e) {}
    document.body.removeChild(ta);
  };

  const flash = (ok) => {
    if (!btn) return;
    const orig = btn.textContent;
    btn.textContent = ok ? '\\u2713 Copied' : 'Copy failed';
    btn.classList.add('copied');
    setTimeout(() => {
      btn.textContent = orig;
      btn.classList.remove('copied');
    }, 1400);
  };

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(() => flash(true), () => { fallback(); flash(true); });
  } else {
    fallback();
    flash(true);
  }
}

marked.setOptions({ breaks: true, gfm: true });
buildNav();
refreshDots();
`;

// ─── render ──────────────────────────────────────────────────────
function renderHtml(opts: {
  pageTitle: string;
  tabKind: "docs" | "lessons";
  payload: string;
}): string {
  const docsAttr = opts.tabKind === "docs" ? ' class="cur"' : "";
  const lessonsAttr = opts.tabKind === "lessons" ? ' class="cur"' : "";
  return `<!DOCTYPE html>
<html lang="en">
<head>
${HEAD_AND_STYLES}
<title>${opts.pageTitle}</title>
</head>
<body class="${opts.tabKind}">
<header id="hdr">
  <div id="hdr-logo">
    <span class="ey">Frontendkurser</span>
    <span class="ti">Course Review</span>
  </div>
  <div id="hdr-tabs">
    <a href="course-review-docs.html"${docsAttr}>Docs</a>
    <a href="course-review-lessons.html"${lessonsAttr}>Lessons</a>
  </div>
  <div id="hdr-meta">
    <button id="export-btn" class="export-btn" onclick="exportNotes()">Copy notes</button>
    <button id="clear-all-btn" class="export-btn clear-all-btn" onclick="clearAllNotes()">Clear all</button>
    <span><b id="note-count">0</b> items with notes</span>
  </div>
</header>
<div id="app">
  <nav id="sidebar"><div id="nav-root"></div></nav>
  <main id="content">
    <div id="ci">
      <div id="empty">
        <div class="big">← Select an item</div>
        <div class="sm">${opts.tabKind === "docs" ? "Project documentation" : "Workshops · Exercises"}</div>
      </div>
    </div>
  </main>
</div>
${opts.payload}
<script>
${APP_JS}
</script>
</body>
</html>
`;
}

function renderDocsHtml(docs: Doc[]): string {
  const scripts = docs
    .map((d) => {
      const safe = d.content.replace(/<\/script>/gi, "<\\/script>");
      return `<script type="x-markdown" id="${d.id}">\n${safe}\n</script>`;
    })
    .join("\n");

  const navItems = docs.map((d) => ({
    id: d.id,
    type: "doc" as const,
    title: d.title,
    src: d.id,
  }));
  const NAV = [
    {
      id: "docs",
      label: "Documentation",
      type: "group",
      items: navItems,
    },
  ];

  const payload = `${scripts}
<script>
const NAV = ${JSON.stringify(NAV)};
const LD = {};
</script>`;

  return renderHtml({
    pageTitle: "Course Review · Docs",
    tabKind: "docs",
    payload,
  });
}

function renderLessonsHtml(
  LD: Record<string, LessonOut>,
  NAV: NavGroup[],
): string {
  const payload = `<script>
const NAV = ${JSON.stringify(NAV)};
const LD = ${JSON.stringify(LD)};
</script>`;

  return renderHtml({
    pageTitle: "Course Review · Lessons",
    tabKind: "lessons",
    payload,
  });
}

// ─── main ────────────────────────────────────────────────────────
function main() {
  const docs = buildDocs();
  const { LD, NAV } = buildLessons();

  const docsHtml = renderDocsHtml(docs);
  const lessonsHtml = renderLessonsHtml(LD, NAV);

  const outDocs = path.join(ROOT, "course-review-docs.html");
  const outLessons = path.join(ROOT, "course-review-lessons.html");

  fs.writeFileSync(outDocs, docsHtml, "utf8");
  fs.writeFileSync(outLessons, lessonsHtml, "utf8");

  const lessonCount = Object.keys(LD).length;
  const workshopCount = Object.values(LD).reduce(
    (n, l) => n + l.workshops.length,
    0,
  );
  const exerciseCount = Object.values(LD).reduce(
    (n, l) => n + l.exercises.length,
    0,
  );

  console.log("✓ course-review-docs.html      (" + docs.length + " docs)");
  console.log(
    "✓ course-review-lessons.html   (" +
      lessonCount +
      " items, " +
      workshopCount +
      " workshops, " +
      exerciseCount +
      " exercises)",
  );
}

main();
