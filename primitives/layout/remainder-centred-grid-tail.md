---
id: remainder-centred-grid-tail
category: layout
tags: [layout,grid,alignment,cards,composition,breakpoint]
axes: {energy: 1, density: 2, weight: 2, finish: 4}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A set whose count is not a multiple of the track count ends on a short row
pinned to the leading edge, and the hole beside it reads as a card that failed
to load. Centre the remainder across the full span at one track's
width: nothing resizes and the set closes. The selector encodes a column count
the grid does not, so it belongs in the query that declares the tracks, never on
the grid globally.

```css
@media (width >= 48rem) {
  .grid { display: grid; gap: var(--gap); grid-template-columns: repeat(2, 1fr) }
  .grid > :last-child:nth-child(odd) {
    grid-column: 1 / -1; justify-self: center;
    width: calc(50% - var(--gap) / 2) } }   /* 1/2–1/3 of span, by track count */
```
⚠ Left unscoped it fires in the one-column layout too, halving the last item of
every odd-length set. The width restates a track by hand — derive it and the gap
from one property or they drift at the next breakpoint.
