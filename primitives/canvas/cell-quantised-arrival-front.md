---
id: cell-quantised-arrival-front
category: canvas
tags: [shader,reveal,grid,quantise,front,texture]
axes: {energy: 3, density: 3, weight: 2, finish: 4}
cost: 3
seen: 1
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
