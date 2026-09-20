---
id: liveness-floor-reseed
category: canvas
tags: [canvas,generative,simulation,ambient,lifecycle,correctness]
axes: none
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Most interesting generative rules are also mortal. A lattice, a flock or a
reaction field left running settles into a still pattern or empties outright,
and the ambient layer that was the page's pulse quietly becomes a picture — a
failure with no error and no frame drop, so nothing catches it. Measure the
system's own liveness every step — live cells, total velocity, variance — and
inject seeds below a floor of roughly 2–4% of capacity. Seed with a few
known-productive patterns at random positions and rotations; uniform noise
mostly dies on the next step.

```js
if (grid.reduce((a, b) => a + b, 0) < cells * 0.025) seed(grid, 6)
```
⚠ Inject a small fixed batch and let the next step re-measure — reseeding
proportionally to the deficit overshoots and the field pulses.
