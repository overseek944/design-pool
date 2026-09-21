---
id: flush-separated-transition-arming
category: motion-system
tags: [motion,correctness,transition,observer,reveal]
axes: none
cost: 1
seen: 2
requires: []
conflicts: []
completes: []
tension: []
---

A one-shot reveal whose transitions are generated in script — delays computed
from an index or a distance — cannot be armed and played in one tick.
Write the from-state with no `transition` attached, force a style commit, then
attach the declarations and the end state. Set both together and the
element transitions *into* hiding before fighting its way back. The flush also
covers a race that only appears in the field: an observer whose target is
already in view fires in the same task as `observe()`, so a figure
reached by deep link or restored scroll snaps to finished.

```js
el.style.transition = ''; el.style.opacity = 0            // from-state
void el.getBoundingClientRect()                           // commit it — once, for the batch
el.style.transition = `opacity 600ms ${EASE} ${i * 45}ms` // step 30–90ms
el.style.opacity = 1
```
⚠ Only a style-dependent read flushes; `performance.now()` or a cached width
does not, and forcing it per element costs a reflow each.
