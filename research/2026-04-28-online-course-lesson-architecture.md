# Online Programming Course Lesson Architecture

Research compiled 2026-04-28. 5 parallel research tracks synthesized.

**Purpose**: Inform a 4-tier per-lesson restructure (explanation → guided step-by-step → chip recall → independent editor exercise) for the Frontendkurser beginner JavaScript course. Determine whether the proposed order (1→3→2→4) is supported by evidence, what platforms actually do, where 4-tier structures fail, and what UX defaults to adopt.

**Sources**: ~70 web sources across CS-education research, platform engineering blogs, learner forums, and academic literature.

---

## Executive Summary

1. **Order 1→3→2→4 is defensible — but conditionally.** It aligns directly with PRIMM (Sentance et al.) and Use-Modify-Create (Lee et al.), the two CS-education-specific frameworks for sequencing programming lessons. **It violates** 4C/ID (van Merriënboer) and Renkl's scaffold-fading principle, both of which prefer 1→2→3→4. The deciding factor: **how tier 3 is framed**. If tier 3 = low-stakes structural investigation of tokens the explanation just introduced, 1→3→2→4 wins (testing-effect benefit). If tier 3 = high-stakes recall the learner cannot yet succeed at, switch to 1→2→3→4.

2. **The biggest predictable failure mode is copy-paste from tier 1 into tier 4.** Three independent research tracks flagged this. Tier 4 must shift surface (different domain, different variable names, different scenario) from tier 1's example, or learners will scroll up and crib. This is cheap to enforce and high-leverage.

3. **A "dedicated chip recall tier" is rare.** Across 11 platforms surveyed, only Brilliant and SoloLearn embed a recall-style sub-step inside every lesson. freeCodeCamp, Codecademy, Khan Academy, Boot.dev, Hyperskill, Exercism, Educative, Scrimba, and The Odin Project all use a 3-tier (explain → guided → free) pattern. Frontendkurser's 4-tier model is closer to Brilliant + SoloLearn than to the dominant programming-platform pattern — which is fine, but means there's less direct prior art to copy.

4. **No mastery gates between tiers.** Universal across platforms: don't lock tier 4 behind tier 3 completion. Make all four tiers visible from the lesson start. Allow learner to jump. Forced linearity is a school-software pattern, not a self-directed-adult-learner pattern. Hard gates *across* lessons are normal; hard gates *within* a lesson are not.

