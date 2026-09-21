---
id: tilted-heightfield-mark-sheet
category: canvas
tags: [canvas,3d,projection,field,depth,scenery]
axes: {energy: 2, density: 3, weight: 1, finish: 4}
cost: 3
seen: 2
requires: []
conflicts: []
completes: []
tension: []
---
Deep scenery on a 2D context needs no renderer: sample a summed-sine field over
a `u,v` grid, tilt it, divide by depth, draw a mark per sample. It reads as
terrain at a shallow angle, waves rolling as the phase advances. A few big sheets
at varied tilts beat a hundred small ones.

```js
const h = a*Math.sin(f*u + t*s) * Math.cos(g*v)     // + 1–2 octaves
const y = -h*cosT - v*sinT, z = -h*sinT + v*cosT, k = 3.2/(3.2 - z)
ctx.globalAlpha = alpha * (1 - u**4) * (1 - v**4)   // edges, not a rectangle
```
⚠ Cost is `nu * nv` draws per sheet per frame — cap near 110 × 30, cull
offscreen samples first.

Splatting is the wrong direction whenever the sample grid and the output cells
are different lattices. Parametric samples land wherever the parameterisation
puts them, so as the field animates each one crosses a cell boundary on its own
schedule and the sheet scintillates — worse where samples pile up and the
nearest-wins test flips between two of them. Invert the loop: iterate the
*output* cells and solve the field at each one's own position. The pass is then
deterministic per frame, carries no temporal state, and answers input in one
frame with no shimmer and no ghosting to blend away.
```js
for (let y = 0; y < rows; y++) for (let x = 0; x < cols; x++)   // gather
  lum[x + y * cols] = solve(rayThrough(x + .5, y + .5))         // not scatter
```
⚠ Cost moves from sample count to cell count, so it no longer falls when the
form is small in frame. Gate each cell against an analytic bound first — a
bounding sphere, a screen-space box — and the empty ones cost one test.
