---
id: clip-ejected-vertex-filter
category: canvas
tags: [shader,webgl,points,culling,perf]
axes: none
cost: 2
seen: 2
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

A growing subset needs no buffer writes either: compare the vertex index
against one advancing count, and the points appear in authored order. The same
difference is each point's age, so a colour or size change can trail its
arrival by a fixed lag. For an unordered thinning, hash the index instead and
gate on a 0–1 threshold. Advance 5–40 points per second for a readable build.
```glsl
float age = uCount - float(gl_VertexID - uStart);
vAlpha = age > 0.0 ? 1.0 : 0.0;
vColor = mix(aColor, uAlert, clamp((age / 5.0 - 0.3) * 4.0, 0.0, 1.0));
```
