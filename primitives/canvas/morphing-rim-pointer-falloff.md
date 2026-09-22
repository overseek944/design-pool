---
id: morphing-rim-pointer-falloff
category: canvas
tags: [shader,pointer,falloff,field,organic,hover]
axes: {energy: 3, density: 3, weight: 2, finish: 4}
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A pointer reveal with a circular falloff announces its own maths — the clean
disc is the tell. Modulate the radius and the softness by a few summed sines of
position and time, then add small angular and sheared ripples on top: the rim
writhes, never closes into a circle, and keeps moving while the pointer rests.
Radius noise 0.2–0.5, three terms at incommensurate rates, ripples ≤ 0.1.

```glsl
float n = .42*sin(uv.x*F + t*1.7 + sin(uv.y*17. - t*1.1)*2.2)
        + .35*sin(uv.y*F*.82 - t*1.35) + .23*sin((uv.x + uv.y)*F*.58 + t*1.9);
float r = R * (1. + n * uAmt), base = 1. - smoothstep(r, r + soft, length(d));
float f = clamp(base + .08*sin(atan(d.y, d.x + 1e-4)*5. + t*1.4), 0., 1.);
```
⚠ `atan(0,0)` is undefined in GLSL — offset `d` or the pixel under the pointer
can go NaN. Gate by an eased active flag or the shape pops in at full size.
