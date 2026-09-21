---
id: frame-gap-driver-trail
category: canvas
tags: [canvas,pointer,field,influence,sampling,continuity]
axes: {energy: 3, density: 2, weight: 2, finish: 5}
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A field tested against the driver's position once per frame is sampling a path at
60Hz. Move faster than the influence radius per frame and the effect stipples —
separate blots where a stroke was intended. Keep the last few poses and take the
**maximum** influence across them, each weighted by recency: the gap fills as one
corridor and the tail decays into a wake after the driver stops. Maximum, not
sum — summing pushes overlapped cells past the effect's ceiling wherever the path
crosses itself. Trail 4–12 poses, weights falling to 0.

```js
trail.unshift(pose); trail.length = N + 1
let u = falloff(cell, trail[0])                  // current pose, full strength
for (let n = 0; n < N; n++)
  u = Math.max(u, falloff(cell, trail[n + 1]) * (1 - n / (N + 1)) * strength)
```
⚠ Cost is N× the per-cell test — break the inner loop once `u` reaches 1, and
reject on squared distance before taking any root.
