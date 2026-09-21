---
id: delay-binned-source-history
category: canvas
tags: [canvas,field,pointer,motion,generative]
axes: {energy: 2, density: 2, weight: 2, finish: 5}
cost: 4
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A field evaluated from the driver's *current* pose updates everywhere at once, and
the medium reads as a projection rather than a substance. Keep a ring buffer of the
driver's pose per frame and evaluate each point against the pose from `now −
distance / c`: the far field then answers late, and a fast drag visibly outruns its
own influence. Sampling the buffer per point is the cost, so precompute one pose per
delay bin and index by distance. 32–64 bins; `c` 500–1500 px/s.

```js
hist[head = (head + 1) % N] = { t, x, y, a }             // one push per frame
for (let b = 0; b < BINS; b++) bin[b] = poseAt(t - b * binDt)
const p = bin[Math.min(BINS - 1, Math.hypot(x - cx, y - cy) * invCdt | 0)]
```
⚠ Ramp the driver's *strength* through the same buffer or switch-on teleports
while every later change propagates. Bin count below ~16 shows the wavefront as
visible rings.
