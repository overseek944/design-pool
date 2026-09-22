---
id: graded-support-cell-vocabulary
category: layout
tags: [data,label,accessibility,correctness,legibility,restraint]
axes: {energy: 1, density: 3, weight: 2, finish: 5}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---

A capability matrix with a tick-or-blank vocabulary forces every partial answer
into a lie. Close the set at three or four marks — present, partial, coming,
absent — print absence as its own glyph rather than an empty cell, which is
indistinguishable from a broken row, and separate them by *silhouette* rather
than by fill so they survive greyscale and forced colours. Then spell the whole
vocabulary once, under the table, in the smallest apparatus tier.

```html
<td><span aria-hidden="true">◐</span><span class="sr-only">partial</span></td>
<p class="key">✓ native · ◐ partial · ↗ soon · — not present</p>
```
⚠ A bare glyph announces as its Unicode name or as nothing — every cell needs a
hidden word. A mark that is a word rather than a symbol sets the column's
minimum width; size the columns from it, not from the ticks.
