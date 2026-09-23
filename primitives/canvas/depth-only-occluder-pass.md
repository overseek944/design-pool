---
id: depth-only-occluder-pass
category: canvas
tags: [webgl, depth, occlusion, points, wireframe]
axes: none
cost: 1
seen: 2
requires: []
conflicts: []
completes: []
tension: []
---
Points, lines and wireframes have no faces, so everything behind an object
shows through it and the scene reads as glass. Draw the source meshes a second
time with colour writes off and depth writes on, first, pushed slightly back
with polygon offset: they paint nothing yet hide whatever lies behind them.
Solidity comes back at the cost of a depth-only pass. Offset factor 1–2, units
1–4.

```js
const occluder = new MeshBasicMaterial({ colorWrite: false, depthWrite: true,
  polygonOffset: true, polygonOffsetFactor: 1, polygonOffsetUnits: 2 })
const m = new Mesh(mergedSolids, occluder); m.renderOrder = -1
```
⚠ Too little offset and surface points z-fight with their own occluder, flickering
in and out — raise units before factor.

The occluder may paint instead of hiding. Draw the surface grid as filled
triangles in a near-ground tone, then the same vertex buffer again as points,
through one program branching on a uniform. The solid pass carries what points
cannot — contour bands from `fract()` of height, depth fog, dither — so the
field reads as lit sampling over a mass rather than dust. Ground 0.03–0.15.
```glsl
if (uPoints > .5) gl_FragColor = vec4(ink, a * edge);
else gl_FragColor = vec4(base + contour * .06 + dither, 1.);
```
⚠ Same buffer, two draws — keep the point pass's depth test on and
depth writes off, or near points erase each other's halo.
