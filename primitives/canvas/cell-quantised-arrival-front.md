---
id: cell-quantised-arrival-front
category: canvas
tags: [shader,reveal,grid,quantise,front,texture]
axes: {energy: 3, density: 3, weight: 2, finish: 4}
cost: 3
seen: 2
requires: []
conflicts: []
completes: []
tension: []
---
A reveal front evaluated per pixel is a soft edge crossing a picture — a wipe,
never construction. Snap the sample point to a cell centre and every pixel in
that cell resolves on one clock: the image assembles as bodies arriving. Correct
for aspect or the front is an ellipse. 24–80 cells across — fewer reads as
blocks, more is a wipe.

```glsl
vec2 grid = vec2(uTile, uTile / aspect);
vec2 mid  = (floor(vUv * grid) + 0.5) / grid;
float far = length(vec2((mid.x - .5) * aspect, mid.y - .5));
```
⚠ The grid is independent of the texture — at low counts sample the source at
`mid` too, or a cell carries detail its timing denies.

The distance metric is the front's shape. Euclidean distance from the centre
reaches 1 only at the corners, so an inward sweep reads as a disc closing inside
the panel; `max(|dx|/cx, |dy|/cy)` is 1 along the whole perimeter, so the
closing edge is the panel's own rectangle. Add a fraction of each cell's angle
to its delay and cells at one radius no longer fire together — an iris becomes a
vortex. Normalise by `1 + swirl` so the field still finishes in one sweep.
Swirl 0.2–0.5 of a turn.
```js
const box = Math.max(Math.abs(dx) / cx, Math.abs(dy) / cy)
const delay = ((1 - box) + SWIRL * (Math.atan2(dy, dx) / TAU + .5)) / (1 + SWIRL)
```
⚠ A looping field has a seam at its wrap — cells ending bright and restarting
dark make a visible travelling step. Match the cycle's end state to its start.
