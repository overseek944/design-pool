---
id: mixed-magnitude-figure-band
category: type
tags: [numerals,metric,alignment,layout,data]
axes: {energy: 1, density: 3, weight: 4, finish: 5}
cost: 1
seen: 3
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

One cell in the band does not have to be a figure. Set a short phrase — two
words at most — in the same display face at the same tier and a claim that was
never going to be a number gets the rank of one, beside the ones that are.
Sizing then comes off rendered width, not digit count: hold every cell to one
`min-height` and let the phrase take 65–80% of the figures' size, since
lowercase at the full size overwhelms them.
⚠ The caption under each cell is what keeps the row honest. A phrase in the
figure slot with a caption written loosely reads as a headline that wandered
into a stat band; keep all captions to the same grammar and length, and never
let the phrase cell be the first one.
