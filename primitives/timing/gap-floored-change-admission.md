---
id: gap-floored-change-admission
category: timing
tags: [timing,ambient,state,architecture,rhythm,loop]
axes: {energy: 2, density: 1, weight: 2, finish: 5}
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Ambient elements on independent random intervals eventually change on one
frame, and aliveness reads as churn. Gate admission between timer and effect: a
fired participant queues, released only below the cap and past a floor measured
from the last change's start. Cap 1–2, floor 1.2–2s against a 3–7s interval.

```js
const pump = () => { while (active < CAP && queue.length) {
  const wait = lastStart + FLOOR - now()
  if (wait > 0) return void setTimeout(pump, wait)
  active++; lastStart = now(); begin(queue.shift()) } }
```
⚠ Floor from the start, not from completion — from completion it stretches
with the change duration and drifts. Cap 1 with a floor near the interval
degenerates into a round robin.
