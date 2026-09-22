---
id: hemisphere-lit-point-sprite
category: canvas
tags: [shader, webgl, points, lighting, sprite]
axes: {energy: 1, density: 3, weight: 2, finish: 4}
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Thousands of flat disc sprites read as confetti. Treat each point as the front
of a sphere: rebuild the normal's depth from the sprite coordinate and weight
a diffuse term by it — a lit centre and darker rim for one square root. Divide
size by view depth for parallax. Ambient 0.45–0.65, lit 0.35–0.55, feather
0.2–0.35.

```glsl
vec2 uv = gl_PointCoord * 2.0 - 1.0; float r2 = dot(uv, uv);
if (r2 > 1.0) discard;
float lit = 0.55 + 0.45 * sqrt(1.0 - r2);
fragColor = vec4(vColor * lit, smoothstep(1.0, 0.7, sqrt(r2)) * vAlpha);
```
⚠ `gl_PointSize` is capped per driver (often 64–256px) — clamp it, or near
points silently stop growing as the camera pushes in.
