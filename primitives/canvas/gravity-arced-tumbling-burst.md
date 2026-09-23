---
id: gravity-arced-tumbling-burst
category: canvas
tags: [canvas,particles,burst,physics,motion]
axes: {energy: 5, density: 3, weight: 2, finish: 3}
cost: 2
seen: 3
requires: []
conflicts: []
completes: []
tension: [direction-sampled-burst]
---
Marks scattered from a direction and a speed read as a detonation — symmetric
and over at once. Integrate gravity and a per-frame drag and they arc
instead — rise, slow, tip over, fall past the frame — reading as thrown.
Launch from two opposing edges angled inward so the arcs cross the middle rather
than radiate from a point. Give each a spin rate and draw it as an oblong,
not a disc: a rect near 1 : 0.66 rotating about its centre reads as foil
catching light. Gravity 0.1–0.25 px/frame², drag 0.98–0.995, launch speed 7–14.

```js
p.vy += G; p.vx *= DRAG; p.x += p.vx; p.y += p.vy; p.rot += p.vr
ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot)
ctx.fillRect(-p.w / 2, -p.w / 3, p.w, p.w * .66); ctx.restore()
```
⚠ Those constants are per *frame*, so a 120Hz display doubles gravity per second
and flattens the arc. Scale by `dt` against 60fps.

Variant — no canvas: the arc is two keyframe segments on each particle,
the rise on a strong out-curve to a peak and the fall on an ease-in to the end,
with peak, end, spin, duration and delay as per-element custom properties set
once at spawn. One `@keyframes` then drives every piece along its own path. Rise
25–35% of the run; duration .9–1.6s; 12–40 pieces.
```css
@keyframes burst { 0% { translate: 0; scale: .5; animation-timing-function: cubic-bezier(.19,1,.22,1) }
  32% { translate: var(--px) var(--py); rotate: var(--pr); animation-timing-function: cubic-bezier(.45,.05,.7,.5) }
  to { translate: var(--ex) var(--ey); rotate: var(--er); opacity: 0 } }
```
⚠ Keep it under reduced motion as an instant state change, not the burst.
