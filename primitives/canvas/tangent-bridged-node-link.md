---
id: tangent-bridged-node-link
category: canvas
tags: [canvas,node,graph,connector,bezier,metaball,diagram]
axes: {energy: 2, density: 2, weight: 1, finish: 5}
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Centre-to-centre edges read as a chart. Join two circles
with two cubics that leave one rim and meet the other along shared tangents —
a metaball bridge, stroked not filled — and edges read as membranes between
bodies. Tangent angle `acos((r1 − r2) / d)`, split 0.3–0.6 toward the centre
line; handle length `r × min(1.3, gap / (r1 + r2))`, so near nodes pinch.

```js
const a = Math.atan2(dy, dx), t = Math.acos((r1 - r2) / d)
const p1 = at(A, a + t * .5, r1), p3 = at(B, a + Math.PI - t * .5, r2)
ctx.moveTo(...p1); ctx.bezierCurveTo(...h1, ...h3, ...p3)
```
⚠ Undefined when one circle contains the other (`d ≤ |r1 − r2|`).
