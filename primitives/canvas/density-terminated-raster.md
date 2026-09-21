---
id: density-terminated-raster
category: canvas
tags: [canvas,texture,image,mask,edge,generative]
axes: {energy: 1, density: 3, weight: 3, finish: 4}
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A generated raster ends at a rectangle unless something is done about it, and
masking its alpha is the wrong fix: fading ink marks toward transparent turns
black into grey, so the boundary reads as a dirty wash rather than ink running
out. Fade the *mark* — multiply each cell's radius by a ramp and cull anything
under a sub-pixel floor. Every surviving dot stays full strength, the field only
gets sparser, and the artwork dissolves into the page with no edge.

```js
const t = smoothstep(rampStart, rampEnd, projected)  // ramp over the last 8–25%
const r = cell * SCALE * (1 - luma) ** gamma * t     // SCALE .5–.7
if (r < FLOOR) continue                              // .1–.25px; cull, not fade
```
⚠ `SCALE` must exceed 0.5 or the darkest cells never close into solid and the
image reads washed. The floor is what hides the ramp — raise it until no single
dot is legible at the tail.
