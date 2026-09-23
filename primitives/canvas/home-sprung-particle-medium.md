---
id: home-sprung-particle-medium
category: canvas
tags: [canvas,field,pointer,motion,generative]
axes: {energy: 2, density: 3, weight: 2, finish: 5}
cost: 3
seen: 4
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

Variant — the pointer as a displacer, not a flow. Inside a radius the pointer
pushes each mark straight away with a linear falloff, `(1 − d/R)`; outside it,
the spring alone acts, and a velocity damping multiplier bleeds the motion off so
marks settle rather than orbit home. R 60–110px, spring 0.05–0.12 per frame,
damping 0.8–0.9. Compare squared distance against R² before any `sqrt`.
```js
if (d2 < R * R) { const d = Math.sqrt(d2), f = (1 - d / R) * push
  ax += dx / d * f; ay += dy / d * f }
vx = (vx + ax) * damp; vy = (vy + ay) * damp
```
⚠ Stop the frame loop while the canvas is out of view and under reduced motion
draw each mark once at home — the field is still the figure, just not a toy.
