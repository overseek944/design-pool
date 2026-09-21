---
id: lifetime-enveloped-mark-respawn
category: canvas
tags: [canvas,field,particles,motion,generative,recycling]
axes: {energy: 2, density: 3, weight: 1, finish: 5}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A fixed pool of marks recycled on exhaustion makes birth and death the only
events in the field, and both read as a blink. Give each mark a randomised
lifetime and derive its ink from age through an envelope — a short attack, a
long release to zero — so it is already invisible whenever it is recycled and
the field renews continuously with no pop to catch. The staggered lifetimes
also break the uniform look a single spawn pass leaves. Attack 5–15% of life,
life 40–200 frames with the spread at least 2×.

```js
const a = Math.min(1, p.age / ATTACK) * Math.max(0, 1 - p.age / p.life)
if (p.age++ > p.life || offscreen(p)) Object.assign(p, spawn(), { age: 0 })
```
⚠ Randomise the initial age at startup too, or the whole population dies on the
same frame and the field pulses for its first few cycles.
