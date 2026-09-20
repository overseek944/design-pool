---
id: eased-pointer-influence
category: canvas
tags: [shader,interaction,feel]
axes: {energy: 3, density: 2, weight: 2, finish: 5}
cost: 2
seen: 2
requires: []
conflicts: []
completes: []
tension: []
---
Never feed raw pointer state to a shader. Keep a `uMouseActive` float lerped
toward 0/1 and a smoothed `uMouse` — influence then fades in and out instead of
snapping, and the effect survives the pointer leaving the window.

Seed the smoothed pair on the *first* event, not at setup. A sentinel start —
origin, or far off-screen — lerps across the whole viewport the first time the
pointer moves, so the effect announces itself by flying in from a corner. One
boolean, set once, snaps smoothed to raw on the first sample.
```js
if (!seeded) { seeded = true; sx = e.clientX; sy = e.clientY }
```
