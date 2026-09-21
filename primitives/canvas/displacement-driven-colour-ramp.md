---
id: displacement-driven-colour-ramp
category: canvas
tags: [shader,gradient,surface,generative,ambient]
axes: {energy: 2, density: 2, weight: 2, finish: 5}
cost: 3
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A displaced surface normally needs a light to be legible — normals, a lambert
term, a shadow pass. Skip all of it: pass the scalar that raised the geometry
to the fragment stage and use it as position along a multi-stop colour ramp.
Crests take the late stops, troughs the early ones, and the form reads as
folded material lit from nowhere. Stop positions ride as a uniform, so banding
is redistributed without touching the palette. Height 0.2–0.6 of the plane's
short side.

```glsl
// vertex: float t = field(uv, uTime); position.z += t * uHeight; vPos = t;
float c = smoothstep(0., 1., vPos);
vec3 col = mix(c1, c2, smoothstep(uStops.x, uStops.y, c));
col = mix(col, c3, smoothstep(uStops.y, uStops.z, c));
```
⚠ Stops must stay strictly increasing — one crossed pair reverses a
`smoothstep` and the surface turns inside out with no error raised. Adjacent
stops need real separation or the fold hardens into a contour line.
