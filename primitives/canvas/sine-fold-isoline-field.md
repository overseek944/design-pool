---
id: sine-fold-isoline-field
category: canvas
tags: [canvas,generative,contour,isoline,topographic,field,texture]
axes: {energy: 2, density: 3, weight: 2, finish: 4}
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A smooth scalar field reads as haze; its level sets read as terrain. Skip
marching squares: fold the value through a sine so every level crossing is a
zero, and take the minimum of 2–3 folds at incommensurate frequencies for
uneven, map-like spacing. Frequencies 8–25, line width 0.1–0.25 of the fold's range.

```js
const m = Math.min(Math.abs(Math.sin(15 * v)), Math.abs(Math.sin(9 * v + 1.1)))
const x = Math.max(0, 1 - m / W), line = x * x * (3 - 2 * x)   // W .1–.25
```
⚠ Line width is in value units, not pixels — where the field is steep the
lines thin below a cell and break up. Keep gradients gentle or widen W.
