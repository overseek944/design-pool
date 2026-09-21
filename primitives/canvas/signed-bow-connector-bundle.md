---
id: signed-bow-connector-bundle
category: canvas
tags: [canvas,connector,diagram,geometry,svg]
axes: {energy: 1, density: 3, weight: 1, finish: 5}
cost: 2
seen: 3
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

Between two columns rather than around a hub the overlap is *duplicates*:
several routes leaving one anchor for the same target trace a single line. Vary
each copy's control-point run by its index instead of bowing it — push the
outgoing handle further out as the index climbs, pull the incoming one back — and
the copies open into a weave that still reads as one bundle. Both handles stay
on the chord's axis, so no route detours. Spread 12–20 units per index at the
source, 50–70% of that at the target.
```js
const c1 = ax + run + k * 17, c2 = bx - run - k * 9        // k = copy index
d = `M${ax},${ay} C${c1},${ay} ${c2},${by} ${bx},${by}`
```
⚠ Spread compounds with the count — past 6–8 copies the outermost handle
overshoots its target and the route visibly doubles back. Cap the index, not
the step.
