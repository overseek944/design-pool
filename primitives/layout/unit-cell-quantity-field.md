---
id: unit-cell-quantity-field
category: layout
tags: [layout,data,grid,indicator,accessibility,density]
axes: {energy: 1, density: 4, weight: 2, finish: 4}
cost: 2
seen: 2
requires: []
conflicts: []
completes: []
tension: []
---
Show a count as one mark per unit, not a bar. Differences a bar cannot express
stay legible, the unfilled remainder states the total without a label, and
arranging the cells as the thing counted — an auditorium, a shelf, a floor plan
— carries what the figure is about. Cells 3–7px,
1–2px radius, gap half the cell, 40–400 units.

```css
.field { display: grid; grid-template-columns: repeat(var(--cols), 1fr); gap: 3px }
.cell  { aspect-ratio: 1; border-radius: 2px; background: var(--empty) }
.cell[data-on] { background: var(--ink) }
```
⚠ Below 20 units the marks read as icons; past ~600 the field is texture and a
bar is honester. The cells are decoration — put the figure in text beside it.
