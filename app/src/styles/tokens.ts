/**
 * Design tokens — semantic class strings keyed by role.
 *
 * Purpose: every visual decision lives in ONE place so palette / type / radius
 * changes don't need a project-wide grep. Components import the role they
 * need (`tokens.card.surface`) instead of repeating Tailwind utility chains.
 *
 * Conventions:
 * - Light + dark variants share a single string via `dark:` modifiers.
 * - Topic accents live in [topics.ts](../topics.ts) and combine with these
 *   tokens at call-site (e.g. `${tokens.button.primary} ${topic.fg}`).
 * - When promoting an arbitrary `[#...]` colour to a Tailwind token, update
 *   `tailwind.config.js` AND replace usages here in the same change.
 *
 * If you add a new role, prefer extending an existing section over creating
 * a new bucket.
 */

export const tokens = {
  /* ------------------------------------------------------------------ */
  /* Surface & layout                                                    */
  /* ------------------------------------------------------------------ */
  page: {
    /** Outermost background — the page canvas. */
    canvas:
      "bg-[#f6f3ec] dark:bg-[#14161c] text-stone-900 dark:text-stone-100",
    /** Hero / topic-header band — slightly lifted from the canvas. */
    surface:
      "bg-[#fdfaf3] dark:bg-[#1b1e26] border-b border-stone-900/[0.08] dark:border-white/[0.08]",
  },

  card: {
    /** Default lesson / topic / walkthrough card. */
    surface:
      "bg-white dark:bg-[#1f232c] border border-stone-900/[0.08] dark:border-white/[0.08] rounded-xl",
    /** Apply on `<a>` / `<button>` cards alongside `card.surface`. */
    hover:
      "hover:border-stone-900/20 dark:hover:border-white/20 transition-colors",
    /** A card nested inside another card (raised surface). */
    raised:
      "bg-stone-50 dark:bg-[#222630] border border-stone-900/[0.05] dark:border-white/[0.05] rounded-lg",
  },

  divider: {
    subtle: "border-stone-900/[0.05] dark:border-white/[0.05]",
    strong: "border-stone-900/[0.12] dark:border-white/[0.10]",
  },

  /* ------------------------------------------------------------------ */
  /* Typography                                                          */
  /* ------------------------------------------------------------------ */
  text: {
    /** Hero / first-screen heading. */
    h1: "font-display text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight leading-[1.05] text-stone-900 dark:text-stone-100",
    /** Section heading (e.g. "Walkthroughs"). */
    h2: "font-display text-2xl sm:text-3xl font-medium tracking-tight text-stone-900 dark:text-stone-100",
    /** Card titles — survives 30% Swedish growth at this size. */
    h3: "font-display text-lg md:text-xl font-medium leading-snug text-stone-900 dark:text-stone-100",
    body: "text-base leading-relaxed text-stone-900 dark:text-stone-100",
    muted: "text-sm leading-relaxed text-stone-600 dark:text-stone-400",
    /** "STEP 1 / 4 · PUZZLE 2 / 5" etc. */
    eyebrow:
      "text-[10px] uppercase tracking-[0.18em] font-mono font-medium text-stone-500 dark:text-stone-400",
    /** Inline code in prose. */
    codeInline:
      "font-mono text-sm px-1.5 py-0.5 rounded bg-amber-100 dark:bg-amber-950/50 text-amber-900 dark:text-amber-200",
    /** Block code (rare in chrome — most code lives inside Monaco). */
    codeBlock:
      "font-mono text-sm bg-stone-900 dark:bg-[#0f1117] text-stone-100 rounded-lg p-4 leading-relaxed",
  },

  /* ------------------------------------------------------------------ */
  /* Buttons                                                             */
  /* ------------------------------------------------------------------ */
  button: {
    /** Primary action — inverts ink in dark mode. */
    primary:
      "px-5 py-2.5 rounded-lg font-medium text-sm bg-stone-900 dark:bg-[#F0B274] text-stone-50 dark:text-stone-900 hover:opacity-90 transition-opacity",
    secondary:
      "px-4 py-2.5 rounded-lg text-sm border bg-white dark:bg-[#1f232c] border-stone-900/[0.08] dark:border-white/[0.08] text-stone-900 dark:text-stone-100 hover:bg-stone-50 dark:hover:bg-[#252934] transition-colors",
    /** Workshop "Check" / Exercise "Run" — small amber action button. */
    check:
      "px-2.5 py-1 rounded text-[11px] font-medium bg-[#C97A1F] dark:bg-[#F0B274] text-stone-50 dark:text-stone-900 hover:opacity-90 transition-opacity",
    /** Round icon button (theme toggle, font size, language). */
    icon:
      "w-9 h-9 rounded-full grid place-items-center text-sm border border-stone-900/[0.08] dark:border-white/[0.08] text-stone-700 dark:text-stone-300 bg-white dark:bg-[#1f232c] hover:bg-stone-50 dark:hover:bg-[#252934] transition-colors",
  },

  /* ------------------------------------------------------------------ */
  /* Chips & feedback bands                                              */
  /* ------------------------------------------------------------------ */
  chip: {
    idle: "px-3 py-1.5 rounded-md font-mono text-sm border-2 border-transparent bg-amber-50 dark:bg-stone-800 text-stone-800 dark:text-stone-100 cursor-pointer transition-colors",
    correct:
      "border-[#1F8A6E] dark:border-[#5FCAA8] bg-[#D6EFE6] dark:bg-[#163029] text-[#1F8A6E] dark:text-[#5FCAA8]",
    incorrect:
      "border-[#C24A6B] dark:border-[#EE8AA1] bg-[#F4DCE2] dark:bg-[#39202a] text-[#C24A6B] dark:text-[#EE8AA1]",
  },

  /**
   * Feedback bands. Semantic, NOT topic-tied: success borrows the teal from
   * the Conditionals topic, error borrows the rose from Functions. Reusing
   * topic hues keeps the palette tight without coupling success/failure to
   * any specific chapter.
   */
  feedback: {
    success:
      "rounded-lg px-4 py-3 border-l-2 border-[#1F8A6E] dark:border-[#5FCAA8] bg-[#D6EFE6] dark:bg-[#163029] text-[#1F8A6E] dark:text-[#5FCAA8]",
    error:
      "rounded-lg px-4 py-3 border-l-2 border-[#C24A6B] dark:border-[#EE8AA1] bg-[#F4DCE2] dark:bg-[#39202a] text-[#C24A6B] dark:text-[#EE8AA1]",
    idle: "text-xs italic text-stone-500 dark:text-stone-400",
  },

  /* ------------------------------------------------------------------ */
  /* Walkthrough step grid                                               */
  /* ------------------------------------------------------------------ */
  step: {
    /** Each cell — square, hover-lift. Combine with done/current/upcoming. */
    cell: "w-full aspect-square rounded-lg border grid place-items-center font-mono text-sm tabular-nums transition-all hover:scale-[1.02]",
    /** Tiny caption under every 5th cell ("step 5", "step 10", ...). */
    milestone:
      "text-[9px] font-mono uppercase tracking-wider text-stone-500 dark:text-stone-400",
  },

  /* ------------------------------------------------------------------ */
  /* Progress (hero beads + per-card track)                              */
  /* ------------------------------------------------------------------ */
  progress: {
    track:
      "h-1 rounded-full bg-[#e8e2d3] dark:bg-[#2c303a] overflow-hidden",
    /** Filled portion of the track — colour is set inline from the topic accent. */
    fillTransition: "h-full rounded-full transition-all",
    beadFilled: "w-3.5 h-3.5 rounded-sm bg-[#C97A1F] dark:bg-[#F0B274]",
    beadEmpty: "w-3.5 h-3.5 rounded-sm bg-[#e8e2d3] dark:bg-[#2c303a]",
  },
} as const;

/**
 * Thin helper — joins truthy class fragments with spaces. Use when composing
 * `tokens.card.surface` with conditional state classes; avoids the verbose
 * `clsx` import.
 */
export function cx(
  ...parts: Array<string | false | null | undefined>
): string {
  return parts.filter(Boolean).join(" ");
}
