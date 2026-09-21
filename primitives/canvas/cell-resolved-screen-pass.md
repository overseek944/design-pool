---
id: cell-resolved-screen-pass
category: canvas
tags: [shader,webgl,halftone,texture,render-pass,generative]
axes: {energy: 2, density: 4, weight: 2, finish: 4}
cost: 4
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Screening a render into dots need not change whatever drew it. Add a second
full-screen pass over the first pass's target, and have each fragment sample
that texture at its *cell's centre* rather than at its own coordinate: every
fragment in a cell then reads one value, so the cell resolves to a flat disc
instead of a smeared gradient. Drive both the radius and the position along a
short palette from that one scalar and tone can never disagree with hue. Cell
6–60px, gamma 0.5–8 on the luminance, radius ceiling 0.5–0.7 of the cell.

```glsl
vec2  idx = floor(gl_FragCoord.xy / cell);
float g   = pow(luma(texture(uSrc, (idx + 0.5) * cell / uRes).rgb), uGamma);
float d   = length(fract(gl_FragCoord.xy / cell) - 0.5), r = g * 0.5 * uScale;
float aa  = fwidth(d) + 1e-4;
fragColor = vec4(ramp(g), 1.0 - smoothstep(r - aa, r + aa, d));
```
⚠ The pass is full-resolution whatever the cell size — a 60px cell costs
exactly what a 6px one does. Nothing upstream is quantised either, so an
animating source still needs its own rate cap.
