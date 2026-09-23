---
id: cylinder-wrapped-sheet-peel
category: canvas
tags: [webgl,shader,vertex,paper,peel,fold,reveal,interaction]
axes: {energy: 3, density: 2, weight: 3, finish: 5}
cost: 4
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A plane reads as paper when it bends like paper. Every vertex past a fold line
wraps round a cylinder of radius r: pulled back along the fold normal, lifted
by r(1−cos θ). A small resting radius gives a dog-ear that invites the pull;
sweep the fold across the sheet, swelling r mid-travel, to peel it away. Radius 0.05–0.3 of the sheet diagonal; peel
1.2–2s on a quintic smoothstep.

```glsl
float d = max(0., dot(p, dir) - fold), a = d / r;
vec3 q = vec3(p + dir * (r * sin(a) - d), r * (1. - cos(a)));
```
⚠ Tessellate 40–80 segments per side or the roll facets. Render both faces.
