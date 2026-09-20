---
id: direction-sampled-burst
category: canvas
tags: [canvas,particles,generative,distribution,depth]
axes: {energy: 4, density: 3, weight: 2, finish: 4}
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Independent per-axis ranges can only ever fill a rectangle, so a field scattered
from separate `x` and `y` draws reads as a box however it is tuned. Sample a
*direction* and a *magnitude* instead: a uniform point on the unit sphere, and
speed on a power curve so most fragments stay near the origin and a few carry
far. Keep the third component as real depth and scale each mark by it for
volume. Exponents 1.8–2.5; under 1.5 it packs evenly again.
```js
const u = Math.random() * 2 - 1, th = Math.random() * Math.PI * 2
const r = Math.sqrt(1 - u * u), v = .16 + Math.pow(Math.random(), 2.1)
const vx = r * Math.cos(th) * v, vy = u * v, vz = r * Math.sin(th) * v
```
⚠ Sampling the polar angle uniformly instead of `u` clusters every burst at its
poles — `sqrt(1 - u²)` is what spreads directions evenly over the sphere.
