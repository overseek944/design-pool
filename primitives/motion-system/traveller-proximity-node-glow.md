---
id: traveller-proximity-node-glow
category: motion-system
tags: [motion,diagram,pipeline,glow,loop,canvas,derived]
axes: {energy: 3, density: 2, weight: 2, finish: 5}
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A signal travelling a pipeline should visibly *do* something at each stage.
Rather than scheduling per-node timelines, derive each node's intensity from its
distance to the traveller along the route: `1 − |p − node|/radius`, smoothstepped,
times the traveller's own opacity. Halo, stroke weight and shadow all read that
scalar, so stages swell and settle exactly as it passes and retiming the route
retimes everything. Radius 0.06–0.15 of path length; halo growth 20–40%.

```js
const k = i / (n - 1)
const glow = smooth(1 - clamp(Math.abs(p - k) / radius, 0, 1)) * pulseOpacity
```
⚠ A radius above half the node spacing lets neighbours light together and the
direction of travel stops reading.
