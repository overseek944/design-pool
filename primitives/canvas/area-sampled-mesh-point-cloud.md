---
id: area-sampled-mesh-point-cloud
category: canvas
tags: [webgl, points, procedural, geometry, point-cloud]
axes: {energy: 1, density: 4, weight: 1, finish: 4}
cost: 4
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A whole environment can be drawn as points without a scanned asset: author it
from primitive boxes, cylinders and tubes, then sample each surface with a
count proportional to its area and push the samples slightly along the normal.
Bake brightness per point from the normal against one light direction plus
random jitter, and the cloud reads as lit volume. Everything merges into one
buffer — one draw call however many objects. Density 200–1200 samples per unit²;
jitter ±15–35%.

```js
const s = new MeshSurfaceSampler(mesh).build()
for (let i = 0; i < area * DENSITY; i++) { s.sample(p, n); p.addScaledVector(n, .003)
  add(p, base * (.65 + .7 * Math.max(0, n.dot(L))) * (.7 + rnd() * .6)) }
```
⚠ Construction is main-thread work proportional to point count — build after
first paint and scale density by a device tier.
