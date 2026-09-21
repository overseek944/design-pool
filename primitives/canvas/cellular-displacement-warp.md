---
id: cellular-displacement-warp
category: canvas
tags: [canvas,shader,webgl,texture,generative,field]
axes: {energy: 2, density: 3, weight: 2, finish: 5}
cost: 3
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---

Smooth noise warps a field continuously — everything stretches and nothing
breaks. Displace instead by the *nearest* point in a jittered lattice: every
fragment inside a cell shifts by the same offset, so the image splits into
facets that slide against each other with hard seams between them. Reads as
cut glass rather than as flow. Animate the jitter, never the lattice, or the
cells crawl. Cells 20–60 across the short side, displacement 0.05–0.25 of a
cell.

```glsl
vec2 st = (uv - 0.5) * vec2(aspect, 1.0) * uCells;
vec2 ist = floor(st), fst = fract(st), best; float d = 9.0;
for (int y = -1; y <= 1; y++) for (int x = -1; x <= 1; x++) {
  vec2 n = vec2(x, y), p = 0.5 + 0.5 * sin(uTime + TAU * hash2(ist + n));
  float l = length(n + p - fst); if (l < d) { d = l; best = p; } }
fragColor = texture(tInput, uv + (best - 0.5) * uSpread);
```
⚠ Nine neighbours are the minimum for a correct nearest point, and both loop
bounds must be literals to compile everywhere. Stretched past about 4:1 the
facets read as a scanline tear.
