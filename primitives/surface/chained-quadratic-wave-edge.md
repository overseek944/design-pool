---
id: chained-quadratic-wave-edge
category: surface
tags: [svg,path,wave,band,section,generative]
axes: {energy: 2, density: 2, weight: 2, finish: 3}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: [octave-summed-edge-profile]
---
A regular wave is not an organic profile and needs no per-frame sampling.
Chain relative quadratics, one per hump: control at its midpoint at ±amplitude,
endpoint back on the baseline. A relative `q` ending at `dy 0` returns to the
line it started on, so any number of humps stays on the baseline — no drift, no
closing correction. Alternate the control sign and it is a wave; keep it and it
is a scallop. Two `L`s and a `Z` close it into a fillable band. Humps 4–12,
amplitude 8–20% of the band.

```js
let d = `M 0 ${y}`, w = W / n
for (let i = 0; i < n; i++) d += ` q ${w / 2} ${i % 2 ? a : -a} ${w} 0`
d += ` L ${W} ${H} L 0 ${H} Z`
```
⚠ Exact periodicity is the cost as well as the point: one layer reads as a
decal. It wants a second at another amplitude and phase.
