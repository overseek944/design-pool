---
id: count-varied-centred-lattice
category: layout
tags: [layout,lattice,tessellation,flex,field,responsive]
axes: {energy: 1, density: 4, weight: 2, finish: 5}
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---

A tessellated field — hexagons, staggered chips, a brick course — usually takes
its half-cell offset from `nth-child` translation or column arithmetic, and
both break the moment one row's count changes. Give each row a different number
of cells, centre every row, and pull the rows together with a negative block
margin: the offset falls out of the centring, and the field re-solves itself
when a cell is added or dropped. Row overlap 12–18% of the cell.

```css
.row { display: flex; justify-content: center; gap: 5px; margin-block-start: -11px }
.row:first-child { margin-block-start: 0 }
```
⚠ The negative margin overlaps hit areas: the later row paints and receives the
pointer where they meet, so the row above loses its bottom corners.
