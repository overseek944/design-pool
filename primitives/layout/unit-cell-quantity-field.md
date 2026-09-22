---
id: unit-cell-quantity-field
category: layout
tags: [layout,data,grid,indicator,accessibility,density]
axes: {energy: 1, density: 4, weight: 2, finish: 4}
cost: 2
seen: 3
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

Stacked into columns, the field becomes a bar chart that shows *where* a limit
was crossed. Draw one reference rule across the plot, and tint every cell above
it in the alarm hue while the cells below stay neutral — the overflow is then a
count of marks, not a gap between two lines. Ramp lightness across the series
(neutral light→dark, then accent light→saturated after the crossing) so time
reads without an axis. Cells 4–8px, gap 1–2px.
```css
.col  { display: grid; grid-template-columns: repeat(var(--w, 8), 1fr); gap: 1px; align-content: end }
.cell { aspect-ratio: 1; background: var(--tone) }
.cell.over { background: var(--alarm) }   /* index above threshold row */
```
⚠ Ship the cells as one generated path or CSS pattern, not one node each —
thousands of DOM or SVG rects per column is the cost that sinks it.
