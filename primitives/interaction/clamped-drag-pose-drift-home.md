---
id: clamped-drag-pose-drift-home
category: interaction
tags: [pointer,interaction,3d,rotation,detail]
axes: {energy: 2, density: 1, weight: 4, finish: 5}
cost: 2
seen: 1
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
