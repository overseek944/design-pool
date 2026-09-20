---
id: resampled-path-travel
category: canvas
tags: [canvas,performance,motion,connector,architecture]
axes: none
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Moving a marker along a curve by solving the curve every frame costs an
evaluation per marker per frame, and the same maths again for its tangent.
Sample the path once into a fixed array — 20–40 points for a gentle arc — and
travel by fractional index, interpolating between the two nearest. Rebuild the
tables in the resize handler, keyed by endpoint pair, and any number of markers
share one path at two array reads and a lerp each. The curve type stops
mattering to the loop.
```js
const f = t * (pts.length - 1), i = f | 0, k = f - i
const b = pts[Math.min(i + 1, pts.length - 1)]
const x = pts[i].x + (b.x - pts[i].x) * k
```
⚠ Uniform parameter is not uniform arc length: samples bunch through tight
curvature and the marker slows there. Resample by measured length if speed
must read as constant.
