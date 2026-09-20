---
id: dual-epsilon-settle-halt
category: perf
tags: [performance,animation,spring,frame-budget,correctness]
axes: none
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Integrated motion approaches its target asymptotically and never arrives, so the
loop driving it runs forever unless told when to stop. One test cannot say: the
distance is zero every time the value crosses its target at speed, and the
velocity is zero at the turning point, where displacement is greatest. Require
both to be small, write the exact target on that last frame, and stop requesting
frames — the next input restarts the loop. Idle then costs nothing.

```js
if (Math.abs(target - v) < EPS && Math.abs(vel) < EPS) { v = target; raf = null; return }
raf = requestAnimationFrame(step)
```
⚠ Scale the epsilon to the unit — .01–.5 for a pixel offset is far too coarse
for a 0–1 opacity. Over a set of springs the test is over all of them, so the
restart path must be able to find a loop that is already running.
