---
id: width-floored-placement-rows
category: layout
tags: [layout,grid,responsive,overlap,placement,rhythm]
axes: {energy: 1, density: 3, weight: 2, finish: 4}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A composition placed freely on grid lines — blocks overlapping, art under text —
holds its shape across widths only if rows scale with the columns. Floor each row
at a fraction of container width, cap it at `auto`: proportions hold like a
scaled canvas, yet rows still grow for wrapped text or zoom. Factor 0.015–0.03;
own placements at 20–30 columns wide, 6–8 narrow.

```css
.stage { display: grid; grid-template-rows: repeat(14, minmax(calc(var(--w) * .0215), auto)) }
.art { grid-area: 1 / 2 / 11 / 10 }  .copy { grid-area: 3 / 8 / 7 / 18 }
```
⚠ A grown row pushes every overlap below it out of register — give text
spare rows.
