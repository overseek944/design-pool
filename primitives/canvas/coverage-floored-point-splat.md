---
id: coverage-floored-point-splat
category: canvas
tags: [shader, webgl, points, splat, antialiasing]
axes: {energy: 1, density: 4, weight: 1, finish: 5}
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Distant points projected below ~2px shimmer and drop out between frames. Floor
the sprite size instead, and pay for the enlargement in alpha: scale opacity by
the square of projected-over-floored size, so a far point covers a stable disc
with the same total light. Give each point a gaussian footprint rotated and
stretched by a per-point seed, and a field of splats reads as soft material
rather than a grid of dots. Floor 2–3px, cap 3–5px, stretch 1–1.5.

```glsl
float proj = min(size, CAP); gl_PointSize = max(proj, FLOOR);
vCover = pow(proj / gl_PointSize, 2.0);            // vertex
a *= exp(-3.5 * r2) * (1.0 - smoothstep(.8, 1., r2)) * vCover;  // fragment
```
⚠ Many overlapping splats are pure overdraw — budget point count against fill
rate, not vertex count, and cap device pixel ratio.
