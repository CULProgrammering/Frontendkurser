# Responsive Design Plan

Phased plan for making the Frontendkurser slide UI work well on phones, tablets,
and ultra-wide displays. Captured 2026-05-04. Reviewed and updated 2026-05-05
after multi-agent codebase audit.

## Current state

The app already has *some* responsive behavior through Tailwind's `sm:` (640px)
breakpoint, but it's inconsistent:

- **Slide title typography**: `text-xl sm:text-3xl` already shrinks on small screens
- **Padding**: `p-4 sm:p-10` already adjusts
- **Two-column slide layouts** (workshop, JS-assignment, exercise): `md:flex-row`
  / `md:grid-cols-2` (768px+) — on phones they stack vertically
- **Slide deck `min-h-[6rem]`** in narration cards (ExplanationSlideView lines 282, 362)
  may overflow on phones
- **Numbered chapter dots**: `h-7 w-7` × up to 14 dots → on a 320px screen, 14
  dots wrap onto multiple lines and crowd the description row
- **Breadcrumb**: up to 4 segments × fixed `max-w-[14rem]` / `max-w-[18rem]` →
  overflows viewport on phones; no responsive collapse logic at all
- **Monaco editor** in workshop/exercise: not phone-friendly. Soft keyboard takes
  half the screen; touch typing in Monaco is awkward. Note: `wordWrap: "on"` and
  `automaticLayout: true` are already set — the tap-target and keyboard problems
  remain
- **Theme toggle + font-size selector** in the title row → wrap below the title
  on phones (already OK due to `flex-wrap`)
- **Tier menu cards**: `grid sm:grid-cols-2` — single column on phones ✓
- **Home/topic listings**: same pattern — already OK
- **SVG scenes** (scenes/ dir): all already use `viewBox` + `w-full h-auto
  max-h-[420px]` — already responsive ✓
- **Allegory scenes** (allegories/ dir): use flexbox, not fixed SVG px — already
  responsive ✓
- **Horizontal scroll hazards**: `whitespace-pre` on code panel in
  JsTypedAssignmentSlideView; `width: max-content` in ExplanationSlideView
  non-trace mode — both cause horizontal overflow on narrow viewports
- **Tap targets**: multiple buttons are well below the 44px minimum:
  - JsWorkshopSlideView step counters: `h-7 w-7` (28px)
  - JsChipAssignmentSlideView chip buttons: `px-3 py-2` (~32px)
  - ExplanationSlideView back button (~24px), modal close `w-7 h-7` (28px),
    tip icon `w-8 h-8` (32px)

## Target breakpoints

Tailwind defaults: `sm` (640), `md` (768), `lg` (1024). Mobile-first as the
default. Test viewports: 375×812 (iPhone), 768×1024 (iPad portrait), 1440×900
(laptop).

## Phased plan

### Phase 1 — Header chrome (high priority, low effort)

1. **Breadcrumb collapse**: on `<sm`, collapse middle segments into `…` and show
   only `Home › … › [Current]`. Tap the `…` to expand. Add a `collapsed` mode
   to the existing `Breadcrumb` component. Also tighten segment max-widths to
   `max-w-[8rem] sm:max-w-[14rem]` so they don't overflow 320px. File:
   [SlideDeck.tsx](app/src/components/SlideDeck.tsx) — `Breadcrumb` (lines 204–243).
2. **Title row stacking**: on `<sm`, drop the controls (font-size + theme
   toggle) onto a second row aligned right. Already mostly handled by
   `flex-wrap`, but the gap looks loose — tighten with
   `flex-col sm:flex-row sm:items-center` in `SlideTitleRow`
   ([SlideDeck.tsx](app/src/components/SlideDeck.tsx) lines 245–259).
3. **Chapter dots compaction**: on `<sm` with > 6 dots, switch to a compact
   `3 / 8 ›` indicator with tap-to-pop the full list as a sheet. File:
   [SlideDeck.tsx](app/src/components/SlideDeck.tsx) — `slideJumpDots` (lines 101–126).

### Phase 2 — Slide content layout (medium effort)

