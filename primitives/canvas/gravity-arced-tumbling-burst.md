---
id: gravity-arced-tumbling-burst
category: canvas
tags: [canvas,particles,burst,physics,motion]
axes: {energy: 5, density: 3, weight: 2, finish: 3}
cost: 2
seen: 1
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
