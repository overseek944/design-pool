---
id: home-sprung-particle-medium
category: canvas
tags: [canvas,field,pointer,motion,generative]
axes: {energy: 2, density: 3, weight: 2, finish: 5}
cost: 3
seen: 3
requires: []
conflicts: []
completes: []
tension: []
---
A field of marks positioned *from* the pointer each frame travels with it and reads
as attached decoration. Give every mark a fixed home cell and a persistent world
position instead, and let the driver contribute only force: the mark integrates it,
a weak spring pulls it home, and the medium is left behind to react, lag and
recover. Fade the spring where the drive is strong — `(1 − t)²` — so it restores the
background without fighting the flow. Settle constant 0.3–0.8s.

```js
const k = ((1 - t) * (1 - t) + 0.08) / lag      // the 0.08 floor is not optional
vx += (homeX - px) * k; vy += (homeY - py) * k
px += vx * dt; py += vy * dt                    // position persists across frames
```
⚠ Keep that floor. At zero, marks in the strong-drive region are unconstrained
along the flow direction and drift forever instead of resting — the grid quietly
empties from the middle outward.
