---
id: addressable-cell-lattice
category: surface
tags: [lattice,grid,hairline,pointer-events,node-budget,decoration]
axes: {energy: 1, density: 3, weight: 1, finish: 4}
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A hairline lattice drawn as two gradients costs one node and answers to nothing.
The moment a single cell must respond — a hover tint, a press origin, a label —
the field has to be real elements, and the pitch stops being a rhythm decision
and becomes a node budget: a 1900×950 band is 800 cells at 48px and 3,200 at
24px. Keep each cell a bare box with one border and no text, and make the
wrapper `pointer-events: none` so only the cells themselves are targets.

```css
.field { position: absolute; inset: 0; pointer-events: none; display: grid;
         grid: repeat(auto-fill, var(--cell, 48px)) / repeat(auto-fill, var(--cell, 48px)) }
.field > i { border: var(--hair) solid var(--rule); pointer-events: auto }
```
⚠ Cells that take the pointer also take it from anything beneath them — raise
real controls above the field rather than trusting source order. Adjacent cells
draw every interior rule twice, so the lattice is heavier than the token says.
