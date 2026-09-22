---
id: overrun-gesture-loop
category: motion-system
tags: [motion,svg,geometry,pointer,annotation,generative]
axes: {energy: 3, density: 2, weight: 2, finish: 4}
cost: 2
seen: 1
requires: []
conflicts: []
completes: [reduced-motion-branch]
tension: []
---
A target circled by a generated ellipse reads as a shape placed over it rather
than a hand: the path closes exactly, starts on an axis, holds one radius.
Overrun it. Begin off-axis, sweep past a full turn so the stroke crosses its own
start, and let the radius grow a few percent across the sweep with a low ripple
on top. Sampled into a polyline it is a loop that was drawn, not positioned.
Sweep 1.05–1.15 turns, growth 3–6%, ripple 2–4% at 7–10 cycles.

```js
for (let i = 0; i <= 72; i++) {                   // 60–90 samples
  const u = i/72, a = start + u*2*Math.PI*1.09    // past one turn
  const k = 1 + Math.sin(u*9)*.03 + u*.04         // ripple + growth
  pts.push([cx + Math.cos(a)*rx*k, cy + Math.sin(a)*ry*k]) }
```
⚠ Pad the radii past the box by more than the stroke width or the loop cuts the
thing it points at. Past about 1.2 turns the second pass separates and reads as
two circles.
