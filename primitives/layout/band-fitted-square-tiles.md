---
id: band-fitted-square-tiles
category: layout
tags: [grid,layout,responsive,resize,measurement,pattern]
axes: {energy: 1, density: 4, weight: 2, finish: 4}
cost: 2
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---

Square tiles of a fixed size leave a ragged remainder in any box. Give the tile
a band — 14–24px — and solve per resize: round the column count from the band's
midpoint, take the exact size that fills the width, step the count if that
leaves the band, then fit rows to the height.

```js
let n = Math.round((W + g) / (mid + g)), s = (W - (n - 1) * g) / n
if (s > max) s = (W - n++ * g) / n
const rows = Math.floor((H + g) / (s + g))
```
⚠ Measure in a `ResizeObserver`; keep the band ≥1.3:1 wide or one step
overshoots both edges.
