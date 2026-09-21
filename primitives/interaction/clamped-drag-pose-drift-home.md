---
id: clamped-drag-pose-drift-home
category: interaction
tags: [pointer,interaction,3d,rotation,detail]
axes: {energy: 2, density: 1, weight: 4, finish: 5}
cost: 2
seen: 2
requires: []
conflicts: []
completes: [reduced-motion-branch]
tension: []
---

An object the reader can turn should not map pointer position to pose: that is
a puppet, and it jumps whenever a gesture starts somewhere new. Accumulate the
*delta* into a target clamped to the angles the form still reads at (±20–35°),
render a pose lerping toward it at 0.03–0.06 a frame, and while no pointer is
down multiply the target by 0.99–0.995 so it drifts back to the authored rest
over seconds rather than springing. Clamping the
target rather than the render is what stops the object being spun into an
unreadable silhouette.

```js
tRY = clamp(tRY + (e.clientX - px) * 0.045, -32, 32)   // 0.03–0.06°/px
if (!dragging) { tRX *= 0.995; tRY *= 0.995 }          // drift home
rX += (tRX - rX) * 0.045; rY += (tRY - rY) * 0.045     // render lags target
```
⚠ Release capture on `pointercancel` as well as `pointerup`, or a gesture the
browser reclaims leaves the object stuck mid-turn. `touch-action` must still
permit the page's scroll axis.

An object being *read* rather than presented wants the opposite settings.
There is no authored rest to return to — the angle the reader turned it to is
the answer to a question they asked — so drop the decay entirely and hold the
pose until they move it again. The clamp then has a different job: not keeping
a silhouette legible but keeping the ground plane from flipping through
edge-on. Hold pitch inside roughly ±70° and leave yaw unbounded, so the form
can be turned right around.
```js
pitch = Math.max(-1.2, Math.min(1.3, pitch + dy * 0.006))   // yaw accumulates free
```
⚠ Without drift-home the surface has no idle state to advertise itself with.
Pair it with a slow auto-rotation that the first grab abandons for good.
