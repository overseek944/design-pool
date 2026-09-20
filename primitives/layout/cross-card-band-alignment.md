---
id: cross-card-band-alignment
category: layout
tags: [layout,grid,subgrid,cards,hairline,datasheet,alignment]
axes: {energy: 1, density: 3, weight: 1, finish: 5}
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A row of cards aligns at its outer edges and nowhere else: each card's internal
rules — under the header, above the footer — land at a different height, and the
set reads as three cards rather than one datasheet. Make the row a grid with
named rows and give every card `grid-row: span N` plus `grid-template-rows:
subgrid`. Each band then sizes to the tallest content across the row, so the
hairlines run straight through. 3–5 bands; past that the shortest card is mostly
air.

```css
.row  { display: grid; grid-template-columns: repeat(3, 1fr);
        grid-template-rows: auto auto 1fr auto }
.card { grid-row: span 4; display: grid; grid-template-rows: subgrid }
```
⚠ Subgrid needs the card to be a direct grid child — any wrapper between row and
card breaks it silently. The no-support fallback is one fixed band height,
140–200px, which aligns but starves the shortest content.
