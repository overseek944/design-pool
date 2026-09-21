---
id: facing-edge-tangent-connector
category: layout
tags: [layout,connector,svg,diagram,geometry]
axes: {energy: 1, density: 3, weight: 1, finish: 5}
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A straight rule between a box and a line of text in the facing column reads as
a strike across both. Give the curve horizontal tangents: a cubic
whose two control points both sit at the endpoints' midpoint x, each keeping
its own endpoint's y, so it leaves one edge and arrives at the other flat.
Leave the overlay `viewBox`-less — user space is CSS pixels, so rects measured
against the wrapper drop straight into `d`. Re-solve per frame
when one end is sticky and the other scrolls — resize and intersection both
miss that. Inset the arrival end 4–8px.

```js
const w = wrap.getBoundingClientRect(), a = from.getBoundingClientRect()
const b = to.getBoundingClientRect(), mx = (a.right + b.left) / 2 - w.left
const y1 = a.top + a.height / 2 - w.top, y2 = b.top + b.height / 2 - w.top
path.setAttribute('d', `M ${a.right - w.left} ${y1} C ${mx} ${y1}, ${mx} ${y2}, ${b.left - w.left - 6} ${y2}`)
```
⚠ Three rect reads per frame force layout every frame — one connector at most,
and stop the loop offscreen.
