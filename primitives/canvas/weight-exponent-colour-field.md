---
id: weight-exponent-colour-field
category: canvas
tags: [shader,canvas,field,generative,color,ambient,webgl]
axes: {energy: 2, density: 2, weight: 3, finish: 5}
cost: 3
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---

A mesh gradient in a fragment shader needs no stops or geometry. Give a few
coloured points drifting positions, weight each against the pixel by
`1 / (d^p + ε)`, and divide the accumulated colour by the total weight —
continuous everywhere, no seam to hide. The exponent is the whole shape control:
near 1 the hues wash to mud, by 4 each point holds a near-solid cell with soft
joins. The palette is reshaped by one scalar. Points 3–8, `p` 2.5–4, `ε` 1e-3.

```glsl
for (int i = 0; i < MAX; i++) {        // bound constant, count a break
  if (i >= int(u_count)) break;
  float w = 1. / (pow(length(uv - pos(i,t)), u_p) + 1e-3);
  rgb += u_colors[i].rgb * w; total += w;
}
fragColor = vec4(rgb / max(total, 1e-4), 1);
```
⚠ Normalising by the total desaturates — every pixel blends every source, so the
field reads greyer than its swatches. Pick the colours against the composite.
A uniform loop bound will not compile on some drivers.
