---
id: edge-clamped-camera-frame
category: motion-system
tags: [camera,transform,scene,correctness,architecture]
axes: none
cost: 1
seen: 1
requires: []
conflicts: []
completes: [camera-over-static-scene]
tension: []
---
A camera that pans to centre a point of interest frames empty space the moment
that point sits near an edge: centring is a subtraction that does not know the
stage ran out. Clamp each axis after centring — the translate may never exceed
`0`, nor fall below `viewport − stage × scale` — and the frame stays full
whatever the scheduler asks for. `min` outside, `max` inside, or a stage smaller
than the viewport at that scale inverts. Usable push 1.2–5×.
```js
const s = scale, fit = (view, size, want) =>
  Math.min(0, Math.max(view - size * s, want))
cam.x = fit(box.clientWidth, stage.offsetWidth, box.clientWidth / 2 - pt.x * s)
```
⚠ Clamp against the *scaled* size, never the layout size — the two agree only
at scale 1, so the gap appears at exactly the zoom levels a tour lives at.
