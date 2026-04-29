# Frontendkurser — Project Instructions

## Lab Exercise & Workshop Authoring

When you author or modify a Monaco lab exercise (`kind: "exercise"`) **or** a
Workshop slide (`kind: "js-workshop"`) in any `app/src/lessons/**/*.ts` file,
you MUST run the harness in the same change:

```
cd app && npx tsx scripts/test-labs.ts
```

Confirm all assertions pass before reporting the lab/workshop as done.

### Exercise tier (`kind: "exercise"`)

Each exercise lab needs a known-good solution in [scripts/test-labs.ts](app/scripts/test-labs.ts)'s
`SOLUTIONS` array — student code that satisfies every user story. The harness
mimics the iframe runner: vm sandbox, console capture, `window.__userSrc`, and
runs every assertion exactly as the iframe would.

When the iframe runner itself changes (new globals exposed, capture behavior),
update the harness's sandbox setup to mirror the change so the two stay in sync.

### Workshop tier (`kind: "js-workshop"`)

**No SOLUTIONS array entry needed** — the harness walks every workshop slide and
runs each step's authored `reveal` field through `runWorkshopChecks` (the same
function the React layer calls). The reveal IS the canonical solution.

Authoring rule: **every step's `reveal` must pass that step's own `checks`.**
The harness fails the run if it doesn't. If you change the runner itself
(`app/src/runtime/workshopRunner.ts`), the runner-invariants smoke test at the
end of `test-labs.ts` should also be updated to cover the new behavior.

### Why this matters

Skipping the harness means shipping assertions that may have regex typos,
off-by-one bugs, or impossible requirements — bugs invisible at the TypeScript
build level because assertions and `requirePattern`s are strings/regexes.

**Forbidden:** claiming a lab or workshop is "ready" or "tested" without a green
run of the harness in the current session. Reading the assertion strings is not
testing.
