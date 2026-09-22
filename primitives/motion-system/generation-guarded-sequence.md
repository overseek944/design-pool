---
id: generation-guarded-sequence
category: motion-system
tags: [animation,architecture,correctness,cancellation,sequence]
axes: none
cost: 2
seen: 4
requires: []
conflicts: []
completes: []
tension: []
---
A choreography written as a chain of `await`s has no cancel. A replay press or
a second entry starts another run that interleaves with the first, writing the
same nodes. Give the runner a monotonic id, capture it on entry, and re-check
it after every wait — throwing one shared sentinel, so the chain unwinds
through a single `catch` rather than a guard per step. Newest run wins,
teardown lives in one place. One counter per stage, never per page.
```js
let gen = 0; const ABORT = Symbol('abort')
const beat = (me, ms) => wait(ms).then(() => { if (me !== gen) throw ABORT })
const play = async () => { const me = ++gen
  await beat(me, 600); step1(); await beat(me, 400); step2() }
play().catch(e => { if (e !== ABORT) reset() })
```
⚠ An `AbortController` says *stop*, not *a newer run started*, and a boolean
flag cannot tell which run cleared it. Compare the sentinel by identity and
never subclass `Error`, or a generic handler upstream swallows the unwind.

The same counter is the fix for an async *data* race, where the bug is usually
in the `finally`. A filter change starts a new request while the previous page
is still in flight; the late response appends rows the reader no longer asked
for, and its cleanup clears the in-flight flag and the has-more flag belonging
to the run that is still going. Bump the counter wherever the query identity
changes, capture it once, and gate the success path *and* the cleanup on it.
```js
const me = ++gen
try { const r = await fetch(url); if (me !== gen) return; apply(r) }
finally { if (me === gen) { busy = false } }
```
⚠ `AbortController` cancels the request but not the handler already queued —
keep the counter even when both are in use.
