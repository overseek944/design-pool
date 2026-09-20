---
id: facing-weighted-directional-pull
category: canvas
tags: [shader,canvas,pointer,motion,generative]
axes: {energy: 3, density: 2, weight: 3, finish: 5}
cost: 3
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Uniform displacement inflates a form; a form reaching toward something needs
its displacement weighted by which part faces that way. Dot each vertex's own
direction against the pull vector, clamp at zero so the far side stays still,
and raise it to a power — the exponent alone decides whether the surface bulges
broadly or draws out to a point. Over noise it reads as a soft solid being
tugged, not scaled. Exponent 2–5, pull 0.2–0.6 of the radius.

```glsl
float facing = max(dot(normalize(position), uPullDir), 0.0);
vec3 p = position + normal * snoise(position * uFreq + uTime) * uAmp
       + uPullDir * pow(facing, uFocus) * uPull;
```
⚠ `position`, not `normal` — a mesh off its own origin pulls from the wrong
side. On a spinning mesh, rotate the pull vector into object space by the
inverse of that rotation each frame or the bulge slides around the surface.
