---
id: harmonic-feedback-uv-warp
category: canvas
tags: [shader, generative, texture, field, webgl, noise]
axes: {energy: 2, density: 3, weight: 2, finish: 5}
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---

Adding one displacement to a coordinate bends a field; feeding the result back
in folds it. Loop terms whose amplitude falls as `1/i` while frequency rises
with `i`, and cross the axes — x displaced by a function of y, y by the
already-displaced x — so every pass warps what the last one wrote. Cheap
cosines then yield the filaments and ribbons no single-pass turbulence reaches.
Iterations 3–12, amplitude 0.1–1.5.

```glsl
for (float i = 1.; i <= uIters; i++) {
  uv.x += uSwirl / i * cos(t + i * 1.5 * uv.y);
  uv.y += uSwirl / i * cos(t + i * 1.0 * uv.x);
}
```
⚠ Amplitude past ~2 folds the domain onto itself and the field tears into
seams. Clamp the trip count against a literal bound — a loop over a raw uniform
will not compile everywhere.
