---
id: uv-reconstructed-sphere-normal
category: canvas
tags: [shader,canvas,light,geometry,generative]
axes: {energy: 2, density: 1, weight: 3, finish: 5}
cost: 2
seen: 1
requires: []
conflicts: []
completes: [derivative-width-edge-aa]
tension: []
---
A lit sphere in a fragment shader needs no geometry, no normal buffer and no
renderer. Inside the unit disc the hemisphere's normal *is* the coordinate plus
the height that closes it, so one square root recovers the surface; dot that
with a light direction and the field reads as a solid body, not a gradient. The
same term rejects the outside, so the silhouette costs nothing. Orbit the light
0.4–2 rad/s, scale the coordinate 1.5–2.5×.

```glsl
float d = 1. - dot(uv, uv);                    // > 0 inside the disc
vec3  n = vec3(uv, sqrt(max(0., d)));
vec3  l = normalize(vec3(cos(1.5 * t), .8, sin(1.25 * t)));
float shade = (.5 + .5 * dot(l, n)) * step(0., d);
```
⚠ The silhouette is a hard `step` and aliases at any size. It is an
orthographic hemisphere: nothing curves away at the rim, so a light swung far
behind flattens rather than terminating.
