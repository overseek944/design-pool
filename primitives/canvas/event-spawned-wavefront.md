---
id: event-spawned-wavefront
category: canvas
tags: [canvas,interaction,wave,ripple,impulse,click,field]
axes: {energy: 4, density: 2, weight: 2, finish: 4}
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A click can disturb a generative field instead of triggering anything. Queue
`{x, y, t0}`; each frame every live entry adds a Gaussian shell at radius
`speed·age` to the field, faded linearly over its life. The wave travels,
weakens and ends — no simulation grid.
Speed 200–400px/s, shell width 40–90px, life 1–2.5s, queue cap 4–8.

```js
const r = Math.hypot(px - w.x, py - w.y) - SPEED * age
v += AMP * Math.exp(-(r * r) / (WIDTH * WIDTH)) * (1 - age / LIFE)
```
⚠ Cost is cells × live waves — cap the queue and drop expired entries first.
Decoration only: ignore input under reduced motion, never make it a control.
