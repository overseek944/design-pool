---
id: ranked-apparatus-column
category: layout
tags: [layout,grid,metadata,responsive,editorial,hierarchy]
axes: {energy: 1, density: 3, weight: 1, finish: 5}
cost: 1
seen: 2
requires: []
conflicts: []
completes: []
tension: []
---
Section apparatus — an ordinal, a two-word gloss, a mark — belongs beside the
reading column rather than inside it: give it a third track of 12–18% so the
measure never widens to carry annotation. Degrade it by rank, not by
visibility. The mark goes first; then the track reflows under the copy, at its
own breakpoint rather than the layout's; the words never go at all. Hiding the
track instead costs a fact the copy does not restate.

```css
.row  { display: grid; grid-template-columns: 36% minmax(0,1fr) 16%; gap: 3rem }
@media (width <= 60rem) {
  .row  { grid-template-columns: 38% minmax(0,1fr) }
  .meta { grid-column: 2 }  .meta svg { display: none } }
```
⚠ Only the mark is decoration a reader can lose — `aria-hidden` that alone and
leave the ordinal and gloss in the flow. A track narrower than ~11% wraps a
two-word gloss to three lines and starts reading as a failure rather than as
apparatus.
