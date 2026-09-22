---
id: area-budgeted-backing-scale
category: perf
tags: [performance,canvas,dpr,memory,resize,correctness]
axes: none
cost: 1
seen: 2
requires: []
conflicts: []
completes: []
tension: []
---
`min(devicePixelRatio, 2)` caps the ratio and bounds nothing: the CSS box is
free to be an ultrawide, so the backing store grows without limit and the
per-pixel loop grows with it. Derive the scale from a total-pixel budget
instead and the worst frame costs the same on every display, losing sharpness
only where it was already unaffordable. Budget 2.5–17M pixels: the low end for a
field redrawn per frame or a post-processed 3D scene, the high end for a surface
drawn once. Give each quality tier its own budget rather than one global cap.

```js
const s = Math.min(CAP, devicePixelRatio || 1, Math.sqrt(BUDGET / (w * h)))
c.width = Math.round(w * s); c.height = Math.round(h * s)
ctx.setTransform(s, 0, 0, s, 0, 0)
```
⚠ Read `c.width` back: past roughly 16.7M pixels iOS Safari refuses the
allocation and leaves a zero-sized canvas that paints nothing. Fall back to
scale 1 at CSS size rather than trusting the assignment.
