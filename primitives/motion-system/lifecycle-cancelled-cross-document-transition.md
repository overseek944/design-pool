---
id: lifecycle-cancelled-cross-document-transition
category: motion-system
tags: [view-transition,navigation,accessibility,progressive-enhancement,architecture]
axes: none
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---

A cross-document transition is opted in by an at-rule, so the only runtime say a
page gets is two events — `pageswap` as a document is left, `pagereveal` as one
arrives. Both carry the transition object, and `skipTransition()` on either
cancels the animation while the navigation proceeds. That is the branch a media
query cannot reach: a session-scoped motion switch, an inferred input modality,
one route pair that should cut. Keep the outgoing half 0.5–0.7× the incoming so
the new page never waits on the old.

```js
const gate = e => { if (animate()) return
  e.viewTransition?.ready.catch(() => {})     // rejects on every skip
  e.viewTransition?.skipTransition() }
for (const n of ['pageswap', 'pagereveal']) addEventListener(n, gate)
```
⚠ Bind both. Skipping on the way out still lets the arriving document animate
its own half, and the two documents decide independently.
