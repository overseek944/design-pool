---
id: bisected-heightfield-march
category: canvas
tags: [canvas,shader,generative,performance,projection]
axes: none
cost: 4
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A heightfield is not a distance field, so sphere tracing has nothing safe to
step by. Step proportionally to the ray's height above the surface, clamped
both ends; bisect that interval 4–8 times once a step lands below.
Cost concentrates where the ray grazes the surface, and the silhouette
resolves sub-pixel with no fine global step. Step 0.04–0.2 units, 60–120
iterations.

```glsl
float gap = p.y - surface(p.x, p.z);
if (gap < 0.005) return bisect(t - dt, t);   // sign change bracketed
dt = clamp(gap * 0.5, 0.04, 0.2); t += dt;
```
⚠ Overstepping skips thin crests outright — they never register a crossing.
Bail once the ray leaves the domain box, or every miss pays the full loop.
