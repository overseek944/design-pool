---
id: shell-reprojected-displacement
category: canvas
tags: [shader,canvas,generative,noise,silhouette,geometry]
axes: {energy: 2, density: 3, weight: 2, finish: 5}
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Noise added straight to a point on a generated form moves it outward as well as
across the surface, so the outline grows fur and the silhouette — the only part
of a form read at a glance — stops being a shape. Displace, then divide by the
new length and multiply by the radius that point was born at. The motion
survives as pure sliding over the surface and the outline is guaranteed, not
tuned. Drift 0.03–0.09 of the radius.

```glsl
vec3 d = position + noise3(aNoise + uTime) * uDrift * aDrift;
vec3 p = d * (aRadius * uBreathe / max(length(d), 1e-4));
```
⚠ Every later term must preserve radius too — rotation does, an offset does
not. Re-projection also kills radial breathing; it returns as a factor on the
target radius, never on the displaced position.
