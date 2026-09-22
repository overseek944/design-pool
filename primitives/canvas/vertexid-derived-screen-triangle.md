---
id: vertexid-derived-screen-triangle
category: canvas
tags: [canvas,webgl,shader,pass,geometry,performance,correctness]
axes: none
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Every post-processing pass needs geometry covering the screen, and the usual
answer — positions and UVs in a buffer, an attribute layout, a VAO per program
— is state to allocate and rebind for something identical in every pass. Derive
it from the vertex index instead: two bits of `gl_VertexID` generate the
corners, and a draw of three vertices with no buffer bound covers the viewport.
Draw 3 for one oversized triangle, 4 as a strip for a literal quad.

```glsl
out vec2 vUv;
void main() {
  vec2 p = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2));  // 0..2
  vUv = p;
  gl_Position = vec4(p * 2.0 - 1.0, 0.0, 1.0);
}
```
⚠ `gl_VertexID` is GLSL ES 3.00 — WebGL 2 only, and it has no WebGL 1 fallback
worth writing. A three-vertex draw covers the screen with one triangle whose
outer half is clipped, so anything reading `vUv` outside `[0,1]` sees values up
to 2; clamp or fract before sampling a repeating source.
