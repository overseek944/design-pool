---
id: module-quantised-figure
category: scale
tags: [layout,scale,tokens,grid,precision,custom-properties,figure,responsive]
axes: {energy: 1, density: 3, weight: 2, finish: 5}
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A composed figure — a lattice of cells, a keyboard, a frame strip — leaves its
grid the moment a spacer is a round pixel value. Make the cell and the gap the
only two lengths and derive every width, offset and cap from them: a spacer is
then a whole number of cells, and connectors meet cell centres. One breakpoint
retunes two tokens. Cell 32–64px, gap ⅛–⅕ of it.

```css
.fig    { --cell: 48px; --gap: 8px;
          max-inline-size: calc(7 * var(--cell) + 6 * var(--gap)) }
.spacer { inline-size: calc(var(--gap) + var(--n) * (var(--cell) + var(--gap))) }
```
⚠ Padding outside the arithmetic is what breaks it — state the frame in cells
or half-cells, never in px.
