---
id: quantised-scene-clock
category: timing
tags: [timing,stepped,loop,motion,performance]
axes: {energy: 2, density: 1, weight: 2, finish: 2}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Throttling a render loop lowers its cost and leaves the motion continuous: the
scene is sampled less often, and between samples it still slid. Quantise the
time handed to the scene instead and the motion itself lands in discrete steps,
which reads as stop-motion rather than a bad frame rate. Because the quantum
is a duration and not a frame count, the cadence is identical on a 60Hz and a
144Hz panel and the speed does not change with either. Skipping the draw while
the bucket is unchanged falls out for free. Rate 8–15 steps a second.

```js
const q = Math.floor(t * RATE)                   // RATE 8–15
if (q !== last) { last = q; draw(q / RATE) }     // scene reads the stepped clock
requestAnimationFrame(frame)
```
⚠ Below about six steps a second anything crossing the frame reads as
teleporting, not stepping. Keep pointer- and scroll-tracked elements off this
clock, and note that CSS transitions in the same scene keep their own smooth one
and will visibly disagree.