5. **Hint and reveal mechanics converge across platforms.** Always-visible hint button, no counter, no XP penalty. Solution requires one extra click vs. a hint, with an honor-system "no badge" label. Every platform that gates hints (CodeCombat's gem-gated hints) gets community complaints; every platform that ungates them (freeCodeCamp, Codecademy, Boot.dev) does not.

---

## Part 1: How Real Platforms Structure One Lesson

### Cross-platform sub-structure

| Platform | "Explain" tier | "Guided" tier | "Free / synthesis" tier | Lesson length |
|---|---|---|---|---|
| **freeCodeCamp** | Minimal prose | Project steps with locked editable region | Certification project (no scaffolding) | 30 sec–2 min/step; 4–10 hrs/project |
| **Codecademy** | Narrative pane | Numbered checkpoints in same editor | End-of-module project + quiz | 20–40 min/exercise |
| **Khan Academy** | Talk-through (interactive video, pause-to-edit) | Step-by-step coding challenge | Spin-off / project | ≤7 min talk-through; 5–10 min challenge |
| **Scrimba** | Teaching scrim (interactive screencast) | Challenge scrim | Solo project | 2–8 min/scrim |
| **Boot.dev** | Reading / video lesson | MCQ + console-output code | Unit-test code + capstone | 3–10 min/lesson |
| **Exercism** | introduction.md | instructions.md tasks + tests | Practice exercises + community | 10–30 min/concept |
| **Educative** | Prose | Inline playground edits + quiz | Project lessons | 5–15 min/lesson |
| **JetBrains Hyperskill** | Topic theory | Topic practice steps | Project stage | 5 min theory + 10–20 min practice |
| **Brilliant** | Explanation tile | Question tile (MCQ + interactive) | Synthesis tile at end | 10–15 min/lesson, 15–25 tiles |
| **SoloLearn** | Slide cards | MCQ + drag-the-tokens | Code Playground free-coding | 3–8 min/lesson |
| **The Odin Project** | Reading + external links | Assignment exercises | Project repos | 30 min – 3 hrs/lesson |

### Where they diverge

- **Code persistence**: freeCodeCamp and Scrimba carry code state forward inside a unit. Codecademy, Boot.dev, Exercism reset per exercise. Hyperskill and Odin persist code in the student's local IDE.
- **Gating strictness**: freeCodeCamp, Codecademy, Boot.dev, Hyperskill **hard-gate** on test pass within a sequence. Khan Academy, Brilliant, Educative, Scrimba, Odin are **soft** — Continue is always available.
- **Explain-tier medium**: Khan + Scrimba use video-as-editor (interactive screencast). Codecademy, Educative, Hyperskill, Exercism are deliberately text-only. Boot.dev mixes both.
- **Recall-tier**: Only Brilliant and SoloLearn dedicate a sub-step inside every lesson to recall. Most platforms put recall at end-of-module quizzes. **Frontendkurser's 4-tier model is unusual in the programming space** — closer to Brilliant's tile model than to fCC/Codecademy.

### Length norms

Two regimes: **micro** (1–3 min: fCC step, Brilliant tile, SoloLearn card) vs. **mid** (10–30 min: Codecademy exercise, Khan challenge, Hyperskill topic, Educative lesson, Exercism concept). Frontendkurser's 4-tier-per-lesson likely lands in the mid regime if each tier is 3–5 minutes.

### Notable structural quotes

> "[A talk-through] mimics the experience of sitting down next to someone and sharing a computer." — Khan Academy design guidelines

> "DO NOT SKIP ANYTHING! Each portion is built on everything that came before it." — The Odin Project

> "Hyperskill follows an 80% practice, 20% theory approach." — Hyperskill

> "1 Lesson · 1 Challenge · 1 Playground · 1 Illustration." — Educative's stated lesson template

---

## Part 2: Learning-Science Verdict on 1 → 3 → 2 → 4

### The two competing traditions

**Cognitive-load / direct-instruction tradition prefers 1→2→3→4.**
- *Worked-example effect* (Sweller 1985, 1998): for novices in well-structured domains, studying worked examples beats solving equivalent problems from scratch. Tier 1 + Tier 2 are worked-example exposure; Tier 4 is independent solving. Tier 3 should follow whole-task practice.
- *Cognitive Load Theory* (Sweller 1988, 2011): a well-designed sequence increases load monotonically. Tier 3 between explanation and procedural practice can spike load before the schema exists.
- *4C/ID* (van Merriënboer 1997, 2018): part-task practice should follow whole-task exposure, not precede it.
- *Gradual Release of Responsibility* (Pearson & Gallagher 1983): "I do → We do → You do" is canonical. Recall before shared practice is unusual.
- *Renkl & Atkinson fading* (2003): scaffolds should fade monotonically. Going Tier 3 (low scaffold) → Tier 2 (heavy scaffold) is non-monotonic.

**CS-education tradition supports 1→3→2→4.**
- *PRIMM* (Sentance, Waite, Kallia 2017–2019): Predict → Run → Investigate → Modify → Make. **Maps directly onto 1→3→2→4** if Tier 3 = Investigate (structural analysis of code already shown), Tier 2 = Modify, Tier 4 = Make.
- *Use-Modify-Create* (Lee et al. 2011): coarser-grained equivalent to PRIMM; same ordering implication.
- *Testing effect / retrieval practice* (Roediger & Karpicke 2006): retrieval *before* further encoding strengthens later encoding ("test-potentiated learning"). Putting Tier 3 between Tier 1 and Tier 2 is a textbook application — *if* the retrieval is achievable.
- *Parsons problems* (Parsons & Haden 2006; Ericson & Denny 2022 review): drag-and-drop reassembly is supported as a pre-writing scaffold. Multiple placements (before or after guided code) are studied; before is the more common scaffolding position.

### Verdict

**1→3→2→4 wins if and only if Tier 3 is framed as "investigation/structural retrieval" of material the explanation just covered, not as a high-stakes recall test.** This is a *framing* decision more than an ordering decision.

**Concrete implication for Frontendkurser's chip puzzle**: chips must be the tokens the explanation just highlighted (commit 17c14ae's tokenHighlight scheme already does this). Distractors must represent specific misconceptions the explanation addressed. The puzzle should feel like "let's look at what we just saw and put it together," not "now let's see if you remember." If chips reference content not present in tier 1, switch to 1→2→3→4.

