---
id: ruled-definition-rows
category: layout
tags: [layout,type,metadata,responsive,hairline]
axes: {energy: 1, density: 3, weight: 2, finish: 5}
cost: 1
seen: 8
requires: []
conflicts: []
completes: []
tension: []
---
Metadata reads as a datasheet when it is a list of label-to-value rows: label
left in the small mono tier, value hard right, one hairline between. Put the
rule on each item's top edge and close the list with a bottom rule so seams
never double. `space-between` plus wrapping degrades it to stacked pairs when
the row is too narrow — no breakpoint, no second markup.
```css
.spec { border-bottom: var(--hair) solid var(--line) }
.spec li { display:flex; flex-wrap:wrap; justify-content:space-between;
  gap:.5rem; padding-block:var(--row-pad,.75rem);
  border-top: var(--hair) solid var(--line) }
```
⚠ Row padding 8–16px. Values longer than three or four words wrap and the
second column stops reading as a column.

When the value is a figure rather than a phrase, invert it: figure in a fixed
first column of 100–130px, caption second, rows aligned on the baseline. The
numbers start on one vertical line instead of ragging to whatever length each
happens to be, and `white-space: nowrap` keeps a range like `40–50%` from
breaking across its dash.

A metric that reads value-first must still be `dt` then `dd` in the markup — the
content model requires it and the pair is announced in that order.
`flex-direction: column-reverse` inverts only the paint, so the figure sits
above its label with nothing reordered. Below the narrow breakpoint switch to
`row-reverse` on the baseline with a `min-inline-size` in `ch` on the value, and
a stack of three becomes a list whose numbers still start on one line.
```css
.metric { display:flex; flex-direction:column-reverse; border-top:1.5px solid var(--ink) }
@media (width <= 520px) { .metric { flex-direction:row-reverse; align-items:baseline }
  .metric dd { flex:none; min-inline-size:5ch } }
```
⚠ Safe only because neither part is focusable — reversing flow around
interactive children splits tab order from reading order.
