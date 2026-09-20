---
id: generation-guarded-sequence
category: motion-system
tags: [animation,architecture,correctness,cancellation,sequence]
axes: none
cost: 2
seen: 1
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
