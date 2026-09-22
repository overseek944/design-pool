---
id: index-grid-vertex-line-family
category: canvas
tags: [canvas,shader,webgl,lines,noise,field,performance]
axes: {energy: 2, density: 4, weight: 1, finish: 5}
cost: 3
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Hundreds of noise-displaced lines need no CPU geometry. Upload one static buffer
of `(line, segment)` index pairs; the vertex shader derives every position, and
each line is one `LINE_STRIP`. Lag each line's noise clock by its index so
disturbances travel across the family; a bell over the index keeps edges calm.
Lines 120–280, segments 300–520; halve both below 768px.

```glsl
float lt = a_index.x / (u_numLines - 1.0);
float amp = mix(.005, .26, exp(-pow((lt - .58) / .28, 2.0)));
float n = snoise(p + (u_time - lt * 1.2) * .9);  // lag 0.8–1.5
```
⚠ `lineWidth` is fixed at 1 on most GPUs — weight comes from count and alpha.
