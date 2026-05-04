# Responsive Design Plan

Phased plan for making the Frontendkurser slide UI work well on phones, tablets,
and ultra-wide displays. Captured 2026-05-04 — implementation deferred.

## Current state

The app already has *some* responsive behavior through Tailwind's `sm:` (640px)
breakpoint, but it's inconsistent:

- **Slide title typography**: `text-xl sm:text-3xl` already shrinks on small screens
- **Padding**: `p-4 sm:p-10` already adjusts
- **Two-column slide layouts** (workshop, JS-assignment, exercise): `md:flex-row`
  / `md:grid-cols-2` (768px+) — on phones they stack vertically
- **Slide deck `min-h-[6rem]`** in narration cards may overflow on phones
- **Numbered chapter dots**: `h-7 w-7` × up to 14 dots → on a 320px screen, 14
  dots wrap onto multiple lines and crowd the description row
- **Breadcrumb**: 4 segments × `truncate max-w-[14rem]` → can overflow viewport on phones
- **Monaco editor** in workshop/exercise: not phone-friendly. Soft keyboard takes
  half the screen; touch typing in Monaco is awkward
- **Theme toggle + font-size selector** in the title row → wrap below the title
  on phones (already OK due to `flex-wrap`)
- **Tier menu cards**: `grid sm:grid-cols-2` — single column on phones
- **Home/topic listings**: same pattern — already OK

## Target breakpoints

Tailwind defaults: `sm` (640), `md` (768), `lg` (1024). Mobile-first as the
default. Test viewports: 375×812 (iPhone), 768×1024 (iPad portrait), 1440×900
(laptop).

## Phased plan

### Phase 1 — Header chrome (high priority, low effort)

1. **Breadcrumb collapse**: on `<sm`, collapse middle segments into `…` and show
   only `Home › … › [Current]`. Tap the `…` to expand. Add a `collapsed` mode
   to the existing `Breadcrumb` component. File:
   [SlideDeck.tsx](app/src/components/SlideDeck.tsx) — `Breadcrumb`.
2. **Title row stacking**: on `<sm`, drop the controls (font-size + theme
   toggle) onto a second row aligned right. Already mostly handled by
   `flex-wrap`, but the gap looks loose — tighten with
   `flex-col sm:flex-row sm:items-center` in `SlideTitleRow`.
3. **Chapter dots compaction**: on `<sm` with > 6 dots, switch to a compact
   `3 / 8 ›` indicator with tap-to-pop the full list as a sheet. File:
   [SlideDeck.tsx](app/src/components/SlideDeck.tsx) — `slideJumpDots`.

### Phase 2 — Slide content layout (medium effort)

4. **Two-column slides → tabbed on `<md`**: workshop, exercise, JS-assignment
   currently stack editor over instructions on phones, leaving each cramped.
   Switch to a tabbed view on `<md`: `[Code] [Instructions] [Result]`,
   swipeable. Files:
   [JsWorkshopSlideView.tsx](app/src/components/JsWorkshopSlideView.tsx),
   [JsAssignmentSlideView.tsx](app/src/components/JsAssignmentSlideView.tsx),
   [JsTypedAssignmentSlideView.tsx](app/src/components/JsTypedAssignmentSlideView.tsx),
   [ExerciseSlideView.tsx](app/src/components/ExerciseSlideView.tsx).
5. **Allegory scenes**: most are SVG with fixed pixel dimensions. Wrap each in
   `max-w-full`, ensure `viewBox` is set. Audit
   [scenes/](app/src/components/scenes/) and
   [allegories/](app/src/components/allegories/).
6. **Chip puzzle**: code panel can overflow horizontally on long lines. Add
   `overflow-x-auto`. File:
   [JsChipAssignmentSlideView.tsx](app/src/components/JsChipAssignmentSlideView.tsx).

### Phase 3 — Editor experience (high effort)

7. **Monaco on phone** — pick one:
   - **Option A (recommended)**: detect viewport `<sm`, swap Monaco for a
     native `<textarea>` with monospace + simple syntax highlighting. Cheaper,
     much better mobile UX. Write a `<CodeEditor>` wrapper that picks Monaco
     vs textarea by viewport.
   - **Option B**: keep Monaco but force `wordWrap: "on"`, hide minimap (already
     done), enlarge tap targets. Still cramped.
8. **Soft keyboard handling**: when the keyboard pops, the slide collapses. Use
   `100dvh` instead of `100vh` for the root container so the layout shrinks
   gracefully. Single line change in [index.css](app/src/index.css).

### Phase 4 — Touch & navigation (low effort, polish)

9. **Swipe between slides**: horizontal swipe = arrow keys. Useful for
   explanation slides with many steps.
10. **Hit-target sizes**: bump back/check/restart buttons to `min-h-[44px]` on
    `<sm` (Apple HIG minimum tap target).
11. **Hover-only affordances**: the hover ring on tier-menu cards doesn't appear
    on touch. Add `active:` states for tactile feedback.

### Phase 5 — Verification

12. Test in Playwright at three viewports per route. Snapshot.
13. Add `npm run test:responsive` script that boots the dev server and runs the
    Playwright matrix.

## Recommended starting point

**Phase 1 + the Monaco-on-phone swap (item 7A)** together fix ~80% of the
mobile pain. Phase 2 (tabbed two-column) is the next big jump in usability but
bigger surgery. Phase 4 is polish — wait until the rest is solid.
