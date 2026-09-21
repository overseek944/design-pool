---
id: cardinal-cell-cycle-grid
category: layout
tags: [layout,grid,diagram,cycle,radial,responsive]
axes: {energy: 1, density: 3, weight: 2, finish: 5}
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A closed four-stage cycle drawn around a hub usually costs trigonometry and
absolute positioning, which takes every card out of flow and fixes its height.
A 3×3 grid does it in four declarations: one card per cardinal cell, the drawn
ring in the middle. Cards keep intrinsic height, the hub's square ratio sets the
diameter, and source order runs the cycle, so reading order is the argument.
Hub 16–24rem against cards capped at 16–20rem.

```css
.loop { display: grid; grid-template-columns: 1fr auto 1fr; place-items: center }
.hub  { grid-area: 2 / 2; aspect-ratio: 1; inline-size: 21rem }
.n { grid-area: 1 / 2 } .e { grid-area: 2 / 3 } .s { grid-area: 3 / 2 } .w { grid-area: 2 / 1 }
```
⚠ Position says nothing to a screen reader, and four cards plus a ring need
roughly 72rem — keep the markup an ordered list and drop to the plain list
below that width rather than shrinking the ring.
