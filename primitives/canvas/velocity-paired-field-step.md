---
id: velocity-paired-field-step
category: canvas
tags: [canvas,simulation,shader,texture,solver,generative]
axes: {energy: 3, density: 2, weight: 2, finish: 5}
cost: 3
seen: 1
requires: []
conflicts: []
completes: [absorbing-field-boundary]
tension: []
---
A field stepped by diffusion spreads and dies. One that should *travel* — a
ripple crossing a surface — needs a second-order step: store velocity beside
displacement in the same texel, advance velocity from the Laplacian, then
displacement from velocity. Disturbances propagate at a fixed speed and pass
through each other, which no blur imitates. Speed² 4–16, damping 0.5–2, 2–6
substeps per frame.

```glsl
vec2 s = texture2D(uState, vUv).rg;      // displacement, velocity
s.g += uDt * (uC2 * lap4(uState, vUv) - uDamping * s.g);
s.r += uDt * s.g;
```
⚠ Keep `sqrt(uC2)*uDt/uDx` under ~0.7 or the field reaches NaN within a few
frames — silently, since a NaN texture samples black. Signed velocity needs a
float target.