4. **Two-column slides → tabbed on `<md`**: workshop, exercise, JS-assignment
   currently stack editor over instructions on phones, leaving each cramped.
   Switch to a tabbed view on `<md`: `[Code] [Instructions] [Result]`,
   swipeable. Files:
   - [JsWorkshopSlideView.tsx](app/src/components/JsWorkshopSlideView.tsx) (md:flex-row at line 356)
   - [JsAssignmentSlideView.tsx](app/src/components/JsAssignmentSlideView.tsx) (md:grid-cols-2 at line 145)
   - [JsTypedAssignmentSlideView.tsx](app/src/components/JsTypedAssignmentSlideView.tsx) (md:grid-cols-2 at line 145)
   - [ExerciseSlideView.tsx](app/src/components/ExerciseSlideView.tsx) (md:flex-row at line 283)
   - [ExplanationSlideView.tsx](app/src/components/ExplanationSlideView.tsx) (md:grid-cols-2 at line 257, trace mode only)
   - [AssignmentSlideView.tsx](app/src/components/AssignmentSlideView.tsx) (md:grid-cols-2 at line 99)
5. **Horizontal scroll fixes**:
   - JsTypedAssignmentSlideView code panel: replace `whitespace-pre` with
     `whitespace-pre-wrap` or wrap in `overflow-x-auto` so wide code doesn't
     break the layout.
   - ExplanationSlideView non-trace mode: replace `width: max-content` with
     `max-w-full` so demo boxes stay within the viewport.
6. **Chip puzzle**: code panel can overflow horizontally on long lines. Add
   `overflow-x-auto`. File:
   [JsChipAssignmentSlideView.tsx](app/src/components/JsChipAssignmentSlideView.tsx).
7. **Iframe heights**: ExerciseSlideView preview iframe is fixed `h-48` (line 387);
   AssignmentSlideView stacks two iframes with no height constraint. Add
   responsive height constraints (e.g., `h-40 sm:h-56`) or `max-h` caps so
   they don't overflow on phones.
8. **SVG scenes** (scenes/ and allegories/): already use `viewBox` + `w-full
   h-auto` — no changes needed. Verify stays true when adding new scenes.

### Phase 3 — Editor experience (high effort)

9. **Monaco on phone** — pick one:
   - **Option A (recommended)**: detect viewport `<sm`, swap Monaco for a
     native `<textarea>` with monospace + simple syntax highlighting. Cheaper,
     much better mobile UX. Write a `<CodeEditor>` wrapper that picks Monaco
     vs textarea by viewport.
   - **Option B**: keep Monaco — `wordWrap: "on"` is already set; minimap is
     already hidden. Remaining pain is touch typing and soft keyboard crowding
     the editor. Marginally better than today but still cramped.
10. **Soft keyboard handling**: the root containers use `height: 100%` on
    html/body/#root ([index.css](app/src/index.css) lines 5–9) — when the
    keyboard pops, the layout collapses. Replace with `height: 100dvh` on
    `#root` so the layout shrinks gracefully. Single line change.

### Phase 4 — Touch & navigation (low effort, polish)

11. **Tap-target sizes**: bump all interactive buttons to `min-h-[44px] min-w-[44px]`
    on `<sm` (Apple HIG / WCAG 2.5.5 minimum). Priority targets:
    - JsWorkshopSlideView step counters: `h-7 w-7` → `h-7 w-7 sm:h-7 sm:w-7`
      with `min-h-[44px] min-w-[44px]` wrapper padding
    - JsChipAssignmentSlideView chip buttons: add `py-3 sm:py-2` to lift to 44px
    - ExplanationSlideView back button, modal close, tip icon: add padding or
      increase to `w-11 h-11` on mobile
12. **Swipe between slides**: horizontal swipe = arrow keys. Useful for
    explanation slides with many steps.
13. **Hover-only affordances**: the hover ring on tier-menu cards doesn't appear
    on touch. Add `active:` states for tactile feedback.

### Phase 5 — Verification

14. Test in Playwright at three viewports per route. Snapshot.
15. Add `npm run test:responsive` script that boots the dev server and runs the
    Playwright matrix.

## Recommended starting point

**Phase 1 + the horizontal scroll fixes (items 5–6) + `100dvh` (item 10)** are
all low-effort and together fix the most visually broken behaviors on phones.
Phase 2 tabbed layout is the next big jump in usability but bigger surgery.
Phase 4 tap targets are accessibility polish — worth doing before any public
launch.
