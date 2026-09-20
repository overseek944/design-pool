---
id: ruled-definition-rows
category: layout
tags: [layout,type,metadata,responsive,hairline]
axes: {energy: 1, density: 3, weight: 2, finish: 5}
cost: 1
seen: 1
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
