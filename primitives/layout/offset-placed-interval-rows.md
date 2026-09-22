---
id: offset-placed-interval-rows
category: layout
tags: [data,chart,diagram,measurement,grid,accessibility]
axes: {energy: 1, density: 3, weight: 2, finish: 5}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---

A bar chart ranks; a row of *intervals* sequences. Where every item owns a start
and a length on one shared total — a request trace, a schedule, a set of
overlapping tenures — give each row a single full-width lane and place the mark
inside it from two percentages. The marks then step rightward down the set and
the shape of the work is legible before a figure is read. Both numbers derive
from the same total, so no row is measured and nothing reflows. Lane 10–16px.

```css
.row  { display: grid; grid-template-columns: 5rem 1fr 4rem; align-items: center }
.span { margin-inline-start: calc(var(--t0) * 1%); inline-size: calc(var(--dur) * 1%) }
```
⚠ Position is not announced: print the start and the duration in the row as
text. Under ~2% a span collapses to a sliver — give it a minimum inline size
and let it overhang rather than rounding the value up.
