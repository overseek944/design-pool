---
id: adjacent-normal-edge-register
category: canvas
tags: [svg,line-art,projection,geometry,wireframe,technical]
axes: {energy: 1, density: 4, weight: 1, finish: 5}
cost: 3
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A wireframe in one uniform stroke reads as a tangle: nothing says which edges
face the reader. For closed geometry the answer is in the model:
rotate each face normal with it and take the sign of z. An edge whose
two adjacent faces agree they face forward is interior, one whose faces
disagree is the silhouette, one with both facing away is hidden. Three stroke
registers — hairline, heavier round-capped, dashed — and the form resolves with
no depth buffer, no sorting, no raycast.

```js
const faces = F.map(f => rot(f.n)[2] > 1e-6)          // per face, per frame
for (const e of E) { const a = faces[e.f1], b = e.f2 < 0 ? a : faces[e.f2]
  bucket(a && b ? INTERIOR : a || b ? SILHOUETTE : HIDDEN).push(seg(e)) }
```
⚠ Per-face facing cannot see one part occluding another: a part behind the body
still classifies as visible. Demote the whole part from its mounting-face
normal, and pair edges to faces once at load.
