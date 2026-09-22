---
id: rule-stated-series-elision
category: layout
tags: [layout,truncation,series,evidence,data,accessibility]
axes: {energy: 1, density: 3, weight: 2, finish: 5}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A long *regular* series — a payment run, a recurring charge — teaches nothing
by being shown whole. Render the first few members at full
fidelity, close the row with one `…` tile, and set the generating rule beside it
as a sentence naming the count, the value, the interval and its source. The
members give the shape, the sentence the extent. Ramp opacity down across the
shown members so the cut reads as continuation rather than as an end. Show 3–5,
floor the ramp at 0.55–0.7.

```css
.run > *     { opacity: max(var(--floor, .6), calc(1 - .12 * var(--i))) }
.run > .more { opacity: .45 }         /* the … tile, aria-hidden */
```
⚠ The count belongs in the sentence, not in the `…` — an ellipsis tile is
decoration to a screen reader. Never ramp a member below body contrast; they are
values, not texture.