### Productive Failure caveat (Kapur 2008–2021)

PF says "let students try first, then explain" works better for *conceptual* material with informal intuition (e.g. variance, density). It is **not** recommended for arbitrary syntax (`let x = 1` cannot be guessed from prior intuition). For most JS lessons, explain-first is correct. For meta-conceptual lessons ("what is a variable?", "why functions?"), the user could experiment with a low-stakes Tier 4 first.

---

## Part 3: The 9 Highest-Risk Failure Modes for a 4-Tier Beginner Course

Ranked by likelihood × severity for this specific structure.

1. **Copy-paste from explanation into exercise** (Wikipedia, AlgoCademy, fCC). Tier 1 and Tier 4 sit on the same lesson page. If they share a domain, learners scroll up and crib. **Mitigation**: tier 4 must shift surface (different domain, different vars, different scenario). Same control flow, different dressing.

2. **Illusion of competence** (Coursera, arXiv 2024 on AI scaffolding, ResearchGate). Recognition-based tiers (chip selection from a visible pool) feel like learning but generate no retrieval cues. **Mitigation**: Tier 3 must require *production from blank*, not *selection*. Hide chips until after a free-recall attempt, or use chips only as the "I'm stuck" affordance.

3. **Failure to transfer** (Cedtech, ACM TOCE, CMU PACT). Micro-step formats train near-transfer almost exclusively; learners can't apply on novel problems. **Mitigation**: every Nth lesson, replace tier 4 with a synthesis lab spanning 2–3 prior concepts in a new domain. Require a 3-line plain-English plan before code is accepted.

4. **Redundancy fatigue** (Cambridge Handbook of Multimedia Learning, BJEP 2023). Hammering the same concept through four tiers risks each tier being "more of the same." **Mitigation**: each tier must *change the angle* — Tier 1 = the *why*, Tier 2 = the *how*, Tier 3 = *production*, Tier 4 = *transfer to a novel surface*. Audit every lesson with: "Could I delete tier N and lose nothing?" If yes, delete it.

