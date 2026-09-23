---
id: box-bounded-volume-raymarch
category: canvas
tags: [canvas,shader,webgl,volume,3d-texture,raymarch,scientific,data]
axes: {energy: 2, density: 3, weight: 3, finish: 5}
cost: 4
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A scanned or simulated volume can render as translucent matter, not a mesh.
Draw a unit cube's back faces, move the camera into object space, clip the ray
to the box, march 96–256 steps through a `sampler3D`, composite front to back
and exit at α 0.97–0.99. A quadratic opacity ramp keeps noise
faint; exposing its gain peels layers.
```glsl
float s = clamp((texture(uVol, p).r - lo) / (hi - lo), 0., 1.);
float a = s * s * dt * gain;
acc.rgb += (1. - acc.a) * a * vec3(s); acc.a += (1. - acc.a) * a;
```
⚠ WebGL2 only; probe it and fall back to a still. Cost scales with steps — render at DPR 1.
