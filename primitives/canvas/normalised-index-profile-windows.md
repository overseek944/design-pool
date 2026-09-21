---
id: normalised-index-profile-windows
category: canvas
tags: [generative,field,envelope,responsive,precision,authoring]
axes: {energy: 1, density: 2, weight: 2, finish: 5}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Organic variation gives a generated run texture but no large-scale shape. Author
that shape as a stack of clamped smoothstep windows over the *normalised* index,
multiplied onto the raw value: a lead-in ramp, a swell across one band, a notch
released by a second. Every window being stated in 0–1 of the run, the profile
holds whether the count is 80 or 300 — a resize that re-derives it cannot deform
the shape. Three or four terms; floor the product.

```js
const w = (a, b, n) => { const t = Math.min(1, Math.max(0, (n - a) / (b - a)))
  return t * t * (3 - 2 * t) }                     // clamped smoothstep
const n = i / count, g = Math.min(1, i / lead) *
  (1 + 1.4 * w(.70, 1, n)) * (1 - .6 * w(.76, .84, n))
v[i] = (FLOOR + (1 - FLOOR) * raw[i]) * g          // FLOOR .1–.2
```
⚠ Overlapping windows multiply twice and the run dips further than either
states — check the product, not the terms.
