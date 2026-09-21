---
id: quantised-level-set-gather
category: canvas
tags: [canvas,field,flow,generative,texture]
axes: {energy: 2, density: 3, weight: 2, finish: 5}
cost: 3
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Particles advected through a smooth field spread into a haze: every streamline is
equally occupied, so none of them is visible. Pick a scalar whose level sets *are*
the curves you want, quantise it to a step, and add a restoring force along its
gradient toward the nearest quantised value — the haze collapses onto a countable
family of lines. Gate the force on proximity, 1–2 cells, so only particles already
near a line join it. Gather rate 4–12 per second.

```js
const off = (psi - Math.round(psi / STEP) * STEP) / gm   // signed px to the line
if (Math.abs(off) < s * 1.5) {
  vx -= off * (gx / gm) * rate; vy -= off * (gy / gm) * rate }
```
⚠ Quantise a reparametrisation linear in distance, not the raw scalar — even steps
in an angle-like quantity space the outer lines geometrically farther apart and
leave a void past the last one.
