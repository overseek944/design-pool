---
id: curl-of-potential-field
category: canvas
tags: [canvas,flow,field,generative,motion]
axes: {energy: 2, density: 3, weight: 2, finish: 4}
cost: 3
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Advecting anything through a hand-made velocity field pools it in sinks and
strips it from sources, because the field has divergence — and removing that is
the pressure solve that makes fluid solvers expensive. Skip it. Take any smooth
scalar potential and use its perpendicular gradient, `(∂ψ/∂y, −∂ψ/∂x)`, which is
divergence-free by construction. Two or three `sin·cos` terms with time in the
phase give a flow that curls and folds and never settles. Amplitude 5–15 cells
per second, derivative sampled at 0.03–0.1 of the domain.

```js
const psi = (x, y, t) => Math.sin(x*1.7 + t) * Math.cos(y*2.3 - t*.7)
const e = .06, k = 9
const vx =  (psi(x, y+e, t) - psi(x, y-e, t)) * k
const vy = -(psi(x+e, y, t) - psi(x-e, y, t)) * k
```
⚠ It is not a fluid — nothing carried pushes back, so the field cannot respond
to what it moves. The sum is periodic: give the terms incommensurate
frequencies or the loop surfaces within a minute.
