---
id: tilted-heightfield-mark-sheet
category: canvas
tags: [canvas,3d,projection,field,depth,scenery]
axes: {energy: 2, density: 3, weight: 1, finish: 4}
cost: 3
seen: 1
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