5. **Hint exploitation / brute-forcing assertions** (DebugML, Sololearn forum). When assertions are visible (Frontendkurser's iframe runner exposes them), learners optimize for "make the test green" rather than solving. **Mitigation**: hide one ghost assertion per lab that runs only after visible ones pass. Word user stories in human language, not pattern-match-friendly syntax. Penalize literal string matches against assertion text.

6. **Expertise reversal** (Kalyuga 2003; ScienceDirect 2025 meta-analysis). Forced 4-tier linearity hurts learners who are past the scaffolding stage. **Mitigation**: skip-button at the top of each lesson — "I've got this, quiz me" — that takes learner straight from Tier 1 to Tier 4 with the option to drop back if they fail.

7. **Codecademy-style rigidity** (HN 2012 thread; MakeUseOf; One Month). Pattern-match graders rejecting working code that doesn't match expected solution character-for-character. **Mitigation**: harness must accept multiple correct solutions. Test for *behavior*, not literal string match. Where multiple idioms exist (forEach vs. map vs. for-loop), accept all.

8. **Tutorial hell / Codecademy effect** (fCC, AlgoCademy, fCC forum). Learners finish a guided course and still freeze at a blank editor. **Mitigation**: include occasional "blank file, one-line spec, 10 minutes" exercises *throughout* the course, not deferred to the capstone. The blank-editor muscle is the actual KPI.

9. **"Just clicking next"** (Tribe Design Works, Growth Engineering). Streaks/progression-bait reward completion not understanding. **Mitigation**: don't gate on "lesson completion alone." If streak metrics exist, tie them to *production output* (labs passed from blank), not lesson clicks.

### Quotes worth remembering

> "Reading books about swimming doesn't make you a swimmer." — fCC tutorial-hell guide
> "Codecademy essentially suggests that you have to follow 1 way to do things to be correct." — HN commenter `honeysnow`
> "Conditions of instruction that make performance improve rapidly often fail to support long-term retention and transfer." — Bjork & Bjork 2011

---

## Part 4: What's Different for Absolute Beginners

(Caveat: this section's specific citations are weaker — the agent that researched it had no web tools and synthesized from training. The strongest claims are corroborated by Parts 2 and 5.)

### Notional machine is the through-line

The single biggest difference between absolute beginners and intermediates: **intermediates have a notional machine (a mental model of "what the computer does"); beginners do not.** Sorva (2013) argues the notional machine should be a first-class teaching artifact, not implicit. Du Boulay (1986) catalogued the misconceptions beginners invent when none is supplied.

**For Frontendkurser**: the allegory scenes (crosswalk, fork, conveyor) **are** notional machines. This is the course's strongest asset. Tier 1 should narrate the scene as execution ("the value walks up to the crosswalk, the condition checks, it goes left or right"), not as definition ("if/else is a control structure"). The 4 tiers should be read as **four progressively-faded views of the same notional machine**: Tier 1 = full scene, Tier 4 = bare code.

### Reading before writing

Lister et al. (2004 ITiCSE working group) found a large fraction of CS1 students cannot trace simple code at end of semester. Tracing is a *prerequisite skill* beginners don't have. Implication: add **predict-the-output** as a micro-step inside or before Tier 1 — multiple choice, low stakes. Tier 2's "step through" should be a literal step button on the allegory scene, advancing both code highlight and animation by one line.

### Beginner-friendly errors (Elm, Hedy)

Native runtime errors (`Uncaught TypeError: Cannot read properties of undefined`) lose beginners in the first session. Elm and Hedy set the bar: errors written *to the learner*, not to the compiler implementer. **For Frontendkurser**: wrap Monaco's diagnostics with a translation layer that catches the top ~20 beginner errors and rewrites them in Swedish/English plain language, referencing the current lesson's metaphor where possible.

### Native-language (Swedish) considerations

Hedy (Hermans, TU Delft) translates keywords into ~50 natural languages and shows measurable lower drop-off in non-English-speaking classrooms. **For Frontendkurser**: explanations and chip labels in Swedish; code keywords stay JavaScript-English (don't translate `if`/`else`). Bridge the gap explicitly once ("som betyder *om*"), then drop it. Glossary chip on hover for the first ~5 lessons.

The Swedish CS-education context: programming is mandatory in gymnasium math curriculum since 2018. Established Swedish terms: `variabel`, `villkor`, `slinga`/`loop`, `funktion`. Use the established terms rather than inventing.

### Pacing for beginners

Code.org Hour of Code engineers ~60 min as 20 micro-puzzles. Beginners' working memory and motivation budget are smaller than intermediates'. **For Frontendkurser**: each of the 4 tiers should be completable in 3–5 minutes for beginners. If tier 2 takes 15 minutes of guided steps, split the lesson. Show progress *within* the lesson, not just across it.

### Metaphor's limits must be named

Sorva, Clancy: metaphors create misconceptions if their breakage isn't named. Variables-as-boxes works for primitives, breaks for references. **For Frontendkurser**: name the metaphor's limits at Tier 1 *before* learners hit them. "The crosswalk is how if/else routes a single value — but real programs have many crosswalks chained together."

### First 15 minutes

Code.org, Scratch, Khan Academy CS all engineer the first 5 minutes for guaranteed success. **For Frontendkurser**: Lesson 1's Tier 1 must produce a visible result with zero typing (a "play" button on a pre-built scene). Lesson 1's Tier 4 must be unfailable — one-line change, restricted edit area, instant green. Save real Tier 4 difficulty for Lesson 3+.

---

## Part 5: Recommended UX Defaults Per Tier

Drawn from observed defaults across freeCodeCamp, Codecademy, Khan Academy, DataCamp, Exercism, Boot.dev, js-parsons, and CS50/check50.

| Mechanic | Default for Frontendkurser |
|---|---|
| **Tier 1 (Explain)** length | 80–150 words/screen, max 2 short snippets |
| Tier 1 interactivity | Inline editable snippet; token highlighting linked to prose (already shipped) |
| Tier 1 advance | Click "Next"; no autoplay, no scroll-jack |
| **Tier 2 (Guided)** code persistence | Persist file across micro-steps; scroll to next edit point on pass |
| Tier 2 assertion style | Mix: pattern-match for syntax presence, runtime asserts for behavior |
| Tier 2 feedback timing | On Run click only — never keystroke-driven |
| Tier 2 first-error-only | Yes — show only the first failing test's hint |
| Tier 2 hint button | Always visible, ungated, no counter, no XP penalty |
| Tier 2 solution reveal | Two clicks (hint → solution); honor-system "won't earn badge" label |
| Tier 2 stuck detection | None — let learner self-pace; no "you've failed 3 times, here's a hint" intrusion |
| **Tier 3 (Chips)** layout | Two-column (available chips left, slots right); fixed slot count |
| Tier 3 distractors | 2–3 max, **each tied to a specific misconception** (`=` vs `==`, missing `return`). Cornell 2016 found random distractors hurt; ACM 2024 found targeted distractors help. |
| Tier 3 feedback | Check-on-submit, not check-on-placement. First-error highlight only. |
| Tier 3 penalty | None |
| Tier 3 give-up | Reveals next correct chip into slot; not whole solution |
| **Tier 4 (Independent)** prompt | User-story format ("As a user, I should see..."), 3–6 stories per exercise |
| Tier 4 checks | Named pass/fail list visible upfront; show **all** results, not first-only |
| Tier 4 starter | Function signature + `// TODO` comment, **never empty** |
| Tier 4 runner | On Run click; native errors with one-line plain-language prefix |
| Tier 4 staged reveal | Optional Exercism-style: only first user story active, passing un-greys the next |
| **Cross-tier** save state | localStorage per lesson, auto-save on Run; explicit "Reset lesson" with confirm |
| Tier ordering | All four tiers visible as tabs from lesson start; learner picks; **do not gate** |
| Skip across lessons | Allowed |
| Mastery gates | None within a lesson |

### Why first-error-only in Tier 2 but show-all in Tier 4

Tier 2 has a "next thing to do" — first-error narrows focus. Tier 4 requires the learner to plan an approach, so they need the full picture to plan against. CS50, freeCodeCamp's certification projects, and Exercism all show all results in independent exercises.

---

## Contradictions & Open Questions

1. **4C/ID vs PRIMM ordering.** 4C/ID prefers part-task practice (Tier 3) *after* whole-task exposure; PRIMM endorses Investigate (Tier 3) *before* Modify (Tier 2). Real disagreement, not resolvable from theory alone. Resolution depends on how Tier 3 is framed (recall = 4C/ID, investigation = PRIMM).

2. **Distractors help vs hurt.** Cornell 2016 (Harms et al.) found random distractors *decrease* learning; ACM 2024 found they *help* when they target a known misconception. Resolution: targeted distractors only. No filler chips.

3. **Reveal solution policy.** Khan Academy reveals after struggle but locks "next" until learner reproduces; Exercism never reveals (uses mentors); CodeCombat gates behind gems and gets community complaints. No academic consensus. Recommendation: hint→solution two-click, honor-system "no badge" label, no XP penalty.

4. **First-failure vs all-failures feedback.** Codecademy/freeCodeCamp default to first-only. CS50 shows all. Resolution by tier: first-only in guided, all in independent. (Adopted in Part 5.)

5. **Streak gamification.** Motivation literature says streaks drive practice; learning-outcomes literature says they reward completion not understanding. Resolution: streaks tied to *production output* (labs passed from blank, projects shipped) are useful; streaks tied to *lesson clicks* are harmful.

6. **Frontendkurser-specific open question.** The 4-tier model is rare among programming platforms (only Brilliant + SoloLearn approach it). Worth piloting on one lesson before committing to all 8 — parallel to the existing plan in `lesson-four-tier-structure.md`.

---

## Key Takeaways (Concrete Recommendations)

1. **Keep order 1→3→2→4**, but explicitly **frame Tier 3 as "investigate the tokens we just saw"** rather than "now recall." Use the existing tokenHighlight metadata from Tier 1 to constrain which tokens appear as chips in Tier 3.

2. **Author Tier 4 prompts to shift surface from Tier 1.** Same control flow, different domain/vars/scenario. Add this as an authoring rule in CLAUDE.md alongside the existing test-labs.ts requirement.

3. **Show all 4 tiers as tabs from lesson start. Do not gate.** Add a "skip to Tier 4" affordance for confident learners; let them drop back if they fail.

4. **Hint/solution UX**: always-visible hint button, no counter, no XP cost. Solution one click deeper than hint, with "no badge" label. No struggle-timer auto-hints.

5. **Add a ghost assertion per Tier 4 lab** to defeat hint-exploitation. Word user stories in plain language, not pattern-match-friendly syntax.

6. **Tier 3 distractors must target specific misconceptions.** Two or three at most. Random plausible code is harmful. (`=` vs `==`, missing `return`, off-by-one operators are good targets.)

7. **Wrap Monaco runtime errors in beginner-friendly Swedish/English text** for the top ~20 error types. Reference the lesson's allegory scene where possible.

8. **Predict-the-output micro-step before or inside Tier 1.** Multiple choice, low stakes. Builds the code-tracing skill that Lister et al. found is missing in CS1 students.

9. **Pilot the 4-tier structure on one lesson first** (recommendation: L2 forkLesson — small, branches give natural micro-steps). Run the test-labs.ts harness end-to-end. Re-evaluate before rolling to L1, L3–L8.

10. **Track "blank-editor capacity" as the actual KPI.** Every Nth lesson, replace Tier 4 with a one-line-spec, empty-file exercise. The course should produce learners who can write code unaided, not learners who can complete tiers.

---

## Sources

### Platform structures (Part 1)
- [freeCodeCamp news on JS curriculum](https://www.freecodecamp.org/news/learn-javascript-with-new-data-structures-and-algorithms-certification-projects/)
- [freeCodeCamp v9 RWD redesign](https://www.freecodecamp.org/news/responsive-web-design-certification-redesigned/)
- [GitHub issue #54402: User Editable Region](https://github.com/freeCodeCamp/freeCodeCamp/issues/54402)
- [Codecademy: Updates to Learning Environment](https://help.codecademy.com/hc/en-us/articles/1260803449210-Updates-to-our-Learning-Environment)
- [Codecademy: Code Challenges](https://help.codecademy.com/hc/en-us/articles/4407586127515-Code-Challenges)
- [Codecademy Accessibility Guide](https://help.codecademy.com/hc/en-us/articles/360056641953-Accessibility-Guide)
- [Khan Academy: Talk-through design guidelines](https://blog.khanacademy.org/our-design-guidelines-for-teaching-programming-talkthroughs/)
- [Khan Academy teaching guide: Functions](https://www.khanacademy.org/khan-for-educators/resources/teacher-essentials/teaching-computing/a/teaching-guide-intro-to-js-functions)
- [Scrimba interview on SurviveJS](https://survivejs.com/blog/scrimba-interview/)
- [Scrimba launch on HN](https://news.ycombinator.com/item?id=24579699)
- [Boot.dev: Two Lesson Types](https://www.boot.dev/lessons/3968faa9-bd13-453e-a13e-a135c57e730f)
- [Exercism: Concept Exercises docs](https://exercism.org/docs/building/tracks/concept-exercises)
- [Exercism JS track implementation guide](https://github.com/exercism/javascript/blob/main/reference/implementing-a-concept-exercise.md)
- [Educative: Coding lessons online](https://www.educative.io/blog/coding-lessons-online)
- [Hyperskill: How we teach](https://hyperskill.org/how-we-teach)
- [Brilliant Help Center](https://brilliant.org/help/using-brilliant/)
- [The Odin Project: How This Course Will Work](https://www.theodinproject.com/lessons/foundations-how-this-course-will-work)

### Learning science (Part 2)
- [Worked-example effect overview](https://en.wikipedia.org/wiki/Worked-example_effect)
- [Sweller — From Cognitive Load Theory to Collaborative CLT](https://pmc.ncbi.nlm.nih.gov/articles/PMC6435105/)
- [Renkl & Atkinson — How Fading Worked Steps Works](https://link.springer.com/article/10.1023/B:TRUC.0000021815.74806.f6)
- [4C/ID Home (van Merriënboer)](https://www.4cid.org/)
- [van Merriënboer — 4C/ID Overview 2021](https://www.4cid.org/wp-content/uploads/2021/04/vanmerrienboer-4cid-overview-of-main-design-principles-2021.pdf)
- [Pearson & Gallagher — Gradual Release of Responsibility](https://en.wikipedia.org/wiki/Gradual_release_of_responsibility)
- [Roediger & Karpicke 2006 — Test-Enhanced Learning](https://pubmed.ncbi.nlm.nih.gov/16507066/)
- [Cepeda et al. — Spacing Effects meta-analysis](https://augmentingcognition.com/assets/Cepeda2006.pdf)
- [Bjork & Bjork — Desirable Difficulties](https://www.unh.edu/teaching-learning-resource-hub/sites/default/files/media/2023-06/itow-introducing-desirable-difficulties-into-practice-and-instruction-bjork-and-bjork.pdf)
- [Kapur — Productive Failure 2014](https://www.cse.iitk.ac.in/users/se367/14/Readings/papers/kapur-14_productive-failure-in-learning-math.pdf)
- [Sinha & Kapur 2021 — PF meta-analysis](https://journals.sagepub.com/doi/10.3102/00346543211019105)
- [Sentance — PRIMM project](https://suesentance.net/primm-project/)
- [Sentance, Waite, Kallia — Teaching programming with PRIMM](https://suesentance.net/wp-content/uploads/2020/02/teaching_computer_programming_with_primm__a_sociocultural_perspective_author_copy.pdf)
- [Lee et al. — Use-Modify-Create](https://par.nsf.gov/servlets/purl/10122993)
- [Ericson, Denny et al. 2022 — Parsons Problems systematic review](https://juholeinonen.com/assets/pdf/ericson2022parsons.pdf)

### Failure modes (Part 3)
- [AlgoCademy: Tutorial Hell](https://algocademy.com/blog/why-youre-stuck-in-tutorial-hell-even-after-completing-10-courses/)
- [freeCodeCamp: How to Break Free from Tutorial Hell](https://www.freecodecamp.org/news/how-to-break-free-from-tutorial-hell)
- [Coursera: Illusion of Competence](https://www.coursera.org/articles/illusion-of-competence)
- [arXiv 2024 — Generative AI for Novice Programmers](https://arxiv.org/html/2405.17739v1)
- [Kalyuga — Expertise Reversal Effect 2007](https://www.uky.edu/~gmswan3/EDC608/Kalyuga2007_Article_ExpertiseReversalEffectAndItsI.pdf)
- [Cambridge Handbook: Redundancy Principle](https://www.cambridge.org/core/books/abs/cambridge-handbook-of-multimedia-learning/redundancy-principle-in-multimedia-learning/448A5532008EB4B4BA17DBEB5A421920)
- [HN 2012 — Why Codecademy is overrated](https://news.ycombinator.com/item?id=4578484)
- [MakeUseOf — Why You Shouldn't Learn With Codecademy](https://www.makeuseof.com/tag/4-reasons-shouldnt-learn-code-codecademy/)
- [GitHub fCC #13657 — Major Issue](https://github.com/freeCodeCamp/freeCodeCamp/issues/13657)
- [DebugML — Cheating on Agent Benchmarks](https://debugml.github.io/cheating-agents/)
- [Cedtech — Difficulties teaching programming](https://www.cedtech.net/download/factors-contributing-to-the-difficulties-in-teaching-and-learning-of-computer-programming-a-8247.pdf)
- [Tribe Design — Gamification in eLearning](https://tribedesignworks.com/blog/gamification-in-elearning)

### UX mechanics (Part 5)
- [DataCamp Coding Exercise Anatomy](https://instructor-support.datacamp.com/en/articles/2347523-coding-exercise-anatomy)
- [js-parsons documentation](https://js-parsons.github.io/documentation/)
- [Codio Parsons Puzzle UI](https://codio.github.io/parsons-puzzle-ui/)
- [ACM 2024 — Distractors Make You Pay Attention](https://dl.acm.org/doi/fullHtml/10.1145/3632620.3671114)
- [Cornell 2016 — Distractors Decrease Learning](https://kharms.infosci.cornell.edu/downloads/harmsk-icer-2016.pdf)
- [Adaptive Parsons (Hou et al., ICER 2022)](https://web.eecs.umich.edu/~xwanghci/papers/ICER22.pdf)
- [check50 (CS50) docs](https://cs50.readthedocs.io/projects/check50/en/latest/check50_user/)
- [Exercism Test Runner Interface](https://exercism.org/docs/building/tooling/test-runners/interface)

### Beginner-specific (Part 4 — primary sources to verify)
- Sorva, *Visual Program Simulation in Introductory Programming Education* (Aalto PhD thesis, 2013)
- du Boulay, "Some Difficulties of Learning to Program" (1986)
- Hermans, *The Programmer's Brain* (Manning 2021); Hedy — [hedy.org](https://hedy.org)
- Lister et al., "A Multi-National Study of Reading and Tracing Skills" (ITiCSE 2004)
- Czaplicki, "The Syntax Cliff" (Strange Loop ~2019) — Elm error design
- Bruner, *Toward a Theory of Instruction* (1966) — enactive/iconic/symbolic
