---
id: seekable-scene-clock
category: motion-system
tags: [motion,canvas,loop,deterministic,reduced-motion,testing,correctness]
axes: none
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Write a looping canvas scene as `draw(t)` over wrapped cycle time; the wall
clock only chooses `t`. Pause captures `t`, resume rebases the start so nothing
jumps, and a setter freezes any moment for screenshot tests. Reduced motion
renders a *representative* moment — 55–75% through the action, signal
mid-route — not frame zero, which is often empty. Periods 8–16s.

```js
const t = fixed ?? ((now - start) / 1000 * speed) % period
resume = () => { start = performance.now() - last / speed * 1000 }
if (reduce) draw(period * 0.66)
```
⚠ State accumulated across frames — trails, springs — breaks seeking.
