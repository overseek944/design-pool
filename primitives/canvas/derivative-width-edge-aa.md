---
id: derivative-width-edge-aa
category: canvas
tags: [shader,canvas,precision,correctness,detail]
axes: none
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A procedural shape in a fragment shader gets no antialiasing for free: `step` on
a distance gives a hard crawling edge, and a hand-picked `smoothstep` band is
mush when the shape is large and still aliased when it is small. Ask the
derivative instead. `fwidth(d)` is how much that distance changes across one
pixel, so blending over ±it is exactly one pixel of softness at every scale,
zoom and device ratio. Floor it — 0.001–0.015 of the distance's own range — or
edges at glancing angles, where the derivative collapses, shimmer or disappear.

```glsl
float aa = max(fwidth(d), 0.012);
float shape = 1.0 - smoothstep(r - aa, r + aa, d);
```
⚠ `fwidth` is a fragment-stage derivative taken across a 2×2 quad and is
undefined inside non-uniform control flow — compute it before any branch that
can differ between neighbouring pixels.
