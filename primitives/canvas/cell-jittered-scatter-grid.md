---
id: cell-jittered-scatter-grid
category: canvas
tags: [canvas,scatter,field,layout,responsive,generative]
axes: {energy: 1, density: 3, weight: 2, finish: 3}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Scattering marks from two random draws gives voids and knots, and rejection
sampling fixes it at a distance test against every mark already placed.
Partition the area into cells instead, one mark per cell offset from its centre
by a fraction of the cell: coverage is even by construction, nothing overlaps
without a test, and the count follows the viewport rather than being a constant
wrong at both ends. Cell `max(floor, axis / 7–10)`; jitter 0.2–0.35 of the
shorter side.

```js
const cw = max(160, w / 9), ch = max(120, h / 7), j = min(cw, ch) * .28
for (let r = 0; r < ceil(h / ch); r++) for (let c = 0; c < ceil(w / cw); c++)
  place(cw * (c + .5) + jit(j), ch * (r + .5) + jit(j))   // jit: ±j
```
⚠ Past 0.5 the jitter lets neighbours cross and the guarantee is gone; under
0.15 the lattice reads. The floor on cell size stops a phone drawing a
desktop's count in a tenth of the area.
