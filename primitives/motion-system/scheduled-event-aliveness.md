---
id: scheduled-event-aliveness
category: motion-system
tags: [idle,loop,character,randomness,raf,ambient]
axes: {energy: 3, density: 2, weight: 2, finish: 4}
cost: 3
seen: 2
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

Scheduling *when* is half of it; *which* participant fires is the half that
gives the loop away. Picking uniformly from a pool lets the same few elements
recur within a few seconds and the eye locks onto the pattern immediately. Keep
a short ring of recently used indices — about a third of what is on screen — and
draw only from outside it, so nothing returns until most of the field has had a
turn. Let the concurrency cap drift as well, firing a second event on a fraction
of ticks, and the density keeps changing instead of settling into a rhythm.
```js
const free = pool.filter((_, i) => !busy[i] && !recent.includes(i))
const i = free[Math.random() * free.length | 0]
recent.push(i); while (recent.length > Math.min(20, pool.length / 3)) recent.shift()
```
⚠ Size the ring against the *visible* pool, not the total — a ring longer than
what is on screen starves the picker and the field goes still.
