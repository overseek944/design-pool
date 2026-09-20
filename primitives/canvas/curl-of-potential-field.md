---
id: curl-of-potential-field
category: canvas
tags: [canvas,flow,field,generative,motion]
axes: {energy: 2, density: 3, weight: 2, finish: 4}
cost: 3
seen: 2
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

Where there *is* a solver, the same field is what should drive it: add the
perpendicular gradient as a body force each step instead of injecting splats.
Being divergence-free, it survives the pressure projection intact — the solve
has nothing to undo — while the fluid still answers the pointer and its own
boundaries, so nothing ever reads as an injection event and nothing settles.
Build ψ as a sum of plane waves and the gradient is closed form: no epsilon, no
extra samples. Strength 8–20 domain widths per second, wave vectors
incommensurate.
```glsl
vec2 g = vec2(0.0);                                            // ∇ψ, exactly
g += 0.9 * cos(dot(vec2(2.1, 1.3), p) + 0.21 * uTime) * vec2(2.1, 1.3);
g += 0.6 * cos(dot(vec2(-1.7, 2.6), p) - 0.17 * uTime) * vec2(-1.7, 2.6);
v += vec2(g.y, -g.x) * uStrength * dt;         // divergence-free body force
```
⚠ Scale `p` by the aspect ratio or the waves stretch with the viewport. The
solver's own dissipation eats injected velocity every step, so the strength
that reads right here is well above what the same field needs used directly.
