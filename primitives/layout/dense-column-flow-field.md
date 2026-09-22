---
id: dense-column-flow-field
category: layout
tags: [layout,grid,field,overflow,rhythm,emphasis]
axes: {energy: 2, density: 4, weight: 2, finish: 4}
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A uniform set that overflows sideways reads as inventory. Fix the row
count, flow by column at a uniform auto-column width, then promote a few members
to a two-by-two span: the field takes focal points from its own flow, with no
hero slot and no chunked source order. `dense` back-fills the holes a span
leaves, so it reads irregular, not gapped. Three rows, a span every 8–14
members, auto-column 7–12rem.

```css
.field { display: grid; grid-auto-flow: column dense;
  grid-template-rows: repeat(3, auto); grid-auto-columns: var(--cell, 12rem);
  gap: 1rem; overflow-x: auto }
.field > .lead { grid-column: span 2; grid-row: span 2 }
```
⚠ `dense` reorders visually but not tab or reading order — fine unordered,
wrong for anything ranked.
