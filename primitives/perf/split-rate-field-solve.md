---
id: split-rate-field-solve
category: perf
tags: [performance,canvas,field,grid,pointer,batching]
axes: none
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A field with an expensive ambient term and a cheap pointer term need not solve
both every frame. Cache the ambient value per cell, re-solve it every Nth
frame, and take the max with the live pointer term. Slow drift hides the stale
frames; what the reader steers keeps full rate. N 2–4, or 4–6 on touch.

```js
if (frame++ % N === 0) for (let i = 0; i < n; i++) amb[i] = ambient(i, t)
for (let i = 0; i < n; i++) v = Math.max(amb[i], pointer(i)), draw(i, v)
```
⚠ Past roughly 1/8 of the ambient cycle per solve the drift visibly steps.
Seed a fixed PRNG so a resize doesn't reshuffle the field.
