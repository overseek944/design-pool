---
id: ordered-dither-threshold-field
category: canvas
tags: [canvas,texture,pattern,raster,two-tone,generative]
axes: {energy: 2, density: 4, weight: 3, finish: 2}
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: [hash-dither-before-quantise]
---
Reduce a continuous field to exactly two colours by comparing each cell against
a fixed 8×8 threshold matrix indexed by its own coordinates. Because the matrix
is a lattice rather than noise, the result is a structured crosshatch that
holds perfectly still under animation and reads as print raster, not as grain —
the quantisation becomes the visual instead of something to hide. Cells 2–6px;
below 2px the lattice stops resolving and the field reads as flat mid-tone.

```js
const M=[0,32,8,40,2,34,10,42,48,16,56,24,50,18,58,26,/* …64 entries */]
const t = (x, y) => (M[((y & 7) << 3) | (x & 7)] + .5) / 64
px[i] = density > t(x, y) ? INK : GROUND     // density 0–1
```
⚠ Two tones only — contrast is whatever the pair gives, so text over it needs
its own ground. The lattice beats against a display scale that is not an
integer multiple of the cell.
