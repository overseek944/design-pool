---
id: stall-detected-loop-rearm
category: perf
tags: [performance,correctness,lifecycle,loop,architecture]
axes: none
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A render loop driven by anything other than `requestAnimationFrame` — a video
frame callback, a decoder, a socket — can stop with no error to catch: the
callback is simply never invoked again. Stamp the clock at the end of every
completed frame and run one low-frequency timer that compares it to now. Past
the threshold, cancel the outstanding handle, reset the pacing accumulator,
draw once synchronously and re-arm. 2–5s, long enough that a legitimately idle
source is not mistaken for a stall.

```js
const beat = () => { last = performance.now() }          // end of every frame
setInterval(() => { if (!live()) return
  if (performance.now() - last > 3000) { cancel(); acc = null; draw(); start() }
}, 3000)
```
⚠ Re-arming a loop that stopped on purpose is worse than the stall. Put the
same predicate in front of the watchdog that guards the frame request —
offscreen, hidden, torn down, paused — or it fights every gate you have.
