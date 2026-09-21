---
id: plane-mapped-context-matrix
category: canvas
tags: [canvas,projection,geometry,transform,3d,precomputed]
axes: {energy: 1, density: 2, weight: 2, finish: 5}
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Foreshortening a plane onto a 2D context is usually written as a pair of
formulas for `x` and `y`, which serves points and nothing else. Write the same
map as four constants — the projected images of the plane's two unit axes — and
it is also a `setTransform` argument. Points go through it by hand; anything
already rasterised goes through whole, and an in-plane rotation is the matrix
product, so a baked layer spins *within* the tilted plane rather than on the
screen. Axes 15–30° apart in elevation.

```js
const A = [Math.cos(ax), Math.sin(ax)], B = [-Math.cos(bx), Math.sin(bx)]
const to = (x, y) => [cx + A[0]*x + B[0]*y, cy + A[1]*x + B[1]*y]
const c = Math.cos(t), s = Math.sin(t)     // rotate in-plane, then project
ctx.setTransform(A[0]*c + B[0]*s, A[1]*c + B[1]*s, -A[0]*s + B[0]*c, -A[1]*s + B[1]*c, cx, cy)
```
⚠ Affine, so nothing recedes — depth needs a separate cue off the projected
coordinate. Unequal axes scale line widths unevenly; stroke outside it.
