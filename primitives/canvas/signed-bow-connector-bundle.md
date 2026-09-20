---
id: signed-bow-connector-bundle
category: canvas
tags: [canvas,connector,diagram,geometry,svg]
axes: {energy: 1, density: 3, weight: 1, finish: 5}
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Connectors terminating at one hub, drawn straight, collapse into a starburst:
near-collinear spokes overlap and read as a blur. Give each a signed bow —
displace the chord's midpoint along its own perpendicular by `bow × chord
length` and use that as a quadratic control point. One scalar per connector,
and its sign picks which side the curve bulges, so alternating signs around the
hub fan the routes apart and each stays traceable. The control point follows
both endpoints on resize. Bow 0.10–0.25, past ~0.35 a route reads as a detour.

```js
const cx = (ax + bx) / 2 - (by - ay) * bow     // perpendicular to the chord
const cy = (ay + by) / 2 + (bx - ax) * bow
ctx.moveTo(ax, ay); ctx.quadraticCurveTo(cx, cy, bx, by)
```
⚠ Bow is a fraction of the chord, so a short spoke curves less in absolute
terms. Equal bow on near-equal endpoints still overlaps — vary magnitude too.
