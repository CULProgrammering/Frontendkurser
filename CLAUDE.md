# Frontendkurser — Project Instructions

## Lab Exercise Authoring

When you author or modify a Monaco lab exercise (`kind: "exercise"` slide in any
`app/src/lessons/**/*.ts` file), you MUST also update [scripts/test-labs.ts](app/scripts/test-labs.ts)
in the same change:

1. **Add or update a known-good solution** for the lab in the `SOLUTIONS` array
   — student code that satisfies every user story.
2. **Run the harness:** `cd app && npx tsx scripts/test-labs.ts`
3. **Confirm all assertions pass** before reporting the lab as done.

The harness imports the actual lesson modules and evaluates each assertion the
same way the iframe runner does (vm sandbox, console capture, `window.__userSrc`).
Skipping it means shipping assertions that may have regex typos, off-by-one bugs,
or impossible requirements — bugs that are invisible at the TypeScript build
level because assertions are strings.

**Forbidden:** claiming a lab is "ready" or "tested" without a green run of the
harness in the current session. Reading the assertion strings is not testing.

When the iframe runner itself changes (e.g. new globals exposed, capture
behavior changes), update the harness's sandbox setup to mirror the change so
the two stay in sync.
