---
id: lattice-snapped-data-anchors
category: canvas
tags: [canvas,field,data,hotspot,hover,grid,accent]
axes: {energy: 2, density: 3, weight: 2, finish: 4}
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
Markers at true coordinates over a dot field fall between dots and read as a
second layer. Snap each datum to its nearest admitted cell and promote that cell
— accent colour, full alpha — so data is drawn in the field's own marks.
Hit-test only promoted cells, within one pitch, and show detail in a
fixed-corner card, not a tooltip over the field. Promote 1–3% of cells; pitch
8–16px.

```js
for (const d of data) { const i = nearest(cells, d); cells[i].accent = d }
const hit = cells.find(c => c.accent && dist(c, p) < pitch)
```
⚠ Hover-only detail is unreachable by keyboard and touch — mirror the anchors
as a real list.
