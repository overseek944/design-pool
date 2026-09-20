---
id: self-throttled-raf-loop
category: perf
tags: [performance,animation,canvas,battery,frame-budget,correctness]
axes: none
cost: 1
seen: 4
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

The rate is not one number either. A loop tracking an input needs the full rate
*while the input moves* and almost nothing once it settles: compare this frame's
driving value to the last, and after 1–2s of no change fall to every fourth
frame, returning to full the moment it differs. A scrubbed scene left parked
then costs a quarter of a still image.

The same divisor belongs on auxiliary render targets, which are usually the
expensive half and rarely need the main rate. Turn automatic shadow refresh off
and drive it yourself — every 2nd frame while something moves, every 30th–60th
while the scene is only being looked at.
```js
r.shadowMap.autoUpdate = false
r.shadowMap.needsUpdate = moving ? frame % 2 === 0 : frame % 60 === 0
```
⚠ Anything that moves between refreshes drags a stale shadow. Force one update
on the frame a transition ends.

Compare with a tolerance of about a millisecond, not exactly. A 30fps cap tested
`>= 33.3` against a 60Hz clock rejects the frame that lands at 33.2 and takes
the next one at 49.9 — the loop runs at 20fps, not 30. `elapsed < interval - 1`
keeps the intended rate on a panel whose period does not divide it.
