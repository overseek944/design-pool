---
id: sine-fold-isoline-field
category: canvas
tags: [canvas,generative,contour,isoline,topographic,field,texture]
axes: {energy: 2, density: 3, weight: 2, finish: 4}
cost: 2
seen: 2
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

A single level can be drawn in dots rather than stroke. Window the field with
two smoothsteps — rising at the band's lower edge, falling at its upper — and
admit a lattice cell only where a static per-cell hash falls under half that
weight. The contour reads as a dotted survey line that thins at its shoulders,
and as the field drifts the dots switch on and off in place instead of sliding.
Band 0.1–0.25 of the value range, pitch 5–8px.
```js
const w = ss(.34, .46, v) * (1 - ss(.56, .68, v))
if (w > .02 && hash(c, r) < .5 * w) dot(c * P, r * P)
```
⚠ Pitch sets the tightest readable bend — under ~4 cells across a curve the
line dissolves into scatter.
