---
id: parenthesised-negative-column
category: type
tags: [numerals,data,alignment,accessibility,detail]
axes: {energy: 1, density: 3, weight: 2, finish: 5}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
In a right-aligned column of signed figures a leading minus is the worst place
to put the sign: it sits at the ragged left end, is a hyphen's width, and is
the first thing lost at small sizes. The accounting convention wraps negatives
in parentheses so the sign lands on the side the eye is already tracking. The
catch is alignment — a bracketed row is two glyphs wider, so every positive row
must reserve the closing bracket or the digits step in and out.

```css
.fig { font-variant-numeric: tabular-nums; text-align: end }
.fig:not([data-neg])::after { content: ")"; visibility: hidden }
```
⚠ A bracket is punctuation, not a sign: most screen readers announce the figure
as positive. Put the real value in `aria-label` on the cell.
