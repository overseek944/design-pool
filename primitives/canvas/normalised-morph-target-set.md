---
id: normalised-morph-target-set
category: canvas
tags: [canvas,particles,morph,generative,shape]
axes: {energy: 3, density: 4, weight: 2, finish: 4}
cost: 3
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
One field of marks can be several forms. Write each form as a pure function of
particle index and count, keep a live position per mark, and lerp it toward the
current form's target every frame — switching form is refilling the target
array. Normalise each set by its own largest radius first, or a torus and a
knot occupy different envelopes and the cycle reads as breathing rather than
transforming. Lerp 0.008–0.03; hold each form 5–10s.

```js
targets.forEach((_, i) => t[i] = shapes[k].fn(i, n))
const s = 1 / Math.max(...t.map(len))            // same envelope for every form
p[i] += (t[i] * s - p[i]) * MORPH                // MORPH ≈ 0.01
```
⚠ A constant lerp never arrives, so no frame shows any form exactly. Seed
positions from the first target rather than zero, or the field explodes outward
on the opening frame.
