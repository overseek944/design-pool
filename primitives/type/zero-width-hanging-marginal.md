---
id: zero-width-hanging-marginal
category: type
tags: [type,editorial,numbering,measure,heading,responsive]
axes: {energy: 1, density: 2, weight: 1, finish: 5}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A section number, footnote marker or date beside a heading should not be part
of its measure — indent the text to clear it and the block no longer starts on
the column. Give the marker zero width, reverse its direction so it grows
leftward out of the box, and push it into the margin with a negative margin
matched by equal padding. The heading stays flush and the marker can never push
a line. Hang 16–28px.

```css
.num { display: inline-block; width: 0; direction: rtl; white-space: nowrap;
       margin-left: -20px; padding-right: 20px; font-variant-numeric: tabular-nums }
@media (width <= 64rem) { .num { direction: ltr; width: auto; display: inline;
       margin: 0 .6em 0 0; padding: 0 } }
```
⚠ `direction: rtl` reorders the marker's own content — fine for a number or one
glyph, wrong for a trailing period or mixed scripts. Margin and padding are one
decision written twice; unequal, the heading leaves the column it should hold.
