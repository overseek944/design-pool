---
id: selection-yielding-dividers
category: interaction
tags: [tabs,segmented,divider,separator,selection,state,has]
axes: {energy: 1, density: 2, weight: 1, finish: 5}
cost: 1
seen: 1
requires: []
conflicts: []
completes: []
tension: []
---
A segmented control ruled between its items shows a hairline butting into the
filled selected segment on both sides, so the fill looks like it sits on the rules
rather than replacing them. Let each divider ask about its neighbour: draw a
rule only when neither this item nor the next is selected. The rules then run
between plain items and vanish around the selection wherever it moves.

```css
.seg { border-inline-end: var(--hair, 1px) solid var(--rule) }
.seg:is([aria-selected="true"], :has(+ [aria-selected="true"]), :last-child) {
  border-inline-end-color: transparent }
```
⚠ Recolour the rule, don't drop it. Removing the border shifts every label by a
hairline whenever selection moves.
