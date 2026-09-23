---
id: depth-weighted-cell-seam
category: surface
tags: [surface,section,edge,grid,pixel,transition,generative]
axes: {energy: 2, density: 4, weight: 3, finish: 2}
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Hand a light section to a dark one through a band of square cells, not a
line. Each cell takes the next ground with a probability rising by row, from
0–10% to 90–100%, so the edge erodes like a raster. 3–8% of cells draw from the
accent palette. Seed the generator so server and client agree. Cells 32–64px,
6–12 rows, hairlines on the light rows only.

```js
const on = rand() < (row + .5) / rows          // seeded PRNG, never Math.random
cell.style.background = rand() < .05 ? pick(accents) : on ? DARK : LIGHT
```
⚠ Decorative — one `aria-hidden` element per band, painted as a single canvas
or gradient list past ~400 cells.
