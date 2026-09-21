---
id: mixed-magnitude-figure-band
category: type
tags: [numerals,metric,alignment,layout,data]
axes: {energy: 1, density: 3, weight: 4, finish: 5}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A row of headline figures rarely shares a digit count — four digits beside
eleven. One size either overflows the long value or shrinks every value to the
worst case, and the row stops reading as one tier. Size each figure to its own
length instead, the long one at 50–65% of the base, and hold the row together
from the box: reserve a `min-height` equal to the tallest figure's band and
align the cells to `flex-end`, so unequal type sits on one baseline.

```css
.figure { min-block-size: clamp(4.5rem, 7vw, 7rem); display: flex; align-items: flex-end;
          font-size: clamp(4.5rem, 7vw, 7rem); font-variant-numeric: tabular-nums }
.figure--long { font-size: .58em; letter-spacing: -.075em }
```
⚠ Tighten tracking with the size drop — the ratio survives, the optics do not.
Below roughly 45% the two stop reading as peers and the small figure becomes a
footnote.
