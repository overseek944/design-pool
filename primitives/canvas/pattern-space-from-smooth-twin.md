---
id: pattern-space-from-smooth-twin
category: canvas
tags: [canvas,shader,grid,noise,correctness,generative]
axes: none
cost: 3
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A ruled overlay drawn in a noisy surface's coordinates inherits the noise:
its lines swim though the form beneath is steady. Define a filtered
twin — base shape and interaction, no high-frequency terms — and re-solve the
ray against *that* from the hit already found. Four Newton steps converge;
the pattern then tracks the form, not the noise.

```glsl
// F = p.y - twin(p.xz), dF = its derivative along the ray
for (int i = 0; i < 4; i++) { t -= F / dF; p = ro + rd * t; }
```
⚠ Converges only near the original hit — cap the iterations and fall back to
it, or a grazing ray walks to infinity.
