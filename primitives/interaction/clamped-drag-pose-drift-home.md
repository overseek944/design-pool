---
id: clamped-drag-pose-drift-home
category: interaction
tags: [pointer,interaction,3d,rotation,detail]
axes: {energy: 2, density: 1, weight: 4, finish: 5}
cost: 2
seen: 6
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

A third case sits between the two: a surface where the idle rotation is not
advertising but *legibility*. An orthographic point cloud or a wireframe form
held still is genuinely ambiguous — depth reads only from parallax — so the
spin has to resume on release rather than being abandoned or drifting home. Keep
the pose the reader left, add a constant per frame while no pointer is down, and
the surface returns to explaining itself without undoing their inspection.
0.002–0.005 rad/frame; faster and the reader cannot track a point across the
turn.
```js
if (!dragging) yaw += 0.0035      // resumes from wherever they let go
```
⚠ It is continuous ambient motion, so it needs the reduced-motion branch that a
drift-home does not — still, with the drag still rendering.

A fourth case throws rather than settles. Where the pose has no rest and no
preferred angle — a ring of cards the reader spins to browse — keep the *last*
delta as a velocity and decay it per frame after release, so a flick carries on
and coasts to a stop under the hand's own momentum. Decay 0.90–0.96 a frame:
0.94 runs about a second, 0.90 barely overshoots, and above 0.97 the surface
never visibly stops. Cut the velocity to zero below roughly 0.01 or the loop
keeps ticking on motion nobody can see.
```js
if (down) { v = (e.clientX - px) * 0.5; angle += v; px = e.clientX }
else if (Math.abs(v) > 0.01) { angle += v; v *= 0.94 }   // coast
```
⚠ A throw and a resumed idle rotation are different states that both run while
no pointer is down — sum them rather than choosing, or the idle spin snaps on at
full speed the instant the coast expires.
