---
id: periodic-organic-blend-scalar
category: canvas
tags: [shader,generative,noise,parameters,surface]
axes: {energy: 2, density: 3, weight: 2, finish: 4}
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Noise alone always reads organic; a periodic function alone always reads
manufactured. Evaluate both over the same coordinates and crossfade them on one
uniform, and a generated field becomes tunable between the two registers
instead of committed to one. A separable lobe function carries a second knob:
its exponent narrows a broad sinusoid into a ridge, so the structured end
travels from swell to corrugation. Blend 0–1, exponent 1–40.

```glsl
float lobe(float x, float e) { return 1. - pow(abs(sin(PI * x * .5)), e); }
float s = lobe(p.x, uPow.x) * lobe(p.y, uPow.y);
float t = mix(snoise(vec3(p, uTime)), s, uBlend);
```
⚠ High exponents make ridges thinner than a pixel at the far edge of a tilted
plane and they alias into crawling moiré — cap the exponent by how far the
surface recedes, or fade the blend toward noise with depth.
