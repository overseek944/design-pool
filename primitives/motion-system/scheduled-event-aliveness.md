---
id: scheduled-event-aliveness
category: motion-system
tags: [idle,loop,character,randomness,raf,ambient]
axes: {energy: 3, density: 2, weight: 2, finish: 4}
cost: 3
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Anything idling on sines reads as a mechanism — the period is audible within two
cycles. Build the idle from *events* instead: a next-at timestamp, a weighted
pick of what happens, a fresh random interval, a damped lerp carrying the value
there. It holds still, jumps, holds again. Weight small adjustments common and
big relocations rare, and schedule each channel separately.

```js
if (t > nextAt) { aim = pick()                  // weighted, mostly small
  nextAt = t + 400 + Math.random() * 1400 }     // 0.3–2s per channel
cur += (aim - cur) * 0.35                       // .25–.5 reads as a jump
```
⚠ Initialise every target before the first tick — one `undefined` poisons the
lerp with `NaN` for good.
