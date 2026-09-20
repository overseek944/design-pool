---
id: simulation-preroll
category: canvas
tags: [canvas,simulation,lifecycle,loading,generative]
axes: none
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A simulation's worst frame is its first: an empty grid, a lone seed, dye that
has not spread. Never show it. Step the solver 200–600 times before the first
paint — at 2–4× the normal timestep, since nothing is being watched and only
the settled state matters — then render once and fade the layer in over
0.8–2s. It arrives mid-history, already mixed, as something that was running
before the page loaded.

```js
for (let i = 0; i < 420; i++) step(1 / 30)   // coarse dt, nobody watching
render(); canvas.classList.add('ready')      // CSS: opacity 0 → 1 over 1.6s
```
⚠ Blocking work before first paint — 400 steps of a 3ms solve is a second of
frozen main thread. Measure, then cut the count or the grid until it fits. A
coarse `dt` is less stable: advect past one cell a step and the field smears.
