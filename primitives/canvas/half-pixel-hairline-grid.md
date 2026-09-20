---
id: half-pixel-hairline-grid
category: canvas
tags: [canvas,hairline,correctness,diagram,pixel-ratio,performance]
axes: {energy: 1, density: 2, weight: 1, finish: 5}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A one-pixel canvas line drawn on an integer coordinate straddles the pixel
boundary and paints at half strength on both sides. Size the backing store by
the device ratio, push that ratio into the transform so drawing stays in CSS
pixels, then snap each hairline coordinate to a half-integer: one crisp pixel
rather than two grey ones — the distance between a drafted diagram and a
blurred one. Widths 1–1.5; past 2 the snap stops paying.

```js
c.width = Math.round(w * dpr); ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
const q = v => Math.round(v) + .5
ctx.moveTo(q(x0), q(y)); ctx.lineTo(q(x1), q(y))
```
⚠ Axis-aligned strokes only — a diagonal gains nothing. Re-snap after a scale
change, not once at build.
