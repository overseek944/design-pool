---
id: lattice-quantised-mark-draw
category: canvas
tags: [canvas,particles,grid,lattice,generative,texture]
axes: {energy: 2, density: 3, weight: 2, finish: 4}
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A particle field drawn at its simulated position floats over the page; the same
field rounded to a lattice on the way out belongs to it. Leave the simulation
continuous — springs, velocities, sub-pixel drift — and quantise only in the
draw call, to the pitch the page's ruled or dotted ground already uses. Motion reads as
marks stepping between cells rather than sliding, and swarm and background
become one system. Pitch 5–12px,
mark 0.3–0.5 of it.

```js
const p = PITCH                        // read from the ground's own token
ctx.fillRect(p * Math.round(x / p), p * Math.round(y / p), mark, mark)
```
⚠ Sub-pitch motion disappears: anything drifting slower than about a cell a
second visibly stalls. Take the pitch from the custom property the background
reads — hard-coded in the script, the two drift apart at the first retune.
