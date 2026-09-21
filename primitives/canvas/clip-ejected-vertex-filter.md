---
id: clip-ejected-vertex-filter
category: canvas
tags: [shader,webgl,points,culling,perf]
axes: none
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A point cloud whose visible subset changes — a facing hemisphere, one
highlighted group, a threshold — does not need a rebuilt buffer or a second
draw call. Decide in the vertex shader and send rejected vertices somewhere the
rasteriser will never look: any clip position outside w. One immutable
attribute buffer then serves every subset, and the selection is a uniform.
Rejected points cost a vertex invocation and no fragments at all.

```glsl
if (dot(uToward, position) <= 0.0 || abs(id - uActive) >= 0.5) {
  gl_Position = vec4(2.0, 2.0, 1.0, 1.0);   // outside [-w, w] — culled
  gl_PointSize = 1.0; return;               // size still required on some drivers
}
```
⚠ Leaving `gl_PointSize` unwritten is undefined behaviour and renders a stray
point at the corner on some drivers. This hides, it does not free: a buffer
that is 95% rejected still pays its full vertex cost every frame.
