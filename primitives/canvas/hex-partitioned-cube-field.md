---
id: hex-partitioned-cube-field
category: canvas
tags: [canvas,lattice,isometric,generative,ambient,texture]
axes: {energy: 2, density: 3, weight: 1, finish: 5}
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
An isometric cube needs no projection matrix: a regular hexagon's own six
vertices already describe one. Join the centre to alternating vertices and the
hexagon falls into three rhombi — the three visible faces — so a cube field is a
hex lattice with a half-cell row offset and nine points per cell. Fill the three
faces at different alphas and the lattice reads as solid volume while staying a
hairline-weight ground. Radius 24–48px; row pitch 1.5R, column pitch R√3.

```js
const a = i => (60 * i - 90) * Math.PI / 180
const V = [0,1,2,3,4,5].map(i => [R * Math.cos(a(i)), R * Math.sin(a(i))])
const FACES = [[0,1,-1,5], [1,2,3,-1], [5,-1,3,4]]      // -1 = the cell centre
const x = cx + (row & 1 ? R * Math.sqrt(3) / 2 : 0)     // half-cell row offset
```
⚠ Face alphas below about 0.03 apart stop separating and the field collapses
back to flat hexagons. Purely decorative: `aria-hidden`, `pointer-events: none`.
