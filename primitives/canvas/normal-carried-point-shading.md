---
id: normal-carried-point-shading
category: canvas
tags: [canvas,points,lighting,shading,depth,ambient,3d]
axes: {energy: 2, density: 3, weight: 2, finish: 5}
cost: 3
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A dot cloud sampled from a surface reads as a solid only if each dot is lit.
Store the surface normal beside every sampled position, rotate both with the
same matrix, and shade per dot: diffuse, a rim term from how edge-on it faces,
a tight specular and an ambient floor. Lerp between a shadow tone and a lit
tone by the sum. Grid 40–80 × 20–40; specular power 6–16.

```js
const d = Math.max(0, nx*L.x + ny*L.y + nz*L.z)
const s = d*.6 + (1 - Math.abs(nz))**2 * .5 + d**8 * .3 + .25
ctx.fillStyle = mix(shade, lit, Math.min(1, s))
```
⚠ Every dot is a fill call — halve the grid on narrow screens.
