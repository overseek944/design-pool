---
id: mixed-magnitude-figure-band
category: type
tags: [numerals,metric,alignment,layout,data]
axes: {energy: 1, density: 3, weight: 4, finish: 5}
cost: 1
seen: 4
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

Where the claim is a ratio rather than a count, the figure is one glyph. A
precomposed vulgar fraction — ½ ¼ ⅓ ¾ — sits on the baseline like any other
cell, aligns under `flex-end` with no stacking, and needs neither
`font-variant-numeric: diagonal-fractions` nor a two-element numerator rig that
breaks the moment the caption wraps. It also reads as *proportion* where "50%"
reads as a measurement, which is usually the sharper claim. 4–8rem, tracking
pulled to −.05/−.07em.
```html
<span class="figure">½</span><p>the lead time</p>
```
⚠ Only a display face with a real diagonal form survives the size. A text
serif's fraction is drawn for 12pt and enlarges into a superscript pair with a
hairline bar — check the glyph at the rendered size, and keep the fallback
stack to faces that have one.
