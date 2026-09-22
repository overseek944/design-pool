---
id: patch-subdivided-context-texture
category: canvas
tags: [canvas,projection,3d,texture,perspective,drawimage]
axes: {energy: 2, density: 3, weight: 2, finish: 4}
cost: 3
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A 2D context draws images only through affine matrices, so a textured face in
perspective shears instead of receding. Split the face into an N×N grid,
project each vertex with the true perspective divide, then draw each patch
alone: its matrix comes from the projected patch's two edges, and `drawImage`
copies just that source cell. Small patches hide the affine error. Grid 6–12
per face; cull back faces.

```js
const a = (X[j+1]-X[j])/d, b = (Y[j+1]-Y[j])/d, c = (X[j+n]-X[j])/d, e = (Y[j+n]-Y[j])/d
ctx.setTransform(a, b, c, e, X[j] - a*u - c*v, Y[j] - b*u - e*v)
ctx.drawImage(tex, u, v, d, d, u, v, d, d)
```
⚠ Shared edges antialias twice into hairline seams — paint a flat base first.
