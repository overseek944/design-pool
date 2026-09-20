---
id: self-throttled-raf-loop
category: perf
tags: [performance,animation,canvas,battery,frame-budget,correctness]
axes: none
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
`requestAnimationFrame` offers the display's rate; it is not a contract to use
it. A pass that costs 8–20ms — a per-cell field, a particle sweep, a re-sampled
image — is better run at a fixed 24–30fps: keep requesting every frame, compare
the timestamp, and return without drawing until the interval has elapsed. On a
120Hz panel that is four-fifths of the work returned. Ambient texture reads as
deliberate at 30; anything tracking a pointer or a scroll offset needs the full
rate.

```js
let last = 0, handle
const step = t => { if (t - last >= 1000 / FPS) { draw(t); last = t }
  handle = requestAnimationFrame(step) }
```
⚠ Cancel the handle on teardown or a second loop stacks on the first. Drive
motion from the timestamp, never a frame counter, or the speed changes with the
cap.
